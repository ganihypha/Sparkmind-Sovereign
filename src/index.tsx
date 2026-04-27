import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

// ============================================
// ROUTES
// ============================================
app.get('/', (c) => c.html(LANDING_HTML))
app.get('/app', (c) => c.html(APP_HTML))

// ============================================
// API ROUTES
// ============================================
app.post('/api/analyze', async (c) => {
  const { message, mode, history } = await c.req.json()
  const response = generateStrategicResponse(message, mode || 'strategic', history || [])
  return c.json({ response, timestamp: new Date().toISOString(), mode, tokens: Math.floor(Math.random() * 200) + 100 })
})

app.post('/api/swot', async (c) => {
  const { business } = await c.req.json()
  const response = generateSWOT(business)
  return c.json({ response, timestamp: new Date().toISOString() })
})

app.post('/api/coach', async (c) => {
  const { goal, currentState, obstacles } = await c.req.json()
  const response = generateCoachResponse(goal, currentState, obstacles)
  return c.json({ response, timestamp: new Date().toISOString() })
})

app.get('/api/resources', (c) => c.json({ resources: RESOURCES_DATA }))
app.get('/api/insights', (c) => c.json({ insights: INSIGHTS_DATA }))
app.get('/api/quotes', (c) => {
  const q = QUOTES_DATA[Math.floor(Math.random() * QUOTES_DATA.length)]
  return c.json(q)
})
app.get('/api/health', (c) => c.json({ status: 'ok', service: 'SparkMind V3 API', version: '3.0.0', engine: 'Sovereign AI Engine V3', categories: 12 }))

// ============================================
// AI STRATEGIC ENGINE V3 — CONTEXTUAL + MULTI-TURN
// ============================================
function generateStrategicResponse(message: string, mode: string, history: any[]): string {
  const m = message.toLowerCase()

  if (mode === 'swot') return generateSWOT(message)
  if (mode === 'mindmap') return generateMindMap(message)
  if (mode === 'coach') return generateCoachResponse(message, '', '')

  // Business / Entrepreneurship
  if (m.includes('bisnis') || m.includes('usaha') || m.includes('jualan') || m.includes('startup') || m.includes('toko') || m.includes('online shop') || m.includes('e-commerce') || m.includes('dropship') || m.includes('franchise') || m.includes('modal')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2 flex-wrap"><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">BISNIS</span><span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20">HIGH CONFIDENCE</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3 ENGINE</span></div>
      <p class="font-bold text-white text-lg">Deep Strategic Analysis: Memulai & Mengembangkan Bisnis</p>
      <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
        <p class="text-blue-400 text-xs font-bold mb-2">📊 EXECUTIVE SUMMARY</p>
        <p class="text-gray-300 text-sm">Berdasarkan analisis 500+ startup Indonesia, 67% gagal karena tidak validasi pasar. Berikut adalah <strong class="text-white">proven framework</strong> yang digunakan startup sukses:</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">1</span>
          <div><p class="font-bold text-white text-sm">🔍 Market Validation Sprint (Minggu 1-2)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>• Riset 5 kompetitor utama — catat pricing, USP, dan kelemahannya</li><li>• Interview 15-20 calon customer (bisa via WA/IG poll)</li><li>• Identifikasi "Pain Point" terbesar yang belum terpecahkan</li><li>• Buat hypothesis: "Orang akan bayar Rp X untuk solusi Y"</li></ul></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">2</span>
          <div><p class="font-bold text-white text-sm">🚀 MVP Launch (Minggu 3-4)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>• Buat produk/jasa versi paling sederhana (1 fitur utama saja)</li><li>• Gunakan tools gratis: Canva, WA Business, IG Shop, Tokopedia</li><li>• Launch ke 50 orang pertama — inner circle dulu</li><li>• Kumpulkan feedback langsung: "Apa yang kurang?"</li></ul></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">3</span>
          <div><p class="font-bold text-white text-sm">📈 Growth Engine (Bulan 2-3)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>• Content marketing: buat 3 konten/minggu yang solve pain point</li><li>• Referral system: kasih diskon 20% untuk yang refer teman</li><li>• Mulai paid ads dengan budget kecil (Rp 50K/hari di IG)</li><li>• Target: 50 paying customers dalam 90 hari</li></ul></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">4</span>
          <div><p class="font-bold text-white text-sm">⚙️ Scale & Systemize (Bulan 4-6)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>• Buat SOP untuk setiap proses (order, delivery, CS)</li><li>• Hire 1 orang untuk handle operasional</li><li>• Diversifikasi: tambah 1-2 produk/jasa baru</li><li>• Target MRR: Rp 5-10 juta/bulan</li></ul></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
        <p class="text-amber-400 text-xs font-bold">💎 SOVEREIGN INSIGHT</p>
        <p class="text-gray-300 text-sm mt-1">"Revenue is oxygen for business. Don't build in silence — sell first, build later. Your market will tell you what to build."</p>
      </div>
    </div>`
  }

  // Productivity
  if (m.includes('produktivitas') || m.includes('produktif') || m.includes('fokus') || m.includes('wfh') || m.includes('manajemen waktu') || m.includes('time management') || m.includes('procrastina') || m.includes('malas') || m.includes('distraksi')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2 flex-wrap"><span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20">PRODUKTIVITAS</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3 ENGINE</span></div>
      <p class="font-bold text-white text-lg">Deep Analysis: Sistem Produktivitas Tingkat Tinggi</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
        <p class="text-emerald-400 text-xs font-bold mb-2">📊 ROOT CAUSE ANALYSIS</p>
        <p class="text-gray-300 text-sm">Produktivitas rendah biasanya berakar dari 3 hal: <strong class="text-white">kurang struktur</strong>, <strong class="text-white">distraksi berlebihan</strong>, atau <strong class="text-white">energy management yang buruk</strong>.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">⏰ Deep Work Protocol</p><p class="text-gray-400 text-xs mt-1">Blok 90 menit tanpa gangguan. HP silent, notif off, pintu tutup. Otak butuh 23 menit untuk kembali fokus setelah distraksi.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🎯 MIT Method (Most Important Task)</p><p class="text-gray-400 text-xs mt-1">Setiap pagi, tentukan 1 tugas TERPENTING. Kerjakan PERTAMA sebelum buka email/socmed. Ini saja sudah boost produktivitas 2x.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">🔋 Energy Management &gt; Time Management</p><p class="text-gray-400 text-xs mt-1">Tidur 7-8 jam, olahraga 3x/minggu, makan bersih. CEO top dunia prioritaskan kesehatan karena itu fondasi performa.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
          <div><p class="font-bold text-white text-sm">🍅 Pomodoro Technique</p><p class="text-gray-400 text-xs mt-1">25 menit fokus → 5 menit istirahat. Setelah 4 siklus, istirahat 15-30 menit. Gunakan Pomodoro Timer di SparkMind!</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
        <p class="text-purple-400 text-xs font-bold">⚡ QUICK WIN — Mulai Besok</p>
        <p class="text-gray-300 text-sm mt-1">Matikan semua notifikasi HP, kerjakan 1 MIT selama 90 menit pertama hari, lalu istirahat 15 menit. Ulangi. Dalam 1 minggu, rasakan perbedaannya.</p>
      </div>
    </div>`
  }

  // Programming / Tech / Learning
  if (m.includes('programming') || m.includes('coding') || m.includes('developer') || m.includes('belajar') || m.includes('roadmap') || m.includes('javascript') || m.includes('python') || m.includes('react') || m.includes('web') || m.includes('ai') || m.includes('machine learning') || m.includes('data')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2 flex-wrap"><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">TECH & SKILL</span><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">V3 ENGINE</span></div>
      <p class="font-bold text-white text-lg">Learning Roadmap: Dari Nol ke Developer Profesional</p>
      <div class="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
        <p class="text-purple-400 text-xs font-bold mb-2">📊 MARKET INSIGHT</p>
        <p class="text-gray-300 text-sm">Gaji developer junior di Indonesia: Rp 6-15 jt/bulan. Freelance bisa Rp 10-50 jt/project. Demand terus naik 25%/tahun. AI engineer: Rp 20-60 jt/bulan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">🏗️ Foundation (Bulan 1)</p><p class="text-gray-400 text-xs mt-1">HTML + CSS + JS dasar. Buat 3 mini project. Resource gratis: freeCodeCamp, The Odin Project, Scrimba.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">⚛️ Framework Mastery (Bulan 2-3)</p><p class="text-gray-400 text-xs mt-1">Pick 1: React (paling banyak lowongan) atau Next.js. Buat 2 real project. Pelajari API integration & state management.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">💼 Portfolio & Job Hunt (Bulan 4-5)</p><p class="text-gray-400 text-xs mt-1">Portfolio website + 3 showcase projects + GitHub aktif. Apply di LinkedIn, Glints, Kalibrr, dan Upwork.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
          <div><p class="font-bold text-white text-sm">💰 Monetize & Specialize (Bulan 6+)</p><p class="text-gray-400 text-xs mt-1">Target: Rp 5-15 jt/bulan. Specialisasi: AI/ML, mobile dev, cloud. Freelance, remote job, atau build SaaS sendiri.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
        <p class="text-cyan-400 text-xs font-bold">🎯 DAILY PROTOCOL</p>
        <p class="text-gray-300 text-sm mt-1">Minimal 2 jam belajar + 1 jam coding/hari. 100 hari konsisten = kamu sudah lebih baik dari 90% pemula.</p>
      </div>
    </div>`
  }

  // Career
  if (m.includes('karir') || m.includes('promosi') || m.includes('gaji') || m.includes('jabatan') || m.includes('interview') || m.includes('resign') || m.includes('pindah kerja') || m.includes('cv') || m.includes('resume') || m.includes('lowongan')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">KARIR</span></div>
      <p class="font-bold text-white text-lg">Career Acceleration Framework</p>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
        <p class="text-amber-400 text-xs font-bold mb-2">📊 CAREER INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">80% promosi ditentukan oleh <strong class="text-white">visibility + relationship</strong>, bukan hanya hard skill. Kamu butuh strategi di kedua area ini.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">👁️ Visibility Strategy</p><p class="text-gray-400 text-xs mt-1">Share progress di meeting, dokumentasikan achievements, volunteer di project high-impact. Bikin decision makers LIHAT kontribusimu.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🧩 Skill Stacking</p><p class="text-gray-400 text-xs mt-1">Kombinasi skill unik = rare & valuable. Technical + Communication = pemimpin. Invest di skill yang jarang dimiliki peers.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">🤝 Strategic Networking</p><p class="text-gray-400 text-xs mt-1">Build relationship dengan 3 decision makers. Jadwalkan 1-on-1 dengan manager: "What would it take for me to get promoted?"</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-rose-500/10 to-red-500/10 border border-rose-500/20 rounded-xl p-4">
        <p class="text-rose-400 text-xs font-bold">🔥 ACTION ITEM MINGGU INI</p>
        <p class="text-gray-300 text-sm mt-1">Jadwalkan coffee chat dengan 1 senior leader. Tanya soal career path mereka. Satu koneksi bisa mengubah trajectory karirmu.</p>
      </div>
    </div>`
  }

  // Finance
  if (m.includes('uang') || m.includes('keuangan') || m.includes('tabung') || m.includes('investasi') || m.includes('finansial') || m.includes('hutang') || m.includes('income') || m.includes('nabung') || m.includes('saham') || m.includes('crypto') || m.includes('reksadana') || m.includes('budgeting')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20">FINANSIAL</span></div>
      <p class="font-bold text-white text-lg">Financial Independence Blueprint</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
        <p class="text-emerald-400 text-xs font-bold mb-2">📊 FINANCIAL HEALTH CHECK</p>
        <p class="text-gray-300 text-sm">Rata-rata orang Indonesia menabung &lt; 10% income. Dengan strategi ini, kamu bisa capai emergency fund dalam 6 bulan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">📊 Financial Audit</p><p class="text-gray-400 text-xs mt-1">Track SEMUA pengeluaran 30 hari. Gunakan app atau spreadsheet. "You can't manage what you don't measure."</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🛡️ Emergency Fund First</p><p class="text-gray-400 text-xs mt-1">Target: 3-6 bulan pengeluaran. Simpan di rekening terpisah. INI prioritas #1 sebelum investasi apapun.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">💰 Multiple Income Streams</p><p class="text-gray-400 text-xs mt-1">Jangan bergantung pada 1 income. Side hustle dari skill: freelance, mengajar, content creation. Target: +Rp 2-5 jt/bulan.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
          <div><p class="font-bold text-white text-sm">📈 Invest Wisely</p><p class="text-gray-400 text-xs mt-1">Mulai dari reksadana pasar uang (low risk). Lalu pelajari saham. Jangan masuk crypto tanpa riset. Invest apa yang kamu pahami.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4">
        <p class="text-emerald-400 text-xs font-bold">💎 WEALTH PRINCIPLE</p>
        <p class="text-gray-300 text-sm mt-1">"Bukan berapa yang kamu hasilkan, tapi berapa yang kamu simpan." Mulai hari ini: sisihkan 20% income PERTAMA sebelum belanja apapun.</p>
      </div>
    </div>`
  }

  // Mental Health
  if (m.includes('stress') || m.includes('burnout') || m.includes('mental') || m.includes('motivasi') || m.includes('galau') || m.includes('overthink') || m.includes('sedih') || m.includes('anxiety') || m.includes('depresi') || m.includes('lelah') || m.includes('capek') || m.includes('susah tidur') || m.includes('insomnia')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-lg text-xs font-bold border border-rose-500/20">MENTAL HEALTH</span><span class="px-2.5 py-1 bg-pink-500/10 text-pink-400 rounded-lg text-xs font-bold border border-pink-500/20">IMPORTANT</span></div>
      <p class="font-bold text-white text-lg">Mental Resilience Framework</p>
      <div class="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4">
        <p class="text-rose-400 text-xs font-bold mb-2">❤️ IMPORTANT NOTE</p>
        <p class="text-gray-300 text-sm">Mental health itu nyata dan valid. Jika kamu merasa sangat overwhelmed, jangan ragu untuk bicara dengan profesional. Into The Light ID: 119. Berikut strategi yang bisa membantu:</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">🧘 Grounding Technique (5-4-3-2-1)</p><p class="text-gray-400 text-xs mt-1">Sebutkan 5 hal yang kamu lihat, 4 yang disentuh, 3 suara, 2 bau, 1 rasa. Ini menarik pikiranmu ke present.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">📝 Journaling Protocol</p><p class="text-gray-400 text-xs mt-1">Tulis 3 hal yang kamu syukuri setiap malam. Brain dump pikiran negatif ke kertas — keluarkan dari kepala.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">🔋 Recovery Ritual</p><p class="text-gray-400 text-xs mt-1">Tidur cukup (7-8 jam), jalan kaki 20 menit/hari, kurangi screen time malam. Small habits = big impact on mental health.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
          <div><p class="font-bold text-white text-sm">🧠 Cognitive Reframing</p><p class="text-gray-400 text-xs mt-1">Ubah "Aku gagal" → "Aku sedang belajar". Ubah "Kenapa selalu aku?" → "Ini tantangan yang membuatku lebih kuat". Perspektif menentukan realita.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold">🌟 REMINDER</p>
        <p class="text-gray-300 text-sm mt-1">"You don't have to have it all figured out. Taking care of yourself is the most productive thing you can do." — Kamu sudah cukup baik hari ini.</p>
      </div>
    </div>`
  }

  // Relationship
  if (m.includes('hubungan') || m.includes('pacar') || m.includes('cinta') || m.includes('nikah') || m.includes('relationship') || m.includes('pasangan') || m.includes('jodoh') || m.includes('pacaran') || m.includes('toxic') || m.includes('putus') || m.includes('selingkuh')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-pink-500/10 text-pink-400 rounded-lg text-xs font-bold border border-pink-500/20">RELATIONSHIP</span></div>
      <p class="font-bold text-white text-lg">Relationship Strategic Framework</p>
      <div class="bg-pink-500/5 border border-pink-500/10 rounded-xl p-4">
        <p class="text-pink-400 text-xs font-bold mb-2">📊 SOVEREIGN PERSPECTIVE</p>
        <p class="text-gray-300 text-sm">Hubungan yang sehat dibangun di atas <strong class="text-white">dua individu yang utuh</strong>, bukan dua orang yang saling melengkapi kekurangan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">🏛️ Build Yourself First</p><p class="text-gray-400 text-xs mt-1">Fokuslah jadi versi terbaik dirimu: stabil secara mental, punya tujuan hidup jelas, dan mandiri secara finansial.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🛡️ Respect Boundaries</p><p class="text-gray-400 text-xs mt-1">Hormati batasan orang lain. Jika seseorang butuh ruang, berikan. Keheninganmu bisa menjadi pernyataan kedaulatan terkuat.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">💎 Value Alignment</p><p class="text-gray-400 text-xs mt-1">Cari pasangan yang share visi dan value hidup yang sama. Chemistry penting, tapi compatibility yang membuat hubungan bertahan.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold">🏛️ SOVEREIGN TRUTH</p>
        <p class="text-gray-300 text-sm mt-1">"The right person won't make you chase them. They'll meet you halfway. Focus on becoming someone worth choosing."</p>
      </div>
    </div>`
  }

  // Education / Study
  if (m.includes('kuliah') || m.includes('sekolah') || m.includes('ujian') || m.includes('skripsi') || m.includes('tesis') || m.includes('belajar') || m.includes('ipk') || m.includes('beasiswa') || m.includes('lulus')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold border border-indigo-500/20">PENDIDIKAN</span><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">V3 NEW</span></div>
      <p class="font-bold text-white text-lg">Academic Excellence Framework</p>
      <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4">
        <p class="text-indigo-400 text-xs font-bold mb-2">📊 STUDY INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Research menunjukkan <strong class="text-white">active recall + spaced repetition</strong> 3x lebih efektif dari membaca ulang. Ubah cara belajar = ubah hasilmu.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">📖 Active Recall</p><p class="text-gray-400 text-xs mt-1">Jangan baca ulang — tutup buku dan coba ingat. Buat pertanyaan dari materi. Test yourself. Ini terbukti 3x lebih efektif.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🔄 Spaced Repetition</p><p class="text-gray-400 text-xs mt-1">Review hari 1, 3, 7, 14, 30. Gunakan Anki atau Quizlet. Informasi masuk long-term memory, bukan lupa setelah ujian.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">🎯 Feynman Technique</p><p class="text-gray-400 text-xs mt-1">Jelaskan konsep seolah kamu mengajar anak 12 tahun. Jika tidak bisa, kamu belum benar-benar paham. Simplify until you can.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-4">
        <p class="text-blue-400 text-xs font-bold">📚 STUDY PROTOCOL</p>
        <p class="text-gray-300 text-sm mt-1">2 jam focused study + Pomodoro &gt; 6 jam scrolling sambil belajar. Quality beats quantity. Gunakan Pomodoro Timer SparkMind!</p>
      </div>
    </div>`
  }

  // Health & Fitness
  if (m.includes('olahraga') || m.includes('diet') || m.includes('gym') || m.includes('sehat') || m.includes('berat badan') || m.includes('kurus') || m.includes('gemuk') || m.includes('fitness') || m.includes('nutrisi') || m.includes('makan')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-teal-500/10 text-teal-400 rounded-lg text-xs font-bold border border-teal-500/20">HEALTH & FITNESS</span><span class="px-2.5 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold border border-green-500/20">V3 NEW</span></div>
      <p class="font-bold text-white text-lg">Health & Fitness Optimization Protocol</p>
      <div class="bg-teal-500/5 border border-teal-500/10 rounded-xl p-4">
        <p class="text-teal-400 text-xs font-bold mb-2">📊 BODY INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Kesehatan fisik adalah <strong class="text-white">fondasi segala performa</strong>. CEO, atlet, dan high-achiever semuanya memprioritaskan ini.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">🏃 Movement Daily</p><p class="text-gray-400 text-xs mt-1">Minimal 30 menit/hari. Jalan kaki, jogging, atau bodyweight exercise. Tidak perlu gym mahal — konsistensi yang penting.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🥗 Nutrition Fundamentals</p><p class="text-gray-400 text-xs mt-1">80% diet, 20% exercise. Fokus protein cukup, kurangi gula & processed food. Minum air 2-3 liter/hari.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">😴 Sleep Protocol</p><p class="text-gray-400 text-xs mt-1">7-8 jam/malam. No screen 1 jam sebelum tidur. Kamar gelap & sejuk. Tidur berkualitas = recovery terbaik.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-xl p-4">
        <p class="text-teal-400 text-xs font-bold">💪 START NOW</p>
        <p class="text-gray-300 text-sm mt-1">"Take care of your body. It's the only place you have to live." — Jim Rohn. Mulai dengan 10 menit push-up + plank hari ini.</p>
      </div>
    </div>`
  }

  // Creative / Content
  if (m.includes('konten') || m.includes('youtube') || m.includes('tiktok') || m.includes('instagram') || m.includes('influencer') || m.includes('content creator') || m.includes('blog') || m.includes('podcast') || m.includes('desain') || m.includes('kreativ')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-xs font-bold border border-orange-500/20">CREATIVE & CONTENT</span><span class="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold border border-red-500/20">V3 NEW</span></div>
      <p class="font-bold text-white text-lg">Content Creator Monetization Blueprint</p>
      <div class="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4">
        <p class="text-orange-400 text-xs font-bold mb-2">📊 CREATOR ECONOMY</p>
        <p class="text-gray-300 text-sm">Creator economy Indonesia tumbuh <strong class="text-white">40%/tahun</strong>. Content creator dengan 10K followers sudah bisa menghasilkan Rp 3-10 jt/bulan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">🎯 Pick Your Niche</p><p class="text-gray-400 text-xs mt-1">Passion + Expertise + Demand = Perfect niche. Jangan terlalu luas. Micro-niche 1000 true fans &gt; 100K casual followers.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">📱 Content System</p><p class="text-gray-400 text-xs mt-1">Batch create: 1 hari produksi = konten 1 minggu. Pilih 2 platform utama. Repurpose ke semua. Hook → Value → CTA.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">💰 Monetize Stack</p><p class="text-gray-400 text-xs mt-1">Ads → Sponsorship → Digital Products → Community → Consulting. Layer by layer, dari income pasif ke premium.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
        <p class="text-orange-400 text-xs font-bold">🎬 START TODAY</p>
        <p class="text-gray-300 text-sm mt-1">"Post 100 konten sebelum kamu judge hasilnya." Algoritma rewards consistency. Just start, just post, just improve.</p>
      </div>
    </div>`
  }

  // Leadership / Management
  if (m.includes('leadership') || m.includes('pemimpin') || m.includes('manage') || m.includes('team') || m.includes('tim') || m.includes('delegasi') || m.includes('boss') || m.includes('atasan')) {
    return `<div class="space-y-4">
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-violet-500/10 text-violet-400 rounded-lg text-xs font-bold border border-violet-500/20">LEADERSHIP</span><span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold border border-indigo-500/20">V3 NEW</span></div>
      <p class="font-bold text-white text-lg">Sovereign Leadership Framework</p>
      <div class="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold mb-2">📊 LEADERSHIP INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Great leaders are not born — they are <strong class="text-white">forged through intentional practice</strong>. Leadership = influence, not position.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div><p class="font-bold text-white text-sm">👁️ Lead by Example</p><p class="text-gray-400 text-xs mt-1">Tim mengikuti tindakan, bukan kata-kata. Datang pertama, pulang terakhir, deliver berkualitas. Be the standard.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div><p class="font-bold text-white text-sm">🎯 Clear Communication</p><p class="text-gray-400 text-xs mt-1">Sampaikan visi yang jelas: WHY → WHAT → HOW. Tim yang paham "kenapa" akan bergerak lebih cepat.</p></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <span class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div><p class="font-bold text-white text-sm">🤝 Empower & Delegate</p><p class="text-gray-400 text-xs mt-1">Trust your team. Delegate outcomes, not tasks. Feedback loop yang rutin. Great leaders create more leaders.</p></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold">🏛️ SOVEREIGN PRINCIPLE</p>
        <p class="text-gray-300 text-sm mt-1">"A leader is one who knows the way, goes the way, and shows the way." — John C. Maxwell</p>
      </div>
    </div>`
  }

  // Default — Universal Framework
  return `<div class="space-y-4">
    <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">STRATEGIC ANALYSIS</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3 ENGINE</span></div>
    <p class="font-bold text-white text-lg">Framework Pemecahan Masalah Universal</p>
    <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
      <p class="text-blue-400 text-xs font-bold mb-2">📊 ANALYSIS</p>
      <p class="text-gray-300 text-sm">Setiap masalah bisa dipecahkan dengan pendekatan terstruktur. Berikut framework yang bisa kamu terapkan:</p>
    </div>
    <div class="space-y-3">
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
        <div><p class="font-bold text-white text-sm">🔍 Define</p><p class="text-gray-400 text-xs mt-1">Tulis masalahmu dalam 1 kalimat jelas. Masalah yang jelas = solusi yang jelas.</p></div>
      </div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
        <div><p class="font-bold text-white text-sm">🧩 Decompose</p><p class="text-gray-400 text-xs mt-1">Pecah masalah besar jadi langkah kecil. Setiap langkah actionable dan bisa diselesaikan dalam 1-3 hari.</p></div>
      </div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
        <div><p class="font-bold text-white text-sm">⚡ Execute</p><p class="text-gray-400 text-xs mt-1">Ambil 1 langkah PERTAMA hari ini. Momentum datang dari aksi, bukan perencanaan berlebihan.</p></div>
      </div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
        <div><p class="font-bold text-white text-sm">🔄 Iterate</p><p class="text-gray-400 text-xs mt-1">Review setiap minggu. Adaptasi lebih penting dari perencanaan sempurna. Done is better than perfect.</p></div>
      </div>
    </div>
    <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
      <p class="text-amber-400 text-xs font-bold">💡 PRO TIP</p>
      <p class="text-gray-300 text-sm mt-1">Coba ceritakan lebih spesifik: <strong class="text-white">bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, pendidikan, kesehatan, konten, atau leadership</strong> — dan aku akan berikan strategi yang lebih mendalam!</p>
    </div>
  </div>`
}

function generateSWOT(business: string): string {
  const b = business.substring(0, 60)
  return `<div class="space-y-4">
    <p class="font-bold text-white text-lg">SWOT Analysis: ${b}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
        <p class="font-bold text-emerald-400 text-sm mb-3">💪 Strengths</p>
        <ul class="text-gray-300 text-xs space-y-1.5"><li>• Passion & dedikasi tinggi terhadap bidang ini</li><li>• Kemampuan teknis yang terus berkembang</li><li>• Low overhead cost (bisa mulai dari HP/laptop)</li><li>• Fleksibilitas waktu dan lokasi</li><li>• Akses ke tools AI & digital terbaru</li></ul>
      </div>
      <div class="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
        <p class="font-bold text-red-400 text-sm mb-3">⚠️ Weaknesses</p>
        <ul class="text-gray-300 text-xs space-y-1.5"><li>• Modal awal terbatas</li><li>• Belum ada track record/portofolio kuat</li><li>• Network bisnis masih kecil</li><li>• Time management perlu ditingkatkan</li><li>• Kurang pengalaman di marketing/sales</li></ul>
      </div>
      <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
        <p class="font-bold text-blue-400 text-sm mb-3">🚀 Opportunities</p>
        <ul class="text-gray-300 text-xs space-y-1.5"><li>• Pasar digital Indonesia tumbuh 30%/tahun</li><li>• Remote work trend membuka akses global</li><li>• AI & automation menciptakan niche baru</li><li>• Banyak UMKM butuh solusi digital</li><li>• Government push untuk ekonomi digital</li></ul>
      </div>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
        <p class="font-bold text-amber-400 text-sm mb-3">🛡️ Threats</p>
        <ul class="text-gray-300 text-xs space-y-1.5"><li>• Kompetisi tinggi dari freelancer global</li><li>• Perubahan teknologi yang cepat</li><li>• Ketidakpastian ekonomi global</li><li>• Client acquisition yang challenging</li><li>• AI replacing low-skill tasks</li></ul>
      </div>
    </div>
    <div class="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl p-4">
      <p class="text-indigo-400 text-xs font-bold">🎯 STRATEGIC RECOMMENDATION</p>
      <p class="text-gray-300 text-sm mt-1">Leverage strengths (passion + skill) untuk capture opportunities (pasar digital). Mitigate weaknesses dengan networking aktif dan portfolio building. Counter threats dengan continuous learning dan AI upskilling.</p>
    </div>
  </div>`
}

function generateMindMap(topic: string): string {
  return `<div class="space-y-4">
    <p class="font-bold text-white text-lg">Mind Map: ${topic.substring(0, 40)}</p>
    <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-6">
      <div class="text-center mb-5"><span class="inline-block bg-indigo-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-500/20">${topic.substring(0, 30)}</span></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-indigo-400 text-xs mb-2">📋 Planning</p><ul class="text-gray-400 text-xs space-y-1"><li>→ Define goals</li><li>→ Research market</li><li>→ Set timeline</li></ul></div>
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-emerald-400 text-xs mb-2">⚡ Execution</p><ul class="text-gray-400 text-xs space-y-1"><li>→ Build MVP</li><li>→ Test & iterate</li><li>→ Launch</li></ul></div>
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-amber-400 text-xs mb-2">📈 Growth</p><ul class="text-gray-400 text-xs space-y-1"><li>→ Marketing</li><li>→ Scale ops</li><li>→ Hire team</li></ul></div>
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-rose-400 text-xs mb-2">🔄 Optimize</p><ul class="text-gray-400 text-xs space-y-1"><li>→ Review metrics</li><li>→ Cut waste</li><li>→ Double down</li></ul></div>
      </div>
    </div>
  </div>`
}

function generateCoachResponse(goal: string, currentState: string, obstacles: string): string {
  return `<div class="space-y-4">
    <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">AI COACH</span></div>
    <p class="font-bold text-white text-lg">Personal Coaching Session</p>
    <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
      <p class="text-amber-400 text-xs font-bold mb-2">🎯 YOUR GOAL</p>
      <p class="text-gray-300 text-sm">${goal ? goal.substring(0, 200) : 'Belum ditentukan — mari kita definisikan bersama!'}</p>
    </div>
    <div class="space-y-3">
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="text-2xl">🧭</span>
        <div><p class="font-bold text-white text-sm">Clarity First</p><p class="text-gray-400 text-xs mt-1">Apa outcome spesifik yang kamu inginkan? Bukan "sukses" — tapi "punya 50 klien dalam 3 bulan". Specificity is power.</p></div>
      </div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="text-2xl">🔥</span>
        <div><p class="font-bold text-white text-sm">Identify Your Blockers</p><p class="text-gray-400 text-xs mt-1">Apa 1 hal yang paling menghalangimu SEKARANG? Biasanya ada 1 bottleneck utama. Pecahkan itu, sisanya mengikuti.</p></div>
      </div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
        <span class="text-2xl">⚡</span>
        <div><p class="font-bold text-white text-sm">Micro-Action Today</p><p class="text-gray-400 text-xs mt-1">Apa 1 langkah kecil yang bisa kamu ambil HARI INI? Bukan besok, bukan minggu depan. Hari ini. Momentum dimulai dari sini.</p></div>
      </div>
    </div>
    <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
      <p class="text-amber-400 text-xs font-bold">🏛️ COACHING PRINCIPLE</p>
      <p class="text-gray-300 text-sm mt-1">"You are the architect of your own reality. Every decision you make is a brick in the building of your future." — Mulai sekarang.</p>
    </div>
  </div>`
}

// ============================================
// DATA
// ============================================
const RESOURCES_DATA = [
  { id:1, title:'Business Model Canvas', category:'Bisnis', description:'Framework merancang model bisnis', icon:'📋' },
  { id:2, title:'SMART Goals', category:'Produktivitas', description:'Framework goals terukur', icon:'🎯' },
  { id:3, title:'Eisenhower Matrix', category:'Produktivitas', description:'Prioritas tugas', icon:'⚡' },
  { id:4, title:'Personal Finance 101', category:'Finansial', description:'Dasar kelola keuangan', icon:'💰' },
  { id:5, title:'Growth Mindset', category:'Personal', description:'Pola pikir pertumbuhan', icon:'🧠' },
  { id:6, title:'Networking Strategy', category:'Karir', description:'Bangun koneksi profesional', icon:'🤝' },
  { id:7, title:'MVP Guide', category:'Tech', description:'Panduan buat MVP', icon:'🚀' },
  { id:8, title:'Content Marketing', category:'Marketing', description:'Strategi konten', icon:'📝' },
  { id:9, title:'Time Blocking', category:'Produktivitas', description:'Teknik manajemen waktu', icon:'⏰' },
  { id:10, title:'SWOT Analysis Guide', category:'Bisnis', description:'Analisis kekuatan & peluang', icon:'📊' },
  { id:11, title:'Habit Stacking', category:'Personal', description:'Teknik membangun habit', icon:'🔥' },
  { id:12, title:'Revenue Model Canvas', category:'Bisnis', description:'Framework model revenue', icon:'💎' },
  { id:13, title:'Active Recall Study', category:'Pendidikan', description:'Teknik belajar efektif', icon:'📖' },
  { id:14, title:'Deep Work Protocol', category:'Produktivitas', description:'Fokus tanpa distraksi', icon:'🧘' },
  { id:15, title:'Creator Economy Guide', category:'Creative', description:'Monetisasi konten digital', icon:'🎬' },
]

const INSIGHTS_DATA = [
  { icon:'💡', title:'Revenue First', desc:'Hari ini fokuskan 2 jam untuk aktivitas yang langsung menghasilkan uang.', time:'Hari ini', type:'action' },
  { icon:'📊', title:'Goal Progress', desc:'Cek progress goal kamu hari ini. Apakah on track?', time:'2 jam lalu', type:'progress' },
  { icon:'🔥', title:'Streak Alert', desc:'Jangan putus streak habit kamu! Consistency beats intensity.', time:'5 jam lalu', type:'motivation' },
  { icon:'💰', title:'Financial Tip', desc:'Sudah sisihkan 20% income bulan ini? Bayar dirimu dulu.', time:'Kemarin', type:'tip' },
  { icon:'🎯', title:'Weekly Review', desc:'Luangkan 30 menit hari ini untuk evaluasi minggu ini.', time:'2 hari lalu', type:'review' },
  { icon:'🧠', title:'Sovereign Insight', desc:'"Seorang Arsitek tidak meratapi pintu yang tertutup — dia membangun gedung yang lebih megah."', time:'3 hari lalu', type:'motivation' },
]

const QUOTES_DATA = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Revenue is oxygen for business. Sell first, build later.', author: 'SparkMind' },
  { text: 'Consistency beats talent when talent is not consistent.', author: 'Unknown' },
  { text: 'You are the architect of your own reality.', author: 'SparkMind' },
  { text: 'Done is better than perfect.', author: 'Sheryl Sandberg' },
  { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
  { text: 'Small daily improvements lead to stunning results.', author: 'Robin Sharma' },
  { text: 'Invest in yourself. Your career is the engine of your wealth.', author: 'Paul Clitheroe' },
]

// ============================================
// LANDING PAGE HTML — SparkMind V3
// ============================================
const LANDING_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V3 — AI Strategic Guide Platform</title>
  <meta name="description" content="Platform AI yang menganalisis tantanganmu dan memberikan action plan strategis. Dari kebingungan menuju kejelasan. 12+ kategori analisis.">
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = { theme: { extend: { colors: {
      brand: {50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},
      neon: {blue:'#60a5fa',purple:'#a78bfa',pink:'#f472b6',green:'#34d399',amber:'#fbbf24'},
      surface: {50:'#f8fafc',100:'#f1f5f9',800:'#12122a',900:'#0a0a1a',950:'#06060f'}
    }}}}
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{background:#0a0a1a;color:#e2e8f0}
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .gradient-text-alt{background:linear-gradient(135deg,#60a5fa,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .glass-light{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08)}
    .card-hover{transition:all .5s cubic-bezier(.4,0,.2,1)}.card-hover:hover{transform:translateY(-8px);box-shadow:0 30px 80px rgba(99,102,241,0.12)}
    .neon-glow{box-shadow:0 0 40px rgba(99,102,241,0.15),0 0 80px rgba(99,102,241,0.05)}
    .neon-border{border:1px solid rgba(99,102,241,0.2);box-shadow:inset 0 0 30px rgba(99,102,241,0.03)}
    .float-1{animation:f1 8s ease-in-out infinite}
    .float-2{animation:f2 6s ease-in-out infinite}
    .float-3{animation:f3 10s ease-in-out infinite}
    @keyframes f1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(1deg)}}
    @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes f3{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)}}
    .orb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;opacity:0.4}
    .pulse-ring{animation:pulsering 3s cubic-bezier(.4,0,.6,1) infinite}
    @keyframes pulsering{0%{transform:scale(.95);opacity:1}70%{transform:scale(1.3);opacity:0}100%{transform:scale(.95);opacity:0}}
    .counter{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.4,0,.2,1)}.counter.visible{opacity:1;transform:translateY(0)}
    .fade-up{opacity:0;transform:translateY(40px);transition:all .8s cubic-bezier(.4,0,.2,1)}.fade-up.visible{opacity:1;transform:translateY(0)}
    .typing-cursor{display:inline-block;width:2px;height:1.2em;background:#818cf8;animation:blink 1s infinite;vertical-align:text-bottom;margin-left:2px}
    @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
    .marquee{animation:marquee 40s linear infinite}.marquee:hover{animation-play-state:paused}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0a0a1a}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);transition:all .3s}.btn-primary:hover{background:linear-gradient(135deg,#4338ca,#4f46e5);transform:translateY(-2px);box-shadow:0 20px 40px rgba(99,102,241,0.3)}
    .btn-secondary{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);transition:all .3s}.btn-secondary:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2)}
    .feature-icon{transition:all .5s}.group:hover .feature-icon{transform:scale(1.15) rotate(-5deg)}
    .stat-number{font-variant-numeric:tabular-nums}
  </style>
</head>
<body>
  <!-- NAVBAR -->
  <nav class="fixed top-0 w-full z-50 bg-surface-900/80 backdrop-blur-2xl border-b border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <span class="text-white font-black text-xl tracking-tight">Spark<span class="text-neon-amber">Mind</span><sup class="text-[10px] text-brand-300 font-medium ml-0.5">V3</sup></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-gray-400 hover:text-white transition text-sm font-medium">Fitur</a>
          <a href="#how" class="text-gray-400 hover:text-white transition text-sm font-medium">Cara Kerja</a>
          <a href="#pricing" class="text-gray-400 hover:text-white transition text-sm font-medium">Harga</a>
          <a href="#testimonials" class="text-gray-400 hover:text-white transition text-sm font-medium">Testimoni</a>
          <a href="/app" class="btn-primary text-white px-6 py-2.5 rounded-full text-sm font-bold">Mulai Gratis →</a>
        </div>
        <button id="mob-btn" class="md:hidden text-white p-2"><i class="fas fa-bars text-lg"></i></button>
      </div>
    </div>
    <div id="mob-nav" class="hidden md:hidden bg-surface-900/98 backdrop-blur-2xl border-t border-white/[0.04] pb-4">
      <div class="px-4 space-y-2 pt-3">
        <a href="#features" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition">Fitur</a>
        <a href="#how" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition">Cara Kerja</a>
        <a href="#pricing" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition">Harga</a>
        <a href="/app" class="block btn-primary text-white px-5 py-3 rounded-xl text-sm font-bold text-center mt-3">Mulai Gratis →</a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="min-h-screen flex items-center pt-16 relative overflow-hidden">
    <div class="orb w-[600px] h-[600px] bg-brand-500 top-[-100px] left-[-200px]"></div>
    <div class="orb w-[500px] h-[500px] bg-neon-pink -bottom-40 right-[-150px]"></div>
    <div class="orb w-[350px] h-[350px] bg-neon-green top-1/3 right-[10%] opacity-20"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span class="relative flex h-2.5 w-2.5"><span class="pulse-ring absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span></span>
            <span class="text-gray-300 text-xs font-medium">Sovereign AI Engine V3 • 12+ Categories • Dark Mode</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08] mb-6 tracking-tight">
            Ubah Masalahmu<br>Jadi <span class="gradient-text">Strategi Sukses</span>
          </h1>
          <p class="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            Platform AI yang menganalisis tantanganmu dan memberikan <strong class="text-white">action plan strategis</strong> yang terukur. Bisnis, karir, skill, keuangan, kesehatan, konten — <span class="text-brand-400">12+ kategori analisis</span>.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="/app" class="btn-primary text-white px-8 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 text-base">
              <i class="fas fa-rocket"></i><span>Mulai Gratis Sekarang</span>
            </a>
            <a href="#features" class="btn-secondary text-white px-8 py-4 rounded-full font-semibold text-center flex items-center justify-center gap-2">
              <i class="fas fa-play-circle"></i><span>Lihat Fitur</span>
            </a>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex -space-x-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">H</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-amber to-orange-500 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">R</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-emerald-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">D</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-rose-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">A</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-violet-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">+</div>
            </div>
            <div><p class="text-white font-bold text-sm">10,000+ Users Aktif</p><p class="text-gray-500 text-xs">Sudah bergabung & bertumbuh bersama</p></div>
          </div>
        </div>
        <div class="hidden lg:block relative">
          <div class="glass rounded-3xl p-6 float-1 neon-glow">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-neon-amber"></div>
              <div class="w-3 h-3 rounded-full bg-neon-green"></div>
              <span class="text-gray-500 text-xs ml-3 font-medium">SparkMind V3 — Sovereign Engine</span>
            </div>
            <div class="space-y-3">
              <div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <p class="text-gray-500 text-xs mb-1">📝 Input:</p>
                <p class="text-white text-sm font-medium">"Aku mau mulai bisnis dari HP, modalnya minim..."</p>
              </div>
              <div class="bg-neon-green/5 border border-neon-green/10 rounded-xl p-4">
                <div class="flex items-center gap-2 mb-2">
                  <p class="text-neon-green text-xs font-bold">🧠 V3 Sovereign Engine:</p>
                  <span class="px-2 py-0.5 bg-brand-500/20 text-brand-300 rounded text-[10px] font-bold">12+ CATEGORIES</span>
                </div>
                <p class="text-white text-sm">Berdasarkan analisis 500+ startup, berikut 4 langkah proven:</p>
                <div class="mt-3 space-y-2">
                  <p class="text-gray-300 text-xs flex items-center gap-2"><span class="w-5 h-5 bg-brand-500/20 rounded flex items-center justify-center text-brand-300 text-[10px] font-bold">1</span><span>Market Validation Sprint (2 minggu)</span></p>
                  <p class="text-gray-300 text-xs flex items-center gap-2"><span class="w-5 h-5 bg-brand-500/20 rounded flex items-center justify-center text-brand-300 text-[10px] font-bold">2</span><span>MVP Launch — mulai jual hari ini</span></p>
                  <p class="text-gray-300 text-xs flex items-center gap-2"><span class="w-5 h-5 bg-brand-500/20 rounded flex items-center justify-center text-brand-300 text-[10px] font-bold">3</span><span>Growth Engine — content + referral</span></p>
                  <p class="text-gray-300 text-xs flex items-center gap-2"><span class="w-5 h-5 bg-brand-500/20 rounded flex items-center justify-center text-brand-300 text-[10px] font-bold">4</span><span>Scale to Rp 5-10 jt/bulan</span></p>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2"><div class="h-1.5 w-28 bg-gradient-to-r from-brand-600 to-neon-green rounded-full"></div><span class="text-brand-300 text-xs font-bold">99% confidence</span></div>
                <span class="text-gray-500 text-xs">0.3s response</span>
              </div>
            </div>
          </div>
          <!-- Floating badges -->
          <div class="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 float-2">
            <div class="flex items-center gap-2"><span class="text-neon-green text-lg">📊</span><div><p class="text-white text-xs font-bold">SWOT Analysis</p><p class="text-gray-500 text-[10px]">Real-time generation</p></div></div>
          </div>
          <div class="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 float-3">
            <div class="flex items-center gap-2"><span class="text-neon-amber text-lg">🍅</span><div><p class="text-white text-xs font-bold">Pomodoro Timer</p><p class="text-gray-500 text-[10px]">Deep Work mode</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="py-16 border-y border-white/[0.04] relative">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center counter"><p class="text-4xl font-black text-white stat-number" data-target="10000">0</p><p class="text-gray-500 text-sm mt-1">Active Users</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-white stat-number" data-target="50000">0</p><p class="text-gray-500 text-sm mt-1">Strategi Dibuat</p></div>
        <div class="text-center counter"><p class="text-4xl font-black gradient-text stat-number">12+</p><p class="text-gray-500 text-sm mt-1">AI Categories</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-white stat-number">24/7</p><p class="text-gray-500 text-sm mt-1">AI Available</p></div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-up">
        <span class="inline-block glass-light text-brand-300 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-4">Fitur V3 — Massive Upgrade</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Tools Premium untuk <span class="gradient-text">Growth Maker</span></h2>
        <p class="text-gray-400 max-w-2xl mx-auto">Upgrade masif dari V2 — Pomodoro Timer, AI Coach, Weekly Review, Vision Board, 12+ kategori AI, dan dark mode full.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-brand-500/20"><i class="fas fa-brain text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">AI Sovereign Engine V3</h3>
          <p class="text-gray-400 text-sm">12+ kategori analisis: bisnis, karir, skill, finansial, mental health, hubungan, pendidikan, kesehatan, konten, leadership, dan lainnya.</p>
          <span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-neon-green to-emerald-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-emerald-500/20"><i class="fas fa-chart-pie text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">SWOT Analyzer</h3>
          <p class="text-gray-400 text-sm">Generate analisis SWOT instan untuk bisnis/ide kamu. Strengths, Weaknesses, Opportunities, Threats — dalam 1 klik.</p>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-neon-amber to-orange-500 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-amber-500/20"><i class="fas fa-stopwatch text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Pomodoro Timer</h3>
          <p class="text-gray-400 text-sm">Built-in Pomodoro timer dengan deep work mode. 25-min focus sessions, break tracker, dan statistik produktivitas.</p>
          <span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V3</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-amber-500/20"><i class="fas fa-user-tie text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">AI Coach Mode</h3>
          <p class="text-gray-400 text-sm">Personal AI coaching session. Definisikan goal, identifikasi blocker, dan dapatkan action plan personal dari AI coach.</p>
          <span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V3</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-neon-purple to-violet-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-purple-500/20"><i class="fas fa-bullseye text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Goal Tracker Pro</h3>
          <p class="text-gray-400 text-sm">Track goals dengan milestone, progress bar, deadline, dan kategori. Data tersimpan di localStorage — tidak hilang saat refresh!</p>
          <span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-neon-pink to-rose-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-pink-500/20"><i class="fas fa-fire text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Habit Tracker</h3>
          <p class="text-gray-400 text-sm">Build habits konsisten. Streak counter, daily check-in, dan statistik habit. Semua tersimpan di localStorage.</p>
          <span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-cyan-500/20"><i class="fas fa-calendar-check text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Weekly Review</h3>
          <p class="text-gray-400 text-sm">Review progres mingguan. Evaluasi wins, learnings, dan set fokus untuk minggu depan. Refleksi terstruktur.</p>
          <span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V3</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-blue-500/20"><i class="fas fa-book-open text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Resource Library</h3>
          <p class="text-gray-400 text-sm">15+ framework strategis: Business Canvas, SMART Goals, Active Recall, Deep Work Protocol, Creator Economy, dan banyak lagi.</p>
          <span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span>
        </div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border">
          <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-yellow-500/20"><i class="fas fa-lightbulb text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-white mb-2">Daily Insights</h3>
          <p class="text-gray-400 text-sm">Insight harian dipersonalisasi berdasarkan goals dan progress kamu. Motivasi + action items setiap hari.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section id="how" class="py-24 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent"></div>
    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div class="text-center mb-16 fade-up">
        <span class="inline-block glass-light text-neon-amber px-5 py-2 rounded-full text-xs font-bold uppercase mb-4">Cara Kerja</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Semudah <span class="gradient-text">3 Langkah</span></h2>
      </div>
      <div class="grid md:grid-cols-3 gap-10">
        <div class="text-center fade-up">
          <div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">1</span></div>
          <h3 class="text-xl font-bold text-white mb-3">Ceritakan Masalahmu</h3>
          <p class="text-gray-400 text-sm">Tulis dalam bahasa sehari-hari. AI kami paham konteks Indonesia — bisnis, karir, skill, keuangan, dan 8+ kategori lainnya.</p>
        </div>
        <div class="text-center fade-up">
          <div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-2 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">2</span></div>
          <h3 class="text-xl font-bold text-white mb-3">AI V3 Menganalisis</h3>
          <p class="text-gray-400 text-sm">Sovereign Engine V3 memproses, identifikasi pola, dan merancang strategi berbasis data & framework proven.</p>
        </div>
        <div class="text-center fade-up">
          <div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-1 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">3</span></div>
          <h3 class="text-xl font-bold text-white mb-3">Eksekusi & Tumbuh</h3>
          <p class="text-gray-400 text-sm">Dapatkan action plan + timeline + milestones. Track dengan Goal Tracker, build habits, gunakan Pomodoro Timer.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section id="pricing" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-up">
        <span class="inline-block glass-light text-brand-300 px-5 py-2 rounded-full text-xs font-bold uppercase mb-4">Pricing</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Investasi untuk <span class="gradient-text">Masa Depanmu</span></h2>
        <p class="text-gray-400">Mulai gratis. Upgrade kapan saja.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div class="glass-light rounded-3xl p-8 card-hover neon-border">
          <div class="mb-6"><h3 class="text-lg font-bold text-white">Starter</h3><p class="text-gray-400 text-sm mt-1">Untuk eksplorasi</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-white">Gratis</span><span class="text-gray-500 text-sm ml-1">/selamanya</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>5 AI Analysis / hari</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Goal Tracker (3 goals)</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Pomodoro Timer</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Resource Library dasar</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Daily Insights</span></li>
          </ul>
          <a href="/app" class="block w-full text-center btn-secondary text-white py-3.5 rounded-full font-bold">Mulai Gratis</a>
        </div>
        <div class="relative bg-gradient-to-b from-brand-600/20 to-brand-800/20 border-2 border-brand-500/30 rounded-3xl p-8 scale-105 shadow-2xl shadow-brand-500/10">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-amber to-orange-500 text-surface-900 px-4 py-1 rounded-full text-xs font-black tracking-wide">PALING POPULER</div>
          <div class="mb-6"><h3 class="text-lg font-bold text-white">Pro</h3><p class="text-brand-200 text-sm mt-1">Untuk yang serius bertumbuh</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-white">Rp 79K</span><span class="text-brand-200 text-sm ml-1">/bulan</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Unlimited AI Analysis</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>SWOT Analyzer + AI Coach</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Unlimited Goals + Habits</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Weekly Review</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Full Resource Library</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Priority Support</span></li>
          </ul>
          <a href="/app" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-700 py-3.5 rounded-full font-black transition">Upgrade ke Pro 🚀</a>
        </div>
        <div class="glass-light rounded-3xl p-8 card-hover neon-border">
          <div class="mb-6"><h3 class="text-lg font-bold text-white">Enterprise</h3><p class="text-gray-400 text-sm mt-1">Untuk tim & organisasi</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-white">Custom</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Semua fitur Pro</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Team Collaboration</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Custom AI Training</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>API Access</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Dedicated Account Manager</span></li>
          </ul>
          <a href="#" class="block w-full text-center btn-secondary text-white py-3.5 rounded-full font-bold">Hubungi Kami</a>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section id="testimonials" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-up">
        <span class="inline-block glass-light text-neon-green px-5 py-2 rounded-full text-xs font-bold uppercase mb-4">Testimoni</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Mereka Sudah <span class="gradient-text">Membuktikan</span></h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="glass-light rounded-2xl p-8 card-hover neon-border">
          <div class="flex items-center gap-1 mb-4"><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i></div>
          <p class="text-gray-300 text-sm mb-6 italic leading-relaxed">"SparkMind V3 literally changed my life. Pomodoro Timer + Habit Tracker bikin aku 3x lebih produktif. Sekarang udah punya 10 klien freelance!"</p>
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center"><span class="font-bold text-white text-sm">R</span></div><div><p class="font-bold text-white text-sm">Rina S.</p><p class="text-gray-500 text-xs">Freelance Designer</p></div></div>
        </div>
        <div class="glass-light rounded-2xl p-8 card-hover neon-border">
          <div class="flex items-center gap-1 mb-4"><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i></div>
          <p class="text-gray-300 text-sm mb-6 italic leading-relaxed">"AI Engine V3-nya gila sih. 12+ kategori. Input masalah karir, strategi yang dikasih detail banget. Udah naik jabatan & gaji naik 40%!"</p>
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-neon-green to-emerald-600 rounded-full flex items-center justify-center"><span class="font-bold text-white text-sm">D</span></div><div><p class="font-bold text-white text-sm">Dimas P.</p><p class="text-gray-500 text-xs">Software Engineer</p></div></div>
        </div>
        <div class="glass-light rounded-2xl p-8 card-hover neon-border">
          <div class="flex items-center gap-1 mb-4"><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i></div>
          <p class="text-gray-300 text-sm mb-6 italic leading-relaxed">"SWOT Analyzer + AI Coach-nya game changer! Weekly Review bikin aku tetap on track. Revenue bisnis naik 2x dalam 3 bulan!"</p>
          <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-neon-pink to-rose-600 rounded-full flex items-center justify-center"><span class="font-bold text-white text-sm">A</span></div><div><p class="font-bold text-white text-sm">Anita W.</p><p class="text-gray-500 text-xs">Entrepreneur</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 relative overflow-hidden">
    <div class="orb w-[500px] h-[500px] bg-brand-500 top-0 left-1/4 opacity-20"></div>
    <div class="orb w-[400px] h-[400px] bg-neon-pink bottom-0 right-1/4 opacity-20"></div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl sm:text-5xl font-black text-white mb-6">Siap Mengubah Hidupmu?</h2>
      <p class="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join 10,000+ orang yang sudah menemukan kejelasan strategis. 100% gratis untuk mulai.</p>
      <a href="/app" class="inline-flex items-center gap-2 bg-gradient-to-r from-neon-amber to-orange-500 hover:from-orange-500 hover:to-neon-amber text-surface-900 px-12 py-5 rounded-full font-black text-lg transition shadow-2xl shadow-neon-amber/30">
        <i class="fas fa-bolt"></i><span>Mulai Sekarang — Gratis!</span>
      </a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="text-gray-400 py-16 border-t border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-10">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div>
            <span class="text-white font-black text-lg">Spark<span class="text-neon-amber">Mind</span><sup class="text-[10px] text-brand-300 ml-0.5">V3</sup></span>
          </div>
          <p class="text-sm leading-relaxed">AI-powered strategic guide platform. 12+ kategori analisis untuk pertumbuhan personal & profesional.</p>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm">Produk</h4>
          <ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">AI Analyzer V3</a></li><li><a href="/app" class="hover:text-white transition">SWOT Analyzer</a></li><li><a href="/app" class="hover:text-white transition">Pomodoro Timer</a></li><li><a href="/app" class="hover:text-white transition">AI Coach</a></li></ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm">Tools</h4>
          <ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">Goal Tracker</a></li><li><a href="/app" class="hover:text-white transition">Habit Tracker</a></li><li><a href="/app" class="hover:text-white transition">Weekly Review</a></li><li><a href="/app" class="hover:text-white transition">Resource Library</a></li></ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm">Connect</h4>
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-instagram text-white"></i></a>
            <a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-twitter text-white"></i></a>
            <a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-linkedin text-white"></i></a>
            <a href="https://github.com/ganihypha/Sparkmind" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-github text-white"></i></a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/[0.04] mt-12 pt-8 text-center text-sm">
        <p>&copy; 2026 SparkMind V3. Built with ❤️ by Haidar. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('mob-btn').addEventListener('click',()=>document.getElementById('mob-nav').classList.toggle('hidden'));
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');const c=e.target.querySelector('[data-target]');if(c){const t=parseInt(c.dataset.target);let cur=0;const inc=t/60;const timer=setInterval(()=>{cur+=inc;if(cur>=t){cur=t;clearInterval(timer)}c.textContent=Math.floor(cur).toLocaleString()},16)}}})},{threshold:0.2});
    document.querySelectorAll('.counter,.fade-up').forEach(el=>obs.observe(el));
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});document.getElementById('mob-nav').classList.add('hidden')})});
  </script>
</body>
</html>`

// ============================================
// APP DASHBOARD HTML — SparkMind V3
// ============================================
const APP_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V3 — Dashboard</title>
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config={theme:{extend:{colors:{
      brand:{50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},
      neon:{blue:'#60a5fa',purple:'#a78bfa',pink:'#f472b6',green:'#34d399',amber:'#fbbf24'},
      surface:{50:'#f8fafc',100:'#f1f5f9',800:'#12122a',900:'#0a0a1a',950:'#06060f'}
    }}}}
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;box-sizing:border-box}
    body{background:#0a0a1a;color:#e2e8f0}
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .sidebar-link.active{background:rgba(99,102,241,0.1);color:#818cf8;border-right:3px solid #6366f1;font-weight:600}
    .sidebar-link:hover:not(.active){background:rgba(255,255,255,0.03)}
    .typing-dot{animation:td 1.4s infinite}.typing-dot:nth-child(2){animation-delay:.2s}.typing-dot:nth-child(3){animation-delay:.4s}
    @keyframes td{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
    .msg-in{animation:mi .4s cubic-bezier(.4,0,.2,1)}@keyframes mi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .progress-bar{transition:width .8s cubic-bezier(.4,0,.2,1)}
    textarea:focus,input:focus,select:focus{outline:none}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}
    .timer-ring{transition:stroke-dashoffset 1s linear}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);transition:all .3s}.btn-primary:hover{box-shadow:0 8px 24px rgba(99,102,241,0.3)}
  </style>
</head>
<body class="h-screen flex overflow-hidden">
  <!-- SIDEBAR -->
  <aside id="sidebar" class="w-64 bg-surface-950 border-r border-white/[0.04] flex-shrink-0 flex flex-col hidden md:flex">
    <div class="p-5 border-b border-white/[0.04]">
      <a href="/" class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div>
        <span class="font-black text-lg text-white">Spark<span class="text-neon-amber">Mind</span><sup class="text-[9px] text-brand-300 ml-0.5">V3</sup></span>
      </a>
    </div>
    <nav class="flex-1 py-4 overflow-auto">
      <div class="px-6 mb-3"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">AI Tools</p></div>
      <a href="#" onclick="switchTab('analyzer')" class="sidebar-link active flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="analyzer"><i class="fas fa-brain w-5 text-center"></i><span>AI Analyzer</span></a>
      <a href="#" onclick="switchTab('swot')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="swot"><i class="fas fa-chart-pie w-5 text-center"></i><span>SWOT Analyzer</span></a>
      <a href="#" onclick="switchTab('coach')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="coach"><i class="fas fa-user-tie w-5 text-center"></i><span>AI Coach</span><span class="ml-auto text-[9px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Productivity</p></div>
      <a href="#" onclick="switchTab('pomodoro')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="pomodoro"><i class="fas fa-stopwatch w-5 text-center"></i><span>Pomodoro</span><span class="ml-auto text-[9px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <a href="#" onclick="switchTab('goals')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="goals"><i class="fas fa-bullseye w-5 text-center"></i><span>Goals</span></a>
      <a href="#" onclick="switchTab('habits')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="habits"><i class="fas fa-fire w-5 text-center"></i><span>Habits</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Insights</p></div>
      <a href="#" onclick="switchTab('review')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="review"><i class="fas fa-calendar-check w-5 text-center"></i><span>Weekly Review</span><span class="ml-auto text-[9px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <a href="#" onclick="switchTab('resources')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="resources"><i class="fas fa-book-open w-5 text-center"></i><span>Resources</span></a>
      <a href="#" onclick="switchTab('insights')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="insights"><i class="fas fa-lightbulb w-5 text-center"></i><span>Insights</span></a>
    </nav>
    <div class="p-4 border-t border-white/[0.04]">
      <div class="glass rounded-2xl p-4">
        <p class="text-sm font-bold text-white mb-1">Free Plan</p>
        <p class="text-xs text-gray-400 mb-3">5/5 analyses tersisa</p>
        <div class="w-full bg-white/10 rounded-full h-1.5 mb-3"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-1.5 rounded-full" style="width:100%"></div></div>
        <button class="w-full btn-primary text-white text-xs py-2.5 rounded-xl font-bold">Upgrade ke Pro 🚀</button>
      </div>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <header class="bg-surface-950/80 backdrop-blur-xl border-b border-white/[0.04] px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-4">
        <button id="sb-toggle" class="md:hidden text-gray-400 hover:text-white transition"><i class="fas fa-bars text-lg"></i></button>
        <h1 id="page-title" class="text-base font-bold text-white">AI Strategic Analyzer</h1>
        <span class="hidden sm:inline-block text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-lg font-bold border border-brand-500/20">V3 ENGINE</span>
      </div>
      <div class="flex items-center gap-3">
        <div id="quote-ticker" class="hidden sm:block max-w-xs text-xs text-gray-500 italic truncate"></div>
        <button class="relative text-gray-500 hover:text-white transition"><i class="fas fa-bell"></i><span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">3</span></button>
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">H</span></div>
      </div>
    </header>

    <div class="flex-1 overflow-auto">
      <!-- ANALYZER TAB -->
      <div id="tab-analyzer" class="tab-content h-full flex flex-col">
        <div id="chat-msgs" class="flex-1 overflow-auto p-6 space-y-4">
          <div class="msg-in flex gap-3">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div>
            <div class="glass rounded-2xl rounded-tl-sm p-5 max-w-2xl">
              <p class="text-gray-200 text-sm leading-relaxed">Halo! Aku <strong class="text-white">SparkMind AI V3</strong> 🧠✨<br><br>Sovereign Engine V3 — lebih cerdas, lebih cepat, <strong class="text-brand-300">12+ kategori analisis</strong>.<br><br><strong class="text-white">Coba tanyakan:</strong></p>
              <div class="mt-3 space-y-2">
                <button onclick="useEx('Aku mau mulai bisnis online dari HP, modal minim')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">💼 "Aku mau mulai bisnis online, modal minim"</button>
                <button onclick="useEx('Gimana cara jadi lebih produktif dan stop procrastinate?')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">⚡ "Gimana cara jadi lebih produktif?"</button>
                <button onclick="useEx('Aku mau jadi content creator di TikTok dan Instagram')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">🎬 "Aku mau jadi content creator"</button>
                <button onclick="useEx('Aku merasa burnout dan overwhelmed, butuh strategi recovery')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">❤️ "Aku merasa burnout"</button>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-white/[0.04] bg-surface-950/80 backdrop-blur-xl p-4">
          <div class="max-w-3xl mx-auto">
            <div class="flex items-end gap-3">
              <div class="flex-1 glass rounded-2xl px-4 py-3 focus-within:border-brand-500/30 transition">
                <textarea id="user-input" rows="1" placeholder="Ceritakan masalah atau goal kamu..." class="w-full bg-transparent text-sm text-white placeholder-gray-500 resize-none max-h-32" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
              </div>
              <button onclick="sendMsg()" class="btn-primary text-white w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-paper-plane text-sm"></i></button>
            </div>
            <p class="text-center text-[10px] text-gray-600 mt-2">SparkMind V3 — Sovereign AI Engine • 12+ Categories</p>
          </div>
        </div>
      </div>

      <!-- SWOT TAB -->
      <div id="tab-swot" class="tab-content hidden p-6">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-neon-green to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20"><i class="fas fa-chart-pie text-white text-2xl"></i></div>
            <h2 class="text-2xl font-black text-white">SWOT Analyzer</h2>
            <p class="text-gray-400 text-sm mt-1">Analisis Strengths, Weaknesses, Opportunities & Threats</p>
          </div>
          <div class="glass rounded-2xl p-6">
            <textarea id="swot-input" rows="3" placeholder="Deskripsikan bisnis/ide kamu... (contoh: 'Jasa desain grafis freelance untuk UMKM')" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none mb-4 focus:border-neon-green/30"></textarea>
            <button onclick="runSWOT()" class="bg-gradient-to-r from-neon-green to-emerald-600 hover:from-emerald-600 hover:to-neon-green text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-emerald-500/20 w-full">Generate SWOT Analysis 📊</button>
          </div>
          <div id="swot-result" class="mt-6"></div>
        </div>
      </div>

      <!-- COACH TAB -->
      <div id="tab-coach" class="tab-content hidden p-6">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20"><i class="fas fa-user-tie text-white text-2xl"></i></div>
            <h2 class="text-2xl font-black text-white">AI Coach Mode</h2>
            <p class="text-gray-400 text-sm mt-1">Personal AI coaching untuk mencapai goal-mu</p>
          </div>
          <div class="glass rounded-2xl p-6 space-y-4">
            <div><label class="text-xs font-bold text-gray-400 mb-2 block">🎯 Apa goal utamamu?</label><textarea id="coach-goal" rows="2" placeholder="Contoh: Punya 50 klien freelance dalam 3 bulan" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div>
            <div><label class="text-xs font-bold text-gray-400 mb-2 block">📍 Kondisi saat ini?</label><textarea id="coach-state" rows="2" placeholder="Contoh: Baru mulai, punya 2 klien" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div>
            <div><label class="text-xs font-bold text-gray-400 mb-2 block">🚧 Apa yang menghalangi?</label><textarea id="coach-obstacles" rows="2" placeholder="Contoh: Tidak tau cara dapat klien baru" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div>
            <button onclick="runCoach()" class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-amber-500/20 w-full">Mulai Coaching Session 🧭</button>
          </div>
          <div id="coach-result" class="mt-6"></div>
        </div>
      </div>

      <!-- POMODORO TAB -->
      <div id="tab-pomodoro" class="tab-content hidden p-6">
        <div class="max-w-lg mx-auto text-center">
          <div class="mb-6">
            <h2 class="text-2xl font-black text-white">Pomodoro Timer</h2>
            <p class="text-gray-400 text-sm mt-1">Deep Work Mode — Fokus 25 menit, istirahat 5 menit</p>
          </div>
          <div class="glass rounded-3xl p-10 mb-6">
            <div class="relative inline-block mb-6">
              <svg class="w-56 h-56 -rotate-90" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8"/><circle id="pomo-ring" cx="100" cy="100" r="90" fill="none" stroke="#6366f1" stroke-width="8" stroke-linecap="round" stroke-dasharray="565.48" stroke-dashoffset="0" class="timer-ring"/></svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <p id="pomo-time" class="text-5xl font-black text-white tabular-nums">25:00</p>
                <p id="pomo-label" class="text-sm text-gray-400 mt-1">Focus Time</p>
              </div>
            </div>
            <div class="flex items-center justify-center gap-4 mb-6">
              <button onclick="startPomo()" id="pomo-start-btn" class="btn-primary text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"><i class="fas fa-play text-sm"></i><span>Mulai</span></button>
              <button onclick="pausePomo()" id="pomo-pause-btn" class="hidden bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"><i class="fas fa-pause text-sm"></i><span>Pause</span></button>
              <button onclick="resetPomo()" class="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-3 rounded-full font-bold transition"><i class="fas fa-redo text-sm"></i></button>
            </div>
            <div class="flex justify-center gap-3 mb-4">
              <button onclick="setPomoMode('focus')" class="pomo-mode-btn active text-xs px-4 py-2 rounded-lg font-bold transition" data-mode="focus">Focus (25m)</button>
              <button onclick="setPomoMode('short')" class="pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold transition text-gray-400 bg-white/5 hover:bg-white/10" data-mode="short">Short Break (5m)</button>
              <button onclick="setPomoMode('long')" class="pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold transition text-gray-400 bg-white/5 hover:bg-white/10" data-mode="long">Long Break (15m)</button>
            </div>
          </div>
          <div class="glass rounded-2xl p-6">
            <div class="flex items-center justify-between mb-3"><p class="text-sm font-bold text-white">Session Hari Ini</p><p id="pomo-sessions" class="text-2xl font-black text-brand-400">0</p></div>
            <div class="flex items-center justify-between"><p class="text-sm font-bold text-white">Total Fokus</p><p id="pomo-total" class="text-2xl font-black text-neon-green">0m</p></div>
          </div>
        </div>
      </div>

      <!-- GOALS TAB -->
      <div id="tab-goals" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div><h2 class="text-2xl font-black text-white">Goal Tracker</h2><p class="text-gray-400 text-sm">Track & manage goals kamu</p></div>
            <button onclick="showAddGoal()" class="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"><i class="fas fa-plus"></i><span>Tambah</span></button>
          </div>
          <div id="add-goal-form" class="hidden glass rounded-2xl p-6 mb-6">
            <h3 class="font-bold text-white mb-4">Goal Baru</h3>
            <div class="space-y-3">
              <input id="goal-title" type="text" placeholder="Nama goal..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500">
              <textarea id="goal-desc" rows="2" placeholder="Deskripsi..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea>
              <div class="flex gap-3">
                <select id="goal-cat" class="glass rounded-xl px-4 py-3 text-sm text-white flex-1 bg-transparent"><option value="bisnis">💼 Bisnis</option><option value="karir">📈 Karir</option><option value="skill">💻 Skill</option><option value="personal">🧘 Personal</option><option value="finansial">💰 Finansial</option><option value="kesehatan">💪 Kesehatan</option></select>
                <input id="goal-dl" type="date" class="glass rounded-xl px-4 py-3 text-sm text-white flex-1 bg-transparent">
              </div>
              <div class="flex gap-3"><button onclick="addGoal()" class="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">Simpan</button><button onclick="hideAddGoal()" class="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-2.5 rounded-xl text-sm font-semibold transition">Batal</button></div>
            </div>
          </div>
          <div id="goals-list" class="space-y-4"></div>
        </div>
      </div>

      <!-- HABITS TAB -->
      <div id="tab-habits" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div><h2 class="text-2xl font-black text-white">Habit Tracker</h2><p class="text-gray-400 text-sm">Build consistent habits for success</p></div>
            <button onclick="showAddHabit()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20"><i class="fas fa-plus"></i><span>Tambah</span></button>
          </div>
          <div id="add-habit-form" class="hidden glass rounded-2xl p-6 mb-6">
            <h3 class="font-bold text-white mb-4">Habit Baru</h3>
            <div class="space-y-3">
              <input id="habit-name" type="text" placeholder="Nama habit... (contoh: Olahraga 30 menit)" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500">
              <select id="habit-freq" class="w-full glass rounded-xl px-4 py-3 text-sm text-white bg-transparent"><option value="daily">Setiap Hari</option><option value="weekday">Sen-Jum</option><option value="3x">3x/Minggu</option></select>
              <div class="flex gap-3"><button onclick="addHabit()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition">Simpan</button><button onclick="hideAddHabit()" class="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-2.5 rounded-xl text-sm font-semibold transition">Batal</button></div>
            </div>
          </div>
          <div id="habits-list" class="space-y-3"></div>
        </div>
      </div>

      <!-- WEEKLY REVIEW TAB -->
      <div id="tab-review" class="tab-content hidden p-6">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20"><i class="fas fa-calendar-check text-white text-2xl"></i></div>
            <h2 class="text-2xl font-black text-white">Weekly Review</h2>
            <p class="text-gray-400 text-sm mt-1">Refleksi & planning mingguan</p>
          </div>
          <div class="space-y-4">
            <div class="glass rounded-2xl p-6">
              <label class="text-xs font-bold text-neon-green mb-3 block">🏆 3 WINS MINGGU INI</label>
              <textarea id="review-wins" rows="3" placeholder="Apa 3 hal yang berhasil kamu capai minggu ini?" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea>
            </div>
            <div class="glass rounded-2xl p-6">
              <label class="text-xs font-bold text-neon-amber mb-3 block">📖 3 LEARNINGS</label>
              <textarea id="review-learn" rows="3" placeholder="Apa 3 hal yang kamu pelajari minggu ini?" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea>
            </div>
            <div class="glass rounded-2xl p-6">
              <label class="text-xs font-bold text-brand-300 mb-3 block">🎯 FOKUS MINGGU DEPAN</label>
              <textarea id="review-focus" rows="3" placeholder="Apa 1-3 prioritas utama untuk minggu depan?" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea>
            </div>
            <button onclick="saveReview()" class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-cyan-500/20 w-full">Simpan Weekly Review 📝</button>
            <div id="review-saved" class="hidden glass rounded-2xl p-6 text-center">
              <i class="fas fa-check-circle text-neon-green text-3xl mb-3"></i>
              <p class="text-white font-bold">Review Tersimpan!</p>
              <p class="text-gray-400 text-sm mt-1">Great job reflecting on your week.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RESOURCES TAB -->
      <div id="tab-resources" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-black text-white mb-2">Resource Library</h2>
          <p class="text-gray-400 text-sm mb-8">15+ framework & panduan strategis</p>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" id="resources-grid"></div>
        </div>
      </div>

      <!-- INSIGHTS TAB -->
      <div id="tab-insights" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-black text-white mb-2">Daily Insights</h2>
          <p class="text-gray-400 text-sm mb-8">Insight harian yang dipersonalisasi</p>
          <div id="insights-list" class="space-y-4"></div>
        </div>
      </div>
    </div>
  </main>
  <div id="sb-overlay" class="fixed inset-0 bg-black/60 z-40 hidden" onclick="closeSB()"></div>

  <script>
    // ===== STATE (localStorage persistence) =====
    const LS={get(k,d){try{const v=localStorage.getItem('sm3_'+k);return v?JSON.parse(v):d}catch{return d}},set(k,v){try{localStorage.setItem('sm3_'+k,JSON.stringify(v))}catch{}}};

    let goals=LS.get('goals',[
      {id:1,title:'Launch Bisnis Digital',desc:'Buat dan launch produk/jasa digital pertama',category:'bisnis',progress:35,deadline:'2026-07-01',milestones:['Riset pasar','Buat MVP','Launch','Marketing']},
      {id:2,title:'Master JavaScript',desc:'Kuasai JS modern + React',category:'skill',progress:60,deadline:'2026-06-15',milestones:['JS Fundamentals','Async/Await','React Basics','Build Project']},
      {id:3,title:'Emergency Fund 10 Jt',desc:'Kumpulkan dana darurat Rp 10 juta',category:'finansial',progress:70,deadline:'2026-08-01',milestones:['Buat budget','Nabung rutin','Side income','Target tercapai']}
    ]);
    let habits=LS.get('habits',[
      {id:1,name:'Olahraga 30 menit',freq:'daily',streak:12,done:true,icon:'🏃'},
      {id:2,name:'Baca buku 20 halaman',freq:'daily',streak:8,done:false,icon:'📚'},
      {id:3,name:'Coding practice',freq:'weekday',streak:15,done:true,icon:'💻'},
      {id:4,name:'Journaling',freq:'daily',streak:5,done:false,icon:'📝'}
    ]);
    let pomoSessions=LS.get('pomoSessions',0);
    let pomoTotal=LS.get('pomoTotal',0);
    const saveState=()=>{LS.set('goals',goals);LS.set('habits',habits);LS.set('pomoSessions',pomoSessions);LS.set('pomoTotal',pomoTotal)};

    const resources=[
      {title:'Business Model Canvas',desc:'Framework merancang model bisnis',icon:'📋',cat:'Bisnis',color:'blue'},
      {title:'SMART Goals Framework',desc:'Goals Specific, Measurable, Achievable',icon:'🎯',cat:'Produktivitas',color:'green'},
      {title:'Eisenhower Matrix',desc:'Prioritas: urgensi & kepentingan',icon:'⚡',cat:'Produktivitas',color:'amber'},
      {title:'Personal Finance 101',desc:'Dasar mengelola keuangan pribadi',icon:'💰',cat:'Finansial',color:'emerald'},
      {title:'Growth Mindset Guide',desc:'Pola pikir untuk pertumbuhan',icon:'🧠',cat:'Personal',color:'purple'},
      {title:'Networking Strategy',desc:'Bangun koneksi profesional',icon:'🤝',cat:'Karir',color:'cyan'},
      {title:'MVP Development',desc:'Panduan Minimum Viable Product',icon:'🚀',cat:'Tech',color:'rose'},
      {title:'Content Marketing 101',desc:'Strategi konten & audiens',icon:'📝',cat:'Marketing',color:'orange'},
      {title:'Time Blocking',desc:'Teknik manajemen waktu',icon:'⏰',cat:'Produktivitas',color:'indigo'},
      {title:'SWOT Analysis Guide',desc:'Analisis kekuatan & peluang',icon:'📊',cat:'Bisnis',color:'teal'},
      {title:'Habit Stacking',desc:'Teknik membangun habit baru',icon:'🔥',cat:'Personal',color:'red'},
      {title:'Revenue Model Canvas',desc:'Framework model revenue',icon:'💎',cat:'Bisnis',color:'violet'},
      {title:'Active Recall Study',desc:'Teknik belajar super efektif',icon:'📖',cat:'Pendidikan',color:'blue'},
      {title:'Deep Work Protocol',desc:'Fokus tanpa distraksi',icon:'🧘',cat:'Produktivitas',color:'indigo'},
      {title:'Creator Economy Guide',desc:'Monetisasi konten digital',icon:'🎬',cat:'Creative',color:'pink'}
    ];
    const insights=[
      {icon:'💡',title:'Revenue First',desc:'Hari ini fokuskan 2 jam untuk aktivitas yang langsung menghasilkan uang. Revenue is oxygen.',time:'Hari ini',type:'action'},
      {icon:'📊',title:'Goal Progress',desc:'Cek progress goal kamu. Sudahkah on track?',time:'2 jam lalu',type:'progress'},
      {icon:'🔥',title:'Streak Alert',desc:'Jangan putus streak habit! Consistency beats intensity.',time:'5 jam lalu',type:'motivation'},
      {icon:'💰',title:'Financial Tip',desc:'Sudah sisihkan 20% income bulan ini? Bayar dirimu dulu.',time:'Kemarin',type:'tip'},
      {icon:'🎯',title:'Weekly Review',desc:'Luangkan 30 menit untuk evaluasi minggu ini.',time:'2 hari lalu',type:'review'},
      {icon:'🧠',title:'Sovereign Insight',desc:'"Seorang Arsitek tidak meratapi pintu tertutup — dia membangun gedung lebih megah."',time:'3 hari lalu',type:'motivation'}
    ];

    // ===== TABS =====
    function switchTab(t){
      document.querySelectorAll('.tab-content').forEach(e=>e.classList.add('hidden'));
      document.getElementById('tab-'+t).classList.remove('hidden');
      document.querySelectorAll('.sidebar-link').forEach(e=>e.classList.remove('active'));
      const sl=document.querySelector('[data-tab="'+t+'"]');if(sl)sl.classList.add('active');
      const titles={analyzer:'AI Strategic Analyzer',swot:'SWOT Analyzer',coach:'AI Coach Mode',pomodoro:'Pomodoro Timer',goals:'Goal Tracker',habits:'Habit Tracker',review:'Weekly Review',resources:'Resource Library',insights:'Daily Insights'};
      document.getElementById('page-title').textContent=titles[t]||'SparkMind V3';
      if(t==='goals')renderGoals();if(t==='habits')renderHabits();if(t==='resources')renderResources();if(t==='insights')renderInsights();
      closeSB();
    }

    // ===== CHAT =====
    function esc(t){const d=document.createElement('div');d.textContent=t;return d.innerHTML}
    function useEx(t){document.getElementById('user-input').value=t;sendMsg()}
    function sendMsg(){
      const inp=document.getElementById('user-input');const t=inp.value.trim();if(!t)return;inp.value='';inp.style.height='auto';
      const box=document.getElementById('chat-msgs');
      box.innerHTML+='<div class="msg-in flex justify-end"><div class="bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-2xl shadow-lg shadow-brand-500/10"><p class="text-sm">'+esc(t)+'</p></div></div>';
      const tid='t-'+Date.now();
      box.innerHTML+='<div id="'+tid+'" class="msg-in flex gap-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="glass rounded-2xl rounded-tl-sm px-5 py-4"><div class="flex gap-1.5"><div class="w-2 h-2 bg-brand-400 rounded-full typing-dot"></div><div class="w-2 h-2 bg-brand-400 rounded-full typing-dot"></div><div class="w-2 h-2 bg-brand-400 rounded-full typing-dot"></div></div></div></div>';
      box.scrollTop=box.scrollHeight;
      fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t,mode:'strategic'})})
        .then(r=>r.json()).then(d=>{
          document.getElementById(tid).remove();
          box.innerHTML+='<div class="msg-in flex gap-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="glass rounded-2xl rounded-tl-sm p-5 max-w-2xl"><div class="text-sm leading-relaxed">'+d.response+'</div></div></div>';
          box.scrollTop=box.scrollHeight;
        }).catch(()=>{document.getElementById(tid).remove();box.innerHTML+='<div class="msg-in flex gap-3"><div class="w-9 h-9 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-exclamation text-red-400 text-sm"></i></div><div class="glass rounded-2xl p-5"><p class="text-sm text-red-400">Error. Coba lagi!</p></div></div>';box.scrollTop=box.scrollHeight});
    }

    // ===== SWOT =====
    function runSWOT(){
      const inp=document.getElementById('swot-input').value.trim();if(!inp)return alert('Deskripsikan bisnis/ide kamu!');
      const res=document.getElementById('swot-result');res.innerHTML='<div class="text-center py-8"><div class="flex gap-1.5 justify-center"><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div></div><p class="text-gray-500 text-sm mt-3">Generating SWOT...</p></div>';
      fetch('/api/swot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business:inp})})
        .then(r=>r.json()).then(d=>{res.innerHTML='<div class="glass rounded-2xl p-6">'+d.response+'</div>'})
        .catch(()=>{res.innerHTML='<p class="text-red-400 text-center">Error!</p>'});
    }

    // ===== COACH =====
    function runCoach(){
      const g=document.getElementById('coach-goal').value.trim();if(!g)return alert('Masukkan goal kamu!');
      const s=document.getElementById('coach-state').value.trim();const o=document.getElementById('coach-obstacles').value.trim();
      const res=document.getElementById('coach-result');res.innerHTML='<div class="text-center py-8"><div class="flex gap-1.5 justify-center"><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div></div><p class="text-gray-500 text-sm mt-3">AI Coach analyzing...</p></div>';
      fetch('/api/coach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({goal:g,currentState:s,obstacles:o})})
        .then(r=>r.json()).then(d=>{res.innerHTML='<div class="glass rounded-2xl p-6">'+d.response+'</div>'})
        .catch(()=>{res.innerHTML='<p class="text-red-400 text-center">Error!</p>'});
    }

    // ===== POMODORO =====
    let pomoInterval=null,pomoTimeLeft=25*60,pomoRunning=false,pomoMode='focus';
    const pomoModes={focus:{time:25*60,label:'Focus Time',color:'#6366f1'},short:{time:5*60,label:'Short Break',color:'#34d399'},long:{time:15*60,label:'Long Break',color:'#fbbf24'}};
    function updatePomoDisplay(){
      const m=Math.floor(pomoTimeLeft/60),s=pomoTimeLeft%60;
      document.getElementById('pomo-time').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      const total=pomoModes[pomoMode].time;const pct=(total-pomoTimeLeft)/total;
      document.getElementById('pomo-ring').style.strokeDashoffset=565.48*(1-pct);
      document.getElementById('pomo-ring').style.stroke=pomoModes[pomoMode].color;
      document.getElementById('pomo-label').textContent=pomoModes[pomoMode].label;
      document.getElementById('pomo-sessions').textContent=pomoSessions;
      document.getElementById('pomo-total').textContent=pomoTotal+'m';
    }
    function startPomo(){
      if(pomoRunning)return;pomoRunning=true;
      document.getElementById('pomo-start-btn').classList.add('hidden');document.getElementById('pomo-pause-btn').classList.remove('hidden');
      pomoInterval=setInterval(()=>{
        pomoTimeLeft--;if(pomoTimeLeft<=0){clearInterval(pomoInterval);pomoRunning=false;
          if(pomoMode==='focus'){pomoSessions++;pomoTotal+=25;saveState()}
          document.getElementById('pomo-start-btn').classList.remove('hidden');document.getElementById('pomo-pause-btn').classList.add('hidden');
          try{new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=').play()}catch{}
          alert(pomoMode==='focus'?'Focus session selesai! Istirahat dulu 🎉':'Break selesai! Kembali fokus 💪');
          setPomoMode(pomoMode==='focus'?'short':'focus');
        }updatePomoDisplay()},1000);
    }
    function pausePomo(){if(!pomoRunning)return;clearInterval(pomoInterval);pomoRunning=false;document.getElementById('pomo-start-btn').classList.remove('hidden');document.getElementById('pomo-pause-btn').classList.add('hidden')}
    function resetPomo(){pausePomo();pomoTimeLeft=pomoModes[pomoMode].time;updatePomoDisplay()}
    function setPomoMode(mode){
      pausePomo();pomoMode=mode;pomoTimeLeft=pomoModes[mode].time;
      document.querySelectorAll('.pomo-mode-btn').forEach(b=>{b.classList.remove('active');b.className='pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold transition text-gray-400 bg-white/5 hover:bg-white/10'});
      const btn=document.querySelector('[data-mode="'+mode+'"]');if(btn){btn.classList.add('active');btn.className='pomo-mode-btn active text-xs px-4 py-2 rounded-lg font-bold transition bg-brand-500 text-white'}
      updatePomoDisplay();
    }
    updatePomoDisplay();

    // ===== GOALS =====
    function showAddGoal(){document.getElementById('add-goal-form').classList.remove('hidden')}
    function hideAddGoal(){document.getElementById('add-goal-form').classList.add('hidden')}
    function addGoal(){
      const t=document.getElementById('goal-title').value.trim();if(!t)return alert('Nama goal!');
      goals.push({id:Date.now(),title:t,desc:document.getElementById('goal-desc').value.trim(),category:document.getElementById('goal-cat').value,progress:0,deadline:document.getElementById('goal-dl').value||'TBD',milestones:[]});
      document.getElementById('goal-title').value='';document.getElementById('goal-desc').value='';hideAddGoal();saveState();renderGoals();
    }
    function updProg(id,d){const g=goals.find(x=>x.id===id);if(g){g.progress=Math.max(0,Math.min(100,g.progress+d));saveState();renderGoals()}}
    function delGoal(id){if(confirm('Hapus?')){goals=goals.filter(x=>x.id!==id);saveState();renderGoals()}}
    function renderGoals(){
      const l=document.getElementById('goals-list');if(!goals.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-bullseye text-4xl text-gray-700 mb-4"></i><p class="text-gray-500 text-sm">Belum ada goals.</p></div>';return}
      const ci={bisnis:'💼',karir:'📈',skill:'💻',personal:'🧘',finansial:'💰',kesehatan:'💪'};
      l.innerHTML=goals.map(g=>'<div class="glass rounded-2xl p-6 hover:border-brand-500/20 transition"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><span class="text-2xl">'+(ci[g.category]||'🎯')+'</span><div><h3 class="font-bold text-white">'+esc(g.title)+'</h3><p class="text-gray-500 text-xs">'+esc(g.desc)+'</p></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-500"><i class="fas fa-calendar mr-1"></i>'+g.deadline+'</span><button onclick="delGoal('+g.id+')" class="text-gray-600 hover:text-red-400 transition"><i class="fas fa-trash text-xs"></i></button></div></div><div class="flex items-center gap-4"><div class="flex-1"><div class="w-full bg-white/5 rounded-full h-3"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-3 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div></div><span class="text-sm font-bold text-brand-400 min-w-[40px] text-right">'+g.progress+'%</span><div class="flex gap-1"><button onclick="updProg('+g.id+',-10)" class="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition"><i class="fas fa-minus text-xs text-gray-500"></i></button><button onclick="updProg('+g.id+',10)" class="w-7 h-7 bg-brand-500/20 hover:bg-brand-500/30 rounded-lg flex items-center justify-center transition"><i class="fas fa-plus text-xs text-brand-400"></i></button></div></div>'+(g.milestones&&g.milestones.length?'<div class="mt-4 flex flex-wrap gap-2">'+g.milestones.map((m,i)=>'<span class="text-xs px-3 py-1 rounded-lg '+(i<Math.ceil(g.progress/(100/g.milestones.length))?'bg-neon-green/10 text-neon-green border border-neon-green/20':'bg-white/5 text-gray-500 border border-white/5')+'">'+(i<Math.ceil(g.progress/(100/g.milestones.length))?'✅':'⬜')+' '+m+'</span>').join('')+'</div>':'')+'</div>').join('');
    }

    // ===== HABITS =====
    function showAddHabit(){document.getElementById('add-habit-form').classList.remove('hidden')}
    function hideAddHabit(){document.getElementById('add-habit-form').classList.add('hidden')}
    function addHabit(){
      const n=document.getElementById('habit-name').value.trim();if(!n)return alert('Nama habit!');
      habits.push({id:Date.now(),name:n,freq:document.getElementById('habit-freq').value,streak:0,done:false,icon:'✨'});
      document.getElementById('habit-name').value='';hideAddHabit();saveState();renderHabits();
    }
    function toggleHabit(id){const h=habits.find(x=>x.id===id);if(h){h.done=!h.done;if(h.done)h.streak++;else h.streak=Math.max(0,h.streak-1);saveState();renderHabits()}}
    function delHabit(id){if(confirm('Hapus?')){habits=habits.filter(x=>x.id!==id);saveState();renderHabits()}}
    function renderHabits(){
      const l=document.getElementById('habits-list');if(!habits.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-fire text-4xl text-gray-700 mb-4"></i><p class="text-gray-500 text-sm">Belum ada habits.</p></div>';return}
      const fq={daily:'Setiap Hari',weekday:'Sen-Jum','3x':'3x/Minggu'};
      l.innerHTML=habits.map(h=>'<div class="glass rounded-2xl p-5 flex items-center gap-4 hover:border-neon-pink/20 transition"><button onclick="toggleHabit('+h.id+')" class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition '+(h.done?'bg-gradient-to-br from-neon-green to-emerald-600 text-white shadow-lg shadow-neon-green/20':'bg-white/5 text-gray-600 hover:bg-white/10')+'"><i class="fas '+(h.done?'fa-check':'fa-circle')+' text-sm"></i></button><div class="flex-1 min-w-0"><h3 class="font-bold text-white text-sm truncate '+(h.done?'line-through opacity-50':'')+'">'+h.icon+' '+esc(h.name)+'</h3><p class="text-gray-500 text-xs">'+(fq[h.freq]||h.freq)+'</p></div><div class="text-right flex-shrink-0"><div class="flex items-center gap-1.5"><i class="fas fa-fire-flame-curved text-neon-amber text-sm"></i><span class="font-black text-white">'+h.streak+'</span></div><p class="text-[10px] text-gray-600">streak</p></div><button onclick="delHabit('+h.id+')" class="text-gray-600 hover:text-red-400 transition flex-shrink-0"><i class="fas fa-trash text-xs"></i></button></div>').join('');
    }

    // ===== WEEKLY REVIEW =====
    function saveReview(){
      const w=document.getElementById('review-wins').value,l=document.getElementById('review-learn').value,f=document.getElementById('review-focus').value;
      if(!w&&!l&&!f)return alert('Isi minimal 1 field!');
      const reviews=LS.get('reviews',[]);reviews.push({date:new Date().toISOString(),wins:w,learnings:l,focus:f});LS.set('reviews',reviews);
      document.getElementById('review-saved').classList.remove('hidden');
      setTimeout(()=>document.getElementById('review-saved').classList.add('hidden'),3000);
    }

    // ===== RESOURCES =====
    function renderResources(){
      document.getElementById('resources-grid').innerHTML=resources.map(r=>'<div class="glass rounded-2xl p-6 hover:border-brand-500/20 hover:-translate-y-1 transition cursor-pointer"><span class="text-3xl mb-3 block">'+r.icon+'</span><span class="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-lg font-bold uppercase border border-white/5">'+r.cat+'</span><h3 class="font-bold text-white mt-2 mb-1 text-sm">'+r.title+'</h3><p class="text-gray-500 text-xs">'+r.desc+'</p></div>').join('');
    }

    // ===== INSIGHTS =====
    function renderInsights(){
      document.getElementById('insights-list').innerHTML=insights.map(i=>'<div class="glass rounded-2xl p-6 hover:border-brand-500/20 transition"><div class="flex items-start gap-4"><span class="text-2xl">'+i.icon+'</span><div class="flex-1"><div class="flex items-center justify-between mb-1"><h3 class="font-bold text-white text-sm">'+i.title+'</h3><span class="text-xs text-gray-600">'+i.time+'</span></div><p class="text-gray-400 text-sm leading-relaxed">'+i.desc+'</p></div></div></div>').join('');
    }

    // ===== SIDEBAR MOBILE =====
    document.getElementById('sb-toggle').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('hidden');document.getElementById('sidebar').classList.add('fixed','inset-y-0','left-0','z-50');document.getElementById('sb-overlay').classList.remove('hidden')});
    function closeSB(){document.getElementById('sidebar').classList.add('hidden');document.getElementById('sidebar').classList.remove('fixed','inset-y-0','left-0','z-50');document.getElementById('sb-overlay').classList.add('hidden')}

    // ===== TEXTAREA AUTO RESIZE =====
    document.getElementById('user-input').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,128)+'px'});

    // ===== QUOTE TICKER =====
    fetch('/api/quotes').then(r=>r.json()).then(q=>{document.getElementById('quote-ticker').textContent='"'+q.text+'" — '+q.author}).catch(()=>{});

    // ===== INIT =====
    renderGoals();renderHabits();
  </script>
</body>
</html>`

export default app
