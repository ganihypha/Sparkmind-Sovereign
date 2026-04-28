# SparkMind V5.0 SOVEREIGN — AI Strategic Guide Platform

## Project Overview
- **Name**: SparkMind V5.0 SOVEREIGN
- **Goal**: Platform AI strategic guide untuk hidup berdaulat — 18+ kategori, semua tools produktivitas, semua data tersimpan aman.
- **Tagline**: "AI Strategic Guide Untuk Hidup Berdaulat"

## URLs
- **Production**: https://sparkmind-v2.pages.dev
- **Latest Deploy**: https://93679f2f.sparkmind-v2.pages.dev
- **GitHub**: https://github.com/ganihypha/Sparkmind
- **Sandbox Preview**: https://3000-ideav1knedfj5fuwv7pcu-2b54fc91.sandbox.novita.ai

## What's New in V5.0 SOVEREIGN (vs V4.0)

### Root Causes Fixed
| # | Issue (V4.0) | Fix (V5.0) |
|---|---|---|
| 1 | Chat history hilang saat pindah tab | ✅ Chat memory persist via localStorage |
| 2 | Mobile sidebar tidak smooth | ✅ Slide-in overlay + backdrop animation |
| 3 | Tidak ada backup data | ✅ Export/Import JSON full backup |
| 4 | Dashboard chart statis | ✅ Weekly activity trend chart 7-day |
| 5 | Pomodoro break alert lemah | ✅ Pomodoro V2 + auto-start + visual modal |
| 6 | `confirm()` browser native jelek | ✅ Smart delete modal (custom) |
| 7 | Journal mood selector bug | ✅ Mood selector fixed + edit/delete |
| 8 | Resource search lambat | ✅ Debounced search 300ms |
| 9 | Tidak ada keyboard shortcuts | ✅ Ctrl+K/1-9/D// shortcuts |
| 10 | Hanya 16 AI kategori | ✅ 18+ kategori (+spiritual, +side hustle) |

### New Features
- 💬 **Chat Memory Persist** — Percakapan AI tersimpan permanen
- 📱 **Mobile Sidebar Smooth** — Slide-in overlay + backdrop + auto-close
- 💾 **Backup & Restore JSON** — Full data export + import
- 📊 **Weekly Trend Chart** — Visualisasi 7 hari aktivitas
- 🍅 **Pomodoro V2** — Auto-start option + visual break alert + stats
- 🎯 **Smart Delete Modal** — Custom confirmation modal premium
- 🔍 **Debounced Search** — 300ms debounce, no lag
- ⌨️ **Keyboard Shortcuts** — Power user navigation
- 🕊️ **Spiritual & Faith** kategori AI baru
- 💼 **Side Hustle** kategori AI baru
- 🎨 **Command Palette** — Quick nav dengan ⌘K

## Functional URIs

### Pages
- `GET /` — Landing page V5.0 SOVEREIGN
- `GET /app` — Dashboard app dengan 12 tab (sidebar + main)

### API Endpoints
- `POST /api/analyze` — AI strategic analysis (body: `{message, mode?, history?}`)
- `POST /api/swot` — SWOT analyzer (body: `{business}`)
- `POST /api/coach` — AI Coach (body: `{goal, currentState, obstacles}`)
- `GET /api/resources` — Get 21+ frameworks
- `GET /api/insights` — Daily insights
- `GET /api/quotes` — Random motivational quote
- `GET /api/health` — Health check + version info

## Complete Feature List

### 12 Tabs in Dashboard
1. **📊 Dashboard** — Stats animated, weekly trend chart, quick actions, Pomodoro stats
2. **🧠 AI Analyzer** — Chat dengan 18+ kategori + memory persist
3. **🧭 AI Coach V5** — Personal coaching dengan blockers
4. **📊 SWOT** — Generate SWOT instan
5. **🍅 Pomodoro V2** — Focus 25/Break 5/Long 15 + auto-start + visual alert
6. **📓 Journal** — Mood tracker (6 moods) + edit + delete
7. **🎯 Goals** — Goal tracker dengan progress bar +/-10/Done
8. **🔥 Habits** — Habit tracker dengan streak counter
9. **🎨 Vision Board** — Big vision, 1Y, 3M, 1W
10. **📋 Weekly Review** — Wins, learnings, focus
11. **📚 Resources** — 21+ frameworks dengan debounced search & expandable
12. **⚙️ Settings** — Backup/Restore JSON + data stats + reset

### 18+ AI Categories
Bisnis · Karir · Tech & Skill · Finansial · Produktivitas · Mental Health · Relationship · Pendidikan · Health · Creative/Content · Leadership · Life Purpose/Ikigai · Networking · Parenting · Time Freedom · **Spiritual & Faith** (NEW) · **Side Hustle** (NEW) · Universal Default

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K` — Command palette / Quick search
- `⌘1-9` / `Ctrl+1-9` — Switch to tab 1-9
- `⌘D` / `Ctrl+D` — Toggle dark/light mode
- `⌘/` / `Ctrl+/` — Show shortcuts help
- `Esc` — Close modal / sidebar

## Data Architecture

### Storage Service
- **Browser localStorage** — Semua data tersimpan lokal & persistent
- **Cloudflare Pages** — Edge-deployed Hono backend (zero database)

### Data Models (LocalStorage Keys)
| Key | Type | Description |
|-----|------|-------------|
| `sm_goals_v5` | Array | Goals dengan id, title, progress |
| `sm_habits_v5` | Array | Habits dengan id, title, streak, lastCheck |
| `sm_journal_v5` | Array | Journal dengan id, text, mood, date |
| `sm_chat_v5` | Array | Chat history dengan role & content |
| `sm_vision_v5` | Object | Vision: big, y1, m3, w1 |
| `sm_review_v5` | Object | Review: wins, learnings, focus |
| `sm_pomo_v5` | Object | Pomodoro: sessions, totalMin |
| `sm_activity_v5` | Object | Activity log per tanggal (untuk trend chart) |
| `sm_focus_v5` | Number | Total focus minutes today |
| `sm_streak_v5` | Number | Current streak |
| `sm_theme_v5` | String | Theme preference (dark/light) |

### Backup Format
```json
{
  "version": "5.0",
  "exported": "2026-04-28T...",
  "goals": [...], "habits": [...], "journal": [...],
  "vision": {...}, "review": {...}, "chatHistory": [...],
  "pomoStats": {...}, "activityLog": {...}
}
```

## User Guide
1. **Buka app**: `/app` — langsung ke Dashboard
2. **Quick start**: Tekan `⌘K` untuk command palette
3. **AI Analyzer**: Tab `🧠` → ketik pertanyaan apa saja (chat memory tersimpan)
4. **Pomodoro**: Tab `🍅` → pilih Focus/Break/Long → Start
5. **Journal**: Tab `📓` → pilih mood → tulis → Save
6. **Backup**: Tab `⚙️` → Export JSON → Save file
7. **Restore**: Tab `⚙️` → Import JSON → confirm
8. **Theme**: Klik moon/sun icon header atau `⌘D`

## Not Yet Implemented (Future)
- Real LLM API integration (currently rule-based, ready for OpenAI/Anthropic plug-in)
- Cloud sync via Cloudflare D1 (currently localStorage only)
- Multi-user team workspace (Enterprise tier)
- Voice input untuk AI Analyzer
- Mobile native app (PWA installation)
- Notification API integration

## Recommended Next Steps
1. Plug-in real OpenAI/Anthropic API untuk AI engine yang lebih canggih
2. Tambah Cloudflare D1 untuk cloud sync
3. PWA manifest untuk install di home screen
4. Push notifications untuk Pomodoro & habit reminders
5. Multi-user collaboration features

## Deployment
- **Platform**: Cloudflare Pages
- **Project Name**: sparkmind-v2
- **Status**: ✅ Active & Live
- **Tech Stack**: Hono + TypeScript + TailwindCSS + Cloudflare Workers
- **Bundle Size**: 132.62 kB (compiled worker)
- **Last Updated**: 2026-04-28
- **Version**: 5.0.0 SOVEREIGN
