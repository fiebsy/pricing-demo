/**
 * StickyDataTable V2 - Context Types
 *
 * Types for the table context value.
 *
 * @module types/context
 */

import type { ReactNode, RefObject } from 'react'
import type { ColumnConfig, ColumnChange, ComputedColumn } from './column.types'
import type { SortColumn, SortDirection } from './sort.types'
import type { StickyState, ScrollState, BorderConfig, BackgroundConfig } from './styling.types'
import type { SelectionState } from './selection.types'

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
  columnLabels: Record<string, string>
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
  headerScrollRef: RefObject<HTMLDivElement | null>
  bodyScrollRef: RefObject<HTMLDivElement | null>

  // Config
  borderRadius: number
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig

  // Rendering
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  onRowClick?: (row: T, index: number) => void
}
