/**
 * StickyDataTable - Skeleton Factories
 *
 * Factory functions for creating skeleton configurations.
 *
 * @module config/factories/skeleton
 */

import type { TableSkeletonConfig, SkeletonCellConfig } from '../../types'
import type { SkeletonDimensionConfig } from '../calculators'
import {
  TABLE_CONFIG,
  DEFAULT_SKELETON_CELL,
  DEFAULT_SKELETON_CONFIG,
} from '../constants'

// ============================================================================
// SKELETON DIMENSION CONFIG FACTORY
// ============================================================================

/**
 * Create skeleton dimension configuration
 */
export function createSkeletonDimensionConfig(
  overrides?: Partial<SkeletonDimensionConfig>
): SkeletonDimensionConfig {
  return {
    toolbar: overrides?.toolbar ?? {
      showToolbar: false,
      showLeftToolbar: false,
      showRightToolbar: false,
      showExportButton: false,
      showColumnControl: false,
      showCount: false,
      activeFilterCount: 0,
    },
    rowHeight: overrides?.rowHeight ?? TABLE_CONFIG.ROW_HEIGHT,
    headerHeight: overrides?.headerHeight ?? TABLE_CONFIG.HEADER_HEIGHT,
    headerGap: overrides?.headerGap ?? TABLE_CONFIG.HEADER_GAP,
    borderRadius: overrides?.borderRadius ?? TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  }
}

// ============================================================================
// SKELETON CONFIG FACTORY
// ============================================================================

/**
 * Create skeleton configuration with overrides
 */
export function createSkeletonConfig(overrides?: Partial<TableSkeletonConfig>): TableSkeletonConfig {
  return {
    ...DEFAULT_SKELETON_CONFIG,
    ...overrides,
    headerCell: {
      ...DEFAULT_SKELETON_CELL,
      ...overrides?.headerCell,
    },
    bodyCell: {
      ...DEFAULT_SKELETON_CELL,
      ...overrides?.bodyCell,
    },
  }
}
