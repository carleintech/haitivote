/**
 * Presidential-Grade Navigation
 * Modern, beautiful navigation matching the new homepage design
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Vote,
  Trophy,
  Zap,
  BarChart3,
  Radio,
  TrendingUp,
  Map as MapIcon,
  Calendar,
  Users,
  Newspaper,
  Menu,
  Home,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Akèy',
    href: '/',
    icon: Home,
    description: 'Vote kounye a',
  },
  {
    label: 'Rezilta Live',
    href: '/live',
    icon: BarChart3,
    description: 'Tan reyèl',
    badge: 'LIVE',
  },
  {
    label: 'Klasman',
    href: '/leaderboard',
    icon: Trophy,
    description: 'Top kandida',
  },
  {
    label: 'Tendans',
    href: '/trends',
    icon: TrendingUp,
    description: 'Momentum',
  },
  {
    label: 'Konpare',
    href: '/compare',
    icon: Users,
    description: 'Konpare',
  },
  {
    label: 'Batay',
    href: '/challenge',
    icon: Zap,
    description: 'Top 2 tèt kole',
  },
  {
    label: 'Aktivite',
    href: '/activity',
    icon: Radio,
    description: 'Fil aktivite',
  },
  {
    label: 'Kat',
    href: '/map',
    icon: MapIcon,
    description: 'Kat mondyal',
  },
  {
    label: 'Kwonik',
    href: '/timeline',
    icon: Calendar,
    description: 'Istorik',
  },
  {
    label: 'Medya',
    href: '/press',
    icon: Newspaper,
    description: 'Kit medya',
  },
  {
    label: 'Sou Nou',
    href: '/about',
    icon: Info,
    description: 'Enfòmasyon',
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-100/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                🇭🇹
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  HaitiVote
                </span>
                <span className="text-xs text-gray-600 font-semibold">
                  Sondaj Ofisyèl 2026
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-2">
              {navItems.slice(0, 6).map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="default"
                      className={cn(
                        'gap-2 font-bold text-sm h-11 px-5 rounded-xl transition-all duration-300',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                      {item.badge && (
                        <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0 h-4 animate-pulse">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}

              {/* More menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="default"
                    className="gap-2 font-bold text-sm h-11 px-5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 transition-all duration-300"
                  >
                    <Menu className="h-4 w-4" />
                    <span className="hidden xl:inline">Plis</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80 bg-white/95 backdrop-blur-xl">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Tout Paj
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive ? 'default' : 'ghost'}
                            className={cn(
                              'w-full justify-start gap-4 h-auto py-4 rounded-xl transition-all duration-300',
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'hover:bg-blue-50 hover:scale-105'
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <div
                              className={cn(
                                'w-10 h-10 rounded-xl flex items-center justify-center',
                                isActive
                                  ? 'bg-white/20'
                                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="text-left flex-1">
                              <p className="font-bold text-base">{item.label}</p>
                              <p
                                className={cn(
                                  'text-xs',
                                  isActive ? 'text-white/80' : 'text-gray-500'
                                )}
                              >
                                {item.description}
                              </p>
                            </div>
                            {item.badge && (
                              <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 animate-pulse">
                                {item.badge}
                              </Badge>
                            )}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/10">
        <div className="grid grid-cols-5 gap-1 p-3">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'w-full flex-col h-auto py-3 rounded-xl transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-bold">{item.label}</span>
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  )}
                </Button>
              </Link>
            );
          })}

          {/* More button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex-col h-auto py-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300"
              >
                <Menu className="h-5 w-5 mb-1" />
                <span className="text-xs font-bold">Plis</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="h-[85vh] bg-white/98 backdrop-blur-xl rounded-t-3xl"
            >
              <SheetHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🇭🇹</div>
                  <SheetTitle className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Tout Paj
                  </SheetTitle>
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-2 overflow-y-auto max-h-[calc(85vh-120px)] pb-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        className={cn(
                          'w-full justify-start gap-4 h-auto py-4 rounded-xl transition-all duration-300',
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-blue-50 hover:scale-[1.02]'
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <div
                          className={cn(
                            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                            isActive
                              ? 'bg-white/20'
                              : 'bg-gradient-to-br from-blue-100 to-purple-100'
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-base">{item.label}</p>
                          <p
                            className={cn(
                              'text-sm',
                              isActive ? 'text-white/80' : 'text-gray-500'
                            )}
                          >
                            {item.description}
                          </p>
                        </div>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Spacers */}
      <div className="h-20 lg:block hidden" /> {/* Desktop spacer */}
      <div className="h-24 lg:hidden" /> {/* Mobile bottom spacer */}
    </>
  );
}

