-- Fix the vote submission function to use created_at instead of timestamp
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

  -- Insert public vote record - using created_at instead of timestamp
  INSERT INTO public.votes (
    candidate_id,
    created_at
  ) VALUES (
    p_candidate_id,
    NOW()
  )
  RETURNING id INTO v_vote_id;

  RETURN v_vote_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
