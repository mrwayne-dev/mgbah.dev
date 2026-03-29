<?php
/**
 * headers.php — HTTP headers for API endpoints
 * Must be required before any output in every api/*.php file.
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

// CORS — allow requests from known origins only
$allowedOrigins = [
    'http://localhost',
    'http://localhost:8000',
    'http://mgbah.dev.test',
    'https://mgbah.dev',
    'https://www.mgbah.dev',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
} else {
    header('Access-Control-Allow-Origin: https://mgbah.dev');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight — respond immediately with 204
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
