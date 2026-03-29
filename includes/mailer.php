<?php
/**
 * mailer.php — PHPMailer wrapper
 * createMailer()    — configured PHPMailer instance
 * sendMail()        — notification email to site owner
 * sendAutoReply()   — confirmation email to the contact
 */

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function createMailer(): PHPMailer {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = getenv('SMTP_HOST');
    $mail->SMTPAuth   = true;
    $mail->Username   = getenv('SMTP_USER');
    $mail->Password   = getenv('SMTP_PASS');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int) getenv('SMTP_PORT');
    $mail->CharSet    = 'UTF-8';

    $fromAddress = getenv('SMTP_FROM') ?: getenv('SMTP_USER');
    $fromName    = getenv('SMTP_FROM_NAME') ?: 'mgbah.dev';
    $mail->setFrom($fromAddress, $fromName);
    $mail->isHTML(true);

    return $mail;
}

/**
 * Send contact notification to site owner.
 */
function sendMail(string $name, string $email, string $message): void {
    $mail = createMailer();

    $notifyTo = getenv('SMTP_TO') ?: getenv('SMTP_USER');
    $mail->addAddress($notifyTo);
    $mail->addReplyTo($email, $name);

    $mail->Subject = "New contact from {$name} — mgbah.dev";
    $mail->Body    = buildContactNotification($name, $email, $message);
    $mail->AltBody = "From: {$name} <{$email}>\n\n{$message}";

    $mail->send();
}

/**
 * Send auto-reply confirmation to the person who submitted the form.
 */
function sendAutoReply(string $name, string $email): void {
    $templatePath = __DIR__ . '/../api/mail_templates/contact_autoreply.html';
    if (!file_exists($templatePath)) return;

    $html = file_get_contents($templatePath);
    $html = str_replace('{{NAME}}', htmlspecialchars($name, ENT_QUOTES, 'UTF-8'), $html);

    $mail = createMailer();
    $mail->addAddress($email, $name);

    $mail->Subject = "Got your message — I'll be in touch";
    $mail->Body    = $html;
    $mail->AltBody = "Hi {$name},\n\nThanks for reaching out. I've received your message and will get back to you shortly.\n\n— Michael Mgbah\nmichael@mgbah.dev";

    $mail->send();
}
