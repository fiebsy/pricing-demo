# PAYVA Pitch Deck PDF Export Audit Guide

> **Goal**: Verify that `/payva-deck/print` renders identically to the main deck view, with correct light mode colors, spacing, and framing for PowerPoint-ready PDF export.

---

## Overview

### What We're Building

A **server-side PDF export system** using Puppeteer that:

1. Navigates to `/payva-deck/print` (dedicated print route)
2. Renders all slides at 1920×1080 viewport (full-screen viewing size)
3. Generates PDF at PowerPoint Widescreen dimensions (13.333" × 7.5")
4. Downloads automatically with one click

### Why This Approach

The browser print dialog (`window.print()`) requires manual configuration of paper size, orientation, and margins. This is error-prone and not scalable. Server-side PDF generation gives us **exact control** over dimensions with zero user configuration.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  User clicks "Export PDF"                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Frontend: export-button.tsx                                    │
│  - Calls GET /api/payva-deck/export-pdf                         │
│  - Shows loading spinner                                        │
│  - Triggers download on response                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  API Route: /api/payva-deck/export-pdf/route.ts                 │
│  - Launches headless Chrome via Puppeteer                       │
│  - Sets viewport to 1920×1080 @ 2x scale                        │
│  - Navigates to /payva-deck/print                               │
│  - Forces light mode via page.evaluate()                        │
│  - Generates PDF at 13.333" × 7.5"                              │
│  - Returns PDF as download                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  Print Page: /payva-deck/print/page.tsx                         │
│  - Renders ALL slides (not just current)                        │
│  - Uses viewport-relative sizing (100vw × 100vh per slide)      │
│  - Same structure as PrintView component                        │
│  - Forces light mode via layout.tsx CSS overrides               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Visual Audit Checklist

### 1. Color Mapping (Light Mode)

Compare these elements between `/payva-deck` (main) and `/payva-deck/print`:

| Element | Expected Color | CSS Variable | Hex Value |
|---------|---------------|--------------|-----------|
| **Page background** | White | `--color-bg-primary` | `#ffffff` |
| **Primary text** (titles) | Near-black | `--color-text-primary` | `rgb(24,29,39)` ≈ `#181d27` |
| **Secondary text** | Dark gray | `--color-text-secondary` | `rgb(65,70,81)` ≈ `#414651` |
| **Tertiary text** (supporting) | Medium gray | `--color-text-tertiary` | `rgb(83,88,98)` ≈ `#535862` |
| **Quaternary text** (subtle) | Light gray | `--color-text-quaternary` | `rgb(113,118,128)` ≈ `#717680` |
| **Card background** | White/subtle gradient | `--color-bg-primary` | `#ffffff` with brand tint |
| **Card border/shadow** | Subtle gray | `--color-border-secondary` | `rgb(233,234,235)` |

#### How to Verify

1. Open DevTools on both pages
2. Inspect the same element (e.g., slide title)
3. Check computed `color` value matches expected
4. Background should be white, NOT dark gray/black

#### Red Flags (Dark Mode Leak)

- [ ] White text on dark background
- [ ] `rgb(250,250,250)` as text color (that's light mode BG, not text)
- [ ] Card backgrounds appearing dark
- [ ] Brand colors inverted

---

### 2. Spacing Audit

The print page must match `PrintView` component spacing exactly:

| Property | Value | Location |
|----------|-------|----------|
| **Slide container** | `100vw × 100vh` | Each `<section>` |
| **Content frame padding** | `3rem 4rem` (48px × 64px) | `.slide-frame` |
| **Content max-width** | `56rem` (896px) | Inner content wrapper |
| **16:9 aspect ratio** | `max-width: calc(100vh * 16/9)` | Frame container |

#### How to Verify

1. Open DevTools → Elements panel
2. Select `.slide-frame` element
3. Check padding in Computed styles: should be `48px 64px`
4. Select content wrapper: max-width should be `896px`

#### Reference: PrintView Structure

```tsx
<section style={{ width: '100vw', height: '100vh' }}>
  <div style={{
    padding: '3rem 4rem',           // 48px 64px
    maxWidth: 'calc(100vh * 16/9)', // 16:9 ratio
    maxHeight: 'calc(100vw * 9/16)'
  }}>
    <div style={{ maxWidth: '56rem' }}>  // 896px
      <SlideContent ... />
    </div>
  </div>
</section>
```

---

### 3. Typography Audit

Check these typography classes render correctly:

| Class | Usage | Expected Size |
|-------|-------|---------------|
| `text-display-2xl` | Hero titles, stat values | ~72px (4.5rem) |
| `text-display-lg` | Section titles | ~48px (3rem) |
| `text-display-md` | Hero subtitles | ~36px (2.25rem) |
| `text-lg` | Body text | ~18px (1.125rem) |
| `text-sm` | Supporting text | ~14px (0.875rem) |

#### How to Verify

1. Inspect a slide title (e.g., "Why now")
2. Check computed `font-size`
3. Should match the main deck view

---

### 4. Slide-by-Slide Comparison

For each slide type, verify layout matches:

#### Title Slide (Slide 1)
- [ ] Centered layout
- [ ] Hero title size correct
- [ ] Subtitle below title
- [ ] No navigation visible

#### Stat Slide (e.g., "Why now")
- [ ] Title centered above card
- [ ] Stat card has subtle gradient background
- [ ] Large stat value readable
- [ ] Label and subtext below value

#### Bullet Slide (e.g., "The Problem")
- [ ] Two-column layout (title left, bullets right)
- [ ] Cards stacked vertically
- [ ] Proper gap between cards (`gap-4`)

#### Team Slide
- [ ] Grid layout of team cards
- [ ] Fixed card width (240px)
- [ ] Names and roles visible

---

## Files Reference

| File | Purpose |
|------|---------|
| `print/page.tsx` | Renders all slides with viewport-relative sizing |
| `print/layout.tsx` | Forces light mode via CSS variable overrides |
| `api/payva-deck/export-pdf/route.ts` | Puppeteer PDF generation |
| `components/export-button.tsx` | UI button that triggers export |
| `components/print-view.tsx` | Original print component (reference) |
| `styles/print.css` | Print media styles (for browser print) |

---

## CSS Variables Override (Light Mode)

The print layout forces these values regardless of dark mode:

```css
/* Text colors */
--color-text-primary: rgb(24 29 39);      /* Near-black */
--color-text-secondary: rgb(65 70 81);    /* Dark gray */
--color-text-tertiary: rgb(83 88 98);     /* Medium gray */
--color-text-quaternary: rgb(113 118 128); /* Light gray */

/* Background colors */
--color-bg-primary: rgb(255 255 255);     /* White */
--color-bg-secondary: rgb(250 250 250);   /* Off-white */
--color-bg-tertiary: rgb(245 245 245);    /* Light gray */

/* Brand (for card gradients) */
--color-bg-brand-primary: rgb(249 245 255); /* Light purple tint */
```

---

## Debugging Steps

### If colors are wrong:

1. Check if `.dark-mode` class exists on `<html>`
2. Verify CSS override specificity in layout.tsx
3. Check Puppeteer `page.evaluate()` runs after page load
4. Inspect computed CSS variables in DevTools

### If spacing is wrong:

1. Compare `.slide-frame` padding with PrintView
2. Check viewport size (should be 1920×1080 for proper scaling)
3. Verify no CSS resets breaking Tailwind classes

### If PDF dimensions are wrong:

1. Check API route `page.pdf()` settings
2. Width should be `13.333in`, height `7.5in`
3. Margins should all be `0`

---

## Success Criteria

The export is successful when:

- [ ] All slides render in light mode (dark text on white background)
- [ ] Spacing matches main deck view exactly
- [ ] Typography sizes are consistent
- [ ] Cards have subtle gradient backgrounds (not solid dark)
- [ ] Page numbers appear in bottom-right
- [ ] PDF opens in PowerPoint at correct dimensions
- [ ] No navigation or UI elements visible
- [ ] All 15 slides present in correct order

---

## Quick Test Procedure

1. **Open main deck**: http://localhost:3002/payva-deck
2. **Open print page**: http://localhost:3002/payva-deck/print
3. **Compare side-by-side**:
   - Same slide (e.g., slide 6 "Why now")
   - Check title color (should be near-black, not white)
   - Check card background (should be white/light gradient)
   - Check spacing feels identical
4. **Test export**:
   - Click "Export PDF" on main deck
   - Open downloaded PDF
   - Verify all slides present and correctly formatted

---

*Last Updated: January 2025*
