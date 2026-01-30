/**
 * StickyDataTable V2 - Infinite Scroll Types
 *
 * Types for infinite scroll / pagination functionality.
 *
 * @module types/infinite-scroll
 */

import type { ReactNode } from 'react'

// ============================================================================
// INFINITE SCROLL CONFIGURATION
// ============================================================================

/**
 * Unified infinite scroll configuration
 *
 * When provided, the table automatically manages loading state and renders
 * skeleton rows without requiring manual LoadMoreSkeleton configuration.
 *
 * @example
 * ```tsx
 * <StickyDataTable
 *   data={items}
 *   infiniteScroll={{
 *     hasNextPage: true,
 *     isLoadingMore: false,
 *     onLoadMore: async () => await fetchNextPage(),
 *     skeletonRowCount: 10,
 *   }}
 * />
 * ```
 */
export interface InfiniteScrollConfig {
  /**
   * Whether more data is available to load
   * Controls whether the sentinel triggers onLoadMore
   */
  hasNextPage: boolean

  /**
   * Whether data is currently being loaded
   * When true, shows skeleton rows at the bottom of the table
   */
  isLoadingMore: boolean

  /**
   * Callback to load more data
   * Called when the scroll sentinel becomes visible and hasNextPage is true
   * Can be async - the table will respect the loading state you manage externally
   */
  onLoadMore: () => void | Promise<void>

  /**
   * Number of skeleton rows to show while loading
   * @default 5
   */
  skeletonRowCount?: number

  /**
   * Distance in pixels from bottom to trigger onLoadMore
   * @default 200
   */
  threshold?: number

  /**
   * Minimum delay in ms to show skeleton (prevents flashing)
   * Set to 0 to disable
   * @default 0 (no minimum delay, skeleton shows only while actually loading)
   */
  minimumLoadingDelay?: number

  /**
   * Custom loading indicator (overrides automatic skeleton)
   * When provided, renders this instead of auto-generated LoadMoreSkeleton
   */
  customIndicator?: ReactNode
}
