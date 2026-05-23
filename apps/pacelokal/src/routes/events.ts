import { Hono } from 'hono'
import type { Bindings, Variables } from '../lib/types'
import { uuid, jsonOk, jsonErr } from '../lib/util'

const events = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// List events (upcoming)
events.get('/', async (c) => {
  const clubId = c.req.query('club_id')
  const status = c.req.query('status') || 'open'
  const upcoming = c.req.query('upcoming') !== 'false'
  const limit = Math.min(Number(c.req.query('limit') || 50), 200)

  let sql = `SELECT e.*, c.name AS club_name, c.city AS club_city, c.slug AS club_slug
               FROM events e
               JOIN clubs c ON c.id = e.club_id`
  const params: any[] = []
  const where: string[] = []
  if (clubId) { where.push('e.club_id = ?'); params.push(clubId) }
  if (status) { where.push('e.status = ?'); params.push(status) }
  if (upcoming) { where.push("e.event_date >= date('now')") }
  if (where.length) sql += ' WHERE ' + where.join(' AND ')
  sql += ' ORDER BY e.event_date ASC LIMIT ?'
  params.push(limit)

  const { results } = await c.env.DB.prepare(sql).bind(...params).all()
  return c.json(jsonOk({ events: results || [] }))
})

// Get single event + registrations count
events.get('/:id', async (c) => {
  const id = c.req.param('id')
  const event = await c.env.DB.prepare(
    `SELECT e.*, c.name AS club_name, c.slug AS club_slug, c.city AS club_city
       FROM events e JOIN clubs c ON c.id = e.club_id
      WHERE e.id = ?`
  ).bind(id).first()
  if (!event) return c.json(jsonErr('Event not found'), 404)

  const regCount = await c.env.DB.prepare(
    `SELECT COUNT(*) AS total,
            SUM(CASE WHEN status='paid' THEN 1 ELSE 0 END) AS paid
       FROM event_registrations WHERE event_id = ?`
  ).bind(id).first<{ total: number; paid: number }>()

  return c.json(jsonOk({
    event,
    registrations: {
      total: regCount?.total || 0,
      paid: regCount?.paid || 0,
    },
  }))
})

// Create event
events.post('/', async (c) => {
  const body = await c.req.json().catch(() => ({})) as any
  const { club_id, title, description, event_date, event_time, location,
          distance_km, max_participants, fee_idr } = body

  if (!club_id || !title || !event_date || !location) {
    return c.json(jsonErr('Missing: club_id, title, event_date, location'), 400)
  }

  const id = 'evt_' + uuid().slice(0, 8)
  await c.env.DB.prepare(
    `INSERT INTO events (id, club_id, title, description, event_date, event_time,
                         location, distance_km, max_participants, fee_idr, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, 0), 'open')`
  ).bind(id, club_id, title, description || null, event_date, event_time || null,
         location, distance_km || null, max_participants || null, fee_idr || 0).run()

  const evt = await c.env.DB.prepare(`SELECT * FROM events WHERE id = ?`).bind(id).first()
  return c.json(jsonOk({ event: evt }), 201)
})

export default events
