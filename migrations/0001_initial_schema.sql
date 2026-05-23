-- ============================================================
-- PaceLokal D1 Schema — Initial Migration
-- Doctrine: DOC-R Sovereign Running Strategy v1.0
-- Tables: clubs, members, runs, events
-- ============================================================

-- Clubs (tenants) — each running club = tenant
CREATE TABLE IF NOT EXISTS clubs (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  city          TEXT NOT NULL,
  province      TEXT DEFAULT 'Jawa Tengah',
  description   TEXT,
  logo_url      TEXT,
  owner_user_id TEXT,
  plan          TEXT NOT NULL DEFAULT 'free',   -- free | pro
  billing_status TEXT NOT NULL DEFAULT 'inactive', -- inactive | active | expired
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_clubs_city ON clubs(city);
CREATE INDEX IF NOT EXISTS idx_clubs_slug ON clubs(slug);

-- Members of a club
CREATE TABLE IF NOT EXISTS members (
  id          TEXT PRIMARY KEY,
  club_id     TEXT NOT NULL,
  name        TEXT NOT NULL,
  email       TEXT,
  phone       TEXT,
  role        TEXT NOT NULL DEFAULT 'runner',  -- runner | coach | admin
  joined_at   INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_members_club ON members(club_id);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

-- Runs logged by members (Layer 3 on top of Strava/Garmin)
CREATE TABLE IF NOT EXISTS runs (
  id            TEXT PRIMARY KEY,
  member_id     TEXT NOT NULL,
  club_id       TEXT NOT NULL,
  distance_km   REAL NOT NULL,
  duration_sec  INTEGER NOT NULL,
  pace_min_km   REAL,                 -- derived: (duration_sec/60) / distance_km
  run_date      TEXT NOT NULL,        -- ISO date YYYY-MM-DD
  source        TEXT DEFAULT 'manual', -- manual | strava | garmin
  external_ref  TEXT,                 -- Strava activity id, etc.
  notes         TEXT,
  verified      INTEGER NOT NULL DEFAULT 0,
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_runs_member ON runs(member_id);
CREATE INDEX IF NOT EXISTS idx_runs_club ON runs(club_id);
CREATE INDEX IF NOT EXISTS idx_runs_date ON runs(run_date);

-- Events (races, group runs, training sessions)
CREATE TABLE IF NOT EXISTS events (
  id                TEXT PRIMARY KEY,
  club_id           TEXT NOT NULL,
  title             TEXT NOT NULL,
  description       TEXT,
  event_date        TEXT NOT NULL,    -- ISO date YYYY-MM-DD
  event_time        TEXT,             -- HH:MM 24h
  location          TEXT NOT NULL,
  distance_km       REAL,
  max_participants  INTEGER,
  fee_idr           INTEGER DEFAULT 0,    -- 0 = free
  status            TEXT NOT NULL DEFAULT 'open',  -- open | closed | cancelled | done
  created_at        INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_events_club ON events(club_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id          TEXT PRIMARY KEY,
  event_id    TEXT NOT NULL,
  member_id   TEXT,                  -- nullable: external registrant
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  status      TEXT NOT NULL DEFAULT 'pending', -- pending | paid | refunded | cancelled
  amount_idr  INTEGER DEFAULT 0,
  obp_invoice_id TEXT,               -- link to OBP invoice if paid
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_event_regs_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_regs_obp ON event_registrations(obp_invoice_id);
