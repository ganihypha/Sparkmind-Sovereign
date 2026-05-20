# 06_INTEGRATION_MAP_v2.md
# Integration Map v2.0 — Cross-Brand SparkMind Ecosystem
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

---

## 1. Ecosystem Overview

### 1.1 SparkMind Sovereign Ecosystem

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         SPARKMIND SOVEREIGN ECOSYSTEM                              │
│                              Unified Data Plane                                    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              GOVERNANCE PLANE                                      │
│                              ┌─────────────────────┐                              │
│                              │   Sovereign         │                              │
│                              │   Governance        │                              │
│                              │                     │                              │
│                              │  • Master-Architect │                              │
│                              │  • Doctrine v5.0   │                              │
│                              │  • Identity (Auth)  │                              │
│                              │  • Billing          │                              │
│                              │  • Monitoring       │                              │
│                              │  • Analytics        │                              │
│                              └─────────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│ BARBERKAS         │ │ KURATORKAS        │ │ SOVEREIGN         │
│ (Kasir Barbershop)│ │ (Fashion Retail)  │ │ SPIRITUAL OS      │
│                   │ │                   │ │                   │
│ • POS System      │ │ • POS System      │ │ • Spiritual       │
│ • AI Stylist      │ │ • Curator.OS      │ │   Guidance        │
│ • Booking         │ │ • AI Stylist      │ │ • Meditation      │
│ • Inventory       │ │ • Content Gen     │ │ • Community       │
│ • Loyalty         │ │ • Trend Analysis  │ │ • Events          │
└───────────────────┘ └───────────────────┘ └───────────────────┘
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SHARED SERVICES                                       │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   Cloudflare        │  │   AI Gateway        │  │   Vectorize         │        │
│  │   Workers           │  │   (LLM Routing)     │  │   (Embeddings)      │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   D1 (Database)     │  │   KV (Cache)        │  │   R2 (Storage)      │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
│  ┌─────────────────────┐                                                          │
│  │   Queues            │                                                          │
│  │   (Task Queue)      │                                                          │
│  └─────────────────────┘                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow Architecture

### 2.1 Unified Identity

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              IDENTITY FLOW                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  1. User Registration                                                              │
│     └── User signs up via any SparkMind brand                                      │
│                                                                                    │
│  2. Identity Creation                                                              │
│     └── Create user in unified identity store (KV)                                 │
│                                                                                    │
│  3. Brand Association                                                                │
│     └── Associate user with brand(s)                                               │
│                                                                                    │
│  4. Cross-Brand Access                                                               │
│     └── User can access all associated brands with same credentials              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Billing Unification

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              BILLING FLOW                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  1. Subscription Management                                                        │
│     └── Unified billing dashboard                                                  │
│                                                                                    │
│  2. Cross-Brand Discounts                                                            │
│     └── Bundle pricing for multiple products                                       │
│                                                                                    │
│  3. Usage Tracking                                                                   │
│     └── Aggregate usage across all brands                                        │
│                                                                                    │
│  4. Invoice Generation                                                               │
│     └── Single invoice for all services                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Cross-Brand Integrations

### 3.1 KuratorKas ↔ BarberKas

| Integration | Purpose | Data Flow |
|-------------|---------|-----------|
| Shared Customer | Unified customer database | KuratorKas ↔ BarberKas ↔ Identity |
| Loyalty Points | Cross-brand loyalty program | KuratorKas → Loyalty → BarberKas |
| Referral Program | Cross-brand referrals | KuratorKas ↔ Referral → BarberKas |

### 3.2 KuratorKas ↔ Sovereign Spiritual OS

| Integration | Purpose | Data Flow |
|-------------|---------|-----------|
| Event Promotion | Fashion events promotion | KuratorKas → Events → Spiritual OS |
| Community | Fashion community | KuratorKas ↔ Community ↔ Spiritual OS |
| Content Sharing | Content cross-posting | KuratorKas → Content → Spiritual OS |

### 3.3 All Brands ↔ Shared Services

| Service | Usage | Access |
|---------|-------|--------|
| AI Gateway | LLM routing for all brands | Unified API key |
| Vectorize | Embeddings for all brands | Shared collections |
| D1 | Database per brand | Isolated schemas |
| KV | Cache for all brands | Key namespaced |
| R2 | Storage for all brands | Bucket per brand |

---

## 4. API Integration Matrix

### 4.1 Cross-Brand APIs

| API | KuratorKas | BarberKas | Spiritual OS |
|-----|------------|-----------|--------------|
| /auth/login | ✅ | ✅ | ✅ |
| /auth/register | ✅ | ✅ | ✅ |
| /auth/refresh | ✅ | ✅ | ✅ |
| /users/profile | ✅ | ✅ | ✅ |
| /users/subscriptions | ✅ | ✅ | ✅ |
| /billing/invoice | ✅ | ✅ | ✅ |
| /analytics/usage | ✅ | ✅ | ✅ |

### 4.2 Brand-Specific APIs

| API | KuratorKas | BarberKas | Spiritual OS |
|-----|------------|-----------|--------------|
| /products | ✅ | ❌ | ❌ |
| /orders | ✅ | ❌ | ❌ |
| /appointments | ❌ | ✅ | ❌ |
| /stylist | ✅ | ✅ | ❌ |
| /content | ✅ | ❌ | ❌ |
| /trends | ✅ | ❌ | ❌ |
| /pricing | ✅ | ❌ | ❌ |
| /marketplace | ✅ | ❌ | ❌ |
| /events | ❌ | ❌ | ✅ |
| /meditation | ❌ | ❌ | ✅ |
| /community | ❌ | ❌ | ✅ |

---

## 5. Data Sharing Agreement

### 5.1 Shared Data

| Data | Shared With | Purpose |
|------|-------------|---------|
| User Profile | All brands | Unified identity |
| Subscription | All brands | Billing unification |
| Usage Analytics | Governance | Platform analytics |
| Error Logs | Governance | Platform monitoring |

### 5.2 Isolated Data

| Data | Brand Only | Reason |
|------|------------|--------|
| Products | KuratorKas | Brand-specific |
| Orders | KuratorKas | Customer privacy |
| Content | KuratorKas | Brand-specific |
| Appointments | BarberKas | Brand-specific |
| Events | Spiritual OS | Brand-specific |

---

## 6. Security & Compliance

### 6.1 Cross-Brand Security

| Layer | Implementation |
|-------|----------------|
| Authentication | OAuth2 + JWT |
| Authorization | RBAC per brand |
| Data Encryption | AES-256 |
| API Security | Zero Trust |
| Audit Logging | Centralized |

### 6.2 Compliance

| Standard | Scope |
|----------|-------|
| GDPR | User data protection |
| PCI DSS | Payment data |
| SOC 2 | Platform security |
| ISO 27001 | Information security |

---

## 7. Migration Path

### 7.1 From FashionKas to KuratorKas

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MIGRATION PATH                                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  1. Data Export                                                                      │
│     └── Export FashionKas data (D1, KV, R2)                                      │
│                                                                                    │
│  2. Schema Migration                                                                 │
│     └── Transform to KuratorKas schema                                           │
│                                                                                    │
│  3. Data Import                                                                      │
│     └── Import to KuratorKas infrastructure                                      │
│                                                                                    │
│  4. DNS Cutover                                                                      │
│     └── Point fashionkas.com to kuratorkas.com                                   │
│                                                                                    │
│  5. User Migration                                                                   │
│     └── Migrate user accounts to unified identity                                │
│                                                                                    │
│  6. Feature Migration                                                                │
│     └── Migrate POS features to KuratorKas                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Migration Script

```bash
#!/bin/bash
# migration.sh

echo "Starting FashionKas → KuratorKas migration..."

# 1. Export FashionKas data
wrangler d1 export fashionkas-db --output=fashionkas-export.sql

# 2. Transform data
node transform-data.js \
  --input=fashionkas-export.sql \
  --output=kuratorkas-import.sql

# 3. Import to KuratorKas
wrangler d1 import kuratorkas-db --file=kuratorkas-import.sql

# 4. Migrate users
node migrate-users.js \
  --source=fashionkas-users.json \
  --target=kuratorkas-users.json

# 5. Migrate assets
wrangler r2 migrate \
  --source=fashionkas-assets \
  --target=kuratorkas-assets

echo "Migration complete!"
```

---

## 8. Appendix

### 8.1 Ecosystem Brands

| Brand | Domain | Purpose |
|-------|--------|---------|
| BarberKas | barberkas.com | Kasir barbershop |
| KuratorKas | kuratorkas.com | Kasir fashion retail |
| Sovereign Spiritual OS | spiritual.sovereign.co | Spiritual guidance |

### 8.2 Shared Services Endpoints

| Service | Endpoint |
|---------|----------|
| Identity | https://identity.sovereign.co |
| Billing | https://billing.sovereign.co |
| Analytics | https://analytics.sovereign.co |
| Monitoring | https://monitoring.sovereign.co |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-05-15 | Haidar | Initial draft |
| 2.0 | 2026-05-19 | Reza Estes | Rebrand FashionKas → KuratorKas |

**Owner**: Reza Estes / Haidar — Sovereign AI Dev  
**Doctrine**: Master-Architect v5.0 CANONICAL | 2026-05-19  
**Status**: EXECUTE-READY | PUBLIC-SAFE
