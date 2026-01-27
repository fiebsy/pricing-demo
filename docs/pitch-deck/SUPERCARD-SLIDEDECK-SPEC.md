# Supercard → Slide Deck Specification

## Purpose

This document provides comprehensive guidance for converting the Supercard research format into an investor slide deck structure. The goal is to preserve Supercard's communication effectiveness—scannable, layman-friendly, card-based hierarchy—while adapting it for presentation contexts.

**Intended use:** Pass this document to Claude Code to implement within your custom design system.

---

## Part 1: Understanding the Supercard Format

### Core Philosophy

The Supercard format succeeds because it:
1. **Chunks information into visual cards** — Each card is a self-contained thought
2. **Uses contrast to create hierarchy** — Dark cards = primary insights, Light cards = supporting content
3. **Limits density** — No paragraph longer than 3 lines
4. **Speaks plainly** — Layman-first language, jargon translated
5. **Provides rhythm** — Alternating card types create visual flow

### The 6 Card Types

| Card Type | Background | Purpose | Slide Equivalent |
|-----------|------------|---------|------------------|
| Hero Card | Dark | Primary insight/formula | Title + Key Stat slide |
| Insight Card | Light | Explanations, breakdowns | Content slides |
| Punchline Card | Dark, compact | Surprising stats | Traction/Metrics slide |
| Boundary Card | Light | Exceptions, edge cases | Risk/Considerations slide |
| Application Card | Bordered | Actionable items | Solution/How It Works slide |
| Takeaway Card | Light, large | Advocacy-ready summary | Closing/Ask slide |

### The 14-Section Structure (Supercard)

```
1.  Header — Label + Title + One-line definition
2.  Key Finding Tile — Primary stat (dark)
3.  Overview — What it is, why it matters
4.  Historical Context — Origins, background
5.  Original Experiments — Methodology deep-dive
6.  Data Table — Raw numbers, clean grid
7.  Underlying Mechanism — How/why it works
8.  Boundary Conditions — When it doesn't apply
9.  Common Misapplications — What people get wrong
10. Applications — Practical guidance
11. Related Principles — Connected concepts
12. Empirical Support — Evidence
13. Design Takeaway Tile — Summary (light)
14. References — Citations
```

---

## Part 2: Investor Deck Research (Best Practices)

### Optimal Deck Parameters

| Parameter | Value | Source |
|-----------|-------|--------|
| Slide count | 10–15 slides | YC, Sequoia, Guy Kawasaki |
| Presentation time | 20 minutes max | Guy Kawasaki 10/20/30 rule |
| Min font size | 30pt | Guy Kawasaki |
| Words per slide | 75 max | DocSend analysis |
| Avg investor viewing time | 2 min 18 sec | DocSend 2024 |

### The 15-Slide Investor Deck Flow

```
1.  Title — Company name + tagline (7 words max)
2.  Problem — The pain in human terms (3 bullets max)
3.  Solution — What you do (benefits, not features)
4.  Why Now — Market timing, what changed
5.  Market Size — TAM/SAM/SOM with bottom-up math
6.  Product — Screenshots, demo, how it works
7.  Traction — Metrics WITH timeframes
8.  Business Model — How you make money
9.  Competition — Position as only logical choice
10. Go-to-Market — Customer acquisition strategy
11. Team — Accomplishments, not titles (3 people max)
12. Financials — Projections, unit economics
13. Roadmap — 12-24 month milestones
14. The Ask — Amount + use of funds + milestones
15. Closing — Mission restatement + contact
```

### YC Design Principles

1. **Legibility** — Large, bold fonts. High contrast.
2. **Simplicity** — One idea per slide.
3. **Obviousness** — If they have to think, you've lost them.

---

## Part 3: Mapping Supercard → Slide Deck

### Conceptual Translation

| Supercard Element | Slide Deck Equivalent |
|-------------------|----------------------|
| Hero Card (dark) | Title slide, Key Metric slide |
| Insight Card (light) | Standard content slide |
| Punchline Card (dark) | Traction slide, "By the Numbers" |
| Boundary Card (light) | Competition/Risk slide |
| Application Card (bordered) | Solution slide, Product slide |
| Takeaway Card (light) | The Ask, Closing slide |
| Spec Tables | Comparison grids, pricing tables |
| Data Tables | Charts, metric grids |

### The Hybrid Structure

Combining Supercard's communication style with investor deck flow:

```
SLIDE 1 — HERO (Dark)
├── Type: Hero Card adapted
├── Content: Company name + one-line value prop
├── Visual: Full-bleed dark background, large typography
└── Purpose: First impression, memorable tagline

SLIDE 2 — PROBLEM (Light)
├── Type: Insight Card adapted
├── Content: 3 pain points max, human terms
├── Visual: Light background, numbered or bulleted
└── Purpose: Make investor nod in agreement

SLIDE 3 — SOLUTION (Bordered)
├── Type: Application Card adapted
├── Content: What you do + key benefits
├── Visual: Border treatment, example chips for features
└── Purpose: Clear, jargon-free explanation

SLIDE 4 — WHY NOW (Light)
├── Type: Insight Card adapted
├── Content: Market timing, inflection point
├── Visual: Timeline or trend indicator
└── Purpose: Create urgency

SLIDE 5 — MARKET SIZE (Light + Chart)
├── Type: Data Table adapted
├── Content: TAM/SAM/SOM with math shown
├── Visual: Concentric circles or bar chart
└── Purpose: Show scale of opportunity

SLIDE 6 — PRODUCT (Light)
├── Type: Application Card adapted
├── Content: Screenshots, flow diagram
├── Visual: Device mockups, step indicators
└── Purpose: Make it tangible

SLIDE 7 — TRACTION (Dark)
├── Type: Punchline Card adapted
├── Content: Key metrics WITH timeframes
├── Visual: Stat grid (2x2 or 3x1)
├── Chart: Line graph showing growth trajectory
└── Purpose: Prove momentum

SLIDE 8 — BUSINESS MODEL (Light)
├── Type: Spec Table adapted
├── Content: Revenue streams, pricing
├── Visual: Flexbox rows, label/value pairs
└── Purpose: Show path to revenue

SLIDE 9 — COMPETITION (Light)
├── Type: Boundary Card adapted
├── Content: Competitive positioning
├── Visual: 2x2 matrix or comparison table
└── Purpose: Show differentiation

SLIDE 10 — GO-TO-MARKET (Bordered)
├── Type: Application Card adapted
├── Content: Acquisition channels, strategy
├── Visual: Funnel or flywheel diagram
└── Purpose: Show scalable growth plan

SLIDE 11 — TEAM (Light)
├── Type: Insight Card adapted
├── Content: 3 founders max, accomplishments
├── Visual: Headshots + one-line proof of skill
└── Purpose: Build trust

SLIDE 12 — FINANCIALS (Light + Chart)
├── Type: Data Table adapted
├── Content: Projections, key assumptions
├── Visual: Line/bar chart, clean table
└── Purpose: Show financial literacy

SLIDE 13 — ROADMAP (Light)
├── Type: Application Card adapted
├── Content: 12-24 month milestones
├── Visual: Horizontal timeline
└── Purpose: Show where you're going

SLIDE 14 — THE ASK (Dark)
├── Type: Takeaway Card adapted (inverted)
├── Content: Amount + use of funds + milestones
├── Visual: Dark background, clear numbers
└── Purpose: Direct call to action

SLIDE 15 — CLOSING (Light)
├── Type: Takeaway Card adapted
├── Content: Mission restatement + contact
├── Visual: Light background, centered
└── Purpose: Leave memorable impression
```

---

## Part 4: Component Specifications

### Slide Anatomy

Each slide should contain these zones:

```
┌─────────────────────────────────────────────┐
│ [LABEL]                           [##/15]   │  ← Header zone
├─────────────────────────────────────────────┤
│                                             │
│              [HEADLINE]                     │  ← Title zone
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│              [CONTENT ZONE]                 │  ← Main content
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ [Supporting context or source]              │  ← Footer zone
└─────────────────────────────────────────────┘
```

### Card-to-Slide Conversions

#### Hero Slide (Dark)

```
Structure:
├── Background: {{colors.dark}}
├── Label: uppercase, tracking-wide, {{colors.muted}}
├── Headline: large, bold, {{colors.white}}
├── Subline: medium, {{colors.lightMuted}}
└── Optional: Logo placement

Typography:
├── Label: {{fontSizes.xs}}, {{fontWeights.semibold}}
├── Headline: {{fontSizes.4xl}}, {{fontWeights.bold}}
└── Subline: {{fontSizes.lg}}, {{fontWeights.regular}}
```

#### Content Slide (Light)

```
Structure:
├── Background: {{colors.light}}
├── Label: uppercase, tracking-wide, {{colors.tertiary}}
├── Headline: large, bold, {{colors.primary}}
├── Body: max 3 lines, {{colors.secondary}}
└── Optional: Stat grid, bullet list, or visual

Typography:
├── Label: {{fontSizes.xs}}, {{fontWeights.semibold}}
├── Headline: {{fontSizes.2xl}}, {{fontWeights.bold}}
└── Body: {{fontSizes.base}}, {{fontWeights.regular}}
```

#### Stat Grid Component

For Traction, Financials, Market slides:

```
Structure:
├── Grid: 2x2 or 1x3 or 1x4
├── Each cell:
│   ├── Value: large number, bold
│   ├── Label: small, muted
│   └── Optional: Trend indicator (↑↓)
└── Highlight: One cell uses inverted colors

Layout options:
├── 2x2 grid — For 4 metrics
├── 1x3 row — For 3 key stats
├── 1x4 row — For compact metrics
└── 2x3 grid — For detailed breakdown
```

#### Comparison Table Component

For Competition, Pricing slides:

```
Structure:
├── Header row: Labels, {{colors.tertiary}}
├── Data rows: 
│   ├── Left column: Competitor/Feature name
│   └── Right columns: Values or checkmarks
├── Highlight row: Your company, bold or inverted
└── Dividers: Subtle, {{colors.border}}

Avoid:
├── Heavy borders
├── Alternating row colors
└── More than 5-6 rows visible
```

#### Chart Placeholder Component

For slides requiring data visualization:

```
Chart types by slide:
├── Market Size → Concentric circles, bar chart
├── Traction → Line graph (growth over time)
├── Financials → Line + bar combo, projection curve
├── Business Model → Funnel or Sankey
└── Roadmap → Horizontal timeline

Chart styling:
├── Minimal gridlines
├── Single accent color for emphasis
├── Clear axis labels
├── No 3D effects
├── Data labels on chart, not in legend
```

---

## Part 5: Design System Integration Points

### Token Structure

Your design system should expose these tokens for slide deck use:

```
{{colors}}
├── primary      — Main text color
├── secondary    — Supporting text
├── tertiary     — Labels, captions
├── muted        — Very light text
├── dark         — Dark backgrounds
├── light        — Light backgrounds
├── border       — Subtle dividers
├── white        — Text on dark
└── accent       — Highlight color (optional)

{{fontSizes}}
├── xs           — Labels, captions
├── sm           — Supporting text
├── base         — Body text
├── lg           — Subheadlines
├── xl           — Section titles
├── 2xl          — Slide headlines
├── 3xl          — Hero headlines
└── 4xl          — Title slide

{{fontWeights}}
├── regular      — 400
├── medium       — 500
├── semibold     — 600
└── bold         — 700

{{spacing}}
├── xs           — 4px
├── sm           — 8px
├── md           — 16px
├── lg           — 24px
├── xl           — 32px
└── 2xl          — 48px

{{radii}}
├── sm           — Subtle rounding
├── md           — Standard cards
├── lg           — Prominent cards
└── full         — Pills, avatars

{{shadows}}
├── none         — Flat (preferred)
├── sm           — Subtle lift
└── md           — Card elevation
```

### Font Stack Placeholder

Replace with your design system fonts:

```css
/* REPLACE THIS with your font stack */
--font-display: {{fonts.display}};
--font-body: {{fonts.body}};

/* Example: */
--font-display: 'Your Display Font', sans-serif;
--font-body: 'Your Body Font', sans-serif;
```

### Component Override Points

Each component should accept style overrides:

```jsx
// Example component signature
<HeroSlide
  label="COMPANY NAME"
  headline="Your One-Line Value Prop"
  subline="Supporting context"
  // Design system overrides:
  styles={{
    background: '{{colors.dark}}',
    labelColor: '{{colors.muted}}',
    headlineColor: '{{colors.white}}',
    headlineSize: '{{fontSizes.4xl}}',
    // ... etc
  }}
/>
```

---

## Part 6: Writing Guidelines

### Inherited from Supercard

1. **No paragraph longer than 3 lines**
2. **Layman-first language** — Translate jargon immediately
3. **Bold for key terms only** — Not full sentences
4. **Real-world examples** — Concrete, relatable
5. **Short paragraphs** — Break up density

### Investor Deck Specific

1. **One idea per slide** — If you need more, split the slide
2. **Headlines that stand alone** — Investor should get the point from headline only
3. **Numbers with context** — "1,000 users" → "0 → 1,000 users in 8 weeks"
4. **Benefits, not features** — What changes for the user
5. **Show, don't tell** — Screenshots > descriptions

### Headline Formula

Each slide headline should be:
- **Declarative** — States the insight, not the topic
- **Specific** — Includes a number or outcome
- **Memorable** — Can be repeated after the pitch

```
❌ "Our Market"
✅ "A $4.2B Market Growing 23% YoY"

❌ "The Problem"
✅ "Creators Lose 40% of Revenue to Disputes"

❌ "Our Solution"
✅ "Automated Payment Protection in 3 Clicks"
```

---

## Part 7: Slide-by-Slide Prompts

Use these as starting points for each slide's content:

### Slide 1: Title
```
Company: [NAME]
Tagline: [7 words max that capture what you do]
Visual: [Logo + dark background]
```

### Slide 2: Problem
```
Pain point 1: [Human-terms description]
Pain point 2: [Human-terms description]
Pain point 3: [Human-terms description]
Source: [If citing data]
```

### Slide 3: Solution
```
One-line: [What you do, benefits-focused]
Key benefit 1: [Outcome]
Key benefit 2: [Outcome]
Key benefit 3: [Outcome]
```

### Slide 4: Why Now
```
Trigger: [What changed in the market]
Trend: [Data point supporting timing]
Window: [Why now, not later]
```

### Slide 5: Market Size
```
TAM: $[X] — [How calculated]
SAM: $[X] — [Your accessible segment]
SOM: $[X] — [Realistic capture in 3-5 years]
Source: [Citation]
```

### Slide 6: Product
```
Screenshot 1: [What it shows]
Screenshot 2: [What it shows]
Flow: [Step 1 → Step 2 → Step 3]
```

### Slide 7: Traction
```
Metric 1: [Number] — [Label] — [Timeframe]
Metric 2: [Number] — [Label] — [Timeframe]
Metric 3: [Number] — [Label] — [Timeframe]
Metric 4: [Number] — [Label] — [Timeframe]
Chart: [Growth trajectory visualization]
```

### Slide 8: Business Model
```
Revenue stream 1: [Description] — [Pricing]
Revenue stream 2: [Description] — [Pricing]
Unit economics: [CAC, LTV, or relevant metrics]
```

### Slide 9: Competition
```
Competitor 1: [Name] — [What they do] — [Your advantage]
Competitor 2: [Name] — [What they do] — [Your advantage]
Positioning: [Why you're the logical choice]
```

### Slide 10: Go-to-Market
```
Channel 1: [Strategy] — [Why it works]
Channel 2: [Strategy] — [Why it works]
Flywheel: [How growth compounds]
```

### Slide 11: Team
```
Founder 1: [Name] — [Role] — [One-line accomplishment]
Founder 2: [Name] — [Role] — [One-line accomplishment]
Founder 3: [Name] — [Role] — [One-line accomplishment]
```

### Slide 12: Financials
```
Current: [Revenue/ARR/MRR if any]
Year 1: $[X] — [Key assumption]
Year 2: $[X] — [Key assumption]
Year 3: $[X] — [Key assumption]
```

### Slide 13: Roadmap
```
Q1: [Milestone]
Q2: [Milestone]
Q3: [Milestone]
Q4: [Milestone]
```

### Slide 14: The Ask
```
Amount: $[X]
Use 1: [%] — [Category]
Use 2: [%] — [Category]
Use 3: [%] — [Category]
Milestone: [What this funding achieves]
```

### Slide 15: Closing
```
Mission: [One sentence]
Contact: [Email / calendly]
```

---

## Part 8: Implementation Checklist

### Structure
- [ ] 15 slides total (adjust based on stage)
- [ ] Each slide has clear label + headline
- [ ] One idea per slide
- [ ] Slide numbers visible

### Visual Rhythm
- [ ] Dark slides used for: Title, Traction, The Ask
- [ ] Light slides used for: All content slides
- [ ] Bordered treatment for: Solution, Product, Go-to-Market
- [ ] Consistent card styling throughout

### Typography
- [ ] Design system fonts applied
- [ ] Max 3 font sizes per slide
- [ ] Headlines are declarative
- [ ] No paragraph longer than 3 lines

### Data Visualization
- [ ] Stat grids for metrics (2x2 or 1x3)
- [ ] Clean charts with minimal gridlines
- [ ] Numbers include timeframes
- [ ] Comparison tables are scannable

### Content
- [ ] Layman-friendly language
- [ ] Benefits over features
- [ ] Specific numbers throughout
- [ ] Real examples used

---

## Version History

- v1.0 — Initial Supercard-to-SlideDeck specification
