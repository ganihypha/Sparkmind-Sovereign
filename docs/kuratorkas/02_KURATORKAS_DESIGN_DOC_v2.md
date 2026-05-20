# 02_KURATORKAS_DESIGN_DOC_v2.md
# Design Document v2.0 — UX/UI + System Design
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

---

## 1. Design Philosophy

### 1.1 Design Principles

1. **Sovereign Elegance**: Dark, sophisticated aesthetic with gold accents
2. **AI-Native Interface**: Interface yang memandu user melalui AI agents
3. **Mobile-First**: Dominant mobile usage di Indonesia
4. **Localization**: Bahasa Indonesia default, support local payment methods
5. **Progressive Disclosure**: Fitur kompleks disembunyikan hingga diperlukan

### 1.2 Design System: Dark Sovereign Theme

```
COLOR PALETTE
├── Background: #0A0A0F (Deep Void)
├── Surface: #12121A (Dark Surface)
├── Surface Elevated: #1E1E2A (Elevated)
├── Border: #2A2A3A (Subtle Border)
├── Text Primary: #FFFFFF (Pure White)
├── Text Secondary: #A0A0B0 (Muted)
├── Accent Gold: #D4AF37 (Sovereign Gold)
├── Accent Purple: #8B5CF6 (AI Purple)
├── Accent Green: #10B981 (Success)
├── Accent Red: #EF4444 (Error)
└── Accent Orange: #F59E0B (Warning)
```

### 1.3 Typography

| Hierarchy | Font | Size | Weight | Usage |
|-----------|------|------|--------|-------|
| H1 | Inter | 32px | 700 | Page titles |
| H2 | Inter | 24px | 600 | Section headers |
| H3 | Inter | 20px | 600 | Card titles |
| Body | Inter | 16px | 400 | Paragraph text |
| Small | Inter | 14px | 400 | Labels, captions |
| Tiny | Inter | 12px | 400 | Timestamps, metadata |

### 1.4 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight gaps |
| sm | 8px | Button padding |
| md | 16px | Card padding |
| lg | 24px | Section gaps |
| xl | 32px | Page padding |
| 2xl | 48px | Major sections |

---

## 2. User Flows

### 2.1 Onboarding Flow

```
[Welcome Screen]
    │
    ▼
[Select Business Type]
    ├── Fashion Retail Store
    ├── Online Shop
    └── Hybrid (Offline + Online)
    │
    ▼
[Connect Marketplaces]
    ├── Shopee (OAuth)
    ├── Tokopedia (OAuth)
    └── TikTok Shop (OAuth)
    │
    ▼
[Upload Product Catalog]
    ├── CSV Import
    ├── Manual Entry
    └── Photo Upload
    │
    ▼
[AI Stylist Setup]
    ├── Define Style Profile
    ├── Set Price Range
    └── Select Target Audience
    │
    ▼
[Dashboard]
```

### 2.2 AI Stylist Flow

```
[Dashboard]
    │
    ├── [View Product Catalog]
    │       │
    │       ├── Select Products for Outfit
    │       │       │
    │       │       ▼
    │       │   [Generate Outfit]
    │       │       │
    │       │       ├── AI analyzes selected items
    │       │       ├── Generate outfit combinations
    │       │       └── Create visual collage
    │       │
    │       ▼
    │   [Outfit Recommendations]
    │       │
    │       ├── View outfit details
    │       ├── Save to collection
    │       ├── Share to customer
    │       └── Export as image
    │
    └── [Trending Outfits]
            │
            └── View trending outfit combinations
```

### 2.3 Content Curator Flow

```
[Dashboard]
    │
    ├── [Content Studio]
    │       │
    │       ├── Select Content Type
    │       │       ├── Instagram Post
    │       │       ├── Instagram Carousel
    │       │       ├── TikTok Video
    │       │       └── Instagram Story
    │       │
    │       ├── Select Products
    │       │
    │       ├── Choose Tone
    │       │       ├── Casual
    │       │       ├── Professional
    │       │       ├── Playful
    │       │       └── Luxurious
    │       │
    │       ▼
    │   [Generate Content]
    │       │
    │       ├── AI generates caption
    │       ├── AI suggests hashtags
    │       ├── AI creates carousel layout
    │       └── AI schedules optimal time
    │
    └── [Content Calendar]
            │
            ├── View scheduled posts
            ├── Edit content
            └── Publish now / Reschedule
```

### 2.4 Trend Curator Flow

```
[Dashboard]
    │
    ├── [Trend Dashboard]
    │       │
    │       ├── View Trending Hashtags
    │       │       ├── TikTok Trends
    │       │       └── Instagram Trends
    │       │
    │       ├── Viral Products Detection
    │       │       ├── Rising products
    │       │       └── Trending items
    │       │
    │       ├── Trend Forecast
    │       │       ├── 7-day forecast
    │       │       └── 30-day forecast
    │       │
    │       └── Alert Settings
    │               └── Configure trend alerts
    │
    └── [Action on Trend]
            │
            ├── Stock Recommendation
            ├── Price Adjustment
            └── Content Generation
```

### 2.5 Pricing Curator Flow

```
[Dashboard]
    │
    ├── [Pricing Dashboard]
    │       │
    │       ├── Competitor Price Scan
    │       │       ├── Shopee prices
    │       │       ├── Tokopedia prices
    │       │       └── TikTok Shop prices
    │       │
    │       ├── Price Recommendations
    │       │       ├── Optimal price
    │       │       ├── Margin protection
    │       │       └── Flash sale price
    │       │
    │       └── Auto-Adjust Settings
    │               └── Enable/disable auto-adjust
    │
    └── [Apply Price Changes]
            │
            ├── Review changes
            ├── Approve changes
            └── Reject changes
```

### 2.6 Marketplace Curator Flow

```
[Dashboard]
    │
    ├── [Marketplace Hub]
    │       │
    │       ├── Inventory Sync Status
    │       │       ├── Shopee: ✅ Synced
    │       │       ├── Tokopedia: ✅ Synced
    │       │       └── TikTok Shop: ⚠️ Syncing
    │       │
    │       ├── Unified Order Inbox
    │       │       ├── New orders
    │       │       ├── Processing orders
    │       │       └── Completed orders
    │       │
    │       └── Review Aggregation
    │               ├── Shopee reviews
    │               ├── Tokopedia reviews
    │               └── TikTok Shop reviews
    │
    └── [Order Management]
            │
            ├── View order details
            ├── Update fulfillment status
            └── Print shipping label
```

---

## 3. Component Library

### 3.1 Navigation Components

#### 3.1.1 Sidebar Navigation

```
┌─────────────────────────┐
│  ✨ KuratorKas          │
├─────────────────────────┤
│                         │
│  📊 Dashboard           │
│  🛍️  Products            │
│  👗 AI Stylist          │
│  📝 Content Studio      │
│  🔥 Trend Curator       │
│  💰 Pricing Curator     │
│  🏪 Marketplace Hub     │
│                         │
│  ─────────────────────  │
│                         │
│  ⚙️  Settings            │
│  👤 Profile             │
│  ❓ Help                 │
│                         │
└─────────────────────────┘
```

#### 3.1.2 Top Navigation Bar

```
┌─────────────────────────────────────────────────────────────┐
│  📁 Products / Category: Dresses    🔍 Search...    🔔  👤   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Card Components

#### 3.2.1 Product Card

```
┌────────────────────────────┐
│  ┌────────────────────┐    │
│  │                    │    │
│  │   [Product Image]  │    │
│  │                    │    │
│  └────────────────────┘    │
│                            │
│  Product Name              │
│  Rp 250,000               │
│  Stock: 15 pcs             │
│                            │
│  [Edit] [Delete] [Select]  │
└────────────────────────────┘
```

#### 3.2.2 Outfit Card

```
┌─────────────────────────────────────┐
│  Outfit of the Day                  │
│  [AI Generated]                     │
├─────────────────────────────────────┤
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │  [A]   │ │  [B]   │ │  [C]   │  │
│  └────────┘ └────────┘ └────────┘  │
│                                     │
│  Total: Rp 750,000                 │
│  Save: 15%                         │
│                                     │
│  [View Details] [Save] [Share]     │
└─────────────────────────────────────┘
```

#### 3.2.3 Trend Card

```
┌─────────────────────────────────────┐
│  🔥 Trending                        │
│  #OOTDIndonesia                     │
├─────────────────────────────────────┤
│                                     │
│  Growth: +245%                     │
│  Posts: 125K                       │
│  Engagement: 8.5%                  │
│                                     │
│  Related Products:                 │
│  • Korean Style Dress              │
│  • Oversized Blazer                │
│                                     │
│  [View Details] [Generate Content]  │
└─────────────────────────────────────┘
```

### 3.3 Form Components

#### 3.3.1 Input Field

```
┌─────────────────────────────────────┐
│  Label                              │
│  ┌───────────────────────────────┐│
│  │  Placeholder text...          ││
│  └───────────────────────────────┘│
│  Helper text                        │
└─────────────────────────────────────┘
```

#### 3.3.2 Select Dropdown

```
┌─────────────────────────────────────┐
│  Select Category                    │
│  ┌───────────────────────────────┐│
│  │  Dresses              ▼        ││
│  └───────────────────────────────┘│
└─────────────────────────────────────┘
```

#### 3.3.3 Button Variants

```
Primary:   [        Save        ] (Gold background)
Secondary: [       Cancel       ] (Border only)
Danger:    [       Delete       ] (Red background)
Ghost:     [       Edit         ] (No background)
```

### 3.4 Data Display Components

#### 3.4.1 Stat Card

```
┌────────────────────────────┐
│  Total Revenue             │
│  ━━━━━━━━━━━━━━━━         │
│                            │
│  Rp 125.5M                │
│  ↑ 23% from last month    │
│                            │
│  [View Report]             │
└────────────────────────────┘
```

#### 3.4.2 Table

```
┌─────────────────────────────────────────────────────────┐
│  Products                              [Add Product]   │
├─────────┬────────────┬────────┬────────┬────────────────┤
│  Name   │  Category  │  Price │ Stock  │  Actions       │
├─────────┼────────────┼────────┼────────┼────────────────┤
│  Dress  │  Dresses   │ 250K   │ 15     │  Edit  Delete  │
│  Shirt  │  Tops      │ 180K   │ 8      │  Edit  Delete  │
│  Pants  │  Bottoms   │ 320K   │ 23     │  Edit  Delete  │
└─────────┴────────────┴────────┴────────┴────────────────┘
```

### 3.5 AI Components

#### 3.5.1 AI Thinking State

```
┌─────────────────────────────────────┐
│  🤔 AI is analyzing...              │
│                                     │
│  • Scanning your product catalog... │
│  • Generating outfit combinations...│
│  • Creating visual collages...      │
│                                     │
│  [|||||||          ] 70%          │
└─────────────────────────────────────┘
```

#### 3.5.2 AI Suggestion Chip

```
┌─────────────────────────────────────┐
│  💡 AI Suggestion                   │
│                                     │
│  "Try pairing this dress with the   │
│   oversized blazer for a trendy     │
│   Korean style look."               │
│                                     │
│  [Apply] [Dismiss]                  │
└─────────────────────────────────────┘
```

---

## 4. Screen Designs

### 4.1 Dashboard Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ✨ KuratorKas                    Dashboard          🔔  👤                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐                │
│  │  Total Revenue           │  │  Active Orders           │                │
│  │  Rp 125.5M               │  │  23                      │                │
│  │  ↑ 23%                   │  │  ↑ 5%                    │                │
│  └──────────────────────────┘  └──────────────────────────┘                │
│                                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐                │
│  │  Products in Catalog     │  │  AI Content Generated    │                │
│  │  156                     │  │  45                      │                │
│  │  ↑ 12%                   │  │  ↑ 34%                   │                │
│  └──────────────────────────┘  └──────────────────────────┘                │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Recent Activity                                                   │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │    │
│  │                                                                    │    │
│  │  🛒 New order #12345 - Rp 750,000                          2m ago │    │
│  │  🤖 AI generated 5 new outfit recommendations               5m ago │    │
│  │  🔥 Trend alert: #OOTDIndonesia +245%                       10m ago│    │
│  │  💰 Price optimized: Dress X now Rp 275,000 (was Rp 300K)   15m ago│    │
│  │                                                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  AI Quick Actions                                                  │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │    │
│  │                                                                    │    │
│  │  [👗 Generate Outfits]  [📝 Create Content]  [🔥 View Trends]    │    │
│  │                                                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 AI Stylist Screen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ✨ KuratorKas                    AI Stylist           🔔  👤                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Generate New Outfits                                              │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │    │
│  │                                                                    │    │
│  │  Select Products for Outfit:                                       │    │
│  │                                                                    │    │
│  │  [Filter: Dresses ▼] [Filter: Rp 0-500K ▼]                         │    │
│  │                                                                    │    │
│  │  [✓] Dress A (Rp 250K)    [✓] Blazer B (Rp 350K)                 │    │
│  │  [ ] Shirt C (Rp 180K)    [✓] Shoes D (Rp 420K)                  │    │
│  │  [ ] Pants E (Rp 320K)    [ ] Bag F (Rp 280K)                      │    │
│  │                                                                    │    │
│  │  [       Generate Outfits       ]                                  │    │
│  │                                                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Generated Outfits                                                 │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │    │
│  │                                                                    │    │
│  │  ┌────────────────────────────────────────────────────────────┐    │    │
│  │  │  Outfit #1 - Korean Chic                                   │    │    │
│  │  │                                                            │    │    │
│  │  │  [Dress A] + [Blazer B] + [Shoes D]                        │    │    │
│  │  │                                                            │    │    │
│  │  │  Total: Rp 1,020,000                                      │    │    │
│  │  │  Save: Rp 150,000 (15%) when bought together             │    │    │
│  │  │                                                            │    │    │
│  │  │  [View Details] [Save to Collection] [Share]               │    │    │
│  │  └────────────────────────────────────────────────────────────┘    │    │
│  │                                                                    │    │
│  │  ┌────────────────────────────────────────────────────────────┐    │    │
│  │  │  Outfit #2 - Office Elegant                                │    │    │
│  │  │                                                            │    │    │
│  │  │  [Dress A] + [Blazer B]                                    │    │    │
│  │  │                                                            │    │    │
│  │  │  Total: Rp 600,000                                        │    │    │
│  │  │                                                            │    │    │
│  │  │  [View Details] [Save to Collection] [Share]               │    │    │
│  │  └────────────────────────────────────────────────────────────┘    │    │
│  │                                                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Content Studio 