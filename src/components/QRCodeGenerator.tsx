/**
 * QR Code Generator Component
 * Generates QR codes for media tracking
 */

'use client';

import * as React from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  baseUrl?: string;
}

export function QRCodeGenerator({ baseUrl }: QRCodeGeneratorProps) {
  const [mediaCode, setMediaCode] = React.useState('');
  const [qrDataUrl, setQrDataUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generateUrl = React.useCallback(() => {
    const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    return mediaCode ? `${base}/?media=${encodeURIComponent(mediaCode)}` : base;
  }, [baseUrl, mediaCode]);

  React.useEffect(() => {
    const url = generateUrl();
    
    QRCode.toDataURL(url, {
      width: 512,
      margin: 2,
      color: {
        dark: '#0A0A0F',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then(setQrDataUrl)
      .catch((err) => {
        console.error('QR generation error:', err);
      });
  }, [generateUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `votelive-qr-${mediaCode || 'default'}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handleCopyUrl = async () => {
    const url = generateUrl();
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  return (
    <Card className="border-2 border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
            <Download className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Jenere Kòd QR
            </CardTitle>
            <CardDescription className="text-gray-400 text-base font-medium mt-1">
              Kreye kòd QR pou swiv sous medya
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Media Code Input */}
        <div className="space-y-3">
          <Label htmlFor="mediaCode" className="text-base font-black text-white">
            Kòd Medya (Opsyonèl)
          </Label>
          <Input
            id="mediaCode"
            placeholder="telemetropole, rtvc, youtube-miami, etc."
            value={mediaCode}
            onChange={(e) => setMediaCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
            className="border-2 border-white/20 bg-slate-950/50 text-white placeholder:text-gray-500 focus:border-pink-400/50 text-base py-6 backdrop-blur-xl"
          />
          <p className="text-sm text-gray-400">
            Itilize kòd sa pou idantifye sous trafik (radyo, TV, influencer, etc.)
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="p-6 bg-white rounded-2xl border-4 border-white/30 shadow-2xl ring-4 ring-pink-500/20">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-80 h-80"
              />
            ) : (
              <div className="w-80 h-80 flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Generated URL */}
        <div className="space-y-3">
          <Label className="text-base font-black text-white">Lyen Jenere</Label>
          <div className="flex gap-2">
            <Input
              value={generateUrl()}
              readOnly
              className="flex-1 font-mono text-sm bg-slate-950/70 border-2 border-white/20 text-cyan-400 backdrop-blur-xl"
            />
            <Button
              size="lg"
              className="bg-slate-900/90 text-white border-2 border-white/20 hover:bg-slate-800 backdrop-blur-xl shadow-xl"
              onClick={handleCopyUrl}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-green-400" />
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 text-white text-base py-6 font-black shadow-xl"
            onClick={handleDownload}
            disabled={!qrDataUrl}
          >
            <Download className="h-5 w-5 mr-2" />
            Telechaje PNG
          </Button>
        </div>

        {/* Usage Instructions */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 backdrop-blur-xl space-y-3">
          <p className="font-black text-base text-white">Kijan pou itilize:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
            <li>Afiche kòd QR sou ekran TV oswa poster</li>
            <li>Moun eskane l ak telefòn yo</li>
            <li>Yo ale dirèkteman nan paj vote a</li>
            <li>Sistèm ap make kòd medya ou an</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
