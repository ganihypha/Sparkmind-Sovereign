// ============================================================
// PaceLokal — OBP (Oasis BI Pro) Merchant-of-Record Client
//
// Doctrine: PAYMENT-FLOW-OBP v2.0 · MOR-ROUTING-MANIFEST
// PaceLokal route prefix at OBP: /pl/*
// Spec:
//   POST https://pay.oasis-bi-pro.web.id/v1/invoices  (Sub-brand → OBP)
//   POST https://pacelokal.../webhooks/obp            (OBP → Sub-brand)
//
// All payments are settled to OBP bank (not PaceLokal). PaceLokal is
// Layer 1 (Brand) only; OBP is Layer 2 (Merchant).
// ============================================================

import type { Bindings } from './types'

export interface OBPCreateInvoiceInput {
  external_ref: string
  amount_idr: number
  description: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  callback_url?: string
  metadata?: Record<string, unknown>
}

export interface OBPCreateInvoiceResult {
  success: boolean
  invoice_id?: string
  checkout_url?: string
  expires_at?: string
  merchant_of_record?: string
  pjp_provider?: 'duitku' | 'xendit'
  amount_idr?: number
  status?: string
  error?: string
  raw?: unknown
}

const SUB_BRAND_ID = 'pacelokal'

export function getObpBase(env: Bindings): string {
  return env.OBP_CHECKOUT_BASE || 'https://pay.oasis-bi-pro.web.id'
}

/**
 * Create invoice at OBP. OBP is the Merchant-of-Record;
 * settlement flows to OBP bank → daily reconciliation → B2B payout to PaceLokal.
 */
export async function obpCreateInvoice(
  env: Bindings,
  input: OBPCreateInvoiceInput
): Promise<OBPCreateInvoiceResult> {
  const base = getObpBase(env)
  const apiKey = env.OBP_API_KEY || ''

  // Local/dev fallback: if no API key configured, return a SIMULATED checkout URL
  // so the rest of the flow can be tested end-to-end against local D1. This
  // mirrors the OBP behaviour but does NOT hit the real backend.
  if (!apiKey || apiKey.startsWith('dev-')) {
    return {
      success: true,
      invoice_id: 'obp_dev_' + Math.random().toString(36).slice(2, 12),
      checkout_url: `${base}/checkout/dev?ref=${encodeURIComponent(input.external_ref)}&amount=${input.amount_idr}`,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      merchant_of_record: 'Oasis BI Pro (DEV-SIMULATED)',
      pjp_provider: 'duitku',
      amount_idr: input.amount_idr,
      status: 'pending',
      raw: { simulated: true },
    }
  }

  // Real call
  const url = `${base}/v1/invoices`
  const body = {
    sub_brand_id: SUB_BRAND_ID,
    external_ref: input.external_ref,
    amount_idr: input.amount_idr,
    description: input.description,
    customer: input.customer,
    callback_url: input.callback_url,
    metadata: input.metadata || {},
  }

  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': input.external_ref,
      },
      body: JSON.stringify(body),
    })
  } catch (e: any) {
    return { success: false, error: `Network error: ${e?.message || e}` }
  }

  let payload: any = null
  try {
    payload = await res.json()
  } catch {
    payload = { raw: await res.text().catch(() => '') }
  }

  if (!res.ok) {
    return {
      success: false,
      error: payload?.error || `OBP HTTP ${res.status}`,
      raw: payload,
    }
  }

  return {
    success: true,
    invoice_id: payload.invoice_id,
    checkout_url: payload.checkout_url,
    expires_at: payload.expires_at,
    merchant_of_record: payload.merchant_of_record,
    pjp_provider: payload.pjp_provider,
    amount_idr: payload.amount_idr,
    status: payload.status,
    raw: payload,
  }
}
