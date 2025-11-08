-- ============================================
-- ADD EMAIL VERIFICATION SUPPORT
-- ============================================
-- Date: 2025-11-07
-- Add email as alternative verification method to phone SMS

-- Add email columns to private_voter_records table
ALTER TABLE public.private_voter_records
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;

-- Add email to private_otps table
ALTER TABLE public.private_otps
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS verification_method TEXT CHECK (verification_method IN ('phone', 'email'));

-- Create indexes for email lookups
CREATE INDEX IF NOT EXISTS idx_voter_records_email ON public.private_voter_records(email);
CREATE INDEX IF NOT EXISTS idx_otps_email ON public.private_otps(email);

-- Add unique constraint for verified emails (partial index approach)
-- One verified email per person (if using email)
CREATE UNIQUE INDEX IF NOT EXISTS unique_verified_email 
ON public.private_voter_records(email, email_verified_at) 
WHERE email_verified_at IS NOT NULL AND email IS NOT NULL;

-- Ensure at least one contact method exists (phone OR email)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'check_contact_method' 
    AND conrelid = 'public.private_voter_records'::regclass
  ) THEN
    ALTER TABLE public.private_voter_records
    ADD CONSTRAINT check_contact_method 
    CHECK (normalized_phone IS NOT NULL OR email IS NOT NULL);
  END IF;
END $$;

-- Add comments for clarity
COMMENT ON COLUMN public.private_voter_records.email IS 'Email address for verification (alternative to phone)';
COMMENT ON COLUMN public.private_voter_records.email_verified_at IS 'Timestamp when email was verified via OTP';
COMMENT ON COLUMN public.private_otps.email IS 'Email address for OTP delivery (if verification_method = email)';
COMMENT ON COLUMN public.private_otps.verification_method IS 'Method of verification: phone (SMS) or email';

-- Verify changes
DO $$
BEGIN
  RAISE NOTICE 'Successfully added email verification support';
  RAISE NOTICE '- Added email and email_verified_at to private_voter_records table';
  RAISE NOTICE '- Added email and verification_method to private_otps table';
  RAISE NOTICE '- Created unique constraint for verified emails';
  RAISE NOTICE '- Added check constraint for contact method';
END $$;
