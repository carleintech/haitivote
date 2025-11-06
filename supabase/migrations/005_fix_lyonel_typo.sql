-- Fix typo in Lyonel Valbrun's photo URL if it exists
UPDATE public.candidates
SET photo_url = 'https://avpgqqpsgswmpermjopm.supabase.co/storage/v1/object/public/candidates/lyonel-valbrun.jpg'
WHERE slug LIKE '%yonel-valbrun%' OR photo_url LIKE '%yonel-valbrun%';

-- Also fix the slug if needed
UPDATE public.candidates
SET slug = 'lyonel-valbrun'
WHERE slug = 'yonel-valbrun';
