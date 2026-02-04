'use client';

import React from 'react';
import { Shield, Globe, Zap } from 'lucide-react';

const items = [
  { 
    title: 'Sekirite', 
    desc: '100% sekirite. Poze konfyans ou.', 
    icon: Shield,
    color: 'from-green-500 to-emerald-600'
  },
  { 
    title: 'Mondyal', 
    desc: 'Vote kote w ye nan mond lan.', 
    icon: Globe,
    color: 'from-blue-500 to-cyan-600'
  },
  { 
    title: 'Live', 
    desc: 'Rezilta ap monte an dirèk.', 
    icon: Zap,
    color: 'from-purple-500 to-pink-600'
  },
];

export function TrustStrip() {
  return (
    <section className="-mt-10 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 rounded-3xl bg-slate-900/50 border-2 border-white/10 p-6 backdrop-blur-2xl md:grid-cols-3 md:p-8 shadow-2xl">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-5 rounded-2xl p-5 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
              >
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-black text-lg text-white">{item.title}</div>
                  <div className="text-sm text-gray-300 font-medium">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
