<?php
// GET /api/admin/analytics.php — Date-filtered analytics for admin dashboard
require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db = getDB();

// ── Parse period ─────────────────────────────────────────────
$period = $_GET['period'] ?? 'month';
$from   = $_GET['from']   ?? null;
$to     = $_GET['to']     ?? null;

switch ($period) {
    case 'today':
        $startDate = date('Y-m-d');
        $endDate   = date('Y-m-d');
        $labelFmt  = '%H:00';
        break;
    case 'week':
        $startDate = date('Y-m-d', strtotime('-6 days'));
        $endDate   = date('Y-m-d');
        $labelFmt  = '%d %b';
        break;
    case 'year':
        $startDate = date('Y-01-01');
        $endDate   = date('Y-12-31');
        $labelFmt  = '%b';
        break;
    case 'custom':
        $startDate = $from ?? date('Y-m-d', strtotime('-30 days'));
        $endDate   = $to   ?? date('Y-m-d');
        $labelFmt  = '%d %b';
        break;
    default: // month
        $startDate = date('Y-m-01');
        $endDate   = date('Y-m-t');
        $labelFmt  = '%d %b';
}

$start = $startDate . ' 00:00:00';
$end   = $endDate   . ' 23:59:59';

// ── User growth ───────────────────────────────────────────────
$stmt = $db->prepare("
    SELECT DATE_FORMAT(created_at, ?) AS label, COUNT(*) AS cnt
    FROM users
    WHERE created_at BETWEEN ? AND ?
    GROUP BY label
    ORDER BY MIN(created_at) ASC
");
$stmt->execute([$labelFmt, $start, $end]);
$userGrowth = $stmt->fetchAll();

// ── Trip activity ─────────────────────────────────────────────
$stmt = $db->prepare("
    SELECT DATE_FORMAT(created_at, ?) AS label, COUNT(*) AS cnt,
           SUM(panel='A') AS budget_cnt, SUM(panel='B') AS dest_cnt
    FROM trips
    WHERE created_at BETWEEN ? AND ?
    GROUP BY label
    ORDER BY MIN(created_at) ASC
");
$stmt->execute([$labelFmt, $start, $end]);
$tripActivity = $stmt->fetchAll();

// ── Review activity ───────────────────────────────────────────
$stmt = $db->prepare("
    SELECT DATE_FORMAT(updated_at, ?) AS label, COUNT(*) AS cnt,
           ROUND(AVG(rating), 1) AS avg_rating
    FROM reviews
    WHERE updated_at BETWEEN ? AND ?
    GROUP BY label
    ORDER BY MIN(updated_at) ASC
");
$stmt->execute([$labelFmt, $start, $end]);
$reviewActivity = $stmt->fetchAll();

// ── Top crowded places (by review count in period) ────────────
$stmt = $db->prepare("
    SELECT place_name,
           COUNT(*)            AS review_count,
           ROUND(AVG(rating),1) AS avg_rating
    FROM reviews
    WHERE updated_at BETWEEN ? AND ?
    GROUP BY place_name
    ORDER BY review_count DESC, avg_rating DESC
    LIMIT 12
");
$stmt->execute([$start, $end]);
$topPlaces = $stmt->fetchAll();

// ── Premium sales (handle missing table gracefully) ───────────
$salesByPeriod  = [];
$salesByPlan    = [];
$totalRevenue   = 0;
$totalSales     = 0;
$activeSubs     = 0;

try {
    // sales over time
    $stmt = $db->prepare("
        SELECT DATE_FORMAT(purchased_at, ?) AS label,
               COUNT(*)          AS cnt,
               SUM(amount_lkr)   AS revenue
        FROM premium_purchases
        WHERE purchased_at BETWEEN ? AND ?
        GROUP BY label
        ORDER BY MIN(purchased_at) ASC
    ");
    $stmt->execute([$labelFmt, $start, $end]);
    $salesByPeriod = $stmt->fetchAll();

    // plan breakdown
    $stmt = $db->prepare("
        SELECT pp.plan_name, COUNT(*) AS cnt, SUM(pp.amount_lkr) AS revenue
        FROM premium_purchases pp
        WHERE pp.purchased_at BETWEEN ? AND ?
        GROUP BY pp.plan_name
        ORDER BY cnt DESC
    ");
    $stmt->execute([$start, $end]);
    $salesByPlan = $stmt->fetchAll();

    // totals
    $stmt = $db->prepare("
        SELECT COUNT(*) AS total_sales,
               COALESCE(SUM(amount_lkr), 0) AS total_revenue,
               SUM(status='active') AS active_subs
        FROM premium_purchases
        WHERE purchased_at BETWEEN ? AND ?
    ");
    $stmt->execute([$start, $end]);
    $tr = $stmt->fetch();
    $totalRevenue = (int)$tr['total_revenue'];
    $totalSales   = (int)$tr['total_sales'];
    $activeSubs   = (int)$tr['active_subs'];
} catch (Exception $e) {
    // premium tables may not exist yet
}

// ── Period summary totals ─────────────────────────────────────
$stmt = $db->prepare("SELECT COUNT(*) AS cnt FROM users WHERE created_at BETWEEN ? AND ?");
$stmt->execute([$start, $end]);
$newUsers = (int)$stmt->fetch()['cnt'];

$stmt = $db->prepare("SELECT COUNT(*) AS cnt FROM trips WHERE created_at BETWEEN ? AND ?");
$stmt->execute([$start, $end]);
$newTrips = (int)$stmt->fetch()['cnt'];

$stmt = $db->prepare("SELECT COUNT(*) AS cnt FROM reviews WHERE updated_at BETWEEN ? AND ?");
$stmt->execute([$start, $end]);
$newReviews = (int)$stmt->fetch()['cnt'];

// ── Ratings distribution ──────────────────────────────────────
$stmt = $db->prepare("
    SELECT rating, COUNT(*) AS cnt
    FROM reviews
    WHERE updated_at BETWEEN ? AND ?
    GROUP BY rating
    ORDER BY rating ASC
");
$stmt->execute([$start, $end]);
$ratingsDist = $stmt->fetchAll();

jsonResponse(true, 'OK', [
    'user_growth'     => $userGrowth,
    'trip_activity'   => $tripActivity,
    'review_activity' => $reviewActivity,
    'top_places'      => $topPlaces,
    'sales'           => $salesByPeriod,
    'sales_by_plan'   => $salesByPlan,
    'ratings_dist'    => $ratingsDist,
    'summary'         => [
        'new_users'     => $newUsers,
        'new_trips'     => $newTrips,
        'new_reviews'   => $newReviews,
        'total_revenue' => $totalRevenue,
        'total_sales'   => $totalSales,
        'active_subs'   => $activeSubs,
    ],
    'period' => [
        'name'  => $period,
        'start' => $startDate,
        'end'   => $endDate,
    ],
]);
