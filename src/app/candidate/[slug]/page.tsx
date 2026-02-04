/**
 * Candidate Profile Page
 * Detailed view of individual candidate
 */

import * as React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  TrendingUp,
  Users,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface CandidatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCandidateData(slug: string) {
  const supabase = await createClient();

  // Fetch candidate details
  const { data: candidate, error: candidateError } = await (supabase as any)
    .from('candidates')
    .select(`
      *,
      candidate_meta (*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (candidateError || !candidate) {
    return null;
  }

  // Fetch vote stats for this candidate
  const { data: stats } = await (supabase as any)
    .from('vote_aggregates')
    .select('*')
    .eq('candidate_slug', slug)
    .single();

  // Fetch votes by country for this candidate
  const { data: byCountry } = await (supabase as any)
    .from('vote_by_country')
    .select('*')
    .eq('candidate_slug', slug)
    .order('total_votes', { ascending: false })
    .limit(10);

  return {
    candidate,
    stats,
    byCountry: byCountry || [],
  };
}

export default async function CandidatePage({ params }: CandidatePageProps) {
  const { slug } = await params;
  const data = await getCandidateData(slug);

  if (!data) {
    notFound();
  }

  const { candidate, stats, byCountry } = data;
  const meta = candidate.candidate_meta?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <div className="relative border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retounen
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Photo */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-purple-400/50 flex-shrink-0 shadow-2xl">
              <Image
                src={candidate.photo_url}
                alt={candidate.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {candidate.name}
                </h1>
                {candidate.party && (
                  <Badge className="mt-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                    {candidate.party}
                  </Badge>
                )}
              </div>

              {candidate.motto && (
                <p className="text-lg italic text-blue-200">
                  "{candidate.motto}"
                </p>
              )}

              {/* Social Links */}
              {meta && (
                <div className="flex flex-wrap gap-2">
                  {meta.website && (
                    <Button size="sm" className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/20" asChild>
                      <a href={meta.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Sit Wèb
                      </a>
                    </Button>
                  )}

                  {meta.twitter && (
                    <Button size="sm" className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/20" asChild>
                      <a href={meta.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}

                  {meta.facebook && (
                    <Button size="sm" className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/20" asChild>
                      <a href={meta.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                  )}

                  {meta.instagram && (
                    <Button size="sm" className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/20" asChild>
                      <a href={meta.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                  )}

                  {meta.youtube && (
                    <Button size="sm" className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/20" asChild>
                      <a href={meta.youtube} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Biography */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {meta?.bio && (
              <Card className="bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Biyografi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {meta.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Vote Distribution by Country */}
            {byCountry.length > 0 && (
              <Card className="bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vòt Pa Peyi</CardTitle>
                  <CardDescription className="text-blue-200">
                    Kote sipòtè {candidate.name} yo ye
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {byCountry.map((item: any) => {
                      const percentage = stats?.total_votes
                        ? (item.total_votes / stats.total_votes) * 100
                        : 0;

                      return (
                        <div key={item.country} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-white">{item.country}</span>
                            <span className="text-gray-400">
                              {formatNumber(item.total_votes)} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2 bg-slate-800" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Vote Stats */}
            {stats && (
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 backdrop-blur-2xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    Estatistik Vòt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-blue-200">Total Vòt</p>
                    <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {formatNumber(stats.total_votes)}
                    </p>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="text-center space-y-2">
                    <p className="text-sm text-blue-200">Pousantaj</p>
                    <p className="text-3xl font-black text-white">
                      {stats.percentage.toFixed(2)}%
                    </p>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="text-center">
                    <Link href="/live">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-lg">
                        Gade Tout Rezilta
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Facts */}
            <Card className="bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Enfòmasyon Rapid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {candidate.party && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pati:</span>
                    <span className="font-semibold text-white">{candidate.party}</span>
                  </div>
                )}

                {candidate.motto && (
                  <div className="space-y-1">
                    <span className="text-gray-400">Deviz:</span>
                    <p className="font-semibold italic text-blue-200">"{candidate.motto}"</p>
                  </div>
                )}

                <Separator className="bg-white/20" />

                <div className="flex justify-between">
                  <span className="text-gray-400">ID:</span>
                  <span className="font-mono text-xs text-white">{candidate.id}</span>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50 backdrop-blur-2xl shadow-2xl">
              <CardContent className="p-6 text-center space-y-4">
                <Users className="h-12 w-12 mx-auto text-blue-400" />
                <div>
                  <h3 className="font-black text-xl text-white mb-2">
                    Pa vote ankò?
                  </h3>
                  <p className="text-sm text-blue-200 mb-4">
                    Patisipe nan sondaj la kounye a
                  </p>
                  <Link href="/">
                    <Button size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold shadow-lg">
                      Vote Kounye a
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: CandidatePageProps) {
  const { slug } = await params;
  const data = await getCandidateData(slug);

  if (!data) {
    return {
      title: 'Kandida Pa Jwenn',
    };
  }

  const { candidate } = data;

  return {
    title: `${candidate.name} - TechKlein VoteLive`,
    description: candidate.motto || `Profil ${candidate.name} nan TechKlein VoteLive`,
    openGraph: {
      title: candidate.name,
      description: candidate.motto || 'Profil Kandida',
      images: [candidate.photo_url],
    },
  };
}
