# 01_KURATORKAS_PRD_v2.md
# Product Requirements Document v2.0
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

---

## 1. Executive Summary

**KuratorKas** adalah rebrand penuh dari FashionKas menjadi produk terpisah di bawah SparkMind Sovereign Ecosystem. Platform ini menggabungkan fungsionalitas kasir digital (POS) dengan **Curator.OS** — sebuah sistem multi-agent AI yang menyediakan outfit recommendation, content generation, trend detection, dynamic pricing, dan marketplace synchronization untuk UMKM fashion retail di Indonesia.

### 1.1 Vision Statement
> "Setiap UMKM fashion di Indonesia berhak memiliki AI Stylist pribadi yang memahami katalog produk mereka, mengikuti tren terkini, dan menghasilkan konten yang menjual — semua dalam satu platform."

### 1.2 Objectives

| Objective | Target | Success Metric |
|-----------|--------|----------------|
| Launch MVP | Q2 2026 | 5 Curator modules live |
| Active Users | End 2026 | 1,000 UMKM fashion sellers |
| GMV Processed | End 2026 | Rp 50 billion |
| NPS Score | End 2026 | > 50 |
| Marketplace Sync | End 2026 | Shopee, Tokopedia, TikTok Shop |

### 1.3 Scope In/Out

**In Scope (MVP):**
- AI Stylist Curator: Outfit recommendation engine
- Content Curator: Auto-generate IG/TikTok posts
- Trend Curator: TikTok/IG scraping + trend detection
- Pricing Curator: Dynamic pricing AI
- Marketplace Curator: Shopee/Tokopedia/TikTok Shop sync

**Out of Scope (Post-MVP):**
- WhatsApp Business agent
- Live Commerce module
- B2B wholesale curator
- AR/VR try-on

---

## 2. Market Analysis

### 2.1 Indonesia Digital Retail Landscape

Berdasarkan riset [Sellercraft](https://sellercraft.co/indonesia-digital-retail-outlook-2025-2026/), Indonesia digital retail market diproyeksikan melebihi **US$100 miliar pada 2026**, tumbuh ~19% annually [Source](https://sellercraft.co/indonesia-digital-retail-outlook-2025-2026/).

Key trends:
- **Social Shopping**: TikTok dan Instagram menjadi platform discovery utama
- **BNPL Adoption**: >40% online shoppers menggunakan Kredivo/Akulaku
- **Discount-Driven**: Flash sale, cashback, free shipping mempengaruhi conversion
- **Mobile-First**: E-commerce apps menjadi aplikasi paling sering digunakan
- **Halal Assurance**: Preferensi produk halal certified

### 2.2 Fashion Category

Fashion menyumbang **~16% dari total transaksi e-commerce Indonesia** [Source](https://sellercraft.co/indonesia-digital-retail-outlook-2025-2026/), menjadikannya kategori terbesar setelah Electronics & Gadgets (20%).

### 2.3 Competitor Analysis

#### POS/Kasir Software Indonesia:

| Competitor | Price | Key Features | Gap Analysis |
|------------|-------|--------------|--------------|
| Moka POS | IDR 299K/month | E-commerce integration, BCA discount | No AI features |
| Olsera | IDR 128-298K/month | Multi-platform, white-label website | No content generation |
| Pawoon | Free-IDR 299K/month | Lifetime free tier, online orders | No trend detection |
| Kasir Pintar | IDR 55K/month | Affordable, basic POS | No AI styling |
| Majoo | IDR 149-599K/month | Comprehensive features | No marketplace sync |

[Source](https://hitpayapp.com/blog/pos-system-indonesia-comparison)

#### AI Stylist Landscape:

| Competitor | Model | Key Differentiator |
|------------|-------|-------------------|
| Stitch Fix | Subscription + Human stylist | GenAI-powered Style Visualization [Source](https://investors.stitchfix.com/news-events/press-releases/news-details/2025/Stitch-Fix-Introduces-Stitch-Fix-Vision-a-GenAI-Powered-Style-Visualization-Experience-10-06-2025/default.aspx) |
| Lyst | Marketplace + AI search | Global fashion aggregation |
| The Yes | AI-powered shopping | Acquired by Pinterest |

**KuratorKas Differentiation:**
- First AI Stylist + POS integration for Indonesian UMKM
- Localized for Indonesian fashion trends
- Multi-marketplace sync (Shopee, Tokopedia, TikTok Shop)
- Content generation for IG/TikTok
- Dynamic pricing based on local competition

---

## 3. User Personas

### 3.1 Primary Persona: UMKM Fashion Owner

**Name:** Sari
**Age:** 32
**Location:** Bandung
**Business:** Butik baju wanita offline + online
**Team:** 2-3 karyawan

**Pain Points:**
- Susah mengikuti tren fashion terkini
- Tidak punya waktu buat konten IG/TikTok
- Harga sering salah — terlalu mahal ga laku, terlalu murah rugi
- Inventory sync manual antar marketplace (Shopee, Tokopedia, TikTok)
- Tidak tahu outfit matching untuk upsell

**Goals:**
- Meningkatkan omzet 30% dalam 6 bulan
- Mengurangi waktu manajemen 50%
- Punya konten sosial media yang konsisten

### 3.2 Secondary Persona: Content Creator-Seller

**Name:** Dani
**Age:** 25
**Location:** Jakarta
**Business:** Thrifting + curated fashion
**Platform:** TikTok Shop + Instagram

**Pain Points:**
- Ribet buat caption dan hashtag
- Susah nentuin harga kompetitif
- Butuh ide konten yang viral

**Goals:**
- Viral di TikTok
- Scaling dari 100 ke 1000 order/bulan

### 3.3 Tertiary Persona: Multi-Markplace Seller

**Name:** Budi
**Age:** 45
**Location:** Surabaya
**Business:** Fashion grosir
**Channel:** Shopee + Tokopedia + TikTok Shop + Offline

**Pain Points:**
- Inventory mismatch antar platform
- Order processing manual
- Report consolidation ribet

**Goals:**
- Inventory real-time sync
- Automated order processing
- Unified reporting

---

## 4. User Stories

### 4.1 AI Stylist Curator

```
Sebagai UMKM fashion owner,
Saya ingin AI merekomendasikan outfit matching dari katalog produk saya,
Sehingga saya bisa upsell dan cross-sell ke customer.

Acceptance Criteria:
- AI menganalisis katalog produk (foto, deskripsi, harga, kategori)
- Generate outfit combinations berdasarkan occasion (casual, formal, party)
- Tampilkan visualisasi outfit (collage/card)
- Suggest size matching berdasarkan data penjualan
```

### 4.2 Content Curator

```
Sebagai content creator-seller,
Saya ingin AI generate caption dan hashtag untuk IG/TikTok,
Sehingga saya bisa posting consistently tanpa writer's block.

Acceptance Criteria:
- Generate caption dengan tone yang bisa dipilih (casual, professional, playful)
- Auto-generate hashtag berdasarkan tren dan produk
- Suggest carousel layout untuk IG
- Schedule posting optimal time
- Integration dengan IG/TikTok API (jika available)
```

### 4.3 Trend Curator

```
Sebagai UMKM fashion owner,
Saya ingin tahu tren fashion terkini di TikTok/Instagram,
Sehingga saya bisa stock barang yang lagi viral.

Acceptance Criteria:
- Scrape TikTok/IG untuk hashtag fashion trending
- Detect viral products dan fashion items
- Forecast micro-trends (7-30 hari)
- Alert ketika ada tren baru
- Rekomendasi produk untuk di-stock
```

### 4.4 Pricing Curator

```
Sebagai UMKM fashion owner,
Saya ingin AI menentukan harga optimal,
Sehingga saya tetap kompetitif tapi tetap profit.

Acceptance Criteria:
- Scan competitor price di Shopee/Tokopedia/TikTok Shop
- Analyze demand elasticity
- Calculate margin protection (min 20%)
- Flash sale optimizer
- Auto-adjust price (optional, dengan approval)
```

### 4.5 Marketplace Curator

```
Sebagai multi-marketplace seller,
Saya ingin inventory dan order sync otomatis antar platform,
Sehingga saya nggak oversell atau miss order.

Acceptance Criteria:
- Real-time inventory sync Shopee ↔ Tokopedia ↔ TikTok Shop
- Unified order inbox
- Auto-update stock ketika ada order
- Fulfillment status sync
- Review aggregation dari semua platform
```

---

## 5. Functional Requirements

### 5.1 Core POS Features (Legacy FashionKas)

- Transaction processing (cash, card, QRIS)
- Inventory management
- Multi-outlet support
- Receipt printing
- Basic reporting (sales, inventory, profit)
- Customer database

### 5.2 Curator.OS Features

#### 5.2.1 AI Stylist Curator

| Feature | Priority | Description |
|---------|----------|-------------|
| Product Embedding | P0 | Generate vector embeddings untuk setiap produk |
| Style Profile | P0 | Create user style profile dari purchase history |
| Outfit Generation | P0 | Generate outfit combinations dari katalog |
| Visual Collage | P1 | Create visual outfit collage |
| Size Recommendation | P1 | Suggest size berdasarkan data |

#### 5.2.2 Content Curator

| Feature | Priority | Description |
|---------|----------|-------------|
| Caption Generator | P0 | Auto-generate caption dengan tone selection |
| Hashtag Generator | P0 | Generate trending hashtags |
| Carousel Layout | P1 | Suggest IG carousel layout |
| Content Calendar | P1 | Schedule and manage content calendar |
| Viral Score | P2 | Predict viral potential of content |

#### 5.2.3 Trend Curator

| Feature | Priority | Description |
|---------|----------|-------------|
| Hashtag Scraping | P0 | Scrape TikTok/IG hashtags |
| Trend Detection | P0 | Detect trending products/fashion |
| Micro-trend Forecast | P1 | Forecast 7-30 day trends |
| Alert System | P1 | Notify when new trend detected |
| Stock Recommendation | P2 | Suggest products to stock |

#### 5.2.4 Pricing Curator

| Feature | Priority | Description |
|---------|----------|-------------|
| Competitor Scan | P0 | Scan competitor prices |
| Demand Analysis | P0 | Analyze demand elasticity |
| Price Recommendation | P0 | Suggest optimal price |
| Margin Protection | P1 | Ensure min 20% margin |
| Flash Sale Optimizer | P1 | Optimize flash sale pricing |

#### 5.2.5 Marketplace Curator

| Feature | Priority | Description |
|---------|----------|-------------|
| Inventory Sync | P0 | Real-time inventory sync |
| Order Ingest | P0 | Unified order inbox |
| Stock Update | P0 | Auto-update stock on order |
| Fulfillment Sync | P1 | Sync fulfillment status |
| Review Aggregation | P1 | Aggregate reviews from all platforms |

---

## 6. Non-Functional Requirements

### 6.1 Performance

- Page load time < 2 seconds
- API response time < 500ms (p95)
- Concurrent users: 1,000 (MVP)
- AI generation time < 5 seconds

### 6.2 Security

- Zero Trust architecture
- RBAC (Role-Based Access Control)
- Data encryption at rest (AES-256)
- Data encryption in transit (TLS 1.3)
- API rate limiting
- SOC 2 Type II compliance (post-MVP)

### 6.3 Scalability

- Cloudflare-native auto-scaling
- D1 read replication for multi-region
- Vectorize for semantic search
- Queues for background processing

### 6.4 Reliability

- 99.9% uptime SLA
- Automated failover
- Daily backups
- Disaster recovery RTO < 4 hours

---

## 7. Success Metrics

### 7.1 North Star Metric

**GMV (Gross Merchandise Value) Processed**

### 7.2 Secondary Metrics

| Metric | Target (6 months) | Target (12 months) |
|--------|-------------------|--------------------|
| Active Users | 500 | 1,000 |
| Monthly Transactions | 10,000 | 50,000 |
| Average Transaction Value | Rp 250,000 | Rp 300,000 |
| Content Generated | 5,000 | 25,000 |
| Trend Alerts | 100/week | 500/week |
| Pricing Optimizations | 1,000 | 5,000 |
| NPS Score | 40 | 50 |
| Churn Rate | < 10% | < 5% |

### 7.3 Technical Metrics

| Metric | Target |
|--------|--------|
| API Uptime | 99.9% |
| API Latency (p95) | < 500ms |
| AI Generation Time | < 5s |
| Error Rate | < 0.1% |

---

## 8. Monetization Strategy

### 8.1 Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | Rp 0/month | Basic POS, 100 products, 1 outlet, manual marketplace sync |
| **Starter** | Rp 149,000/month | Basic POS, 500 products, 1 outlet, 1 marketplace sync, Basic AI Stylist |
| **Pro Curator** | Rp 299,000/month | Full POS, unlimited products, 3 outlets, 3 marketplace sync, All 5 Curator modules |
| **Enterprise** | Custom | Unlimited everything, custom AI training, dedicated support, SLA |

### 8.2 Revenue Streams

1. **Subscription Revenue**: Monthly recurring dari Pro Curator tier
2. **Transaction Fee**: 0.5-1% dari GMV (optional)
3. **Marketplace Commission**: Revenue share dari Shopee/Tokopedia/TikTok Shop (jika ada partnership)
4. **Ad Credit**: Top-up untuk promoted listing

### 8.3 Unit Economics

| Metric | Value |
|--------|-------|
| CAC | Rp 150,000 |
| LTV | Rp 2,400,000 (8-month retention) |
| Gross Margin | 70% |
| Payback Period | 1.5 months |

---

## 9. Go-to-Market Strategy

### 9.1 Target Market

- Primary: UMKM fashion retail di Bandung, Jakarta, Surabaya
- Secondary: Content creator-seller di TikTok/Instagram
- Tertiary: Multi-marketplace seller dengan 3+ channel

### 9.2 Acquisition Channels

| Channel | Strategy | Budget |
|---------|----------|--------|
| TikTok Ads | Influencer collaboration, product showcase | Rp 50M/month |
| Google Ads | Search ads for "aplikasi kasir fashion" | Rp 20M/month |
| Partnership | Integration with Shopee/Tokopedia | Rp 10M/month |
| Referral | Referral program for existing users | Rp 5M/month |

### 9.3 Launch Timeline

| Phase | Date | Activity |
|-------|------|----------|
| Alpha | Q2 2026 | 10 beta users, internal testing |
| Beta | Q3 2026 | 100 early access users |
| Public Launch | Q4 2026 | General availability |
| Scale | Q1 2027 | Marketing push, partnerships |

---

## 10. Appendix

### 10.1 Glossary

- **UMKM**: Usaha Mikro, Kecil, dan Menengah
- **GMV**: Gross Merchandise Value
- **POS**: Point of Sale
- **BNPL**: Buy Now Pay Later
- **RTO**: Recovery Time Objective

### 10.2 References

1. [Sellercraft Indonesia Digital Retail Outlook 2025-2026](https://sellercraft.co/indonesia-digital-retail-outlook-2025-2026/)
2. [HitPay POS System Indonesia Comparison](https://hitpayapp.com/blog/pos-system-indonesia-comparison)
3. [Stitch Fix Vision GenAI Press Release](https://investors.stitchfix.com/news-events/press-releases/news-details/2025/Stitch-Fix-Introduces-Stitch-Fix-Vision-a-GenAI-Powered-Style-Visualization-Experience-10-06-2025/default.aspx)
4. [Forbes Stitch Fix AI Article](https://www.forbes.com/sites/bernardmarr/2024/03/08/how-stitch-fix-is-using-generative-ai-to-help-us-dress-better/)

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-05-15 | Haidar | Initial draft |
| 2.0 | 2026-05-19 | Reza Estes | Rebrand FashionKas → KuratorKas, Curator.OS spec |

**Owner**: Reza Estes / Haidar — Sovereign AI Dev  
**Doctrine**: Master-Architect v5.0 CANONICAL | 2026-05-19  
**Status**: EXECUTE-READY | PUBLIC-SAFE
