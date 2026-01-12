# Advanced Usage (ARCHIVED)

> **⚠️ DEPRECATED**: This documentation is archived. The file structure and utility references are outdated.
>
> Current documentation: [../ARCHITECTURE.md](../ARCHITECTURE.md)
>
> **Note**: The utility files (`background-utils.ts`, `border-utils.ts`, `column-alignment.ts`, `grid-template.ts`, `sticky-positioning.ts`) referenced below have been consolidated into `utils/styles.ts` and `utils/grid.ts`.

---

Deep dive into architecture, state management, performance, and advanced patterns.

## Architecture

### Component Hierarchy

```
StickyDataTable (main component)
├── ColumnControlPanel (optional)
│   └── Dropdown for column visibility
└── Table Container
    ├── GradientOverlay (scroll indicator)
    ├── StickyHeaderWrapper
    │   ├── NavigationArrows
    │   │   ├── NavigationArrow (left)
    │   │   └── NavigationArrow (right)
    │   ├── GradientOverlay (header)
    │   └── TableHeader
    │       └── HeaderCell[] (one per column)
    └── TableBody
        └── TableRow[] (one per data item)
            └── BodyCell[] (one per column)
```

### Project Structure

```
sticky-data-table/
├── components/              # React components
│   ├── column-control-panel.tsx    # Column visibility dropdown
│   ├── gradient-overlay.tsx         # Scroll indicator gradient
│   ├── navigation-arrow.tsx        # Individual scroll arrow
│   ├── navigation-arrows.tsx        # Left/right scroll arrows container
│   ├── sticky-header-wrapper.tsx   # Sticky header container
│   ├── table-body.tsx              # Table body container
│   ├── table-header.tsx            # Table header row
│   └── table-row.tsx               # Individual table row
├── hooks/                   # Custom React hooks
│   ├── use-arrow-position.ts       # Arrow positioning logic
│   ├── use-dynamic-columns.ts      # Column visibility management + animation state
│   ├── use-table-scroll-state.ts   # Scroll state & arrow visibility
│   ├── use-table-sort.ts           # Column sorting logic
│   └── use-table-wheel.ts          # Mouse wheel scrolling
├── utils/                   # Utility functions
│   ├── background-utils.ts         # Background class generators
│   ├── border-utils.ts             # Border class generators
│   ├── column-alignment.ts         # Column alignment utilities
│   ├── grid-template.ts            # CSS Grid template generator
│   └── sticky-positioning.ts       # Sticky positioning calculations
├── config.ts               # Configuration constants
├── types.ts                # TypeScript types
└── index.tsx               # Main component & exports
```

## State Management

The component uses several custom hooks for state management:

### useDynamicColumns

Manages column visibility state and animation tracking:

- Tracks `visibleColumnKeys` (currently visible columns)
- Tracks `leavingColumnKeys` (columns animating out)
- Tracks `columnChange` (which column was just toggled)
- Automatically cleans up leaving columns after animation completes

### useTableSort

Handles column sorting logic (generic, works with any data type):

- Tracks `sortColumn` (currently sorted column key)
- Tracks `sortDirection` ('asc' | 'desc' | null)
- Provides `sortedData` (sorted copy of input data)
- Provides `handleSort` (function to trigger sorting)

### useTableScrollState

Tracks scroll position and arrow visibility:

- Monitors scroll position of header and body containers
- Calculates `canScrollLeft` and `canScrollRight`
- Provides scroll handlers (`handleScrollLeft`, `handleScrollRight`)
- Uses `requestAnimationFrame` throttling for performance

### useTableWheel

Enables mouse wheel horizontal scrolling:

- Listens for wheel events on body container
- Converts vertical wheel to horizontal scroll
- Uses passive event listeners for performance

## Sticky State System

The table uses a unified `StickyState` object to manage arrow visibility and sticky cell styling:

```tsx
interface StickyState {
  showLeftArrow: boolean // Left arrow visibility
  showRightArrow: boolean // Right arrow visibility
  hasArrows: boolean // Any arrows visible (derived)
  useEnhancedStyling: boolean // Apply enhanced styling to sticky cells
}
```

**Benefits:**

- Single source of truth for sticky-related state
- Explicit relationship between arrows and styling
- Reduced prop drilling (one object instead of multiple booleans)
- Easy to extend with new sticky states

The `StickyState` is created using `createStickyState()` and passed down to all components that need it. When arrows are visible, sticky cells automatically get enhanced styling (different background and border).

## CSS Grid Alignment System

The table ensures perfect column alignment between header and body through:

1. **Identical Grid Template**: Both `TableHeader` and `TableRow` use the exact same grid template string
2. **Shared Padding Utility**: Both use `getCellPaddingClass()` for consistent padding
3. **Consistent Inline Styles**: Both use identical `minWidth` and `maxWidth` values

### Grid Template Generation

The grid template is generated by `generateGridTemplate()`:

```tsx
// Sticky columns: Fixed pixel widths (or minmax if maxWidth specified)
const stickyWidths = stickyColumns
  .map((col) => {
    const min = col.minWidth ?? col.width
    if (col.maxWidth) {
      return `minmax(${min}px, ${col.maxWidth}px)`
    }
    return `${min}px` // Fixed width
  })
  .join(' ')

// Scrollable columns: Flexible with fr units
const scrollableWidths = scrollableColumns
  .map((col) => {
    const min = col.minWidth ?? col.width
    const ratio = col.flexRatio ?? 1
    if (col.maxWidth) {
      return `minmax(${min}px, ${col.maxWidth}px)`
    }
    return `minmax(${min}px, ${ratio}fr)` // Proportional flexible sizing
  })
  .join(' ')

return `${stickyWidths} ${scrollableWidths}`.trim()
```

**Critical:** The same template string is used for both header and body, ensuring perfect alignment.

## Performance Considerations

### Optimizations

1. **Scroll State Throttling**: Uses `requestAnimationFrame` for scroll state updates
2. **ResizeObserver**: Watches container size changes efficiently
3. **Passive Listeners**: Scroll listeners use passive flag for better performance
4. **State Updates**: Only updates when values actually change
5. **Generic Sorting**: Optimized sorting hook that works with any data type
6. **GPU-Accelerated Animations**: Column animations use `transform` and `opacity`
7. **Automatic Cleanup**: Leaving columns are cleaned up after animation completes
8. **Conditional Transitions**: Grid transitions only activate during column changes

### Performance Tips

**For Large Datasets:**

- Consider virtual scrolling (not currently implemented)
- Limit visible columns to reduce DOM nodes
- Use `minWidth`/`maxWidth` instead of fixed widths for better flexibility

**For Many Columns:**

- Use `hideCellBordersForColumns` to reduce border calculations
- Consider pagination or column grouping
- Disable animations if causing performance issues

**For Frequent Updates:**

- Memoize `renderCell` function if it's expensive
- Use React.memo for row components if needed
- Consider debouncing sort operations for very large datasets

## Customization Patterns

### Custom Sticky Behavior

Modify `createStickyState()` in `config.ts` to change when enhanced styling is applied:

```tsx
export function createStickyState(showLeftArrow: boolean, showRightArrow: boolean): StickyState {
  const hasArrows = showLeftArrow || showRightArrow
  return {
    showLeftArrow,
    showRightArrow,
    hasArrows,
    // Customize this logic as needed
    useEnhancedStyling: hasArrows && someOtherCondition,
  }
}
```

### Custom Cell Rendering

The `renderCell` function gives you full control over cell content:

```tsx
const renderCell = (columnKey: string, row: Product, index: number) => {
  switch (columnKey) {
    case 'rank':
      return index + 1
    case 'name':
      return <strong>{row.name}</strong>
    case 'price':
      return `$${row.price.toFixed(2)}`
    case 'status':
      return <span className={`badge badge-${row.status}`}>{row.status}</span>
    case 'actions':
      return <button onClick={() => handleEdit(row)}>Edit</button>
    default:
      return null
  }
}
```

### Dynamic Column Configuration

Generate columns dynamically based on data:

```tsx
const generateColumns = (data: any[]): ColumnConfig[] => {
  // Analyze data to determine optimal column widths
  const columns: ColumnConfig[] = [{ key: 'id', width: 60, align: 'left', isSticky: true, stickyLeft: 0 }]

  // Add columns based on data structure
  if (data.length > 0) {
    Object.keys(data[0]).forEach((key) => {
      if (key !== 'id') {
        columns.push({
          key,
          width: estimateWidth(key, data),
          align: getAlignment(key),
          sortable: isSortable(key),
        })
      }
    })
  }

  return columns
}
```

## Type Safety

The component uses TypeScript generics for type safety:

```tsx
interface MyDataType extends Record<string, any> {
  id: string
  name: string
  // ... other properties
}

;<StickyDataTable<MyDataType>
  data={myData}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={(key, row, index) => {
    // TypeScript knows 'row' is MyDataType
    return row.name
  }}
/>
```

**Important:** Your data type must extend `Record<string, any>` for the component to work properly.

## Future Enhancements

Potential features that could be added:

- Virtual scrolling for large datasets
- Column resizing (drag handles)
- Column reordering (drag & drop)
- Export functionality (CSV, Excel)
- Filtering capabilities
- Pagination support
- Row selection (checkbox)
- Expandable rows
- Column grouping
- Custom cell editors

## Key Design Decisions

1. **Generic Component**: Uses TypeScript generics to work with any data type
2. **Unified StickyState**: Centralizes arrow visibility and styling logic
3. **CSS Grid**: Ensures perfect column alignment
4. **Utility Functions**: Separates styling logic from components
5. **Type Safety**: Full TypeScript coverage for all configs
6. **Render Function Pattern**: Flexible cell rendering via function prop
7. **Animation System**: Smooth column animations with automatic cleanup
8. **Performance First**: Optimized for large datasets and many columns
