-- ============================================
-- Step 1: Create Private Schema
-- ============================================
CREATE SCHEMA IF NOT EXISTS private;

GRANT USAGE ON SCHEMA private TO authenticated;
GRANT USAGE ON SCHEMA private TO service_role;
GRANT ALL ON SCHEMA private TO postgres;

-- ============================================
-- Step 2: Create OTPs Table
-- ============================================
DROP TABLE IF EXISTS private.otps CASCADE;

CREATE TABLE private.otps (
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

CREATE INDEX idx_otps_phone ON private.otps(phone);
CREATE INDEX idx_otps_otp_hash ON private.otps(otp_hash);
CREATE INDEX idx_otps_expires_at ON private.otps(expires_at);

-- ============================================
-- Step 3: Create Voter Records Table
-- ============================================
DROP TABLE IF EXISTS private.voter_records CASCADE;

CREATE TABLE private.voter_records (
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

CREATE INDEX idx_voter_records_phone ON private.voter_records(normalized_phone);
CREATE INDEX idx_voter_records_name_dob ON private.voter_records(normalized_first_name, normalized_last_name, date_of_birth);

-- ============================================
-- Step 4: Create Fraud Logs Table
-- ============================================
DROP TABLE IF EXISTS private.fraud_logs CASCADE;

CREATE TABLE private.fraud_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  ip_address TEXT,
  phone_e164 TEXT,
  device_fingerprint TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fraud_logs_ip ON private.fraud_logs(ip_address);
CREATE INDEX idx_fraud_logs_phone ON private.fraud_logs(phone_e164);
CREATE INDEX idx_fraud_logs_severity ON private.fraud_logs(severity);
CREATE INDEX idx_fraud_logs_created_at ON private.fraud_logs(created_at);

-- ============================================
-- Step 5: Create Vote Submission Function
-- ============================================
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

GRANT EXECUTE ON FUNCTION submit_vote_transaction TO service_role;

-- ============================================
-- Step 6: Enable RLS
-- ============================================
ALTER TABLE private.otps ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.voter_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.fraud_logs ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "service_role_otps" ON private.otps FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_voters" ON private.voter_records FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_fraud" ON private.fraud_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- No public access
CREATE POLICY "no_public_otps" ON private.otps FOR ALL TO authenticated, anon USING (false);
CREATE POLICY "no_public_voters" ON private.voter_records FOR ALL TO authenticated, anon USING (false);
CREATE POLICY "no_public_fraud" ON private.fraud_logs FOR ALL TO authenticated, anon USING (false);
