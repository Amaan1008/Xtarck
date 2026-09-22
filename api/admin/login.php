<?php
// POST /api/admin/login.php
// Body: { email, password }

require_once __DIR__ . '/../../config/session.php';
require_once __DIR__ . '/../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$body     = getJsonBody();
$email    = trim($body['email']    ?? '');
$password =       $body['password'] ?? '';

if ($email === '') {
    jsonResponse(false, 'Email is required.');
}
if ($password === '') {
    jsonResponse(false, 'Password is required.');
}

$db   = getDB();
$stmt = $db->prepare('SELECT id, fullname, email, password_hash FROM admins WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    http_response_code(401);
    jsonResponse(false, 'Invalid admin credentials.');
}

$_SESSION['admin_id']       = (int) $admin['id'];
$_SESSION['admin_fullname'] = $admin['fullname'];
$_SESSION['admin_email']    = $admin['email'];

session_regenerate_id(true);

// Record last login
$db->prepare('UPDATE admins SET last_login = NOW() WHERE id = ?')->execute([$admin['id']]);

jsonResponse(true, 'Login successful.', [
    'admin' => [
        'id'       => (int) $admin['id'],
        'fullname' => $admin['fullname'],
        'email'    => $admin['email'],
    ]
]);
