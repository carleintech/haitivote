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

    // Get current vote counts
    const { data: currentCounts } = await supabase
      .from('vote_aggregates')
      .select('*');

    // Get votes from timeframe ago
    const { data: historicalVotes } = await supabase
      .from('votes')
      .select('candidate_id')
      .gte('created_at', startTime.toISOString());

    // Calculate historical counts
    const historicalCounts: Record<number, number> = {};
    historicalVotes?.forEach((vote: any) => {
      historicalCounts[vote.candidate_id] = (historicalCounts[vote.candidate_id] || 0) + 1;
    });

    // Calculate trends
    const trends = currentCounts?.map((candidate: any) => {
      const historicalCount = historicalCounts[candidate.candidate_id] || 0;
      const previousCount = candidate.total_votes - historicalCount;
      const velocity = historicalCount / hoursAgo;
      const momentum = previousCount > 0 
        ? ((historicalCount / previousCount) * 100)
        : historicalCount > 0 ? 100 : 0;

      const trend = momentum > 5 ? 'rising' : momentum < -5 ? 'falling' : 'stable';
      const projected24h = Math.round(candidate.total_votes + (velocity * 24));

      return {
        candidateId: candidate.candidate_id,
        candidateName: candidate.candidate_name,
        candidateSlug: candidate.candidate_slug,
        photoUrl: candidate.photo_url,
        currentVotes: candidate.total_votes,
        velocity,
        momentum,
        projected24h,
        trend,
      };
    }) || [];

    return NextResponse.json({ trends });

  } catch (error) {
    console.error('Trends calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate trends' },
      { status: 500 }
    );
  }
}
