<?php
// ─────────────────────────────────────────────
//  GET /api/check_auth.php
//  Returns the current user if logged in.
//  Used by xtrack.html on page load.
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if (!empty($_SESSION['user_id'])) {
    // Fetch fresh user data (including phone & created_at) from DB
    $db   = getDB();
    $stmt = $db->prepare(
        'SELECT id, fullname, email, phone, created_at FROM users WHERE id = ?'
    );
    $stmt->execute([(int) $_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        jsonResponse(false, 'Not authenticated.');
    }

    // Keep session fullname fresh
    $_SESSION['fullname'] = $user['fullname'];

    jsonResponse(true, 'Authenticated.', ['user' => $user]);
} else {
    http_response_code(401);
    jsonResponse(false, 'Not authenticated.');
}
