/**
 * StickyDataTable V2 - Sorting Types
 *
 * Types for column sorting functionality.
 *
 * @module types/sort
 */

// ============================================================================
// SORTING
// ============================================================================

/** Column key for sorting (null = no sorting) */
export type SortColumn = string | null

/** Sort direction */
export type SortDirection = 'asc' | 'desc'

/** Sorting state */
export interface SortState {
  column: SortColumn
  direction: SortDirection
}
