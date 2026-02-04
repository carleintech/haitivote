-- ============================================
-- UPDATE TO FIVE CANDIDATES ONLY
-- ============================================
-- Date: 2026-02-04
-- Updating election to include only 5 official candidates:
-- 1. Dominique Dupuy
-- 2. Jean Ernest Muscadin
-- 3. Etzer Emile
-- 4. Guy Philippe
-- 5. Wilson Jeudy

-- First, store the IDs of candidates we want to keep
DO $$
DECLARE
  v_etzer_id INTEGER;
  v_guy_id INTEGER;
  v_wilson_id INTEGER;
  v_muscadin_id INTEGER;
BEGIN
  -- Get IDs of existing candidates we want to keep
  SELECT id INTO v_etzer_id FROM public.candidates WHERE slug = 'etzer-emile';
  SELECT id INTO v_guy_id FROM public.candidates WHERE slug = 'guy-philippe';
  SELECT id INTO v_wilson_id FROM public.candidates WHERE slug = 'wilson-jeudy';
  SELECT id INTO v_muscadin_id FROM public.candidates WHERE slug = 'commissaire-jean-ernst-muscadin' OR slug = 'jean-ernest-muscadin';

  -- Update Jean Ernest Muscadin name if needed (remove "Commissaire" prefix)
  UPDATE public.candidates 
  SET name = 'Jean Ernest Muscadin', 
      slug = 'jean-ernest-muscadin'
  WHERE slug = 'commissaire-jean-ernst-muscadin';

  -- Delete all votes for candidates we're removing
  DELETE FROM public.votes 
  WHERE candidate_id NOT IN (
    SELECT id FROM public.candidates 
    WHERE slug IN ('etzer-emile', 'guy-philippe', 'wilson-jeudy', 'jean-ernest-muscadin')
  );

  -- Delete all candidates except the ones we want to keep
  DELETE FROM public.candidates 
  WHERE slug NOT IN ('etzer-emile', 'guy-philippe', 'wilson-jeudy', 'jean-ernest-muscadin');

  -- Insert Dominique Dupuy if doesn't exist
  INSERT INTO public.candidates (name, slug, photo_url, party, motto)
  VALUES ('Dominique Dupuy', 'dominique-dupuy', 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/dominique-dupuy.jpg', 'Independent', NULL)
  ON CONFLICT (slug) DO NOTHING;

  -- Refresh materialized views to reflect the changes
  REFRESH MATERIALIZED VIEW public.vote_aggregates;
  REFRESH MATERIALIZED VIEW public.vote_by_country;

  RAISE NOTICE 'Successfully updated to 5 candidates';
END $$;

-- Verify we have exactly 5 candidates
DO $$
DECLARE
  candidate_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO candidate_count FROM public.candidates;
  
  IF candidate_count = 5 THEN
    RAISE NOTICE 'Verification successful: Exactly 5 candidates in database';
  ELSE
    RAISE WARNING 'Expected 5 candidates but found %', candidate_count;
  END IF;
END $$;
