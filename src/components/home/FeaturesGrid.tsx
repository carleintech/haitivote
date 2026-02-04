'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Trophy, GitCompare, Map } from 'lucide-react';

const features = [
  { 
    title: 'Tendans', 
    desc: 'Analize mouvman ak estatistik.', 
    icon: TrendingUp,
    href: '/trends',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    title: 'Klasman', 
    desc: 'Klasman kandida yo an detay.', 
    icon: Trophy,
    href: '/leaderboard',
    color: 'from-yellow-500 to-amber-600'
  },
  { 
    title: 'Konpare', 
    desc: 'Konpare 2 kandida bò kote bò.', 
    icon: GitCompare,
    href: '/compare',
    color: 'from-green-500 to-emerald-600'
  },
  { 
    title: 'Kat Ayiti', 
    desc: 'Rezilta pa depatman & zòn.', 
    icon: Map,
    href: '/map',
    color: 'from-cyan-500 to-blue-600'
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-sm font-black text-white ring-2 ring-purple-400/50 mb-3 shadow-xl">
            ✨ Eksplorè
          </div>
          <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent md:text-5xl">
            Eksplorè Rezilta yo
          </h2>
          <p className="mt-3 text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Analize done yo, swiv tendans, epi konpare kandida yo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.title} href={f.href}>
                <div className="group rounded-3xl bg-slate-900/50 border-2 border-white/10 p-8 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="flex items-start gap-6">
                    <div className={`grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${f.color} shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                      <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-black text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {f.title}
                      </div>
                      <div className="mt-2 text-base text-gray-300 leading-relaxed">
                        {f.desc}
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:gap-3 transition-all">
                        <span>Eksplore</span>
                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
