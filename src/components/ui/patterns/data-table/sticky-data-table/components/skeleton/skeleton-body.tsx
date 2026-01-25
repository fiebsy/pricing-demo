'use client'

/**
 * Skeleton Body
 *
 * Sticky-aware body skeleton with rows and overflow detection.
 *
 * @module skeleton/skeleton-body
 */

import { useRef, useEffect } from 'react'
import { TABLE_CONFIG } from '../../config'
import type { SkeletonCellConfig } from '../../types'
import { getBodyOuterBorders, getBodyOuterBorderStyles, type ProcessedColumnsResult } from '../../utils'
import { SkeletonBodyCell } from './skeleton-cells'

// ============================================================================
// SKELETON ROW
// ============================================================================

export interface SkeletonRowStickyProps {
  processed: ProcessedColumnsResult
  index: number
  isLast: boolean
  rowHeight?: number
  bodyCellConfig?: SkeletonCellConfig
}

/**
 * Skeleton Row - Sticky Aware
 *
 * Matches StickyDataTable row structure with:
 * - CSS Grid layout
 * - Proper sticky cell styling
 * - Row borders
 */
export const SkeletonRowSticky = ({
  processed,
  index,
  isLast,
  rowHeight = TABLE_CONFIG.ROW_HEIGHT,
  bodyCellConfig,
}: SkeletonRowStickyProps) => {
  const { allColumns, gridTemplate, stickyState, borderConfig, backgroundConfig } = processed

  // Row border (between rows)
  const rowBorderClass = !isLast && borderConfig.showRows ? `border-b ${borderConfig.rowColor}` : ''

  return (
    <div
      // NOTE: No background class here - cell backgrounds handle sticky styling
      // This matches TableRow which also has no row-level background
      className={`grid w-fit min-w-full ${rowBorderClass}`}
      style={{
        gridTemplateColumns: gridTemplate,
        height: `${rowHeight}px`,
      }}
    >
      {allColumns.map((col) => (
        <SkeletonBodyCell
          key={col.key}
          column={col}
          stickyState={stickyState}
          borderConfig={borderConfig}
          backgroundConfig={backgroundConfig}
          cellConfig={bodyCellConfig}
        />
      ))}
    </div>
  )
}

// ============================================================================
// SKELETON BODY
// ============================================================================

export interface SkeletonBodyStickyProps {
  processed: ProcessedColumnsResult
  rowCount: number
  rowHeight?: number
  borderRadius?: number
  onOverflowDetected?: (hasOverflow: boolean) => void
  bodyCellConfig?: SkeletonCellConfig
}

/**
 * Skeleton Body - Sticky Aware
 *
 * Container for skeleton rows with proper borders
 * Measures overflow to determine sticky state dynamically
 */
export const SkeletonBodySticky = ({
  processed,
  rowCount,
  rowHeight = TABLE_CONFIG.ROW_HEIGHT,
  borderRadius = TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  onOverflowDetected,
  bodyCellConfig,
}: SkeletonBodyStickyProps) => {
  const { borderConfig, backgroundConfig } = processed
  const bodyRef = useRef<HTMLDivElement>(null)

  const outerBorderClasses = getBodyOuterBorders(borderConfig)
  const outerBorderStyles = getBodyOuterBorderStyles(borderConfig)

  // Measure overflow after render
  useEffect(() => {
    if (!bodyRef.current || !onOverflowDetected) return

    const checkOverflow = () => {
      const element = bodyRef.current
      if (!element) return

      const hasOverflow = element.scrollWidth > element.clientWidth
      onOverflowDetected(hasOverflow)
    }

    // Check immediately and after a short delay to account for layout
    checkOverflow()
    const timeoutId = setTimeout(checkOverflow, 100)

    // Also check on resize
    const resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(bodyRef.current)

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [onOverflowDetected, processed.gridTemplate])

  return (
    <div
      ref={bodyRef}
      className={`overflow-x-auto overflow-y-hidden ${outerBorderClasses} ${backgroundConfig.bodyContainer}`}
      style={{
        scrollbarWidth: 'none',
        borderBottomLeftRadius: `${borderRadius}px`,
        borderBottomRightRadius: `${borderRadius}px`,
        ...outerBorderStyles, // Side-specific border colors
      }}
    >
      {Array.from({ length: rowCount }).map((_, i) => (
        <SkeletonRowSticky
          key={i}
          processed={processed}
          index={i}
          isLast={i === rowCount - 1}
          rowHeight={rowHeight}
          bodyCellConfig={bodyCellConfig}
        />
      ))}
    </div>
  )
}
