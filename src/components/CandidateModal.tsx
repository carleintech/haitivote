/**
 * Candidate Details Modal
 * Shows full candidate information in a dialog
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Globe, Twitter, Facebook } from 'lucide-react';

interface CandidateModalProps {
  candidateId: number;
  open: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
}

export function CandidateModal({
  candidateId,
  open,
  onClose,
  onSelect,
}: CandidateModalProps) {
  const [candidate, setCandidate] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (open && candidateId) {
      fetchCandidateDetails();
    }
  }, [candidateId, open]);

  const fetchCandidateDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/candidates/${candidateId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch candidate details');
      }

      const data = await response.json();
      setCandidate(data.candidate);
    } catch (error) {
      console.error('Candidate fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    onSelect(candidateId);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : candidate ? (
          <>
            <DialogHeader>
              <div className="flex gap-6 items-start">
                {/* Photo */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border-2 border-border">
                  <Image
                    src={candidate.photo_url}
                    alt={candidate.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Basic info */}
                <div className="flex-1 space-y-2">
                  <DialogTitle className="text-2xl">
                    {candidate.name}
                  </DialogTitle>
                  
                  {candidate.party && (
                    <Badge variant="secondary" className="text-sm">
                      {candidate.party}
                    </Badge>
                  )}

                  {candidate.motto && (
                    <DialogDescription className="text-base italic">
                      "{candidate.motto}"
                    </DialogDescription>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* Biography */}
            {candidate.candidate_meta?.[0]?.bio && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Biyografi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {candidate.candidate_meta[0].bio}
                </p>
              </div>
            )}

            {/* Links */}
            {candidate.candidate_meta?.[0] && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Lyen</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.candidate_meta[0].website && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={candidate.candidate_meta[0].website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Sit wèb
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  )}

                  {candidate.candidate_meta[0].twitter && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={candidate.candidate_meta[0].twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  )}

                  {candidate.candidate_meta[0].facebook && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={candidate.candidate_meta[0].facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Fèmen
              </Button>
              <Button variant="gradient" onClick={handleSelect}>
                Chwazi kandida sa
              </Button>
            </DialogFooter>
          </>
        ) : (
          <DialogDescription>
            Pa ka jwenn enfòmasyon kandida a
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
}
