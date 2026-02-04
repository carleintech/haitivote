/**
 * Live Dashboard Page - Presidential Grade
 * Enterprise-level real-time voting analytics
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { LiveChart } from '@/components/LiveChart';
import { LiveTicker } from '@/components/LiveTicker';
import { CountryBreakdown } from '@/components/CountryBreakdown';
import { TopCandidates } from '@/components/TopCandidates';
import { LiveIndicator } from '@/components/LiveIndicator';
import { RefreshButton } from '@/components/RefreshButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Clock, 
  Home, 
  Vote,
  TrendingUp,
  Activity,
  Zap,
  Award,
  Eye,
  ArrowLeft
} from 'lucide-react';

export default function LivePage() {
  const {
    aggregates,
    byCountry,
    totalVotes,
    timestamp,
    loading,
    error,
    refetch,
    isLive,
  } = useVoteStats(true);

  // Fetch recent votes for ticker
  const [recentVotes, setRecentVotes] = React.useState<any[]>([]);
  const [loadingRecent, setLoadingRecent] = React.useState(true);

  const fetchRecentVotes = React.useCallback(async () => {
    try {
      const response = await fetch('/api/activity/recent');
      if (!response.ok) throw new Error('Failed to fetch recent votes');
      
      const data = await response.json();
      setRecentVotes(data.activities?.slice(0, 20) || []);
    } catch (error) {
      console.error('Error fetching recent votes:', error);
      setRecentVotes([]);
    } finally {
      setLoadingRecent(false);
    }
  }, []);

  React.useEffect(() => {
    fetchRecentVotes();
    const interval = setInterval(fetchRecentVotes, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [fetchRecentVotes]);

  // Transform aggregates to candidate rankings
  const candidateRankings = React.useMemo(() => {
    return aggregates.map((agg) => ({
      id: agg.candidate_id,
      name: agg.candidate_name,
      photo_url: agg.photo_url,
      party: null,
      votes: agg.total_votes,
      percentage: agg.percentage,
    }));
  }, [aggregates]);

  // Transform by country data
  const countryBreakdown = React.useMemo(() => {
    const countryMap = new Map<string, { country: string; flag: string; totalVotes: number; candidates: any[] }>();
    
    byCountry.forEach((item) => {
      if (!countryMap.has(item.country)) {
        countryMap.set(item.country, {
          country: item.country,
          flag: '🌍',
          totalVotes: 0,
          candidates: [],
        });
      }
      
      const countryData = countryMap.get(item.country)!;
      countryData.totalVotes += item.total_votes;
      
      const candidateInAggregate = aggregates.find(a => a.candidate_name === item.candidate_name);
      countryData.candidates.push({
        id: candidateInAggregate?.candidate_id || 0,
        name: item.candidate_name,
        votes: item.total_votes,
        percentage: countryData.totalVotes > 0 ? (item.total_votes / countryData.totalVotes) * 100 : 0,
      });
    });

    return Array.from(countryMap.values());
  }, [byCountry, aggregates]);

  const stats = React.useMemo(() => ({
    totalVotes,
    activeCandidates: aggregates.length,
    countriesParticipating: new Set(byCountry.map(c => c.country)).size,
  }), [totalVotes, aggregates.length, byCountry]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Erè nan chajman done yo: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                🇭🇹
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  HaitiVote LIVE
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Dashboard an Tan Reyèl
                </span>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button className="rounded-xl bg-white/10 px-5 py-2.5 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retounen
                </Button>
              </Link>
              <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 ring-1 ring-white/20 backdrop-blur">
                <LiveIndicator isLive={isLive} />
                <RefreshButton onRefresh={refetch} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Ticker */}
      {!loadingRecent && recentVotes.length > 0 && (
        <div className="relative z-10">
          <LiveTicker 
            items={recentVotes.map(vote => ({
              id: vote.id,
              candidateName: vote.candidate_name,
              country: vote.country,
              timestamp: vote.timestamp,
            }))} 
          />
        </div>
      )}

      {/* Main Dashboard */}
      <main className="relative container mx-auto px-6 py-12 space-y-8">
        
        {/* Hero Stats Grid - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl bg-white/10" />
              ))}
            </>
          ) : (
            <>
              {/* Total Votes */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/90 to-cyan-600/90 p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur ring-1 ring-white/30">
                      <BarChart3 className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-300">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-bold">LIVE</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-100 font-semibold mb-1">Total Vòt</p>
                  <p className="text-4xl font-black text-white drop-shadow-lg">
                    {stats?.totalVotes.toLocaleString() || '0'}
                  </p>
                </div>
              </div>

              {/* Active Candidates */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/90 to-pink-600/90 p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur ring-1 ring-white/30">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <Award className="h-5 w-5 text-purple-200" />
                  </div>
                  <p className="text-sm text-purple-100 font-semibold mb-1">Kandida Aktif</p>
                  <p className="text-4xl font-black text-white drop-shadow-lg">
                    {stats?.activeCandidates || 0}
                  </p>
                </div>
              </div>

              {/* Countries */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/90 to-teal-600/90 p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur ring-1 ring-white/30">
                      <Globe className="h-7 w-7 text-white" />
                    </div>
                    <Eye className="h-5 w-5 text-emerald-200" />
                  </div>
                  <p className="text-sm text-emerald-100 font-semibold mb-1">Peyi Patisipe</p>
                  <p className="text-4xl font-black text-white drop-shadow-lg">
                    {stats?.countriesParticipating || 0}
                  </p>
                </div>
              </div>

              {/* Last Update */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/90 to-red-600/90 p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur ring-1 ring-white/30">
                      <Clock className="h-7 w-7 text-white" />
                    </div>
                    <Activity className="h-5 w-5 text-orange-200 animate-pulse" />
                  </div>
                  <p className="text-sm text-orange-100 font-semibold mb-1">Dènye Mizajou</p>
                  <p className="text-3xl font-black text-white drop-shadow-lg">
                    {timestamp
                      ? new Date(timestamp).toLocaleTimeString('fr-HT', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '--:--'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Podium - Top 3 Winners */}
        {!loading && candidateRankings.length >= 3 && (
          <div className="relative">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Top 3 Kandida
              </h2>
              <p className="text-gray-400 text-sm font-medium">Klasman aktyèl an tan reyèl</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* 2nd Place */}
              <div className="md:order-1 order-2 transform md:translate-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 ring-2 ring-gray-400 backdrop-blur-xl hover:scale-105 transition-all duration-300">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 text-5xl shadow-2xl">
                        🥈
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-black text-white">{candidateRankings[1].name}</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                          {candidateRankings[1].percentage.toFixed(1)}%
                        </p>
                        <p className="text-lg text-gray-400 font-bold">
                          {candidateRankings[1].votes.toLocaleString()} vòt
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1st Place - Champion */}
              <div className="md:order-2 order-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse" />
                  <div className="relative rounded-3xl bg-gradient-to-br from-yellow-500/90 to-amber-600/90 p-10 ring-4 ring-yellow-400 backdrop-blur-xl hover:scale-110 transition-all duration-300 shadow-2xl">
                    <div className="text-center space-y-5">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 text-6xl shadow-2xl animate-bounce">
                        🏆
                      </div>
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur">
                          <Zap className="h-4 w-4 text-yellow-200" />
                          <span className="text-xs font-black text-yellow-100">AN TÈT</span>
                        </div>
                        <p className="text-3xl font-black text-white drop-shadow-lg">{candidateRankings[0].name}</p>
                        <p className="text-6xl font-black text-white drop-shadow-2xl">
                          {candidateRankings[0].percentage.toFixed(1)}%
                        </p>
                        <p className="text-xl text-yellow-100 font-black drop-shadow">
                          {candidateRankings[0].votes.toLocaleString()} vòt
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="md:order-3 order-3 transform md:translate-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative rounded-3xl bg-gradient-to-br from-amber-900/90 to-orange-900/90 p-8 ring-2 ring-amber-600 backdrop-blur-xl hover:scale-105 transition-all duration-300">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-5xl shadow-2xl">
                        🥉
                      </div>
                      <div className="space-y-2">
                        <p className="text-2xl font-black text-white">{candidateRankings[2].name}</p>
                        <p className="text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                          {candidateRankings[2].percentage.toFixed(1)}%
                        </p>
                        <p className="text-lg text-amber-300 font-bold">
                          {candidateRankings[2].votes.toLocaleString()} vòt
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart Section */}
        {loading ? (
          <Skeleton className="h-[500px] rounded-3xl bg-white/10" />
        ) : candidateRankings.length > 0 ? (
          <div className="rounded-3xl bg-slate-900/50 p-8 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">Distribisyon Vòt</h2>
                <p className="text-sm text-gray-400 font-medium">Konparezon grafik tout kandida yo</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 ring-1 ring-green-500/50">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold text-green-300">LIVE DATA</span>
              </div>
            </div>
            <LiveChart
              data={candidateRankings.map((c: any) => ({
                id: c.id,
                name: c.name,
                votes: c.votes,
                percentage: c.percentage,
              }))}
            />
          </div>
        ) : (
          <Alert className="rounded-3xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-xl">
            <AlertDescription className="text-gray-300 text-center py-8 text-xl font-semibold">
              Pa gen done pou afiche ankò
            </AlertDescription>
          </Alert>
        )}

        {/* Two Column Data Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Top Candidates Detailed */}
          {loading ? (
            <Skeleton className="h-[500px] rounded-3xl bg-white/10" />
          ) : candidateRankings.length > 0 ? (
            <div className="rounded-3xl bg-slate-900/50 p-8 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white mb-1">Tout Kandida</h2>
                <p className="text-sm text-gray-400 font-medium">Klasman konplè ak detay</p>
              </div>
              <TopCandidates candidates={candidateRankings} />
            </div>
          ) : null}

          {/* Country Breakdown */}
          {loading ? (
            <Skeleton className="h-[500px] rounded-3xl bg-white/10" />
          ) : countryBreakdown.length > 0 ? (
            <div className="rounded-3xl bg-slate-900/50 p-8 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-white mb-1">Vòt pa Peyi</h2>
                <p className="text-sm text-gray-400 font-medium">Distribisyon jewografik</p>
              </div>
              <CountryBreakdown data={countryBreakdown} />
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <footer className="rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-10 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl mt-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="text-5xl mb-4">🇭🇹</div>
            <p className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              HaitiVote
            </p>
            <p className="text-xl font-bold text-white/90 italic">
              Yon Pèp. Yon Vwa. Yon Sondaj.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-2">
              <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="font-medium">Dashboard aktyalize otomatikman</span>
            </div>
            <p className="text-sm text-gray-500 pt-2">
              © {new Date().getFullYear()} HaitiVote. Tout dwa rezève. Bati ak ❤️ pou Ayiti.
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}