<?php
/**
 * email_templates.php — HTML email builder for contact notifications
 */

function buildContactNotification(string $name, string $email, string $message): string {
    $safeName    = htmlspecialchars($name,    ENT_QUOTES, 'UTF-8');
    $safeEmail   = htmlspecialchars($email,   ENT_QUOTES, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Contact — mgbah.dev</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="background-color:#111111;border:1px solid #222222;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px;border-bottom:1px solid #222222;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888888;">mgbah.dev</p>
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.2;">New contact message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">

              <!-- From -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#888888;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">{$safeName}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #222222;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#888888;">Email</p>
                    <a href="mailto:{$safeEmail}" style="margin:0;font-size:15px;color:#ffffff;text-decoration:none;">{$safeEmail}</a>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#888888;">Message</p>
                    <p style="margin:0;font-size:15px;color:#cccccc;line-height:1.75;">{$safeMessage}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #222222;">
              <p style="margin:0;font-size:11px;color:#444444;">Sent via mgbah.dev contact form</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}
