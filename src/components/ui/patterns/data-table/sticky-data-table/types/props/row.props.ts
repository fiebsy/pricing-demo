/**
 * StickyDataTable V2 - Row Props
 *
 * Props interface for TableRow component.
 *
 * @module types/props/row
 */

import type { ReactNode } from 'react'
import type { ComputedColumn, ColumnChange } from '../core/column.types'
import type { StickyState } from '../styling/sticky-state.types'
import type { BorderConfig } from '../styling/border.types'
import type { BackgroundConfig } from '../styling/background.types'
import type { SelectionState } from '../core/selection.types'

/** Props for TableRow component */
export interface TableRowProps<T = Record<string, unknown>> {
  /** Row data */
  row: T
  /** Row index in data array */
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
}
