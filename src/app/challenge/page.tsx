/**
 * Challenge Page - Head-to-Head Battle
 * Top 2 candidates in dramatic VS layout
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LiveIndicator } from '@/components/LiveIndicator';
import { RefreshButton } from '@/components/RefreshButton';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { formatNumber } from '@/lib/utils';
import {
  Trophy,
  Flame,
  Zap,
  Users,
  TrendingUp,
  Swords,
  Target,
} from 'lucide-react';

interface BattleCandidate {
  id: number;
  name: string;
  slug: string;
  photo_url: string;
  total_votes: number;
  percentage: number;
  rank: number;
}

export default function ChallengePage() {
  const { aggregates, totalVotes, loading, refetch, isLive } = useVoteStats(true);
  const [challenger1, setChallenger1] = React.useState<BattleCandidate | null>(null);
  const [challenger2, setChallenger2] = React.useState<BattleCandidate | null>(null);
  const [voteDifference, setVoteDifference] = React.useState(0);
  const [percentageDifference, setPercentageDifference] = React.useState(0);

  // Get top 2 candidates
  React.useEffect(() => {
    if (aggregates.length >= 2) {
      const sorted = [...aggregates]
        .sort((a, b) => b.total_votes - a.total_votes)
        .slice(0, 2);

      const c1: BattleCandidate = {
        id: sorted[0].candidate_id,
        name: sorted[0].candidate_name,
        slug: sorted[0].candidate_slug,
        photo_url: sorted[0].photo_url,
        total_votes: sorted[0].total_votes,
        percentage: sorted[0].percentage,
        rank: 1,
      };

      const c2: BattleCandidate = {
        id: sorted[1].candidate_id,
        name: sorted[1].candidate_name,
        slug: sorted[1].candidate_slug,
        photo_url: sorted[1].photo_url,
        total_votes: sorted[1].total_votes,
        percentage: sorted[1].percentage,
        rank: 2,
      };

      setChallenger1(c1);
      setChallenger2(c2);
      setVoteDifference(c1.total_votes - c2.total_votes);
      setPercentageDifference(c1.percentage - c2.percentage);
    }
  }, [aggregates]);

  const getHeatLevel = () => {
    if (percentageDifference < 1) return { level: 'EKSPLOZIF', icon: '🔥🔥🔥', color: 'text-red-600' };
    if (percentageDifference < 3) return { level: 'TRÈ CHOFE', icon: '🔥🔥', color: 'text-orange-600' };
    if (percentageDifference < 5) return { level: 'CHOFE', icon: '🔥', color: 'text-orange-500' };
    return { level: 'MODERE', icon: '⚡', color: 'text-yellow-600' };
  };

  const heat = getHeatLevel();

  if (loading && !challenger1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 animate-pulse">
            <Swords className="h-10 w-10 text-white" />
          </div>
          <p className="text-xl font-semibold text-white">Prepare Batay...</p>
        </div>
      </div>
    );
  }

  if (!challenger1 || !challenger2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <Swords className="h-16 w-16 mx-auto text-gray-400" />
            <h2 className="text-2xl font-bold">Pa Gen Ase Kandida</h2>
            <p className="text-gray-600">Nou bezwen omwen 2 kandida pou kreye yon batay.</p>
            <Link href="/">
              <Button>Retounen Lakay</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate battle bar percentages
  const totalBattleVotes = challenger1.total_votes + challenger2.total_votes;
  const c1BattlePercentage = (challenger1.total_votes / totalBattleVotes) * 100;
  const c2BattlePercentage = (challenger2.total_votes / totalBattleVotes) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
      </div>

      {/* Lightning effects */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/50 via-transparent to-transparent animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/50 via-transparent to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      {/* Header */}
      <header className="relative border-b border-white/20 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="text-2xl">🇭🇹</div>
              <span className="text-2xl font-bold text-white">
                HaitiVote
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <LiveIndicator isLive={isLive} />
              <RefreshButton onRefresh={refetch} loading={loading} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 backdrop-blur-sm border-2 border-red-400/50">
            <Flame className="h-6 w-6 text-red-400 animate-pulse" />
            <span className="font-bold text-lg text-white">BATAY TÈT A TÈT</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            DEFI FINAL
          </h1>
          
          <div className={`text-3xl font-bold ${heat.color} drop-shadow-lg animate-pulse`}>
            {heat.icon} {heat.level}
          </div>

          <p className="text-xl text-blue-200">
            2 kandida pi popilè yo nan konfwontasyon direktè
          </p>
        </div>

        {/* Battle Arena */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Candidates Face-Off */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Challenger 1 */}
            <Link href={`/candidate/${challenger1.slug}/stats`}>
              <Card className="group border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transition-all cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <Badge className="bg-yellow-500 text-white text-lg px-4 py-1">
                    <Trophy className="h-4 w-4 mr-1 inline" />
                    #1 LIDÈ
                  </Badge>
                  
                  <div className="relative inline-block">
                    {challenger1.photo_url ? (
                      <Image
                        src={challenger1.photo_url}
                        alt={challenger1.name}
                        width={200}
                        height={200}
                        className="w-48 h-48 rounded-2xl object-cover border-4 border-yellow-400 shadow-2xl"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-yellow-400">
                        <span className="text-6xl font-bold text-white">
                          {challenger1.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      🥇
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mt-6">
                    {challenger1.name}
                  </h2>
                  
                  <div className="space-y-2">
                    <p className="text-5xl font-bold text-yellow-600">
                      {formatNumber(challenger1.total_votes)}
                    </p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {challenger1.percentage.toFixed(2)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* VS Section */}
            <div className="text-center space-y-6 py-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-purple-600 animate-pulse opacity-50 blur-xl"></div>
                </div>
                <div className="relative bg-gradient-to-br from-red-500 to-purple-600 w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <Swords className="h-16 w-16 text-white animate-pulse" />
                </div>
              </div>

              <div className="text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                VS
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 space-y-3">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Target className="h-5 w-5" />
                  <span className="font-semibold">Diferans</span>
                </div>
                <p className="text-3xl font-bold text-yellow-400">
                  {formatNumber(voteDifference)}
                </p>
                <p className="text-xl font-bold text-yellow-300">
                  {percentageDifference.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Challenger 2 */}
            <Link href={`/candidate/${challenger2.slug}/stats`}>
              <Card className="group border-4 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-200 shadow-2xl hover:shadow-gray-400/50 hover:scale-105 transition-all cursor-pointer">
                <CardContent className="p-8 text-center space-y-4">
                  <Badge className="bg-gray-500 text-white text-lg px-4 py-1">
                    <TrendingUp className="h-4 w-4 mr-1 inline" />
                    #2 CHALANJÈ
                  </Badge>
                  
                  <div className="relative inline-block">
                    {challenger2.photo_url ? (
                      <Image
                        src={challenger2.photo_url}
                        alt={challenger2.name}
                        width={200}
                        height={200}
                        className="w-48 h-48 rounded-2xl object-cover border-4 border-gray-400 shadow-2xl"
                      />
                    ) : (
                      <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center border-4 border-gray-400">
                        <span className="text-6xl font-bold text-white">
                          {challenger2.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      🥈
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mt-6">
                    {challenger2.name}
                  </h2>
                  
                  <div className="space-y-2">
                    <p className="text-5xl font-bold text-gray-600">
                      {formatNumber(challenger2.total_votes)}
                    </p>
                    <p className="text-2xl font-bold text-gray-700">
                      {challenger2.percentage.toFixed(2)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Battle Bar */}
          <Card className="border-4 border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Distribisyon Vòt</h3>
                <p className="text-blue-200">Ant 2 kandida prensipal yo</p>
              </div>

              {/* Animated Battle Bar */}
              <div className="relative h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-inner">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-end pr-4 transition-all duration-1000 ease-out"
                  style={{ width: `${c1BattlePercentage}%` }}
                >
                  {c1BattlePercentage > 20 && (
                    <span className="font-bold text-xl text-white drop-shadow-lg">
                      {c1BattlePercentage.toFixed(1)}%
                    </span>
                  )}
                </div>
                <div
                  className="absolute inset-y-0 right-0 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-start pl-4 transition-all duration-1000 ease-out"
                  style={{ width: `${c2BattlePercentage}%` }}
                >
                  {c2BattlePercentage > 20 && (
                    <span className="font-bold text-xl text-white drop-shadow-lg">
                      {c2BattlePercentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-yellow-500/20 border border-yellow-400/50">
                  <p className="text-yellow-200 text-sm mb-1">{challenger1.name}</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {formatNumber(challenger1.total_votes)}
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gray-500/20 border border-gray-400/50">
                  <p className="text-gray-200 text-sm mb-1">{challenger2.name}</p>
                  <p className="text-3xl font-bold text-gray-300">
                    {formatNumber(challenger2.total_votes)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-blue-400" />
                <p className="text-3xl font-bold text-white">{formatNumber(totalBattleVotes)}</p>
                <p className="text-blue-200 font-medium mt-1">Vòt Total (2 Kandida)</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Flame className="h-12 w-12 mx-auto mb-3 text-red-400 animate-pulse" />
                <p className="text-3xl font-bold text-white">{heat.icon}</p>
                <p className="text-red-200 font-medium mt-1">Nivo Konpetisyon</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 mx-auto mb-3 text-yellow-400" />
                <p className="text-3xl font-bold text-white">LIVE</p>
                <p className="text-yellow-200 font-medium mt-1">Mizajou Tan Reyèl</p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4 py-8">
            <p className="text-2xl font-bold text-white">
              Ki moun ki pral genyen?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-[#006CFF] to-[#7F00FF] hover:opacity-90 text-white shadow-xl">
                  <Trophy className="h-5 w-5 mr-2" />
                  Vote Kounye a
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  Wè Klasman Konplè
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
