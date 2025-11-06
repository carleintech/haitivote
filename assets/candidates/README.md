# Candidate Photos Guidelines

## 📸 Requirements
- **Format**: JPG, PNG, or WebP
- **Size**: Max 5 MB per image
- **Dimensions**: Recommended 800x800px (square, 1:1 ratio)
- **Quality**: High resolution, professional headshots
- **Naming**: Must match candidate slug exactly

## 📝 Naming Convention
File names **MUST** match the candidate slug from `candidates.json`:

```
jude-celestin.jpg
moise-jean-charles.jpg
martine-moise.jpg
claude-joseph.jpg
jerry-tardieu.jpg
nesmy-manigat.jpg
```

## 🎯 Photo Sourcing
- Use official campaign photos where available
- Ensure photos are recent (within 2 years)
- Verify image rights/permissions before use
- Maintain consistent lighting and background style across all photos
- Prefer neutral backgrounds (white, grey, or subtle gradients)

## 📂 Directory Structure
```
assets/
└── candidates/
    ├── jude-celestin.jpg
    ├── jocelerme-privert.jpg
    ├── jean-michel-lapin.jpg
    └── ... (47 total)
```

## 🚀 Upload Process

### Step 1: Place Photos
Copy all 47 candidate photos into this directory (`assets/candidates/`)

### Step 2: Run Upload Script
```powershell
.\scripts\upload-candidates.ps1
```

The script will:
- ✅ Read credentials from `.env.local`
- ✅ Upload all photos to Supabase Storage
- ✅ Display progress and summary

### Step 3: Verify Upload
```powershell
.\scripts\verify-setup.ps1
```

## ⚠️ Important Notes
- Photos are **publicly accessible** once uploaded
- File names are **case-sensitive** (use lowercase with hyphens)
- Missing photos will show placeholder images
- Photos can be re-uploaded (will overwrite existing)

## 🔗 Public URL Format
After upload, photos will be accessible at:
```
https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/candidates/{slug}.jpg
```

Example:
```
https://abcdefgh.supabase.co/storage/v1/object/public/candidates/jude-celestin.jpg
```

## 📋 Checklist
- [ ] All 47 photos collected and renamed correctly
- [ ] Photos meet size and quality requirements
- [ ] Upload script executed successfully
- [ ] Verification script passed all tests
- [ ] Photos visible in Supabase Dashboard → Storage

---

Need help? Check `scripts/upload-candidates.ps1` for troubleshooting options.
