# State Management

Context API and hooks organization in StickyDataTable.

## Overview

State is managed through a combination of:
- **Context API**: For cross-component state access
- **Custom hooks**: For encapsulated logic
- **Main orchestration hook**: `useStickyDataTable`

## Context API

### TableProvider

Wraps the table and provides all state contexts:

```tsx
import { TableProvider, useTableContext } from '...'

// Provider is used internally by StickyDataTable
<TableProvider value={tableState}>
  <TableContent />
</TableProvider>
```

### Available Contexts

| Context | Hook | Purpose |
|---------|------|---------|
| Full state | `useTableContext()` | All table state |
| Scroll | `useScrollContext()` | Scroll refs, sticky state |
| Columns | `useColumnsContext()` | Column visibility |
| Selection | `useSelectionContext()` | Row selection |
| Sort | `useSortContext()` | Sort state |
| Styling | `useStylingContext()` | Border/background config |

### useScrollContext

```tsx
const {
  headerScrollRef,
  bodyScrollRef,
  stickyState,
  showScrollIndicator,
} = useScrollContext()
```

### useColumnsContext

```tsx
const {
  columns,
  visibleColumnKeys,
  leavingColumnKeys,
  toggleColumn,
  resetColumns,
} = useColumnsContext()
```

### useSelectionContext

```tsx
const {
  selectedIds,
  isAllSelected,
  isIndeterminate,
  toggleRow,
  toggleAll,
  clearSelection,
} = useSelectionContext()
```

### useSortContext

```tsx
const {
  sortColumn,
  sortDirection,
  handleSort,
} = useSortContext()
```

### useStylingContext

```tsx
const {
  borderConfig,
  backgroundConfig,
  borderRadius,
} = useStylingContext()
```

## Hook Organization

```
hooks/
├── core/
│   └── useStickyDataTable    # Main orchestration
├── column/
│   ├── useColumns            # Internal visibility
│   ├── useColumnConfiguration # External config + persistence
│   ├── useColumnFlip         # FLIP animations
│   └── useAutoColumnFlip     # Auto FLIP detection
├── scroll/
│   ├── useScrollSync         # Header/body sync
│   ├── useInfiniteScroll     # Pagination
│   └── useWheelRedirect      # Wheel event handling
├── state/
│   ├── useSort               # Sorting logic
│   ├── useSelection          # Row selection
│   └── useTableFilters       # Filter state
├── config/
│   └── useTableConfiguration # Config persistence
├── utils/
│   ├── useArrowPosition      # Arrow positioning
│   └── useExportCsvSticky    # CSV export
└── data-adapters/
    ├── useTableLoadingState  # Core loading state
    ├── useTableWithGraphQL   # Apollo adapter
    └── useTableWithAsync     # Generic async adapter
```

## Main Orchestration Hook

### useStickyDataTable

Combines all functionality into a single hook:

```tsx
const {
  // Refs
  headerScrollRef,
  bodyScrollRef,

  // Configs
  borderConfig,
  backgroundConfig,

  // Column state
  columnsWithSelection,
  stickyColumns,
  scrollableColumns,
  allVisibleColumns,
  visibleColumnKeys,
  leavingColumnKeys,
  toggleColumn,
  resetColumns,

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
  toolbarLayout,

  // Infinite scroll
  effectiveOnEndReached,
  effectiveThreshold,
  effectiveLoadingIndicator,
} = useStickyDataTable({
  data,
  columns,
  columnLabels,
  // ...options
})
```

## State Flow

```
User Action
    │
    ▼
Hook Handler (e.g., handleSort)
    │
    ▼
State Update (useState/useReducer)
    │
    ▼
Context Update (via Provider)
    │
    ▼
Component Re-render
    │
    ▼
UI Update
```

## Data Flow Example: Sorting

1. User clicks header
2. `handleSort(column)` called
3. `useSort` updates `sortColumn`, `sortDirection`
4. `sortedData` recomputed via useMemo
5. Context propagates to `TableBody`
6. Rows re-render with sorted data

```tsx
// In useSort hook
const handleSort = useCallback((column: string) => {
  setSortColumn(prev => prev === column ? prev : column)
  setSortDirection(prev =>
    sortColumn === column
      ? prev === 'asc' ? 'desc' : 'asc'
      : 'asc'
  )
}, [sortColumn])

const sortedData = useMemo(() => {
  if (!sortColumn) return data
  return [...data].sort((a, b) => {
    // Sort logic
  })
}, [data, sortColumn, sortDirection])
```

## Loading State Management

### Data Adapters

Data adapters handle loading states automatically:

```tsx
const { state, actions } = useTableLoadingState()

// state
state.isLoading        // Combined loading state
state.isInitialLoading // First load
state.isFiltering      // Filter change
state.isRefetching     // Manual refetch
state.isLoadingMore    // Infinite scroll
state.hasInitialData   // Has loaded once

// actions
actions.startLoading('initial' | 'filter' | 'refetch')
actions.withLoading(type, asyncFn)
actions.markInitialDataLoaded()
actions.reset()
```

### Auto-Clear Data Pattern

Data adapters clear `tableProps.data` during loading:

```tsx
const { tableProps, rawData } = useTableWithGraphQL({ ... })

// tableProps.data is [] during loading → skeleton shows
// rawData always has actual data → use for counts/exports
```

## Persistence

### Column Configuration

```tsx
const {
  visibleColumns,
  columnOrder,
  isHydrated,
} = useColumnConfiguration({
  columns,
  persistKey: 'my-table-columns',
})
```

### Filter State

```tsx
const filterHook = useTableFilters({
  categories,
  persistKey: 'my-table-filters',
})
```

### Table Configuration

```tsx
const {
  config,
  updateConfig,
  isHydrated,
} = useTableConfiguration({
  persistKey: 'my-table-config',
})
```

## Performance Considerations

### Memoization

All computed values use `useMemo`:

```tsx
const sortedData = useMemo(() => {
  // Only recomputes when data or sort changes
}, [data, sortColumn, sortDirection])

const visibleColumns = useMemo(() => {
  // Only recomputes when columns or visibility changes
}, [columns, visibleColumnKeys])
```

### Callback Stability

Event handlers use `useCallback`:

```tsx
const handleSort = useCallback((column: string) => {
  // Stable reference
}, [dependencies])
```

### Selective Context Subscription

Use specific context hooks instead of full context:

```tsx
// Good: Only subscribes to selection changes
const { selectedIds } = useSelectionContext()

// Avoid: Subscribes to all state changes
const fullContext = useTableContext()
```

## Related

- [Components](./components.md) - Component hierarchy
- [Hooks Reference](../api/hooks.md) - Hook documentation
- [Styling](./styling.md) - Visual customization
