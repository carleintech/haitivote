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
    <Card className="border-2 border-green-500/50">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        
        <div>
          <CardTitle className="text-2xl">Siksè! Vòt Ou Konte</CardTitle>
          <CardDescription className="text-base mt-2">
            Mèsi pou patisipasyon ou nan TechKlein VoteLive
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Vote Details */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ou vote pou:</span>
            <span className="font-semibold">{candidateName}</span>
          </div>
          
          {country && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Peyi:</span>
              <span className="font-semibold">{country}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ID Vòt:</span>
            <span className="font-mono text-xs">{voteId.slice(0, 8)}...</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleViewResults}
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Gade Rezilta an Tan Reyèl
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 mr-2" />
            Pataje ak Zanmi Ou Yo
          </Button>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Vòt ou se yon vwa pou demokrasi ak transparans.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-semibold text-gradient-techklein">TechKlein</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
