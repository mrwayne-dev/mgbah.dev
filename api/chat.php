<?php
/**
 * api/chat.php — WhatsApp live chat endpoint
 * POST /api/chat.php
 * Body: { "name": string, "message": string }
 *
 * Uses Green API to send the message via a linked WhatsApp instance.
 *
 * Green API setup (console.green-api.com):
 *   1. Create/open an instance → scan QR to authorise
 *   2. Copy Instance ID + API Token from the Settings tab
 *   3. Add to .env:
 *        GREENAPI_INSTANCE_ID=your_instance_id
 *        GREENAPI_API_TOKEN=your_api_token
 *   4. WHATSAPP_NUMBER must be digits only, e.g. 2348012345678
 */

require_once __DIR__ . '/../includes/headers.php';
require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../includes/responses.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/rate_limit.php';

// ── Only accept POST ────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed.', 405);
}

// ── Rate limit ──────────────────────────────────────────────────────────────
checkRateLimit();

// ── Parse body ──────────────────────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    jsonError('Invalid request body.');
}

// ── Sanitize ────────────────────────────────────────────────────────────────
$name    = sanitize($input['name']    ?? '');
$message = sanitize($input['message'] ?? '');

// ── Validate ────────────────────────────────────────────────────────────────
if (isEmpty($name))    jsonError('Please enter your name.');
if (isEmpty($message)) jsonError('Please enter a message.');

// ── Check config ────────────────────────────────────────────────────────────
$apiUrl     = GREENAPI_API_URL;
$instanceId = GREENAPI_INSTANCE_ID;
$apiToken   = GREENAPI_API_TOKEN;
$phone      = WHATSAPP_NUMBER;

if (!$apiUrl || !$instanceId || !$apiToken || !$phone) {
    jsonError('Chat is not configured yet. Please email me directly.', 503);
}

// ── Send via Green API ──────────────────────────────────────────────────────
$chatId  = $phone . '@c.us';
$text    = "💬 Website message from {$name}:\n\n{$message}\n\n— mgbah.dev";
$url     = "{$apiUrl}/waInstance{$instanceId}/sendMessage/{$apiToken}";
$payload = json_encode(['chatId' => $chatId, 'message' => $text]);

$ctx = stream_context_create([
    'http' => [
        'method'        => 'POST',
        'header'        => "Content-Type: application/json\r\n",
        'content'       => $payload,
        'timeout'       => 10,
        'ignore_errors' => true,
    ],
]);

$res  = @file_get_contents($url, false, $ctx);
$json = $res ? json_decode($res, true) : null;

// Green API returns {"idMessage": "..."} on success
if (!$json || !isset($json['idMessage'])) {
    jsonError('Could not deliver your message. Please try again.', 500);
}

jsonSuccess('Message delivered.');
