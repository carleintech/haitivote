/**
 * GET /api/stats
 * Returns overall voting statistics
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Get total votes
    const { count: totalVotes, error: votesError } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true });

    if (votesError) {
      console.error('Error counting votes:', votesError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Get total unique voters (distinct phone numbers from private.voters)
    // Note: This requires service_role access, gracefully handle if not available
    const { count: uniqueVoters, error: votersError } = await supabase
      .from('voters')
      .select('phone_e164', { count: 'exact', head: true });

    // If can't access private.voters table, estimate from votes count
    const uniquePhoneNumbers = votersError ? totalVotes || 0 : uniqueVoters || 0;

    // Get vote distribution by candidate (vote_aggregates already has all candidate data)
    const { data: candidateStats, error: statsError } = await supabase
      .from('vote_aggregates')
      .select('candidate_id, candidate_name, candidate_slug, photo_url, total_votes, percentage')
      .order('total_votes', { ascending: false });

    if (statsError) {
      console.error('Error fetching candidate stats:', statsError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Get country distribution
    const { data: countryStats, error: countryError } = await supabase
      .from('votes')
      .select('country')
      .not('country', 'is', null);

    if (countryError) {
      console.error('Error fetching country stats:', countryError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Count votes by country
    const countryDistribution: Record<string, number> = {};
    countryStats?.forEach((vote: any) => {
      const country = vote.country || 'Unknown';
      countryDistribution[country] = (countryDistribution[country] || 0) + 1;
    });

    // Sort countries by vote count
    const topCountries = Object.entries(countryDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([country, votes]) => ({ country, votes }));

    // Calculate percentages for candidate stats
    const candidateDistribution = candidateStats?.map((stat: any) => ({
      candidateId: stat.candidate_id,
      candidateName: stat.candidate_name,
      partyAffiliation: null, // Not available in vote_aggregates view
      photoUrl: stat.photo_url,
      votes: stat.total_votes,
      percentage: stat.percentage || '0.00',
    })) || [];

    return NextResponse.json({
      success: true,
      data: {
        totalVotes: totalVotes || 0,
        uniqueVoters: uniquePhoneNumbers,
        candidateDistribution,
        topCountries,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
