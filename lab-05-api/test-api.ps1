# Lab 05 API Test Script
# Run with: .\test-api.ps1

$baseUrl = "http://localhost:3000"

Write-Host "`n=== LAB 05 API TESTS ===`n" -ForegroundColor Cyan

Write-Host "1. GET all items" -ForegroundColor Yellow
Invoke-RestMethod -Uri "$baseUrl/items" -Method GET | ConvertTo-Json

Write-Host "`n2. GET item by id (1)" -ForegroundColor Yellow
Invoke-RestMethod -Uri "$baseUrl/items/1" -Method GET

Write-Host "`n3. GET non-existent (999)" -ForegroundColor Yellow
try { 
    Invoke-RestMethod -Uri "$baseUrl/items/999" -Method GET 
} catch { 
    Write-Host "Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

Write-Host "`n4. POST valid item" -ForegroundColor Yellow
Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "Dune"; category = "Sci-Fi"; year = 2021 } | ConvertTo-Json) -ContentType "application/json"

Write-Host "`n5. POST missing fields" -ForegroundColor Yellow
try { 
    Invoke-RestMethod -Uri "$baseUrl/items" -Method POST -Body (@{ title = "No Category" } | ConvertTo-Json) -ContentType "application/json" 
} catch { 
    Write-Host "Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

Write-Host "`n6. DELETE item (6)" -ForegroundColor Yellow
Invoke-RestMethod -Uri "$baseUrl/items/6" -Method DELETE

Write-Host "`n=== TESTS COMPLETE ===" -ForegroundColor Cyan
