/**
 * Country Breakdown Component
 * Shows vote distribution by country using tabs
 */

'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface CountryStats {
  country: string;
  flag: string;
  totalVotes: number;
  candidates: {
    id: number;
    name: string;
    votes: number;
    percentage: number;
  }[];
}

interface CountryBreakdownProps {
  data: CountryStats[];
}

export function CountryBreakdown({ data }: CountryBreakdownProps) {
  // Sort countries by total votes
  const sortedCountries = [...data].sort((a, b) => b.totalVotes - a.totalVotes);

  if (sortedCountries.length === 0) {
    return (
      <div>
        <p className="text-sm text-gray-400">Pa gen done ankò</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue={sortedCountries[0].country} className="w-full">
      <TabsList className="grid w-full bg-white/10 border border-white/20" style={{ gridTemplateColumns: `repeat(${Math.min(sortedCountries.length, 4)}, 1fr)` }}>
        {sortedCountries.slice(0, 4).map((country) => (
          <TabsTrigger 
            key={country.country} 
            value={country.country}
            className="data-[state=active]:bg-blue-500/30 data-[state=active]:text-white text-gray-300 font-semibold"
          >
            <span className="mr-1.5 text-lg">{country.flag}</span>
            <span className="hidden sm:inline">{country.country}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {sortedCountries.map((country) => (
        <TabsContent key={country.country} value={country.country} className="space-y-4 mt-6">
          {/* Total votes for this country */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-blue-400/30">
            <p className="text-sm text-blue-200 font-semibold">Total Vòt</p>
            <p className="text-3xl font-black text-white mt-1">{country.totalVotes.toLocaleString()}</p>
          </div>

          {/* Candidate breakdown */}
          <div className="space-y-3">
            {country.candidates
              .sort((a, b) => b.votes - a.votes)
              .map((candidate, idx) => (
                <div key={candidate.id} className="space-y-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500 w-5">#{idx + 1}</span>
                      <span className="font-bold text-white">{candidate.name}</span>
                    </div>
                    <span className="text-gray-300 font-semibold text-sm">
                      {candidate.votes.toLocaleString()} <span className="text-gray-500">({candidate.percentage.toFixed(1)}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(candidate.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
