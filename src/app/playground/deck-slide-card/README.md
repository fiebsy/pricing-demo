# Deck Slide Card Playground

## Status
- [x] Incubating
- [ ] Production Ready

## Purpose
Interactive playground for styling and testing Payva deck slide cards with full control over visual properties and PDF export optimization.

## Features
- **Complete styling control**: backgrounds, shine effects, shadows, borders, corners
- **Multiple content types**: stat cards, bullet points, team members, charts
- **7 presets**: Default, Minimal, Elevated, Brand, Print Optimized, High Contrast, Glass Effect
- **PDF export testing**: Direct integration with `/api/payva-deck/export-pdf`
- **Grid/Single view toggle**: Test multiple cards simultaneously
- **Print optimization settings**: Force light mode, viewport scaling

## Files
| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/deck-slide-card.tsx` | Core component | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |
| `utils/class-builders.ts` | Style mapping | Yes |
| `utils/export-utils.ts` | PDF export helpers | Yes |

## Migration Target
`src/components/ui/features/deck-slide-card`

## Migration Checklist
- [ ] Component finalized in playground
- [ ] All presets tested in browser
- [ ] PDF export verified
- [ ] Print CSS optimizations confirmed
- [ ] Copy core files to production location
- [ ] Create production variants from presets
- [ ] Integrate with existing slide system
- [ ] Add to component exports
- [ ] Delete playground files

## Usage

### Development
```bash
# Start dev server
pnpm dev

# Navigate to playground
http://localhost:3002/playground/deck-slide-card
```

### Testing PDF Export
1. Configure card styling using controls
2. Toggle "Print Optimized" in Export panel
3. Click "Export PDF Test" button
4. Review generated PDF for quality

### Configuration Structure
```typescript
{
  outer: {
    background: 'gradient',
    gradientFrom: 'tertiary',
    gradientTo: 'quaternary',
    shine: 'shine-1',
    corner: 'squircle',
    // ... more styling options
  },
  content: {
    type: 'stat',
    statValue: '$250B → $480B',
    titleColor: 'primary',
    // ... content configuration
  },
  layout: {
    width: 'auto',
    minWidth: 320,
    // ... layout options
  },
  export: {
    printOptimized: false,
    forceLight: false,
    viewportScaling: false
  }
}
```

## Key Patterns

### Shine Effects
- `shine-0`: 195° angle shine
- `shine-1`: 180° angle (default)
- `shine-2`: Theme-aware shine
- `shine-3`: Enhanced 2px shine (print optimized)
- `shine-brand`: Brand color shine

### Corner Styles
- `round`: Standard rounded corners
- `squircle`: Smooth squircle shape (default)
- `bevel`: Beveled corners
- `scoop`: Scooped corners

### Print Optimization
When `printOptimized` is enabled:
- Forces light mode color scheme
- Applies viewport-relative typography
- Removes animations
- Ensures color accuracy

## Integration Points
- Uses existing `SlideCard` component patterns
- Compatible with `/api/payva-deck/export-pdf` endpoint
- Supports all slide types (stat, bullet, chart, team)
- Maintains print layout overrides from production

## Notes
- Arrow icon automatically renders for values with "→"
- Gradient backgrounds support all directions
- Border width configurable from 1-4px
- Supports semantic color tokens throughout