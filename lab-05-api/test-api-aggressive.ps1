# Lab 05 - Aggressive Integration Tests
$baseUrl = "http://localhost:3000"
$passed = 0
$failed = 0

function Test-Endpoint {
    param($name, $script)
    Write-Host "`n--- $name ---" -ForegroundColor Cyan
    try {
        $result = & $script
        Write-Host "PASS" -ForegroundColor Green
        $script:passed++
        return $result
    } catch {
        Write-Host "FAIL: $_" -ForegroundColor Red
        $script:failed++
    }
}

Write-Host "=== AGGRESSIVE API INTEGRATION TESTS ===`n" -ForegroundColor Magenta

# Clean slate - delete all items first
Write-Host "CLEANUP: Removing test items" -ForegroundColor Yellow
$items = Invoke-RestMethod -Uri "$baseUrl/items" -Method GET
foreach ($item in $items) {
    if ($item.id -ge 100) {
        Invoke-RestMethod -Uri "$baseUrl/items/$($item.id)" -Method DELETE | Out-Null
    }
}

# 1. BASIC CRUD
Write-Host "`n`n=== BASIC CRUD ===" -ForegroundColor Yellow
Test-Endpoint "GET all (should return 5)" {
    $r = Invoke-RestMethod -Uri "$baseUrl/items" -Method GET
    if ($r.Count -eq 5) { $r } else { throw "Expected 5, got $($r.Count)" }
}

Test-Endpoint "GET by valid id" {
    Invoke-RestMethod -Uri "$baseUrl/items/1" -Method GET
}

Test-Endpoint "GET by invalid id returns 404" {
    try { Invoke-RestMethod -Uri "$baseUrl/items/9999" -Method GET; throw "Should have failed" } 
    catch { if ($_.Exception.Response.StatusCode -eq 404) { "404 OK" } else { throw "Wrong status" } }
}

# 2. VALIDATION TESTS
Write-Host "`n`n=== VALIDATION TESTS ===" -ForegroundColor Yellow

Test-Endpoint "POST missing title -> 400" {
    try { Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ category = "X"; year = 2000 } | ConvertTo-Json) -ContentType "application/json"; throw "Should fail" } 
    catch { if ($_.Exception.Response.StatusCode -eq 400) { "400 OK" } else { throw "Wrong status" } }
}

Test-Endpoint "POST missing category -> 400" {
    try { Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "X"; year = 2000 } | ConvertTo-Json) -ContentType "application/json"; throw "Should fail" } 
    catch { if ($_.Exception.Response.StatusCode -eq 400) { "400 OK" } else { throw "Wrong status" } }
}

Test-Endpoint "POST missing year -> 400" {
    try { Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "X"; category = "X" } | ConvertTo-Json) -ContentType "application/json"; throw "Should fail" } 
    catch { if ($_.Exception.Response.StatusCode -eq 400) { "400 OK" } else { throw "Wrong status" } }
}

Test-Endpoint "POST empty body -> 400" {
    try { Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body "{}" -ContentType "application/json"; throw "Should fail" } 
    catch { if ($_.Exception.Response.StatusCode -eq 400) { "400 OK" } else { throw "Wrong status" } }
}

# 3. EDGE CASES
Write-Host "`n`n=== EDGE CASES ===" -ForegroundColor Yellow

Test-Endpoint "POST with watched=true" {
    Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "Edge Test"; category = "Test"; year = 2000; watched = $true } | ConvertTo-Json) -ContentType "application/json"
}

Test-Endpoint "POST year as string (should work)" {
    Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "Year String"; category = "Test"; year = "1999" } | ConvertTo-Json) -ContentType "application/json"
}

Test-Endpoint "POST with special chars in title" {
    Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "Test <>&`'"; category = "Test"; year = 2000 } | ConvertTo-Json) -ContentType "application/json"
}

# 4. BOUNDARY VALUES
Write-Host "`n`n=== BOUNDARY VALUES ===" -ForegroundColor Yellow

Test-Endpoint "POST very old film" {
    Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "Old Film"; category = "Test"; year = 1800 } | ConvertTo-Json) -ContentType "application/json"
}

Test-Endpoint "POST future year" {
    Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "Future Film"; category = "Test"; year = 2099 } | ConvertTo-Json) -ContentType "application/json"
}

# 5. DELETE EDGE CASES
Write-Host "`n`n=== DELETE EDGE CASES ===" -ForegroundColor Yellow

Test-Endpoint "DELETE non-existent -> 404" {
    try { Invoke-RestMethod -Uri "$baseUrl/items/99999" -Method DELETE; throw "Should fail" } 
    catch { if ($_.Exception.Response.StatusCode -eq 404) { "404 OK" } else { throw "Wrong status" } }
}

Test-Endpoint "DELETE then GET -> 404" {
    $new = Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "ToDelete"; category = "T"; year = 2000 } | ConvertTo-Json) -ContentType "application/json"
    $id = $new.id
    Invoke-RestMethod -Uri "$baseUrl/items/$id" -Method DELETE | Out-Null
    try { Invoke-RestMethod -Uri "$baseUrl/items/$id" -Method GET; throw "Should fail" } 
    catch { if ($_.Exception.Response.StatusCode -eq 404) { "404 OK" } else { throw "Wrong status" } }
}

# 6. IDEMPOTENCY
Write-Host "`n`n=== IDEMPOTENCY ===" -ForegroundColor Yellow

Test-Endpoint "GET same id multiple times" {
    1..5 | ForEach-Object { Invoke-RestMethod -Uri "$baseUrl/items/1" -Method GET }
    Invoke-RestMethod -Uri "$baseUrl/items/1" -Method GET
}

# 7. CONCURRENT REQUESTS
Write-Host "`n`n=== CONCURRENT ===" -ForegroundColor Yellow

Test-Endpoint "Concurrent GETs" {
    1..10 | ForEach-Object { Invoke-RestMethod -Uri "$baseUrl/items" -Method GET } | Out-Null
    Invoke-RestMethod -Uri "$baseUrl/items" -Method GET
}

# SUMMARY
Write-Host "`n`n=== SUMMARY ===" -ForegroundColor Magenta
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })

if ($failed -eq 0) {
    Write-Host "`nALL TESTS PASSED!" -ForegroundColor Green
} else {
    Write-Host "`nSOME TESTS FAILED!" -ForegroundColor Red
    exit 1
}
