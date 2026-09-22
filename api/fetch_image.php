<?php
// api/fetch_image.php
// ──────────────────────────────────────────────────────────────
// Fetches a photo from Unsplash for a location or hotel and
// stores the URL in the database. Called from the admin dashboard.
//
// POST /api/fetch_image.php
// Body (JSON): { "type": "location"|"hotel", "id": 5, "name": "Ella" }
//
// Requires UNSPLASH_ACCESS_KEY to be set in config/db.php or as
// an environment variable. Get a free key at unsplash.com/developers
// (free tier: 50 requests/hour).
// ──────────────────────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

// Only admins may refresh images
session_start_if_needed();
if (empty($_SESSION['admin_id'])) {
    http_response_code(403);
    jsonResponse(false, 'Admin access required.');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

// ── Config ────────────────────────────────────────────────────
// Set your Unsplash Access Key here or in an environment variable.
// Get a free key at: https://unsplash.com/developers
$UNSPLASH_KEY = defined('UNSPLASH_ACCESS_KEY')
    ? UNSPLASH_ACCESS_KEY
    : (getenv('UNSPLASH_ACCESS_KEY') ?: '');

if ($UNSPLASH_KEY === '') {
    jsonResponse(false, 'Unsplash API key not configured. Set UNSPLASH_ACCESS_KEY in config/db.php.');
}

// ── Input ─────────────────────────────────────────────────────
$b    = getJsonBody();
$type = trim($b['type'] ?? '');   // "location" or "hotel"
$id   = (int)($b['id'] ?? 0);
$name = trim($b['name'] ?? '');

if (!in_array($type, ['location', 'hotel'], true)) {
    jsonResponse(false, 'type must be "location" or "hotel".');
}
if ($id <= 0)   jsonResponse(false, 'Invalid id.');
if ($name === '') jsonResponse(false, 'name is required.');

// ── Build Unsplash search query ───────────────────────────────
// Append "Sri Lanka" for locations to get geographically relevant results.
$query = $type === 'location'
    ? urlencode($name . ' Sri Lanka travel')
    : urlencode($name . ' hotel Sri Lanka');

$url = "https://api.unsplash.com/search/photos"
    . "?query={$query}"
    . "&per_page=1"
    . "&orientation=landscape"
    . "&content_filter=high";

// ── Call Unsplash ─────────────────────────────────────────────
$ctx = stream_context_create([
    'http' => [
        'method'  => 'GET',
        'header'  => "Authorization: Client-ID {$UNSPLASH_KEY}\r\n"
                   . "Accept-Version: v1\r\n",
        'timeout' => 8,
    ],
]);

$raw = @file_get_contents($url, false, $ctx);

if ($raw === false) {
    jsonResponse(false, 'Failed to reach Unsplash API. Check your server\'s outbound internet access.');
}

$data = json_decode($raw, true);

if (empty($data['results'])) {
    jsonResponse(false, 'No photos found for "' . htmlspecialchars($name) . '".');
}

// Use the regular (full-width) URL — good quality, not oversized
$photo     = $data['results'][0];
$imageUrl  = $photo['urls']['regular'] ?? $photo['urls']['full'] ?? '';
$photoId   = $photo['id'] ?? '';
$credit    = $photo['user']['name'] ?? 'Unsplash';
$creditUrl = $photo['user']['links']['html'] ?? 'https://unsplash.com';

if ($imageUrl === '') {
    jsonResponse(false, 'Unsplash returned a result but the URL was empty.');
}

// ── Append UTM params (required by Unsplash guidelines) ───────
$imageUrl .= (str_contains($imageUrl, '?') ? '&' : '?')
           . 'utm_source=xtrack&utm_medium=referral';

// ── Save to database ──────────────────────────────────────────
$db    = getDB();
$table = $type === 'location' ? 'locations' : 'hotels';

$stmt = $db->prepare("UPDATE {$table} SET image_url = ? WHERE id = ?");
$stmt->execute([$imageUrl, $id]);

if ($stmt->rowCount() === 0) {
    // Row exists but image_url is already the same value — still success
    // OR id didn't exist — check which:
    $exists = $db->prepare("SELECT id FROM {$table} WHERE id = ?");
    $exists->execute([$id]);
    if (!$exists->fetch()) {
        jsonResponse(false, ucfirst($type) . ' not found.');
    }
}

jsonResponse(true, 'Image updated.', [
    'image_url'  => $imageUrl,
    'photo_id'   => $photoId,
    'credit'     => $credit,
    'credit_url' => $creditUrl,
]);
