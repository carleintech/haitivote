/**
 * Trends Page - Rising Stars and Momentum Analysis
 * Shows velocity, momentum, and projections
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
    if (momentum >= 10) {
      return { label: '🚀 EKSPLOZIF', color: 'bg-gradient-to-r from-red-500 to-pink-600' };
    } else if (momentum >= 5) {
      return { label: '🔥 TRÈ FÒ', color: 'bg-gradient-to-r from-orange-500 to-red-500' };
    } else if (momentum >= 2) {
      return { label: '⚡ FÒ', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' };
    } else if (momentum > 0) {
      return { label: '📈 POZITIF', color: 'bg-gradient-to-r from-green-500 to-emerald-600' };
    } else if (momentum === 0) {
      return { label: '➖ STAB', color: 'bg-gray-500' };
    } else {
      return { label: '📉 NEGATIF', color: 'bg-gradient-to-r from-blue-500 to-purple-600' };
    }
  };

  const timeframeLabels = {
    '1h': 'Dènye 1 Èdtan',
    '6h': 'Dènye 6 Èdtan',
    '24h': 'Dènye 24 Èdtan',
  };

  const risingStars = trendsData?.rising_stars.slice(0, 5) || [];

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
            <Link href="/leaderboard">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retounen
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-500/20">
            <Rocket className="h-6 w-6 text-orange-500 animate-bounce" />
            <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TANDANS & MÒMANTÒM
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
            Tandans
          </h1>
          
          <p className="text-xl text-gray-600">
            Kandida ki ap monte vit ak pwojeksyon pou 24 èdtan kap vini yo
          </p>
        </div>

        {/* Timeframe Selector */}
        <Card className="mb-8 border-2 border-[#006CFF]/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#006CFF]" />
                  Chwazi Peryòd Tan
                </h3>
                <p className="text-sm text-gray-600">
                  Wè tandans pou diferan peryòd tan
                </p>
              </div>
              
              <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Dènye 1 Èdtan
                    </div>
                  </SelectItem>
                  <SelectItem value="6h">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Dènye 6 Èdtan
                    </div>
                  </SelectItem>
                  <SelectItem value="24h">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Dènye 24 Èdtan
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-[#006CFF]">
              <div className="w-6 h-6 border-4 border-[#006CFF] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-semibold">Chajman tandans...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Rising Stars Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="h-6 w-6 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Top 5 Kandida ki ap Monte
                </h2>
              </div>

              {risingStars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {risingStars.map((candidate, index) => {
                    const badge = getMomentumBadge(candidate.momentum_percentage);
                    return (
                      <Link key={candidate.id} href={`/candidate/${candidate.slug}/stats`}>
                        <Card className="border-2 border-gray-200 hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer group">
                          <CardContent className="p-6 text-center space-y-4">
                            <div className="relative">
                              <Badge className={`absolute -top-2 -right-2 ${badge.color} text-white px-2 py-1 text-xs z-10`}>
                                #{index + 1}
                              </Badge>
                              {candidate.photo_url ? (
                                <Image
                                  src={candidate.photo_url}
                                  alt={candidate.name}
                                  width={100}
                                  height={100}
                                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-orange-400 group-hover:border-orange-500 transition-colors"
                                />
                              ) : (
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center mx-auto border-4 border-orange-400">
                                  <span className="text-3xl font-bold text-white">
                                    {candidate.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div>
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                                {candidate.name}
                              </h3>
                              <Badge className={`mt-2 ${badge.color} text-white text-xs`}>
                                {badge.label}
                              </Badge>
                            </div>

                            <div className="pt-2 border-t space-y-1">
                              <p className="text-2xl font-bold text-gray-900">
                                {formatNumber(candidate.total_votes)}
                              </p>
                              <p className="text-xs text-gray-500">Total Vòt</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-12 text-center">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">
                      Pa gen done disponib pou peryòd sa a
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Detailed Metrics Tabs */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#006CFF]/5 to-[#7F00FF]/5">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-[#006CFF]" />
                  Analiz Detaye
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="velocity" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="velocity" className="gap-2">
                      <Zap className="h-4 w-4" />
                      Vitès
                    </TabsTrigger>
                    <TabsTrigger value="momentum" className="gap-2">
                      <Flame className="h-4 w-4" />
                      Mòmantòm
                    </TabsTrigger>
                    <TabsTrigger value="projections" className="gap-2">
                      <Target className="h-4 w-4" />
                      Pwojeksyon
                    </TabsTrigger>
                  </TabsList>

                  {/* Velocity Tab */}
                  <TabsContent value="velocity" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-700">
                        <strong>Vitès:</strong> Kantite vòt kandida ap resevwa pa èdtan nan peryòd {timeframeLabels[timeframe].toLowerCase()}.
                      </p>
                    </div>
                    
                    {risingStars.length > 0 ? (
                      <div className="space-y-3">
                        {risingStars.map((candidate) => (
                          <div key={candidate.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#006CFF] to-[#7F00FF] flex items-center justify-center">
                              <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 truncate">{candidate.name}</h4>
                              <p className="text-sm text-gray-600">
                                {formatNumber(candidate.votes_per_hour)} vòt/èdtan
                              </p>
                            </div>
                            <Badge className="bg-blue-600 text-white">
                              {candidate.votes_per_hour.toFixed(0)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">Pa gen done disponib</p>
                    )}
                  </TabsContent>

                  {/* Momentum Tab */}
                  <TabsContent value="momentum" className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-700">
                        <strong>Mòmantòm:</strong> Pousantaj chanjman nan vòt kandida yo nan peryòd {timeframeLabels[timeframe].toLowerCase()}.
                      </p>
                    </div>
                    
                    {risingStars.length > 0 ? (
                      <div className="space-y-3">
                        {risingStars.map((candidate) => {
                          const badge = getMomentumBadge(candidate.momentum_percentage);
                          return (
                            <div key={candidate.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-gray-200">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <Flame className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 truncate">{candidate.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {candidate.momentum_percentage > 0 ? '+' : ''}{candidate.momentum_percentage.toFixed(2)}% chanjman
                                </p>
                              </div>
                              <Badge className={badge.color}>
                                {badge.label}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">Pa gen done disponib</p>
                    )}
                  </TabsContent>

                  {/* Projections Tab */}
                  <TabsContent value="projections" className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-700">
                        <strong>Pwojeksyon 24h:</strong> Estimasyon vòt kandida yo ap gen nan 24 èdtan kap vini yo, baze sou tandans aktyèl yo.
                      </p>
                    </div>
                    
                    {risingStars.length > 0 ? (
                      <div className="space-y-3">
                        {risingStars.map((candidate) => (
                          <div key={candidate.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-gray-200">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                              <Target className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 truncate">{candidate.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm text-gray-600">
                                  Aktyèl: {formatNumber(candidate.total_votes)}
                                </p>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <p className="text-sm text-green-600 font-semibold">
                                  Pwojekte: {formatNumber(candidate.projected_24h)}
                                </p>
                              </div>
                            </div>
                            <Badge className="bg-purple-600 text-white">
                              +{formatNumber(candidate.projected_24h - candidate.total_votes)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-8">Pa gen done disponib</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="mt-8 border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Kòman Tandans Fonksyone?</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li><strong>Vitès:</strong> Kantite vòt pa èdtan</li>
                      <li><strong>Mòmantòm:</strong> Pousantaj chanjman relatif oswa negatif</li>
                      <li><strong>Pwojeksyon:</strong> Estimasyon baze sou tandans aktyèl yo</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-3">
                      ⚠️ Pwojeksyon yo se estimasyon sèlman e yo ka chanje rapidman.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
