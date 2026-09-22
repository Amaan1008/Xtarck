<?php
// /api/admin/announcements.php
//
//  GET              → list all announcements
//  POST             → create  { title, message, type }
//  POST ?action=toggle { id } → toggle active/inactive
//  DELETE ?id=<n>   → delete

require_once __DIR__ . '/admin_session.php';
$adminId = requireAdmin();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────
if ($method === 'GET') {
    $rows = $db->query("
        SELECT a.id, a.title, a.message, a.type, a.is_active, a.created_at,
               adm.fullname AS created_by
        FROM announcements a
        JOIN admins adm ON adm.id = a.admin_id
        ORDER BY a.created_at DESC
    ")->fetchAll();

    foreach ($rows as &$r) {
        $r['id']        = (int) $r['id'];
        $r['is_active'] = (int) $r['is_active'];
    }
    jsonResponse(true, 'OK', ['announcements' => $rows]);
}

// ── POST ─────────────────────────────────────
if ($method === 'POST') {
    $action = $_GET['action'] ?? '';
    $body   = getJsonBody();

    // Toggle active/inactive
    if ($action === 'toggle') {
        $id = (int) ($body['id'] ?? 0);
        if ($id <= 0) jsonResponse(false, 'Invalid ID.');
        $db->prepare("UPDATE announcements SET is_active = 1 - is_active WHERE id = ?")->execute([$id]);
        jsonResponse(true, 'Status toggled.');
    }

    // Create new announcement
    $title   = trim($body['title']   ?? '');
    $message = trim($body['message'] ?? '');
    $type    = in_array($body['type'] ?? '', ['info','warning','success']) ? $body['type'] : 'info';

    if ($title === '')   jsonResponse(false, 'Title is required.');
    if ($message === '') jsonResponse(false, 'Message is required.');

    $stmt = $db->prepare("INSERT INTO announcements (admin_id, title, message, type) VALUES (?,?,?,?)");
    $stmt->execute([$adminId, $title, $message, $type]);

    jsonResponse(true, 'Announcement created. It is now visible on the customer dashboard.', [
        'id' => (int) $db->lastInsertId()
    ]);
}

// ── DELETE ────────────────────────────────────
if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid ID.');

    $stmt = $db->prepare('DELETE FROM announcements WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        jsonResponse(false, 'Announcement not found.');
    }
    jsonResponse(true, 'Announcement deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
