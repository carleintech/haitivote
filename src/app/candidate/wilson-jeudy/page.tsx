'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Shield, Award, Briefcase, GraduationCap, Target, Users, Scale, Building, Heart, MessageSquare } from 'lucide-react';

export default function WilsonJeudyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-teal-50">
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
      <div className="relative bg-gradient-to-r from-cyan-700 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/wilson-jeudy.jpg"
                  alt="Wilson Jeudy"
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
                  Wilson Jeudy
                </h1>
                <p className="text-2xl text-cyan-100 font-light mb-6">
                  Aktè Politik • Figi Sekirite Piblik • Refòmatè
                </p>
                <Badge className="bg-white text-cyan-700 text-base px-4 py-2">
                  Sekirite & Gouvènans
                </Badge>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Defansè Sekirite Nasyonal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5" />
                  <span>Refòm Enstitisyon Leta</span>
                </div>
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5" />
                  <span>Lòd & Jistis pou Tout Moun</span>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/#vote">
                  <Button size="lg" className="bg-white text-cyan-700 hover:bg-cyan-50 text-lg px-8 py-6">
                    Vote pou Wilson
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
        <Card className="border-2 border-cyan-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Users className="h-6 w-6 text-cyan-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">📌 Rezime Pwofil</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wilson Jeudy se yon figi piblik ki lye ak kestyon sekirite ak gouvènans. Li parèt sou sèn politik la ak diskou ki mete aksan sou lòd, disiplin, ak retablisman otorite Leta. Pwofil li plis baze sou pozisyon piblik li pran sou sekirite ak refòm enstitisyonèl.
            </p>
          </CardContent>
        </Card>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-3xl p-8 md:p-12 border-2 border-cyan-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-100 rounded-lg">
              <Target className="h-6 w-6 text-cyan-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">🗳 Vizyon pou Ayiti</h2>
          </div>
          <blockquote className="text-2xl font-light text-gray-800 italic mb-8 border-l-4 border-cyan-400 pl-6">
            "Yon Ayiti kote sitwayen viv san pè, kote Lalwa pi fò pase zam."
          </blockquote>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Sekirite kòm fondasyon tout devlopman',
              'Leta prezan sou tout teritwa a',
              'Respekte diyite sitwayen yo',
              'Rekonstwi konfyans ant pèp la ak Leta'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-cyan-600 font-bold text-xl">✓</span>
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
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/wilson-jeudy/photo-1.jpg',
                alt: 'Wilson Jeudy - Sekirite'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/wilson-jeudy/photo-2.jpg',
                alt: 'Wilson Jeudy - Gouvènans'
              },
              {
                src: 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/wilson-jeudy/photo-3.jpg',
                alt: 'Wilson Jeudy - Campaign'
              }
            ].map((photo, i) => (
              <Card key={i} className="overflow-hidden border-2 hover:shadow-2xl transition-shadow">
                <div className="relative aspect-video bg-gradient-to-br from-cyan-100 to-teal-100">
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
            {/* Security & Crime Combat */}
            <Card className="border-2 border-red-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Sekirite & Konba Krim</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Ranfòse Polis Nasyonal la</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Operasyon kont gang ame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Pwoteksyon kominote yo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Institutional Reform */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Refòm Enstitisyon Leta</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Fè administrasyon piblik la pi efikas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Mete disiplin ak merit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Konbat koripsyon</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order & Social Discipline */}
            <Card className="border-2 border-teal-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Scale className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Lòd & Disiplin Sosyal</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">•</span>
                    <span>Ankouraje respè pou lalwa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">•</span>
                    <span>Retabli otorite Leta lokal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">•</span>
                    <span>Fè jistis mache pou tout moun</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* National Unity */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Inite Nasyonal</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Dyalòg ak tout sektè</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Mete sekirite kòm objektif komen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Travay pou eleksyon onèt</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Education/Training */}
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
                  title: 'Etid nan Administrasyon Piblik / Sekirite',
                  description: 'Fòmasyon nan jesyon sekirite ak gouvènans'
                },
                {
                  title: 'Fòmasyon Pratik',
                  description: 'Jesyon kriz ak operasyon sekirite'
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
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 mt-4">
                <p className="text-sm text-gray-600 italic">
                  * Detay akademik yo limite nan sous piblik
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career & Public Role */}
        <Card className="border-2 border-cyan-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-cyan-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">💼 Karyè & Wòl Piblik</h2>
            </div>

            {/* Security & Governance */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-600" />
                🛡 Sekirite & Gouvènans
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <p className="font-bold text-gray-900 mb-3">Angajman Piblik</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">Sou kestyon:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Sekirite nasyonal</li>
                      <li>• Konba gang</li>
                      <li>• Ranfòsman enstitisyon leta</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <p className="font-bold text-gray-900 mb-3">Kontribisyon nan Deba</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">Sou tèm:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Wòl Polis Nasyonal la</li>
                      <li>• Koperasyon ak jistis</li>
                      <li>• Nesesite pou disiplin administratif</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Political Positioning */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-600" />
                🏛 Politik
              </h3>
              <div className="space-y-3 ml-7">
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <p className="font-bold text-gray-900 mb-3">Pozisyone tèt li kòm:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">•</span>
                      <span>Kandida ki mete aksyon avan diskou</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">•</span>
                      <span>Defansè popilasyon ki viktim ensekirite</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <p className="font-bold text-gray-900 mb-3">Fè apèl pou:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">•</span>
                      <span>Refòm leta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">•</span>
                      <span>Eleksyon kredib</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">•</span>
                      <span>Estabilite dirab</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Functions Overview */}
        <Card className="border-2 border-teal-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">🏛 Fonksyon & Domèn Aktivite</h2>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-teal-50 rounded-xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Domèn:</p>
                    <p className="text-gray-700">Sekirite piblik</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Wòl:</p>
                    <p className="text-gray-700">Aktè / Defansè refòm</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Domèn:</p>
                    <p className="text-gray-700">Politik</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-2">Wòl:</p>
                    <p className="text-gray-700">Kandida / Figi piblik</p>
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
              Enfòmasyon sou lavi prive li limite nan sous piblik yo.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-700 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Sipòte Wilson Jeudy</h2>
          <p className="text-xl mb-8 text-cyan-100">
            Vote pou yon Ayiti kote Lalwa pi fò pase zam
          </p>
          <Link href="/#vote">
            <Button size="lg" className="bg-white text-cyan-700 hover:bg-cyan-50 text-lg px-12 py-6">
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
