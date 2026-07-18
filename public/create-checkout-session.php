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
    echo json_encode([
        'error' => 'Stripe secret key is not configured on the server. Create stripe-config.php in the same folder as create-checkout-session.php.',
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$customer = isset($payload['customer']) && is_array($payload['customer']) ? $payload['customer'] : [];
$order = isset($payload['order']) && is_array($payload['order']) ? $payload['order'] : [];
$items = isset($order['items']) && is_array($order['items']) ? $order['items'] : [];
$successUrl = trim((string) ($order['successUrl'] ?? ''));
$cancelUrl = trim((string) ($order['cancelUrl'] ?? ''));
$customerEmail = filter_var((string) ($customer['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$customerName = trim((string) ($customer['name'] ?? ''));
$customerCompany = trim((string) ($customer['company'] ?? ''));
$customerCountry = trim((string) ($customer['country'] ?? ''));

if (!$customerEmail || $successUrl === '' || $cancelUrl === '' || empty($items)) {
    http_response_code(422);
    echo json_encode(['error' => 'Missing required checkout data']);
    exit;
}

$normalizedItems = [];
foreach ($items as $index => $item) {
    if (!is_array($item)) {
        continue;
    }

    $priceId = trim((string) ($item['priceId'] ?? ''));
    $quantity = max(1, (int) ($item['quantity'] ?? 1));
    $name = trim((string) ($item['name'] ?? 'Package'));

    if ($priceId === '' || stripos($priceId, 'REPLACE_WITH') !== false) {
        http_response_code(422);
        echo json_encode(['error' => 'One or more Stripe Price IDs are missing or invalid.']);
        exit;
    }

    $normalizedItems[] = [
        'priceId' => $priceId,
        'quantity' => $quantity,
        'name' => $name,
    ];
}

if (empty($normalizedItems)) {
    http_response_code(422);
    echo json_encode(['error' => 'No valid cart items were provided.']);
    exit;
}

$postFields = [
    'mode' => 'subscription',
    'success_url' => $successUrl,
    'cancel_url' => $cancelUrl,
    'customer_email' => $customerEmail,
    'billing_address_collection' => 'required',
    'allow_promotion_codes' => 'true',
    'metadata[customer_name]' => $customerName,
    'metadata[company]' => $customerCompany,
    'metadata[country]' => $customerCountry,
];

foreach ($normalizedItems as $index => $item) {
    $postFields["line_items[{$index}][price]"] = $item['priceId'];
    $postFields["line_items[{$index}][quantity]"] = (string) $item['quantity'];
}

$curl = curl_init('https://api.stripe.com/v1/checkout/sessions');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => http_build_query($postFields),
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $stripeSecretKey,
        'Content-Type: application/x-www-form-urlencoded',
    ],
]);

$responseBody = curl_exec($curl);
$httpCode = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($responseBody === false || $curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not connect to Stripe: ' . $curlError]);
    exit;
}

$responseData = json_decode($responseBody, true);
if (!is_array($responseData)) {
    http_response_code(500);
    echo json_encode(['error' => 'Stripe returned an invalid response.']);
    exit;
}

if ($httpCode >= 400) {
    $stripeMessage = $responseData['error']['message'] ?? 'Stripe checkout session creation failed.';
    http_response_code($httpCode);
    echo json_encode(['error' => $stripeMessage]);
    exit;
}

if (empty($responseData['url'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Stripe did not return a checkout URL.']);
    exit;
}

echo json_encode(['url' => $responseData['url']]);
