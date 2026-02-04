/**
 * Interactive Vote Heatmap - Presidential Grade
 * Enterprise-level geographical distribution visualization
 */

'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  ArrowLeft,
  Map as MapIcon,
  Globe,
  Users,
  TrendingUp,
  Info,
  MapPin,
  Activity,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

// Dynamically import map component (client-side only)
const MapComponent = dynamic(() => import('@/components/VoteMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground">Ap chaje kat la...</p>
      </div>
    </div>
  ),
});

interface MapData {
  countries: Array<{
    country: string;
    code: string;
    lat: number;
    lng: number;
    totalVotes: number;
    topCandidate: string;
    percentage: number;
  }>;
  global: {
    totalVotes: number;
    totalCountries: number;
    topCountry: string;
  };
}

export default function MapPage() {
  const [mapData, setMapData] = React.useState<MapData | null>(null);
  const [selectedCandidate, setSelectedCandidate] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<'heatmap' | 'markers'>('heatmap');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchMapData();
  }, [selectedCandidate]);

  const fetchMapData = async () => {
    try {
      setLoading(true);
      const url = selectedCandidate === 'all' 
        ? '/api/map/data'
        : `/api/map/data?candidate=${selectedCandidate}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setMapData(data);
    } catch (error) {
      console.error('Failed to fetch map data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-green-950">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/leaderboard">
                <Button className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-xl">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retounen
                </Button>
              </Link>

              <div className="group">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-teal-500/20 border-2 border-green-400/30 backdrop-blur-xl ring-1 ring-white/10 mb-3">
                  <Globe className="h-5 w-5 text-green-400" />
                  <span className="font-black text-lg bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    DISTRIBISYON MONDYAL
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Kat Jeografik Vòt
                </h1>
                <p className="text-gray-400 mt-2 font-medium">
                  Vizwalizasyon entèaktif distribisyon vòt atravè mond lan
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                <SelectTrigger className="w-[200px] bg-slate-900/90 border-white/20 text-white backdrop-blur-xl">
                  <SelectValue placeholder="Tout kandida" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20 text-white">
                  <SelectItem value="all">Tout Kandida</SelectItem>
                  {/* Dynamically load candidates */}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  className={viewMode === 'heatmap' 
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:opacity-90' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-xl'
                  }
                  size="sm"
                  onClick={() => setViewMode('heatmap')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Heatmap
                </Button>
                <Button
                  className={viewMode === 'markers' 
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:opacity-90' 
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-xl'
                  }
                  size="sm"
                  onClick={() => setViewMode('markers')}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Makè
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-8 space-y-8">
        {/* Global Stats */}
        {mapData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Votes */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-blue-400/50 shadow-xl mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-400 font-medium mb-2">Total Vòt Mondyal</p>
                <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {formatNumber(mapData.global.totalVotes)}
                </p>
              </div>
            </div>

            {/* Total Countries */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center ring-2 ring-green-400/50 shadow-xl mb-4 animate-pulse">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-400 font-medium mb-2">Peyi Reprezante</p>
                <p className="text-4xl font-black bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {mapData.global.totalCountries}
                </p>
              </div>
            </div>

            {/* Top Country */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center ring-2 ring-cyan-400/50 shadow-xl mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-gray-400 font-medium mb-2">Peyi Prensipal</p>
                <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {mapData.global.topCountry}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Map Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <MapIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white">Kat Entèaktif</h3>
            </div>
            <p className="text-gray-400 font-medium ml-13">
              Klike sou yon peyi pou wè detay · Zoum ak navige pou eksplore
            </p>
          </div>

          {/* Map Content */}
          <div className="p-6">
            {loading ? (
              <div className="h-[600px] bg-slate-950/50 rounded-2xl flex items-center justify-center border border-white/5">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 animate-pulse shadow-2xl">
                    <MapIcon className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-white font-semibold text-lg">Ap chaje kat la...</p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-white/5">
                <MapComponent 
                  data={mapData?.countries || []} 
                  viewMode={viewMode}
                />
              </div>
            )}
          </div>
        </div>

        {/* Country Breakdown Table */}
        {mapData && (
          <div className="relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Section Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">Repartisyon pa Peyi</h3>
              </div>
              <p className="text-gray-400 font-medium ml-13">
                Klasman konplè {mapData.countries.length} peyi ak detay kandida prensipal
              </p>
            </div>

            {/* Countries List */}
            <div className="p-6 space-y-3 max-h-[800px] overflow-y-auto">
              {mapData.countries
                .sort((a, b) => b.totalVotes - a.totalVotes)
                .map((country, index) => {
                  // Get rank badge style
                  const getRankBadge = (rank: number) => {
                    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
                    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
                    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white';
                    return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
                  };

                  return (
                    <div
                      key={country.code}
                      className="group relative flex items-center justify-between p-5 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative flex items-center gap-4">
                        {/* Rank Badge */}
                        <div className={`w-12 h-12 rounded-xl ${getRankBadge(index + 1)} flex items-center justify-center ring-2 ring-white/10 shadow-lg`}>
                          <span className="text-lg font-black">
                            {index + 1}
                          </span>
                        </div>
                        
                        {/* Country Info */}
                        <div>
                          <p className="font-black text-white text-lg">{country.country}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs font-semibold">
                              {country.topCandidate}
                            </Badge>
                            <span className="text-sm text-gray-400 font-medium">
                              {country.percentage.toFixed(2)}% total
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Vote Count */}
                      <div className="relative text-right">
                        <p className="text-2xl font-black bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                          {formatNumber(country.totalVotes)}
                        </p>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          VÒT TOTAL
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-2xl p-8 border-2 border-blue-400/30 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center ring-2 ring-blue-400/50 shadow-xl flex-shrink-0">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white mb-3">Kijan pou itilize kat la:</h4>
              <ul className="space-y-2 text-gray-300 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-black">•</span>
                  <span>Klike ak trennen pou deplase kat la nan direksyon ou vle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-black">•</span>
                  <span>Itilize wou rat oswa boutòn +/- pou zoume sou zòn espesifik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-black">•</span>
                  <span>Klike sou yon peyi pou wè enfòmasyon detaye ak estatistik</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-black">•</span>
                  <span>Koulè pi entans = konsantrasyon vòt pi wo nan peyi sa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
