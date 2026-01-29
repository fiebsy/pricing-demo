# SlideCard Playground

## Status
- [x] Incubating
- [ ] Ready for migration
- [ ] Migrated to production

## Overview
Universal card component used throughout the PAYVA pitch deck for charts, stats, team members, and logo grids.

## Files
| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/slide-card.tsx` | Core component | Yes |
| `config/types.ts` | Type definitions | Yes |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `config/options.ts` | Control options | No |
| `panels/panel-config.ts` | Panel config | No |
| `utils/class-builders.ts` | Style mapping | Yes |

## Migration Target
`src/components/ui/prod/features/slide-card`

## Usage Examples

### Financial Chart Card
```tsx
<SlideCard
  config={{
    card: {
      background: 'tertiary',
      backgroundGradient: true,
      gradientFrom: 'tertiary',
      gradientTo: 'quaternary',
      shine: 'shine-1',
      corner: 'squircle',
      padding: 40,
    },
    content: {
      type: 'chart',
      showPlaceholder: true,
    }
  }}
/>
```

### Stat Card
```tsx
<SlideCard
  config={{
    card: {
      background: 'secondary',
      shine: 'shine-2',
      shadow: 'lg',
      depth: 'depth-gradient-2',
    },
    content: {
      type: 'stat',
      showPlaceholder: true,
    }
  }}
/>
```

### Team Member Card
```tsx
<SlideCard
  config={{
    card: {
      background: 'brand-solid',
      shine: 'shine-brand',
      corner: 'squircle',
      padding: 24,
    },
    content: {
      type: 'team',
      showPlaceholder: true,
    }
  }}
/>
```

## Presets

1. **Default Deck** - Current PAYVA deck style with gradient background
2. **Minimal** - Clean design with no effects
3. **Elevated** - Premium look with depth and shadows
4. **Brand Solid** - Solid brand colors
5. **Glass** - Translucent glassmorphism effect
6. **Financial Chart** - Optimized for chart displays

## Migration Checklist
- [ ] Component finalized in playground
- [ ] All presets tested and documented
- [ ] Copy core files to production location
- [ ] Create production variants from presets
- [ ] Update PAYVA deck to use new component
- [ ] Add to component exports
- [ ] Delete playground files

## Notes
- Component supports custom children or demo content
- Animation system includes fade, scale, slideUp, slideDown
- Fully compatible with existing deck typography system
- Gradient backgrounds use Tailwind's gradient utilities
- Corner styles use custom corner utilities (squircle, bevel, scoop)