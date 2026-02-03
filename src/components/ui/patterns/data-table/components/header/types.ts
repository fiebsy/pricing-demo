/**
 * StickyDataTable V2 - TableHeader Types
 *
 * Type definitions for the table header component and its subcomponents.
 *
 * @module components/table-header/types
 */

import type { ReactNode, RefObject } from 'react'
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

/**
 * Props for the TableHeader component
 */
export interface TableHeaderProps {
  /** Forwarded scroll container ref */
  headerScrollRef: RefObject<HTMLDivElement | null>
  /** Header height override */
  headerHeight?: number
  /** Sticky columns */
  stickyColumns: ComputedColumn[]
  /** Scrollable columns */
  scrollableColumns: ComputedColumn[]
  /** All visible columns */
  allColumns: ComputedColumn[]
  /** Column labels */
  columnLabels: Record<string, ReactNode>
  /** Sticky state for styling */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Border radius */
  borderRadius: number
  /** Current sort column */
  sortColumn: SortColumn
  /** Current sort direction */
  sortDirection: SortDirection
  /** Sort handler */
  onSort: (columnKey: string) => void
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
  /** Enable column reordering via drag-and-drop */
  enableColumnReorder?: boolean
  /** Callback when columns are reordered (passes column keys and insertAfter flag) */
  onReorderColumns?: (fromKey: string, toKey: string, insertAfter?: boolean) => void
  /** Whether column configuration has completed hydration (suppresses animation during hydration) */
  isColumnConfigHydrated?: boolean
  /** Ref to track the last dropped column key for FLIP animation exclusion (shared with body) */
  lastDroppedKeyRef?: React.MutableRefObject<string | null>
  // ---- Gradient Overlay ----
  /** Show gradient scroll indicator on right edge */
  showScrollIndicator?: boolean
  /** Background color for gradient (should match header background) */
  gradientBackgroundColor?: string
  // ---- Drag Clone Mode ----
  /** Clone mode: 'floating' shows clone near cursor, 'inline' slides the actual cell */
  dragCloneMode?: DragCloneMode
  /** Threshold for triggering column swap (0-1). Lower = more sensitive. @default 0.5 */
  dragSwapThreshold?: number
  // ---- Drag State (lifted from useHeaderDrag) ----
  /** Drag state from parent */
  dragState?: PointerDragState
  /** Column rects ref for hit testing */
  columnRectsRef?: React.RefObject<Map<string, DOMRect>>
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
  /** Current clone mode from hook */
  cloneMode?: DragCloneMode
  /** Whether in inline drag mode */
  isInlineDragMode?: boolean
}

/**
 * Pointer-based drag state for column reordering
 */
export interface PointerDragState {
  /** Whether currently dragging */
  isDragging: boolean
  /** Key of the column being dragged */
  draggedKey: string | null
  /** Key of the column being hovered over */
  dragOverKey: string | null
  /** Which side of the target column to drop on (left = insert before, right = insert after) */
  dropSide: 'left' | 'right' | null
  /** Current pointer X position */
  pointerX: number
  /** Current pointer Y position */
  pointerY: number
  /** Width of the dragged element */
  dragWidth: number
  /** Height of the dragged element */
  dragHeight: number
  /** Label of the dragged column */
  dragLabel: string
  /** Alignment of the dragged column */
  dragAlign: 'left' | 'center' | 'right'
}

/**
 * Props for the HeaderCell component
 */
export interface HeaderCellProps {
  column: ComputedColumn
  label: ReactNode
  stickyState: StickyState
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (columnKey: string) => void
  leavingColumnKeys: Set<string>
  enteringColumnKeys: Set<string>
  columnChange: ColumnChange | null
  selectionState: SelectionState | null
  // Pointer drag props
  isDraggable?: boolean
  isDragging?: boolean
  /** Direction this cell should shift to make room for drop ('left' | 'right' | null) */
  shiftDirection?: 'left' | 'right' | null
  /** Inline mode offset in pixels (only set for the dragged cell in inline mode) */
  inlineOffset?: number | null
  /** Shift amount in pixels (4px for floating mode, full column width for inline mode) */
  shiftAmount?: number
  /** Whether in inline drag mode (cells slide) vs floating mode (clone follows cursor) */
  isInlineMode?: boolean
  onPointerDown?: (e: React.PointerEvent) => void
}

/**
 * Props for the DragClone component
 */
export interface DragCloneProps {
  dragState: PointerDragState
}

/**
 * Props for the DropIndicator component
 */
export interface DropIndicatorProps {
  dragOverKey: string | null
  dropSide: 'left' | 'right' | null
  columnRectsRef: React.RefObject<Map<string, DOMRect>>
  headerScrollRef: RefObject<HTMLDivElement | null>
}

/**
 * Return type for the useHeaderDrag hook
 */
export interface UseHeaderDragReturn {
  dragState: PointerDragState
  columnRectsRef: React.RefObject<Map<string, DOMRect>>
  lastDroppedKeyRef: React.MutableRefObject<string | null>
  /** Ref tracking the X position where drag started (for calculating displacement) */
  dragStartXRef: React.RefObject<number>
  isColumnDraggable: (column: ComputedColumn) => boolean
  handlePointerDown: (e: React.PointerEvent, columnKey: string, label: string) => void
  handlePointerMove: (e: React.PointerEvent) => void
  handlePointerUp: (e: React.PointerEvent) => void
  handlePointerCancel: () => void
  getShiftDirection: (columnKey: string, colIndex: number) => 'left' | 'right' | null
  /** Get inline offset for dragged cell (inline mode only) */
  getInlineOffset: (columnKey: string) => number | null
  /** Get shift amount in pixels (4px for floating, full column width for inline) */
  getShiftAmount: () => number
  /** Current clone mode */
  cloneMode: DragCloneMode
}
