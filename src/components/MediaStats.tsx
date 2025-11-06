/**
 * Media Statistics Component
 * Shows performance of different media sources
 */

'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';

interface MediaSource {
  code: string;
  label: string;
  organization: string | null;
  country: string | null;
  voteCount: number;
  percentage: number;
}

export function MediaStats() {
  const [sources, setSources] = React.useState<MediaSource[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [totalVotes, setTotalVotes] = React.useState(0);

  React.useEffect(() => {
    fetchMediaStats();
  }, []);

  const fetchMediaStats = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/stats');
      
      if (response.ok) {
        const data = await response.json();
        setTotalVotes(data.totalVotes);
        
        // Mock data for demonstration
        // In production, you'd fetch from /api/admin/media-stats
        setSources([
          {
            code: 'direct',
            label: 'Direkteman',
            organization: null,
            country: null,
            voteCount: Math.floor(data.totalVotes * 0.45),
            percentage: 45.0,
          },
          {
            code: 'social',
            label: 'Rezo Sosyal',
            organization: null,
            country: null,
            voteCount: Math.floor(data.totalVotes * 0.30),
            percentage: 30.0,
          },
          {
            code: 'media',
            label: 'Medya Tradisyonèl',
            organization: null,
            country: null,
            voteCount: Math.floor(data.totalVotes * 0.25),
            percentage: 25.0,
          },
        ]);
      }
    } catch (error) {
      console.error('Media stats error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => num.toLocaleString();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (sources.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sous Medya</CardTitle>
          <CardDescription>Pa gen done pou afiche</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Pèfòmans Sous Medya
        </CardTitle>
        <CardDescription>
          Trafik pa kòd medya
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sources.map((source) => (
            <div
              key={source.code}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{source.label}</h4>
                    {source.country && (
                      <Badge variant="secondary" className="text-xs">
                        {source.country}
                      </Badge>
                    )}
                  </div>
                  {source.organization && (
                    <p className="text-sm text-muted-foreground">
                      {source.organization}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground font-mono">
                    Code: {source.code}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatNumber(source.voteCount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vòt
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Kontribisyon</span>
                  <span className="font-semibold">
                    {source.percentage.toFixed(2)}%
                  </span>
                </div>
                <Progress value={source.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
