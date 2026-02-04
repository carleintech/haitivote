/**
 * Candidate Grid Component
 * Displays all candidates in a responsive grid
 */

'use client';

import * as React from 'react';
import { useCandidates } from '@/hooks/use-candidates';
import { CandidateCard } from '@/components/CandidateCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CandidateGridProps {
  selectedCandidateId: number | null;
  onSelectCandidate: (id: number) => void;
  searchQuery?: string;
}

export function CandidateGrid({
  selectedCandidateId,
  onSelectCandidate,
  searchQuery = '',
}: CandidateGridProps) {
  const { candidates, loading, error, searchCandidates } = useCandidates();

  // Filter candidates based on search
  const filteredCandidates = React.useMemo(() => {
    return searchQuery ? searchCandidates(searchQuery) : candidates;
  }, [candidates, searchQuery, searchCandidates]);

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Erè nan chaje kandida yo: {error}
        </AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (filteredCandidates.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {searchQuery
            ? `Pa gen kandida ki matche "${searchQuery}"`
            : 'Pa gen kandida ki disponib'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredCandidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          id={candidate.id}
          name={candidate.name}
          slug={candidate.slug}
          photoUrl={candidate.photo_url}
          party={candidate.party}
          motto={candidate.motto}
          selected={selectedCandidateId === candidate.id}
          onSelect={onSelectCandidate}
        />
      ))}
    </div>
  );
}
