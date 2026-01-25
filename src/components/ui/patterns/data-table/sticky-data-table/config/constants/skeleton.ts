/**
 * StickyDataTable - Skeleton Constants
 *
 * Default skeleton cell and config values.
 *
 * @module config/constants/skeleton
 */

import type { SkeletonCellConfig, TableSkeletonConfig } from '../../types'

// ============================================================================
// DEFAULT SKELETON CELL
// ============================================================================

/**
 * Default skeleton cell configuration
 */
export const DEFAULT_SKELETON_CELL: SkeletonCellConfig = {
  widthMode: 'auto',
  widthPercentage: 80,
  fixedWidth: 60,
  height: 16,
  borderRadius: 12,
} as const

// ============================================================================
// DEFAULT SKELETON CONFIG
// ============================================================================

/**
 * Default skeleton configuration
 */
export const DEFAULT_SKELETON_CONFIG: TableSkeletonConfig = {
  enabled: false,
  scope: 'rows-only',
  initialRowCount: 10,
  infiniteScrollRowCount: 5,
  headerCell: DEFAULT_SKELETON_CELL,
  bodyCell: DEFAULT_SKELETON_CELL,
  checkboxSize: 16,
  showToolbarSkeleton: true,
  showFilterSkeleton: true,
  showSearchSkeleton: false,
  showExportSkeleton: true,
  showColumnControlSkeleton: true,
  simulateStickyState: 'auto',
  enableShimmer: true,
  shimmerDuration: 1500,
} as const
