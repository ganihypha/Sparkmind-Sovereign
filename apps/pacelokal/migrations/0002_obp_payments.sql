-- ============================================================
-- PaceLokal — OBP Payment Integration Tables
-- Doctrine: PAYMENT-FLOW-OBP v2.0 · BRAND-ARCH-4LAYER v2.0
-- Pattern: PaceLokal sub-brand → Oasis BI Pro (MoR) → Duitku/Xendit (PJP)
-- ============================================================

-- Invoices created via OBP (Layer 2 Merchant-of-Record)
-- Each invoice is issued under PaceLokal sub-brand but settled to OBP bank account
CREATE TABLE IF NOT EXISTS obp_invoices (
  id                 TEXT PRIMARY KEY,        -- local uuid
  obp_invoice_id     TEXT UNIQUE,             -- returned by OBP (obp_inv_xxx)
  external_ref       TEXT UNIQUE NOT NULL,    -- our reference (PL-INV-yyyymmdd-NNNN)
  sub_brand_id       TEXT NOT NULL DEFAULT 'pacelokal',
  purpose            TEXT NOT NULL,           -- 'event_registration' | 'club_pro_subscription' | 'merch'
  related_id         TEXT,                    -- FK target (event_id, club_id, etc.)
  amount_idr         INTEGER NOT NULL,
  description        TEXT NOT NULL,
  customer_name      TEXT NOT NULL,
  customer_email     TEXT NOT NULL,
  customer_phone     TEXT,
  checkout_url       TEXT,                    -- pay.oasis-bi-pro.web.id/checkout/...
  pjp_provider       TEXT,                    -- 'duitku' | 'xendit'
  status             TEXT NOT NULL DEFAULT 'pending',  -- pending | settled | failed | expired | cancelled
  callback_url       TEXT,
  metadata_json      TEXT,                    -- JSON blob for plan, member_id, etc.
  webhook_payload    TEXT,                    -- last webhook payload (audit)
  settled_at         INTEGER,
  created_at         INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at         INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_obp_inv_status ON obp_invoices(status);
CREATE INDEX IF NOT EXISTS idx_obp_inv_purpose ON obp_invoices(purpose);
CREATE INDEX IF NOT EXISTS idx_obp_inv_ext ON obp_invoices(external_ref);
CREATE INDEX IF NOT EXISTS idx_obp_inv_obpid ON obp_invoices(obp_invoice_id);

-- Webhook audit log — every inbound webhook from OBP
CREATE TABLE IF NOT EXISTS obp_webhook_log (
  id            TEXT PRIMARY KEY,
  event         TEXT NOT NULL,             -- payment.settled, payment.failed, ...
  invoice_id    TEXT,                      -- obp_invoice_id
  signature     TEXT,
  signature_ok  INTEGER NOT NULL DEFAULT 0,
  payload       TEXT NOT NULL,             -- full JSON
  ip            TEXT,
  received_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_obp_wh_event ON obp_webhook_log(event);
CREATE INDEX IF NOT EXISTS idx_obp_wh_invoice ON obp_webhook_log(invoice_id);
