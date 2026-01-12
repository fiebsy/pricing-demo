/**
 * StickyDataTable - Skeleton Calculators
 *
 * Pure calculation functions for skeleton dimensions.
 *
 * @module config/calculators/skeleton
 */

import type { ToolbarConfig, ToolbarLayoutConfig } from '../constants'
import { TABLE_CONFIG } from '../constants'
import { calculateToolbarHeight } from './toolbar'

// ============================================================================
// SKELETON DIMENSION CONFIG TYPE
// ============================================================================

/**
 * Configuration for skeleton dimensions
 * Comprehensive config that captures all dimension variables
 */
export interface SkeletonDimensionConfig {
  /** Toolbar configuration */
  toolbar: ToolbarConfig
  /** Custom row height override (px) - defaults to TABLE_CONFIG.ROW_HEIGHT */
  rowHeight?: number
  /** Custom header height override (px) - defaults to TABLE_CONFIG.HEADER_HEIGHT */
  headerHeight?: number
  /** Custom header gap override (px) - defaults to TABLE_CONFIG.HEADER_GAP */
  headerGap?: number
  /** Custom border radius (px) - defaults to TABLE_CONFIG.DEFAULT_BORDER_RADIUS */
  borderRadius?: number
}

// ============================================================================
// SKELETON HEIGHT
// ============================================================================

/**
 * Calculate total skeleton height for perfect layout sync
 *
 * @param config - Skeleton dimension configuration
 * @param rowCount - Number of skeleton rows to display
 * @param toolbarLayout - Optional toolbar layout for accurate toolbar height calculation
 * @returns Total height in pixels
 */
export function calculateSkeletonHeight(
  config: SkeletonDimensionConfig,
  rowCount: number,
  toolbarLayout?: ToolbarLayoutConfig
): number {
  // Pass toolbarLayout for accurate margin/padding calculation
  const toolbarHeight = calculateToolbarHeight(config.toolbar, toolbarLayout)
  const headerHeight = config.headerHeight ?? TABLE_CONFIG.HEADER_HEIGHT
  const rowHeight = config.rowHeight ?? TABLE_CONFIG.ROW_HEIGHT
  const bodyHeight = rowCount * rowHeight

  // For integrated toolbar, the toolbar height is part of the sticky header area
  // so we don't add it to document flow height
  const isIntegrated = toolbarLayout?.position === 'integrated'
  const effectiveToolbarHeight = isIntegrated ? 0 : toolbarHeight

  // Note: Header gap is NOT included because it's handled by sticky positioning
  // (top: HEADER_GAP) rather than document flow
  return effectiveToolbarHeight + headerHeight + bodyHeight
}
