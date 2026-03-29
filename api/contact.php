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
require_once __DIR__ . '/../includes/mailer.php';
require_once __DIR__ . '/email_templates.php';

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
try {
    sendMail($name, $email, $message);
    sendAutoReply($name, $email);
    jsonSuccess("Message sent. I'll get back to you shortly.");
} catch (\Exception $e) {
    jsonError('Unable to send message. Please try again later.', 500);
}
