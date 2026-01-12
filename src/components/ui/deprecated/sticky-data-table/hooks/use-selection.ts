'use client'

/**
 * StickyDataTable V2 - Selection Hook
 *
 * Manages row selection state for checkbox functionality.
 * Supports single, multiple, and select-all operations.
 *
 * @module hooks/use-selection
 */

import { useState, useCallback, useMemo } from 'react'
import type { SelectionState } from '../types'

interface UseSelectionProps {
  /** Array of all row IDs */
  rowIds: Array<string | number>
  /** Enable selection feature */
  enabled: boolean
  /** Initial selected IDs */
  initialSelected?: Set<string | number>
}

/**
 * Hook for row selection management
 *
 * Features:
 * - Toggle individual rows
 * - Select/deselect all
 * - Computed selection states
 * - Returns null when disabled
 *
 * @returns SelectionState or null if disabled
 */
export function useSelection({
  rowIds,
  enabled,
  initialSelected,
}: UseSelectionProps): SelectionState | null {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    () => initialSelected ?? new Set()
  )

  // Toggle single row selection
  const toggleRowSelection = useCallback((rowId: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }, [])

  // Select all visible rows
  const selectAllRows = useCallback(() => {
    setSelectedIds(new Set(rowIds))
  }, [rowIds])

  // Deselect all rows
  const deselectAllRows = useCallback(() => {
    setSelectedIds(new Set())
  }, [])

  // Check if specific row is selected
  const isRowSelected = useCallback(
    (rowId: string | number) => selectedIds.has(rowId),
    [selectedIds]
  )

  // Computed: all rows selected
  // Use safe access in case rowIds is undefined during transitions
  const isAllSelected = useMemo(() => {
    if (!rowIds || rowIds.length === 0) return false
    return rowIds.every((id) => selectedIds.has(id))
  }, [rowIds, selectedIds])

  // Computed: some but not all selected
  const isSomeSelected = useMemo(() => {
    if (!rowIds || rowIds.length === 0) return false
    return rowIds.some((id) => selectedIds.has(id)) && !isAllSelected
  }, [rowIds, selectedIds, isAllSelected])

  // Computed: count of selected
  const selectedCount = useMemo(() => {
    return selectedIds.size
  }, [selectedIds])

  // Return null if selection is disabled (after all hooks are called)
  if (!enabled) {
    return null
  }

  return {
    selectedIds,
    toggleRowSelection,
    selectAllRows,
    deselectAllRows,
    isRowSelected,
    isAllSelected,
    isSomeSelected,
    selectedCount,
  }
}






