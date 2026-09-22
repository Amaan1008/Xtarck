# Xtrack — Setup Guide

## Folder Structure
```
Xtrack/
├── index.html          ← Landing page
├── login.html          ← User login
├── signup.html         ← User signup
├── dashboard.html      ← User dashboard (trips, reviews, profile)
├── xtrack.html         ← Main trip planner app
├── admin/
│   ├── login.html      ← Admin login  (admin@xtrack.com / Admin@123)
│   └── dashboard.html  ← Admin console
├── api/
│   ├── login.php       ← User login (checks banned status)
│   ├── signup.php
│   ├── logout.php
│   ├── check_auth.php
│   ├── profile.php
│   ├── trips.php
│   ├── reviews.php
│   ├── announcements.php ← Returns active announcements to user dashboard
│   └── admin/
│       ├── admin_session.php
│       ├── login.php
│       ├── logout.php
│       ├── check_auth.php
│       ├── users.php         ← View/ban/unban/delete users
│       ├── trips.php         ← View/delete all trips
│       ├── reviews.php       ← View/delete all reviews
│       ├── stats.php         ← Platform statistics
│       └── announcements.php ← Post/toggle/delete announcements
├── config/
│   ├── db.php          ← Database credentials (edit this)
│   └── session.php     ← CORS + session helpers
└── database.sql        ← Import this FIRST
```

---

## Step 1 — Import the Database

### Option A: phpMyAdmin
1. Open phpMyAdmin → click **Import**
2. Choose `database.sql` → click **Go**

### Option B: Terminal
```bash
mysql -u root -p < database.sql
```

This creates the `xtrack_db` database with all 5 tables:
- `users` — customer accounts (with `status` active/banned)
- `trips` — saved trip plans
- `reviews` — place reviews
- `admins` — admin accounts (separate from users)
- `announcements` — admin broadcasts shown on user dashboard

---

## Step 2 — Configure Database Credentials

Edit `config/db.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'xtrack_db');
define('DB_USER', 'root');      // ← your MySQL username
define('DB_PASS', '');          // ← your MySQL password
```

---

## Step 3 — Deploy

Place the entire `Xtrack/` folder inside your web server root:
- **XAMPP**: `C:/xampp/htdocs/Xtrack/`
- **WAMP**:  `C:/wamp64/www/Xtrack/`
- **Linux**: `/var/www/html/Xtrack/`

Then open: `http://localhost/Xtrack/`

---

## Default Admin Account

| Field    | Value              |
|----------|--------------------|
| URL      | `/Xtrack/admin/login.html` |
| Email    | `admin@xtrack.com` |
| Password | `Admin@123`        |

⚠️ **Change the password immediately after first login.**

---

## Admin Capabilities

| Feature              | What the admin can do |
|----------------------|-----------------------|
| **Users**            | View all users, trip count, review count, phone, join date |
| **Ban / Unban**      | Banned users are blocked from logging in |
| **Delete users**     | Permanently removes user + all their trips & reviews |
| **Trips**            | View all saved trips, see selected places, budget, days |
| **Reviews**          | View all place reviews with ratings and travel tips |
| **Stats**            | Platform-wide counters, top-rated places, user growth |
| **Announcements**    | Post banners that appear on the customer dashboard |

---

## Upgrading from an Older Version

If your database already exists from an older version, run these migrations:
```sql
ALTER TABLE users ADD COLUMN phone  VARCHAR(30) DEFAULT NULL AFTER password_hash;
ALTER TABLE users ADD COLUMN status ENUM('active','banned') NOT NULL DEFAULT 'active' AFTER phone;

CREATE TABLE IF NOT EXISTS admins (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    fullname VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    last_login DATETIME DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_admin_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS announcements (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    admin_id INT UNSIGNED NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info','warning','success') NOT NULL DEFAULT 'info',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_ann_admin FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO admins (fullname, email, password_hash) VALUES
('Super Admin', 'admin@xtrack.com', '$2y$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMqJqhN8/LewHCB7FqMM6Oz3/i')
ON DUPLICATE KEY UPDATE fullname = fullname;
```

---

## Frontend: TypeScript Source

The backend (`api/`, `config/`, `*.sql`) is plain PHP/MySQL, unchanged — deploy it as described above. The frontend's inline JavaScript has been converted to TypeScript. The compiled `.js` the HTML pages actually load is already checked in under `js/`, so **the site runs as-is with no build step required.** You only need to build if you plan to edit the `.ts` source.

### Layout
```
ts/
├── shared/
│   ├── types.ts     ← Interfaces for User, Trip, Hotel, Location, etc.
│   ├── dom.ts        ← $()/$q()/$qa() DOM lookup helpers (see comments inside)
│   └── globals.ts    ← Ambient declarations for Chart.js / Leaflet / jsPDF
└── pages/
    ├── index.ts, login.ts, signup.ts, onboarding.ts,
    ├── dashboard.ts, xtrack.ts,
    └── admin-login.ts, admin-dashboard.ts   ← one file per HTML page

tsconfig/            ← one tsconfig per page (compiled as an isolated program —
                        see the comment in scripts/build.mjs for why)
js/                   ← compiled output the HTML pages load; committed, not gitignored
```

Each HTML page loads its compiled JS as three plain (non-module) `<script>` tags, e.g.:
```html
<script src="js/shared/dom.js"></script>
<script src="js/shared/globals.js"></script>
<script src="js/pages/xtrack.js"></script>
```
Everything stays in global scope on purpose — the original app's `onclick="..."` HTML attributes call these functions directly, and turning the pages into real ES modules would break that.

### Building after an edit
```bash
npm install     # once, installs the TypeScript compiler (devDependency only)
npm run build    # compiles every ts/pages/*.ts into js/pages/*.js
```
`npm run build` runs `scripts/build.mjs`, which invokes `tsc` once per page (`tsconfig/<page>.json`) rather than one combined compile. This matters: a couple of pages declare same-named top-level data (e.g. both `dashboard.ts` and `onboarding.ts` have their own unrelated `const PLACES`), which would collide if every file were type-checked together. Compiling per-page keeps each page's globals isolated for the compiler while still emitting plain global-scope JS at runtime.

### What changed vs. the original inline JS
This was a structural move (inline `<script>` → `.ts` files + a build step), not a rewrite — the logic is line-for-line the same. Two exceptions worth knowing about, both were required to satisfy the TypeScript compiler:
- A few functions (`switchA`, `switchB` in `xtrack.ts`; `showPanel` in `dashboard.ts`) were changed from `function foo(){}` to `var foo = function(){}`, because later code in the same file reassigns them (a monkey-patch pattern) and TypeScript doesn't allow reassigning a plain `function` declaration. `var` (not `let`) was used specifically so `window.foo` still resolves, since other code reads it that way.
- A handful of functions were dead code even in the original app: `saveTrip`, `renderSavedTrips`, `loadSavedTrip`, `deleteSavedTrip`, `finalizeTrip`, `submitReview`, `getReviews`, `getRating` were each defined twice in `xtrack.ts` (an early localStorage-based version, later fully replaced by a server-backed version). JavaScript's function-hoisting means the *later* definition always won and the earlier body never ran, even in the original file — TypeScript won't allow two same-named functions, so the dead earlier versions were renamed to `_legacy_*` (kept, not deleted) rather than silently removed.

Also flagged, not fixed (pre-existing, harmless): `xtrack.ts` calls `populateDestSelects()` and `refreshCategoryDestinations()` behind a `typeof x === 'function'` guard, but neither function is defined anywhere in the codebase — the guard means the calls safely never fire, but it's worth knowing these are unimplemented if that feature was meant to exist.
