/**
 * Historical Timeline Page
 * Day-by-day progression of votes
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Trophy,
  Zap,
  Clock,
  Award,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

interface TimelineEvent {
  date: string;
  type: 'milestone' | 'leadership' | 'surge' | 'launch';
  title: string;
  description: string;
  candidateName?: string;
  candidatePhoto?: string;
  votes?: number;
  icon: string;
}

interface DailyStats {
  date: string;
  totalVotes: number;
  newVotes: number;
  topCandidate: string;
  topCandidateVotes: number;
}

export default function TimelinePage() {
  const [timeline, setTimeline] = React.useState<TimelineEvent[]>([]);
  const [dailyStats, setDailyStats] = React.useState<DailyStats[]>([]);
  const [selectedCandidate, setSelectedCandidate] = React.useState<string>('all');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchTimelineData();
  }, [selectedCandidate]);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const url = selectedCandidate === 'all'
        ? '/api/timeline'
        : `/api/timeline?candidate=${selectedCandidate}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setTimeline(data.events || []);
      setDailyStats(data.dailyStats || []);
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-green-500/10 border-green-500/50';
      case 'leadership':
        return 'bg-yellow-500/10 border-yellow-500/50';
      case 'surge':
        return 'bg-blue-500/10 border-blue-500/50';
      case 'launch':
        return 'bg-purple-500/10 border-purple-500/50';
      default:
        return 'bg-muted border-border';
    }
  };

  const getEventIcon = (type: string, icon?: string) => {
    if (icon) return <span className="text-2xl">{icon}</span>;
    
    switch (type) {
      case 'milestone':
        return <Trophy className="h-6 w-6 text-green-500" />;
      case 'leadership':
        return <Award className="h-6 w-6 text-yellow-500" />;
      case 'surge':
        return <Zap className="h-6 w-6 text-blue-500" />;
      case 'launch':
        return <Calendar className="h-6 w-6 text-purple-500" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-orange-950/10">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/leaderboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retounen
                </Button>
              </Link>

              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-orange-500" />
                  Kwonik Istorik
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Evolisyon vòt jou pa jou
                </p>
              </div>
            </div>

            <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tout kandida" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tout Kandida</SelectItem>
                {/* Dynamically load candidates */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Moman Kle</CardTitle>
                <CardDescription>
                  Evènman enpòtan nan kanpay la
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : timeline.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Pa gen evènman ankò</p>
                  </div>
                ) : (
                  <div className="relative space-y-6">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                    {timeline.map((event, index) => (
                      <div key={index} className="relative pl-16">
                        {/* Icon */}
                        <div className="absolute left-0 w-12 h-12 rounded-full bg-background border-4 border-border flex items-center justify-center">
                          {getEventIcon(event.type, event.icon)}
                        </div>

                        {/* Content */}
                        <Card className={`${getEventColor(event.type)} border-2`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {format(parseISO(event.date), 'MMM dd, yyyy')}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs capitalize">
                                    {event.type}
                                  </Badge>
                                </div>
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {event.description}
                                </p>
                              </div>

                              {event.candidatePhoto && (
                                <div className="relative w-12 h-12 flex-shrink-0">
                                  <Image
                                    src={event.candidatePhoto}
                                    alt={event.candidateName || ''}
                                    fill
                                    className="rounded-full object-cover border-2 border-border"
                                  />
                                </div>
                              )}
                            </div>

                            {event.votes && (
                              <div className="flex items-center gap-2 text-sm mt-3">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="font-bold">{formatNumber(event.votes)}</span>
                                <span className="text-muted-foreground">vòt</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Daily Stats Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Estatistik Jounalye</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
                    ))
                  ) : dailyStats.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Pa gen done ankò</p>
                    </div>
                  ) : (
                    dailyStats.map((day, index) => (
                      <Card key={day.date} className="bg-muted/50">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold">
                              {format(parseISO(day.date), 'MMM dd')}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              Jou {dailyStats.length - index}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total:</span>
                              <span className="font-bold">{formatNumber(day.totalVotes)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Nouvo:</span>
                              <span className="font-bold text-green-500">
                                +{formatNumber(day.newVotes)}
                              </span>
                            </div>
                            <Separator />
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Top:</p>
                              <p className="font-semibold text-xs truncate">
                                {day.topCandidate}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
