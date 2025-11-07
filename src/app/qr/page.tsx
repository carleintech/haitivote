/**
 * QR Code Generator Page
 * Standalone page for generating QR codes with media tracking
 */

import * as React from 'react';
import { Metadata } from 'next';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import Link from 'next/link';
import { ArrowLeft, QrCode } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jenere Kòd QR | HaitiVote',
  description: 'Kreye kòd QR pou swiv sous medya ak kandida yo',
  openGraph: {
    title: 'Jenere Kòd QR | HaitiVote',
    description: 'Kreye kòd QR pou swiv sous medya ak kandida yo',
  },
};

export default function QRPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.haitivote.org';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-[#006CFF] transition-colors font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Retounen
            </Link>
            
            <div className="flex items-center gap-3">
              <QrCode className="h-6 w-6 text-[#006CFF]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#006CFF] to-[#7F00FF] bg-clip-text text-transparent">
                Jenere Kòd QR
              </h1>
            </div>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Kreye Kòd QR Pou HaitiVote
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jenere kòd QR pou pèmèt moun vote fasilman. Idantifye sous trafik yo pou konnen ki medya ki pi efikas.
            </p>
          </div>

          {/* QR Generator */}
          <QRCodeGenerator baseUrl={siteUrl} />

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg space-y-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                Pou Medya Sosyal
              </h3>
              <p className="text-gray-700">
                Pataje kòd QR sou Instagram, Facebook, Twitter. Itilize kòd tankou: 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">instagram</code>, 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">facebook</code>, 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">twitter</code>
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg space-y-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">📺</span>
                Pou TV/Radyo
              </h3>
              <p className="text-gray-700">
                Afiche kòd QR sou ekran TV oswa mansyone l nan radyo. Egzanp: 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">tele-metropole</code>, 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">radio-caraibes</code>
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg space-y-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                Pou Influencer
              </h3>
              <p className="text-gray-700">
                Kreye kòd QR pou chak influencer. Egzanp: 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">jean-youtube</code>, 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">marie-tiktok</code>
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg space-y-3">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Pou Evènman
              </h3>
              <p className="text-gray-700">
                Itilize nan evènman, konferans, oswa fèt. Egzanp: 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">event-miami</code>, 
                <code className="mx-1 px-2 py-1 bg-gray-100 rounded text-sm">concert-pap</code>
              </p>
            </div>
          </div>

          {/* Statistics Info */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span>📊</span>
                Swiv Rezilta Yo
              </h3>
              <p className="text-lg text-blue-50">
                Tout kòd QR yo gen trekking otomatik. Ou ka wè nan dashboard administratè konbyen moun ki vote atravè chak sous.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  href="/admin" 
                  className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Ale nan Dashboard
                </Link>
                <Link 
                  href="/press" 
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-colors"
                >
                  Materyèl Pou Press
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            © 2025 HaitiVote by <span className="font-semibold text-[#006CFF]">TechKlein</span>. 
            Tout dwa rezève.
          </p>
        </div>
      </footer>
    </div>
  );
}
