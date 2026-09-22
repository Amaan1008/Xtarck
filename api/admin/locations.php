<?php
// /api/admin/locations.php — Admin CRUD for locations
require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET all ──────────────────────────────────
if ($method === 'GET') {
    $locs = $db->query("
        SELECT l.*,
               GROUP_CONCAT(DISTINCT lc.category ORDER BY lc.category SEPARATOR ',') AS categories,
               COUNT(DISTINCT lp.id) AS place_count,
               COUNT(DISTINCT h.id)  AS hotel_count
        FROM locations l
        LEFT JOIN location_categories lc ON lc.location_id = l.id
        LEFT JOIN location_places      lp ON lp.location_id = l.id
        LEFT JOIN hotels               h  ON h.location_id  = l.id
        GROUP BY l.id, l.name, l.region, l.lat, l.lon, l.description,
                 l.distance_from_colombo, l.emoji, l.image_url, l.is_starting_point,
                 l.is_active, l.sort_order, l.created_at, l.updated_at
        ORDER BY l.sort_order, l.name
    ")->fetchAll();

    foreach ($locs as &$l) {
        $l['id']           = (int)$l['id'];
        $l['place_count']  = (int)$l['place_count'];
        $l['hotel_count']  = (int)$l['hotel_count'];
        $l['is_active']    = (bool)$l['is_active'];
        $l['is_starting_point'] = (bool)$l['is_starting_point'];
        $l['categories']   = $l['categories'] ? explode(',', $l['categories']) : [];
    }
    jsonResponse(true, 'OK', ['locations' => $locs]);
}

// ── POST create ──────────────────────────────
if ($method === 'POST') {
    $b = getJsonBody();
    $name   = trim($b['name'] ?? '');
    $region = trim($b['region'] ?? '');
    $lat    = (float)($b['lat'] ?? 0);
    $lon    = (float)($b['lon'] ?? 0);

    if ($name === '') jsonResponse(false, 'Name is required.');
    if ($region === '') jsonResponse(false, 'Region is required.');

    $stmt = $db->prepare("
        INSERT INTO locations (name, region, lat, lon, description, distance_from_colombo, emoji, image_url, is_starting_point, is_active, sort_order)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    ");
    $stmt->execute([
        $name, $region, $lat, $lon,
        trim($b['description'] ?? ''),
        (int)($b['distance_from_colombo'] ?? 0),
        trim($b['emoji'] ?? '📍'),
        trim($b['image_url'] ?? '') ?: null,
        (int)($b['is_starting_point'] ?? 0),
        1,
        (int)($b['sort_order'] ?? 99),
    ]);
    $newId = (int)$db->lastInsertId();

    // Insert categories
    if (!empty($b['categories']) && is_array($b['categories'])) {
        $cStmt = $db->prepare("INSERT IGNORE INTO location_categories (location_id, category) VALUES (?,?)");
        foreach ($b['categories'] as $cat) {
            $cStmt->execute([$newId, $cat]);
        }
    }

    jsonResponse(true, 'Location created.', ['id' => $newId]);
}

// ── PUT update ───────────────────────────────
if ($method === 'PUT') {
    $b  = getJsonBody();
    $id = (int)($b['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid ID.');

    $db->prepare("
        UPDATE locations SET
            name=?, region=?, lat=?, lon=?, description=?,
            distance_from_colombo=?, emoji=?, image_url=?, is_starting_point=?,
            is_active=?, sort_order=?
        WHERE id=?
    ")->execute([
        trim($b['name'] ?? ''),
        trim($b['region'] ?? ''),
        (float)($b['lat'] ?? 0),
        (float)($b['lon'] ?? 0),
        trim($b['description'] ?? ''),
        (int)($b['distance_from_colombo'] ?? 0),
        trim($b['emoji'] ?? '📍'),
        trim($b['image_url'] ?? '') ?: null,
        (int)($b['is_starting_point'] ?? 0),
        (int)($b['is_active'] ?? 1),
        (int)($b['sort_order'] ?? 99),
        $id,
    ]);

    // Refresh categories
    if (isset($b['categories']) && is_array($b['categories'])) {
        $db->prepare("DELETE FROM location_categories WHERE location_id=?")->execute([$id]);
        $cStmt = $db->prepare("INSERT IGNORE INTO location_categories (location_id, category) VALUES (?,?)");
        foreach ($b['categories'] as $cat) {
            $cStmt->execute([$id, $cat]);
        }
    }

    jsonResponse(true, 'Location updated.');
}

// ── DELETE ───────────────────────────────────
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) jsonResponse(false, 'Invalid ID.');
    $db->prepare("DELETE FROM locations WHERE id=?")->execute([$id]);
    jsonResponse(true, 'Location deleted.');
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
