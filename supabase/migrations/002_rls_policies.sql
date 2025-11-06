-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_referrers ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.voters ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.fraud_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES (Anon + Authenticated)
-- ============================================

-- Candidates: Public read
CREATE POLICY "candidates_public_read"
  ON public.candidates
  FOR SELECT
  TO anon, authenticated
  USING (is_active = TRUE);

-- Candidate Meta: Public read
CREATE POLICY "candidate_meta_public_read"
  ON public.candidate_meta
  FOR SELECT
  TO anon, authenticated
  USING (TRUE);

-- Votes: Public read (no PII exposed)
CREATE POLICY "votes_public_read"
  ON public.votes
  FOR SELECT
  TO anon, authenticated
  USING (status = 'verified');

-- Media Referrers: Public read
CREATE POLICY "media_referrers_public_read"
  ON public.media_referrers
  FOR SELECT
  TO anon, authenticated
  USING (TRUE);

-- ============================================
-- DENY ALL ANON WRITES
-- ============================================

CREATE POLICY "deny_anon_writes_votes"
  ON public.votes
  FOR INSERT
  TO anon
  WITH CHECK (FALSE);

CREATE POLICY "deny_anon_writes_candidates"
  ON public.candidates
  FOR ALL
  TO anon
  USING (FALSE)
  WITH CHECK (FALSE);

-- ============================================
-- PRIVATE SCHEMA: LOCKDOWN
-- ============================================

-- Voters: No anon/authenticated access
CREATE POLICY "voters_no_public_access"
  ON private.voters
  FOR ALL
  TO anon, authenticated
  USING (FALSE)
  WITH CHECK (FALSE);

-- OTPs: No public access
CREATE POLICY "otps_no_public_access"
  ON private.otps
  FOR ALL
  TO anon, authenticated
  USING (FALSE)
  WITH CHECK (FALSE);

-- Fraud logs: No public access
CREATE POLICY "fraud_logs_no_public_access"
  ON private.fraud_logs
  FOR ALL
  TO anon, authenticated
  USING (FALSE)
  WITH CHECK (FALSE);

-- ============================================
-- SERVICE ROLE HAS FULL ACCESS (via API routes)
-- ============================================
-- No explicit policy needed - service_role bypasses RLS
