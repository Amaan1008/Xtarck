<?php
// /api/admin/trips.php
//
//  GET           → all trips with user info
//  DELETE ?id=<n> → delete a trip

require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $db->query("
        SELECT
            t.id, t.user_id, t.name, t.panel,
            t.state_json, t.selected_json, t.created_at,
            u.fullname AS user_fullname,
            u.email    AS user_email,
            u.status   AS user_status
        FROM trips t
        JOIN users u ON u.id = t.user_id
        ORDER BY t.created_at DESC
    ")->fetchAll();

    foreach ($rows as &$t) {
        $t['id']      = (int) $t['id'];
        $t['user_id'] = (int) $t['user_id'];

        // Parse selected places
        $sel = json_decode($t['selected_json'], true) ?? [];
        $t['place_count'] = count($sel);
        $t['places'] = array_map(function($p) {
            if (is_string($p)) return $p;
            return $p['name'] ?? ($p['displayName']['text'] ?? 'Place');
        }, $sel);

        // Parse budget from state_json
        $state = json_decode($t['state_json'], true) ?? [];
        $t['budget'] = $state['budget'] ?? null;
        $t['days']   = $state['days']   ?? null;
        $t['people'] = $state['travelers'] ?? $state['people'] ?? null;

        unset($t['state_json'], $t['selected_json']);
    }

    jsonResponse(true, 'OK', ['trips' => $rows]);
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid trip ID.');

    $stmt = $db->prepare('DELETE FROM trips WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        jsonResponse(false, 'Trip not found.');
    }
    jsonResponse(true, 'Trip deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
