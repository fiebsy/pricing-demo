import { useMemo, useState } from 'react'

import type { ColumnConfig, SortColumn, SortDirection } from '../types'

/**
 * Generic hook for table sorting
 */
export function useTableSort<T extends Record<string, any>>(data: T[]) {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortColumn) return 0

      const aVal = a[sortColumn]
      const bVal = b[sortColumn]

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        const modifier = sortDirection === 'asc' ? 1 : -1
        return (aVal - bVal) * modifier
      }

      const modifier = sortDirection === 'asc' ? 1 : -1
      return aVal > bVal ? modifier : aVal < bVal ? -modifier : 0
    })
  }, [data, sortColumn, sortDirection])

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('desc')
    }
  }

  return {
    sortColumn,
    sortDirection,
    sortedData,
    handleSort,
  }
}
