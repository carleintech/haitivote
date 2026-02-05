/**
 * Main Landing Page - HaitiVote Presidential Grade
 * Modern, beautiful, world-class voting platform
 */

'use client';

import * as React from 'react';
import { useVoteFlow } from '@/hooks/use-vote-flow';
import { useCandidates } from '@/hooks/use-candidates';
import { useVoteStats } from '@/hooks/use-vote-stats';
import { VotingForm } from '@/components/VotingForm';
import { OtpInput } from '@/components/OtpInput';
import { VoteSuccess } from '@/components/VoteSuccess';
import { VoteCard } from '@/components/VoteCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, CheckCircle2 } from 'lucide-react';

// New presidential components
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CandidatesSection } from '@/components/home/CandidatesSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { ResourcesGrid } from '@/components/home/ResourcesGrid';
import { FooterSection } from '@/components/home/FooterSection';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { candidates } = useCandidates();
  const { totalVotes, isLive } = useVoteStats(true);
  const {
    state,
    loading,
    submitVote,
    verifyOtp,
    resendOtp,
    setCandidate,
    goToStep,
  } = useVoteFlow();

  // Get selected candidate details
  const selectedCandidate = React.useMemo(() => {
    if (!state.candidateId) return null;
    return candidates.find((c) => c.id === state.candidateId);
  }, [state.candidateId, candidates]);

  // Filter candidates based on search
  const filteredCandidates = React.useMemo(() => {
    if (!searchQuery.trim()) return candidates;
    const query = searchQuery.toLowerCase();
    return candidates.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.party?.toLowerCase().includes(query)
    );
  }, [candidates, searchQuery]);

  // STEP 1: CANDIDATE SELECTION (Presidential Design)
  if (state.step === 'candidate') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        
        {/* Animated gradient blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 blur-3xl animate-blob animation-delay-4000" />
        
        <div className="relative">
          <Hero totalVotes={totalVotes} isLive={isLive} />
          <TrustStrip />
          <HowItWorks />
          <CandidatesSection 
            candidates={filteredCandidates}
            selectedId={state.candidateId}
            onSelect={setCandidate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <FeaturesGrid />
          <ResourcesGrid />
          <FooterSection />
        </div>

        {/* Floating Continue Button */}
        {state.candidateId && (
          <div className="fixed bottom-8 right-8 z-50 animate-bounce-in">
            <button
              onClick={() => goToStep('details')}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 px-8 py-5 text-lg font-black text-white shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 hover:scale-110 transition-all duration-300 flex items-center gap-3"
            >
              <CheckCircle2 className="h-6 w-6" />
              Kontinye Vote
            </button>
          </div>
        )}
      </div>
    );
  }

  // STEP 2: DETAILS FORM
  if (state.step === 'details' && selectedCandidate) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl animate-blob" />
        <div className="absolute bottom-20 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-blob animation-delay-2000" />
        
        <div className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Kandida</span>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full" />
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm font-black shadow-lg animate-pulse">
                    2
                  </div>
                  <span className="text-sm font-bold text-white">Enfòmasyon</span>
                </div>
                <div className="w-16 h-1 bg-slate-700 rounded-full" />
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-700 text-gray-400 flex items-center justify-center text-sm font-black">
                    3
                  </div>
                  <span className="text-sm text-gray-400">Verifikasyon</span>
                </div>
              </div>

            <Button
              variant="ghost"
              onClick={() => goToStep('candidate')}
              className="hover:scale-105 transition-transform font-bold text-white hover:text-blue-400"
            >
              ← Retounen
            </Button>

            <VotingForm
              candidateId={state.candidateId!}
              candidateName={selectedCandidate.name}
              onSubmit={submitVote}
              loading={loading}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }

  // STEP 3: OTP VERIFICATION
  if (state.step === 'otp' && state.metadata) {
    // Calculate expiration time once
    const otpExpiresAt = React.useMemo(
      () => new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      []
    );

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl animate-blob" />
        <div className="absolute bottom-20 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-blob animation-delay-2000" />
        
        <div className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto space-y-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Kandida</span>
                </div>
                <div className="w-16 h-1 bg-emerald-500 rounded-full" />
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Enfòmasyon</span>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-purple-600 rounded-full" />
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm font-black shadow-lg animate-pulse">
                    3
                  </div>
                  <span className="text-sm font-bold text-white">Verifikasyon</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl">
                  <Shield className="text-white h-10 w-10" />
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Verifikasyon Kòd</h2>
                <p className="text-lg text-gray-300 font-medium">
                  {state.metadata.phoneE164
                    ? `Nou voye yon kòd 6 chif nan ${state.metadata.phoneE164}`
                    : 'Nou voye yon kòd 6 chif'}
                </p>
              </div>

            <OtpInput
              phoneNumber={state.metadata.phoneE164 || ''}
              expiresAt={otpExpiresAt}
              onVerify={verifyOtp}
              onResend={async () => {
                await resendOtp();
              }}
              loading={loading}
            />

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => goToStep('details')}
                disabled={loading}
                className="font-bold text-base text-blue-400 hover:text-blue-300"
              >
                Chanje email
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  // STEP 4: SUCCESS
  if (state.step === 'success' && state.voteId && selectedCandidate) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        
        {/* Animated gradient blobs */}
        <div className="absolute top-20 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl animate-blob" />
        <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 blur-3xl animate-blob animation-delay-4000" />
        
        <div className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto space-y-12">
              {/* Confetti effect */}
              <div className="text-center space-y-6">
                <div className="text-8xl animate-bounce">🎉</div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Felisitasyon!
                </h2>
                <p className="text-2xl text-white font-bold">
                  Vòt ou te rantre avèk siksè! 🇭🇹
                </p>
              </div>

            <VoteSuccess
              candidateName={selectedCandidate.name}
              voteId={state.voteId}
              country={state.metadata?.country || null}
            />

            <Separator className="my-8 bg-white/10" />

            <VoteCard
              voteId={state.voteId}
              candidateName={selectedCandidate.name}
              candidatePhoto={selectedCandidate.photo_url}
              country={state.metadata?.country || 'Unknown'}
            />

            <div className="text-center space-y-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/live'}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105 transition-all duration-300 text-white font-black text-lg px-10 py-6 h-auto rounded-2xl shadow-2xl"
              >
                Wè Rezilta Live →
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  // Fallback
  return null;
}
