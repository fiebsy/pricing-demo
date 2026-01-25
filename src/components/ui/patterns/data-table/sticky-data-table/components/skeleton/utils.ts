/**
 * Skeleton Utilities
 *
 * Width calculation and default configurations for skeleton cells.
 *
 * @module skeleton/utils
 */

import { TABLE_CONFIG } from '../../config'
import type { ComputedColumn, SkeletonCellConfig } from '../../types'

// ============================================================================
// CONSTANTS
// ============================================================================

export const TOOLBAR_HEIGHT = TABLE_CONFIG.TOOLBAR_HEIGHT
export const TOOLBAR_MARGIN = TABLE_CONFIG.TOOLBAR_MARGIN

// ============================================================================
// DEFAULT CELL CONFIGURATIONS
// ============================================================================

/**
 * Default cell configurations (used when no config provided)
 */
export const DEFAULT_HEADER_CELL_CONFIG: SkeletonCellConfig = {
  widthMode: 'auto',
  widthPercentage: 80,
  fixedWidth: 60,
  height: 16,
  borderRadius: 12,
}

export const DEFAULT_BODY_CELL_CONFIG: SkeletonCellConfig = {
  widthMode: 'auto',
  widthPercentage: 80,
  fixedWidth: 60,
  height: 16,
  borderRadius: 12,
}

// ============================================================================
// WIDTH CALCULATION
// ============================================================================

/**
 * Calculate skeleton width based on cell config and column width
 */
export function calculateSkeletonWidth(
  column: ComputedColumn,
  cellConfig: SkeletonCellConfig
): number {
  const columnWidth = column.minWidth ?? column.width
  const padding = 32 // Cell padding (16px each side)
  const availableWidth = columnWidth - padding

  switch (cellConfig.widthMode) {
    case 'percentage':
      // Use percentage of available space (column width minus padding)
      return Math.max(availableWidth * (cellConfig.widthPercentage / 100), 20)
    case 'fixed':
      // Use fixed width, but cap at available space
      return Math.min(cellConfig.fixedWidth, availableWidth)
    case 'auto':
    default:
      // Auto: use percentage (80%) of available space, capped at max 120px
      // This prevents wide sticky columns from having oversized skeletons
      const autoWidth = availableWidth * 0.8
      return Math.min(Math.max(autoWidth, 40), 120)
  }
}
