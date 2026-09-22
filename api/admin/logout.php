<?php
// POST /api/admin/logout.php
require_once __DIR__ . '/../../config/session.php';
unset($_SESSION['admin_id'], $_SESSION['admin_fullname'], $_SESSION['admin_email']);
if (empty($_SESSION)) session_destroy();
jsonResponse(true, 'Signed out.');
