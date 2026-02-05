/**
 * API Route: Trends Analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '6h';

    const supabase = await createClient();

    // Calculate time boundaries
    const now = new Date();
    const hoursAgo = timeframe === '1h' ? 1 : timeframe === '6h' ? 6 : 24;
    const startTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

    // Get all candidates
    const { data: candidates } = await supabase
      .from('candidates')
      .select('id, name, slug, photo_url')
      .eq('is_active', true);

    // Get ALL votes with timestamps to calculate current totals
    const { data: allVotes } = await supabase
      .from('votes')
      .select('candidate_id, created_at')
      .eq('status', 'verified')
      .order('created_at', { ascending: true });

    if (!candidates || !allVotes) {
      return NextResponse.json({ 
        timeframe,
        rising_stars: [],
        timestamp: new Date().toISOString(),
      });
    }

    // Calculate current and historical counts for each candidate
    const voteCounts: Record<number, { current: number; historical: number }> = {};
    
    candidates.forEach((candidate: any) => {
      voteCounts[candidate.id] = { current: 0, historical: 0 };
    });

    allVotes.forEach((vote: any) => {
      const voteTime = new Date(vote.created_at);
      const isInTimeframe = voteTime >= startTime;
      
      if (voteCounts[vote.candidate_id]) {
        voteCounts[vote.candidate_id].current += 1;
        if (isInTimeframe) {
          voteCounts[vote.candidate_id].historical += 1;
        }
      }
    });

    // Calculate trends for each candidate
    const trends = candidates.map((candidate: any) => {
      const counts = voteCounts[candidate.id];
      const currentTotal = counts.current;
      const votesInTimeframe = counts.historical;
      const votesBeforeTimeframe = currentTotal - votesInTimeframe;
      
      // Velocity: votes per hour in the timeframe
      const velocity = votesInTimeframe / hoursAgo;
      
      // Momentum: percentage change from previous period
      // Formula: ((new_votes / previous_votes) - 1) * 100
      // If no previous votes, momentum is 100% if there are new votes
      let momentum = 0;
      if (votesBeforeTimeframe > 0) {
        momentum = ((votesInTimeframe / votesBeforeTimeframe) - 1) * 100;
      } else if (votesInTimeframe > 0) {
        momentum = 100; // 100% growth from 0
      }

      // Projection: current + (velocity * 24 hours)
      const projected24h = Math.max(0, Math.round(currentTotal + (velocity * 24)));

      return {
        id: candidate.id,
        name: candidate.name,
        slug: candidate.slug,
        photo_url: candidate.photo_url,
        total_votes: currentTotal,
        votes_per_hour: parseFloat(velocity.toFixed(3)),
        momentum_percentage: parseFloat(momentum.toFixed(2)),
        projected_24h: projected24h,
        rank: 0,
      };
    });

    // Sort by momentum (highest first), then by velocity as tiebreaker
    const risingStars = trends
      .filter(t => t.total_votes > 0 || t.votes_per_hour > 0) // Only show candidates with activity
      .sort((a, b) => {
        // Primary sort: momentum
        if (Math.abs(b.momentum_percentage - a.momentum_percentage) > 0.01) {
          return b.momentum_percentage - a.momentum_percentage;
        }
        // Tiebreaker: velocity
        if (Math.abs(b.votes_per_hour - a.votes_per_hour) > 0.001) {
          return b.votes_per_hour - a.votes_per_hour;
        }
        // Final tiebreaker: total votes
        return b.total_votes - a.total_votes;
      })
      .map((candidate, index) => ({
        ...candidate,
        rank: index + 1,
      }));

    console.log('Trends calculated:', {
      timeframe,
      hoursAgo,
      candidatesAnalyzed: trends.length,
      risingStars: risingStars.length,
      topCandidate: risingStars[0]?.name,
    });

    return NextResponse.json({ 
      timeframe,
      rising_stars: risingStars,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Trends calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate trends' },
      { status: 500 }
    );
  }
}
