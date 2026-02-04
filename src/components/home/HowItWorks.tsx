'use client';

import React from 'react';
import { User, CheckCircle2, Vote } from 'lucide-react';

const steps = [
  {
    n: '1',
    title: 'Chwazi kandida',
    desc: 'Chwazi kandida ou pami lis ofisyèl la.',
    icon: User,
    color: 'from-blue-500 to-blue-600',
  },
  {
    n: '2',
    title: 'Konfime idantite w',
    desc: 'Pwoteje platfòm nan kont fo vòt.',
    icon: CheckCircle2,
    color: 'from-purple-500 to-purple-600',
  },
  {
    n: '3',
    title: 'Vote & wè rezilta',
    desc: 'Vòt la konte, rezilta yo monte live.',
    icon: Vote,
    color: 'from-emerald-500 to-emerald-600',
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent md:text-5xl">
        Kòman li fonksyone?
      </h2>
      <p className="mt-3 text-xl text-gray-300 font-medium">
        3 etap senp pou vote rapid, an sekirite.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.n}
              className="group rounded-3xl bg-slate-900/50 border-2 border-white/10 p-8 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between">
                <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${s.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-base font-black text-white shadow-lg">
                  {s.n}
                </span>
              </div>

              <div className="mt-6 text-2xl font-black text-white">
                {s.title}
              </div>
              <div className="mt-3 text-base text-gray-300 leading-relaxed">
                {s.desc}
              </div>

              <div className="pointer-events-none mt-8 h-1.5 w-0 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-500 group-hover:w-full" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
