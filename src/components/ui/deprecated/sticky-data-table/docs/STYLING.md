# Styling

Complete guide to customizing StickyDataTable appearance: borders, backgrounds, animations, and skeleton loaders.

---

## Border Configuration

Control all table borders with `BorderConfig`:

```tsx
interface BorderConfig {
  // Colors (Tailwind semantic tokens)
  outerColor: string           // All outer borders (left, right, top, body bottom)
  headerBottomColor?: string   // Header bottom border only (defaults to outerColor)
  rowColor: string             // Between rows
  cellColor: string            // Between columns
  stickyColumnRightBorderColor?: string  // Sticky column edge when scrolling

  // Visibility
  showOuter: boolean           // All outer borders
  showLeft?: boolean           // Override showOuter for left
  showRight?: boolean          // Override showOuter for right
  showTop?: boolean            // Override showOuter for top
  showBottom?: boolean         // Override showOuter for bottom
  showRows: boolean            // Horizontal row borders
  showCells: boolean           // Vertical cell borders

  // Special
  hideCellBordersForColumns?: string[]  // Transparent borders for specific columns
}
```

### Default Configuration

```tsx
DEFAULT_BORDER_CONFIG = {
  outerColor: 'border-primary',
  rowColor: 'border-tertiary',
  cellColor: 'border-tertiary/20',
  showOuter: true,
  showRows: true,
  showCells: true,
  stickyColumnRightBorderColor: 'border-secondary',
}
```

### Header Bottom Border

The `headerBottomColor` property allows you to style the header's bottom border independently from the rest of the table borders. This is useful for creating visual separation between the header and body.

**How it works:**
- `outerColor` applies to: left, right, top, and body bottom borders
- `headerBottomColor` applies to: header bottom border only
- If `headerBottomColor` is not set, it defaults to `outerColor`

```
┌────────────────────────────────────────┐  ← outerColor (top)
│ outerColor    HEADER ROW     outerColor│
│ (left)                          (right)│
├────────────────────────────────────────┤  ← headerBottomColor
│ outerColor    BODY ROWS      outerColor│
│ (left)                          (right)│
└────────────────────────────────────────┘  ← outerColor (bottom)
```

**Example: Different header bottom color:**
```tsx
borderConfig={{
  outerColor: 'border-primary',
  headerBottomColor: 'border-secondary',  // Different from outer
  rowColor: 'border-tertiary',
}}
```

**Example: Accent header divider:**
```tsx
borderConfig={{
  outerColor: 'border-tertiary',
  headerBottomColor: 'border-brand-solid',  // Brand accent line
}}
```

### Common Border Patterns

**Minimal borders (rows only):**
```tsx
borderConfig={{
  showCells: false,
}}
```

**No internal borders:**
```tsx
borderConfig={{
  showRows: false,
  showCells: false,
}}
```

**Custom colors:**
```tsx
borderConfig={{
  outerColor: 'border-secondary',
  rowColor: 'border-primary',
}}
```

**Hide specific sides:**
```tsx
borderConfig={{
  showOuter: true,
  showLeft: false,
  showRight: false,
}}
```

**Transparent borders for column grouping:**
```tsx
borderConfig={{
  hideCellBordersForColumns: ['rank', 'icon'],
}}
```

**Emphasized header with subtle body:**
```tsx
borderConfig={{
  outerColor: 'border-tertiary',
  headerBottomColor: 'border-primary',
  rowColor: 'border-tertiary/20',
}}
```

---

## Background Configuration

Control backgrounds for all table sections:

```tsx
interface BackgroundConfig {
  // Header
  headerWrapper: string        // Sticky header outer wrapper
  headerContainer: string      // Header inner container
  headerStickyCell: string     // Sticky header cells (default)
  headerStickyCellWithArrows: string  // When arrows visible

  // Body
  bodyContainer: string        // Table body container
  rowStickyCell: string        // Sticky body cells (default)
  rowStickyCellWithArrows: string     // When arrows visible
  rowHover: string             // Row hover state
}
```

### Default Configuration

```tsx
DEFAULT_BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_p1',
  headerStickyCell: 'bg-secondary_p1',
  headerStickyCellWithArrows: 'bg-secondary_t1/95',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-secondary_t1/95',
  rowHover: 'bg-secondary',
}
```

### Enhanced Styling States

When scroll arrows are visible (`stickyState.useEnhancedStyling = true`):

1. Sticky cells switch to `*WithArrows` backgrounds
2. Last sticky column gets right border
3. Provides visual separation from scrolling content

### Common Background Patterns

**Custom header:**
```tsx
backgroundConfig={{
  headerWrapper: 'bg-primary',
  headerContainer: 'bg-primary',
  headerStickyCell: 'bg-primary',
  headerStickyCellWithArrows: 'bg-primary/95',
}}
```

**Custom hover:**
```tsx
backgroundConfig={{
  rowHover: 'bg-tertiary',
}}
```

**Transparent sticky cells:**
```tsx
backgroundConfig={{
  rowStickyCell: 'bg-transparent',
  rowStickyCellWithArrows: 'bg-primary/80',
}}
```

---

## Using Config Helpers

### `createBorderConfig`

Merge partial config with defaults:

```tsx
import { createBorderConfig, DEFAULT_BORDER_CONFIG } from '...'

const borderConfig = createBorderConfig({
  showCells: false,
  rowColor: 'border-primary',
})
```

### `createBackgroundConfig`

```tsx
import { createBackgroundConfig } from '...'

const backgroundConfig = createBackgroundConfig({
  rowHover: 'bg-tertiary',
})
```

---

## Border Radius

Control table corner rounding:

```tsx
<StickyDataTable
  borderRadius={16}  // Default: 20
/>
```

Applied to:
- Header top corners
- Body bottom corners

---

## Row & Header Heights

```tsx
<StickyDataTable
  headerHeight={56}  // Default: 48
  rowHeight={52}     // Default: 46
/>
```

---

## Column Animations

### Animation Classes

Columns animate when toggled:

| State | Class | Duration |
|-------|-------|----------|
| Entering | `animate-column-add` | 300ms |
| Leaving | `animate-column-remove` | 250ms |

### FLIP Animation System

Neighboring columns shift smoothly using FLIP (First, Last, Invert, Play):

1. **First**: Record initial positions
2. **Last**: Apply changes, record final positions
3. **Invert**: Transform back to initial
4. **Play**: Animate to final position

### Animation Timing Constants

```tsx
ANIMATION_CONFIG = {
  COLUMN_ENTER_DURATION: 300,
  COLUMN_LEAVE_DURATION: 250,
  COLUMN_SHIFT_DURATION: 200,
  COLUMN_REMOVE_DELAY: 250,
  COLUMN_CHANGE_CLEAR_DELAY: 350,
}
```

### Disabling Animations

**Option 1: Respect `prefers-reduced-motion`**

Built-in support for accessibility preference.

**Option 2: CSS Override**

```css
.animate-column-add,
.animate-column-remove {
  animation: none !important;
}
```

---

## Cell Styling

### Typography Rules (in `renderCell`)

| Content Type | Classes |
|--------------|---------|
| Body text | `text-sm font-normal text-primary` |
| Descriptions | `text-xs font-normal text-secondary` |
| Status codes/IDs | `text-xs font-mono text-tertiary` |
| Headers (automatic) | `text-xs font-medium text-tertiary` |

### Correct Pattern

```tsx
const renderCell = (key: string, row: Order, index: number) => {
  switch (key) {
    case 'name':
      return <span className="text-sm text-primary">{row.name}</span>
    case 'id':
      return <span className="text-xs font-mono text-tertiary">{row.id}</span>
    case 'status':
      return <Badge variant="success" size="sm">{row.status}</Badge>
  }
}
```

### Forbidden Patterns

- `font-bold`, `font-semibold` (use `font-normal` only)
- `text-blue-500`, `text-green-600` (use semantic tokens)
- `text-[13px]`, `text-lg` (use `text-sm` or `text-xs`)
- Custom colored badges (use Untitled UI Badge)

---

## Skeleton Loaders

### TableSkeleton

Full table skeleton for initial loading:

```tsx
import { TableSkeleton, createSkeletonConfigFromTableProps } from '...'

// Option 1: Match table props automatically
const skeletonProps = createSkeletonConfigFromTableProps(tableProps)

<TableSkeleton
  {...skeletonProps}
  skeletonRowCount={10}
/>

// Option 2: Manual configuration
<TableSkeleton
  columns={columns}
  skeletonRowCount={10}
  enableSelection={true}
  simulateStickyState="auto"
  borderConfig={borderConfig}
  backgroundConfig={backgroundConfig}
  toolbarConfig={{
    showToolbar: true,
    showLeftToolbar: true,
    showCount: true,
  }}
/>
```

### LoadMoreSkeleton

For infinite scroll loading state:

```tsx
import { LoadMoreSkeleton } from '...'

<LoadMoreSkeleton
  columns={columns}
  rowCount={5}
  enableSelection={true}
  asRowsOnly={true}  // No wrapper, injects into table
/>
```

### Skeleton Props

```tsx
interface TableSkeletonProps {
  columns: ColumnConfig[]
  skeletonRowCount?: number
  borderRadius?: number
  className?: string

  // Toolbar
  toolbarConfig?: ToolbarConfig
  showToolbar?: boolean      // Legacy
  showLeftToolbar?: boolean  // Legacy

  // Sticky synchronization
  enableSelection?: boolean
  defaultVisibleColumns?: string[]
  simulateStickyState?: 'scrollable' | 'no-scroll' | 'auto'
  borderConfig?: Partial<BorderConfig>
  backgroundConfig?: Partial<BackgroundConfig>
}
```

### Height Calculation

Calculate skeleton height to prevent layout shift:

```tsx
import {
  calculateSkeletonHeight,
  createSkeletonDimensionConfig,
} from '...'

const config = createSkeletonDimensionConfig({
  toolbar: {
    showToolbar: true,
    showLeftToolbar: true,
    showCount: true,
  },
  rowHeight: 46,
  headerHeight: 48,
})

const height = calculateSkeletonHeight(config, 10) // 10 rows
```

---

## Dark Mode Support

The component uses semantic design tokens that automatically adapt:

### Use Semantic Tokens

```tsx
// Correct - adapts to dark mode
borderConfig={{
  outerColor: 'border-primary',
  rowColor: 'border-tertiary',
}}

// Incorrect - fixed colors
borderConfig={{
  outerColor: 'border-gray-300',
  rowColor: 'border-gray-200',
}}
```

### Available Semantic Tokens

**Borders:**
- `border-primary`
- `border-secondary`
- `border-tertiary`

**Backgrounds:**
- `bg-primary`
- `bg-secondary`
- `bg-secondary_alt`
- `bg-secondary_p1`
- `bg-secondary_t1`
- `bg-tertiary`

**Text:**
- `text-primary`
- `text-secondary`
- `text-tertiary`

---

## Gradient Overlay

Scroll indicator gradient appears when content overflows:

- Positioned over last visible area
- Indicates more content to scroll
- Automatically hidden when at scroll boundary

---

## Best Practices

### Performance

1. Use GPU-accelerated properties (`transform`, `opacity`) for animations
2. `will-change` is applied automatically during animations
3. Animations use `requestAnimationFrame`

### Consistency

1. Use semantic tokens for dark mode support
2. Match app layout backgrounds
3. Use `hideCellBordersForColumns` for visual grouping
4. Keep row heights consistent

### Accessibility

1. Component respects `prefers-reduced-motion`
2. Ensure sufficient color contrast
3. Focus states are built-in

---

## Examples

### Minimal Style

```tsx
<StickyDataTable
  borderConfig={{
    showCells: false,
    rowColor: 'border-tertiary/50',
  }}
  borderRadius={12}
/>
```

### Dense Table

```tsx
<StickyDataTable
  rowHeight={36}
  headerHeight={40}
  borderRadius={8}
/>
```

### Card Style

```tsx
<StickyDataTable
  borderConfig={{
    outerColor: 'border-primary',
    showRows: false,
    showCells: false,
  }}
  backgroundConfig={{
    headerContainer: 'bg-tertiary',
    bodyContainer: 'bg-secondary',
  }}
  borderRadius={16}
/>
```

---

## Next Steps

- [API Reference](./API-REFERENCE.md) - Complete props documentation
- [Features](./FEATURES.md) - Selection, sorting, filtering
- [Architecture](./ARCHITECTURE.md) - Implementation details
