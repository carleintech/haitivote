/**
 * API Route: Export Votes to CSV
 * Admin only - requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/admin';
import { format } from 'date-fns';

export async function GET(request: NextRequest) {
  // Check authentication
  const authCheck = await requireAdmin();
  if (!authCheck.authenticated) {
    return authCheck.response;
  }

  const supabase = getAdminClient();
  const { searchParams } = new URL(request.url);
  
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const country = searchParams.get('country');
  const candidateId = searchParams.get('candidate_id');

  try {
    // Build query
    let query = supabase
      .from('votes')
      .select(`
        id,
        created_at,
        country,
        region,
        submitted_ip,
        status,
        media_code,
        candidates (
          name,
          slug,
          party
        )
      `)
      .eq('status', 'verified')
      .order('created_at', { ascending: false });

    // Apply filters
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    if (country) {
      query = query.eq('country', country);
    }
    if (candidateId) {
      query = query.eq('candidate_id', parseInt(candidateId));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Export query error:', error);
      return NextResponse.json(
        { error: 'Failed to export data' },
        { status: 500 }
      );
    }

    // Generate CSV
    const csvRows: string[] = [];
    
    // Header
    csvRows.push([
      'Vote ID',
      'Timestamp',
      'Candidate',
      'Party',
      'Country',
      'Region',
      'IP Address',
      'Media Code',
      'Status',
    ].map(escapeCSV).join(','));

    // Data rows
    data?.forEach((vote: any) => {
      const candidate = vote.candidates as any;
      
      csvRows.push([
        vote.id,
        format(new Date(vote.created_at), 'yyyy-MM-dd HH:mm:ss'),
        candidate?.name || 'Unknown',
        candidate?.party || 'N/A',
        vote.country || 'Unknown',
        vote.region || 'N/A',
        vote.submitted_ip || 'Unknown',
        vote.media_code || 'N/A',
        vote.status,
      ].map(escapeCSV).join(','));
    });

    const csvContent = csvRows.join('\n');
    const timestamp = format(new Date(), 'yyyy-MM-dd_HHmmss');
    const filename = `techklein_votes_${timestamp}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}

/**
 * Escape CSV values
 */
function escapeCSV(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  const stringValue = String(value);
  
  // If contains comma, quote, or newline, wrap in quotes and escape quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

