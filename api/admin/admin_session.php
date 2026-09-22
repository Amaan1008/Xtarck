<?php
// ─────────────────────────────────────────────
//  admin_session.php — shared admin guard
//  Include at top of every admin API file.
// ─────────────────────────────────────────────

require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../config/db.php';

function requireAdmin(): int {
    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        jsonResponse(false, 'Admin access required. Please log in.');
    }
    return (int) $_SESSION['admin_id'];
}
