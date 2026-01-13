# Hooks Reference

Custom hooks for advanced StickyDataTable usage.

## Overview

Hooks are organized by responsibility:

| Category | Hooks |
|----------|-------|
| Core | `useStickyDataTable` |
| Column | `useColumns`, `useColumnConfiguration`, `useColumnFlip` |
| Scroll | `useScrollSync`, `useInfiniteScroll` |
| State | `useSort`, `useSelection`, `useTableFilters` |
| Config | `useTableConfiguration` |
| Utils | `useArrowPosition`, `useExportCsvSticky` |
| Data Adapters | `useTableWithGraphQL`, `useTableWithAsync` |

## Core Hook

### useStickyDataTable

Main orchestration hook that combines all table functionality:

```tsx
const {
  // Refs
  headerScrollRef,
  bodyScrollRef,
  // Column state
  columnsWithSelection,
  stickyColumns,
  scrollableColumns,
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
  // Selection state
  selectionState,
  // ...more
} = useStickyDataTable({
  data,
  columns,
  columnLabels,
  enableSelection: true,
  // ...other options
})
```

**Options**: Same as `StickyDataTableProps` excluding render-specific props.

## Column Hooks

### useColumnConfiguration

Persistent column configuration with localStorage:

```tsx
const {
  visibleColumns,
  columnOrder,
  toggleColumn,
  reorderColumns,
  resetToDefaults,
  isHydrated,
} = useColumnConfiguration({
  columns,
  defaultVisibleColumns: ['id', 'name', 'amount'],
  persistKey: 'my-table-columns',
})
```

**Options**:

| Option | Type | Description |
|--------|------|-------------|
| `columns` | `ColumnConfig[]` | All available columns |
| `defaultVisibleColumns` | `string[]` | Default visible column keys |
| `defaultHiddenColumns` | `string[]` | Default hidden column keys |
| `persistKey` | `string` | localStorage key |

### useColumns

Internal hook for column visibility with FLIP animations:

```tsx
const {
  visibleColumnKeys,
  leavingColumnKeys,
  enteringColumnKeys,
  columnChange,
  toggleColumn,
  resetColumns,
} = useColumns({
  columns,
  defaultHiddenColumns: [],
})
```

### useColumnFlip

FLIP animation hook for smooth column transitions:

```tsx
useColumnFlip({
  containerRef,
  columnChange,
  duration: 200,
})
```

## Scroll Hooks

### useScrollSync

Synchronize scroll between header and body:

```tsx
const { headerScrollRef, bodyScrollRef, stickyState } = useScrollSync()
```

### useInfiniteScroll

Infinite scroll with intersection observer:

```tsx
const { sentinelRef, isLoading } = useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold: 200,
})
```

**Options**:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hasNextPage` | `boolean` | - | More pages available |
| `isFetchingNextPage` | `boolean` | - | Currently fetching |
| `fetchNextPage` | `() => void` | - | Fetch callback |
| `threshold` | `number` | `200` | Trigger distance in pixels |

## State Hooks

### useSort

Client-side sorting:

```tsx
const { sortColumn, sortDirection, sortedData, handleSort } = useSort({
  data,
  columns,
})
```

### useSelection

Row selection management:

```tsx
const {
  selectedIds,
  isAllSelected,
  isIndeterminate,
  toggleRow,
  toggleAll,
  clearSelection,
} = useSelection({
  data,
  getRowId: (row) => row.id,
})
```

### useTableFilters

Filter state management:

```tsx
const {
  filterState,
  addFilter,
  removeFilter,
  updateFilter,
  clearFilters,
  hasActiveFilters,
} = useTableFilters({
  categories,
  persistKey: 'my-table-filters',
  onChange: (state) => refetch({ filters: state }),
})
```

**Options**:

| Option | Type | Description |
|--------|------|-------------|
| `categories` | `FilterCategory[]` | Available filter categories |
| `persistKey` | `string` | localStorage key (optional) |
| `initialState` | `FilterState` | Initial filter state |
| `onChange` | `(state: FilterState) => void` | Change callback |

## Config Hook

### useTableConfiguration

Persistent table configuration:

```tsx
const {
  config,
  updateConfig,
  resetToDefaults,
  isHydrated,
} = useTableConfiguration({
  persistKey: 'my-table-config',
  defaultConfig: {
    dimensions: { rowHeight: 52 },
  },
})
```

## Utility Hooks

### useExportCsvSticky

CSV export functionality:

```tsx
const { exportToCsv, exportSelected } = useExportCsvSticky({
  data,
  columns,
  columnLabels,
  filename: 'export.csv',
})
```

### useArrowPosition

Calculate navigation arrow positioning:

```tsx
const { leftArrowStyle, rightArrowStyle } = useArrowPosition({
  containerRef,
  preferredTopOffset: 100,
})
```

## Data Adapter Hooks

### useTableWithGraphQL

Apollo GraphQL integration with automatic skeleton:

```tsx
const { tableProps, infiniteScrollProps, loadingStates } = useTableWithGraphQL({
  data: queryData?.items ?? [],
  loading,
  hasNextPage: queryData?.pageInfo?.hasNextPage ?? false,
  fetchMore,
  filterDependencies: [filters],
})

<StickyDataTable {...tableProps} infiniteScroll={infiniteScrollProps} />
```

**Options**:

| Option | Type | Description |
|--------|------|-------------|
| `data` | `T[]` | Data array |
| `loading` | `boolean` | Apollo loading state |
| `hasNextPage` | `boolean` | More pages available |
| `fetchMore` | `() => Promise<any>` | Fetch more function |
| `filterDependencies` | `any[]` | Values that trigger skeleton |
| `minimumLoadingDuration` | `number` | Min skeleton time (default: 300ms) |

### useTableWithAsync

Generic async data fetching:

```tsx
const { tableProps, fetchData, applyFilters, loadMore } = useTableWithAsync<User>()

// Initial fetch
useEffect(() => {
  fetchData(async () => {
    const response = await fetch('/api/users')
    return response.json()
  })
}, [])

// Filter with skeleton
const handleFilter = (filters) => {
  applyFilters(async () => {
    return fetch(`/api/users?status=${filters.status}`).then(r => r.json())
  })
}
```

### useTableLoadingState

Core loading state hook for building custom adapters:

```tsx
const { state, actions } = useTableLoadingState({
  minimumLoadingDuration: 300,
  loadingDebounce: 50,
})

// Use in custom adapter
actions.startLoading('filter')
await fetchData()
actions.stopLoading()
```

## Related

- [Types Reference](./types.md) - Return type definitions
- [Data Adapters Guide](../../../sticky-data-table/docs/DATA-ADAPTERS.md) - Inline docs
- [Features](../features/init.md) - Feature implementations
