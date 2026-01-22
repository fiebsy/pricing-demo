# Payva Pitch Deck - Raw Layout Documentation

> Complete slide-by-slide specification for investor deck

---

## Slide Structure (15 Slides)

### 1. Title Slide
- **Type**: `title`
- **Content**:
  - Logo: Payva
  - Tagline: "Grow Now. Pay Later."
  - Subtitle: The BNPL built for creators, coaches, and digital content platforms
- **Layout**: Centered, minimal, logo + tagline stack

### 2. The Problem
- **Type**: `bullet`
- **Title**: The Problem
- **Subtitle**: Traditional financing wasn't built for the digital economy
- **Bullets** (3 max):
  1. Creators struggle with cash flow, declined payments, and chasing invoices
  2. Customers face rejections and rigid payment plans
  3. Platforms lose revenue due to checkout friction and low approvals
- **Layout**: Left-aligned title, stacked bullets with dot indicators

### 3. Payva's Solution
- **Type**: `bullet`
- **Title**: Payva's Solution
- **Subtitle**: BNPL Built for Creators
- **Bullets**:
  1. Higher approval rates
  2. Upfront payouts to creators
  3. Industry-specific risk mitigation
  4. Seamless platform integration
- **Layout**: Same as Problem slide

### 4. Platform Pain
- **Type**: `bullet`
- **Title**: Platform Pain
- **Subtitle**: Why Digital Creator Platforms Use Payva
- **Bullets**:
  1. Limited financing solutions available
  2. Low approval rates from traditional BNPL
  3. Lost revenue potential from cart abandonment
- **Supporting**: What they want: higher conversions, seamless integration, industry-specific partner
- **Layout**: Problem/solution contrast format

### 5. Creator Pain
- **Type**: `bullet`
- **Title**: Creator Pain
- **Subtitle**: Merchant Challenges
- **Bullets**:
  1. Conversion struggles from high upfront costs
  2. Cash flow gaps from payment timing
  3. Limited approvals waste acquisition spend
  4. Frustration with retail BNPL providers
- **Layout**: Left-aligned bullet list

### 6. Why Now / Market Timing
- **Type**: `stat`
- **Title**: Why Now
- **Subtitle**: Creator Economy Growth
- **Stats**:
  - $250B → $480B by 2027 (Goldman Sachs)
  - Life coaching market expansion
  - Digital education marketplace growth
  - Major BNPL providers exiting this space
- **Layout**: Large stat with supporting context

### 7. Market Opportunity
- **Type**: `stat`
- **Title**: Market Opportunity
- **Subtitle**: Origination Projections
- **Stats**:
  - $10M-$15M monthly origination target
- **Layout**: Single large metric, centered

### 8. Traction / Growth
- **Type**: `stat`
- **Title**: Traction
- **Subtitle**: Growth Trajectory
- **Stats**:
  - 2x monthly origination growth ($6M → $12M in 7-10 months)
  - Team growth: 3 → 23 employees in 2 years
  - Major marketplace distribution
- **Layout**: Multiple metrics in horizontal row

### 9. Portfolio Performance
- **Type**: `stat` or `chart`
- **Title**: Portfolio Performance
- **Subtitle**: Year-over-Year Growth
- **Stats**:
  - 3x origination growth 2024 → 2025
  - 2x projected growth 2025 → 2026
- **Layout**: Bar chart or large metrics

### 10. Business Model
- **Type**: `bullet`
- **Title**: Business Model
- **Subtitle**: Embedded Financing Economics
- **Bullets**:
  1. **Funding**: Advances capital upfront, repaid by customer payments
  2. **Servicing**: Pays out creators over time as customers pay
  3. Recourse-backed invoice factoring protects capital
- **Layout**: Explanatory bullets with bold labels

### 11. Distribution / Integrations
- **Type**: `logo-grid`
- **Title**: Distribution
- **Subtitle**: Platform Integrations
- **Logos**:
  - FanBasis
  - CopeCart
  - Winible
- **Note**: Payva embeds financing directly into checkout
- **Layout**: 3-column logo grid with captions

### 12. Team
- **Type**: `team`
- **Title**: Team
- **Subtitle**: Leadership
- **Members**:
  - Christopher Gravagna - Co-founder & Co-CEO
  - Chase Craft - Co-founder & Co-CEO
  - Jay Phillips - CTO
  - Kimmie Calkins - Chief Accounting Officer
  - Rosanna Sevillano - VP of Risk Management
- **Layout**: Photo grid (2-3 per row) with name/title

### 13. Financial Highlights
- **Type**: `chart` or `stat`
- **Title**: Financial Highlights
- **Subtitle**: Revenue & Net Income
- **Data** (placeholder - needs confirmed numbers):
  - 2024: $XMM revenue, $XMM net income
  - 2025: $XMM revenue, $XMM net income
  - 2026 projection: $XMM revenue, $XMM net income
- **Layout**: Bar chart with year labels

### 14. The Ask (Optional)
- **Type**: `stat`
- **Title**: The Ask
- **Subtitle**: Series A
- **Stats**:
  - Raising amount
  - Runway / use of funds
- **Layout**: Large centered metrics

### 15. Closing Slide
- **Type**: `closing`
- **Title**: Payva
- **Statement**: "Payva unlocks growth for creators, customers, and platforms - with embedded financing purpose-built for the digital creator economy."
- **Layout**: Centered statement, logo, contact info

---

## Visual Specifications

### Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Slide titles | Poppins | Semi Bold | 48px |
| Subtitles | Poppins | Regular | 24px |
| Body/bullets | Inter | Regular | 20px |
| Stats (large) | Poppins | Semi Bold | 72px |
| Labels | Inter | Regular | 14px |

### Colors (Design System - Neutral Only)
| Usage | Token | Value |
|-------|-------|-------|
| Background | `bg-primary` | white |
| Card/section bg | `bg-secondary` | gray-50 |
| Primary text | `text-primary` | gray-900 |
| Secondary text | `text-secondary` | gray-700 |
| Muted text | `text-tertiary` | gray-600 |
| Chart bars | `bg-tertiary` | gray-100 |
| Borders | `border-primary` | gray-300 |

### Layout
- **Aspect ratio**: 16:9 (landscape)
- **Slide padding**: 80px horizontal, 60px vertical
- **Content max-width**: 1024px centered
- **Bullet spacing**: 32px between items

### Charts
- Minimal gridlines (horizontal only, if any)
- Neutral gray bars (`bg-tertiary`)
- Clean axis labels
- No decorative elements

---

## Export Requirements

### PDF Export
- Light mode only (no dark backgrounds)
- Page breaks after each slide
- Hide navigation elements (arrows, dots, counter)
- Include slide numbers in footer
- Print-optimized typography

### Technical Notes
- Use `@media print` CSS for export styles
- Each slide wrapped in `page-break-after: always`
- Hide interactive elements with `print-hidden` class
- Force light color scheme in print
