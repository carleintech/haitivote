/**
 * Hook for fetching and managing candidates
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Candidate {
  id: number;
  name: string;
  slug: string;
  photo_url: string;
  party: string | null;
  motto: string | null;
}

export interface UseCandidatesResult {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchCandidates: (query: string) => Candidate[];
}

export function useCandidates(): UseCandidatesResult {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/candidates');
      
      if (!response.ok) {
        // Silently handle no data scenario
        if (response.status === 500) {
          setCandidates([]);
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch candidates');
      }

      const result = await response.json();
      
      // Handle API response structure: { success: true, data: [...] }
      if (result.success && result.data) {
        // Transform API format to expected format
        const transformedCandidates: Candidate[] = result.data.map((c: any) => ({
          id: c.id,
          name: c.fullName || c.name,
          slug: c.slug,
          photo_url: c.photoUrl || c.photo_url,
          party: c.partyAffiliation || c.party,
          motto: c.motto || null,
        }));
        setCandidates(transformedCandidates);
      } else {
        // Fallback for different response format
        setCandidates(result.candidates || result.data || []);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      if (process.env.NODE_ENV === 'development') {
        console.warn('Candidates fetch warning:', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const searchCandidates = useCallback(
    (query: string): Candidate[] => {
      if (!query.trim()) {
        return candidates;
      }

      const lowerQuery = query.toLowerCase();
      return candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(lowerQuery)
      );
    },
    [candidates]
  );

  return {
    candidates,
    loading,
    error,
    refetch: fetchCandidates,
    searchCandidates,
  };
}
