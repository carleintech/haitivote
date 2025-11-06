#!/usr/bin/env node

/**
 * TECHKLEIN VOTELIVE - Photo URL Generator
 * 
 * Generates SQL INSERT statements with proper photo URLs for your Supabase project
 * Usage: node scripts/generate-photo-urls.js <your-project-ref>
 * Example: node scripts/generate-photo-urls.js abcdefghijklmnop
 */

const fs = require('fs');
const path = require('path');

const projectRef = process.argv[2];

if (!projectRef) {
  console.error('❌ Error: Project reference required');
  console.error('\n📖 Usage: node scripts/generate-photo-urls.js <your-project-ref>');
  console.error('Example: node scripts/generate-photo-urls.js abcdefghijklmnop\n');
  process.exit(1);
}

console.log('🔗 Generating photo URLs for Supabase project:', projectRef);
console.log('');

// Load candidates
const candidatesPath = path.join(__dirname, '..', 'supabase', 'seed', 'candidates.json');

if (!fs.existsSync(candidatesPath)) {
  console.error('❌ Error: candidates.json not found at:', candidatesPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(candidatesPath, 'utf8'));

if (!data.candidates || !Array.isArray(data.candidates)) {
  console.error('❌ Error: Invalid candidates.json format');
  process.exit(1);
}

// Generate SQL insert statements
const baseUrl = `https://${projectRef}.supabase.co/storage/v1/object/public/candidates`;
const inserts = data.candidates.map(c => {
  const photoUrl = `${baseUrl}/${c.slug}.jpg`;
  const party = c.party ? `'${c.party.replace(/'/g, "''")}'` : 'NULL';
  const motto = c.motto ? `'${c.motto.replace(/'/g, "''")}'` : 'NULL';
  
  return `('${c.name.replace(/'/g, "''")}', '${c.slug}', '${photoUrl}', ${party}, ${motto})`;
});

// Generate complete SQL migration
const sql = `-- ============================================
-- SEED CANDIDATE DATA
-- ============================================
-- Auto-generated for project: ${projectRef}
-- Generated: ${new Date().toISOString()}

-- Clear existing data (dev only - remove for production)
TRUNCATE TABLE public.candidate_meta CASCADE;
TRUNCATE TABLE public.candidates RESTART IDENTITY CASCADE;

-- Insert all ${data.candidates.length} candidates
INSERT INTO public.candidates (name, slug, photo_url, party, motto) VALUES
${inserts.join(',\n')};

-- Verify the count
DO $$
DECLARE
  candidate_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO candidate_count FROM public.candidates;
  RAISE NOTICE 'Successfully inserted % candidates', candidate_count;
  
  IF candidate_count != ${data.candidates.length} THEN
    RAISE EXCEPTION 'Expected ${data.candidates.length} candidates but found %', candidate_count;
  END IF;
END $$;
`;

// Write to file
const outputPath = path.join(__dirname, '..', 'supabase', 'migrations', '004_seed_candidates.sql');
fs.writeFileSync(outputPath, sql, 'utf8');

console.log('✅ Generated SQL seed file:', outputPath);
console.log(`📝 Total candidates: ${data.candidates.length}`);
console.log(`🔗 Base URL: ${baseUrl}`);
console.log('');
console.log('📋 Next steps:');
console.log('  1. Open Supabase SQL Editor');
console.log('  2. Copy and run the generated SQL from 004_seed_candidates.sql');
console.log('  3. Upload photos using: .\\scripts\\upload-candidates.ps1');
console.log('');
