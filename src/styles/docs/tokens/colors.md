# Color Tokens

Complete reference for the PAYVA color system.

## Overview

Colors are organized in three layers: base palettes, semantic tokens, and property tokens. Use semantic tokens (via Tailwind utilities) for all production code.

## Base Color Palettes

### Brand (Purple)

| Scale | Light Mode | Usage |
|-------|------------|-------|
| 25 | `rgb(252 250 255)` | Lightest tint |
| 50 | `rgb(249 245 255)` | Very light |
| 100 | `rgb(244 235 255)` | Light backgrounds |
| 200 | `rgb(233 215 254)` | Subtle accents |
| 300 | `rgb(214 187 251)` | Light accents |
| 400 | `rgb(182 146 246)` | Medium |
| 500 | `rgb(158 119 237)` | Primary brand |
| 600 | `rgb(127 86 217)` | Solid buttons |
| 700 | `rgb(105 65 198)` | Hover states |
| 800 | `rgb(83 56 158)` | Dark accent |
| 900 | `rgb(66 48 125)` | Very dark |
| 950 | `rgb(44 28 95)` | Darkest |

### Gray

| Scale | Light Mode | Usage |
|-------|------------|-------|
| 25 | `rgb(253 253 253)` | Near white |
| 50 | `rgb(250 250 250)` | Secondary bg |
| 100 | `rgb(245 245 245)` | Tertiary bg |
| 200 | `rgb(233 234 235)` | Quaternary bg |
| 300 | `rgb(213 215 218)` | Borders |
| 400 | `rgb(164 167 174)` | Muted icons |
| 500 | `rgb(113 118 128)` | Disabled text |
| 600 | `rgb(83 88 98)` | Tertiary text |
| 700 | `rgb(65 70 81)` | Secondary text |
| 800 | `rgb(37 43 55)` | Dark mode secondary bg |
| 900 | `rgb(24 29 39)` | Primary text / Dark secondary |
| 950 | `rgb(10 13 18)` | Dark mode primary bg |

### Error (Red)

| Scale | Key Values |
|-------|------------|
| 50 | `rgb(254 243 242)` - Light error bg |
| 100 | `rgb(254 228 226)` - Error secondary bg |
| 300 | `rgb(253 162 155)` - Subtle error border |
| 500 | `rgb(240 68 56)` - Primary error |
| 600 | `rgb(217 45 32)` - Solid error |
| 700 | `rgb(180 35 24)` - Hover state |

### Success (Green)

| Scale | Key Values |
|-------|------------|
| 50 | `rgb(236 253 243)` - Light success bg |
| 100 | `rgb(220 250 230)` - Success secondary bg |
| 500 | `rgb(23 178 106)` - Primary success |
| 600 | `rgb(7 148 85)` - Solid success |

### Warning (Amber)

| Scale | Key Values |
|-------|------------|
| 50 | `rgb(255 250 235)` - Light warning bg |
| 100 | `rgb(254 240 199)` - Warning secondary bg |
| 500 | `rgb(247 144 9)` - Primary warning |
| 600 | `rgb(220 104 3)` - Solid warning |

## Semantic Color Tokens

### Text Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `text-primary` | gray-900 | gray-50 | Main text |
| `text-secondary` | gray-700 | gray-300 | Supporting text |
| `text-tertiary` | gray-600 | gray-400 | Muted text |
| `text-quaternary` | gray-500 | gray-400 | Very muted |
| `text-disabled` | gray-500 | gray-500 | Disabled |
| `text-placeholder` | gray-500 | gray-500 | Input placeholder |
| `text-white` | white | white | On dark bg |

### Text Brand/Status Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `text-brand-primary` | brand-900 | gray-50 | Brand emphasis |
| `text-brand-secondary` | brand-700 | gray-300 | Brand accent |
| `text-brand-tertiary` | brand-600 | gray-400 | Subtle brand |
| `text-error-primary` | error-600 | error-400 | Error text |
| `text-success-primary` | success-600 | success-400 | Success text |
| `text-warning-primary` | warning-600 | warning-400 | Warning text |

### Background Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-primary` | white | gray-950 | Main content |
| `bg-secondary` | gray-50 | gray-900 | Cards, inputs |
| `bg-tertiary` | gray-100 | gray-800 | Sections |
| `bg-quaternary` | gray-200 | gray-700 | Emphasis |
| `bg-active` | gray-50 | gray-800 | Active state |
| `bg-disabled` | gray-100 | gray-800 | Disabled |
| `bg-overlay` | gray-950 | gray-800 | Backdrop |

### Background Hover States

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-primary_hover` | gray-50 | gray-800 | Primary hover |
| `bg-secondary_hover` | gray-100 | gray-800 | Secondary hover |

### Background Brand Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-brand-primary` | brand-50 | brand-500 | Light brand bg |
| `bg-brand-secondary` | brand-100 | brand-600 | Accent bg |
| `bg-brand-solid` | brand-600 | brand-600 | Solid buttons |
| `bg-brand-solid_hover` | brand-700 | brand-500 | Button hover |

### Background Status Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-error-primary` | error-50 | error-950 | Error bg |
| `bg-error-secondary` | error-100 | error-600 | Strong error |
| `bg-error-solid` | error-600 | error-600 | Error buttons |
| `bg-success-primary` | success-50 | success-950 | Success bg |
| `bg-success-secondary` | success-100 | success-600 | Strong success |
| `bg-warning-primary` | warning-50 | warning-950 | Warning bg |
| `bg-warning-secondary` | warning-100 | warning-600 | Strong warning |

### Border Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `border-primary` | gray-300 | gray-700 | Standard border |
| `border-secondary` | gray-200 | gray-800 | Subtle border |
| `border-tertiary` | gray-100 | gray-800 | Very subtle |
| `border-brand` | brand-500 | brand-400 | Brand accent |
| `border-error` | error-500 | error-400 | Error state |
| `border-disabled` | gray-300 | gray-700 | Disabled |

### Foreground Colors (Icons)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `fg-primary` | gray-900 | white | Primary icons |
| `fg-secondary` | gray-700 | gray-300 | Secondary icons |
| `fg-tertiary` | gray-600 | gray-400 | Tertiary icons |
| `fg-quaternary` | gray-400 | gray-600 | Muted icons |
| `fg-disabled` | gray-400 | gray-500 | Disabled icons |
| `fg-brand-primary` | brand-600 | brand-500 | Brand icons |
| `fg-error-primary` | error-600 | error-500 | Error icons |
| `fg-success-primary` | success-600 | success-500 | Success icons |
| `fg-warning-primary` | warning-600 | warning-500 | Warning icons |

### Inverted Colors

For elements that need opposite contrast:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg-inverted-primary` | gray-900 | white | Dark in light |
| `bg-inverted-secondary` | gray-800 | gray-100 | Dark surfaces |
| `text-on-inverted-primary` | white | gray-900 | Text on inverted |
| `text-on-inverted-secondary` | gray-200 | gray-700 | Secondary on inverted |

## Chart Colors

Harmonized palette for data visualization:

| Token | Name | Light | Dark | Usage |
|-------|------|-------|------|-------|
| `chart-1` | Active | `rgb(35 178 108)` | `rgb(42 195 120)` | Green series |
| `chart-2` | At-Risk | `rgb(180 140 230)` | `rgb(200 180 245)` | Lavender series |
| `chart-3` | Clawback | `rgb(230 20 150)` | `rgb(245 50 180)` | Magenta series |
| `chart-4` | Paid Off | `rgb(42 200 200)` | `rgb(63 210 210)` | Teal series |
| `chart-warning` | Warning | `rgb(230 180 50)` | `rgb(245 200 70)` | Yellow series |
| `chart-error` | Error | `rgb(230 50 50)` | `rgb(245 70 70)` | Red series |

### Chart Alpha Variants

Each chart color has alpha variants for fills:

```tsx
<div className="bg-chart-1-alpha-10" />  // 10% opacity
<div className="bg-chart-1-alpha-20" />  // 20% opacity
<div className="bg-chart-1-alpha-30" />  // 30% opacity
<div className="bg-chart-1-alpha-50" />  // 50% opacity
```

### Chart Muted Variants

Lighter versions for secondary series:

```tsx
<div className="bg-chart-1-muted" />      // Muted green
<div className="text-chart-1-muted" />    // Muted text
<div className="border-chart-1-muted" />  // Muted border
```

## Utility Colors

For cases needing direct palette access (charts, gradients):

```tsx
// Access full palette scale
className="bg-utility-brand-500"
className="bg-utility-error-300"
className="bg-utility-success-600"

// These also invert in dark mode
// utility-brand-500 → brand-500 in light, brand-500 in dark
// utility-brand-50 → brand-50 in light, brand-950 in dark
```

## Gradient Colors

Special tokens for brand gradients:

```css
--color-brand-gradient-from: rgb(173 0 254);  /* Purple */
--color-brand-gradient-to: rgb(0 224 238);    /* Cyan */
```

Usage:

```tsx
<div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to" />
```

## Intermediate Background Steps

Fine-grained control between background levels:

| Token | Description | Usage |
|-------|-------------|-------|
| `bg-primary_s1` | One step toward secondary | Subtle distinction |
| `bg-secondary_p1` | One step toward primary | Lighter card |
| `bg-secondary_t1` | One step toward tertiary | Subtle emphasis |
| `bg-secondary_t2` | Two steps toward tertiary | More emphasis |

## Usage Examples

### Status Badge

```tsx
<span className="bg-success-primary text-success-primary px-2 py-1 rounded">
  Active
</span>

<span className="bg-error-primary text-error-primary px-2 py-1 rounded">
  Failed
</span>

<span className="bg-warning-primary text-warning-primary px-2 py-1 rounded">
  Pending
</span>
```

### Input Field States

```tsx
// Default
<input className="bg-secondary border-primary text-primary" />

// Focused
<input className="bg-secondary border-brand ring-2 ring-brand" />

// Error
<input className="bg-secondary border-error ring-2 ring-error" />

// Disabled
<input className="bg-disabled border-disabled text-disabled" />
```

### Card Hierarchy

```tsx
// Primary card (main content)
<div className="bg-primary border-primary" />

// Secondary card (within primary)
<div className="bg-secondary border-secondary" />

// Tertiary card (maximum depth)
<div className="bg-tertiary border-tertiary" />
```

## Related

- [Architecture](./architecture.md): How tokens connect
- [Migration Rules](../getting-started/migration-rules.md): Converting from hardcoded colors
- [All Utilities](../reference/all-utilities.md): Complete utility list
