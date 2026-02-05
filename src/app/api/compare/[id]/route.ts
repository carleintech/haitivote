/**
 * API Route: Compare Candidate Data
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const candidateId = parseInt(id);
    const supabase = await createClient();

    // Get candidate info
    const { data: candidate } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', candidateId)
      .single();

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    // Get candidate metadata (bio, political views, experience, etc.)
    const { data: candidateMeta } = await supabase
      .from('candidate_meta')
      .select('bio, political_views, experience, education, age, birthplace, vision, mission')
      .eq('candidate_id', candidateId)
      .single();

    // Get candidate votes directly from votes table for real-time data
    const { data: candidateVotesList, error: votesError } = await supabase
      .from('votes')
      .select('id, country')
      .eq('candidate_id', candidateId)
      .eq('status', 'verified');

    if (votesError) {
      console.error('Error fetching votes for candidate', candidateId, ':', votesError);
    }

    const candidateVotes = candidateVotesList?.length || 0;

    // Get total votes across all candidates from votes table
    const { count: totalVotesCount } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'verified');
    
    const totalVotes = totalVotesCount || 1; // Avoid division by zero
    const percentage = totalVotes > 0 ? (candidateVotes / totalVotes) * 100 : 0;

    // Calculate country breakdown from the votes
    const countryVotes: Record<string, number> = {};
    candidateVotesList?.forEach((vote: any) => {
      const country = vote.country || 'Unknown';
      countryVotes[country] = (countryVotes[country] || 0) + 1;
    });

    // Format top countries
    const topCountries = Object.entries(countryVotes)
      .map(([country, votes]) => ({
        country,
        votes,
        percentage: candidateVotes > 0 ? (votes / candidateVotes) * 100 : 0,
      }))
      .sort((a, b) => b.votes - a.votes);

    const countryCount = Object.keys(countryVotes).length;

    console.log('Compare API Response for candidate', candidateId, ':', {
      candidateVotes,
      totalVotes,
      percentage: percentage.toFixed(2),
      countryCount,
      topCountries: topCountries.slice(0, 3),
    });

    return NextResponse.json({
      id: candidateId,
      name: (candidate as any)?.name || '',
      slug: (candidate as any)?.slug || '',
      photo_url: (candidate as any)?.photo_url || '',
      total_votes: candidateVotes,
      percentage: percentage,
      country_count: countryCount,
      top_countries: topCountries,
      // Candidate details
      bio: candidateMeta?.bio || null,
      political_views: candidateMeta?.political_views || null,
      experience: candidateMeta?.experience || null,
      education: candidateMeta?.education || null,
      age: candidateMeta?.age || null,
      birthplace: candidateMeta?.birthplace || null,
      vision: candidateMeta?.vision || null,
      mission: candidateMeta?.mission || null,
    });

  } catch (error) {
    console.error('Compare data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch compare data' },
      { status: 500 }
    );
  }
}
