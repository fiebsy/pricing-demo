'use client'

/**
 * StickyDataTable V2 - TableCell Component
 *
 * Memoized cell component with optimized styling.
 * Handles sticky positioning, borders, and backgrounds.
 *
 * ## ⚠️ STYLING RULES (see docs/STYLING-GUIDE.md)
 *
 * ### Typography Defaults Applied Here:
 * - Header cells: `text-xs font-medium text-tertiary`
 * - Body cells: `text-sm font-normal text-primary`
 *
 * ### Content Styling (applied in renderCell, NOT here):
 * - Standard text: `text-sm font-normal text-primary`
 * - Descriptions: `text-xs font-normal text-secondary`
 * - Status codes/IDs: `text-xs font-mono text-tertiary`
 *
 * ### Forbidden in renderCell:
 * - Bold text (`font-bold`, `font-semibold`)
 * - Decorative colors (`text-blue-500`, etc.)
 * - Arbitrary font sizes (`text-[13px]`, `text-lg`)
 *
 * @module components/table-cell
 */

import { memo, type ReactNode } from 'react'
import type { ComputedColumn, StickyState, BorderConfig, BackgroundConfig, ColumnChange } from '../../types'
import {
  getCellPadding,
  getAlignmentClasses,
  getCellBorder,
  getStickyColumnBorder,
  getColumnAnimationClass,
  getColumnAnimationDataAttrs,
  getCellStyle,
  getRowStickyBackground,
} from '../../utils'

/**
 * TableCell Props
 *
 * @see docs/STYLING-GUIDE.md for complete typography rules
 */
interface TableCellProps {
  /** Column configuration */
  column: ComputedColumn

  /**
   * Cell content - rendered by user's renderCell function
   *
   * ⚠️ Content MUST follow styling guidelines:
   * - Body text: `text-sm font-normal text-primary`
   * - Descriptions: `text-xs font-normal text-secondary`
   * - Status codes: `text-xs font-mono text-tertiary`
   * - Status badges: Use Untitled UI Badge component
   */
  children: ReactNode

  /** Sticky state for styling */
  stickyState: StickyState

  /** Border configuration */
  borderConfig: BorderConfig

  /** Background configuration */
  backgroundConfig: BackgroundConfig

  /** Set of leaving column keys */
  leavingColumnKeys: Set<string>

  /** Set of entering column keys */
  enteringColumnKeys: Set<string>

  /** Current column change */
  columnChange: ColumnChange | null

  /** Force right alignment (for last column) */
  forceRightAlign?: boolean

  /**
   * Text size class for the cell container
   * @default 'text-sm' for body cells
   *
   * This sets the base font size. Content styles are applied
   * in the renderCell function by the implementer.
   *
   * Standard values:
   * - 'text-sm' (14px) - Default body cell text
   * - 'text-xs' (12px) - Rank columns, compact displays
   *
   * ⚠️ Do not use arbitrary sizes like 'text-[13px]'
   */
  textSizeClass?: string

  /**
   * Is this a header cell
   * When true, applies header-specific styling:
   * - `text-tertiary` color
   * - `font-medium` weight
   */
  isHeader?: boolean

  /** Header background getter */
  getHeaderBackground?: () => string
  // ---- Drag State for inline column shifting ----
  /** Direction this cell should shift to make room ('left' | 'right' | null) */
  shiftDirection?: 'left' | 'right' | null
  /** Inline mode offset in pixels (only set for the dragged cell in inline mode) */
  inlineOffset?: number | null
  /** Shift amount in pixels (full column width for inline mode) */
  shiftAmount?: number
  /** Whether in inline drag mode */
  isInlineDragMode?: boolean
  /** Whether this is the cell being dragged */
  isDraggedCell?: boolean
}

/**
 * Memoized table cell component
 *
 * Renders a single cell with:
 * - Sticky positioning if applicable
 * - Proper borders and backgrounds
 * - Animation classes for column transitions
 * - Responsive text wrapping
 *
 * ## Typography (automatic, based on isHeader):
 * - **Header cells**: `text-xs font-medium text-tertiary`
 * - **Body cells**: `text-sm font-normal text-primary`
 *
 * ## Content Styling (user responsibility in renderCell):
 * See docs/STYLING-GUIDE.md for required patterns
 */
const TableCellBase = ({
  column,
  children,
  stickyState,
  borderConfig,
  backgroundConfig,
  leavingColumnKeys,
  enteringColumnKeys,
  columnChange,
  forceRightAlign = false,
  textSizeClass = 'text-sm',
  isHeader = false,
  getHeaderBackground,
  // Drag state for inline column shifting
  shiftDirection = null,
  inlineOffset = null,
  shiftAmount = 0,
  isInlineDragMode = false,
  isDraggedCell = false,
}: TableCellProps) => {
  // Compute alignment
  const effectiveAlign = forceRightAlign ? 'right' : column.align
  const alignment = getAlignmentClasses(effectiveAlign)

  // Compute borders
  const stickyBorder = getStickyColumnBorder(column, stickyState, borderConfig)
  const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling
  const cellBorder = stickyBorder || shouldSuppressRightBorder
    ? ''
    : getCellBorder(borderConfig, column.isLast, column.key)

  // Compute animation class (legacy support) and data attributes (new)
  const animationClass = getColumnAnimationClass(column.key, leavingColumnKeys, columnChange, enteringColumnKeys)
  const animationDataAttrs = getColumnAnimationDataAttrs(column.key, leavingColumnKeys, enteringColumnKeys)

  // Compute padding
  const paddingClass = getCellPadding(column.isFirst, column.isLast)

  // Compute background
  // Dragged cells: transparent so DragColumnOverlay background shows through
  const baseBackgroundClass = isHeader && getHeaderBackground
    ? getHeaderBackground()
    : getRowStickyBackground(backgroundConfig, stickyState, column.isSticky ?? false)
  const backgroundClass = isDraggedCell && inlineOffset !== null
    ? 'bg-transparent'
    : baseBackgroundClass

  // Compute base style
  const baseStyle = getCellStyle(column, stickyState)

  // Calculate cell-level transform for inline drag mode
  // In inline mode: dragged cell follows cursor, neighbor cells slide to make room
  const getCellTransform = (): string | undefined => {
    if (isDraggedCell && inlineOffset !== null) {
      // Dragged cell follows cursor
      return `translateX(${inlineOffset}px)`
    }
    if (isInlineDragMode && shiftDirection) {
      // Neighbor cells slide to make room (inline mode only)
      return shiftDirection === 'right'
        ? `translateX(${shiftAmount}px)`
        : `translateX(-${shiftAmount}px)`
    }
    return undefined
  }

  const cellTransform = getCellTransform()

  // Build cell style based on drag state
  // For shifting cells: add right border if cell is "last" (normally has no right border)
  // This prevents a gap at the table edge during drag preview
  const shiftingCellBorderFix: React.CSSProperties = column.isLast && shiftDirection
    ? { borderRight: '1px solid var(--border-color-secondary)' }
    : {}

  const style: React.CSSProperties = isDraggedCell && inlineOffset !== null
    ? {
        // Inline mode: dragged cell follows cursor with elevated appearance
        ...baseStyle,
        transform: cellTransform,
        zIndex: 50,
        border: 'none', // Remove borders for cleaner dragged column look
        transition: 'none', // No transition for dragged cell - follows cursor directly
      }
    : isInlineDragMode && shiftDirection
      ? {
          // Inline mode: shifting cells slide to make room
          ...baseStyle,
          ...shiftingCellBorderFix,
          transform: cellTransform,
          transition: 'transform 150ms ease-out',
        }
      : baseStyle

  // Text wrapping and line clamping
  const allowTextWrap = column.allowTextWrap ?? false
  const maxLines = column.maxLines

  // Determine text overflow behavior:
  // 1. maxLines set: wrap text, clamp at N lines with ellipsis
  // 2. allowTextWrap: wrap text, no limit
  // 3. default: single line, truncate with ellipsis
  const hasLineClamping = maxLines !== undefined && maxLines > 0
  const shouldWrap = hasLineClamping || allowTextWrap

  // Tabular numbers (enabled by default for better number alignment)
  // Set useTabularNums: false to disable for text-only columns
  const useTabularNums = column.useTabularNums ?? true

  return (
    <div
      className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder} ${animationClass}`}
      style={style}
      {...animationDataAttrs}
    >
      {/*
       * Cell content wrapper with typography styles
       *
       * TYPOGRAPHY RULES (see docs/STYLING-GUIDE.md):
       * - Headers: text-xs font-medium text-tertiary (automatic)
       * - Body: text-sm font-normal text-primary (automatic)
       *
       * Content rendered via renderCell should use:
       * - Standard text: text-sm font-normal text-primary
       * - Descriptions: text-xs font-normal text-secondary
       * - Status codes: text-xs font-mono text-tertiary
       *
       * ⚠️ FORBIDDEN in renderCell:
       * - font-bold, font-semibold (use font-normal)
       * - text-blue-500, etc. (use semantic tokens)
       * - text-[13px], text-lg (use text-sm or text-xs)
       */}
      <div
        className={`
          ${paddingClass}
          flex h-full items-center
          ${shouldWrap ? 'min-w-0' : ''}
          ${alignment.flexJustify}
          ${textSizeClass}
          ${isHeader ? 'text-tertiary font-medium' : 'text-primary font-normal'}
          ${alignment.textAlign}
          ${shouldWrap ? 'whitespace-normal' : 'whitespace-nowrap'}
          ${useTabularNums ? 'tabular-nums' : ''}
          ${isDraggedCell && inlineOffset !== null ? 'opacity-50' : ''}
        `}
      >
        {hasLineClamping ? (
          // Line-clamped content: wrap up to maxLines, then truncate with ellipsis
          <div
            className="w-full min-w-0 overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
              lineClamp: maxLines,
            }}
          >
            {children}
          </div>
        ) : shouldWrap ? (
          // Unlimited wrapping
          <div className="w-full min-w-0">{children}</div>
        ) : (
          // Single line, truncate (default)
          children
        )}
      </div>
    </div>
  )
}

// Memoize with custom comparison
export const TableCell = memo(TableCellBase, (prev, next) => {
  // Quick checks for common cases
  if (prev.children !== next.children) return false
  if (prev.column.key !== next.column.key) return false
  if (prev.stickyState.useEnhancedStyling !== next.stickyState.useEnhancedStyling) return false
  if (prev.leavingColumnKeys !== next.leavingColumnKeys) return false
  if (prev.enteringColumnKeys !== next.enteringColumnKeys) return false
  if (prev.columnChange !== next.columnChange) return false

  // Check border config changes that affect cell styling
  if (prev.borderConfig.showCells !== next.borderConfig.showCells) return false
  if (prev.borderConfig.cellColor !== next.borderConfig.cellColor) return false
  if (prev.borderConfig.showRows !== next.borderConfig.showRows) return false
  if (prev.borderConfig.rowColor !== next.borderConfig.rowColor) return false

  // Check drag state changes that affect cell styling
  if (prev.isDraggedCell !== next.isDraggedCell) return false
  if (prev.isInlineDragMode !== next.isInlineDragMode) return false
  if (prev.shiftDirection !== next.shiftDirection) return false
  if (prev.inlineOffset !== next.inlineOffset) return false

  return true
})

TableCell.displayName = 'TableCell'

