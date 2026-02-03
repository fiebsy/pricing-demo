/**
 * StickyDataTable V2 - Context Types
 *
 * Types for the table context value.
 *
 * @module types/context
 */

import type { ReactNode, RefObject } from 'react'
import type { ColumnConfig, ColumnChange, ComputedColumn } from './core/column.types'
import type { SortColumn, SortDirection } from './core/sort.types'
import type { StickyState, ScrollState } from './styling/sticky-state.types'
import type { BorderConfig } from './styling/border.types'
import type { BackgroundConfig } from './styling/background.types'
import type { SelectionState } from './core/selection.types'

// ============================================================================
// TABLE CONTEXT
// ============================================================================

/**
 * Table context value
 * Shared state accessible via React Context
 */
export interface TableContextValue<T = Record<string, unknown>> {
  // Data
  data: T[]
  sortedData: T[]

  // Columns
  columns: ColumnConfig[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  allColumns: ComputedColumn[]
  columnLabels: Record<string, ReactNode>
  totalStickyWidth: number

  // Column visibility
  visibleColumnKeys: Set<string>
  leavingColumnKeys: Set<string>
  columnChange: ColumnChange | null
  toggleColumn: (key: string) => void
  resetColumns: () => void

  // Sorting
  sortColumn: SortColumn
  sortDirection: SortDirection
  handleSort: (columnKey: string) => void

  // Scroll
  stickyState: StickyState
  scrollState: ScrollState
  handleScrollLeft: () => void
  handleScrollRight: () => void

  // Selection
  selectionState: SelectionState | null
  getRowId: ((row: T, index: number) => string | number) | undefined

  // Refs
  headerScrollRef: RefObject<HTMLDivElement>
  bodyScrollRef: RefObject<HTMLDivElement>

  // Config
  borderRadius: number
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig

  // Rendering
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  onRowClick?: (row: T, index: number) => void
}
