<?php
/**
 * api/contact.php — Contact form endpoint
 * POST /api/contact.php
 * Body: { "name": string, "email": string, "message": string }
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
$email   = sanitize($input['email']   ?? '');
$message = sanitize($input['message'] ?? '');

// ── Validate ────────────────────────────────────────────────────────────────
if (isEmpty($name)) {
    jsonError('Please enter your name.');
}
if (isEmpty($email)) {
    jsonError('Please enter your email address.');
}
if (!isValidEmail($email)) {
    jsonError('Please provide a valid email address.');
}
if (isEmpty($message)) {
    jsonError('Please enter a message.');
}

// ── Send ────────────────────────────────────────────────────────────────────
// Flush the HTTP response to the browser first, then send emails in the
// background. SMTP latency (TLS handshake, auth, DATA transfer) can take
// 5–60 seconds — the user should never wait for it.

$responseJson = json_encode([
    'status'  => 'success',
    'message' => "Message sent. I'll get back to you shortly.",
]);

http_response_code(200);
header('Content-Length: ' . strlen($responseJson));
header('Connection: close');

// Flush all output buffers so headers + body reach the browser
while (ob_get_level()) ob_end_flush();
echo $responseJson;
flush();

// PHP-FPM: close the HTTP connection and continue execution
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
}

// Allow script to keep running even if the client disconnects
ignore_user_abort(true);
set_time_limit(60);

// Load mailer only after flush — a missing vendor/ causes fatal before response otherwise
if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    error_log('[mgbah.dev] vendor/autoload.php missing — run composer install on production');
    return;
}

require_once __DIR__ . '/../includes/mailer.php';
require_once __DIR__ . '/email_templates.php';

try {
    $mail = createMailer();
    sendAdminNotification($mail, $name, $email, $message);
    sendAutoReply($mail, $name, $email);
    $mail->smtpClose();
} catch (\Exception $e) {
    error_log('[mgbah.dev] Contact email failed: ' . $e->getMessage());
}
