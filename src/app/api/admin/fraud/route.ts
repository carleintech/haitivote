/**
 * API Route: Fraud Detection Dashboard
 * Admin only - requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/admin';
import { getFraudStatistics } from '@/lib/fraud-detection';

export async function GET(request: NextRequest) {
  // Check authentication
  const authCheck = await requireAdmin();
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  const supabase = getAdminClient();
  const { searchParams } = new URL(request.url);
  
  const hours = parseInt(searchParams.get('hours') || '24');
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    // Get fraud statistics
    const stats = await getFraudStatistics(hours);

    // Get detailed fraud logs
    const since = new Date(Date.now() - hours * 3600000).toISOString();
    
    // @ts-ignore - private schema access
    const { data: detailedLogs, error } = await supabase
      .schema('private')
      .from('fraud_logs')
      .select('*')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Fraud logs query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch fraud logs' },
        { status: 500 }
      );
    }

    // Get IP-based patterns
    const { data: ipPatterns } = await supabase
      .from('votes')
      .select('submitted_ip, count:id.count()')
      .gte('created_at', since)
      .not('submitted_ip', 'is', null)
      .order('count', { ascending: false })
      .limit(20);

    // Get suspicious phone patterns
    // @ts-ignore - private schema access
    const { data: suspiciousVoters } = await supabase
      .schema('private')
      .from('voters')
      .select('phone_e164, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(20);

    return NextResponse.json(
      {
        summary: {
          totalEvents: stats.total,
          bySeverity: stats.bySeverity,
          timeRange: `${hours} hours`,
        },
        recentEvents: stats.recentEvents,
        detailedLogs: detailedLogs || [],
        patterns: {
          topIPs: ipPatterns || [],
          recentPhones: suspiciousVoters || [],
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fraud dashboard error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch fraud data' },
      { status: 500 }
    );
  }
}

