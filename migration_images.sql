-- ============================================================
-- Migration: Add image_url to locations and hotels
-- Run this ONCE against your xtrack database
-- ============================================================

ALTER TABLE locations
    ADD COLUMN image_url VARCHAR(500) DEFAULT NULL
        COMMENT 'Unsplash photo URL fetched via api/fetch_image.php'
    AFTER emoji;

ALTER TABLE hotels
    ADD COLUMN image_url VARCHAR(500) DEFAULT NULL
        COMMENT 'Unsplash photo URL fetched via api/fetch_image.php'
    AFTER emoji;
