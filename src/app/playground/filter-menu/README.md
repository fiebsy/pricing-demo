# Filter Menu Playground

## Status
- [x] Incubating

## Overview
Playground for customizing the Filter Menu component from the dashboard. Allows testing different trigger modes (icon + text vs icon only), variants, sizes, and menu appearance settings.

## Files
| File | Purpose | Migrate? |
|------|---------|----------|
| `page.tsx` | Playground wrapper | Delete |
| `core/filter-menu-preview.tsx` | Preview component | Partial |
| `config/types.ts` | Type definitions | Yes |
| `config/options.ts` | Control options | No |
| `config/presets.ts` | Preset definitions | Yes (as variants) |
| `panels/panel-config.ts` | Panel config | No |

## Migration Target
`src/components/ui/patterns/filter/filter-menu`

## Features

### Trigger Configuration
- **Mode**: Icon + Text or Icon Only
- **Variant**: Default (shine), Ghost, Outline
- **Size**: sm, md, lg
- **Rounded**: md, lg, xl, full

### Menu Configuration
- **Position**: side (top, right, bottom, left), align (start, center, end)
- **Offset**: sideOffset, alignOffset (pixels)
- **Width**: 180-360px
- **Header**: Show/hide menu header

### Menu Appearance
- **Background**: primary, secondary, tertiary, quaternary
- **Gradient**: subtle-depth variations
- **Shine**: Various shine effects
- **Shadow**: none through 2xl
- **Border Radius**: none through 2xl
- **Squircle**: Toggle squircle corners

## Presets
1. **Default** - Standard filter button with shine variant
2. **Icon Only** - Compact icon-only trigger
3. **Ghost** - Subtle ghost variant
4. **Outline** - Bordered outline variant
5. **Compact Ghost** - Icon-only with ghost styling
6. **With Header** - Menu with header section
7. **Large Rounded** - Larger trigger with extra shine

## Usage

### Default Usage
```tsx
import { FilterMenu } from '@/components/ui/patterns/filter'

<FilterMenu
  items={FILTER_ITEMS}
  onFilterSelect={handleFilterSelect}
  activeFilterIds={activeFilters}
/>
```

### Icon-Only Trigger
The playground demonstrates how to create an icon-only version of the filter trigger. This pattern can be extracted for production use.

## Checklist
- [x] Component finalized in playground
- [x] All presets documented
- [ ] Extract icon-only trigger variant to FilterTrigger
- [ ] Add trigger mode prop to FilterTrigger
- [ ] Document public API
- [ ] Delete playground files after migration
