<?php
// /api/admin/hotels.php — Admin CRUD for hotels
require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────
if ($method === 'GET') {
    $locId = (int)($_GET['location_id'] ?? 0);
    $where = $locId > 0 ? 'WHERE h.location_id = ' . $locId : '';

    $hotels = $db->query("
        SELECT h.id, h.location_id, l.name AS location_name,
               h.name, h.emoji, h.image_url, h.tier, h.stars, h.rating, h.rating_text,
               h.description, h.price_lkr, h.booking_url,
               h.is_active, h.sort_order, h.created_at,
               GROUP_CONCAT(ha.amenity ORDER BY ha.id SEPARATOR '||') AS amenities
        FROM hotels h
        JOIN locations l ON l.id = h.location_id
        LEFT JOIN hotel_amenities ha ON ha.hotel_id = h.id
        $where
        GROUP BY h.id, h.location_id, l.name, h.name, h.emoji, h.image_url, h.tier,
                 h.stars, h.rating, h.rating_text, h.description, h.price_lkr,
                 h.booking_url, h.is_active, h.sort_order, h.created_at
        ORDER BY l.sort_order, h.sort_order
    ")->fetchAll();

    foreach ($hotels as &$h) {
        $h['id']       = (int)$h['id'];
        $h['stars']    = (int)$h['stars'];
        $h['price_lkr']= $h['price_lkr'] ? (int)$h['price_lkr'] : null;
        $h['rating']   = $h['rating'] ? (float)$h['rating'] : null;
        $h['is_active']= (bool)$h['is_active'];
        $h['amenities']= $h['amenities'] ? explode('||', $h['amenities']) : [];
    }
    jsonResponse(true, 'OK', ['hotels' => $hotels]);
}

// ── POST create ──────────────────────────────
if ($method === 'POST') {
    $b = getJsonBody();
    $locId = (int)($b['location_id'] ?? 0);
    $name  = trim($b['name'] ?? '');
    if ($locId <= 0) jsonResponse(false, 'Location is required.');
    if ($name === '') jsonResponse(false, 'Name is required.');

    $stmt = $db->prepare("
        INSERT INTO hotels (location_id,name,emoji,image_url,tier,stars,rating,rating_text,description,price_lkr,booking_url,is_active,sort_order)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    ");
    $stmt->execute([
        $locId, $name,
        trim($b['emoji'] ?? '🏨'),
        trim($b['image_url'] ?? '') ?: null,
        $b['tier'] ?? 'comfortable',
        (int)($b['stars'] ?? 3),
        $b['rating'] !== '' ? (float)($b['rating'] ?? 0) : null,
        trim($b['rating_text'] ?? ''),
        trim($b['description'] ?? ''),
        $b['price_lkr'] !== '' ? (int)($b['price_lkr'] ?? 0) : null,
        trim($b['booking_url'] ?? ''),
        1,
        (int)($b['sort_order'] ?? 99),
    ]);
    $newId = (int)$db->lastInsertId();

    if (!empty($b['amenities']) && is_array($b['amenities'])) {
        $aStmt = $db->prepare("INSERT INTO hotel_amenities (hotel_id, amenity) VALUES (?,?)");
        foreach ($b['amenities'] as $a) {
            if (trim($a) !== '') $aStmt->execute([$newId, trim($a)]);
        }
    }
    jsonResponse(true, 'Hotel created.', ['id' => $newId]);
}

// ── PUT update ───────────────────────────────
if ($method === 'PUT') {
    $b  = getJsonBody();
    $id = (int)($b['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid ID.');

    $db->prepare("
        UPDATE hotels SET
            location_id=?,name=?,emoji=?,image_url=?,tier=?,stars=?,rating=?,
            rating_text=?,description=?,price_lkr=?,booking_url=?,
            is_active=?,sort_order=?
        WHERE id=?
    ")->execute([
        (int)($b['location_id'] ?? 0),
        trim($b['name'] ?? ''),
        trim($b['emoji'] ?? '🏨'),
        trim($b['image_url'] ?? '') ?: null,
        $b['tier'] ?? 'comfortable',
        (int)($b['stars'] ?? 3),
        $b['rating'] !== '' ? (float)($b['rating'] ?? 0) : null,
        trim($b['rating_text'] ?? ''),
        trim($b['description'] ?? ''),
        $b['price_lkr'] !== '' ? (int)($b['price_lkr'] ?? 0) : null,
        trim($b['booking_url'] ?? ''),
        (int)($b['is_active'] ?? 1),
        (int)($b['sort_order'] ?? 99),
        $id,
    ]);

    if (isset($b['amenities']) && is_array($b['amenities'])) {
        $db->prepare("DELETE FROM hotel_amenities WHERE hotel_id=?")->execute([$id]);
        $aStmt = $db->prepare("INSERT INTO hotel_amenities (hotel_id, amenity) VALUES (?,?)");
        foreach ($b['amenities'] as $a) {
            if (trim($a) !== '') $aStmt->execute([$id, trim($a)]);
        }
    }
    jsonResponse(true, 'Hotel updated.');
}

// ── DELETE ───────────────────────────────────
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid ID.');
    $db->prepare("DELETE FROM hotels WHERE id=?")->execute([$id]);
    jsonResponse(true, 'Hotel deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
