// PaceLokal — Dashboard JS
(function () {
  'use strict'
  const api = axios.create({ baseURL: '/api', timeout: 15000 })

  function fmtIDR(n) { return 'Rp ' + Number(n || 0).toLocaleString('id-ID') }
  function fmtDate(epoch) { return epoch ? new Date(epoch * 1000).toLocaleString('id-ID') : '—' }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  async function loadDash() {
    try {
      const [hs, inv, wk] = await Promise.all([
        api.get('/health'),
        api.get('/payments/invoices?limit=50'),
        api.get('/runs/summary/weekly'),
      ])
      const ver = document.querySelector('[data-stat="version"]')
      if (ver) ver.textContent = (hs.data.service || 'PaceLokal') + ' v' + (hs.data.version || '0.1.0')

      const invs = inv.data.invoices || []
      const settled = invs.filter(function (i) { return i.status === 'settled' }).length
      document.querySelector('[data-stat="invoices"]').textContent = invs.length
      document.querySelector('[data-stat="invoices-settled"]').textContent = settled + ' settled'

      const days = wk.data.days || []
      const totalRuns = days.reduce(function (a, d) { return a + Number(d.runs || 0) }, 0)
      const totalKm = days.reduce(function (a, d) { return a + Number(d.km || 0) }, 0)
      document.querySelector('[data-stat="weekly-runs"]').textContent = totalRuns
      document.querySelector('[data-stat="weekly-km"]').textContent = totalKm.toFixed(1) + ' km · 7 hari'

      const t = document.getElementById('invoices-table')
      if (!invs.length) { t.innerHTML = '<div class="p-6 text-slate-500 text-sm">Belum ada invoice.</div>'; return }
      let html = '<table class="w-full text-sm"><thead class="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider"><tr>' +
        '<th class="p-3 text-left">External Ref</th>' +
        '<th class="p-3 text-left">Purpose</th>' +
        '<th class="p-3 text-right">Amount</th>' +
        '<th class="p-3 text-left">Status</th>' +
        '<th class="p-3 text-left">Customer</th>' +
        '<th class="p-3 text-left">Created</th>' +
        '</tr></thead><tbody>'
      invs.forEach(function (i) {
        const badge = i.status === 'settled'
          ? 'bg-emerald-500/20 text-emerald-300'
          : i.status === 'pending' ? 'bg-amber-500/20 text-amber-300'
          : 'bg-red-500/20 text-red-300'
        html += '<tr class="border-t border-slate-800">' +
          '<td class="p-3 font-mono text-xs">' + escapeHtml(i.external_ref) + '</td>' +
          '<td class="p-3 text-xs text-slate-300">' + escapeHtml(i.purpose) + '</td>' +
          '<td class="p-3 text-right font-bold">' + fmtIDR(i.amount_idr) + '</td>' +
          '<td class="p-3"><span class="px-2 py-1 rounded-md text-xs font-bold ' + badge + '">' + escapeHtml(i.status) + '</span></td>' +
          '<td class="p-3 text-xs">' + escapeHtml(i.customer_name) + '<br/><span class="text-slate-500">' + escapeHtml(i.customer_email) + '</span></td>' +
          '<td class="p-3 text-xs text-slate-400">' + fmtDate(i.created_at) + '</td>' +
          '</tr>'
      })
      html += '</tbody></table>'
      t.innerHTML = html
    } catch (e) {
      console.error(e)
    }
  }

  document.addEventListener('DOMContentLoaded', loadDash)
})()
