-- Seed for local dev — safe (no real passwords).
-- Note: actual users register via /api/v1/auth/register (password hashed at runtime).

INSERT OR IGNORE INTO trends (source, keyword, score, metadata_json) VALUES
  ('tiktok',    'oversized blazer',   0.92, '{"region":"ID","sample":1}'),
  ('tiktok',    'coastal cowgirl',    0.78, '{"region":"ID","sample":1}'),
  ('instagram', 'minimalist hijab',   0.85, '{"region":"ID","sample":1}'),
  ('shopee',    'kebaya modern',      0.71, '{"region":"ID","sample":1}'),
  ('tokopedia', 'streetwear y2k',     0.66, '{"region":"ID","sample":1}');
