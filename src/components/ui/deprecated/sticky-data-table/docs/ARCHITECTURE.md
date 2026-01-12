# Architecture

Deep dive into StickyDataTable's component structure, hooks, state management, and design patterns.

---

## Component Hierarchy

```
StickyDataTable (index.tsx)
│
├─ useStickyDataTable() ← Main orchestration hook
│
├─ ToolbarContent (components/toolbar-content.tsx)
│   │   Unified toolbar rendering for both 'above' and 'integrated' modes
│   ├─ Left Section
│   │   ├─ leftToolbar slot (ReactNode)
│   │   └─ Count Display (when showCount=true)
│   └─ Right Section
│       ├─ rightToolbar slot (ReactNode)
│       ├─ ExportToolbar (when export functions provided)
│       └─ ColumnControlPanel (when showColumnControl=true)
│
└─ Table Container
    ├─ GradientOverlay (scroll indicator)
    │
    ├─ StickyHeaderWrapper
    │   ├─ Background filler (above header)
    │   ├─ TableHeader (CSS Grid)
    │   │   └─ Header cells with sort indicators
    │   └─ NavigationArrows
    │       ├─ NavigationArrow (left)
    │       └─ NavigationArrow (right)
    │
    └─ TableBody (scrollable container)
        ├─ TableRow[] (CSS Grid)
        │   └─ TableCell[] (sticky + scrollable)
        ├─ Infinite Scroll Sentinel
        └─ Loading Indicator (skeleton or custom)
```

---

## State Management

### Main Hook: `useStickyDataTable`

The primary hook that orchestrates all table state. Located in `hooks/use-sticky-data-table.tsx`.

```tsx
const tableState = useStickyDataTable({
  data,
  columns,
  columnLabels,
  enableSelection,
  getRowId,
  serverSideSort,
  infiniteScroll,
  // ... other props
})

// Returns:
{
  // Refs
  headerScrollRef,
  bodyScrollRef,

  // Configs (merged with defaults)
  borderConfig,
  backgroundConfig,

  // Column state
  columnsWithSelection,
  stickyColumns,
  scrollableColumns,
  allVisibleColumns,
  visibleColumnKeys,
  leavingColumnKeys,
  enteringColumnKeys,
  columnChange,
  toggleColumn,
  resetColumns,
  totalStickyWidth,

  // Sort state
  sortColumn,
  sortDirection,
  sortedData,
  handleSort,

  // Scroll state
  stickyState,
  showScrollIndicator,
  handleScrollLeft,
  handleScrollRight,

  // Selection state
  selectionState,

  // Toolbar state
  showExportButton,
  showToolbar,

  // Infinite scroll
  effectiveOnEndReached,
  effectiveThreshold,
  effectiveLoadingIndicator,
}
```

### Supporting Hooks

| Hook | Purpose | File |
|------|---------|------|
| `useColumns` | Column visibility, animations | `use-columns.ts` |
| `useScrollSync` | Header/body scroll synchronization | `use-scroll-sync.ts` |
| `useSelection` | Row selection state | `use-selection.ts` |
| `useSort` | Client-side sorting | `use-sort.ts` |
| `useInfiniteScroll` | Pagination with skeleton delay | `use-infinite-scroll.ts` |
| `useWheelRedirect` | Mouse wheel → horizontal scroll | `use-wheel-redirect.ts` |
| `useArrowPosition` | Navigation arrow positioning | `use-arrow-position.ts` |
| `useColumnFlip` | FLIP animation for columns | `use-column-flip.ts` |
| `useAutoColumnFlip` | Automatic FLIP detection | `use-auto-column-flip.ts` |

---

## Hook Details

### `useColumns`

Manages column visibility with animation support:

```tsx
const {
  allColumns,           // All computed columns
  stickyColumns,        // Sticky columns only
  scrollableColumns,    // Scrollable columns only
  visibleColumnKeys,    // Set<string> of visible keys
  leavingColumnKeys,    // Set<string> animating out
  leavingColumns,       // Full data for leaving columns
  enteringColumnKeys,   // Set<string> animating in
  columnChange,         // Current change event
  toggleColumn,         // Toggle visibility function
  resetColumns,         // Reset to defaults function
  totalStickyWidth,     // Combined sticky column width
} = useColumns({
  columns,
  defaultHiddenColumns,
  defaultVisibleColumns,
})
```

**Key behaviors:**
- Automatically syncs with external `defaultVisibleColumns` changes
- Tracks entering/leaving columns for animations
- Computes sticky offsets automatically
- Cleans up animation state after transitions

### `useScrollSync`

Synchronizes horizontal scroll between header and body:

```tsx
const {
  canScrollLeft,
  canScrollRight,
  showScrollIndicator,
  handleScrollLeft,
  handleScrollRight,
} = useScrollSync({
  headerRef,
  bodyRef,
})
```

**Key behaviors:**
- Uses `requestAnimationFrame` for performance
- ResizeObserver for container changes
- Passive scroll listeners
- Sub-pixel scroll threshold (1px)

### `useSelection`

Manages row selection state:

```tsx
const selectionState = useSelection({
  rowIds,
  enabled: true,
  initialSelected: new Set(),
})

// Returns null when disabled, otherwise:
{
  selectedIds,          // Set<string | number>
  toggleRowSelection,   // (id) => void
  selectAllRows,        // () => void
  deselectAllRows,      // () => void
  isRowSelected,        // (id) => boolean
  isAllSelected,        // boolean
  isSomeSelected,       // boolean (partial selection)
  selectedCount,        // number
}
```

### `useInfiniteScroll`

Universal hook for infinite scroll with skeleton delay:

```tsx
const {
  infiniteScrollProps,  // Pass to StickyDataTable
  isLoadingMore,
  triggerLoadMore,      // Manual trigger
} = useInfiniteScroll({
  hasNextPage,
  loadMore: fetchNextPage,
  skeletonRowCount: 10,
  threshold: 200,
  minimumDelay: 250,    // Prevents skeleton flash
})
```

---

## Context API

Located in `context/table-context.tsx`. Provides selective state access without prop drilling.

### Provider

```tsx
<TableProvider value={tableContextValue}>
  {children}
</TableProvider>
```

### Hooks

```tsx
// Full context (use sparingly)
const context = useTableContext()

// Selective access (preferred)
const { stickyState, handleScrollLeft, handleScrollRight } = useScrollContext()
const { columns, toggleColumn, visibleColumnKeys } = useColumnsContext()
const { selectionState, getRowId } = useSelectionContext()
const { sortColumn, sortDirection, handleSort } = useSortContext()
const { borderRadius, borderConfig, backgroundConfig } = useStylingContext()
```

---

## CSS Grid System

### Grid Template Generation

Both header and body use identical grid templates for perfect alignment:

```tsx
// utils/grid.ts
function generateGridTemplate(
  stickyColumns: ColumnConfig[],
  scrollableColumns: ColumnConfig[]
): string {
  // Sticky: fixed pixel widths
  const stickyWidths = stickyColumns
    .map(col => col.maxWidth
      ? `minmax(${col.minWidth ?? col.width}px, ${col.maxWidth}px)`
      : `${col.minWidth ?? col.width}px`
    )
    .join(' ')

  // Scrollable: flexible fr units
  const scrollableWidths = scrollableColumns
    .map(col => col.maxWidth
      ? `minmax(${col.minWidth ?? col.width}px, ${col.maxWidth}px)`
      : `minmax(${col.minWidth ?? col.width}px, ${col.flexRatio ?? 1}fr)`
    )
    .join(' ')

  return `${stickyWidths} ${scrollableWidths}`.trim()
}
```

### Example Output

```css
/* Two sticky columns + three scrollable */
grid-template-columns: 60px 200px minmax(250px, 1fr) minmax(120px, 1fr) minmax(100px, 1fr);
```

---

## Sticky State System

The `StickyState` object controls styling based on scroll position:

```tsx
interface StickyState {
  showLeftArrow: boolean      // Content before viewport
  showRightArrow: boolean     // Content after viewport
  hasArrows: boolean          // Derived: either arrow visible
  useEnhancedStyling: boolean // Apply special backgrounds/borders
}
```

**When enhanced styling is active:**
- Sticky cells get opaque backgrounds (cover content behind)
- Right border appears on last sticky column
- Different background colors applied

---

## Utility Architecture

The utilities are consolidated into three focused files for maintainability:

### `utils/grid.ts` - Grid & Column Calculations
- `generateGridTemplate()` - CSS Grid template generation
- `calculateTotalStickyWidth()` - Sticky column width sum
- `computeColumnOffsets()` - Sticky position calculations
- `separateColumns()` - Split into sticky/scrollable

### `utils/styles.ts` - All Styling Utilities
Consolidated styling functions (previously split across 7 files):
- Alignment: `getAlignmentClasses()`, `getCellPadding()`
- Backgrounds: `getHeaderStickyBackground()`, `getRowStickyBackground()`
- Borders: `getHeaderOuterBorders()`, `getBodyOuterBorders()`, `getRowBorder()`, `getCellBorder()`, `getStickyColumnBorder()`
- Animation: `getColumnAnimationClass()`, `getColumnAnimationDataAttrs()`
- Cell styles: `getCellStyle()`

### `utils/column-processor.ts` - Unified Processing
Provides unified column processing for both table and skeleton rendering.

---

## Column Processing

### Unified Processor

`utils/column-processor.ts` provides unified column processing for both table and skeleton:

```tsx
const processed = processColumns({
  columns,
  enableSelection,
  visibleColumnKeys,
  simulateScrollable,
  borderConfig,
  backgroundConfig,
})

// Returns:
{
  allColumns: ComputedColumn[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  gridTemplate: string
  totalStickyWidth: number
  stickyState: StickyState
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
}
```

### ComputedColumn

Each column gets computed properties:

```tsx
interface ComputedColumn extends ColumnConfig {
  computedStickyLeft: number  // Calculated offset
  index: number               // Position in array
  isFirst: boolean            // First column?
  isLast: boolean             // Last column?
  isFirstSticky: boolean      // First sticky column?
  isLastSticky: boolean       // Last sticky column?
}
```

---

## Animation System

### FLIP Animations

Column transitions use FLIP (First, Last, Invert, Play) for smooth movement:

```tsx
// hooks/use-column-flip.ts
export function useColumnFlip(
  containerRef: RefObject<HTMLElement>,
  columnKeys: string[],
  options?: { duration?: number; easing?: string }
)
```

**Animation flow:**
1. **Entering column**: CSS `animate-column-add` (scale + fade in)
2. **Leaving column**: CSS `animate-column-remove` (scale + fade out)
3. **Neighbors**: FLIP animation shifts them smoothly

### Animation Timing

```tsx
// config.ts
ANIMATION_CONFIG = {
  COLUMN_ENTER_DURATION: 300,   // Entry animation
  COLUMN_LEAVE_DURATION: 250,   // Exit animation
  COLUMN_SHIFT_DURATION: 200,   // FLIP neighbor shift
  COLUMN_REMOVE_DELAY: 250,     // DOM removal delay
  COLUMN_CHANGE_CLEAR_DELAY: 350,
}
```

---

## Performance Optimizations

### Built-in Optimizations

1. **RAF Throttling** - Scroll state updates use `requestAnimationFrame`
2. **ResizeObserver** - Efficient dimension change detection
3. **Passive Listeners** - Scroll events don't block
4. **Memoization** - Components use `memo()` where beneficial
5. **GPU Acceleration** - Animations use `transform` and `opacity`
6. **Automatic Cleanup** - Animation states clear after transitions

### Performance Tips

**For large datasets (1000+ rows):**
- Use infinite scroll instead of loading all data
- Consider virtual scrolling (not built-in)
- Memoize expensive `renderCell` functions

**For many columns (15+):**
- Hide non-essential columns by default
- Use column groups for organization
- Consider pagination

**For frequent updates:**
- Debounce sort/filter operations
- Use server-side sorting for paginated data
- Batch state updates

---

## Design Decisions

### Why CSS Grid?

- Perfect header/body alignment guaranteed
- Built-in handling of sticky positioning
- Efficient reflow on column changes
- Native browser optimizations

### Why Unified Hook?

The `useStickyDataTable` pattern:
- Single source of truth
- Easier testing and debugging
- Clean component code
- Reusable for custom implementations

### Why Context API?

- Eliminates prop drilling through deep component trees
- Selective re-renders via specialized hooks
- Decouples subcomponents from parent

### Why Automatic Sticky Offsets?

- Eliminates manual calculation errors
- Simpler column configuration
- Works correctly when columns change visibility

---

## Extending the Component

### Custom Implementation with Hooks

Use the exported hooks for custom table implementations:

```tsx
import {
  useStickyDataTable,
  TableBody,
  TableHeader,
} from '...'

function CustomTable({ data, columns, ... }) {
  const state = useStickyDataTable({ data, columns, ... })

  return (
    <div>
      <CustomToolbar state={state} />
      <TableHeader {...headerProps} />
      <TableBody {...bodyProps} />
    </div>
  )
}
```

### Custom Cell Renderer Pattern

For complex cells, extract to components:

```tsx
const renderCell = (key: string, row: Order, index: number) => {
  switch (key) {
    case 'customer':
      return <CustomerCell customer={row.customer} />
    case 'status':
      return <StatusBadge status={row.status} />
    case 'actions':
      return <ActionMenu row={row} onEdit={handleEdit} />
    default:
      return row[key]
  }
}
```

---

## Next Steps

- [Features](./FEATURES.md) - Selection, sorting, filtering, infinite scroll
- [Styling](./STYLING.md) - Borders, backgrounds, animations
- [API Reference](./API-REFERENCE.md) - Complete props and types
