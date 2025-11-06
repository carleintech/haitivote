/**
 * Candidate Card Component
 * Displays individual candidate with photo, name, and party info
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface CandidateCardProps {
  id: number;
  name: string;
  slug: string;
  photoUrl: string;
  party: string | null;
  motto: string | null;
  selected: boolean;
  onSelect: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export const CandidateCard = React.memo<CandidateCardProps>(
  ({ id, name, slug, photoUrl, party, motto, selected, onSelect, onViewDetails }) => {
    return (
      <div
        className={cn(
          'group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer',
          'border-2 bg-card hover:shadow-xl',
          selected
            ? 'border-techklein-cyan shadow-[0_0_30px_rgba(52,213,255,0.5)] scale-105'
            : 'border-border hover:border-techklein-blue'
        )}
        onClick={() => onSelect(id)}
      >
        {/* Selection indicator */}
        {selected && (
          <div className="absolute top-2 right-2 z-10 bg-techklein-cyan rounded-full p-1.5 shadow-lg animate-pulse-glow">
            <Check className="h-5 w-5 text-white" strokeWidth={3} />
          </div>
        )}

        {/* Photo */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          <Image
            src={photoUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            priority={false}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]">
            {name}
          </h3>

          {party && (
            <Badge variant="secondary" className="text-xs">
              {party}
            </Badge>
          )}

          {motto && (
            <p className="text-xs text-muted-foreground line-clamp-2 italic">
              "{motto}"
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant={selected ? 'gradient' : 'outline'}
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
            >
              {selected ? 'Chwazi' : 'Chwazi'}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(id);
              }}
            >
              Detay
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

CandidateCard.displayName = 'CandidateCard';
