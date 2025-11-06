/**
 * Hook for fetching and managing vote statistics with realtime updates
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRealtime } from './use-realtime';

export interface VoteAggregate {
  candidate_id: number;
  candidate_name: string;
  candidate_slug: string;
  photo_url: string;
  total_votes: number;
  percentage: number;
}

export interface VoteByCountry {
  country: string;
  candidate_slug: string;
  candidate_name: string;
  total_votes: number;
}

export interface VoteStats {
  aggregates: VoteAggregate[];
  byCountry: VoteByCountry[];
  totalVotes: number;
  timestamp: string;
}

export interface UseVoteStatsResult extends VoteStats {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isLive: boolean;
}

export function useVoteStats(enableRealtime: boolean = true): UseVoteStatsResult {
  const [stats, setStats] = useState<VoteStats>({
    aggregates: [],
    byCountry: [],
    totalVotes: 0,
    timestamp: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch('/api/stats', {
        cache: 'no-store',
      });

      if (!response.ok) {
        // Silently handle "no data yet" scenarios in development
        if (response.status === 500) {
          // Database might not have data yet - use empty state
          setStats({
            aggregates: [],
            byCountry: [],
            totalVotes: 0,
            timestamp: new Date().toISOString(),
          });
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();
      
      // Handle API response structure
      if (data.success && data.data) {
        // Transform API response to expected format
        const transformedData: VoteStats = {
          aggregates: data.data.candidateDistribution?.map((c: any) => ({
            candidate_id: c.candidateId,
            candidate_name: c.candidateName,
            candidate_slug: c.candidateName?.toLowerCase().replace(/\s+/g, '-') || '',
            photo_url: c.photoUrl || '',
            total_votes: c.votes || 0,
            percentage: parseFloat(c.percentage) || 0,
          })) || [],
          byCountry: data.data.topCountries?.map((c: any) => ({
            country: c.country,
            candidate_slug: '',
            candidate_name: '',
            total_votes: c.votes || 0,
          })) || [],
          totalVotes: data.data.totalVotes || 0,
          timestamp: data.data.lastUpdated || new Date().toISOString(),
        };
        setStats(transformedData);
      } else {
        setStats(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Stats fetch warning:', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Setup realtime subscription
  const { isConnected } = useRealtime({
    table: 'votes',
    event: 'INSERT',
    schema: 'public',
    onInsert: () => {
      // Refresh stats when new vote is inserted
      fetchStats();
    },
  });

  return {
    ...stats,
    loading,
    error,
    refetch: fetchStats,
    isLive: enableRealtime && isConnected,
  };
}
