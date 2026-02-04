/**
 * About Page - HaitiVote Mission & Vision
 * Presidential-Grade Design  
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Target, 
  Eye, 
  CheckCircle2,
  Heart,
  Megaphone,
  BarChart3,
  Users,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      
      {/* Hero Section with Flag Background */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-xl" />
        
        {/* Haitian Flag Background */}
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/haiti-flag.png"
            alt="Haitian Flag"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-blob animation-delay-2000" />

        <div className="relative">
          {/* Back Button */}
          <div className="container mx-auto px-6 pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900/50 border-2 border-white/20 px-5 py-3 text-base font-bold text-white backdrop-blur-xl hover:bg-slate-800/50 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              Tounen Lakay
            </Link>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 px-5 py-2.5 text-base font-black text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
                <span>Sou Nou</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                HaitiVote
              </h1>
              
              <p className="text-3xl md:text-4xl font-black text-white">
                Yon Pèp. Yon Vwa. Yon Sondaj.
              </p>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
                Yon platfòm dijital mondyal ki kreye pou ini vwa Ayisyen nan lemonn antye.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link href="/#vote">
                  <Button size="lg" className="rounded-xl bg-emerald-500 px-8 py-6 text-lg font-bold text-white shadow-2xl shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-105 transition-all duration-300">
                    🗳️ Vote Kounye a
                  </Button>
                </Link>
                <Link href="/live">
                  <Button size="lg" className="rounded-xl bg-slate-900/50 border-2 border-white/20 px-8 py-6 text-lg font-bold text-white backdrop-blur-xl hover:bg-slate-800/50 hover:scale-105 transition-all duration-300 shadow-xl">
                    📊 Rezilta Live
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 max-w-7xl">
        
        {/* What is HaitiVote */}
        <section className="mb-24">
          <div className="rounded-3xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl p-10 md:p-16 shadow-2xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-10">
                <div className="text-6xl mb-6">🇭🇹</div>
                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Ki sa HaitiVote ye?
                </h2>
                <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>

              <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-medium">
                HaitiVote se yon platfòm dijital mondyal ki kreye pou ini vwa Ayisyen nan lemonn antye. Kèlkeswa yon Ayisyen ap viv nan Pòtoprens, Okap, Miami, Boston, Montreal, Santiago, Pari, oswa Repiblik Dominikèn, <strong className="text-blue-400">HaitiVote bay chak sitwayen yon fason senp, sekirize pou yo patisipe nan yon sondaj nasyonal</strong> epi wè rezilta an tan reyèl.
              </p>
              
              <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-medium">
                Nan kè li, HaitiVote egziste pou <strong className="text-purple-400">restore konfyans, ogmante patisipasyon sivik, epi bay nasyon an yon vizyon klè sou opinyon kolektif li</strong>. Bati ak teknoloji modèn, kouch verifikasyon solid, ak yon angajman pou transparans, HaitiVote konstwi pou li ka <strong className="text-white">endepandan, nèt, epi lib de enfliyan politik</strong>.
              </p>

              <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 p-8 md:p-10 backdrop-blur-xl shadow-xl">
                <p className="text-2xl md:text-3xl font-black text-white mb-3 text-center">
                  Sa a pa yon eleksyon.
                </p>
                <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
                  Se yon anplifikatè vwa pou pèp Ayisyen an.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-white mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
              <Heart className="h-10 w-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4">Istwa Nou</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="rounded-3xl bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl p-10 md:p-16 shadow-2xl hover:shadow-3xl hover:scale-[1.01] transition-all duration-300">
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-medium">
                Pandan deseni lane, vwa Ayisyen yo—espesyalman sa yo ki nan dyaspora a—te divize atravè distans, dezenfòmasyon, ak bri politik. HaitiVote te fèt nan yon lide senp:
              </p>
              
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-10 md:p-12 text-white shadow-2xl">
                <h3 className="text-3xl md:text-4xl font-black mb-6 drop-shadow-lg">
                  E si chak Ayisyen, nenpòt kote, te kapab pale ansanm nan yon sèl kote?
                </h3>
                <div className="space-y-5 text-lg md:text-xl text-white/95 font-medium leading-relaxed">
                  <p>E si yon etidyan nan Hinche, yon manman nan Gonayiv, yon travayè nan Santiago, ak yon biznisman nan Fort Lauderdale te ka tout vote nan menm sondaj la, an sekirite epi imedyatman?</p>
                  <p>E si jounalis yo te gen done reyèl, an tan reyèl, transparent pou enfòme popilasyon an?</p>
                  <p>E si Ayiti, pou premye fwa, te gen yon <strong className="text-yellow-300">konvèsasyon nasyonal mondyal</strong>—vizib pou tout moun?</p>
                </div>
              </div>

              <p className="text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent pt-6">
                HaitiVote se repons a kesyon sa yo.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="rounded-3xl bg-white/80 p-10 ring-1 ring-blue-200 backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white mb-6 shadow-xl">
                  <Target className="h-10 w-10" />
                </div>
                <h2 className="text-4xl font-black text-gray-900">Misyon Nou</h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mt-4"></div>
              </div>
              
              <p className="text-xl leading-relaxed text-gray-700 mb-8 font-medium text-center">
                Ini Ayisyen nan lemonn antye atravè yon platfòm dijital transparent, sekirize, ak aksesib ki mezire santiman nasyonal epi ranfòse patisipasyon sivik.
              </p>

              <div className="space-y-5">
                {[
                  { title: 'Transparans', desc: 'Tout done vizib, an tan reyèl, pa ka chanje' },
                  { title: 'Enklizyon', desc: 'Ayisyen nan tout kwen mond la ka patisipe' },
                  { title: 'Sekirite', desc: 'Verifikasyon idantite anpeche doub ak asire jistis' },
                  { title: 'Nètralite', desc: 'HaitiVote pa sipòte okenn pati, okenn kandida' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                    <CheckCircle2 className="h-7 w-7 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-lg text-gray-900 block mb-1">{item.title}</strong>
                      <p className="text-base text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="rounded-3xl bg-white/80 p-10 ring-1 ring-purple-200 backdrop-blur-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white mb-6 shadow-xl">
                  <Eye className="h-10 w-10" />
                </div>
                <h2 className="text-4xl font-black text-gray-900">Vizyon Nou</h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mt-4"></div>
              </div>
              
              <p className="text-xl leading-relaxed text-gray-700 mb-8 font-medium text-center">
                Vin platfòm sivik dijital ki pi gen konfyans pou Ayisyen tout kote. Yon platfòm ki elve opinyon piblik nan nivo li merite.
              </p>

              <div className="space-y-4">
                {[
                  'Patisipasyon dijital aksesib pou tout moun',
                  'Vwa dyaspora a finalman konte',
                  'Konfyans nan pwosesis sivik yo grandi',
                  'Desizyon gide pa done, pa spekilasyon',
                  'Pèp la santi li konekte ak nasyon li, kèlkeswa kote li ye'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                    <CheckCircle2 className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-10 w-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Kijan HaitiVote Fonksyone</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Antre enfòmasyon', desc: 'Non, dat nesans, peyi ak vil', icon: '📝', color: 'from-blue-500 to-cyan-500' },
              { step: '2', title: 'Verifye email', desc: 'Resevwa kòd OTP', icon: '📧', color: 'from-purple-500 to-pink-500' },
              { step: '3', title: 'Chwazi kandida', desc: 'Foto ak enfòmasyon klè', icon: '✅', color: 'from-emerald-500 to-teal-500' },
              { step: '4', title: 'Soumèt vot', desc: 'Konte imedyatman', icon: '🗳️', color: 'from-orange-500 to-red-500' },
              { step: '5', title: 'Wè rezilta', desc: 'Dashboard an tan reyèl', icon: '📊', color: 'from-indigo-500 to-purple-500' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white/80 p-6 ring-1 ring-gray-200 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4 text-center">{item.icon}</div>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} text-white font-black text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 text-center">{item.title}</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center shadow-2xl">
            <p className="text-2xl font-black text-white mb-2">Pa gen doub. Pa gen bot. Pa gen manipilasyon.</p>
            <p className="text-3xl font-black text-yellow-300 drop-shadow-lg">Yon Ayisyen = Yon Vwa.</p>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white mb-6 shadow-xl hover:scale-110 transition-transform duration-300">
              <Users className="h-10 w-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Kilès HaitiVote Sèvi</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🏠', title: 'Ayisyen nan Ayiti', desc: 'Soti nan zòn riral rive nan gwo vil yo', color: 'from-blue-500 to-cyan-500' },
              { icon: '✈️', title: 'Dyaspora Ayisyen', desc: 'Nan Amerik, Ewòp, ak Karayib', color: 'from-purple-500 to-pink-500' },
              { icon: '📺', title: 'Medya & Jounalis', desc: 'TV, radyo, YouTuber, jounal online', color: 'from-indigo-500 to-purple-500' },
              { icon: '🎓', title: 'Òganizasyon', desc: 'Gwoup sivik, chèchè, obsèvatè', color: 'from-emerald-500 to-teal-500' },
              { icon: '👶', title: 'Jenerasyon Demen', desc: 'Jèn k ap aprann patisipasyon sivik', color: 'from-orange-500 to-red-500' },
              { icon: '🌍', title: 'Tout Moun', desc: 'Moun ki vle wè vwa pèp Ayisyen', color: 'from-green-500 to-emerald-500' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white/80 p-8 ring-1 ring-gray-200 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-4xl mb-5 shadow-lg mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 text-center">{item.title}</h3>
                <p className="text-base text-gray-600 text-center leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-24">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 md:p-16 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/haiti-flag.png"
                alt="Haitian Flag"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="relative">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 shadow-xl">
                  <Megaphone className="h-10 w-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">Poukisa HaitiVote Enpòtan</h2>
                <div className="h-1.5 w-32 bg-white/50 mx-auto rounded-full"></div>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-2xl md:text-3xl font-black text-center mb-8">HaitiVote se plis pase yon sondaj.</p>
                
                <div className="space-y-4 text-xl md:text-2xl font-bold">
                  {[
                    'Yon pon ant Ayisyen nan Ayiti ak Ayisyen aletranje',
                    'Yon zouti pou transparans',
                    'Yon fason pou diminye dezenfòmasyon',
                    'Yon sous ki gen konfyans pou jounalis yo',
                    'Yon solisyon modèn pou yon jenerasyon dijital'
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                      <CheckCircle2 className="h-7 w-7 text-yellow-300 flex-shrink-0" />
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 text-center">
                  <p className="text-2xl md:text-3xl font-black text-yellow-300 drop-shadow-lg">
                    Pi enpòtan, se yon rapèl ke <span className="underline decoration-4">Ayiti toujou gen yon vwa pwisan</span> — vwa pèp li a.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Message */}
        <section>
          <div className="rounded-3xl bg-white/80 p-12 md:p-20 ring-1 ring-gray-200 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500 to-pink-500 text-white mb-4 shadow-2xl">
                <Heart className="h-14 w-14" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Yon Mesaj Pou Chak Ayisyen</h2>
              
              <div className="space-y-6 text-2xl md:text-3xl text-gray-700 font-bold">
                <p>Kèlkeswa kote w ap viv…</p>
                <p>Kèlkeswa orijin ou…</p>
                <p>Kèlkeswa sitiyasyon ou…</p>
              </div>

              <div className="py-8 space-y-4">
                <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vwa ou toujou enpòtan.
                </p>
                <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto">
                  HaitiVote kreye pou bay li yon kote pou li tande — ak diyite, transparans, ak inite.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Yon Pèp. Yon Vwa. Yon Sondaj.
                </p>
                <p className="text-2xl text-purple-600 font-black">Sa se lavni patisipasyon Ayisyen.</p>
              </div>

              <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/#vote">
                  <Button size="lg" className="rounded-xl bg-emerald-500 px-10 py-7 text-xl font-bold text-white shadow-2xl shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-105 transition-all duration-300">
                    🗳️ Vote Kounye a
                  </Button>
                </Link>
                <Link href="/live">
                  <Button size="lg" className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-7 text-xl font-bold text-white shadow-2xl hover:scale-105 transition-all duration-300">
                    📊 Wè Rezilta Live
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="text-4xl mb-4">🇭🇹</div>
            <p className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HaitiVote
            </p>
            <p className="text-xl font-bold text-white/90 italic">
              Yon Pèp. Yon Vwa. Yon Sondaj.
            </p>
            <p className="text-base text-white/60">
              © {new Date().getFullYear()} HaitiVote. Tout dwa rezève. Bati ak ❤️ pou Ayiti.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
