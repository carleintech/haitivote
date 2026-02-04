'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Calendar, MapPin, Globe, Award, Briefcase, GraduationCap, Target, Users, Heart } from 'lucide-react';

export default function DominiqueDupuyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
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
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/dominique-dupuy.jpg"
                  alt="Dominique Dupuy"
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
                  Dominique Dupuy
                </h1>
                <p className="text-2xl text-blue-100 font-light mb-6">
                  Diplomat • Ansyen Minis • Kandida Politik
                </p>
                <Badge className="bg-white text-blue-600 text-base px-4 py-2">
                  Independent
                </Badge>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <span>23 Mas 1990</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>Kap-Ayisyen, Ayiti</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <span>Kreyòl • Franse • Anglè • Panyòl</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/#vote">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
                    Vote pou Dominique
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
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">📌 Rezime Pwofil</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dominique Dupuy se yon diplomat ak fanm politik ayisyèn ki te reprezante Ayiti nan òganizasyon entènasyonal tankou UNESCO, epi ki te sèvi kòm Minis Afè Etranjè, Afè Relijye ak Ayisyen k ap viv aletranje an 2024. Li vin popilè nan lavi piblik la pandan peryòd tranzisyon politik peyi a.
            </p>
          </CardContent>
        </Card>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-purple-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">🗳 Vizyon pou Ayiti</h2>
          </div>
          <blockquote className="text-2xl font-light text-gray-800 italic mb-8 border-l-4 border-purple-400 pl-6">
            "Yon Ayiti ki respekte nan mond lan, an sekirite lakay li, epi ki bay chak sitwayen chans pou viv ak diyite."
          </blockquote>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Ranfòse imaj Ayiti sou sèn entènasyonal',
              'Fè dyaspora a tounen patnè dirèk nan devlopman peyi a',
              'Mete kilti ak edikasyon kòm poto mitan rekonstriksyon nasyonal',
              'Ankouraje lapè, dyalòg, ak estabilite politik'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-purple-600 font-bold text-xl">✓</span>
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
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/dominique-dupuy/photo-1.jpg',
                alt: 'Dominique Dupuy - UNESCO'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/dominique-dupuy/photo-2.jpg',
                alt: 'Dominique Dupuy - Diplomat'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/dominique-dupuy/photo-3.jpg',
                alt: 'Dominique Dupuy - Campaign'
              }
            ].map((photo, i) => (
              <Card key={i} className="overflow-hidden border-2 hover:shadow-2xl transition-shadow">
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100">
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
            {/* Security & Rights */}
            <Card className="border-2 border-red-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sekirite & Dwa Sitwayen</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Travay ak patnè entènasyonal pou retabli sekirite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Defann dwa fanm, timoun ak popilasyon vilnerab</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Economic Diplomacy */}
            <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Diplomasi Ekonomik</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Atire envestisman etranje</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Sipòte touris kiltirèl ak edikatif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ouvri pòt pou jèn pwofesyonèl ayisyen ale etidye/retounen travay</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Diaspora */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Dyaspora kòm motè devlopman</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Kreye pwogram pou dyaspora envesti nan Ayiti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Amelyore sèvis konsila yo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Fasilite transfè konesans ak kapital</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Culture & Education */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Kilti & Edikasyon</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Pwoteje eritaj ayisyen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Mete kilti kòm zouti inite nasyonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Ankouraje edikasyon sivik ak lidèchip jèn yo</span>
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
              <h2 className="text-3xl font-bold text-gray-900">🎓 Edikasyon</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  degree: 'Lisans nan Devlopman Entènasyonal',
                  school: 'McGill University',
                  location: 'Kanada'
                },
                {
                  degree: 'Etid sou migrasyon fòse ak chòk sikolojik',
                  school: 'Lancaster University',
                  location: 'Wayòm Ini'
                },
                {
                  degree: 'Etid nan syans sosyal',
                  school: 'Vanier College',
                  location: 'Montréal'
                }
              ].map((edu, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <p className="font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-gray-600">{edu.school} ({edu.location})</p>
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
              <h2 className="text-3xl font-bold text-gray-900">💼 Karyè ak Sèvis Leta</h2>
            </div>

            {/* Diplomacy */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                🌍 Diplomasi
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="font-bold text-gray-900">Anbasadè/Delege Pèmanan Ayiti nan UNESCO</p>
                  <p className="text-sm text-gray-600 mb-2">2020 – 2024</p>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Travay pou mete kilti ayisyèn (tankou Soup Joumou) sou lis eritaj mondyal</li>
                    <li>• Manm Konsèy Egzekitif UNESCO (zòn Amerik Latin & Karayib)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Government */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                🇭🇹 Gouvènman
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="font-bold text-gray-900">Minis Afè Etranjè, Afè Relijye ak Dyaspora</p>
                  <p className="text-sm text-gray-600">Jen – Novanm 2024</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="font-bold text-gray-900">Manm Konsèy Prezidansyèl Tranzisyon (nominasyon)</p>
                  <p className="text-sm text-gray-600 mb-2">Mas 2024</p>
                  <p className="text-sm text-gray-700 italic">Li te demisyone apre menas sekirite</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Life */}
        <Card className="border-2 border-pink-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">👩‍👧 Lavi Pèsonèl</h2>
            </div>
            <p className="text-lg text-gray-700">Li marye epi li gen yon pitit fi.</p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Sipòte Dominique Dupuy</h2>
          <p className="text-xl mb-8 text-blue-100">
            Vote pou yon Ayiti ki respekte, an sekirite, ak plin opòtinite
          </p>
          <Link href="/#vote">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-12 py-6">
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
