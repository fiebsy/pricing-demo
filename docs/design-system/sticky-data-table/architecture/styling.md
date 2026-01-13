# Styling

Borders, backgrounds, animations, and skeletons in StickyDataTable.

## Overview

Styling is configured through:
- **BorderConfig**: Table border visibility and colors
- **BackgroundConfig**: Header/body/row backgrounds
- **Animation settings**: Transitions and FLIP animations
- **Skeleton configuration**: Loading state appearance

## Border Configuration

### BorderConfig Interface

```tsx
interface BorderConfig {
  showOuter: boolean    // Outer table border
  showRows: boolean     // Row divider lines
  showCells: boolean    // Cell divider lines
  outerColor: string    // Tailwind class: 'border-primary'
  rowColor: string      // Tailwind class: 'border-secondary'
  cellColor: string     // Tailwind class: 'border-tertiary'
}
```

### Default Values (JAN2)

```tsx
DEFAULT_BORDER_CONFIG = {
  showOuter: true,
  showRows: true,
  showCells: true,
  outerColor: 'border-primary',
  rowColor: 'border-secondary',
  cellColor: 'border-tertiary',
}
```

### Usage

```tsx
// Use defaults
<StickyDataTable data={data} columns={columns} />

// Override specific values
<StickyDataTable
  data={data}
  columns={columns}
  borderConfig={{
    showCells: false,
    rowColor: 'border-tertiary',
  }}
/>

// Using factory
import { createBorderConfig } from '...'

const borderConfig = createBorderConfig({
  showOuter: false,
})
```

## Background Configuration

### BackgroundConfig Interface

```tsx
interface BackgroundConfig {
  headerWrapper: string     // Sticky header container
  headerContainer: string   // Header cells container
  bodyContainer: string     // Body container
  rowHover: string          // Row hover state
}
```

### Default Values (JAN2)

```tsx
DEFAULT_BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_t1',
  bodyContainer: 'bg-primary',
  rowHover: 'bg-tertiary',
}
```

### Usage

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  backgroundConfig={{
    headerWrapper: 'bg-primary',
    rowHover: 'bg-secondary',
  }}
/>
```

## Sticky State Styling

The `StickyState` object controls scroll-related styling:

```tsx
interface StickyState {
  canScrollLeft: boolean   // Content scrolled right
  canScrollRight: boolean  // Content scrolled left
  isSticky: boolean        // Header is stuck
}
```

### Visual Effects

- **Gradient overlay**: Shows when `canScrollRight` is true
- **Shadow on sticky columns**: Shows when scrolled
- **Navigation arrows**: Visibility based on scroll state

## Animation Configuration

### Constants

```tsx
ANIMATION_CONFIG = {
  COLUMN_ENTER_DURATION: 300,   // Column appearing
  COLUMN_LEAVE_DURATION: 250,   // Column hiding
  COLUMN_SHIFT_DURATION: 200,   // Column reordering
  ROW_HOVER_DURATION: 150,      // Row hover transition
}
```

### Column Animations (FLIP)

Columns animate using FLIP (First, Last, Invert, Play):

```tsx
// Automatic with useColumnFlip hook
useColumnFlip({
  containerRef,
  columnChange,
  duration: ANIMATION_CONFIG.COLUMN_SHIFT_DURATION,
})
```

### CSS Transitions

Row hover uses CSS transitions:

```css
.table-row {
  transition: background-color 150ms ease;
}

.table-row:hover {
  background-color: var(--bg-tertiary);
}
```

### Reduced Motion

Respects user preferences:

```tsx
import { prefersReducedMotion } from '...'

if (prefersReducedMotion()) {
  // Skip animations
}
```

## Skeleton Configuration

### SkeletonConfigurationProps

```tsx
interface SkeletonConfigurationProps {
  scope?: 'rows-only' | 'table-only' | 'full'
  initialRowCount?: number
  infiniteScrollRowCount?: number
  headerCellConfig?: Partial<SkeletonCellConfig>
  bodyCellConfig?: Partial<SkeletonCellConfig>
  checkboxSize?: number
  simulateStickyState?: 'auto' | 'idle' | 'scrollable'
}
```

### SkeletonCellConfig

```tsx
interface SkeletonCellConfig {
  widthMode: 'fixed' | 'random' | 'proportional'
  fixedWidth: number
  minWidth: number
  maxWidth: number
  height: number
  borderRadius: number
}
```

### Default Values

```tsx
DEFAULT_SKELETON_CONFIG = {
  initialRowCount: 10,
  infiniteScrollRowCount: 5,
  headerCell: {
    widthMode: 'proportional',
    height: 12,
    borderRadius: 4,
    minWidth: 40,
    maxWidth: 120,
  },
  bodyCell: {
    widthMode: 'random',
    height: 16,
    borderRadius: 4,
    minWidth: 60,
    maxWidth: 140,
  },
  checkboxSize: 16,
  simulateStickyState: 'auto',
}
```

### Usage

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  isLoading={loading}
  skeletonConfig={{
    scope: 'rows-only',
    initialRowCount: 15,
    bodyCellConfig: {
      height: 20,
      widthMode: 'proportional',
    },
  }}
/>
```

### Skeleton Scope

| Scope | Behavior |
|-------|----------|
| `'rows-only'` | Only body shows skeleton, toolbar preserved |
| `'table-only'` | Table skeleton, no toolbar |
| `'full'` | Full component skeleton |

**Recommendation**: Use `'rows-only'` to keep toolbar functional during loading.

## Utility Functions

### Style Utilities

```tsx
import {
  getAlignmentClasses,
  getCellPadding,
  getHeaderStickyBackground,
  getRowStickyBackground,
  getHeaderOuterBorders,
  getBodyOuterBorders,
  getRowBorder,
  getCellBorder,
  getStickyColumnBorder,
  getStickyLeft,
  getColumnAnimationClass,
  getCellStyle,
} from '...'
```

### Example: getCellStyle

```tsx
const style = getCellStyle({
  column,
  isSticky: true,
  stickyState,
  borderConfig,
  backgroundConfig,
})
// Returns: { left: '60px', backgroundColor: '...', ... }
```

## CSS Grid Layout

Tables use CSS Grid for column layout:

```tsx
import { generateGridTemplate } from '...'

const gridTemplate = generateGridTemplate(columns)
// Returns: '60px 200px minmax(150px, 1fr) 120px'
```

## Page Background Context

Sync table backgrounds with page:

```tsx
import {
  TablePageBackgroundProvider,
  useTablePageBackground,
  PAGE_BACKGROUND_CONFIGS,
} from '...'

// Wrap page
<TablePageBackgroundProvider background="secondary">
  <MyPage />
</TablePageBackgroundProvider>

// Table auto-syncs backgrounds
<StickyDataTable ... />
```

## Common Patterns

### Minimal Borders

```tsx
<StickyDataTable
  borderConfig={{
    showOuter: true,
    showRows: true,
    showCells: false,
  }}
/>
```

### Custom Header Background

```tsx
<StickyDataTable
  backgroundConfig={{
    headerWrapper: 'bg-primary',
    headerContainer: 'bg-primary',
  }}
/>
```

### Dense Rows

```tsx
<StickyDataTable
  rowHeight={36}
  skeletonConfig={{
    bodyCellConfig: { height: 12 },
  }}
/>
```

## Related

- [Configuration](../api/config.md) - Default values
- [Components](./components.md) - Component hierarchy
- [Props Reference](../api/props.md) - Styling props
