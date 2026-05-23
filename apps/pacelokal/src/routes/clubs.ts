import { Hono } from 'hono'
import type { Bindings, Variables } from '../lib/types'
import { uuid, jsonOk, jsonErr } from '../lib/util'

const clubs = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// List clubs
clubs.get('/', async (c) => {
  const city = c.req.query('city')
  const limit = Math.min(Number(c.req.query('limit') || 50), 200)
  const sql = city
    ? `SELECT * FROM clubs WHERE city = ? ORDER BY created_at DESC LIMIT ?`
    : `SELECT * FROM clubs ORDER BY created_at DESC LIMIT ?`
  const stmt = city
    ? c.env.DB.prepare(sql).bind(city, limit)
    : c.env.DB.prepare(sql).bind(limit)
  const { results } = await stmt.all()
  return c.json(jsonOk({ clubs: results || [] }))
})

// Get single club + member count + recent runs aggregate
clubs.get('/:idOrSlug', async (c) => {
  const idOrSlug = c.req.param('idOrSlug')
  const club = await c.env.DB.prepare(
    `SELECT * FROM clubs WHERE id = ? OR slug = ? LIMIT 1`
  ).bind(idOrSlug, idOrSlug).first()
  if (!club) return c.json(jsonErr('Club not found'), 404)

  const memberCount = await c.env.DB.prepare(
    `SELECT COUNT(*) AS n FROM members WHERE club_id = ?`
  ).bind((club as any).id).first<{ n: number }>()

  const runStats = await c.env.DB.prepare(
    `SELECT COUNT(*) AS run_count,
            COALESCE(SUM(distance_km), 0) AS total_km
       FROM runs WHERE club_id = ?`
  ).bind((club as any).id).first<{ run_count: number; total_km: number }>()

  return c.json(jsonOk({
    club,
    stats: {
      members: memberCount?.n || 0,
      runs: runStats?.run_count || 0,
      total_km: Number(runStats?.total_km || 0),
    },
  }))
})

// Create club
clubs.post('/', async (c) => {
  const body = await c.req.json().catch(() => ({})) as any
  const { name, slug, city, province, description } = body
  if (!name || !slug || !city) {
    return c.json(jsonErr('Missing required fields: name, slug, city'), 400)
  }
  const id = 'club_' + uuid().slice(0, 8)
  try {
    await c.env.DB.prepare(
      `INSERT INTO clubs (id, name, slug, city, province, description)
       VALUES (?, ?, ?, ?, COALESCE(?, 'Jawa Tengah'), ?)`
    ).bind(id, name, slug, city, province, description || null).run()
  } catch (e: any) {
    return c.json(jsonErr(e?.message || 'Insert failed (slug may be duplicate)'), 400)
  }
  const club = await c.env.DB.prepare(`SELECT * FROM clubs WHERE id = ?`).bind(id).first()
  return c.json(jsonOk({ club }), 201)
})

// Club leaderboard (sum km per member, last 30 days)
clubs.get('/:idOrSlug/leaderboard', async (c) => {
  const idOrSlug = c.req.param('idOrSlug')
  const club = await c.env.DB.prepare(
    `SELECT id FROM clubs WHERE id = ? OR slug = ? LIMIT 1`
  ).bind(idOrSlug, idOrSlug).first<{ id: string }>()
  if (!club) return c.json(jsonErr('Club not found'), 404)

  const { results } = await c.env.DB.prepare(
    `SELECT m.id AS member_id, m.name, m.role,
            COUNT(r.id) AS runs,
            COALESCE(SUM(r.distance_km), 0) AS total_km,
            COALESCE(AVG(r.pace_min_km), 0) AS avg_pace
       FROM members m
       LEFT JOIN runs r ON r.member_id = m.id
                        AND r.run_date >= date('now','-30 day')
      WHERE m.club_id = ?
      GROUP BY m.id
      ORDER BY total_km DESC, runs DESC
      LIMIT 50`
  ).bind(club.id).all()

  return c.json(jsonOk({ leaderboard: results || [] }))
})

export default clubs
