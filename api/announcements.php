<?php
// ─────────────────────────────────────────────
//  GET /api/announcements.php
//  Returns active announcements for the customer dashboard.
//  Does NOT require authentication — announcements are public.
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$db   = getDB();
$stmt = $db->query(
    "SELECT id, title, message, type, created_at
       FROM announcements
      WHERE is_active = 1
      ORDER BY created_at DESC
      LIMIT 5"
);
$rows = $stmt->fetchAll();

foreach ($rows as &$r) {
    $r['id'] = (int) $r['id'];
}

jsonResponse(true, 'OK', ['announcements' => $rows]);
