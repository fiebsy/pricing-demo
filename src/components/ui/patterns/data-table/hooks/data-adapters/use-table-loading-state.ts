'use client'

/**
 * useTableLoadingState - Core Loading State Management
 *
 * Framework-agnostic hook that manages table loading states for:
 * - Initial data load
 * - Filter/search changes
 * - Refetch operations
 * - Infinite scroll (via integration with useInfiniteScroll)
 *
 * This is the foundation hook used by all data adapters.
 *
 * @module hooks/data-adapters/use-table-loading-state
 */

import { useCallback, useEffect, useRef, useState } from 'react'

// ============================================================================
// Types
// ============================================================================

export interface TableLoadingStateOptions {
  /**
   * Minimum time in ms to show skeleton (prevents flash on fast loads)
   * @default 300
   */
  minimumLoadingDuration?: number

  /**
   * Whether to show skeleton on initial mount
   * @default true
   */
  showSkeletonOnMount?: boolean

  /**
   * Debounce time in ms before showing loading state
   * Prevents skeleton flash for very fast operations
   * @default 50
   */
  loadingDebounce?: number
}

export interface TableLoadingState {
  /**
   * Whether table should show skeleton (use this for isLoading prop)
   */
  isLoading: boolean

  /**
   * Whether initial data has been loaded at least once
   */
  hasInitialData: boolean

  /**
   * Whether a filter/search change is in progress
   */
  isFiltering: boolean

  /**
   * Whether a refetch operation is in progress
   */
  isRefetching: boolean
}

export interface TableLoadingActions {
  /**
   * Call when starting any loading operation
   * Returns a function to call when loading completes
   */
  startLoading: (type: 'initial' | 'filter' | 'refetch') => () => void

  /**
   * Wrap an async operation with automatic loading state management
   */
  withLoading: <T>(
    type: 'initial' | 'filter' | 'refetch',
    operation: () => Promise<T>
  ) => Promise<T>

  /**
   * Mark initial data as loaded (call after first successful fetch)
   */
  markInitialDataLoaded: () => void

  /**
   * Reset all loading states (useful for unmount/cleanup)
   */
  reset: () => void
}

export interface UseTableLoadingStateReturn {
  state: TableLoadingState
  actions: TableLoadingActions
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useTableLoadingState(
  options: TableLoadingStateOptions = {}
): UseTableLoadingStateReturn {
  const {
    minimumLoadingDuration = 300,
    showSkeletonOnMount = true,
    loadingDebounce = 50,
  } = options

  // Core state
  const [isInitialLoading, setIsInitialLoading] = useState(showSkeletonOnMount)
  const [isFiltering, setIsFiltering] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [hasInitialData, setHasInitialData] = useState(false)

  // Track active loading operations
  const loadingStartTimeRef = useRef<number | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const activeLoadingTypeRef = useRef<'initial' | 'filter' | 'refetch' | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  /**
   * Set loading state based on type
   */
  const setLoadingState = useCallback(
    (type: 'initial' | 'filter' | 'refetch', value: boolean) => {
      switch (type) {
        case 'initial':
          setIsInitialLoading(value)
          break
        case 'filter':
          setIsFiltering(value)
          break
        case 'refetch':
          setIsRefetching(value)
          break
      }
    },
    []
  )

  /**
   * Start a loading operation
   * Returns a function to call when complete
   */
  const startLoading = useCallback(
    (type: 'initial' | 'filter' | 'refetch') => {
      // Clear any pending debounce
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Track when loading started
      loadingStartTimeRef.current = Date.now()
      activeLoadingTypeRef.current = type

      // Debounce the loading state to prevent flash
      debounceTimerRef.current = setTimeout(() => {
        setLoadingState(type, true)
      }, loadingDebounce)

      // Return completion function
      return () => {
        const startTime = loadingStartTimeRef.current
        const elapsed = startTime ? Date.now() - startTime : 0
        const remaining = Math.max(0, minimumLoadingDuration - elapsed)

        // Clear debounce timer if still pending
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
          debounceTimerRef.current = null
        }

        // Ensure minimum display duration
        if (remaining > 0) {
          setTimeout(() => {
            setLoadingState(type, false)
            activeLoadingTypeRef.current = null
          }, remaining)
        } else {
          setLoadingState(type, false)
          activeLoadingTypeRef.current = null
        }

        loadingStartTimeRef.current = null
      }
    },
    [loadingDebounce, minimumLoadingDuration, setLoadingState]
  )

  /**
   * Wrap an async operation with loading state management
   */
  const withLoading = useCallback(
    async <T,>(
      type: 'initial' | 'filter' | 'refetch',
      operation: () => Promise<T>
    ): Promise<T> => {
      const complete = startLoading(type)
      try {
        const result = await operation()
        return result
      } finally {
        complete()
      }
    },
    [startLoading]
  )

  /**
   * Mark that initial data has been loaded
   */
  const markInitialDataLoaded = useCallback(() => {
    setHasInitialData(true)
    setIsInitialLoading(false)
  }, [])

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    setIsInitialLoading(showSkeletonOnMount)
    setIsFiltering(false)
    setIsRefetching(false)
    setHasInitialData(false)
    loadingStartTimeRef.current = null
    activeLoadingTypeRef.current = null
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }
  }, [showSkeletonOnMount])

  // Compute aggregate loading state
  const isLoading = isInitialLoading || isFiltering || isRefetching

  return {
    state: {
      isLoading,
      hasInitialData,
      isFiltering,
      isRefetching,
    },
    actions: {
      startLoading,
      withLoading,
      markInitialDataLoaded,
      reset,
    },
  }
}
