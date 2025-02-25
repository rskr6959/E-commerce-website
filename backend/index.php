<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); // Ensure this matches your frontend URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// API URL
$apiUrl = "https://fakestoreapi.com/products";

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt_array($ch, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPGET => true,
]);

// Execute cURL request
$response = curl_exec($ch);

// Handle cURL errors
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode([
        "error" => "cURL error: " . curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

// Validate and decode JSON response
if (!$response) {
    http_response_code(500);
    echo json_encode(["error" => "No response from API"]);
    curl_close($ch);
    exit;
}

// Optional: Validate the response structure if needed
$jsonData = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode([
        "error" => "Invalid JSON format: " . json_last_error_msg()
    ]);
    curl_close($ch);
    exit;
}

// Close cURL session
curl_close($ch);

// Output the response from the API
http_response_code(200);
echo json_encode($jsonData);
?>