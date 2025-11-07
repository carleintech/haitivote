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
    <Card className="border-2 border-gray-100 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-100">
        <CardTitle className="text-2xl">Jenere Kòd QR</CardTitle>
        <CardDescription className="text-base">
          Kreye kòd QR pou swiv sous medya
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Media Code Input */}
        <div className="space-y-3">
          <Label htmlFor="mediaCode" className="text-base font-semibold text-gray-900">
            Kòd Medya (Opsyonèl)
          </Label>
          <Input
            id="mediaCode"
            placeholder="telemetropole, rtvc, youtube-miami, etc."
            value={mediaCode}
            onChange={(e) => setMediaCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
            className="border-2 border-gray-200 focus:border-[#006CFF] text-base py-6"
          />
          <p className="text-sm text-gray-600">
            Itilize kòd sa pou idantifye sous trafik (radyo, TV, influencer, etc.)
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="p-6 bg-white rounded-2xl border-4 border-gray-200 shadow-lg">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-80 h-80"
              />
            ) : (
              <div className="w-80 h-80 flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-[#006CFF] border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Generated URL */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-gray-900">Lyen Jenere</Label>
          <div className="flex gap-2">
            <Input
              value={generateUrl()}
              readOnly
              className="flex-1 font-mono text-sm bg-gray-50 border-2 border-gray-200"
            />
            <Button
              size="lg"
              className="bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50"
              onClick={handleCopyUrl}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
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
            className="flex-1 bg-gradient-to-r from-[#006CFF] to-[#7F00FF] hover:opacity-90 text-white text-base py-6"
            onClick={handleDownload}
            disabled={!qrDataUrl}
          >
            <Download className="h-5 w-5 mr-2" />
            Telechaje PNG
          </Button>
        </div>

        {/* Usage Instructions */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 space-y-3">
          <p className="font-bold text-base text-gray-900">Kijan pou itilize:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
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
