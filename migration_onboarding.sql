-- ═══════════════════════════════════════════════════════════
--  Xtrack — Migration: Add Onboarding Fields to Users Table
--
--  Run ONCE in phpMyAdmin or terminal:
--    mysql -u root xtrack_db < migration_onboarding.sql
-- ═══════════════════════════════════════════════════════════

USE xtrack_db;

-- Add preferences JSON column (stores travel style, companion, environment, budget)
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS preferences_json JSON     DEFAULT NULL   AFTER phone,
    ADD COLUMN IF NOT EXISTS onboarded        TINYINT(1) NOT NULL DEFAULT 0 AFTER preferences_json;

-- ── Verify ────────────────────────────────────────────────────
SELECT 'Migration complete. New columns added to users:' AS status;
DESCRIBE users;
