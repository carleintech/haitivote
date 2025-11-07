/**
 * Complete Leaderboard Page - ALL Candidates
 * Top 3 podium + full rankings with real-time updates
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
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs font-bold">+{change}</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <TrendingDown className="h-4 w-4" />
          <span className="text-xs font-bold">{change}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <Minus className="h-4 w-4" />
      </div>
    );
  };

  const top3 = rankedCandidates.slice(0, 3);
  const remaining = rankedCandidates.slice(3);

  if (loading && rankedCandidates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#006CFF] to-[#7F00FF] animate-pulse">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Chajman Klasman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="text-2xl">🇭🇹</div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
                HaitiVote
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <LiveIndicator isLive={isLive} />
              <RefreshButton onRefresh={refetch} loading={loading} />
              <Link href="/">
                <Button className="bg-gradient-to-r from-[#006CFF] to-[#7F00FF] text-white">
                  Vote Kounye a
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#006CFF]/10 to-[#7F00FF]/10 border-2 border-[#006CFF]/20">
            <Trophy className="h-6 w-6 text-yellow-500 animate-pulse" />
            <span className="font-bold text-lg bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
              KLASMAN KONPLÈ
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
            Klasman Jeneral
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="text-xl font-semibold">
              {formatNumber(totalVotes)} Vòt Total
            </span>
          </div>
        </div>

        {/* Top 3 Podium */}
        {top3.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Award className="h-6 w-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Top 3 Kandida</h2>
            </div>

            {/* Podium Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              {/* 2nd Place */}
              {top3[1] && (
                <div className="md:order-1 transform md:translate-y-8">
                  <Card className="border-2 border-gray-300 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="text-5xl">{getRankIcon(2)}</div>
                      <div className="relative inline-block">
                        {top3[1].photo_url ? (
                          <Image
                            src={top3[1].photo_url}
                            alt={top3[1].name}
                            width={120}
                            height={120}
                            className="w-28 h-28 rounded-full object-cover border-4 border-gray-400 shadow-lg"
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center border-4 border-gray-400">
                            <span className="text-3xl font-bold text-white">
                              {top3[1].name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white">
                          #2
                        </Badge>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">{top3[1].name}</h3>
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-gray-700">{formatNumber(top3[1].total_votes)}</p>
                        <p className="text-lg font-semibold text-gray-600">{top3[1].percentage.toFixed(1)}%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* 1st Place */}
              {top3[0] && (
                <div className="md:order-2">
                  <Card className="border-4 border-yellow-400 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-amber-50">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="text-6xl animate-bounce">{getRankIcon(1)}</div>
                      <div className="relative inline-block">
                        {top3[0].photo_url ? (
                          <Image
                            src={top3[0].photo_url}
                            alt={top3[0].name}
                            width={160}
                            height={160}
                            className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
                          />
                        ) : (
                          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-yellow-400">
                            <span className="text-4xl font-bold text-white">
                              {top3[0].name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-base">
                          #1 LIDÈ
                        </Badge>
                      </div>
                      <h3 className="font-bold text-2xl text-gray-900">{top3[0].name}</h3>
                      <div className="space-y-2">
                        <p className="text-4xl font-bold text-yellow-600">{formatNumber(top3[0].total_votes)}</p>
                        <p className="text-xl font-bold text-yellow-700">{top3[0].percentage.toFixed(1)}%</p>
                      </div>
                      <Link href={`/candidate/${top3[0].slug}/stats`}>
                        <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:opacity-90 text-white">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Wè Detay
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* 3rd Place */}
              {top3[2] && (
                <div className="md:order-3 transform md:translate-y-8">
                  <Card className="border-2 border-orange-400 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="text-5xl">{getRankIcon(3)}</div>
                      <div className="relative inline-block">
                        {top3[2].photo_url ? (
                          <Image
                            src={top3[2].photo_url}
                            alt={top3[2].name}
                            width={120}
                            height={120}
                            className="w-28 h-28 rounded-full object-cover border-4 border-orange-400 shadow-lg"
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-orange-400">
                            <span className="text-3xl font-bold text-white">
                              {top3[2].name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                          #3
                        </Badge>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">{top3[2].name}</h3>
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-orange-700">{formatNumber(top3[2].total_votes)}</p>
                        <p className="text-lg font-semibold text-orange-600">{top3[2].percentage.toFixed(1)}%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Challenge Button */}
            {top3.length >= 2 && (
              <div className="text-center">
                <Link href="/challenge">
                  <Button size="lg" className="bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white shadow-xl">
                    <Flame className="h-5 w-5 mr-2 animate-pulse" />
                    Batay: {top3[0].name} vs {top3[1].name}
                    <Zap className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Full Rankings */}
        {remaining.length > 0 && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-[#006CFF]" />
              <h2 className="text-3xl font-bold text-gray-900">Tout Lòt Kandida</h2>
            </div>

            {remaining.map((candidate) => (
              <Link key={candidate.id} href={`/candidate/${candidate.slug}/stats`}>
                <Card className="border-2 border-gray-200 hover:border-[#006CFF] hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Rank Badge */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-full ${getRankBadgeColor(candidate.rank)} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">#{candidate.rank}</span>
                      </div>

                      {/* Photo */}
                      <div className="relative flex-shrink-0">
                        {candidate.photo_url ? (
                          <Image
                            src={candidate.photo_url}
                            alt={candidate.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-lg object-cover border-2 border-gray-300 group-hover:border-[#006CFF] transition-colors"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-300">
                            <span className="text-2xl font-bold text-white">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-[#006CFF] transition-colors">
                              {candidate.name}
                            </h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-gray-600 font-semibold">
                                {formatNumber(candidate.total_votes)} vòt
                              </span>
                              <span className="text-lg font-bold text-gray-700">
                                {candidate.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getRankChange(candidate)}
                            <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-[#006CFF] transition-colors" />
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <Progress value={candidate.percentage} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 border-[#006CFF]/30">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-[#006CFF]" />
              <p className="text-3xl font-bold text-gray-900">{formatNumber(totalVotes)}</p>
              <p className="text-gray-600 font-medium mt-1">Total Vòt</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-purple-300">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
              <p className="text-3xl font-bold text-gray-900">{rankedCandidates.length}</p>
              <p className="text-gray-600 font-medium mt-1">Kandida Total</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-green-300">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-3 text-green-600" />
              <p className="text-3xl font-bold text-gray-900">LIVE</p>
              <p className="text-gray-600 font-medium mt-1">Mizajou Tan Reyèl</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
