# 09_README.md
# README v2.0
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

---

## 🚀 Quickstart

Deploy KuratorKas to Cloudflare in < 30 minutes.

### Prerequisites

- Cloudflare account
- Wrangler CLI installed
- Node.js 18+
- Git

### 1. Clone Repository

```bash
git clone https://github.com/sparkmind/kuratorkas.git
cd kuratorkas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Secrets

```bash
wrangler secret put JWT_SECRET
wrangler secret put OPENAI_API_KEY
wrangler secret put SHOPEE_CLIENT_ID
wrangler secret put SHOPEE_CLIENT_SECRET
# ... etc
```

### 4. Deploy to Cloudflare

```bash
# Deploy Workers
wrangler deploy

# Deploy Pages (Next.js)
cd dashboard
npm run deploy
```

### 5. Run Database Migrations

```bash
wrangler d1 migrations apply kuratorkas-prod
```

### 6. Verify Deployment

```bash
curl https://kuratorkas.com/api/health
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PRD v2](01_KURATORKAS_PRD_v2.md) | Product requirements |
| [Design Doc v2](02_KURATORKAS_DESIGN_DOC_v2.md) | UX/UI + System design |
| [Architecture v2](03_KURATORKAS_ARCHITECTURE_v2.md) | Cloudflare-native stack |
| [SM-TOD v2](04_KURATORKAS_SM_TOD_v2.md) | Sprint breakdown |
| [Curator-OS Spec](05_CURATOR_OS_SPEC_v1.md) | AI agent specifications |
| [Integration Map](06_INTEGRATION_MAP_v2.md) | Cross-brand ecosystem |
| [Execution Plan](07_EXECUTION_PLAN_v2.md) | 90-day roadmap |
| [Master Index](08_MASTER_INDEX.md) | Document index |

---

## 🏗️ Architecture

### Cloudflare-Native Stack

- **Workers**: Serverless functions at edge
- **Pages**: Next.js dashboard
- **D1**: SQLite database
- **KV**: Key-value cache
- **R2**: Object storage
- **Vectorize**: Vector database
- **Queues**: Task queue
- **Durable Objects**: Stateful data
- **AI Gateway**: LLM routing

---

## 🔧 Development

### Local Development

```bash
# Start local dev server
wrangler dev

# Start dashboard dev server
cd dashboard
npm run dev
```

### Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

---

## 📦 Deployment

### Staging

```bash
wrangler deploy --env staging
```

### Production

```bash
wrangler deploy --env production
```

---

## 🛡️ Security

- Zero Trust architecture
- RBAC (Role-Based Access Control)
- AES-256 encryption at rest
- TLS 1.3 in transit
- API rate limiting

---

## 📞 Support

- Documentation: [docs.kuratorkas.com](https://docs.kuratorkas.com)
- Issues: [GitHub Issues](https://github.com/sparkmind/kuratorkas/issues)
- Email: support@kuratorkas.com

---

**Owner**: Reza Estes / Haidar — Sovereign AI Dev  
**Doctrine**: Master-Architect v5.0 CANONICAL | 2026-05-19  
**Status**: EXECUTE-READY | PUBLIC-SAFE
