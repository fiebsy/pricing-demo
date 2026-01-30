# MetricCard

A composable metric display card with configurable layout, animations, and styling. Built for dashboard KPIs and filterable metric tiles.

**Location**: `@/modules/design-system/v2/components/ui/prod/features/metric-card`

---

## Quick Start

```tsx
import {
  MetricCard,
  DEFAULT_METRIC_CARD_CONFIG,
  METRIC_CARD_PRESETS,
} from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

<MetricCard
  label="Total Revenue"
  value="$125,000"
  count="24 orders"
  trend={{ value: 12, direction: 'up', showIcon: true }}
  config={METRIC_CARD_PRESETS.flat}
/>
```

---

## File Structure

```
metric-card/
├── index.ts              # Public API exports
├── metric-card.tsx       # Main component
├── types.ts              # Type definitions
├── config.ts             # Constants, defaults, presets
├── utils.ts              # Style builders, formatters
├── README.md             # This file
└── components/
    ├── index.ts          # Sub-component exports
    └── trend-badge.tsx   # TrendBadge component
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Main label text (e.g., "Total At Risk") |
| `labelSuffix` | `string` | - | Optional suffix shown next to label |
| `value` | `string` | required | Main value (e.g., "$125,000") |
| `count` | `string` | required | Count/subtitle (e.g., "24 orders") |
| `trend` | `TrendIndicator` | - | Optional trend indicator |
| `isHovered` | `boolean` | `false` | Controlled hover state |
| `isActive` | `boolean` | `false` | Active/selected state |
| `config` | `MetricCardConfig` | required | Card configuration |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `() => void` | - | Click handler |
| `onMouseEnter` | `() => void` | - | Mouse enter handler |
| `onMouseLeave` | `() => void` | - | Mouse leave handler |

---

## Configuration

### Using Presets

```tsx
import { METRIC_CARD_PRESETS } from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

// Default preset
<MetricCard config={METRIC_CARD_PRESETS.default} ... />

// Flat preset (outer hidden, reveals on active)
<MetricCard config={METRIC_CARD_PRESETS.flat} ... />
```

### Custom Configuration

```tsx
import {
  DEFAULT_METRIC_CARD_CONFIG,
  type MetricCardConfig,
} from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

const customConfig: MetricCardConfig = {
  ...DEFAULT_METRIC_CARD_CONFIG,

  // Section order: label → value → count (or any permutation)
  sectionOrder: ['value', 'label', 'count'],

  // Spacing
  gap: 12,
  gap1: 0,   // Gap after first section
  gap2: 16,  // Gap after second section
  minWidth: 180,

  // Layer styles (outer wraps inner)
  outer: {
    background: 'secondary',
    shine: '0',
    shineIntensity: 'normal',
    shineShadow: 'none',
    depth: 'none',
    depthColor: 'primary',
    depthDirection: 'bottom',
    opacity: 0, // Hidden by default
  },
  inner: {
    background: 'primary',
    shine: '0',
    shineIntensity: 'subtle',
    shineShadow: 'none',
    depth: 'none',
    depthColor: 'primary',
    depthDirection: 'bottom',
    opacity: 100,
  },

  // Padding & radius
  outerPadding: 4,
  innerPadding: 16,
  borderRadius: 16,

  // Typography
  labelStyle: { color: 'tertiary', fontFamily: 'text', fontSize: 'sm', fontWeight: 'normal' },
  valueStyle: { color: 'primary', fontFamily: 'display', fontSize: '3xl', fontWeight: 'medium' },
  countStyle: { color: 'quaternary', fontFamily: 'text', fontSize: 'xs', fontWeight: 'normal' },
  trendStyle: {
    fontSize: 'xs',
    fontWeight: 'medium',
    iconSize: 12,
    useDirectionalColors: true,
    color: 'tertiary',
    alignment: 'center',
  },

  // Animation
  hoverAnimation: 'none', // 'none' | 'lift' | 'glow' | 'fade'
  transitionDuration: 100,

  // State overrides
  hoverOuter: { opacity: 0 },
  hoverInner: { depth: '10' },
  activeOuter: { shine: '1', depth: '20', opacity: 100 },
  activeInner: { shine: '2', shineIntensity: 'normal', shineShadow: 'sm' },
  activeValueStyle: { color: 'primary' },
  activeLabelStyle: { opacity: 90 },
}
```

---

## Production Usage Guidelines

### Flat Preset (Recommended)

For production dashboard tiles, **always use `METRIC_CARD_PRESETS.flat`** without modifications:

```tsx
import { MetricCard, METRIC_CARD_PRESETS } from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

// CORRECT: Use flat preset directly
<MetricCard
  label="Total Contracts"
  value="$125,000"
  count="24 contracts"  // Note: "contracts" not "orders"
  config={METRIC_CARD_PRESETS.flat}
  isActive={isActive}
/>

// INCORRECT: Custom configuration for dashboard tiles
<MetricCard
  label="Total Contracts"
  value="$125,000"
  count="24 contracts"
  config={{
    ...METRIC_CARD_PRESETS.flat,
    hoverAnimation: 'lift',  // Don't add extra animations
  }}
/>
```

### Flat Preset Behavior

The flat preset provides intentional, hardened styling:

| State | Outer Layer | Inner Layer |
|-------|-------------|-------------|
| Default | Hidden (opacity: 0) | Visible with shine-0 |
| Hover | Hidden | depth-10 added |
| Active | shine-1 + depth-20 (reveals) | shine-2 + shineShadow-sm |

**Key characteristics**:
- No hover animation (`hoverAnimation: 'none'`)
- Outer layer reveals only on active state
- Inner layer always visible
- Consistent with design system standards

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|---------------|------------------|
| Custom hover effects | Overrides hardened styling | Trust flat preset |
| Wrong count label | "orders" vs "contracts" | Use correct data entity |
| Extra shine effects | Adds visual noise | Flat preset has appropriate shine |
| Custom border radius | Breaks consistency | Flat preset uses 16px radius |

---

## Controlled Selection Pattern

For dashboard tiles where clicking filters data:

```tsx
import { useState } from 'react'
import { MetricCard, METRIC_CARD_PRESETS } from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

type MetricId = 'total' | 'pending' | 'resolved' | 'escalated'

interface Metric {
  id: MetricId
  label: string
  value: string
  count: string
}

const METRICS: Metric[] = [
  { id: 'total', label: 'Total At Risk', value: '$125,000', count: '24 orders' },
  { id: 'pending', label: 'Pending', value: '$45,200', count: '8 orders' },
  { id: 'resolved', label: 'Resolved', value: '$78,500', count: '15 orders' },
  { id: 'escalated', label: 'Escalated', value: '$12,300', count: '3 orders' },
]

function MetricBar() {
  const [selectedId, setSelectedId] = useState<MetricId | null>(null)
  const [hoveredId, setHoveredId] = useState<MetricId | null>(null)

  const handleClick = (id: MetricId) => {
    setSelectedId(selectedId === id ? null : id)
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {METRICS.map((metric) => (
        <MetricCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
          count={metric.count}
          isHovered={hoveredId === metric.id}
          isActive={selectedId === metric.id}
          config={METRIC_CARD_PRESETS.flat}
          onClick={() => handleClick(metric.id)}
          onMouseEnter={() => setHoveredId(metric.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="cursor-pointer"
        />
      ))}
    </div>
  )
}
```

---

## Integration with Table Filtering

See `table-payva-v2` for the complete pattern:

```tsx
// In your dashboard component:
import { MetricCard, METRIC_CARD_PRESETS } from '@/modules/design-system/v2/components/ui/prod/features/metric-card'

// 1. Define metrics based on your data
const metricValues = useMemo(() => {
  return METRIC_DEFINITIONS.map((def) => {
    const items = def.getItems(allItems)
    return {
      id: def.id,
      label: def.label,
      count: items.length,
      totalBalance: items.reduce((sum, item) => sum + item.balance, 0),
    }
  })
}, [allItems])

// 2. Render with controlled state
{metricValues.map((metric) => (
  <MetricCard
    key={metric.id}
    label={metric.label}
    value={formatCurrency(metric.totalBalance)}
    count={`${metric.count} orders`}
    isHovered={hoveredId === metric.id}
    isActive={activeMetric === metric.id}
    config={METRIC_CARD_PRESETS.flat}
    onClick={() => setActiveMetric(metric.id)}
    onMouseEnter={() => setHoveredId(metric.id)}
    onMouseLeave={() => setHoveredId(null)}
    className="cursor-pointer"
  />
))}
```

---

## Value Formatting

Enable compact notation for large numbers:

```tsx
const config: MetricCardConfig = {
  ...DEFAULT_METRIC_CARD_CONFIG,
  valueFormat: {
    compact: true,           // Enable k, M, B suffixes
    maxDigits: 4,            // Max significant digits
    prefixOpacity: 100,      // $ opacity (0-100)
    suffixOpacity: 50,       // k/M/B opacity (0-100)
  },
}

// Input: "$1,250,000" → Output: "$1.25M" (with M at 50% opacity)
```

---

## Trend Indicators

```tsx
<MetricCard
  ...
  trend={{
    value: 12,              // Percentage value
    direction: 'up',        // 'up' | 'down' | 'neutral'
    showIcon: true,         // Show arrow icon
  }}
  config={{
    ...DEFAULT_METRIC_CARD_CONFIG,
    trendStyle: {
      fontSize: 'xs',
      fontWeight: 'medium',
      iconSize: 12,
      useDirectionalColors: true,  // Green for up, red for down
      color: 'tertiary',           // Used when useDirectionalColors is false
      alignment: 'center',         // 'center' | 'baseline'
    },
  }}
/>
```

---

## Available Types

```tsx
// Shine effects
type ShineType = 'none' | '0' | '1' | '2' | '3' | 'brand'
type ShineIntensity = 'subtle' | 'normal' | 'intense'
type ShineShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg'

// Depth effects
type DepthIntensity = 'none' | '10' | '20' | '30' | '40' | '50'
type DepthColor = 'primary' | 'brand' | 'secondary'
type DepthDirection = 'bottom' | 'left' | 'right' | 'top'

// Colors
type BackgroundColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand-primary' | 'brand-secondary'
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'brand-primary' | 'brand-secondary'

// Typography
type FontFamily = 'text' | 'display'
type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
type FontWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
type IconSize = 10 | 12 | 14 | 16 | 18 | 20 | 24

// Layout
type SectionType = 'label' | 'value' | 'count'
type HoverAnimation = 'none' | 'lift' | 'glow' | 'fade'
type TrendDirection = 'up' | 'down' | 'neutral'
type TrendAlignment = 'baseline' | 'center'
```

---

## Utility Exports

For advanced customization:

```tsx
import {
  // Style builders
  buildShineClass,
  buildDepthClass,
  buildLayerClasses,
  buildSectionClasses,
  getHoverAnimationClasses,

  // Style merging
  mergeLayerStyles,
  mergeSectionStyles,

  // Value formatting
  formatCompactValue,

  // Class mappings
  BACKGROUND_CLASSES,
  TEXT_COLOR_CLASSES,
  FONT_FAMILY_CLASSES,
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TREND_COLORS,
} from '@/modules/design-system/v2/components/ui/prod/features/metric-card'
```

---

## Playground

**Development URL**: `/playground/ui/component/metric-card`

Interactive playground with:
- Full configuration panel
- Real-time preview
- Preset switching
- Copy configuration

---

## Migration Notes

### From DisplayCard

If you're replacing `DisplayCard` with `MetricCard`:

**Before (DisplayCard)**:
```tsx
<DisplayCard variant="subtle" width="full">
  <DisplayCard.Content padding={16}>
    <div className="flex flex-col gap-1">
      <span className="text-tertiary text-sm">{label}</span>
      <span className="text-primary text-2xl font-semibold">{value}</span>
      <span className="text-quaternary text-xs">{count}</span>
    </div>
  </DisplayCard.Content>
</DisplayCard>
```

**After (MetricCard)**:
```tsx
<MetricCard
  label={label}
  value={value}
  count={count}
  config={METRIC_CARD_PRESETS.flat}
  isActive={isActive}
  isHovered={isHovered}
/>
```

Benefits:
- Built-in trend indicators
- Configurable section order
- Value formatting (compact notation)
- State-driven style overrides
- Type-safe configuration

---

## Related Components

| Component | Use Case |
|-----------|----------|
| `DisplayCard` | Generic card container |
| `FeaturedIcon` | Icon with background |
| `Badge` | Status indicators |

---

*Last Updated: January 2025*
