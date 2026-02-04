/**
 * Press Release Page - Presidential Grade
 * Media-ready press release for VoteLive platform launch
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FileText, Globe, Shield, BarChart3, 
  Users, Smartphone, TrendingUp, Radio, Share2,
  Database, Lock, Zap, MessageSquare, Eye, Download,
  Sparkles, Newspaper
} from 'lucide-react';

export default function PressReleasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 border-b border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors font-bold"
            >
              <ArrowLeft className="h-5 w-5" />
              Retounen
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                <Newspaper className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Press Release
              </h1>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900/90 border-2 border-white/20 text-white rounded-xl font-bold hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2 shadow-xl backdrop-blur-xl"
            >
              <Download className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="space-y-8">
          {/* Press Header */}
          <div className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg animate-pulse">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-300 uppercase font-black tracking-wider">
                📰 FOR IMMEDIATE RELEASE
              </div>
            </div>
            <div className="text-sm text-gray-400 font-medium space-y-1">
              <div className="text-white font-black mb-2">Contact:</div>
              <div>TechKlein Media Relations</div>
              <div>carleintech@gmail.com</div>
              <div>850 861 0959</div>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              TechKlein Launches VoteLive: Revolutionary Digital Polling Platform for Haiti's 2026 Presidential Election
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
              Platform Enables Haitians Worldwide to Participate in Transparent, Real-Time Election Opinion Poll
            </h2>
          </div>

          {/* Dateline */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl">
            <p className="text-gray-300 font-medium text-lg leading-relaxed">
              <span className="text-white font-black">Port-au-Prince, Haiti – November 2025</span> – TechKlein, a leading technology innovation company, today announced the launch of <span className="text-purple-400 font-black">VoteLive – Sondaj Ayiti Global</span>, a groundbreaking digital polling platform that allows Haitians around the world to participate in a transparent, secure, and real-time opinion poll for the upcoming 2026 presidential election.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <section className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                Empowering Global Haitian Voice
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                VoteLive represents a major technological advancement in democratic participation, offering every Haitian—whether in Port-au-Prince, Miami, Montreal, or Paris—the ability to express their electoral preference through a secure, user-friendly mobile and web platform.
              </p>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-l-4 border-blue-400 backdrop-blur-xl shadow-xl">
                <p className="text-white text-xl italic leading-relaxed mb-4">
                  "For the first time, the Haitian diaspora can participate meaningfully in the democratic process alongside citizens at home. VoteLive isn't just a polling platform—it's a tool for unity, transparency, and civic engagement in a critical moment for Haiti's future."
                </p>
                <p className="text-gray-400 text-sm font-bold">
                  – Founder, TechKlein
                </p>
              </div>
            </section>

            {/* Key Features Grid */}
            <section className="space-y-6">
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
                Key Features
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-red-500/20 ring-2 ring-red-400/30">
                      <Shield className="h-8 w-8 text-red-400" />
                    </div>
                    <h4 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">Security First</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Phone number verification (OTP)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> One vote per person enforcement
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Advanced fraud detection
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Encrypted data protection
                    </li>
                  </ul>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/20 ring-2 ring-blue-400/30">
                      <Globe className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">Global Reach</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> 4 languages (Creole, French, English, Spanish)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Accessible from 190+ countries
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Mobile-optimized for all devices
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Works on low-bandwidth connections
                    </li>
                  </ul>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-green-500/20 ring-2 ring-green-400/30">
                      <BarChart3 className="h-8 w-8 text-green-400" />
                    </div>
                    <h4 className="text-xl font-black text-white group-hover:text-green-400 transition-colors">Real-Time Transparency</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Live vote counting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Geographic breakdown by country
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Interactive dashboards and maps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Media-friendly embeds
                    </li>
                  </ul>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/20 ring-2 ring-purple-400/30">
                      <Users className="h-8 w-8 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">5 Official Candidates</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Complete candidate profiles
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Party affiliations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> High-quality photos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400 font-bold">✓</span> Biographical information
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technology Infrastructure */}
            <section className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                Technology Infrastructure
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                VoteLive is built on enterprise-grade infrastructure:
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-400/30">
                  <Database className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                  <span className="text-lg"><span className="font-black text-white">Supabase</span> for real-time database</span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-400/30">
                  <Zap className="h-6 w-6 text-purple-400 shrink-0 mt-1" />
                  <span className="text-lg"><span className="font-black text-white">Vercel Edge Network</span> for global performance</span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-xl bg-pink-500/10 border border-pink-400/30">
                  <MessageSquare className="h-6 w-6 text-pink-400 shrink-0 mt-1" />
                  <span className="text-lg"><span className="font-black text-white">Resend</span> for email verification</span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-400/30">
                  <Lock className="h-6 w-6 text-green-400 shrink-0 mt-1" />
                  <span className="text-lg"><span className="font-black text-white">Advanced encryption</span> for data security</span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
                  <Smartphone className="h-6 w-6 text-cyan-400 shrink-0 mt-1" />
                  <span className="text-lg"><span className="font-black text-white">PWA technology</span> for offline capability</span>
                </li>
              </ul>
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30 backdrop-blur-xl">
                <p className="text-gray-300 text-lg italic">
                  The platform can handle millions of concurrent votes while maintaining sub-500ms response times.
                </p>
              </div>
            </section>

            {/* Addressing Critical Need */}
            <section className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                Addressing Critical Need
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Haiti's 2026 election comes at a pivotal moment. With nearly a decade since the last national elections and a significant diaspora population, VoteLive provides:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 transition-all">
                  <h4 className="font-black text-white text-xl mb-2">Transparency</h4>
                  <p className="text-gray-400">In a climate of institutional uncertainty</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl hover:scale-105 transition-all">
                  <h4 className="font-black text-white text-xl mb-2">Engagement</h4>
                  <p className="text-gray-400">For millions of Haitians abroad</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl hover:scale-105 transition-all">
                  <h4 className="font-black text-white text-xl mb-2">Data</h4>
                  <p className="text-gray-400">For journalists, researchers, and analysts</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-400/30 backdrop-blur-xl hover:scale-105 transition-all">
                  <h4 className="font-black text-white text-xl mb-2">Voice</h4>
                  <p className="text-gray-400">For all Haitians regardless of location</p>
                </div>
              </div>
            </section>

            {/* Media Partnership */}
            <section className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <Radio className="h-8 w-8 text-white" />
                </div>
                Media Partnership Opportunities
              </h3>
              <p className="text-gray-200 text-lg mb-6 font-medium">
                TechKlein is offering media organizations:
              </p>
              <ul className="space-y-3 text-white text-lg mb-6">
                <li className="flex items-center gap-3">
                  <span className="text-green-400 font-black text-xl">✓</span> Free embed widgets for real-time results
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400 font-black text-xl">✓</span> TV-ready overlay graphics
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400 font-black text-xl">✓</span> API access for custom integrations
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400 font-black text-xl">✓</span> Dedicated media dashboard
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400 font-black text-xl">✓</span> Export capabilities for analysis
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400 font-black text-xl">✓</span> Custom press kit with graphics
                </li>
              </ul>
              <p className="text-white font-black text-lg">
                <a href="mailto:carleintech@gmail.com" className="underline hover:text-pink-300 transition-colors">carleintech@gmail.com</a>
              </p>
            </section>

            {/* Available Now */}
            <section className="text-center py-12">
              <div className="p-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 backdrop-blur-2xl shadow-2xl">
                <h3 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                  Available Now
                </h3>
                <p className="text-2xl text-gray-200 mb-6 font-medium">
                  VoteLive is live at{' '}
                  <a href="https://www.haitivote.org" className="text-blue-400 hover:text-blue-300 font-black underline transition-colors">
                    https://www.haitivote.org
                  </a>
                </p>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  The platform is free to use and requires only a phone number for verification. No account creation or personal information beyond basic demographics is required.
                </p>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-l-4 border-blue-400 backdrop-blur-xl">
                  <h4 className="font-black text-white text-lg mb-3">Q: Is this an official election?</h4>
                  <p className="text-gray-300">A: No, VoteLive is an opinion poll/survey. It does not replace official elections conducted by Haiti's electoral authorities.</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-l-4 border-green-400 backdrop-blur-xl">
                  <h4 className="font-black text-white text-lg mb-3">Q: Who can vote?</h4>
                  <p className="text-gray-300">A: Any Haitian with a valid phone number, regardless of location.</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border-l-4 border-red-400 backdrop-blur-xl">
                  <h4 className="font-black text-white text-lg mb-3">Q: How is fraud prevented?</h4>
                  <p className="text-gray-300">A: Multiple measures including phone verification, IP tracking, duplicate detection, and advanced fraud scoring algorithms.</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-l-4 border-purple-400 backdrop-blur-xl">
                  <h4 className="font-black text-white text-lg mb-3">Q: Is my vote anonymous?</h4>
                  <p className="text-gray-300">A: Yes, candidate choice is not linked to personal information.</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-l-4 border-yellow-400 backdrop-blur-xl">
                  <h4 className="font-black text-white text-lg mb-3">Q: How much does it cost?</h4>
                  <p className="text-gray-300">A: VoteLive is 100% free for all users.</p>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-6">
                About TechKlein
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                TechKlein is a technology company dedicated to building digital solutions for civic engagement, transparency, and democratic participation. Specializing in secure, scalable platforms for public participation, TechKlein leverages cutting-edge technology to empower communities and strengthen democratic processes.
              </p>
              <p className="text-gray-400">
                For more information, visit: <a href="https://techklein.com" className="text-pink-400 hover:text-pink-300 underline font-bold transition-colors">https://techklein.com</a>
              </p>
            </section>

            {/* Social Media */}
            <section className="p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                  <Share2 className="h-7 w-7 text-white" />
                </div>
                Social Media
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-black text-white text-xl mb-4">Follow for updates:</h4>
                  <ul className="space-y-3 text-gray-300 text-lg">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">▸</span> Twitter: @TechKleinHT
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">▸</span> Facebook: @TechKleinHaiti
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">▸</span> Instagram: @techkleinhaiti
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-white text-xl mb-4">Hashtags:</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm font-black shadow-lg">#HaitiVote</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-sm font-black shadow-lg">#VoteLive2026</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full text-sm font-black shadow-lg">#SondajAyiti</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 p-8 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group">
                <h4 className="font-black text-white text-xl mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  Media Kit Available:
                </h4>
                <a href="https://www.haitivote.org/press" className="text-purple-400 hover:text-purple-300 underline text-lg font-bold transition-colors">
                  https://www.haitivote.org/press
                </a>
              </div>
              <div className="group">
                <h4 className="font-black text-white text-xl mb-3 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  Live Platform:
                </h4>
                <a href="https://www.haitivote.org" className="text-blue-400 hover:text-blue-300 underline text-lg font-bold transition-colors">
                  https://www.haitivote.org
                </a>
              </div>
              <div className="group">
                <h4 className="font-black text-white text-xl mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-pink-400" />
                  Demo Access:
                </h4>
                <a href="mailto:carleintech@gmail.com" className="text-pink-400 hover:text-pink-300 underline text-lg font-bold transition-colors">
                  carleintech@gmail.com
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 py-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-2xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-gray-300 font-medium">
            © 2025 TechKlein. All rights reserved. | For media inquiries: <a href="mailto:carleintech@gmail.com" className="text-purple-400 hover:text-purple-300 underline font-bold transition-colors">carleintech@gmail.com</a>
          </p>
          <p className="text-gray-500 text-sm">
            <em>Ce communiqué est disponible en français. This press release is available in English. Este comunicado de prensa está disponible en español.</em>
          </p>
        </div>
      </footer>
    </div>
  );
}
