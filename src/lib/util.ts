// ============================================================
// PaceLokal — Utility helpers
// ============================================================

export function uuid(): string {
  // Cloudflare Workers expose crypto.randomUUID
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as any).randomUUID()
  }
  // Fallback
  return 'pl_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}

export function nowEpoch(): number {
  return Math.floor(Date.now() / 1000)
}

export function nowISO(): string {
  return new Date().toISOString()
}

export function formatIDR(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID')
}

export function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function genExternalRef(prefix = 'PL-INV'): string {
  const d = new Date()
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${y}${m}${day}-${rand}`
}

// HMAC-SHA256 verifier using Web Crypto (Workers-safe)
export async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Constant-time string compare
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export function jsonOk<T>(data: T) {
  return { success: true, ...((data as any) ?? {}) }
}

export function jsonErr(error: string, extra?: Record<string, unknown>) {
  return { success: false, error, ...(extra ?? {}) }
}
