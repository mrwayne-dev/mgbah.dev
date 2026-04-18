<?php
/**
 * mailer.php — PHPMailer wrapper
 * createMailer()          — configured PHPMailer instance (shared connection)
 * sendAdminNotification() — notification to both admin addresses (ADMIN_MAIL + ADMIN_MAIL_PERSONAL)
 * sendAutoReply()         — confirmation email to the person who submitted the form
 */

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

function createMailer(): PHPMailer {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host          = getenv('SMTP_HOST');
    $mail->SMTPAuth      = true;
    $mail->Username      = getenv('SMTP_USER');
    $mail->Password      = getenv('SMTP_PASS');
    $mail->SMTPSecure    = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port          = (int) getenv('SMTP_PORT');
    $mail->CharSet       = 'UTF-8';
    // Reuse the same TCP/TLS connection for every send() call on this instance
    $mail->SMTPKeepAlive = true;
    // Hard cap per SMTP operation — failsafe if flush-before-send doesn't work
    $mail->Timeout       = 10;

    $fromAddress = getenv('SMTP_FROM') ?: getenv('SMTP_USER');
    $fromName    = getenv('SMTP_FROM_NAME') ?: 'mgbah.dev';
    $mail->setFrom($fromAddress, $fromName);
    $mail->isHTML(true);

    return $mail;
}

/**
 * Send contact notification to both admin addresses.
 * Both ADMIN_MAIL and ADMIN_MAIL_PERSONAL receive the same notification
 * in a single SMTP transaction (one DATA command, two recipients).
 * Expects a shared PHPMailer instance (SMTPKeepAlive = true).
 */
function sendAdminNotification(PHPMailer $mail, string $name, string $email, string $message): void {
    $admin1 = getenv('ADMIN_MAIL')          ?: getenv('SMTP_USER');
    $admin2 = getenv('ADMIN_MAIL_PERSONAL') ?: '';

    $mail->addAddress($admin1);
    if ($admin2 && $admin2 !== $admin1) {
        $mail->addAddress($admin2);
    }
    $mail->addReplyTo($email, $name);

    $mail->Subject = "New contact from {$name} — mgbah.dev";
    $mail->Body    = buildContactNotification($name, $email, $message);
    $mail->AltBody = "From: {$name} <{$email}>\n\n{$message}";

    $mail->send();
    $mail->clearAllRecipients();
    $mail->clearReplyTos();
}

/**
 * Send auto-reply confirmation to the person who submitted the form.
 * Expects a shared PHPMailer instance (SMTPKeepAlive = true).
 */
function sendAutoReply(PHPMailer $mail, string $name, string $email): void {
    $templatePath = __DIR__ . '/../api/mail_templates/contact_autoreply.html';
    if (!file_exists($templatePath)) return;

    $html = file_get_contents($templatePath);
    $html = str_replace('{{NAME}}', htmlspecialchars($name, ENT_QUOTES, 'UTF-8'), $html);

    $mail->addAddress($email, $name);

    $mail->Subject = "Got your message — I'll be in touch";
    $mail->Body    = $html;
    $mail->AltBody = "Hi {$name},\n\nThanks for reaching out. I've received your message and will get back to you shortly.\n\n— Michael Mgbah\nmichael@mgbah.dev";

    $mail->send();
    $mail->clearAllRecipients();
}
