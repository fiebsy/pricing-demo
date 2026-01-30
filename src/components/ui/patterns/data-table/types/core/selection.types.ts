/**
 * StickyDataTable V2 - Selection Types
 *
 * Types for row selection functionality.
 *
 * @module types/core/selection
 */

// ============================================================================
// SELECTION
// ============================================================================

/**
 * Row selection state
 * Manages checkbox selection functionality
 */
export interface SelectionState {
  /** Set of selected row IDs */
  selectedIds: Set<string | number>
  /** Toggle selection for a row */
  toggleRowSelection: (rowId: string | number) => void
  /** Select all visible rows */
  selectAllRows: () => void
  /** Deselect all rows */
  deselectAllRows: () => void
  /** Check if row is selected */
  isRowSelected: (rowId: string | number) => boolean
  /** All visible rows are selected */
  isAllSelected: boolean
  /** Some but not all rows selected */
  isSomeSelected: boolean
  /** Count of selected rows */
  selectedCount: number
}
