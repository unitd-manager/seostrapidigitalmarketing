<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ── Load Stripe secret key ────────────────────────────────────────────────────
$stripeSecretKey = getenv('STRIPE_SECRET_KEY');

if (!$stripeSecretKey) {
    $configPaths = [__DIR__ . DIRECTORY_SEPARATOR . 'stripe-config.php'];
    foreach ($configPaths as $configPath) {
        if (!is_file($configPath) || !is_readable($configPath)) {
            continue;
        }
        $config = include $configPath;
        if (is_array($config) && !empty($config['stripe_secret_key'])) {
            $stripeSecretKey = trim((string) $config['stripe_secret_key']);
            break;
        }
    }
}

if (!$stripeSecretKey) {
    http_response_code(500);
    echo json_encode(['error' => 'Stripe secret key not configured.']);
    exit;
}

// ── Parse request body ────────────────────────────────────────────────────────
$rawInput = file_get_contents('php://input');
$payload  = json_decode($rawInput, true);

if (!is_array($payload) || empty($payload['session_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing session_id']);
    exit;
}

$sessionId = trim((string) $payload['session_id']);

// ── Verify session with Stripe ────────────────────────────────────────────────
$curl = curl_init(
    'https://api.stripe.com/v1/checkout/sessions/' . urlencode($sessionId) . '?expand[]=line_items'
);
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $stripeSecretKey],
]);
$responseBody = curl_exec($curl);
$httpCode     = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

if (!$responseBody || $httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not verify Stripe session.']);
    exit;
}

$session = json_decode($responseBody, true);
if (!is_array($session) || ($session['payment_status'] ?? '') !== 'paid') {
    http_response_code(422);
    echo json_encode(['error' => 'Payment not confirmed by Stripe.']);
    exit;
}

// ── Extract order details ─────────────────────────────────────────────────────
$customerEmail   = filter_var($session['customer_email'] ?? '', FILTER_VALIDATE_EMAIL);
$customerName    = htmlspecialchars($session['metadata']['customer_name'] ?? 'Valued Customer', ENT_QUOTES, 'UTF-8');
$customerCompany = htmlspecialchars($session['metadata']['company'] ?? '', ENT_QUOTES, 'UTF-8');
$amountTotal     = isset($session['amount_total']) ? number_format($session['amount_total'] / 100, 2) : '0.00';
$currency        = strtoupper($session['currency'] ?? 'USD');

$lineItemsHtmlDark  = '';
$lineItemsHtmlLight = '';
if (!empty($session['line_items']['data'])) {
    foreach ($session['line_items']['data'] as $lineItem) {
        $itemName   = htmlspecialchars($lineItem['description'] ?? 'Package', ENT_QUOTES, 'UTF-8');
        $itemQty    = (int) ($lineItem['quantity'] ?? 1);
        $itemAmount = isset($lineItem['amount_total'])
            ? number_format($lineItem['amount_total'] / 100, 2)
            : '0.00';
        $lineItemsHtmlDark  .= "<tr>
            <td style='padding:8px 12px;border-bottom:1px solid #334155;color:#cbd5e1;font-size:14px;'>{$itemName} &times; {$itemQty}</td>
            <td style='padding:8px 12px;border-bottom:1px solid #334155;color:#e2e8f0;font-weight:600;font-size:14px;text-align:right;'>{$currency} {$itemAmount}</td>
          </tr>";
        $lineItemsHtmlLight .= "<tr>
            <td style='padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-size:14px;'>{$itemName} &times; {$itemQty}</td>
            <td style='padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;font-weight:600;font-size:14px;text-align:right;'>{$currency} {$itemAmount}</td>
          </tr>";
    }
}

$adminEmail = 'jasmine@unitdtechnologies.com';
$fromEmail  = 'notification@unitdtechnologies.com';
$fromName   = 'SEO Digital Marketing';

// ── SMTP mailer (mirrors nodemailer config) ───────────────────────────────────
/**
 * Send an HTML email via SSL SMTP.
 *
 * Config mirrors nodemailer:
 *   host: premium128.web-hosting.com  port: 465  secure: true
 *   user: notification@unitdtechnologies.com
 */
function sendSmtpEmail(
    string $to,
    string $toName,
    string $subject,
    string $htmlBody,
    string $fromName,
    string $fromEmail,
    string $replyTo = ''
): bool {
    $smtpHost = 'premium128.web-hosting.com';
    $smtpPort = 465;
    $smtpUser = 'notification@unitdtechnologies.com';
    $smtpPass = 'notification777#';

    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer'      => true,
            'verify_peer_name' => true,
        ],
    ]);

    $socket = @stream_socket_client(
        "ssl://{$smtpHost}:{$smtpPort}",
        $errno,
        $errstr,
        30,
        STREAM_CLIENT_CONNECT,
        $ctx
    );

    if (!$socket) {
        error_log("SMTP connect failed: {$errstr} ({$errno})");
        return false;
    }

    stream_set_timeout($socket, 15);

    // Read one multi-line SMTP response
    $read = function () use ($socket): string {
        $data = '';
        while (!feof($socket)) {
            $line  = fgets($socket, 512);
            $data .= $line;
            // Final line of a response has a space after the 3-digit code
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };

    $write = function (string $cmd) use ($socket): void {
        fwrite($socket, $cmd . "\r\n");
    };

    $read(); // server greeting

    $write('EHLO ' . gethostname());
    $read();

    $write('AUTH LOGIN');
    $read();

    $write(base64_encode($smtpUser));
    $read();

    $write(base64_encode($smtpPass));
    $authResponse = $read();
    if (strpos($authResponse, '235') === false) {
        error_log("SMTP AUTH failed: {$authResponse}");
        fclose($socket);
        return false;
    }

    $write("MAIL FROM:<{$fromEmail}>");
    $read();

    $write("RCPT TO:<{$to}>");
    $read();

    $write('DATA');
    $read();

    // Encode subject for non-ASCII safety
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    $replyToHeader = $replyTo ? "Reply-To: {$replyTo}\r\n" : '';

    $message  = "From: {$fromName} <{$fromEmail}>\r\n";
    $message .= "To: {$toName} <{$to}>\r\n";
    $message .= "Subject: {$encodedSubject}\r\n";
    $message .= $replyToHeader;
    $message .= "MIME-Version: 1.0\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "\r\n";
    $message .= chunk_split(base64_encode($htmlBody));
    $message .= "\r\n.";  // end of DATA

    fwrite($socket, $message . "\r\n");
    $dataResponse = $read();

    $write('QUIT');
    fclose($socket);

    return strpos($dataResponse, '250') !== false;
}

// ── Customer confirmation email ───────────────────────────────────────────────
if ($customerEmail) {
    $subject = "Your SEO Campaign is Confirmed!";
    $html    = <<<HTML
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Payment Confirmed</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
      <tr><td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px 40px;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Payment Confirmed &#10003;</h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Your SEO campaign is now active</p>
      </td></tr>
      <tr><td style="padding:32px 40px;">
        <p style="color:#cbd5e1;font-size:15px;margin:0 0 12px;">Hi {$customerName},</p>
        <p style="color:#cbd5e1;font-size:15px;margin:0 0 24px;">Thank you for your purchase! We&rsquo;re excited to get started on your SEO campaign. Our team will reach out within 24 hours to kick things off.</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:8px;overflow:hidden;margin-bottom:24px;">
          <tr style="background:#1e3a5f;">
            <th style="padding:10px 12px;text-align:left;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Package</th>
            <th style="padding:10px 12px;text-align:right;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Amount</th>
          </tr>
          {$lineItemsHtmlDark}
          <tr>
            <td style="padding:10px 12px;color:#f1f5f9;font-weight:700;font-size:14px;">Total / month</td>
            <td style="padding:10px 12px;text-align:right;color:#818cf8;font-weight:700;font-size:16px;">{$currency} {$amountTotal}</td>
          </tr>
        </table>
        <p style="color:#64748b;font-size:13px;margin:0 0 6px;">Order reference: <span style="font-family:monospace;background:#0f172a;padding:2px 6px;border-radius:4px;color:#a5b4fc;">{$sessionId}</span></p>
        <p style="color:#64748b;font-size:13px;margin:0;">Questions? Just reply to this email and we&rsquo;ll be happy to help.</p>
      </td></tr>
      <tr><td style="padding:20px 40px;border-top:1px solid #334155;text-align:center;">
        <p style="margin:0;color:#475569;font-size:12px;">&copy; 2026 SEO Digital Marketing</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;

    sendSmtpEmail($customerEmail, $customerName, $subject, $html, $fromName, $fromEmail, $adminEmail);
}

// ── Admin notification email ────────────────────────────────────────────────── 
$companyDisplay = $customerCompany ?: $customerName;
$adminSubject   = "New SEO Order" . ($companyDisplay ? " from {$companyDisplay}" : '');

$adminHtml = <<<HTML
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>New Order</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;border:1px solid #e2e8f0;">
      <tr><td style="background:#7c3aed;padding:24px 32px;">
        <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">New Order Received</h1>
      </td></tr>
      <tr><td style="padding:28px 32px;">
        <h2 style="margin:0 0 14px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.07em;">Customer Details</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:14px;width:110px;">Name</td>
            <td style="padding:5px 0;color:#1e293b;font-size:14px;font-weight:600;">{$customerName}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:14px;">Email</td>
            <td style="padding:5px 0;font-size:14px;"><a href="mailto:{$customerEmail}" style="color:#7c3aed;text-decoration:none;">{$customerEmail}</a></td>
          </tr>
          <tr>
            <td style="padding:5px 0;color:#64748b;font-size:14px;">Company</td>
            <td style="padding:5px 0;color:#1e293b;font-size:14px;">{$customerCompany}</td>
          </tr>
        </table>
        <h2 style="margin:0 0 14px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.07em;">Order Details</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:20px;">
          <tr style="background:#f1f5f9;">
            <th style="padding:10px 12px;text-align:left;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;">Package</th>
            <th style="padding:10px 12px;text-align:right;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;">Amount</th>
          </tr>
          {$lineItemsHtmlLight}
          <tr style="background:#f8fafc;">
            <td style="padding:10px 12px;color:#1e293b;font-weight:700;font-size:14px;">Total / month</td>
            <td style="padding:10px 12px;text-align:right;color:#7c3aed;font-weight:700;font-size:16px;">{$currency} {$amountTotal}</td>
          </tr>
        </table>
        <p style="color:#94a3b8;font-size:12px;margin:0;">Stripe Session: <span style="font-family:monospace;background:#f1f5f9;padding:2px 6px;border-radius:4px;color:#475569;">{$sessionId}</span></p>
      </td></tr>
      <tr><td style="padding:18px 32px;border-top:1px solid #e2e8f0;text-align:center;">
        <p style="margin:0;color:#94a3b8;font-size:12px;">SEO Digital Marketing &middot; Admin Notification</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>
HTML;

$replyToCustomer = $customerEmail ?: '';
sendSmtpEmail($adminEmail, 'Admin', $adminSubject, $adminHtml, $fromName, $fromEmail, $replyToCustomer);

echo json_encode(['success' => true]);
