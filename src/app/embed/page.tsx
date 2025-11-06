/**
 * Embed Widget Page
 * Embeddable version for news websites
 */

'use client';

import * as React from 'react';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { LiveChart } from '@/components/LiveChart';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';

export default function EmbedPage() {
  const { aggregates, totalVotes, timestamp, loading, isLive } = useVoteStats(true);

  React.useEffect(() => {
    // Make body transparent for embedding
    document.body.style.background = 'transparent';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    return () => {
      document.body.style.background = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full p-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const topThree = aggregates.slice(0, 3);
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="w-full h-full min-h-screen bg-background/95 backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">TechKlein VoteLive</h2>
            <p className="text-xs text-muted-foreground">
              Rezilta an Tan Reyèl · {formatNumber(totalVotes)} vòt
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-medium">LIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top 3 Quick View */}
      <div className="px-4 py-4 border-b border-border bg-card/50">
        <div className="grid grid-cols-3 gap-3">
          {topThree.map((candidate, index) => (
            <div key={candidate.candidate_id} className="text-center space-y-1">
              <div className="text-xs text-muted-foreground">
                #{index + 1}
              </div>
              <div className="text-sm font-semibold line-clamp-1">
                {candidate.candidate_name}
              </div>
              <div className="text-lg font-bold text-primary">
                {formatNumber(candidate.total_votes)}
              </div>
              <div className="text-xs text-muted-foreground">
                {candidate.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="px-4 py-4">
        <LiveChart
          data={aggregates.map((agg) => ({
            id: agg.candidate_id,
            name: agg.candidate_name,
            votes: agg.total_votes,
            percentage: agg.percentage,
          }))}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-card/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Mizajou: {new Date(timestamp).toLocaleTimeString('fr-HT', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          
          <a
            href={process.env.NEXT_PUBLIC_SITE_URL || 'https://votelive.techklein.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            Vote kounye a
          </a>
        </div>
      </div>
    </div>
  );
}
