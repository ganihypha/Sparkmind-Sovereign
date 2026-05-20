# 03_KURATORKAS_ARCHITECTURE_v2.md
# Architecture Document v2.0
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

---

## 1. Architecture Overview

### 1.1 Design Philosophy

KuratorKas × Curator.OS dibangun dengan **Cloudflare-native stack** untuk memaksimalkan:
- **Global Edge Performance**: Deploy di 300+ edge locations
- **Serverless Scalability**: Auto-scale tanpa cold start issues
- **Cost Efficiency**: Pay-per-request model
- **Security**: Built-in DDoS protection, WAF, Zero Trust
- **AI-Native**: Vectorize, Workers AI, AI Gateway integration

### 1.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              KURATORKAS × CURATOR.OS                              │
│                              Cloudflare-Native Stack                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    LAYER 1: EDGE                                  │
│                              ┌─────────────────────┐                              │
│                              │   Cloudflare CDN    │                              │
│                              │   Static Assets     │                              │
│                              │   DDoS Protection   │                              │
│                              └─────────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  LAYER 2: ROUTING                               │
│                              ┌─────────────────────┐                              │
│                              │   Cloudflare        │                              │
│                              │   Workers (Edge)    │                              │
│                              │                     │                              │
│                              │  • API Gateway      │                              │
│                              │  • Rate Limiting    │                              │
│                              │  • Auth Middleware  │                              │
│                              │  • Request Routing  │                              │
│                              └─────────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 LAYER 3: APPLICATION                              │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   Next.js App       │  │   Workers           │  │   Workers           │        │
│  │   (Pages)           │  │   (API)             │  │   (Background)      │        │
│  │                     │  │                     │  │                     │        │
│  │  • Dashboard UI     │  │  • REST API         │  │  • Scraper Queue    │        │
│  │  • Component Lib    │  │  • GraphQL API      │  │  • Content Gen      │        │
│  │  • SSR/ISR          │  │  • Webhooks         │  │  • Trend Analysis   │        │
│  │                     │  │  • Cron Triggers    │  │  • Price Sync       │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  LAYER 4: DATA                                    │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   D1 (SQL)          │  │   KV (Key-Value)    │  │   R2 (Object)       │        │
│  │                     │  │                     │  │                     │        │
│  │  • Users            │  │  • Sessions         │  │  • Product Images   │        │
│  │  • Products         │  │  • Feature Flags    │  │  • Generated Content│        │
│  │  • Orders           │  │  • Trending Cache   │  │  • Scraper Cache    │        │
│  │  • Inventory        │  │  • Rate Limiting    │  │  • Backups          │        │
│  │  • Subscriptions    │  │                     │  │                     │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
│                                                                                   │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   Vectorize         │  │   Queues            │  │   Durable Objects   │        │
│  │   (Vector DB)       │  │   (Task Queue)      │  │   (Stateful)        │        │
│  │                     │  │                     │  │                     │        │
│  │  • Product          │  │  • Scraper Jobs     │  │  • Inventory Lock   │        │
│  │    Embeddings       │  │  • Content Jobs     │  │  • Live Pricing     │        │
│  │  • Style            │  │  • Trend Jobs       │  │  • Session State    │        │
│  │    Embeddings       │  │  • Price Jobs       │  │  • Real-time Sync   │        │
│  │  • Trend            │  │  • Marketplace Jobs │  │                     │        │
│  │    Embeddings       │  │                     │  │                     │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
│                                                                                   │
│  ┌─────────────────────┐                                                          │
│  │   AI Gateway        │                                                          │
│  │                     │                                                          │
│  │  • LLM Routing      │                                                          │
│  │  • Model Fallback   │                                                          │
│  │  • Cost Tracking    │                                                          │
│  │  • Observability    │                                                          │
│  │                     │                                                          │
│  └─────────────────────┘                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 LAYER 5: EXTERNAL                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   Shopee API        │  │   Tokopedia API     │  │   TikTok Shop API   │        │
│  │                     │  │                     │  │                     │        │
│  │  • Product Sync     │  │  • Product Sync     │  │  • Product Sync     │        │
│  │  • Order Ingest     │  │  • Order Ingest     │  │  • Order Ingest     │        │
│  │  • Inventory Update │  │  • Inventory Update │  │  • Inventory Update │        │
│  │  • Review Fetch     │  │  • Review Fetch     │  │  • Review Fetch     │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
│                                                                                   │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   TikTok API        │  │   Instagram API     │  │   OpenAI/Anthropic  │        │
│  │                     │  │                     │  │                     │        │
│  │  • Hashtag Scraping │  │  • Hashtag Scraping │  │  • LLM Inference    │        │
│  │  • Trend Detection  │  │  • Trend Detection  │  │  • Embedding Gen    │        │
│  │  • Video Analysis   │  │  • Post Analysis    │  │  • Image Gen        │        │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘        │
│                                                                                   │
│  ┌─────────────────────┐                                                          │
│  │   Payment Gateways  │                                                          │
│  │                     │                                                          │
│  │  • Xendit           │                                                          │
│  │  • Midtrans         │                                                          │
│  │  • QRIS             │                                                          │
│  └─────────────────────┘                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Cloudflare Services Binding

### 2.1 Workers

| Worker | Purpose | Triggers | Bindings |
|--------|---------|----------|----------|
| `api-gateway` | API routing, auth, rate limiting | HTTP requests | D1, KV, AI Gateway |
| `curator-agent` | AI Stylist, Content, Trend agents | HTTP, Cron | D1, Vectorize, AI Gateway |
| `marketplace-sync` | Marketplace integration | HTTP, Queue | D1, KV, External APIs |
| `scraper-worker` | TikTok/IG scraping | Queue, Cron | R2, Queues |
| `webhook-handler` | External webhook processing | HTTP | D1, Queues |
| `cron-worker` | Scheduled tasks | Cron | D1, KV, Queues |

### 2.2 Pages

| Page | Framework | ISR | Purpose |
|------|-----------|-----|---------|
| `dashboard` | Next.js App Router | 60s | Main dashboard UI |
| `landing` | Next.js App Router | 3600s | Marketing landing page |
| `docs` | Next.js App Router | 3600s | Documentation site |

### 2.3 D1 Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    business_name TEXT,
    business_type TEXT, -- 'retail', 'online', 'hybrid'
    subscription_tier TEXT DEFAULT 'free', -- 'free', 'starter', 'pro', 'enterprise'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- in IDR, store as integer (cents)
    cost_price INTEGER, -- for margin calculation
    category TEXT,
    subcategory TEXT,
    size TEXT,
    color TEXT,
    stock INTEGER DEFAULT 0,
    images TEXT, -- JSON array of image URLs
    marketplace_ids TEXT, -- JSON: {shopee: "id", tokopedia: "id", tiktok: "id"}
    embedding_id TEXT, -- Vectorize ID
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Orders Table
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    order_number TEXT NOT NULL,
    marketplace TEXT, -- 'shopee', 'tokopedia', 'tiktok', 'offline'
    marketplace_order_id TEXT,
    customer_name TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    total_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Outfits Table (AI Stylist)
CREATE TABLE outfits (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT,
    products TEXT NOT NULL, -- JSON array of product IDs
    total_price INTEGER,
    discount_percentage INTEGER,
    occasion TEXT, -- 'casual', 'formal', 'party', 'office'
    style TEXT, -- 'korean', 'streetwear', 'minimalist', etc.
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Content Table (Content Curator)
CREATE TABLE content (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL, -- 'instagram_post', 'carousel', 'tiktok', 'story'
    products TEXT, -- JSON array of product IDs
    caption TEXT,
    hashtags TEXT, -- JSON array
    carousel_layout TEXT, -- JSON for carousel structure
    scheduled_at DATETIME,
    posted_at DATETIME,
    status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'posted', 'failed'
    viral_score INTEGER, -- AI prediction
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Trends Table (Trend Curator)
CREATE TABLE trends (
    id TEXT PRIMARY KEY,
    hashtag TEXT NOT NULL,
    platform TEXT NOT NULL, -- 'tiktok', 'instagram'
    posts_count INTEGER,
    engagement_rate REAL,
    growth_rate REAL,
    related_products TEXT, -- JSON array of product categories
    detected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME -- when trend is no longer relevant
);

-- Price History Table (Pricing Curator)
CREATE TABLE price_history (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    old_price INTEGER,
    new_price INTEGER,
    reason TEXT, -- 'competitor_scan', 'demand_elasticity', 'flash_sale'
    confidence_score REAL,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Competitor Prices Table
CREATE TABLE competitor_prices (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    competitor_name TEXT,
    competitor_product_url TEXT,
    price INTEGER,
    marketplace TEXT,
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Marketplace Connections Table
CREATE TABLE marketplace_connections (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    marketplace TEXT NOT NULL, -- 'shopee', 'tokopedia', 'tiktok'
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    shop_id TEXT,
    shop_name TEXT,
    is_active BOOLEAN DEFAULT 1,
    connected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Activity Log Table
CREATE TABLE activity_log (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT, -- JSON
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_marketplace ON orders(marketplace);
CREATE INDEX idx_content_user_id ON content(user_id);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_trends_platform ON trends(platform);
CREATE INDEX idx_trends_expires_at ON trends(expires_at);
```

### 2.4 KV Namespace

| Key Pattern | Value | TTL | Purpose |
|-------------|-------|-----|---------|
| `session:{user_id}` | Session data | 7 days | User sessions |
| `feature:{feature_name}` | Boolean | - | Feature flags |
| `trending:hashtags` | JSON array | 1 hour | Cached trending hashtags |
| `rate_limit:{user_id}` | Request count | 1 hour | Rate limiting |
| `marketplace:sync:{user_id}` | Sync status | 5 min | Marketplace sync status |
| `ai_cache:{hash}` | AI response | 24 hours | AI response caching |

### 2.5 R2 Bucket Structure

```
Bucket: kuratorkas-assets
├── product-images/
│   ├── {user_id}/
│   │   ├── {product_id}-1.jpg
│   │   ├── {product_id}-2.jpg
│   │   └── ...
│   └── ...
├── generated-content/
│   ├── {user_id}/
│   │   ├── {content_id}-carousel-1.jpg
│   │   ├── {content_id}-carousel-2.jpg
│   │   └── ...
│   └── ...
├── scraped-cache/
│   ├── tiktok/
│   │   ├── {hashtag}-{timestamp}.json
│   │   └── ...
│   └── instagram/
│       ├── {hashtag}-{timestamp}.json
│       └── ...
└── backups/
    ├── d1-{date}.sql
    └── ...
```

### 2.6 Vectorize Collections

| Collection | Dimensions | Description |
|------------|------------|-------------|
| `product_embeddings` | 768 | Product image + description embeddings |
| `style_embeddings` | 768 | Style profile embeddings per user |
| `trend_embeddings` | 768 | Trend/hashtag embeddings |

### 2.7 Queues

| Queue | Purpose | Workers |
|-------|---------|---------|
| `scraper-queue` | TikTok/IG scraping jobs | scraper-worker |
| `content-queue` | Content generation jobs | curator-agent |
| `trend-queue` | Trend analysis jobs | curator-agent |
| `marketplace-queue` | Marketplace sync jobs | marketplace-sync |
| `price-queue` | Price optimization jobs | curator-agent |

### 2.8 Durable Objects

| Object | Purpose |
|--------|---------|
| `InventoryLock:{user_id}` | Real-time inventory locking |
| `LivePricing:{user_id}` | Real-time price ticker |
| `SessionState:{user_id}` | Real-time session state |

### 2.9 AI Gateway Configuration

```json
{
  "ai_gateway": {
    "providers": [
      {
        "name": "openai",
        "models": ["gpt-4o", "gpt-4o-mini", "text-embedding-3-large"],
        "priority": 1,
        "fallback": true
      },
      {
        "name": "anthropic",
        "models": ["claude-3-5-sonnet", "claude-3-haiku"],
        "priority": 2,
        "fallback": true
      },
      {
        "name": "workers-ai",
        "models": ["@cf/meta/llama-3.3-70b-instruct"],
        "priority": 3,
        "fallback": false
      }
    ],
    "rate_limits": {
      "requests_per_minute": 1000,
      "tokens_per_minute": 100000
    },
    "caching": {
      "enabled": true,
      "ttl": 3600
    },
    "observability": {
      "logging": true,
      "metrics": true,
      "cost_tracking": true
    }
  }
}
```

---

## 3. API Specification

### 3.1 REST API Endpoints

```yaml
# Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh

# Users
GET    /api/v1/users/me
PUT    /api/v1/users/me
DELETE /api/v1/users/me

# Products
GET    /api/v1/products
POST   /api/v1/products
GET    /api/v1/products/:id
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
POST   /api/v1/products/:id/embedding

# AI Stylist
POST   /api/v1/stylist/generate-outfit
GET    /api/v1/stylist/outfits
GET    /api/v1/stylist/outfits/:id
POST   /api/v1/stylist/outfits/:id/save
POST   /api/v1/stylist/outfits/:id/share

# Content Curator
POST   /api/v1/content/generate
GET    /api/v1/content
GET    /api/v1/content/:id
PUT    /api/v1/content/:id
DELETE /api/v1/content/:id
POST   /api/v1/content/:id/schedule
POST   /api/v1/content/:id/publish

# Trend Curator
GET    /api/v1/trends
GET    /api/v1/trends/hashtags
GET    /api/v1/trends/viral-products
GET    /api/v1/trends/forecast
POST   /api/v1/trends/alerts

# Pricing Curator
GET    /api/v1/pricing/recommendations
POST   /api/v1/pricing/scan-competitors
POST   /api/v1/pricing/apply-changes
GET    /api/v1/pricing/history

# Marketplace
GET    /api/v1/marketplace/connections
POST   /api/v1/marketplace/connections
DELETE /api/v1/marketplace/connections/:id
GET    /api/v1/marketplace/orders
POST   /api/v1/marketplace/orders/:id/process
GET    /api/v1/marketplace/inventory
POST   /api/v1/marketplace/sync
GET    /api/v1/marketplace/reviews

# Orders
GET    /api/v1/orders
GET    /api/v1/orders/:id
PUT    /api/v1/orders/:id
```

### 3.2 GraphQL Schema (Optional)

```graphql
type User {
  id: ID!
  email: String!
  name: String!
  businessName: String
  businessType: BusinessType
  subscriptionTier: SubscriptionTier!
  products: [Product!]!
  orders: [Order!]!
  createdAt: DateTime!
}

type Product {
  id: ID!
  name: String!
  description: String
  price: Int!
  stock: Int!
  category: String
  images: [String!]!
  isActive: Boolean!
  user: User!
}

type Order {
  id: ID!
  orderNumber: String!
  marketplace: Marketplace
  totalAmount: Int!
  status: OrderStatus!
  items: [OrderItem!]!
  user: User!
}

enum BusinessType {
  RETAIL
  ONLINE
  HYBRID
}

enum SubscriptionTier {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum Marketplace {
  SHOPEE
  TOKOPEDIA
  TIKTOK
  OFFLINE
}
```

---

## 4. Security Architecture

### 4.1 Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────────┐
│                         AUTH FLOW                               │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. JWT Token (Access + Refresh)                                │
│     - Access token: 15 minutes                                  │
│     - Refresh token: 7 days                                     │
│                                                                 │
│  2. OAuth2 for Marketplace Connections                          │
│     - Shopee OAuth2                                             │
│     - Tokopedia OAuth2                                          │
│     - TikTok Shop OAuth2                                        │
│                                                                 │
│  3. RBAC (Role-Based Access Control)                            │
│     - free: Basic POS, 100 products, 1 outlet                   │
│     - starter: + 1 marketplace, Basic AI Stylist                │
│     - pro: All features, unlimited products, 3 outlets          │
│     - enterprise: Custom features, dedicated support            │
│                                                                 │
│  4. API Rate Limiting                                           │
│     - Free: 100 req/hour                                        │
│     - Starter: 500 req/hour                                     │
│     - Pro: 2000 req/hour                                        │
│     - Enterprise: Custom                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Security

| Layer | Implementation |
|-------|----------------|
| Encryption at Rest | AES-256 for D1, R2 |
| Encryption in Transit | TLS 1.3 |
| API Security | Cloudflare WAF, Rate Limiting |
| Secrets Management | Cloudflare Secrets |
| Access Control | Zero Trust, RBAC |

### 4.3 Secrets Management

```json
{
  "secrets": [
    "JWT_SECRET",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "SHOPEE_CLIENT_ID",
    "SHOPEE_CLIENT_SECRET",
    "TOKOPEDIA_CLIENT_ID",
    "TOKOPEDIA_CLIENT_SECRET",
    "TIKTOK_SHOP_CLIENT_ID",
    "TIKTOK_SHOP_CLIENT_SECRET",
    "XENDIT_API_KEY",
    "MIDTRANS_SERVER_KEY",
    "MIDTRANS_CLIENT_KEY"
  ]
}
```

---

## 5. Deployment Architecture

### 5.1 Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Production | https://kuratorkas.com | Live application |
| Staging | https://staging.kuratorkas.com | Pre-production testing |
| Development | https://dev.kuratorkas.com | Development testing |

### 5.2 CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                      CI/CD PIPELINE                               │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. Code Push to GitHub                                         │
│     └── Trigger GitHub Actions                                   │
│                                                                 │
│  2. Build & Test                                                │
│     ├── Lint & Format                                            │
│     ├── Unit Tests                                               │
│     ├── Integration Tests                                        │
│     └── Build (Next.js, Workers)                                 │
│                                                                 │
│  3. Deploy to Staging                                           │
│     ├── Deploy Workers                                           │
│     ├── Deploy Pages                                             │
│     ├── Run D1 Migrations                                       │
│     └── Smoke Tests                                              │
│                                                                 │
│  4. Manual Approval for Production                              │
│     └── Require approval for production deploy                   │
│                                                                 │
│  5. Deploy to Production                                          │
│     ├── Deploy Workers                                           │
│     ├── Deploy Pages                                             │
│     ├── Run D1 Migrations                                        │
│     └── Health Checks                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Wrangler Configuration

```toml
# wrangler.toml
name = "kuratorkas"
compatibility_date = "2026-05-19"
compatibility_flags = ["nodejs_compat"]

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "kuratorkas-prod"
database_id = "..."

# KV Namespace
[[kv_namespaces]]
binding = "KV"
id = "..."

# R2 Bucket
[[r2_buckets]]
binding = "R2"
bucket_name = "kuratorkas-assets"

# Vectorize
[[vectorize]]
binding = "VECTORIZE"
index_name = "product-embeddings"

# AI Gateway
[ai]
binding = "AI"

# Queues
[[queues.producers]]
binding = "SCRAPER_QUEUE"
queue = "scraper-queue"

[[queues.consumers]]
queue = "scraper-queue"
max_batch_size = 10
max_batch_timeout = 30

# Durable Objects
[[durable_objects.bindings]]
name = "INVENTORY_LOCK"
class_name = "InventoryLock"

[[durable_objects.bindings]]
name = "LIVE_PRICING"
class_name = "LivePricing"

[[migrations]]
tag = "v1"
new_classes = ["InventoryLock", "LivePricing"]
```

---

## 6. Monitoring & Observability

### 6.1 Cloudflare Analytics

| Metric | Dashboard |
|--------|-----------|
| Requests | Cloudflare Dashboard |
| Errors | Cloudflare Dashboard |
| Latency | Cloudflare Dashboard |
| Workers CPU Time | Cloudflare Dashboard |

### 6.2 Custom Metrics

```javascript
// Example: Custom metrics in Workers
export default {
  async fetch(request, env, ctx) {
    const start = Date.now();
    
    // ... handle request ...
    
    const duration = Date.now() - start;
    
    // Send to analytics
    ctx.waitUntil(sendAnalytics({
      path: request.url.pathname,
      duration,
      status: response.status,
      user_id: getUserId(request),
    }));
    
    return response;
  }
};
```

### 6.3 Alerting

| Alert | Condition | Channel |
|-------|-----------|---------|
| High Error Rate | > 1% errors | Email, Slack |
| High Latency | > 500ms p95 | Email, Slack |
| Low Inventory | Stock < 5 | In-app, Email |
| Price Anomaly | Price change > 50% | In-app |
| AI Cost Spike | Daily cost > 2x avg | Email |

---

## 7. Cost Estimation

### 7.1 Cloudflare Costs (Monthly)

| Service | Usage | Cost |
|---------|-------|------|
| Workers | 10M requests | $5 |
| D1 | 1M rows | $0 (free tier) |
| KV | 1M reads | $0 (free tier) |
| R2 | 100GB | $0 (free tier) |
| Vectorize | 100K queries | $0 (free tier) |
| AI Gateway | 1M tokens | $10 |
| Pages | 100K requests | $0 |
| **Total** | | **~$15** |

### 7.2 External API Costs (Monthly)

| Service | Usage | Cost |
|---------|-------|------|
| OpenAI | 5M tokens | $50 |
| Shopee API | 100K calls | $0 |
| Tokopedia API | 100K calls | $0 |
| TikTok Shop API | 100K calls | $0 |
| **Total** | | **~$50** |

### 7.3 Total Estimated Cost

| Tier | Monthly Cost |
|------|--------------|
| Infrastructure | $65 |
| At 1,000 users | $65 |
| At 10,000 users | $500 |
| At 100,000 users | $5,000 |

---

## 8. Appendix

### 8.1 Glossary

- **ISR**: Incremental Static Regeneration
- **RTO**: Recovery Time Objective
- **RPO**: Recovery Point Objective
- **GMV**: Gross Merchandise Value
- **GMV**: Gross Merchandise Value

### 8.2 References

1. [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
2. [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
3. [Cloudflare Vectorize Documentation](https://developers.cloudflare.com/vectorize/)
4. [Cloudflare AI Gateway Documentation](https://developers.cloudflare.com/ai-gateway/)

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-05-15 | Haidar | Initial draft |
| 2.0 | 2026-05-19 | Reza Estes | Rebrand FashionKas → KuratorKas, Cloudflare-native stack |

**Owner**: Reza Estes / Haidar — Sovereign AI Dev  
**Doctrine**: Master-Architect v5.0 CANONICAL | 2026-05-19  
**Status**: EXECUTE-READY | PUBLIC-SAFE
