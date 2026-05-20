<?php

// CORS headers (for Angular / frontend apps)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$siteEmail = "lukaslehmann05@protonmail.com";

$serverHost = $_SERVER['HTTP_HOST'] ?? ($_SERVER['SERVER_NAME'] ?? 'localhost');
$serverHost = preg_replace('/:\\d+$/', '', $serverHost); // strip optional port
$serverHost = preg_replace('/^www\./i', '', $serverHost);
$fromAddress = 'no-reply@' . $serverHost;

switch ($_SERVER['REQUEST_METHOD']) {

    case 'OPTIONS':
        // Preflight request
        http_response_code(200);
        exit;

    case 'POST':
        // Read raw JSON payload
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        // Saubere JSON-Fehlerprüfung
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
            exit;
        }

        if (!is_object($params)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid payload']);
            exit;
        }

        $email = trim((string)($params->email ?? ''));
        $name = trim((string)($params->name ?? ''));
        $userMessage = trim((string)($params->message ?? ''));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($name) || empty($userMessage)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid input data']);
            exit;
        }

        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

        $recipient = $siteEmail; 
        $subject = 'Website Contact Form';

        $mailBody = "
            <strong>Name:</strong> {$safeName}<br>
            <strong>Email:</strong> {$safeEmail}<br><br>
            <strong>Message:</strong><br>
            {$safeMessage}
        ";

        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: Website Kontakt <' . $fromAddress . '>';
        $headers[] = 'Reply-To: ' . str_replace(["\r", "\n"], '', $email);

        $additionalParams = '';
        if (stripos(PHP_OS, 'WIN') !== 0) {
            $additionalParams = '-f ' . $fromAddress;
        }

        $success = $additionalParams !== ''
            ? mail($recipient, $subject, $mailBody, implode("\r\n", $headers), $additionalParams)
            : mail($recipient, $subject, $mailBody, implode("\r\n", $headers));

        if ($success) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            $lastError = error_get_last();
            $errorMessage = $lastError['message'] ?? 'Mail delivery failed';
            echo json_encode(['success' => false, 'error' => $errorMessage]);
        }

        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}