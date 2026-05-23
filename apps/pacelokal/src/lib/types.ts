// ============================================================
// PaceLokal — Type definitions
// ============================================================

export type Bindings = {
  DB: D1Database
  // Vars (wrangler.jsonc)
  APP_NAME?: string
  APP_VERSION?: string
  ENVIRONMENT?: string
  OBP_CHECKOUT_BASE?: string
  PACELOKAL_BRAND_PREFIX?: string
  // Secrets
  OBP_API_KEY?: string
  OBP_WEBHOOK_SECRET?: string
  JWT_SECRET?: string
}

export type Variables = {
  user?: { id: string; email: string; role?: string } | null
}

// Domain types
export interface Club {
  id: string
  name: string
  slug: string
  city: string
  province: string
  description?: string
  logo_url?: string
  owner_user_id?: string
  plan: 'free' | 'pro'
  billing_status: 'inactive' | 'active' | 'expired'
  created_at: number
  updated_at: number
}

export interface Member {
  id: string
  club_id: string
  name: string
  email?: string
  phone?: string
  role: 'runner' | 'coach' | 'admin'
  joined_at: number
}

export interface Run {
  id: string
  member_id: string
  club_id: string
  distance_km: number
  duration_sec: number
  pace_min_km?: number
  run_date: string
  source: 'manual' | 'strava' | 'garmin'
  external_ref?: string
  notes?: string
  verified: number
  created_at: number
}

export interface Event {
  id: string
  club_id: string
  title: string
  description?: string
  event_date: string
  event_time?: string
  location: string
  distance_km?: number
  max_participants?: number
  fee_idr: number
  status: 'open' | 'closed' | 'cancelled' | 'done'
  created_at: number
}

export interface ObpInvoice {
  id: string
  obp_invoice_id?: string
  external_ref: string
  sub_brand_id: string
  purpose: 'event_registration' | 'club_pro_subscription' | 'merch'
  related_id?: string
  amount_idr: number
  description: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  checkout_url?: string
  pjp_provider?: 'duitku' | 'xendit'
  status: 'pending' | 'settled' | 'failed' | 'expired' | 'cancelled'
  callback_url?: string
  metadata_json?: string
  settled_at?: number
  created_at: number
  updated_at: number
}
