/**
 * GET /api/candidates/[id]
 * Returns a single candidate by ID or slug
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: identifier } = await params;

    // Determine if it's a numeric ID, UUID, or slug
    const isNumeric = /^\d+$/.test(identifier);
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    let query = supabase
      .from('candidates')
      .select(`
        *,
        candidate_meta (
          bio,
          political_views,
          key_policies,
          experience,
          education,
          age,
          birthplace,
          website,
          twitter,
          facebook,
          instagram,
          youtube
        )
      `);

    // Match based on identifier type
    if (isNumeric || isUuid) {
      query = query.eq('id', identifier);
    } else {
      query = query.eq('slug', identifier);
    }

    const { data: candidate, error } = await query.maybeSingle();

    if (error) {
      console.error('Database error fetching candidate:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    if (!candidate) {
      console.log('Candidate not found with identifier:', identifier);
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      );
    }

    // Get vote count for this candidate
    const { data: voteStats } = await supabase
      .from('vote_aggregates')
      .select('total_votes')
      .eq('candidate_id', candidate.id)
      .maybeSingle<{ total_votes: number }>();

    // Return complete candidate data with metadata
    return NextResponse.json({
      success: true,
      candidate: {
        ...candidate,
        total_votes: voteStats?.total_votes || 0,
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/candidates/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
