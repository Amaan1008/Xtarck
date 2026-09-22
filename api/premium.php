<?php
// api/premium.php
// GET  → returns plans + user's active purchase (if any)
// POST → processes a new purchase

require_once __DIR__ . '/../config/session.php';
require_once __DIR__ . '/../config/db.php';

// Session is already started by session.php — no extra call needed
$userId = $_SESSION['user_id'] ?? null;
if (!$userId) {
    http_response_code(401);
    jsonResponse(false, 'Not authenticated.');
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
            duration_days SMALLINT     NOT NULL COMMENT '0 = lifetime',
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

    // Seed 3 plans if empty
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
} catch (Exception $e) {
    // Non-fatal: tables may already exist
}

// ── GET: return plans + subscription status ────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $plans = [];
    try {
        $plans = $db->query("
            SELECT id, name, slug, price_lkr, duration_days, badge, features
            FROM premium_plans
            WHERE is_active = 1
            ORDER BY sort_order
        ")->fetchAll();
        foreach ($plans as &$p) {
            $p['features']      = json_decode($p['features'] ?? '[]', true) ?: [];
            $p['price_lkr']     = (int)$p['price_lkr'];
            $p['duration_days'] = (int)$p['duration_days'];
        }
        unset($p);
    } catch (Exception $e) {}

    $isPremium = false;
    $purchase  = null;
    try {
        $stmt = $db->prepare("
            SELECT pp.id, pp.plan_name, pp.amount_lkr, pp.card_last4,
                   pp.card_brand, pp.status, pp.purchased_at, pp.expires_at,
                   pl.slug, pl.features
            FROM premium_purchases pp
            JOIN premium_plans pl ON pl.id = pp.plan_id
            WHERE pp.user_id = ?
              AND pp.status = 'active'
              AND (pp.expires_at IS NULL OR pp.expires_at > NOW())
            ORDER BY pp.purchased_at DESC
            LIMIT 1
        ");
        $stmt->execute([$userId]);
        $active = $stmt->fetch();
        if ($active) {
            $isPremium = true;
            $purchase  = [
                'id'          => (int)$active['id'],
                'plan_name'   => $active['plan_name'],
                'plan_slug'   => $active['slug'],
                'amount_lkr'  => (int)$active['amount_lkr'],
                'card_last4'  => $active['card_last4'],
                'card_brand'  => $active['card_brand'],
                'status'      => $active['status'],
                'purchased_at'=> $active['purchased_at'],
                'expires_at'  => $active['expires_at'],
                'features'    => json_decode($active['features'] ?? '[]', true) ?: [],
            ];
        }
    } catch (Exception $e) {}

    jsonResponse(true, 'OK', [
        'plans'      => $plans,
        'is_premium' => $isPremium,
        'purchase'   => $purchase,
    ]);
}

// ── POST: purchase a plan ──────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?: [];

    $planId     = (int)($body['plan_id']    ?? 0);
    $cardNumber = trim($body['card_number'] ?? '');
    $cardName   = trim($body['card_name']   ?? '');
    $cardExpiry = trim($body['card_expiry'] ?? '');
    $cardCvv    = trim($body['card_cvv']    ?? '');

    if (!$planId || !$cardNumber || !$cardName || !$cardExpiry || !$cardCvv)
        jsonResponse(false, 'All payment fields are required.');

    $cardDigits = preg_replace('/\D/', '', $cardNumber);
    if (strlen($cardDigits) < 13 || strlen($cardDigits) > 19)
        jsonResponse(false, 'Invalid card number.');
    if (!preg_match('/^\d{2}\/\d{2}$/', $cardExpiry))
        jsonResponse(false, 'Invalid expiry format. Use MM/YY.');
    if (strlen($cardCvv) < 3 || strlen($cardCvv) > 4)
        jsonResponse(false, 'Invalid CVV.');

    // Detect card brand
    $cardBrand = match(true) {
        str_starts_with($cardDigits, '4')                                      => 'Visa',
        in_array((int)substr($cardDigits, 0, 2), range(51, 55))               => 'Mastercard',
        str_starts_with($cardDigits, '34') || str_starts_with($cardDigits, '37') => 'Amex',
        default                                                                 => 'Card',
    };
    $last4 = substr($cardDigits, -4);

    // Load plan
    $stmt = $db->prepare("SELECT * FROM premium_plans WHERE id = ? AND is_active = 1");
    $stmt->execute([$planId]);
    $plan = $stmt->fetch();
    if (!$plan) jsonResponse(false, 'Plan not found.');

    // Check existing active subscription
    $check = $db->prepare("
        SELECT id FROM premium_purchases
        WHERE user_id = ? AND status = 'active'
          AND (expires_at IS NULL OR expires_at > NOW())
        LIMIT 1
    ");
    $check->execute([$userId]);
    if ($check->fetch())
        jsonResponse(false, 'You already have an active premium subscription.');

    // Calculate expiry date
    $expiresAt = null;
    if ((int)$plan['duration_days'] > 0) {
        $exp = new DateTime();
        $exp->modify('+' . (int)$plan['duration_days'] . ' days');
        $expiresAt = $exp->format('Y-m-d H:i:s');
    }

    // Save purchase to database
    $ins = $db->prepare("
        INSERT INTO premium_purchases
            (user_id, plan_id, plan_name, amount_lkr, card_last4, card_brand, status, expires_at)
        VALUES (?, ?, ?, ?, ?, ?, 'active', ?)
    ");
    $ins->execute([
        $userId,
        $plan['id'],
        $plan['name'],
        (int)$plan['price_lkr'],
        $last4,
        $cardBrand,
        $expiresAt,
    ]);
    $purchaseId = (int)$db->lastInsertId();

    jsonResponse(true, 'Payment successful! Welcome to XTrack Premium.', [
        'purchase_id' => $purchaseId,
        'plan_name'   => $plan['name'],
        'amount_lkr'  => (int)$plan['price_lkr'],
        'card_brand'  => $cardBrand,
        'card_last4'  => $last4,
        'expires_at'  => $expiresAt,
    ]);
}

http_response_code(405);
jsonResponse(false, 'Method not allowed.');
