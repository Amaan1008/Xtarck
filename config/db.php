<?php
// ─────────────────────────────────────────────
//  Xtrack — Database Configuration
//  Edit these for your server (XAMPP: host=localhost, pass='')
// ─────────────────────────────────────────────

define('DB_HOST',    'localhost');
define('DB_NAME',    'xtrack_db');
define('DB_USER',    'root');
define('DB_PASS',    '');
define('DB_CHARSET', 'utf8mb4');

// ─────────────────────────────────────────────
//  Unsplash API — free key from unsplash.com/developers
//  50 requests/hour on the free tier.
//  Leave empty to disable image fetching.
// ─────────────────────────────────────────────
define('UNSPLASH_ACCESS_KEY', 'TxrtjREHLBWiusJwqJFTltaTbAEbYBs0c06TekDKu9w');

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        // Detect socket path (Linux dev server vs XAMPP/Windows)
        $socket = '';
        foreach (['/var/run/mysqld/mysqld.sock', '/tmp/mysql.sock'] as $s) {
            if (file_exists($s)) { $socket = $s; break; }
        }

        if ($socket) {
            $dsn = sprintf('mysql:unix_socket=%s;dbname=%s;charset=%s', $socket, DB_NAME, DB_CHARSET);
        } else {
            $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
        }

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}
