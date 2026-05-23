-- ============================================================
-- PaceLokal Seed Data — Day 1
-- Beachhead: Purwokerto · Satria Running Club
-- ============================================================

-- Sample club
INSERT OR IGNORE INTO clubs (id, name, slug, city, province, description, plan, billing_status)
VALUES
  ('club_satria',    'Satria Running Club',     'satria-rc',    'Purwokerto', 'Jawa Tengah',
   'Komunitas pelari Purwokerto. Tiap Minggu pagi di Alun-Alun.', 'free', 'inactive'),
  ('club_kalibening', 'Kalibening Trail Crew',  'kalibening',   'Banjarnegara', 'Jawa Tengah',
   'Trail running di kaki Dieng. Pace easy, view juara.', 'free', 'inactive'),
  ('club_cilacap',   'Cilacap Coastal Runners', 'cilacap-cr',   'Cilacap', 'Jawa Tengah',
   'Pesisir selatan, angin laut, sunset run setiap Jumat.', 'pro',  'active');

-- Sample members
INSERT OR IGNORE INTO members (id, club_id, name, email, phone, role)
VALUES
  ('mem_001', 'club_satria',    'Budi Santoso',     'budi@example.com',  '+6281234567001', 'admin'),
  ('mem_002', 'club_satria',    'Ratna Wulandari',  'ratna@example.com', '+6281234567002', 'runner'),
  ('mem_003', 'club_satria',    'Joko Prabowo',     'joko@example.com',  '+6281234567003', 'coach'),
  ('mem_004', 'club_kalibening', 'Dian Hartanto',   'dian@example.com',  '+6281234567004', 'admin'),
  ('mem_005', 'club_cilacap',   'Sri Mulyani',      'sri@example.com',   '+6281234567005', 'admin');

-- Sample runs (last week)
INSERT OR IGNORE INTO runs (id, member_id, club_id, distance_km, duration_sec, pace_min_km, run_date, source, verified)
VALUES
  ('run_001', 'mem_001', 'club_satria', 5.20, 1872, 6.00, date('now','-1 day'),  'manual', 1),
  ('run_002', 'mem_002', 'club_satria', 10.05, 3315, 5.50, date('now','-2 day'), 'strava', 1),
  ('run_003', 'mem_003', 'club_satria', 21.10, 6963, 5.50, date('now','-3 day'), 'garmin', 1),
  ('run_004', 'mem_004', 'club_kalibening', 7.50, 3150, 7.00, date('now','-1 day'), 'manual', 0),
  ('run_005', 'mem_005', 'club_cilacap',    8.20, 2706, 5.50, date('now'),         'manual', 1);

-- Sample events
INSERT OR IGNORE INTO events (id, club_id, title, description, event_date, event_time, location, distance_km, max_participants, fee_idr, status)
VALUES
  ('evt_001', 'club_satria', 'Sunday Long Run · Alun-Alun → GOR Satria',
    'Pace easy 6:00-6:30. Free for all. Coffee setelah selesai.',
    date('now','+5 days'), '05:30', 'Alun-Alun Purwokerto', 10.0, 50, 0, 'open'),

  ('evt_002', 'club_satria', 'PaceLokal Race #1 · 5K Purwokerto Tempo',
    'Race resmi pertama PaceLokal. 5K dengan timing chip. Medali finisher untuk semua.',
    date('now','+30 days'), '06:00', 'Stadion Mini Purwokerto', 5.0, 100, 49000, 'open'),

  ('evt_003', 'club_kalibening', 'Trail Dieng · Sunrise 12K',
    'Trail run kaki Dieng. Wajib bawa hydration vest + headlamp.',
    date('now','+14 days'), '04:00', 'Basecamp Kalibening', 12.0, 25, 75000, 'open'),

  ('evt_004', 'club_cilacap', 'Coastal Sunset 8K (FREE for Pro members)',
    'Jumat sore, pesisir Teluk Penyu. Member Pro: gratis. Public: Rp 25.000.',
    date('now','+7 days'), '16:30', 'Teluk Penyu Cilacap', 8.0, 40, 25000, 'open');
