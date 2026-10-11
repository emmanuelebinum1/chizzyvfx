$payload = @{
    userName = "Ifeanyi"
    userEmail = "ifeanyichukwu892@gmail.com"
    userHandle = "@chizzyvfx"
    selectedDate = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    selectedTimeSlot = "2:00 PM"
    hasOffer = "yes"
    leadSystem = "ads"
    contentGoal = "leads"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5173/api/book-call" -Method Post -Body $payload -ContentType "application/json"
$response | Format-List
