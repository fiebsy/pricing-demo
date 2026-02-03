'use client'

/**
 * StickyDataTable V2 - HeaderCell Component
 *
 * Individual header cell with sort controls, drag handle, and styling.
 *
 * @module components/table-header/header-cell
 */

import { memo } from 'react'
import { Checkbox } from '@/components/ui/core/inputs/checkbox'
import {
  getAlignmentClasses,
  getCellBorder,
  getCellBorderStyle,
  getStickyColumnBorder,
  getStickyColumnBorderStyle,
  getColumnAnimationClass,
  getColumnAnimationDataAttrs,
  getCellStyle,
  getHeaderStickyBackground,
  getCellPadding,
} from '../../utils'
import { DragHandleIcon, SortIndicator } from './icons'
import type { HeaderCellProps } from './types'

/**
 * Header cell component with optional drag-and-drop support
 */
export const HeaderCell = memo(function HeaderCell({
  column,
  label,
  stickyState,
  borderConfig,
  backgroundConfig,
  sortColumn,
  sortDirection,
  onSort,
  leavingColumnKeys,
  enteringColumnKeys,
  columnChange,
  selectionState,
  // Pointer drag props
  isDraggable = false,
  isDragging = false,
  shiftDirection = null,
  inlineOffset = null,
  shiftAmount = 4,
  isInlineMode = false,
  onPointerDown,
}: HeaderCellProps) {
  // Check if this is the actively dragged cell (has inline offset)
  const isDraggedCell = inlineOffset !== null
  const isSortable = column.sortable ?? false
  const isCurrentlySorted = sortColumn === column.key

  // Compute alignment (force right for last column)
  const effectiveAlign = column.isLast ? 'right' : column.align
  const alignment = getAlignmentClasses(effectiveAlign)

  // Compute borders (classes for width/style, inline styles for color)
  const stickyBorder = getStickyColumnBorder(column, stickyState, borderConfig)
  const stickyBorderColorStyle = getStickyColumnBorderStyle(column, stickyState, borderConfig)
  const shouldSuppressRightBorder = column.isSticky && column.isFirstSticky && stickyState.useEnhancedStyling
  const cellBorder = stickyBorder || shouldSuppressRightBorder
    ? ''
    : getCellBorder(borderConfig, column.isLast, column.key)
  const cellBorderColorStyle = stickyBorder || shouldSuppressRightBorder
    ? {}
    : getCellBorderStyle(borderConfig, column.isLast, column.key)

  // Compute animation class and data attributes
  const animationClass = getColumnAnimationClass(column.key, leavingColumnKeys, columnChange, enteringColumnKeys)
  const animationDataAttrs = getColumnAnimationDataAttrs(column.key, leavingColumnKeys, enteringColumnKeys)

  // Compute background (solid when dragging, hover state for draggable columns)
  const baseBackgroundClass = getHeaderStickyBackground(backgroundConfig, stickyState, column.isSticky ?? false)
  const hoverClass = isDraggable && !isDragging ? 'hover:bg-tertiary' : ''
  // Dragged cell: transparent so DragColumnOverlay background shows through
  // Non-dragged cells during drag: solid background
  const backgroundClass = isDraggedCell
    ? 'bg-transparent'
    : isDragging
      ? 'bg-quaternary'
      : `${baseBackgroundClass} ${hoverClass}`

  // Compute padding
  const paddingClass = getCellPadding(column.isFirst, column.isLast)

  // Compute style (no transform on cell - only content shifts in floating mode)
  const baseStyle = getCellStyle(column, stickyState)

  // Calculate cell-level transform for inline mode
  // In inline mode: dragged cell follows cursor, neighbor cells slide to make room
  // In floating mode: no cell transforms, only content shifts for drop indicator
  const getCellTransform = (): string | undefined => {
    if (isDraggedCell) {
      // Dragged cell follows cursor
      return `translateX(${inlineOffset}px)`
    }
    if (isInlineMode && shiftDirection) {
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

  // Merge border color inline styles (sticky or cell, whichever is active)
  const borderColorStyle = { ...stickyBorderColorStyle, ...cellBorderColorStyle }

  const cellStyle: React.CSSProperties = isDraggedCell
    ? {
        ...baseStyle,
        transform: cellTransform,
        zIndex: 50,
        // Note: boxShadow moved to DragColumnOverlay for unified column styling
        border: 'none',
        transition: 'none', // No transition - follows cursor directly
      }
    : isInlineMode && shiftDirection
      ? {
          ...baseStyle,
          ...shiftingCellBorderFix,
          ...borderColorStyle,
          transform: cellTransform,
          transition: 'transform 150ms ease-out',
        }
      : { ...baseStyle, ...borderColorStyle }

  // Content shift transform - ONLY used in floating mode
  // In floating mode: shifts content to make room for drop indicator (small gap)
  // In inline mode: no content transform needed, cell itself moves
  const contentTransform = !isInlineMode && shiftDirection
    ? shiftDirection === 'right'
      ? `translateX(${shiftAmount}px)`
      : `translateX(-${shiftAmount}px)`
    : 'translateX(0)'

  // Checkbox column handling
  const isCheckboxColumn = column.key === '__checkbox'

  // Tabular numbers (disabled by default, enable for numeric columns)
  const useTabularNums = column.useTabularNums ?? false

  // Determine drag handle position (opposite to label alignment)
  const dragHandlePosition = effectiveAlign === 'right' ? 'left' : 'right'

  // Compute opacity class for label and sort icon only
  const contentOpacityClass = isDragging
    ? 'opacity-50'
    : isSortable
      ? isCurrentlySorted
        ? 'group-hover:opacity-80 group-active:opacity-60' // Active sort: full opacity, subtle hover
        : 'opacity-60 group-hover:opacity-100 group-active:opacity-80' // Sortable but inactive
      : 'opacity-60' // Non-sortable

  return (
    <div
      className={`${backgroundClass} box-border ${cellBorder} ${stickyBorder} ${animationClass} group relative`}
      style={cellStyle}
      data-column-key={column.key}
      onClick={isSortable && !isCheckboxColumn ? () => onSort(column.key) : undefined}
      {...animationDataAttrs}
    >
      {/* Drag handle - 40px touch target, icon centered inside */}
      {isDraggable && (
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 z-10
            ${dragHandlePosition === 'left' ? '-left-2' : '-right-2'}
            w-10 h-10 flex items-center justify-center
            cursor-grab active:cursor-grabbing
            opacity-0 transition-opacity duration-150
            group-hover:opacity-70
            text-primary
            touch-none
          `}
          onPointerDown={onPointerDown}
          aria-hidden="true"
        >
          <DragHandleIcon />
        </div>
      )}

      <div
        className={`
          ${paddingClass}
          flex h-full items-center
          ${alignment.flexJustify}
          text-tertiary text-xs font-medium
          ${alignment.textAlign}
          ${isSortable ? 'cursor-pointer' : 'cursor-default'}
          whitespace-nowrap
          ${useTabularNums ? 'tabular-nums' : ''}
        `}
        style={{
          transform: contentTransform,
          transition: 'transform 150ms ease-out',
        }}
      >
        {isCheckboxColumn && selectionState ? (
          <Checkbox
            checked={selectionState.isAllSelected}
            indeterminate={selectionState.isSomeSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                selectionState.selectAllRows()
              } else {
                selectionState.deselectAllRows()
              }
            }}
            aria-label="Select all"
            size="sm"
          />
        ) : (
          <>
            {/* Sort icon on left for right-aligned columns */}
            {isSortable && column.align === 'right' && (
              <span className={`mr-1 transition-opacity ${contentOpacityClass}`}>
                <SortIndicator isActive={isCurrentlySorted} direction={sortDirection} />
              </span>
            )}

            <span className={`min-w-0 transition-opacity ${contentOpacityClass}`}>{label}</span>

            {/* Sort icon on right for left/center-aligned columns */}
            {isSortable && column.align !== 'right' && (
              <span className={`ml-1 transition-opacity ${contentOpacityClass}`}>
                <SortIndicator isActive={isCurrentlySorted} direction={sortDirection} />
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
})
