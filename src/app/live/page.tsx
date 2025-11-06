/**
 * Live Dashboard Page
 * Real-time voting statistics and results
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { LiveChart } from '@/components/LiveChart';
import { LiveTicker } from '@/components/LiveTicker';
import { StatsCard } from '@/components/StatsCard';
import { CountryBreakdown } from '@/components/CountryBreakdown';
import { TopCandidates } from '@/components/TopCandidates';
import { LiveIndicator } from '@/components/LiveIndicator';
import { RefreshButton } from '@/components/RefreshButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Globe, Clock, Home, Vote } from 'lucide-react';

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

  // Mock recent votes from aggregates (last 10)
  const recentVotes = React.useMemo(() => {
    return aggregates.slice(0, 10).map((agg) => ({
      id: `${agg.candidate_id}-${Date.now()}`,
      candidateName: agg.candidate_name,
      country: null,
      timestamp: timestamp,
    }));
  }, [aggregates, timestamp]);

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
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-tight">
            <span className="text-neutral-900">TechKlein</span>{" "}
            <span className="bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
              VoteLive
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/">
                <Home size={16} />
                Akèy
              </Link>
            </Button>
            <Button asChild className="gap-2 bg-gradient-to-r from-[#006CFF] to-[#7F00FF]">
              <Link href="/vote">
                <Vote size={16} />
                Vote
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Stats Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient-techklein">
                Rezilta an Tan Reyèl
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                TechKlein VoteLive – Sondaj Ayiti Global
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LiveIndicator isLive={isLive} />
              <RefreshButton onRefresh={refetch} loading={loading} />
            </div>
          </div>
        </div>
      </div>

      {/* Live Ticker */}
      {recentVotes.length > 0 && <LiveTicker items={recentVotes} />}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <StatsCard
                icon={BarChart3}
                label="Total Vòt"
                value={stats?.totalVotes.toLocaleString() || '0'}
              />
              <StatsCard
                icon={Users}
                label="Kandida Aktif"
                value={stats?.activeCandidates || 0}
              />
              <StatsCard
                icon={Globe}
                label="Peyi"
                value={stats?.countriesParticipating || 0}
              />
              <StatsCard
                icon={Clock}
                label="Dènye Mizajou"
                value={
                  timestamp
                    ? new Date(timestamp).toLocaleTimeString('fr-HT', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '--:--'
                }
              />
            </>
          )}
        </div>

        {/* Top 3 Podium */}
        {!loading && candidateRankings.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 2nd Place */}
            <div className="md:order-1 order-2">
              <div className="h-full flex flex-col justify-end">
                <div className="bg-gradient-to-br from-slate-500/20 to-slate-600/20 border-2 border-slate-400 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🥈</div>
                  <p className="font-bold text-lg">{candidateRankings[1].name}</p>
                  <p className="text-3xl font-bold text-slate-400 mt-2">
                    {candidateRankings[1].percentage.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {candidateRankings[1].votes.toLocaleString()} vòt
                  </p>
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="md:order-2 order-1">
              <div className="h-full flex flex-col justify-end">
                <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500 rounded-lg p-6 text-center transform md:scale-110">
                  <div className="text-5xl mb-2">🏆</div>
                  <p className="font-bold text-xl">{candidateRankings[0].name}</p>
                  <p className="text-4xl font-bold text-yellow-500 mt-2">
                    {candidateRankings[0].percentage.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {candidateRankings[0].votes.toLocaleString()} vòt
                  </p>
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="md:order-3 order-3">
              <div className="h-full flex flex-col justify-end">
                <div className="bg-gradient-to-br from-amber-700/20 to-amber-800/20 border-2 border-amber-600 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🥉</div>
                  <p className="font-bold text-lg">{candidateRankings[2].name}</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">
                    {candidateRankings[2].percentage.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {candidateRankings[2].votes.toLocaleString()} vòt
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chart */}
        {loading ? (
          <Skeleton className="h-[500px]" />
        ) : candidateRankings.length > 0 ? (
          <LiveChart
            data={candidateRankings.map((c: any) => ({
              id: c.id,
              name: c.name,
              votes: c.votes,
              percentage: c.percentage,
            }))}
          />
        ) : (
          <Alert>
            <AlertDescription>Pa gen done pou afiche ankò</AlertDescription>
          </Alert>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Candidates */}
          {loading ? (
            <Skeleton className="h-96" />
          ) : candidateRankings.length > 0 ? (
            <TopCandidates candidates={candidateRankings} />
          ) : null}

          {/* Country Breakdown */}
          {loading ? (
            <Skeleton className="h-96" />
          ) : countryBreakdown.length > 0 ? (
            <CountryBreakdown data={countryBreakdown} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
