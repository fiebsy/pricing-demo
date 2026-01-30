'use client'

/**
 * StickyDataTable V2 - Sort Hook
 *
 * Manages column sorting state and data transformation.
 * Supports ascending/descending toggle and multiple data types.
 *
 * @module hooks/use-sort
 */

import { useState, useMemo, useCallback } from 'react'
import type { SortColumn, SortDirection } from '../../types'

interface UseSortProps<T> {
  data: T[]
}

interface UseSortReturn<T> {
  sortColumn: SortColumn
  sortDirection: SortDirection
  sortedData: T[]
  handleSort: (columnKey: string) => void
  resetSort: () => void
}

/**
 * Compare two values for sorting
 */
function compareValues<T>(a: T, b: T, direction: SortDirection): number {
  const modifier = direction === 'asc' ? 1 : -1

  // Handle null/undefined
  if (a == null && b == null) return 0
  if (a == null) return modifier
  if (b == null) return -modifier

  // Number comparison
  if (typeof a === 'number' && typeof b === 'number') {
    return (a - b) * modifier
  }

  // Date comparison
  if (a instanceof Date && b instanceof Date) {
    return (a.getTime() - b.getTime()) * modifier
  }

  // String comparison
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b) * modifier
  }

  // Boolean comparison
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return (a === b ? 0 : a ? 1 : -1) * modifier
  }

  // Fallback to string coercion
  return String(a).localeCompare(String(b)) * modifier
}

/**
 * Hook for table sorting
 *
 * Features:
 * - Click column to sort descending
 * - Click again to toggle direction
 * - Click different column to reset
 * - Handles multiple data types
 * - Memoized sorted data
 */
export function useSort<T extends Record<string, unknown>>({
  data,
}: UseSortProps<T>): UseSortReturn<T> {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]
      return compareValues(aVal, bVal, sortDirection)
    })
  }, [data, sortColumn, sortDirection])

  // Handle sort click
  const handleSort = useCallback((columnKey: string) => {
    setSortColumn((prevColumn) => {
      if (prevColumn === columnKey) {
        // Same column - toggle direction
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        return columnKey
      } else {
        // New column - reset to descending
        setSortDirection('desc')
        return columnKey
      }
    })
  }, [])

  // Reset sort state
  const resetSort = useCallback(() => {
    setSortColumn(null)
    setSortDirection('desc')
  }, [])

  return {
    sortColumn,
    sortDirection,
    sortedData,
    handleSort,
    resetSort,
  }
}


