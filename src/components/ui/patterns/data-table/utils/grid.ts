/**
 * StickyDataTable V2 - Grid Utilities
 *
 * CSS Grid template generation and column calculations.
 * CRITICAL: Same template must be used for header and body alignment.
 *
 * @module utils/grid
 */

import type { ColumnConfig, ComputedColumn } from '../types'

/**
 * Generate CSS Grid template columns string
 *
 * Creates a grid template that ensures perfect alignment between
 * header and body rows. Uses pixel widths for sticky columns
 * and flexible fr units for scrollable columns.
 *
 * @param stickyColumns - Array of sticky column configs
 * @param scrollableColumns - Array of scrollable column configs
 * @returns CSS grid-template-columns value
 */
export function generateGridTemplate(
  stickyColumns: ColumnConfig[],
  scrollableColumns: ColumnConfig[]
): string {
  // Sticky columns: Fixed pixel widths (or minmax if maxWidth specified)
  const stickyWidths = stickyColumns
    .map((col) => {
      const min = col.minWidth ?? col.width
      if (col.maxWidth) {
        return `minmax(${min}px, ${col.maxWidth}px)`
      }
      return `${min}px`
    })
    .join(' ')

  // Scrollable columns: Flexible with min/max constraints
  const scrollableWidths = scrollableColumns
    .map((col) => {
      const min = col.minWidth ?? col.width
      const ratio = col.flexRatio ?? 1

      if (col.maxWidth) {
        return `minmax(${min}px, ${col.maxWidth}px)`
      }
      return `minmax(${min}px, ${ratio}fr)`
    })
    .join(' ')

  return `${stickyWidths} ${scrollableWidths}`.trim()
}

/**
 * Calculate total width of sticky columns
 * Used for positioning navigation arrows and overlays
 *
 * @param stickyColumns - Array of sticky column configs
 * @returns Total width in pixels
 */
export function calculateTotalStickyWidth(stickyColumns: ColumnConfig[]): number {
  return stickyColumns.reduce((total, col) => {
    const width = col.minWidth ?? col.width
    return total + width
  }, 0)
}

/**
 * Compute sticky left offsets for columns
 *
 * Calculates the cumulative left offset for each sticky column.
 * Non-sticky columns get offset of 0.
 *
 * @param columns - Array of column configs
 * @returns Array of computed columns with offsets
 */
export function computeColumnOffsets(columns: ColumnConfig[]): ComputedColumn[] {
  let stickyOffset = 0
  let stickyIndex = 0
  const stickyColumns = columns.filter((c) => c.isSticky)
  const totalColumns = columns.length

  return columns.map((col, index) => {
    const isSticky = col.isSticky ?? false
    const computedStickyLeft = isSticky ? stickyOffset : 0

    // Calculate offset for next sticky column
    if (isSticky) {
      stickyOffset += col.minWidth ?? col.width
      stickyIndex++
    }

    // Determine position flags
    const isFirst = index === 0
    const isLast = index === totalColumns - 1
    const isFirstSticky = isSticky && stickyIndex === 1
    const isLastSticky = isSticky && stickyIndex === stickyColumns.length

    return {
      ...col,
      computedStickyLeft,
      index,
      isFirst,
      isLast,
      isFirstSticky,
      isLastSticky,
    }
  })
}

/**
 * Separate columns into sticky and scrollable groups
 *
 * @param computedColumns - Array of computed columns
 * @returns Object with stickyColumns and scrollableColumns
 */
export function separateColumns(computedColumns: ComputedColumn[]): {
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
} {
  const stickyColumns: ComputedColumn[] = []
  const scrollableColumns: ComputedColumn[] = []

  for (const col of computedColumns) {
    if (col.isSticky) {
      stickyColumns.push(col)
    } else {
      scrollableColumns.push(col)
    }
  }

  return { stickyColumns, scrollableColumns }
}


