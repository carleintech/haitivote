/**
 * Press & Media Kit Page
 * Resources for journalists and media outlets
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
} from 'lucide-react';

export default function PressPage() {
  const [copiedEmbed, setCopiedEmbed] = React.useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://votelive.techklein.com';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retounen
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gradient-techklein">
            Kit Medya & Jounalis
          </h1>
          <p className="text-muted-foreground mt-1">
            Tout resous ou bezwen pou entegre TechKlein VoteLive
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="embed" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="embed">
              <Code className="h-4 w-4 mr-2" />
              Embed
            </TabsTrigger>
            <TabsTrigger value="overlay">
              <Tv className="h-4 w-4 mr-2" />
              TV Overlay
            </TabsTrigger>
            <TabsTrigger value="qr">
              <Share2 className="h-4 w-4 mr-2" />
              Kòd QR
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart3 className="h-4 w-4 mr-2" />
              Estatistik
            </TabsTrigger>
          </TabsList>

          {/* Embed Widget Tab */}
          <TabsContent value="embed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Widget Embed pou Sit Wèb</CardTitle>
                <CardDescription>
                  Entegre rezilta an tan reyèl nan atik ou yo
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Live Preview */}
                <div>
                  <h3 className="text-sm font-semibold mb-2">Preview</h3>
                  <div className="border-2 border-border rounded-lg overflow-hidden">
                    <iframe
                      src="/embed"
                      width="100%"
                      height="700"
                      className="w-full"
                    />
                  </div>
                </div>

                <Separator />

                {/* Embed Code */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Kòd HTML</h3>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-xs">
                      <code>{embedCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={handleCopyEmbed}
                    >
                      {copiedEmbed ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Kopye
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

                <Separator />

                {/* Instructions */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Enstriksyon</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Kopye kòd HTML ki anlè a</li>
                    <li>Kole l nan atik ou oswa nan HTML paj ou a</li>
                    <li>Widget ap afiche rezilta an tan reyèl otomatikman</li>
                    <li>Ou ka ajiste <code className="bg-muted px-1 rounded">width</code> ak <code className="bg-muted px-1 rounded">height</code></li>
                  </ol>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Badge variant="default">✓</Badge>
                      Mizajou Otomatik
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Rezilta mizajou an tan reyèl san bezwen refresh
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Badge variant="default">✓</Badge>
                      Responsif
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Travay sou tout aparèy (desktop, tablet, mobil)
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Badge variant="default">✓</Badge>
                      Rapid
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Optimize pou vitès maksimòm
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Badge variant="default">✓</Badge>
                      Gratis
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      100% gratis pou tout medya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TV Overlay Tab */}
          <TabsContent value="overlay" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overlay pou TV & Live Streaming</CardTitle>
                <CardDescription>
                  Transparan pou OBS, vMix, Streamlabs
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Layout Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/overlay?layout=full" target="_blank">
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4 text-center space-y-2">
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <div className="text-4xl">📊</div>
                        </div>
                        <h4 className="font-semibold">Full Screen</h4>
                        <p className="text-xs text-muted-foreground">
                          Pou ekran konplè
                        </p>
                        <Badge variant="outline">1920x1080</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/overlay?layout=sidebar" target="_blank">
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4 text-center space-y-2">
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-end pr-4">
                          <div className="w-24 h-full bg-primary/20 rounded" />
                        </div>
                        <h4 className="font-semibold">Sidebar</h4>
                        <p className="text-xs text-muted-foreground">
                          Bò dwat ekran
                        </p>
                        <Badge variant="outline">Responsive</Badge>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/overlay?layout=lower-third" target="_blank">
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4 text-center space-y-2">
                        <div className="w-full h-32 bg-muted rounded-lg flex items-end pb-2">
                          <div className="w-full h-8 bg-primary/20 rounded" />
                        </div>
                        <h4 className="font-semibold">Lower Third</h4>
                        <p className="text-xs text-muted-foreground">
                          Anba ekran
                        </p>
                        <Badge variant="outline">1920x200</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                <Separator />

                {/* OBS Instructions */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Kijan pou itilize nan OBS</h3>
                  
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li className="space-y-2">
                      <span className="font-medium">Ouvri OBS Studio</span>
                      <p className="pl-6 text-muted-foreground">
                        Chwazi senyen yo ou vle ajoute overlay a
                      </p>
                    </li>

                    <li className="space-y-2">
                      <span className="font-medium">Ajoute Browser Source</span>
                      <p className="pl-6 text-muted-foreground">
                        Sources → + → Browser
                      </p>
                    </li>

                    <li className="space-y-2">
                      <span className="font-medium">Konfigire URL</span>
                      <div className="pl-6 space-y-2">
                        <p className="text-muted-foreground">Kole youn nan URL sa yo:</p>
                        <div className="space-y-1">
                          <code className="block p-2 bg-muted rounded text-xs">
                            {siteUrl}/overlay?layout=full
                          </code>
                          <code className="block p-2 bg-muted rounded text-xs">
                            {siteUrl}/overlay?layout=sidebar
                          </code>
                          <code className="block p-2 bg-muted rounded text-xs">
                            {siteUrl}/overlay?layout=lower-third
                          </code>
                        </div>
                      </div>
                    </li>

                    <li className="space-y-2">
                      <span className="font-medium">Ajiste paramèt</span>
                      <div className="pl-6 space-y-1 text-muted-foreground">
                        <p>• Width: 1920</p>
                        <p>• Height: 1080</p>
                        <p>• ✓ Shutdown source when not visible</p>
                        <p>• ✓ Refresh browser when scene becomes active</p>
                      </div>
                    </li>

                    <li className="space-y-2">
                      <span className="font-medium">Fini!</span>
                      <p className="pl-6 text-muted-foreground">
                        Overlay ap mizajou otomatikman
                      </p>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="space-y-6">
            <QRCodeGenerator baseUrl={siteUrl} />

            <Card>
              <CardHeader>
                <CardTitle>Egzanp Itilizasyon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm">📺 Televizyon</h4>
                    <p className="text-xs text-muted-foreground">
                      Afiche kòd QR pandan emisyon pou moun vote
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm">📻 Radyo</h4>
                    <p className="text-xs text-muted-foreground">
                      Pataje lyen sou paj Facebook oswa Instagram ou
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm">🎥 YouTube</h4>
                    <p className="text-xs text-muted-foreground">
                      Mete kòd QR nan kwen videyo ou
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <h4 className="font-semibold text-sm">📱 WhatsApp</h4>
                    <p className="text-xs text-muted-foreground">
                      Voye nan group WhatsApp ak kominote yo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <MediaStats />

            <Card>
              <CardHeader>
                <CardTitle>Lyen Itil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/live">
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Rezilta an Tan Reyèl
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    asChild
                  >
                    <a href="/api/admin/export" target="_blank">
                      <span className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Telechaje CSV
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
