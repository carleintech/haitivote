-- ============================================
-- ADD DETAILED CANDIDATE INFORMATION
-- ============================================
-- Date: 2026-02-04
-- Adding comprehensive profile fields for candidates

-- Add new columns to candidate_meta table
ALTER TABLE public.candidate_meta
ADD COLUMN IF NOT EXISTS political_views TEXT,
ADD COLUMN IF NOT EXISTS key_policies TEXT[],
ADD COLUMN IF NOT EXISTS experience TEXT,
ADD COLUMN IF NOT EXISTS education TEXT,
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS birthplace TEXT;

-- Insert/Update candidate metadata for the 5 candidates
INSERT INTO public.candidate_meta (
  candidate_id,
  bio,
  political_views,
  key_policies,
  experience,
  education,
  age,
  birthplace,
  website,
  twitter,
  facebook
)
SELECT 
  c.id,
  CASE c.slug
    WHEN 'dominique-dupuy' THEN 'Dominique Dupuy se yon diplomat ak fanm politik ayisyèn ki te reprezante Ayiti nan UNESCO, epi ki te sèvi kòm Minis Afè Etranjè, Afè Relijye ak Ayisyen k ap viv aletranje an 2024. Li fèt 23 mas 1990 nan Kap-Ayisyen. Li vin popilè nan lavi piblik la pandan peryòd tranzisyon politik peyi a. Li gen eksperyans solid nan diplomasi entènasyonal, kilti, ak jesyon kriz.'
    WHEN 'jean-ernest-muscadin' THEN 'Jean Ernest Muscadin se yon ansyen komisè ki te sèvi nan fòs lòd piblik pandan plizyè ane. Li gen yon reputasyon solid nan sekirite ak aplikasyon lalwa.'
    WHEN 'etzer-emile' THEN 'Etzer Emile se yon dirijan politik ak militan sosyal ki angaje nan lite pou jistis sosyal ak egzanp pèp la.'
    WHEN 'guy-philippe' THEN 'Guy Philippe se yon ansyen ofisye lapolis ak chèf militè ki konnen pou wòl li te jwe nan istwa politik ayisyen.'
    WHEN 'wilson-jeudy' THEN 'Wilson Jeudy se yon avoka ak aktivis ki defann dwa moun ak transfòmasyon sosyal atravè sistèm jistis.'
  END,
  CASE c.slug
    WHEN 'dominique-dupuy' THEN 'Yon Ayiti ki respekte nan mond lan, an sekirite lakay li, epi ki bay chak sitwayen chans pou viv ak diyite. Ranfòse imaj Ayiti sou sèn entènasyonal, fè dyaspora a tounen patnè dirèk nan devlopman peyi a, mete kilti ak edikasyon kòm poto mitan rekonstriksyon nasyonal, epi ankouraje lapè, dyalòg, ak estabilite politik.'
    WHEN 'jean-ernest-muscadin' THEN 'Priyorize sekirite, lòd piblik, ak gouvènans solid. Kwè nan respè pou lalwa ak enstitisyon Leta pou kreye estabilite.'
    WHEN 'etzer-emile' THEN 'Defann jistis sosyal, ekonomi pou tout moun, ak refòm enstitisyonèl. Angaje pou yon gouvènman ki sèvi enterè pèp la.'
    WHEN 'guy-philippe' THEN 'Konsantre sou sekirite nasyonal, lòd piblik, ak konbat koripsyon. Pwomèt gouvènman fò ak desizyon enèjik.'
    WHEN 'wilson-jeudy' THEN 'Defann eta de dwa, refòm jistis, ak dekantralazasyon. Pwomèt yon sistèm legal ki travay pou tout sitwayen.'
  END,
  CASE c.slug
    WHEN 'dominique-dupuy' THEN ARRAY[
      'Ranfòse sekirite ak travay ak patnè entènasyonal',
      'Defann dwa fanm, timoun ak popilasyon vilnerab',
      'Diplomasi ekonomik - atire envestisman etranje',
      'Kreye pwogram pou dyaspora envesti nan Ayiti',
      'Pwoteje eritaj ayisyen ak ankouraje touris kiltirèl',
      'Mete kilti kòm zouti inite nasyonal',
      'Ankouraje edikasyon sivik ak lidèchip jèn yo'
    ]
    WHEN 'jean-ernest-muscadin' THEN ARRAY[
      'Ranfòse fòs lapolis ak sekirite',
      'Konbat kriminalite ak gang',
      'Restore lòd piblik',
      'Pwoteje sitwayen yo'
    ]
    WHEN 'etzer-emile' THEN ARRAY[
      'Refòm agrikòl ak soutni abitan',
      'Kreye opòtinite travay',
      'Jistis sosyal ak ekonomik',
      'Desantralizasyon pouvwa'
    ]
    WHEN 'guy-philippe' THEN ARRAY[
      'Sekirite nasyonal ak kontwòl fwontyè',
      'Konbat koripsyon',
      'Refòm militè',
      'Otorite gouvenman'
    ]
    WHEN 'wilson-jeudy' THEN ARRAY[
      'Refòm sistèm jistis',
      'Pwoteksyon dwa sivil',
      'Aksè nan jistis pou tout moun',
      'Leta de dwa'
    ]
  END,
  CASE c.slug
    WHEN 'dominique-dupuy' THEN 'Anbasadè/Delege Pèmanan Ayiti nan UNESCO (2020-2024), kote li te travay pou mete kilti ayisyèn tankou Soup Joumou sou lis eritaj mondyal. Manm Konsèy Egzekitif UNESCO pou Amerik Latin & Karayib. Minis Afè Etranjè, Afè Relijye ak Dyaspora (Jen-Novanm 2024). Nominasyon kòm manm Konsèy Prezidansyèl Tranzisyon (Mas 2024).'
    WHEN 'jean-ernest-muscadin' THEN 'Ansyen komisè lapolis, plizyè ane nan fòs lòd, espesyalis sekirite piblik.'
    WHEN 'etzer-emile' THEN 'Militan kominotè, òganizatè sosyal, advocate pou chanjman sistematik.'
    WHEN 'guy-philippe' THEN 'Ofisye lapolis, chèf militè, eksperyans nan operasyon sekirite.'
    WHEN 'wilson-jeudy' THEN 'Avoka pratikan, defensè dwa moun, espesyalis nan dwa konstitisyonèl.'
  END,
  CASE c.slug
    WHEN 'dominique-dupuy' THEN 'Lisans nan Devlopman Entènasyonal (McGill University, Kanada). Etid sou migrasyon fòse ak chòk sikolojik (Lancaster University, Wayòm Ini). Etid nan syans sosyal (Vanier College, Montréal). Pale Kreyòl, Franse, Anglè, Panyòl.'
    WHEN 'jean-ernest-muscadin' THEN 'Fòmasyon nan sekirite piblik ak aplikasyon lalwa.'
    WHEN 'etzer-emile' THEN 'Fòmasyon nan syans sosyal ak devlopman kominotè.'
    WHEN 'guy-philippe' THEN 'Fòmasyon militè ak estrateji sekirite.'
    WHEN 'wilson-jeudy' THEN 'Lisans ak metriz nan dwa, espesyalizasyon nan dwa konstitisyonèl.'
  END,
  CASE c.slug
    WHEN 'dominique-dupuy' THEN 34
    ELSE NULL
  END, -- age
  CASE c.slug
    WHEN 'dominique-dupuy' THEN 'Kap-Ayisyen, Ayiti'
    ELSE NULL
  END, -- birthplace
  NULL, -- website
  NULL, -- twitter
  NULL  -- facebook
FROM public.candidates c
WHERE c.slug IN (
  'dominique-dupuy',
  'jean-ernest-muscadin',
  'etzer-emile',
  'guy-philippe',
  'wilson-jeudy'
)
ON CONFLICT (candidate_id) 
DO UPDATE SET
  bio = EXCLUDED.bio,
  political_views = EXCLUDED.political_views,
  key_policies = EXCLUDED.key_policies,
  experience = EXCLUDED.experience,
  education = EXCLUDED.education,
  updated_at = NOW();

-- Verify
DO $$
DECLARE
  meta_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO meta_count FROM public.candidate_meta;
  
  IF meta_count >= 5 THEN
    RAISE NOTICE 'Successfully added/updated candidate details for % candidates', meta_count;
  ELSE
    RAISE WARNING 'Expected at least 5 candidate profiles but found %', meta_count;
  END IF;
END $$;
