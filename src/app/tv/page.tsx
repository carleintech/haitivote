/**
 * TV Mode Page
 * Full-screen display optimized for television screens
 * Shows live voting results in a clean, readable format
 */

'use client';

import * as React from 'react';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

export default function TVPage() {
  const { aggregates, totalVotes, loading, isLive } = useVoteStats(true);
  const [currentTime, setCurrentTime] = React.useState('');
  const [mounted, setMounted] = React.useState(false);

  const formatNumber = (num: number) => num.toLocaleString();

  // Update time every second
  React.useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('fr-HT', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      const dateStr = now.toLocaleDateString('fr-HT', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      setCurrentTime(`${dateStr} - ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const topCandidates = React.useMemo(() => {
    return aggregates.slice(0, 10);
  }, [aggregates]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b-4 border-blue-500 p-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  HaitiVote
                </h1>
                <p className="text-2xl text-blue-300 font-semibold mt-1">
                  Rezilta Andirek
                </p>
              </div>
            </div>

            {/* Live Indicator & Stats */}
            <div className="flex items-center gap-8">
              {/* Total Votes */}
              <div className="text-right">
                <div className="text-blue-300 text-xl font-semibold">Total Vòt</div>
                <div className="text-5xl font-bold text-white">
                  {formatNumber(totalVotes)}
                </div>
              </div>

              {/* Live Badge */}
              {isLive && (
                <div className="flex items-center gap-3 bg-red-500 px-6 py-4 rounded-2xl shadow-2xl animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full" />
                  <span className="text-2xl font-bold uppercase">LIVE</span>
                </div>
              )}
            </div>
          </div>

          {/* Current Time */}
          <div className="mt-6 text-center">
            <p className="text-xl text-blue-200 capitalize">
              {currentTime}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto p-8">
        {loading ? (
          <div className="flex items-center justify-center h-[800px]">
            <div className="text-center space-y-6">
              <div className="animate-spin h-24 w-24 border-8 border-blue-500 border-t-transparent rounded-full mx-auto" />
              <p className="text-3xl text-blue-300">Chajman rezilta yo...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top 10 Candidates */}
            {topCandidates.map((candidate, index) => {
              const rank = index + 1;
              const isTopThree = rank <= 3;

              return (
                <div
                  key={candidate.candidate_id}
                  className={`
                    flex items-center gap-8 p-8 rounded-3xl border-4 transition-all
                    ${isTopThree 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500' 
                      : 'bg-white/10 backdrop-blur-xl border-blue-500/30'
                    }
                  `}
                >
                  {/* Rank */}
                  <div className={`
                    w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-bold shadow-2xl
                    ${rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' : ''}
                    ${rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' : ''}
                    ${rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900' : ''}
                    ${rank > 3 ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white' : ''}
                  `}>
                    {rank}
                  </div>

                  {/* Photo */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-gray-800">
                    {candidate.photo_url ? (
                      <Image
                        src={candidate.photo_url}
                        alt={candidate.candidate_name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="h-12 w-12 text-gray-500" />
                      </div>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-4xl font-bold text-white truncate">
                      {candidate.candidate_name}
                    </h3>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-12">
                    {/* Percentage Bar */}
                    <div className="w-80">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-semibold text-blue-200">Pousantaj</span>
                        <span className="text-4xl font-bold text-white">
                          {candidate.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-6 bg-black/30 rounded-full overflow-hidden">
                        <div
                          className={`
                            h-full rounded-full transition-all duration-500
                            ${isTopThree 
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            }
                          `}
                          style={{ width: `${Math.min(candidate.percentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Vote Count */}
                    <div className="text-right min-w-[200px]">
                      <div className="text-2xl text-blue-200 font-semibold mb-1">Vòt</div>
                      <div className="text-5xl font-bold text-white">
                        {formatNumber(candidate.total_votes)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t-4 border-blue-500 p-6">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-blue-400" />
            <p className="text-2xl text-blue-200">
              Rezilta yo ap mete ajou chak 5 segonn
            </p>
          </div>
          
          <div className="text-2xl text-blue-200">
            <span className="font-bold text-blue-400">www.haitivote.org</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
