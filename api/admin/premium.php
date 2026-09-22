<?php
// api/admin/premium.php
// GET → stats + paginated purchases list for admin panel

require_once __DIR__ . '/admin_session.php';
require_once __DIR__ . '/../../config/db.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    jsonResponse(false, 'Method not allowed.');
}

$db = getDB();

// ── Auto-create tables + seed plans if missing ─────────────────
try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS premium_plans (
            id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name          VARCHAR(80)  NOT NULL,
            slug          VARCHAR(40)  NOT NULL,
            price_lkr     INT UNSIGNED NOT NULL,
            duration_days SMALLINT     NOT NULL,
            badge         VARCHAR(30)  DEFAULT NULL,
            features      TEXT         DEFAULT NULL,
            is_active     TINYINT(1)   NOT NULL DEFAULT 1,
            sort_order    SMALLINT     NOT NULL DEFAULT 0,
            PRIMARY KEY (id),
            UNIQUE KEY uq_slug (slug)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $db->exec("
        CREATE TABLE IF NOT EXISTS premium_purchases (
            id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id      INT UNSIGNED NOT NULL,
            plan_id      INT UNSIGNED NOT NULL,
            plan_name    VARCHAR(80)  NOT NULL,
            amount_lkr   INT UNSIGNED NOT NULL,
            card_last4   CHAR(4)      DEFAULT NULL,
            card_brand   VARCHAR(20)  DEFAULT NULL,
            status       ENUM('active','expired','cancelled') NOT NULL DEFAULT 'active',
            purchased_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expires_at   DATETIME     DEFAULT NULL,
            PRIMARY KEY (id),
            KEY idx_user   (user_id),
            KEY idx_plan   (plan_id),
            KEY idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $planCount = (int)$db->query("SELECT COUNT(*) FROM premium_plans")->fetchColumn();
    if ($planCount === 0) {
        $db->exec("
            INSERT INTO premium_plans
                (name, slug, price_lkr, duration_days, badge, features, sort_order)
            VALUES
            ('Explorer',   'explorer',   990,  30, NULL,
             '[\"Unlimited trip saves\",\"AI-powered itinerary suggestions\",\"PDF export for any trip\",\"Detailed weather forecasts\",\"Priority email support\"]',
             1),
            ('Adventurer', 'adventurer', 2490, 90, 'Best Value',
             '[\"Everything in Explorer\",\"Advanced route optimisation\",\"Hotel price alerts\",\"Offline trip access\",\"Multiple trip comparison\",\"Early access to new features\"]',
             2),
            ('Elite',      'elite',      7990,  0, 'Lifetime',
             '[\"Everything in Adventurer\",\"Lifetime access — pay once\",\"Dedicated WhatsApp support\",\"Custom trip branding\",\"Beta feature access\",\"Exclusive member badge\"]',
             3)
        ");
    }
} catch (Exception $e) {}

// ── Summary stats ──────────────────────────────────────────────
$stats = ['total_purchases' => 0, 'unique_buyers' => 0, 'total_revenue' => 0, 'active_subscriptions' => 0];
try {
    $row = $db->query("
        SELECT
            COUNT(*)                                                          AS total_purchases,
            COUNT(DISTINCT user_id)                                          AS unique_buyers,
            COALESCE(SUM(amount_lkr), 0)                                     AS total_revenue,
            SUM(CASE WHEN status = 'active'
                      AND (expires_at IS NULL OR expires_at > NOW())
                 THEN 1 ELSE 0 END)                                          AS active_subscriptions
        FROM premium_purchases
    ")->fetch();
    $stats = [
        'total_purchases'      => (int)$row['total_purchases'],
        'unique_buyers'        => (int)$row['unique_buyers'],
        'total_revenue'        => (int)$row['total_revenue'],
        'active_subscriptions' => (int)$row['active_subscriptions'],
    ];
} catch (Exception $e) {}

// ── Per-plan breakdown ─────────────────────────────────────────
$byPlan = [];
try {
    $byPlan = $db->query("
        SELECT
            plan_name,
            COUNT(*)               AS purchases,
            SUM(amount_lkr)        AS revenue,
            COUNT(DISTINCT user_id) AS unique_users
        FROM premium_purchases
        GROUP BY plan_name
        ORDER BY revenue DESC
    ")->fetchAll();
} catch (Exception $e) {}

// ── Paginated purchases list ───────────────────────────────────
$page      = max(1, (int)($_GET['page'] ?? 1));
$limit     = 20;
$offset    = ($page - 1) * $limit;
$total     = 0;
$purchases = [];

try {
    $total = (int)$db->query("SELECT COUNT(*) FROM premium_purchases")->fetchColumn();

    $stmt = $db->prepare("
        SELECT
            pp.id, pp.plan_name, pp.amount_lkr, pp.card_last4, pp.card_brand,
            pp.status, pp.purchased_at, pp.expires_at,
            u.fullname, u.email
        FROM premium_purchases pp
        JOIN users u ON u.id = pp.user_id
        ORDER BY pp.purchased_at DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->execute([$limit, $offset]);
    $purchases = $stmt->fetchAll();

    foreach ($purchases as &$p) {
        $p['id']         = (int)$p['id'];
        $p['amount_lkr'] = (int)$p['amount_lkr'];
    }
    unset($p);
} catch (Exception $e) {}

jsonResponse(true, 'OK', [
    'stats'      => $stats,
    'by_plan'    => $byPlan,
    'purchases'  => $purchases,
    'pagination' => [
        'page'  => $page,
        'limit' => $limit,
        'total' => $total,
        'pages' => (int)ceil($total / $limit),
    ],
]);
