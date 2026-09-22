-- ═══════════════════════════════════════════════════════════
--  Xtrack — Complete Database (v4 — Locations + Hotels)
--
--  In phpMyAdmin: Import this file
--  In terminal:   mysql -u root -p < database.sql
-- ═══════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS xtrack_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE xtrack_db;

-- ── Users ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    fullname      VARCHAR(120)    NOT NULL,
    email         VARCHAR(180)    NOT NULL,
    password_hash VARCHAR(255)    NOT NULL,
    phone         VARCHAR(30)              DEFAULT NULL,
    status        ENUM('active','banned')  NOT NULL DEFAULT 'active',
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Trips ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trips (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id       INT UNSIGNED    NOT NULL,
    name          VARCHAR(200)    NOT NULL,
    panel         CHAR(1)         NOT NULL DEFAULT 'A',
    state_json    MEDIUMTEXT      NOT NULL,
    selected_json TEXT            NOT NULL,
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_trips_user (user_id),
    CONSTRAINT fk_trips_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Reviews ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    user_id       INT UNSIGNED    NOT NULL,
    place_name    VARCHAR(200)    NOT NULL,
    rating        TINYINT         NOT NULL,
    tip           TEXT                     DEFAULT NULL,
    updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_user_place (user_id, place_name),
    KEY idx_reviews_user (user_id),
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Admins ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
    id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    fullname      VARCHAR(120)    NOT NULL,
    email         VARCHAR(180)    NOT NULL,
    password_hash VARCHAR(255)    NOT NULL,
    last_login    DATETIME                 DEFAULT NULL,
    created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_admin_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Announcements ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    admin_id   INT UNSIGNED NOT NULL,
    title      VARCHAR(200) NOT NULL,
    message    TEXT         NOT NULL,
    type       ENUM('info','warning','success') NOT NULL DEFAULT 'info',
    is_active  TINYINT(1)   NOT NULL DEFAULT 1,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ann_admin (admin_id),
    CONSTRAINT fk_ann_admin FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Locations ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS locations (
    id                      INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    name                    VARCHAR(120)    NOT NULL,
    region                  VARCHAR(100)    NOT NULL,
    lat                     DECIMAL(9,6)    NOT NULL,
    lon                     DECIMAL(9,6)    NOT NULL,
    description             TEXT                     DEFAULT NULL,
    distance_from_colombo   SMALLINT UNSIGNED         DEFAULT NULL COMMENT 'km',
    emoji                   VARCHAR(10)              DEFAULT '📍',
    is_starting_point       TINYINT(1)    NOT NULL DEFAULT 0,
    is_active               TINYINT(1)    NOT NULL DEFAULT 1,
    sort_order              SMALLINT      NOT NULL DEFAULT 0,
    created_at              DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_loc_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Location Categories ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS location_categories (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    location_id INT UNSIGNED NOT NULL,
    category    ENUM('beach','adventure','cultural','wildlife','mixed') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_loc_cat (location_id, category),
    CONSTRAINT fk_lc_loc FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Location Places (nearby attractions) ────────────────────
CREATE TABLE IF NOT EXISTS location_places (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    location_id     INT UNSIGNED    NOT NULL,
    name            VARCHAR(200)    NOT NULL,
    distance_label  VARCHAR(50)              DEFAULT NULL COMMENT 'e.g. 1.2 km',
    description     TEXT                     DEFAULT NULL,
    entry_cost_lkr  INT UNSIGNED             DEFAULT 0,
    duration_hrs    TINYINT UNSIGNED          DEFAULT 1,
    place_lat       DECIMAL(9,6)             DEFAULT NULL,
    place_lon       DECIMAL(9,6)             DEFAULT NULL,
    is_active       TINYINT(1)    NOT NULL DEFAULT 1,
    sort_order      SMALLINT      NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uq_lp_loc_name (location_id, name),
    KEY idx_lp_loc (location_id),
    CONSTRAINT fk_lp_loc FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Hotels ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hotels (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    location_id     INT UNSIGNED    NOT NULL,
    name            VARCHAR(200)    NOT NULL,
    emoji           VARCHAR(10)              DEFAULT '🏨',
    tier            ENUM('budget','comfortable','luxury') NOT NULL DEFAULT 'comfortable',
    stars           TINYINT UNSIGNED          DEFAULT 3,
    rating          DECIMAL(3,1)             DEFAULT NULL COMMENT '0.0-10.0',
    rating_text     VARCHAR(50)              DEFAULT NULL,
    description     TEXT                     DEFAULT NULL,
    price_lkr       INT UNSIGNED             DEFAULT NULL COMMENT 'per night',
    booking_url     VARCHAR(500)             DEFAULT NULL,
    is_active       TINYINT(1)    NOT NULL DEFAULT 1,
    sort_order      SMALLINT      NOT NULL DEFAULT 0,
    created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_hotel_loc_name (location_id, name),
    KEY idx_hotel_loc (location_id),
    CONSTRAINT fk_hotel_loc FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Hotel Amenities ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hotel_amenities (
    id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    hotel_id  INT UNSIGNED NOT NULL,
    amenity   VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_ha_hotel (hotel_id),
    CONSTRAINT fk_ha_hotel FOREIGN KEY (hotel_id) REFERENCES hotels (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ═══════════════════════════════════════════════════════════
--  Default Admin Account
--  Email: admin@xtrack  |  Password: admin123
-- ═══════════════════════════════════════════════════════════
INSERT INTO admins (fullname, email, password_hash) VALUES
('Super Admin', 'admin@xtrack', '$2b$12$IwbXICQfxP0SMXS7NfAfNealP.ZG7jBbpdYli7UWsdztHH.BB2qbG')
ON DUPLICATE KEY UPDATE fullname = fullname;


-- ═══════════════════════════════════════════════════════════
--  SEED DATA — Locations
-- ═══════════════════════════════════════════════════════════

INSERT INTO locations (name, region, lat, lon, description, distance_from_colombo, emoji, is_starting_point, sort_order) VALUES
('Ella',         'Hill Country',       6.8667, 81.0467, 'A lush hilltop village famous for Nine Arch Bridge, Ella Rock, and panoramic tea-estate views.',        214, '🏔', 0, 1),
('Kandy',        'Central Province',   7.2906, 80.6337, 'Sri Lanka''s cultural capital, home to the sacred Temple of the Tooth and beautiful Kandy Lake.',        116, '🏛', 1, 2),
('Galle',        'Southern Coast',     6.0535, 80.2210, 'A UNESCO World Heritage Dutch fort town with cobblestone lanes, boutique hotels and surf beaches.',       116, '⛵', 1, 3),
('Colombo',      'Western Province',   6.9271, 79.8612, 'The vibrant commercial capital — a blend of colonial heritage, modern skyscrapers and street food.',         0, '🏙', 1, 4),
('Sigiriya',     'Cultural Triangle',  7.9570, 80.7600, 'Home to the iconic 5th-century rock fortress and ancient water gardens — a UNESCO World Heritage Site.', 169, '🦁', 0, 5),
('Mirissa',      'Southern Coast',     5.9443, 80.4570, 'A laid-back beach town known for whale watching, surfing and some of Sri Lanka''s finest seafood.',       149, '🐋', 0, 6),
('Trincomalee',  'East Coast',         8.5667, 81.2333, 'East coast gem with pristine beaches, coral reefs and the sacred Koneswaram temple on Swami Rock.',      263, '🐬', 0, 7),
('Nuwara Eliya', 'Hill Country',       6.9497, 80.7891, 'Sri Lanka''s "Little England" — a cool hill station ringed by tea estates, rose gardens and waterfalls.', 180, '🌿', 0, 8),
('Arugam Bay',   'East Coast',         6.8406, 81.8390, 'A world-class surf destination with a chilled vibe, mangrove lagoons and wildlife safaris nearby.',       320, '🏄', 0, 9),
('Yala',         'Southern Province',  6.3730, 81.5213, 'Sri Lanka''s most famous national park — highest leopard density in the world plus elephants and birds.', 298, '🐆', 0, 10),
('Polonnaruwa',  'North Central',      7.9395, 81.0001, 'Spectacular medieval capital with well-preserved palaces, stupas and the magnificent Gal Vihara sculptures.', 215, '🏯', 0, 11),
('Anuradhapura', 'North Central',      8.3114, 80.4037, 'Ancient sacred city — 2,000-year-old dagobas, the Sri Maha Bodhi tree and vast archaeological ruins.',     205, '🗿', 0, 12),
('Hikkaduwa',    'Southern Coast',     6.1395, 80.1063, 'Buzzing beach resort famous for its coral reef sanctuary, sea turtles and lively surf scene.',              98, '🐠', 0, 13),
('Negombo',      'Western Coast',      7.2004, 79.8355, 'A beach town minutes from the airport — great seafood, Dutch canals and a relaxed seaside atmosphere.',     37, '🎣', 1, 14),
('Adam''s Peak', 'Sabaragamuwa',       6.8097, 80.4992, 'Sacred conical mountain with a 5,000-step pilgrimage trail — spectacular sunrise views from the summit.',  96, '⛰', 0, 15),
('Dambulla',     'Cultural Triangle',  7.8567, 80.6515, 'Home to the UNESCO-listed Dambulla Cave Temple — 150+ Buddha statues carved into a granite outcrop.',     148, '🕌', 0, 16),
('Pinnawala',    'Sabaragamuwa',       7.2982, 80.3885, 'Famous for the Elephant Orphanage where over 80 rescued elephants bathe in the Maha Oya river.',           88, '🐘', 0, 17),
('Bentota',      'Southern Coast',     6.4277, 79.9986, 'A serene beach and river resort — ideal for water sports, Ayurvedic retreats and Geoffrey Bawa gardens.',   60, '🌴', 0, 18),
('Jaffna',       'Northern Province',  9.6615, 80.0255, 'The cultural heart of Tamil Sri Lanka — ancient temples, colonial forts and sublime seafood curries.',      395, '🏝', 1, 19),
('Horton Plains', 'Hill Country',      6.8020, 80.8010, 'A hauntingly beautiful cloud-forest plateau with World''s End cliff and misty montane grasslands.',       186, '🌫', 0, 20);


-- ═══════════════════════════════════════════════════════════
--  SEED DATA — Location Categories
-- ═══════════════════════════════════════════════════════════

-- Ella: adventure + wildlife
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'adventure' FROM locations WHERE name='Ella'
UNION ALL SELECT id, 'wildlife' FROM locations WHERE name='Ella';

-- Kandy: cultural + adventure
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Kandy'
UNION ALL SELECT id, 'adventure' FROM locations WHERE name='Kandy';

-- Galle: cultural + beach
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Galle'
UNION ALL SELECT id, 'beach' FROM locations WHERE name='Galle';

-- Colombo: cultural + mixed
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Colombo'
UNION ALL SELECT id, 'mixed' FROM locations WHERE name='Colombo';

-- Sigiriya: cultural + adventure
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Sigiriya'
UNION ALL SELECT id, 'adventure' FROM locations WHERE name='Sigiriya';

-- Mirissa: beach + wildlife
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'beach' FROM locations WHERE name='Mirissa'
UNION ALL SELECT id, 'wildlife' FROM locations WHERE name='Mirissa';

-- Trincomalee: beach + adventure
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'beach' FROM locations WHERE name='Trincomalee'
UNION ALL SELECT id, 'adventure' FROM locations WHERE name='Trincomalee';

-- Nuwara Eliya: adventure + wildlife
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'adventure' FROM locations WHERE name='Nuwara Eliya'
UNION ALL SELECT id, 'wildlife' FROM locations WHERE name='Nuwara Eliya';

-- Arugam Bay: beach + adventure
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'beach' FROM locations WHERE name='Arugam Bay'
UNION ALL SELECT id, 'adventure' FROM locations WHERE name='Arugam Bay';

-- Yala: wildlife + adventure
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'wildlife' FROM locations WHERE name='Yala'
UNION ALL SELECT id, 'adventure' FROM locations WHERE name='Yala';

-- Polonnaruwa: cultural
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Polonnaruwa';

-- Anuradhapura: cultural
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Anuradhapura';

-- Hikkaduwa: beach + adventure
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'beach' FROM locations WHERE name='Hikkaduwa'
UNION ALL SELECT id, 'adventure' FROM locations WHERE name='Hikkaduwa';

-- Negombo: beach + mixed
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'beach' FROM locations WHERE name='Negombo'
UNION ALL SELECT id, 'mixed' FROM locations WHERE name='Negombo';

-- Adam's Peak: adventure + cultural
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'adventure' FROM locations WHERE name='Adam''s Peak'
UNION ALL SELECT id, 'cultural' FROM locations WHERE name='Adam''s Peak';

-- Dambulla: cultural
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Dambulla';

-- Pinnawala: wildlife
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'wildlife' FROM locations WHERE name='Pinnawala';

-- Bentota: beach + mixed
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'beach' FROM locations WHERE name='Bentota'
UNION ALL SELECT id, 'mixed' FROM locations WHERE name='Bentota';

-- Jaffna: cultural + mixed
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'cultural' FROM locations WHERE name='Jaffna'
UNION ALL SELECT id, 'mixed' FROM locations WHERE name='Jaffna';

-- Horton Plains: adventure + wildlife
INSERT IGNORE INTO location_categories (location_id, category)
SELECT id, 'adventure' FROM locations WHERE name='Horton Plains'
UNION ALL SELECT id, 'wildlife' FROM locations WHERE name='Horton Plains';


-- ═══════════════════════════════════════════════════════════
--  SEED DATA — Location Places (nearby attractions)
-- ═══════════════════════════════════════════════════════════

INSERT IGNORE INTO location_places (location_id, name, distance_label, description, entry_cost_lkr, duration_hrs, place_lat, place_lon, sort_order)
SELECT l.id, p.name, p.dist, p.desc, p.cost, p.hrs, p.lat, p.lon, p.ord FROM locations l
JOIN (
  SELECT 'Ella' AS loc, 'Nine Arch Bridge' AS name, '1.2 km' AS dist, 'Iconic colonial railway bridge surrounded by lush jungle' AS `desc`, 0 AS cost, 2 AS hrs, 6.8798 AS lat, 81.0560 AS lon, 1 AS ord
  UNION ALL SELECT 'Ella','Little Adam''s Peak','3 km','Scenic hike with panoramic views of the Ella valley',0,3,6.8720,81.0510,2
  UNION ALL SELECT 'Ella','Ella Rock','6 km','Challenging trail with stunning 360° vistas',0,5,6.8650,81.0580,3
  UNION ALL SELECT 'Ella','Ravana Falls','8 km','Beautiful 25-metre waterfall steeped in legend',500,1,6.8720,81.0280,4
  UNION ALL SELECT 'Ella','Lipton''s Seat','22 km','Historic viewpoint over endless tea plantations',0,4,6.7877,80.9800,5

  UNION ALL SELECT 'Kandy','Temple of the Tooth','0.5 km','Sri Lanka''s most sacred Buddhist temple',1500,2,7.2935,80.6413,1
  UNION ALL SELECT 'Kandy','Kandy Lake','1 km','Serene artificial lake in the heart of the hill capital',0,1,7.2918,80.6384,2
  UNION ALL SELECT 'Kandy','Royal Botanical Gardens','5 km','150-acre garden with rare orchids and giant fig trees',700,3,7.2689,80.5961,3
  UNION ALL SELECT 'Kandy','Bahirawakanda Buddha','2 km','Towering white Buddha statue with panoramic views',0,1,7.3046,80.6351,4

  UNION ALL SELECT 'Galle','Galle Fort','0.2 km','UNESCO Heritage fort built by the Portuguese and Dutch',0,3,6.0286,80.2168,1
  UNION ALL SELECT 'Galle','Jungle Beach','5 km','Hidden beach accessible by foot through coastal jungle',0,2,6.0614,80.2450,2
  UNION ALL SELECT 'Galle','Galle Lighthouse','1 km','Oldest lighthouse in Sri Lanka',0,1,6.0288,80.2153,3
  UNION ALL SELECT 'Galle','Unawatuna Beach','6 km','One of Sri Lanka''s finest crescent beaches',0,3,6.0097,80.2491,4

  UNION ALL SELECT 'Sigiriya','Sigiriya Rock','0.5 km','Ancient rock fortress with frescoes and water gardens',4000,4,7.9570,80.7600,1
  UNION ALL SELECT 'Sigiriya','Pidurangala Rock','2 km','Budget alternative with equally stunning summit views',500,3,7.9630,80.7573,2
  UNION ALL SELECT 'Sigiriya','Minneriya National Park','25 km','Witness the legendary elephant gathering',3500,4,8.0372,80.8936,3
  UNION ALL SELECT 'Sigiriya','Dambulla Cave Temple','18 km','Ancient cave complex with over 150 Buddha statues',1500,2,7.8567,80.6489,4

  UNION ALL SELECT 'Mirissa','Mirissa Beach','0.1 km','Golden crescent beach ideal for swimming and surfing',0,3,5.9443,80.4570,1
  UNION ALL SELECT 'Mirissa','Whale Watching','0.5 km','Spot blue whales and dolphins in the open ocean',3500,5,5.9350,80.4510,2
  UNION ALL SELECT 'Mirissa','Parrot Rock','0.3 km','Rocky islet ideal for snorkelling at low tide',0,2,5.9460,80.4610,3
  UNION ALL SELECT 'Mirissa','Weligama Bay','10 km','Learn to surf in calm, beginner-friendly waters',2000,3,5.9500,80.4400,4

  UNION ALL SELECT 'Nuwara Eliya','Horton Plains','32 km','Dramatic plateau with World''s End cliff drop',1500,5,6.8020,80.8010,1
  UNION ALL SELECT 'Nuwara Eliya','Gregory Lake','1 km','Scenic reservoir with boating and lakeside walks',0,2,6.9706,80.7821,2
  UNION ALL SELECT 'Nuwara Eliya','Victoria Park','0.5 km','Beautiful botanical garden popular with birdwatchers',200,2,6.9733,80.7678,3
  UNION ALL SELECT 'Nuwara Eliya','Pedro Tea Estate','3 km','Working tea factory with guided tours and tastings',300,2,6.9650,80.8200,4
  UNION ALL SELECT 'Nuwara Eliya','Seetha Amman Temple','5 km','Ancient Hindu temple with Ramayana connections',0,1,6.9600,80.8050,5

  UNION ALL SELECT 'Trincomalee','Nilaveli Beach','16 km','Pristine white-sand beach with crystal clear waters',0,3,8.6918,81.2150,1
  UNION ALL SELECT 'Trincomalee','Pigeon Island','18 km','Marine national park with vibrant coral reefs',1200,4,8.7050,81.2200,2
  UNION ALL SELECT 'Trincomalee','Koneswaram Temple','1 km','Ancient Hindu temple perched dramatically on Swami Rock',0,1,8.5774,81.2341,3
  UNION ALL SELECT 'Trincomalee','Fort Frederick','1.5 km','16th-century Portuguese fort with panoramic sea views',0,1,8.5748,81.2318,4

  UNION ALL SELECT 'Arugam Bay','Arugam Bay Beach','0.1 km','One of Asia''s top surfing destinations',0,3,6.8406,81.8390,1
  UNION ALL SELECT 'Arugam Bay','Pottuvil Lagoon','4 km','Boat safari through mangrove-lined lagoon',1500,2,6.8725,81.8317,2
  UNION ALL SELECT 'Arugam Bay','Muhudu Maha Viharaya','8 km','Ancient Buddhist temple ruins by the sea',0,1,6.8500,81.8000,3
  UNION ALL SELECT 'Arugam Bay','Kumana National Park','40 km','Remote wildlife park famous for bird migration',2500,5,6.5959,81.6868,4

  UNION ALL SELECT 'Yala','Yala National Park','2 km','Sri Lanka''s most popular national park — leopards and elephants',4000,6,6.3730,81.5213,1
  UNION ALL SELECT 'Yala','Sithulpawwa Rock Temple','5 km','Ancient Buddhist monastery carved into a granite rock',0,2,6.4300,81.5100,2
  UNION ALL SELECT 'Yala','Bundala National Park','20 km','Coastal wetland teeming with migratory birds',1000,3,6.2000,81.2500,3

  UNION ALL SELECT 'Polonnaruwa','Ancient City of Polonnaruwa','1 km','UNESCO World Heritage medieval city with palaces and temples',2000,5,7.9395,81.0001,1
  UNION ALL SELECT 'Polonnaruwa','Gal Vihara','3 km','Magnificent rock-carved Buddha statues from the 12th century',0,1,7.9517,81.0011,2
  UNION ALL SELECT 'Polonnaruwa','Parakrama Samudra','2 km','Vast ancient reservoir built by King Parakramabahu',0,1,7.9395,81.0001,3

  UNION ALL SELECT 'Anuradhapura','Sri Maha Bodhi','1 km','World''s oldest documented tree — a cutting of the Buddha''s Bodhi tree',0,1,8.3523,80.3959,1
  UNION ALL SELECT 'Anuradhapura','Ruwanwelisaya','1.5 km','Great white stupa — one of the tallest ancient monuments in the world',0,1,8.3523,80.3959,2
  UNION ALL SELECT 'Anuradhapura','Jetavanaramaya','2 km','Once the tallest stupa in the ancient world',0,1,8.3508,80.3991,3
  UNION ALL SELECT 'Anuradhapura','Mihintale','12 km','Sacred hilltop where Buddhism was introduced to Sri Lanka',0,3,8.3486,80.5086,4

  UNION ALL SELECT 'Hikkaduwa','Hikkaduwa Beach','0.1 km','Lively beach famous for surfing and coral reef snorkelling',0,3,6.1395,80.1063,1
  UNION ALL SELECT 'Hikkaduwa','Coral Sanctuary','0.5 km','Protected reef with sea turtles and colourful fish',0,2,6.1395,80.1063,2
  UNION ALL SELECT 'Hikkaduwa','Tsunami Museum','1 km','Memorial museum documenting the 2004 tsunami',200,1,6.1400,80.1050,3
  UNION ALL SELECT 'Hikkaduwa','Seenigama Muhudu Viharaya','2 km','Small island temple accessible by boat',0,1,6.1450,80.1000,4

  UNION ALL SELECT 'Negombo','Negombo Beach','0.5 km','Popular beach close to the airport with a lively atmosphere',0,2,7.2004,79.8355,1
  UNION ALL SELECT 'Negombo','Negombo Fish Market','1 km','Bustling early-morning market — the largest in Sri Lanka',0,1,7.2127,79.8383,2
  UNION ALL SELECT 'Negombo','Dutch Canal','1 km','Historic 17th-century Dutch canal through mangroves',0,1,7.2004,79.8355,3
  UNION ALL SELECT 'Negombo','St. Mary''s Church','0.8 km','Stunning neo-Gothic church known as the Rome of the East',0,1,7.2100,79.8360,4

  UNION ALL SELECT 'Adam''s Peak','Adam''s Peak Climb','0.5 km','Iconic pilgrimage hike to the sacred Sri Pada summit',0,7,6.8097,80.4992,1
  UNION ALL SELECT 'Adam''s Peak','Dalhousie Village','0.2 km','Base camp village with guesthouses and tea shops',0,1,6.8403,80.4967,2
  UNION ALL SELECT 'Adam''s Peak','Devon Falls','15 km','Stunning 97m waterfall in tea country',0,1,6.9300,80.5400,3

  UNION ALL SELECT 'Dambulla','Dambulla Cave Temple','0.5 km','UNESCO World Heritage cave complex with 150+ Buddha statues',1500,3,7.8567,80.6489,1
  UNION ALL SELECT 'Dambulla','Sigiriya Rock','18 km','Ancient rock fortress — one of Sri Lanka''s greatest wonders',4000,4,7.9570,80.7600,2
  UNION ALL SELECT 'Dambulla','Nalanda Gedige','22 km','Medieval stone temple blending Hindu and Buddhist architecture',500,1,7.6882,80.6742,3

  UNION ALL SELECT 'Pinnawala','Elephant Orphanage','0.2 km','World-famous sanctuary caring for over 80 elephants',3000,3,7.2982,80.3885,1
  UNION ALL SELECT 'Pinnawala','Mawanella Town','12 km','Charming town surrounded by rubber and spice plantations',0,1,7.2560,80.4530,2
  UNION ALL SELECT 'Pinnawala','Kegalle Viewpoint','8 km','Panoramic views over Sabaragamuwa Province',0,1,7.2510,80.3460,3

  UNION ALL SELECT 'Bentota','Bentota Beach','0.2 km','Wide golden beach perfect for water sports and relaxation',0,3,6.4277,79.9986,1
  UNION ALL SELECT 'Bentota','Brief Garden','10 km','Enchanting hilltop garden created by artist Bevis Bawa',600,2,6.4600,80.0500,2
  UNION ALL SELECT 'Bentota','Kosgoda Turtle Hatchery','8 km','Conservation project protecting five species of sea turtles',500,1,6.3800,80.0300,3
  UNION ALL SELECT 'Bentota','Galapatha Raja Maha Viharaya','5 km','Ancient Buddhist temple with a sacred relic',0,1,6.4500,80.0200,4

  UNION ALL SELECT 'Jaffna','Jaffna Fort','0.5 km','Impressive 17th-century Dutch fort by the lagoon',0,2,9.6615,80.0255,1
  UNION ALL SELECT 'Jaffna','Nainativu Island','25 km','Sacred island with both Hindu and Buddhist temples',0,4,9.5750,79.9380,2
  UNION ALL SELECT 'Jaffna','Jaffna Library','0.5 km','Rebuilt symbol of resilience — one of Asia''s finest libraries',0,1,9.6615,80.0255,3
  UNION ALL SELECT 'Jaffna','Casuarina Beach','18 km','Serene beach known for its shallow, calm waters',0,2,9.7600,80.0200,4

  UNION ALL SELECT 'Horton Plains','World''s End','9 km','Dramatic 870m cliff with breathtaking views over the lowlands',0,4,6.7964,80.8096,1
  UNION ALL SELECT 'Horton Plains','Baker''s Falls','4 km','Beautiful 20m waterfall set in misty montane forest',0,2,6.8000,80.8000,2
  UNION ALL SELECT 'Horton Plains','Mini World''s End','5 km','Smaller but equally striking escarpment viewpoint',0,2,6.8010,80.8050,3

  UNION ALL SELECT 'Colombo','Gangaramaya Temple','1 km','Eclectic temple blending multiple architectural styles',300,1,6.9168,79.8567,1
  UNION ALL SELECT 'Colombo','Galle Face Green','2 km','Iconic oceanside promenade — best at sunset',0,1,6.9196,79.8478,2
  UNION ALL SELECT 'Colombo','National Museum','1.5 km','Sri Lanka''s largest museum with the last king''s throne',500,2,6.9101,79.8617,3
  UNION ALL SELECT 'Colombo','Pettah Market','3 km','Colourful, chaotic bazaar — a feast for the senses',0,2,6.9350,79.8500,4
) AS p ON l.name = p.loc;


-- ═══════════════════════════════════════════════════════════
--  SEED DATA — Hotels
-- ═══════════════════════════════════════════════════════════

INSERT IGNORE INTO hotels (location_id, name, emoji, tier, stars, rating, rating_text, description, price_lkr, booking_url, sort_order)
SELECT l.id, h.name, h.emoji, h.tier, h.stars, h.rating, h.rtext, h.desc, h.price, h.url, h.ord FROM locations l
JOIN (
  -- ELLA
  SELECT 'Ella' AS loc,'Dream Cafe Ella' AS name,'🌿' AS emoji,'budget' AS tier,3 AS stars,8.2 AS rating,'Very Good' AS rtext,'Charming hillside guesthouse with panoramic valley views, vegetarian cafe, and a warm family atmosphere.' AS `desc`,4500 AS price,'https://www.booking.com/searchresults.html?ss=Ella+Sri+Lanka' AS url, 1 AS ord
  UNION ALL SELECT 'Ella','Zion View Ella','🏡','budget',3,8.5,'Very Good','Boutique guesthouse perched above the cloud line, perfect for sunrise watchers and budget travellers.',3800,'https://www.booking.com/searchresults.html?ss=Zion+View+Ella',2
  UNION ALL SELECT 'Ella','Ninety Nine Trails','⛺','comfortable',4,9.1,'Superb','Eco-chic retreat built into the hillside. Stylish cabins, an excellent restaurant and spectacular Ella Rock views.',14500,'https://www.booking.com/hotel/lk/ninety-nine-trails.html',3
  UNION ALL SELECT 'Ella','Ella Flower Garden Resort','🌸','comfortable',4,8.8,'Excellent','A floral paradise with cosy bungalows, rooftop dining, and a prime location steps from Ella town.',12000,'https://www.booking.com/hotel/lk/ella-flower-garden-resort.html',4
  UNION ALL SELECT 'Ella','98 Acres Resort & Spa','✨','luxury',5,9.4,'Exceptional','Award-winning hilltop resort with infinity pool overlooking tea estates, a full spa and exquisite farm-to-table dining.',48000,'https://www.booking.com/hotel/lk/98-acres-resort-and-spa-ella.html',5
  UNION ALL SELECT 'Ella','Aarunya Nature Resort','🌺','luxury',5,9.2,'Exceptional','Exclusive boutique resort hidden in the jungle with private plunge pools, organic cuisine and guided forest walks.',62000,'https://www.booking.com/searchresults.html?ss=Aarunya+Ella',6
  -- KANDY
  UNION ALL SELECT 'Kandy','McLeod Inn','🏠','budget',3,8.0,'Very Good','Friendly guesthouse near the Temple of the Tooth with clean rooms, home-cooked breakfast and city views.',4200,'https://www.booking.com/hotel/lk/mcleod-inn-kandy.html',1
  UNION ALL SELECT 'Kandy','Thilanka Hotel','🏨','budget',3,7.9,'Good','Well-located city hotel with comfortable rooms, a rooftop restaurant and easy access to Kandy Lake.',5500,'https://www.booking.com/hotel/lk/thilanka.html',2
  UNION ALL SELECT 'Kandy','Earl''s Regency Hotel','🌟','comfortable',4,8.7,'Excellent','Hillside resort with spectacular valley views, large pool, Ayurvedic spa and multiple dining options.',19500,'https://www.booking.com/hotel/lk/earl-s-regency.html',3
  UNION ALL SELECT 'Kandy','Hotel Suisse','🏔','comfortable',4,8.3,'Very Good','Colonial-era hotel with character, garden setting, pool and close proximity to the Kandy Cultural Centre.',14000,'https://www.booking.com/hotel/lk/suisse-kandy.html',4
  UNION ALL SELECT 'Kandy','Amaya Hills Kandy','👑','luxury',5,9.0,'Superb','Clifftop luxury resort with breathtaking panoramic views over the Kandy valley, infinity pool and award-winning cuisine.',42000,'https://www.booking.com/hotel/lk/amaya-hills-kandy.html',5
  UNION ALL SELECT 'Kandy','The Kandy House','🏛','luxury',5,9.5,'Exceptional','Intimate boutique mansion dating to 1804, with antique-furnished suites, plunge pool and Kandyan heritage experiences.',68000,'https://www.booking.com/hotel/lk/the-kandy-house.html',6
  -- GALLE
  UNION ALL SELECT 'Galle','Fort Bazaar Hostel','🏠','budget',3,8.1,'Very Good','Stylish budget stay inside the historic Galle Fort walls, a short walk from galleries and cafes.',5200,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Galle+Fort',1
  UNION ALL SELECT 'Galle','Closenberg Hotel','⚓','budget',3,8.4,'Very Good','Historic 1858 villa with ocean views, a colonial verandah and generous hospitality at an unbeatable price.',7500,'https://www.booking.com/hotel/lk/closenberg.html',2
  UNION ALL SELECT 'Galle','Jetwing Lighthouse','🔆','comfortable',4,8.9,'Excellent','Geoffrey Bawa-designed oceanfront resort with dramatic architecture, cliffside pool and superb Sri Lankan cuisine.',28000,'https://www.booking.com/hotel/lk/lighthouse.html',3
  UNION ALL SELECT 'Galle','Fort Printers','📖','comfortable',4,9.0,'Superb','Exquisite boutique hotel in a restored 18th-century fort building with rooftop pool and art gallery.',22000,'https://www.booking.com/hotel/lk/fort-printers.html',4
  UNION ALL SELECT 'Galle','Amangalle','💫','luxury',5,9.6,'Exceptional','One of Asia''s most celebrated hotels — a 1684 Dutch trading house reimagined as an ultra-luxe retreat within Galle Fort.',130000,'https://www.booking.com/hotel/lk/amangalle.html',5
  UNION ALL SELECT 'Galle','Cape Weligama','🌊','luxury',5,9.3,'Exceptional','Dramatic clifftop resort 25km from Galle with villa-style suites, private plunge pools and whale-watching excursions.',115000,'https://www.booking.com/hotel/lk/cape-weligama.html',6
  -- MIRISSA
  UNION ALL SELECT 'Mirissa','Paradise Beach Club','🏖','budget',3,7.8,'Good','Beachfront budget stay with colourful bungalows 50 metres from the best swimming spot in Mirissa.',4000,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Mirissa+Beach',1
  UNION ALL SELECT 'Mirissa','Mirissa Hills','🌴','budget',3,8.3,'Very Good','Hillside guesthouse with jungle ambiance, helpful hosts and an easy 5-minute walk to the beach.',4800,'https://www.booking.com/searchresults.html?ss=Mirissa+Hills+Hotel',2
  UNION ALL SELECT 'Mirissa','The Silan on Sea','🐋','comfortable',4,8.9,'Excellent','Boutique beachfront resort known for whale-watching packages, stylish rooms and a beachside infinity pool.',18000,'https://www.booking.com/searchresults.html?ss=Silan+on+Sea+Mirissa',3
  UNION ALL SELECT 'Mirissa','Sooriya Resort','🐠','comfortable',4,8.6,'Excellent','Relaxed boutique resort steps from Mirissa beach with a pool, snorkelling packages and a lively rooftop bar.',15000,'https://www.booking.com/searchresults.html?ss=Sooriya+Resort+Mirissa',4
  UNION ALL SELECT 'Mirissa','Cantaloupe Levels Mirissa','🌅','luxury',5,9.2,'Exceptional','Chic boutique hotel perched on a hill with ocean panoramas, a stunning infinity pool and exclusive beachfront dinners.',55000,'https://www.booking.com/hotel/lk/cantaloupe-levels.html',5
  -- SIGIRIYA
  UNION ALL SELECT 'Sigiriya','Sigiriya Village Hotel','🦁','budget',3,8.0,'Very Good','Peaceful village-style guesthouse with lush gardens, close to the base of Sigiriya Rock.',5500,'https://www.booking.com/searchresults.html?ss=Budget+Sigiriya+Hotel',1
  UNION ALL SELECT 'Sigiriya','Jetwing Vil Uyana','🌾','comfortable',5,9.3,'Exceptional','Award-winning eco-resort in a private wetland sanctuary with luxury water chalets and wildlife experiences.',35000,'https://www.booking.com/hotel/lk/jetwing-vil-uyana.html',2
  UNION ALL SELECT 'Sigiriya','Aliya Resort & Spa','🐘','comfortable',4,8.8,'Excellent','Elephant-themed luxury resort with stunning Sigiriya Rock views, infinity pool and Ayurvedic treatments.',24000,'https://www.booking.com/hotel/lk/aliya-resort-and-spa-sigiriya.html',3
  UNION ALL SELECT 'Sigiriya','Water Garden Sigiriya','💎','luxury',5,9.5,'Exceptional','Ultra-exclusive water villa resort inspired by the ancient water gardens of Sigiriya, with private plunge pools.',85000,'https://www.booking.com/hotel/lk/water-garden-sigiriya.html',4
  -- NUWARA ELIYA
  UNION ALL SELECT 'Nuwara Eliya','Grand Hotel Nuwara Eliya','🏰','budget',3,7.6,'Good','Colonial-era grand dame with classic character, garden walks and a cosy fireplace lounge.',5000,'https://www.booking.com/hotel/lk/grand-nuwara-eliya.html',1
  UNION ALL SELECT 'Nuwara Eliya','Heritance Tea Factory','🍵','comfortable',4,8.9,'Excellent','One of Sri Lanka''s most iconic hotels — a converted working tea factory in the misty highlands.',28000,'https://www.booking.com/hotel/lk/heritance-tea-factory.html',2
  UNION ALL SELECT 'Nuwara Eliya','St. Andrew''s Hotel','⛳','comfortable',4,8.5,'Very Good','Charming Tudor-style hotel set on the Nuwara Eliya golf course with snooker room and colonial elegance.',20000,'https://www.booking.com/hotel/lk/st-andrew-s.html',3
  UNION ALL SELECT 'Nuwara Eliya','Araliya Green Hills Hotel','🌿','luxury',5,9.1,'Superb','Modern luxury resort on the hill above Nuwara Eliya with sweeping valley views, heated pool and a world-class spa.',48000,'https://www.booking.com/hotel/lk/araliya-green-hills.html',4
  -- TRINCOMALEE
  UNION ALL SELECT 'Trincomalee','Trinco Blu by Cinnamon','🐬','comfortable',4,8.7,'Excellent','Beachfront resort in Nilaveli with beautiful ocean rooms, a pool, water sports and whale-watching packages.',22000,'https://www.booking.com/hotel/lk/trinco-blu-by-cinnamon.html',1
  UNION ALL SELECT 'Trincomalee','Pigeon Island Beach Resort','🏝','comfortable',4,8.5,'Very Good','Relaxed beachfront resort with direct access to the Pigeon Island Marine National Park snorkelling site.',18000,'https://www.booking.com/searchresults.html?ss=Pigeon+Island+Beach+Resort',2
  UNION ALL SELECT 'Trincomalee','Jungle Beach Hotel','🌊','luxury',5,9.4,'Exceptional','Secluded boutique resort on a pristine private bay with luxurious open-air villas, kayaking and sunset cruises.',72000,'https://www.booking.com/hotel/lk/jungle-beach.html',3
  -- YALA
  UNION ALL SELECT 'Yala','Cinnamon Wild Yala','🐆','comfortable',4,8.6,'Excellent','Safari lodge with tented chalets on the edge of Yala National Park, offering twice-daily game drives.',32000,'https://www.booking.com/hotel/lk/cinnamon-wild-yala.html',1
  UNION ALL SELECT 'Yala','Leopard Trails Yala','🌿','comfortable',4,9.0,'Superb','Luxury tented camp deep in a private concession bordering Yala, with expert naturalist-guided game drives.',45000,'https://www.booking.com/searchresults.html?ss=Leopard+Trails+Yala',2
  UNION ALL SELECT 'Yala','Chena Huts by Uga Escapes','💎','luxury',5,9.6,'Exceptional','An architectural masterpiece — private tented villas on stilts above a lagoon with personal guides.',120000,'https://www.booking.com/hotel/lk/chena-huts-by-uga-escapes.html',3
  -- ARUGAM BAY
  UNION ALL SELECT 'Arugam Bay','Siam View Hotel','🏄','budget',3,8.2,'Very Good','Surfer-favourite beachfront hostel with bungalows, a lively bar and surf board rental on the main bay.',4500,'https://www.booking.com/hotel/lk/siam-view.html',1
  UNION ALL SELECT 'Arugam Bay','Stardust Hotel','⭐','comfortable',4,8.8,'Excellent','Stylish boutique hotel with a surf school, lagoon boat rides, yoga classes and an excellent restaurant.',16000,'https://www.booking.com/hotel/lk/stardust-arugam-bay.html',2
  UNION ALL SELECT 'Arugam Bay','Spice Trail Hotel','🌶','luxury',5,9.2,'Exceptional','Boutique luxury retreat with minimalist jungle chalets, private plunge pools and gourmet Sri Lankan cuisine.',58000,'https://www.booking.com/searchresults.html?ss=Luxury+Hotel+Arugam+Bay',3
  -- HIKKADUWA
  UNION ALL SELECT 'Hikkaduwa','Coral Sands Hotel','🐠','budget',3,7.9,'Good','Long-running beachfront budget hotel with direct coral reef access, snorkelling gear hire and daily beach BBQs.',5200,'https://www.booking.com/hotel/lk/coral-sands-hikkaduwa.html',1
  UNION ALL SELECT 'Hikkaduwa','Hikka Tranz by Cinnamon','🌴','comfortable',4,8.5,'Very Good','Colourful beachfront resort with a large pool, water sports centre, lively bar and direct reef access.',20000,'https://www.booking.com/hotel/lk/hikka-tranz-by-cinnamon.html',2
  UNION ALL SELECT 'Hikkaduwa','Amanwella Tangalle','🌊','luxury',5,9.5,'Exceptional','Aman''s stunning crescent-bay resort with ultra-private pool suites and superb seafood dining.',135000,'https://www.booking.com/hotel/lk/amanwella.html',3
  -- NEGOMBO
  UNION ALL SELECT 'Negombo','Golden Star Beach Hotel','🌅','budget',3,7.8,'Good','Convenient beachfront guesthouse near the airport with AC rooms, a garden and family-friendly service.',4800,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Negombo+Beach',1
  UNION ALL SELECT 'Negombo','Jetwing Blue','🏊','comfortable',4,8.8,'Excellent','Stylish beachfront hotel with a stunning seafront pool, multiple restaurants, spa and easy airport access.',22000,'https://www.booking.com/hotel/lk/jetwing-blue.html',2
  UNION ALL SELECT 'Negombo','Jetwing Lagoon','🦢','luxury',5,9.1,'Superb','Elegant lagoon resort with stilted water villas, a serene spa and complimentary airport transfers.',65000,'https://www.booking.com/hotel/lk/jetwing-lagoon.html',3
  -- COLOMBO
  UNION ALL SELECT 'Colombo','Colombo City Hotel','🏙','budget',3,8.0,'Very Good','Well-located budget hotel in the Pettah area with clean rooms, helpful staff and easy access to attractions.',5500,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Colombo+City',1
  UNION ALL SELECT 'Colombo','Cinnamon Grand Colombo','🌟','comfortable',5,8.8,'Excellent','Iconic 5-star hotel on Galle Road with multiple restaurants, a large pool and superb city-centre location.',35000,'https://www.booking.com/hotel/lk/cinnamon-grand-colombo.html',2
  UNION ALL SELECT 'Colombo','Shangri-La Colombo','👑','luxury',5,9.4,'Exceptional','Ultra-luxe oceanfront tower with infinity pool, award-winning restaurants and spectacular Indian Ocean views.',95000,'https://www.booking.com/hotel/lk/shangri-la-colombo.html',3
  -- DAMBULLA
  UNION ALL SELECT 'Dambulla','Almond Tree Inn','🌳','budget',3,8.0,'Very Good','Comfortable budget guesthouse with a garden, home-cooked meals and a short walk from the cave temples.',4200,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Dambulla',1
  UNION ALL SELECT 'Dambulla','Amaya Lake','🏞','comfortable',4,8.6,'Excellent','Peaceful lakeside eco-resort with chalets overlooking Kandalama Lake, great birdwatching and infinity pool.',22000,'https://www.booking.com/hotel/lk/amaya-lake.html',2
  UNION ALL SELECT 'Dambulla','Heritance Kandalama','🏯','luxury',5,9.2,'Exceptional','Geoffrey Bawa''s masterpiece — a hotel carved into a rock face with rainforest views and a stunning infinity pool.',75000,'https://www.booking.com/hotel/lk/heritance-kandalama.html',3
  -- POLONNARUWA
  UNION ALL SELECT 'Polonnaruwa','The Lake Hotel Polonnaruwa','🏞','budget',3,7.8,'Good','Pleasant lakeside guesthouse close to the ancient city ruins with good home-cooked rice and curry.',4500,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Polonnaruwa',1
  UNION ALL SELECT 'Polonnaruwa','Deer Park Hotel','🦌','comfortable',4,8.5,'Very Good','Boutique eco-resort set in forested grounds with a pool, excellent restaurant and guided heritage tours.',20000,'https://www.booking.com/hotel/lk/deer-park.html',2
  -- ANURADHAPURA
  UNION ALL SELECT 'Anuradhapura','Ulagalla Resort','🌾','luxury',5,9.3,'Exceptional','Stunning eco-luxury resort in a private 58-acre estate with rice field views, infinity pool and Ayurvedic spa.',85000,'https://www.booking.com/hotel/lk/ulagalla.html',1
  UNION ALL SELECT 'Anuradhapura','Palm Garden Village Hotel','🌴','comfortable',4,8.4,'Very Good','Spacious resort with lush gardens, a pool and close proximity to the sacred city ruins.',18000,'https://www.booking.com/hotel/lk/palm-garden-village.html',2
  UNION ALL SELECT 'Anuradhapura','Hotel Tissawewa','🏛','budget',3,7.7,'Good','Heritage guesthouse within the ancient city — great atmosphere and simple, comfortable rooms.',5000,'https://www.booking.com/searchresults.html?ss=Hotel+Tissawewa+Anuradhapura',3
  -- PINNAWALA
  UNION ALL SELECT 'Pinnawala','Elephant Bay Hotel','🐘','comfortable',4,8.5,'Very Good','Riverside hotel with a balcony view of elephants bathing in the Maha Oya river.',16000,'https://www.booking.com/hotel/lk/elephant-bay.html',1
  UNION ALL SELECT 'Pinnawala','Elephant Park Hotel','🌿','budget',3,7.9,'Good','Friendly guesthouse with garden views, close to the Elephant Orphanage entrance and local spice shops.',5200,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Pinnawala+Elephant',2
  -- ADAM'S PEAK
  UNION ALL SELECT 'Adam''s Peak','White House Dalhousie','⛰','budget',3,8.0,'Very Good','Popular base camp guesthouse for the sacred Adam''s Peak climb, with early wake-up calls and warm meals.',3500,'https://www.booking.com/searchresults.html?ss=Budget+Guesthouse+Dalhousie+Adams+Peak',1
  UNION ALL SELECT 'Adam''s Peak','Green View''s','🌿','budget',3,8.3,'Very Good','Cosy hillside guesthouse with mountain views, home cooking and guide services for the summit trail.',4000,'https://www.booking.com/searchresults.html?ss=Guesthouse+Adams+Peak+Dalhousie',2
  UNION ALL SELECT 'Adam''s Peak','Slightly Chilled','🍃','comfortable',4,8.7,'Excellent','Stylish boutique retreat near the Adam''s Peak trail with modern rooms, great food and serene mountain ambience.',14000,'https://www.booking.com/searchresults.html?ss=Slightly+Chilled+Adams+Peak',3
  -- BENTOTA
  UNION ALL SELECT 'Bentota','Weligama Bay Marriott Resort','🏖','comfortable',4,8.7,'Excellent','Beachfront Marriott resort with large pool, multiple restaurants and water sports on a stunning bay.',28000,'https://www.booking.com/hotel/lk/weligama-bay-marriott-resort.html',1
  UNION ALL SELECT 'Bentota','Induruwa Beach Resort','🌴','budget',3,8.0,'Very Good','Relaxed beachfront resort with bungalows, a pool and friendly service on a quiet stretch of the coast.',7500,'https://www.booking.com/searchresults.html?ss=Budget+Hotel+Bentota+Beach',2
  UNION ALL SELECT 'Bentota','Saman Villas','✨','luxury',5,9.4,'Exceptional','Award-winning clifftop boutique resort with plunge pools, sea views and some of Sri Lanka''s finest dining.',120000,'https://www.booking.com/hotel/lk/saman-villas.html',3
  -- JAFFNA
  UNION ALL SELECT 'Jaffna','Jetwing Jaffna','🏛','comfortable',4,8.6,'Excellent','The first international-standard hotel in Jaffna — a converted colonial bungalow with a rooftop pool and bar.',22000,'https://www.booking.com/hotel/lk/jetwing-jaffna.html',1
  UNION ALL SELECT 'Jaffna','Thalsevana Holiday Resort','🌊','comfortable',4,8.3,'Very Good','Beachfront resort with lagoon views, a pool and easy access to Jaffna''s sacred islands and colonial forts.',18000,'https://www.booking.com/searchresults.html?ss=Thalsevana+Jaffna',2
  -- HORTON PLAINS
  UNION ALL SELECT 'Horton Plains','Horton Plains Bungalow','🌫','comfortable',4,8.8,'Excellent','Atmospheric converted planter''s bungalow at the edge of the national park — the only accommodation within the park.',28000,'https://www.booking.com/searchresults.html?ss=Horton+Plains+Bungalow+Sri+Lanka',1
  UNION ALL SELECT 'Horton Plains','The Dickson Bungalow','🏡','luxury',5,9.1,'Superb','Private colonial estate surrounded by cloud forest with exclusive use accommodation, butler and gourmet meals.',75000,'https://www.booking.com/searchresults.html?ss=Luxury+Bungalow+Nuwara+Eliya+Horton+Plains',2
) AS h ON l.name = h.loc;


-- ═══════════════════════════════════════════════════════════
--  SEED DATA — Hotel Amenities
-- ═══════════════════════════════════════════════════════════

INSERT IGNORE INTO hotel_amenities (hotel_id, amenity)
SELECT h.id, a.amenity FROM hotels h
JOIN (
  -- Ella hotels
  SELECT 'Dream Cafe Ella' AS hotel,'Free WiFi' AS amenity UNION ALL SELECT 'Dream Cafe Ella','Mountain View' UNION ALL SELECT 'Dream Cafe Ella','Breakfast incl.' UNION ALL SELECT 'Dream Cafe Ella','Garden'
  UNION ALL SELECT 'Zion View Ella','Free WiFi' UNION ALL SELECT 'Zion View Ella','Terrace' UNION ALL SELECT 'Zion View Ella','Hot Water' UNION ALL SELECT 'Zion View Ella','Local Breakfast'
  UNION ALL SELECT 'Ninety Nine Trails','Free WiFi' UNION ALL SELECT 'Ninety Nine Trails','Restaurant' UNION ALL SELECT 'Ninety Nine Trails','Hiking Trails' UNION ALL SELECT 'Ninety Nine Trails','Room Service' UNION ALL SELECT 'Ninety Nine Trails','Nature Activities'
  UNION ALL SELECT 'Ella Flower Garden Resort','Free WiFi' UNION ALL SELECT 'Ella Flower Garden Resort','Pool' UNION ALL SELECT 'Ella Flower Garden Resort','Rooftop Bar' UNION ALL SELECT 'Ella Flower Garden Resort','Restaurant' UNION ALL SELECT 'Ella Flower Garden Resort','Mountain View'
  UNION ALL SELECT '98 Acres Resort & Spa','Infinity Pool' UNION ALL SELECT '98 Acres Resort & Spa','Spa' UNION ALL SELECT '98 Acres Resort & Spa','Fine Dining' UNION ALL SELECT '98 Acres Resort & Spa','Butler Service' UNION ALL SELECT '98 Acres Resort & Spa','Yoga'
  UNION ALL SELECT 'Aarunya Nature Resort','Private Pool' UNION ALL SELECT 'Aarunya Nature Resort','Spa' UNION ALL SELECT 'Aarunya Nature Resort','Organic Dining' UNION ALL SELECT 'Aarunya Nature Resort','Forest Walks' UNION ALL SELECT 'Aarunya Nature Resort','AC'
  -- Kandy hotels
  UNION ALL SELECT 'McLeod Inn','Free WiFi' UNION ALL SELECT 'McLeod Inn','Breakfast' UNION ALL SELECT 'McLeod Inn','City View' UNION ALL SELECT 'McLeod Inn','Hot Water'
  UNION ALL SELECT 'Thilanka Hotel','Free WiFi' UNION ALL SELECT 'Thilanka Hotel','Restaurant' UNION ALL SELECT 'Thilanka Hotel','Rooftop' UNION ALL SELECT 'Thilanka Hotel','AC'
  UNION ALL SELECT 'Earl''s Regency Hotel','Pool' UNION ALL SELECT 'Earl''s Regency Hotel','Spa' UNION ALL SELECT 'Earl''s Regency Hotel','Restaurant' UNION ALL SELECT 'Earl''s Regency Hotel','Free WiFi' UNION ALL SELECT 'Earl''s Regency Hotel','Gym'
  UNION ALL SELECT 'Hotel Suisse','Pool' UNION ALL SELECT 'Hotel Suisse','Garden' UNION ALL SELECT 'Hotel Suisse','Restaurant' UNION ALL SELECT 'Hotel Suisse','Free WiFi' UNION ALL SELECT 'Hotel Suisse','Bar'
  UNION ALL SELECT 'Amaya Hills Kandy','Infinity Pool' UNION ALL SELECT 'Amaya Hills Kandy','Spa' UNION ALL SELECT 'Amaya Hills Kandy','Fine Dining' UNION ALL SELECT 'Amaya Hills Kandy','Gym' UNION ALL SELECT 'Amaya Hills Kandy','Tennis'
  UNION ALL SELECT 'The Kandy House','Plunge Pool' UNION ALL SELECT 'The Kandy House','Butler' UNION ALL SELECT 'The Kandy House','Heritage Tours' UNION ALL SELECT 'The Kandy House','Fine Dining' UNION ALL SELECT 'The Kandy House','Library'
  -- Galle hotels
  UNION ALL SELECT 'Fort Bazaar Hostel','Free WiFi' UNION ALL SELECT 'Fort Bazaar Hostel','AC' UNION ALL SELECT 'Fort Bazaar Hostel','Shared Lounge'
  UNION ALL SELECT 'Closenberg Hotel','Free WiFi' UNION ALL SELECT 'Closenberg Hotel','Sea View' UNION ALL SELECT 'Closenberg Hotel','Pool' UNION ALL SELECT 'Closenberg Hotel','Restaurant'
  UNION ALL SELECT 'Jetwing Lighthouse','Pool' UNION ALL SELECT 'Jetwing Lighthouse','Spa' UNION ALL SELECT 'Jetwing Lighthouse','Restaurant' UNION ALL SELECT 'Jetwing Lighthouse','Free WiFi' UNION ALL SELECT 'Jetwing Lighthouse','Gym'
  UNION ALL SELECT 'Fort Printers','Rooftop Pool' UNION ALL SELECT 'Fort Printers','Art Gallery' UNION ALL SELECT 'Fort Printers','Restaurant' UNION ALL SELECT 'Fort Printers','Free WiFi' UNION ALL SELECT 'Fort Printers','Bar'
  UNION ALL SELECT 'Amangalle','Spa' UNION ALL SELECT 'Amangalle','Fine Dining' UNION ALL SELECT 'Amangalle','Pool' UNION ALL SELECT 'Amangalle','Butler' UNION ALL SELECT 'Amangalle','Yoga'
  UNION ALL SELECT 'Cape Weligama','Private Plunge Pool' UNION ALL SELECT 'Cape Weligama','Spa' UNION ALL SELECT 'Cape Weligama','Fine Dining' UNION ALL SELECT 'Cape Weligama','Infinity Pool' UNION ALL SELECT 'Cape Weligama','Butler'
  -- Mirissa
  UNION ALL SELECT 'Paradise Beach Club','Beach Access' UNION ALL SELECT 'Paradise Beach Club','Free WiFi' UNION ALL SELECT 'Paradise Beach Club','Bar'
  UNION ALL SELECT 'Mirissa Hills','Free WiFi' UNION ALL SELECT 'Mirissa Hills','Garden' UNION ALL SELECT 'Mirissa Hills','Hot Showers' UNION ALL SELECT 'Mirissa Hills','Breakfast'
  UNION ALL SELECT 'The Silan on Sea','Infinity Pool' UNION ALL SELECT 'The Silan on Sea','Free WiFi' UNION ALL SELECT 'The Silan on Sea','Restaurant' UNION ALL SELECT 'The Silan on Sea','Whale Watching'
  UNION ALL SELECT 'Sooriya Resort','Pool' UNION ALL SELECT 'Sooriya Resort','Rooftop Bar' UNION ALL SELECT 'Sooriya Resort','Free WiFi' UNION ALL SELECT 'Sooriya Resort','Snorkelling'
  UNION ALL SELECT 'Cantaloupe Levels Mirissa','Infinity Pool' UNION ALL SELECT 'Cantaloupe Levels Mirissa','Fine Dining' UNION ALL SELECT 'Cantaloupe Levels Mirissa','Spa' UNION ALL SELECT 'Cantaloupe Levels Mirissa','Butler'
  -- Sigiriya
  UNION ALL SELECT 'Sigiriya Village Hotel','Free WiFi' UNION ALL SELECT 'Sigiriya Village Hotel','Pool' UNION ALL SELECT 'Sigiriya Village Hotel','Garden' UNION ALL SELECT 'Sigiriya Village Hotel','Breakfast'
  UNION ALL SELECT 'Jetwing Vil Uyana','Pool' UNION ALL SELECT 'Jetwing Vil Uyana','Spa' UNION ALL SELECT 'Jetwing Vil Uyana','Restaurant' UNION ALL SELECT 'Jetwing Vil Uyana','Bird Watching'
  UNION ALL SELECT 'Aliya Resort & Spa','Infinity Pool' UNION ALL SELECT 'Aliya Resort & Spa','Spa' UNION ALL SELECT 'Aliya Resort & Spa','Restaurant' UNION ALL SELECT 'Aliya Resort & Spa','Elephant Watching'
  UNION ALL SELECT 'Water Garden Sigiriya','Private Pool' UNION ALL SELECT 'Water Garden Sigiriya','Fine Dining' UNION ALL SELECT 'Water Garden Sigiriya','Butler' UNION ALL SELECT 'Water Garden Sigiriya','Spa'
  -- Nuwara Eliya
  UNION ALL SELECT 'Grand Hotel Nuwara Eliya','Free WiFi' UNION ALL SELECT 'Grand Hotel Nuwara Eliya','Restaurant' UNION ALL SELECT 'Grand Hotel Nuwara Eliya','Garden' UNION ALL SELECT 'Grand Hotel Nuwara Eliya','Fireplace'
  UNION ALL SELECT 'Heritance Tea Factory','Pool' UNION ALL SELECT 'Heritance Tea Factory','Spa' UNION ALL SELECT 'Heritance Tea Factory','Tea Museum' UNION ALL SELECT 'Heritance Tea Factory','Restaurant' UNION ALL SELECT 'Heritance Tea Factory','Fireplace'
  UNION ALL SELECT 'St. Andrew''s Hotel','Golf Access' UNION ALL SELECT 'St. Andrew''s Hotel','Restaurant' UNION ALL SELECT 'St. Andrew''s Hotel','Bar' UNION ALL SELECT 'St. Andrew''s Hotel','Free WiFi' UNION ALL SELECT 'St. Andrew''s Hotel','Fireplace'
  UNION ALL SELECT 'Araliya Green Hills Hotel','Heated Pool' UNION ALL SELECT 'Araliya Green Hills Hotel','Spa' UNION ALL SELECT 'Araliya Green Hills Hotel','Fine Dining' UNION ALL SELECT 'Araliya Green Hills Hotel','Gym'
  -- Trincomalee
  UNION ALL SELECT 'Trinco Blu by Cinnamon','Pool' UNION ALL SELECT 'Trinco Blu by Cinnamon','Beach Access' UNION ALL SELECT 'Trinco Blu by Cinnamon','Water Sports' UNION ALL SELECT 'Trinco Blu by Cinnamon','Restaurant'
  UNION ALL SELECT 'Pigeon Island Beach Resort','Beach Access' UNION ALL SELECT 'Pigeon Island Beach Resort','Snorkelling' UNION ALL SELECT 'Pigeon Island Beach Resort','Restaurant' UNION ALL SELECT 'Pigeon Island Beach Resort','Free WiFi'
  UNION ALL SELECT 'Jungle Beach Hotel','Private Beach' UNION ALL SELECT 'Jungle Beach Hotel','Pool' UNION ALL SELECT 'Jungle Beach Hotel','Fine Dining' UNION ALL SELECT 'Jungle Beach Hotel','Kayaking'
  -- Yala
  UNION ALL SELECT 'Cinnamon Wild Yala','Safari Drives' UNION ALL SELECT 'Cinnamon Wild Yala','Pool' UNION ALL SELECT 'Cinnamon Wild Yala','Restaurant' UNION ALL SELECT 'Cinnamon Wild Yala','Free WiFi'
  UNION ALL SELECT 'Leopard Trails Yala','Game Drives' UNION ALL SELECT 'Leopard Trails Yala','Tented Suites' UNION ALL SELECT 'Leopard Trails Yala','All-inclusive' UNION ALL SELECT 'Leopard Trails Yala','Bush Dinners'
  UNION ALL SELECT 'Chena Huts by Uga Escapes','Private Guide' UNION ALL SELECT 'Chena Huts by Uga Escapes','Pool' UNION ALL SELECT 'Chena Huts by Uga Escapes','Fine Dining' UNION ALL SELECT 'Chena Huts by Uga Escapes','Butler'
  -- Arugam Bay
  UNION ALL SELECT 'Siam View Hotel','Beach Access' UNION ALL SELECT 'Siam View Hotel','Free WiFi' UNION ALL SELECT 'Siam View Hotel','Bar' UNION ALL SELECT 'Siam View Hotel','Surf Rentals'
  UNION ALL SELECT 'Stardust Hotel','Pool' UNION ALL SELECT 'Stardust Hotel','Surf School' UNION ALL SELECT 'Stardust Hotel','Restaurant' UNION ALL SELECT 'Stardust Hotel','Yoga'
  UNION ALL SELECT 'Spice Trail Hotel','Plunge Pool' UNION ALL SELECT 'Spice Trail Hotel','Fine Dining' UNION ALL SELECT 'Spice Trail Hotel','Spa' UNION ALL SELECT 'Spice Trail Hotel','Yoga'
  -- Hikkaduwa
  UNION ALL SELECT 'Coral Sands Hotel','Beach Access' UNION ALL SELECT 'Coral Sands Hotel','Snorkelling' UNION ALL SELECT 'Coral Sands Hotel','Free WiFi' UNION ALL SELECT 'Coral Sands Hotel','Restaurant'
  UNION ALL SELECT 'Hikka Tranz by Cinnamon','Pool' UNION ALL SELECT 'Hikka Tranz by Cinnamon','Water Sports' UNION ALL SELECT 'Hikka Tranz by Cinnamon','Restaurant' UNION ALL SELECT 'Hikka Tranz by Cinnamon','Beach Access'
  UNION ALL SELECT 'Amanwella Tangalle','Private Pool' UNION ALL SELECT 'Amanwella Tangalle','Fine Dining' UNION ALL SELECT 'Amanwella Tangalle','Spa' UNION ALL SELECT 'Amanwella Tangalle','Beach Access'
  -- Negombo
  UNION ALL SELECT 'Golden Star Beach Hotel','Free WiFi' UNION ALL SELECT 'Golden Star Beach Hotel','Beach Access' UNION ALL SELECT 'Golden Star Beach Hotel','Restaurant' UNION ALL SELECT 'Golden Star Beach Hotel','AC'
  UNION ALL SELECT 'Jetwing Blue','Pool' UNION ALL SELECT 'Jetwing Blue','Spa' UNION ALL SELECT 'Jetwing Blue','Restaurant' UNION ALL SELECT 'Jetwing Blue','Beach Access'
  UNION ALL SELECT 'Jetwing Lagoon','Water Villas' UNION ALL SELECT 'Jetwing Lagoon','Spa' UNION ALL SELECT 'Jetwing Lagoon','Fine Dining' UNION ALL SELECT 'Jetwing Lagoon','Butler'
  -- Colombo
  UNION ALL SELECT 'Colombo City Hotel','Free WiFi' UNION ALL SELECT 'Colombo City Hotel','AC' UNION ALL SELECT 'Colombo City Hotel','Restaurant'
  UNION ALL SELECT 'Cinnamon Grand Colombo','Pool' UNION ALL SELECT 'Cinnamon Grand Colombo','Spa' UNION ALL SELECT 'Cinnamon Grand Colombo','Restaurant' UNION ALL SELECT 'Cinnamon Grand Colombo','Gym' UNION ALL SELECT 'Cinnamon Grand Colombo','Free WiFi'
  UNION ALL SELECT 'Shangri-La Colombo','Infinity Pool' UNION ALL SELECT 'Shangri-La Colombo','Spa' UNION ALL SELECT 'Shangri-La Colombo','Fine Dining' UNION ALL SELECT 'Shangri-La Colombo','Butler' UNION ALL SELECT 'Shangri-La Colombo','Gym'
  -- Dambulla
  UNION ALL SELECT 'Almond Tree Inn','Free WiFi' UNION ALL SELECT 'Almond Tree Inn','Garden' UNION ALL SELECT 'Almond Tree Inn','Breakfast'
  UNION ALL SELECT 'Amaya Lake','Pool' UNION ALL SELECT 'Amaya Lake','Restaurant' UNION ALL SELECT 'Amaya Lake','Free WiFi' UNION ALL SELECT 'Amaya Lake','Bird Watching'
  UNION ALL SELECT 'Heritance Kandalama','Infinity Pool' UNION ALL SELECT 'Heritance Kandalama','Spa' UNION ALL SELECT 'Heritance Kandalama','Restaurant' UNION ALL SELECT 'Heritance Kandalama','Free WiFi' UNION ALL SELECT 'Heritance Kandalama','Nature Walks'
  -- Polonnaruwa
  UNION ALL SELECT 'The Lake Hotel Polonnaruwa','Free WiFi' UNION ALL SELECT 'The Lake Hotel Polonnaruwa','Restaurant' UNION ALL SELECT 'The Lake Hotel Polonnaruwa','Lake View'
  UNION ALL SELECT 'Deer Park Hotel','Pool' UNION ALL SELECT 'Deer Park Hotel','Restaurant' UNION ALL SELECT 'Deer Park Hotel','Free WiFi' UNION ALL SELECT 'Deer Park Hotel','Heritage Tours'
  -- Anuradhapura
  UNION ALL SELECT 'Ulagalla Resort','Infinity Pool' UNION ALL SELECT 'Ulagalla Resort','Spa' UNION ALL SELECT 'Ulagalla Resort','Fine Dining' UNION ALL SELECT 'Ulagalla Resort','Butler'
  UNION ALL SELECT 'Palm Garden Village Hotel','Pool' UNION ALL SELECT 'Palm Garden Village Hotel','Garden' UNION ALL SELECT 'Palm Garden Village Hotel','Restaurant' UNION ALL SELECT 'Palm Garden Village Hotel','Free WiFi'
  UNION ALL SELECT 'Hotel Tissawewa','Free WiFi' UNION ALL SELECT 'Hotel Tissawewa','Restaurant' UNION ALL SELECT 'Hotel Tissawewa','Garden'
  -- Pinnawala
  UNION ALL SELECT 'Elephant Bay Hotel','River View' UNION ALL SELECT 'Elephant Bay Hotel','Restaurant' UNION ALL SELECT 'Elephant Bay Hotel','Free WiFi' UNION ALL SELECT 'Elephant Bay Hotel','AC'
  UNION ALL SELECT 'Elephant Park Hotel','Garden' UNION ALL SELECT 'Elephant Park Hotel','Free WiFi' UNION ALL SELECT 'Elephant Park Hotel','Breakfast'
  -- Adam's Peak
  UNION ALL SELECT 'White House Dalhousie','Wake-up Call' UNION ALL SELECT 'White House Dalhousie','Packed Breakfast' UNION ALL SELECT 'White House Dalhousie','Free WiFi' UNION ALL SELECT 'White House Dalhousie','Hot Shower'
  UNION ALL SELECT 'Green View''s','Free WiFi' UNION ALL SELECT 'Green View''s','Home Cooking' UNION ALL SELECT 'Green View''s','Guide Service' UNION ALL SELECT 'Green View''s','Mountain View'
  UNION ALL SELECT 'Slightly Chilled','Restaurant' UNION ALL SELECT 'Slightly Chilled','Free WiFi' UNION ALL SELECT 'Slightly Chilled','Mountain View' UNION ALL SELECT 'Slightly Chilled','Guide Packages'
  -- Bentota
  UNION ALL SELECT 'Weligama Bay Marriott Resort','Pool' UNION ALL SELECT 'Weligama Bay Marriott Resort','Restaurant' UNION ALL SELECT 'Weligama Bay Marriott Resort','Water Sports' UNION ALL SELECT 'Weligama Bay Marriott Resort','Spa'
  UNION ALL SELECT 'Induruwa Beach Resort','Beach Access' UNION ALL SELECT 'Induruwa Beach Resort','Pool' UNION ALL SELECT 'Induruwa Beach Resort','Free WiFi' UNION ALL SELECT 'Induruwa Beach Resort','Restaurant'
  UNION ALL SELECT 'Saman Villas','Plunge Pool' UNION ALL SELECT 'Saman Villas','Fine Dining' UNION ALL SELECT 'Saman Villas','Spa' UNION ALL SELECT 'Saman Villas','Butler'
  -- Jaffna
  UNION ALL SELECT 'Jetwing Jaffna','Rooftop Pool' UNION ALL SELECT 'Jetwing Jaffna','Restaurant' UNION ALL SELECT 'Jetwing Jaffna','Bar' UNION ALL SELECT 'Jetwing Jaffna','Free WiFi'
  UNION ALL SELECT 'Thalsevana Holiday Resort','Pool' UNION ALL SELECT 'Thalsevana Holiday Resort','Restaurant' UNION ALL SELECT 'Thalsevana Holiday Resort','Beach Access' UNION ALL SELECT 'Thalsevana Holiday Resort','Free WiFi'
  -- Horton Plains
  UNION ALL SELECT 'Horton Plains Bungalow','Full Board' UNION ALL SELECT 'Horton Plains Bungalow','Park Access' UNION ALL SELECT 'Horton Plains Bungalow','Guided Walks' UNION ALL SELECT 'Horton Plains Bungalow','Fireplace'
  UNION ALL SELECT 'The Dickson Bungalow','Exclusive Use' UNION ALL SELECT 'The Dickson Bungalow','Butler' UNION ALL SELECT 'The Dickson Bungalow','Gourmet Meals' UNION ALL SELECT 'The Dickson Bungalow','Fireplace'
) AS a ON h.name = a.hotel;


-- ── Premium Plans ─────────────────────────────────────────────
-- These tables are required for the premium/subscription system.
-- They are auto-created by api/premium.php if missing, but
-- including them here ensures a clean single-file install.

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

-- Seed the 3 default plans (INSERT IGNORE skips if already present)
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
