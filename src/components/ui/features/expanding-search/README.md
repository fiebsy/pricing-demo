# ExpandingSearch

An animated search input that expands horizontally from a compact icon state. The icon stays fixed at the left while the input slides in.

**Location**: `@/modules/design-system/v2/components/ui/prod/features/expanding-search`

---

## Quick Start

```tsx
import { ExpandingSearch } from '@/modules/design-system/v2/components/ui/prod/features/expanding-search'

<ExpandingSearch
  placeholder="Search..."
  value={searchValue}
  onChange={setSearchValue}
  className="shine-1"
/>
```

---

## Shine Border Implementation

The ExpandingSearch component supports a **shine border effect** via the `className` prop. This is the hardened production styling.

### How It Works

1. The `className` prop is passed through to `SearchContainer`
2. `SearchContainer` applies this class to the background layer
3. The background layer has `bg-secondary` + the shine class
4. Opacity transitions reveal the shine effect on hover/active/expanded

```tsx
// SearchContainer background layer (search-container.tsx:54-60)
<div
  className={cn(
    'absolute inset-0 z-0 rounded-full transition-opacity duration-150 pointer-events-none',
    'bg-secondary',
    className,  // ← shine-1 class goes here
    isExpanded ? 'opacity-100' : 'opacity-0 group-hover/search:opacity-100'
  )}
/>
```

### Required Usage

When integrating ExpandingSearch in production components (toolbars, etc.), **always pass the shine class**:

```tsx
// CORRECT: Include shine class
<ExpandingSearch
  className="shine-1"
  placeholder="Search contracts..."
/>

// INCORRECT: Missing shine class
<ExpandingSearch
  placeholder="Search contracts..."
/>
```

---

## File Structure

```
expanding-search/
├── index.ts                    # Public exports
├── expanding-search.tsx        # Main component
├── types.ts                    # Type definitions
├── config.ts                   # Constants and defaults
├── README.md                   # This file
├── components/
│   ├── index.ts
│   ├── search-container.tsx    # Animated container (shine border)
│   ├── search-icon-button.tsx  # Search icon trigger
│   ├── search-input.tsx        # Text input
│   └── clear-button.tsx        # Clear/X button
├── hooks/
│   ├── index.ts
│   ├── use-expanding-search.ts # Core state/handlers
│   └── use-search-with-empty-state.ts
└── utils/
    ├── index.ts
    └── animation.ts            # Animation calculations
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Input placeholder text |
| `value` | `string` | — | Controlled input value |
| `onChange` | `(value: string) => void` | — | Value change handler |
| `onSubmit` | `() => void` | — | Enter key handler |
| `defaultExpanded` | `boolean` | `false` | Initial expanded state |
| `expanded` | `boolean` | — | Controlled expanded state |
| `onExpandedChange` | `(expanded: boolean) => void` | — | Expansion state handler |
| `collapsedWidth` | `number` | `40` | Width when collapsed (px) |
| `expandedWidth` | `number` | `240` | Width when expanded (px) |
| `height` | `number` | `40` | Component height (px) |
| `duration` | `number` | `300` | Expand animation duration (ms) |
| `collapseDuration` | `number` | `75` | Collapse animation duration (ms) |
| `revealMode` | `RevealMode` | `'immediate'` | How input content appears |
| `hideMode` | `HideMode` | `'fade'` | How input content disappears |
| `className` | `string` | — | **Pass shine class here** |
| `autoFocus` | `boolean` | `true` | Focus input on expand |
| `collapseOnBlur` | `boolean` | `true` | Collapse when focus lost |
| `iconSize` | `number` | `18` | Search icon size (px) |
| `iconStrokeWidth` | `number` | `2` | Icon stroke width |
| `iconOpacity` | `number` | `65` | Icon opacity (0-100) |

---

## Animation Modes

### Reveal Modes (expanding)

| Mode | Behavior |
|------|----------|
| `'immediate'` | Content appears instantly as width expands |
| `'fade'` | Content fades in during expansion |
| `'delay'` | Content appears after expansion completes |
| `'sync'` | Content appears exactly when expansion finishes |

### Hide Modes (collapsing)

| Mode | Behavior |
|------|----------|
| `'fade'` | Content fades out during collapse |
| `'immediate'` | Content disappears instantly |

---

## Toolbar Integration

For integrated toolbars (32px height):

```tsx
<ExpandingSearch
  className="shine-1"
  height={32}
  collapsedWidth={32}
  expandedWidth={200}
  duration={200}
  iconSize={16}
  placeholder="Search..."
/>
```

### Placement

In the `rightToolbar` slot of StickyDataTable:

```tsx
const rightToolbar = (
  <ExpandingSearch
    className="shine-1"
    height={32}
    expandedWidth={200}
    value={searchQuery}
    onChange={setSearchQuery}
  />
)

<StickyDataTable
  rightToolbar={rightToolbar}
  // ...
/>
```

---

## Styling Architecture

### Background Layer

The shine effect is achieved through a separate background div that:
- Uses `bg-secondary` as the base color
- Receives the `className` prop (which should include `shine-1`)
- Transitions opacity on hover/active/expanded states

```
┌─────────────────────────────────────────┐
│ Container (overflow hidden, rounded)    │
│  ┌───────────────────────────────────┐  │
│  │ Background Layer                  │  │
│  │ bg-secondary + shine-1            │  │
│  │ opacity: 0 → 100 on hover/expand  │  │
│  └───────────────────────────────────┘  │
│  ┌──────┐ ┌─────────────────┐ ┌────┐   │
│  │ Icon │ │ Input           │ │ X  │   │
│  └──────┘ └─────────────────┘ └────┘   │
└─────────────────────────────────────────┘
```

### States

| State | Background Opacity | Interaction |
|-------|-------------------|-------------|
| Collapsed | 0 | Click to expand |
| Collapsed + Hover | 100 | Shows shine border |
| Collapsed + Active | 100 | Press feedback |
| Expanded | 100 | Always visible |

---

## Exports

```tsx
// Main component
export { ExpandingSearch } from './expanding-search'

// Hooks
export { useExpandingSearch } from './hooks/use-expanding-search'
export { useSearchWithEmptyState } from './hooks/use-search-with-empty-state'

// Types
export type {
  ExpandingSearchProps,
  SearchContainerProps,
  RevealMode,
  HideMode,
} from './types'

// Config
export { DEFAULT_PROPS, EASING } from './config'
```

---

## Related Components

| Component | Use Case |
|-----------|----------|
| `FilterChip` | Active filter indicators |
| `FilterMenu` | Filter dropdown menu |
| `StickyDataTable` | Table integration |

---

*Last Updated: January 2025*
