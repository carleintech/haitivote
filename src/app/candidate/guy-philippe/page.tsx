'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Calendar, MapPin, Shield, Award, Briefcase, Target, Users, Flag, AlertCircle, Scale, Megaphone } from 'lucide-react';

export default function GuyPhilippePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-orange-50">
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retounen
            </Button>
          </Link>
          <Badge variant="secondary" className="text-sm">
            🗳️ Kandida 2026
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/guy-philippe.jpg"
                  alt="Guy Philippe"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Guy Philippe
                </h1>
                <p className="text-2xl text-red-100 font-light mb-6">
                  Ansyen Chèf Polis • Politisyen • Nasyonalis
                </p>
                <Badge className="bg-white text-red-600 text-base px-4 py-2">
                  Souverènte Nasyonal
                </Badge>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <span>3 Novanm 1968</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Ansyen Chèf Polis Delmas & Kap-Ayisyen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" />
                  <span>Senatè Eli Grand'Anse (2016)</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/#vote">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 text-lg px-8 py-6">
                    Vote pou Guy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Profile Summary */}
        <Card className="border-2 border-red-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <Users className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">📌 Rezime Pwofil</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Guy Philippe se yon ansyen ofisye polis ak aktè politik ki te vin popilè apre rebelyon ame ki te mennen nan depa Prezidan Jean-Bertrand Aristide an 2004. Li te eli kòm senatè an 2016, men li pa t janm pran plas la paske li te arete epi kondane Ozetazini pou blanchiman lajan ki gen rapò ak trafik dwòg. Li te libere an 2023 epi depòte tounen Ayiti an 2024.
            </p>
          </CardContent>
        </Card>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12 border-2 border-red-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-lg">
              <Target className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">🗳 Vizyon pou Ayiti</h2>
          </div>
          <blockquote className="text-2xl font-light text-gray-800 italic mb-8 border-l-4 border-red-400 pl-6">
            "Yon Ayiti lib, san dominasyon etranje, ak Leta ki gen kontwòl sou teritwa li."
          </blockquote>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Mete aksan sou souverènte nasyonal',
              'Refize entèvansyon etranje nan zafè Ayiti',
              'Retabli otorite Leta sou gang ak zòn ki pa kontwole',
              'Ankouraje fyète nasyonal ak endepandans politik'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-red-600 font-bold text-xl">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            📸 Galri Foto
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/guy-philippe/photo-1.jpg',
                alt: 'Guy Philippe - Chèf Polis'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/guy-philippe/photo-2.jpg',
                alt: 'Guy Philippe - Politik'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/guy-philippe/photo-3.jpg',
                alt: 'Guy Philippe - Campaign'
              }
            ].map((photo, i) => (
              <Card key={i} className="overflow-hidden border-2 hover:shadow-2xl transition-shadow">
                <div className="relative aspect-video bg-gradient-to-br from-red-100 to-orange-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="absolute inset-0 flex items-center justify-center text-center">
                            <div>
                              <div class="text-6xl">🖼️</div>
                              <p class="text-gray-500 font-medium mt-2">Foto ${i + 1}</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Pillars */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            🎯 Misyon (si li eli)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Security & State Authority */}
            <Card className="border-2 border-red-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sekirite & Otorite Leta</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Ranfòse Polis Nasyonal la</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Konbat gang ame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Rekipere zòn ki anba kontwòl kriminèl</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* National Sovereignty */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Flag className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Souverènte Nasyonal</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Diminye depandans Ayiti sou fòs etranje</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Ranfòse fòs sekirite nasyonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Defann enterè Ayiti sou plan entènasyonal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order & Discipline */}
            <Card className="border-2 border-gray-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Scale className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Lòd & Disiplin</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Retabli disiplin nan Leta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Mete respè pou lalwa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>Fè Leta vin prezan tout kote</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Populist Social */}
            <Card className="border-2 border-orange-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Megaphone className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Popilis Sosyal</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Diskou pwòch ak pèp la</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Pozisyone tèt li kòm defansè mas popilè yo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Training/Education */}
        <Card className="border-2 border-indigo-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">🎓 Fòmasyon</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Fòmasyon polis ak militè',
                  description: 'Ayiti ak etranje'
                },
                {
                  title: 'Polis Nasyonal Ayiti (PNH)',
                  description: 'Travay nan ane 1990 yo'
                }
              ].map((edu, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <p className="font-bold text-gray-900">{edu.title}</p>
                    <p className="text-gray-600">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career History */}
        <Card className="border-2 border-slate-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-slate-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">💼 Karyè & Wòl Piblik</h2>
            </div>

            {/* Police Career */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-600" />
                🚔 Polis
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Ansyen Chèf Polis Delmas</p>
                  <p className="text-sm text-gray-600">Ane 1990 yo</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Ansyen Chèf Polis Cap-Haïtien</p>
                  <p className="text-sm text-gray-600">Ane 1990 yo</p>
                </div>
              </div>
            </div>

            {/* Political Career */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-slate-600" />
                🏛 Politik
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Wòl dirijan nan mouvman ame 2004 la</p>
                  <p className="text-sm text-gray-600 mb-2">2004</p>
                  <p className="text-sm text-gray-700">Rebelyon ki te mennen nan depa Prezidan Aristide</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Eli Senatè Grand'Anse</p>
                  <p className="text-sm text-gray-600 mb-2">2016</p>
                  <p className="text-sm text-gray-700 italic">Pa t prete sèman – te arete Ozetazini</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Retounen sou sèn politik</p>
                  <p className="text-sm text-gray-600 mb-2">2024 (apre liberasyon)</p>
                  <p className="text-sm text-gray-700">Diskou nasyonalis ak popilis</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal History (Public Record) */}
        <Card className="border-2 border-amber-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">⚖ Dosye Jidisyè (fèt piblik)</h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Kondanasyon Ozetazini</p>
                    <p className="text-sm text-gray-600">2017</p>
                  </div>
                  <div>
                    <p className="text-gray-700"><span className="font-semibold">Akizasyon:</span> Blanchiman lajan ki lye ak trafik dwòg</p>
                    <p className="text-gray-700"><span className="font-semibold">Kondanasyon:</span> 9 ane prizon</p>
                  </div>
                  <div>
                    <p className="text-gray-700"><span className="font-semibold">Libere:</span> 2023</p>
                    <p className="text-gray-700"><span className="font-semibold">Depòte Ayiti:</span> 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Life */}
        <Card className="border-2 border-gray-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">👨‍👩‍👧 Lavi Pèsonèl</h2>
            </div>
            <p className="text-lg text-gray-700">
              Enfòmasyon sou lavi prive li limite; li plis rekonèt pou wòl li nan sekirite ak politik.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Sipòte Guy Philippe</h2>
          <p className="text-xl mb-8 text-red-100">
            Vote pou yon Ayiti lib, san dominasyon etranje
          </p>
          <Link href="/#vote">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 text-lg px-12 py-6">
              Vote Kounye a
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2026 Haiti Vote Live • VoteLive - Sondaj Ayiti Global</p>
        </div>
      </div>
    </div>
  );
}
