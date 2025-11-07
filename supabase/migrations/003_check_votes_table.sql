-- Check and fix the votes table structure
-- Run this in Supabase SQL Editor to see what columns exist

-- First, let's see what columns the votes table actually has
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'votes';

-- If the table doesn't have a timestamp column, let's add it
-- Or rename created_at to timestamp if that's what exists
