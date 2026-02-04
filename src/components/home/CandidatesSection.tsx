'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

export type Candidate = {
  id: number;
  name: string;
  slug: string;
  photo_url: string;
  party: string | null;
  motto: string | null;
};

function CandidateCard({ 
  candidate, 
  selected, 
  onSelect 
}: { 
  candidate: Candidate; 
  selected: boolean;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="group relative rounded-3xl bg-slate-900/50 border-2 border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500 overflow-hidden hover:-translate-y-2 backdrop-blur-xl">
      {/* Hover gradient border effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute inset-[2px] rounded-3xl bg-slate-900/90 backdrop-blur-xl" />
      </div>

      <div className="relative">
        <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
          <Image
            src={candidate.photo_url}
            alt={candidate.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badge */}
          <div className="absolute left-3 top-3 rounded-full bg-slate-900/90 border border-white/20 px-4 py-1.5 text-xs font-black text-white backdrop-blur-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Kandida Ofisyèl 🇭🇹
          </div>

          {/* Selection indicator */}
          {selected && (
            <div className="absolute right-3 top-3 rounded-full bg-emerald-500 p-2 shadow-2xl ring-4 ring-white animate-bounce-in">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="text-lg font-black text-white line-clamp-2 min-h-[3.5rem] group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {candidate.name}
          </div>
          {candidate.party && (
            <div className="mt-2 text-sm text-gray-300 font-semibold">
              {candidate.party}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => onSelect(candidate.id)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                selected
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-slate-800/50 border border-white/10 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:border-transparent shadow-md hover:shadow-lg hover:scale-105'
              }`}
            >
              {selected ? '✓ Chwazi' : 'Chwazi'}
            </button>
            <Link href={`/candidate/${candidate.slug}`}>
              <button className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group/btn">
                Detay →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CandidatesSection({ 
  candidates,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange
}: { 
  candidates: Candidate[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  return (
    <section id="vote" className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-black text-white ring-2 ring-blue-400/50 mb-3 shadow-xl">
            🇭🇹 Ofisyèl
          </div>
          <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent md:text-5xl">
            Kandida Ofisyèl
          </h2>
          <p className="mt-3 text-xl text-gray-300 font-medium">
            Klike "Detay" pou li vizyon & misyon yo.
          </p>
        </div>

        <div className="w-full md:w-96">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-900/50 border-2 border-white/10 px-5 py-3.5 backdrop-blur-xl shadow-lg focus-within:border-blue-400/50 transition-all">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              placeholder="Rechèch pa non kandida..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-base outline-none placeholder:text-gray-400 text-white font-medium"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            selected={selectedId === candidate.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-300 font-semibold">
            Pa gen rezilta pou rechèch sa a
          </p>
        </div>
      )}
    </section>
  );
}
