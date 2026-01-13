# Sorting

Client-side and server-side sorting in StickyDataTable.

## Overview

Sorting is enabled per-column with `sortable: true`. The component supports both client-side (automatic) and server-side (callback-based) sorting.

## Client-Side Sorting

### Enable Sorting

Mark columns as sortable:

```tsx
const columns: ColumnConfig[] = [
  { key: 'name', width: 200, align: 'left' },
  { key: 'amount', width: 120, align: 'right', sortable: true },
  { key: 'date', width: 150, align: 'left', sortable: true },
]
```

### Behavior

- Click header to sort ascending
- Click again to sort descending
- Click again to clear sort
- Only one column sorted at a time

### Basic Example

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
/>
// Sorting just works - data is sorted automatically
```

## Server-Side Sorting

For paginated data or large datasets, use server-side sorting.

### Enable Server-Side Sorting

```tsx
const [sortColumn, setSortColumn] = useState<string | null>(null)
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  // Enable server-side sorting
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={(column, direction) => {
    setSortColumn(column)
    setSortDirection(direction)
    // Refetch data with new sort params
  }}
/>
```

### With GraphQL

```tsx
const [sortColumn, setSortColumn] = useState<string | null>(null)
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

const { data, loading, refetch } = useGetItemsQuery({
  variables: {
    orderBy: sortColumn,
    orderDirection: sortDirection,
  },
})

const handleSort = (column: string, direction: 'asc' | 'desc') => {
  setSortColumn(column)
  setSortDirection(direction)
  // Query automatically refetches due to variable change
}

<StickyDataTable
  data={data?.items ?? []}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={handleSort}
/>
```

### With Data Adapter

```tsx
const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
  data: data?.items ?? [],
  loading,
  hasNextPage,
  fetchMore,
  filterDependencies: [sortColumn, sortDirection],
})

<StickyDataTable
  {...tableProps}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  infiniteScroll={infiniteScrollProps}
  serverSideSort={true}
  serverSortColumn={sortColumn}
  serverSortDirection={sortDirection}
  onServerSort={handleSort}
/>
```

## Sort Types

The `useSort` hook handles multiple data types:

| Type | Detection | Sort Method |
|------|-----------|-------------|
| Number | `typeof === 'number'` | Numeric comparison |
| String | `typeof === 'string'` | `localeCompare()` |
| Date | `instanceof Date` | `getTime()` comparison |
| Boolean | `typeof === 'boolean'` | `true` > `false` |
| Null/Undefined | Value check | Sorted to end |

## Using the Sort Hook Directly

For custom implementations:

```tsx
import { useSort } from '...'

const {
  sortColumn,
  sortDirection,
  sortedData,
  handleSort,
} = useSort({
  data,
  columns,
  initialColumn: 'amount',
  initialDirection: 'desc',
})
```

**Options**:

| Option | Type | Description |
|--------|------|-------------|
| `data` | `T[]` | Data array to sort |
| `columns` | `ColumnConfig[]` | Column definitions |
| `initialColumn` | `string` | Initial sort column |
| `initialDirection` | `'asc' \| 'desc'` | Initial direction |

## Visual Indicators

Sorted columns show directional indicators in the header:

- **Ascending**: Up arrow (↑)
- **Descending**: Down arrow (↓)
- **Unsorted**: No indicator

## Edge Cases

### Null/Undefined Values

Null and undefined values are always sorted to the end, regardless of direction.

### Custom Sort Logic

For custom sorting, use server-side sorting or pre-sort your data:

```tsx
const customSortedData = useMemo(() => {
  return [...data].sort((a, b) => {
    // Custom sort logic
    return customCompare(a, b)
  })
}, [data])

<StickyDataTable data={customSortedData} />
```

### Non-Sortable Columns

Columns without `sortable: true` cannot be sorted:

```tsx
{
  key: 'actions',
  width: 100,
  align: 'center',
  // No sortable: true - header click does nothing
}
```

## Related

- [Column Configuration](../getting-started/column-config.md)
- [Hooks Reference](../api/hooks.md)
- [Server-Side Data](./infinite-scroll.md)
