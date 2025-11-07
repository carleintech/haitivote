-- ============================================
-- Move Private Tables to Public Schema
-- ============================================
-- Supabase JS client can only access public schema
-- We'll use naming convention: private_* to indicate sensitive tables

-- Drop private schema tables if they exist
DROP TABLE IF EXISTS private.fraud_logs CASCADE;
DROP TABLE IF EXISTS private.voter_records CASCADE;
DROP TABLE IF EXISTS private.otps CASCADE;
DROP FUNCTION IF EXISTS submit_vote_transaction CASCADE;
DROP SCHEMA IF EXISTS private CASCADE;

-- ============================================
-- Create OTPs Table in Public Schema
-- ============================================
CREATE TABLE IF NOT EXISTS public.private_otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  is_used BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0,
  verified_at TIMESTAMPTZ,
  verified_ip TEXT,
  used_at TIMESTAMPTZ,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_private_otps_phone ON public.private_otps(phone);
CREATE INDEX IF NOT EXISTS idx_private_otps_otp_hash ON public.private_otps(otp_hash);
CREATE INDEX IF NOT EXISTS idx_private_otps_expires_at ON public.private_otps(expires_at);

-- ============================================
-- Create Voter Records Table in Public Schema
-- ============================================
CREATE TABLE IF NOT EXISTS public.private_voter_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_first_name TEXT NOT NULL,
  normalized_last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  normalized_phone TEXT NOT NULL,
  country_code TEXT,
  ip_address TEXT,
  user_agent TEXT,
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(normalized_first_name, normalized_last_name, date_of_birth, normalized_phone)
);

CREATE INDEX IF NOT EXISTS idx_private_voter_records_phone ON public.private_voter_records(normalized_phone);
CREATE INDEX IF NOT EXISTS idx_private_voter_records_name_dob ON public.private_voter_records(normalized_first_name, normalized_last_name, date_of_birth);

-- ============================================
-- Create Fraud Logs Table in Public Schema
-- ============================================
CREATE TABLE IF NOT EXISTS public.private_fraud_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  ip_address TEXT,
  phone_e164 TEXT,
  device_fingerprint TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_private_fraud_logs_ip ON public.private_fraud_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_private_fraud_logs_phone ON public.private_fraud_logs(phone_e164);
CREATE INDEX IF NOT EXISTS idx_private_fraud_logs_severity ON public.private_fraud_logs(severity);
CREATE INDEX IF NOT EXISTS idx_private_fraud_logs_created_at ON public.private_fraud_logs(created_at);

-- ============================================
-- Create Vote Submission Function
-- ============================================
CREATE OR REPLACE FUNCTION public.submit_vote_transaction(
  p_candidate_id INTEGER,
  p_first_name TEXT,
  p_last_name TEXT,
  p_normalized_first_name TEXT,
  p_normalized_last_name TEXT,
  p_date_of_birth DATE,
  p_phone TEXT,
  p_normalized_phone TEXT,
  p_country_code TEXT DEFAULT NULL,
  p_ip TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_otp_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_vote_id UUID;
BEGIN
  -- Insert voter record
  INSERT INTO public.private_voter_records (
    normalized_first_name,
    normalized_last_name,
    date_of_birth,
    normalized_phone,
    country_code,
    ip_address,
    user_agent
  ) VALUES (
    p_normalized_first_name,
    p_normalized_last_name,
    p_date_of_birth,
    p_normalized_phone,
    p_country_code,
    p_ip,
    p_user_agent
  );

  -- Insert public vote record
  INSERT INTO public.votes (
    candidate_id,
    timestamp
  ) VALUES (
    p_candidate_id,
    NOW()
  )
  RETURNING id INTO v_vote_id;

  RETURN v_vote_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Enable RLS for Security
-- ============================================
ALTER TABLE public.private_otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_voter_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_fraud_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "service_role_otps" ON public.private_otps;
DROP POLICY IF EXISTS "service_role_voters" ON public.private_voter_records;
DROP POLICY IF EXISTS "service_role_fraud" ON public.private_fraud_logs;
DROP POLICY IF EXISTS "no_public_otps" ON public.private_otps;
DROP POLICY IF EXISTS "no_public_voters" ON public.private_voter_records;
DROP POLICY IF EXISTS "no_public_fraud" ON public.private_fraud_logs;

-- Service role has full access
CREATE POLICY "service_role_otps" ON public.private_otps FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_voters" ON public.private_voter_records FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_fraud" ON public.private_fraud_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Block all other access
CREATE POLICY "no_public_otps" ON public.private_otps FOR ALL TO authenticated, anon USING (false);
CREATE POLICY "no_public_voters" ON public.private_voter_records FOR ALL TO authenticated, anon USING (false);
CREATE POLICY "no_public_fraud" ON public.private_fraud_logs FOR ALL TO authenticated, anon USING (false);
