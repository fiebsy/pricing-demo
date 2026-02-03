/**
 * StickyDataTable V2 - Utility Exports
 *
 * Central export point for all utility functions.
 *
 * @module utils
 */

export {
  generateGridTemplate,
  calculateTotalStickyWidth,
  computeColumnOffsets,
  separateColumns,
} from './grid'

export {
  getAlignmentClasses,
  getCellPadding,
  getHeaderStickyBackground,
  getRowStickyBackground,
  getRowHoverClass,
  getHeaderOuterBorders,
  getHeaderOuterBorderStyles,
  getBodyOuterBorders,
  getBodyOuterBorderStyles,
  getRowBorder,
  getRowBorderStyle,
  getCellBorder,
  getCellBorderStyle,
  getStickyColumnBorder,
  getStickyColumnBorderStyle,
  borderTokenToCssVar,
  getStickyLeft,
  getColumnAnimationClass,
  getColumnAnimationState,
  getColumnAnimationDataAttrs,
  getCellStyle,
  type ColumnAnimationState,
} from './styles'

// Column processor - unified processing for table and skeleton
export {
  processColumns,
  createVisibleColumnKeys,
  hasStickyColumns,
  countStickyColumns,
  getRightmostStickyColumn,
  type ColumnProcessorOptions,
  type ProcessedColumnsResult,
} from './column-processor'

// Skeleton debug utilities
export {
  skeletonDebug,
  isSkeletonDebugEnabled,
  debugValue,
} from './skeleton-debug'


