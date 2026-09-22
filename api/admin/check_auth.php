<?php
// GET /api/admin/check_auth.php
require_once __DIR__ . '/admin_session.php';
$adminId = requireAdmin();
jsonResponse(true, 'OK', [
    'admin' => [
        'id'       => $adminId,
        'fullname' => $_SESSION['admin_fullname'],
        'email'    => $_SESSION['admin_email'],
    ]
]);
