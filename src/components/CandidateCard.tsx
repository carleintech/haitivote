/**
 * Candidate Card Component
 * Displays individual candidate with photo, name, and party info
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
          'group relative rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer',
          'border-2 bg-gradient-to-br from-white via-white to-gray-50/50',
          'hover:shadow-2xl hover:-translate-y-2',
          selected
            ? 'border-blue-500 shadow-[0_0_40px_rgba(0,108,255,0.6)] scale-105 ring-4 ring-blue-200/50'
            : 'border-gray-200 hover:border-blue-400 hover:shadow-blue-200/50'
        )}
        onClick={() => onSelect(id)}
      >
        {/* Selection indicator */}
        {selected && (
          <div className="absolute top-3 right-3 z-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 shadow-2xl animate-bounce-in">
            <Check className="h-6 w-6 text-white" strokeWidth={3} />
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
          </div>
        )}

        {/* Photo */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <Image
            src={photoUrl}
            alt={name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            priority={false}
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating badge on hover */}
          {party && (
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
              <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 font-bold shadow-xl border border-white/50">
                {party}
              </Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 space-y-3 bg-gradient-to-br from-white to-gray-50/50">
          <h3 className="font-black text-lg leading-tight line-clamp-2 min-h-[3.5rem] text-gray-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {motto && (
            <p className="text-sm text-gray-600 line-clamp-2 italic font-medium leading-relaxed">
              "{motto}"
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-3">
            <Button
              size="sm"
              className={cn(
                "flex-1 font-bold text-base h-11 rounded-xl transition-all duration-300",
                selected 
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-blue-600 text-gray-700 hover:text-white shadow-md hover:shadow-lg hover:scale-105"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
            >
              {selected ? '✓ Chwazi' : 'Chwazi'}
            </Button>
            
            <Link href={`/candidate/${slug}`} onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 text-white font-bold text-base px-6 h-11 rounded-xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group/btn"
              >
                <span className="flex items-center gap-2">
                  Detay
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    );
  }
);

CandidateCard.displayName = 'CandidateCard';
