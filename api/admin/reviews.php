<?php
// /api/admin/reviews.php
//
//  GET           → all reviews with user info
//  DELETE ?id=<n> → delete a review

require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $db->query("
        SELECT
            r.id, r.user_id, r.place_name,
            r.rating, r.tip, r.updated_at,
            u.fullname AS user_fullname,
            u.email    AS user_email,
            u.status   AS user_status
        FROM reviews r
        JOIN users u ON u.id = r.user_id
        ORDER BY r.updated_at DESC
    ")->fetchAll();

    foreach ($rows as &$r) {
        $r['id']      = (int) $r['id'];
        $r['user_id'] = (int) $r['user_id'];
        $r['rating']  = (int) $r['rating'];
    }

    jsonResponse(true, 'OK', ['reviews' => $rows]);
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid review ID.');

    $stmt = $db->prepare('DELETE FROM reviews WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        jsonResponse(false, 'Review not found.');
    }
    jsonResponse(true, 'Review deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
