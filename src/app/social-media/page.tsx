/**
 * Social Media Content Hub
 * Comprehensive social media resources and campaign templates
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Share2, Twitter, Facebook, Instagram, Linkedin,
  Hash, MessageSquare, TrendingUp, Users, Copy,
  Mail, FileText, Sparkles, Globe, Megaphone, Award, Zap, Heart
} from 'lucide-react';

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950">
      {/* Animated Background Blobs - Social Media Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 border-b border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors font-bold"
            >
              <ArrowLeft className="h-5 w-5" />
              Retounen
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <Share2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Social Media Hub
              </h1>
            </div>
            
            <button 
              onClick={() => window.open('/press-release', '_blank')}
              className="px-4 py-2 bg-slate-900/90 border-2 border-white/20 text-white rounded-xl font-bold hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2 shadow-xl backdrop-blur-xl"
            >
              <FileText className="h-4 w-4" />
              Press Kit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg animate-pulse">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Social Media Resources
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6 font-medium">
            Complete content templates, campaign strategies, and marketing materials for VoteLive platform
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-black text-sm shadow-lg">
              📱 Multi-Platform
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-black text-sm shadow-lg">
              🗓️ Content Calendar
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-black text-sm shadow-lg">
              📊 Campaign Templates
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-black text-sm shadow-lg">
              🎯 Engagement Tools
            </span>
          </div>
        </section>

        {/* Platform Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
              <Megaphone className="h-8 w-8 text-white" />
            </div>
            Launch Announcement Templates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Twitter/X */}
            <div className="group p-6 rounded-2xl bg-slate-900/50 border-2 border-blue-400/30 backdrop-blur-2xl shadow-2xl hover:scale-105 hover:border-blue-400/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                  <Twitter className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Twitter/X Thread</h3>
                  <p className="text-sm text-gray-400">4-part launch announcement</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-slate-950/50 rounded-lg border border-white/10">
                  <p className="text-sm text-gray-300 mb-2 font-bold">Tweet 1:</p>
                  <p className="text-gray-400 italic">🇭🇹 LANSMAN: TechKlein VoteLive kounye a disponib! Premye platfòm sondaj dijital pou eleksyon Ayiti 2026. Vwa w konte! → www.haitivote.org #HaitiVote #Ayiti2026</p>
                </div>
                <div className="p-4 bg-slate-950/50 rounded-lg border border-white/10">
                  <p className="text-sm text-gray-300 mb-2 font-bold">Tweet 2:</p>
                  <p className="text-gray-400 italic">✅ 5 kandida ofisyèl ✅ Verifikasyon sekirize ✅ Rezilta live ✅ Dyaspora akeyi ✅ 100% gratis. Ou pa bezwen kont! 📱 #HaitiVote</p>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg">
                <Copy className="h-4 w-4" />
                Copy Thread
              </button>
            </div>

            {/* Facebook */}
            <div className="group p-6 rounded-2xl bg-slate-900/50 border-2 border-indigo-400/30 backdrop-blur-2xl shadow-2xl hover:scale-105 hover:border-indigo-400/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg">
                  <Facebook className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Facebook Post</h3>
                  <p className="text-sm text-gray-400">Community announcement</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-lg border border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed">
                  🇭🇹 GADE SA! TechKlein pwoud pou prezante: VoteLive – Sondaj Ayiti Global<br/><br/>
                  Pou premye fwa, chak Ayisyen nan mond lan ka vote nan yon sondaj nasyonal transparan!<br/><br/>
                  🔹 5 kandida ofisyèl<br/>
                  🔹 Sekirite maksimòm<br/>
                  🔹 Rezilta live<br/>
                  🔹 4 lang disponib<br/><br/>
                  👉 www.haitivote.org
                </p>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg">
                <Copy className="h-4 w-4" />
                Copy Post
              </button>
            </div>

            {/* Instagram */}
            <div className="group p-6 rounded-2xl bg-slate-900/50 border-2 border-pink-400/30 backdrop-blur-2xl shadow-2xl hover:scale-105 hover:border-pink-400/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Instagram Caption</h3>
                  <p className="text-sm text-gray-400">Visual story + hashtags</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-lg border border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed">
                  🗳️ VWA W KONTE! 🇭🇹<br/><br/>
                  Prezante @techkleinhaiti VoteLive – premye platfòm sondaj dijital pou Ayiti!<br/><br/>
                  ✨ 5 kandida • Vote sekirize • Rezilta live • Kat mondyal<br/><br/>
                  Vote jodi a! Lyen nan bio ⬆️<br/><br/>
                  #HaitiVote #Ayiti2026 #HaitianPride
                </p>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg">
                <Copy className="h-4 w-4" />
                Copy Caption
              </button>
            </div>

            {/* LinkedIn */}
            <div className="group p-6 rounded-2xl bg-slate-900/50 border-2 border-blue-700/50 backdrop-blur-2xl shadow-2xl hover:scale-105 hover:border-blue-600/60 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl shadow-lg">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">LinkedIn Post</h3>
                  <p className="text-sm text-gray-400">Professional announcement</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-lg border border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Proud to announce VoteLive by TechKlein - a groundbreaking digital polling platform for Haiti's election.<br/><br/>
                  🔑 Key Innovation: First secure polling enabling global diaspora participation<br/>
                  📊 Real-time transparency with enterprise-grade security<br/>
                  🌍 Connects 2+ million diaspora Haitians<br/><br/>
                  www.haitivote.org
                </p>
              </div>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-xl font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg">
                <Copy className="h-4 w-4" />
                Copy Post
              </button>
            </div>
          </div>
        </section>

        {/* Hashtag Strategy */}
        <section className="mb-16">
          <h2 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <Hash className="h-8 w-8 text-white" />
            </div>
            Hashtag Strategy
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Primary */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border-2 border-green-400/30 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Primary Hashtags</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Always use these</p>
              <div className="space-y-2">
                {['#HaitiVote', '#VoteLive2026', '#TechKlein', '#Ayiti2026'].map((tag) => (
                  <div key={tag} className="px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30 text-green-400 font-black text-sm flex items-center justify-between hover:scale-105 transition-all">
                    {tag}
                    <Copy className="h-4 w-4 cursor-pointer hover:text-green-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border-2 border-blue-400/30 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Secondary Hashtags</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Rotate these</p>
              <div className="flex flex-wrap gap-2">
                {['#HaitianDiaspora', '#DemocracyMatters', '#YourVoiceCounts', '#HaitianPride', '#TechForGood', '#CivicEngagement'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-400 rounded text-xs font-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Creole */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border-2 border-purple-400/30 backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Creole Hashtags</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">Local engagement</p>
              <div className="flex flex-wrap gap-2">
                {['#SondajAyiti', '#VwaW', '#AyisyenAyisyen', '#FyèteAyisyen', '#JayVoteLive', '#DemokrasiAyiti'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-400 rounded text-xs font-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg animate-pulse">
              <Zap className="h-8 w-8 text-white" />
            </div>
            Milestone Post Templates
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { milestone: '1,000 votes', emoji: '🎯', message: 'Premye milye!', gradientFrom: 'from-yellow-500/20', gradientTo: 'to-orange-500/20', borderColor: 'border-yellow-400/40' },
              { milestone: '5,000 votes', emoji: '🚀', message: '5K fò!', gradientFrom: 'from-blue-500/20', gradientTo: 'to-cyan-500/20', borderColor: 'border-blue-400/40' },
              { milestone: '10,000 votes', emoji: '⚡', message: '10K ansanm!', gradientFrom: 'from-purple-500/20', gradientTo: 'to-pink-500/20', borderColor: 'border-purple-400/40' },
              { milestone: '25,000 votes', emoji: '💥', message: '25K epi n ap kontinye!', gradientFrom: 'from-red-500/20', gradientTo: 'to-orange-500/20', borderColor: 'border-red-400/40' },
              { milestone: '50,000 votes', emoji: '🌟', message: '50K vwa!', gradientFrom: 'from-green-500/20', gradientTo: 'to-emerald-500/20', borderColor: 'border-green-400/40' },
              { milestone: '100,000 votes', emoji: '🏆', message: '100K! Istorik!', gradientFrom: 'from-amber-500/20', gradientTo: 'to-yellow-500/20', borderColor: 'border-amber-400/40' },
            ].map((item) => (
              <div key={item.milestone} className={`bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-2xl p-6 border-2 ${item.borderColor} backdrop-blur-xl shadow-2xl hover:scale-105 transition-all`}>
                <div className="text-center">
                  <span className="text-5xl mb-3 block">{item.emoji}</span>
                  <h3 className="text-2xl font-black text-white mb-2">{item.milestone}</h3>
                  <p className="text-xl text-gray-300 font-black mb-4">"{item.message}"</p>
                  <div className="p-4 bg-slate-950/50 rounded-xl border border-white/10 text-sm text-gray-300">
                    <p className="font-black text-white">🎉 [{item.milestone.toUpperCase()}] VÒT!</p>
                    <p>Mèsi pou tout moun ki patisipe!</p>
                    <p>Pa vote ankò? → www.haitivote.org</p>
                    <p className="text-gray-500 mt-2 font-bold">#HaitiVote #Milestone</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Email Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            Email Campaign Templates
          </h2>

          <div className="space-y-6">
            {[
              { 
                title: 'Welcome Email (Post-Vote)', 
                icon: Heart, 
                iconBg: 'from-red-500 to-pink-600',
                borderColor: 'border-red-400',
                description: 'Confirmation and next steps',
                preview: 'Subject: Mèsi pou vote sou VoteLive! 🇭🇹'
              },
              { 
                title: 'Weekly Digest', 
                icon: TrendingUp, 
                iconBg: 'from-blue-500 to-cyan-600',
                borderColor: 'border-blue-400',
                description: 'Stats and updates',
                preview: 'Subject: Semèn sa sou VoteLive - Mizajou & Rezilta 📊'
              },
              { 
                title: 'Milestone Announcement', 
                icon: Award, 
                iconBg: 'from-yellow-500 to-orange-600',
                borderColor: 'border-yellow-400',
                description: 'Celebrate achievements',
                preview: 'Subject: 🎉 Nou rive [X] vòt! Mèsi Ayiti! 🇭🇹'
              },
            ].map((template) => (
              <div key={template.title} className={`p-6 rounded-2xl bg-slate-900/50 border-l-4 ${template.borderColor} backdrop-blur-2xl shadow-2xl hover:scale-105 transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-br ${template.iconBg} rounded-xl shadow-lg flex-shrink-0`}>
                    <template.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-2">{template.title}</h3>
                    <p className="text-gray-400 mb-3">{template.description}</p>
                    <div className="p-3 bg-slate-950/50 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-300 font-mono">{template.preview}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-black hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0 shadow-lg">
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Tips */}
        <section>
          <h2 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-8 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            Engagement Best Practices
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📱', title: 'Post Frequency', tip: '3-5 times daily during launch week' },
              { icon: '🕐', title: 'Best Times', tip: 'Morning (7-9am), Lunch (12-2pm), Evening (7-9pm)' },
              { icon: '💬', title: 'Respond Fast', tip: 'Reply to comments within 1 hour' },
              { icon: '📊', title: 'Track Metrics', tip: 'Monitor engagement, reach, and conversions' },
              { icon: '🎯', title: 'Use CTAs', tip: 'Always include "Vote now" call-to-action' },
              { icon: '🖼️', title: 'Visual Content', tip: 'Posts with images get 2.3x more engagement' },
              { icon: '🎥', title: 'Video Priority', tip: 'Video content gets 5x more engagement' },
              { icon: '🤝', title: 'Community First', tip: 'Share user-generated content daily' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl shadow-2xl text-center hover:scale-105 transition-all">
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <h3 className="font-black text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 py-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-2xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 mb-4 font-medium">
            © 2025 TechKlein. All rights reserved. | For partnership inquiries: <a href="mailto:carleintech@gmail.com" className="text-purple-400 hover:text-purple-300 underline font-bold transition-colors">carleintech@gmail.com</a>
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="https://twitter.com/TechKleinHT" className="hover:text-blue-400 transition-colors font-bold">
              @TechKleinHT
            </a>
            <a href="https://facebook.com/TechKleinHaiti" className="hover:text-blue-400 transition-colors font-bold">
              @TechKleinHaiti
            </a>
            <a href="https://instagram.com/techkleinhaiti" className="hover:text-blue-400 transition-colors font-bold">
              @techkleinhaiti
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
