# SparkMind V2 — AI Strategic Guide Platform

## Project Overview
- **Name**: SparkMind V2
- **Goal**: Platform AI yang menganalisis tantangan pengguna dan memberikan action plan strategis yang terukur
- **Niche**: Personal development, strategic planning, & productivity untuk pasar Indonesia
- **Built by**: PT Waskita Cakrawarti Digital

## URLs
- **Production**: https://sparkmind-v2.pages.dev
- **GitHub**: https://github.com/ganihypha/Sparkmind

## Fitur yang Sudah Dibangun

### Landing Page (`/`)
- Hero section dengan glassmorphism & animasi floating orbs
- Stats counter (5,000+ users, 25,000 strategi)
- 6 fitur unggulan dengan hover effects
- Pricing section (Gratis / Pro Rp79K / Enterprise)
- 3 Testimonial cards
- CTA section & footer lengkap
- Fully responsive (mobile-friendly)

### Dashboard App (`/app`)
- **AI Strategic Analyzer V2** — Chat interface, 8+ kategori: bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, default
- **SWOT Analyzer (NEW)** — Generate SWOT analysis untuk bisnis/ide
- **Goal Tracker Pro** — Tambah, track progress, milestone, hapus goals
- **Habit Tracker (NEW)** — Daily habits, streak counter, toggle check-in
- **Roadmap Builder** — Visualisasi timeline goals
- **Resource Library** — 12 framework strategis
- **Daily Insights** — 6 insight harian dipersonalisasi

### API Endpoints
| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/analyze` | AI strategic analysis (8+ kategori) |
| `POST` | `/api/swot` | Generate SWOT analysis |
| `GET` | `/api/resources` | Resource library list |
| `GET` | `/api/insights` | Daily insights list |
| `GET` | `/api/health` | Health check (v2.0.0) |

## Upgrade dari V1 ke V2
- AI Engine: 5 kategori -> 8+ kategori (+ mental health, relationship, default)
- Landing Page: redesign premium dengan glassmorphism
- SWOT Analyzer: fitur baru
- Habit Tracker: fitur baru
- Resource Library: 9 -> 12 framework
- Daily Insights: 5 -> 6 insights
- UI/UX: overall polish & micro-interactions

## Model Monetisasi
- **Starter (Gratis)**: 5 analysis/hari, 3 goals, resource library dasar
- **Pro (Rp 79K/bulan)**: Unlimited analysis, SWOT, unlimited goals & habits, full library
- **Enterprise (Custom)**: Team collaboration, custom AI, API access

## Tech Stack
- **Backend**: Hono (TypeScript) on Cloudflare Workers
- **Frontend**: TailwindCSS (CDN), Vanilla JS
- **Deployment**: Cloudflare Pages
- **VCS**: GitHub

## User Guide
1. Buka https://sparkmind-v2.pages.dev
2. Klik "Mulai Gratis" untuk masuk ke Dashboard
3. Gunakan AI Analyzer untuk analisis masalah (bisnis, karir, dll)
4. Gunakan SWOT Analyzer untuk analisis bisnis/ide
5. Track goals dan habits harian
6. Baca resource library untuk framework strategis

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: Active
- **Last Updated**: 2026-04-27
