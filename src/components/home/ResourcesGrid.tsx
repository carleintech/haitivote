'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Settings, BarChart3, FileText, Share2, QrCode } from 'lucide-react';

const resources = [
  { 
    title: 'Kijan pou vote', 
    desc: 'Gid etap pa etap.', 
    icon: HelpCircle,
    href: '/how-to-vote',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    title: 'Gid Admin', 
    desc: 'Pou admin & ekip yo.', 
    icon: Settings,
    href: '/admin-guide',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    title: 'Estatistik Platfòm', 
    desc: 'Transparans done.', 
    icon: BarChart3,
    href: '/launch-ready',
    color: 'from-green-500 to-emerald-600'
  },
  { 
    title: 'Kominike Laprès', 
    desc: 'Resous pou jounalis.', 
    icon: FileText,
    href: '/press-release',
    color: 'from-red-500 to-red-600'
  },
  { 
    title: 'Rezo Sosyal', 
    desc: 'Asset pou post.', 
    icon: Share2,
    href: '/social-media',
    color: 'from-pink-500 to-pink-600'
  },
  { 
    title: 'Kòd QR', 
    desc: 'Kreye QR pou pataje.', 
    icon: QrCode,
    href: '/qr',
    color: 'from-cyan-500 to-cyan-600'
  },
];

export function ResourcesGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-1.5 text-sm font-black text-white ring-2 ring-green-400/50 mb-3 shadow-xl">
            📚 Resous
          </div>
          <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent md:text-5xl">
            Resous & Dokimantasyon
          </h2>
          <p className="mt-3 text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Tout sa w bezwen konnen pou itilize platfòm nan.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <Link key={r.title} href={r.href}>
                <div className="group rounded-3xl bg-slate-900/50 border-2 border-white/10 p-8 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="flex items-start gap-5">
                    <div className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${r.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xl font-black text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {r.title}
                      </div>
                      <div className="mt-2 text-sm text-gray-300 leading-relaxed">
                        {r.desc}
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:gap-3 transition-all">
                        <span>Ouvri</span>
                        <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
