-- ============================================================
-- 0001_auth_and_kurator.sql
-- KuratorKas × Curator.OS — initial schema (auth + core entities)
-- Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
-- ============================================================

-- ----- USERS ------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,             -- PBKDF2-SHA256 derived hash
  password_salt   TEXT NOT NULL,             -- per-user random salt (hex)
  name            TEXT NOT NULL,
  business_name   TEXT,
  business_type   TEXT CHECK (business_type IN ('retail','online','hybrid')) DEFAULT 'retail',
  subscription    TEXT CHECK (subscription   IN ('free','starter','pro','enterprise')) DEFAULT 'free',
  role            TEXT CHECK (role           IN ('user','admin','support')) DEFAULT 'user',
  is_active       INTEGER NOT NULL DEFAULT 1,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ----- REFRESH TOKENS / SESSIONS ----------------------------
CREATE TABLE IF NOT EXISTS sessions (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL,
  refresh_token   TEXT UNIQUE NOT NULL,      -- random opaque token (32-byte hex)
  user_agent      TEXT,
  ip              TEXT,
  expires_at      DATETIME NOT NULL,
  revoked         INTEGER NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_sessions_user        ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_refresh     ON sessions(refresh_token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires     ON sessions(expires_at);

-- ----- PRODUCTS (Curator-OS Stylist input) ------------------
CREATE TABLE IF NOT EXISTS products (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  price           INTEGER NOT NULL,          -- IDR (no decimals)
  stock           INTEGER NOT NULL DEFAULT 0,
  category        TEXT,
  images_json     TEXT,                      -- JSON array of URLs
  is_active       INTEGER NOT NULL DEFAULT 1,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_products_user     ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- ----- AI STYLIST OUTFITS -----------------------------------
CREATE TABLE IF NOT EXISTS outfits (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL,
  occasion        TEXT,                      -- e.g. "kondangan", "kerja", "santai"
  vibe            TEXT,                      -- e.g. "elegan", "kasual", "edgy"
  items_json      TEXT NOT NULL,             -- JSON: [{productId,role,note}]
  caption         TEXT,
  saved           INTEGER NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_outfits_user ON outfits(user_id);

-- ----- CONTENT (Content Curator output) ---------------------
CREATE TABLE IF NOT EXISTS contents (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER NOT NULL,
  channel         TEXT NOT NULL CHECK (channel IN ('instagram','tiktok','shopee','tokopedia','other')),
  kind            TEXT NOT NULL CHECK (kind    IN ('caption','hashtags','script','copy')),
  topic           TEXT,
  body            TEXT NOT NULL,
  scheduled_at    DATETIME,
  published_at    DATETIME,
  status          TEXT CHECK (status IN ('draft','scheduled','published','archived')) DEFAULT 'draft',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_contents_user   ON contents(user_id);
CREATE INDEX IF NOT EXISTS idx_contents_status ON contents(status);

-- ----- TRENDS (Trend Curator cache) -------------------------
CREATE TABLE IF NOT EXISTS trends (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  source          TEXT NOT NULL CHECK (source IN ('tiktok','instagram','shopee','tokopedia','manual')),
  keyword         TEXT NOT NULL,
  score           REAL NOT NULL,             -- 0..1 trend score
  metadata_json   TEXT,                      -- raw payload
  captured_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_trends_source  ON trends(source);
CREATE INDEX IF NOT EXISTS idx_trends_keyword ON trends(keyword);

-- ----- AUDIT LOG --------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER,
  action          TEXT NOT NULL,             -- e.g. "auth.login", "product.create"
  detail_json     TEXT,
  ip              TEXT,
  user_agent      TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_user   ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
