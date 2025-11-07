/**
 * Real-Time Leaderboard Page
 * Shows top 3 candidates with live updates
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Users, Medal, ArrowUp } from 'lucide-react';

interface LeaderboardCandidate {
  id: number;
  name: string;
  photo_url: string;
  total_votes: number;
  percentage: number;
  rank: number;
}

export default function LeaderboardPage() {
  const [candidates, setCandidates] = React.useState<LeaderboardCandidate[]>([]);
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());

  const fetchLeaderboard = React.useCallback(async () => {
    try {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      
      // Get top 3 candidates
      const top3 = data.aggregates
        .sort((a: any, b: any) => b.total_votes - a.total_votes)
        .slice(0, 3)
        .map((candidate: any, index: number) => ({
          id: candidate.candidate_id,
          name: candidate.candidate_name,
          photo_url: candidate.photo_url || '',
          total_votes: candidate.total_votes,
          percentage: candidate.percentage,
          rank: index + 1,
        }));

      setCandidates(top3);
      setTotalVotes(data.totalVotes);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  }, []);

  // Initial fetch
  React.useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Auto-refresh every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-blue-400 to-purple-600';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-12 w-12 text-yellow-500" />;
      case 2:
        return <Medal className="h-10 w-10 text-gray-500" />;
      case 3:
        return <Medal className="h-10 w-10 text-orange-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 animate-pulse">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <p className="text-white text-xl font-semibold">Chajman Klasman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="border-b-2 border-white/20 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="text-2xl">🇭🇹</div>
              <span className="text-2xl font-bold text-white">
                HaitiVote
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/80">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {totalVotes.toLocaleString()} vòt total
                </span>
              </div>
              <Link
                href="/"
                className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-all"
              >
                Vote kounye a
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Trophy className="h-6 w-6 text-yellow-400 animate-pulse" />
            <span className="text-white font-bold text-lg">KLASMAN AN TAN REYÈL</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Top 3 Kandida
          </h1>
          
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Kandida yo ki gen plis vòt an tan reyèl
          </p>

          {/* Last Update */}
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <TrendingUp className="h-4 w-4 animate-pulse" />
            <span>
              Mizajou: {lastUpdate.toLocaleTimeString('fr-HT', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="max-w-5xl mx-auto space-y-6">
          {candidates.map((candidate, index) => (
            <Card
              key={candidate.id}
              className={`
                relative overflow-hidden border-2 shadow-2xl
                transform transition-all duration-500 hover:scale-105
                ${candidate.rank === 1 ? 'border-yellow-400 scale-110' : 'border-white/20'}
              `}
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s`,
              }}
            >
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div
                  className={`
                    flex items-center justify-center
                    w-16 h-16 rounded-full
                    bg-gradient-to-br ${getRankColor(candidate.rank)}
                    shadow-xl border-4 border-white
                  `}
                >
                  {getRankIcon(candidate.rank)}
                </div>
              </div>

              {/* Background Gradient */}
              <div
                className={`
                  absolute inset-0 opacity-10
                  bg-gradient-to-r ${getRankColor(candidate.rank)}
                `}
              />

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-8">
                  {/* Candidate Photo */}
                  <div className="relative">
                    {candidate.photo_url ? (
                      <img
                        src={candidate.photo_url}
                        alt={candidate.name}
                        className={`
                          w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover
                          border-4 shadow-2xl
                          ${candidate.rank === 1 ? 'border-yellow-400' : 'border-white/50'}
                        `}
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white/50">
                        <span className="text-4xl font-bold text-white">
                          {candidate.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                          {candidate.name}
                        </h2>
                        {candidate.rank === 1 && (
                          <ArrowUp className="h-8 w-8 text-green-600 animate-bounce" />
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          <span className="text-xl font-bold">
                            {candidate.total_votes.toLocaleString()} vòt
                          </span>
                        </div>
                        <div className={`
                          text-2xl font-bold
                          ${candidate.rank === 1 ? 'text-yellow-600' : 'text-gray-700'}
                        `}>
                          {candidate.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`
                          absolute inset-y-0 left-0
                          bg-gradient-to-r ${getRankColor(candidate.rank)}
                          transition-all duration-1000 ease-out
                          shadow-lg
                        `}
                        style={{ width: `${candidate.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <Trophy className="h-6 w-6" />
            Vote pou kandida w
            <ArrowUp className="h-5 w-5" />
          </Link>
        </div>
      </main>

      {/* Auto-refresh indicator */}
      <div className="fixed bottom-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Mizajou otomatik chak 5 segonn
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
