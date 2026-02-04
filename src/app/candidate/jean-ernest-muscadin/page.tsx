'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, MapPin, Scale, Award, Briefcase, GraduationCap, Target, Users, Shield, Gavel, AlertTriangle, Megaphone } from 'lucide-react';

export default function JeanErnestMuscadinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
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
      <div className="relative bg-gradient-to-r from-slate-700 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/jean-ernest-muscadin.jpg"
                  alt="Jean Ernest Muscadin"
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
                  Jean Ernest Muscadin
                </h1>
                <p className="text-2xl text-slate-100 font-light mb-6">
                  Komisè Gouvènman • Majistra • Aktè Politik
                </p>
                <Badge className="bg-white text-slate-700 text-base px-4 py-2">
                  Lòd & Jistis
                </Badge>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>Komisè Gouvènman Miragwàn (Nippes)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5" />
                  <span>Karyè nan Sistèm Jidisyè Ayisyen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Konbat Gang & Kriminalite</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/#vote">
                  <Button size="lg" className="bg-white text-slate-700 hover:bg-slate-50 text-lg px-8 py-6">
                    Vote pou Jean Ernest
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
        <Card className="border-2 border-slate-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Users className="h-6 w-6 text-slate-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">📌 Rezime Pwofil</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Jean Ernest Muscadin se yon komisè gouvènman (pwokirè) ki te sèvi nan Miragwàn (Nippes). Li vin konnen piblikman pou metòd li yo ki trè sevè kont bandi ak gang ame. Sipòtè li yo wè l kòm yon senbòl "lòd ak jistis", pandan kritik li yo denonse pratik li yo kòm vyolasyon dwa moun. Li se youn nan figi ki pi kontwovèsyal sou sèn piblik la jodi a.
            </p>
          </CardContent>
        </Card>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-slate-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-slate-100 rounded-lg">
              <Target className="h-6 w-6 text-slate-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">🗳 Vizyon pou Ayiti</h2>
          </div>
          <blockquote className="text-2xl font-light text-gray-800 italic mb-8 border-l-4 border-slate-400 pl-6">
            "Yon Ayiti kote kriminèl pè Lalwa, epi sitwayen santi yo an sekirite."
          </blockquote>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Mete fen nan enpinite',
              'Retabli respè pou Lalwa',
              'Fè jistis vin rapid, sevè, ak egzat',
              'Mete sekirite kòm premye baz devlopman'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-slate-600 font-bold text-xl">✓</span>
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
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/jean-ernest-muscadin/photo-1.jpg',
                alt: 'Jean Ernest Muscadin - Komisè'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/jean-ernest-muscadin/photo-2.jpg',
                alt: 'Jean Ernest Muscadin - Jistis'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/jean-ernest-muscadin/photo-3.jpg',
                alt: 'Jean Ernest Muscadin - Campaign'
              }
            ].map((photo, i) => (
              <Card key={i} className="overflow-hidden border-2 hover:shadow-2xl transition-shadow">
                <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-blue-100">
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
            {/* Security & Gang Combat */}
            <Card className="border-2 border-red-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sekirite & Konba Gang</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Operasyon dirèk kont gang ame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Ranfòse Polis Nasyonal la</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Kolabore ak lajistis pou jije bandi vit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Justice Reform */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Gavel className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Refòm Jistis</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Fè dosye tribinal avanse rapid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Mete jij ak komisè ki pa koripsyon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Konbat trafik zam ak dwòg</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order & State Discipline */}
            <Card className="border-2 border-slate-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-100 rounded-lg">
                    <Scale className="h-6 w-6 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Lòd & Disiplin Leta</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500 mt-1">•</span>
                    <span>Retabli otorite Leta nan tout depatman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500 mt-1">•</span>
                    <span>Fè lwa respekte san eksepsyon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-500 mt-1">•</span>
                    <span>Mete fen nan "enpinite politik"</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Populist Security Discourse */}
            <Card className="border-2 border-orange-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Megaphone className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Diskou Popilis Sekirite</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Prezante tèt li kòm defansè popilasyon ki viktim gang</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Mete aksan sou aksyon, pa sou pwomès</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controversy Section - Important for Transparency */}
        <Card className="border-2 border-amber-200 shadow-xl bg-amber-50/30">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">⚠ Kontwovès (fèt piblik)</h2>
            </div>
            
            <div className="space-y-6">
              {/* Accusations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Akizasyon
                </h3>
                <div className="ml-7 space-y-3">
                  <div className="p-4 bg-white rounded-xl border-l-4 border-amber-400">
                    <p className="font-semibold text-gray-900 mb-2">Akize pa òganizasyon dwa moun pou:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Ekzekisyon san jijman</li>
                      <li>• Vyolasyon dwa ak pwosedi legal</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Supporters' Response */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Repons Sipòtè yo
                </h3>
                <div className="ml-7 space-y-3">
                  <div className="p-4 bg-white rounded-xl border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-900 mb-2">Sipòtè li yo di:</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Li se sèl moun ki oze konbat bandi dirèkteman</li>
                      <li>• Li pwoteje popilasyon Miragwàn</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-700 italic">
                  <strong>Nòt Transparans:</strong> Seksyon sa a enpòtan pou pèmèt votè yo fè chwa yo ak enfòmasyon konplè. Akizasyon yo ak repons yo se pati dosye piblik kandida a.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="border-2 border-indigo-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">🎓 Fòmasyon</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Etid nan Dwa',
                  description: 'Fòmasyon jidik ak legal'
                },
                {
                  title: 'Fòmasyon nan Magistrati',
                  description: 'Karyè nan sistèm jidisyè ayisyen'
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

            {/* Justice Career */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-slate-600" />
                ⚖ Jistis
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Komisè Gouvènman Miragwàn</p>
                  <p className="text-sm text-gray-600 mb-3">Ane 2020 yo</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">Responsablite:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Dirije operasyon kont bandi ak rezo kriminèl</li>
                      <li>• Aplikasyon lalwa nan rejyon Nippes</li>
                      <li>• Jesyon dosye jidisyè</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">
                      Popilarite li grandi sou rezo sosyal ak nan laprès poutèt diskou li yo ak aksyon li yo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Political Presence */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-slate-600" />
                🏛 Politik
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="font-bold text-gray-900">Figi Piblik Politik</p>
                  <p className="text-sm text-gray-600 mb-2">2020 yo – kounyeya</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">Parèt piblikman kòm figi ki pale de:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Sekirite nasyonal</li>
                      <li>• Refòm jistis</li>
                      <li>• Retablisman lòd</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    Souvan prezante tèt li kòm yon moun ki pa pè pran desizyon di
                  </p>
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
              Enfòmasyon sou lavi prive li limite; li plis rekonèt pou wòl li nan sistèm jistis la.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-700 to-blue-700 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Sipòte Jean Ernest Muscadin</h2>
          <p className="text-xl mb-8 text-slate-100">
            Vote pou yon Ayiti kote kriminèl pè Lalwa
          </p>
          <Link href="/#vote">
            <Button size="lg" className="bg-white text-slate-700 hover:bg-slate-50 text-lg px-12 py-6">
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
