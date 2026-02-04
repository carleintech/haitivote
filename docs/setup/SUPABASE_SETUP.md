# 🚀 SUPABASE DATABASE SETUP GUIDE
## TECHKLEIN VOTELIVE - Complete Database Configuration

This guide will walk you through **creating your Supabase project**, **running migrations**, and **configuring your environment** from scratch.

---

## 📋 Prerequisites

- [ ] Supabase account (sign up at [supabase.com](https://supabase.com))
- [ ] Twilio account for SMS (sign up at [twilio.com](https://www.twilio.com))
- [ ] Node.js installed (v18 or higher)
- [ ] PowerShell (Windows) or compatible shell

---

## STEP 1: Create Supabase Project

### 1.1 Sign Up / Log In
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with GitHub, Google, or Email

### 1.2 Create New Project
1. Click **"New Project"** from your dashboard
2. Fill in the project details:
   - **Name**: `techklein-votelive` (or your preferred name)
   - **Database Password**: Generate a strong password (save this securely!)
   - **Region**: Choose closest to your users (e.g., US East, Europe West)
   - **Pricing Plan**: Free (sufficient for development, upgrade later for production)

3. Click **"Create new project"**
4. Wait 2-3 minutes for provisioning to complete

### 1.3 Get Your Project Credentials

Once the project is ready, navigate to **Project Settings** → **API**:

📝 **Copy these values** (you'll need them for `.env.local`):

| Setting | Location | Description |
|---------|----------|-------------|
| **Project URL** | Project Settings → API → Project URL | `https://XXXXX.supabase.co` |
| **Project Reference ID** | From URL (XXXXX part) | Used for storage URLs |
| **anon public key** | Project Settings → API → anon public | Client-side key (safe to expose) |
| **service_role key** | Project Settings → API → service_role | **SECRET** - Server-side only |

⚠️ **IMPORTANT**: The `service_role` key **bypasses all security rules**. Never expose it in client-side code!

---

## STEP 2: Update Environment Variables

### 2.1 Open `.env.local`
Edit the file `c:\Users\carle\Documents\TECHKLEIN\GitHub\techklein-votelive\.env.local`

### 2.2 Replace Placeholder Values

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**Replace with your actual values**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.3 Configure Twilio (Optional for now)
Get credentials from [Twilio Console](https://console.twilio.com):

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_FROM_NUMBER=+1234567890
```

---

## STEP 3: Run Database Migrations

### 3.1 Open Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**

### 3.2 Run Migration 001: Schema
1. Open file: `supabase/migrations/001_schema.sql`
2. **Copy the entire contents**
3. **Paste into SQL Editor**
4. Click **"Run"** (or press `Ctrl+Enter`)
5. ✅ Verify you see: **"Success. No rows returned"**

### 3.3 Run Migration 002: RLS Policies
1. Open file: `supabase/migrations/002_rls_policies.sql`
2. **Copy the entire contents**
3. **Paste into SQL Editor** (new query)
4. Click **"Run"**
5. ✅ Verify success

### 3.4 Run Migration 003: Storage Setup
1. Open file: `supabase/migrations/003_storage_setup.sql`
2. **Copy the entire contents**
3. **Paste into SQL Editor** (new query)
4. Click **"Run"**
5. ✅ Verify success

### 3.5 Run Migration 004: Seed Candidates (UPDATE FIRST!)

**IMPORTANT**: Before running this migration, you need to update the photo URLs!

#### Option A: Use Generate Script (Recommended)
```powershell
# Run from project root
node scripts/generate-photo-urls.js YOUR_PROJECT_REF

# Example:
node scripts/generate-photo-urls.js abcdefghijklmnop
```

This will automatically update `004_seed_candidates.sql` with correct URLs.

#### Option B: Manual Update
1. Open `supabase/migrations/004_seed_candidates.sql`
2. Find and replace all instances of `YOUR_PROJECT_REF` with your actual project reference
3. Save the file

#### Run the Migration
1. Open the updated `004_seed_candidates.sql`
2. **Copy the entire contents**
3. **Paste into SQL Editor** (new query)
4. Click **"Run"**
5. ✅ You should see: **"Successfully inserted 5 candidates"****

---

## STEP 4: Verify Database Setup

### 4.1 Check Tables Created
In Supabase Dashboard → **Table Editor**, you should see:

**Public Schema:**
- ✅ `candidates` (5 rows)
- ✅ `candidate_meta`
- ✅ `votes`
- ✅ `media_referrers`
- ✅ `vote_aggregates` (materialized view)
- ✅ `vote_by_country` (materialized view)

**Private Schema:**
- ✅ `voters`
- ✅ `otps`
- ✅ `fraud_logs`

### 4.2 Check Storage Bucket
1. Go to **Storage** in left sidebar
2. You should see bucket: **`candidates`**
3. Bucket should be marked as **Public**

### 4.3 Run Verification Script
```powershell
.\scripts\verify-setup.ps1
```

Expected output:
```
✅ Test 1: Fetching candidates... Found 5 candidates
✅ Test 2: Checking storage bucket... Storage bucket accessible
✅ Test 3: Verifying candidate photo URLs... All 47 photo URLs are valid
✅ Test 4: Checking materialized views... Materialized views accessible
✅ Test 5: Verifying Row Level Security... RLS properly configured

🎉 All tests passed! Setup is complete.
```

---

## STEP 5: Upload Candidate Photos

### 5.1 Prepare Photos
1. Place all 5 candidate photos in `assets/candidates/`
2. Ensure file names match slugs exactly:
   ```
   jude-celestin.jpg
   moise-jean-charles.jpg
   martine-moise.jpg
   ... (see assets/candidates/README.md for full list)
   ```

### 5.2 Run Upload Script
```powershell
.\scripts\upload-candidates.ps1
```

The script will:
- ✅ Read credentials from `.env.local`
- ✅ Upload all photos to Supabase Storage bucket
- ✅ Display progress and summary

### 5.3 Verify Photos
Check Supabase Dashboard → **Storage** → **candidates** bucket

You should see all 47 photos listed.

---

## STEP 6: Test Database Access

### 6.1 Test with Supabase REST API

Using PowerShell:
```powershell
$url = "https://YOUR_PROJECT_REF.supabase.co/rest/v1/candidates?select=name,slug,party&limit=5"
$headers = @{
    "apikey" = "YOUR_ANON_KEY"
    "Authorization" = "Bearer YOUR_ANON_KEY"
}
Invoke-RestMethod -Uri $url -Headers $headers | ConvertTo-Json
```

Expected response: JSON array with 5 candidates

### 6.2 Test Photo Access
Open in browser:
```
https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/candidates/jude-celestin.jpg
```

Should display the candidate photo.

---

## STEP 7: Final Configuration

### 7.1 Complete `.env.local`

Ensure all variables are set:

```env
# ✅ Supabase (from Step 2)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# ✅ Twilio SMS
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+1...

# ✅ Admin Auth (already generated)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH="$2b$12$..."

# ✅ App Settings
NEXT_PUBLIC_SITE_URL=http://localhost:3000
OTP_TTL_SECONDS=600
RESEND_OTP_COOLDOWN_SECONDS=60
MAX_OTP_ATTEMPTS=5

# 🔒 Security (generate random 32+ char string)
IRON_SESSION_PASSWORD=your_secure_random_string_min_32_chars_here
NODE_ENV=development
```

### 7.2 Generate Session Password
```powershell
# Generate secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output to `IRON_SESSION_PASSWORD`

---

## ✅ SETUP COMPLETE CHECKLIST

- [ ] Supabase project created
- [ ] All 4 SQL migrations executed successfully
- [ ] `.env.local` configured with all credentials
- [ ] 5 candidates seeded in database
- [ ] Storage bucket created and configured
- [ ] Candidate photos uploaded (optional at this stage)
- [ ] Verification script passed all tests
- [ ] Admin password hash generated

---

## 🎉 You're Ready!

Your database is now fully configured and ready for **Phase 2: Backend Implementation**!

Next steps:
1. ✅ Database setup complete
2. ⏭️ **Phase 2**: Create API routes (vote submission, OTP, admin endpoints)
3. ⏭️ **Phase 3**: Build frontend components
4. ⏭️ **Phase 4**: Deploy to production

---

## 🆘 Troubleshooting

### Error: "relation does not exist"
- Run migrations in order (001 → 002 → 003 → 004)
- Check SQL Editor for error messages

### Error: "RLS policies failed"
- Ensure migration 002 completed successfully
- Verify you're using correct Supabase keys

### Photos not uploading
- Check `.env.local` has correct `SUPABASE_SERVICE_ROLE_KEY`
- Ensure storage bucket exists (run migration 003)
- Verify photo file names match slugs exactly

### Verification script fails
- Ensure `.env.local` is properly configured
- Check migrations completed successfully
- Verify Supabase project is fully provisioned (not still starting up)

---

## 📞 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Twilio Docs**: https://www.twilio.com/docs

---

**Created by TECHKLEIN** | Last updated: 2025-11-06
