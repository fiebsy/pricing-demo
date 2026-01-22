# Ratings Panel Playground

## Status
- [x] Incubating

## Overview
Interactive playground for the confidence/ratings panel component with:
- Mind/Voice/Appearance section tabs with progress wheels
- Expandable category accordions with sub-score displays
- Optional badge integration (score, status, delta)
- Animated connection lines between sub-scores
- Filter menu integration

## Files

| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/RatingsPanel.tsx` | Core component | Yes |
| `components/SectionTabs.tsx` | Tab navigation | Yes |
| `components/CategoryScore.tsx` | Category accordion | Yes |
| `components/SubScore.tsx` | Sub-score item | Yes |
| `components/ScoreProgressBar.tsx` | Progress bar | Yes |
| `components/ProgressWheel.tsx` | Circular progress | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `config/mock-data.ts` | Mock data | No (use real data) |
| `panels/panel-config.ts` | Panel config | No |

## Migration Target
`src/components/ui/prod/features/ratings-panel`

## Presets

| Preset | Description |
|--------|-------------|
| `default` | Standard profile panel appearance |
| `minimal` | Clean, no decorations |
| `enhanced-lines` | Animated lines connecting sub-scores |
| `with-badges` | Score badges on sub-items |
| `delta-badges` | Show +/- vs network average |
| `status-badges` | Status indicators with dots |
| `with-filter` | Filter menu enabled in header |
| `brand-elevated` | Premium brand styling |
| `full-featured` | All features enabled |

## Controls

### Panel Styling
- Background color (primary/secondary/tertiary/transparent)
- Shine effects (shine-0 through shine-3, brand)
- Shadow (none/xs/sm/md/lg)
- Border (toggle, color selection)
- Border radius (0-32px)
- Padding (8-32px)

### Section Tabs
- Show/hide overall score badge
- Show/hide Appearance tab
- Progress wheel size (16-40px)
- Progress stroke width (1-5px)
- Active tab background color

### Categories
- Show/hide progress bar
- Progress bar size (sm/md/lg)
- Show/hide network benchmark line
- Show/hide Improve button

### Sub-Scores
- Animated line (enable/disable)
- Line color, stroke width, corner radius
- Line animation duration, stagger delay
- Badge display mode (none/score/status/delta)
- Badge color (auto/gray/success/warning/error/brand)
- Badge size (xs/sm/md)
- Badge shape (pill/rounded/square)
- Badge dot indicator

### Filter Menu
- Enable/disable filter menu
- Position (header/inline)

## Usage

```tsx
import { RatingsPanel } from './core/RatingsPanel'
import { MOCK_SCORES, DEFAULT_RATINGS_CONFIG } from './config'

<RatingsPanel
  scores={MOCK_SCORES}
  config={DEFAULT_RATINGS_CONFIG}
  activeSection="mind"
  expandedCategory={null}
  onSectionChange={(section) => setActiveSection(section)}
  onCategoryToggle={(category) => setExpandedCategory(category)}
  onImproveCategory={(category, section) => handleImprove(category, section)}
/>
```

## Migration Checklist

- [ ] Component finalized in playground
- [ ] All presets documented
- [ ] Copy core files to production location
- [ ] Create production variants from presets
- [ ] Connect to real data sources (GraphQL)
- [ ] Add to component exports
- [ ] Delete playground files
- [ ] Update profile page to use migrated component

## Dependencies

- `@base-ui/react/collapsible` - Accordion functionality
- `@hugeicons-pro/*` - Icons
- `@/components/ui/prod/base/badge` - Badge component
- `@/components/ui/prod/base/filter/filter-menu-motion` - Filter menu
- `@/components/ui/prod/base/icon` - HugeIcon wrapper

## Animation Notes

### S-Tier (GPU-optimized)
- Progress bar fill uses `scaleX` transform (not width)
- Sub-score stagger uses CSS `animation-delay`
- All transitions use `motion-safe` and `motion-reduce` variants

### Animated Lines (Optional)
- SVG path animation with stroke-dasharray/dashoffset
- Staggered drawing effect on accordion expansion
- Configurable line color, stroke width, corner radius

---
**Last Updated**: January 2025
