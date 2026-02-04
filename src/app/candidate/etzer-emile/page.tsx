'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Calendar, MapPin, Globe, Award, Briefcase, GraduationCap, Target, Users, TrendingUp, Shield, Scale, MessageSquare } from 'lucide-react';

export default function EtzerEmilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
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
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/etzer-emile.jpg"
                  alt="Etzer Emile"
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
                  Etzer Emile
                </h1>
                <p className="text-2xl text-green-100 font-light mb-6">
                  Ekonomis • Ansyen Premye Minis • Pwofesè
                </p>
                <Badge className="bg-white text-green-600 text-base px-4 py-2">
                  Teknokrat
                </Badge>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5" />
                  <span>Premye Minis Ayiti (2024)</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5" />
                  <span>Ekonomis & Pwofesè Inivèsite</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" />
                  <span>Espesyalis Devlopman & Jesyon Piblik</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/#vote">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-6">
                    Vote pou Etzer
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
        <Card className="border-2 border-green-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">📌 Rezime Pwofil</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Etzer Emile se yon ekonomis ak ansyen pwofesè inivèsite ki te antre nan politik pandan peryòd tranzisyon peyi a. Li te nonmen kòm Premye Minis Ayiti an 2024 nan yon moman kriz sekirite ak kriz enstitisyonèl. Li prezante tèt li kòm yon teknokrat ki vle mete lòd nan administrasyon leta a ak nan ekonomi peyi a.
            </p>
          </CardContent>
        </Card>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-green-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">🗳 Vizyon pou Ayiti</h2>
          </div>
          <blockquote className="text-2xl font-light text-gray-800 italic mb-8 border-l-4 border-green-400 pl-6">
            "Yon Ayiti ki gen lòd, ki travay, epi ki ka viv ak resous pa li."
          </blockquote>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Mete sekirite kòm baz devlopman',
              'Rekonstwi enstitisyon leta yo',
              'Bay ekonomi an direksyon pwodiksyon (pa sèlman asistans)',
              'Mete konfyans ant Leta ak sitwayen yo'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-green-600 font-bold text-xl">✓</span>
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
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/etzer-emile/photo-1.jpg',
                alt: 'Etzer Emile - Premye Minis'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/etzer-emile/photo-2.jpg',
                alt: 'Etzer Emile - Ekonomis'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/etzer-emile/photo-3.jpg',
                alt: 'Etzer Emile - Campaign'
              }
            ].map((photo, i) => (
              <Card key={i} className="overflow-hidden border-2 hover:shadow-2xl transition-shadow">
                <div className="relative aspect-video bg-gradient-to-br from-green-100 to-blue-100">
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
            {/* Security & Rule of Law */}
            <Card className="border-2 border-red-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sekirite & Leta Dwa</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Ranfòse Polis Nasyonal la</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Travay ak patnè entènasyonal pou estabilite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Retabli otorite Leta sou teritwa a</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Economy & Work */}
            <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Ekonomi & Travay</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ankouraje agrikilti nasyonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Sipòte PME (ti ak mwayen antrepriz)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Kreye travay pou jèn yo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Redwi depandans sou enpòtasyon</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Good Governance */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Scale className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Bon Gouvènans</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Konbat koripsyon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Mete transparans nan jesyon lajan Leta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Refòme administrasyon piblik</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Political Dialogue */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Dyalòg Politik</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Travay pou inite nasyonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Fè eleksyon kredib</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Mete baz pou estabilite dirab</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Education */}
        <Card className="border-2 border-orange-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">🎓 Edikasyon & Karyè Akademik</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Etid nan ekonomi',
                  description: 'Espesyalis nan kestyon devlopman'
                },
                {
                  title: 'Ansyen Pwofesè Inivèsite',
                  description: 'Ansèyman ekonomi ak jesyon piblik'
                },
                {
                  title: 'Espesyalis nan jesyon piblik',
                  description: 'Bidjè leta ak administrasyon piblik'
                }
              ].map((edu, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
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
        <Card className="border-2 border-indigo-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">💼 Karyè Politik & Administratif</h2>
            </div>

            {/* Prime Minister */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                🇭🇹 Premye Minis Ayiti
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="font-bold text-gray-900">Premye Minis - Gouvènman Tranzisyon</p>
                  <p className="text-sm text-gray-600 mb-3">2024</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">Responsablite:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Dirije gouvènman tranzisyon an</li>
                      <li>• Jesyon kriz sekirite</li>
                      <li>• Relans ekonomi</li>
                      <li>• Negosyasyon ak patnè entènasyonal</li>
                    </ul>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="font-semibold text-gray-800">Aksan sou:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Disiplin bidjè</li>
                      <li>• Refòm nan administrasyon piblik</li>
                      <li>• Dyalòg politik</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Career */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                📚 Karyè Akademik
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="font-bold text-gray-900">Pwofesè Inivèsite & Ekonomis</p>
                  <p className="text-sm text-gray-600 mb-2">Anvan politik</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Ansèyman ekonomi ak devlopman</li>
                    <li>• Rechèch sou jesyon piblik</li>
                    <li>• Konseye sou kestyon fiskil ak bidjè</li>
                  </ul>
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
              Pa gen anpil enfòmasyon piblik sou lavi prive li; li plis rekonèt pou travay li nan ekonomi ak administrasyon leta.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Sipòte Etzer Emile</h2>
          <p className="text-xl mb-8 text-green-100">
            Vote pou yon Ayiti ki gen lòd, ki travay, ak resous pa li
          </p>
          <Link href="/#vote">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-12 py-6">
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
