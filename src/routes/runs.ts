import { Hono } from 'hono'
import type { Bindings, Variables } from '../lib/types'
import { uuid, jsonOk, jsonErr } from '../lib/util'

const runs = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// List runs (filtered by club or member)
runs.get('/', async (c) => {
  const clubId = c.req.query('club_id')
  const memberId = c.req.query('member_id')
  const limit = Math.min(Number(c.req.query('limit') || 50), 200)

  let sql = `SELECT r.*, m.name AS member_name, c.name AS club_name
               FROM runs r
               JOIN members m ON m.id = r.member_id
               JOIN clubs c ON c.id = r.club_id`
  const params: any[] = []
  const where: string[] = []
  if (clubId) { where.push('r.club_id = ?'); params.push(clubId) }
  if (memberId) { where.push('r.member_id = ?'); params.push(memberId) }
  if (where.length) sql += ' WHERE ' + where.join(' AND ')
  sql += ' ORDER BY r.run_date DESC, r.created_at DESC LIMIT ?'
  params.push(limit)

  const { results } = await c.env.DB.prepare(sql).bind(...params).all()
  return c.json(jsonOk({ runs: results || [] }))
})

// Log a run
runs.post('/', async (c) => {
  const body = await c.req.json().catch(() => ({})) as any
  const { member_id, club_id, distance_km, duration_sec, run_date, source, notes } = body

  if (!member_id || !club_id || !distance_km || !duration_sec || !run_date) {
    return c.json(jsonErr('Missing: member_id, club_id, distance_km, duration_sec, run_date'), 400)
  }
  const distance = Number(distance_km)
  const duration = Number(duration_sec)
  if (distance <= 0 || duration <= 0) {
    return c.json(jsonErr('distance_km and duration_sec must be positive'), 400)
  }

  const pace = (duration / 60) / distance // min per km
  const id = 'run_' + uuid().slice(0, 8)

  await c.env.DB.prepare(
    `INSERT INTO runs (id, member_id, club_id, distance_km, duration_sec, pace_min_km,
                       run_date, source, notes, verified)
     VALUES (?, ?, ?, ?, ?, ?, ?, COALESCE(?,'manual'), ?, 0)`
  ).bind(id, member_id, club_id, distance, duration, Number(pace.toFixed(2)),
         run_date, source || 'manual', notes || null).run()

  const run = await c.env.DB.prepare(`SELECT * FROM runs WHERE id = ?`).bind(id).first()
  return c.json(jsonOk({ run }), 201)
})

// Recent runs summary (last 7 days)
runs.get('/summary/weekly', async (c) => {
  const clubId = c.req.query('club_id')
  const sql = clubId
    ? `SELECT run_date, COUNT(*) AS runs, ROUND(SUM(distance_km),2) AS km
         FROM runs WHERE club_id = ? AND run_date >= date('now','-7 day')
        GROUP BY run_date ORDER BY run_date DESC`
    : `SELECT run_date, COUNT(*) AS runs, ROUND(SUM(distance_km),2) AS km
         FROM runs WHERE run_date >= date('now','-7 day')
        GROUP BY run_date ORDER BY run_date DESC`
  const stmt = clubId ? c.env.DB.prepare(sql).bind(clubId) : c.env.DB.prepare(sql)
  const { results } = await stmt.all()
  return c.json(jsonOk({ days: results || [] }))
})

export default runs
