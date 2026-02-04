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
    <div className="space-y-3">
      {candidates.slice(0, 10).map((candidate, index) => {
        const Icon = getIcon(index);
        
        return (
          <div
            key={candidate.id}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                : index === 1
                ? 'bg-gradient-to-r from-gray-500/15 to-slate-500/15 border-gray-500/40'
                : index === 2
                ? 'bg-gradient-to-r from-amber-600/15 to-orange-600/15 border-amber-600/40'
                : 'bg-white/5 border-white/10 hover:border-blue-400/50 hover:bg-white/10'
            }`}
          >
            {/* Rank */}
            <div className="shrink-0 w-10 text-center">
              {Icon ? (
                <Icon className={`h-7 w-7 ${getIconColor(index)}`} />
              ) : (
                <span className="text-xl font-black text-gray-400">
                  {index + 1}
                </span>
              )}
            </div>

            {/* Photo */}
            <div className="relative h-14 w-14 shrink-0">
              <Image
                src={candidate.photo_url}
                alt={candidate.name}
                fill
                className="rounded-xl object-cover ring-2 ring-white/20"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate text-lg">{candidate.name}</p>
              {candidate.party && (
                <p className="text-sm text-gray-400 truncate">
                  {candidate.party}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="text-right shrink-0">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-lg font-black text-lg ${
                index === 0 ? 'bg-yellow-500/30 text-yellow-300'
                : index === 1 ? 'bg-gray-500/30 text-gray-300'
                : index === 2 ? 'bg-amber-600/30 text-amber-300'
                : 'bg-blue-500/20 text-blue-300'
              }`}>
                {candidate.percentage.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-400 mt-1 font-semibold">
                {candidate.votes.toLocaleString()} vòt
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
