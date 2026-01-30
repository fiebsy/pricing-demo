/**
 * StickyDataTable V2 - Body Props
 *
 * Props interface for TableBody component.
 *
 * @module types/props/body
 */

import type { ReactNode, RefObject } from 'react'
import type { ComputedColumn, ColumnChange } from '../core/column.types'
import type { StickyState } from '../styling/sticky-state.types'
import type { BorderConfig } from '../styling/border.types'
import type { BackgroundConfig } from '../styling/background.types'
import type { SelectionState } from '../core/selection.types'

/** Props for TableBody component */
export interface TableBodyProps<T = Record<string, unknown>> {
  /** Forwarded scroll container ref */
  bodyScrollRef: RefObject<HTMLDivElement>
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
  /** Cell render function */
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void
  /** Column change for animation */
  columnChange: ColumnChange | null
  /** Leaving column keys */
  leavingColumnKeys: Set<string>
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
}
