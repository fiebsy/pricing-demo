# PDF Export System

Server-side PDF generation for the PAYVA pitch deck using Puppeteer.

## Quick Start

### Export PDF
```
GET /api/payva-deck/export-pdf
```

### Export with Debug Borders
```
GET /api/payva-deck/export-pdf?debug=true
```

Debug mode shows:
- Red border: 16:9 frame boundary
- Green dashed border: 5% safe zone
- Dimension labels

### Preview Print Layout
```
/payva-deck/print
/payva-deck/print?debug=true
```

---

## Architecture

```
User clicks "Export PDF"
        │
        ▼
Frontend (export-button.tsx)
  → Calls GET /api/payva-deck/export-pdf
  → Shows loading state
  → Triggers download
        │
        ▼
API Route (api/payva-deck/export-pdf/route.ts)
  → Launches headless Chrome via Puppeteer
  → Sets viewport to 1920×1080 @ 2x scale
  → Navigates to /payva-deck/print
  → Forces light mode
  → Generates PDF at PowerPoint dimensions
  → Returns PDF as download
        │
        ▼
Print Page (payva-deck/print/page.tsx)
  → Renders ALL slides (not just current)
  → Uses viewport-relative sizing (100vw × 100vh per slide)
  → Absolutely positioned subtitle and page number
        │
        ▼
Print Layout (payva-deck/print/layout.tsx)
  → Forces light mode via CSS variable overrides
  → Overrides card styling for PDF compatibility
  → Hides SlideLayout subtitle (rendered separately)
```

---

## Dimensions

| Property | Value |
|----------|-------|
| **PDF Page Size** | 13.333" × 7.5" (PowerPoint Widescreen) |
| **Viewport** | 1920 × 1080 @ 2x device scale |
| **Safe Zone** | 5% padding from edges |
| **Content Max Width** | 56rem (896px) |

---

## Files

| File | Purpose |
|------|---------|
| `page.tsx` | Renders all slides with viewport-relative sizing |
| `layout.tsx` | Forces light mode, card styling overrides |
| `EXPORT-AUDIT.md` | Detailed visual audit checklist |

### Related Files

| File | Purpose |
|------|---------|
| `/api/payva-deck/export-pdf/route.ts` | Puppeteer PDF generation |
| `/payva-deck/components/export-button.tsx` | UI button that triggers export |

---

## Key Implementation Details

### Subtitle Positioning

The top-left subtitle is rendered with absolute positioning in `page.tsx`:
```tsx
{slide.subtitle && slide.type !== 'title' && slide.type !== 'closing' && (
  <div style={{
    position: 'absolute',
    top: '5%',
    left: '5%',
    // ...styles
  }}>
    {slide.subtitle}
  </div>
)}
```

This matches the page number positioning pattern (`bottom: 5%, right: 5%`) to ensure both align with the safe zone.

Title and closing slides are excluded since they handle subtitles differently (centered content).

### Card Styling

Cards use `color-mix()` for gradients which doesn't work in Puppeteer. The print layout overrides with a simple border:

```css
.shine-3 {
  background: linear-gradient(180deg, #ffffff 0%, #fdfcfe 100%) !important;
  box-shadow: none !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}
```

### Light Mode Forcing

The layout forces light mode by:
1. Removing `.dark-mode` class via inline script
2. Overriding all CSS variables with light mode values
3. Setting `color-scheme: light`

---

## Troubleshooting

### Content not centered
Check that `page.tsx` has:
```tsx
alignItems: 'center',
justifyContent: 'center',
```

### Subtitle in wrong position
The subtitle should be absolutely positioned at `top: 5%, left: 5%`. If it's offset, check that the SlideLayout subtitle is being hidden via CSS.

### Cards look gray/wrong
The `color-mix()` CSS function doesn't work in Puppeteer. Ensure `layout.tsx` has the `.shine-3` override.

### PDF dimensions wrong
Check API route has:
```ts
width: '13.333in',
height: '7.5in',
margin: { top: 0, right: 0, bottom: 0, left: 0 },
```

---

## Testing Checklist

- [ ] All 15 slides render
- [ ] Content centered on each slide
- [ ] Subtitle aligned with safe zone (slides 2-14)
- [ ] No subtitle on title/closing slides
- [ ] Page numbers inside safe zone
- [ ] Cards have visible border
- [ ] Light mode colors (dark text on white)
- [ ] PDF opens in PowerPoint correctly
