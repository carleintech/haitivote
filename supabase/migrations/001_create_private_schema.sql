-- ============================================
-- HaitiVote Private Schema Setup
-- ============================================
-- This creates a private schema for sensitive data
-- including OTPs, voter records, and fraud detection

-- Create private schema
CREATE SCHEMA IF NOT EXISTS private;

-- Grant usage permissions
GRANT USAGE ON SCHEMA private TO authenticated;
GRANT USAGE ON SCHEMA private TO service_role;
GRANT ALL ON SCHEMA private TO postgres;

-- ============================================
-- OTPs Table
-- ============================================
-- Stores one-time passwords for phone verification
CREATE TABLE IF NOT EXISTS private.otps (
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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_otps_phone ON private.otps(phone);
CREATE INDEX IF NOT EXISTS idx_otps_otp_hash ON private.otps(otp_hash);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON private.otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_created_at ON private.otps(created_at);

-- Auto-cleanup old OTPs (older than 24 hours)
CREATE OR REPLACE FUNCTION private.cleanup_old_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM private.otps
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Voter Records Table
-- ============================================
-- Stores normalized voter information to prevent duplicate votes
CREATE TABLE IF NOT EXISTS private.voter_records (
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

-- Indexes for duplicate detection
CREATE INDEX IF NOT EXISTS idx_voter_records_phone ON private.voter_records(normalized_phone);
CREATE INDEX IF NOT EXISTS idx_voter_records_name_dob ON private.voter_records(normalized_first_name, normalized_last_name, date_of_birth);
CREATE INDEX IF NOT EXISTS idx_voter_records_created_at ON private.voter_records(created_at);

-- ============================================
-- Fraud Logs Table
-- ============================================
-- Logs suspicious activities for fraud detection
CREATE TABLE IF NOT EXISTS private.fraud_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  ip_address TEXT,
  phone_e164 TEXT,
  device_fingerprint TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fraud analysis
CREATE INDEX IF NOT EXISTS idx_fraud_logs_ip ON private.fraud_logs(ip_address);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_phone ON private.fraud_logs(phone_e164);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_severity ON private.fraud_logs(severity);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_created_at ON private.fraud_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_event_type ON private.fraud_logs(event_type);

-- ============================================
-- Helper Functions
-- ============================================

-- Function to submit vote (atomic transaction)
CREATE OR REPLACE FUNCTION submit_vote_transaction(
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
  v_voter_record_id UUID;
BEGIN
  -- Insert voter record
  INSERT INTO private.voter_records (
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
  )
  RETURNING id INTO v_voter_record_id;

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

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION submit_vote_transaction TO service_role;
GRANT EXECUTE ON FUNCTION private.cleanup_old_otps TO service_role;

-- ============================================
-- Row Level Security (RLS)
-- ============================================
-- Enable RLS on all private tables
ALTER TABLE private.otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.voter_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.fraud_logs ENABLE ROW LEVEL SECURITY;

-- Service role can access everything
CREATE POLICY "Service role has full access to otps"
  ON private.otps FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to voter_records"
  ON private.voter_records FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to fraud_logs"
  ON private.fraud_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- No public access to private schema tables
CREATE POLICY "No public access to otps"
  ON private.otps FOR ALL
  TO authenticated, anon
  USING (false);

CREATE POLICY "No public access to voter_records"
  ON private.voter_records FOR ALL
  TO authenticated, anon
  USING (false);

CREATE POLICY "No public access to fraud_logs"
  ON private.fraud_logs FOR ALL
  TO authenticated, anon
  USING (false);

-- ============================================
-- Scheduled Cleanup (Optional)
-- ============================================
-- You can set up pg_cron extension to run cleanup periodically
-- Run this in Supabase SQL Editor:
-- 
-- SELECT cron.schedule(
--   'cleanup-old-otps',
--   '0 * * * *', -- Every hour
--   $$ SELECT private.cleanup_old_otps(); $$
-- );

-- ============================================
-- Verification
-- ============================================
-- Check that schema and tables exist
DO $$
BEGIN
  RAISE NOTICE 'Private schema setup complete!';
  RAISE NOTICE 'Tables created: otps, voter_records, fraud_logs';
  RAISE NOTICE 'Functions created: submit_vote_transaction, cleanup_old_otps';
END $$;
