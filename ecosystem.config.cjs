// ============================================================
// PaceLokal — PM2 process config (LOCAL SANDBOX DEV ONLY)
//
// Root-cause fix (2026-05-23):
//   The previous config invoked `wrangler pages dev dist` WITHOUT the
//   D1 binding flag. At runtime `c.env.DB` was undefined and every API
//   route crashed with "Cannot read property 'prepare' of undefined".
//
//   Wrangler 4.x reads d1_databases from wrangler.jsonc by default, BUT
//   `pages dev` only loads them when `--local` is passed AND wrangler
//   can locate the persistence dir. Passing the explicit
//   `--d1 DB=pacelokal-production` flag is the most reliable form across
//   wrangler 3.x/4.x and survives `.wrangler/` cache resets.
// ============================================================
module.exports = {
  apps: [
    {
      name: 'pacelokal',
      script: 'npx',
      // NOTE: do NOT pass --d1 — wrangler 4.x reads d1_databases from
      // wrangler.jsonc automatically. Passing --d1 creates a *separate*
      // local DB shadow (different hash) which is EMPTY → "no such table".
      // The migrations live in the wrangler.jsonc-declared DB only.
      args: 'wrangler pages dev dist --local --ip 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 5,
      min_uptime: '10s',
    },
  ],
}
