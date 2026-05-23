// Simple dashboard placeholder (Day 1 — leaderboard + recent runs)
export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard — PaceLokal</title>
  <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
</head>
<body class="bg-slate-950 text-slate-100">
  <header class="border-b border-slate-800">
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" class="font-extrabold text-lg">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-md bg-emerald-500 text-slate-900 font-black mr-2">PL</span>
        PaceLokal · Dashboard
      </a>
      <a href="/" class="text-sm text-slate-400 hover:text-emerald-400">← Kembali</a>
    </nav>
  </header>
  <main class="max-w-6xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-black mb-2">Operator Dashboard</h1>
    <p class="text-slate-400 mb-8">Real-time stats dari D1. Refresh halaman untuk data terbaru.</p>

    <section class="grid md:grid-cols-3 gap-4 mb-10" id="dash-stats">
      <div class="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400 uppercase tracking-wider">Recent Runs (7 hari)</div>
        <div class="text-3xl font-black text-emerald-400 mt-2" data-stat="weekly-runs">—</div>
        <div class="text-xs text-slate-500" data-stat="weekly-km">— km</div>
      </div>
      <div class="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400 uppercase tracking-wider">Recent Invoices</div>
        <div class="text-3xl font-black text-emerald-400 mt-2" data-stat="invoices">—</div>
        <div class="text-xs text-slate-500" data-stat="invoices-settled">— settled</div>
      </div>
      <div class="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div class="text-xs text-slate-400 uppercase tracking-wider">Service</div>
        <div class="text-lg font-bold text-emerald-400 mt-2">PaceLokal</div>
        <div class="text-xs text-slate-500" data-stat="version">—</div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold mb-3">Invoices Terbaru</h2>
      <div id="invoices-table" class="rounded-xl border border-slate-800 overflow-hidden">
        <div class="p-4 text-slate-500 text-sm">Loading…</div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-bold mb-3">Webhook Log (audit)</h2>
      <div id="webhook-info" class="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
        Inbound webhook OBP di-log ke tabel <code>obp_webhook_log</code>.
        Endpoint: <code class="text-emerald-400">POST /api/payments/webhooks/obp</code>
      </div>
    </section>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <script src="/static/dashboard.js"></script>
</body>
</html>`
