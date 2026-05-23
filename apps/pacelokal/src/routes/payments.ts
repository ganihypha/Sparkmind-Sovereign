// ============================================================
// PaceLokal — Payment routes (OBP MoR integration)
//
// All money flows through Oasis BI Pro (Merchant-of-Record).
// PaceLokal NEVER touches PJP (Duitku/Xendit) directly.
//
// Endpoints:
//   POST /api/payments/event/:eventId/register   → create OBP invoice for event
//   POST /api/payments/club/:clubId/upgrade-pro  → create OBP invoice for Pro plan
//   GET  /api/payments/invoices/:externalRef     → lookup local invoice status
//   POST /api/payments/webhooks/obp              → inbound webhook from OBP (HMAC verified)
//   GET  /api/payments/invoices                  → list recent invoices
// ============================================================

import { Hono } from 'hono'
import type { Bindings, Variables } from '../lib/types'
import { uuid, genExternalRef, hmacSha256Hex, timingSafeEqual, jsonOk, jsonErr } from '../lib/util'
import { obpCreateInvoice, getObpBase } from '../lib/obp'

const payments = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// ----------------------------------------------------------------
// 1. Event registration → OBP invoice
// ----------------------------------------------------------------
payments.post('/event/:eventId/register', async (c) => {
  const eventId = c.req.param('eventId')
  const body = await c.req.json().catch(() => ({})) as any
  const { name, email, phone, member_id } = body
  if (!name || !email) {
    return c.json(jsonErr('Missing: name, email'), 400)
  }

  // Load event
  const event = await c.env.DB.prepare(
    `SELECT e.*, c.name AS club_name FROM events e JOIN clubs c ON c.id = e.club_id WHERE e.id = ?`
  ).bind(eventId).first<any>()
  if (!event) return c.json(jsonErr('Event not found'), 404)
  if (event.status !== 'open') return c.json(jsonErr(`Event is ${event.status}, not open`), 409)

  const amount = Number(event.fee_idr || 0)
  const regId = 'reg_' + uuid().slice(0, 10)

  // Free event → register immediately
  if (amount === 0) {
    await c.env.DB.prepare(
      `INSERT INTO event_registrations (id, event_id, member_id, name, email, phone, status, amount_idr)
       VALUES (?, ?, ?, ?, ?, ?, 'paid', 0)`
    ).bind(regId, eventId, member_id || null, name, email, phone || null).run()
    return c.json(jsonOk({
      registration_id: regId,
      free: true,
      message: 'Free event — registered. See you at the start line!',
    }), 201)
  }

  // Paid event → create OBP invoice
  const externalRef = genExternalRef('PL-EVT')
  const desc = `PaceLokal · ${event.title} · ${event.club_name}`
  const callbackUrl = new URL(c.req.url).origin + `/payment/return?ref=${externalRef}`

  const obp = await obpCreateInvoice(c.env, {
    external_ref: externalRef,
    amount_idr: amount,
    description: desc,
    customer: { name, email, phone },
    callback_url: callbackUrl,
    metadata: {
      sub_brand: 'pacelokal',
      purpose: 'event_registration',
      event_id: eventId,
      registration_id: regId,
      member_id: member_id || null,
    },
  })

  if (!obp.success) {
    return c.json(jsonErr(obp.error || 'OBP create invoice failed', { raw: obp.raw }), 502)
  }

  const invId = 'inv_' + uuid().slice(0, 10)
  await c.env.DB.prepare(
    `INSERT INTO obp_invoices
        (id, obp_invoice_id, external_ref, sub_brand_id, purpose, related_id,
         amount_idr, description, customer_name, customer_email, customer_phone,
         checkout_url, pjp_provider, status, callback_url, metadata_json)
     VALUES (?, ?, ?, 'pacelokal', 'event_registration', ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
  ).bind(
    invId,
    obp.invoice_id || null,
    externalRef,
    eventId,
    amount,
    desc,
    name, email, phone || null,
    obp.checkout_url || null,
    obp.pjp_provider || null,
    callbackUrl,
    JSON.stringify({ event_id: eventId, registration_id: regId, member_id: member_id || null })
  ).run()

  // Insert pending registration linked to invoice
  await c.env.DB.prepare(
    `INSERT INTO event_registrations
        (id, event_id, member_id, name, email, phone, status, amount_idr, obp_invoice_id)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
  ).bind(regId, eventId, member_id || null, name, email, phone || null, amount, obp.invoice_id || null).run()

  return c.json(jsonOk({
    registration_id: regId,
    external_ref: externalRef,
    checkout_url: obp.checkout_url,
    invoice_id: obp.invoice_id,
    amount_idr: amount,
    merchant_of_record: 'Oasis BI Pro',
    pjp_provider: obp.pjp_provider,
    expires_at: obp.expires_at,
    disclosure: 'Pembayaran diproses oleh Oasis BI Pro sebagai Merchant-of-Record untuk ekosistem SparkMind.',
  }), 201)
})

// ----------------------------------------------------------------
// 2. Club Pro upgrade → OBP invoice
// ----------------------------------------------------------------
const PRO_PLAN_IDR = 49_000

payments.post('/club/:clubId/upgrade-pro', async (c) => {
  const clubId = c.req.param('clubId')
  const body = await c.req.json().catch(() => ({})) as any
  const { name, email, phone } = body
  if (!name || !email) return c.json(jsonErr('Missing: name, email'), 400)

  const club = await c.env.DB.prepare(`SELECT * FROM clubs WHERE id = ?`).bind(clubId).first<any>()
  if (!club) return c.json(jsonErr('Club not found'), 404)
  if (club.plan === 'pro' && club.billing_status === 'active') {
    return c.json(jsonErr('Club already on active Pro plan'), 409)
  }

  const externalRef = genExternalRef('PL-PRO')
  const desc = `PaceLokal Pro · ${club.name} · Monthly Subscription`
  const callbackUrl = new URL(c.req.url).origin + `/payment/return?ref=${externalRef}`

  const obp = await obpCreateInvoice(c.env, {
    external_ref: externalRef,
    amount_idr: PRO_PLAN_IDR,
    description: desc,
    customer: { name, email, phone },
    callback_url: callbackUrl,
    metadata: {
      sub_brand: 'pacelokal',
      purpose: 'club_pro_subscription',
      club_id: clubId,
      plan: 'pro_monthly',
    },
  })
  if (!obp.success) {
    return c.json(jsonErr(obp.error || 'OBP create invoice failed', { raw: obp.raw }), 502)
  }

  const invId = 'inv_' + uuid().slice(0, 10)
  await c.env.DB.prepare(
    `INSERT INTO obp_invoices
        (id, obp_invoice_id, external_ref, sub_brand_id, purpose, related_id,
         amount_idr, description, customer_name, customer_email, customer_phone,
         checkout_url, pjp_provider, status, callback_url, metadata_json)
     VALUES (?, ?, ?, 'pacelokal', 'club_pro_subscription', ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
  ).bind(
    invId, obp.invoice_id || null, externalRef, clubId, PRO_PLAN_IDR, desc,
    name, email, phone || null, obp.checkout_url || null, obp.pjp_provider || null,
    callbackUrl, JSON.stringify({ club_id: clubId, plan: 'pro_monthly' })
  ).run()

  return c.json(jsonOk({
    external_ref: externalRef,
    checkout_url: obp.checkout_url,
    invoice_id: obp.invoice_id,
    amount_idr: PRO_PLAN_IDR,
    merchant_of_record: 'Oasis BI Pro',
    pjp_provider: obp.pjp_provider,
    disclosure: 'Pembayaran diproses oleh Oasis BI Pro sebagai Merchant-of-Record untuk ekosistem SparkMind.',
  }), 201)
})

// ----------------------------------------------------------------
// 3. List invoices (admin/QA)
// ----------------------------------------------------------------
payments.get('/invoices', async (c) => {
  const limit = Math.min(Number(c.req.query('limit') || 20), 100)
  const { results } = await c.env.DB.prepare(
    `SELECT external_ref, obp_invoice_id, purpose, related_id, amount_idr, status,
            customer_name, customer_email, pjp_provider, created_at, updated_at, settled_at
       FROM obp_invoices ORDER BY created_at DESC LIMIT ?`
  ).bind(limit).all()
  return c.json(jsonOk({ invoices: results || [] }))
})

// ----------------------------------------------------------------
// 4. Get invoice by external_ref
// ----------------------------------------------------------------
payments.get('/invoices/:externalRef', async (c) => {
  const ref = c.req.param('externalRef')
  const inv = await c.env.DB.prepare(
    `SELECT * FROM obp_invoices WHERE external_ref = ?`
  ).bind(ref).first()
  if (!inv) return c.json(jsonErr('Invoice not found'), 404)
  return c.json(jsonOk({ invoice: inv }))
})

// ----------------------------------------------------------------
// 5. Inbound webhook from OBP — HMAC-SHA256 verified
//
// OBP fires POST /api/payments/webhooks/obp when invoice settles.
// Header: X-OBP-Signature: <hmac_sha256_hex of raw body using OBP_WEBHOOK_SECRET>
// ----------------------------------------------------------------
payments.post('/webhooks/obp', async (c) => {
  const rawBody = await c.req.text()
  const signature = c.req.header('X-OBP-Signature') || ''
  const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || ''
  const secret = c.env.OBP_WEBHOOK_SECRET || ''

  let event: any = null
  try { event = JSON.parse(rawBody) } catch { event = {} }

  // Verify signature (skip in dev if secret is the placeholder)
  let signatureOk = false
  if (secret && !secret.startsWith('dev-')) {
    const expected = await hmacSha256Hex(secret, rawBody)
    signatureOk = timingSafeEqual(expected, signature)
  } else {
    signatureOk = true // dev mode — accept all
  }

  // Always log
  await c.env.DB.prepare(
    `INSERT INTO obp_webhook_log (id, event, invoice_id, signature, signature_ok, payload, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    'wh_' + uuid().slice(0, 10),
    event?.event || 'unknown',
    event?.invoice_id || null,
    signature || null,
    signatureOk ? 1 : 0,
    rawBody,
    ip,
  ).run()

  if (!signatureOk) return c.json(jsonErr('Invalid signature'), 401)

  // Process event
  const obpInvoiceId = event?.invoice_id
  const externalRef = event?.external_ref
  const eventType: string = event?.event || ''

  if (!obpInvoiceId && !externalRef) {
    return c.json(jsonErr('Missing invoice_id / external_ref'), 400)
  }

  // Find local invoice
  const inv = await c.env.DB.prepare(
    `SELECT * FROM obp_invoices WHERE obp_invoice_id = ? OR external_ref = ? LIMIT 1`
  ).bind(obpInvoiceId || null, externalRef || null).first<any>()
  if (!inv) return c.json(jsonErr('Invoice not found locally'), 404)

  // Map event → status
  let newStatus = inv.status
  if (eventType === 'payment.settled') newStatus = 'settled'
  else if (eventType === 'payment.failed') newStatus = 'failed'
  else if (eventType === 'payment.expired') newStatus = 'expired'
  else if (eventType === 'payment.cancelled') newStatus = 'cancelled'

  // Idempotency guard — OBP retries on 5xx/timeout. If we already settled
  // this invoice, don't re-run side effects. Return 200 so OBP stops retrying.
  if (inv.status === 'settled' && newStatus === 'settled') {
    return c.json(jsonOk({
      processed: true,
      idempotent_replay: true,
      status: inv.status,
      invoice_id: inv.id,
    }))
  }

  await c.env.DB.prepare(
    `UPDATE obp_invoices
        SET status = ?, webhook_payload = ?, updated_at = unixepoch(),
            settled_at = CASE WHEN ? = 'settled' THEN unixepoch() ELSE settled_at END
      WHERE id = ?`
  ).bind(newStatus, rawBody, newStatus, inv.id).run()

  // Side effects on settlement
  if (newStatus === 'settled') {
    if (inv.purpose === 'event_registration') {
      // Mark registration as paid
      await c.env.DB.prepare(
        `UPDATE event_registrations SET status = 'paid' WHERE obp_invoice_id = ?`
      ).bind(inv.obp_invoice_id || '').run()
      // Fallback by external_ref via metadata
      try {
        const meta = JSON.parse(inv.metadata_json || '{}')
        if (meta.registration_id) {
          await c.env.DB.prepare(
            `UPDATE event_registrations SET status = 'paid' WHERE id = ?`
          ).bind(meta.registration_id).run()
        }
      } catch {}
    } else if (inv.purpose === 'club_pro_subscription') {
      // Activate club Pro plan for 30 days (handled by separate cron in prod; here we flip flag)
      await c.env.DB.prepare(
        `UPDATE clubs SET plan = 'pro', billing_status = 'active', updated_at = unixepoch()
          WHERE id = ?`
      ).bind(inv.related_id).run()
    }
  }

  return c.json(jsonOk({ processed: true, status: newStatus, invoice_id: inv.id }))
})

// ----------------------------------------------------------------
// 6. DEV-ONLY: simulate OBP webhook settle (used during onboarding
//    before OBP wires the real webhook to /api/payments/webhooks/obp).
//    Disabled when ENVIRONMENT === 'production' AND OBP_WEBHOOK_SECRET
//    is a real (non-dev) secret.
// ----------------------------------------------------------------
payments.post('/dev/simulate-settle/:externalRef', async (c) => {
  const env = c.env
  const isProdLocked = env.ENVIRONMENT === 'production'
    && env.OBP_WEBHOOK_SECRET
    && !env.OBP_WEBHOOK_SECRET.startsWith('dev-')
  if (isProdLocked) {
    return c.json(jsonErr('Disabled in production with real OBP_WEBHOOK_SECRET'), 403)
  }
  const ref = c.req.param('externalRef')
  const inv = await env.DB.prepare(
    `SELECT * FROM obp_invoices WHERE external_ref = ?`
  ).bind(ref).first<any>()
  if (!inv) return c.json(jsonErr('Invoice not found'), 404)

  // Forge a webhook body and POST to ourselves so the full path is exercised
  const body = JSON.stringify({
    event: 'payment.settled',
    invoice_id: inv.obp_invoice_id,
    external_ref: ref,
    amount_idr: inv.amount_idr,
    settled_at: new Date().toISOString(),
    simulated: true,
  })
  const url = new URL(c.req.url)
  url.pathname = '/api/payments/webhooks/obp'
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-OBP-Signature': 'dev-simulated',
    },
    body,
  })
  const payload = await res.json().catch(() => ({}))
  return c.json(jsonOk({ simulated: true, webhook_result: payload }))
})

// ----------------------------------------------------------------
// 7. Doctrine info (Layer 2 disclosure)
// ----------------------------------------------------------------
payments.get('/doctrine', (c) => {
  return c.json(jsonOk({
    layer: 2,
    name: 'Merchant-of-Record (MoR)',
    merchant_of_record: 'Oasis BI Pro',
    obp_base: getObpBase(c.env),
    pacelokal_route_prefix: '/pl/*',
    pjp: ['duitku', 'xendit'],
    disclosure: 'Pembayaran diproses oleh Oasis BI Pro (oasis-bi-pro.web.id) sebagai Merchant-of-Record untuk ekosistem SparkMind. Pemrosesan kartu/bank melalui PJP Duitku/Xendit yang terdaftar di Bank Indonesia.',
    doctrine_refs: [
      'PAYMENT-FLOW-OBP-v2.0',
      'MOR-ROUTING-MANIFEST',
      'BRAND-ARCH-4LAYER-v2.0',
      'MASTER-ARCHITECT-PROMPT-v7.0',
    ],
  }))
})

export default payments
