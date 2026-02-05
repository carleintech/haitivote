/**
 * Trends Page - Presidential Grade
 * Enterprise-level rising stars and momentum analysis
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatNumber } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Flame,
  Rocket,
  Clock,
  BarChart3,
  ArrowLeft,
  Target,
  Activity,
  Sparkles,
  Award,
} from 'lucide-react';

interface TrendingCandidate {
  id: number;
  name: string;
  slug: string;
  photo_url: string;
  total_votes: number;
  votes_per_hour: number;
  momentum_percentage: number;
  projected_24h: number;
  rank: number;
}

interface TrendsData {
  timeframe: string;
  rising_stars: TrendingCandidate[];
  timestamp: string;
}

type Timeframe = '1h' | '6h' | '24h';

export default function TrendsPage() {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('6h');
  const [trendsData, setTrendsData] = React.useState<TrendsData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchTrends = React.useCallback(async (tf: Timeframe) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trends?timeframe=${tf}`);
      if (!response.ok) throw new Error('Failed to fetch trends');
      
      const data = await response.json();
      setTrendsData(data);
    } catch (error) {
      console.error('Error fetching trends:', error);
      // Mock data for development
      setTrendsData({
        timeframe: tf,
        rising_stars: [],
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTrends(timeframe);
  }, [timeframe, fetchTrends]);

  const getMomentumBadge = (momentum: number) => {
    if (momentum >= 100) {
      return { label: '🚀 EKSPLOZIF', color: 'bg-gradient-to-r from-red-500 to-pink-600' };
    } else if (momentum >= 50) {
      return { label: '🔥 TRÈ FÒ', color: 'bg-gradient-to-r from-orange-500 to-red-500' };
    } else if (momentum >= 20) {
      return { label: '⚡ FÒ', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' };
    } else if (momentum > 0) {
      return { label: '📈 POZITIF', color: 'bg-gradient-to-r from-green-500 to-emerald-600' };
    } else if (momentum === 0) {
      return { label: '➖ STAB', color: 'bg-gray-500' };
    } else if (momentum >= -20) {
      return { label: '📉 LEJÈ NEGATIF', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' };
    } else {
      return { label: '❄️ FRÈT', color: 'bg-gradient-to-r from-blue-600 to-purple-600' };
    }
  };

  const timeframeLabels = {
    '1h': 'Dènye 1 Èdtan',
    '6h': 'Dènye 6 Èdtan',
    '24h': 'Dènye 24 Èdtan',
  };

  const risingStars = trendsData?.rising_stars?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
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
                <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  HaitiVote
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Tandans & Mòmantòm
                </span>
              </div>
            </Link>
            <Link href="/leaderboard">
              <Button className="rounded-xl bg-white/10 px-5 py-2.5 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retounen
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-12">
        
        {/* Hero Title Section */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400/30 backdrop-blur-xl ring-1 ring-white/10">
            <Rocket className="h-6 w-6 text-orange-400 animate-bounce" />
            <span className="font-black text-lg bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              ANALIZ MÒMANTÒM
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            Tandans
          </h1>
          
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Kandida ki ap monte vit ak pwojeksyon pou 24 èdtan kap vini yo
          </p>
        </div>

        {/* Timeframe Selector - Glassmorphism Card */}
        <div className="mb-8 rounded-3xl bg-slate-900/50 p-8 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h3 className="font-black text-xl flex items-center gap-3 text-white">
                <Clock className="h-6 w-6 text-orange-400" />
                Chwazi Peryòd Tan
              </h3>
              <p className="text-sm text-gray-400 font-medium">
                Wè tandans pou diferan peryòd tan
              </p>
            </div>
            
            <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
              <SelectTrigger className="w-full md:w-64 bg-white/10 border-white/20 text-white backdrop-blur h-12 rounded-xl hover:bg-white/15 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/20">
                <SelectItem value="1h" className="text-white hover:bg-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Dènye 1 Èdtan
                  </div>
                </SelectItem>
                <SelectItem value="6h" className="text-white hover:bg-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Dènye 6 Èdtan
                  </div>
                </SelectItem>
                <SelectItem value="24h" className="text-white hover:bg-white/10">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Dènye 24 Èdtan
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl ring-1 ring-white/20">
              <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl font-black text-white">Chajman tandans...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Rising Stars Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <Rocket className="h-7 w-7 text-orange-400" />
                <h2 className="text-4xl font-black text-white">
                  Top 5 Kandida ki ap Monte
                </h2>
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>

              {risingStars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {risingStars.map((candidate, index) => {
                    const badge = getMomentumBadge(candidate.momentum_percentage);
                    return (
                      <Link key={candidate.id} href={`/candidate/${candidate.slug}/stats`}>
                        <div className="group relative h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                          <div className="relative h-full rounded-3xl bg-slate-900/80 p-6 ring-2 ring-orange-400/30 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-2xl">
                            
                            {/* Rank Badge */}
                            <div className="absolute -top-3 -right-3 z-10">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black shadow-2xl ${
                                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white ring-4 ring-yellow-400/50 animate-pulse' :
                                index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white ring-4 ring-gray-400/50' :
                                index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white ring-4 ring-amber-600/50' :
                                'bg-gradient-to-br from-orange-500 to-red-600 text-white ring-4 ring-orange-500/50'
                              }`}>
                                #{index + 1}
                              </div>
                            </div>

                            <div className="text-center space-y-4">
                              {/* Photo */}
                              <div className="relative inline-block">
                                {candidate.photo_url ? (
                                  <Image
                                    src={candidate.photo_url}
                                    alt={candidate.name}
                                    width={120}
                                    height={120}
                                    className="w-28 h-28 rounded-2xl object-cover mx-auto border-4 border-orange-400/50 shadow-xl ring-4 ring-orange-400/20 group-hover:border-orange-400 transition-colors"
                                  />
                                ) : (
                                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto border-4 border-orange-400/50 shadow-xl">
                                    <span className="text-4xl font-black text-white">
                                      {candidate.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                {index === 0 && (
                                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                                    <Award className="h-6 w-6 text-yellow-400 drop-shadow-lg" />
                                  </div>
                                )}
                              </div>

                              {/* Name */}
                              <div>
                                <h3 className="font-black text-lg text-white group-hover:text-orange-300 transition-colors line-clamp-2 mb-3">
                                  {candidate.name}
                                </h3>
                                <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl ${badge.color} text-white text-xs font-black shadow-lg`}>
                                  {badge.label}
                                </div>
                              </div>

                              {/* Stats */}
                              <div className="pt-4 border-t border-white/10">
                                <p className="text-3xl font-black text-white mb-1">
                                  {formatNumber(candidate.total_votes)}
                                </p>
                                <p className="text-xs text-gray-400 font-semibold">Total Vòt</p>
                              </div>

                              {/* Velocity Indicator */}
                              <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                                <Zap className="h-4 w-4 text-yellow-400" />
                                <span className="text-sm font-bold text-white">
                                  {formatNumber(candidate.votes_per_hour)} vòt/h
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-3xl bg-slate-900/30 border-2 border-dashed border-white/20 backdrop-blur-xl">
                  <div className="p-16 text-center space-y-4">
                    <Activity className="h-20 w-20 mx-auto text-gray-500" />
                    <p className="text-gray-400 text-lg">
                      Pa gen done disponib pou peryòd sa a
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Metrics Tabs */}
            <div className="rounded-3xl bg-slate-900/80 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 px-8 py-6 border-b border-white/10">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <BarChart3 className="h-7 w-7 text-orange-400" />
                  Analiz Detaye
                </h2>
              </div>
              <div className="p-8">
                <Tabs defaultValue="velocity" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 p-1 rounded-xl border border-white/20">
                    <TabsTrigger 
                      value="velocity" 
                      className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/30 data-[state=active]:to-cyan-500/30 data-[state=active]:text-white text-gray-300 rounded-lg font-bold"
                    >
                      <Zap className="h-4 w-4" />
                      Vitès
                    </TabsTrigger>
                    <TabsTrigger 
                      value="momentum" 
                      className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/30 data-[state=active]:to-red-500/30 data-[state=active]:text-white text-gray-300 rounded-lg font-bold"
                    >
                      <Flame className="h-4 w-4" />
                      Mòmantòm
                    </TabsTrigger>
                    <TabsTrigger 
                      value="projections" 
                      className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-pink-500/30 data-[state=active]:text-white text-gray-300 rounded-lg font-bold"
                    >
                      <Target className="h-4 w-4" />
                      Pwojeksyon
                    </TabsTrigger>
                  </TabsList>

                  {/* Velocity Tab */}
                  <TabsContent value="velocity" className="space-y-6">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 border border-blue-400/30">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        <strong className="text-blue-300">Vitès:</strong> Kantite vòt kandida ap resevwa pa èdtan nan peryòd {timeframeLabels[timeframe].toLowerCase()}.
                      </p>
                    </div>
                    
                    {risingStars.length > 0 ? (
                      <div className="space-y-4">
                        {risingStars.map((candidate, index) => (
                          <div key={candidate.id} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-blue-400/50">
                            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center ring-2 ring-blue-400/30">
                              <Zap className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-white text-lg truncate group-hover:text-blue-300 transition-colors">{candidate.name}</h4>
                              <p className="text-sm text-gray-400 font-semibold">
                                {formatNumber(candidate.votes_per_hour)} vòt/èdtan
                              </p>
                            </div>
                            <div className="shrink-0 px-4 py-2 rounded-xl bg-blue-500/30 ring-1 ring-blue-400/50">
                              <span className="text-2xl font-black text-white">
                                {candidate.votes_per_hour.toFixed(0)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-12 text-lg">Pa gen done disponib</p>
                    )}
                  </TabsContent>

                  {/* Momentum Tab */}
                  <TabsContent value="momentum" className="space-y-6">
                    <div className="rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6 border border-orange-400/30">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        <strong className="text-orange-300">Mòmantòm:</strong> Pousantaj chanjman nan vòt kandida yo nan peryòd {timeframeLabels[timeframe].toLowerCase()} konpare ak peryòd anvan an. 
                        Egzanp: Si yon kandida te gen 10 vòt anvan epi resevwa 5 vòt nan 6 dènye èdtan, mòmantòm se -50% (5/10 - 1 = -0.5 = -50%).
                      </p>
                    </div>
                    
                    {risingStars.length > 0 ? (
                      <div className="space-y-4">
                        {risingStars.map((candidate) => {
                          const badge = getMomentumBadge(candidate.momentum_percentage);
                          return (
                            <div key={candidate.id} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-orange-400/50">
                              <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center ring-2 ring-orange-400/30">
                                <Flame className="h-7 w-7 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-white text-lg truncate group-hover:text-orange-300 transition-colors">{candidate.name}</h4>
                                <p className="text-sm text-gray-400 font-semibold">
                                  {candidate.momentum_percentage > 0 ? '+' : ''}{candidate.momentum_percentage.toFixed(2)}% chanjman
                                </p>
                              </div>
                              <div className={`shrink-0 px-4 py-2 rounded-xl ${badge.color} shadow-lg`}>
                                <span className="text-sm font-black text-white">
                                  {badge.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-12 text-lg">Pa gen done disponib</p>
                    )}
                  </TabsContent>

                  {/* Projections Tab */}
                  <TabsContent value="projections" className="space-y-6">
                    <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 border border-purple-400/30">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        <strong className="text-purple-300">Pwojeksyon 24h:</strong> Estimasyon vòt kandida yo ap gen nan 24 èdtan kap vini yo, baze sou tandans aktyèl yo.
                      </p>
                    </div>
                    
                    {risingStars.length > 0 ? (
                      <div className="space-y-4">
                        {risingStars.map((candidate) => (
                          <div key={candidate.id} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-purple-400/50">
                            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center ring-2 ring-purple-400/30">
                              <Target className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-black text-white text-lg truncate group-hover:text-purple-300 transition-colors">{candidate.name}</h4>
                              <div className="flex items-center gap-3 mt-1 flex-wrap">
                                <p className="text-sm text-gray-400 font-semibold">
                                  Aktyèl: <span className="text-white">{formatNumber(candidate.total_votes)}</span>
                                </p>
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                                <p className="text-sm text-emerald-400 font-black">
                                  Pwojekte: {formatNumber(candidate.projected_24h)}
                                </p>
                              </div>
                            </div>
                            <div className="shrink-0 px-4 py-2 rounded-xl bg-purple-500/30 ring-1 ring-purple-400/50">
                              <span className="text-xl font-black text-white">
                                +{formatNumber(candidate.projected_24h - candidate.total_votes)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-12 text-lg">Pa gen done disponib</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-900/50 to-purple-900/50 ring-1 ring-blue-400/30 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-blue-400/50">
                    <Activity className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-2xl text-white mb-4 flex items-center gap-2">
                      Kòman Tandans Fonksyone?
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-200">
                      <li className="flex items-start gap-2">
                        <Zap className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <div><strong className="text-blue-300">Vitès:</strong> Vòt pa èdtan nan peryòd chwazi a (egz: 5 vòt / 6 èdtan = 0.83 vòt/h)</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Flame className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                        <div><strong className="text-orange-300">Mòmantòm:</strong> Pousantaj chanjman konpare ak peryòd anvan an (egz: 5 nouvo vòt / 10 vòt anvan = -50%)</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                        <div><strong className="text-purple-300">Pwojeksyon 24h:</strong> Vòt total aktyèl + (vitès × 24 èdtan)</div>
                      </li>
                    </ul>
                    <div className="mt-6 p-4 rounded-xl bg-yellow-500/20 border border-yellow-400/30">
                      <p className="text-sm text-yellow-200 font-semibold flex items-start gap-2">
                        <span className="text-xl">⚠️</span>
                        <span>Pwojeksyon yo se estimasyon sèlman e yo ka chanje rapidman.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
