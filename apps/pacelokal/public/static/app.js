// PaceLokal — Frontend logic for landing page
// Hydrates stats, clubs, events, leaderboard, and triggers Pro upgrade flow.

(function () {
  'use strict'
  const api = axios.create({ baseURL: '/api', timeout: 15000 })

  function toast(msg, kind) {
    const el = document.createElement('div')
    el.className = 'toast ' + (kind || '')
    el.textContent = msg
    document.body.appendChild(el)
    setTimeout(function () { el.remove() }, 3500)
  }

  function fmtIDR(n) {
    return 'Rp ' + Number(n || 0).toLocaleString('id-ID')
  }

  function el(tag, attrs, html) {
    const e = document.createElement(tag)
    Object.entries(attrs || {}).forEach(function (kv) {
      if (kv[0] === 'class') e.className = kv[1]
      else if (kv[0] === 'html') e.innerHTML = kv[1]
      else e.setAttribute(kv[0], kv[1])
    })
    if (html != null && (attrs || {}).html == null) e.innerHTML = html
    return e
  }

  // ---------- HERO STATS ----------
  async function loadStats() {
    try {
      const { data } = await api.get('/stats')
      const s = data.stats || {}
      const map = { clubs: s.clubs, members: s.members, runs: s.runs, km: s.total_km }
      Object.entries(map).forEach(function (kv) {
        const node = document.querySelector('[data-stat="' + kv[0] + '"]')
        if (node) node.textContent = Number(kv[1] || 0).toLocaleString('id-ID')
      })
    } catch (e) { console.error('stats error', e) }
  }

  // ---------- CLUBS ----------
  async function loadClubs() {
    const list = document.getElementById('clubs-list')
    if (!list) return
    list.innerHTML = '<div class="text-slate-500 text-sm col-span-full">Memuat klub…</div>'
    try {
      const { data } = await api.get('/clubs')
      const clubs = data.clubs || []
      if (!clubs.length) { list.innerHTML = '<div class="text-slate-500">Belum ada klub.</div>'; return }
      list.innerHTML = ''
      clubs.forEach(function (c) {
        const card = el('article', { class: 'card-lift p-6 rounded-xl bg-slate-900/60 border border-slate-800', id: 'club-' + c.id })
        card.innerHTML = (
          '<div class="flex items-start justify-between mb-3">' +
            '<div>' +
              '<h3 class="font-bold text-lg">' + escapeHtml(c.name) + '</h3>' +
              '<p class="text-xs text-slate-400 mt-1"><i class="fas fa-location-dot mr-1"></i>' + escapeHtml(c.city) + ', ' + escapeHtml(c.province || 'Jawa Tengah') + '</p>' +
            '</div>' +
            (c.plan === 'pro'
              ? '<span class="px-2 py-1 text-[10px] rounded-md bg-emerald-500/20 text-emerald-300 font-bold">PRO</span>'
              : '<span class="px-2 py-1 text-[10px] rounded-md bg-slate-800 text-slate-400">FREE</span>') +
          '</div>' +
          '<p class="text-sm text-slate-300 leading-relaxed">' + escapeHtml(c.description || '') + '</p>' +
          '<div class="mt-4 flex gap-2 text-xs">' +
            '<button data-club="' + c.id + '" class="upgrade-btn px-3 py-1 rounded-md border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-300 transition">' +
              (c.plan === 'pro' ? 'Manage Pro' : 'Upgrade Pro') +
            '</button>' +
            '<a href="#leaderboard" data-select-club="' + c.id + '" class="select-club px-3 py-1 rounded-md border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-100">' +
              'Lihat leaderboard' +
            '</a>' +
          '</div>'
        )
        list.appendChild(card)
      })

      // Hook leaderboard select
      const sel = document.getElementById('leaderboard-club-select')
      if (sel) {
        sel.innerHTML = '<option value="">— Pilih Klub —</option>' +
          clubs.map(function (c) { return '<option value="' + c.id + '">' + escapeHtml(c.name) + '</option>' }).join('')
        sel.onchange = function () { if (sel.value) loadLeaderboard(sel.value) }
      }

      // Hook upgrade buttons
      list.querySelectorAll('.upgrade-btn').forEach(function (b) {
        b.addEventListener('click', function () { promptUpgrade(b.getAttribute('data-club')) })
      })
      list.querySelectorAll('.select-club').forEach(function (a) {
        a.addEventListener('click', function () {
          const id = a.getAttribute('data-select-club')
          if (sel) { sel.value = id; loadLeaderboard(id) }
        })
      })
    } catch (e) {
      console.error(e)
      list.innerHTML = '<div class="text-red-400">Gagal memuat klub: ' + (e.message || e) + '</div>'
    }
  }

  // ---------- EVENTS ----------
  async function loadEvents() {
    const list = document.getElementById('events-list')
    if (!list) return
    list.innerHTML = '<div class="text-slate-500 text-sm col-span-full">Memuat event…</div>'
    try {
      const { data } = await api.get('/events?upcoming=true')
      const events = data.events || []
      if (!events.length) { list.innerHTML = '<div class="text-slate-500">Belum ada event mendatang.</div>'; return }
      list.innerHTML = ''
      events.forEach(function (e) {
        const isFree = !e.fee_idr || e.fee_idr === 0
        const card = el('article', { class: 'card-lift p-6 rounded-xl bg-slate-900/60 border border-slate-800' })
        card.innerHTML = (
          '<div class="flex items-start justify-between mb-3">' +
            '<div class="flex-1">' +
              '<div class="text-xs text-emerald-400 font-bold uppercase tracking-wider">' + escapeHtml(e.club_name) + '</div>' +
              '<h3 class="font-bold text-lg mt-1">' + escapeHtml(e.title) + '</h3>' +
              '<p class="text-xs text-slate-400 mt-1">' +
                '<i class="fas fa-calendar mr-1"></i>' + escapeHtml(e.event_date) + (e.event_time ? ' · ' + escapeHtml(e.event_time) : '') +
                ' · <i class="fas fa-location-dot ml-1 mr-1"></i>' + escapeHtml(e.location) +
              '</p>' +
            '</div>' +
            (isFree
              ? '<span class="px-2 py-1 text-[10px] rounded-md bg-emerald-500/20 text-emerald-300 font-bold">GRATIS</span>'
              : '<span class="px-2 py-1 text-[10px] rounded-md bg-amber-500/20 text-amber-300 font-bold">' + fmtIDR(e.fee_idr) + '</span>') +
          '</div>' +
          '<p class="text-sm text-slate-300 leading-relaxed">' + escapeHtml(e.description || '') + '</p>' +
          '<div class="mt-4 flex gap-2 items-center text-xs">' +
            '<button data-event="' + e.id + '" data-fee="' + (e.fee_idr || 0) + '" class="register-btn px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition">' +
              (isFree ? 'Daftar gratis' : 'Daftar · ' + fmtIDR(e.fee_idr)) +
            '</button>' +
            (e.distance_km ? '<span class="text-slate-500"><i class="fas fa-route mr-1"></i>' + e.distance_km + ' km</span>' : '') +
          '</div>'
        )
        list.appendChild(card)
      })

      list.querySelectorAll('.register-btn').forEach(function (b) {
        b.addEventListener('click', function () { promptEventRegister(b.getAttribute('data-event'), Number(b.getAttribute('data-fee') || 0)) })
      })
    } catch (e) {
      console.error(e)
      list.innerHTML = '<div class="text-red-400">Gagal memuat event.</div>'
    }
  }

  // ---------- LEADERBOARD ----------
  async function loadLeaderboard(clubId) {
    const table = document.getElementById('leaderboard-table')
    if (!table) return
    table.innerHTML = '<div class="p-6 text-slate-500 text-sm">Memuat leaderboard…</div>'
    try {
      const { data } = await api.get('/clubs/' + encodeURIComponent(clubId) + '/leaderboard')
      const rows = data.leaderboard || []
      if (!rows.length) { table.innerHTML = '<div class="p-6 text-slate-500 text-sm">Belum ada data lari di 30 hari terakhir.</div>'; return }
      let html = '<table class="w-full text-sm"><thead class="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider"><tr>' +
        '<th class="p-3 text-left">#</th>' +
        '<th class="p-3 text-left">Pelari</th>' +
        '<th class="p-3 text-right">Sesi</th>' +
        '<th class="p-3 text-right">Total km</th>' +
        '<th class="p-3 text-right">Avg pace</th>' +
        '</tr></thead><tbody>'
      rows.forEach(function (r, i) {
        html += '<tr class="border-t border-slate-800">' +
          '<td class="p-3 font-bold ' + (i < 3 ? 'text-emerald-400' : 'text-slate-500') + '">' + (i + 1) + '</td>' +
          '<td class="p-3">' + escapeHtml(r.name) + ' <span class="text-xs text-slate-500 ml-1">' + escapeHtml(r.role || '') + '</span></td>' +
          '<td class="p-3 text-right">' + (r.runs || 0) + '</td>' +
          '<td class="p-3 text-right font-bold">' + Number(r.total_km || 0).toFixed(2) + '</td>' +
          '<td class="p-3 text-right text-slate-400">' + (r.avg_pace ? Number(r.avg_pace).toFixed(2) + '\'/km' : '—') + '</td>' +
          '</tr>'
      })
      html += '</tbody></table>'
      table.innerHTML = html
    } catch (e) {
      console.error(e)
      table.innerHTML = '<div class="p-6 text-red-400">Gagal memuat leaderboard.</div>'
    }
  }

  // ---------- ACTIONS ----------
  async function promptUpgrade(clubId) {
    const name = prompt('Nama admin klub:')
    if (!name) return
    const email = prompt('Email:')
    if (!email) return
    const phone = prompt('Phone (opsional):') || ''
    try {
      const { data } = await api.post('/payments/club/' + encodeURIComponent(clubId) + '/upgrade-pro', { name: name, email: email, phone: phone })
      if (data && data.checkout_url) {
        toast('Invoice OBP dibuat. Membuka checkout…', 'success')
        setTimeout(function () { window.open(data.checkout_url, '_blank') }, 600)
      } else {
        toast('Gagal: ' + (data.error || 'unknown'), 'error')
      }
    } catch (e) {
      toast('Error: ' + (e.message || e), 'error')
    }
  }

  async function promptEventRegister(eventId, fee) {
    const name = prompt('Nama lengkap:')
    if (!name) return
    const email = prompt('Email:')
    if (!email) return
    const phone = prompt('No. HP (opsional):') || ''
    try {
      const { data } = await api.post('/payments/event/' + encodeURIComponent(eventId) + '/register', { name: name, email: email, phone: phone })
      if (data && data.free) {
        toast('Terdaftar! Sampai jumpa di start line.', 'success')
        return
      }
      if (data && data.checkout_url) {
        toast('Invoice OBP dibuat (' + fmtIDR(fee) + '). Membuka checkout…', 'success')
        setTimeout(function () { window.open(data.checkout_url, '_blank') }, 600)
      } else {
        toast('Gagal: ' + ((data || {}).error || 'unknown'), 'error')
      }
    } catch (e) {
      toast('Error: ' + (e.message || e), 'error')
    }
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', function () {
    loadStats()
    loadClubs()
    loadEvents()

    const refresh = document.getElementById('refresh-clubs')
    if (refresh) refresh.addEventListener('click', function (e) { e.preventDefault(); loadClubs(); loadStats() })

    const upgrade = document.getElementById('upgrade-pro-btn')
    if (upgrade) upgrade.addEventListener('click', function () {
      // Pick first FREE club; if none, prompt for club id
      api.get('/clubs').then(function (r) {
        const free = (r.data.clubs || []).filter(function (c) { return c.plan !== 'pro' })
        if (free.length) promptUpgrade(free[0].id)
        else {
          const id = prompt('Masukkan club_id untuk upgrade:')
          if (id) promptUpgrade(id)
        }
      })
    })
  })
})()
