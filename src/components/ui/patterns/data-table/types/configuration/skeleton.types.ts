/**
 * StickyDataTable V2 - Skeleton Configuration Types
 *
 * Skeleton mode configuration for testing and development.
 *
 * @module types/configuration/skeleton
 */

/**
 * Width calculation mode for skeleton cells
 */
export type SkeletonWidthMode = 'auto' | 'percentage' | 'fixed'

/**
 * Sticky state simulation mode for skeleton
 */
export type SkeletonStickyStateMode = 'auto' | 'scrollable' | 'no-scroll'

/**
 * Skeleton scope - controls what parts of the table show skeletons
 *
 * - 'full': Skeleton for toolbar, header, and body (legacy behavior)
 * - 'table-only': Real toolbar, skeleton for header + body
 * - 'rows-only': Real toolbar + header, skeleton only for body rows (recommended)
 */
export type SkeletonScope = 'full' | 'table-only' | 'rows-only'

/**
 * Individual cell skeleton appearance configuration
 */
export interface SkeletonCellConfig {
  /** Width calculation mode: 'auto' uses column width minus padding, 'percentage' uses a percentage of column width, 'fixed' uses a fixed pixel width */
  widthMode: SkeletonWidthMode
  /** Width percentage (0-100) when mode is 'percentage' */
  widthPercentage: number
  /** Fixed width in pixels when mode is 'fixed' */
  fixedWidth: number
  /** Height in pixels */
  height: number
  /** Border radius of skeleton element in pixels */
  borderRadius: number
}

/**
 * Skeleton mode configuration for testing and development
 *
 * This configuration allows developers to:
 * - Force skeleton display for testing layout shift prevention
 * - Configure the number of skeleton rows for initial load and infinite scroll
 * - Customize individual cell skeleton appearance
 * - Control toolbar skeleton visibility
 * - Test different sticky state scenarios
 *
 * @example
 * ```tsx
 * // Enable skeleton mode in table config
 * const config = createTableConfiguration({
 *   skeleton: {
 *     enabled: true,
 *     initialRowCount: 15,
 *     bodyCell: { height: 20, widthPercentage: 60 }
 *   }
 * })
 * ```
 */
export interface TableSkeletonConfig {
  // === Mode Control ===
  /** Enable skeleton mode (forces skeleton display instead of data) */
  enabled: boolean

  /**
   * Skeleton scope - controls what parts show skeletons
   * - 'full': Skeleton for toolbar, header, and body (for testing)
   * - 'table-only': Real toolbar, skeleton for header + body
   * - 'rows-only': Real toolbar + header, skeleton only for rows (recommended for production)
   * @default 'rows-only'
   */
  scope: SkeletonScope

  // === Row Count Configuration ===
  /** Number of skeleton rows for initial page load (default: 10) */
  initialRowCount: number
  /** Number of skeleton rows for infinite scroll loads (default: 5) */
  infiniteScrollRowCount: number

  // === Cell Configuration ===
  /** Header cell skeleton appearance configuration */
  headerCell: SkeletonCellConfig
  /** Body cell skeleton appearance configuration */
  bodyCell: SkeletonCellConfig
  /** Checkbox cell skeleton size in pixels (default: 16) */
  checkboxSize: number

  // === Toolbar Skeleton ===
  /** Show toolbar skeleton when skeleton mode is enabled */
  showToolbarSkeleton: boolean
  /** Show filter skeleton in toolbar */
  showFilterSkeleton: boolean
  /** Show search skeleton in toolbar */
  showSearchSkeleton: boolean
  /** Show export button skeleton */
  showExportSkeleton: boolean
  /** Show column control skeleton */
  showColumnControlSkeleton: boolean

  // === Sticky State Simulation ===
  /**
   * How to simulate sticky state for skeleton
   * - 'auto': Automatically detect based on column widths
   * - 'scrollable': Show enhanced sticky styling (backgrounds, borders)
   * - 'no-scroll': Show default styling (no enhanced backgrounds)
   */
  simulateStickyState: SkeletonStickyStateMode

  // === Animation ===
  /** Enable shimmer animation on skeletons (default: true) */
  enableShimmer: boolean
  /** Shimmer animation duration in milliseconds (default: 1500) */
  shimmerDuration: number
}

/**
 * Skeleton configuration props for StickyDataTable
 */
export interface SkeletonConfigurationProps {
  /** Enable skeleton mode (forces skeleton display) */
  enabled: boolean
  /** Skeleton scope - what parts show skeletons */
  scope: SkeletonScope
  /** Number of skeleton rows for initial load */
  initialRowCount: number
  /** Number of skeleton rows for infinite scroll */
  infiniteScrollRowCount: number
  /** Header cell skeleton configuration */
  headerCell: SkeletonCellConfig
  /** Body cell skeleton configuration */
  bodyCell: SkeletonCellConfig
  /** Checkbox skeleton size */
  checkboxSize: number
  /** Show toolbar skeleton */
  showToolbarSkeleton: boolean
  /** Show filter skeleton */
  showFilterSkeleton: boolean
  /** Show search skeleton */
  showSearchSkeleton: boolean
  /** Show export skeleton */
  showExportSkeleton: boolean
  /** Show column control skeleton */
  showColumnControlSkeleton: boolean
  /** Sticky state simulation mode */
  simulateStickyState: SkeletonStickyStateMode
  /** Enable shimmer animation */
  enableShimmer: boolean
  /** Shimmer duration in ms */
  shimmerDuration: number
}
