'use client'

/**
 * StickyDataTable V2 - StickyHeaderWrapper Component
 *
 * Wrapper component for the sticky header section.
 * Contains header, navigation arrows, gradient overlay, and optionally an integrated toolbar.
 *
 * When toolbar is integrated:
 * - Toolbar renders above the table header within the sticky container
 * - Both toolbar and header stick together when scrolling
 * - Header gap expands to accommodate toolbar height
 *
 * @module components/sticky-header-wrapper
 */

import { memo, type RefObject, type ReactNode } from 'react'
import { TABLE_CONFIG } from '../../config'
import type {
  ComputedColumn,
  StickyState,
  BorderConfig,
  BackgroundConfig,
  ColumnChange,
  SelectionState,
  SortColumn,
  SortDirection,
  DragCloneMode,
} from '../../types'
import { NavigationArrows } from '../navigation/navigation-arrows'
import { TableHeader } from './table-header'
import { DragColumnOverlay } from './drag-column-overlay'

interface StickyHeaderWrapperProps {
  /** Header gap above sticky header */
  headerGap?: number
  /** Header height override */
  headerHeight?: number
  /** Header scroll ref */
  headerScrollRef: RefObject<HTMLDivElement | null>
  /** Body scroll ref (for arrow positioning) */
  bodyScrollRef: RefObject<HTMLDivElement | null>
  /** Sticky columns */
  stickyColumns: ComputedColumn[]
  /** Scrollable columns */
  scrollableColumns: ComputedColumn[]
  /** All columns */
  allColumns: ComputedColumn[]
  /** Column labels */
  columnLabels: Record<string, string>
  /** Sort column */
  sortColumn: SortColumn
  /** Sort direction */
  sortDirection: SortDirection
  /** Sort handler */
  onSort: (columnKey: string) => void
  /** Sticky state */
  stickyState: StickyState
  /** Show scroll indicator */
  showScrollIndicator: boolean
  /** Scroll left handler */
  onScrollLeft: () => void
  /** Scroll right handler */
  onScrollRight: () => void
  /** Border radius */
  borderRadius: number
  /** Border config */
  borderConfig: BorderConfig
  /** Background config */
  backgroundConfig: BackgroundConfig
  /** Column change for animation */
  columnChange: ColumnChange | null
  /** Leaving column keys */
  leavingColumnKeys: Set<string>
  /** Leaving columns with position data */
  leavingColumns: ComputedColumn[]
  /** Entering column keys */
  enteringColumnKeys: Set<string>
  /** Total sticky width */
  totalStickyWidth: number
  /** Arrow position override */
  arrowPreferredTopOffset?: number
  /** Selection state */
  selectionState: SelectionState | null
  // ---- Integrated Toolbar (Experimental) ----
  /** Toolbar content to render in the sticky area above the table header */
  integratedToolbar?: ReactNode
  /** Padding configuration for the integrated toolbar */
  integratedToolbarPadding?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  /** Height of the integrated toolbar row (px) */
  integratedToolbarHeight?: number
  // ---- Column Reordering ----
  /** Enable column reordering via drag-and-drop */
  enableColumnReorder?: boolean
  /** Callback when columns are reordered (passes column keys for correct ordering with hidden columns) */
  onReorderColumns?: (fromKey: string, toKey: string, insertAtEnd?: boolean) => void
  /** Whether column configuration has completed hydration (suppresses animation during hydration) */
  isColumnConfigHydrated?: boolean
  /** Ref to track the last dropped column key for FLIP animation exclusion */
  lastDroppedKeyRef?: React.MutableRefObject<string | null>
  /** Drag clone mode: 'floating' or 'inline' */
  dragCloneMode?: DragCloneMode
  // ---- Drag State (lifted from useHeaderDrag) ----
  /** Drag state from parent */
  dragState?: {
    isDragging: boolean
    draggedKey: string | null
    dragOverKey: string | null
    dropSide: 'left' | 'right' | null
    pointerX: number
    pointerY: number
    dragWidth: number
    dragHeight: number
    dragLabel: string
    dragAlign: 'left' | 'center' | 'right'
  }
  /** Column rects ref for hit testing */
  columnRectsRef?: React.RefObject<Map<string, DOMRect>>
  /** Ref tracking the X position where drag started (for overlay positioning) */
  dragStartXRef?: React.RefObject<number>
  /** Check if column is draggable */
  isColumnDraggable?: (column: ComputedColumn) => boolean
  /** Pointer down handler for drag */
  handlePointerDown?: (e: React.PointerEvent, columnKey: string, label: string) => void
  /** Pointer move handler for drag */
  handlePointerMove?: (e: React.PointerEvent) => void
  /** Pointer up handler for drag */
  handlePointerUp?: (e: React.PointerEvent) => void
  /** Pointer cancel handler for drag */
  handlePointerCancel?: () => void
  /** Get shift direction for a column */
  getShiftDirection?: (columnKey: string, colIndex: number) => 'left' | 'right' | null
  /** Get inline offset for dragged column */
  getInlineOffset?: (columnKey: string) => number | null
  /** Get shift amount in pixels */
  getShiftAmount?: () => number
  /** Current clone mode */
  cloneMode?: DragCloneMode
  /** Whether in inline drag mode */
  isInlineDragMode?: boolean
  // ---- Gradient Background ----
  /** CSS variable or color for gradient overlays (auto-detected from page background) */
  gradientBackgroundColor?: string
  // ---- Arrow Visibility ----
  /** Hide navigation arrows (e.g., during empty state) */
  hideArrows?: boolean
}

/**
 * Sticky header wrapper
 *
 * Features:
 * - Sticky positioning with gap
 * - Navigation arrows
 * - Gradient scroll indicator
 * - Shadow line indicator
 */
const StickyHeaderWrapperBase = ({
  headerGap = TABLE_CONFIG.HEADER_GAP,
  headerHeight = TABLE_CONFIG.HEADER_HEIGHT,
  headerScrollRef,
  bodyScrollRef,
  stickyColumns,
  scrollableColumns,
  allColumns,
  columnLabels,
  sortColumn,
  sortDirection,
  onSort,
  stickyState,
  showScrollIndicator,
  onScrollLeft,
  onScrollRight,
  borderRadius,
  borderConfig,
  backgroundConfig,
  columnChange,
  leavingColumnKeys,
  leavingColumns,
  enteringColumnKeys,
  totalStickyWidth,
  arrowPreferredTopOffset,
  selectionState,
  integratedToolbar,
  integratedToolbarPadding,
  integratedToolbarHeight,
  enableColumnReorder,
  onReorderColumns,
  isColumnConfigHydrated = true,
  lastDroppedKeyRef,
  dragCloneMode = 'floating',
  // Drag state from parent (lifted useHeaderDrag)
  dragState,
  columnRectsRef,
  dragStartXRef,
  isColumnDraggable,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  handlePointerCancel,
  getShiftDirection,
  getInlineOffset,
  getShiftAmount,
  cloneMode,
  isInlineDragMode,
  gradientBackgroundColor = 'var(--background-color-secondary_alt)',
  hideArrows = false,
}: StickyHeaderWrapperProps) => {
  // Calculate effective padding for integrated toolbar
  const toolbarPadding = {
    top: integratedToolbarPadding?.top ?? TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
    bottom: integratedToolbarPadding?.bottom ?? TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP,
    left: integratedToolbarPadding?.left ?? 0,
    right: integratedToolbarPadding?.right ?? 0,
  }
  const toolbarHeight = integratedToolbarHeight ?? TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT

  return (
    <div
      className={`sticky z-30 flex flex-col ${backgroundConfig.headerWrapper}`}
      style={{
        top: `${headerGap}px`,
        width: '100%',
      }}
    >
      {/* Background filler above header (and toolbar if integrated) */}
      <div
        className={backgroundConfig.headerWrapper}
        style={{
          height: `${headerGap}px`,
          position: 'absolute',
          top: `-${headerGap}px`,
          left: 0,
          right: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Integrated Toolbar (Experimental) - Renders above table header in sticky area */}
      {integratedToolbar && (
        <div
          className="flex items-center justify-end"
          style={{
            minHeight: toolbarHeight,
            paddingTop: toolbarPadding.top,
            paddingBottom: toolbarPadding.bottom,
            paddingLeft: toolbarPadding.left,
            paddingRight: toolbarPadding.right,
            // Debug: uncomment to visualize toolbar bounds
            // backgroundColor: 'rgba(59, 130, 246, 0.1)',
            // border: '1px dashed rgba(59, 130, 246, 0.5)',
          }}
        >
          {integratedToolbar}
        </div>
      )}

      {/* Navigation arrows - hidden during empty state */}
      {!hideArrows && (
        <NavigationArrows
          showLeftArrow={stickyState.showLeftArrow}
          showRightArrow={stickyState.showRightArrow}
          onScrollLeft={onScrollLeft}
          onScrollRight={onScrollRight}
          bodyScrollRef={bodyScrollRef}
          headerGap={headerGap}
          totalStickyWidth={totalStickyWidth}
          preferredTopOffset={arrowPreferredTopOffset}
        />
      )}

      {/* Shadow line indicator (hidden by default) */}
      <div
        className="pointer-events-none absolute z-[1] w-[1px]"
        style={{
          top: 0,
          left: `${totalStickyWidth}px`,
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent)',
          opacity: 0,
        }}
      />

      {/* Table header - gradient is now rendered INSIDE the header using clip-path for proper clipping */}
      <TableHeader
        headerScrollRef={headerScrollRef}
        headerHeight={headerHeight}
        stickyColumns={stickyColumns}
        scrollableColumns={scrollableColumns}
        allColumns={allColumns}
        columnLabels={columnLabels}
        stickyState={stickyState}
        borderConfig={borderConfig}
        backgroundConfig={backgroundConfig}
        borderRadius={borderRadius}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
        columnChange={columnChange}
        leavingColumnKeys={leavingColumnKeys}
        leavingColumns={leavingColumns}
        enteringColumnKeys={enteringColumnKeys}
        selectionState={selectionState}
        enableColumnReorder={enableColumnReorder}
        onReorderColumns={onReorderColumns}
        isColumnConfigHydrated={isColumnConfigHydrated}
        lastDroppedKeyRef={lastDroppedKeyRef}
        dragCloneMode={dragCloneMode}
        // Drag state from parent (lifted useHeaderDrag)
        dragState={dragState}
        columnRectsRef={columnRectsRef}
        isColumnDraggable={isColumnDraggable}
        handlePointerDown={handlePointerDown}
        handlePointerMove={handlePointerMove}
        handlePointerUp={handlePointerUp}
        handlePointerCancel={handlePointerCancel}
        getShiftDirection={getShiftDirection}
        getInlineOffset={getInlineOffset}
        getShiftAmount={getShiftAmount}
        cloneMode={cloneMode}
        isInlineDragMode={isInlineDragMode}
        // Gradient is now inside header, clipped by clip-path to match border-radius
        showScrollIndicator={showScrollIndicator}
        gradientBackgroundColor={gradientBackgroundColor}
      />

      {/* Column drag overlay - renders via portal for unified column styling */}
      {isInlineDragMode && dragState && columnRectsRef && dragStartXRef && (
        <DragColumnOverlay
          dragState={dragState}
          columnRectsRef={columnRectsRef}
          dragStartXRef={dragStartXRef}
          bodyScrollRef={bodyScrollRef}
          borderRadius={borderRadius}
        />
      )}
    </div>
  )
}

export const StickyHeaderWrapper = memo(StickyHeaderWrapperBase)
StickyHeaderWrapper.displayName = 'StickyHeaderWrapper'


