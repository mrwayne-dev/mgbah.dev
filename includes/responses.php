<?php
/**
 * responses.php — JSON response helpers
 * Always exits after output — call these as the final step.
 */

function jsonSuccess(string $message, array $data = []): void {
    http_response_code(200);
    echo json_encode(array_merge(['status' => 'success', 'message' => $message], $data));
    exit;
}

function jsonError(string $message, int $code = 400): void {
    http_response_code($code);
    echo json_encode(['status' => 'error', 'message' => $message]);
    exit;
}
