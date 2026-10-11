$payload = @{
    email = "ifeanyichukwu892@gmail.com"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5173/api/send-guide" -Method Post -Body $payload -ContentType "application/json"
$response | Format-List
