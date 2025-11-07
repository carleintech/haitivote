/**
 * Real-Time Activity Feed
 * Live stream of votes as they happen
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LiveIndicator } from '@/components/LiveIndicator';
import { useRealtime } from '@/hooks/use-realtime';
import {
  ArrowLeft,
  Radio,
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Globe,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils';

interface VoteActivity {
  id: string;
  candidate_name: string;
  candidate_photo: string;
  candidate_slug: string;
  country: string;
  region: string | null;
  timestamp: string;
  isNew?: boolean;
}

export default function ActivityPage() {
  const [activities, setActivities] = React.useState<VoteActivity[]>([]);
  const [stats, setStats] = React.useState({
    totalToday: 0,
    votesPerMinute: 0,
    activeCountries: 0,
  });

  // Fetch initial activities
  React.useEffect(() => {
    fetchRecentActivities();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchRecentActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  // Setup realtime subscription for new votes
  useRealtime({
    table: 'votes',
    event: 'INSERT',
    onInsert: (payload) => {
      addNewActivity(payload.new);
    },
  });

  const fetchRecentActivities = async () => {
    try {
      const response = await fetch('/api/activity/recent');
      const data = await response.json();
      
      setActivities(data.activities || []);
      setStats(data.stats || stats);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const addNewActivity = (vote: any) => {
    const newActivity: VoteActivity = {
      id: vote.id,
      candidate_name: 'New Vote',
      candidate_photo: '',
      candidate_slug: '',
      country: vote.country || 'Unknown',
      region: vote.region,
      timestamp: vote.created_at,
      isNew: true,
    };

    setActivities((prev) => [newActivity, ...prev.slice(0, 99)]);

    // Remove 'new' flag after animation
    setTimeout(() => {
      setActivities((prev) =>
        prev.map((a) => (a.id === vote.id ? { ...a, isNew: false } : a))
      );
    }, 3000);

    // Update stats
    setStats((prev) => ({
      ...prev,
      totalToday: prev.totalToday + 1,
    }));
  };

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'Haiti': '🇭🇹',
      'United States': '🇺🇸',
      'Canada': '🇨🇦',
      'France': '🇫🇷',
      'Dominican Republic': '🇩🇴',
      'Brazil': '🇧🇷',
      'Chile': '🇨🇱',
      'Mexico': '🇲🇽',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retounen
                </Button>
              </Link>

              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Radio className="h-8 w-8 text-green-500 animate-pulse" />
                  Aktivite an Tan Reyèl
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Gade vòt yo rive minit pa minit
                </p>
              </div>
            </div>

            <LiveIndicator isLive={true} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-2 border-green-500/50">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <TrendingUp className="h-10 w-10 mx-auto mb-2 text-green-500" />
                  <p className="text-sm text-muted-foreground">Jodi a</p>
                  <p className="text-4xl font-bold text-green-500">
                    {formatNumber(stats.totalToday)}
                  </p>
                </div>

                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Pa Minit</p>
                  <p className="text-2xl font-bold">
                    {stats.votesPerMinute.toFixed(1)}
                  </p>
                </div>

                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-sm text-muted-foreground">Peyi Aktif</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {stats.activeCountries}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10">
              <CardContent className="p-6 text-center space-y-2">
                <Radio className="h-12 w-12 mx-auto text-green-500 animate-pulse" />
                <p className="text-sm font-semibold">
                  📡 Koneksyon Dirèk
                </p>
                <p className="text-xs text-muted-foreground">
                  Chak vòt parèt imedyatman
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Dènye 100 Vòt
              </h2>
              <Badge variant="outline">{activities.length} aktivite</Badge>
            </div>

            <div className="space-y-2 max-h-[800px] overflow-y-auto">
              {activities.map((activity, index) => (
                <Link
                  key={activity.id}
                  href={activity.candidate_slug ? `/candidate/${activity.candidate_slug}` : '#'}
                >
                  <Card
                    className={cn(
                      'transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-lg',
                      activity.isNew && 'bg-green-500/10 border-2 border-green-500'
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Candidate Photo */}
                        {activity.candidate_photo && (
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-border">
                              <Image
                                src={activity.candidate_photo}
                                alt={activity.candidate_name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Activity Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {activity.isNew && (
                              <Badge variant="default" className="bg-green-500 animate-pulse">
                                NOUVO
                              </Badge>
                            )}
                            <p className="font-semibold truncate">
                              {activity.candidate_name}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span className="text-lg">
                                {getCountryFlag(activity.country)}
                              </span>
                              <span>{activity.country}</span>
                            </div>

                            {activity.region && (
                              <>
                                <span>·</span>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{activity.region}</span>
                                </div>
                              </>
                            )}

                            <span>·</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatDistanceToNow(new Date(activity.timestamp), {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Live pulse indicator */}
                        {activity.isNew && (
                          <div className="flex-shrink-0">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
