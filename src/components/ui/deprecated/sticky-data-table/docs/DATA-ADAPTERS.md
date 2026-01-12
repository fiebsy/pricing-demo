# Data Adapters - Automatic Skeleton Loading

Data adapters provide **automatic skeleton/loading state management** for StickyDataTable. They eliminate the need to manually manage `isLoading` states - skeletons "just work" during:

- Initial page load
- Filter/search changes
- Infinite scroll (load more)
- Data refetching

---

## Quick Start

### For GraphQL (Apollo)

```tsx
import {
  StickyDataTable,
  TableSkeleton,
  useTableWithGraphQL,
} from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

function MyTable() {
  // Your existing GraphQL query
  const { data, loading, fetchMore } = useGetUsersQuery({
    variables: { first: 50, filters },
  })

  // Wrap with data adapter - handles ALL loading states automatically
  const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
    data: data?.users?.edges?.map(e => e.node) ?? [],
    loading,
    hasNextPage: data?.users?.hasNextPage ?? false,
    fetchMore: () => fetchMore({ variables: { after: lastCursor } }),
    filterDependencies: [filters], // Auto-skeleton when filters change
  })

  // Show full skeleton on initial load
  if (tableProps.isLoading && tableProps.data.length === 0) {
    return <TableSkeleton columns={columns} skeletonRowCount={10} />
  }

  // Table with automatic infinite scroll skeletons
  return (
    <StickyDataTable
      {...tableProps}
      columns={columns}
      renderCell={renderCell}
      infiniteScroll={infiniteScrollProps}
    />
  )
}
```

### For Generic Async (fetch, axios, REST)

```tsx
import {
  StickyDataTable,
  TableSkeleton,
  useTableWithAsync,
} from '@/modules/design-system/v2/components/ui/custom/data/sticky-data-table'

function MyTable() {
  const { tableProps, fetchData, applyFilters } = useTableWithAsync<User>()

  // Initial fetch with auto-skeleton
  useEffect(() => {
    fetchData(async () => {
      const response = await fetch('/api/users')
      return response.json()
    })
  }, [])

  // Filter with auto-skeleton
  const handleFilterChange = (filters: Filters) => {
    applyFilters(async () => {
      const response = await fetch(`/api/users?status=${filters.status}`)
      return response.json()
    })
  }

  if (tableProps.isLoading && tableProps.data.length === 0) {
    return <TableSkeleton columns={columns} skeletonRowCount={10} />
  }

  return <StickyDataTable {...tableProps} columns={columns} renderCell={renderCell} />
}
```

---

## Available Adapters

| Adapter | Use Case | Features |
|---------|----------|----------|
| `useTableWithGraphQL` | Apollo/GraphQL | Auto-detects Apollo `loading`, tracks filter deps, infinite scroll |
| `useTableWithAsync` | fetch/axios/REST | Provides wrapped fetch functions with auto-skeleton |
| `useTableLoadingState` | Custom adapters | Core hook for building your own adapter |

---

## useTableWithGraphQL

### Options

```tsx
interface UseTableWithGraphQLOptions<TData> {
  // Required
  data: TData[]              // The data array from your query
  loading: boolean           // Apollo's loading state

  // Infinite Scroll (optional)
  hasNextPage?: boolean      // Whether more pages exist
  fetchMore?: () => Promise  // Apollo's fetchMore function

  // Filter Detection (optional)
  filterDependencies?: any[] // Array of values to watch for changes
                             // When any value changes, skeleton shows

  // Timing (optional)
  minimumLoadingDuration?: number  // Min skeleton display time (default: 300ms)
  loadingDebounce?: number         // Debounce before showing skeleton (default: 50ms)
  skeletonRowCount?: number        // Skeleton rows for load-more (default: 5)
  loadMoreThreshold?: number       // Pixels from bottom to trigger (default: 200)

  // Callbacks
  onFetchMoreError?: (error: unknown) => void
}
```

### Return Value

```tsx
interface UseTableWithGraphQLReturn<TData> {
  // Spread these on StickyDataTable
  tableProps: {
    data: TData[]
    isLoading: boolean
  }

  // Spread on infiniteScroll prop (if using pagination)
  infiniteScrollProps?: InfiniteScrollConfig

  // For custom UI
  loadingStates: {
    isLoading: boolean
    isInitialLoading: boolean
    isFiltering: boolean
    isRefetching: boolean
    isLoadingMore: boolean
    hasInitialData: boolean
  }

  // Manual refetch with skeleton
  refetchWithSkeleton: (refetchFn: () => Promise<unknown>) => Promise<void>
}
```

### Full Example with Filters

```tsx
function CollectionsTable() {
  const [filters, setFilters] = useState({ status: 'all', search: '' })

  const { data, loading, fetchMore, refetch } = useGetCollectionsQuery({
    variables: {
      partnerId,
      first: 50,
      status: filters.status,
      search: filters.search,
    },
  })

  const {
    tableProps,
    infiniteScrollProps,
    loadingStates,
    refetchWithSkeleton,
  } = useTableWithGraphQL({
    data: data?.collections?.edges?.map(e => e.node) ?? [],
    loading,
    hasNextPage: data?.collections?.hasNextPage ?? false,
    fetchMore: () => fetchMore({
      variables: { after: data?.collections?.edges?.slice(-1)[0]?.cursor },
    }),
    // Skeleton appears when ANY of these change
    filterDependencies: [filters.status, filters.search],
  })

  // Handle filter changes - skeleton shows automatically!
  const handleStatusChange = (status: string) => {
    setFilters(prev => ({ ...prev, status }))
  }

  // Manual refetch with skeleton
  const handleRefresh = () => {
    refetchWithSkeleton(() => refetch())
  }

  // Initial load skeleton
  if (loadingStates.isInitialLoading) {
    return <TableSkeleton columns={columns} skeletonRowCount={10} />
  }

  return (
    <>
      <FilterBar onStatusChange={handleStatusChange} />
      <StickyDataTable
        {...tableProps}
        columns={columns}
        renderCell={renderCell}
        infiniteScroll={infiniteScrollProps}
      />
    </>
  )
}
```

---

## useTableWithAsync

For non-GraphQL data fetching (REST APIs, custom backends).

### Options

```tsx
interface UseTableWithAsyncOptions<TData> {
  initialData?: TData[]            // Starting data (default: [])
  minimumLoadingDuration?: number  // Min skeleton time (default: 300ms)
  loadingDebounce?: number         // Debounce delay (default: 50ms)
  skeletonRowCount?: number        // Load-more skeleton rows (default: 5)
  loadMoreThreshold?: number       // Trigger distance (default: 200px)
  onError?: (error: unknown) => void
}
```

### Return Value

```tsx
interface UseTableWithAsyncReturn<TData> {
  tableProps: { data: TData[], isLoading: boolean }
  infiniteScrollProps?: InfiniteScrollConfig

  // Data management
  data: TData[]
  setData: React.Dispatch<React.SetStateAction<TData[]>>

  // Fetch operations (all auto-manage skeleton)
  fetchData: (fetcher: () => Promise<TData[]>) => Promise<void>
  applyFilters: (fetcher: () => Promise<TData[]>) => Promise<void>
  refetch: (fetcher: () => Promise<TData[]>) => Promise<void>

  // Pagination
  loadMore: {
    setHandler: (handler: () => Promise<TData[]>) => void
    trigger: () => Promise<void>
  }
  setHasNextPage: (hasNext: boolean) => void

  // State
  loadingStates: { ... }
  reset: () => void
}
```

### Example with Pagination

```tsx
function UsersTable() {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ role: 'all' })

  const {
    tableProps,
    fetchData,
    applyFilters,
    loadMore,
    setHasNextPage,
  } = useTableWithAsync<User>()

  // Initial fetch
  useEffect(() => {
    fetchData(async () => {
      const res = await api.getUsers({ page: 1, ...filters })
      setHasNextPage(res.hasMore)
      return res.data
    })
  }, [])

  // Set up load more handler
  useEffect(() => {
    loadMore.setHandler(async () => {
      const nextPage = page + 1
      const res = await api.getUsers({ page: nextPage, ...filters })
      setPage(nextPage)
      setHasNextPage(res.hasMore)
      return res.data
    })
  }, [page, filters])

  // Filter change - automatic skeleton
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
    setPage(1)
    applyFilters(async () => {
      const res = await api.getUsers({ page: 1, ...newFilters })
      setHasNextPage(res.hasMore)
      return res.data
    })
  }

  if (tableProps.isLoading && tableProps.data.length === 0) {
    return <TableSkeleton columns={columns} />
  }

  return <StickyDataTable {...tableProps} columns={columns} />
}
```

---

## useTableLoadingState

Core hook for building custom adapters (e.g., React Query, SWR).

### Usage

```tsx
const { state, actions } = useTableLoadingState({
  minimumLoadingDuration: 300,
  showSkeletonOnMount: true,
  loadingDebounce: 50,
})

// State
state.isLoading       // Combined loading state
state.hasInitialData  // True after first successful load
state.isFiltering     // True during filter operations
state.isRefetching    // True during refetch operations

// Actions
actions.startLoading('initial' | 'filter' | 'refetch')  // Returns complete() fn
actions.withLoading(type, asyncFn)                       // Wraps async operation
actions.markInitialDataLoaded()                          // Call after first fetch
actions.reset()                                          // Reset all states
```

### Building a React Query Adapter

```tsx
function useTableWithReactQuery<TData>(options: {
  queryResult: UseQueryResult<TData[]>
  filterDependencies?: unknown[]
}) {
  const { state, actions } = useTableLoadingState()
  const prevLoadingRef = useRef(false)

  // Sync with React Query loading state
  useEffect(() => {
    const wasLoading = prevLoadingRef.current
    const isNowLoading = options.queryResult.isLoading || options.queryResult.isFetching

    if (!wasLoading && isNowLoading) {
      // Started loading
      const type = state.hasInitialData ? 'refetch' : 'initial'
      // Store complete function...
    }

    if (wasLoading && !isNowLoading) {
      // Finished loading
      if (!state.hasInitialData) {
        actions.markInitialDataLoaded()
      }
    }

    prevLoadingRef.current = isNowLoading
  }, [options.queryResult.isLoading, options.queryResult.isFetching])

  return {
    tableProps: {
      data: options.queryResult.data ?? [],
      isLoading: state.isLoading,
    },
  }
}
```

---

## Migration Guide

### Before (Manual Loading)

```tsx
function MyTable() {
  const [isLoading, setIsLoading] = useState(true)
  const { data, loading, fetchMore } = useQuery(...)

  // Manual loading management everywhere
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const handleFilter = async (filters) => {
    setIsLoading(true)  // Manual
    await refetch({ variables: { filters } })
    setIsLoading(false) // Manual
  }

  return isLoading && !data
    ? <TableSkeleton />
    : <StickyDataTable data={data} isLoading={isLoading} />
}
```

### After (With Data Adapter)

```tsx
function MyTable() {
  const { data, loading, fetchMore } = useQuery(...)

  // One hook handles everything
  const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
    data: data ?? [],
    loading,
    hasNextPage,
    fetchMore,
    filterDependencies: [filters],
  })

  return tableProps.isLoading && tableProps.data.length === 0
    ? <TableSkeleton />
    : <StickyDataTable {...tableProps} infiniteScroll={infiniteScrollProps} />
}
```

---

## Best Practices

1. **Always spread `tableProps`** - Contains both `data` and `isLoading`
2. **Use `filterDependencies`** - List all filter/search values that should trigger skeleton
3. **Show `TableSkeleton` for initial load** - Check `tableProps.isLoading && tableProps.data.length === 0`
4. **Let infinite scroll handle load-more** - The adapter manages `isLoadingMore` automatically
5. **Use `minimumLoadingDuration`** - Prevents skeleton flash on fast responses (default: 300ms)

---

**Last Updated**: December 2024
