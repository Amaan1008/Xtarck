<?php
// ─────────────────────────────────────────────
//  POST /api/login.php
//  Body: { email, password }
//  Returns: { success, message, user? }
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$body = getJsonBody();

$email    = trim($body['email']    ?? '');
$password =       $body['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Please enter a valid email address.');
}
if ($password === '') {
    jsonResponse(false, 'Password is required.');
}

$db   = getDB();
$stmt = $db->prepare('SELECT id, fullname, email, password_hash, status FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    jsonResponse(false, 'Invalid email or password.');
}

// ── Check if account is banned ────────────────
if ($user['status'] === 'banned') {
    http_response_code(403);
    jsonResponse(false, 'Your account has been suspended. Please contact support.');
}

$_SESSION['user_id']  = (int) $user['id'];
$_SESSION['fullname'] = $user['fullname'];
$_SESSION['email']    = $user['email'];

session_regenerate_id(true);

jsonResponse(true, 'Login successful.', [
    'user' => [
        'id'       => (int) $user['id'],
        'fullname' => $user['fullname'],
        'email'    => $user['email'],
    ]
]);
