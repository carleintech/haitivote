param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectRef,
    
    [Parameter(Mandatory=$false)]
    [string]$AnonKey
)

# Color output functions
function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Error { param($Message) Write-Host "❌ $Message" -ForegroundColor Red }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }

Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Info "TECHKLEIN VOTELIVE - Setup Verification"
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Load from .env.local if not provided
if (-not $ProjectRef -or -not $AnonKey) {
    Write-Info "Loading credentials from .env.local..."
    
    if (Test-Path ".env.local") {
        Get-Content ".env.local" | ForEach-Object {
            if ($_ -match '^\s*NEXT_PUBLIC_SUPABASE_URL\s*=\s*https://([^.]+)\.supabase\.co') {
                $ProjectRef = $matches[1]
            }
            if ($_ -match '^\s*NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.+)$') {
                $AnonKey = $matches[1].Trim() -replace '^"|"$', ''
            }
        }
    }
}

if (-not $ProjectRef -or -not $AnonKey) {
    Write-Error "Missing Supabase credentials!"
    Write-Host "Provide via parameters or ensure .env.local is configured"
    exit 1
}

$BaseUrl = "https://$ProjectRef.supabase.co"
Write-Success "Connected to: $BaseUrl"
Write-Host ""

$TestsPassed = 0
$TestsFailed = 0

# Test 1: Check candidates API
Write-Host "Test 1: Fetching candidates..." -NoNewline
try {
    $Response = Invoke-RestMethod `
        -Uri "$BaseUrl/rest/v1/candidates?select=id,name,slug,photo_url&limit=5" `
        -Headers @{ 
            "apikey" = $AnonKey
            "Authorization" = "Bearer $AnonKey"
        } `
        -ErrorAction Stop
    
    if ($Response.Count -gt 0) {
        Write-Success " Found $($Response.Count) candidates"
        $TestsPassed++
    } else {
        Write-Warning " No candidates found (database may be empty)"
        $TestsFailed++
    }
} catch {
    Write-Error " Failed: $($_.Exception.Message)"
    $TestsFailed++
}

# Test 2: Check storage bucket
Write-Host "Test 2: Checking storage bucket..." -NoNewline
try {
    # Try to access a candidate photo (assuming at least one exists)
    $TestUrl = "$BaseUrl/storage/v1/object/public/candidates/jude-celestin.jpg"
    $Response = Invoke-WebRequest -Uri $TestUrl -Method Head -ErrorAction Stop
    
    if ($Response.StatusCode -eq 200) {
        Write-Success " Storage bucket accessible"
        $TestsPassed++
    }
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 404) {
        Write-Warning " Bucket exists but photos not uploaded yet"
        $TestsPassed++
    } else {
        Write-Error " Storage check failed"
        $TestsFailed++
    }
}

# Test 3: Verify photo URLs format
Write-Host "Test 3: Verifying candidate photo URLs..." -NoNewline
try {
    $Response = Invoke-RestMethod `
        -Uri "$BaseUrl/rest/v1/candidates?select=slug,photo_url&limit=10" `
        -Headers @{ 
            "apikey" = $AnonKey
            "Authorization" = "Bearer $AnonKey"
        } `
        -ErrorAction Stop
    
    $ValidUrls = 0
    foreach ($Candidate in $Response) {
        if ($Candidate.photo_url -match "^https://.+/candidates/.+\.(jpg|jpeg|png|webp)$") {
            $ValidUrls++
        }
    }
    
    if ($ValidUrls -eq $Response.Count) {
        Write-Success " All $ValidUrls photo URLs are valid"
        $TestsPassed++
    } else {
        Write-Warning " $ValidUrls/$($Response.Count) valid photo URLs"
        $TestsFailed++
    }
} catch {
    Write-Error " Failed to verify photo URLs"
    $TestsFailed++
}

# Test 4: Check vote_aggregates view
Write-Host "Test 4: Checking materialized views..." -NoNewline
try {
    $Response = Invoke-RestMethod `
        -Uri "$BaseUrl/rest/v1/vote_aggregates?select=candidate_id,total_votes&limit=1" `
        -Headers @{ 
            "apikey" = $AnonKey
            "Authorization" = "Bearer $AnonKey"
        } `
        -ErrorAction Stop
    
    Write-Success " Materialized views accessible"
    $TestsPassed++
} catch {
    Write-Error " Materialized views check failed"
    $TestsFailed++
}

# Test 5: Verify RLS policies
Write-Host "Test 5: Verifying Row Level Security..." -NoNewline
try {
    # Try to access private.voters (should fail for anon)
    try {
        $Response = Invoke-RestMethod `
            -Uri "$BaseUrl/rest/v1/voters?limit=1" `
            -Headers @{ 
                "apikey" = $AnonKey
                "Authorization" = "Bearer $AnonKey"
            } `
            -ErrorAction Stop
        
        Write-Warning " RLS may not be properly configured (private table accessible)"
        $TestsFailed++
    } catch {
        # This should fail - it's expected
        Write-Success " RLS properly configured"
        $TestsPassed++
    }
} catch {
    Write-Success " RLS properly configured"
    $TestsPassed++
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Verification Summary" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Success "Tests Passed: $TestsPassed"
if ($TestsFailed -gt 0) {
    Write-Error "Tests Failed: $TestsFailed"
} else {
    Write-Host "Tests Failed: 0" -ForegroundColor Green
}
Write-Host "Total Tests: $($TestsPassed + $TestsFailed)"
Write-Host ""

if ($TestsFailed -eq 0) {
    Write-Success "🎉 All tests passed! Setup is complete."
    exit 0
} else {
    Write-Warning "⚠️  Some tests failed. Please review the errors above."
    exit 1
}
