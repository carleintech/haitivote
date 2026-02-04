/**
 * How to Vote Page - Presidential Grade
 * Enterprise-level voting guide with glassmorphism design
 */

import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Phone, User, Calendar, MapPin, MessageSquare, Trophy, AlertCircle, Clock, Share2, Sparkles, Zap, Mail, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kijan pou Vote | HaitiVote',
  description: 'Gid konplè etap pa etap pou vote nan platfòm HaitiVote',
  openGraph: {
    title: 'Kijan pou Vote | HaitiVote',
    description: 'Aprann kijan pou vote fasil epi rapid',
  },
};

export default function HowToVotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              Retounen
            </Link>
            
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Kijan pou Vote
              </h1>
            </div>
            
            <Link 
              href="/vote" 
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-black hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              Vote Kounye a
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 backdrop-blur-xl ring-1 ring-white/10">
            <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
            <span className="font-black text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GID OFISYÈL
            </span>
          </div>

          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Aprann Kijan pou Vote 🇭🇹
          </h2>
          
          <p className="text-2xl text-gray-300 font-medium max-w-2xl mx-auto">
            Gid senp etap pa etap pou vote nan HaitiVote
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="group relative rounded-2xl bg-slate-900/50 backdrop-blur-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">2 minit sèlman</span>
              </div>
            </div>

            <div className="group relative rounded-2xl bg-slate-900/50 backdrop-blur-xl p-4 border border-white/10 hover:border-green-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">100% gratis</span>
              </div>
            </div>

            <div className="group relative rounded-2xl bg-slate-900/50 backdrop-blur-xl p-4 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-105 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Rezilta imedya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Steps 1 & 2 - Side by Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-blue-400/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Step Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-3xl font-black bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">1</span>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white">Chwazi Kandida W</h3>
                  <p className="text-blue-100 text-lg mt-2 font-medium">Premye etap: Deside pou ki kandida w ap vote</p>
                </div>
              </div>
            </div>
            
            {/* Step Content */}
            <div className="relative p-8 space-y-6">
              <div className="space-y-5">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-black">1</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-white mb-1">Ale sou</p>
                    <a href="https://www.haitivote.org" className="text-blue-400 hover:text-blue-300 font-bold text-base transition-colors">
                      https://www.haitivote.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-black">2</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-white mb-1">Gade 5 kandida ofisyèl yo</p>
                    <p className="text-sm text-gray-400">Tout kandida afiche ak foto yo sou paj prensipal la</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-black">3</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-white mb-1">Itilize ba rechèch la</p>
                    <p className="text-sm text-gray-400">Si w ap chèche yon non espesifik, tape l nan ba rechèch</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-black">4</span>
                  </div>
                  <div>
                    <p className="text-base font-bold text-white mb-1">Klike sou foto kandida a</p>
                    <p className="text-sm text-gray-400">Kat la ap vin ble - sa vle di li seleksyone</p>
                  </div>
                </div>
              </div>

              {/* Tip Box */}
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl p-4 border-2 border-blue-400/30 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm mb-1">💡 Konsèy:</p>
                    <p className="text-gray-300 text-sm font-medium">Klike sou "Bio" pou wè plis enfòmasyon sou kandida a anvan w vote</p>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-purple-400/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Step Header */}
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">Ranpli Enfòmasyon W</h3>
                    <p className="text-purple-100 text-sm mt-1 font-medium">Dezyèm etap: Bay enfòmasyon debaz ou</p>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="relative p-6 space-y-4">
                <p className="text-lg text-gray-300 font-medium">Apre w chwazi kandida, w ap wè yon fòm. Ranpli:</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-purple-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Non Konplè</p>
                      <p className="text-sm text-gray-400">Jan yo rele w (prenon ak non fanmi)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-purple-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Dat Nesans</p>
                      <p className="text-sm text-gray-400">Mwa/Jou/Ane (Egzanp: 01/15/1990)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-purple-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Peyi & Vil/Rejyon</p>
                      <p className="text-sm text-gray-400">Kote w ap viv kounye a (peyi ak vil oswa eta)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-purple-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Adrès Email</p>
                      <p className="text-sm text-gray-400">Pou konfirmasyon ak sekirite (example@email.com)</p>
                    </div>
                  </div>
                </div>

                {/* Security Box */}
                <div className="relative rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl p-4 border-2 border-green-400/30 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm mb-1">📝 Enpòtan:</p>
                      <p className="text-gray-300 text-sm font-medium">Enfòmasyon sa yo prive epi yo itilize sèlman pou anpeche moun vote 2 fwa. Nou pa pataje yo ak pèsonn.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps 3 & 4 - Side by Side on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Step 3 */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-green-400/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Step Header */}
              <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-3xl font-black bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">Chwazi Kandida W</h3>
                    <p className="text-blue-100 text-sm mt-1 font-medium">Premye etap: Deside pou ki kandida w ap vote</p>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="relative p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-green-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Resevwa Email</p>
                      <p className="text-sm text-gray-400">Yon kòd 6 chif ap voyé ba w nan adrès email ou te bay la</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-green-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Antre Kòd</p>
                      <p className="text-sm text-gray-400">Tape kòd 6 chif la nan bwat ki parèt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-green-400/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white mb-1">Kòd pa rive?</p>
                      <p className="text-sm text-gray-400">Klike "Revoye kòd" pou resevwa yon nouvo kòd</p>
                    </div>
                  </div>
                </div>

                {/* Warning Box */}
                <div className="relative rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-xl p-4 border-2 border-yellow-400/30 shadow-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm mb-1">⏰ Tan Limit:</p>
                      <p className="text-gray-300 text-sm font-medium">Kòd la bon pou 5 minit sèlman. Si l pase, mande yon nouvo kòd.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-yellow-400/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Step Header */}
              <div className="relative bg-gradient-to-r from-yellow-600 to-amber-600 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-3xl font-black bg-gradient-to-br from-yellow-600 to-amber-600 bg-clip-text text-transparent">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">Siksè! 🎉</h3>
                    <p className="text-yellow-100 text-sm mt-1 font-medium">Katriyèm etap: Vòt ou konte!</p>
                  </div>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="relative p-6 space-y-4">
                <p className="text-lg text-gray-300 font-bold">Felisitasyon! Vòt ou konte. W ap wè:</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-2 border-green-400/30 shadow-lg hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-base font-bold text-white">Mesaj konfirmasyon</p>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border-2 border-blue-400/30 shadow-lg hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-base font-bold text-white">Kat vòt patajab ou</p>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-2 border-purple-400/30 shadow-lg hover:scale-105 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                      <Share2 className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-base font-bold text-white">Lyen pou gade rezilta an tan reyèl</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-2">
                <Zap className="h-5 w-5 text-white animate-pulse" />
                <span className="font-black text-white">PARE POU VOTE?</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Vwa w enpòtan! 🗳️
              </h3>
              
              <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                Pran 2 minit pou patisipe nan sondaj la kounye a.
              </p>
              
              <Link 
                href="/vote" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
              >
                <CheckCircle className="h-7 w-7" />
                Kòmanse Vote Kounye a
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="relative rounded-3xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-10 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kesyon Souvan Poze
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                <h4 className="text-xl font-black text-white mb-3">Èske vote a gratis?</h4>
                <p className="text-gray-300 font-medium">Wi, 100% gratis! Ou pa bezwen peye anyen pou vote.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                <h4 className="text-xl font-black text-white mb-3">Èske m ka vote plizyè fwa?</h4>
                <p className="text-gray-300 font-medium">Non, chak email ka vote 1 sèl fwa pou garanti jestikal.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                <h4 className="text-xl font-black text-white mb-3">Èske enfòmasyon mwen an sekirite?</h4>
                <p className="text-gray-300 font-medium">Wi, tout enfòmasyon yo kripte epi prive. Nou pa pataje yo ak pèsonn.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-yellow-400/30 transition-all">
                <h4 className="text-xl font-black text-white mb-3">Mwen pa resevwa kòd verifikasyon an?</h4>
                <div className="space-y-3">
                  <p className="text-gray-300 font-medium">
                    <strong className="text-white">Verifye dosye spam/junk ou</strong>. Kòd la ka rive la. Verifye tou ke adrès email ou kòrèk.
                  </p>
                  <p className="text-gray-400 text-sm font-medium border-l-4 border-yellow-400/50 pl-4">
                    <strong className="text-gray-300">Check your spam/junk folder</strong>. The code might be there. Also verify that your email address is correct.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                <h4 className="text-xl font-black text-white mb-3">Ki peyi ki ka vote?</h4>
                <p className="text-gray-300 font-medium">Nenpòt moun, nenpòt kote nan mond lan ka vote - Ayiti, Etazini, Kanada, Lafrans, etc.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/5 hover:border-blue-400/30 transition-all">
                <h4 className="text-xl font-black text-white mb-3">Kilè rezilta yo disponib?</h4>
                <p className="text-gray-300 font-medium">Rezilta yo afiche an tan reyèl, imedyatman apre w fin vote.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 py-8 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left font-medium">
              © 2026 HaitiVote by <span className="font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TechKlein</span>. Tout dwa rezève.
            </p>
            <div className="flex gap-6">
              <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">
                Konsènan
              </Link>
              <Link href="/press" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">
                Press
              </Link>
              <Link href="/admin" className="text-gray-400 hover:text-blue-400 transition-colors font-semibold">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
