# SparkMind V6.1 PAYMENT-READY — AI Strategic Guide + Duitku Payment Gateway

## Project Overview
- **Name**: SparkMind V6.1 PAYMENT-READY
- **Goal**: AI Strategic Guide untuk hidup berdaulat — sekarang dengan **Duitku Payment Gateway** terintegrasi sepenuhnya untuk monetisasi production-ready.
- **Features**: 18+ AI Categories + 12 Productivity Tools + PWA + Pricing/Pro/Lifetime Deal + **Duitku Pop JS Checkout (VA, QRIS, OVO, DANA, ShopeePay, Credit Card)**

## 🔗 URLs
- **Production**: https://sparkmind-v2.pages.dev
- **Pricing & Pay**: https://sparkmind-v2.pages.dev/pricing
- **Latest Deploy**: https://6e71b26b.sparkmind-v2.pages.dev
- **GitHub**: https://github.com/ganihypha/Sparkmind
- **Duitku Docs**: https://docs.duitku.com/pop/en/

## 💳 Currently Completed Features

### V6.1 Payment Integration (NEW)
- ✅ **Duitku Pop JS** loaded di pricing page (sandbox mode)
- ✅ **Server-side pricing catalog** (anti-tamper) — harga di-validate di backend
- ✅ **SHA-256 signature** via Web Crypto API (Cloudflare Workers compatible)
- ✅ **MD5 callback verification** (pure JS, signature mandatory)
- ✅ **Payment modal** dengan email/name/phone form + validation
- ✅ **Auto-fallback redirect** jika Pop JS gagal load
- ✅ **Payment return page** dengan success/pending/failed states + auto-poll
- ✅ **localStorage tracking** untuk last order + Pro active flag
- ✅ **4 plans**: Pro Monthly, Pro Yearly, Team, Lifetime Deal

### V6.0 BULLETPROOF (carry over)
- ✅ XSS-safe rendering (escapeHtml di semua user input)
- ✅ PWA installable + service worker offline cache
- ✅ Error boundary global (window.onerror + try-catch)
- ✅ Pomodoro persistent end-time (resume akurat saat tab pindah)
- ✅ Storage quota guard (warning > 85%)
- ✅ Quick Add modal (⌘N)
- ✅ Onboarding tour V6
- ✅ Density compact + reduced-motion respect
- ✅ SEO + OG tags + JSON-LD + Twitter cards
- ✅ Copy/Share/Save AI response buttons
- ✅ Habit heatmap 30 hari

### Core Platform
- ✅ 18+ AI Categories (Spiritual, Side Hustle, Career, Business, Investment, Coding, English, Health, Mental Health, Relationship, dll.)
- ✅ AI Coach V6 + SWOT Analyzer
- ✅ Pomodoro V2 + Journal + Goals + Habits + Vision Board + Weekly Review
- ✅ 21+ Curated Resources
- ✅ Backup/Restore JSON
- ✅ Keyboard Shortcuts (⌘K, ⌘1-9, ⌘D, ⌘/)
- ✅ Privacy-first (data tersimpan di browser user)

## 📋 API Endpoints

### Payment Gateway (Duitku)
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/payment/plans` | List available pricing plans |
| `POST` | `/api/payment/create-invoice` | Create Duitku invoice. Body: `{planId, email, firstName?, lastName?, phoneNumber?}`. Returns `{reference, paymentUrl, merchantOrderId}` |
| `POST` | `/api/payment/callback` | Duitku webhook. Verifies MD5 signature. Form-urlencoded. |
| `GET` | `/api/payment/status/:merchantOrderId` | Query transaction status from Duitku |
| `GET` | `/payment/return` | User return landing page (auto-polls status) |

### AI & Core
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/analyze` | Strategic AI response. Body: `{message, mode?, history?}` |
| `POST` | `/api/swot` | SWOT analysis. Body: `{business}` |
| `POST` | `/api/coach` | AI Coach response. Body: `{goal, currentState?, obstacles?}` |
| `GET` | `/api/resources` | 21+ curated resources |
| `GET` | `/api/insights` | Strategic insights |
| `GET` | `/api/quotes` | Random quote |
| `GET` | `/api/health` | Service health + version + features |

### Pages
| Path | Description |
|------|-------------|
| `/` | Landing page (SEO + JSON-LD) |
| `/app` | Main dashboard (12 tabs) |
| `/pricing` | Pricing page with Duitku checkout |
| `/payment/return` | Post-payment return page |
| `/manifest.webmanifest` | PWA manifest |
| `/sw.js` | Service worker |

## 💰 Pricing Plans (Server-Side Catalog)

| Plan ID | Amount | Description |
|---------|--------|-------------|
| `pro-monthly` | Rp 49.000 | SparkMind Pro - 1 bulan |
| `pro-yearly` | Rp 470.000 | SparkMind Pro - 1 tahun (-20%) |
| `team-monthly` | Rp 745.000 | Team - 5 user x 1 bulan |
| `lifetime` | Rp 1.490.000 | Akses Pro selamanya (limited 100 slot) |

## 🏗️ Data Architecture

### Storage Services
- **Browser localStorage** — primary user data store (privacy-first, zero database)
  - `sm_chat_*`, `sm_journal`, `sm_goals`, `sm_habits`, `sm_vision`, `sm_pomo_*`, `sm_settings`
  - `sm_email`, `sm_last_order`, `sm_pro_active` (NEW V6.1)
- **Duitku Sandbox API** — payment provider (external)
  - Endpoint: `https://api-sandbox.duitku.com/api/merchant/createInvoice`
  - Endpoint: `https://api-sandbox.duitku.com/api/merchant/transactionStatus`

### Server-Side State
- **Pricing catalog** hardcoded di `PRICING_PLANS` (anti-tamper)
- **API credentials** via Cloudflare env vars (`DUITKU_API_KEY`, `DUITKU_MERCHANT_CODE`, `DUITKU_ENV`) dengan fallback hardcoded untuk sandbox

### Payment Flow
```
User klik plan → Modal form (email, name, phone)
  → POST /api/payment/create-invoice
  → Backend: SHA256(merchantCode + timestamp + apiKey)
  → POST ke Duitku createInvoice
  → Return {reference, paymentUrl}
User: checkout.process(reference) [Duitku Pop JS]
  → User bayar di popup overlay (VA/QRIS/E-wallet/CC)
  → Duitku → callback (POST /api/payment/callback)
    → Verify MD5(merchantCode + amount + orderId + apiKey)
    → Update DB / activate Pro user
  → User → /payment/return (success/pending/failed)
```

## 🚀 User Guide

### Untuk User
1. Buka https://sparkmind-v2.pages.dev/pricing
2. Klik tombol "Bayar Rp 49rb/bln" (atau plan lain)
3. Isi modal: email (wajib), nama, no HP
4. Klik "Lanjut Bayar" → popup Duitku muncul
5. Pilih metode: VA, QRIS, OVO, DANA, ShopeePay, Credit Card, dll.
6. Bayar → otomatis redirect ke `/payment/return` (auto-detect status)

### Untuk Developer (Test Mode Sandbox Duitku)
- **Merchant Code**: `DS30026`
- **API Key**: stored as fallback (production should override via env vars)
- **Test Cards 3DS**: lihat https://docs.duitku.com/pop/en/#testing
- **Sandbox VA**: bisa pakai BCA/Mandiri/BRI/BNI dummy

### Production Deployment Notes
Untuk production, set environment variables di Cloudflare Pages:
```bash
npx wrangler pages secret put DUITKU_API_KEY --project-name sparkmind-v2
npx wrangler pages secret put DUITKU_MERCHANT_CODE --project-name sparkmind-v2
npx wrangler pages secret put DUITKU_ENV --project-name sparkmind-v2  # set to 'production'
npx wrangler pages secret put PUBLIC_BASE_URL --project-name sparkmind-v2  # https://sparkmind-v2.pages.dev
```
Dan update `<script src="https://app-sandbox.duitku.com/lib/js/duitku.js">` ke `app-prod.duitku.com` di PRICING_HTML.

## 🛡️ Security Hardening

| Layer | Implementation |
|-------|---------------|
| Signature | SHA-256 (Web Crypto API) untuk x-duitku-signature header |
| Callback verify | MD5 (pure JS) untuk verify signature dari Duitku — wajib |
| Anti-tamper | Pricing catalog **server-side**, client tidak bisa rubah harga |
| Validation | Email regex, phone digit-only sanitize, name maxlength |
| HTTPS | Cloudflare Pages auto-TLS |
| Secrets | Env vars via wrangler (production) |
| XSS | escapeHtml di app dashboard |
| CORS | Hono cors middleware untuk /api/* |

## 🚧 Features Not Yet Implemented

1. **Database persistence** — saat ini callback hanya log ke console; production butuh D1/KV untuk simpan order history
2. **Email confirmation** — kirim email konfirmasi ke user setelah pembayaran sukses (butuh SendGrid/Mailgun)
3. **Real LLM integration** — saat ini AI pakai rule-based; bisa upgrade ke OpenAI/Claude API
4. **Multi-user accounts** — saat ini single-user (localStorage); butuh auth (Auth0/Clerk) untuk multi-device sync
5. **Subscription auto-renewal** — saat ini one-time payment; butuh Duitku Tokenize feature untuk recurring
6. **Refund flow** — UI untuk request refund + admin approval
7. **Analytics dashboard** — admin view untuk lihat transaction stats

## 🎯 Recommended Next Steps

### Phase 1 — Production Readiness (high priority)
1. **Add Cloudflare D1 database** untuk simpan orders + user states
2. **Set production env vars** untuk Duitku API key + switch ke production mode
3. **Switch Duitku JS** dari `app-sandbox` ke `app-prod` untuk live payments
4. **Add Sentry/error tracking** untuk monitor production errors
5. **Verify domain di Duitku Dashboard** (callback URL whitelisting)

### Phase 2 — User Account System (medium)
6. **Add auth** (magic link via Resend atau Auth0)
7. **Add D1 schema**: `users`, `subscriptions`, `orders`
8. **Sync localStorage data** ke server saat user login

### Phase 3 — Growth Features (low)
9. **Email automation** (welcome, payment confirmation, churn prevention)
10. **Affiliate / referral program** (komisi per Pro signup)
11. **Multi-language (English version)**
12. **Real LLM** untuk Pro tier (OpenAI/Claude/Gemini)

## 📊 Technical Specs

- **Framework**: Hono 4 + TypeScript
- **Edge**: Cloudflare Pages (Workers runtime)
- **Frontend**: Tailwind CSS (CDN) + FontAwesome (CDN) + Vanilla JS (zero npm frontend deps)
- **Payment**: Duitku Pop JS + REST API (sandbox)
- **Bundle**: 166.82 kB (compiled worker)
- **Cold start**: < 50ms (edge runtime)
- **Routes**: 13 (5 pages + 8 API)
- **Last Updated**: 2026-04-28
- **Version**: 6.1.0 PAYMENT-READY

## 🚢 Deployment Status

- **Platform**: Cloudflare Pages
- **Status**: ✅ Active (Production live)
- **Tech Stack**: Hono + TypeScript + TailwindCSS + Cloudflare Workers + Duitku
- **Project Name**: `sparkmind-v2`
- **Compatibility Date**: 2024-01-01
- **Compatibility Flags**: nodejs_compat
