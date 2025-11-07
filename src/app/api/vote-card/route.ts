/**
 * API Route: Generate Shareable Vote Card
 * Creates card data after successful vote
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminClient } from '@/lib/supabase/admin';

const voteCardSchema = z.object({
  voteId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = voteCardSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid vote ID' },
        { status: 400 }
      );
    }

    const { voteId } = validation.data;
    const supabase = getAdminClient();

    // Fetch vote details
    const { data: vote, error } = await supabase
      .from('votes')
      .select(`
        id,
        created_at,
        country,
        candidates (
          name,
          photo_url
        )
      `)
      .eq('id', voteId)
      .single<{
        id: string;
        created_at: string;
        country: string | null;
        candidates: { name: string; photo_url: string } | null;
      }>();

    if (error || !vote) {
      return NextResponse.json(
        { error: 'Vote not found' },
        { status: 404 }
      );
    }

    // Generate shareable card data
    const cardData = {
      voteId: vote.id,
      candidateName: vote.candidates?.name || 'Unknown',
      candidatePhoto: vote.candidates?.photo_url || '',
      country: vote.country || 'Unknown',
      timestamp: new Date(vote.created_at).toLocaleString('fr-HT'),
      shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.haitivote.org'}`,
    };

    return NextResponse.json(cardData, { status: 200 });

  } catch (error) {
    console.error('Vote card generation error:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate vote card' },
      { status: 500 }
    );
  }
}
