<?php
// ─────────────────────────────────────────────
//  POST /api/signup.php
//  Body: { fullname, email, password }
//  Returns: { success, message }
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$body = getJsonBody();

$fullname = trim($body['fullname'] ?? '');
$email    = trim($body['email']    ?? '');
$password =       $body['password'] ?? '';

// ── Validation ────────────────────────────────
if ($fullname === '') {
    jsonResponse(false, 'Full name is required.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Please enter a valid email address.');
}
if (strlen($password) < 8 || !preg_match('/\d/', $password)) {
    jsonResponse(false, 'Password must be at least 8 characters and contain a number.');
}

// ── Check for existing account ────────────────
$db   = getDB();
$stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    jsonResponse(false, 'An account with this email already exists.');
}

// ── Create account ────────────────────────────
$hash = password_hash($password, PASSWORD_BCRYPT);
$ins  = $db->prepare(
    'INSERT INTO users (fullname, email, password_hash) VALUES (?, ?, ?)'
);
$ins->execute([$fullname, $email, $hash]);
$userId = (int) $db->lastInsertId();

// Auto-login after signup
$_SESSION['user_id']  = $userId;
$_SESSION['fullname'] = $fullname;
$_SESSION['email']    = $email;

jsonResponse(true, 'Account created successfully.', [
    'user' => ['id' => $userId, 'fullname' => $fullname, 'email' => $email]
]);
