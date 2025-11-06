/**
 * Country Analytics Component
 * Detailed breakdown by location
 */

'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, TrendingUp } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface CountryData {
  country: string;
  totalVotes: number;
  percentage: number;
  topCandidate: string;
  topCandidateVotes: number;
}

interface CountryAnalyticsProps {
  data: CountryData[];
}

export function CountryAnalytics({ data }: CountryAnalyticsProps) {
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(
    data[0]?.country || null
  );

  const sortedCountries = React.useMemo(() => {
    return [...data].sort((a, b) => b.totalVotes - a.totalVotes);
  }, [data]);

  const selectedData = sortedCountries.find((c) => c.country === selectedCountry);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Analiz Pa Lokalizasyon
        </CardTitle>
        <CardDescription>
          Repartisyon jeografik vòt yo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country List */}
          <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
            {sortedCountries.map((country) => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCountry === country.country
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{country.country}</span>
                  </div>
                  <Badge variant="secondary">
                    {formatNumber(country.totalVotes)}
                  </Badge>
                </div>
                <Progress value={country.percentage} className="h-1.5" />
              </button>
            ))}
          </div>

          {/* Selected Country Details */}
          {selectedData && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">{selectedData.country}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Vòt
                    </p>
                    <p className="text-3xl font-bold">
                      {formatNumber(selectedData.totalVotes)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Pousantaj Total
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">
                        {selectedData.percentage.toFixed(2)}%
                      </p>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Kandida Ki Pi Popilè
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{selectedData.topCandidate}</p>
                      <Badge variant="default">
                        {formatNumber(selectedData.topCandidateVotes)} vòt
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional insights */}
              <div className="p-4 rounded-lg bg-muted/50 text-sm">
                <p className="text-muted-foreground">
                  💡 <span className="font-semibold">{selectedData.country}</span>{' '}
                  reprezante{' '}
                  <span className="font-semibold">
                    {selectedData.percentage.toFixed(1)}%
                  </span>{' '}
                  nan total vòt yo.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
