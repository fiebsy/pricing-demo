'use client'

/**
 * useTableWithAsync - Generic Async Data Adapter
 *
 * For use with any async data source (fetch, axios, custom APIs).
 * Provides automatic skeleton management for tables without GraphQL.
 *
 * @module hooks/data-adapters/use-table-with-async
 *
 * @example Basic Usage with fetch
 * ```tsx
 * const { tableProps, fetchData } = useTableWithAsync<User>()
 *
 * useEffect(() => {
 *   fetchData(async () => {
 *     const response = await fetch('/api/users')
 *     return response.json()
 *   })
 * }, [])
 *
 * <StickyDataTable {...tableProps} columns={columns} />
 * ```
 *
 * @example With Filters
 * ```tsx
 * const { tableProps, fetchData, applyFilters } = useTableWithAsync<User>()
 *
 * const handleFilterChange = (newFilters) => {
 *   applyFilters(async () => {
 *     const response = await fetch(`/api/users?status=${newFilters.status}`)
 *     return response.json()
 *   })
 * }
 * ```
 *
 * @example With Pagination
 * ```tsx
 * const { tableProps, infiniteScrollProps, loadMore, setHasNextPage } = useTableWithAsync<User>()
 *
 * // After initial fetch
 * setHasNextPage(response.hasMore)
 *
 * // Configure loadMore
 * loadMore.setHandler(async () => {
 *   const response = await fetch(`/api/users?page=${nextPage}`)
 *   const newData = await response.json()
 *   setHasNextPage(response.hasMore)
 *   return newData // Will be appended to existing data
 * })
 * ```
 */

import { useCallback, useRef, useState } from 'react'
import type { InfiniteScrollConfig } from '../../types'
import { useTableLoadingState, type TableLoadingStateOptions } from './use-table-loading-state'

// ============================================================================
// Types
// ============================================================================

export interface UseTableWithAsyncOptions<TData> extends TableLoadingStateOptions {
  /**
   * Initial data (optional)
   * @default []
   */
  initialData?: TData[]

  /**
   * Number of skeleton rows during load-more
   * @default 5
   */
  skeletonRowCount?: number

  /**
   * Threshold in pixels from bottom to trigger load more
   * @default 200
   */
  loadMoreThreshold?: number

  /**
   * Called when any fetch operation fails
   */
  onError?: (error: unknown) => void
}

export interface UseTableWithAsyncReturn<TData> {
  /**
   * Props to spread on StickyDataTable
   */
  tableProps: {
    data: TData[]
    isLoading: boolean
  }

  /**
   * Props for infinite scroll (only if loadMore is configured)
   */
  infiniteScrollProps?: InfiniteScrollConfig

  /**
   * Current data array
   */
  data: TData[]

  /**
   * Set data directly (for external state management)
   */
  setData: React.Dispatch<React.SetStateAction<TData[]>>

  /**
   * Fetch initial data with auto-skeleton
   */
  fetchData: (fetcher: () => Promise<TData[]>) => Promise<void>

  /**
   * Fetch with filter change skeleton
   */
  applyFilters: (fetcher: () => Promise<TData[]>) => Promise<void>

  /**
   * Refetch data with auto-skeleton
   */
  refetch: (fetcher: () => Promise<TData[]>) => Promise<void>

  /**
   * Load more data (appends to existing)
   */
  loadMore: {
    /**
     * Set the load more handler
     */
    setHandler: (handler: () => Promise<TData[]>) => void
    /**
     * Trigger load more manually
     */
    trigger: () => Promise<void>
  }

  /**
   * Set whether more pages are available
   */
  setHasNextPage: (hasNext: boolean) => void

  /**
   * Loading states for custom UI
   */
  loadingStates: {
    isLoading: boolean
    isInitialLoading: boolean
    isFiltering: boolean
    isRefetching: boolean
    isLoadingMore: boolean
    hasInitialData: boolean
  }

  /**
   * Clear all data and reset state
   */
  reset: () => void
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useTableWithAsync<TData>({
  initialData = [],
  skeletonRowCount = 5,
  loadMoreThreshold = 200,
  minimumLoadingDuration = 300,
  showSkeletonOnMount = true,
  loadingDebounce = 50,
  onError,
}: UseTableWithAsyncOptions<TData> = {}): UseTableWithAsyncReturn<TData> {
  // Data state
  const [data, setData] = useState<TData[]>(initialData)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Load more handler ref
  const loadMoreHandlerRef = useRef<(() => Promise<TData[]>) | null>(null)

  // Core loading state management
  const { state, actions } = useTableLoadingState({
    minimumLoadingDuration,
    showSkeletonOnMount: showSkeletonOnMount && initialData.length === 0,
    loadingDebounce,
  })

  // -------------------------------------------------------------------------
  // Fetch initial data
  // -------------------------------------------------------------------------
  const fetchData = useCallback(
    async (fetcher: () => Promise<TData[]>) => {
      try {
        const result = await actions.withLoading('initial', fetcher)
        setData(result)
        if (result.length > 0) {
          actions.markInitialDataLoaded()
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        onError?.(error)
        throw error
      }
    },
    [actions, onError]
  )

  // -------------------------------------------------------------------------
  // Apply filters (replaces data)
  // -------------------------------------------------------------------------
  const applyFilters = useCallback(
    async (fetcher: () => Promise<TData[]>) => {
      try {
        const result = await actions.withLoading('filter', fetcher)
        setData(result)
      } catch (error) {
        console.error('Failed to apply filters:', error)
        onError?.(error)
        throw error
      }
    },
    [actions, onError]
  )

  // -------------------------------------------------------------------------
  // Refetch data
  // -------------------------------------------------------------------------
  const refetch = useCallback(
    async (fetcher: () => Promise<TData[]>) => {
      try {
        const result = await actions.withLoading('refetch', fetcher)
        setData(result)
      } catch (error) {
        console.error('Failed to refetch:', error)
        onError?.(error)
        throw error
      }
    },
    [actions, onError]
  )

  // -------------------------------------------------------------------------
  // Load more handler
  // -------------------------------------------------------------------------
  const handleLoadMore = useCallback(async () => {
    if (!loadMoreHandlerRef.current || isLoadingMore) return

    setIsLoadingMore(true)
    const startTime = Date.now()

    try {
      const newData = await loadMoreHandlerRef.current()
      setData((prev) => [...prev, ...newData])
    } catch (error) {
      console.error('Failed to load more:', error)
      onError?.(error)
    } finally {
      // Ensure minimum display time for skeleton
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minimumLoadingDuration - elapsed)

      if (remaining > 0) {
        setTimeout(() => setIsLoadingMore(false), remaining)
      } else {
        setIsLoadingMore(false)
      }
    }
  }, [isLoadingMore, minimumLoadingDuration, onError])

  const setLoadMoreHandler = useCallback((handler: () => Promise<TData[]>) => {
    loadMoreHandlerRef.current = handler
  }, [])

  // -------------------------------------------------------------------------
  // Reset state
  // -------------------------------------------------------------------------
  const reset = useCallback(() => {
    setData(initialData)
    setHasNextPage(false)
    setIsLoadingMore(false)
    loadMoreHandlerRef.current = null
    actions.reset()
  }, [initialData, actions])

  // -------------------------------------------------------------------------
  // Build infinite scroll config
  // -------------------------------------------------------------------------
  const infiniteScrollProps: InfiniteScrollConfig | undefined =
    loadMoreHandlerRef.current
      ? {
          hasNextPage,
          isLoadingMore,
          onLoadMore: handleLoadMore,
          skeletonRowCount,
          threshold: loadMoreThreshold,
        }
      : undefined

  // -------------------------------------------------------------------------
  // Compute final loading state
  // -------------------------------------------------------------------------
  const shouldShowSkeleton = state.isLoading && (
    !state.hasInitialData ||
    state.isFiltering ||
    (state.isRefetching && data.length === 0)
  )

  return {
    tableProps: {
      data,
      isLoading: shouldShowSkeleton,
    },
    infiniteScrollProps,
    data,
    setData,
    fetchData,
    applyFilters,
    refetch,
    loadMore: {
      setHandler: setLoadMoreHandler,
      trigger: handleLoadMore,
    },
    setHasNextPage,
    loadingStates: {
      isLoading: state.isLoading,
      isInitialLoading: !state.hasInitialData && state.isLoading,
      isFiltering: state.isFiltering,
      isRefetching: state.isRefetching,
      isLoadingMore,
      hasInitialData: state.hasInitialData,
    },
    reset,
  }
}
