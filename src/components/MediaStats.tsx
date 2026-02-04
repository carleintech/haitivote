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
      <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-slate-800" />
          <Skeleton className="h-4 w-64 bg-slate-800" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 bg-slate-800" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (sources.length === 0) {
    return (
      <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Sous Medya</CardTitle>
          <CardDescription className="text-gray-400">Pa gen done pou afiche</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Pèfòmans Sous Medya
            </CardTitle>
            <CardDescription className="text-gray-400 text-base font-medium mt-1">
              Trafik pa kòd medya
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sources.map((source) => (
            <div
              key={source.code}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 hover:border-blue-400/50 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-white text-lg">{source.label}</h4>
                    {source.country && (
                      <Badge variant="secondary" className="text-xs bg-slate-800 text-gray-300 border-white/20">
                        {source.country}
                      </Badge>
                    )}
                  </div>
                  {source.organization && (
                    <p className="text-sm text-gray-400">
                      {source.organization}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 font-mono">
                    Code: {source.code}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-white">
                    {formatNumber(source.voteCount)}
                  </div>
                  <div className="text-xs text-gray-400">
                    vòt
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Kontribisyon</span>
                  <span className="font-black text-white">
                    {source.percentage.toFixed(2)}%
                  </span>
                </div>
                <Progress value={source.percentage} className="h-2 bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
