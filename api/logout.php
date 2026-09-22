<?php
// ─────────────────────────────────────────────
//  POST /api/logout.php
//  Destroys the session and returns success.
// ─────────────────────────────────────────────

require_once __DIR__ . '/../config/session.php';

session_unset();
session_destroy();

jsonResponse(true, 'Logged out successfully.');
