<#
.SYNOPSIS
    Upload candidate photos to Supabase Storage

.DESCRIPTION
    Uploads all candidate photos from assets/candidates to Supabase storage bucket.
    Requires Supabase project credentials from .env.local

.PARAMETER ProjectRef
    Your Supabase project reference (subdomain from project URL)

.PARAMETER ServiceRoleKey
    Your Supabase service role key (from project settings)

.EXAMPLE
    .\scripts\upload-candidates.ps1 -ProjectRef "abcdefghijklmnop" -ServiceRoleKey "your-service-key"
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectRef,
    
    [Parameter(Mandatory=$false)]
    [string]$ServiceRoleKey,
    
    [string]$PhotosDir = "assets\candidates"
)

# Color output functions
function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Error { param($Message) Write-Host "❌ $Message" -ForegroundColor Red }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }

Write-Info "TECHKLEIN VOTELIVE - Photo Upload Script"
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

# Load from .env.local if not provided
if (-not $ProjectRef -or -not $ServiceRoleKey) {
    Write-Info "Loading credentials from .env.local..."
    
    if (Test-Path ".env.local") {
        Get-Content ".env.local" | ForEach-Object {
            if ($_ -match '^\s*NEXT_PUBLIC_SUPABASE_URL\s*=\s*https://([^.]+)\.supabase\.co') {
                $ProjectRef = $matches[1]
            }
            if ($_ -match '^\s*SUPABASE_SERVICE_ROLE_KEY\s*=\s*(.+)$') {
                $ServiceRoleKey = $matches[1].Trim() -replace '^"|"$', ''
            }
        }
    }
}

if (-not $ProjectRef -or -not $ServiceRoleKey) {
    Write-Error "Missing Supabase credentials!"
    Write-Host "Provide via parameters or ensure .env.local is configured"
    exit 1
}

# Configuration
$BucketName = "candidates"
$SupabaseUrl = "https://$ProjectRef.supabase.co"
$StorageEndpoint = "$SupabaseUrl/storage/v1/object/$BucketName"

Write-Success "Connected to: $SupabaseUrl"

# Validate local folder exists
if (-not (Test-Path $PhotosDir)) {
    Write-Error "Folder '$PhotosDir' not found. Please create it and add candidate photos."
    exit 1
}

# Get all image files (PowerShell -Include requires -Recurse, so we use Where-Object instead)
$ImageFiles = Get-ChildItem -Path $PhotosDir -File | Where-Object { 
    $_.Extension -match '\.(jpg|jpeg|png|webp)$' 
}

if ($ImageFiles.Count -eq 0) {
    Write-Error "No image files found in '$PhotosDir'"
    exit 1
}

Write-Info "Found $($ImageFiles.Count) image(s) to upload"
Write-Host ""

# Upload counter
$SuccessCount = 0
$FailCount = 0

foreach ($File in $ImageFiles) {
    $FileName = $File.Name
    $FilePath = $File.FullName
    $FileSize = [math]::Round($File.Length / 1KB, 2)
    
    Write-Host "Uploading: $FileName ($FileSize KB)..." -NoNewline
    
    try {
        # Determine content type
        $ContentType = switch ($File.Extension.ToLower()) {
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".png"  { "image/png" }
            ".webp" { "image/webp" }
            default { "image/jpeg" }
        }
        
        # Read file as bytes
        $FileBytes = [System.IO.File]::ReadAllBytes($FilePath)
        
        # Upload to Supabase
        $Headers = @{
            "Authorization" = "Bearer $ServiceRoleKey"
            "Content-Type" = $ContentType
            "x-upsert" = "true"  # Overwrite if exists
        }
        
        $Response = Invoke-RestMethod `
            -Uri "$StorageEndpoint/$FileName" `
            -Method Post `
            -Headers $Headers `
            -Body $FileBytes `
            -ErrorAction Stop
        
        Write-Success " Uploaded"
        $SuccessCount++
        
    } catch {
        Write-Error " Failed: $($_.Exception.Message)"
        $FailCount++
    }
    
    # Small delay to avoid rate limits
    Start-Sleep -Milliseconds 100
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Upload Summary" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Success "Successful: $SuccessCount"
if ($FailCount -gt 0) {
    Write-Error "Failed: $FailCount"
}
Write-Host "Total: $($ImageFiles.Count)"
Write-Host ""

if ($SuccessCount -gt 0) {
    Write-Info "View uploaded files at:"
    Write-Host "  $SupabaseUrl/storage/v1/object/public/$BucketName/" -ForegroundColor Yellow
}

# Exit code
if ($FailCount -gt 0) { exit 1 }
exit 0
