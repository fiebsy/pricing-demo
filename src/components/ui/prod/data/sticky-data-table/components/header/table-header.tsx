'use client'

/**
 * StickyDataTable V2 - TableHeader Component
 *
 * Renders the table header with sort controls and sticky positioning.
 * Uses CSS Grid for perfect alignment with body rows.
 * Supports drag-and-drop column reordering for non-sticky columns.
 *
 * @module components/table-header
 */

import { memo } from 'react'
import { TABLE_CONFIG, ANIMATION_CONFIG } from '../../config'
import { generateGridTemplate, getHeaderOuterBorders, getHeaderOuterBorderStyles } from '../../utils'
import { useAutoColumnFlip } from '../../hooks'
import { HeaderCell } from './header-cell'
import { useHeaderDrag } from './use-header-drag'
import { DragClone, DragCursor } from './drag-clone'
import { DropIndicator } from './drop-indicator'
import type { TableHeaderProps } from './types'

/**
 * Table header component
 *
 * Features:
 * - CSS Grid layout
 * - Sortable column headers
 * - Sticky positioning
 * - Select all checkbox
 * - Column animations
 * - Drag-and-drop column reordering (for non-sticky columns)
 */
const TableHeaderBase = ({
  headerScrollRef,
  headerHeight = TABLE_CONFIG.HEADER_HEIGHT,
  stickyColumns,
  scrollableColumns,
  allColumns,
  columnLabels,
  stickyState,
  borderConfig,
  backgroundConfig,
  borderRadius,
  sortColumn,
  sortDirection,
  onSort,
  columnChange,
  leavingColumnKeys,
  leavingColumns,
  enteringColumnKeys,
  selectionState,
  enableColumnReorder = true,
  onReorderColumns,
  isColumnConfigHydrated = true,
  lastDroppedKeyRef: externalDroppedKeyRef,
  showScrollIndicator = false,
  gradientBackgroundColor = 'var(--background-color-secondary_alt)',
  dragCloneMode = 'inline',
  dragSwapThreshold,
  // Drag state from parent (when lifted to StickyDataTable level)
  dragState: externalDragState,
  columnRectsRef: externalColumnRectsRef,
  isColumnDraggable: externalIsColumnDraggable,
  handlePointerDown: externalHandlePointerDown,
  handlePointerMove: externalHandlePointerMove,
  handlePointerUp: externalHandlePointerUp,
  handlePointerCancel: externalHandlePointerCancel,
  getShiftDirection: externalGetShiftDirection,
  getInlineOffset: externalGetInlineOffset,
  getShiftAmount: externalGetShiftAmount,
  cloneMode: externalCloneMode,
  isInlineDragMode: externalIsInlineDragMode,
}: TableHeaderProps) => {
  // Generate grid template
  const gridTemplate = generateGridTemplate(stickyColumns, scrollableColumns)
  const outerBorderClasses = getHeaderOuterBorders(borderConfig)
  const outerBorderStyles = getHeaderOuterBorderStyles(borderConfig)

  // Drag-and-drop state and handlers - use external props if provided, otherwise use local hook
  // This allows the hook to be lifted to parent level for sharing between header and body
  const localDrag = useHeaderDrag({
    headerScrollRef,
    allColumns,
    enableColumnReorder: externalDragState ? false : enableColumnReorder, // Disable local hook if external state provided
    onReorderColumns,
    externalDroppedKeyRef,
    cloneMode: dragCloneMode,
    dragSwapThreshold,
  })

  // Use external drag state if provided, otherwise use local
  const dragState = externalDragState ?? localDrag.dragState
  const columnRectsRef = externalColumnRectsRef ?? localDrag.columnRectsRef
  const lastDroppedKeyRef = localDrag.lastDroppedKeyRef // Always use local for FLIP
  const isColumnDraggable = externalIsColumnDraggable ?? localDrag.isColumnDraggable
  const handlePointerDown = externalHandlePointerDown ?? localDrag.handlePointerDown
  const handlePointerMove = externalHandlePointerMove ?? localDrag.handlePointerMove
  const handlePointerUp = externalHandlePointerUp ?? localDrag.handlePointerUp
  const handlePointerCancel = externalHandlePointerCancel ?? localDrag.handlePointerCancel
  const getShiftDirection = externalGetShiftDirection ?? localDrag.getShiftDirection
  const getInlineOffset = externalGetInlineOffset ?? localDrag.getInlineOffset
  const getShiftAmount = externalGetShiftAmount ?? localDrag.getShiftAmount
  const cloneMode = externalCloneMode ?? localDrag.cloneMode
  const isInlineDragMode = externalIsInlineDragMode ?? (cloneMode === 'inline' && dragState.isDragging)

  // Auto-FLIP: Smooth column shift animations (dragged column snaps, others animate)
  const columnKeys = allColumns.map((col) => col.key)
  useAutoColumnFlip(headerScrollRef, columnKeys, {
    draggedKeyRef: lastDroppedKeyRef,
    isHydrating: !isColumnConfigHydrated,
  })

  return (
    <div
      className="relative"
      onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      onPointerUp={dragState.isDragging ? handlePointerUp : undefined}
      onPointerCancel={dragState.isDragging ? handlePointerCancel : undefined}
    >
      {/* Gradient overlay - inside header, clipped INSIDE the border */}
      {showScrollIndicator && (() => {
        const borderWidth = borderConfig.showOuter ? 1 : 0
        const innerRadius = Math.max(0, borderRadius - borderWidth)
        return (
          <div
            className="pointer-events-none absolute inset-0 z-[25]"
            style={{
              clipPath: `inset(${borderWidth}px ${borderWidth}px 0 ${borderWidth}px round ${innerRadius}px ${innerRadius}px 0 0)`,
            }}
          >
            <div
              className="absolute top-0 bottom-0 right-0 w-5"
              style={{
                background: `linear-gradient(to left, ${gradientBackgroundColor} 0%, transparent 100%)`,
              }}
            />
          </div>
        )
      })()}

      {/* Main grid */}
      <div
        ref={headerScrollRef}
        className={`grid w-full overflow-x-auto overflow-y-hidden ${outerBorderClasses} ${backgroundConfig.headerContainer} scrollbar-hidden`}
        style={{
          gridTemplateColumns: gridTemplate,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: `${headerHeight}px`,
          transition: columnChange
            ? `background-color 0.125s ease, grid-template-columns ${ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'background-color 0.125s ease',
          borderTopLeftRadius: `${borderRadius}px`,
          borderTopRightRadius: `${borderRadius}px`,
          willChange: 'scroll-position',
          ...outerBorderStyles,
        }}
      >
        {allColumns.map((col, colIndex) => {
          const draggable = isColumnDraggable(col)
          const isDragging = dragState.draggedKey === col.key
          const label = columnLabels[col.key] || col.key
          const shiftDirection = getShiftDirection(col.key, colIndex)
          const inlineOffset = getInlineOffset(col.key)
          const shiftAmount = getShiftAmount()

          return (
            <HeaderCell
              key={col.key}
              column={col}
              label={label}
              stickyState={stickyState}
              borderConfig={borderConfig}
              backgroundConfig={backgroundConfig}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={onSort}
              leavingColumnKeys={leavingColumnKeys}
              enteringColumnKeys={enteringColumnKeys}
              columnChange={columnChange}
              selectionState={selectionState}
              isDraggable={draggable}
              isDragging={isDragging}
              shiftDirection={shiftDirection}
              inlineOffset={inlineOffset}
              shiftAmount={shiftAmount}
              isInlineMode={isInlineDragMode}
              onPointerDown={draggable ? (e) => handlePointerDown(e, col.key, label) : undefined}
            />
          )
        })}
      </div>

      {/* Drop indicator - only shown in 'floating' mode */}
      {cloneMode === 'floating' && (
        <DropIndicator
          dragOverKey={dragState.dragOverKey}
          dropSide={dragState.dropSide}
          columnRectsRef={columnRectsRef}
          headerScrollRef={headerScrollRef}
        />
      )}

      {/* Floating drag clone - only shown in 'floating' mode */}
      {cloneMode === 'floating' && <DragClone dragState={dragState} />}

      {/* Global grabbing cursor during drag */}
      <DragCursor isDragging={dragState.isDragging} />
    </div>
  )
}

export const TableHeader = memo(TableHeaderBase)
TableHeader.displayName = 'TableHeader'

// Re-export types for consumers
export type { TableHeaderProps } from './types'
