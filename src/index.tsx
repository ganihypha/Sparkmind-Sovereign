import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

// ============================================
// LANDING PAGE - SparkMind V2 Premium
// ============================================
app.get('/', (c) => {
  return c.html(LANDING_HTML)
})

// ============================================
// APP DASHBOARD
// ============================================
app.get('/app', (c) => {
  return c.html(APP_HTML)
})

// ============================================
// API ROUTES
// ============================================
app.post('/api/analyze', async (c) => {
  const { message, mode } = await c.req.json()
  const response = generateStrategicResponse(message, mode || 'strategic')
  return c.json({ response, timestamp: new Date().toISOString(), mode })
})

app.post('/api/swot', async (c) => {
  const { business } = await c.req.json()
  const response = generateSWOT(business)
  return c.json({ response, timestamp: new Date().toISOString() })
})

app.get('/api/resources', (c) => {
  return c.json({ resources: RESOURCES_DATA })
})

app.get('/api/insights', (c) => {
  return c.json({ insights: INSIGHTS_DATA })
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', service: 'SparkMind V2 API', version: '2.0.0' })
})

// ============================================
// AI STRATEGIC ENGINE V2
// ============================================
function generateStrategicResponse(message: string, mode: string): string {
  const m = message.toLowerCase()

  if (mode === 'swot') return generateSWOT(message)
  if (mode === 'mindmap') return generateMindMap(message)

  // Business / Entrepreneurship
  if (m.includes('bisnis') || m.includes('usaha') || m.includes('jualan') || m.includes('startup') || m.includes('toko') || m.includes('online shop')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">BISNIS</span>
        <span class="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">HIGH CONFIDENCE</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Deep Strategic Analysis: Memulai & Mengembangkan Bisnis</p>
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
        <p class="text-blue-700 text-xs font-bold mb-2">📊 EXECUTIVE SUMMARY</p>
        <p class="text-gray-700 text-sm">Berdasarkan analisis 500+ startup Indonesia, 67% gagal karena tidak validasi pasar. Berikut adalah <strong>proven framework</strong> yang digunakan startup sukses:</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🔍 Market Validation Sprint (Minggu 1-2)</p>
            <ul class="text-gray-500 text-xs mt-1 space-y-1">
              <li>• Riset 5 kompetitor utama — catat pricing, USP, dan kelemahannya</li>
              <li>• Interview 15-20 calon customer (bisa via WA/IG poll)</li>
              <li>• Identifikasi "Pain Point" terbesar yang belum terpecahkan</li>
              <li>• Buat hypothesis: "Orang akan bayar Rp X untuk solusi Y"</li>
            </ul>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🚀 MVP Launch (Minggu 3-4)</p>
            <ul class="text-gray-500 text-xs mt-1 space-y-1">
              <li>• Buat produk/jasa versi paling sederhana (1 fitur utama saja)</li>
              <li>• Gunakan tools gratis: Canva, WA Business, IG Shop, Tokopedia</li>
              <li>• Launch ke 50 orang pertama — inner circle dulu</li>
              <li>• Kumpulkan feedback langsung: "Apa yang kurang?"</li>
            </ul>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">📈 Growth Engine (Bulan 2-3)</p>
            <ul class="text-gray-500 text-xs mt-1 space-y-1">
              <li>• Content marketing: buat 3 konten/minggu yang solve pain point</li>
              <li>• Referral system: kasih diskon 20% untuk yang refer teman</li>
              <li>• Mulai paid ads dengan budget kecil (Rp 50K/hari di IG)</li>
              <li>• Target: 50 paying customers dalam 90 hari</li>
            </ul>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">⚙️ Scale & Systemize (Bulan 4-6)</p>
            <ul class="text-gray-500 text-xs mt-1 space-y-1">
              <li>• Buat SOP untuk setiap proses (order, delivery, CS)</li>
              <li>• Hire 1 orang untuk handle operasional</li>
              <li>• Diversifikasi: tambah 1-2 produk/jasa baru</li>
              <li>• Target MRR: Rp 5-10 juta/bulan</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-4">
        <p class="text-amber-700 text-xs font-bold">💎 SOVEREIGN INSIGHT</p>
        <p class="text-gray-700 text-sm mt-1">"Revenue is oxygen for business. Don't build in silence for months — sell first, build later. Your market will tell you what to build."</p>
      </div>
    </div>`
  }

  // Productivity
  if (m.includes('produktivitas') || m.includes('produktif') || m.includes('fokus') || m.includes('wfh') || m.includes('manajemen waktu') || m.includes('time management') || m.includes('procrastina')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">PRODUKTIVITAS</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Deep Analysis: Sistem Produktivitas Tingkat Tinggi</p>
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-4">
        <p class="text-green-700 text-xs font-bold mb-2">📊 ROOT CAUSE ANALYSIS</p>
        <p class="text-gray-700 text-sm">Produktivitas rendah biasanya berakar dari 3 hal: <strong>kurang struktur</strong>, <strong>distraksi berlebihan</strong>, atau <strong>energy management yang buruk</strong>.</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">⏰ Deep Work Protocol</p>
            <p class="text-gray-500 text-xs">Blok 90 menit tanpa gangguan. HP silent, notif off, pintu tutup. Otak butuh 23 menit untuk kembali fokus setelah distraksi.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🎯 MIT Method (Most Important Task)</p>
            <p class="text-gray-500 text-xs">Setiap pagi, tentukan 1 tugas TERPENTING. Kerjakan PERTAMA sebelum buka email/socmed. Ini saja sudah boost produktivitas 2x.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🔋 Energy Management > Time Management</p>
            <p class="text-gray-500 text-xs">Tidur 7-8 jam, olahraga 3x/minggu, makan bersih. CEO top dunia prioritaskan kesehatan karena itu fondasi performa.</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mt-4">
        <p class="text-purple-700 text-xs font-bold">⚡ QUICK WIN — Mulai Besok</p>
        <p class="text-gray-700 text-sm mt-1">Matikan semua notifikasi HP, kerjakan 1 MIT selama 90 menit pertama hari, lalu istirahat 15 menit. Ulangi. Dalam 1 minggu, rasakan perbedaannya.</p>
      </div>
    </div>`
  }

  // Programming / Tech
  if (m.includes('programming') || m.includes('coding') || m.includes('developer') || m.includes('belajar') || m.includes('roadmap') || m.includes('javascript') || m.includes('python') || m.includes('react') || m.includes('web')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">TECH & SKILL</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Learning Roadmap: Dari Nol ke Developer Profesional</p>
      <div class="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4 mb-4">
        <p class="text-purple-700 text-xs font-bold mb-2">📊 MARKET INSIGHT</p>
        <p class="text-gray-700 text-sm">Gaji developer junior di Indonesia: Rp 6-15 jt/bulan. Freelance bisa Rp 10-50 jt/project. Demand terus naik 25%/tahun.</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🏗️ Foundation (Bulan 1)</p>
            <p class="text-gray-500 text-xs">HTML + CSS + JS dasar. Buat 3 mini project. Resource gratis: freeCodeCamp, The Odin Project, Scrimba.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">⚛️ Framework Mastery (Bulan 2-3)</p>
            <p class="text-gray-500 text-xs">Pick 1: React (paling banyak lowongan) atau Next.js. Buat 2 real project. Pelajari API integration & state management.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">💼 Portfolio & Job Hunt (Bulan 4-5)</p>
            <p class="text-gray-500 text-xs">Portfolio website + 3 showcase projects + GitHub aktif. Apply di LinkedIn, Glints, Kalibrr, dan Upwork.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">💰 Monetize (Bulan 6+)</p>
            <p class="text-gray-500 text-xs">Target: Rp 5-15 jt/bulan dari coding. Freelance, remote job, atau build SaaS product sendiri.</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-4 mt-4">
        <p class="text-cyan-700 text-xs font-bold">🎯 DAILY PROTOCOL</p>
        <p class="text-gray-700 text-sm mt-1">Minimal 2 jam belajar + 1 jam coding/hari. 100 hari konsisten = kamu sudah lebih baik dari 90% pemula. Consistency beats talent.</p>
      </div>
    </div>`
  }

  // Career
  if (m.includes('karir') || m.includes('promosi') || m.includes('gaji') || m.includes('jabatan') || m.includes('interview') || m.includes('resign') || m.includes('pindah kerja')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">KARIR</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Career Acceleration Framework</p>
      <div class="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-4">
        <p class="text-amber-700 text-xs font-bold mb-2">📊 CAREER INTELLIGENCE</p>
        <p class="text-gray-700 text-sm">80% promosi ditentukan oleh <strong>visibility + relationship</strong>, bukan hanya hard skill. Kamu butuh strategi di kedua area ini.</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">👁️ Visibility Strategy</p>
            <p class="text-gray-500 text-xs">Share progress di meeting, dokumentasikan achievements, volunteer di project high-impact. Bikin decision makers LIHAT kontribusimu.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🧩 Skill Stacking</p>
            <p class="text-gray-500 text-xs">Kombinasi skill unik = rare & valuable. Technical + Communication = pemimpin. Invest di skill yang jarang dimiliki peers.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🤝 Strategic Networking</p>
            <p class="text-gray-500 text-xs">Build relationship dengan 3 decision makers. Jadwalkan 1-on-1 dengan manager: "What would it take for me to get promoted?"</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-xl p-4 mt-4">
        <p class="text-rose-700 text-xs font-bold">🔥 ACTION ITEM MINGGU INI</p>
        <p class="text-gray-700 text-sm mt-1">Jadwalkan coffee chat dengan 1 senior leader di perusahaan. Tanya soal career path mereka. Satu koneksi bisa mengubah trajectory karirmu.</p>
      </div>
    </div>`
  }

  // Finance
  if (m.includes('uang') || m.includes('keuangan') || m.includes('tabung') || m.includes('investasi') || m.includes('finansial') || m.includes('hutang') || m.includes('income') || m.includes('gaji') || m.includes('nabung')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">FINANSIAL</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Financial Independence Blueprint</p>
      <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 mb-4">
        <p class="text-emerald-700 text-xs font-bold mb-2">📊 FINANCIAL HEALTH CHECK</p>
        <p class="text-gray-700 text-sm">Rata-rata orang Indonesia menabung < 10% income. Dengan strategi ini, kamu bisa capai emergency fund dalam 6 bulan.</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">📊 Financial Audit (Minggu 1)</p>
            <p class="text-gray-500 text-xs">Track SEMUA pengeluaran 30 hari. Gunakan app atau spreadsheet. "You can't manage what you don't measure."</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🛡️ Emergency Fund First</p>
            <p class="text-gray-500 text-xs">Target: 3-6 bulan pengeluaran. Simpan di rekening terpisah. INI prioritas #1 sebelum investasi apapun.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">💰 Multiple Income Streams</p>
            <p class="text-gray-500 text-xs">Jangan bergantung pada 1 income. Side hustle dari skill: freelance, mengajar, content creation. Target: +Rp 2-5 jt/bulan.</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 mt-4">
        <p class="text-emerald-700 text-xs font-bold">💎 WEALTH PRINCIPLE</p>
        <p class="text-gray-700 text-sm mt-1">"Bukan berapa yang kamu hasilkan, tapi berapa yang kamu simpan." Mulai hari ini: sisihkan 20% income PERTAMA sebelum belanja apapun.</p>
      </div>
    </div>`
  }

  // Mental Health / Personal Development
  if (m.includes('stress') || m.includes('burnout') || m.includes('mental') || m.includes('motivasi') || m.includes('galau') || m.includes('overthink') || m.includes('sedih') || m.includes('anxiety') || m.includes('depresi') || m.includes('lelah')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">MENTAL HEALTH</span>
        <span class="px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">IMPORTANT</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Mental Resilience Framework</p>
      <div class="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-4 mb-4">
        <p class="text-rose-700 text-xs font-bold mb-2">❤️ IMPORTANT NOTE</p>
        <p class="text-gray-700 text-sm">Mental health itu nyata dan valid. Jika kamu merasa sangat overwhelmed, jangan ragu untuk bicara dengan profesional. Berikut strategi yang bisa membantu:</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🧘 Grounding Technique (5-4-3-2-1)</p>
            <p class="text-gray-500 text-xs">Saat overwhelmed: sebutkan 5 hal yang kamu lihat, 4 hal yang bisa disentuh, 3 suara, 2 bau, 1 rasa. Ini menarik pikiranmu ke present.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">📝 Journaling Protocol</p>
            <p class="text-gray-500 text-xs">Tulis 3 hal yang kamu syukuri setiap malam. Brain dump pikiran negatif ke kertas — keluarkan dari kepala. Tulis, lalu tutup buku.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🔋 Recovery Ritual</p>
            <p class="text-gray-500 text-xs">Tidur cukup (7-8 jam), jalan kaki 20 menit/hari, kurangi screen time malam. Small habits = big impact on mental health.</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4 mt-4">
        <p class="text-violet-700 text-xs font-bold">🌟 REMINDER</p>
        <p class="text-gray-700 text-sm mt-1">"You don't have to have it all figured out. Taking care of yourself is the most productive thing you can do." — Kamu sudah cukup baik hari ini.</p>
      </div>
    </div>`
  }

  // Relationship
  if (m.includes('hubungan') || m.includes('pacar') || m.includes('cinta') || m.includes('nikah') || m.includes('relationship') || m.includes('pasangan') || m.includes('jodoh') || m.includes('pacaran')) {
    return `<div>
      <div class="flex items-center space-x-2 mb-4">
        <span class="px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">RELATIONSHIP</span>
      </div>
      <p class="font-semibold text-gray-900 mb-3">🧠 Relationship Strategic Framework</p>
      <div class="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-4 mb-4">
        <p class="text-pink-700 text-xs font-bold mb-2">📊 SOVEREIGN PERSPECTIVE</p>
        <p class="text-gray-700 text-sm">Hubungan yang sehat dibangun di atas <strong>dua individu yang utuh</strong>, bukan dua orang yang saling melengkapi kekurangan.</p>
      </div>
      <div class="space-y-4">
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🏛️ Build Yourself First</p>
            <p class="text-gray-500 text-xs">Fokuslah jadi versi terbaik dirimu: stabil secara mental, punya tujuan hidup jelas, dan mandiri secara finansial. Attraction follows excellence.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">🛡️ Respect Boundaries</p>
            <p class="text-gray-500 text-xs">Hormati batasan orang lain. Jika seseorang butuh ruang, berikan. Keheninganmu bisa menjadi pernyataan kedaulatan terkuat.</p>
          </div>
        </div>
        <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
          <span class="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
          <div>
            <p class="font-bold text-gray-900 text-sm">💎 Value Alignment</p>
            <p class="text-gray-500 text-xs">Cari pasangan yang share visi dan value hidup yang sama. Chemistry penting, tapi compatibility yang membuat hubungan bertahan.</p>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-4 mt-4">
        <p class="text-violet-700 text-xs font-bold">🏛️ SOVEREIGN TRUTH</p>
        <p class="text-gray-700 text-sm mt-1">"The right person won't make you chase them. They'll meet you halfway. Focus on becoming someone worth choosing — the rest follows."</p>
      </div>
    </div>`
  }

  // Default
  return `<div>
    <div class="flex items-center space-x-2 mb-4">
      <span class="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">STRATEGIC ANALYSIS</span>
    </div>
    <p class="font-semibold text-gray-900 mb-3">🧠 Framework Pemecahan Masalah Universal</p>
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4">
      <p class="text-blue-700 text-xs font-bold mb-2">📊 ANALYSIS</p>
      <p class="text-gray-700 text-sm">Setiap masalah bisa dipecahkan dengan pendekatan terstruktur. Berikut framework yang bisa kamu terapkan:</p>
    </div>
    <div class="space-y-4">
      <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">1</span>
        <div>
          <p class="font-bold text-gray-900 text-sm">🔍 Define (Definisikan)</p>
          <p class="text-gray-500 text-xs">Tulis masalahmu dalam 1 kalimat jelas. "Apa sebenarnya yang ingin aku capai?" Masalah yang jelas = solusi yang jelas.</p>
        </div>
      </div>
      <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">2</span>
        <div>
          <p class="font-bold text-gray-900 text-sm">🧩 Decompose (Pecah)</p>
          <p class="text-gray-500 text-xs">Pecah masalah besar jadi langkah kecil. Setiap langkah harus actionable dan bisa diselesaikan dalam 1-3 hari.</p>
        </div>
      </div>
      <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">3</span>
        <div>
          <p class="font-bold text-gray-900 text-sm">⚡ Execute (Eksekusi)</p>
          <p class="text-gray-500 text-xs">Ambil 1 langkah PERTAMA hari ini. Momentum datang dari aksi, bukan perencanaan berlebihan. "Done > Perfect."</p>
        </div>
      </div>
      <div class="flex space-x-3 bg-white border border-gray-100 rounded-xl p-4">
        <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">4</span>
        <div>
          <p class="font-bold text-gray-900 text-sm">🔄 Iterate (Evaluasi & Perbaiki)</p>
          <p class="text-gray-500 text-xs">Review setiap minggu. Apa yang berhasil? Apa yang perlu diubah? Adaptasi lebih penting dari perencanaan sempurna.</p>
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mt-4">
      <p class="text-amber-700 text-xs font-bold">💡 PRO TIP</p>
      <p class="text-gray-700 text-sm mt-1">Coba ceritakan lebih spesifik: <strong>bisnis, karir, skill, keuangan, hubungan, atau mental health</strong> — dan aku akan berikan strategi yang lebih mendalam!</p>
    </div>
  </div>`
}

function generateSWOT(business: string): string {
  return `<div>
    <p class="font-bold text-gray-900 mb-4">📊 SWOT Analysis: ${business.substring(0, 50)}</p>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-green-50 border border-green-200 rounded-xl p-4">
        <p class="font-bold text-green-700 text-sm mb-2">💪 Strengths</p>
        <ul class="text-gray-600 text-xs space-y-1">
          <li>• Passion & dedikasi tinggi terhadap bidang ini</li>
          <li>• Kemampuan teknis yang terus berkembang</li>
          <li>• Low overhead cost (bisa mulai dari HP/laptop)</li>
          <li>• Fleksibilitas waktu dan lokasi</li>
        </ul>
      </div>
      <div class="bg-red-50 border border-red-200 rounded-xl p-4">
        <p class="font-bold text-red-700 text-sm mb-2">⚠️ Weaknesses</p>
        <ul class="text-gray-600 text-xs space-y-1">
          <li>• Modal awal terbatas</li>
          <li>• Belum ada track record/portofolio kuat</li>
          <li>• Network bisnis masih kecil</li>
          <li>• Time management perlu ditingkatkan</li>
        </ul>
      </div>
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p class="font-bold text-blue-700 text-sm mb-2">🚀 Opportunities</p>
        <ul class="text-gray-600 text-xs space-y-1">
          <li>• Pasar digital Indonesia tumbuh 30%/tahun</li>
          <li>• Remote work trend membuka akses global</li>
          <li>• AI & automation menciptakan niche baru</li>
          <li>• Banyak UMKM butuh solusi digital</li>
        </ul>
      </div>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p class="font-bold text-amber-700 text-sm mb-2">🛡️ Threats</p>
        <ul class="text-gray-600 text-xs space-y-1">
          <li>• Kompetisi tinggi dari freelancer global</li>
          <li>• Perubahan teknologi yang cepat</li>
          <li>• Ketidakpastian ekonomi</li>
          <li>• Client acquisition yang challenging</li>
        </ul>
      </div>
    </div>
    <div class="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-4 mt-4">
      <p class="text-indigo-700 text-xs font-bold">🎯 STRATEGIC RECOMMENDATION</p>
      <p class="text-gray-700 text-sm mt-1">Leverage strengths (passion + skill) untuk capture opportunities (pasar digital). Mitigate weaknesses dengan networking aktif dan portfolio building. Counter threats dengan continuous learning.</p>
    </div>
  </div>`
}

function generateMindMap(topic: string): string {
  return `<div>
    <p class="font-bold text-gray-900 mb-4">🗺️ Mind Map: ${topic.substring(0, 50)}</p>
    <div class="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
      <div class="text-center mb-4">
        <span class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full font-bold text-sm">${topic.substring(0, 30)}</span>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white rounded-lg p-3 border border-indigo-100">
          <p class="font-bold text-indigo-700 text-xs mb-2">📋 Planning</p>
          <ul class="text-gray-500 text-xs space-y-1">
            <li>→ Define goals</li><li>→ Research market</li><li>→ Set timeline</li>
          </ul>
        </div>
        <div class="bg-white rounded-lg p-3 border border-green-100">
          <p class="font-bold text-green-700 text-xs mb-2">⚡ Execution</p>
          <ul class="text-gray-500 text-xs space-y-1">
            <li>→ Build MVP</li><li>→ Test & iterate</li><li>→ Launch</li>
          </ul>
        </div>
        <div class="bg-white rounded-lg p-3 border border-amber-100">
          <p class="font-bold text-amber-700 text-xs mb-2">📈 Growth</p>
          <ul class="text-gray-500 text-xs space-y-1">
            <li>→ Marketing</li><li>→ Scale ops</li><li>→ Hire team</li>
          </ul>
        </div>
        <div class="bg-white rounded-lg p-3 border border-rose-100">
          <p class="font-bold text-rose-700 text-xs mb-2">🔄 Optimize</p>
          <ul class="text-gray-500 text-xs space-y-1">
            <li>→ Review metrics</li><li>→ Cut waste</li><li>→ Double down</li>
          </ul>
        </div>
      </div>
    </div>
  </div>`
}

// ============================================
// DATA
// ============================================
const RESOURCES_DATA = [
  { id: 1, title: 'Business Model Canvas', category: 'Bisnis', description: 'Framework merancang model bisnis', icon: '📋' },
  { id: 2, title: 'SMART Goals', category: 'Produktivitas', description: 'Framework goals terukur', icon: '🎯' },
  { id: 3, title: 'Eisenhower Matrix', category: 'Produktivitas', description: 'Prioritas tugas', icon: '⚡' },
  { id: 4, title: 'Personal Finance 101', category: 'Finansial', description: 'Dasar kelola keuangan', icon: '💰' },
  { id: 5, title: 'Growth Mindset', category: 'Personal', description: 'Pola pikir pertumbuhan', icon: '🧠' },
  { id: 6, title: 'Networking Strategy', category: 'Karir', description: 'Bangun koneksi profesional', icon: '🤝' },
  { id: 7, title: 'MVP Guide', category: 'Tech', description: 'Panduan buat MVP', icon: '🚀' },
  { id: 8, title: 'Content Marketing', category: 'Marketing', description: 'Strategi konten', icon: '📝' },
  { id: 9, title: 'Time Blocking', category: 'Produktivitas', description: 'Teknik manajemen waktu', icon: '⏰' },
]

const INSIGHTS_DATA = [
  { icon: '💡', title: 'Focus on Revenue', desc: 'Hari ini fokuskan 2 jam untuk aktivitas yang langsung menghasilkan uang.', time: 'Hari ini', type: 'action' },
  { icon: '📊', title: 'Weekly Review', desc: 'Sudahkah kamu review progress minggu ini? Luangkan 30 menit untuk evaluasi.', time: '2 jam lalu', type: 'review' },
  { icon: '🔥', title: 'Consistency Wins', desc: '"Konsistensi mengalahkan bakat yang tidak disiplin." — Terus maju!', time: '5 jam lalu', type: 'motivation' },
]

// ============================================
// HTML TEMPLATES
// ============================================
const LANDING_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V2 — AI Strategic Guide Platform</title>
  <meta name="description" content="Platform AI yang menganalisis tantanganmu dan memberikan action plan strategis. Dari kebingungan menuju kejelasan.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { 50:'#f0f4ff',100:'#dbe4ff',200:'#bac8ff',300:'#91a7ff',400:'#748ffc',500:'#5c7cfa',600:'#4c6ef5',700:'#4263eb',800:'#3b5bdb',900:'#364fc7' },
            accent: { 400:'#ffd43b',500:'#fcc419',600:'#fab005' },
            dark: { 700:'#232541',800:'#1a1b2e',900:'#0f1022' }
          }
        }
      }
    }
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif}
    html{scroll-behavior:smooth}
    .gradient-text{background:linear-gradient(135deg,#5c7cfa,#fcc419);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hero-bg{background:linear-gradient(135deg,#0f1022 0%,#1a1b2e 40%,#1e2a4a 70%,#0f1022 100%)}
    .glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
    .card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(92,124,250,0.15)}
    .card-hover{transition:all .4s cubic-bezier(.4,0,.2,1)}
    .float-slow{animation:floatSlow 8s ease-in-out infinite}
    .float-fast{animation:floatFast 5s ease-in-out infinite}
    @keyframes floatSlow{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-25px) rotate(2deg)}}
    @keyframes floatFast{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
    .glow-pulse{animation:glowPulse 3s ease-in-out infinite}
    @keyframes glowPulse{0%,100%{box-shadow:0 0 30px rgba(92,124,250,0.2)}50%{box-shadow:0 0 60px rgba(92,124,250,0.5)}}
    .counter{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.4,0,.2,1)}
    .counter.visible{opacity:1;transform:translateY(0)}
    .orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
  </style>
</head>
<body class="bg-white text-gray-800">
  <!-- NAV -->
  <nav class="fixed top-0 w-full z-50 bg-dark-900/90 backdrop-blur-xl border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-2">
          <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <i class="fas fa-brain text-white text-sm"></i>
          </div>
          <span class="text-white font-extrabold text-xl tracking-tight">Spark<span class="text-accent-500">Mind</span> <sup class="text-[10px] text-brand-300 font-medium">V2</sup></span>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-gray-400 hover:text-white transition text-sm font-medium">Fitur</a>
          <a href="#how" class="text-gray-400 hover:text-white transition text-sm font-medium">Cara Kerja</a>
          <a href="#pricing" class="text-gray-400 hover:text-white transition text-sm font-medium">Harga</a>
          <a href="#testimonials" class="text-gray-400 hover:text-white transition text-sm font-medium">Testimoni</a>
          <a href="/app" class="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-brand-600/25">Mulai Gratis →</a>
        </div>
        <button id="mob-menu-btn" class="md:hidden text-white"><i class="fas fa-bars text-xl"></i></button>
      </div>
    </div>
    <div id="mob-menu" class="hidden md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/5 pb-4">
      <div class="px-4 space-y-3 pt-3">
        <a href="#features" class="block text-gray-300 hover:text-white text-sm py-1">Fitur</a>
        <a href="#how" class="block text-gray-300 hover:text-white text-sm py-1">Cara Kerja</a>
        <a href="#pricing" class="block text-gray-300 hover:text-white text-sm py-1">Harga</a>
        <a href="/app" class="block bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2">Mulai Gratis →</a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero-bg min-h-screen flex items-center pt-16 relative overflow-hidden">
    <div class="orb w-[500px] h-[500px] bg-brand-500/8 top-10 -left-40"></div>
    <div class="orb w-[600px] h-[600px] bg-accent-500/6 -bottom-20 -right-40"></div>
    <div class="orb w-[300px] h-[300px] bg-purple-500/8 top-1/3 right-1/4"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-flex items-center space-x-2 glass rounded-full px-4 py-1.5 mb-8">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-gray-300 text-xs font-medium">AI-Powered Strategic Platform • V2.0</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
            Ubah Masalahmu<br>Jadi <span class="gradient-text">Strategi Sukses</span>
          </h1>
          <p class="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            Platform AI yang menganalisis tantanganmu dan memberikan <strong class="text-white">action plan strategis</strong> yang terukur. Bisnis, karir, skill, keuangan — semuanya ada di sini.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="/app" class="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-8 py-4 rounded-full font-bold text-center transition shadow-xl shadow-brand-600/30 flex items-center justify-center space-x-2">
              <i class="fas fa-rocket"></i><span>Mulai Gratis Sekarang</span>
            </a>
            <a href="#features" class="glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-center transition flex items-center justify-center space-x-2">
              <i class="fas fa-play-circle"></i><span>Lihat Fitur</span>
            </a>
          </div>
          <div class="flex items-center space-x-6">
            <div class="flex -space-x-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">H</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">R</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">D</div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-dark-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">+</div>
            </div>
            <div>
              <p class="text-white font-bold text-sm">5,000+ Users Aktif</p>
              <p class="text-gray-500 text-xs">Sudah bergabung & bertumbuh bersama</p>
            </div>
          </div>
        </div>
        <div class="hidden lg:block relative">
          <div class="glass rounded-3xl p-6 float-slow glow-pulse">
            <div class="flex items-center space-x-2 mb-5">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
              <span class="text-gray-500 text-xs ml-3 font-medium">SparkMind V2 Analyzer</span>
            </div>
            <div class="space-y-3">
              <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                <p class="text-gray-400 text-xs mb-1">📝 Input:</p>
                <p class="text-white text-sm font-medium">"Aku mau mulai bisnis dari HP, modalnya minim..."</p>
              </div>
              <div class="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <p class="text-green-400 text-xs mb-1 font-bold">🧠 AI V2 Analysis:</p>
                <p class="text-white text-sm">Berdasarkan analisis 500+ startup, berikut 4 langkah proven:</p>
                <div class="mt-3 space-y-2">
                  <p class="text-gray-300 text-xs flex items-center space-x-2"><span class="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 text-[10px] font-bold">1</span><span>Market Validation Sprint (2 minggu)</span></p>
                  <p class="text-gray-300 text-xs flex items-center space-x-2"><span class="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 text-[10px] font-bold">2</span><span>MVP Launch — mulai jual hari ini</span></p>
                  <p class="text-gray-300 text-xs flex items-center space-x-2"><span class="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 text-[10px] font-bold">3</span><span>Growth Engine — content + referral</span></p>
                  <p class="text-gray-300 text-xs flex items-center space-x-2"><span class="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center text-blue-400 text-[10px] font-bold">4</span><span>Scale to Rp 5-10 jt/bulan</span></p>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="h-1.5 w-24 bg-brand-600 rounded-full"></div>
                  <span class="text-brand-400 text-xs font-bold">98% confidence</span>
                </div>
                <span class="text-gray-500 text-xs">0.8s response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="py-16 bg-gray-50/80 border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center counter"><p class="text-4xl font-black text-brand-600" data-target="5000">0</p><p class="text-gray-500 text-sm mt-1">Active Users</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-brand-600" data-target="25000">0</p><p class="text-gray-500 text-sm mt-1">Strategi Dibuat</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-brand-600">98%</p><p class="text-gray-500 text-sm mt-1">Satisfaction</p></div>
        <div class="text-center counter"><p class="text-4xl font-black text-brand-600">24/7</p><p class="text-gray-500 text-sm mt-1">AI Available</p></div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4">Fitur V2</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Tools Premium untuk <span class="gradient-text">Growth Maker</span></h2>
        <p class="text-gray-500 max-w-2xl mx-auto">Upgrade masif dari V1 — lebih banyak tools, AI lebih cerdas, dan strategi lebih actionable.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover group">
          <div class="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition"><i class="fas fa-brain text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">AI Strategic Analyzer V2</h3>
          <p class="text-gray-500 text-sm">Engine AI yang lebih cerdas — support 8+ kategori: bisnis, karir, skill, keuangan, mental health, hubungan, dan lainnya.</p>
          <span class="inline-block mt-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">UPGRADED</span>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover group">
          <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition"><i class="fas fa-chart-pie text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">SWOT Analyzer</h3>
          <p class="text-gray-500 text-sm">Generate analisis SWOT instan untuk bisnis/ide kamu. Strengths, Weaknesses, Opportunities, Threats — dalam 1 klik.</p>
          <span class="inline-block mt-3 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">NEW</span>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover group">
          <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition"><i class="fas fa-bullseye text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Goal Tracker Pro</h3>
          <p class="text-gray-500 text-sm">Track goals dengan milestone, progress bar, deadline, dan kategori. Visualisasi roadmap otomatis.</p>
          <span class="inline-block mt-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">UPGRADED</span>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover group">
          <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition"><i class="fas fa-fire text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Habit Tracker</h3>
          <p class="text-gray-500 text-sm">Build habits yang konsisten. Streak counter, daily check-in, dan statistik habit bulanan.</p>
          <span class="inline-block mt-3 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">NEW</span>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover group">
          <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition"><i class="fas fa-lightbulb text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Daily Insights</h3>
          <p class="text-gray-500 text-sm">Insight harian dipersonalisasi berdasarkan goals dan progress kamu. Motivasi + action items setiap hari.</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover group">
          <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition"><i class="fas fa-book-open text-white text-xl"></i></div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Resource Library</h3>
          <p class="text-gray-500 text-sm">12+ framework strategis: Business Canvas, SMART Goals, Eisenhower Matrix, dan banyak lagi.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section id="how" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-accent-500/20 text-accent-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4">Cara Kerja</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Semudah <span class="gradient-text">3 Langkah</span></h2>
      </div>
      <div class="grid md:grid-cols-3 gap-10">
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-600/20 rotate-3 hover:rotate-0 transition"><span class="text-white text-3xl font-black">1</span></div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Ceritakan Masalahmu</h3>
          <p class="text-gray-500 text-sm">Tulis dalam bahasa sehari-hari. Bisnis, karir, skill, keuangan — AI kami paham konteks Indonesia.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-600/20 -rotate-2 hover:rotate-0 transition"><span class="text-white text-3xl font-black">2</span></div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">AI V2 Menganalisis</h3>
          <p class="text-gray-500 text-sm">Engine V2 memproses, identifikasi pola, dan merancang strategi berbasis data & framework proven.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-600/20 rotate-1 hover:rotate-0 transition"><span class="text-white text-3xl font-black">3</span></div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Eksekusi & Tumbuh</h3>
          <p class="text-gray-500 text-sm">Dapatkan action plan lengkap + timeline + milestones. Track progress dan terus iterasi.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section id="pricing" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4">Pricing</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Investasi untuk <span class="gradient-text">Masa Depanmu</span></h2>
        <p class="text-gray-500">Mulai gratis. Upgrade sesuai kebutuhan.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="bg-white border border-gray-200 rounded-3xl p-8 card-hover">
          <div class="mb-6"><h3 class="text-lg font-bold text-gray-900">Starter</h3><p class="text-gray-500 text-sm mt-1">Untuk eksplorasi</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-gray-900">Gratis</span><span class="text-gray-400 text-sm ml-1">/selamanya</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>5 AI Analysis / hari</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Goal Tracker (3 goals)</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Resource Library dasar</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Daily Insights</span></li>
          </ul>
          <a href="/app" class="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-full font-bold transition">Mulai Gratis</a>
        </div>
        <div class="bg-gradient-to-b from-brand-600 to-brand-700 border-2 border-brand-400 rounded-3xl p-8 relative shadow-2xl shadow-brand-600/25 scale-105">
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-500 text-dark-900 px-4 py-1 rounded-full text-xs font-black tracking-wide">PALING POPULER</div>
          <div class="mb-6"><h3 class="text-lg font-bold text-white">Pro</h3><p class="text-brand-200 text-sm mt-1">Untuk yang serius bertumbuh</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-white">Rp 79K</span><span class="text-brand-200 text-sm ml-1">/bulan</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center space-x-2.5 text-sm text-white"><i class="fas fa-check-circle text-accent-400"></i><span>Unlimited AI Analysis</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-white"><i class="fas fa-check-circle text-accent-400"></i><span>SWOT Analyzer</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-white"><i class="fas fa-check-circle text-accent-400"></i><span>Unlimited Goals + Habits</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-white"><i class="fas fa-check-circle text-accent-400"></i><span>Full Resource Library</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-white"><i class="fas fa-check-circle text-accent-400"></i><span>Priority Support</span></li>
          </ul>
          <a href="/app" class="block w-full text-center bg-white hover:bg-gray-100 text-brand-700 py-3.5 rounded-full font-black transition">Upgrade ke Pro 🚀</a>
        </div>
        <div class="bg-white border border-gray-200 rounded-3xl p-8 card-hover">
          <div class="mb-6"><h3 class="text-lg font-bold text-gray-900">Enterprise</h3><p class="text-gray-500 text-sm mt-1">Untuk tim & organisasi</p></div>
          <div class="mb-6"><span class="text-5xl font-black text-gray-900">Custom</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Semua fitur Pro</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Team Collaboration</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Custom AI Training</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>API Access</span></li>
            <li class="flex items-center space-x-2.5 text-sm text-gray-600"><i class="fas fa-check-circle text-green-500"></i><span>Dedicated Account Manager</span></li>
          </ul>
          <a href="#" class="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-full font-bold transition">Hubungi Kami</a>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section id="testimonials" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <span class="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4">Testimoni</span>
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Mereka Sudah <span class="gradient-text">Membuktikan</span></h2>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover">
          <div class="flex items-center space-x-1 mb-4"><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i></div>
          <p class="text-gray-600 text-sm mb-6 italic leading-relaxed">"SparkMind V2 bantu aku breakdown goal bisnis yang overwhelming jadi langkah-langkah yang jelas. Sekarang udah punya 5 klien dalam 2 bulan!"</p>
          <div class="flex items-center space-x-3"><div class="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center"><span class="font-bold text-brand-600">R</span></div><div><p class="font-bold text-gray-900 text-sm">Rina S.</p><p class="text-gray-500 text-xs">Freelance Designer</p></div></div>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover">
          <div class="flex items-center space-x-1 mb-4"><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i></div>
          <p class="text-gray-600 text-sm mb-6 italic leading-relaxed">"AI Analyzer V2-nya jauh lebih detail dari V1! Input masalah karir, strategi yang dikasih benar-benar practical. Udah naik jabatan!"</p>
          <div class="flex items-center space-x-3"><div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><span class="font-bold text-green-600">D</span></div><div><p class="font-bold text-gray-900 text-sm">Dimas P.</p><p class="text-gray-500 text-xs">Software Engineer</p></div></div>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl p-8 card-hover">
          <div class="flex items-center space-x-1 mb-4"><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i><i class="fas fa-star text-amber-400"></i></div>
          <p class="text-gray-600 text-sm mb-6 italic leading-relaxed">"SWOT Analyzer dan Habit Tracker-nya game changer! Aku jadi lebih konsisten dan clear sama arah bisnis. Highly recommend!"</p>
          <div class="flex items-center space-x-3"><div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><span class="font-bold text-purple-600">A</span></div><div><p class="font-bold text-gray-900 text-sm">Anita W.</p><p class="text-gray-500 text-xs">Mahasiswi & Entrepreneur</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 hero-bg relative overflow-hidden">
    <div class="orb w-[400px] h-[400px] bg-brand-500/10 top-0 left-1/4"></div>
    <div class="orb w-[400px] h-[400px] bg-accent-500/10 bottom-0 right-1/4"></div>
    <div class="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 class="text-3xl sm:text-5xl font-black text-white mb-6">Siap Mengubah Hidupmu?</h2>
      <p class="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Join 5,000+ orang yang sudah menemukan kejelasan strategis. 100% gratis untuk mulai.</p>
      <a href="/app" class="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-500 text-dark-900 px-12 py-5 rounded-full font-black text-lg transition shadow-2xl shadow-accent-500/30">
        <i class="fas fa-bolt"></i><span>Mulai Sekarang — Gratis!</span>
      </a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-dark-900 text-gray-400 py-16 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-10">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div>
            <span class="text-white font-extrabold text-lg">Spark<span class="text-accent-500">Mind</span> <sup class="text-[10px] text-brand-300">V2</sup></span>
          </div>
          <p class="text-sm leading-relaxed">AI-powered strategic guide platform. Ubah masalah jadi strategi sukses untuk orang Indonesia.</p>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm">Produk</h4>
          <ul class="space-y-2.5 text-sm"><li><a href="/app" class="hover:text-white transition">AI Analyzer V2</a></li><li><a href="/app" class="hover:text-white transition">SWOT Analyzer</a></li><li><a href="/app" class="hover:text-white transition">Goal Tracker</a></li><li><a href="/app" class="hover:text-white transition">Habit Tracker</a></li></ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm">Perusahaan</h4>
          <ul class="space-y-2.5 text-sm"><li><a href="#" class="hover:text-white transition">Tentang Kami</a></li><li><a href="#" class="hover:text-white transition">Blog</a></li><li><a href="#" class="hover:text-white transition">Privacy Policy</a></li></ul>
        </div>
        <div>
          <h4 class="text-white font-bold mb-4 text-sm">Connect</h4>
          <div class="flex space-x-3">
            <a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition"><i class="fab fa-instagram text-white"></i></a>
            <a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition"><i class="fab fa-twitter text-white"></i></a>
            <a href="#" class="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition"><i class="fab fa-linkedin text-white"></i></a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/5 mt-12 pt-8 text-center text-sm">
        <p>&copy; 2026 SparkMind V2. Built with ❤️ by PT Waskita Cakrawarti Digital. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('mob-menu-btn').addEventListener('click',()=>document.getElementById('mob-menu').classList.toggle('hidden'));
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');const c=e.target.querySelector('[data-target]');if(c){const t=parseInt(c.dataset.target);let cur=0;const inc=t/50;const timer=setInterval(()=>{cur+=inc;if(cur>=t){cur=t;clearInterval(timer)}c.textContent=Math.floor(cur).toLocaleString()},20)}}})},{threshold:0.3});
    document.querySelectorAll('.counter').forEach(el=>obs.observe(el));
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});document.getElementById('mob-menu').classList.add('hidden')})});
  </script>
</body>
</html>`

// ============================================
// APP DASHBOARD HTML
// ============================================
const APP_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SparkMind V2 — Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script>
    tailwind.config={theme:{extend:{colors:{brand:{50:'#f0f4ff',100:'#dbe4ff',200:'#bac8ff',300:'#91a7ff',400:'#748ffc',500:'#5c7cfa',600:'#4c6ef5',700:'#4263eb',800:'#3b5bdb',900:'#364fc7'},accent:{400:'#ffd43b',500:'#fcc419',600:'#fab005'},dark:{700:'#232541',800:'#1a1b2e',900:'#0f1022'}}}}}
  </script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *{font-family:'Inter',sans-serif}
    .gradient-text{background:linear-gradient(135deg,#5c7cfa,#fcc419);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .sidebar-link.active{background:rgba(92,124,250,0.08);color:#4c6ef5;border-right:3px solid #4c6ef5;font-weight:600}
    .typing-dot{animation:td 1.4s infinite}.typing-dot:nth-child(2){animation-delay:.2s}.typing-dot:nth-child(3){animation-delay:.4s}
    @keyframes td{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
    .msg-in{animation:mi .3s ease}@keyframes mi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .progress-bar{transition:width .8s cubic-bezier(.4,0,.2,1)}
    textarea:focus{outline:none}
    .mode-btn.active{background:#4c6ef5;color:white;border-color:#4c6ef5}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#f1f1f1;border-radius:10px}::-webkit-scrollbar-thumb{background:#c1c1c1;border-radius:10px}::-webkit-scrollbar-thumb:hover{background:#a1a1a1}
  </style>
</head>
<body class="bg-gray-50 h-screen flex overflow-hidden">
  <!-- SIDEBAR -->
  <aside id="sidebar" class="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col hidden md:flex">
    <div class="p-5 border-b border-gray-50">
      <a href="/" class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center"><i class="fas fa-brain text-white text-sm"></i></div>
        <span class="font-extrabold text-lg text-gray-900">Spark<span class="text-accent-500">Mind</span> <sup class="text-[9px] text-brand-400 font-medium">V2</sup></span>
      </a>
    </div>
    <nav class="flex-1 py-4 overflow-auto">
      <div class="px-6 mb-3"><p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tools</p></div>
      <a href="#" onclick="switchTab('analyzer')" class="sidebar-link active flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="analyzer"><i class="fas fa-brain w-5 text-center"></i><span>AI Analyzer</span></a>
      <a href="#" onclick="switchTab('swot')" class="sidebar-link flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="swot"><i class="fas fa-chart-pie w-5 text-center"></i><span>SWOT Analyzer</span><span class="ml-auto text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <a href="#" onclick="switchTab('goals')" class="sidebar-link flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="goals"><i class="fas fa-bullseye w-5 text-center"></i><span>Goals</span></a>
      <a href="#" onclick="switchTab('habits')" class="sidebar-link flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="habits"><i class="fas fa-fire w-5 text-center"></i><span>Habits</span><span class="ml-auto text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">NEW</span></a>
      <a href="#" onclick="switchTab('roadmap')" class="sidebar-link flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="roadmap"><i class="fas fa-route w-5 text-center"></i><span>Roadmap</span></a>
      <a href="#" onclick="switchTab('resources')" class="sidebar-link flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="resources"><i class="fas fa-book-open w-5 text-center"></i><span>Resources</span></a>
      <a href="#" onclick="switchTab('insights')" class="sidebar-link flex items-center space-x-3 px-6 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition" data-tab="insights"><i class="fas fa-lightbulb w-5 text-center"></i><span>Insights</span></a>
    </nav>
    <div class="p-4 border-t border-gray-50">
      <div class="bg-gradient-to-br from-brand-50 to-indigo-50 rounded-2xl p-4">
        <p class="text-sm font-bold text-brand-700 mb-1">Free Plan</p>
        <p class="text-xs text-brand-500 mb-3">5/5 analyses tersisa</p>
        <div class="w-full bg-brand-200 rounded-full h-1.5 mb-3"><div class="bg-brand-600 h-1.5 rounded-full" style="width:100%"></div></div>
        <button class="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-xs py-2.5 rounded-xl font-bold transition shadow-lg shadow-brand-600/20">Upgrade ke Pro 🚀</button>
      </div>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <header class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center space-x-4">
        <button id="sidebar-toggle" class="md:hidden text-gray-600"><i class="fas fa-bars text-xl"></i></button>
        <h1 id="page-title" class="text-lg font-bold text-gray-900">AI Strategic Analyzer</h1>
      </div>
      <div class="flex items-center space-x-3">
        <button class="relative text-gray-400 hover:text-gray-600 transition"><i class="fas fa-bell"></i><span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">3</span></button>
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center"><span class="text-white text-xs font-bold">H</span></div>
      </div>
    </header>

    <div class="flex-1 overflow-auto">
      <!-- ANALYZER -->
      <div id="tab-analyzer" class="tab-content h-full flex flex-col">
        <div id="chat-msgs" class="flex-1 overflow-auto p-6 space-y-4">
          <div class="msg-in flex space-x-3">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div>
            <div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-5 max-w-2xl shadow-sm">
              <p class="text-gray-800 text-sm leading-relaxed">Halo! Aku <strong>SparkMind AI V2</strong> 🧠✨<br><br>Engine baru, analisis lebih mendalam. Aku bisa bantu kamu di <strong>8+ kategori</strong>: bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, dan lainnya.<br><br><strong>Coba tanyakan:</strong></p>
              <div class="mt-3 space-y-2">
                <button onclick="useEx('Aku mau mulai bisnis online dari HP, modal minim')" class="block w-full text-left bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm px-4 py-2.5 rounded-xl transition font-medium">💼 "Aku mau mulai bisnis online, modal minim"</button>
                <button onclick="useEx('Aku sering procrastinate, gimana cara jadi lebih produktif?')" class="block w-full text-left bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm px-4 py-2.5 rounded-xl transition font-medium">⚡ "Gimana cara jadi lebih produktif?"</button>
                <button onclick="useEx('Aku merasa burnout dan overwhelmed, butuh strategi recovery')" class="block w-full text-left bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm px-4 py-2.5 rounded-xl transition font-medium">❤️ "Aku merasa burnout, butuh strategi recovery"</button>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-100 bg-white p-4">
          <div class="max-w-3xl mx-auto">
            <div class="flex items-end space-x-3">
              <div class="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition">
                <textarea id="user-input" rows="1" placeholder="Ceritakan masalah atau goal kamu..." class="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none max-h-32" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
              </div>
              <button onclick="sendMsg()" class="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white w-11 h-11 rounded-full flex items-center justify-center transition shadow-lg shadow-brand-600/25 flex-shrink-0"><i class="fas fa-paper-plane text-sm"></i></button>
            </div>
            <p class="text-center text-xs text-gray-400 mt-2">SparkMind V2 — AI Strategic Guidance Engine</p>
          </div>
        </div>
      </div>

      <!-- SWOT -->
      <div id="tab-swot" class="tab-content hidden p-6">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><i class="fas fa-chart-pie text-white text-2xl"></i></div>
            <h2 class="text-2xl font-black text-gray-900">SWOT Analyzer</h2>
            <p class="text-gray-500 text-sm mt-1">Analisis Strengths, Weaknesses, Opportunities & Threats</p>
          </div>
          <div class="bg-white border border-gray-200 rounded-2xl p-6">
            <textarea id="swot-input" rows="3" placeholder="Deskripsikan bisnis/ide kamu... (contoh: 'Jasa desain grafis freelance untuk UMKM')" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none resize-none mb-4"></textarea>
            <button onclick="runSWOT()" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-green-600/20 w-full">Generate SWOT Analysis 📊</button>
          </div>
          <div id="swot-result" class="mt-6"></div>
        </div>
      </div>

      <!-- GOALS -->
      <div id="tab-goals" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div><h2 class="text-2xl font-black text-gray-900">Goal Tracker</h2><p class="text-gray-500 text-sm">Track & manage goals kamu</p></div>
            <button onclick="showAddGoal()" class="bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center space-x-2 shadow-lg shadow-brand-600/20"><i class="fas fa-plus"></i><span>Tambah</span></button>
          </div>
          <div id="add-goal-form" class="hidden bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-4">Goal Baru</h3>
            <div class="space-y-3">
              <input id="goal-title" type="text" placeholder="Nama goal..." class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none">
              <textarea id="goal-desc" rows="2" placeholder="Deskripsi..." class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none resize-none"></textarea>
              <div class="flex gap-3">
                <select id="goal-cat" class="border border-gray-200 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-brand-400"><option value="bisnis">💼 Bisnis</option><option value="karir">📈 Karir</option><option value="skill">💻 Skill</option><option value="personal">🧘 Personal</option><option value="finansial">💰 Finansial</option></select>
                <input id="goal-dl" type="date" class="border border-gray-200 rounded-xl px-4 py-3 text-sm flex-1 outline-none focus:border-brand-400">
              </div>
              <div class="flex gap-3"><button onclick="addGoal()" class="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition">Simpan</button><button onclick="hideAddGoal()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition">Batal</button></div>
            </div>
          </div>
          <div id="goals-list" class="space-y-4"></div>
        </div>
      </div>

      <!-- HABITS -->
      <div id="tab-habits" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <div><h2 class="text-2xl font-black text-gray-900">Habit Tracker</h2><p class="text-gray-500 text-sm">Build consistent habits for success</p></div>
            <button onclick="showAddHabit()" class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center space-x-2 shadow-lg shadow-orange-500/20"><i class="fas fa-plus"></i><span>Tambah</span></button>
          </div>
          <div id="add-habit-form" class="hidden bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <h3 class="font-bold text-gray-900 mb-4">Habit Baru</h3>
            <div class="space-y-3">
              <input id="habit-name" type="text" placeholder="Nama habit... (contoh: Olahraga 30 menit)" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none">
              <select id="habit-freq" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400"><option value="daily">Setiap Hari</option><option value="weekday">Sen-Jum</option><option value="3x">3x/Minggu</option></select>
              <div class="flex gap-3"><button onclick="addHabit()" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition">Simpan</button><button onclick="hideAddHabit()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition">Batal</button></div>
            </div>
          </div>
          <div id="habits-list" class="space-y-4"></div>
        </div>
      </div>

      <!-- ROADMAP -->
      <div id="tab-roadmap" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-black text-gray-900 mb-2">Roadmap</h2>
          <p class="text-gray-500 text-sm mb-8">Visualisasi perjalanan menuju goals kamu</p>
          <div id="roadmap-content" class="relative"><div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div><div class="space-y-8" id="roadmap-items"></div></div>
        </div>
      </div>

      <!-- RESOURCES -->
      <div id="tab-resources" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-black text-gray-900 mb-2">Resource Library</h2>
          <p class="text-gray-500 text-sm mb-8">Framework & panduan strategis untuk pertumbuhan</p>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" id="resources-grid"></div>
        </div>
      </div>

      <!-- INSIGHTS -->
      <div id="tab-insights" class="tab-content hidden p-6">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-black text-gray-900 mb-2">Daily Insights</h2>
          <p class="text-gray-500 text-sm mb-8">Insight harian yang dipersonalisasi</p>
          <div id="insights-list" class="space-y-4"></div>
        </div>
      </div>
    </div>
  </main>
  <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden" onclick="closeSB()"></div>

  <script>
    // STATE
    let goals=[
      {id:1,title:'Launch Bisnis Digital',desc:'Buat dan launch produk/jasa digital pertama',category:'bisnis',progress:35,deadline:'2026-07-01',milestones:['Riset pasar','Buat MVP','Launch','Marketing']},
      {id:2,title:'Master JavaScript',desc:'Kuasai JS modern + React',category:'skill',progress:60,deadline:'2026-06-15',milestones:['JS Fundamentals','Async/Await','React Basics','Build Project']},
      {id:3,title:'Emergency Fund 10 Jt',desc:'Kumpulkan dana darurat Rp 10 juta',category:'finansial',progress:70,deadline:'2026-08-01',milestones:['Buat budget','Nabung rutin','Side income','Target tercapai']}
    ];
    let habits=[
      {id:1,name:'Olahraga 30 menit',freq:'daily',streak:12,done:true,icon:'🏃'},
      {id:2,name:'Baca buku 20 halaman',freq:'daily',streak:8,done:false,icon:'📚'},
      {id:3,name:'Coding practice',freq:'weekday',streak:15,done:true,icon:'💻'},
      {id:4,name:'Journaling',freq:'daily',streak:5,done:false,icon:'📝'}
    ];
    const resources=[
      {title:'Business Model Canvas',desc:'Framework merancang model bisnis yang solid',icon:'📋',cat:'Bisnis',color:'blue'},
      {title:'SMART Goals Framework',desc:'Buat goals yang Specific, Measurable, Achievable',icon:'🎯',cat:'Produktivitas',color:'green'},
      {title:'Eisenhower Matrix',desc:'Prioritaskan berdasarkan urgensi & kepentingan',icon:'⚡',cat:'Produktivitas',color:'amber'},
      {title:'Personal Finance 101',desc:'Dasar mengelola keuangan pribadi',icon:'💰',cat:'Finansial',color:'emerald'},
      {title:'Growth Mindset Guide',desc:'Pola pikir untuk pertumbuhan berkelanjutan',icon:'🧠',cat:'Personal',color:'purple'},
      {title:'Networking Strategy',desc:'Bangun koneksi profesional bermakna',icon:'🤝',cat:'Karir',color:'cyan'},
      {title:'MVP Development Guide',desc:'Panduan Minimum Viable Product',icon:'🚀',cat:'Tech',color:'rose'},
      {title:'Content Marketing 101',desc:'Strategi konten membangun audiens',icon:'📝',cat:'Marketing',color:'orange'},
      {title:'Time Blocking Method',desc:'Teknik manajemen waktu terbukti',icon:'⏰',cat:'Produktivitas',color:'indigo'},
      {title:'SWOT Analysis Guide',desc:'Analisis kekuatan & peluang bisnis',icon:'📊',cat:'Bisnis',color:'teal'},
      {title:'Habit Stacking',desc:'Teknik membangun habit baru',icon:'🔥',cat:'Personal',color:'red'},
      {title:'Revenue Model Canvas',desc:'Framework model revenue bisnis',icon:'💎',cat:'Bisnis',color:'violet'}
    ];
    const insights=[
      {icon:'💡',title:'Revenue First',desc:'Hari ini fokuskan 2 jam untuk aktivitas yang langsung menghasilkan uang. Revenue is oxygen.',time:'Hari ini',type:'action'},
      {icon:'📊',title:'Goal Progress',desc:'Goal "Master JavaScript" sudah 60%! Lanjutkan React basics minggu ini. Kamu on track!',time:'2 jam lalu',type:'progress'},
      {icon:'🔥',title:'Streak Alert',desc:'Coding practice streak kamu 15 hari! Jangan putus — consistency beats intensity.',time:'5 jam lalu',type:'motivation'},
      {icon:'💰',title:'Financial Tip',desc:'Emergency fund sudah 70%. Coba tambah 5% income bulan ini untuk percepat target.',time:'Kemarin',type:'tip'},
      {icon:'🎯',title:'Weekly Review',desc:'4 dari 5 target harian tercapai minggu ini. Tingkatkan sedikit lagi dan kamu akan capai goal 2x lebih cepat.',time:'2 hari lalu',type:'review'},
      {icon:'🧠',title:'Sovereign Insight',desc:'"Seorang Arsitek tidak meratapi pintu yang tertutup — dia membangun gedung yang lebih megah." Keep building.',time:'3 hari lalu',type:'motivation'}
    ];

    // TABS
    function switchTab(t){
      document.querySelectorAll('.tab-content').forEach(e=>e.classList.add('hidden'));
      document.getElementById('tab-'+t).classList.remove('hidden');
      document.querySelectorAll('.sidebar-link').forEach(e=>e.classList.remove('active'));
      document.querySelector('[data-tab="'+t+'"]').classList.add('active');
      const titles={analyzer:'AI Strategic Analyzer',swot:'SWOT Analyzer',goals:'Goal Tracker',habits:'Habit Tracker',roadmap:'Roadmap',resources:'Resource Library',insights:'Daily Insights'};
      document.getElementById('page-title').textContent=titles[t]||'SparkMind V2';
      if(t==='goals')renderGoals();if(t==='habits')renderHabits();if(t==='roadmap')renderRoadmap();if(t==='resources')renderResources();if(t==='insights')renderInsights();
    }

    // ANALYZER
    function useEx(t){document.getElementById('user-input').value=t;sendMsg()}
    function sendMsg(){
      const inp=document.getElementById('user-input');const t=inp.value.trim();if(!t)return;inp.value='';
      const box=document.getElementById('chat-msgs');
      box.innerHTML+='<div class="msg-in flex justify-end"><div class="bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-2xl shadow-sm"><p class="text-sm">'+esc(t)+'</p></div></div>';
      const tid='t-'+Date.now();
      box.innerHTML+='<div id="'+tid+'" class="msg-in flex space-x-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm"><div class="flex space-x-1.5"><div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div><div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div><div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div></div></div></div>';
      box.scrollTop=box.scrollHeight;
      fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:t,mode:'strategic'})})
        .then(r=>r.json()).then(d=>{
          document.getElementById(tid).remove();
          box.innerHTML+='<div class="msg-in flex space-x-3"><div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-brain text-white text-sm"></i></div><div class="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-5 max-w-2xl shadow-sm"><div class="text-sm text-gray-800 leading-relaxed">'+d.response+'</div></div></div>';
          box.scrollTop=box.scrollHeight;
        }).catch(()=>{document.getElementById(tid).remove();box.innerHTML+='<div class="msg-in flex space-x-3"><div class="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-exclamation text-red-500 text-sm"></i></div><div class="bg-red-50 border border-red-100 rounded-2xl rounded-tl-sm p-5 max-w-2xl"><p class="text-sm text-red-600">Error. Coba lagi!</p></div></div>';box.scrollTop=box.scrollHeight});
    }

    // SWOT
    function runSWOT(){
      const inp=document.getElementById('swot-input').value.trim();if(!inp)return alert('Deskripsikan bisnis/ide kamu!');
      const res=document.getElementById('swot-result');res.innerHTML='<div class="text-center py-8"><div class="flex space-x-1.5 justify-center"><div class="w-2.5 h-2.5 bg-green-500 rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-green-500 rounded-full typing-dot"></div><div class="w-2.5 h-2.5 bg-green-500 rounded-full typing-dot"></div></div><p class="text-gray-500 text-sm mt-3">Generating SWOT...</p></div>';
      fetch('/api/swot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({business:inp})})
        .then(r=>r.json()).then(d=>{res.innerHTML='<div class="bg-white border border-gray-200 rounded-2xl p-6">'+d.response+'</div>'})
        .catch(()=>{res.innerHTML='<p class="text-red-500 text-center">Error. Coba lagi!</p>'});
    }

    // GOALS
    function showAddGoal(){document.getElementById('add-goal-form').classList.remove('hidden')}
    function hideAddGoal(){document.getElementById('add-goal-form').classList.add('hidden')}
    function addGoal(){
      const t=document.getElementById('goal-title').value.trim();if(!t)return alert('Nama goal!');
      goals.push({id:Date.now(),title:t,desc:document.getElementById('goal-desc').value.trim(),category:document.getElementById('goal-cat').value,progress:0,deadline:document.getElementById('goal-dl').value||'TBD',milestones:[]});
      document.getElementById('goal-title').value='';document.getElementById('goal-desc').value='';hideAddGoal();renderGoals();
    }
    function updProg(id,d){const g=goals.find(x=>x.id===id);if(g){g.progress=Math.max(0,Math.min(100,g.progress+d));renderGoals()}}
    function delGoal(id){if(confirm('Hapus?')){goals=goals.filter(x=>x.id!==id);renderGoals()}}
    function renderGoals(){
      const l=document.getElementById('goals-list');if(!goals.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-bullseye text-4xl text-gray-200 mb-4"></i><p class="text-gray-400 text-sm">Belum ada goals.</p></div>';return}
      const ci={bisnis:'💼',karir:'📈',skill:'💻',personal:'🧘',finansial:'💰'};
      l.innerHTML=goals.map(g=>'<div class="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition"><div class="flex items-start justify-between mb-4"><div class="flex items-center space-x-3"><span class="text-2xl">'+(ci[g.category]||'🎯')+'</span><div><h3 class="font-bold text-gray-900">'+esc(g.title)+'</h3><p class="text-gray-500 text-xs">'+esc(g.desc)+'</p></div></div><div class="flex items-center space-x-2"><span class="text-xs text-gray-400"><i class="fas fa-calendar mr-1"></i>'+g.deadline+'</span><button onclick="delGoal('+g.id+')" class="text-gray-300 hover:text-red-500 transition"><i class="fas fa-trash text-xs"></i></button></div></div><div class="flex items-center space-x-4"><div class="flex-1"><div class="w-full bg-gray-100 rounded-full h-3"><div class="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div></div><span class="text-sm font-bold text-brand-600 min-w-[40px] text-right">'+g.progress+'%</span><div class="flex space-x-1"><button onclick="updProg('+g.id+',-10)" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition"><i class="fas fa-minus text-xs text-gray-500"></i></button><button onclick="updProg('+g.id+',10)" class="w-7 h-7 bg-brand-100 hover:bg-brand-200 rounded-lg flex items-center justify-center transition"><i class="fas fa-plus text-xs text-brand-600"></i></button></div></div>'+(g.milestones.length?'<div class="mt-4 flex flex-wrap gap-2">'+g.milestones.map((m,i)=>'<span class="text-xs px-3 py-1 rounded-full '+(i<Math.ceil(g.progress/(100/g.milestones.length))?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500')+'">'+(i<Math.ceil(g.progress/(100/g.milestones.length))?'✅':'⬜')+' '+m+'</span>').join('')+'</div>':'')+'</div>').join('');
    }

    // HABITS
    function showAddHabit(){document.getElementById('add-habit-form').classList.remove('hidden')}
    function hideAddHabit(){document.getElementById('add-habit-form').classList.add('hidden')}
    function addHabit(){
      const n=document.getElementById('habit-name').value.trim();if(!n)return alert('Nama habit!');
      habits.push({id:Date.now(),name:n,freq:document.getElementById('habit-freq').value,streak:0,done:false,icon:'✨'});
      document.getElementById('habit-name').value='';hideAddHabit();renderHabits();
    }
    function toggleHabit(id){const h=habits.find(x=>x.id===id);if(h){h.done=!h.done;if(h.done)h.streak++;else h.streak=Math.max(0,h.streak-1);renderHabits()}}
    function delHabit(id){if(confirm('Hapus?')){habits=habits.filter(x=>x.id!==id);renderHabits()}}
    function renderHabits(){
      const l=document.getElementById('habits-list');if(!habits.length){l.innerHTML='<div class="text-center py-16"><i class="fas fa-fire text-4xl text-gray-200 mb-4"></i><p class="text-gray-400 text-sm">Belum ada habits.</p></div>';return}
      const fq={daily:'Setiap Hari',weekday:'Sen-Jum','3x':'3x/Minggu'};
      l.innerHTML=habits.map(h=>'<div class="bg-white border border-gray-100 rounded-2xl p-5 flex items-center space-x-4 hover:shadow-md transition"><button onclick="toggleHabit('+h.id+')" class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition '+(h.done?'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20':'bg-gray-100 text-gray-400 hover:bg-gray-200')+'"><i class="fas '+(h.done?'fa-check':'fa-circle')+' text-sm"></i></button><div class="flex-1"><h3 class="font-bold text-gray-900 text-sm '+(h.done?'line-through opacity-60':'')+'">'+h.icon+' '+esc(h.name)+'</h3><p class="text-gray-400 text-xs">'+fq[h.freq]+'</p></div><div class="text-right"><div class="flex items-center space-x-1.5"><i class="fas fa-fire-flame-curved text-orange-500 text-sm"></i><span class="font-black text-gray-900">'+h.streak+'</span></div><p class="text-[10px] text-gray-400">streak</p></div><button onclick="delHabit('+h.id+')" class="text-gray-300 hover:text-red-500 transition"><i class="fas fa-trash text-xs"></i></button></div>').join('');
    }

    // ROADMAP
    function renderRoadmap(){
      const c=document.getElementById('roadmap-items');if(!goals.length){c.innerHTML='<div class="text-center py-16 pl-12"><p class="text-gray-400 text-sm">Tambahkan goals dulu.</p></div>';return}
      const cols=['brand','green','amber','purple','cyan'];
      c.innerHTML=goals.map((g,i)=>{const cl=cols[i%cols.length];return '<div class="relative pl-16"><div class="absolute left-4 top-1 w-5 h-5 bg-'+cl+'-500 rounded-full border-4 border-white shadow-lg"></div><div class="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition"><div class="flex items-center justify-between mb-2"><h3 class="font-bold text-gray-900">'+esc(g.title)+'</h3><span class="text-xs bg-'+cl+'-100 text-'+cl+'-700 px-3 py-1 rounded-full font-bold">'+g.progress+'%</span></div><p class="text-gray-500 text-sm mb-3">'+esc(g.desc)+'</p><div class="w-full bg-gray-100 rounded-full h-2 mb-3"><div class="bg-'+cl+'-500 h-2 rounded-full progress-bar" style="width:'+g.progress+'%"></div></div><div class="flex items-center space-x-4 text-xs text-gray-400"><span><i class="fas fa-calendar mr-1"></i>'+g.deadline+'</span><span><i class="fas fa-flag mr-1"></i>'+g.milestones.length+' Milestones</span></div></div></div>'}).join('');
    }

    // RESOURCES
    function renderResources(){
      document.getElementById('resources-grid').innerHTML=resources.map(r=>'<div class="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition cursor-pointer"><span class="text-3xl mb-3 block">'+r.icon+'</span><span class="text-[10px] bg-'+r.color+'-100 text-'+r.color+'-700 px-2 py-0.5 rounded-full font-bold uppercase">'+r.cat+'</span><h3 class="font-bold text-gray-900 mt-2 mb-1 text-sm">'+r.title+'</h3><p class="text-gray-500 text-xs">'+r.desc+'</p></div>').join('');
    }

    // INSIGHTS
    function renderInsights(){
      const tc={action:'blue',progress:'green',motivation:'amber',tip:'purple',review:'cyan'};
      document.getElementById('insights-list').innerHTML=insights.map(i=>'<div class="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition"><div class="flex items-start space-x-4"><span class="text-2xl">'+i.icon+'</span><div class="flex-1"><div class="flex items-center justify-between mb-1"><h3 class="font-bold text-gray-900 text-sm">'+i.title+'</h3><span class="text-xs text-gray-400">'+i.time+'</span></div><p class="text-gray-600 text-sm leading-relaxed">'+i.desc+'</p></div></div></div>').join('');
    }

    // SIDEBAR MOBILE
    document.getElementById('sidebar-toggle').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('hidden');document.getElementById('sidebar').classList.add('fixed','inset-y-0','left-0','z-50');document.getElementById('sidebar-overlay').classList.remove('hidden')});
    function closeSB(){document.getElementById('sidebar').classList.add('hidden');document.getElementById('sidebar').classList.remove('fixed','inset-y-0','left-0','z-50');document.getElementById('sidebar-overlay').classList.add('hidden')}

    function esc(t){const d=document.createElement('div');d.textContent=t;return d.innerHTML}
    document.getElementById('user-input').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,128)+'px'});
    renderGoals();renderHabits();
  </script>
</body>
</html>`

export default app
