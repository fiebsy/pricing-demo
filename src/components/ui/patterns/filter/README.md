# Filter System

Complete filter component system including FilterMenu, FilterChip, and FilterTrigger. Built on the base Menu component with PAYVA styling.

## Architecture

```
filter/
├── filter-menu/           # Specialized menu for filtering
│   ├── filter-menu.tsx    # Main component
│   ├── filter-menu-header.tsx
│   ├── default-items.ts   # Example data
│   └── index.ts
├── filter-chip/           # Expanding filter indicator
│   ├── filter-chip.tsx    # Main component
│   ├── use-chip-animation.ts
│   ├── config.ts
│   ├── types.ts
│   └── index.ts
├── filter-trigger/        # Menu trigger button
│   ├── filter-trigger.tsx
│   └── index.ts
└── index.ts               # Public exports
```

## Quick Start

```tsx
import {
  FilterMenu,
  FilterChip,
  FilterTrigger,
} from '@/modules/design-system/v2/components/ui/prod/base/filter'

// Filter menu with active filter tracking
<FilterMenu
  items={filterItems}
  onFilterSelect={(id) => toggleFilter(id)}
  activeFilterIds={['status-active', 'date-week']}
/>

// Display active filter as chip
<FilterChip
  icon={CheckmarkCircle02Icon}
  value="Active"
  onRemove={() => removeFilter('status-active')}
/>
```

---

## FilterMenu

A derivative of the base Menu specialized for filtering. Adds active filter tracking, checkmarks, and count badges.

### Usage

```tsx
import { FilterMenu } from '@/modules/design-system/v2/components/ui/prod/base/filter'
import Calendar03Icon from '@hugeicons-pro/core-stroke-rounded/Calendar03Icon'
import UserIcon from '@hugeicons-pro/core-stroke-rounded/UserIcon'

const [activeFilters, setActiveFilters] = useState<string[]>([])

const filterItems = [
  {
    id: 'date',
    type: 'submenu',
    label: 'Date',
    icon: Calendar03Icon,
    items: [
      { id: 'date-today', label: 'Today' },
      { id: 'date-week', label: 'This Week' },
      { id: 'date-month', label: 'This Month' },
    ],
  },
  {
    id: 'assignee',
    type: 'submenu',
    label: 'Assignee',
    icon: UserIcon,
    items: [
      { id: 'assignee-me', label: 'Assigned to Me' },
      { id: 'assignee-unassigned', label: 'Unassigned' },
    ],
  },
]

<FilterMenu
  items={filterItems}
  onFilterSelect={(id) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }}
  activeFilterIds={activeFilters}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItemType[]` | example items | Filter options |
| `onFilterSelect` | `(filterId: string) => void` | — | Called when filter selected |
| `activeFilterIds` | `string[]` | `[]` | IDs of active filters |
| `trigger` | `ReactNode` | `<FilterTrigger />` | Custom trigger element |
| `header` | `ReactNode` | `<FilterMenuHeader />` | Custom header |
| `noHeader` | `boolean` | `true` | Hide header on root menu |
| `width` | `number` | `240` | Menu width |
| `side` | `MenuSide` | `'bottom'` | Position |
| `align` | `MenuAlign` | `'start'` | Alignment |
| `appearance` | `MenuAppearance` | — | Visual styling |
| `animation` | `AnimationConfig` | — | Transition timing |

### Active Filter Features

When `activeFilterIds` includes an item's ID:
- **Action items**: Show checkmark indicator
- **Submenu items**: Show count badge with number of active children

```tsx
// This shows a "2" badge on the Status submenu
activeFilterIds={['status-active', 'status-pending']}
```

---

## FilterChip

Expanding filter chip that animates from collapsed (icon-only) to expanded (full value display).

### Usage

```tsx
import { FilterChip } from '@/modules/design-system/v2/components/ui/prod/base/filter'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'

// With icon
<FilterChip
  icon={CheckmarkCircle02Icon}
  value="Active"
  onRemove={() => removeFilter('status')}
/>

// With text label
<FilterChip
  label="Status"
  value="Active"
  onRemove={() => removeFilter('status')}
/>

// Controlled expansion
<FilterChip
  icon={CalendarIcon}
  value="This Week"
  expanded={isExpanded}
  onExpandedChange={setIsExpanded}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Text shown when expanded |
| `icon` | `IconComponent` | — | HugeIcon component |
| `label` | `string` | — | Text label (if no icon) |
| `onRemove` | `() => void` | — | Close button handler |
| `config` | `ChipConfig` | see below | Styling options |
| `defaultExpanded` | `boolean` | `false` | Initial state |
| `expanded` | `boolean` | — | Controlled state |
| `onExpandedChange` | `(expanded: boolean) => void` | — | State callback |

### ChipConfig

```tsx
const DEFAULT_CONFIG = {
  size: 'md',           // xs | sm | md | lg
  rounded: 'full',      // sm | md | lg | full
  iconSize: 14,
  closeSize: 16,
  duration: 200,        // Animation duration (ms)
  revealMode: 'fade',   // fade | delay | sync | instant | none
  iconOpacity: 0.5,     // Left icon opacity
  iconValueGap: 4,      // Gap between icon and value
  valueCloseGap: 10,    // Gap between value and close button
}
```

### Animation

The chip uses a measurement-based width animation:

1. **Mount**: Hidden element measures full expanded width
2. **Auto-expand**: Animates from collapsed to expanded on mount
3. **Click to collapse**: Returns to icon-only state
4. **Click to expand**: Opens to full width

#### Reveal Modes

| Mode | Behavior |
|------|----------|
| `fade` | Value fades in during width expansion |
| `delay` | Value appears after width animation completes |
| `sync` | Value appears instantly when width animation completes |
| `instant` | Value opacity matches width progress |
| `none` | No opacity transition |

### useChipAnimation Hook

For custom implementations:

```tsx
import { useChipAnimation } from '@/modules/design-system/v2/components/ui/prod/base/filter'

const animation = useChipAnimation({
  defaultExpanded: false,
  duration: 200,
  revealMode: 'fade',
})

// Returns:
// animation.isExpanded       - Current state
// animation.toggle()         - Toggle expanded state
// animation.getContentOpacity()
// animation.getContentTransition()
// animation.getContainerTransition()
// animation.onTransitionEnd() - Handler for transition events
```

---

## FilterTrigger

Standalone trigger button for filter menus with press animation.

### Usage

```tsx
import { FilterTrigger } from '@/modules/design-system/v2/components/ui/prod/base/filter'

// Default (uses Button with shine variant)
<FilterTrigger isOpen={isMenuOpen} />

// Custom label and icon
<FilterTrigger
  label="Filter results"
  icon={FilterIcon}
  size="lg"
/>

// Ghost variant
<FilterTrigger
  variant="ghost"
  label="Filters"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Menu open state (for styling) |
| `label` | `string` | `'Add a filter'` | Button text |
| `icon` | `IconProp` | `Add01Icon` | Leading icon |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `rounded` | `'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Border radius |
| `variant` | `'default' \| 'ghost' \| 'outline'` | `'default'` | Visual style |

### Variants

| Variant | Description |
|---------|-------------|
| `default` | Uses Button component with shine styling, scale animation |
| `ghost` | Transparent background, hover fills |
| `outline` | Border with transparent background |

When `isOpen` is true:
- **default**: Locks pressed state (scaled, filled background)
- **ghost/outline**: Fills background, maintains pressed scale

---

## Complete Example

```tsx
import { useState } from 'react'
import {
  FilterMenu,
  FilterChip,
  type MenuItemType,
} from '@/modules/design-system/v2/components/ui/prod/base/filter'

const filterItems: MenuItemType[] = [
  {
    id: 'status',
    type: 'submenu',
    label: 'Status',
    icon: CheckmarkCircle02Icon,
    items: [
      { id: 'status-active', label: 'Active' },
      { id: 'status-pending', label: 'Pending' },
    ],
  },
]

export function FilterToolbar() {
  const [activeFilters, setActiveFilters] = useState<
    Array<{ id: string; label: string; icon: unknown }>
  >([])

  const handleFilterSelect = (filterId: string) => {
    // Toggle filter on/off
    setActiveFilters((prev) => {
      const exists = prev.find((f) => f.id === filterId)
      if (exists) return prev.filter((f) => f.id !== filterId)

      // Find filter metadata
      const item = findMenuItem(filterItems, filterId)
      return [...prev, { id: filterId, label: item.label, icon: item.icon }]
    })
  }

  return (
    <div className="flex items-center gap-2">
      {/* Active filter chips */}
      {activeFilters.map((filter) => (
        <FilterChip
          key={filter.id}
          icon={filter.icon}
          value={filter.label}
          onRemove={() => handleFilterSelect(filter.id)}
        />
      ))}

      {/* Filter menu */}
      <FilterMenu
        items={filterItems}
        onFilterSelect={handleFilterSelect}
        activeFilterIds={activeFilters.map((f) => f.id)}
      />
    </div>
  )
}
```

---

## Styling Requirements

### Hardened Production Styling

These components have **hardened styling** that should NOT be overridden. When integrating into toolbars or other components, trust the defaults:

| Component | Hardcoded Styling | Why |
|-----------|-------------------|-----|
| FilterChip | `bg-secondary shine-3-subtle` | Consistent filter indicator appearance |
| FilterTrigger | Button `variant="shine"` | Consistent trigger interaction |
| FilterMenu | Inherits from base Menu | Consistent menu behavior |

### Integration Guidelines

When using these components in production:

1. **Do NOT pass custom background classes** - FilterChip handles this
2. **Do NOT override shine effects** - They're intentionally hardened
3. **Do NOT customize trigger styling** - Use the default variant
4. **DO pass `onFilterSelect` and `activeFilterIds`** - Required for proper behavior

```tsx
// CORRECT: Trust the defaults
<FilterChip
  icon={StatusIcon}
  value="Active"
  onRemove={() => handleRemove('status-active')}
/>

// INCORRECT: Overriding hardened styling
<FilterChip
  icon={StatusIcon}
  value="Active"
  className="bg-red-500 shine-0"  // Don't do this
/>
```

### Shine Effect Reference

| Component | Shine Class | Effect |
|-----------|-------------|--------|
| FilterChip | `shine-3-subtle` | Subtle glow, visible on all backgrounds |
| FilterTrigger (default) | Button `shine` variant | Standard button shine |
| FilterTrigger (open) | `bg-tertiary` locked | Pressed state indicator |

---

## Exports

```tsx
// Components
export { FilterMenu, FilterMenuHeader } from './filter-menu'
export { FilterChip, useChipAnimation } from './filter-chip'
export { FilterTrigger } from './filter-trigger'

// Types
export type {
  FilterMenuProps,
  FilterChipProps,
  FilterTriggerProps,
  ChipConfig,
  ChipSize,
  ChipRounded,
  RevealMode,
}

// Re-exports from base Menu
export type {
  MenuItemType,
  MenuItemAction,
  MenuItemSubmenu,
  MenuSide,
  MenuAlign,
  MenuAppearance,
  AnimationConfig,
}
```
