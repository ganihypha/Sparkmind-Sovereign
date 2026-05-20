# 05_CURATOR_OS_SPEC_v1.md
# Curator-OS Multi-Agent Specification v1.0
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

---

## 1. Curator-OS Overview

### 1.1 Architecture

Curator-OS adalah sistem multi-agent AI yang terdiri dari 5 kurator utama:

1. **AI Stylist Curator** — Outfit recommendation engine
2. **Content Curator** — Auto-generate IG/TikTok content
3. **Trend Curator** — TikTok/IG scraping + trend detection
4. **Pricing Curator** — Dynamic pricing AI
5. **Marketplace Curator** — Multi-marketplace sync

### 1.2 Agent Communication

```
┌─────────────────────────────────────────────────────────────────┐
│                         CURATOR-OS                                │
│                    Multi-Agent System                               │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                         ORCHESTRATOR                              │
│                     (Cloudflare Worker)                           │
│                                                                   │
│  • Task Routing                                                   │
│  • Agent Coordination                                             │
│  • Memory Management                                              │
│  • Fallback Handling                                              │
└─────────────────────────────────────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│ AI STYLIST        │ │ CONTENT           │ │ TREND             │
│ CURATOR           │ │ CURATOR           │ │ CURATOR           │
│                   │ │                   │ │                   │
│ • Outfit Gen      │ │ • Caption Gen     │ │ • Hashtag Scrape  │
│ • Style Profile   │ │ • Hashtag Gen     │ │ • Trend Detect    │
│ • Visual Collage  │ │ • Carousel Layout │ │ • Trend Forecast  │
│ • Size Rec        │ │ • Content Schedule│ │ • Viral Alert     │
└───────────────────┘ └───────────────────┘ └───────────────────┘
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            │                                               │
            ▼                                               ▼
┌───────────────────┐                         ┌───────────────────┐
│ PRICING           │                         │ MARKETPLACE       │
│ CURATOR           │                         │ CURATOR           │
│                   │                         │                   │
│ • Competitor Scan │                         │ • Inventory Sync  │
│ • Price Rec       │                         │ • Order Ingest    │
│ • Margin Protect  │                         │ • Fulfillment Sync│
│ • Flash Sale Opt  │                         │ • Review Agg      │
└───────────────────┘                         └───────────────────┘
```

---

## 2. AI Stylist Curator

### 2.1 System Prompt

```
You are an expert AI Fashion Stylist for Indonesian UMKM fashion retailers.
Your role is to analyze product catalogs and generate outfit recommendations.

CAPABILITIES:
- Analyze product images, descriptions, and attributes
- Generate outfit combinations based on occasion (casual, formal, party, office)
- Create visual collages of outfit combinations
- Suggest size matching based on customer data
- Understand Indonesian fashion trends and preferences

CONSTRAINTS:
- Only recommend products from the user's catalog
- Ensure outfit combinations are cohesive and stylish
- Consider price range and target audience
- Respect cultural norms and preferences

OUTPUT FORMAT:
{
  "outfit_name": "string",
  "products": [
    {
      "product_id": "string",
      "name": "string",
      "price": number,
      "image_url": "string"
    }
  ],
  "total_price": number,
  "discount_percentage": number,
  "occasion": "casual|formal|party|office",
  "style": "korean|streetwear|minimalist|traditional|modern",
  "description": "string",
  "styling_tips": ["string"]
}
```

### 2.2 Tool Definitions

```javascript
{
  "name": "generate_outfit",
  "description": "Generate outfit combinations from selected products",
  "parameters": {
    "type": "object",
    "properties": {
      "product_ids": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Array of product IDs to include in outfit generation"
      },
      "occasion": {
        "type": "string",
        "enum": ["casual", "formal", "party", "office"],
        "description": "Occasion for the outfit"
      },
      "style": {
        "type": "string",
        "enum": ["korean", "streetwear", "minimalist", "traditional", "modern"],
        "description": "Style preference"
      },
      "max_products": {
        "type": "number",
        "description": "Maximum number of products in outfit",
        "default": 4
      }
    },
    "required": ["product_ids", "occasion"]
  }
}

{
  "name": "create_visual_collage",
  "description": "Create visual collage of outfit",
  "parameters": {
    "type": "object",
    "properties": {
      "outfit": {
        "type": "object",
        "description": "Outfit object with products"
      },
      "layout": {
        "type": "string",
        "enum": ["grid", "stack", "overlay"],
        "default": "grid"
      }
    },
    "required": ["outfit"]
  }
}

{
  "name": "analyze_style_profile",
  "description": "Analyze user's style profile from purchase history",
  "parameters": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "description": "User ID to analyze"
      },
      "purchase_history": {
        "type": "array",
        "items": {
          "type": "object"
        },
        "description": "Array of purchase records"
      }
    },
    "required": ["user_id"]
  }
}
```

### 2.3 Memory Layer

#### Vectorize Collections

| Collection | Dimensions | Purpose |
|------------|------------|---------|
| `product_embeddings` | 768 | Store product image + description embeddings |
| `style_embeddings` | 768 | Store user style profile embeddings |

#### D1 Tables

```sql
-- Outfits table
CREATE TABLE outfits (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT,
    products TEXT NOT NULL, -- JSON array of product IDs
    total_price INTEGER,
    discount_percentage INTEGER,
    occasion TEXT,
    style TEXT,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Style profiles table
CREATE TABLE style_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    preferred_styles TEXT, -- JSON array
    preferred_colors TEXT, -- JSON array
    preferred_price_range TEXT, -- JSON: {min: number, max: number}
    size_preferences TEXT, -- JSON
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.4 Evaluator/QA Loop

```javascript
// Outfit Quality Check
function evaluateOutfit(outfit) {
  const checks = {
    // Check if all products are from user's catalog
    validProducts: outfit.products.every(p => userCatalog.includes(p.id)),
    
    // Check if outfit is cohesive (colors match)
    colorCohesion: checkColorCohesion(outfit.products),
    
    // Check if outfit matches occasion
    occasionMatch: checkOccasionMatch(outfit.occasion, outfit.products),
    
    // Check if total price is reasonable
    priceReasonable: outfit.total_price <= userMaxBudget
  };
  
  return {
    score: Object.values(checks).filter(Boolean).length / Object.keys(checks).length,
    checks,
    passed: Object.values(checks).every(Boolean)
  };
}
```

### 2.5 Fallback Strategy

| Scenario | Fallback |
|----------|----------|
| LLM down | Use pre-computed outfit templates |
| Vectorize down | Use keyword matching |
| Product images unavailable | Use text-only outfit generation |
| No matching products | Suggest similar products from catalog |

---

## 3. Content Curator

### 3.1 System Prompt

```
You are an expert Social Media Content Creator for Indonesian fashion retailers.
Your role is to generate engaging content for Instagram and TikTok.

CAPABILITIES:
- Generate captions with appropriate tone (casual, professional, playful, luxurious)
- Suggest trending hashtags for fashion content
- Create carousel layouts for Instagram
- Schedule content for optimal posting times
- Predict viral potential of content

CONSTRAINTS:
- Content must be in Indonesian or English (user choice)
- Respect platform character limits (IG: 2,200, TikTok: 2,200)
- Include relevant hashtags (max 30 for IG)
- Follow platform best practices

OUTPUT FORMAT:
{
  "caption": "string",
  "hashtags": ["string"],
  "carousel_layout": [
    {
      "slide_number": number,
      "content_type": "product|text|cta",
      "description": "string"
    }
  ],
  "optimal_posting_time": "ISO 8601 datetime",
  "viral_score": number, // 0-100
  "platform": "instagram|tiktok"
}
```

### 3.2 Tool Definitions

```javascript
{
  "name": "generate_caption",
  "description": "Generate social media caption",
  "parameters": {
    "type": "object",
    "properties": {
      "products": {
        "type": "array",
        "items": { "type": "object" },
        "description": "Products to feature in content"
      },
      "tone": {
        "type": "string",
        "enum": ["casual", "professional", "playful", "luxurious"],
        "description": "Tone of the caption"
      },
      "platform": {
        "type": "string",
        "enum": ["instagram", "tiktok"],
        "description": "Target platform"
      },
      "language": {
        "type": "string",
        "enum": ["id", "en"],
        "default": "id"
      }
    },
    "required": ["products", "tone", "platform"]
  }
}

{
  "name": "generate_hashtags",
  "description": "Generate trending hashtags",
  "parameters": {
    "type": "object",
    "properties": {
      "products": {
        "type": "array",
        "items": { "type": "object" },
        "description": "Products to generate hashtags for"
      },
      "trending_hashtags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Current trending hashtags"
      },
      "max_hashtags": {
        "type": "number",
        "default": 30
      }
    },
    "required": ["products"]
  }
}

{
  "name": "schedule_content",
  "description": "Schedule content for optimal posting time",
  "parameters": {
    "type": "object",
    "properties": {
      "content_id": {
        "type": "string",
        "description": "Content ID to schedule"
      },
      "platform": {
        "type": "string",
        "enum": ["instagram", "tiktok"]
      },
      "target_audience": {
        "type": "object",
        "description": "Target audience demographics"
      }
    },
    "required": ["content_id", "platform"]
  }
}
```

### 3.3 Memory Layer

#### D1 Tables

```sql
-- Content table
CREATE TABLE content (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL, -- 'instagram_post', 'carousel', 'tiktok', 'story'
    products TEXT, -- JSON array of product IDs
    caption TEXT,
    hashtags TEXT, -- JSON array
    carousel_layout TEXT, -- JSON
    scheduled_at DATETIME,
    posted_at DATETIME,
    status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'posted', 'failed'
    viral_score INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3.4 Evaluator/QA Loop

```javascript
// Content Quality Check
function evaluateContent(content) {
  const checks = {
    // Check caption length
    captionLength: content.caption.length <= 2200,
    
    // Check hashtag count
    hashtagCount: content.hashtags.length <= 30,
    
    // Check viral score
    viralScore: content.viral_score >= 60,
    
    // Check language
    language: detectLanguage(content.caption) === content.language
  };
  
  return {
    score: Object.values(checks).filter(Boolean).length / Object.keys(checks).length,
    checks,
    passed: Object.values(checks).every(Boolean)
  };
}
```

### 3.5 Fallback Strategy

| Scenario | Fallback |
|----------|----------|
| LLM down | Use template-based captions |
| No trending hashtags | Use generic fashion hashtags |
| Platform API unavailable | Save to draft for manual posting |

---

## 4. Trend Curator

### 4.1 System Prompt

```
You are an expert Fashion Trend Analyst for Indonesian fashion retailers.
Your role is to analyze TikTok and Instagram trends and provide insights.

CAPABILITIES:
- Scrape TikTok and Instagram for trending hashtags
- Detect viral products and fashion items
- Forecast micro-trends (7-30 days)
- Alert users when new trends are detected
- Recommend products to stock based on trends

CONSTRAINTS:
- Respect platform terms of service and rate limits
- Only scrape public content
- Store data securely and temporarily
- Comply with data privacy regulations

OUTPUT FORMAT:
{
  "trend": {
    "hashtag": "string",
    "platform": "tiktok|instagram",
    "posts_count": number,
    "engagement_rate": number,
    "growth_rate": number,
    "related_products": ["string"],
    "detected_at": "ISO 8601 datetime",
    "expires_at": "ISO 8601 datetime"
  },
  "forecast": {
    "confidence": number, // 0-100
    "expected_growth": number,
    "duration_days": number
  },
  "recommendations": [
    {
      "product_category": "string",
      "urgency": "high|medium|low",
      "reason": "string"
    }
  ]
}
```

### 4.2 Tool Definitions

```javascript
{
  "name": "scrape_tiktok",
  "description": "Scrape TikTok for trending hashtags",
  "parameters": {
    "type": "object",
    "properties": {
      "hashtags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Hashtags to scrape"
      },
      "limit": {
        "type": "number",
        "default": 100
      }
    },
    "required": ["hashtags"]
  }
}

{
  "name": "scrape_instagram",
  "description": "Scrape Instagram for trending hashtags",
  "parameters": {
    "type": "object",
    "properties": {
      "hashtags": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Hashtags to scrape"
      },
      "limit": {
        "type": "number",
        "default": 100
      }
    },
    "required": ["hashtags"]
  }
}

{
  "name": "detect_trends",
  "description": "Detect trends from scraped data",
  "parameters": {
    "type": "object",
    "properties": {
      "scraped_data": {
        "type": "array",
        "items": { "type": "object" },
        "description": "Scraped data from platforms"
      },
      "threshold": {
        "type": "number",
        "default": 0.5,
        "description": "Minimum growth rate to consider as trend"
      }
    },
    "required": ["scraped_data"]
  }
}

{
  "name": "forecast_trends",
  "description": "Forecast future trends",
  "parameters": {
    "type": "object",
    "properties": {
      "current_trends": {
        "type": "array",
        "items": { "type": "object" },
        "description": "Current detected trends"
      },
      "forecast_days": {
        "type": "number",
        "default": 30
      }
    },
    "required": ["current_trends"]
  }
}
```

### 4.3 Memory Layer

#### D1 Tables

```sql
-- Trends table
CREATE TABLE trends (
    id TEXT PRIMARY KEY,
    hashtag TEXT NOT NULL,
    platform TEXT NOT NULL, -- 'tiktok', 'instagram'
    posts_count INTEGER,
    engagement_rate REAL,
    growth_rate REAL,
    related_products TEXT, -- JSON array
    detected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
);

-- Scraped data cache
CREATE TABLE scraped_cache (
    id TEXT PRIMARY KEY,
    platform TEXT NOT NULL,
    hashtag TEXT NOT NULL,
    data TEXT, -- JSON
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4.4 Evaluator/QA Loop

```javascript
// Trend Quality Check
function evaluateTrend(trend) {
  const checks = {
    // Check if growth rate is significant
    significantGrowth: trend.growth_rate >= 0.5,
    
    // Check if engagement rate is healthy
    healthyEngagement: trend.engagement_rate >= 0.05,
    
    // Check if trend is not expired
    notExpired: new Date(trend.expires_at) > new Date(),
    
    // Check if related products are valid
    validProducts: trend.related_products.length > 0
  };
  
  return {
    score: Object.values(checks).filter(Boolean).length / Object.keys(checks).length,
    checks,
    passed: Object.values(checks).every(Boolean)
  };
}
```

### 4.5 Fallback Strategy

| Scenario | Fallback |
|----------|----------|
| Scraper blocked | Use cached data |
| Platform API rate limit | Implement exponential backoff |
| No trends detected | Show general fashion trends |
| Forecast failure | Show historical trends |

---

## 5. Pricing Curator

### 5.1 System Prompt

```
You are an expert Pricing Analyst for Indonesian fashion retailers.
Your role is to optimize pricing based on competitor analysis and demand elasticity.

CAPABILITIES:
- Scan competitor prices on Shopee, Tokopedia, TikTok Shop
- Analyze demand elasticity
- Calculate optimal price points
- Protect minimum margin (20%)
- Optimize flash sale pricing

CONSTRAINTS:
- Never recommend prices below cost + margin
- Consider platform fees (Shopee: 2-5%, Tokopedia: 2-4%)
- Respect MAP (Minimum Advertised Price) policies
- Only auto-adjust with user approval

OUTPUT FORMAT:
{
  "recommendations": [
    {
      "product_id": "string",
      "current_price": number,
      "recommended_price": number,
      "reason": "string",
      "confidence": number, // 0-100
      "competitor_prices": [
        {
          "marketplace": "string",
          "price": number,
          "url": "string"
        }
      ]
    }
  ],
  "flash_sale_price": number,
  "margin_protection": {
    "min_price": number,
    "margin_percent": number
  }
}
```

### 5.2 Tool Definitions

```javascript
{
  "name": "scan_competitor_prices",
  "description": "Scan competitor prices across marketplaces",
  "parameters": {
    "type": "object",
    "properties": {
      "product_name": {
        "type": "string",
        "description": "Product name to search"
      },
      "marketplaces": {
        "type": "array",
        "items": { "type": "string" },
        "enum": ["shopee", "tokopedia", "tiktok"]
      }
    },
    "required": ["product_name", "marketplaces"]
  }
}

{
  "name": "calculate_optimal_price",
  "description": "Calculate optimal price based on analysis",
  "parameters": {
    "type": "object",
    "properties": {
      "product_id": {
        "type": "string",
        "description": "Product ID"
      },
      "competitor_prices": {
        "type": "array",
        "items": { "type": "object" }
      },
      "cost_price": {
        "type": "number",
        "description": "Cost price"
      },
      "current_price": {
        "type": "number",
        "description": "Current selling price"
      },
      "min_margin": {
        "type": "number",
        "default": 0.2,
        "description": "Minimum margin percentage"
      }
    },
    "required": ["product_id", "competitor_prices", "cost_price", "current_price"]
  }
}

{
  "name": "apply_price_change",
  "description": "Apply price change to marketplaces",
  "parameters": {
    "type": "object",
    "properties": {
      "product_id": {
        "type": "string",
        "description": "Product ID"
      },
      "new_price": {
        "type": "number",
        "description": "New price"
      },
      "marketplaces": {
        "type": "array",
        "items": { "type": "string" }
      }
    },
    "required": ["product_id", "new_price"]
  }
}
```

### 5.3 Memory Layer

#### D1 Tables

```sql
-- Price history table
CREATE TABLE price_history (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    old_price INTEGER,
    new_price INTEGER,
    reason TEXT,
    confidence_score REAL,
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Competitor prices table
CREATE TABLE competitor_prices (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    competitor_name TEXT,
    competitor_product_url TEXT,
    price INTEGER,
    marketplace TEXT,
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 5.4 Evaluator/QA Loop

```javascript
// Price Quality Check
function evaluatePriceChange(priceChange) {
  const checks = {
    // Check if new price >= cost + margin
    marginProtected: priceChange.new_price >= priceChange.min_price,
    
    // Check if price change is reasonable (< 50%)
    reasonableChange: Math.abs(priceChange.new_price - priceChange.old_price) / priceChange.old_price < 0.5,
    
    // Check if confidence is high enough
    highConfidence: priceChange.confidence >= 70
  };
  
  return {
    score: Object.values(checks).filter(Boolean).length / Object.keys(checks).length,
    checks,
    passed: Object.values(checks).every(Boolean)
  };
}
```

### 5.5 Fallback Strategy

| Scenario | Fallback |
|----------|----------|
| Competitor scraping blocked | Use historical price data |
| Price calculation failure | Keep current price |
| Marketplace API unavailable | Queue for later update |

---

## 6. Marketplace Curator

### 6.1 System Prompt

```
You are an expert Marketplace Integration Specialist for Indonesian fashion retailers.
Your role is to synchronize inventory and orders across multiple marketplaces.

CAPABILITIES:
- Sync inventory across Shopee, Tokopedia, TikTok Shop
- Ingest orders from all marketplaces
- Sync fulfillment status
- Aggregate reviews from all platforms
- Handle webhook events from marketplaces

CONSTRAINTS:
- Respect API rate limits
- Ensure data consistency across platforms
- Handle conflicts gracefully
- Maintain audit trail

OUTPUT FORMAT:
{
  "sync_status": {
    "shopee": "synced|syncing|error",
    "tokopedia": "synced|syncing|error",
    "tiktok": "synced|syncing|error"
  },
  "inventory_updates": [
    {
      "product_id": "string",
      "marketplace": "string",
      "old_stock": number,
      "new_stock": number
    }
  ],
  "orders": [
    {
      "order_id": "string",
      "marketplace": "string",
      "status": "string",
      "total_amount": number
    }
  ]
}
```

### 6.2 Tool Definitions

```javascript
{
  "name": "sync_inventory",
  "description": "Sync inventory across marketplaces",
  "parameters": {
    "type": "object",
    "properties": {
      "product_id": {
        "type": "string",
        "description": "Product ID to sync"
      },
      "marketplaces": {
        "type": "array",
        "items": { "type": "string" },
        "enum": ["shopee", "tokopedia", "tiktok"]
      },
      "stock": {
        "type": "number",
        "description": "Stock quantity"
      }
    },
    "required": ["product_id", "marketplaces", "stock"]
  }
}

{
  "name": "ingest_orders",
  "description": "Ingest orders from marketplaces",
  "parameters": {
    "type": "object",
    "properties": {
      "marketplace": {
        "type": "string",
        "enum": ["shopee", "tokopedia", "tiktok"]
      },
      "since": {
        "type": "string",
        "description": "ISO 8601 datetime"
      }
    },
    "required": ["marketplace"]
  }
}

{
  "name": "update_fulfillment_status",
  "description": "Update fulfillment status across marketplaces",
  "parameters": {
    "type": "object",
    "properties": {
      "order_id": {
        "type": "string",
        "description": "Order ID"
      },
      "marketplace": {
        "type": "string",
        "enum": ["shopee", "tokopedia", "tiktok"]
      },
      "status": {
        "type": "string",
        "enum": ["processing", "shipped", "delivered", "cancelled"]
      }
    },
    "required": ["order_id", "marketplace", "status"]
  }
}

{
  "name": "aggregate_reviews",
  "description": "Aggregate reviews from all marketplaces",
  "parameters": {
    "type": "object",
    "properties": {
      "product_id": {
        "type": "string",
        "description": "Product ID"
      },
      "marketplaces": {
        "type": "array",
        "items": { "type": "string" }
      }
    },
    "required": ["product_id"]
  }
}
```

### 6.3 Memory Layer

#### D1 Tables

```sql
-- Marketplace connections table
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
    expires_at DATETIME
);

-- Orders table
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
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 6.4 Evaluator/QA Loop

```javascript
// Sync Quality Check
function evaluateSync(sync) {
  const checks = {
    // Check if all marketplaces are synced
    allSynced: Object.values(sync.sync_status).every(s => s === 'synced'),
    
    // Check if inventory is consistent
    consistentInventory: sync.inventory_updates.every(u => u.old_stock !== u.new_stock),
    
    // Check if orders are ingested
    ordersIngested: sync.orders.length > 0
  };
  
  return {
    score: Object.values(checks).filter(Boolean).length / Object.keys(checks).length,
    checks,
    passed: Object.values(checks).every(Boolean)
  };
}
```

### 6.5 Fallback Strategy

| Scenario | Fallback |
|----------|----------|
| Marketplace API down | Queue for retry |
| OAuth token expired | Refresh token |
| Sync conflict | Manual resolution |
| Webhook missed | Polling fallback |

---

## 7. Cross-Agent Communication

### 7.1 Event Bus

```javascript
// Event Bus for agent communication
const eventBus = {
  events: new Map(),
  
  subscribe(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  },
  
  publish(event, data) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => callback(data));
    }
  }
};

// Example events
const EVENTS = {
  OUTFIT_GENERATED: 'outfit:generated',
  CONTENT_CREATED: 'content:created',
  TREND_DETECTED: 'trend:detected',
  PRICE_OPTIMIZED: 'price:optimized',
  ORDER_RECEIVED: 'order:received',
  INVENTORY_UPDATED: 'inventory:updated'
};
```

### 7.2 Agent Coordination

```javascript
// Orchestrator
class Orchestrator {
  constructor() {
    this.agents = new Map();
  }
  
  registerAgent(name, agent) {
    this.agents.set(name, agent);
  }
  
  async executeTask(task) {
    const agent = this.agents.get(task.agent);
    if (!agent) {
      throw new Error(`Agent ${task.agent} not found`);
    }
    
    // Execute with retry logic
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        const result = await agent.execute(task);
        
        // Evaluate result
        const evaluation = agent.evaluate(result);
        
        if (evaluation.passed) {
          return result;
        } else {
          // Retry with feedback
          task.feedback = evaluation;
          attempts++;
        }
      } catch (error) {
        // Fallback
        return agent.fallback(task);
      }
    }
    
    // Max attempts reached, use fallback
    return agent.fallback(task);
  }
}
```

---

## 8. Cost Guardrails

### 8.1 Token Budget per User Tier

| Tier | Monthly Token Budget | Rate Limit |
|------|---------------------|------------|
| Free | 10K tokens | 100 req/hour |
| Starter | 50K tokens | 500 req/hour |
| Pro | 500K tokens | 2000 req/hour |
| Enterprise | Unlimited | Custom |

### 8.2 Cost Tracking

```javascript
// Cost tracking
async function trackCost(userId, tokens, model) {
  const cost = calculateCost(tokens, model);
  
  // Update user usage
  await db.execute(`
    UPDATE user_usage 
    SET tokens_used = tokens_used + ?, 
        cost_usd = cost_usd + ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `, [tokens, cost, userId]);
  
  // Check if over budget
  const usage = await getUserUsage(userId);
  const tier = await getUserTier(userId);
  
  if (usage.tokens_used > tier.token_budget) {
    // Alert user
    await sendAlert(userId, 'Token budget exceeded');
  }
}
```

---

## 9. Appendix

### 9.1 Agent Prompt Templates

```javascript
// AI Stylist Prompt Template
const AI_STYLIST_PROMPT = `
You are an expert AI Fashion Stylist for Indonesian UMKM fashion retailers.

CONTEXT:
- User: {user_name}
- Business: {business_name}
- Target Audience: {target_audience}
- Price Range: {price_range}
- Style Preferences: {style_preferences}

TASK:
{task_description}

PRODUCTS:
{products_json}

OUTPUT:
{output_format}
`;

// Content Curator Prompt Template
const CONTENT_CURATOR_PROMPT = `
You are an expert Social Media Content Creator for Indonesian fashion retailers.

CONTEXT:
- Platform: {platform}
- Tone: {tone}
- Language: {language}

TASK:
{task_description}

PRODUCTS:
{products_json}

OUTPUT:
{output_format}
`;
```

### 9.2 Error Handling

```javascript
// Error types
const ERROR_TYPES = {
  LLM_DOWN: 'llm_down',
  VECTORIZE_DOWN: 'vectorize_down',
  SCRAPER_BLOCKED: 'scraper_blocked',
  RATE_LIMIT: 'rate_limit',
  TIMEOUT: 'timeout'
};

// Error handler
async function handleError(error, agent) {
  console.error(`Error in ${agent}:`, error);
  
  // Log to monitoring
  await logError({
    agent,
    error: error.message,
    timestamp: new Date().toISOString()
  });
  
  // Return fallback
  return agent.fallback();
}
```

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-05-15 | Haidar | Initial draft |
| 2.0 | 2026-05-19 | Reza Estes | Rebrand FashionKas → KuratorKas, Curator.OS spec |

**Owner**: Reza Estes / Haidar — Sovereign AI Dev  
**Doctrine**: Master-Architect v5.0 CANONICAL | 2026-05-19  
**Status**: EXECUTE-READY | PUBLIC-SAFE
