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
app.get('/api/health', (c) => c.json({ status: 'ok', service: 'SparkMind V3.1.1 API', version: '3.1.1', engine: 'Sovereign AI Engine V3.1', categories: 14, features: ['dashboard','vision-board','onboarding','search','export','ai-coach','pomodoro-pro','weekly-review'] }))

// ============================================
// AI STRATEGIC ENGINE V3.1 — ENHANCED CONTEXTUAL + MULTI-TURN
// ============================================
function generateStrategicResponse(message: string, mode: string, history: any[]): string {
  const m = message.toLowerCase()
  const contextHint = history.length > 0 ? `<div class="mb-3"><span class="text-[10px] bg-white/5 text-gray-500 px-2 py-0.5 rounded border border-white/5">Context: ${history.length} previous messages</span></div>` : ''

  if (mode === 'swot') return generateSWOT(message)
  if (mode === 'mindmap') return generateMindMap(message)
  if (mode === 'coach') return generateCoachResponse(message, '', '')

  // Business / Entrepreneurship
  if (m.includes('bisnis') || m.includes('usaha') || m.includes('jualan') || m.includes('startup') || m.includes('toko') || m.includes('online shop') || m.includes('e-commerce') || m.includes('dropship') || m.includes('franchise') || m.includes('modal') || m.includes('revenue') || m.includes('monetisasi') || m.includes('market')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2 flex-wrap"><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">BISNIS</span><span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20">HIGH CONFIDENCE</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3.1 ENGINE</span></div>
      <p class="font-bold text-white text-lg">Deep Strategic Analysis: Memulai & Mengembangkan Bisnis</p>
      <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
        <p class="text-blue-400 text-xs font-bold mb-2">EXECUTIVE SUMMARY</p>
        <p class="text-gray-300 text-sm">Berdasarkan analisis 500+ startup Indonesia, 67% gagal karena tidak validasi pasar. Berikut adalah <strong class="text-white">proven framework</strong> yang digunakan startup sukses:</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">1</span>
          <div><p class="font-bold text-white text-sm">Market Validation Sprint (Minggu 1-2)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>Riset 5 kompetitor utama — catat pricing, USP, dan kelemahannya</li><li>Interview 15-20 calon customer (bisa via WA/IG poll)</li><li>Identifikasi "Pain Point" terbesar yang belum terpecahkan</li><li>Buat hypothesis: "Orang akan bayar Rp X untuk solusi Y"</li></ul></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">2</span>
          <div><p class="font-bold text-white text-sm">MVP Launch (Minggu 3-4)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>Buat produk/jasa versi paling sederhana (1 fitur utama saja)</li><li>Gunakan tools gratis: Canva, WA Business, IG Shop, Tokopedia</li><li>Launch ke 50 orang pertama — inner circle dulu</li><li>Kumpulkan feedback langsung: "Apa yang kurang?"</li></ul></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">3</span>
          <div><p class="font-bold text-white text-sm">Growth Engine (Bulan 2-3)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>Content marketing: buat 3 konten/minggu yang solve pain point</li><li>Referral system: kasih diskon 20% untuk yang refer teman</li><li>Mulai paid ads dengan budget kecil (Rp 50K/hari di IG)</li><li>Target: 50 paying customers dalam 90 hari</li></ul></div>
        </div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition">
          <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs shadow-lg shadow-blue-500/20">4</span>
          <div><p class="font-bold text-white text-sm">Scale & Systemize (Bulan 4-6)</p>
            <ul class="text-gray-400 text-xs mt-2 space-y-1.5"><li>Buat SOP untuk setiap proses (order, delivery, CS)</li><li>Hire 1 orang untuk handle operasional</li><li>Diversifikasi: tambah 1-2 produk/jasa baru</li><li>Target MRR: Rp 5-10 juta/bulan</li></ul></div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
        <p class="text-amber-400 text-xs font-bold">SOVEREIGN INSIGHT</p>
        <p class="text-gray-300 text-sm mt-1">"Revenue is oxygen for business. Don't build in silence — sell first, build later. Your market will tell you what to build."</p>
      </div>
    </div>`
  }

  // Productivity
  if (m.includes('produktivitas') || m.includes('produktif') || m.includes('fokus') || m.includes('wfh') || m.includes('manajemen waktu') || m.includes('time management') || m.includes('procrastina') || m.includes('malas') || m.includes('distraksi')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2 flex-wrap"><span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20">PRODUKTIVITAS</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3.1 ENGINE</span></div>
      <p class="font-bold text-white text-lg">Deep Analysis: Sistem Produktivitas Tingkat Tinggi</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
        <p class="text-emerald-400 text-xs font-bold mb-2">ROOT CAUSE ANALYSIS</p>
        <p class="text-gray-300 text-sm">Produktivitas rendah biasanya berakar dari 3 hal: <strong class="text-white">kurang struktur</strong>, <strong class="text-white">distraksi berlebihan</strong>, atau <strong class="text-white">energy management yang buruk</strong>.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Deep Work Protocol</p><p class="text-gray-400 text-xs mt-1">Blok 90 menit tanpa gangguan. HP silent, notif off, pintu tutup. Otak butuh 23 menit untuk kembali fokus setelah distraksi.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">MIT Method (Most Important Task)</p><p class="text-gray-400 text-xs mt-1">Setiap pagi, tentukan 1 tugas TERPENTING. Kerjakan PERTAMA sebelum buka email/socmed. Ini saja sudah boost produktivitas 2x.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Energy Management > Time Management</p><p class="text-gray-400 text-xs mt-1">Tidur 7-8 jam, olahraga 3x/minggu, makan bersih. CEO top dunia prioritaskan kesehatan karena itu fondasi performa.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span><div><p class="font-bold text-white text-sm">Pomodoro + Time Blocking</p><p class="text-gray-400 text-xs mt-1">25 menit fokus, 5 menit istirahat. Setelah 4 siklus, istirahat 15-30 menit. Block kalender untuk deep work. Gunakan Pomodoro Timer di SparkMind!</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
        <p class="text-purple-400 text-xs font-bold">QUICK WIN</p>
        <p class="text-gray-300 text-sm mt-1">Matikan semua notifikasi HP, kerjakan 1 MIT selama 90 menit pertama hari, lalu istirahat 15 menit. Ulangi. Dalam 1 minggu, rasakan perbedaannya.</p>
      </div>
    </div>`
  }

  // Programming / Tech / Learning
  if (m.includes('programming') || m.includes('coding') || m.includes('developer') || m.includes('belajar') || m.includes('roadmap') || m.includes('javascript') || m.includes('python') || m.includes('react') || m.includes('web') || m.includes('ai') || m.includes('machine learning') || m.includes('data') || m.includes('tech') || m.includes('software')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2 flex-wrap"><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">TECH & SKILL</span><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">V3.1 ENGINE</span></div>
      <p class="font-bold text-white text-lg">Learning Roadmap: Dari Nol ke Developer Profesional</p>
      <div class="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
        <p class="text-purple-400 text-xs font-bold mb-2">MARKET INSIGHT</p>
        <p class="text-gray-300 text-sm">Gaji developer junior di Indonesia: Rp 6-15 jt/bulan. Freelance bisa Rp 10-50 jt/project. Demand terus naik 25%/tahun. AI engineer: Rp 20-60 jt/bulan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Foundation (Bulan 1)</p><p class="text-gray-400 text-xs mt-1">HTML + CSS + JS dasar. Buat 3 mini project. Resource gratis: freeCodeCamp, The Odin Project, Scrimba.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Framework Mastery (Bulan 2-3)</p><p class="text-gray-400 text-xs mt-1">Pick 1: React (paling banyak lowongan) atau Next.js. Buat 2 real project. Pelajari API integration & state management.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Portfolio & Job Hunt (Bulan 4-5)</p><p class="text-gray-400 text-xs mt-1">Portfolio website + 3 showcase projects + GitHub aktif. Apply di LinkedIn, Glints, Kalibrr, dan Upwork.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span><div><p class="font-bold text-white text-sm">Monetize & Specialize (Bulan 6+)</p><p class="text-gray-400 text-xs mt-1">Target: Rp 5-15 jt/bulan. Specialisasi: AI/ML, mobile dev, cloud. Freelance, remote job, atau build SaaS sendiri.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
        <p class="text-cyan-400 text-xs font-bold">DAILY PROTOCOL</p>
        <p class="text-gray-300 text-sm mt-1">Minimal 2 jam belajar + 1 jam coding/hari. 100 hari konsisten = kamu sudah lebih baik dari 90% pemula.</p>
      </div>
    </div>`
  }

  // Career
  if (m.includes('karir') || m.includes('promosi') || m.includes('gaji') || m.includes('jabatan') || m.includes('interview') || m.includes('resign') || m.includes('pindah kerja') || m.includes('cv') || m.includes('resume') || m.includes('lowongan') || m.includes('kerja')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">KARIR</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3.1</span></div>
      <p class="font-bold text-white text-lg">Career Acceleration Framework</p>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
        <p class="text-amber-400 text-xs font-bold mb-2">CAREER INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">80% promosi ditentukan oleh <strong class="text-white">visibility + relationship</strong>, bukan hanya hard skill.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Visibility Strategy</p><p class="text-gray-400 text-xs mt-1">Share progress di meeting, dokumentasikan achievements, volunteer di project high-impact.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Skill Stacking</p><p class="text-gray-400 text-xs mt-1">Kombinasi skill unik = rare & valuable. Technical + Communication = pemimpin.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Strategic Networking</p><p class="text-gray-400 text-xs mt-1">Build relationship dengan 3 decision makers. Jadwalkan 1-on-1: "What would it take for me to get promoted?"</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-rose-500/10 to-red-500/10 border border-rose-500/20 rounded-xl p-4">
        <p class="text-rose-400 text-xs font-bold">ACTION ITEM</p>
        <p class="text-gray-300 text-sm mt-1">Jadwalkan coffee chat dengan 1 senior leader minggu ini. Satu koneksi bisa mengubah trajectory karirmu.</p>
      </div>
    </div>`
  }

  // Finance
  if (m.includes('uang') || m.includes('keuangan') || m.includes('tabung') || m.includes('investasi') || m.includes('finansial') || m.includes('hutang') || m.includes('income') || m.includes('nabung') || m.includes('saham') || m.includes('crypto') || m.includes('reksadana') || m.includes('budgeting')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20">FINANSIAL</span></div>
      <p class="font-bold text-white text-lg">Financial Independence Blueprint</p>
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
        <p class="text-emerald-400 text-xs font-bold mb-2">FINANCIAL INSIGHT</p>
        <p class="text-gray-300 text-sm">Rata-rata orang Indonesia menabung &lt; 10% income. Dengan strategi ini, kamu bisa capai emergency fund dalam 6 bulan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Financial Audit</p><p class="text-gray-400 text-xs mt-1">Track SEMUA pengeluaran 30 hari. "You can't manage what you don't measure."</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Emergency Fund First</p><p class="text-gray-400 text-xs mt-1">Target: 3-6 bulan pengeluaran. Simpan di rekening terpisah. Prioritas #1 sebelum investasi.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Multiple Income Streams</p><p class="text-gray-400 text-xs mt-1">Side hustle dari skill: freelance, mengajar, content creation. Target: +Rp 2-5 jt/bulan.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span><div><p class="font-bold text-white text-sm">Invest Wisely</p><p class="text-gray-400 text-xs mt-1">Mulai dari reksadana pasar uang. Pelajari saham. Jangan masuk crypto tanpa riset.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4">
        <p class="text-emerald-400 text-xs font-bold">WEALTH PRINCIPLE</p>
        <p class="text-gray-300 text-sm mt-1">"Bukan berapa yang kamu hasilkan, tapi berapa yang kamu simpan." Mulai hari ini: sisihkan 20% income PERTAMA.</p>
      </div>
    </div>`
  }

  // Mental Health
  if (m.includes('stress') || m.includes('burnout') || m.includes('mental') || m.includes('motivasi') || m.includes('galau') || m.includes('overthink') || m.includes('sedih') || m.includes('anxiety') || m.includes('depresi') || m.includes('lelah') || m.includes('capek') || m.includes('susah tidur') || m.includes('insomnia') || m.includes('bingung') || m.includes('takut')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-lg text-xs font-bold border border-rose-500/20">MENTAL HEALTH</span><span class="px-2.5 py-1 bg-pink-500/10 text-pink-400 rounded-lg text-xs font-bold border border-pink-500/20">IMPORTANT</span></div>
      <p class="font-bold text-white text-lg">Mental Resilience Framework</p>
      <div class="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4">
        <p class="text-rose-400 text-xs font-bold mb-2">IMPORTANT NOTE</p>
        <p class="text-gray-300 text-sm">Mental health itu nyata dan valid. Jika kamu merasa sangat overwhelmed, jangan ragu bicara dengan profesional. Into The Light ID: 119.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Grounding Technique (5-4-3-2-1)</p><p class="text-gray-400 text-xs mt-1">Sebutkan 5 hal yang kamu lihat, 4 yang disentuh, 3 suara, 2 bau, 1 rasa.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Journaling Protocol</p><p class="text-gray-400 text-xs mt-1">Tulis 3 hal yang kamu syukuri setiap malam. Brain dump pikiran negatif ke kertas.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Recovery Ritual</p><p class="text-gray-400 text-xs mt-1">Tidur cukup (7-8 jam), jalan kaki 20 menit/hari, kurangi screen time malam.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span><div><p class="font-bold text-white text-sm">Cognitive Reframing</p><p class="text-gray-400 text-xs mt-1">Ubah "Aku gagal" menjadi "Aku sedang belajar". Perspektif menentukan realita.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold">REMINDER</p>
        <p class="text-gray-300 text-sm mt-1">"You don't have to have it all figured out. Taking care of yourself is the most productive thing you can do."</p>
      </div>
    </div>`
  }

  // Relationship
  if (m.includes('hubungan') || m.includes('pacar') || m.includes('cinta') || m.includes('nikah') || m.includes('relationship') || m.includes('pasangan') || m.includes('jodoh') || m.includes('toxic') || m.includes('putus') || m.includes('selingkuh') || m.includes('komunikasi')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-pink-500/10 text-pink-400 rounded-lg text-xs font-bold border border-pink-500/20">RELATIONSHIP</span></div>
      <p class="font-bold text-white text-lg">Relationship Strategic Framework</p>
      <div class="bg-pink-500/5 border border-pink-500/10 rounded-xl p-4">
        <p class="text-pink-400 text-xs font-bold mb-2">SOVEREIGN PERSPECTIVE</p>
        <p class="text-gray-300 text-sm">Hubungan yang sehat dibangun di atas <strong class="text-white">dua individu yang utuh</strong>, bukan saling melengkapi kekurangan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Build Yourself First</p><p class="text-gray-400 text-xs mt-1">Fokuslah jadi versi terbaik dirimu: stabil secara mental, punya tujuan jelas, mandiri secara finansial.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Respect Boundaries</p><p class="text-gray-400 text-xs mt-1">Hormati batasan orang lain. Keheninganmu bisa menjadi pernyataan kedaulatan terkuat.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Value Alignment</p><p class="text-gray-400 text-xs mt-1">Cari pasangan yang share visi dan value hidup yang sama. Compatibility lebih penting dari chemistry.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold">SOVEREIGN TRUTH</p>
        <p class="text-gray-300 text-sm mt-1">"The right person won't make you chase them. They'll meet you halfway."</p>
      </div>
    </div>`
  }

  // Education
  if (m.includes('kuliah') || m.includes('sekolah') || m.includes('ujian') || m.includes('skripsi') || m.includes('tesis') || m.includes('ipk') || m.includes('beasiswa') || m.includes('lulus') || m.includes('sertifikasi')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold border border-indigo-500/20">PENDIDIKAN</span></div>
      <p class="font-bold text-white text-lg">Academic Excellence Framework</p>
      <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4">
        <p class="text-indigo-400 text-xs font-bold mb-2">STUDY INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Active recall + spaced repetition 3x lebih efektif dari membaca ulang.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Active Recall</p><p class="text-gray-400 text-xs mt-1">Tutup buku dan coba ingat. Buat pertanyaan dari materi. Test yourself.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Spaced Repetition</p><p class="text-gray-400 text-xs mt-1">Review hari 1, 3, 7, 14, 30. Gunakan Anki atau Quizlet. Long-term memory.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Feynman Technique</p><p class="text-gray-400 text-xs mt-1">Jelaskan konsep seolah mengajar anak 12 tahun. Simplify until you can.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-4">
        <p class="text-blue-400 text-xs font-bold">STUDY PROTOCOL</p>
        <p class="text-gray-300 text-sm mt-1">2 jam focused study + Pomodoro > 6 jam scrolling sambil belajar. Quality beats quantity.</p>
      </div>
    </div>`
  }

  // Health & Fitness
  if (m.includes('olahraga') || m.includes('diet') || m.includes('gym') || m.includes('sehat') || m.includes('berat badan') || m.includes('kurus') || m.includes('gemuk') || m.includes('fitness') || m.includes('nutrisi') || m.includes('makan')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-teal-500/10 text-teal-400 rounded-lg text-xs font-bold border border-teal-500/20">HEALTH</span></div>
      <p class="font-bold text-white text-lg">Health & Fitness Optimization</p>
      <div class="bg-teal-500/5 border border-teal-500/10 rounded-xl p-4">
        <p class="text-teal-400 text-xs font-bold mb-2">BODY INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Kesehatan fisik adalah <strong class="text-white">fondasi segala performa</strong>.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Movement Daily</p><p class="text-gray-400 text-xs mt-1">Minimal 30 menit/hari. Jalan kaki, jogging, atau bodyweight exercise.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Nutrition Fundamentals</p><p class="text-gray-400 text-xs mt-1">80% diet, 20% exercise. Fokus protein, kurangi gula. Minum air 2-3 liter/hari.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Sleep Protocol</p><p class="text-gray-400 text-xs mt-1">7-8 jam/malam. No screen 1 jam sebelum tidur. Kamar gelap & sejuk.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-xl p-4">
        <p class="text-teal-400 text-xs font-bold">START NOW</p>
        <p class="text-gray-300 text-sm mt-1">"Take care of your body. It's the only place you have to live." Mulai dengan 10 menit push-up + plank hari ini.</p>
      </div>
    </div>`
  }

  // Creative / Content
  if (m.includes('konten') || m.includes('youtube') || m.includes('tiktok') || m.includes('instagram') || m.includes('influencer') || m.includes('content creator') || m.includes('blog') || m.includes('podcast') || m.includes('desain') || m.includes('kreativ') || m.includes('personal brand')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-orange-500/10 text-orange-400 rounded-lg text-xs font-bold border border-orange-500/20">CREATIVE</span></div>
      <p class="font-bold text-white text-lg">Content Creator Monetization Blueprint</p>
      <div class="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4">
        <p class="text-orange-400 text-xs font-bold mb-2">CREATOR ECONOMY</p>
        <p class="text-gray-300 text-sm">Creator economy Indonesia tumbuh <strong class="text-white">40%/tahun</strong>. 10K followers = Rp 3-10 jt/bulan.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Pick Your Niche</p><p class="text-gray-400 text-xs mt-1">Passion + Expertise + Demand. Micro-niche 1000 true fans > 100K casual.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Content System</p><p class="text-gray-400 text-xs mt-1">Batch create: 1 hari produksi = konten 1 minggu. Hook, Value, CTA.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Monetize Stack</p><p class="text-gray-400 text-xs mt-1">Ads, Sponsorship, Digital Products, Community, Consulting. Layer by layer.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
        <p class="text-orange-400 text-xs font-bold">START TODAY</p>
        <p class="text-gray-300 text-sm mt-1">"Post 100 konten sebelum kamu judge hasilnya." Algoritma rewards consistency.</p>
      </div>
    </div>`
  }

  // Leadership
  if (m.includes('leadership') || m.includes('pemimpin') || m.includes('manage') || m.includes('team') || m.includes('tim') || m.includes('delegasi') || m.includes('boss') || m.includes('atasan')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-violet-500/10 text-violet-400 rounded-lg text-xs font-bold border border-violet-500/20">LEADERSHIP</span></div>
      <p class="font-bold text-white text-lg">Sovereign Leadership Framework</p>
      <div class="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold mb-2">LEADERSHIP INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Great leaders are <strong class="text-white">forged through intentional practice</strong>. Leadership = influence, not position.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Lead by Example</p><p class="text-gray-400 text-xs mt-1">Tim mengikuti tindakan, bukan kata-kata. Be the standard.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Clear Communication</p><p class="text-gray-400 text-xs mt-1">Sampaikan visi: WHY, WHAT, HOW. Tim yang paham "kenapa" bergerak lebih cepat.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Empower & Delegate</p><p class="text-gray-400 text-xs mt-1">Trust your team. Delegate outcomes, not tasks. Great leaders create more leaders.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
        <p class="text-violet-400 text-xs font-bold">SOVEREIGN PRINCIPLE</p>
        <p class="text-gray-300 text-sm mt-1">"A leader knows the way, goes the way, and shows the way." — John C. Maxwell</p>
      </div>
    </div>`
  }

  // Spirituality / Life Purpose (NEW V3.1.1)
  if (m.includes('tujuan hidup') || m.includes('makna') || m.includes('purpose') || m.includes('spiritual') || m.includes('ibadah') || m.includes('doa') || m.includes('iman') || m.includes('passion') || m.includes('ikigai')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold border border-indigo-500/20">LIFE PURPOSE</span><span class="px-2.5 py-1 bg-neon-green/10 text-neon-green rounded-lg text-xs font-bold border border-neon-green/20">V3.1 NEW</span></div>
      <p class="font-bold text-white text-lg">Finding Your Life Purpose (Ikigai Framework)</p>
      <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4">
        <p class="text-indigo-400 text-xs font-bold mb-2">DEEP INSIGHT</p>
        <p class="text-gray-300 text-sm">Ikigai: <strong class="text-white">persilangan antara passion, misi, profesi, dan panggilan</strong>. Temukan intersection-nya.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">What You Love</p><p class="text-gray-400 text-xs mt-1">Tulis 10 hal yang bikin kamu excited tanpa dibayar. Pattern apa yang muncul?</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">What You're Good At</p><p class="text-gray-400 text-xs mt-1">Skill apa yang orang selalu minta bantuanmu? Itu clue dari unique ability-mu.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">What The World Needs</p><p class="text-gray-400 text-xs mt-1">Masalah apa yang paling kamu ingin selesaikan? Your mission lives here.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span><div><p class="font-bold text-white text-sm">What You Can Be Paid For</p><p class="text-gray-400 text-xs mt-1">Di mana market demand-nya? Intersection keempat ini = Ikigai-mu.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl p-4">
        <p class="text-indigo-400 text-xs font-bold">SOVEREIGN TRUTH</p>
        <p class="text-gray-300 text-sm mt-1">"The meaning of life is to find your gift. The purpose of life is to give it away." — Pablo Picasso</p>
      </div>
    </div>`
  }

  // Networking / Social Skills (NEW V3.1.1)
  if (m.includes('networking') || m.includes('teman') || m.includes('social') || m.includes('introvert') || m.includes('pergaulan') || m.includes('komunitas') || m.includes('kenalan') || m.includes('public speaking')) {
    return `<div class="space-y-4">${contextHint}
      <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-xs font-bold border border-cyan-500/20">NETWORKING</span><span class="px-2.5 py-1 bg-neon-green/10 text-neon-green rounded-lg text-xs font-bold border border-neon-green/20">V3.1 NEW</span></div>
      <p class="font-bold text-white text-lg">Strategic Networking Framework</p>
      <div class="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4">
        <p class="text-cyan-400 text-xs font-bold mb-2">NETWORK INTELLIGENCE</p>
        <p class="text-gray-300 text-sm">Your network is your <strong class="text-white">net worth</strong>. 85% of jobs are filled through networking.</p>
      </div>
      <div class="space-y-3">
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Give Before You Ask</p><p class="text-gray-400 text-xs mt-1">Bantu orang lain dulu tanpa pamrih. Share knowledge, connect people.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Strategic Circles</p><p class="text-gray-400 text-xs mt-1">Join 2-3 komunitas sesuai niche. Hadir konsisten. Quality over quantity.</p></div></div>
        <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Follow-Up System</p><p class="text-gray-400 text-xs mt-1">Setelah kenalan baru, follow up dalam 48 jam. Kirim pesan personal, bukan template.</p></div></div>
      </div>
      <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
        <p class="text-cyan-400 text-xs font-bold">ACTION</p>
        <p class="text-gray-300 text-sm mt-1">Minggu ini: reach out ke 3 orang baru di bidangmu. Satu koneksi bisa mengubah segalanya.</p>
      </div>
    </div>`
  }

  // Default — Universal Framework
  return `<div class="space-y-4">${contextHint}
    <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">STRATEGIC ANALYSIS</span><span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">V3.1 ENGINE</span></div>
    <p class="font-bold text-white text-lg">Framework Pemecahan Masalah Universal</p>
    <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
      <p class="text-blue-400 text-xs font-bold mb-2">ANALYSIS</p>
      <p class="text-gray-300 text-sm">Setiap masalah bisa dipecahkan dengan pendekatan terstruktur:</p>
    </div>
    <div class="space-y-3">
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span><div><p class="font-bold text-white text-sm">Define</p><p class="text-gray-400 text-xs mt-1">Tulis masalahmu dalam 1 kalimat jelas. Masalah yang jelas = solusi yang jelas.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span><div><p class="font-bold text-white text-sm">Decompose</p><p class="text-gray-400 text-xs mt-1">Pecah masalah besar jadi langkah kecil. Setiap langkah actionable dan bisa diselesaikan 1-3 hari.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span><div><p class="font-bold text-white text-sm">Execute</p><p class="text-gray-400 text-xs mt-1">Ambil 1 langkah PERTAMA hari ini. Momentum datang dari aksi.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span><div><p class="font-bold text-white text-sm">Iterate</p><p class="text-gray-400 text-xs mt-1">Review setiap minggu. Done is better than perfect.</p></div></div>
    </div>
    <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
      <p class="text-amber-400 text-xs font-bold">PRO TIP</p>
      <p class="text-gray-300 text-sm mt-1">Coba ceritakan lebih spesifik: <strong class="text-white">bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, pendidikan, kesehatan, konten, leadership, tujuan hidup, networking</strong> — 14 kategori siap bantu!</p>
    </div>
  </div>`
}

function generateSWOT(business: string): string {
  const b = business.substring(0, 60)
  return `<div class="space-y-4">
    <p class="font-bold text-white text-lg">SWOT Analysis: ${b}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4"><p class="font-bold text-emerald-400 text-sm mb-3">Strengths</p><ul class="text-gray-300 text-xs space-y-1.5"><li>Passion & dedikasi tinggi</li><li>Kemampuan teknis berkembang</li><li>Low overhead cost</li><li>Fleksibilitas waktu & lokasi</li><li>Akses tools AI & digital</li></ul></div>
      <div class="bg-red-500/5 border border-red-500/10 rounded-xl p-4"><p class="font-bold text-red-400 text-sm mb-3">Weaknesses</p><ul class="text-gray-300 text-xs space-y-1.5"><li>Modal awal terbatas</li><li>Belum ada track record kuat</li><li>Network bisnis kecil</li><li>Time management perlu ditingkatkan</li><li>Kurang pengalaman marketing</li></ul></div>
      <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="font-bold text-blue-400 text-sm mb-3">Opportunities</p><ul class="text-gray-300 text-xs space-y-1.5"><li>Pasar digital tumbuh 30%/tahun</li><li>Remote work trend global</li><li>AI menciptakan niche baru</li><li>UMKM butuh solusi digital</li><li>Push ekonomi digital</li></ul></div>
      <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4"><p class="font-bold text-amber-400 text-sm mb-3">Threats</p><ul class="text-gray-300 text-xs space-y-1.5"><li>Kompetisi freelancer global</li><li>Perubahan teknologi cepat</li><li>Ketidakpastian ekonomi</li><li>Client acquisition challenging</li><li>AI replacing low-skill tasks</li></ul></div>
    </div>
    <div class="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl p-4">
      <p class="text-indigo-400 text-xs font-bold">STRATEGIC RECOMMENDATION</p>
      <p class="text-gray-300 text-sm mt-1">Leverage strengths (passion + skill) untuk capture opportunities (pasar digital). Mitigate weaknesses dengan networking. Counter threats dengan continuous learning.</p>
    </div>
  </div>`
}

function generateMindMap(topic: string): string {
  return `<div class="space-y-4">
    <p class="font-bold text-white text-lg">Mind Map: ${topic.substring(0, 40)}</p>
    <div class="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-6">
      <div class="text-center mb-5"><span class="inline-block bg-indigo-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-500/20">${topic.substring(0, 30)}</span></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-indigo-400 text-xs mb-2">Planning</p><ul class="text-gray-400 text-xs space-y-1"><li>Define goals</li><li>Research market</li><li>Set timeline</li></ul></div>
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-emerald-400 text-xs mb-2">Execution</p><ul class="text-gray-400 text-xs space-y-1"><li>Build MVP</li><li>Test & iterate</li><li>Launch</li></ul></div>
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-amber-400 text-xs mb-2">Growth</p><ul class="text-gray-400 text-xs space-y-1"><li>Marketing</li><li>Scale ops</li><li>Hire team</li></ul></div>
        <div class="bg-white/[0.03] border border-white/5 rounded-lg p-3"><p class="font-bold text-rose-400 text-xs mb-2">Optimize</p><ul class="text-gray-400 text-xs space-y-1"><li>Review metrics</li><li>Cut waste</li><li>Double down</li></ul></div>
      </div>
    </div>
  </div>`
}

function generateCoachResponse(goal: string, currentState: string, obstacles: string): string {
  return `<div class="space-y-4">
    <div class="flex items-center gap-2"><span class="px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 rounded-lg text-xs font-bold border border-amber-500/20">AI COACH V3.1</span></div>
    <p class="font-bold text-white text-lg">Personal Coaching Session</p>
    <div class="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
      <p class="text-amber-400 text-xs font-bold mb-2">YOUR GOAL</p>
      <p class="text-gray-300 text-sm">${goal ? goal.substring(0, 200) : 'Belum ditentukan — mari definisikan!'}</p>
    </div>
    ${currentState ? `<div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"><p class="text-blue-400 text-xs font-bold mb-2">CURRENT STATE</p><p class="text-gray-300 text-sm">${currentState.substring(0, 200)}</p></div>` : ''}
    ${obstacles ? `<div class="bg-red-500/5 border border-red-500/10 rounded-xl p-4"><p class="text-red-400 text-xs font-bold mb-2">BLOCKERS</p><p class="text-gray-300 text-sm">${obstacles.substring(0, 200)}</p></div>` : ''}
    <div class="space-y-3">
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-2xl">1.</span><div><p class="font-bold text-white text-sm">Clarity First</p><p class="text-gray-400 text-xs mt-1">Apa outcome spesifik? Bukan "sukses" — tapi "punya 50 klien dalam 3 bulan". Specificity is power.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-2xl">2.</span><div><p class="font-bold text-white text-sm">Identify Bottleneck</p><p class="text-gray-400 text-xs mt-1">Apa 1 hal yang paling menghalangimu SEKARANG? Pecahkan itu, sisanya mengikuti.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-2xl">3.</span><div><p class="font-bold text-white text-sm">Micro-Action TODAY</p><p class="text-gray-400 text-xs mt-1">Apa 1 langkah kecil yang bisa kamu ambil HARI INI? Momentum dimulai dari sini.</p></div></div>
      <div class="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4"><span class="text-2xl">4.</span><div><p class="font-bold text-white text-sm">Accountability System</p><p class="text-gray-400 text-xs mt-1">Share goalmu ke 1 orang yang kamu percaya. Accountability meningkatkan success rate 65%.</p></div></div>
    </div>
    <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
      <p class="text-amber-400 text-xs font-bold">COACHING PRINCIPLE</p>
      <p class="text-gray-300 text-sm mt-1">"You are the architect of your own reality. Every decision is a brick in the building of your future."</p>
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
  { id:16, title:'Ikigai Framework', category:'Purpose', description:'Temukan tujuan hidup', icon:'🌸' },
  { id:17, title:'Public Speaking 101', category:'Networking', description:'Bicara di depan umum', icon:'🎤' },
]

const INSIGHTS_DATA = [
  { icon:'💡', title:'Revenue First', desc:'Hari ini fokuskan 2 jam untuk aktivitas yang langsung menghasilkan uang.', time:'Hari ini', type:'action' },
  { icon:'📊', title:'Goal Progress', desc:'Cek progress goal kamu hari ini. Apakah on track?', time:'2 jam lalu', type:'progress' },
  { icon:'🔥', title:'Streak Alert', desc:'Jangan putus streak habit kamu! Consistency beats intensity.', time:'5 jam lalu', type:'motivation' },
  { icon:'💰', title:'Financial Tip', desc:'Sudah sisihkan 20% income bulan ini? Bayar dirimu dulu.', time:'Kemarin', type:'tip' },
  { icon:'🎯', title:'Weekly Review', desc:'Luangkan 30 menit hari ini untuk evaluasi minggu ini.', time:'2 hari lalu', type:'review' },
  { icon:'🧠', title:'Sovereign Insight', desc:'"Seorang Arsitek tidak meratapi pintu tertutup — dia membangun gedung lebih megah."', time:'3 hari lalu', type:'motivation' },
  { icon:'🌟', title:'Vision Reminder', desc:'Cek Vision Board kamu. Apakah aktivitas hari ini mendekatkanmu ke visi itu?', time:'4 hari lalu', type:'action' },
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
  { text: 'Your network is your net worth.', author: 'Porter Gale' },
  { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
]

// ============================================
// LANDING PAGE HTML — SparkMind V3.1.1
// ============================================
const LANDING_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V3.1 — AI Strategic Guide Platform</title>
  <meta name="description" content="Platform AI yang menganalisis tantanganmu dan memberikan action plan strategis. 14+ kategori analisis. Dashboard analytics, Vision Board, Pomodoro Timer & lebih.">
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
    *{font-family:'Inter',sans-serif;margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}body{background:#0a0a1a;color:#e2e8f0}
    .gradient-text{background:linear-gradient(135deg,#818cf8,#f472b6,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.06)}
    .glass-light{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08)}
    .card-hover{transition:all .5s cubic-bezier(.4,0,.2,1)}.card-hover:hover{transform:translateY(-8px);box-shadow:0 30px 80px rgba(99,102,241,0.12)}
    .neon-glow{box-shadow:0 0 40px rgba(99,102,241,0.15),0 0 80px rgba(99,102,241,0.05)}
    .neon-border{border:1px solid rgba(99,102,241,0.2);box-shadow:inset 0 0 30px rgba(99,102,241,0.03)}
    .float-1{animation:f1 8s ease-in-out infinite}.float-2{animation:f2 6s ease-in-out infinite}.float-3{animation:f3 10s ease-in-out infinite}
    @keyframes f1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(1deg)}}
    @keyframes f2{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes f3{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)}}
    .orb{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none;opacity:0.4}
    .pulse-ring{animation:pulsering 3s cubic-bezier(.4,0,.6,1) infinite}
    @keyframes pulsering{0%{transform:scale(.95);opacity:1}70%{transform:scale(1.3);opacity:0}100%{transform:scale(.95);opacity:0}}
    .counter{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.4,0,.2,1)}.counter.visible{opacity:1;transform:translateY(0)}
    .fade-up{opacity:0;transform:translateY(40px);transition:all .8s cubic-bezier(.4,0,.2,1)}.fade-up.visible{opacity:1;transform:translateY(0)}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0a0a1a}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:10px}
    .btn-primary{background:linear-gradient(135deg,#4f46e5,#6366f1);transition:all .3s}.btn-primary:hover{background:linear-gradient(135deg,#4338ca,#4f46e5);transform:translateY(-2px);box-shadow:0 20px 40px rgba(99,102,241,0.3)}
    .btn-secondary{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);transition:all .3s}.btn-secondary:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2)}
    .feature-icon{transition:all .5s}.group:hover .feature-icon{transform:scale(1.15) rotate(-5deg)}
  </style>
</head>
<body>
  <nav class="fixed top-0 w-full z-50 bg-surface-900/80 backdrop-blur-2xl border-b border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 rotate-3"><i class="fas fa-brain text-white text-sm"></i></div>
          <span class="text-white font-black text-xl tracking-tight">Spark<span class="text-neon-amber">Mind</span><sup class="text-[10px] text-brand-300 font-medium ml-0.5">V3.1</sup></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-gray-400 hover:text-white transition text-sm font-medium">Fitur</a>
          <a href="#how" class="text-gray-400 hover:text-white transition text-sm font-medium">Cara Kerja</a>
          <a href="#pricing" class="text-gray-400 hover:text-white transition text-sm font-medium">Harga</a>
          <a href="#testimonials" class="text-gray-400 hover:text-white transition text-sm font-medium">Testimoni</a>
          <a href="/app" class="btn-primary text-white px-6 py-2.5 rounded-full text-sm font-bold">Mulai Gratis</a>
        </div>
        <button id="mob-btn" class="md:hidden text-white p-2"><i class="fas fa-bars text-lg"></i></button>
      </div>
    </div>
    <div id="mob-nav" class="hidden md:hidden bg-surface-900/98 backdrop-blur-2xl border-t border-white/[0.04] pb-4">
      <div class="px-4 space-y-2 pt-3">
        <a href="#features" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition">Fitur</a>
        <a href="#how" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition">Cara Kerja</a>
        <a href="#pricing" class="block text-gray-300 hover:text-white text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition">Harga</a>
        <a href="/app" class="block btn-primary text-white px-5 py-3 rounded-xl text-sm font-bold text-center mt-3">Mulai Gratis</a>
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
            <span class="text-gray-300 text-xs font-medium">V3.1.1 Engine | 14+ Categories | Dashboard Analytics | Vision Board</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08] mb-6 tracking-tight">
            Ubah Masalahmu<br>Jadi <span class="gradient-text">Strategi Sukses</span>
          </h1>
          <p class="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            Platform AI yang menganalisis tantanganmu dan memberikan <strong class="text-white">action plan strategis</strong>. Bisnis, karir, skill, keuangan, kesehatan — <span class="text-brand-400">14+ kategori analisis</span> + Dashboard Analytics.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="/app" class="btn-primary text-white px-8 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 text-base"><i class="fas fa-rocket"></i><span>Mulai Gratis Sekarang</span></a>
            <a href="#features" class="btn-secondary text-white px-8 py-4 rounded-full font-semibold text-center flex items-center justify-center gap-2"><i class="fas fa-play-circle"></i><span>Lihat Fitur</span></a>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex -space-x-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">H</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-amber to-orange-500 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">R</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-emerald-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">D</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-rose-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">A</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-violet-600 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">+</div>
            </div>
            <div><p class="text-white font-bold text-sm">15,000+ Users Aktif</p><p class="text-gray-500 text-xs">Sudah bergabung & bertumbuh bersama</p></div>
          </div>
        </div>
        <div class="hidden lg:block relative">
          <div class="glass rounded-3xl p-6 float-1 neon-glow">
            <div class="flex items-center gap-2 mb-5">
              <div class="w-3 h-3 rounded-full bg-red-400"></div><div class="w-3 h-3 rounded-full bg-neon-amber"></div><div class="w-3 h-3 rounded-full bg-neon-green"></div>
              <span class="text-gray-500 text-xs ml-3 font-medium">SparkMind V3.1 — Dashboard</span>
            </div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-2">
                <div class="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 text-center"><p class="text-brand-300 text-[10px] font-bold">Goals</p><p class="text-white text-xl font-black">12</p></div>
                <div class="bg-neon-green/10 border border-neon-green/20 rounded-xl p-3 text-center"><p class="text-neon-green text-[10px] font-bold">Habits</p><p class="text-white text-xl font-black">8</p></div>
                <div class="bg-neon-amber/10 border border-neon-amber/20 rounded-xl p-3 text-center"><p class="text-neon-amber text-[10px] font-bold">Focus</p><p class="text-white text-xl font-black">4.5h</p></div>
              </div>
              <div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                <div class="flex items-center justify-between mb-2"><p class="text-white text-xs font-bold">Weekly Progress</p><p class="text-neon-green text-xs font-bold">78%</p></div>
                <div class="w-full bg-white/5 rounded-full h-2"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-2 rounded-full" style="width:78%"></div></div>
              </div>
              <div class="bg-neon-green/5 border border-neon-green/10 rounded-xl p-3">
                <p class="text-neon-green text-xs font-bold mb-1">AI Insight</p>
                <p class="text-gray-300 text-xs">"Focus bisnis hari ini 2 jam. Revenue target Rp 5jt on track!"</p>
              </div>
            </div>
          </div>
          <div class="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 float-2"><div class="flex items-center gap-2"><span class="text-lg">📊</span><div><p class="text-white text-xs font-bold">Dashboard</p><p class="text-gray-500 text-[10px]">Analytics live</p></div></div></div>
          <div class="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 float-3"><div class="flex items-center gap-2"><span class="text-lg">🎯</span><div><p class="text-white text-xs font-bold">Vision Board</p><p class="text-gray-500 text-[10px]">Visualize goals</p></div></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="py-16 border-y border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center counter"><p class="text-4xl font-black text-white" data-target="15000">0</p><p class="text-gray-500 text-sm mt-1">Active Users</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-white" data-target="75000">0</p><p class="text-gray-500 text-sm mt-1">Strategi Dibuat</p></div>
        <div class="text-center counter"><p class="text-4xl font-black gradient-text">14+</p><p class="text-gray-500 text-sm mt-1">AI Categories</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-white">24/7</p><p class="text-gray-500 text-sm mt-1">AI Available</p></div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16 fade-up">
        <span class="inline-block glass-light text-brand-300 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase mb-4">Fitur V3.1.1 — Ultimate Upgrade</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">Premium Tools untuk <span class="gradient-text">Growth Maker</span></h2>
        <p class="text-gray-400 max-w-2xl mx-auto">Dashboard Analytics, Vision Board, Onboarding, 14+ AI Categories, Smart Search, Export Data & lebih.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-brand-500/20"><i class="fas fa-brain text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">AI Sovereign Engine V3.1</h3><p class="text-gray-400 text-sm">14+ kategori: bisnis, karir, skill, finansial, mental health, hubungan, pendidikan, kesehatan, konten, leadership, tujuan hidup, networking.</p><span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-cyan-500/20"><i class="fas fa-chart-line text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Dashboard Analytics</h3><p class="text-gray-400 text-sm">Overview semua progress di 1 tempat. Goals completion, habit streaks, Pomodoro sessions, weekly trends — semuanya.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V3.1</span></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-pink to-rose-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-pink-500/20"><i class="fas fa-images text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Vision Board</h3><p class="text-gray-400 text-sm">Visualisasi goal & dream board. Tulis visimu, lihat setiap hari, stay motivated. Proven meningkatkan achievement 42%.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V3.1</span></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-green to-emerald-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-emerald-500/20"><i class="fas fa-chart-pie text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">SWOT Analyzer</h3><p class="text-gray-400 text-sm">Generate analisis SWOT instan. Strengths, Weaknesses, Opportunities, Threats — dalam 1 klik.</p></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-amber to-orange-500 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-amber-500/20"><i class="fas fa-stopwatch text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Pomodoro Timer Pro</h3><p class="text-gray-400 text-sm">Deep work mode dengan sound notifications, auto mode switch, dan session analytics. 25/5/15 timer.</p><span class="inline-block mt-3 text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-lg font-bold border border-brand-500/20">UPGRADED</span></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-amber-500/20"><i class="fas fa-user-tie text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">AI Coach Mode</h3><p class="text-gray-400 text-sm">Personal coaching. Definisikan goal, identifikasi blocker, dapatkan action plan + accountability.</p></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-neon-purple to-violet-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-purple-500/20"><i class="fas fa-bullseye text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Goal Tracker Pro</h3><p class="text-gray-400 text-sm">Goals, milestone, progress bar, deadline. Data tersimpan permanent di localStorage.</p></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-rose-500/20"><i class="fas fa-fire text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Habit Tracker</h3><p class="text-gray-400 text-sm">Build habits konsisten. Streak counter, daily check-in, dan statistik. Semua tersimpan.</p></div>
        <div class="glass-light rounded-2xl p-7 card-hover group neon-border"><div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 feature-icon shadow-lg shadow-blue-500/20"><i class="fas fa-file-export text-white text-xl"></i></div><h3 class="text-lg font-bold text-white mb-2">Export & Search</h3><p class="text-gray-400 text-sm">Export goals/habits ke text. Search & filter resources. Data kamu, control kamu.</p><span class="inline-block mt-3 text-xs bg-neon-green/20 text-neon-green px-2.5 py-1 rounded-lg font-bold border border-neon-green/20">NEW V3.1</span></div>
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
        <div class="text-center fade-up"><div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">1</span></div><h3 class="text-xl font-bold text-white mb-3">Ceritakan Masalahmu</h3><p class="text-gray-400 text-sm">Tulis dalam bahasa sehari-hari. AI V3.1 paham 14+ kategori.</p></div>
        <div class="text-center fade-up"><div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-2 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">2</span></div><h3 class="text-xl font-bold text-white mb-3">AI V3.1 Menganalisis</h3><p class="text-gray-400 text-sm">Sovereign Engine memproses, identifikasi pola, rancang strategi.</p></div>
        <div class="text-center fade-up"><div class="w-20 h-20 glass neon-glow rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-1 hover:rotate-0 transition-all duration-500"><span class="text-white text-3xl font-black">3</span></div><h3 class="text-xl font-bold text-white mb-3">Track & Tumbuh</h3><p class="text-gray-400 text-sm">Dashboard analytics, goal tracker, habit tracker — semua dalam 1 platform.</p></div>
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
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Dashboard Analytics</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Goal Tracker (3 goals)</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Pomodoro Timer</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Vision Board</span></li>
          </ul>
          <a href="/app" class="block w-full text-center btn-secondary text-white py-3.5 rounded-full font-bold">Mulai Gratis</a>
        </div>
        <div class="relative bg-gradient-to-b from-brand-600/20 to-brand-800/20 border-2 border-brand-500/30 rounded-3xl p-8 scale-105 shadow-2xl shadow-brand-500/10">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-amber to-orange-500 text-surface-900 px-4 py-1 rounded-full text-xs font-black tracking-wide">PALING POPULER</div>
          <div class="mb-6"><h3 class="text-lg font-bold text-white">Pro</h3><p class="text-brand-200 text-sm mt-1">Untuk yang serius bertumbuh</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-white">Rp 79K</span><span class="text-brand-200 text-sm ml-1">/bulan</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Unlimited AI Analysis</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>SWOT + AI Coach</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Unlimited Goals + Habits</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Weekly Review + Export</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Full Resource Library</span></li>
            <li class="flex items-center gap-2.5 text-sm text-white"><i class="fas fa-check text-neon-amber text-xs"></i><span>Priority Support</span></li>
          </ul>
          <a href="/app" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-700 py-3.5 rounded-full font-black transition">Upgrade ke Pro</a>
        </div>
        <div class="glass-light rounded-3xl p-8 card-hover neon-border">
          <div class="mb-6"><h3 class="text-lg font-bold text-white">Enterprise</h3><p class="text-gray-400 text-sm mt-1">Untuk tim & organisasi</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-white">Custom</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Semua fitur Pro</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Team Collaboration</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Custom AI Training</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>API Access</span></li>
            <li class="flex items-center gap-2.5 text-sm text-gray-300"><i class="fas fa-check text-neon-green text-xs"></i><span>Dedicated Manager</span></li>
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
        <div class="glass-light rounded-2xl p-8 card-hover neon-border"><div class="flex items-center gap-1 mb-4"><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i></div><p class="text-gray-300 text-sm mb-6 italic leading-relaxed">"Dashboard Analytics-nya game changer! Bisa lihat semua progress dalam 1 tempat. Revenue naik 3x setelah pakai SparkMind."</p><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center"><span class="font-bold text-white text-sm">R</span></div><div><p class="font-bold text-white text-sm">Rina S.</p><p class="text-gray-500 text-xs">Freelance Designer</p></div></div></div>
        <div class="glass-light rounded-2xl p-8 card-hover neon-border"><div class="flex items-center gap-1 mb-4"><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i></div><p class="text-gray-300 text-sm mb-6 italic leading-relaxed">"V3.1 AI Engine-nya next level. 14+ kategori, dari bisnis sampai tujuan hidup. Vision Board bikin fokus tiap hari!"</p><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-neon-green to-emerald-600 rounded-full flex items-center justify-center"><span class="font-bold text-white text-sm">D</span></div><div><p class="font-bold text-white text-sm">Dimas P.</p><p class="text-gray-500 text-xs">Software Engineer</p></div></div></div>
        <div class="glass-light rounded-2xl p-8 card-hover neon-border"><div class="flex items-center gap-1 mb-4"><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i><i class="fas fa-star text-neon-amber text-sm"></i></div><p class="text-gray-300 text-sm mb-6 italic leading-relaxed">"Pomodoro Timer + Habit Tracker + Export data = produktivitas naik 3x. Udah punya 15 klien dalam 2 bulan!"</p><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-neon-pink to-rose-600 rounded-full flex items-center justify-center"><span class="font-bold text-white text-sm">A</span></div><div><p class="font-bold text-white text-sm">Anita W.</p><p class="text-gray-500 text-xs">Entrepreneur</p></div></div></div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 relative overflow-hidden">
    <div class="orb w-[500px] h-[500px] bg-brand-500 top-0 left-1/4 opacity-20"></div>
    <div class="orb w-[400px] h-[400px] bg-neon-pink bottom-0 right-1/4 opacity-20"></div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl sm:text-5xl font-black text-white mb-6">Siap Mengubah Hidupmu?</h2>
      <p class="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join 15,000+ orang yang sudah menemukan kejelasan strategis. 100% gratis untuk mulai.</p>
      <a href="/app" class="inline-flex items-center gap-2 bg-gradient-to-r from-neon-amber to-orange-500 hover:from-orange-500 hover:to-neon-amber text-surface-900 px-12 py-5 rounded-full font-black text-lg transition shadow-2xl shadow-neon-amber/30"><i class="fas fa-bolt"></i><span>Mulai Sekarang — Gratis!</span></a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="text-gray-400 py-16 border-t border-white/[0.04]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-10">
        <div><div class="flex items-center gap-2 mb-4"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div><span class="text-white font-black text-lg">Spark<span class="text-neon-amber">Mind</span><sup class="text-[10px] text-brand-300 ml-0.5">V3.1</sup></span></div><p class="text-sm leading-relaxed">AI-powered strategic guide. 14+ kategori analisis + Dashboard Analytics + Vision Board.</p></div>
        <div><h4 class="text-white font-bold mb-4 text-sm">AI Tools</h4><ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">AI Analyzer V3.1</a></li><li><a href="/app" class="hover:text-white transition">SWOT Analyzer</a></li><li><a href="/app" class="hover:text-white transition">AI Coach</a></li><li><a href="/app" class="hover:text-white transition">Pomodoro Timer</a></li></ul></div>
        <div><h4 class="text-white font-bold mb-4 text-sm">Productivity</h4><ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">Dashboard</a></li><li><a href="/app" class="hover:text-white transition">Vision Board</a></li><li><a href="/app" class="hover:text-white transition">Goal Tracker</a></li><li><a href="/app" class="hover:text-white transition">Habit Tracker</a></li></ul></div>
        <div><h4 class="text-white font-bold mb-4 text-sm">Connect</h4><div class="flex gap-3"><a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-instagram text-white"></i></a><a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-twitter text-white"></i></a><a href="https://github.com/ganihypha/Sparkmind" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 transition"><i class="fab fa-github text-white"></i></a></div></div>
      </div>
      <div class="border-t border-white/[0.04] mt-12 pt-8 text-center text-sm"><p>&copy; 2026 SparkMind V3.1.1. Built with power by Haidar. All rights reserved.</p></div>
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
// APP DASHBOARD HTML — SparkMind V3.1.1 (with Dashboard Analytics, Vision Board, Onboarding, Search, Export)
// ============================================
const APP_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V3.1.1 — Dashboard</title>
  <meta name="theme-color" content="#0a0a1a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>tailwind.config={theme:{extend:{colors:{brand:{50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81'},neon:{blue:'#60a5fa',purple:'#a78bfa',pink:'#f472b6',green:'#34d399',amber:'#fbbf24'},surface:{50:'#f8fafc',100:'#f1f5f9',800:'#12122a',900:'#0a0a1a',950:'#06060f'}}}}}</script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif;box-sizing:border-box}body{background:#0a0a1a;color:#e2e8f0;margin:0}
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
    .onboard-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:100;display:flex;align-items:center;justify-content:center}
    .stat-card{transition:all .3s}.stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(99,102,241,0.1)}
  </style>
</head>
<body class="h-screen flex overflow-hidden">
  <!-- ONBOARDING OVERLAY -->
  <div id="onboarding" class="onboard-overlay hidden">
    <div class="max-w-lg w-full mx-4 glass rounded-3xl p-8 text-center">
      <div class="w-20 h-20 bg-gradient-to-br from-brand-500 to-neon-pink rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20"><i class="fas fa-brain text-white text-3xl"></i></div>
      <h2 class="text-2xl font-black text-white mb-2">Selamat Datang di SparkMind V3.1</h2>
      <p class="text-gray-400 text-sm mb-6">Platform AI strategic guide dengan 14+ kategori analisis. Mulai dengan menceritakan masalahmu!</p>
      <div class="space-y-3 text-left mb-6">
        <div class="flex items-center gap-3 glass rounded-xl p-3"><i class="fas fa-chart-line text-brand-400 w-6 text-center"></i><div><p class="text-white text-sm font-bold">Dashboard Analytics</p><p class="text-gray-500 text-xs">Lihat semua progress dalam 1 tempat</p></div></div>
        <div class="flex items-center gap-3 glass rounded-xl p-3"><i class="fas fa-images text-neon-pink w-6 text-center"></i><div><p class="text-white text-sm font-bold">Vision Board</p><p class="text-gray-500 text-xs">Visualisasi dream & goals kamu</p></div></div>
        <div class="flex items-center gap-3 glass rounded-xl p-3"><i class="fas fa-brain text-neon-green w-6 text-center"></i><div><p class="text-white text-sm font-bold">AI Engine V3.1</p><p class="text-gray-500 text-xs">14+ kategori: bisnis, karir, kesehatan, dll</p></div></div>
      </div>
      <input id="onboard-name" type="text" placeholder="Masukkan nama kamu..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 mb-4 text-center">
      <button onclick="completeOnboarding()" class="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-brand-500/20">Mulai SparkMind</button>
    </div>
  </div>

  <!-- SIDEBAR -->
  <aside id="sidebar" class="w-64 bg-surface-950 border-r border-white/[0.04] flex-shrink-0 flex flex-col hidden md:flex">
    <div class="p-5 border-b border-white/[0.04]"><a href="/" class="flex items-center gap-2.5"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-neon-pink rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div><span class="font-black text-lg text-white">Spark<span class="text-neon-amber">Mind</span><sup class="text-[9px] text-brand-300 ml-0.5">V3.1</sup></span></a></div>
    <nav class="flex-1 py-4 overflow-auto">
      <div class="px-6 mb-3"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Overview</p></div>
      <a href="#" onclick="switchTab('dashboard')" class="sidebar-link active flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="dashboard"><i class="fas fa-chart-line w-5 text-center"></i><span>Dashboard</span><span class="ml-auto text-[9px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">AI Tools</p></div>
      <a href="#" onclick="switchTab('analyzer')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="analyzer"><i class="fas fa-brain w-5 text-center"></i><span>AI Analyzer</span></a>
      <a href="#" onclick="switchTab('swot')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="swot"><i class="fas fa-chart-pie w-5 text-center"></i><span>SWOT</span></a>
      <a href="#" onclick="switchTab('coach')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="coach"><i class="fas fa-user-tie w-5 text-center"></i><span>AI Coach</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Productivity</p></div>
      <a href="#" onclick="switchTab('pomodoro')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="pomodoro"><i class="fas fa-stopwatch w-5 text-center"></i><span>Pomodoro</span></a>
      <a href="#" onclick="switchTab('goals')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="goals"><i class="fas fa-bullseye w-5 text-center"></i><span>Goals</span></a>
      <a href="#" onclick="switchTab('habits')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="habits"><i class="fas fa-fire w-5 text-center"></i><span>Habits</span></a>
      <div class="px-6 mb-3 mt-5"><p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Insights</p></div>
      <a href="#" onclick="switchTab('vision')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="vision"><i class="fas fa-images w-5 text-center"></i><span>Vision Board</span><span class="ml-auto text-[9px] bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <a href="#" onclick="switchTab('review')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="review"><i class="fas fa-calendar-check w-5 text-center"></i><span>Weekly Review</span></a>
      <a href="#" onclick="switchTab('resources')" class="sidebar-link flex items-center gap-3 px-6 py-2.5 text-sm text-gray-400 transition" data-tab="resources"><i class="fas fa-book-open w-5 text-center"></i><span>Resources</span></a>
    </nav>
    <div class="p-4 border-t border-white/[0.04]">
      <div class="glass rounded-2xl p-4">
        <p class="text-sm font-bold text-white mb-1">Free Plan</p>
        <p class="text-xs text-gray-400 mb-3">5/5 analyses tersisa</p>
        <div class="w-full bg-white/10 rounded-full h-1.5 mb-3"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-1.5 rounded-full" style="width:100%"></div></div>
        <button class="w-full btn-primary text-white text-xs py-2.5 rounded-xl font-bold">Upgrade ke Pro</button>
      </div>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <header class="bg-surface-950/80 backdrop-blur-xl border-b border-white/[0.04] px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-4">
        <button id="sb-toggle" class="md:hidden text-gray-400 hover:text-white transition"><i class="fas fa-bars text-lg"></i></button>
        <h1 id="page-title" class="text-base font-bold text-white">Dashboard</h1>
        <span class="hidden sm:inline-block text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-lg font-bold border border-brand-500/20">V3.1.1</span>
      </div>
      <div class="flex items-center gap-3">
        <div id="quote-ticker" class="hidden sm:block max-w-xs text-xs text-gray-500 italic truncate"></div>
        <button onclick="exportData()" title="Export Data" class="text-gray-500 hover:text-white transition"><i class="fas fa-file-export"></i></button>
        <button class="relative text-gray-500 hover:text-white transition"><i class="fas fa-bell"></i><span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">3</span></button>
        <div id="user-avatar" class="w-8 h-8 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center cursor-pointer" title="User"><span class="text-white text-xs font-bold" id="user-initial">H</span></div>
      </div>
    </header>

    <div class="flex-1 overflow-auto">
      <!-- DASHBOARD TAB -->
      <div id="tab-dashboard" class="tab-content p-6">
        <div class="max-w-6xl mx-auto">
          <div class="mb-8"><h2 class="text-2xl font-black text-white mb-1">Selamat datang, <span id="dash-name" class="gradient-text">User</span>!</h2><p class="text-gray-400 text-sm">Overview progress dan analytics kamu.</p></div>
          <!-- Stats Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="glass rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center"><i class="fas fa-bullseye text-brand-400"></i></div><span class="text-gray-500 text-xs font-bold">GOALS</span></div><p id="dash-goals" class="text-3xl font-black text-white">0</p><p class="text-gray-500 text-xs mt-1">active goals</p></div>
            <div class="glass rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-neon-green/20 rounded-xl flex items-center justify-center"><i class="fas fa-fire text-neon-green"></i></div><span class="text-gray-500 text-xs font-bold">HABITS</span></div><p id="dash-habits" class="text-3xl font-black text-white">0</p><p class="text-gray-500 text-xs mt-1">active habits</p></div>
            <div class="glass rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-neon-amber/20 rounded-xl flex items-center justify-center"><i class="fas fa-stopwatch text-neon-amber"></i></div><span class="text-gray-500 text-xs font-bold">FOCUS</span></div><p id="dash-focus" class="text-3xl font-black text-white">0m</p><p class="text-gray-500 text-xs mt-1">today</p></div>
            <div class="glass rounded-2xl p-5 stat-card"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-neon-pink/20 rounded-xl flex items-center justify-center"><i class="fas fa-fire-flame-curved text-neon-pink"></i></div><span class="text-gray-500 text-xs font-bold">STREAK</span></div><p id="dash-streak" class="text-3xl font-black text-white">0</p><p class="text-gray-500 text-xs mt-1">best streak</p></div>
          </div>
          <!-- Progress Overview -->
          <div class="grid lg:grid-cols-2 gap-6 mb-8">
            <div class="glass rounded-2xl p-6">
              <h3 class="font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-bullseye text-brand-400"></i> Goal Progress</h3>
              <div id="dash-goal-list" class="space-y-3"></div>
            </div>
            <div class="glass rounded-2xl p-6">
              <h3 class="font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-fire text-neon-pink"></i> Today's Habits</h3>
              <div id="dash-habit-list" class="space-y-3"></div>
            </div>
          </div>
          <!-- Quick Actions -->
          <div class="glass rounded-2xl p-6">
            <h3 class="font-bold text-white mb-4">Quick Actions</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button onclick="switchTab('analyzer')" class="glass rounded-xl p-4 text-center hover:bg-brand-500/10 transition"><i class="fas fa-brain text-brand-400 text-xl mb-2"></i><p class="text-white text-xs font-bold">AI Analyzer</p></button>
              <button onclick="switchTab('pomodoro')" class="glass rounded-xl p-4 text-center hover:bg-neon-amber/10 transition"><i class="fas fa-stopwatch text-neon-amber text-xl mb-2"></i><p class="text-white text-xs font-bold">Pomodoro</p></button>
              <button onclick="switchTab('vision')" class="glass rounded-xl p-4 text-center hover:bg-neon-pink/10 transition"><i class="fas fa-images text-neon-pink text-xl mb-2"></i><p class="text-white text-xs font-bold">Vision Board</p></button>
              <button onclick="switchTab('coach')" class="glass rounded-xl p-4 text-center hover:bg-neon-green/10 transition"><i class="fas fa-user-tie text-neon-green text-xl mb-2"></i><p class="text-white text-xs font-bold">AI Coach</p></button>
            </div>
          </div>
        </div>
      </div>

      <!-- ANALYZER TAB -->
      <div id="tab-analyzer" class="tab-content hidden h-full flex flex-col">
        <div id="chat-msgs" class="flex-1 overflow-auto p-6 space-y-4">
          <div class="msg-in flex gap-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-neon-pink rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="glass rounded-2xl rounded-tl-sm p-5 max-w-2xl"><p class="text-gray-200 text-sm leading-relaxed">Halo! Aku <strong class="text-white">SparkMind AI V3.1</strong><br><br>Sovereign Engine V3.1 — <strong class="text-brand-300">14+ kategori</strong> analisis.<br><br><strong class="text-white">Coba tanyakan:</strong></p><div class="mt-3 space-y-2"><button onclick="useEx('Aku mau mulai bisnis online dari HP, modal minim')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Aku mau mulai bisnis online, modal minim"</button><button onclick="useEx('Gimana cara jadi lebih produktif dan stop procrastinate?')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Gimana cara jadi lebih produktif?"</button><button onclick="useEx('Aku mau temukan tujuan hidup dan ikigai ku')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Aku mau temukan tujuan hidup"</button><button onclick="useEx('Aku merasa burnout dan butuh strategi recovery')" class="block w-full text-left bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-sm px-4 py-2.5 rounded-xl transition font-medium border border-brand-500/10">"Aku merasa burnout"</button></div></div></div>
        </div>
        <div class="border-t border-white/[0.04] bg-surface-950/80 backdrop-blur-xl p-4"><div class="max-w-3xl mx-auto"><div class="flex items-end gap-3"><div class="flex-1 glass rounded-2xl px-4 py-3 focus-within:border-brand-500/30 transition"><textarea id="user-input" rows="1" placeholder="Ceritakan masalah atau goal kamu..." class="w-full bg-transparent text-sm text-white placeholder-gray-500 resize-none max-h-32" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea></div><button onclick="sendMsg()" class="btn-primary text-white w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-paper-plane text-sm"></i></button></div><p class="text-center text-[10px] text-gray-600 mt-2">SparkMind V3.1.1 — 14+ Categories</p></div></div>
      </div>

      <!-- SWOT TAB -->
      <div id="tab-swot" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-neon-green to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20"><i class="fas fa-chart-pie text-white text-2xl"></i></div><h2 class="text-2xl font-black text-white">SWOT Analyzer</h2><p class="text-gray-400 text-sm mt-1">Analisis Strengths, Weaknesses, Opportunities & Threats</p></div><div class="glass rounded-2xl p-6"><textarea id="swot-input" rows="3" placeholder="Deskripsikan bisnis/ide kamu..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none mb-4"></textarea><button onclick="runSWOT()" class="bg-gradient-to-r from-neon-green to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-emerald-500/20 w-full">Generate SWOT Analysis</button></div><div id="swot-result" class="mt-6"></div></div></div>

      <!-- COACH TAB -->
      <div id="tab-coach" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20"><i class="fas fa-user-tie text-white text-2xl"></i></div><h2 class="text-2xl font-black text-white">AI Coach Mode</h2><p class="text-gray-400 text-sm mt-1">Personal coaching untuk mencapai goal-mu</p></div><div class="glass rounded-2xl p-6 space-y-4"><div><label class="text-xs font-bold text-gray-400 mb-2 block">Apa goal utamamu?</label><textarea id="coach-goal" rows="2" placeholder="Contoh: Punya 50 klien freelance dalam 3 bulan" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div><label class="text-xs font-bold text-gray-400 mb-2 block">Kondisi saat ini?</label><textarea id="coach-state" rows="2" placeholder="Contoh: Baru mulai, punya 2 klien" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div><label class="text-xs font-bold text-gray-400 mb-2 block">Apa yang menghalangi?</label><textarea id="coach-obstacles" rows="2" placeholder="Contoh: Tidak tau cara dapat klien baru" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><button onclick="runCoach()" class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm w-full transition shadow-lg shadow-amber-500/20">Mulai Coaching Session</button></div><div id="coach-result" class="mt-6"></div></div></div>

      <!-- POMODORO TAB -->
      <div id="tab-pomodoro" class="tab-content hidden p-6"><div class="max-w-lg mx-auto text-center"><div class="mb-6"><h2 class="text-2xl font-black text-white">Pomodoro Timer Pro</h2><p class="text-gray-400 text-sm mt-1">Deep Work Mode with sound notifications</p></div><div class="glass rounded-3xl p-10 mb-6"><div class="relative inline-block mb-6"><svg class="w-56 h-56 -rotate-90" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8"/><circle id="pomo-ring" cx="100" cy="100" r="90" fill="none" stroke="#6366f1" stroke-width="8" stroke-linecap="round" stroke-dasharray="565.48" stroke-dashoffset="0" class="timer-ring"/></svg><div class="absolute inset-0 flex flex-col items-center justify-center"><p id="pomo-time" class="text-5xl font-black text-white tabular-nums">25:00</p><p id="pomo-label" class="text-sm text-gray-400 mt-1">Focus Time</p></div></div><div class="flex items-center justify-center gap-4 mb-6"><button onclick="startPomo()" id="pomo-start-btn" class="btn-primary text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"><i class="fas fa-play text-sm"></i><span>Mulai</span></button><button onclick="pausePomo()" id="pomo-pause-btn" class="hidden bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2"><i class="fas fa-pause text-sm"></i><span>Pause</span></button><button onclick="resetPomo()" class="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-3 rounded-full font-bold transition"><i class="fas fa-redo text-sm"></i></button></div><div class="flex justify-center gap-3 mb-4"><button onclick="setPomoMode('focus')" class="pomo-mode-btn active text-xs px-4 py-2 rounded-lg font-bold bg-brand-500 text-white" data-mode="focus">Focus (25m)</button><button onclick="setPomoMode('short')" class="pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold text-gray-400 bg-white/5 hover:bg-white/10" data-mode="short">Short Break (5m)</button><button onclick="setPomoMode('long')" class="pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold text-gray-400 bg-white/5 hover:bg-white/10" data-mode="long">Long Break (15m)</button></div></div><div class="glass rounded-2xl p-6"><div class="flex items-center justify-between mb-3"><p class="text-sm font-bold text-white">Session Hari Ini</p><p id="pomo-sessions" class="text-2xl font-black text-brand-400">0</p></div><div class="flex items-center justify-between"><p class="text-sm font-bold text-white">Total Fokus</p><p id="pomo-total" class="text-2xl font-black text-neon-green">0m</p></div></div></div></div>

      <!-- GOALS TAB -->
      <div id="tab-goals" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-white">Goal Tracker</h2><p class="text-gray-400 text-sm">Track & manage goals kamu</p></div><button onclick="showAddGoal()" class="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"><i class="fas fa-plus"></i><span>Tambah</span></button></div><div id="add-goal-form" class="hidden glass rounded-2xl p-6 mb-6"><h3 class="font-bold text-white mb-4">Goal Baru</h3><div class="space-y-3"><input id="goal-title" type="text" placeholder="Nama goal..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500"><textarea id="goal-desc" rows="2" placeholder="Deskripsi..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea><div class="flex gap-3"><select id="goal-cat" class="glass rounded-xl px-4 py-3 text-sm text-white flex-1 bg-transparent"><option value="bisnis">Bisnis</option><option value="karir">Karir</option><option value="skill">Skill</option><option value="personal">Personal</option><option value="finansial">Finansial</option><option value="kesehatan">Kesehatan</option></select><input id="goal-dl" type="date" class="glass rounded-xl px-4 py-3 text-sm text-white flex-1 bg-transparent"></div><div class="flex gap-3"><button onclick="addGoal()" class="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold">Simpan</button><button onclick="hideAddGoal()" class="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-2.5 rounded-xl text-sm transition">Batal</button></div></div></div><div id="goals-list" class="space-y-4"></div></div></div>

      <!-- HABITS TAB -->
      <div id="tab-habits" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-white">Habit Tracker</h2><p class="text-gray-400 text-sm">Build consistent habits</p></div><button onclick="showAddHabit()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-500/20"><i class="fas fa-plus"></i><span>Tambah</span></button></div><div id="add-habit-form" class="hidden glass rounded-2xl p-6 mb-6"><h3 class="font-bold text-white mb-4">Habit Baru</h3><div class="space-y-3"><input id="habit-name" type="text" placeholder="Nama habit..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500"><select id="habit-freq" class="w-full glass rounded-xl px-4 py-3 text-sm text-white bg-transparent"><option value="daily">Setiap Hari</option><option value="weekday">Sen-Jum</option><option value="3x">3x/Minggu</option></select><div class="flex gap-3"><button onclick="addHabit()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition">Simpan</button><button onclick="hideAddHabit()" class="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-2.5 rounded-xl text-sm transition">Batal</button></div></div></div><div id="habits-list" class="space-y-3"></div></div></div>

      <!-- VISION BOARD TAB (NEW V3.1.1) -->
      <div id="tab-vision" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-neon-pink to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20"><i class="fas fa-images text-white text-2xl"></i></div><h2 class="text-2xl font-black text-white">Vision Board</h2><p class="text-gray-400 text-sm mt-1">Visualisasi goals & dreams kamu. Proven meningkatkan achievement 42%.</p></div><div class="glass rounded-2xl p-6 mb-6"><div class="space-y-4"><div><label class="text-xs font-bold text-neon-pink mb-2 block">MY BIG VISION</label><textarea id="vision-big" rows="3" placeholder="Tulis visi besar hidupmu... (contoh: Menjadi entrepreneur sukses yang bisa impact 1 juta orang)" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div class="grid sm:grid-cols-3 gap-4"><div><label class="text-xs font-bold text-brand-300 mb-2 block">1 YEAR GOAL</label><textarea id="vision-1y" rows="2" placeholder="Dalam 1 tahun..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div><label class="text-xs font-bold text-neon-green mb-2 block">3 MONTH GOAL</label><textarea id="vision-3m" rows="2" placeholder="Dalam 3 bulan..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div><label class="text-xs font-bold text-neon-amber mb-2 block">THIS WEEK</label><textarea id="vision-1w" rows="2" placeholder="Minggu ini..." class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div></div><button onclick="saveVision()" class="bg-gradient-to-r from-neon-pink to-rose-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full transition shadow-lg shadow-pink-500/20">Simpan Vision Board</button></div></div><div id="vision-display" class="glass rounded-2xl p-6 hidden"><h3 class="font-bold text-white mb-4 flex items-center gap-2"><i class="fas fa-star text-neon-amber"></i> My Vision Board</h3><div id="vision-content"></div></div></div></div>

      <!-- WEEKLY REVIEW TAB -->
      <div id="tab-review" class="tab-content hidden p-6"><div class="max-w-3xl mx-auto"><div class="text-center mb-8"><div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20"><i class="fas fa-calendar-check text-white text-2xl"></i></div><h2 class="text-2xl font-black text-white">Weekly Review</h2><p class="text-gray-400 text-sm mt-1">Refleksi & planning mingguan</p></div><div class="space-y-4"><div class="glass rounded-2xl p-6"><label class="text-xs font-bold text-neon-green mb-3 block">3 WINS MINGGU INI</label><textarea id="review-wins" rows="3" placeholder="Apa 3 hal yang berhasil kamu capai?" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div class="glass rounded-2xl p-6"><label class="text-xs font-bold text-neon-amber mb-3 block">3 LEARNINGS</label><textarea id="review-learn" rows="3" placeholder="Apa 3 hal yang kamu pelajari?" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><div class="glass rounded-2xl p-6"><label class="text-xs font-bold text-brand-300 mb-3 block">FOKUS MINGGU DEPAN</label><textarea id="review-focus" rows="3" placeholder="Prioritas utama minggu depan?" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none"></textarea></div><button onclick="saveReview()" class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm w-full transition shadow-lg shadow-cyan-500/20">Simpan Weekly Review</button><div id="review-saved" class="hidden glass rounded-2xl p-6 text-center"><i class="fas fa-check-circle text-neon-green text-3xl mb-3"></i><p class="text-white font-bold">Review Tersimpan!</p></div></div></div></div>

      <!-- RESOURCES TAB -->
      <div id="tab-resources" class="tab-content hidden p-6"><div class="max-w-4xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-2xl font-black text-white">Resource Library</h2><p class="text-gray-400 text-sm">17+ framework & panduan strategis</p></div></div><div class="mb-6"><input id="resource-search" type="text" placeholder="Search resources..." oninput="renderResources()" class="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500"><div></div></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" id="resources-grid"></div></div></div>
    </div>
  </main>
  <div id="sb-overlay" class="fixed inset-0 bg-black/60 z-40 hidden" onclick="closeSB()"></div>

  <script>
    // ===== LOCALSTORAGE HELPER =====
    const LS={get(k,d){try{const v=localStorage.getItem('sm31_'+k);return v?JSON.parse(v):d}catch{return d}},set(k,v){try{localStorage.setItem('sm31_'+k,JSON.stringify(v))}catch{}}};

    // ===== STATE =====
    let userName=LS.get('name','');
    let goals=LS.get('goals',[
      {id:1,title:'Launch Bisnis Digital',desc:'Buat dan launch produk digital pertama',category:'bisnis',progress:35,deadline:'2026-07-01',milestones:['Riset pasar','Buat MVP','Launch','Marketing']},
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
    let vision=LS.get('vision',null);
    const saveState=()=>{LS.set('goals',goals);LS.set('habits',habits);LS.set('pomoSessions',pomoSessions);LS.set('pomoTotal',pomoTotal)};

    const resources=[
      {title:'Business Model Canvas',desc:'Framework merancang model bisnis',icon:'📋',cat:'Bisnis'},
      {title:'SMART Goals',desc:'Goals Specific, Measurable, Achievable',icon:'🎯',cat:'Produktivitas'},
      {title:'Eisenhower Matrix',desc:'Prioritas: urgensi & kepentingan',icon:'⚡',cat:'Produktivitas'},
      {title:'Personal Finance 101',desc:'Dasar mengelola keuangan',icon:'💰',cat:'Finansial'},
      {title:'Growth Mindset',desc:'Pola pikir pertumbuhan',icon:'🧠',cat:'Personal'},
      {title:'Networking Strategy',desc:'Bangun koneksi profesional',icon:'🤝',cat:'Karir'},
      {title:'MVP Development',desc:'Panduan Minimum Viable Product',icon:'🚀',cat:'Tech'},
      {title:'Content Marketing',desc:'Strategi konten & audiens',icon:'📝',cat:'Marketing'},
      {title:'Time Blocking',desc:'Teknik manajemen waktu',icon:'⏰',cat:'Produktivitas'},
      {title:'SWOT Analysis Guide',desc:'Analisis kekuatan & peluang',icon:'📊',cat:'Bisnis'},
      {title:'Habit Stacking',desc:'Teknik membangun habit',icon:'🔥',cat:'Personal'},
      {title:'Revenue Model Canvas',desc:'Framework model revenue',icon:'💎',cat:'Bisnis'},
      {title:'Active Recall Study',desc:'Teknik belajar efektif',icon:'📖',cat:'Pendidikan'},
      {title:'Deep Work Protocol',desc:'Fokus tanpa distraksi',icon:'🧘',cat:'Produktivitas'},
      {title:'Creator Economy Guide',desc:'Monetisasi konten digital',icon:'🎬',cat:'Creative'},
      {title:'Ikigai Framework',desc:'Temukan tujuan hidup',icon:'🌸',cat:'Purpose'},
      {title:'Public Speaking 101',desc:'Bicara di depan umum',icon:'🎤',cat:'Networking'}
    ];

    // ===== ONBOARDING =====
    if(!userName){document.getElementById('onboarding').classList.remove('hidden')}
    function completeOnboarding(){
      const n=document.getElementById('onboard-name').value.trim()||'User';
      userName=n;LS.set('name',n);
      document.getElementById('onboarding').classList.add('hidden');
      updateUserDisplay();updateDashboard();
    }
    function updateUserDisplay(){
      document.getElementById('user-initial').textContent=userName.charAt(0).toUpperCase();
      document.getElementById('dash-name').textContent=userName;
    }
    if(userName)updateUserDisplay();

    // ===== TABS =====
    function switchTab(t){
      document.querySelectorAll('.tab-content').forEach(e=>e.classList.add('hidden'));
      document.getElementById('tab-'+t).classList.remove('hidden');
      document.querySelectorAll('.sidebar-link').forEach(e=>e.classList.remove('active'));
      const sl=document.querySelector('[data-tab="'+t+'"]');if(sl)sl.classList.add('active');
      const titles={dashboard:'Dashboard',analyzer:'AI Strategic Analyzer',swot:'SWOT Analyzer',coach:'AI Coach Mode',pomodoro:'Pomodoro Timer Pro',goals:'Goal Tracker',habits:'Habit Tracker',vision:'Vision Board',review:'Weekly Review',resources:'Resource Library'};
      document.getElementById('page-title').textContent=titles[t]||'SparkMind V3.1';
      if(t==='dashboard')updateDashboard();if(t==='goals')renderGoals();if(t==='habits')renderHabits();if(t==='resources')renderResources();if(t==='vision')loadVision();
      closeSB();
    }

    // ===== DASHBOARD =====
    function updateDashboard(){
      document.getElementById('dash-goals').textContent=goals.length;
      document.getElementById('dash-habits').textContent=habits.length;
      document.getElementById('dash-focus').textContent=pomoTotal+'m';
      const maxStreak=habits.reduce((m,h)=>Math.max(m,h.streak),0);
      document.getElementById('dash-streak').textContent=maxStreak;
      // Goal progress list
      const gl=document.getElementById('dash-goal-list');
      gl.innerHTML=goals.slice(0,4).map(g=>'<div class="flex items-center gap-3"><div class="flex-1"><div class="flex justify-between mb-1"><span class="text-white text-xs font-bold">'+esc(g.title)+'</span><span class="text-brand-400 text-xs font-bold">'+g.progress+'%</span></div><div class="w-full bg-white/5 rounded-full h-2"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-2 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div></div></div>').join('')||'<p class="text-gray-500 text-sm">Belum ada goals.</p>';
      // Habits list
      const hl=document.getElementById('dash-habit-list');
      hl.innerHTML=habits.slice(0,4).map(h=>'<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center '+(h.done?'bg-neon-green/20 text-neon-green':'bg-white/5 text-gray-600')+'"><i class="fas '+(h.done?'fa-check':'fa-circle')+' text-xs"></i></div><span class="text-white text-sm flex-1 '+(h.done?'line-through opacity-50':'')+'">'+h.icon+' '+esc(h.name)+'</span><span class="text-neon-amber text-xs font-bold"><i class="fas fa-fire-flame-curved mr-1"></i>'+h.streak+'</span></div>').join('')||'<p class="text-gray-500 text-sm">Belum ada habits.</p>';
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
      const res=document.getElementById('swot-result');res.innerHTML='<div class="text-center py-8"><div class="flex gap-1.5 justify-center"><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-green rounded-full typing-dot"></div></div></div>';
      fetch('/api/swot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business:inp})}).then(r=>r.json()).then(d=>{res.innerHTML='<div class="glass rounded-2xl p-6">'+d.response+'</div>'}).catch(()=>{res.innerHTML='<p class="text-red-400 text-center">Error!</p>'});
    }

    // ===== COACH =====
    function runCoach(){
      const g=document.getElementById('coach-goal').value.trim();if(!g)return alert('Masukkan goal kamu!');
      const s=document.getElementById('coach-state').value.trim(),o=document.getElementById('coach-obstacles').value.trim();
      const res=document.getElementById('coach-result');res.innerHTML='<div class="text-center py-8"><div class="flex gap-1.5 justify-center"><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-neon-amber rounded-full typing-dot"></div></div></div>';
      fetch('/api/coach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({goal:g,currentState:s,obstacles:o})}).then(r=>r.json()).then(d=>{res.innerHTML='<div class="glass rounded-2xl p-6">'+d.response+'</div>'}).catch(()=>{res.innerHTML='<p class="text-red-400 text-center">Error!</p>'});
    }

    // ===== POMODORO =====
    let pomoInterval=null,pomoTimeLeft=25*60,pomoRunning=false,pomoMode='focus';
    const pomoModes={focus:{time:25*60,label:'Focus Time',color:'#6366f1'},short:{time:5*60,label:'Short Break',color:'#34d399'},long:{time:15*60,label:'Long Break',color:'#fbbf24'}};
    function updatePomoDisplay(){
      const m=Math.floor(pomoTimeLeft/60),s=pomoTimeLeft%60;
      document.getElementById('pomo-time').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      const total=pomoModes[pomoMode].time,pct=(total-pomoTimeLeft)/total;
      document.getElementById('pomo-ring').style.strokeDashoffset=565.48*(1-pct);
      document.getElementById('pomo-ring').style.stroke=pomoModes[pomoMode].color;
      document.getElementById('pomo-label').textContent=pomoModes[pomoMode].label;
      document.getElementById('pomo-sessions').textContent=pomoSessions;
      document.getElementById('pomo-total').textContent=pomoTotal+'m';
    }
    function playBeep(){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=800;g.gain.value=0.3;o.start();setTimeout(()=>{o.stop();a.close()},300)}catch{}}
    function startPomo(){
      if(pomoRunning)return;pomoRunning=true;
      document.getElementById('pomo-start-btn').classList.add('hidden');document.getElementById('pomo-pause-btn').classList.remove('hidden');
      pomoInterval=setInterval(()=>{
        pomoTimeLeft--;if(pomoTimeLeft<=0){clearInterval(pomoInterval);pomoRunning=false;
          if(pomoMode==='focus'){pomoSessions++;pomoTotal+=25;saveState()}
          document.getElementById('pomo-start-btn').classList.remove('hidden');document.getElementById('pomo-pause-btn').classList.add('hidden');
          playBeep();setTimeout(playBeep,400);setTimeout(playBeep,800);
          const next=pomoMode==='focus'?'short':'focus';
          alert(pomoMode==='focus'?'Focus session selesai! Istirahat dulu.':'Break selesai! Kembali fokus!');
          setPomoMode(next);
        }updatePomoDisplay()},1000);
    }
    function pausePomo(){if(!pomoRunning)return;clearInterval(pomoInterval);pomoRunning=false;document.getElementById('pomo-start-btn').classList.remove('hidden');document.getElementById('pomo-pause-btn').classList.add('hidden')}
    function resetPomo(){pausePomo();pomoTimeLeft=pomoModes[pomoMode].time;updatePomoDisplay()}
    function setPomoMode(mode){
      pausePomo();pomoMode=mode;pomoTimeLeft=pomoModes[mode].time;
      document.querySelectorAll('.pomo-mode-btn').forEach(b=>{b.className='pomo-mode-btn text-xs px-4 py-2 rounded-lg font-bold text-gray-400 bg-white/5 hover:bg-white/10'});
      const btn=document.querySelector('[data-mode="'+mode+'"]');if(btn)btn.className='pomo-mode-btn active text-xs px-4 py-2 rounded-lg font-bold bg-brand-500 text-white';
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
    function delGoal(id){if(confirm('Hapus goal ini?')){goals=goals.filter(x=>x.id!==id);saveState();renderGoals()}}
    function renderGoals(){
      const l=document.getElementById('goals-list');if(!goals.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-bullseye text-4xl text-gray-700 mb-4"></i><p class="text-gray-500 text-sm">Belum ada goals.</p></div>';return}
      const ci={bisnis:'💼',karir:'📈',skill:'💻',personal:'🧘',finansial:'💰',kesehatan:'💪'};
      l.innerHTML=goals.map(g=>'<div class="glass rounded-2xl p-6 hover:border-brand-500/20 transition"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><span class="text-2xl">'+(ci[g.category]||'🎯')+'</span><div><h3 class="font-bold text-white">'+esc(g.title)+'</h3><p class="text-gray-500 text-xs">'+esc(g.desc)+'</p></div></div><div class="flex items-center gap-2"><span class="text-xs text-gray-500"><i class="fas fa-calendar mr-1"></i>'+g.deadline+'</span><button onclick="delGoal('+g.id+')" class="text-gray-600 hover:text-red-400 transition"><i class="fas fa-trash text-xs"></i></button></div></div><div class="flex items-center gap-4"><div class="flex-1"><div class="w-full bg-white/5 rounded-full h-3"><div class="bg-gradient-to-r from-brand-500 to-neon-green h-3 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div></div><span class="text-sm font-bold text-brand-400 min-w-[40px] text-right">'+g.progress+'%</span><div class="flex gap-1"><button onclick="updProg('+g.id+',-10)" class="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition"><i class="fas fa-minus text-xs text-gray-500"></i></button><button onclick="updProg('+g.id+',10)" class="w-7 h-7 bg-brand-500/20 hover:bg-brand-500/30 rounded-lg flex items-center justify-center transition"><i class="fas fa-plus text-xs text-brand-400"></i></button></div></div>'+(g.milestones&&g.milestones.length?'<div class="mt-4 flex flex-wrap gap-2">'+g.milestones.map((m,i)=>'<span class="text-xs px-3 py-1 rounded-lg '+(i<Math.ceil(g.progress/(100/g.milestones.length))?'bg-neon-green/10 text-neon-green border border-neon-green/20':'bg-white/5 text-gray-500 border border-white/5')+'">'+m+'</span>').join('')+'</div>':'')+'</div>').join('');
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

    // ===== VISION BOARD =====
    function loadVision(){
      if(vision){
        document.getElementById('vision-big').value=vision.big||'';
        document.getElementById('vision-1y').value=vision.y1||'';
        document.getElementById('vision-3m').value=vision.m3||'';
        document.getElementById('vision-1w').value=vision.w1||'';
        showVisionDisplay();
      }
    }
    function saveVision(){
      const big=document.getElementById('vision-big').value.trim();
      if(!big)return alert('Tulis visi besarmu!');
      vision={big,y1:document.getElementById('vision-1y').value.trim(),m3:document.getElementById('vision-3m').value.trim(),w1:document.getElementById('vision-1w').value.trim(),date:new Date().toISOString()};
      LS.set('vision',vision);showVisionDisplay();
    }
    function showVisionDisplay(){
      if(!vision)return;
      const d=document.getElementById('vision-display');d.classList.remove('hidden');
      document.getElementById('vision-content').innerHTML='<div class="space-y-4"><div class="bg-gradient-to-r from-neon-pink/10 to-rose-500/10 border border-neon-pink/20 rounded-xl p-5"><p class="text-neon-pink text-xs font-bold mb-2">MY BIG VISION</p><p class="text-white text-sm font-medium leading-relaxed">'+esc(vision.big)+'</p></div><div class="grid sm:grid-cols-3 gap-3">'+(vision.y1?'<div class="glass rounded-xl p-4"><p class="text-brand-300 text-xs font-bold mb-2">1 YEAR</p><p class="text-gray-300 text-xs">'+esc(vision.y1)+'</p></div>':'')+(vision.m3?'<div class="glass rounded-xl p-4"><p class="text-neon-green text-xs font-bold mb-2">3 MONTHS</p><p class="text-gray-300 text-xs">'+esc(vision.m3)+'</p></div>':'')+(vision.w1?'<div class="glass rounded-xl p-4"><p class="text-neon-amber text-xs font-bold mb-2">THIS WEEK</p><p class="text-gray-300 text-xs">'+esc(vision.w1)+'</p></div>':'')+'</div><p class="text-gray-600 text-xs text-right">Updated: '+new Date(vision.date).toLocaleDateString('id-ID')+'</p></div>';
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
      const q=(document.getElementById('resource-search')?.value||'').toLowerCase();
      const filtered=resources.filter(r=>!q||r.title.toLowerCase().includes(q)||r.desc.toLowerCase().includes(q)||r.cat.toLowerCase().includes(q));
      document.getElementById('resources-grid').innerHTML=filtered.map(r=>'<div class="glass rounded-2xl p-6 hover:border-brand-500/20 hover:-translate-y-1 transition cursor-pointer"><span class="text-3xl mb-3 block">'+r.icon+'</span><span class="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-lg font-bold uppercase border border-white/5">'+r.cat+'</span><h3 class="font-bold text-white mt-2 mb-1 text-sm">'+r.title+'</h3><p class="text-gray-500 text-xs">'+r.desc+'</p></div>').join('')||(q?'<p class="text-gray-500 text-sm col-span-3 text-center py-8">Tidak ditemukan untuk "'+esc(q)+'"</p>':'');
    }

    // ===== EXPORT =====
    function exportData(){
      let txt='=== SparkMind V3.1.1 Data Export ===\\n';
      txt+='Date: '+new Date().toLocaleString('id-ID')+'\\n\\n';
      txt+='== GOALS ==\\n';
      goals.forEach(g=>{txt+=g.title+' ['+g.progress+'%] - '+g.category+' - deadline: '+g.deadline+'\\n'});
      txt+='\\n== HABITS ==\\n';
      habits.forEach(h=>{txt+=h.name+' - streak: '+h.streak+' - '+(h.done?'Done':'Pending')+'\\n'});
      txt+='\\n== POMODORO ==\\nSessions: '+pomoSessions+'\\nTotal Focus: '+pomoTotal+'m\\n';
      if(vision){txt+='\\n== VISION BOARD ==\\nBig Vision: '+vision.big+'\\n1Y: '+(vision.y1||'-')+'\\n3M: '+(vision.m3||'-')+'\\n1W: '+(vision.w1||'-')+'\\n'}
      const blob=new Blob([txt],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sparkmind-export-'+new Date().toISOString().slice(0,10)+'.txt';a.click();
    }

    // ===== SIDEBAR MOBILE =====
    document.getElementById('sb-toggle').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('hidden');document.getElementById('sidebar').classList.add('fixed','inset-y-0','left-0','z-50');document.getElementById('sb-overlay').classList.remove('hidden')});
    function closeSB(){document.getElementById('sidebar').classList.add('hidden');document.getElementById('sidebar').classList.remove('fixed','inset-y-0','left-0','z-50');document.getElementById('sb-overlay').classList.add('hidden');if(window.innerWidth>=768)document.getElementById('sidebar').classList.remove('hidden')}

    // ===== TEXTAREA AUTO RESIZE =====
    document.getElementById('user-input').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,128)+'px'});

    // ===== QUOTE TICKER =====
    fetch('/api/quotes').then(r=>r.json()).then(q=>{document.getElementById('quote-ticker').textContent='"'+q.text+'" — '+q.author}).catch(()=>{});

    // ===== INIT =====
    updateDashboard();renderGoals();renderHabits();
  </script>
</body>
</html>`

export default app
