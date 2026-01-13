# Types Reference

TypeScript interfaces and types for StickyDataTable.

## Overview

All types are exported from the main package. Import pattern:

```tsx
import type {
  ColumnConfig,
  BorderConfig,
  // ...
} from '@/modules/design-system/v2/components/ui/prod/data/sticky-data-table'
```

## Core Types

### ColumnConfig

```tsx
interface ColumnConfig {
  key: string
  width: number
  align: 'left' | 'center' | 'right'
  isSticky?: boolean
  stickyLeft?: number
  sortable?: boolean
  minWidth?: number
  maxWidth?: number
  flexRatio?: number
  allowTextWrap?: boolean
  maxLines?: number
  useTabularNums?: boolean
}
```

### ComputedColumn

Extended column with computed properties:

```tsx
interface ComputedColumn extends ColumnConfig {
  computedStickyLeft: number
  index: number
  isFirst: boolean
  isLast: boolean
  isLastSticky: boolean
  isFirstSticky: boolean
}
```

### ColumnChange

```tsx
interface ColumnChange {
  columnKey: string
  action: 'added' | 'removed'
  timestamp: number
}
```

## Styling Types

### BorderConfig

```tsx
interface BorderConfig {
  showOuter: boolean
  showRows: boolean
  showCells: boolean
  outerColor: string
  rowColor: string
  cellColor: string
}
```

### BackgroundConfig

```tsx
interface BackgroundConfig {
  headerWrapper: string
  headerContainer: string
  bodyContainer: string
  rowHover: string
}
```

### StickyState

```tsx
interface StickyState {
  canScrollLeft: boolean
  canScrollRight: boolean
  isSticky: boolean
}
```

## Sort Types

### SortDirection

```tsx
type SortDirection = 'asc' | 'desc'
```

### SortColumn

```tsx
type SortColumn = string | null
```

### SortState

```tsx
interface SortState {
  column: SortColumn
  direction: SortDirection
}
```

## Selection Types

### SelectionState

```tsx
interface SelectionState {
  selectedIds: Set<string>
  isAllSelected: boolean
  isIndeterminate: boolean
  toggleRow: (id: string) => void
  toggleAll: () => void
  clearSelection: () => void
  selectAll: (ids: string[]) => void
}
```

## Infinite Scroll Types

### InfiniteScrollConfig

```tsx
interface InfiniteScrollConfig {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  threshold?: number
  loadingIndicator?: ReactNode
}
```

## Filter Types

### FilterCategory

```tsx
interface FilterCategory {
  key: string
  label: string
  icon?: ComponentType<{ className?: string }>
  filters: FilterConfig[]
}
```

### FilterConfig

Union type for all filter types:

```tsx
type FilterConfig =
  | SelectFilterConfig
  | DateFilterConfig
  | RangeFilterConfig
  | SearchFilterConfig
  | BooleanFilterConfig
```

### SelectFilterConfig

```tsx
interface SelectFilterConfig {
  type: 'select'
  key: string
  label: string
  options: FilterOption[]
  multiple?: boolean
}
```

### DateFilterConfig

```tsx
interface DateFilterConfig {
  type: 'date'
  key: string
  label: string
  presets?: DateRangePreset[]
}
```

### FilterState

```tsx
interface FilterState {
  activeFilters: ActiveFilter[]
}
```

### ActiveFilter

```tsx
interface ActiveFilter {
  categoryKey: string
  filterKey: string
  operator: FilterOperator
  value: FilterValue
}
```

## Configuration Types

### TableConfiguration

```tsx
interface TableConfiguration {
  dimensions: TableDimensionConfig
  toolbar: TableToolbarConfig
  border: BorderConfig
  background: BackgroundConfig
  features: TableFeatureConfig
  skeleton: TableSkeletonConfig
}
```

### TableDimensionConfig

```tsx
interface TableDimensionConfig {
  rowHeight: number
  headerHeight: number
  borderRadius: number
  headerGap: number
}
```

### TableToolbarConfig

```tsx
interface TableToolbarConfig {
  position: 'above' | 'integrated'
  countPosition: 'left' | 'right'
  integratedHeight: number
  showLeftToolbar: boolean
  showRightToolbar: boolean
  showCount: boolean
  showColumnControl: boolean
  showExport: boolean
  toolbarToCountGap: number
  toolbarToHeaderGap: number
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

## Drag Types

### DragCloneMode

```tsx
type DragCloneMode = 'floating' | 'inline'
```

## Hook Return Types

### UseStickyDataTableReturn

```tsx
interface UseStickyDataTableReturn<T> {
  // Refs
  headerScrollRef: RefObject<HTMLDivElement>
  bodyScrollRef: RefObject<HTMLDivElement>

  // Configs
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
  gradientBackgroundCssVar: string

  // Column state
  columnsWithSelection: ComputedColumn[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  allVisibleColumns: ComputedColumn[]
  visibleColumnKeys: Set<string>
  leavingColumnKeys: Set<string>
  leavingColumns: ComputedColumn[]
  enteringColumnKeys: Set<string>
  columnChange: ColumnChange | null
  toggleColumn: (key: string) => void
  resetColumns: () => void
  totalStickyWidth: number
  columnLabelsWithCheckbox: Record<string, string>

  // Sort state
  sortColumn: SortColumn
  sortDirection: SortDirection
  sortedData: T[]
  handleSort: (column: string) => void

  // Scroll state
  stickyState: StickyState
  showScrollIndicator: boolean
  handleScrollLeft: () => void
  handleScrollRight: () => void

  // Selection state
  selectionState: SelectionState

  // Toolbar state
  showExportButton: boolean
  showToolbar: boolean
  toolbarLayout: ToolbarLayoutConfig

  // Infinite scroll
  effectiveOnEndReached?: () => void
  effectiveThreshold?: number
  effectiveLoadingIndicator?: ReactNode
}
```

### UseTableWithGraphQLReturn

```tsx
interface UseTableWithGraphQLReturn<TData> {
  tableProps: {
    data: TData[]
    isLoading: boolean
  }
  rawData: TData[]
  infiniteScrollProps?: InfiniteScrollConfig
  loadingStates: {
    isLoading: boolean
    isInitialLoading: boolean
    isFiltering: boolean
    isRefetching: boolean
    isLoadingMore: boolean
    hasInitialData: boolean
  }
  refetchWithSkeleton: (refetchFn: () => Promise<unknown>) => Promise<void>
}
```

### UseTableFiltersReturn

```tsx
interface UseTableFiltersReturn {
  filterState: FilterState
  addFilter: (filter: ActiveFilter) => void
  removeFilter: (categoryKey: string, filterKey: string) => void
  updateFilter: (categoryKey: string, filterKey: string, value: FilterValue) => void
  clearFilters: () => void
  hasActiveFilters: boolean
  getFilterValue: (categoryKey: string, filterKey: string) => FilterValue | undefined
}
```

## Related

- [Props Reference](./props.md) - Component props
- [Hooks Reference](./hooks.md) - Hook documentation
- [Configuration](./config.md) - Default values
