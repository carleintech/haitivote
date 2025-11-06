/**
 * GET /api/candidates
 * Returns all active candidates
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/types/database';

type Candidate = Database['public']['Tables']['candidates']['Row'];

export async function GET() {
  try {
    const supabase = await createClient();

    // Get all active candidates ordered by name
    const { data: candidates, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching candidates:', error);
      return NextResponse.json(
        { error: 'Failed to fetch candidates' },
        { status: 500 }
      );
    }

    // Transform data for response
    const response = candidates.map((candidate: Candidate) => ({
      id: candidate.id,
      fullName: candidate.name,
      partyAffiliation: candidate.party,
      photoUrl: candidate.photo_url,
      slug: candidate.slug,
      createdAt: candidate.created_at,
    }));

    return NextResponse.json({
      success: true,
      data: response,
      count: response.length,
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/candidates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
