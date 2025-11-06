-- ============================================
-- TECHKLEIN VOTELIVE DATABASE SCHEMA
-- Version: 1.0.0
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- Create schemas
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS private;

-- ============================================
-- PUBLIC TABLES (Read-accessible with RLS)
-- ============================================

-- CANDIDATES TABLE
CREATE TABLE IF NOT EXISTS public.candidates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  party TEXT,
  motto TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CANDIDATE METADATA (Extended info)
CREATE TABLE IF NOT EXISTS public.candidate_meta (
  candidate_id BIGINT PRIMARY KEY REFERENCES public.candidates(id) ON DELETE CASCADE,
  bio TEXT,
  website TEXT,
  twitter TEXT,
  facebook TEXT,
  instagram TEXT,
  youtube TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VOTES TABLE (Public aggregate data only)
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id BIGINT NOT NULL REFERENCES public.candidates(id) ON DELETE RESTRICT,
  country TEXT,
  region TEXT,
  submitted_ip INET,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'verified',
  media_code TEXT, -- Track which media source drove this vote
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MEDIA REFERRERS (Track journalist QR codes)
CREATE TABLE IF NOT EXISTS public.media_referrers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  organization TEXT,
  country TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PRIVATE TABLES (Admin/Service-role only)
-- ============================================

-- VOTERS TABLE (PII - Never publicly accessible)
CREATE TABLE IF NOT EXISTS private.voters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_name TEXT NOT NULL,
  dob DATE NOT NULL,
  phone_e164 TEXT NOT NULL,
  phone_verified_at TIMESTAMPTZ,
  vote_id UUID UNIQUE REFERENCES public.votes(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_name_dob UNIQUE (normalized_name, dob),
  CONSTRAINT unique_verified_phone UNIQUE (phone_e164, phone_verified_at)
);

-- OTP TABLE (Temporary verification codes)
CREATE TABLE IF NOT EXISTS private.otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_e164 TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  submission_id UUID NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FRAUD LOGS (Suspicious activity tracking)
CREATE TABLE IF NOT EXISTS private.fraud_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'low', 'medium', 'high'
  ip_address INET,
  phone_e164 TEXT,
  device_fingerprint TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Candidates
CREATE INDEX IF NOT EXISTS idx_candidates_slug ON public.candidates(slug);
CREATE INDEX IF NOT EXISTS idx_candidates_name_trgm ON public.candidates USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_candidates_active ON public.candidates(is_active) WHERE is_active = TRUE;

-- Votes
CREATE INDEX IF NOT EXISTS idx_votes_candidate ON public.votes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_votes_country ON public.votes(country);
CREATE INDEX IF NOT EXISTS idx_votes_created ON public.votes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_votes_status ON public.votes(status);
CREATE INDEX IF NOT EXISTS idx_votes_media_code ON public.votes(media_code) WHERE media_code IS NOT NULL;

-- Voters (private)
CREATE INDEX IF NOT EXISTS idx_voters_phone ON private.voters(phone_e164);
CREATE INDEX IF NOT EXISTS idx_voters_name_dob ON private.voters(normalized_name, dob);

-- OTPs (private)
CREATE INDEX IF NOT EXISTS idx_otps_phone ON private.otps(phone_e164);
CREATE INDEX IF NOT EXISTS idx_otps_submission ON private.otps(submission_id);
CREATE INDEX IF NOT EXISTS idx_otps_expires ON private.otps(expires_at);

-- Fraud logs (private)
CREATE INDEX IF NOT EXISTS idx_fraud_logs_created ON private.fraud_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fraud_logs_severity ON private.fraud_logs(severity);

-- ============================================
-- MATERIALIZED VIEWS FOR FAST AGGREGATES
-- ============================================

-- Real-time aggregate by candidate
CREATE MATERIALIZED VIEW IF NOT EXISTS public.vote_aggregates AS
SELECT
  c.id AS candidate_id,
  c.name AS candidate_name,
  c.slug AS candidate_slug,
  c.photo_url,
  COUNT(v.id) AS total_votes,
  ROUND((COUNT(v.id)::NUMERIC / NULLIF(SUM(COUNT(v.id)) OVER (), 0)) * 100, 2) AS percentage
FROM public.candidates c
LEFT JOIN public.votes v ON v.candidate_id = c.id AND v.status = 'verified'
WHERE c.is_active = TRUE
GROUP BY c.id, c.name, c.slug, c.photo_url
ORDER BY total_votes DESC;

-- Aggregate by country
CREATE MATERIALIZED VIEW IF NOT EXISTS public.vote_by_country AS
SELECT
  COALESCE(v.country, 'UNKNOWN') AS country,
  c.slug AS candidate_slug,
  c.name AS candidate_name,
  COUNT(v.id) AS total_votes
FROM public.votes v
JOIN public.candidates c ON c.id = v.candidate_id
WHERE v.status = 'verified'
GROUP BY country, c.slug, c.name
ORDER BY country, total_votes DESC;

-- Create indexes on materialized views
CREATE UNIQUE INDEX IF NOT EXISTS idx_vote_agg_candidate ON public.vote_aggregates(candidate_id);
CREATE INDEX IF NOT EXISTS idx_vote_country_slug ON public.vote_by_country(candidate_slug);

-- ============================================
-- REFRESH FUNCTION (Call after vote insert)
-- ============================================

CREATE OR REPLACE FUNCTION public.refresh_vote_aggregates()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.vote_aggregates;
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.vote_by_country;
END;
$$;
