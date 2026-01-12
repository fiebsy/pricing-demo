'use client'

/**
 * useTableWithGraphQL - Apollo GraphQL Data Adapter
 *
 * Integrates Apollo GraphQL queries with StickyDataTable, providing:
 * - Auto-skeleton on initial load
 * - Auto-skeleton on filter/variable changes
 * - Auto-skeleton on refetch
 * - Infinite scroll integration
 * - Minimum loading duration to prevent skeleton flash
 *
 * @module hooks/data-adapters/use-table-with-graphql
 *
 * @example Basic Usage
 * ```tsx
 * const { data, loading } = useGetPartnersQuery({ variables: { first: 50 } })
 *
 * const { tableProps, infiniteScrollProps } = useTableWithGraphQL({
 *   data: data?.partners?.edges?.map(e => e.node) ?? [],
 *   loading,
 *   hasNextPage: data?.partners?.hasNextPage ?? false,
 *   fetchMore: () => fetchMore({ variables: { after: lastCursor } }),
 * })
 *
 * <StickyDataTable
 *   {...tableProps}
 *   columns={columns}
 *   renderCell={renderCell}
 *   infiniteScroll={infiniteScrollProps}
 * />
 * ```
 *
 * @example With Filters
 * ```tsx
 * const [filters, setFilters] = useState({ status: 'active' })
 *
 * const { tableProps } = useTableWithGraphQL({
 *   data: items,
 *   loading,
 *   filterDependencies: [filters], // Triggers skeleton when filters change
 * })
 * ```
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { InfiniteScrollConfig } from '../../types'
import { useTableLoadingState, type TableLoadingStateOptions } from './use-table-loading-state'

// ============================================================================
// Types
// ============================================================================

export interface UseTableWithGraphQLOptions<TData> extends TableLoadingStateOptions {
  /**
   * The data array to display in the table
   */
  data: TData[]

  /**
   * Apollo loading state from useQuery
   */
  loading: boolean

  /**
   * Whether more pages are available (for infinite scroll)
   */
  hasNextPage?: boolean

  /**
   * Function to fetch next page (Apollo fetchMore)
   */
  fetchMore?: () => Promise<unknown> | void

  /**
   * Dependencies that trigger filter loading state when changed
   * Example: [searchTerm, statusFilter, dateRange]
   */
  filterDependencies?: unknown[]

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
   * Called when an error occurs during fetchMore
   */
  onFetchMoreError?: (error: unknown) => void
}

export interface UseTableWithGraphQLReturn<TData> {
  /**
   * Props to spread on StickyDataTable
   */
  tableProps: {
    data: TData[]
    isLoading: boolean
  }

  /**
   * Props for infinite scroll (spread on infiniteScroll prop)
   * Only provided if hasNextPage and fetchMore are configured
   */
  infiniteScrollProps?: InfiniteScrollConfig

  /**
   * Current loading states for custom UI
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
   * Manual refetch with auto-skeleton
   */
  refetchWithSkeleton: (refetchFn: () => Promise<unknown>) => Promise<void>
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useTableWithGraphQL<TData>({
  data,
  loading,
  hasNextPage = false,
  fetchMore,
  filterDependencies = [],
  skeletonRowCount = 5,
  loadMoreThreshold = 200,
  minimumLoadingDuration = 300,
  showSkeletonOnMount = true,
  loadingDebounce = 50,
  onFetchMoreError,
}: UseTableWithGraphQLOptions<TData>): UseTableWithGraphQLReturn<TData> {
  // Core loading state management
  const { state, actions } = useTableLoadingState({
    minimumLoadingDuration,
    showSkeletonOnMount,
    loadingDebounce,
  })

  // Infinite scroll state
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  // Use ref to prevent race conditions in handleLoadMore
  const isLoadingMoreRef = useRef(false)

  // Track previous values for change detection
  const prevLoadingRef = useRef(loading)
  const prevFilterDepsRef = useRef(filterDependencies)
  const isFirstRenderRef = useRef(true)
  const loadingCompleteRef = useRef<(() => void) | null>(null)

  // -------------------------------------------------------------------------
  // Handle Apollo loading state changes
  // -------------------------------------------------------------------------
  useEffect(() => {
    const wasLoading = prevLoadingRef.current
    const isNowLoading = loading

    // Detect loading started
    if (!wasLoading && isNowLoading) {
      // Don't trigger loading states for:
      // 1. Infinite scroll (handled separately)
      // 2. Background refetches when we already have data (prevents flash)
      if (isLoadingMore) {
        prevLoadingRef.current = loading
        return
      }

      // Only trigger loading for INITIAL load (no data yet)
      // Filter changes are handled by the filter dependency effect
      // This prevents Apollo background refetches from causing skeleton flash
      const hasData = data.length > 0
      if (!hasData) {
        loadingCompleteRef.current = actions.startLoading('initial')
      }
      // Note: We intentionally don't trigger 'refetch' loading here
      // to avoid flashing on Apollo cache updates / background refetches
    }

    // Detect loading completed
    if (wasLoading && !isNowLoading) {
      // Mark initial data as loaded on first successful fetch
      if (!state.hasInitialData && data.length > 0) {
        actions.markInitialDataLoaded()
      }

      // Complete the loading state
      if (loadingCompleteRef.current) {
        loadingCompleteRef.current()
        loadingCompleteRef.current = null
      }
    }

    prevLoadingRef.current = loading
  }, [loading, data.length, state.hasInitialData, actions, isLoadingMore])

  // -------------------------------------------------------------------------
  // Handle filter dependency changes
  // -------------------------------------------------------------------------
  useEffect(() => {
    // Skip first render
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      prevFilterDepsRef.current = filterDependencies
      return
    }

    // Check if filter dependencies changed
    const prevDeps = prevFilterDepsRef.current
    const hasChanged = filterDependencies.some(
      (dep, index) => dep !== prevDeps[index]
    )

    if (hasChanged && state.hasInitialData) {
      // Filter changed after initial load - show filter skeleton
      loadingCompleteRef.current = actions.startLoading('filter')
    }

    prevFilterDepsRef.current = filterDependencies
  }, [filterDependencies, state.hasInitialData, actions])

  // Cleanup loading complete callback when loading stops
  useEffect(() => {
    if (!loading && loadingCompleteRef.current) {
      loadingCompleteRef.current()
      loadingCompleteRef.current = null
    }
  }, [loading])

  // -------------------------------------------------------------------------
  // Infinite scroll handler
  // -------------------------------------------------------------------------
  const handleLoadMore = useCallback(async () => {
    // Use ref for guard to prevent race conditions from stale closures
    if (!fetchMore || isLoadingMoreRef.current) {
      return
    }

    // Set both ref and state
    isLoadingMoreRef.current = true
    setIsLoadingMore(true)
    const startTime = Date.now()

    try {
      await fetchMore()
    } catch (error) {
      console.error('Failed to load more:', error)
      onFetchMoreError?.(error)
    } finally {
      // Ensure minimum display time for skeleton
      // Use a shorter duration for load-more (150ms) to feel responsive
      const loadMoreMinDuration = Math.min(150, minimumLoadingDuration)
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, loadMoreMinDuration - elapsed)

      const completeLoading = () => {
        isLoadingMoreRef.current = false
        setIsLoadingMore(false)
      }

      if (remaining > 0) {
        setTimeout(completeLoading, remaining)
      } else {
        completeLoading()
      }
    }
  }, [fetchMore, minimumLoadingDuration, onFetchMoreError])

  // -------------------------------------------------------------------------
  // Manual refetch with skeleton
  // -------------------------------------------------------------------------
  const refetchWithSkeleton = useCallback(
    async (refetchFn: () => Promise<unknown>) => {
      await actions.withLoading('refetch', refetchFn)
    },
    [actions]
  )

  // -------------------------------------------------------------------------
  // Build infinite scroll config
  // -------------------------------------------------------------------------
  const infiniteScrollProps: InfiniteScrollConfig | undefined =
    fetchMore && hasNextPage !== undefined
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
  // Show skeleton when:
  // 1. Initial loading (no data yet)
  // 2. Filter change in progress
  // 3. Refetch in progress (optional - some UIs prefer to show stale data)
  const shouldShowSkeleton = state.isLoading && (
    !state.hasInitialData || // Initial load
    state.isFiltering ||      // Filter change
    (state.isRefetching && data.length === 0) // Refetch with no data
  )

  return {
    tableProps: {
      data,
      isLoading: shouldShowSkeleton,
    },
    infiniteScrollProps,
    loadingStates: {
      isLoading: state.isLoading,
      isInitialLoading: !state.hasInitialData && state.isLoading,
      isFiltering: state.isFiltering,
      isRefetching: state.isRefetching,
      isLoadingMore,
      hasInitialData: state.hasInitialData,
    },
    refetchWithSkeleton,
  }
}
