# SPARKMIND — AI DEV SESSION ARCHITECT (HANDOFF v1)
## You are the ONLY developer of sparkmind-v2.pages.dev. Read this BEFORE writing one line of code.

## CANONICAL FACTS (do not deviate)
- **Project**: sparkmind-v2  (Cloudflare Pages, Hono + TS + Tailwind CDN)
- **Production domain**: https://sparkmind-v2.pages.dev   ← ONLY this URL is canonical
- **Production branch**: `main`   ← every commit to main = auto-promote to production alias
- **Repo source-of-truth**: github.com/ganihypha/Sparkmind → branch `main`
- **Source file**: `src/index.tsx` (single-file Hono app, ~3200 LOC)
- **Build**: `vite build` → `dist/_worker.js`
- **Deploy**: `npx wrangler pages deploy dist --project-name sparkmind-v2 --branch main`

## PAYMENT GATEWAY (Duitku — PRODUCTION LIVE)
- **Merchant Code**:  `D22457`
- **API Key (prod)**: `82ba4f6755c2b05f0ca4ff397488af96`  ← set as secret, NEVER commit
- **POP JS prod**:    `https://app-prod.duitku.com/lib/js/duitku.js`
- **Create Invoice**: `https://api-prod.duitku.com/api/merchant/createInvoice`
- **Tx Status**:      `https://passport.duitku.com/webapi/api/merchant/transactionStatus`
- **Callback URL**:   `https://sparkmind-v2.pages.dev/api/payment/callback`   ← whitelisted at Duitku
- **Return URL**:     `https://sparkmind-v2.pages.dev/payment/return`
- **Signature** (createInvoice): `SHA256(merchantCode + merchantOrderId + paymentAmount + apiKey)`
- **Callback verify**: `MD5(merchantCode + amount + merchantOrderId + apiKey)`

## INVARIANTS (break these = production breaks)
1. `baseUrl` resolution order: `env.PUBLIC_BASE_URL → CANONICAL_BASE_URL → request origin` (last resort)
2. ALL HTML routes MUST call `noCacheHTML(c)` to bust CDN edge cache
3. Duitku POP `<script src>` MUST switch on `cfg.isProd` — never hardcode sandbox
4. `PRICING_PLANS` lives server-side (10 plans: 4 core + 6 painkiller) — never client-side
5. `/api/clarity` tools must always include `disclaimer` field — ethical pain-killer mode
6. EVERY deploy: `--branch main` + `--commit-message` + git tag (`vX.Y-prod`)
7. Version string in `/api/health` MUST match the HTML version badges (LANDING/PRICING/APP)

## PROHIBITED
- ❌ Hardcoding sandbox endpoints in production HTML
- ❌ Removing `CANONICAL_BASE_URL` fallback
- ❌ Deploying to a non-main branch and calling it "production"
- ❌ Storing API keys in source (use `wrangler pages secret put`)
- ❌ Adding stalking/bypass-block features to AI Clarity Coach
- ❌ Removing painkiller plans from `PRICING_PLANS`
- ❌ Letting HTML constants (LANDING_HTML, PRICING_HTML, APP_HTML) drift from Worker version

## WORK ORDER (every task)
1. `git pull origin main` (always start synced)
2. Read `/api/health` on https://sparkmind-v2.pages.dev/api/health to confirm current live version
3. Make change in `src/index.tsx` (same file — keep single-file architecture)
4. `npm run build` → smoke test locally with `pm2 + wrangler pages dev`
5. Verify: `curl localhost:3000/api/health`, `/api/payment/plans` (10), `/api/clarity` (6 tools)
6. Deploy: `wrangler pages deploy dist --project-name sparkmind-v2 --branch main`
7. Verify on https://sparkmind-v2.pages.dev (NOT the hash URL) — purge cache if stale
8. `git commit -m "vX.Y: <change>"` → `git tag` → `git push origin main --tags`
9. Update `README.md` with version + change summary

## ESCALATION TRIGGERS (stop and ask user)
- Duitku API returns "Merchant Not Found" persistently → activation pending on Duitku side
- Cloudflare deploy succeeds but main domain doesn't update after 5 min → cache purge needed
- New plan amount > Rp 5.000.000 → confirm with user (might be typo)
- ANY change to callback signature logic → user must confirm + retest with sandbox first

## CURRENT LIVE STATE (as of v7.2-prod-hardened)
- Version: **7.2.0**
- Mode: **production** (Duitku D22457)
- Plans: **10** (pro-monthly/yearly/team-monthly/lifetime + clarity-monthly/yearly + 4 packs)
- Modules: **9 core + 6 painkiller** (situation-decoder, draft-tone-review, boundary-checker,
  recovery-plan, relationship-swot, decision-mode)
- HTML constants: **reconciled** with V7.2 worker (no stale V6.x markup)
- Pending: Duitku merchant activation handshake (email reply drafted separately)

## V7.2 RECONCILIATION CHECKLIST (what got fixed)
- [x] Version 7.1.0 → 7.2.0 in `/api/health`
- [x] LANDING_HTML version badge V6.0 → V7.2
- [x] PRICING_HTML version badge V6.1 → V7.2
- [x] APP_HTML version badge V6.0 → V7.2
- [x] Footer copy updated to V7.2 PRODUCTION HARDENED
- [x] Clarity Coach link added in LANDING nav + APP footer
- [x] Duitku POP JS uses `app-prod.duitku.com` (production)
- [x] `noCacheHTML()` middleware active on all HTML routes
- [x] `CANONICAL_BASE_URL = 'https://sparkmind-v2.pages.dev'`
- [x] AI_DEV_HANDOFF.md committed to repo
