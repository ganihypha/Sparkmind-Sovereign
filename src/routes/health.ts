import { Hono } from 'hono'
import type { Bindings, Variables } from '../lib/types'
import { nowISO } from '../lib/util'

const health = new Hono<{ Bindings: Bindings; Variables: Variables }>()

health.get('/', (c) =>
  c.json({
    success: true,
    service: c.env.APP_NAME || 'PaceLokal',
    version: c.env.APP_VERSION || '0.1.0',
    environment: c.env.ENVIRONMENT || 'development',
    doctrine: 'Master-Architect v7.0 · OBP HYBRID LOCK',
    sub_brand: 'pacelokal',
    merchant_of_record: 'Oasis BI Pro',
    obp_base: c.env.OBP_CHECKOUT_BASE || 'https://pay.oasis-bi-pro.web.id',
    bindings: { d1: !!c.env.DB },
    timestamp: nowISO(),
  })
)

export default health
