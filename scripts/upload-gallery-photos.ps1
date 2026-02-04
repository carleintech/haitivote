# =========================================
# Upload Candidate Gallery Photos
# =========================================
# Uploads additional photos for candidate galleries

param(
    [string]$CandidateSlug = ""
)

Write-Host "📸 TECHKLEIN VOTELIVE - Candidate Gallery Upload" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan

# Load environment variables
if (Test-Path ".env.local") {
    Write-Host "ℹ️  Loading credentials from .env.local..." -ForegroundColor Blue
    Get-Content ".env.local" | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
        }
    }
} else {
    Write-Host "❌ Error: .env.local file not found" -ForegroundColor Red
    exit 1
}

$SUPABASE_URL = $env:NEXT_PUBLIC_SUPABASE_URL
$SUPABASE_SERVICE_KEY = $env:SUPABASE_SERVICE_ROLE_KEY

if (-not $SUPABASE_URL -or -not $SUPABASE_SERVICE_KEY) {
    Write-Host "❌ Error: Missing Supabase credentials in .env.local" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Connected to: $SUPABASE_URL" -ForegroundColor Green

# Define candidates
$candidates = @(
    "dominique-dupuy",
    "jean-ernest-muscadin",
    "etzer-emile",
    "guy-philippe",
    "wilson-jeudy"
)

# Filter by slug if provided
if ($CandidateSlug) {
    $candidates = @($CandidateSlug)
    Write-Host "ℹ️  Uploading photos for: $CandidateSlug" -ForegroundColor Blue
}

$totalUploaded = 0
$totalFailed = 0

foreach ($slug in $candidates) {
    $folderPath = "assets/candidates/$slug"
    
    if (-not (Test-Path $folderPath)) {
        Write-Host "⚠️  Folder not found: $folderPath - skipping" -ForegroundColor Yellow
        continue
    }

    # Find gallery photos (photo-1.jpg, photo-2.jpg, photo-3.jpg)
    $photos = Get-ChildItem -Path $folderPath -Filter "photo-*.jpg" -File

    if ($photos.Count -eq 0) {
        Write-Host "ℹ️  No gallery photos found for $slug" -ForegroundColor Gray
        continue
    }

    Write-Host "`n📁 Processing: $slug ($($photos.Count) photos)" -ForegroundColor Cyan

    foreach ($photo in $photos) {
        $fileName = $photo.Name
        $filePath = $photo.FullName
        $fileSize = [math]::Round($photo.Length / 1KB, 2)
        
        # Upload to Supabase Storage
        # Path: candidates/{slug}/photo-X.jpg
        $storagePath = "$slug/$fileName"
        
        Write-Host "  Uploading: $fileName ($fileSize KB)..." -NoNewline -ForegroundColor Gray
        
        try {
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $uploadUrl = "$SUPABASE_URL/storage/v1/object/candidates/$storagePath"
            
            $headers = @{
                "Authorization" = "Bearer $SUPABASE_SERVICE_KEY"
                "Content-Type" = "image/jpeg"
            }
            
            $response = Invoke-RestMethod -Uri $uploadUrl -Method Post -Headers $headers -Body $fileBytes -ErrorAction Stop
            
            Write-Host "✅ Uploaded" -ForegroundColor Green
            $totalUploaded++
        }
        catch {
            # Try update if file exists
            try {
                $response = Invoke-RestMethod -Uri $uploadUrl -Method Put -Headers $headers -Body $fileBytes -ErrorAction Stop
                Write-Host "✅ Updated" -ForegroundColor Green
                $totalUploaded++
            }
            catch {
                Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
                $totalFailed++
            }
        }
    }
}

# Summary
Write-Host "`n═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Upload Summary" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Successful: $totalUploaded" -ForegroundColor Green
if ($totalFailed -gt 0) {
    Write-Host "❌ Failed: $totalFailed" -ForegroundColor Red
}
Write-Host "Total: $($totalUploaded + $totalFailed)`n" -ForegroundColor Cyan

Write-Host "ℹ️  Gallery photos are accessible at:" -ForegroundColor Blue
Write-Host "  $SUPABASE_URL/storage/v1/object/public/candidates/{candidate-slug}/photo-X.jpg`n" -ForegroundColor Gray
