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
      <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  const topThree = aggregates.slice(0, 3);
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <a href="https://www.haitivote.org" target="_blank" rel="noopener noreferrer">
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🇭🇹 HaitiVote
              </h2>
              <p className="text-sm text-blue-100 font-medium">
                Rezilta an Tan Reyèl · {formatNumber(totalVotes)} vòt
              </p>
            </div>
          </a>
          
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse shadow-lg shadow-red-500/50" />
                <span className="font-bold text-white">LIVE</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top 3 Quick View */}
      <div className="px-6 py-6 border-b-2 border-gray-200 bg-white/60 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-4">
          {topThree.map((candidate, index) => (
            <div 
              key={candidate.candidate_id} 
              className="text-center space-y-2 p-4 rounded-xl bg-white shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-sm font-bold text-gray-500">
                #{index + 1}
              </div>
              <div className="text-base font-bold line-clamp-2 text-gray-900 min-h-[3rem]">
                {candidate.candidate_name}
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatNumber(candidate.total_votes)}
              </div>
              <div className="text-sm font-semibold text-gray-600">
                {candidate.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6">
          <LiveChart
            data={aggregates.map((agg) => ({
              id: agg.candidate_id,
              name: agg.candidate_name,
              votes: agg.total_votes,
              percentage: agg.percentage,
            }))}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t-2 border-gray-200 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">
            Mizajou: {new Date(timestamp).toLocaleTimeString('fr-HT', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          
          <a
            href={process.env.NEXT_PUBLIC_SITE_URL || 'https://www.haitivote.org'}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <TrendingUp className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            Vote kounye a
          </a>
        </div>
      </div>
    </div>
  );
}
