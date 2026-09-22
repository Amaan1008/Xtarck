<?php
// ─────────────────────────────────────────────────────────
//  /api/profile.php
//
//  GET  — return current user's profile
//  PUT  — update fullname and/or phone
// ─────────────────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

// Must be authenticated
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    jsonResponse(false, 'Not authenticated.');
}

$userId = (int) $_SESSION['user_id'];
$db     = getDB();

// ── GET ────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $db->prepare(
        'SELECT id, fullname, email, phone, created_at FROM users WHERE id = ?'
    );
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        jsonResponse(false, 'User not found.');
    }

    jsonResponse(true, 'OK', ['user' => $user]);
}

// ── PUT ────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $body     = getJsonBody();
    $fullname = trim($body['fullname'] ?? '');
    $phone    = trim($body['phone']    ?? '');

    if ($fullname === '') {
        jsonResponse(false, 'Full name is required.');
    }
    if (strlen($fullname) > 120) {
        jsonResponse(false, 'Full name is too long (max 120 characters).');
    }
    if ($phone !== '' && !preg_match('/^[\+\d\s\-\(\)]{6,30}$/', $phone)) {
        jsonResponse(false, 'Please enter a valid phone number.');
    }

    $stmt = $db->prepare(
        'UPDATE users SET fullname = ?, phone = ? WHERE id = ?'
    );
    $stmt->execute([$fullname, $phone ?: null, $userId]);

    // Keep session in sync
    $_SESSION['fullname'] = $fullname;

    jsonResponse(true, 'Profile updated successfully.', [
        'user' => ['fullname' => $fullname, 'phone' => $phone]
    ]);
}

// ── Other methods ──────────────────────────────────────────
http_response_code(405);
jsonResponse(false, 'Method not allowed.');
