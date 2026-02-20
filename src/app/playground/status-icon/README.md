# Status Icon Playground

Circular indicator with configurable stroke, pie fill or icon interior, and companion text. Used to represent order states (Active/Closed with substatus levels).

## Migration Target

`src/components/ui/prod/features/status-icon`

## Order Status Hierarchy

| Category | Status | Substatus |
|----------|--------|-----------|
| **Active** | Healthy | — |
| **Active** | At-Risk | Low, Medium, High |
| **Closed** | Completed | — |
| **Closed** | Clawbacks | Default, Chargeback, Canceled |
| **Closed** | Declined | — |

## File Structure

```
src/app/playground/status-icon/
├── page.tsx                  # Playground page
├── core/
│   └── status-icon.tsx       # Core SVG component (migration-ready)
├── config/
│   ├── types.ts              # Config interfaces
│   ├── presets.ts            # Status presets
│   ├── options.ts            # Control panel options
│   └── index.ts              # Re-exports
├── panels/
│   └── panel-config.ts       # UnifiedControlPanel builder
└── README.md                 # This file
```

## Component Features

1. **Circular SVG icon** with configurable diameter (12-64px)
2. **Stroke styling**: width, color (semantic tokens), dashed/solid, dash pattern, line cap
3. **Interior fill options**:
   - `none` - Empty circle
   - `pie` - Progress fill (0-100%)
   - `icon` - Hugeicon inside
4. **Companion text**: label with typography controls (size, weight, color, position)
5. **State presets**: One for each order status

## Usage

```tsx
import { StatusIcon } from './core/status-icon'
import { DEFAULT_STATUS_ICON_CONFIG } from './config'

// Basic usage with default config
<StatusIcon config={DEFAULT_STATUS_ICON_CONFIG} />

// With preset
import { STATUS_ICON_PRESETS, getPresetById } from './config'

const completedPreset = getPresetById('completed')
<StatusIcon config={completedPreset.data} />

// Custom config
const customConfig = {
  size: { diameter: 32 },
  stroke: {
    width: 2,
    color: 'success',
    dashed: false,
    dashArray: '',
    lineCap: 'round',
  },
  fill: {
    type: 'pie',
    percentage: 75,
    color: 'success',
  },
  text: {
    show: true,
    content: '75% Complete',
    size: 'sm',
    weight: '500',
    color: 'primary',
    position: 'right',
    gap: 8,
  },
}

<StatusIcon config={customConfig} />
```

## Presets

| Preset ID | Name | Description |
|-----------|------|-------------|
| `default` | Default | Empty circle, neutral stroke |
| `healthy` | Healthy | Green solid stroke, 100% pie fill |
| `at-risk-low` | At-Risk Low | Amber dashed stroke, 25% pie fill |
| `at-risk-medium` | At-Risk Medium | Amber dashed stroke, 50% pie fill |
| `at-risk-high` | At-Risk High | Red dashed stroke, alert icon |
| `completed` | Completed | Green stroke, checkmark icon |
| `clawback` | Clawback | Red stroke, cancel icon |
| `declined` | Declined | Gray stroke, minus icon |

## Migration Steps

1. Copy `core/status-icon.tsx` to target location
2. Update import paths:
   - `@/lib/utils` → adjust as needed
   - `@/components/ui/core/primitives/icon` → adjust as needed
3. Copy `config/types.ts` for TypeScript interfaces
4. Convert presets to component variants if needed
5. Add to component registry

## Dependencies

- `@hugeicons-pro/core-stroke-rounded` - Icons
- `@/components/ui/core/primitives/icon` - HugeIcon wrapper
- `@/lib/utils` - cn utility

## Color Tokens

The component uses semantic color tokens that map to CSS variables:

| Token | CSS Variable |
|-------|--------------|
| `success` | `var(--color-success-500)` |
| `warning` | `var(--color-warning-500)` |
| `error` | `var(--color-error-500)` |
| `neutral` | `var(--color-gray-400)` |
| `brand` | `var(--color-brand-primary)` |
| `primary` | `var(--color-fg-primary)` |
| `secondary` | `var(--color-fg-secondary)` |
| `tertiary` | `var(--color-fg-tertiary)` |

## Technical Notes

### SVG Pie Fill Technique

Uses the `strokeDasharray`/`strokeDashoffset` technique:

```typescript
const circumference = 2 * Math.PI * radius
const strokeDashoffset = circumference - (percentage / 100) * circumference
```

### Icon Mapping

Icons are statically imported for reliability (no dynamic imports). The icon map is defined in `core/status-icon.tsx`:

```typescript
const ICON_MAP = {
  Tick01: Tick01Icon,
  Cancel01: Cancel01Icon,
  Alert02: Alert02Icon,
  // etc.
}
```

To add new icons:
1. Import the icon from `@hugeicons-pro/core-stroke-rounded`
2. Add to `ICON_MAP`
3. Add to `ICON_NAME_OPTIONS` in `config/options.ts`
