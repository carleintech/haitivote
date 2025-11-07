/**
 * API Route: Recent Activity
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch recent 100 votes with candidate info
    const { data: votes, error } = await supabase
      .from('votes')
      .select(`
        id,
        created_at,
        country,
        region,
        candidate_id,
        candidates (
          name,
          slug,
          photo_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    // Format activities
    const activities = votes?.map((vote: any) => ({
      id: vote.id,
      candidate_name: vote.candidates?.name || 'Unknown',
      candidate_photo: vote.candidates?.photo_url || '',
      candidate_slug: vote.candidates?.slug || '',
      country: vote.country || 'Unknown',
      region: vote.region,
      timestamp: vote.created_at,
    })) || [];

    // Calculate stats
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const { count: totalToday } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString());

    const oneMinuteAgo = new Date(Date.now() - 60000);
    const { count: lastMinute } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneMinuteAgo.toISOString());

    const { data: countries } = await supabase
      .from('votes')
      .select('country')
      .gte('created_at', todayStart.toISOString());

    const uniqueCountries = new Set(countries?.map((v: any) => v.country)).size;

    return NextResponse.json({
      activities,
      stats: {
        totalToday: totalToday || 0,
        votesPerMinute: lastMinute || 0,
        activeCountries: uniqueCountries,
      },
    });

  } catch (error) {
    console.error('Activity feed error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
