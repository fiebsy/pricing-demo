# Infinite Scroll

Pagination and load-more functionality in StickyDataTable.

## Overview

Infinite scroll automatically fetches more data as the user scrolls near the bottom. The component handles loading states and skeleton display.

## Basic Setup

```tsx
<StickyDataTable
  data={data}
  columns={columns}
  columnLabels={columnLabels}
  renderCell={renderCell}
  infiniteScroll={{
    hasNextPage: true,
    isFetchingNextPage: false,
    fetchNextPage: () => loadMore(),
  }}
/>
```

## InfiniteScrollConfig

```tsx
interface InfiniteScrollConfig {
  hasNextPage: boolean         // More pages available?
  isFetchingNextPage: boolean  // Currently fetching?
  fetchNextPage: () => void    // Fetch callback
  threshold?: number           // Trigger distance (default: 200px)
  loadingIndicator?: ReactNode // Custom loading UI
}
```

## With GraphQL (Apollo)

### Using Data Adapter (Recommended)

```tsx
import { useTableWithGraphQL } from '...'

function MyTable() {
  const { data, loading, fetchMore } = useGetItemsQuery({
    variables: { first: 50 },
  })

  const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
    data: data?.items?.edges?.map(e => e.node) ?? [],
    loading,
    hasNextPage: data?.items?.pageInfo?.hasNextPage ?? false,
    fetchMore: () => fetchMore({
      variables: { after: data?.items?.pageInfo?.endCursor },
    }),
  })

  return (
    <StickyDataTable
      {...tableProps}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
      infiniteScroll={infiniteScrollProps}
    />
  )
}
```

### Manual Setup

```tsx
function MyTable() {
  const [items, setItems] = useState<Item[]>([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const fetchMore = async () => {
    if (isFetching || !hasNextPage) return

    setIsFetching(true)
    const result = await fetchItems({ after: lastCursor })
    setItems(prev => [...prev, ...result.items])
    setHasNextPage(result.hasNextPage)
    setIsFetching(false)
  }

  return (
    <StickyDataTable
      data={items}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
      infiniteScroll={{
        hasNextPage,
        isFetchingNextPage: isFetching,
        fetchNextPage: fetchMore,
      }}
    />
  )
}
```

## With REST API

```tsx
import { useTableWithAsync } from '...'

function MyTable() {
  const { tableProps, fetchData, loadMore, setHasNextPage } = useTableWithAsync<Item>()
  const [page, setPage] = useState(1)

  // Initial fetch
  useEffect(() => {
    fetchData(async () => {
      const res = await fetch('/api/items?page=1')
      const data = await res.json()
      setHasNextPage(data.hasMore)
      return data.items
    })
  }, [])

  // Setup load more handler
  useEffect(() => {
    loadMore.setHandler(async () => {
      const nextPage = page + 1
      const res = await fetch(`/api/items?page=${nextPage}`)
      const data = await res.json()
      setPage(nextPage)
      setHasNextPage(data.hasMore)
      return data.items
    })
  }, [page])

  return (
    <StickyDataTable
      {...tableProps}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
    />
  )
}
```

## Loading States

### Automatic Skeleton

When using data adapters, skeletons display automatically:

```tsx
// During initial load: Full skeleton
if (tableProps.isLoading && tableProps.data.length === 0) {
  return <TableSkeleton columns={columns} />
}

// During load more: Inline skeleton at bottom
// (Handled automatically by infiniteScroll)
```

### Custom Loading Indicator

```tsx
<StickyDataTable
  infiniteScroll={{
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    loadingIndicator: (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    ),
  }}
/>
```

### Using LoadMoreSkeleton

```tsx
import { LoadMoreSkeleton } from '...'

<StickyDataTable
  infiniteScroll={{
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    loadingIndicator: (
      <LoadMoreSkeleton
        columns={columns}
        rowCount={5}
        rowHeight={52}
      />
    ),
  }}
/>
```

## Threshold Configuration

Control when fetching triggers:

```tsx
infiniteScroll={{
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold: 400, // Trigger 400px from bottom (default: 200)
}}
```

## Using the Hook Directly

```tsx
import { useInfiniteScroll } from '...'

const { sentinelRef, isLoading } = useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold: 200,
})

// Place sentinel in your custom implementation
<div ref={sentinelRef} />
```

## Best Practices

### Cursor-Based Pagination

Always use cursor-based pagination for reliability:

```tsx
// Good
fetchMore({ variables: { after: lastCursor } })

// Avoid (offset can drift with new data)
fetchMore({ variables: { offset: items.length } })
```

### Prevent Double Fetches

The component prevents this, but verify your API handles it:

```tsx
const fetchMore = useCallback(async () => {
  if (isFetching) return // Already fetching
  // ...
}, [isFetching])
```

### Empty State After Scroll

Handle the case where all data is loaded:

```tsx
{data.length > 0 && !hasNextPage && (
  <div className="py-4 text-center text-secondary">
    All items loaded
  </div>
)}
```

## Deprecated Props

These props still work but use `infiniteScroll` instead:

| Deprecated | Use Instead |
|------------|-------------|
| `onEndReached` | `infiniteScroll.fetchNextPage` |
| `onEndReachedThreshold` | `infiniteScroll.threshold` |
| `loadingIndicator` | `infiniteScroll.loadingIndicator` |

## Related

- [Data Adapters](../../../sticky-data-table/docs/DATA-ADAPTERS.md) - Inline guide
- [Hooks Reference](../api/hooks.md) - useInfiniteScroll
- [Skeleton Loading](../architecture/styling.md) - Loading states
