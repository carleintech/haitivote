/**
 * TV Overlay Page
 * Transparent overlay for OBS, vMix, and broadcast software
 */

'use client';

import * as React from 'react';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { cn } from '@/lib/utils';

type OverlayLayout = 'full' | 'sidebar' | 'lower-third';

export default function OverlayPage() {
  const { aggregates, totalVotes, loading, isLive } = useVoteStats(true);
  const [layout, setLayout] = React.useState<OverlayLayout>('sidebar');

  const formatNumber = (num: number) => num.toLocaleString();

  // Read layout from URL params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const layoutParam = params.get('layout') as OverlayLayout;
    if (layoutParam && ['full', 'sidebar', 'lower-third'].includes(layoutParam)) {
      setLayout(layoutParam);
    }

    // Make body transparent
    document.body.style.background = 'transparent';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.background = 'transparent';

    return () => {
      document.body.style.background = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.background = '';
    };
  }, []);

  const topCandidates = React.useMemo(() => {
    return aggregates.slice(0, 10);
  }, [aggregates]);

  if (loading) {
    return null;
  }

  // Full Screen Layout
  if (layout === 'full') {
    return (
      <div className="w-screen h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 animate-slide-up">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              TechKlein VoteLive
            </h1>
            <p className="text-2xl text-white/80 drop-shadow-lg">
              Sondaj Ayiti Global · {formatNumber(totalVotes)} Vòt
            </p>
          </div>

          {/* Top 5 Bars */}
          <div className="space-y-4">
            {topCandidates.slice(0, 5).map((candidate, index) => (
              <div
                key={candidate.candidate_id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 text-white">
                  <div className="text-3xl font-bold w-12 text-center drop-shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold drop-shadow-lg">
                        {candidate.candidate_name}
                      </span>
                      <span className="text-xl font-mono drop-shadow-lg">
                        {formatNumber(candidate.total_votes)} ({candidate.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-8 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border-2 border-white/20">
                      <div
                        className={cn(
                          'h-full transition-all duration-1000 ease-out',
                          index === 0 && 'bg-gradient-to-r from-techklein-cyan to-techklein-blue',
                          index === 1 && 'bg-gradient-to-r from-techklein-blue to-techklein-purple',
                          index >= 2 && 'bg-white/60'
                        )}
                        style={{ width: `${candidate.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Indicator */}
          {isLive && (
            <div className="flex items-center justify-center gap-2 text-white drop-shadow-lg">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xl font-bold">LIVE</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sidebar Layout
  if (layout === 'sidebar') {
    return (
      <div className="fixed right-0 top-0 h-screen w-96 flex items-center p-6">
        <div className="w-full glass rounded-2xl p-6 space-y-4 border-2 border-white/20">
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
              VoteLive
            </h2>
            <p className="text-sm text-white/80 drop-shadow-lg">
              {formatNumber(totalVotes)} Vòt
            </p>
            {isLive && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/20 border border-red-500/50">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-white">LIVE</span>
              </div>
            )}
          </div>

          {/* Top Candidates */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {topCandidates.map((candidate, index) => (
              <div
                key={candidate.candidate_id}
                className="space-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold w-6 drop-shadow-lg">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold truncate drop-shadow-lg">
                      {candidate.candidate_name}
                    </span>
                  </div>
                  <span className="text-sm font-mono drop-shadow-lg">
                    {formatNumber(candidate.total_votes)}
                  </span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-techklein-cyan to-techklein-blue transition-all duration-1000"
                    style={{ width: `${candidate.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-white/60 drop-shadow-lg">
            TechKlein
          </div>
        </div>
      </div>
    );
  }

  // Lower Third Layout
  if (layout === 'lower-third') {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-6">
        <div className="max-w-6xl mx-auto glass rounded-2xl p-4 border-2 border-white/20">
          <div className="flex items-center justify-between gap-6">
            {/* Title */}
            <div className="flex items-center gap-4">
              <div className="text-white space-y-0.5 drop-shadow-lg">
                <h3 className="text-xl font-bold">TechKlein VoteLive</h3>
                <p className="text-sm text-white/80">
                  {formatNumber(totalVotes)} Vòt Total
                </p>
              </div>
              {isLive && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-white">LIVE</span>
                </div>
              )}
            </div>

            {/* Top 3 */}
            <div className="flex items-center gap-6">
              {topCandidates.slice(0, 3).map((candidate, index) => (
                <div
                  key={candidate.candidate_id}
                  className="text-center min-w-[120px] animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-xs text-white/60 drop-shadow-lg">
                    #{index + 1}
                  </div>
                  <div className="text-sm font-bold text-white truncate drop-shadow-lg">
                    {candidate.candidate_name}
                  </div>
                  <div className="text-lg font-bold text-white drop-shadow-lg">
                    {formatNumber(candidate.total_votes)}
                  </div>
                  <div className="text-xs text-white/80 drop-shadow-lg">
                    {candidate.percentage.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
