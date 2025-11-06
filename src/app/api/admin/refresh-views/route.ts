/**
 * API Route: Manually Refresh Materialized Views
 * Admin only - requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  // Check authentication
  const authCheck = await requireAdmin();
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  const supabase = getAdminClient();

  try {
    // Refresh materialized views
    const { error } = await supabase.rpc('refresh_vote_aggregates');

    if (error) {
      console.error('View refresh error:', error);
      return NextResponse.json(
        { error: 'Failed to refresh views' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Materialized views refreshed successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Refresh views error:', error);
    
    return NextResponse.json(
      { error: 'Refresh failed' },
      { status: 500 }
    );
  }
}
