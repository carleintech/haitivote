/**
 * Social Media Content Hub
 * Comprehensive social media resources and campaign templates
 */

import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, Share2, Twitter, Facebook, Instagram, Linkedin,
  Hash, MessageSquare, TrendingUp, Calendar, Users, Copy,
  Mail, FileText, Video, Image as ImageIcon, Download, Sparkles,
  Target, Globe, Megaphone, Award, Zap, Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Social Media Resources | HaitiVote',
  description: 'Complete social media content templates and campaign resources for VoteLive platform',
  openGraph: {
    title: 'Social Media Resources | HaitiVote',
    description: 'Social media templates, content calendar, and campaign materials',
  },
};

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-[#006CFF] transition-colors font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Retounen
            </Link>
            
            <div className="flex items-center gap-3">
              <Share2 className="h-6 w-6 text-[#006CFF]" />
              <h1 className="text-xl font-bold text-gray-900">
                Social Media Hub
              </h1>
            </div>
            
            <button 
              onClick={() => window.open('/press-release', '_blank')}
              className="px-4 py-2 bg-[#006CFF] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Press Kit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-12 w-12 text-blue-600 animate-pulse" />
            <h1 className="text-5xl font-bold text-gray-900">
              Social Media Resources
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            Complete content templates, campaign strategies, and marketing materials for VoteLive platform
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
              📱 Multi-Platform
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm">
              🗓️ Content Calendar
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold text-sm">
              📊 Campaign Templates
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
              🎯 Engagement Tools
            </span>
          </div>
        </section>

        {/* Platform Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-blue-600" />
            Launch Announcement Templates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Twitter/X */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Twitter className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Twitter/X Thread</h3>
                  <p className="text-sm text-gray-600">4-part launch announcement</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2"><strong>Tweet 1:</strong></p>
                  <p className="text-gray-600 italic">🇭🇹 LANSMAN: TechKlein VoteLive kounye a disponib! Premye platfòm sondaj dijital pou eleksyon Ayiti 2025-2026. Vwa w konte! → www.haitivote.org #HaitiVote #Ayiti2026</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2"><strong>Tweet 2:</strong></p>
                  <p className="text-gray-600 italic">✅ 47 kandida ofisyèl ✅ Verifikasyon sekirize ✅ Rezilta live ✅ Dyaspora akeyi ✅ 100% gratis. Ou pa bezwen kont! 📱 #HaitiVote</p>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Thread
              </button>
            </div>

            {/* Facebook */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-indigo-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Facebook className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Facebook Post</h3>
                  <p className="text-sm text-gray-600">Community announcement</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  🇭🇹 GADE SA! TechKlein pwoud pou prezante: VoteLive – Sondaj Ayiti Global<br/><br/>
                  Pou premye fwa, chak Ayisyen nan mond lan ka vote nan yon sondaj nasyonal transparan!<br/><br/>
                  🔹 47 kandida ofisyèl<br/>
                  🔹 Sekirite maksimòm<br/>
                  🔹 Rezilta live<br/>
                  🔹 4 lang disponib<br/><br/>
                  👉 www.haitivote.org
                </p>
              </div>
              <button className="mt-4 w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Post
              </button>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <Instagram className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Instagram Caption</h3>
                  <p className="text-sm text-gray-600">Visual story + hashtags</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  🗳️ VWA W KONTE! 🇭🇹<br/><br/>
                  Prezante @techkleinhaiti VoteLive – premye platfòm sondaj dijital pou Ayiti!<br/><br/>
                  ✨ 47 kandida • Vote sekirize • Rezilta live • Kat mondyal<br/><br/>
                  Vote jodi a! Lyen nan bio ⬆️<br/><br/>
                  #HaitiVote #Ayiti2026 #HaitianPride
                </p>
              </div>
              <button className="mt-4 w-full py-2 bg-pink-50 text-pink-600 rounded-lg font-semibold hover:bg-pink-100 transition-colors flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Caption
              </button>
            </div>

            {/* LinkedIn */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-800 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-900 rounded-lg">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">LinkedIn Post</h3>
                  <p className="text-sm text-gray-600">Professional announcement</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Proud to announce VoteLive by TechKlein - a groundbreaking digital polling platform for Haiti's election.<br/><br/>
                  🔑 Key Innovation: First secure polling enabling global diaspora participation<br/>
                  📊 Real-time transparency with enterprise-grade security<br/>
                  🌍 Connects 2+ million diaspora Haitians<br/><br/>
                  www.haitivote.org
                </p>
              </div>
              <button className="mt-4 w-full py-2 bg-blue-50 text-blue-900 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <Copy className="h-4 w-4" />
                Copy Post
              </button>
            </div>
          </div>
        </section>

        {/* Content Calendar */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            Weekly Content Calendar
          </h2>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Week 1: Launch Week</h3>
            
            <div className="space-y-4">
              {[
                { day: 'Monday', theme: 'Launch Day', icon: '🚀', color: 'red', tasks: ['Press release', 'Twitter thread', 'Facebook video', 'Instagram carousel', 'Stories'] },
                { day: 'Tuesday', theme: 'Education', icon: '📚', color: 'blue', tasks: ['How-to-vote tutorial', 'Security features', 'Tech architecture', 'Step-by-step guides'] },
                { day: 'Wednesday', theme: 'Stats Day', icon: '📊', color: 'green', tasks: ['24-hour results', 'Vote milestones', 'Country breakdown', 'Thank you messages'] },
                { day: 'Thursday', theme: 'Engagement', icon: '💬', color: 'yellow', tasks: ['Tag challenges', 'Testimonials', 'Polls', 'User content'] },
                { day: 'Friday', theme: 'Momentum', icon: '📈', color: 'purple', tasks: ['Weekly summary', 'Top candidates', 'Analytics report', 'Infographics'] },
                { day: 'Weekend', theme: 'Community', icon: '🤝', color: 'pink', tasks: ['Diaspora spotlight', 'Global reach stats', 'UGC reposts', 'Community voices'] },
              ].map((day) => (
                <div key={day.day} className={`p-4 bg-${day.color}-50 rounded-lg border-l-4 border-${day.color}-500`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{day.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900">{day.day}</h4>
                        <p className="text-sm text-gray-600">{day.theme}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="ml-11 space-y-1">
                    {day.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Daily Themes (Week 2+)
              </h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="text-sm text-gray-700">📅 <strong>Mon:</strong> Motivation Monday</div>
                <div className="text-sm text-gray-700">💻 <strong>Tue:</strong> Tech Tuesday</div>
                <div className="text-sm text-gray-700">🌍 <strong>Wed:</strong> World Wednesday</div>
                <div className="text-sm text-gray-700">⏮️ <strong>Thu:</strong> Throwback Thursday</div>
                <div className="text-sm text-gray-700">⭐ <strong>Fri:</strong> Feature Friday</div>
                <div className="text-sm text-gray-700">📊 <strong>Sat:</strong> Stats Saturday</div>
              </div>
            </div>
          </div>
        </section>

        {/* Hashtag Strategy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Hash className="h-8 w-8 text-green-600" />
            Hashtag Strategy
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Primary */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Primary Hashtags</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Always use these</p>
              <div className="space-y-2">
                {['#HaitiVote', '#VoteLive2026', '#TechKlein', '#Ayiti2026'].map((tag) => (
                  <div key={tag} className="px-3 py-2 bg-green-50 rounded-lg text-green-700 font-semibold text-sm flex items-center justify-between">
                    {tag}
                    <Copy className="h-4 w-4 cursor-pointer hover:text-green-900" />
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Secondary Hashtags</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Rotate these</p>
              <div className="flex flex-wrap gap-2">
                {['#HaitianDiaspora', '#DemocracyMatters', '#YourVoiceCounts', '#HaitianPride', '#TechForGood', '#CivicEngagement'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Creole */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Creole Hashtags</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Local engagement</p>
              <div className="flex flex-wrap gap-2">
                {['#SondajAyiti', '#VwaW', '#AyisyenAyisyen', '#FyèteAyisyen', '#JayVoteLive', '#DemokrasiAyiti'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-600" />
            Milestone Post Templates
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { milestone: '1,000 votes', emoji: '🎯', message: 'Premye milye!', color: 'yellow' },
              { milestone: '5,000 votes', emoji: '🚀', message: '5K fò!', color: 'blue' },
              { milestone: '10,000 votes', emoji: '⚡', message: '10K ansanm!', color: 'purple' },
              { milestone: '25,000 votes', emoji: '💥', message: '25K epi n ap kontinye!', color: 'red' },
              { milestone: '50,000 votes', emoji: '🌟', message: '50K vwa!', color: 'green' },
              { milestone: '100,000 votes', emoji: '🏆', message: '100K! Istorik!', color: 'orange' },
            ].map((item) => (
              <div key={item.milestone} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-xl p-6 border-2 border-${item.color}-200`}>
                <div className="text-center">
                  <span className="text-5xl mb-3 block">{item.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.milestone}</h3>
                  <p className="text-xl text-gray-700 font-semibold mb-4">"{item.message}"</p>
                  <div className="p-4 bg-white rounded-lg text-sm text-gray-700">
                    <p>🎉 [{item.milestone.toUpperCase()}] VÒT!</p>
                    <p>Mèsi pou tout moun ki patisipe!</p>
                    <p>Pa vote ankò? → www.haitivote.org</p>
                    <p className="text-gray-500 mt-2">#HaitiVote #Milestone</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Email Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Mail className="h-8 w-8 text-red-600" />
            Email Campaign Templates
          </h2>

          <div className="space-y-6">
            {[
              { 
                title: 'Welcome Email (Post-Vote)', 
                icon: Heart, 
                color: 'red',
                description: 'Confirmation and next steps',
                preview: 'Subject: Mèsi pou vote sou VoteLive! 🇭🇹'
              },
              { 
                title: 'Weekly Digest', 
                icon: TrendingUp, 
                color: 'blue',
                description: 'Stats and updates',
                preview: 'Subject: Semèn sa sou VoteLive - Mizajou & Rezilta 📊'
              },
              { 
                title: 'Milestone Announcement', 
                icon: Award, 
                color: 'yellow',
                description: 'Celebrate achievements',
                preview: 'Subject: 🎉 Nou rive [X] vòt! Mèsi Ayiti! 🇭🇹'
              },
            ].map((template) => (
              <div key={template.title} className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-${template.color}-500 hover:shadow-xl transition-shadow`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${template.color}-100 rounded-lg flex-shrink-0`}>
                    <template.icon className={`h-6 w-6 text-${template.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
                    <p className="text-gray-600 mb-3">{template.description}</p>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 font-mono">{template.preview}</p>
                    </div>
                  </div>
                  <button className={`px-4 py-2 bg-${template.color}-50 text-${template.color}-700 rounded-lg font-semibold hover:bg-${template.color}-100 transition-colors flex items-center gap-2 flex-shrink-0`}>
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Media Kit */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Download className="h-8 w-8 text-indigo-600" />
            Media Kit & Resources
          </h2>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Complete Media Kit Available</h3>
            <p className="text-lg mb-6 opacity-90">
              Logos, screenshots, videos, infographics, and more - everything you need for promotion
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: ImageIcon, label: 'Logos & Graphics', count: '20+ files' },
                { icon: Video, label: 'Video Content', count: '6 videos' },
                { icon: FileText, label: 'Documents', count: '7 PDFs' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <item.icon className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-bold">{item.label}</p>
                  <p className="text-sm opacity-75">{item.count}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Full Kit
              </button>
              <Link 
                href="/press-release"
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                <FileText className="h-5 w-5" />
                View Press Release
              </Link>
            </div>
          </div>
        </section>

        {/* Engagement Tips */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Users className="h-8 w-8 text-orange-600" />
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
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow">
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            © 2025 TechKlein. All rights reserved. | For partnership inquiries: press@techklein.com
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://twitter.com/TechKleinHT" className="hover:text-blue-600 transition-colors">
              @TechKleinHT
            </a>
            <a href="https://facebook.com/TechKleinHaiti" className="hover:text-blue-600 transition-colors">
              @TechKleinHaiti
            </a>
            <a href="https://instagram.com/techkleinhaiti" className="hover:text-blue-600 transition-colors">
              @techkleinhaiti
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
