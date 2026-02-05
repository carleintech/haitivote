/**
 * Vote Success Component
 * Confirmation screen after successful vote
 */

'use client';

import * as React from 'react';
import { CheckCircle2, Share2, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface VoteSuccessProps {
  candidateName: string;
  voteId: string;
  country: string | null;
}

export function VoteSuccess({ candidateName, voteId, country }: VoteSuccessProps) {
  const router = useRouter();

  const handleViewResults = () => {
    router.push('/live');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'TechKlein VoteLive – Sondaj Ayiti Global',
      text: `Mwen vote nan TechKlein VoteLive pou ${candidateName}! Vote ou menm tou!`,
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert('Lyen kopye!');
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <Card className="bg-slate-900/50 border-2 border-green-400/50 backdrop-blur-2xl shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center shadow-lg">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>
        
        <div>
          <CardTitle className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Siksè! Vòt Ou Konte</CardTitle>
          <CardDescription className="text-base mt-2 text-blue-200">
            Mèsi pou patisipasyon ou nan TechKlein VoteLive
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Vote Details */}
        <div className="p-4 rounded-lg bg-slate-800/50 border border-white/10 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Ou vote pou:</span>
            <span className="font-semibold text-white">{candidateName}</span>
          </div>
          
          {country && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Peyi:</span>
              <span className="font-semibold text-white">{country}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">ID Vòt:</span>
            <span className="font-mono text-xs text-white">{voteId.slice(0, 8)}...</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg border-0"
            onClick={handleViewResults}
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Gade Rezilta an Tan Reyèl
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 mr-2" />
            Pataje ak Zanmi Ou Yo
          </Button>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-sm text-blue-200">
            Vòt ou se yon vwa pou demokrasi ak transparans.
          </p>
          <p className="text-xs text-gray-400">
            Powered by <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TechKlein</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
