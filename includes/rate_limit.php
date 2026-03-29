<?php
/**
 * rate_limit.php — File-based rate limiter
 * Keyed by hashed IP. Stores timestamps in a temp file.
 * Calls jsonError(429) and exits if limit is exceeded.
 * Requires responses.php to be loaded before calling checkRateLimit().
 */

function checkRateLimit(): void {
    $max    = defined('RATE_LIMIT_MAX')    ? RATE_LIMIT_MAX    : 5;
    $window = defined('RATE_LIMIT_WINDOW') ? RATE_LIMIT_WINDOW : 300;

    $ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', $ip . 'mgbah.dev');

    $dir  = sys_get_temp_dir() . '/mgbah_rl';
    $file = $dir . '/' . $key . '.json';

    // Ensure storage directory exists
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }

    $now        = time();
    $timestamps = [];

    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true);
        if (is_array($data)) {
            // Discard timestamps outside the window
            $timestamps = array_values(
                array_filter($data, fn(int $t): bool => ($now - $t) < $window)
            );
        }
    }

    if (count($timestamps) >= $max) {
        jsonError('Too many requests. Please try again in a few minutes.', 429);
    }

    $timestamps[] = $now;
    file_put_contents($file, json_encode($timestamps), LOCK_EX);
}
