-- ============================================
-- STORAGE BUCKET FOR CANDIDATE PHOTOS
-- ============================================

-- Insert bucket (idempotent)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'candidates',
  'candidates',
  TRUE,
  5242880, -- 5 MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = TRUE,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Policy: Anyone can read (photos are public)
CREATE POLICY "candidates_photos_public_read"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'candidates');

-- Policy: Only service role can upload
CREATE POLICY "candidates_photos_service_upload"
  ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (
    bucket_id = 'candidates' AND
    (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'webp']))
  );

-- Policy: Only service role can update
CREATE POLICY "candidates_photos_service_update"
  ON storage.objects
  FOR UPDATE
  TO service_role
  USING (bucket_id = 'candidates')
  WITH CHECK (bucket_id = 'candidates');

-- Policy: Only service role can delete
CREATE POLICY "candidates_photos_service_delete"
  ON storage.objects
  FOR DELETE
  TO service_role
  USING (bucket_id = 'candidates');
