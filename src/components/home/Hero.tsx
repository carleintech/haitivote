'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatNumber } from '@/lib/utils';

interface HeroProps {
  totalVotes: number;
  isLive: boolean;
}

export function Hero({ totalVotes, isLive }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
      
      {/* Haitian Flag Background - Subtle */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/haiti-flag.png"
          alt="Haitian Flag"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* Animated gradient blobs */}
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl animate-blob" />
      <div className="absolute top-1/2 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-24 right-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/30 blur-3xl animate-blob animation-delay-4000" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-2 text-sm font-semibold text-white ring-2 ring-emerald-400/50 backdrop-blur-sm shadow-xl">
              <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
              Sondaj Ofisyèl 2026
            </div>

            <h1 className="mt-6 text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent md:text-7xl drop-shadow-2xl">
              HaitiVote
            </h1>
            <p className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Yon Pèp. Yon Vwa. Yon Sondaj.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300 font-medium">
              Vote pou lavni Ayiti, kote w ye nan mond lan.
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-gray-300 font-medium">
              Platfòm sondaj dijital transparan pou eleksyon 2026.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#vote">
                <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-7 py-4 text-base font-bold text-white shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-105 transition-all duration-300">
                  🗳️ Kòmanse Vote
                </button>
              </Link>
              <Link href="/live">
                <button className="rounded-xl bg-slate-900/50 border-2 border-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur-xl hover:bg-slate-800/50 hover:scale-105 transition-all duration-300">
                  📊 Rezilta an tan reyèl
                </button>
              </Link>
            </div>
          </div>

          {/* Right - Live Stats Card */}
          <div className="relative">
            <div className="rounded-3xl bg-slate-900/50 border-2 border-white/10 p-8 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-white">
                  {isLive && (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      LIVE
                    </>
                  )}
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Vòt Konte</span>
              </div>

              <div className="mt-8">
                <div className="text-7xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                  {formatNumber(totalVotes)}
                </div>
                <div className="mt-3 flex items-center gap-2 text-base text-emerald-400 font-bold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  ap ogmante chak minit
                </div>
              </div>

              {/* Mini chart */}
              <div className="mt-8 h-28 rounded-2xl bg-slate-800/50 border border-white/5 overflow-hidden">
                <div className="h-full w-full p-3">
                  <svg viewBox="0 0 300 100" className="h-full w-full">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 C40,70 60,30 90,50 C120,70 140,20 170,35 C200,50 220,10 250,30 C270,45 285,20 300,18"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                    />
                  </svg>
                </div>
              </div>

              <Link href="/live">
                <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 text-base font-bold text-white hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/50">
                  Wè Rezilta Konplè →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
