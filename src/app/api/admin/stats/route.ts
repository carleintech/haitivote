/**
 * API Route: Admin Statistics Dashboard
 * Admin only - requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  // Check authentication
  const authCheck = await requireAdmin();
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  const supabase = getAdminClient();

  try {
    // Get comprehensive stats
    const [
      totalVotesResult,
      totalVotersResult,
      candidatesResult,
      countriesResult,
      mediaSourcesResult,
      recentVotesResult,
      votesPerHourResult,
    ] = await Promise.all([
      // Total verified votes
      supabase
        .from('votes')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'verified'),
      
      // Total unique voters
      // @ts-ignore - private schema access
      supabase
        .schema('private')
        .from('voters')
        .select('id', { count: 'exact', head: true })
        .not('phone_verified_at', 'is', null),
      
      // Active candidates
      supabase
        .from('candidates')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),
      
      // Unique countries
      supabase
        .from('votes')
        .select('country')
        .not('country', 'is', null)
        .neq('country', ''),
      
      // Media sources
      supabase
        .from('media_referrers')
        .select('*')
        .order('created_at', { ascending: false }),
      
      // Recent votes (last 100)
      supabase
        .from('votes')
        .select(`
          id,
          created_at,
          country,
          region,
          media_code,
          candidates (name, slug)
        `)
        .eq('status', 'verified')
        .order('created_at', { ascending: false })
        .limit(100),
      
      // Votes per hour (last 24 hours)
      supabase
        .from('votes')
        .select('created_at')
        .eq('status', 'verified')
        .gte('created_at', new Date(Date.now() - 24 * 3600000).toISOString()),
    ]);

    // Process unique countries
    const uniqueCountries = new Set(
      countriesResult.data?.map((v: any) => v.country).filter(Boolean) || []
    );

    // Process votes per hour
    const votesPerHour = processVotesPerHour(votesPerHourResult.data || []);

    return NextResponse.json(
      {
        summary: {
          totalVotes: totalVotesResult.count || 0,
          totalVoters: totalVotersResult.count || 0,
          activeCandidates: candidatesResult.count || 0,
          uniqueCountries: uniqueCountries.size,
          mediaSources: mediaSourcesResult.data?.length || 0,
        },
        votesPerHour,
        recentVotes: recentVotesResult.data || [],
        mediaSources: mediaSourcesResult.data || [],
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Admin stats error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}

/**
 * Process votes into hourly buckets
 */
function processVotesPerHour(votes: any[]): Record<string, number> {
  const hourly: Record<string, number> = {};
  
  votes.forEach((vote: any) => {
    const date = new Date(vote.created_at);
    const hourKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:00`;
    
    hourly[hourKey] = (hourly[hourKey] || 0) + 1;
  });
  
  return hourly;
}
