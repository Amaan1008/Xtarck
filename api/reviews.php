<?php
// ─────────────────────────────────────────────
//  /api/reviews.php  — Reviews CRUD
//
//  GET  → all reviews for the logged-in user (keyed by place name)
//  POST → upsert a review  { place_name, rating, tip }
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

$userId = requireAuth();
$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET — fetch all reviews ───────────────────
if ($method === 'GET') {
    $stmt = $db->prepare(
        'SELECT place_name, rating, tip, updated_at AS date
           FROM reviews
          WHERE user_id = ?'
    );
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll();

    // Convert to { placeName: { rating, tip, date } } map
    $map = [];
    foreach ($rows as $r) {
        $map[$r['place_name']] = [
            'rating' => (int) $r['rating'],
            'tip'    => $r['tip'],
            'date'   => date('j M Y', strtotime($r['date'])),
        ];
    }

    jsonResponse(true, 'OK', ['reviews' => $map]);
}

// ── POST — save / update review ───────────────
if ($method === 'POST') {
    $body       = getJsonBody();
    $placeName  = trim($body['place_name'] ?? '');
    $rating     = (int) ($body['rating']   ?? 0);
    $tip        = trim($body['tip']        ?? '');

    if ($placeName === '') {
        jsonResponse(false, 'Place name is required.');
    }
    if ($rating < 1 || $rating > 5) {
        jsonResponse(false, 'Rating must be between 1 and 5.');
    }

    // INSERT or UPDATE (upsert via ON DUPLICATE KEY)
    $stmt = $db->prepare(
        'INSERT INTO reviews (user_id, place_name, rating, tip)
              VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
              rating     = VALUES(rating),
              tip        = VALUES(tip),
              updated_at = CURRENT_TIMESTAMP'
    );
    $stmt->execute([$userId, $placeName, $rating, $tip]);

    jsonResponse(true, 'Review saved.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
