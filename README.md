# PaceLokal — Hyperlocal Running Platform

> **Sub-brand #2 of SparkMind Sovereign ecosystem**
> Doctrine: `MASTER-ARCHITECT-PROMPT v7.0` · OBP HYBRID MERCHANT-OF-RECORD LOCK
> Status: 🟢 EXECUTE-READY · DAY-1 SCAFFOLD COMPLETE · OBP-INTEGRATED

## 🎯 Project Overview

- **Name**: PaceLokal
- **Niche**: Hyperlocal running — komunitas pelari lokal Indonesia
- **Positioning**: **Layer 3** on top of Strava / Garmin (bukan pengganti GPS tracker)
- **Beachhead**: Purwokerto · Banyumas Raya
- **Expansion**: Banyumas Raya → Jawa Tengah → Indonesia
- **Multi-tenant**: 1 klub = 1 tenant (mirip pattern BarberKas)
- **Stack**: Hono + Cloudflare Pages/Workers + D1 + (KV/R2 future) + TypeScript

## 🏛️ 4-Layer Architecture Lock

| Layer | Entity | Domain |
|------|--------|--------|
| **1 · Brand** | **PaceLokal** (this app) | `pacelokal.sparkmind.web.id` |
| **2 · Merchant** | **Oasis BI Pro (MoR)** | `oasis-bi-pro.web.id`, `pay.oasis-bi-pro.web.id/pl/*` |
| **3 · Domain** | Cloudflare Pages | `pacelokal.pages.dev` (mirror) |
| **4 · Compliance** | UU PDP · PSE Kominfo | umbrella under OBP |

**Mandatory disclosure (every checkout & receipt):**
> *Pembayaran diproses oleh Oasis BI Pro (oasis-bi-pro.web.id) sebagai Merchant-of-Record untuk ekosistem SparkMind. Pemrosesan kartu/bank melalui PJP Duitku/Xendit yang terdaftar di Bank Indonesia.*

## 🔗 Companion Repos

| Repo | Role |
|------|------|
| [Sparkmind-Sovereign](https://github.com/ganihypha/Sparkmind-Sovereign) | Mother monorepo · SSOT · subtree of this app at `apps/pacelokal/` |
| [oasis-bi-pro](https://github.com/ganihypha/oasis-bi-pro) | Merchant-of-Record backend (Duitku D20919 live) |
| [Pacelokal](https://github.com/ganihypha/Pacelokal) | **This repo** — Standalone sub-brand app |

## ✅ Currently Completed Features

- **Clubs (tenants)** — CRUD + per-club stats (members, runs, total km)
- **Members** — seed data: Satria Running Club, Kalibening Trail Crew, Cilacap Coastal Runners
- **Runs logging** — manual / Strava / Garmin source field; pace auto-derived
- **Events** — list, detail, registration; supports free + paid
- **OBP Payment Integration (Layer 2)**
  - Create invoice at OBP for **event registration** (paid events)
  - Create invoice at OBP for **club Pro upgrade** (Rp 49.000/month)
  - **Webhook handler** with HMAC-SHA256 signature verification
  - Side effects on settle: registration → `paid`, club → `pro/active`
  - Dev-mode fallback: simulated OBP checkout URL when `OBP_API_KEY` not set (full local flow testing)
- **Leaderboard** — sum km + avg pace per member, 30-day window
- **Aggregate stats** — `/api/stats` (clubs, members, runs, total km)
- **Landing page** — sovereign dark theme, semantic HTML, OG image
- **Operator dashboard** at `/dashboard` — invoices, weekly runs
- **SEO** — `/robots.txt`, `/sitemap.xml`
- **404 + error pages** — themed JSON for API, HTML for pages

## 🌐 Functional Entry URIs

### Public pages
| Path | Description |
|------|-------------|
| `GET /` | Landing page (hero, klub, event, pricing, leaderboard) |
| `GET /dashboard` | Operator dashboard (invoices, weekly stats) |
| `GET /payment/return?ref=<external_ref>` | Post-checkout redirect (status pending update via webhook) |
| `GET /robots.txt` · `GET /sitemap.xml` | SEO |

### API — meta
| Method · Path | Body / Query | Returns |
|--------------|--------------|---------|
| `GET /api/health` | — | Service + bindings + doctrine info |
| `GET /api/stats` | — | `{clubs, members, runs, total_km}` |

### API — clubs
| Method · Path | Body / Query | Returns |
|--------------|--------------|---------|
| `GET /api/clubs` | `?city=&limit=` | List clubs |
| `GET /api/clubs/:idOrSlug` | — | Single club + stats |
| `POST /api/clubs` | `{name, slug, city, province?, description?}` | New club |
| `GET /api/clubs/:idOrSlug/leaderboard` | — | Top 50 members by km (30 days) |

### API — runs
| Method · Path | Body / Query | Returns |
|--------------|--------------|---------|
| `GET /api/runs` | `?club_id=&member_id=&limit=` | List runs |
| `POST /api/runs` | `{member_id, club_id, distance_km, duration_sec, run_date, source?, notes?}` | New run; pace auto-derived |
| `GET /api/runs/summary/weekly` | `?club_id=` | Last 7 days aggregate |

### API — events
| Method · Path | Body / Query | Returns |
|--------------|--------------|---------|
| `GET /api/events` | `?club_id=&status=&upcoming=true&limit=` | List events |
| `GET /api/events/:id` | — | Single event + registration counts |
| `POST /api/events` | `{club_id, title, event_date, location, fee_idr?, max_participants?, ...}` | New event |

### API — payments (OBP MoR routing) ⭐
| Method · Path | Body / Query | Returns |
|--------------|--------------|---------|
| `GET /api/payments/doctrine` | — | Layer-2 disclosure + doctrine refs |
| `GET /api/payments/invoices` | `?limit=` | Recent invoices |
| `GET /api/payments/invoices/:externalRef` | — | Lookup local invoice |
| `POST /api/payments/event/:eventId/register` | `{name, email, phone?, member_id?}` | Free → register direct; Paid → OBP invoice + checkout URL |
| `POST /api/payments/club/:clubId/upgrade-pro` | `{name, email, phone?}` | OBP invoice for Rp 49.000/month |
| `POST /api/payments/webhooks/obp` | (raw JSON) Header `X-OBP-Signature` | HMAC-verified status update + side effects · **idempotent on replay** |
| `POST /api/payments/dev/simulate-settle/:externalRef` | — | **DEV ONLY** · forge a `payment.settled` webhook (disabled in prod when real `OBP_WEBHOOK_SECRET` is set) |

### Example: register for a paid event

```bash
curl -s -X POST http://localhost:3000/api/payments/event/evt_002/register \
  -H 'content-type: application/json' \
  -d '{"name":"Budi","email":"budi@example.com","phone":"+628111111111"}' | jq .
```

Returns (dev mode — simulated OBP):
```json
{
  "success": true,
  "registration_id": "reg_...",
  "external_ref": "PL-EVT-20260523-XXXXXX",
  "checkout_url": "https://pay.oasis-bi-pro.web.id/checkout/dev?ref=...",
  "amount_idr": 49000,
  "merchant_of_record": "Oasis BI Pro",
  "pjp_provider": "duitku",
  "disclosure": "Pembayaran diproses oleh Oasis BI Pro..."
}
```

### Example: simulate OBP webhook (dev)

```bash
curl -s -X POST http://localhost:3000/api/payments/webhooks/obp \
  -H 'content-type: application/json' \
  -H 'X-OBP-Signature: dev' \
  -d '{"event":"payment.settled","external_ref":"PL-EVT-...","invoice_id":"obp_dev_..."}'
```

## 🗃️ Data Architecture

### Storage Service
- **Cloudflare D1** (SQLite) — primary store (`pacelokal-production`)
- **Migrations** in `migrations/0001_initial_schema.sql` + `0002_obp_payments.sql`
- **Seed** in `seed.sql` — 3 clubs, 5 members, 5 runs, 4 events

### Tables
| Table | Purpose |
|-------|---------|
| `clubs` | Tenant entities · `plan` (free/pro) + `billing_status` driven by OBP webhook |
| `members` | Runners belonging to clubs |
| `runs` | Logged activities (manual/strava/garmin) with derived pace |
| `events` | Race / group run / training calendar |
| `event_registrations` | Pending/paid registrations · `obp_invoice_id` links to OBP |
| `obp_invoices` | All invoices created at OBP (Layer-2 MoR) — full audit trail |
| `obp_webhook_log` | Every inbound webhook (signature_ok flag + raw payload) |

### Data Flow (OBP MoR)

```
Customer click "Daftar" / "Upgrade Pro"
  → PaceLokal /api/payments/* creates local pending row
  → fetch POST https://pay.oasis-bi-pro.web.id/v1/invoices (with sub_brand_id=pacelokal, Bearer OBP_API_KEY)
  → OBP forwards to Duitku/Xendit → returns checkout_url
  → Customer pays → PJP settles to OBP bank
  → OBP fires POST /api/payments/webhooks/obp (X-OBP-Signature)
  → PaceLokal verifies HMAC-SHA256 → updates obp_invoices.status → applies side effects
  → Club becomes Pro / registration becomes paid
```

## 🛠️ User Guide (Developer)

### Local development

```bash
# Install
npm install                    # 300s timeout — Cloudflare deps are large

# First-time build
npm run build

# Apply D1 migrations to local SQLite
npm run db:migrate:local

# Seed sample data
npm run db:seed:local

# Start (PM2 — daemon, port 3000)
pm2 start ecosystem.config.cjs
curl http://localhost:3000/api/health | head -c 400
```

### Reset local DB
```bash
npm run db:reset:local
```

### View live logs (non-blocking)
```bash
pm2 logs pacelokal --nostream
```

## 🚀 Deployment — 🟢 LIVE

- **Platform**: Cloudflare Pages
- **Project**: `pacelokal`
- **Status**: ✅ **DEPLOYED & VERIFIED · 2026-05-23**
- **Production URL**: **https://pacelokal.pages.dev**
- **Deploy preview**: https://43bbc5d1.pacelokal.pages.dev
- **D1 Database**: `pacelokal-production` (UUID `76db8c12-72e1-4d5b-94aa-2524fb76f60e`) · 8 tables · seeded
- **Custom domain target**: `pacelokal.sparkmind.web.id` (DNS pending)
- **Tech Stack**: Hono 4.6 + TypeScript + Vite 6 + Cloudflare Pages + D1 + Tailwind (CDN)
- **Secrets configured**: `OBP_API_KEY`, `OBP_WEBHOOK_SECRET`, `JWT_SECRET` (dev placeholders — replace with prod OBP credentials when OBP issues PaceLokal sub-brand key)

### Live endpoints (verified)
```
✅ GET  https://pacelokal.pages.dev/api/health
✅ GET  https://pacelokal.pages.dev/api/clubs
✅ GET  https://pacelokal.pages.dev/api/payments/doctrine
✅ POST https://pacelokal.pages.dev/api/payments/club/:id/upgrade-pro
✅ GET  https://pacelokal.pages.dev/static/app.js
✅ GET  https://pacelokal.pages.dev/robots.txt
```

### Production deploy (after `setup_cloudflare_api_key`)

```bash
# 1) Create D1 database (one-time)
npx wrangler d1 create pacelokal-production
# Copy database_id into wrangler.jsonc

# 2) Apply migrations to production
npm run db:migrate:prod

# 3) Build + deploy
npm run deploy:prod

# 4) Set secrets
npx wrangler pages secret put OBP_API_KEY --project-name pacelokal
npx wrangler pages secret put OBP_WEBHOOK_SECRET --project-name pacelokal
npx wrangler pages secret put JWT_SECRET --project-name pacelokal
```

## 🛣️ Roadmap — Not Yet Implemented

### Day 7–14
- [ ] **Strava OAuth** — replace manual run logging with auto-sync
- [ ] **Garmin Connect** import (CSV fallback first)
- [ ] **Club admin invite flow** (token-based, no full auth yet)
- [ ] **Event registration confirmation email** (via OBP receipt or Resend)

### Day 14–30
- [ ] **Authentication** (JWT + bcrypt-class PBKDF2 via Web Crypto)
- [ ] **Real OBP API key** + live mode (replace dev-simulated checkout)
- [ ] **Cron job** for invoice expiry sweep (`obp_invoices.status='expired'` after 24h pending)
- [ ] **Public club pages** at `/c/:slug` with event calendar embed

### Day 30–60
- [ ] **Race-day integration** — bib number + chip timing webhook ingestion
- [ ] **PaceLokal Pro analytics** — heatmap, route discovery (PostGIS-style via D1+KV)
- [ ] **Custom subdomain per club** (`<club-slug>.pacelokal.sparkmind.web.id`) via Cloudflare Workers tenant router
- [ ] **Merch storefront** — third revenue stream via OBP MoR
- [ ] **Mobile PWA** — offline run logging + sync

### Recommended Next Steps
1. **Run `npx wrangler d1 create pacelokal-production`** → fill `database_id` in `wrangler.jsonc`
2. **Push to GitHub** (`ganihypha/Pacelokal` — already configured as origin)
3. **Subtree push to `Sparkmind-Sovereign/apps/pacelokal`** (mother monorepo)
4. **Deploy to Cloudflare Pages** (`pacelokal` project)
5. **Onboard with OBP** for live `OBP_API_KEY` + `OBP_WEBHOOK_SECRET`
6. **Smoke-test** Rp 10.000 payment end-to-end (mirror OBP smoketest pattern)

## 🔐 Security Notes

- **Never commit** `.dev.vars` — handled by `.gitignore`
- **Webhook signature**: HMAC-SHA256(rawBody, OBP_WEBHOOK_SECRET) — timing-safe compare
- **Idempotency**: `external_ref` is unique; passed as `Idempotency-Key` to OBP
- **No PJP keys in this repo** — OBP holds Duitku/Xendit credentials (Layer 2 isolation)

---

**Doctrine**: Master-Architect v7.0 · OBP HYBRID LOCK
**Owner**: Reza Estes / Haidar — Sovereign AI Dev
**Last Updated**: 2026-05-23
