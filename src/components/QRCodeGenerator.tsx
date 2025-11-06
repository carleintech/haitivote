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
    <Card>
      <CardHeader>
        <CardTitle>Jenere Kòd QR</CardTitle>
        <CardDescription>
          Kreye kòd QR pou swiv sous medya
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Media Code Input */}
        <div className="space-y-2">
          <Label htmlFor="mediaCode">
            Kòd Medya (Opsyonèl)
          </Label>
          <Input
            id="mediaCode"
            placeholder="telemetropole, rtvc, youtube-miami, etc."
            value={mediaCode}
            onChange={(e) => setMediaCode(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
          />
          <p className="text-xs text-muted-foreground">
            Itilize kòd sa pou idantifye sous trafik (radyo, TV, influencer, etc.)
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-xl border-4 border-border">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-64 h-64"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Generated URL */}
        <div className="space-y-2">
          <Label>Lyen Jenere</Label>
          <div className="flex gap-2">
            <Input
              value={generateUrl()}
              readOnly
              className="flex-1 font-mono text-xs"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyUrl}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="gradient"
            className="flex-1"
            onClick={handleDownload}
            disabled={!qrDataUrl}
          >
            <Download className="h-4 w-4 mr-2" />
            Telechaje PNG
          </Button>
        </div>

        {/* Usage Instructions */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-2 text-sm">
          <p className="font-semibold">Kijan pou itilize:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
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
