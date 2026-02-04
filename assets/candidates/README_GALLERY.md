# 📸 Candidate Gallery Photos Guide

## Folder Structure

```
assets/
  candidates/
    dominique-dupuy/
      photo-1.jpg         (Gallery photo 1)
      photo-2.jpg         (Gallery photo 2)
      photo-3.jpg         (Gallery photo 3)
    jean-ernest-muscadin/
      photo-1.jpg
      photo-2.jpg
      photo-3.jpg
    etzer-emile/
      photo-1.jpg
      photo-2.jpg
      photo-3.jpg
    guy-philippe/
      photo-1.jpg
      photo-2.jpg
      photo-3.jpg
    wilson-jeudy/
      photo-1.jpg
      photo-2.jpg
      photo-3.jpg
```

## How to Add Photos

### Step 1: Prepare Photos
1. Collect 3 additional photos for each candidate
2. Recommended size: **1200x800px** (landscape format)
3. Format: **JPG**
4. Name them: `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`

### Step 2: Place Photos in Folders
Copy photos to the appropriate candidate folder:
```
assets/candidates/{candidate-slug}/photo-1.jpg
assets/candidates/{candidate-slug}/photo-2.jpg
assets/candidates/{candidate-slug}/photo-3.jpg
```

### Step 3: Upload to Supabase

**Upload all candidates:**
```powershell
.\scripts\upload-gallery-photos.ps1
```

**Upload specific candidate:**
```powershell
.\scripts\upload-gallery-photos.ps1 -CandidateSlug "dominique-dupuy"
```

## Photo Guidelines

### Types of Photos to Include:
- **Photo 1**: Action shot (speaking at event, meeting people)
- **Photo 2**: Professional context (at work, in office)
- **Photo 3**: Community engagement (with supporters, at rally)

### Technical Requirements:
- ✅ High quality, well-lit
- ✅ Landscape orientation (16:9 ratio)
- ✅ Max 5 MB per image
- ✅ JPG format
- ✅ Professional appearance

## After Upload

Photos will be accessible at:
```
https://YOUR_PROJECT.supabase.co/storage/v1/object/public/candidates/{slug}/photo-1.jpg
https://YOUR_PROJECT.supabase.co/storage/v1/object/public/candidates/{slug}/photo-2.jpg
https://YOUR_PROJECT.supabase.co/storage/v1/object/public/candidates/{slug}/photo-3.jpg
```

The candidate pages will automatically load these photos if they exist, otherwise showing placeholders.

## Troubleshooting

**Photos not showing?**
1. Check file names match exactly: `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`
2. Verify upload was successful
3. Check Supabase Dashboard → Storage → candidates bucket
4. Refresh browser cache (Ctrl+Shift+R)

**Need to replace photos?**
Simply run the upload script again - it will overwrite existing photos.
