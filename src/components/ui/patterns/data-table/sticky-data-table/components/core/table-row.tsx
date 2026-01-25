'use client'

/**
 * StickyDataTable V2 - TableRow Component
 *
 * Memoized row component with optimized rendering.
 * Uses CSS Grid for perfect column alignment.
 *
 * ## ⚠️ STYLING RULES (see docs/STYLING-GUIDE.md)
 *
 * renderCell content MUST follow these patterns:
 * - Standard text: `text-sm font-normal text-primary`
 * - Descriptions: `text-xs font-normal text-secondary`
 * - Status codes: `text-xs font-mono text-tertiary`
 * - Status badges: Use Untitled UI Badge component
 *
 * Forbidden in renderCell:
 * - Bold fonts, decorative colors, arbitrary sizes
 *
 * @module components/table-row
 */

import { memo, useCallback, type ReactNode, type MouseEvent } from 'react'
import * as React from 'react'
import { Checkbox } from '@/components/ui/prod/base/checkbox'
import type { ComputedColumn, StickyState, BorderConfig, BackgroundConfig, ColumnChange, SelectionState } from '../../types'
import { generateGridTemplate, getRowBorder, getRowHoverClass } from '../../utils'
import { TableCell } from './table-cell'
import { ANIMATION_CONFIG, TABLE_CONFIG } from '../../config'

interface TableRowProps<T = Record<string, unknown>> {
  /** Row data */
  row: T
  /** Row index */
  index: number
  /** Row ID for selection */
  rowId: string | number
  /** Sticky columns */
  stickyColumns: ComputedColumn[]
  /** Scrollable columns */
  scrollableColumns: ComputedColumn[]
  /** All columns (for rendering) */
  allColumns: ComputedColumn[]
  /** Sticky state */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Row height override */
  rowHeight?: number
  /** Cell render function */
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void
  /** Column change for animation */
  columnChange: ColumnChange | null
  /** Leaving column keys */
  leavingColumnKeys: Set<string>
  /** Entering column keys */
  enteringColumnKeys: Set<string>
  /** Selection state */
  selectionState: SelectionState | null
  // ---- Drag State for inline column shifting ----
  /** Get shift direction for a column */
  getShiftDirection?: (columnKey: string, colIndex: number) => 'left' | 'right' | null
  /** Get inline offset for dragged column */
  getInlineOffset?: (columnKey: string) => number | null
  /** Get shift amount in pixels */
  getShiftAmount?: () => number
  /** Whether in inline drag mode */
  isInlineDragMode?: boolean
  /** Key of the column being dragged */
  draggedColumnKey?: string | null
}

/**
 * Memoized table row component
 *
 * Features:
 * - CSS Grid layout matching header
 * - Sticky cell positioning
 * - Row hover effects
 * - Checkbox selection
 * - Click handling with exclusions
 */
function TableRowBase<T extends Record<string, unknown>>({
  row,
  index,
  rowId,
  stickyColumns,
  scrollableColumns,
  allColumns,
  stickyState,
  borderConfig,
  backgroundConfig,
  rowHeight = TABLE_CONFIG.ROW_HEIGHT,
  renderCell,
  onRowClick,
  columnChange,
  leavingColumnKeys,
  enteringColumnKeys,
  selectionState,
  // Drag state for inline column shifting
  getShiftDirection,
  getInlineOffset,
  getShiftAmount,
  isInlineDragMode = false,
  draggedColumnKey,
}: TableRowProps<T>) {
  // Generate grid template (matches header)
  const gridTemplate = generateGridTemplate(stickyColumns, scrollableColumns)
  const rowBorderClass = getRowBorder(borderConfig)

  // Handle click with exclusions for interactive elements
  const handleClick = useCallback(
    (e: MouseEvent) => {
      // Don't trigger row click for interactive elements
      const target = e.target as HTMLElement
      if (
        target.closest('[data-checkbox-cell]') ||
        target.closest('[data-actions-cell]') ||
        target.closest('button') ||
        target.closest('[role="menuitem"]')
      ) {
        e.stopPropagation()
        return
      }
      e.preventDefault()
      onRowClick?.(row, index)
    },
    [row, index, onRowClick]
  )

  return (
    <a
      href="#"
      className={`grid w-fit min-w-full ${rowBorderClass} ${getRowHoverClass(backgroundConfig)} no-underline last:border-b-0`}
      style={{
        gridTemplateColumns: gridTemplate,
        height: `${rowHeight}px`,
        transition: columnChange
          ? `background-color 0.2s ease, grid-template-columns ${ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : 'background-color 0.2s ease',
      }}
      onClick={handleClick}
    >
      {allColumns.map((col, colIndex) => {
        const isCheckboxColumn = col.key === '__checkbox'
        const isRankColumn = col.key === 'rank'

        /**
         * Text size class for cell container
         *
         * STYLING RULES (see docs/STYLING-GUIDE.md):
         * - Default body text: text-sm (14px)
         * - Rank/compact columns: text-xs (12px)
         *
         * Content rendered via renderCell should use:
         * - Standard text: text-sm font-normal text-primary
         * - Descriptions: text-xs font-normal text-secondary
         * - Status codes: text-xs font-mono text-tertiary
         */
        const textSizeClass = isRankColumn ? 'text-xs' : 'text-sm'

        // Calculate drag-related props for this cell
        const shiftDirection = getShiftDirection?.(col.key, colIndex) ?? null
        const inlineOffset = getInlineOffset?.(col.key) ?? null
        const shiftAmount = getShiftAmount?.() ?? 0
        const isDraggedCell = col.key === draggedColumnKey

        // Render checkbox or cell content
        const cellContent = isCheckboxColumn && selectionState ? (
          <div data-checkbox-cell="true" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={selectionState.isRowSelected(rowId)}
              onCheckedChange={() => selectionState.toggleRowSelection(rowId)}
              aria-label="Select row"
              size="sm"
            />
          </div>
        ) : (
          renderCell(col.key, row, index)
        )

        return (
          <TableCell
            key={col.key}
            column={col}
            stickyState={stickyState}
            borderConfig={borderConfig}
            backgroundConfig={backgroundConfig}
            leavingColumnKeys={leavingColumnKeys}
            enteringColumnKeys={enteringColumnKeys}
            columnChange={columnChange}
            forceRightAlign={col.isLast}
            textSizeClass={textSizeClass}
            // Drag state for inline column shifting
            shiftDirection={shiftDirection}
            inlineOffset={inlineOffset}
            shiftAmount={shiftAmount}
            isInlineDragMode={isInlineDragMode}
            isDraggedCell={isDraggedCell}
          >
            {cellContent}
          </TableCell>
        )
      })}
    </a>
  )
}

// Memoize with custom comparison for performance
const MemoizedTableRow = memo(TableRowBase, (prev, next) => {
  // Quick reference checks
  if (prev.row !== next.row) return false
  if (prev.rowId !== next.rowId) return false
  if (prev.index !== next.index) return false
  if (prev.stickyState.useEnhancedStyling !== next.stickyState.useEnhancedStyling) return false
  if (prev.columnChange !== next.columnChange) return false
  if (prev.leavingColumnKeys !== next.leavingColumnKeys) return false
  if (prev.enteringColumnKeys !== next.enteringColumnKeys) return false

  // Check border config changes that affect row/cell styling
  if (prev.borderConfig.showRows !== next.borderConfig.showRows) return false
  if (prev.borderConfig.rowColor !== next.borderConfig.rowColor) return false
  if (prev.borderConfig.showCells !== next.borderConfig.showCells) return false
  if (prev.borderConfig.cellColor !== next.borderConfig.cellColor) return false

  // Check row height changes
  if (prev.rowHeight !== next.rowHeight) return false

  // Check column changes (length, reference, or properties like align/width)
  if (prev.allColumns !== next.allColumns) {
    // If different reference, check if content actually changed
    if (prev.allColumns.length !== next.allColumns.length) return false
    // Check key column properties that affect rendering
    for (let i = 0; i < prev.allColumns.length; i++) {
      const prevCol = prev.allColumns[i]
      const nextCol = next.allColumns[i]
      if (!prevCol || !nextCol) return false
      if (prevCol.key !== nextCol.key) return false
      if (prevCol.align !== nextCol.align) return false
      if (prevCol.width !== nextCol.width) return false
      if (prevCol.isSticky !== nextCol.isSticky) return false
    }
  }

  // Check selection state
  if (prev.selectionState !== next.selectionState) {
    if (prev.selectionState?.isRowSelected(prev.rowId) !== next.selectionState?.isRowSelected(next.rowId)) {
      return false
    }
  }

  // Check drag state changes that affect cell styling
  if (prev.isInlineDragMode !== next.isInlineDragMode) return false
  if (prev.draggedColumnKey !== next.draggedColumnKey) return false
  // Functions change reference when drag state changes (pointerX in deps)
  // Must check both to ensure cells re-render during drag
  if (prev.getShiftDirection !== next.getShiftDirection) return false
  if (prev.getInlineOffset !== next.getInlineOffset) return false

  return true
})

// Type assertion to preserve generic type information
export const TableRow = MemoizedTableRow as <T extends Record<string, unknown>>(
  props: TableRowProps<T>
) => React.ReactElement
;(TableRow as any).displayName = 'TableRow'


