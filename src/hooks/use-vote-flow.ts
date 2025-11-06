/**
 * Hook for managing the complete voting flow
 */

'use client';

import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import type {
  VoteSubmissionInput,
  OtpVerificationInput,
} from '@/lib/validations/vote';

type VoteFlowStep = 'candidate' | 'details' | 'otp' | 'success';

interface VoteFlowState {
  step: VoteFlowStep;
  candidateId: number | null;
  submissionId: string | null;
  metadata: {
    normalizedName: string;
    dob: string;
    phoneE164: string;
    country: string | null;
    region: string | null;
    mediaCode: string | null;
  } | null;
  expiresAt: string | null;
  voteId: string | null;
}

interface UseVoteFlowResult {
  state: VoteFlowState;
  loading: boolean;
  error: string | null;
  submitVote: (data: VoteSubmissionInput) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  reset: () => void;
  setCandidate: (candidateId: number) => void;
  goToStep: (step: VoteFlowStep) => void;
}

const initialState: VoteFlowState = {
  step: 'candidate',
  candidateId: null,
  submissionId: null,
  metadata: null,
  expiresAt: null,
  voteId: null,
};

export function useVoteFlow(): UseVoteFlowResult {
  const [state, setState] = useState<VoteFlowState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const setCandidate = useCallback((candidateId: number) => {
    setState((prev) => ({
      ...prev,
      candidateId,
      step: 'details',
    }));
  }, []);

  const goToStep = useCallback((step: VoteFlowStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const submitVote = useCallback(
    async (data: VoteSubmissionInput) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to submit vote');
        }

        // Update state with submission data
        setState((prev) => ({
          ...prev,
          step: 'otp',
          submissionId: result.submissionId,
          candidateId: result.candidate.id,
          metadata: result.metadata,
          expiresAt: result.expiresAt,
        }));

        toast({
          title: 'Kòd voye!',
          description: 'Nou voye yon kòd verifikasyon sou telefòn ou.',
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Submission failed';
        setError(errorMessage);
        
        toast({
          variant: 'destructive',
          title: 'Erè',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const verifyOtp = useCallback(
    async (code: string) => {
      if (!state.submissionId || !state.candidateId || !state.metadata) {
        toast({
          variant: 'destructive',
          title: 'Erè',
          description: 'Done soumisyon manke',
        });
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const payload: OtpVerificationInput = {
          code,
          submissionId: state.submissionId,
          candidateId: state.candidateId,
          metadata: state.metadata,
        };

        const response = await fetch('/api/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Verification failed');
        }

        // Success!
        setState((prev) => ({
          ...prev,
          step: 'success',
          voteId: result.voteId,
        }));

        toast({
          title: 'Siksè!',
          description: 'Vòt ou konte. Mèsi!',
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Verification failed';
        setError(errorMessage);
        
        toast({
          variant: 'destructive',
          title: 'Erè',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [state.submissionId, state.candidateId, state.metadata, toast]
  );

  const resendOtp = useCallback(async () => {
    if (!state.submissionId || !state.metadata?.phoneE164) {
      toast({
        variant: 'destructive',
        title: 'Erè',
        description: 'Done soumisyon manke',
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: state.submissionId,
          phoneE164: state.metadata.phoneE164,
          language: 'ht',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to resend OTP');
      }

      toast({
        title: 'Kòd revoye!',
        description: 'Yon nouvo kòd voye sou telefòn ou.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Resend failed';
      setError(errorMessage);
      
      toast({
        variant: 'destructive',
        title: 'Erè',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [state.submissionId, state.metadata, toast]);

  const reset = useCallback(() => {
    setState(initialState);
    setError(null);
  }, []);

  return {
    state,
    loading,
    error,
    submitVote,
    verifyOtp,
    resendOtp,
    reset,
    setCandidate,
    goToStep,
  };
}
