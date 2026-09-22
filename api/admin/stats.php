<?php
// GET /api/admin/stats.php — platform-wide statistics
require_once __DIR__ . '/admin_session.php';
requireAdmin();

$db = getDB();

$row = $db->query("
    SELECT
        (SELECT COUNT(*) FROM users)                                     AS total_users,
        (SELECT COUNT(*) FROM users WHERE status = 'active')            AS active_users,
        (SELECT COUNT(*) FROM users WHERE status = 'banned')            AS banned_users,
        (SELECT COUNT(*) FROM trips)                                     AS total_trips,
        (SELECT COUNT(*) FROM trips WHERE panel = 'A')                  AS budget_trips,
        (SELECT COUNT(*) FROM trips WHERE panel = 'B')                  AS dest_trips,
        (SELECT COUNT(*) FROM reviews)                                   AS total_reviews,
        (SELECT ROUND(AVG(rating),2) FROM reviews)                      AS avg_rating,
        (SELECT COUNT(*) FROM reviews WHERE rating = 5)                 AS five_star,
        (SELECT COUNT(DISTINCT user_id) FROM trips)                     AS users_with_trips,
        (SELECT COUNT(*) FROM announcements WHERE is_active = 1)        AS active_notices,
        (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()) AS new_today,
        (SELECT COUNT(*) FROM locations WHERE is_active = 1)            AS total_locations,
        (SELECT COUNT(*) FROM hotels WHERE is_active = 1)               AS total_hotels,
        (SELECT COUNT(*) FROM location_places WHERE is_active = 1)      AS total_places,
        (SELECT COUNT(*) FROM hotels WHERE tier = 'budget')             AS budget_hotels,
        (SELECT COUNT(*) FROM hotels WHERE tier = 'comfortable')        AS mid_hotels,
        (SELECT COUNT(*) FROM hotels WHERE tier = 'luxury')             AS luxury_hotels
")->fetch();

// Top 6 places by review count & avg rating
$topPlaces = $db->query("
    SELECT place_name,
           COUNT(*) AS review_count,
           ROUND(AVG(rating),1) AS avg_rating
    FROM reviews
    GROUP BY place_name
    ORDER BY avg_rating DESC, review_count DESC
    LIMIT 6
")->fetchAll();

// New users last 7 days (for sparkline)
$growth = $db->query("
    SELECT DATE(created_at) AS day, COUNT(*) AS cnt
    FROM users
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(created_at)
    ORDER BY day ASC
")->fetchAll();

// Recent location additions
$recentLocs = $db->query("
    SELECT name, region, emoji, created_at
    FROM locations
    ORDER BY created_at DESC
    LIMIT 5
")->fetchAll();

jsonResponse(true, 'OK', [
    'stats'        => $row,
    'top_places'   => $topPlaces,
    'growth'       => $growth,
    'recent_locs'  => $recentLocs,
]);
