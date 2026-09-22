<?php
// ─────────────────────────────────────────────
//  /api/trips.php  — Trips CRUD
//
//  GET    → list all trips for the logged-in user
//  POST   → save a new trip
//  DELETE → delete a trip  (?id=<trip_id>)
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

$userId = requireAuth();
$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET — list trips ──────────────────────────
if ($method === 'GET') {
    $stmt = $db->prepare(
        'SELECT id, name, panel, state_json, selected_json, created_at
           FROM trips
          WHERE user_id = ?
          ORDER BY created_at DESC
          LIMIT 10'
    );
    $stmt->execute([$userId]);
    $trips = $stmt->fetchAll();

    // Parse JSON columns back to arrays for the client
    foreach ($trips as &$t) {
        $t['state']    = json_decode($t['state_json'],    true);
        $t['selected'] = json_decode($t['selected_json'], true);
        $t['id']       = (int) $t['id'];
        unset($t['state_json'], $t['selected_json']);
    }

    jsonResponse(true, 'OK', ['trips' => $trips]);
}

// ── POST — save trip ──────────────────────────
if ($method === 'POST') {
    $body  = getJsonBody();
    $name  = trim($body['name']  ?? '');
    $panel = trim($body['panel'] ?? 'A');
    $state = $body['state']    ?? [];
    $sel   = $body['selected'] ?? [];

    if ($name === '') {
        jsonResponse(false, 'Trip name is required.');
    }

    $stmt = $db->prepare(
        'INSERT INTO trips (user_id, name, panel, state_json, selected_json)
              VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $userId,
        $name,
        $panel,
        json_encode($state),
        json_encode($sel),
    ]);
    $newId = (int) $db->lastInsertId();

    jsonResponse(true, 'Trip saved.', ['id' => $newId]);
}

// ── DELETE — remove trip ──────────────────────
if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        jsonResponse(false, 'Invalid trip ID.');
    }

    // Only allow the owner to delete their own trips
    $stmt = $db->prepare('DELETE FROM trips WHERE id = ? AND user_id = ?');
    $stmt->execute([$id, $userId]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        jsonResponse(false, 'Trip not found or access denied.');
    }

    jsonResponse(true, 'Trip deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
