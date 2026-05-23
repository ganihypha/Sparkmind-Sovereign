// ============================================================
// PaceLokal — Main App Entry
// Sub-brand #2 of SparkMind Sovereign · Hyperlocal Running
// Owner: Reza Estes / Haidar — Sovereign AI Dev
// Doctrine: Master-Architect v7.0 · OBP HYBRID MoR LOCK
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/cloudflare-workers'

import type { Bindings, Variables } from './lib/types'
import healthRoute from './routes/health'
import clubsRoute from './routes/clubs'
import runsRoute from './routes/runs'
import eventsRoute from './routes/events'
import paymentsRoute from './routes/payments'

import { LANDING_HTML } from './pages/landing'
import { DASHBOARD_HTML } from './pages/dashboard'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.use('*', logger())
app.use('/api/*', cors())

// ---------- Static assets (public/static/* → /static/*) ----------
app.use('/static/*', serveStatic({ root: './' }))
app.get('/favicon.ico', serveStatic({ path: './static/favicon.svg' }))

// ---------- API routes ----------
app.route('/api/health', healthRoute)
app.route('/api/clubs', clubsRoute)
app.route('/api/runs', runsRoute)
app.route('/api/events', eventsRoute)
app.route('/api/payments', paymentsRoute)

// Convenience aliases (Doctrine: payments under /api/payments/*)
app.route('/webhooks/obp', new Hono().all('/', async (c) => {
  // Forward to the payments webhook handler for backwards-compat path
  const url = new URL(c.req.url)
  url.pathname = '/api/payments/webhooks/obp'
  return fetch(new Request(url.toString(), c.req.raw))
}))

// ---------- Aggregate stats endpoint (used by landing hero) ----------
app.get('/api/stats', async (c) => {
  const [clubs, members, runs, kmRow] = await Promise.all([
    c.env.DB.prepare(`SELECT COUNT(*) AS n FROM clubs`).first<{ n: number }>(),
    c.env.DB.prepare(`SELECT COUNT(*) AS n FROM members`).first<{ n: number }>(),
    c.env.DB.prepare(`SELECT COUNT(*) AS n FROM runs`).first<{ n: number }>(),
    c.env.DB.prepare(`SELECT COALESCE(SUM(distance_km),0) AS km FROM runs`).first<{ km: number }>(),
  ])
  return c.json({
    success: true,
    stats: {
      clubs: clubs?.n || 0,
      members: members?.n || 0,
      runs: runs?.n || 0,
      total_km: Math.round((kmRow?.km || 0) * 10) / 10,
    },
  })
})

// ---------- SEO ----------
app.get('/robots.txt', (c) =>
  c.text(`User-agent: *
Allow: /
Sitemap: https://pacelokal.pages.dev/sitemap.xml
`))

app.get('/sitemap.xml', (c) => {
  const base = 'https://pacelokal.pages.dev'
  const urls = ['', '/dashboard', '/api/health', '/api/payments/doctrine']
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${base}${p}</loc><changefreq>weekly</changefreq><priority>${p === '' ? '1.0' : '0.6'}</priority></url>`).join('\n')}
</urlset>`
  return c.body(xml, 200, { 'Content-Type': 'application/xml' })
})

// ---------- Pages ----------
app.get('/', (c) => c.html(LANDING_HTML))
app.get('/dashboard', (c) => c.html(DASHBOARD_HTML))
app.get('/payment/return', (c) => {
  const ref = c.req.query('ref') || ''
  return c.html(`<!DOCTYPE html>
<html lang="id"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pembayaran — PaceLokal</title>
<script src="https://cdn.tailwindcss.com"></script>
</head><body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6">
<div class="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center">
  <div class="text-5xl mb-4">⏳</div>
  <h1 class="text-2xl font-black mb-2">Terima kasih</h1>
  <p class="text-slate-400 mb-4">Reference: <code class="text-emerald-400">${ref || '-'}</code></p>
  <p class="text-sm text-slate-400 mb-6">Status pembayaran akan diupdate otomatis oleh webhook OBP. Cek <a class="text-emerald-400 hover:underline" href="/dashboard">dashboard</a> untuk konfirmasi.</p>
  <a href="/" class="inline-block px-5 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold">← Beranda</a>
</div></body></html>`)
})

// ---------- 404 ----------
app.notFound((c) => {
  if (c.req.path.startsWith('/api/')) {
    return c.json({ success: false, error: 'Not found', path: c.req.path }, 404)
  }
  return c.html(`<!DOCTYPE html><html><head><title>404 — PaceLokal</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center"><div class="text-center"><div class="text-6xl font-black text-emerald-400">404</div><div class="mt-2 text-slate-400">Halaman tidak ditemukan</div><a href="/" class="mt-4 inline-block px-4 py-2 bg-emerald-500 text-slate-950 rounded font-bold">← Home</a></div></body></html>`, 404)
})

app.onError((err, c) => {
  console.error('App error:', err)
  return c.json({ success: false, error: err?.message || 'Internal Server Error' }, 500)
})

export default app
