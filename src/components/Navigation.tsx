/**
 * Enhanced Global Navigation
 * Responsive navigation with all pages
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
import { Separator } from '@/components/ui/separator';
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
    label: 'Klasman',
    href: '/leaderboard',
    icon: Trophy,
    description: 'Top kandida',
  },
  {
    label: 'Batay',
    href: '/challenge',
    icon: Zap,
    description: 'Top 2 tèt kole',
  },
  {
    label: 'Rezilta Live',
    href: '/live',
    icon: BarChart3,
    description: 'Tan reyèl',
  },
  {
    label: 'Aktivite',
    href: '/activity',
    icon: Radio,
    description: 'Fil aktivite',
  },
  {
    label: 'Tendans',
    href: '/trends',
    icon: TrendingUp,
    description: 'Momentum',
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
    label: 'Konpare',
    href: '/compare',
    icon: Users,
    description: 'Konpare',
  },
  {
    label: 'Medya',
    href: '/press',
    icon: Newspaper,
    description: 'Kit medya',
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  VoteLive
                </span>
                <span className="text-xs text-muted-foreground">TechKlein</span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.slice(0, 6).map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={cn(
                        'gap-2',
                        isActive && 'bg-primary'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}

              {/* More menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-4 w-4" />
                    <span className="ml-2 hidden xl:inline">Plis</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Tout Paj</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={isActive ? 'default' : 'ghost'}
                            className="w-full justify-start gap-3"
                            onClick={() => setOpen(false)}
                          >
                            <Icon className="h-5 w-5" />
                            <div className="text-left">
                              <p className="font-semibold">{item.label}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-bottom">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="w-full flex-col h-auto py-2"
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}

          {/* More button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full flex-col h-auto py-2">
                <Menu className="h-5 w-5 mb-1" />
                <span className="text-xs">Plis</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Tout Paj</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-2 overflow-y-auto max-h-[calc(80vh-100px)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        className="w-full justify-start gap-3"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
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
      <div className="h-16 lg:block hidden" /> {/* Desktop spacer */}
      <div className="h-20 lg:hidden" /> {/* Mobile bottom spacer */}
    </>
  );
}
