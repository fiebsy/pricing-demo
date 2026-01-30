'use client'

/**
 * Skeleton Cells
 *
 * Sticky-aware skeleton cells for header and body rows.
 *
 * @module skeleton/skeleton-cells
 */

import { Skeleton } from './skeleton'
import type { ComputedColumn, StickyState, BorderConfig, BackgroundConfig, SkeletonCellConfig } from '../../types'
import {
  getAlignmentClasses,
  getCellPadding,
  getCellBorder,
  getStickyColumnBorder,
  getCellStyle,
  getHeaderStickyBackground,
  getRowStickyBackground,
} from '../../utils'
import { calculateSkeletonWidth, DEFAULT_HEADER_CELL_CONFIG, DEFAULT_BODY_CELL_CONFIG } from './utils'

// ============================================================================
// SKELETON HEADER CELL
// ============================================================================

export interface SkeletonHeaderCellProps {
  column: ComputedColumn
  stickyState: StickyState
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
  cellConfig?: SkeletonCellConfig
}

/**
 * Skeleton Header Cell - Sticky Aware
 *
 * Renders a single header cell skeleton with proper sticky positioning,
 * backgrounds, and borders matching the real table.
 */
export const SkeletonHeaderCell = ({
  column,
  stickyState,
  borderConfig,
  backgroundConfig,
  cellConfig = DEFAULT_HEADER_CELL_CONFIG,
}: SkeletonHeaderCellProps) => {
  // Use same style utilities as real table
  const style = getCellStyle(column, stickyState)
  const backgroundClass = getHeaderStickyBackground(backgroundConfig, stickyState, column.isSticky ?? false)
  const stickyBorder = getStickyColumnBorder(column, stickyState, borderConfig)

  // Suppress right border for first sticky when enhanced styling active
  const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling
  const cellBorder = stickyBorder || shouldSuppressRightBorder
    ? ''
    : getCellBorder(borderConfig, column.isLast, column.key)

  const paddingClass = getCellPadding(column.isFirst, column.isLast)
  const alignment = getAlignmentClasses(column.align)

  // Calculate skeleton dimensions based on config
  const isCheckbox = column.key === '__checkbox'
  const skeletonWidth = isCheckbox ? 20 : calculateSkeletonWidth(column, cellConfig)
  const skeletonHeight = isCheckbox ? 20 : cellConfig.height
  const skeletonBorderRadius = cellConfig.borderRadius

  return (
    <div
      className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder}`}
      style={style}
    >
      <div
        className={`${paddingClass} flex h-full items-center ${alignment.flexJustify}`}
      >
        <Skeleton
          style={{
            width: skeletonWidth,
            height: skeletonHeight,
            borderRadius: skeletonBorderRadius,
          }}
        />
      </div>
    </div>
  )
}

// ============================================================================
// SKELETON BODY CELL
// ============================================================================

export interface SkeletonBodyCellProps {
  column: ComputedColumn
  stickyState: StickyState
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
  cellConfig?: SkeletonCellConfig
}

/**
 * Skeleton Body Cell - Sticky Aware
 *
 * Renders a single body cell skeleton with proper sticky positioning,
 * backgrounds, and borders matching the real table.
 */
export const SkeletonBodyCell = ({
  column,
  stickyState,
  borderConfig,
  backgroundConfig,
  cellConfig = DEFAULT_BODY_CELL_CONFIG,
}: SkeletonBodyCellProps) => {
  // Use same style utilities as real table
  const style = getCellStyle(column, stickyState)
  const backgroundClass = getRowStickyBackground(backgroundConfig, stickyState, column.isSticky ?? false)
  const stickyBorder = getStickyColumnBorder(column, stickyState, borderConfig)

  // Suppress right border for first sticky when enhanced styling active
  const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling
  const cellBorder = stickyBorder || shouldSuppressRightBorder
    ? ''
    : getCellBorder(borderConfig, column.isLast, column.key)

  const paddingClass = getCellPadding(column.isFirst, column.isLast)
  const alignment = getAlignmentClasses(column.align)

  // Calculate skeleton dimensions based on config
  const isCheckbox = column.key === '__checkbox'
  const skeletonWidth = isCheckbox ? 16 : calculateSkeletonWidth(column, cellConfig)
  const skeletonHeight = isCheckbox ? 16 : cellConfig.height
  const skeletonBorderRadius = cellConfig.borderRadius

  return (
    <div
      className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder}`}
      style={style}
    >
      <div
        className={`${paddingClass} flex h-full items-center ${alignment.flexJustify}`}
      >
        <Skeleton
          style={{
            width: skeletonWidth,
            height: skeletonHeight,
            borderRadius: skeletonBorderRadius,
          }}
        />
      </div>
    </div>
  )
}
