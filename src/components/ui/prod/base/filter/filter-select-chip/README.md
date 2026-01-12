# FilterSelectChip

Biaxial filter chip that expands into a dropdown menu for selecting filter values. Combines FilterChip styling with a two-layer animation system for smooth expansion.

## Overview

FilterSelectChip is an evolution of FilterChip that allows users to **change filter values in-place** by clicking the chip:

- **Click chip**: Opens dropdown menu with available options
- **Select option**: Updates value and closes menu
- **Click close (X)**: Removes filter entirely via `onRemove`

This enables a workflow where users can refine their filter without removing it first.

---

## Quick Start

```tsx
import { FilterSelectChip } from '@/modules/design-system/v2/components/ui/prod/base/filter'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'

const STATUS_OPTIONS = [
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
]

function StatusFilter() {
  const [status, setStatus] = useState('active')

  return (
    <FilterSelectChip
      value={status}
      options={STATUS_OPTIONS}
      icon={CheckmarkCircle02Icon}
      onChange={setStatus}
      onRemove={() => setStatus(null)}
    />
  )
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Currently selected option ID |
| `options` | `FilterOption[]` | required | Available filter options |
| `icon` | `IconComponent` | — | HugeIcon for chip display |
| `label` | `string` | — | Text label (if no icon) |
| `onChange` | `(id: string) => void` | — | Called when option selected |
| `onRemove` | `() => void` | — | Called when X clicked |
| `disabledOptions` | `string[]` | `[]` | Option IDs to show as disabled |
| `config` | `Partial<FilterSelectChipConfig>` | — | Override default config |
| `className` | `string` | — | Container className |

### FilterOption

```ts
interface FilterOption {
  id: string
  label: string
  icon?: IconComponent
  disabled?: boolean
}
```

---

## Configuration

Override any config value via the `config` prop:

```tsx
<FilterSelectChip
  value={value}
  options={options}
  config={{
    panelWidth: 240,
    menuDuration: 300,
    appearance: {
      shine: 'default',
      shadow: 'md',
    },
  }}
/>
```

### Chip Configuration (Entry Animation)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chipSize` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `chipRounded` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius |
| `iconSize` | `number` | `14` | Icon size (px) |
| `iconOpacity` | `number` | `0.5` | Icon opacity |
| `iconValueGap` | `number` | `4` | Gap icon→value |
| `paddingLeft` | `number` | `8` | Left padding |
| `paddingRight` | `number` | `6` | Right padding |
| `chipDuration` | `number` | `200` | Entry animation (ms) |
| `revealMode` | `RevealMode` | `'fade'` | Value reveal style |

### Menu Configuration (Biaxial Expansion)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `menuDuration` | `number` | `225` | Expand animation (ms) |
| `menuCollapseDuration` | `number` | `125` | Collapse animation (ms) |
| `contentFadeDuration` | `number` | `75` | Content fade-in (ms) |
| `contentFadeDelay` | `number` | `0` | Delay before fade |
| `panelWidth` | `number` | `200` | Expanded width (px) |
| `maxPanelHeight` | `number` | `300` | Max height (px) |
| `innerPadding` | `number` | `4` | Panel padding |
| `itemHeight` | `number` | `32` | Option item height |
| `itemGap` | `number` | `2` | Gap between items |
| `borderRadius` | `number` | `16` | Panel border radius |
| `contentTopOffset` | `number` | `0` | Content offset from chip |
| `topExtension` | `number` | `0` | Extend above chip |
| `showHeaderSeparator` | `boolean` | `false` | Show separator line |
| `squircleOnOpen` | `boolean` | `false` | Squircle on expand |

### Appearance

Uses the Menu component's `MenuAppearance` system:

```tsx
config={{
  appearance: {
    background: 'blur',
    shine: 'default',
    shadow: 'lg',
    gradient: 'none',
  }
}}
```

---

## Two-Layer Animation System

FilterSelectChip uses a two-layer approach for smooth biaxial animation:

```
+-------------------------------------------------------+
| BACKDROP LAYER (z-index: 10)                          |
| - Animates: width, height                             |
| - Contains: background, shine, shadow                 |
| - Purpose: Visual surface (not clipped)               |
+-------------------------------------------------------+

+-------------------------------------------------------+
| CONTENT LAYER (z-index: 11)                           |
| - Animates: clip-path inset                           |
| - Contains: chip trigger + options list               |
| - Purpose: Smooth content reveal                      |
+-------------------------------------------------------+
```

**Why two layers?** `clip-path` clips everything including `box-shadow`. By separating:
1. Backdrop handles visual styling (shine/shadow remain intact)
2. Content handles smooth reveal (clip-path animation)

Both animate with the same timing for a unified effect.

---

## Keyboard Navigation

When the menu is open:

| Key | Action |
|-----|--------|
| `Arrow Down` | Highlight next option |
| `Arrow Up` | Highlight previous option |
| `Enter` | Select highlighted option |
| `Escape` | Close menu |

---

## Integration with FilterMenu

FilterSelectChip works alongside FilterMenu for a complete filter workflow:

```tsx
import { FilterSelectChip, FilterMenu } from '@/modules/design-system/v2/components/ui/prod/base/filter'

function FilterToolbar() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  return (
    <div className="flex items-center gap-2">
      {/* Active filter with value switching */}
      {statusFilter && (
        <FilterSelectChip
          value={statusFilter}
          options={STATUS_OPTIONS}
          icon={CheckmarkCircle02Icon}
          onChange={setStatusFilter}
          onRemove={() => setStatusFilter(null)}
        />
      )}

      {/* Menu for adding new filters */}
      <FilterMenu
        items={filterItems}
        onFilterSelect={(id) => setStatusFilter(id)}
        activeFilterIds={statusFilter ? [statusFilter] : []}
      />
    </div>
  )
}
```

---

## Disabled Options

Show options as disabled (e.g., already selected elsewhere):

```tsx
<FilterSelectChip
  value="active"
  options={STATUS_OPTIONS}
  disabledOptions={['pending', 'completed']}
  onChange={handleChange}
/>
```

Disabled options display a checkmark and are non-interactive.

---

## Architecture

```
filter-select-chip/
├── index.ts                    # Public exports
├── types.ts                    # TypeScript interfaces
├── config.ts                   # Default configuration
├── filter-select-chip.tsx      # Main biaxial component
├── components/
│   ├── index.ts
│   ├── chip-trigger.tsx        # Chip display (header)
│   └── option-list.tsx         # Selectable options
└── README.md                   # This file
```

---

## Exports

```tsx
// Components
export { FilterSelectChip } from './filter-select-chip'

// Config
export { DEFAULT_SELECT_CHIP_CONFIG } from './config'

// Types
export type {
  FilterSelectChipProps,
  FilterSelectChipConfig,
  FilterOption,
  ChipSize,
  ChipRounded,
  RevealMode,
}
```
