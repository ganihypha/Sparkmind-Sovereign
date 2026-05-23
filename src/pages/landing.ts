// PaceLokal — Landing page (server-rendered HTML string)
// Sovereign dark theme. Indonesian-first copy.

export const LANDING_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PaceLokal — Hyperlocal Running · Banyumas Raya → Indonesia</title>
  <meta name="description" content="PaceLokal — komunitas pelari hyperlocal Indonesia. Layer 3 on top of Strava/Garmin. Mulai dari Purwokerto." />
  <meta property="og:title" content="PaceLokal — Hyperlocal Running" />
  <meta property="og:description" content="Komunitas pelari lokal. Klub, event, leaderboard. Pembayaran via Oasis BI Pro (MoR)." />
  <meta property="og:image" content="/static/og-image.svg" />
  <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <link href="/static/styles.css" rel="stylesheet" />
</head>
<body class="bg-slate-950 text-slate-100 antialiased">
  <header class="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800" id="site-header">
    <nav class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
      <a href="/" class="flex items-center gap-2 group" id="brand-link">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-900 font-black shadow-lg shadow-emerald-500/20">PL</span>
        <span class="font-extrabold text-lg tracking-tight">PaceLokal</span>
        <span class="hidden sm:inline text-xs text-slate-400 ml-1">· Hyperlocal Running</span>
      </a>
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <li><a class="hover:text-emerald-400 transition" href="#klub">Klub</a></li>
        <li><a class="hover:text-emerald-400 transition" href="#event">Event</a></li>
        <li><a class="hover:text-emerald-400 transition" href="#leaderboard">Leaderboard</a></li>
        <li><a class="hover:text-emerald-400 transition" href="#pricing">Pro</a></li>
        <li><a class="hover:text-emerald-400 transition" href="/dashboard">Dashboard</a></li>
      </ul>
      <a href="#klub" class="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-md shadow-emerald-500/20">
        <i class="fas fa-rocket mr-1"></i> Mulai
      </a>
    </nav>
  </header>

  <main>
    <!-- HERO -->
    <section id="hero-section" class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          SUB-BRAND #2 · SPARKMIND SOVEREIGN ECOSYSTEM
        </div>
        <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Lari lokal,<br/>
          <span class="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">data sovereign.</span>
        </h1>
        <p class="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl">
          PaceLokal — komunitas pelari hyperlocal Indonesia.
          Layer di atas Strava/Garmin. Mulai dari Banyumas Raya, lanjut ke Jawa Tengah, lalu Indonesia.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#klub" class="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-lg shadow-emerald-500/30">
            <i class="fas fa-running mr-2"></i> Jelajahi Klub
          </a>
          <a href="#event" class="px-6 py-3 rounded-lg border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-900/50 text-slate-100 font-semibold transition">
            <i class="fas fa-calendar-alt mr-2"></i> Event Mendatang
          </a>
          <a href="/api/health" class="px-6 py-3 rounded-lg border border-slate-800 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200 font-medium text-sm transition">
            <i class="fas fa-heartbeat mr-2"></i> API Health
          </a>
        </div>
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" id="hero-stats">
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl font-black text-emerald-400" data-stat="clubs">—</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Klub aktif</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl font-black text-emerald-400" data-stat="members">—</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Pelari</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl font-black text-emerald-400" data-stat="runs">—</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Sesi lari</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div class="text-3xl font-black text-emerald-400" data-stat="km">—</div>
            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Total km</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CLUBS -->
    <section id="klub" class="max-w-6xl mx-auto px-6 py-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-3xl md:text-4xl font-black">Klub Lari</h2>
          <p class="text-slate-400 mt-2">Tiap klub adalah tenant sendiri. Multi-tenant by design.</p>
        </div>
        <a href="#" id="refresh-clubs" class="text-emerald-400 hover:text-emerald-300 text-sm font-semibold">
          <i class="fas fa-rotate-right"></i> Refresh
        </a>
      </div>
      <div id="clubs-list" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-6 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse">
          <div class="h-6 bg-slate-800 rounded w-2/3 mb-3"></div>
          <div class="h-4 bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section id="event" class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-3xl md:text-4xl font-black">Event Mendatang</h2>
          <p class="text-slate-400 mt-2">Race, group run, training. Bayar via OBP (Merchant-of-Record).</p>
        </div>
      </div>
      <div id="events-list" class="grid md:grid-cols-2 gap-4">
        <div class="p-6 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse h-32"></div>
      </div>
    </section>

    <!-- PRICING / PRO -->
    <section id="pricing" class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
      <h2 class="text-3xl md:text-4xl font-black mb-3">PaceLokal Pro · untuk Klub</h2>
      <p class="text-slate-400 mb-8 max-w-2xl">
        Upgrade klub kamu jadi Pro. Member unlimited, leaderboard advanced, branding kustom, dan event berbayar tanpa biaya transaksi tambahan dari PaceLokal.
      </p>
      <div class="grid md:grid-cols-2 gap-6 max-w-3xl">
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Free</div>
          <div class="mt-2 text-4xl font-black">Rp 0</div>
          <div class="text-sm text-slate-500">/ bulan</div>
          <ul class="mt-6 space-y-2 text-sm text-slate-300">
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>1 klub · 50 member</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Run logging manual + Strava</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Leaderboard basic</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Event gratis tanpa batas</li>
          </ul>
        </div>
        <div class="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 relative">
          <span class="absolute -top-3 left-6 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500 text-slate-950">PRO</span>
          <div class="text-xs font-bold text-emerald-300 uppercase tracking-widest">PaceLokal Pro</div>
          <div class="mt-2 text-4xl font-black">Rp 49.000</div>
          <div class="text-sm text-slate-400">/ klub / bulan</div>
          <ul class="mt-6 space-y-2 text-sm text-slate-200">
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Member unlimited</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Leaderboard advanced + analytics</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Branding kustom + subdomain</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Event berbayar (settled via OBP)</li>
            <li><i class="fas fa-check text-emerald-400 mr-2"></i>Priority support</li>
          </ul>
          <button id="upgrade-pro-btn" class="mt-6 w-full px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition">
            <i class="fas fa-bolt mr-1"></i> Upgrade Pro (demo)
          </button>
          <p class="mt-3 text-[11px] text-slate-400 leading-relaxed">
            Pembayaran diproses oleh <strong class="text-slate-200">Oasis BI Pro</strong> (oasis-bi-pro.web.id) sebagai Merchant-of-Record untuk ekosistem SparkMind. Pemrosesan kartu/bank melalui PJP Duitku/Xendit terdaftar BI.
          </p>
        </div>
      </div>
    </section>

    <!-- LEADERBOARD -->
    <section id="leaderboard" class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
      <h2 class="text-3xl md:text-4xl font-black mb-3">Leaderboard 30 Hari</h2>
      <p class="text-slate-400 mb-6">Pilih klub untuk lihat ranking member-nya.</p>
      <div class="flex gap-3 mb-6">
        <select id="leaderboard-club-select" aria-label="Pilih klub" class="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm">
          <option value="">— Pilih Klub —</option>
        </select>
      </div>
      <div id="leaderboard-table" class="rounded-xl overflow-hidden border border-slate-800">
        <div class="p-6 text-slate-500 text-sm">Pilih klub di atas untuk melihat leaderboard.</div>
      </div>
    </section>

    <!-- DOCTRINE / ARCH -->
    <section class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
      <h2 class="text-3xl md:text-4xl font-black mb-6">Arsitektur 4-Layer</h2>
      <div class="grid md:grid-cols-4 gap-4 text-sm">
        <div class="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Layer 1 · Brand</div>
          <div class="mt-2 font-bold text-lg">PaceLokal</div>
          <div class="text-slate-400 text-xs mt-1">Sub-brand SparkMind</div>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Layer 2 · Merchant</div>
          <div class="mt-2 font-bold text-lg">Oasis BI Pro</div>
          <div class="text-slate-400 text-xs mt-1">Single MoR, Duitku D20919</div>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Layer 3 · Domain</div>
          <div class="mt-2 font-bold text-lg">pacelokal.sparkmind.web.id</div>
          <div class="text-slate-400 text-xs mt-1">Cloudflare Pages</div>
        </div>
        <div class="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Layer 4 · Compliance</div>
          <div class="mt-2 font-bold text-lg">UU PDP · PSE</div>
          <div class="text-slate-400 text-xs mt-1">Umbrella under OBP</div>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-slate-900 mt-12">
    <div class="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-400">
      <div>
        <div class="font-extrabold text-slate-100 text-lg mb-2">PaceLokal</div>
        <p>Hyperlocal running platform. Sub-brand SparkMind Sovereign ecosystem.</p>
      </div>
      <div>
        <div class="font-bold text-slate-200 mb-2">Ekosistem</div>
        <ul class="space-y-1">
          <li><a class="hover:text-emerald-400" href="https://github.com/ganihypha/Sparkmind-Sovereign" target="_blank" rel="noopener">Sparkmind-Sovereign (monorepo)</a></li>
          <li><a class="hover:text-emerald-400" href="https://github.com/ganihypha/oasis-bi-pro" target="_blank" rel="noopener">Oasis BI Pro (MoR)</a></li>
          <li><a class="hover:text-emerald-400" href="https://github.com/ganihypha/Pacelokal" target="_blank" rel="noopener">Pacelokal (this repo)</a></li>
        </ul>
      </div>
      <div>
        <div class="font-bold text-slate-200 mb-2">Legal</div>
        <p class="text-xs leading-relaxed">
          Pembayaran diproses oleh <strong class="text-slate-200">Oasis BI Pro</strong> (oasis-bi-pro.web.id) sebagai Merchant-of-Record. Pemrosesan kartu/bank melalui PJP Duitku/Xendit terdaftar di Bank Indonesia.
        </p>
      </div>
    </div>
    <div class="border-t border-slate-900">
      <div class="max-w-6xl mx-auto px-6 py-4 text-xs text-slate-500 flex flex-wrap justify-between gap-2">
        <span>© 2026 PaceLokal · Sovereign AI Dev</span>
        <span>Doctrine: Master-Architect v7.0 · OBP HYBRID LOCK</span>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <script src="/static/app.js"></script>
</body>
</html>`
