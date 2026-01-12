/**
 * Data Adapters for StickyDataTable
 *
 * These hooks provide automatic skeleton/loading state management
 * for different data fetching patterns.
 *
 * ## Available Adapters
 *
 * ### useTableWithGraphQL
 * For Apollo GraphQL queries. Auto-detects loading state changes and
 * filter dependency updates.
 *
 * ```tsx
 * const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
 *   data: queryData,
 *   loading: queryLoading,
 *   hasNextPage,
 *   fetchMore,
 *   filterDependencies: [statusFilter, searchTerm],
 * })
 *
 * <StickyDataTable {...tableProps} infiniteScroll={infiniteScrollProps} />
 * ```
 *
 * ### useTableWithAsync
 * For generic async data (fetch, axios, REST APIs).
 * Provides fetch wrappers that automatically manage loading states.
 *
 * ```tsx
 * const { tableProps, fetchData, applyFilters } = useTableWithAsync<User>()
 *
 * useEffect(() => {
 *   fetchData(() => api.getUsers())
 * }, [])
 *
 * const handleFilter = (filters) => {
 *   applyFilters(() => api.getUsers(filters))
 * }
 *
 * <StickyDataTable {...tableProps} />
 * ```
 *
 * ### useTableLoadingState
 * Core loading state management hook. Use this to build custom adapters
 * for other data fetching libraries (React Query, SWR, etc.)
 *
 * ```tsx
 * const { state, actions } = useTableLoadingState()
 *
 * // Manual loading management
 * const complete = actions.startLoading('filter')
 * await doSomething()
 * complete()
 *
 * // Or use the wrapper
 * await actions.withLoading('filter', () => fetchData())
 * ```
 *
 * @module hooks/data-adapters
 */

// Core loading state hook
export {
  useTableLoadingState,
  type TableLoadingStateOptions,
  type TableLoadingState,
  type TableLoadingActions,
  type UseTableLoadingStateReturn,
} from './use-table-loading-state'

// Apollo GraphQL adapter
export {
  useTableWithGraphQL,
  type UseTableWithGraphQLOptions,
  type UseTableWithGraphQLReturn,
} from './use-table-with-graphql'

// Generic async adapter
export {
  useTableWithAsync,
  type UseTableWithAsyncOptions,
  type UseTableWithAsyncReturn,
} from './use-table-with-async'
