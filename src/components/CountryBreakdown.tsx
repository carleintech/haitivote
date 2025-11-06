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
      <Card>
        <CardHeader>
          <CardTitle>Vòt pa Peyi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Pa gen done ankò</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vòt pa Peyi</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={sortedCountries[0].country}>
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Math.min(sortedCountries.length, 4)}, 1fr)` }}>
            {sortedCountries.slice(0, 4).map((country) => (
              <TabsTrigger key={country.country} value={country.country}>
                <span className="mr-1">{country.flag}</span>
                {country.country}
              </TabsTrigger>
            ))}
          </TabsList>

          {sortedCountries.map((country) => (
            <TabsContent key={country.country} value={country.country} className="space-y-4 mt-4">
              {/* Total votes for this country */}
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Total Vòt</p>
                <p className="text-2xl font-bold">{country.totalVotes.toLocaleString()}</p>
              </div>

              {/* Candidate breakdown */}
              <div className="space-y-3">
                {country.candidates
                  .sort((a, b) => b.votes - a.votes)
                  .map((candidate) => (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{candidate.name}</span>
                        <span className="text-muted-foreground">
                          {candidate.votes.toLocaleString()} ({candidate.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={candidate.percentage} />
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
