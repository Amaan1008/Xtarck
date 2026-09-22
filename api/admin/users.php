<?php
// /api/admin/users.php
require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────
if ($method === 'GET') {
    $rows = $db->query("
        SELECT
            u.id, u.fullname, u.email, u.phone, u.status, u.created_at,
            COUNT(DISTINCT t.id)  AS trip_count,
            COUNT(DISTINCT r.id)  AS review_count
        FROM users u
        LEFT JOIN trips   t ON t.user_id = u.id
        LEFT JOIN reviews r ON r.user_id = u.id
        GROUP BY u.id, u.fullname, u.email, u.phone, u.status, u.created_at
        ORDER BY u.created_at DESC
    ")->fetchAll();

    foreach ($rows as &$u) {
        $u['id']           = (int) $u['id'];
        $u['trip_count']   = (int) $u['trip_count'];
        $u['review_count'] = (int) $u['review_count'];
    }
    jsonResponse(true, 'OK', ['users' => $rows]);
}

// ── POST (ban / unban) ────────────────────────
if ($method === 'POST') {
    $action = $_GET['action'] ?? '';
    $body   = getJsonBody();
    $id     = (int) ($body['id'] ?? 0);

    if ($id <= 0) jsonResponse(false, 'Invalid user ID.');

    if ($action === 'ban') {
        $db->prepare("UPDATE users SET status = 'banned' WHERE id = ?")->execute([$id]);
        jsonResponse(true, 'User banned. They can no longer log in.');
    }
    if ($action === 'unban') {
        $db->prepare("UPDATE users SET status = 'active' WHERE id = ?")->execute([$id]);
        jsonResponse(true, 'User unbanned. They can now log in again.');
    }

    jsonResponse(false, 'Unknown action.');
}

// ── DELETE ────────────────────────────────────
if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid user ID.');

    $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        jsonResponse(false, 'User not found.');
    }
    jsonResponse(true, 'User and all their data deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
