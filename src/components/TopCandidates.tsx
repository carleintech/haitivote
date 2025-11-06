/**
 * Top Candidates Component
 * Displays top 5 candidates with podium styling
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

interface CandidateRanking {
  id: number;
  name: string;
  photo_url: string;
  party: string | null;
  votes: number;
  percentage: number;
}

interface TopCandidatesProps {
  candidates: CandidateRanking[];
}

export function TopCandidates({ candidates }: TopCandidatesProps) {
  const getIcon = (index: number) => {
    if (index === 0) return Trophy;
    if (index === 1) return Medal;
    if (index === 2) return Award;
    return null;
  };

  const getIconColor = (index: number) => {
    if (index === 0) return 'text-yellow-500';
    if (index === 1) return 'text-slate-400';
    if (index === 2) return 'text-amber-600';
    return '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Kandida</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {candidates.slice(0, 5).map((candidate, index) => {
          const Icon = getIcon(index);
          
          return (
            <div
              key={candidate.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30'
                  : 'bg-card border-border hover:border-techklein-cyan/50'
              }`}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-8 text-center">
                {Icon ? (
                  <Icon className={`h-6 w-6 ${getIconColor(index)}`} />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Photo */}
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={candidate.photo_url}
                  alt={candidate.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{candidate.name}</p>
                {candidate.party && (
                  <p className="text-xs text-muted-foreground truncate">
                    {candidate.party}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <Badge variant={index === 0 ? 'default' : 'secondary'}>
                  {candidate.percentage.toFixed(1)}%
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {candidate.votes.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
