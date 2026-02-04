'use client';

import React from 'react';
import Link from 'next/link';

const navigation = {
  main: [
    { name: 'Sou Nou', href: '/about' },
    { name: 'Rezilta Live', href: '/live' },
    { name: 'Konpare', href: '/compare' },
    { name: 'Tendans', href: '/trends' },
    { name: 'Klasman', href: '/leaderboard' },
    { name: 'Kat Mondyal', href: '/map' },
  ],
  resources: [
    { name: 'Kijan pou Vote', href: '/how-to-vote' },
    { name: 'Kit Medya', href: '/press' },
    { name: 'Estatistik', href: '/launch-ready' },
    { name: 'Gid Admin', href: '/admin-guide' },
    { name: 'Kominike', href: '/press-release' },
    { name: 'Rezo Sosyal', href: '/social-media' },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HaitiVote
            </div>
            <p className="mt-4 text-base text-white/70 leading-relaxed font-medium">
              Platfòm sondaj transparan pou eleksyon Ayiti 2026.
            </p>
            <p className="mt-4 text-lg font-bold text-white/90 italic">
              Yon Pèp. Yon Vwa. Yon Sondaj.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="text-3xl">🇭🇹</span>
              <span className="text-sm text-white/60">Bati pou Ayiti</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-sm font-black text-white/95 uppercase tracking-wider mb-4">
              Navigasyon
            </div>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-base text-white/70 hover:text-white transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-sm font-black text-white/95 uppercase tracking-wider mb-4">
              Resous
            </div>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-base text-white/70 hover:text-white transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-black text-white/95 uppercase tracking-wider mb-4">
              Kontak
            </div>
            <p className="text-base text-white/70 leading-relaxed mb-4 font-medium">
              Pou kesyon oswa sipò teknik:
            </p>
            <a
              href="mailto:carleintech@gmail.com"
              className="text-base font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              carleintech@gmail.com
            </a>
            <div className="mt-6 flex gap-3">
              <a
                href="https://twitter.com/TechKleinHT"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10 hover:bg-white/20 transition-all hover:scale-110 duration-300"
              >
                <span className="text-lg font-bold">𝕏</span>
              </a>
              <a
                href="https://facebook.com/TechKlein"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10 hover:bg-white/20 transition-all hover:scale-110 duration-300"
              >
                <span className="text-lg font-bold">f</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/60 font-medium">
              © {new Date().getFullYear()} HaitiVote. Tout dwa rezève.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
              <span>Bati ak</span>
              <span className="text-red-400 text-lg">❤️</span>
              <span>pou Ayiti</span>
              <span className="text-2xl">🇭🇹</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
