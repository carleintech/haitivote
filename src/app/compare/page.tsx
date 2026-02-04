/**
 * Compare Page - Presidential Grade
 * Enterprise-level side-by-side candidate comparison
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCandidates } from '@/hooks/use-candidates';
import { formatNumber } from '@/lib/utils';
import {
  Users,
  Globe,
  BarChart3,
  TrendingUp,
  X,
  Plus,
  ArrowLeft,
  Target,
  MapPin,
  Zap,
  Award,
} from 'lucide-react';

interface CandidateStats {
  id: number;
  name: string;
  slug: string;
  photo_url: string;
  total_votes: number;
  percentage: number;
  country_count: number;
  top_countries: Array<{
    country: string;
    votes: number;
    percentage: number;
  }>;
}

export default function ComparePage() {
  const { candidates, loading: candidatesLoading } = useCandidates();
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [candidateStats, setCandidateStats] = React.useState<Map<number, CandidateStats>>(new Map());
  const [loading, setLoading] = React.useState(false);

  // Fetch stats for a specific candidate
  const fetchCandidateStats = React.useCallback(async (candidateId: number) => {
    try {
      const response = await fetch(`/api/compare/${candidateId}`);
      if (!response.ok) throw new Error('Failed to fetch candidate stats');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching candidate stats:', error);
      return null;
    }
  }, []);

  // Load stats when candidates are selected
  React.useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const newStats = new Map(candidateStats);

      for (const id of selectedIds) {
        if (!newStats.has(id)) {
          const stats = await fetchCandidateStats(id);
          if (stats) {
            newStats.set(id, stats);
          }
        }
      }

      setCandidateStats(newStats);
      setLoading(false);
    };

    if (selectedIds.length > 0) {
      loadStats();
    }
  }, [selectedIds]);

  const addCandidate = (candidateId: string) => {
    const id = parseInt(candidateId);
    if (!selectedIds.includes(id) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCandidate = (candidateId: number) => {
    setSelectedIds(selectedIds.filter((id) => id !== candidateId));
    const newStats = new Map(candidateStats);
    newStats.delete(candidateId);
    setCandidateStats(newStats);
  };

  const availableCandidates = candidates.filter(
    (c) => !selectedIds.includes(c.id)
  );

  const selectedCandidates = selectedIds
    .map((id) => candidateStats.get(id))
    .filter((c): c is CandidateStats => c !== undefined);

  const maxVotes = selectedCandidates.length > 0
    ? Math.max(...selectedCandidates.map((c) => c.total_votes))
    : 0;

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
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                🇭🇹
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  HaitiVote
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Konpare Kandida
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
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 backdrop-blur-xl ring-1 ring-white/10">
            <Target className="h-6 w-6 text-blue-400" />
            <span className="font-black text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              KONPAREZON ENTÈLIJANT
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Konpare Kandida
          </h1>
          
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Chwazi jiska 4 kandida pou konpare estatistik yo kòt a kòt ak transparans total
          </p>
        </div>

        {/* Candidate Selector - Glassmorphism Card */}
        <div className="mb-8 rounded-3xl bg-slate-900/50 p-8 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 space-y-3">
              <label className="text-sm font-bold text-blue-300 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Ajoute Kandida ({selectedIds.length}/4)
              </label>
              <Select onValueChange={addCandidate} disabled={selectedIds.length >= 4}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur h-12 rounded-xl hover:bg-white/15 transition-colors">
                  <SelectValue placeholder="Chwazi yon kandida..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  {availableCandidates.map((candidate) => (
                    <SelectItem 
                      key={candidate.id} 
                      value={candidate.id.toString()}
                      className="text-white hover:bg-white/10"
                    >
                      {candidate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedIds.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedIds([]);
                  setCandidateStats(new Map());
                }}
                className="md:mt-8 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 rounded-xl"
              >
                <X className="h-4 w-4 mr-2" />
                Efase Tout
              </Button>
            )}
          </div>

          {/* Selected Candidates Pills */}
          {selectedIds.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {selectedIds.map((id) => {
                const candidate = candidates.find((c) => c.id === id);
                return candidate ? (
                  <div
                    key={id}
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/30 backdrop-blur hover:scale-105 transition-all duration-300"
                  >
                    <span className="font-bold text-white">{candidate.name}</span>
                    <button
                      onClick={() => removeCandidate(id)}
                      className="hover:bg-red-500/30 rounded-full p-1 transition-colors"
                    >
                      <X className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Empty State */}
        {selectedIds.length === 0 && (
          <div className="rounded-3xl bg-slate-900/30 border-2 border-dashed border-white/20 backdrop-blur-xl">
            <div className="p-16 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center ring-4 ring-white/10">
                <Plus className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-3xl font-black text-white">Chwazi Kandida</h3>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Sèvi ak meni ki anwo a pou chwazi jiska 4 kandida pou konpare estatistik yo kòt a kòt.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl ring-1 ring-white/20">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl font-black text-white">Chajman estatistik...</span>
            </div>
          </div>
        )}

        {/* Comparison Grid */}
        {selectedCandidates.length > 0 && !loading && (
          <div className="space-y-8">
            
            {/* Overview Cards */}
            <div className={`grid grid-cols-1 ${selectedCandidates.length === 2 ? 'md:grid-cols-2' : selectedCandidates.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
              {selectedCandidates.map((candidate, index) => (
                <div key={candidate.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative rounded-3xl bg-slate-900/80 p-8 ring-2 ring-blue-400/30 backdrop-blur-xl hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCandidate(candidate.id)}
                      className="absolute top-3 right-3 h-9 w-9 p-0 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-400/30"
                    >
                      <X className="h-5 w-5 text-red-400" />
                    </Button>

                    <div className="text-center space-y-4">
                      {/* Rank Badge */}
                      <div className="absolute top-3 left-3">
                        {index < 3 && (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/50' :
                            index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg shadow-gray-500/50' :
                            'bg-gradient-to-br from-amber-600 to-orange-700 shadow-lg shadow-amber-600/50'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                        )}
                      </div>

                      {/* Photo */}
                      {candidate.photo_url ? (
                        <Image
                          src={candidate.photo_url}
                          alt={candidate.name || 'Candidate'}
                          width={140}
                          height={140}
                          className="w-32 h-32 rounded-2xl object-cover mx-auto border-4 border-blue-400/50 shadow-xl ring-4 ring-blue-400/20"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto border-4 border-blue-400/50 shadow-xl">
                          <span className="text-5xl font-black text-white">
                            {candidate.name?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}

                      {/* Name & Percentage */}
                      <div>
                        <h3 className="font-black text-xl text-white mb-3">
                          {candidate.name}
                        </h3>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 ring-1 ring-blue-400/50">
                          <Zap className="h-4 w-4 text-yellow-400" />
                          <span className="text-2xl font-black bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                            {candidate.percentage?.toFixed(1) || '0.0'}%
                          </span>
                        </div>
                      </div>

                      {/* Total Votes */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-center gap-3 text-white">
                          <Users className="h-6 w-6 text-blue-400" />
                          <span className="text-3xl font-black">
                            {formatNumber(candidate.total_votes)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 font-semibold">Total Vòt</p>
                      </div>

                      {/* Countries */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                          <Globe className="h-5 w-5 text-emerald-400" />
                          <span className="font-black text-white text-lg">
                            {candidate.country_count}
                          </span>
                          <span className="text-sm text-gray-400 font-semibold">peyi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Metrics Comparison */}
            <div className="rounded-3xl bg-slate-900/80 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-8 py-6 border-b border-white/10">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <BarChart3 className="h-7 w-7 text-blue-400" />
                  Konparezon Detaye
                </h2>
              </div>
              <div className="p-8 space-y-8">
                
                {/* Total Votes Comparison */}
                <div>
                  <h4 className="font-black text-xl mb-6 flex items-center gap-3 text-white">
                    <Users className="h-6 w-6 text-blue-400" />
                    Total Vòt
                  </h4>
                  <div className="space-y-4">
                    {selectedCandidates.map((candidate, index) => (
                      <div key={candidate.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {index < 3 && (
                              <span className="text-xl">
                                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                              </span>
                            )}
                            <span className="font-bold text-white text-lg">
                              {candidate.name}
                            </span>
                          </div>
                          <span className="text-2xl font-black text-white">
                            {formatNumber(candidate.total_votes)}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${(candidate.total_votes / maxVotes) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Percentage Comparison */}
                <div>
                  <h4 className="font-black text-xl mb-6 flex items-center gap-3 text-white">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                    Pousantaj Total
                  </h4>
                  <div className="space-y-4">
                    {selectedCandidates.map((candidate, index) => (
                      <div key={candidate.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-white text-lg">
                            {candidate.name}
                          </span>
                          <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {candidate.percentage?.toFixed(2) || '0.00'}%
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(candidate.percentage || 0, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Country Reach Comparison */}
                <div>
                  <h4 className="font-black text-xl mb-6 flex items-center gap-3 text-white">
                    <Globe className="h-6 w-6 text-purple-400" />
                    Kouvèti Jewografik
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCandidates.map((candidate, index) => (
                      <div
                        key={candidate.id}
                        className="group relative overflow-hidden text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:scale-105 transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <p className="text-4xl font-black text-white mb-2">
                            {candidate.country_count}
                          </p>
                          <p className="text-sm text-gray-300 font-semibold truncate">
                            {candidate.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Countries for Each Candidate */}
            <div className={`grid grid-cols-1 ${selectedCandidates.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6`}>
              {selectedCandidates.map((candidate) => (
                <div key={candidate.id} className="rounded-3xl bg-slate-900/80 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-8 py-6 border-b border-white/10">
                    <h3 className="font-black text-lg text-white flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-purple-400" />
                      Top 3 Peyi - {candidate.name}
                    </h3>
                  </div>
                  <div className="p-8">
                    {candidate.top_countries.length > 0 ? (
                      <div className="space-y-4">
                        {candidate.top_countries.slice(0, 3).map((country, index) => (
                          <div key={country.country} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ring-2 ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white ring-yellow-400/50' :
                              index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white ring-gray-400/50' :
                              'bg-gradient-to-br from-amber-600 to-orange-700 text-white ring-amber-600/50'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-white text-lg truncate">
                                  {country.country}
                                </span>
                                <span className="text-sm font-black text-blue-300 shrink-0 ml-2">
                                  {formatNumber(country.votes)} <span className="text-gray-500">({country.percentage?.toFixed(1) || '0.0'}%)</span>
                                </span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min(country.percentage || 0, 100)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-8 text-lg">
                        Pa gen done disponib
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
