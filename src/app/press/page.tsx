/**
 * Press & Media Kit Page - Presidential Grade
 * Enterprise-level media resources portal
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { MediaStats } from '@/components/MediaStats';
import {
  Download,
  Code,
  ExternalLink,
  Tv,
  BarChart3,
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Sparkles,
  Newspaper,
} from 'lucide-react';

export default function PressPage() {
  const [copiedEmbed, setCopiedEmbed] = React.useState(false);

  // Always use production URL for press kit materials
  const siteUrl = 'https://www.haitivote.org';
  const embedCode = `<iframe src="${siteUrl}/embed" width="100%" height="700" frameborder="0" allowtransparency="true"></iframe>`;

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Navigation Header */}
      <header className="relative border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl">
        <div className="relative container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="text-2xl group-hover:scale-110 transition-transform">🇭🇹</div>
                <span className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  HaitiVote
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/about" className="text-sm font-bold text-gray-300 hover:text-blue-400 transition-colors">
                  Sou Nou
                </Link>
                <Link href="/live" className="text-sm font-bold text-gray-300 hover:text-blue-400 transition-colors">
                  Rezilta Live
                </Link>
              </div>
            </div>
            <Link href="/vote">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-black hover:scale-105 transition-all shadow-lg">
                Vote Kounye a
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="relative overflow-hidden py-16">
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/30 backdrop-blur-xl ring-1 ring-white/10">
              <Newspaper className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="font-black text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                KIT MEDYA OFISYÈL
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Resous pou Jounalis
            </h1>
            
            <p className="text-2xl text-gray-300 leading-relaxed font-medium">
              Tout zouti ou bezwen pou entegre HaitiVote nan platfòm ou
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 backdrop-blur-xl">
                <span className="text-blue-300 font-bold">✓ Embed Widget</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-400/30 backdrop-blur-xl">
                <span className="text-purple-300 font-bold">✓ TV Overlay</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-400/30 backdrop-blur-xl">
                <span className="text-pink-300 font-bold">✓ Kòd QR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-12">
        <Tabs defaultValue="embed" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-slate-900/50 backdrop-blur-2xl border-2 border-white/10 p-2 rounded-2xl shadow-2xl">
            <TabsTrigger value="embed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 font-bold rounded-xl transition-all data-[state=active]:shadow-lg">
              <Code className="h-4 w-4 mr-2" />
              Embed
            </TabsTrigger>
            <TabsTrigger value="overlay" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-gray-400 font-bold rounded-xl transition-all data-[state=active]:shadow-lg">
              <Tv className="h-4 w-4 mr-2" />
              TV Overlay
            </TabsTrigger>
            <TabsTrigger value="qr" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white text-gray-400 font-bold rounded-xl transition-all data-[state=active]:shadow-lg">
              <Share2 className="h-4 w-4 mr-2" />
              Kòd QR
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-400 font-bold rounded-xl transition-all data-[state=active]:shadow-lg">
              <BarChart3 className="h-4 w-4 mr-2" />
              Estatistik
            </TabsTrigger>
          </TabsList>

          {/* Embed Widget Tab */}
          <TabsContent value="embed" className="space-y-8">
            <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Widget Embed pou Sit Wèb
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base font-medium mt-1">
                      Entegre rezilta an tan reyèl nan atik ou yo
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Live Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                    Apèsi
                  </h3>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                    <div className="relative">
                      <iframe
                        src="/embed"
                        width="100%"
                        height="700"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Embed Code */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-400" />
                    Kòd HTML
                  </h3>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25"></div>
                    <pre className="relative bg-slate-950 border-2 border-white/10 rounded-2xl p-6 overflow-x-auto shadow-2xl backdrop-blur-xl">
                      <code className="text-sm text-blue-300 font-mono">{embedCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      className="absolute top-4 right-4 bg-slate-900/90 border-white/20 hover:bg-slate-800 text-white font-bold backdrop-blur-xl shadow-xl"
                      onClick={handleCopyEmbed}
                    >
                      {copiedEmbed ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-400" />
                          Kopye!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Kopye
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-pink-400" />
                    Enstriksyon
                  </h3>
                  <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30 p-6 backdrop-blur-xl">
                    <ol className="list-decimal list-inside space-y-3 text-gray-300 font-medium">
                      <li className="hover:text-white transition-colors">Kopye kòd HTML ki anlè a</li>
                      <li className="hover:text-white transition-colors">Kole l nan atik ou oswa nan HTML paj ou a</li>
                      <li className="hover:text-white transition-colors">Widget ap afiche rezilta an tan reyèl otomatikman</li>
                      <li className="hover:text-white transition-colors">Ou ka ajiste <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">width</code> ak <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">height</code></li>
                    </ol>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-green-500/20 ring-2 ring-green-400/30">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-green-400 transition-colors">Mizajou Otomatik</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Rezilta mizajou an tan reyèl san bezwen refresh
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-blue-500/20 ring-2 ring-blue-400/30">
                        <Share2 className="h-5 w-5 text-blue-400" />
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">Responsif</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Travay sou tout aparèy (desktop, tablet, mobil)
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-purple-500/20 ring-2 ring-purple-400/30">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-purple-400 transition-colors">Rapid</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Optimize pou vitès maksimòm
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-2 border-amber-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-amber-500/20 ring-2 ring-amber-400/30">
                        <Download className="h-5 w-5 text-amber-400" />
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">Gratis</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      100% gratis pou tout medya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TV Overlay Tab */}
          <TabsContent value="overlay" className="space-y-8">
            <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <Tv className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Overlay pou TV & Live Streaming
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base font-medium mt-1">
                      Transparan pou OBS, vMix, Streamlabs
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Layout Options */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    Opsyon Layout
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/overlay?layout=full" target="_blank">
                      <div className="group h-full p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 hover:border-blue-400/50 transition-all shadow-xl hover:shadow-2xl cursor-pointer">
                        <div className="space-y-4">
                          <div className="w-full h-40 bg-slate-950/50 rounded-xl flex items-center justify-center shadow-inner border border-white/10 group-hover:border-blue-400/30 transition-colors">
                            <div className="text-5xl animate-bounce">📊</div>
                          </div>
                          <h4 className="font-black text-lg text-white group-hover:text-blue-400 transition-colors">Full Screen</h4>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            Pou ekran konplè
                          </p>
                          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0">1920x1080</Badge>
                        </div>
                      </div>
                    </Link>

                    <Link href="/overlay?layout=sidebar" target="_blank">
                      <div className="group h-full p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl hover:scale-105 hover:border-purple-400/50 transition-all shadow-xl hover:shadow-2xl cursor-pointer">
                        <div className="space-y-4">
                          <div className="w-full h-40 bg-slate-950/50 rounded-xl flex items-center justify-end pr-6 shadow-inner border border-white/10 group-hover:border-purple-400/30 transition-colors">
                            <div className="w-28 h-full bg-purple-500/30 rounded-lg border border-purple-400/50" />
                          </div>
                          <h4 className="font-black text-lg text-white group-hover:text-purple-400 transition-colors">Sidebar</h4>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            Bò dwat ekran
                          </p>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">Responsive</Badge>
                        </div>
                      </div>
                    </Link>

                    <Link href="/overlay?layout=lower-third" target="_blank">
                      <div className="group h-full p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl hover:scale-105 hover:border-green-400/50 transition-all shadow-xl hover:shadow-2xl cursor-pointer">
                        <div className="space-y-4">
                          <div className="w-full h-40 bg-slate-950/50 rounded-xl flex items-end pb-3 px-3 shadow-inner border border-white/10 group-hover:border-green-400/30 transition-colors">
                            <div className="w-full h-10 bg-green-500/30 rounded-lg border border-green-400/50" />
                          </div>
                          <h4 className="font-black text-lg text-white group-hover:text-green-400 transition-colors">Lower Third</h4>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            Anba ekran
                          </p>
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">1920x200</Badge>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* OBS Instructions */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-cyan-400" />
                    Kijan pou itilize nan OBS
                  </h3>
                  
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 p-6 backdrop-blur-xl">
                    <ol className="list-decimal list-inside space-y-5 text-gray-300">
                      <li className="space-y-2">
                        <span className="font-black text-white text-lg">Ouvri OBS Studio</span>
                        <p className="pl-6 text-gray-400">
                          Chwazi senyen yo ou vle ajoute overlay a
                        </p>
                      </li>

                      <li className="space-y-2">
                        <span className="font-black text-white text-lg">Ajoute Browser Source</span>
                        <p className="pl-6 text-gray-400">
                          Sources → + → Browser
                        </p>
                      </li>

                      <li className="space-y-2">
                        <span className="font-black text-white text-lg">Konfigire URL</span>
                        <div className="pl-6 space-y-3">
                          <p className="text-gray-400">Kole youn nan URL sa yo:</p>
                          <div className="space-y-2">
                            <code className="block p-3 bg-slate-950/70 border border-white/10 rounded-xl text-xs text-cyan-400 font-mono">
                              {siteUrl}/overlay?layout=full
                            </code>
                            <code className="block p-3 bg-slate-950/70 border border-white/10 rounded-xl text-xs text-cyan-400 font-mono">
                              {siteUrl}/overlay?layout=sidebar
                            </code>
                            <code className="block p-3 bg-slate-950/70 border border-white/10 rounded-xl text-xs text-cyan-400 font-mono">
                              {siteUrl}/overlay?layout=lower-third
                            </code>
                          </div>
                        </div>
                      </li>

                      <li className="space-y-2">
                        <span className="font-black text-white text-lg">Ajiste paramèt</span>
                        <div className="pl-6 space-y-2 text-gray-400 font-medium">
                          <p>• Width: 1920</p>
                          <p>• Height: 1080</p>
                          <p>• ✓ Shutdown source when not visible</p>
                          <p>• ✓ Refresh browser when scene becomes active</p>
                        </div>
                      </li>

                      <li className="space-y-2">
                        <span className="font-black text-white text-lg">Fini!</span>
                        <p className="pl-6 text-gray-400">
                          Overlay ap mizajou otomatikman
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="space-y-8">
            <QRCodeGenerator baseUrl={siteUrl} />

            <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                    Egzanp Itilizasyon
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">📺</div>
                      <h4 className="font-black text-lg text-white group-hover:text-blue-400 transition-colors">Televizyon</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Afiche kòd QR pandan emisyon pou moun vote
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">📻</div>
                      <h4 className="font-black text-lg text-white group-hover:text-purple-400 transition-colors">Radyo</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Pataje lyen sou paj Facebook oswa Instagram ou
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">🎥</div>
                      <h4 className="font-black text-lg text-white group-hover:text-red-400 transition-colors">YouTube</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Mete kòd QR nan kwen videyo ou
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">📱</div>
                      <h4 className="font-black text-lg text-white group-hover:text-green-400 transition-colors">WhatsApp</h4>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Voye nan group WhatsApp ak kominote yo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-8">
            <MediaStats />

            <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Lyen Itil
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/live">
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30 backdrop-blur-xl hover:scale-105 hover:border-blue-400/50 transition-all shadow-xl hover:shadow-2xl cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-blue-500/20 ring-2 ring-blue-400/30">
                            <BarChart3 className="h-6 w-6 text-blue-400" />
                          </div>
                          <span className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                            Rezilta an Tan Reyèl
                          </span>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </Link>

                  <a href="/api/admin/export" target="_blank">
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl hover:scale-105 hover:border-green-400/50 transition-all shadow-xl hover:shadow-2xl cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-green-500/20 ring-2 ring-green-400/30">
                            <Download className="h-6 w-6 text-green-400" />
                          </div>
                          <span className="text-lg font-black text-white group-hover:text-green-400 transition-colors">
                            Telechaje CSV
                          </span>
                        </div>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                      </div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="relative bg-slate-900/50 border-2 border-white/10 backdrop-blur-2xl text-white rounded-2xl mt-12 p-8 shadow-2xl">
          <div className="relative text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="text-3xl">🇭🇹</div>
              <h3 className="font-black text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">HaitiVote</h3>
            </div>
            <p className="text-xl text-gray-300 font-semibold italic">"Yon Pèp. Yon Vwa. Yon Sondaj."</p>
            <p className="text-sm text-gray-500 font-medium">
              © {new Date().getFullYear()} HaitiVote. Tout dwa rezève.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
