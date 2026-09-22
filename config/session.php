<?php
// ─────────────────────────────────────────────
//  Xtrack — Session & CORS helper
//  Included at the top of every API file.
// ─────────────────────────────────────────────

// Allow the front-end HTML files (same origin) to call the API.
// If you deploy front-end and back-end on different origins,
// change '*' to your exact front-end origin, e.g. 'https://xtrack.example.com'
header('Content-Type: application/json; charset=utf-8');

// Reflect the requesting origin so credentials (session cookies) are
// accepted by the browser.  Browsers reject credentials with '*'.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: http://localhost');
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Start session
if (session_status() === PHP_SESSION_NONE) {
    // Set cookie params BEFORE session_start()
    // SameSite=Lax allows cookies on same-site navigations; use 'None' only for cross-site + HTTPS
    session_set_cookie_params([
        'lifetime' => 0,          // browser session
        'path'     => '/',
        'domain'   => '',
        'secure'   => false,      // set true when using HTTPS in production
        'httponly' => true,       // JS cannot access the cookie
        'samesite' => 'Lax',      // CSRF protection while still allowing normal navigation
    ]);
    session_start();
}

// ── Helpers ───────────────────────────────────

function jsonResponse(bool $success, string $message, array $data = []): void {
    echo json_encode(array_merge(['success' => $success, 'message' => $message], $data));
    exit;
}

function requireAuth(): int {
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        jsonResponse(false, 'Not authenticated. Please log in.');
    }
    return (int) $_SESSION['user_id'];
}

function getJsonBody(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}
