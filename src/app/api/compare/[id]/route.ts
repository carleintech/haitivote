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

    // Get stats
    const { data: stats } = await supabase
      .from('vote_aggregates')
      .select('*')
      .eq('candidate_id', candidateId)
      .single();

    // Get by country
    const { data: byCountry } = await supabase
      .from('vote_by_country')
      .select('*')
      .eq('candidate_slug', candidate?.slug)
      .order('total_votes', { ascending: false });

    return NextResponse.json({
      candidate,
      stats,
      byCountry: byCountry || [],
    });

  } catch (error) {
    console.error('Compare data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch compare data' },
      { status: 500 }
    );
  }
}
