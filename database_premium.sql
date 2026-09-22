-- ═══════════════════════════════════════════════════════════════
--  XTrack Premium — Database Setup
--  Run this in phpMyAdmin SQL tab after database.sql
-- ═══════════════════════════════════════════════════════════════

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
    expires_at   DATETIME     DEFAULT NULL COMMENT 'NULL = lifetime',
    PRIMARY KEY (id),
    KEY idx_user   (user_id),
    KEY idx_plan   (plan_id),
    KEY idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed the 3 plans (INSERT IGNORE skips if already exists)
INSERT IGNORE INTO premium_plans (name, slug, price_lkr, duration_days, badge, features, sort_order) VALUES
('Explorer',   'explorer',   990,  30, NULL,
 '["Unlimited trip saves","AI-powered itinerary suggestions","PDF export for any trip","Detailed weather forecasts","Priority email support"]',
 1),
('Adventurer', 'adventurer', 2490, 90, 'Best Value',
 '["Everything in Explorer","Advanced route optimisation","Hotel price alerts","Offline trip access","Multiple trip comparison","Early access to new features"]',
 2),
('Elite',      'elite',      7990,  0, 'Lifetime',
 '["Everything in Adventurer","Lifetime access — pay once","Dedicated WhatsApp support","Custom trip branding","Beta feature access","Exclusive member badge"]',
 3);
