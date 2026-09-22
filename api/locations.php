<?php
// GET /api/locations.php
// Returns all active locations with their places, categories, and geo data.
// Used by xtrack.html to replace hardcoded JS constants.

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$db = getDB();

// ── All active locations ────────────────────────
$locs = $db->query("
    SELECT id, name, region, lat, lon, description,
           distance_from_colombo, emoji, image_url, is_starting_point, sort_order
    FROM locations
    WHERE is_active = 1
    ORDER BY sort_order, name
")->fetchAll();

if (empty($locs)) {
    jsonResponse(true, 'OK', ['locations' => []]);
}

// Index by id for fast lookup
$locById = [];
foreach ($locs as $l) {
    $locById[(int)$l['id']] = $l;
}
$ids = array_keys($locById);
$in  = implode(',', $ids);

// ── Categories ──────────────────────────────────
$cats = $db->query("
    SELECT location_id, category FROM location_categories
    WHERE location_id IN ($in)
")->fetchAll();
$catMap = [];
foreach ($cats as $c) {
    $catMap[(int)$c['location_id']][] = $c['category'];
}

// ── Nearby places ───────────────────────────────
$places = $db->query("
    SELECT id, location_id, name, distance_label, description,
           entry_cost_lkr, duration_hrs, place_lat, place_lon, sort_order
    FROM location_places
    WHERE location_id IN ($in) AND is_active = 1
    ORDER BY location_id, sort_order
")->fetchAll();
$placeMap = [];
foreach ($places as $p) {
    $lid  = (int)$p['location_id'];
    $name = $p['name'];
    // Skip duplicates — keep the first occurrence per (location, name)
    if (isset($placeMap[$lid]) && array_key_exists($name, array_column($placeMap[$lid], null, 'n'))) {
        continue;
    }
    $placeMap[$lid][$name] = [
        'id'          => (int)$p['id'],
        'n'           => $p['name'],
        'd'           => $p['distance_label'],
        'desc'        => $p['description'],
        'cost'        => (int)$p['entry_cost_lkr'],
        'hrs'         => (int)$p['duration_hrs'],
        'lat'         => $p['place_lat'] ? (float)$p['place_lat'] : null,
        'lon'         => $p['place_lon'] ? (float)$p['place_lon'] : null,
    ];
}
// Re-index to plain arrays
foreach ($placeMap as $lid => $byName) {
    $placeMap[$lid] = array_values($byName);
}

// ── Assemble response ───────────────────────────
$result = [];
foreach ($locs as $l) {
    $id = (int)$l['id'];
    $result[] = [
        'id'                   => $id,
        'name'                 => $l['name'],
        'region'               => $l['region'],
        'lat'                  => (float)$l['lat'],
        'lon'                  => (float)$l['lon'],
        'description'          => $l['description'],
        'distance_from_colombo'=> (int)$l['distance_from_colombo'],
        'emoji'                => $l['emoji'],
        'image_url'            => $l['image_url'] ?: null,
        'is_starting_point'    => (bool)$l['is_starting_point'],
        'categories'           => $catMap[$id] ?? [],
        'places'               => $placeMap[$id] ?? [],
    ];
}

jsonResponse(true, 'OK', ['locations' => $result]);
