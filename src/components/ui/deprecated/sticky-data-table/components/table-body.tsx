'use client'

/**
 * StickyDataTable V2 - TableBody Component
 *
 * Renders the scrollable table body with rows.
 * Optimized for large datasets with memoization.
 *
 * @module components/table-body
 */

import { memo, useEffect, useRef, type RefObject, type ReactNode } from 'react'
import * as React from 'react'
import type {
  ComputedColumn,
  StickyState,
  BorderConfig,
  BackgroundConfig,
  ColumnChange,
  SelectionState,
} from '../types'
import { getBodyOuterBorders, getBodyOuterBorderStyles } from '../utils'
import { TableRow } from './table-row'
import { useAutoColumnFlip } from '../hooks'
import { TABLE_CONFIG } from '../config'

interface TableBodyProps<T = Record<string, unknown>> {
  /** Forwarded scroll container ref */
  bodyScrollRef: RefObject<HTMLDivElement | null>
  /** Data array to render */
  data: T[]
  /** Sticky columns */
  stickyColumns: ComputedColumn[]
  /** Scrollable columns */
  scrollableColumns: ComputedColumn[]
  /** All visible columns */
  allColumns: ComputedColumn[]
  /** Sticky state for styling */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Border radius */
  borderRadius: number
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
  /** Leaving columns with position data (for absolute overlay) */
  leavingColumns: ComputedColumn[]
  /** Entering column keys */
  enteringColumnKeys: Set<string>
  /** Selection state */
  selectionState: SelectionState | null
  /** Row ID getter */
  getRowId?: (row: T, index: number) => string | number
  /** Loading indicator content */
  loadingIndicator?: ReactNode
  /** Callback when end reached */
  onEndReached?: () => void
  /** Threshold for end reached */
  onEndReachedThreshold?: number
  /** Ref to track the last dropped column key for FLIP animation exclusion (shared with header) */
  lastDroppedKeyRef?: React.RefObject<string | null>
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
 * Table body component
 *
 * Features:
 * - Scrollable container with sync
 * - Memoized row rendering
 * - Sticky cell positioning
 * - Selection checkbox support
 */
function TableBodyBase<T extends Record<string, unknown>>({
  bodyScrollRef,
  data,
  stickyColumns,
  scrollableColumns,
  allColumns,
  stickyState,
  borderConfig,
  backgroundConfig,
  borderRadius,
  rowHeight = TABLE_CONFIG.ROW_HEIGHT,
  renderCell,
  onRowClick,
  columnChange,
  leavingColumnKeys,
  leavingColumns,
  enteringColumnKeys,
  selectionState,
  getRowId,
  loadingIndicator,
  onEndReached,
  onEndReachedThreshold = 200,
  lastDroppedKeyRef,
  // Drag state for inline column shifting
  getShiftDirection,
  getInlineOffset,
  getShiftAmount,
  isInlineDragMode = false,
  draggedColumnKey,
}: TableBodyProps<T>) {
  const outerBorderClasses = getBodyOuterBorders(borderConfig)
  const outerBorderStyles = getBodyOuterBorderStyles(borderConfig)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Auto-FLIP: Smooth column shift animations for body cells
  const columnKeys = allColumns.map((col) => col.key)
  useAutoColumnFlip(bodyScrollRef, columnKeys, {
    draggedKeyRef: lastDroppedKeyRef,
  })

  // Calculate total sticky width for positioning leaving columns
  const totalStickyWidth = stickyColumns.reduce((sum, col) => sum + col.width, 0)

  useEffect(() => {
    if (!onEndReached || !sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onEndReached()
        }
      },
      {
        root: null, // Use viewport as root to support window scrolling
        rootMargin: `0px 0px ${onEndReachedThreshold}px 0px`,
      }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [onEndReached, onEndReachedThreshold])

  return (
    <div className="relative">
      {/* Main scrollable body */}
      <div
        ref={bodyScrollRef}
        className={`overflow-x-auto overflow-y-hidden ${outerBorderClasses} ${backgroundConfig.bodyContainer}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overscrollBehaviorX: 'none',
          overscrollBehaviorY: 'none',
          lineHeight: 0,
          fontSize: 0,
          borderBottomLeftRadius: `${borderRadius}px`,
          borderBottomRightRadius: `${borderRadius}px`,
          willChange: 'scroll-position',
          ...outerBorderStyles, // Side-specific border colors
        }}
      >
        {data.map((row, index) => {
          const rowId = getRowId ? getRowId(row, index) : index

          return (
            <TableRow
              key={rowId}
              row={row}
              index={index}
              rowId={rowId}
              stickyColumns={stickyColumns}
              scrollableColumns={scrollableColumns}
              allColumns={allColumns}
              stickyState={stickyState}
              borderConfig={borderConfig}
              backgroundConfig={backgroundConfig}
              rowHeight={rowHeight}
              renderCell={renderCell}
              onRowClick={onRowClick}
              columnChange={columnChange}
              leavingColumnKeys={leavingColumnKeys}
              enteringColumnKeys={enteringColumnKeys}
              selectionState={selectionState}
              // Drag state for inline column shifting
              getShiftDirection={getShiftDirection}
              getInlineOffset={getInlineOffset}
              getShiftAmount={getShiftAmount}
              isInlineDragMode={isInlineDragMode}
              draggedColumnKey={draggedColumnKey}
            />
          )
        })}

        {/* Sentinel for infinite scroll */}
        {onEndReached && <div ref={sentinelRef} style={{ height: 1, width: 1, pointerEvents: 'none', opacity: 0 }} />}

        {/* Loading Indicator (injected into scroll container) */}
        {/* Pass table's columns (with checkbox) and configs to ensure skeleton matches real table */}
        {loadingIndicator && (
          <div style={{ minWidth: '100%', width: 'fit-content' }}>
            {React.isValidElement(loadingIndicator)
              ? React.cloneElement(loadingIndicator, {
                  stickyState,
                  columns: allColumns, // Pass computed columns with checkbox
                  enableSelection: false, // Columns already include checkbox, don't add again
                  borderConfig, // Pass table's border config
                  backgroundConfig, // Pass table's background config
                  rowHeight, // Pass table's row height
                } as Partial<unknown>)
              : loadingIndicator}
          </div>
        )}
      </div>

    </div>
  )
}

const MemoizedTableBody = memo(TableBodyBase)
// Type assertion to preserve generic type information
export const TableBody = MemoizedTableBody as <T extends Record<string, unknown>>(
  props: TableBodyProps<T>
) => React.ReactElement
;(TableBody as any).displayName = 'TableBody'


