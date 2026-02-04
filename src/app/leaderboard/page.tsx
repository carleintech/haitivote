/**
 * Complete Leaderboard Page - Presidential Grade
 * Enterprise-level top 3 podium + full rankings with real-time updates
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LiveIndicator } from '@/components/LiveIndicator';
import { RefreshButton } from '@/components/RefreshButton';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { formatNumber } from '@/lib/utils';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Users,
  BarChart3,
  ChevronRight,
  Flame,
  Crown,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface RankedCandidate {
  id: number;
  name: string;
  slug: string;
  photo_url: string;
  total_votes: number;
  percentage: number;
  rank: number;
  previousRank?: number;
}

export default function LeaderboardPage() {
  const { aggregates, totalVotes, loading, refetch, isLive } = useVoteStats(true);
  const [rankedCandidates, setRankedCandidates] = React.useState<RankedCandidate[]>([]);
  const [previousRanks, setPreviousRanks] = React.useState<Map<number, number>>(new Map());

  // Calculate ranks and track changes
  React.useEffect(() => {
    if (aggregates.length > 0) {
      const sorted = [...aggregates]
        .sort((a, b) => b.total_votes - a.total_votes)
        .map((candidate, index) => ({
          id: candidate.candidate_id,
          name: candidate.candidate_name,
          slug: candidate.candidate_slug,
          photo_url: candidate.photo_url,
          total_votes: candidate.total_votes,
          percentage: candidate.percentage,
          rank: index + 1,
          previousRank: previousRanks.get(candidate.candidate_id),
        }));

      // Update previous ranks
      const newPreviousRanks = new Map<number, number>();
      sorted.forEach((c) => {
        newPreviousRanks.set(c.id, c.rank);
      });
      setPreviousRanks(newPreviousRanks);

      setRankedCandidates(sorted);
    }
  }, [aggregates]);

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-orange-600';
    return 'bg-gradient-to-br from-blue-500 to-purple-600';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankChange = (candidate: RankedCandidate) => {
    if (!candidate.previousRank) return null;
    const change = candidate.previousRank - candidate.rank;
    
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/20 ring-1 ring-emerald-400/50">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-black text-emerald-300">+{change}</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/20 ring-1 ring-red-400/50">
          <TrendingDown className="h-5 w-5 text-red-400" />
          <span className="text-sm font-black text-red-300">{change}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-500/20 ring-1 ring-gray-400/50">
        <Minus className="h-5 w-5 text-gray-400" />
      </div>
    );
  };

  const top3 = rankedCandidates.slice(0, 3);
  const remaining = rankedCandidates.slice(3);

  if (loading && rankedCandidates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 animate-pulse shadow-2xl">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <p className="text-2xl font-black text-white">Chajman Klasman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                🇭🇹
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  HaitiVote
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Klasman Jeneral
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 ring-1 ring-white/20 backdrop-blur">
                <LiveIndicator isLive={isLive} />
                <RefreshButton onRefresh={refetch} loading={loading} />
              </div>
              <Link href="/">
                <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-white ring-1 ring-white/20 backdrop-blur hover:scale-105 transition-all duration-300">
                  Vote Kounye a
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-12">
        
        {/* Hero Title Section */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-400/30 backdrop-blur-xl ring-1 ring-white/10">
            <Trophy className="h-6 w-6 text-yellow-400 animate-pulse" />
            <span className="font-black text-lg bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              KLASMAN OFISYÈL
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Klasman Jeneral
          </h1>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-xl">
            <Users className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-black text-white">
              {formatNumber(totalVotes)} Vòt Total
            </span>
          </div>
        </div>

        {/* Top 3 Podium */}
        {top3.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-10">
              <Crown className="h-8 w-8 text-yellow-400" />
              <h2 className="text-4xl font-black text-white">Top 3 Kandida</h2>
              <Sparkles className="h-7 w-7 text-pink-400 animate-pulse" />
            </div>

            {/* Podium Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
              
              {/* 2nd Place */}
              {top3[1] && (
                <div className="md:order-1 transform md:translate-y-12">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                    <div className="relative rounded-3xl bg-slate-900/90 p-8 ring-2 ring-gray-400 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-2xl">
                      <div className="text-center space-y-5">
                        <div className="text-6xl animate-bounce">{getRankIcon(2)}</div>
                        <div className="relative inline-block">
                          {top3[1].photo_url ? (
                            <Image
                              src={top3[1].photo_url}
                              alt={top3[1].name}
                              width={140}
                              height={140}
                              className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-400/50 shadow-xl ring-4 ring-gray-400/20"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center border-4 border-gray-400">
                              <span className="text-4xl font-black text-white">
                                {top3[1].name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 ring-2 ring-gray-300 shadow-lg">
                            <span className="text-sm font-black text-white">#2</span>
                          </div>
                        </div>
                        <h3 className="font-black text-2xl text-white mt-4">{top3[1].name}</h3>
                        <div className="space-y-3">
                          <p className="text-4xl font-black text-white">{formatNumber(top3[1].total_votes)}</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                            {top3[1].percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Place - CHAMPION */}
              {top3[0] && (
                <div className="md:order-2">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
                    <div className="relative rounded-3xl bg-gradient-to-br from-yellow-500/30 to-amber-600/30 backdrop-blur-xl p-10 ring-4 ring-yellow-400 hover:scale-110 transition-all duration-300 shadow-2xl">
                      <div className="text-center space-y-6">
                        <div className="text-7xl animate-bounce drop-shadow-2xl">{getRankIcon(1)}</div>
                        <div className="relative inline-block">
                          {top3[0].photo_url ? (
                            <Image
                              src={top3[0].photo_url}
                              alt={top3[0].name}
                              width={180}
                              height={180}
                              className="w-44 h-44 rounded-3xl object-cover border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-400/50"
                            />
                          ) : (
                            <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center border-4 border-yellow-400 shadow-2xl">
                              <span className="text-5xl font-black text-white">
                                {top3[0].name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute -top-4 -right-4">
                            <Crown className="h-12 w-12 text-yellow-300 drop-shadow-lg animate-pulse" />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 ring-2 ring-yellow-300 shadow-2xl">
                            <span className="text-base font-black text-white">#1 LIDÈ</span>
                          </div>
                        </div>
                        <h3 className="font-black text-3xl text-white drop-shadow-lg mt-6">{top3[0].name}</h3>
                        <div className="space-y-3">
                          <p className="text-5xl font-black text-white drop-shadow-2xl">{formatNumber(top3[0].total_votes)}</p>
                          <p className="text-2xl font-black text-yellow-200 drop-shadow">
                            {top3[0].percentage.toFixed(1)}%
                          </p>
                        </div>
                        <Link href={`/candidate/${top3[0].slug}/stats`}>
                          <Button className="w-full bg-white/20 hover:bg-white/30 text-white ring-1 ring-white/30 backdrop-blur rounded-xl py-3 font-black">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Wè Detay
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {top3[2] && (
                <div className="md:order-3 transform md:translate-y-12">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                    <div className="relative rounded-3xl bg-slate-900/90 p-8 ring-2 ring-amber-600 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-2xl">
                      <div className="text-center space-y-5">
                        <div className="text-6xl animate-bounce">{getRankIcon(3)}</div>
                        <div className="relative inline-block">
                          {top3[2].photo_url ? (
                            <Image
                              src={top3[2].photo_url}
                              alt={top3[2].name}
                              width={140}
                              height={140}
                              className="w-32 h-32 rounded-2xl object-cover border-4 border-amber-600/50 shadow-xl ring-4 ring-amber-600/20"
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center border-4 border-amber-600">
                              <span className="text-4xl font-black text-white">
                                {top3[2].name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 ring-2 ring-amber-500 shadow-lg">
                            <span className="text-sm font-black text-white">#3</span>
                          </div>
                        </div>
                        <h3 className="font-black text-2xl text-white mt-4">{top3[2].name}</h3>
                        <div className="space-y-3">
                          <p className="text-4xl font-black text-white">{formatNumber(top3[2].total_votes)}</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            {top3[2].percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Challenge Button */}
            {top3.length >= 2 && (
              <div className="text-center">
                <Link href="/challenge">
                  <Button size="lg" className="rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white shadow-2xl px-8 py-4 text-lg font-black hover:scale-105 transition-all duration-300">
                    <Flame className="h-6 w-6 mr-3 animate-pulse" />
                    Batay: {top3[0].name} vs {top3[1].name}
                    <Zap className="h-6 w-6 ml-3" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Full Rankings */}
        {remaining.length > 0 && (
          <div className="space-y-4 max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <h2 className="text-4xl font-black text-white">Tout Lòt Kandida</h2>
            </div>

            {remaining.map((candidate) => (
              <Link key={candidate.id} href={`/candidate/${candidate.slug}/stats`}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/10 backdrop-blur-xl hover:ring-2 hover:ring-blue-400/50 transition-all cursor-pointer shadow-xl">
                    <div className="flex items-center gap-6">
                      
                      {/* Rank Badge */}
                      <div className={`shrink-0 w-16 h-16 rounded-2xl ${getRankBadgeColor(candidate.rank)} flex items-center justify-center shadow-xl ring-2 ring-white/20`}>
                        <span className="text-2xl font-black text-white">#{candidate.rank}</span>
                      </div>

                      {/* Photo */}
                      <div className="relative shrink-0">
                        {candidate.photo_url ? (
                          <Image
                            src={candidate.photo_url}
                            alt={candidate.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-white/20 group-hover:border-blue-400/50 transition-colors shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white/20 shadow-lg">
                            <span className="text-2xl font-black text-white">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-2xl font-black text-white truncate group-hover:text-blue-300 transition-colors">
                              {candidate.name}
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-gray-300 font-bold text-lg">
                                {formatNumber(candidate.total_votes)} vòt
                              </span>
                              <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {candidate.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {getRankChange(candidate)}
                            <ChevronRight className="h-7 w-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(candidate.percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-3xl bg-slate-900/70 p-8 ring-1 ring-blue-400/30 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center ring-2 ring-blue-400/50 shadow-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-black text-white">{formatNumber(totalVotes)}</p>
              <p className="text-gray-300 font-bold">Total Vòt</p>
            </div>
          </div>
          
          <div className="rounded-3xl bg-slate-900/70 p-8 ring-1 ring-yellow-400/30 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center ring-2 ring-yellow-400/50 shadow-xl">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-black text-white">{rankedCandidates.length}</p>
              <p className="text-gray-300 font-bold">Kandida Total</p>
            </div>
          </div>
          
          <div className="rounded-3xl bg-slate-900/70 p-8 ring-1 ring-emerald-400/30 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center ring-2 ring-emerald-400/50 shadow-xl">
                <Zap className="h-8 w-8 text-white animate-pulse" />
              </div>
              <p className="text-4xl font-black text-white">LIVE</p>
              <p className="text-gray-300 font-bold">Mizajou Tan Reyèl</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
