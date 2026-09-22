<?php
// GET /api/hotels.php                  → all hotels grouped by location name
// GET /api/hotels.php?location=Ella    → hotels for one location
// GET /api/hotels.php?id=5             → single hotel with amenities

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$db = getDB();

// ── Single hotel ────────────────────────────────
if (!empty($_GET['id'])) {
    $id = (int)$_GET['id'];
    $h  = $db->prepare("
        SELECT h.*, l.name AS location_name
        FROM hotels h JOIN locations l ON l.id = h.location_id
        WHERE h.id = ? AND h.is_active = 1
    ");
    $h->execute([$id]);
    $hotel = $h->fetch();
    if (!$hotel) { http_response_code(404); jsonResponse(false, 'Not found.'); }

    $hotel['rating']   = $hotel['rating'] ? (float)$hotel['rating'] : null;
    $hotel['price_lkr']= $hotel['price_lkr'] ? (int)$hotel['price_lkr'] : null;

    $ams = $db->prepare("SELECT amenity FROM hotel_amenities WHERE hotel_id = ? ORDER BY id");
    $ams->execute([$id]);
    $hotel['amenities'] = array_column($ams->fetchAll(), 'amenity');

    jsonResponse(true, 'OK', ['hotel' => $hotel]);
}

// ── By location name ────────────────────────────
$locFilter = trim($_GET['location'] ?? '');

$whereClause = 'h.is_active = 1';
$params      = [];

if ($locFilter !== '') {
    $whereClause .= ' AND l.name = ?';
    $params[] = $locFilter;
}

$hotels = $db->prepare("
    SELECT h.id, h.location_id, l.name AS location_name,
           h.name, h.emoji, h.image_url, h.tier, h.stars, h.rating, h.rating_text,
           h.description, h.price_lkr, h.booking_url, h.sort_order
    FROM hotels h
    JOIN locations l ON l.id = h.location_id
    WHERE $whereClause
    ORDER BY l.sort_order, h.sort_order
");
$hotels->execute($params);
$rows = $hotels->fetchAll();

if (empty($rows)) {
    jsonResponse(true, 'OK', ['hotels' => (object)[]]);
}

// Get amenities for all fetched hotels
$hIds = array_column($rows, 'id');
$inH  = implode(',', array_map('intval', $hIds));
$ams  = $db->query("
    SELECT hotel_id, amenity FROM hotel_amenities
    WHERE hotel_id IN ($inH) ORDER BY hotel_id, id
")->fetchAll();
$amMap = [];
foreach ($ams as $a) {
    $amMap[(int)$a['hotel_id']][] = $a['amenity'];
}

// Group by location name, deduplicating by hotel name
$grouped = [];
foreach ($rows as $h) {
    $loc  = $h['location_name'];
    $name = $h['name'];
    // Skip duplicates — keep the first occurrence per (location, name)
    if (isset($grouped[$loc][$name])) continue;
    $grouped[$loc][$name] = [
        'id'          => (int)$h['id'],
        'name'        => $h['name'],
        'emoji'       => $h['emoji'],
        'image_url'   => $h['image_url'] ?: null,
        'tier'        => $h['tier'],
        'stars'       => (int)$h['stars'],
        'rating'      => $h['rating'] ? (float)$h['rating'] : null,
        'ratingText'  => $h['rating_text'],
        'desc'        => $h['description'],
        'price'       => $h['price_lkr'] ? (int)$h['price_lkr'] : null,
        'bookingUrl'  => $h['booking_url'],
        'amenities'   => $amMap[(int)$h['id']] ?? [],
    ];
}
// Re-index to plain arrays
foreach ($grouped as $loc => $byName) {
    $grouped[$loc] = array_values($byName);
}

jsonResponse(true, 'OK', ['hotels' => $grouped]);
