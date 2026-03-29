<?php
/**
 * helpers.php — Input utility functions
 * sanitize() trims whitespace only — HTML escaping is done at output time.
 */

function sanitize(string $value): string {
    return trim($value);
}

function isValidEmail(string $email): bool {
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

function isEmpty(string $value): bool {
    return trim($value) === '';
}
