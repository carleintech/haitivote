/**
 * GET /api/stats/country
 * Returns voting statistics by country
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryCode = searchParams.get('code');

    const supabase = await createClient();

    // If specific country requested
    if (countryCode) {
      const { data: votes, error } = await supabase
        .from('votes')
        .select('candidate_id, candidates(name, party, photo_url)')
        .eq('country_code', countryCode);

      if (error) {
        console.error('Error fetching country votes:', error);
        return NextResponse.json(
          { error: 'Failed to fetch country statistics' },
          { status: 500 }
        );
      }

      // Count votes per candidate
      const candidateVotes: Record<string, any> = {};
      votes?.forEach((vote: any) => {
        const candidateId = vote.candidate_id;
        if (!candidateVotes[candidateId]) {
          candidateVotes[candidateId] = {
            candidateId,
            candidateName: (vote.candidates as any)?.name || 'Unknown',
            partyAffiliation: (vote.candidates as any)?.party || null,
            photoUrl: (vote.candidates as any)?.photo_url || null,
            votes: 0,
          };
        }
        candidateVotes[candidateId].votes += 1;
      });

      const distribution = Object.values(candidateVotes)
        .sort((a, b) => b.votes - a.votes);

      const totalVotes = votes?.length || 0;

      return NextResponse.json({
        success: true,
        data: {
          countryCode,
          totalVotes,
          distribution: distribution.map((stat: any) => ({
            ...stat,
            percentage: totalVotes ? ((stat.votes / totalVotes) * 100).toFixed(2) : '0.00',
          })),
        },
      });
    }

    // Get all countries with vote counts
    const { data: votes, error } = await supabase
      .from('votes')
      .select('country_code')
      .not('country_code', 'is', null);

    if (error) {
      console.error('Error fetching country stats:', error);
      return NextResponse.json(
        { error: 'Failed to fetch country statistics' },
        { status: 500 }
      );
    }

    // Count votes by country
    const countryDistribution: Record<string, number> = {};
    votes?.forEach((vote: any) => {
      const country = vote.country_code || 'Unknown';
      countryDistribution[country] = (countryDistribution[country] || 0) + 1;
    });

    // Sort by vote count
    const countries = Object.entries(countryDistribution)
      .sort(([, a], [, b]) => b - a)
      .map(([code, votes]) => ({ code, votes }));

    return NextResponse.json({
      success: true,
      data: {
        countries,
        totalCountries: countries.length,
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/stats/country:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
