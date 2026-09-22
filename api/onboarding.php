<?php
// ─────────────────────────────────────────────
//  POST /api/onboarding.php
//  Body: { style, companion, environment[], budget }
//     OR { skipped: true }
//  Requires: active user session
//  Returns: { success, message }
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

// Must be logged in
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    jsonResponse(false, 'Not authenticated.');
}

$userId = (int) $_SESSION['user_id'];
$body   = getJsonBody();

// ── Skipped ───────────────────────────────────
if (!empty($body['skipped'])) {
    $db = getDB();
    $db->prepare('UPDATE users SET onboarded = 1 WHERE id = ?')->execute([$userId]);
    jsonResponse(true, 'Onboarding skipped.');
}

// ── Validate ──────────────────────────────────
$allowed_styles     = ['adventure','relaxation','culture','food','nightlife'];
$allowed_companions = ['solo','couple','family','friends'];
$allowed_envs       = ['beach','mountains','urban','countryside','heritage','remote'];
$allowed_budgets    = ['budget','midrange','premium','varies'];

$style       = $body['style']       ?? null;
$companion   = $body['companion']   ?? null;
$environment = $body['environment'] ?? [];
$budget      = $body['budget']      ?? null;

// Soft-validate (store what we get; ignore unknowns)
if ($style && !in_array($style, $allowed_styles, true))           $style = null;
if ($companion && !in_array($companion, $allowed_companions, true)) $companion = null;
if ($budget && !in_array($budget, $allowed_budgets, true))         $budget = null;
if (is_array($environment)) {
    $environment = array_values(array_filter($environment, fn($e) => in_array($e, $allowed_envs, true)));
    if (count($environment) > 2) $environment = array_slice($environment, 0, 2);
}

$prefs = [
    'style'       => $style,
    'companion'   => $companion,
    'environment' => $environment,
    'budget'      => $budget,
    'completed_at' => date('Y-m-d H:i:s'),
];

// ── Save ──────────────────────────────────────
$db = getDB();
$db->prepare(
    'UPDATE users SET preferences_json = ?, onboarded = 1 WHERE id = ?'
)->execute([json_encode($prefs, JSON_UNESCAPED_UNICODE), $userId]);

jsonResponse(true, 'Preferences saved.', ['preferences' => $prefs]);
