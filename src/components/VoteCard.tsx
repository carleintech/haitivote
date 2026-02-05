/**
 * Shareable Vote Card Component
 * Displays and allows sharing of vote confirmation
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Download, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteCardProps {
  voteId: string;
  candidateName: string;
  candidatePhoto: string;
  country: string;
  className?: string;
}

export function VoteCard({
  voteId,
  candidateName,
  candidatePhoto,
  country,
  className,
}: VoteCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const shareText = `Mwen vote nan TechKlein VoteLive pou ${candidateName}! 🗳️ Vote ou menm tou!`;
  const shareUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.haitivote.org';

  const handleShare = async (platform?: 'twitter' | 'facebook' | 'whatsapp') => {
    if (platform === 'twitter') {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(url, '_blank');
      return;
    }

    if (platform === 'facebook') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
      return;
    }

    if (platform === 'whatsapp') {
      const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
      window.open(url, '_blank');
      return;
    }

    // Generic share
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'TechKlein VoteLive',
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleDownload = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Card Preview */}
      <Card
        ref={cardRef}
        className="relative overflow-hidden bg-slate-900/50 border-2 border-purple-400/50 backdrop-blur-2xl shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20" />
        
        <CardContent className="relative p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-600 text-white text-sm font-bold shadow-lg">
              ✓ VOT KONFIME
            </div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TechKlein VoteLive
            </h3>
            <p className="text-sm text-blue-200">
              Sondaj Ayiti Global
            </p>
          </div>

          {/* Candidate Info */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-400/50 flex-shrink-0 shadow-lg">
              <Image
                src={candidatePhoto}
                alt={candidateName}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-400">Mwen vote pou:</p>
              <p className="text-xl font-bold truncate text-white">{candidateName}</p>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                📍 {country}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2 py-4">
            <p className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Vwa m konte!
            </p>
            <p className="text-sm text-blue-200">
              Pataje avèk zanmi ou yo pou yo vote tou
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="text-xs text-gray-400">
              ID: {voteId.slice(0, 8)}...
            </div>
            <div className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TechKlein
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="lg"
          className="w-full bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50"
          onClick={() => handleShare('whatsapp')}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          WhatsApp
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50"
          onClick={() => handleShare('facebook')}
        >
          <Facebook className="h-5 w-5 mr-2" />
          Facebook
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50"
          onClick={() => handleShare('twitter')}
        >
          <Twitter className="h-5 w-5 mr-2" />
          Twitter
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50"
          onClick={() => handleShare()}
        >
          <Share2 className="h-5 w-5 mr-2" />
          Lòt
        </Button>
      </div>

      <Button
        size="lg"
        className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-lg border-0"
        onClick={handleDownload}
      >
        <Download className="h-5 w-5 mr-2" />
        {copied ? 'Kopye!' : 'Kopye Lyen'}
      </Button>
    </div>
  );
}
