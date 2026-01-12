'use client'

/**
 * useInfiniteScroll Hook
 *
 * Universal hook for infinite scroll with automatic skeleton delay.
 * Handles loading state management and ensures skeleton is visible for a minimum duration.
 *
 * @module hooks/use-infinite-scroll
 *
 * @example
 * ```tsx
 * const { infiniteScrollProps, isLoadingMore } = useInfiniteScroll({
 *   hasNextPage,
 *   loadMore,
 *   skeletonRowCount: 10,
 *   minimumDelay: 250, // Default
 * })
 *
 * <StickyDataTable
 *   data={items}
 *   infiniteScroll={infiniteScrollProps}
 * />
 * ```
 */

import { useCallback, useState } from 'react'
import type { InfiniteScrollConfig } from '../types'

/**
 * Configuration options for useInfiniteScroll
 */
export interface UseInfiniteScrollOptions {
  /**
   * Whether more data is available to load
   */
  hasNextPage: boolean

  /**
   * Function to load more data
   * Should return a Promise that resolves when data is loaded
   */
  loadMore: () => Promise<void> | void

  /**
   * Number of skeleton rows to show while loading
   * @default 5
   */
  skeletonRowCount?: number

  /**
   * Distance in pixels from bottom to trigger loading
   * @default 200
   */
  threshold?: number

  /**
   * Minimum time in ms to show skeleton (prevents flash on fast loads)
   * @default 250
   */
  minimumDelay?: number

  /**
   * Callback when loading fails
   */
  onError?: (error: unknown) => void
}

/**
 * Return value from useInfiniteScroll
 */
export interface UseInfiniteScrollReturn {
  /**
   * Props to spread on StickyDataTable's infiniteScroll prop
   */
  infiniteScrollProps: InfiniteScrollConfig

  /**
   * Whether data is currently being loaded
   */
  isLoadingMore: boolean

  /**
   * Manually trigger load more (useful for "Load More" buttons)
   */
  triggerLoadMore: () => Promise<void>
}

/**
 * Universal infinite scroll hook with automatic skeleton delay
 *
 * This hook abstracts the loading state management and delay logic,
 * making infinite scroll consistent across all tables.
 *
 * @example Basic usage
 * ```tsx
 * const { infiniteScrollProps } = useInfiniteScroll({
 *   hasNextPage,
 *   loadMore: fetchNextPage,
 * })
 *
 * <StickyDataTable
 *   data={items}
 *   columns={columns}
 *   infiniteScroll={infiniteScrollProps}
 * />
 * ```
 *
 * @example With custom delay and error handling
 * ```tsx
 * const { infiniteScrollProps, isLoadingMore } = useInfiniteScroll({
 *   hasNextPage,
 *   loadMore: fetchNextPage,
 *   skeletonRowCount: 10,
 *   minimumDelay: 300,
 *   onError: (err) => toast.error('Failed to load more'),
 * })
 * ```
 */
export function useInfiniteScroll({
  hasNextPage,
  loadMore,
  skeletonRowCount = 5,
  threshold = 200,
  minimumDelay = 250,
  onError,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const handleLoadMore = useCallback(async () => {
    // Guard: Don't load if already loading
    if (isLoadingMore) return

    setIsLoadingMore(true)
    try {
      // Run minimum delay and loadMore in parallel
      // Skeleton stays visible for at least minimumDelay ms
      const loadPromise = Promise.resolve(loadMore())
      const delayPromise = minimumDelay > 0
        ? new Promise((resolve) => setTimeout(resolve, minimumDelay))
        : Promise.resolve()

      // Wait for both to complete
      await Promise.all([loadPromise, delayPromise])
    } catch (error) {
      console.error('Failed to load more:', error)
      onError?.(error)
    } finally {
      setIsLoadingMore(false)
    }
  }, [isLoadingMore, loadMore, minimumDelay, onError])

  const infiniteScrollProps: InfiniteScrollConfig = {
    hasNextPage,
    isLoadingMore,
    onLoadMore: handleLoadMore,
    skeletonRowCount,
    threshold,
  }

  return {
    infiniteScrollProps,
    isLoadingMore,
    triggerLoadMore: handleLoadMore,
  }
}













