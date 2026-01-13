# Props Reference

Complete reference for StickyDataTable component props.

## Overview

The `StickyDataTableProps<T>` interface defines all available props. The generic `T` is your data row type.

## Required Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of data rows |
| `columns` | `ColumnConfig[]` | Column configuration array |
| `columnLabels` | `Record<string, string>` | Column key to header label mapping |
| `renderCell` | `(key: string, row: T, index: number) => ReactNode` | Cell renderer function |

## Dimension Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | `number` | `20` | Table corner radius |
| `headerHeight` | `number` | `48` | Header row height |
| `rowHeight` | `number` | `46` | Data row height |

## Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderConfig` | `Partial<BorderConfig>` | JAN2 defaults | Border styling overrides |
| `backgroundConfig` | `Partial<BackgroundConfig>` | JAN2 defaults | Background styling overrides |
| `className` | `string` | - | Container className |
| `testId` | `string` | - | Test ID for container |

## Column Control Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showColumnControl` | `boolean` | `true` | Show column visibility dropdown |
| `defaultHiddenColumns` | `string[]` | `[]` | Columns hidden by default |
| `defaultVisibleColumns` | `string[]` | - | Explicit visible columns (takes precedence) |
| `columnGroups` | `{ label: string, keys: string[] }[]` | - | Group columns in dropdown |

## Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSelection` | `boolean` | `false` | Enable row selection |
| `getRowId` | `(row: T) => string` | - | Unique ID extractor for selection |

## Sorting Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `serverSideSort` | `boolean` | `false` | Use server-side sorting |
| `onServerSort` | `(column: string, direction: SortDirection) => void` | - | Server sort callback |
| `serverSortColumn` | `string` | - | Current server sort column |
| `serverSortDirection` | `SortDirection` | - | Current server sort direction |

## Toolbar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftToolbar` | `ReactNode` | - | Left toolbar content (filters, etc.) |
| `rightToolbar` | `ReactNode` | - | Right toolbar content (search, etc.) |
| `showCount` | `boolean` | `false` | Show item count |
| `totalCount` | `number` | - | Total items for count display |
| `countLabel` | `string` | `'items'` | Count label text |
| `toolbarLayout` | `Partial<ToolbarLayoutConfig>` | JAN2 defaults | Toolbar layout overrides |

## Export Props

| Prop | Type | Description |
|------|------|-------------|
| `exportAll` | `() => void` | Export all rows callback |
| `exportSelected` | `() => void` | Export selected rows callback |
| `exportToolbar` | `ReactNode` | Custom export toolbar content |

## Infinite Scroll Props

| Prop | Type | Description |
|------|------|-------------|
| `infiniteScroll` | `InfiniteScrollConfig` | Infinite scroll configuration |
| `loadingIndicator` | `ReactNode` | Custom loading indicator (deprecated) |
| `onEndReached` | `() => void` | End reached callback (deprecated) |
| `onEndReachedThreshold` | `number` | Threshold in pixels (deprecated) |

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

## Empty State Props

| Prop | Type | Description |
|------|------|-------------|
| `emptyState` | `ReactNode` | Content when no data |
| `noResultsState` | `ReactNode` | Content when search/filter returns nothing |
| `searchTerm` | `string` | Current search term |
| `hasActiveFilters` | `boolean` | Whether filters are active |
| `isLoading` | `boolean` | Loading state |

## Column Reordering Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableColumnReorder` | `boolean` | `true` | Enable drag-and-drop reordering |
| `onReorderColumns` | `(keys: string[]) => void` | - | Reorder callback |
| `isColumnConfigHydrated` | `boolean` | `true` | Whether column config is ready |
| `dragCloneMode` | `'floating' \| 'inline'` | `'inline'` | Drag visual mode |
| `dragSwapThreshold` | `number` | - | Swap threshold in pixels |

## Skeleton Props

| Prop | Type | Description |
|------|------|-------------|
| `skeletonConfig` | `SkeletonConfigurationProps` | Skeleton configuration |

### SkeletonConfigurationProps

```tsx
interface SkeletonConfigurationProps {
  scope?: 'rows-only' | 'table-only' | 'full'
  initialRowCount?: number
  infiniteScrollRowCount?: number
  headerCellConfig?: Partial<SkeletonCellConfig>
  bodyCellConfig?: Partial<SkeletonCellConfig>
  checkboxSize?: number
  simulateStickyState?: SkeletonStickyStateMode
}
```

## Navigation Props

| Prop | Type | Description |
|------|------|-------------|
| `arrowPreferredTopOffset` | `number` | Arrow vertical offset |
| `onRowClick` | `(row: T, index: number) => void` | Row click handler |

## Complete Example

```tsx
<StickyDataTable<User>
  // Required
  data={users}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}

  // Dimensions
  borderRadius={16}
  headerHeight={48}
  rowHeight={52}

  // Selection
  enableSelection={true}
  getRowId={(row) => row.id}

  // Sorting
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={handleSort}

  // Toolbar
  leftToolbar={<FilterToolbar {...filterProps} />}
  rightToolbar={<SearchInput {...searchProps} />}
  showCount={true}
  totalCount={totalItems}
  countLabel="users"

  // Infinite scroll
  infiniteScroll={{
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }}

  // Empty states
  emptyState={<EmptyState />}
  noResultsState={<NoResultsState />}
  searchTerm={searchTerm}
  hasActiveFilters={activeFilters.length > 0}
  isLoading={isLoading}

  // Navigation
  onRowClick={(row) => router.push(`/users/${row.id}`)}
/>
```

## Related

- [Types Reference](./types.md) - Type definitions
- [Configuration](./config.md) - Default values
- [Basic Usage](../getting-started/basic-usage.md) - Examples
