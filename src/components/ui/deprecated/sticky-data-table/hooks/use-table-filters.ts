'use client'

import { useCallback, useMemo, useState } from 'react'

import type { ActiveFilter, FilterCategory, FilterState, FilterValue } from '../filter-types'

/**
 * Generate a unique ID for filter instances
 */
function generateFilterId(): string {
  return `filter-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Props for the useTableFilters hook
 */
export interface UseTableFiltersProps {
  /** Available filter categories */
  categories: FilterCategory[]
  /** Initial filters to apply */
  initialFilters?: ActiveFilter[]
  /** Callback when filters change */
  onFiltersChange?: (filters: ActiveFilter[]) => void
}

/**
 * Return type for the useTableFilters hook
 */
export interface UseTableFiltersReturn {
  /** Current filter state */
  filterState: FilterState
  /** Add a new filter */
  addFilter: (filter: Omit<ActiveFilter, 'id'>) => void
  /** Remove a filter by ID */
  removeFilter: (filterId: string) => void
  /** Update an existing filter's value */
  updateFilter: (filterId: string, value: FilterValue, displayValue: string) => void
  /** Clear all filters */
  clearFilters: () => void
  /** Get filters for a specific category */
  getFiltersForCategory: (categoryKey: string) => ActiveFilter[]
  /** Check if a category has active filters */
  hasFilterForCategory: (categoryKey: string) => boolean
  /** Apply filters to data (generic filter function) */
  applyFilters: <T extends Record<string, any>>(data: T[]) => T[]
}

/**
 * Hook for managing table filter state
 *
 * Provides a complete filter management system including:
 * - Adding, removing, and updating filters
 * - Filter state with computed properties
 * - Generic data filtering function
 *
 * @example
 * ```tsx
 * const { filterState, addFilter, removeFilter, clearFilters, applyFilters } = useTableFilters({
 *   categories: filterCategories,
 *   onFiltersChange: (filters) => console.log('Filters changed:', filters)
 * })
 *
 * // Apply filters to data
 * const filteredData = applyFilters(rawData)
 * ```
 */
export function useTableFilters({
  categories,
  initialFilters = [],
  onFiltersChange,
}: UseTableFiltersProps): UseTableFiltersReturn {
  // Internal filter storage
  const [filtersMap, setFiltersMap] = useState<Map<string, ActiveFilter>>(() => {
    const map = new Map<string, ActiveFilter>()
    initialFilters.forEach((filter) => {
      map.set(filter.id, filter)
    })
    return map
  })

  // Computed filter state
  const filterState: FilterState = useMemo(() => {
    const activeFilters = Array.from(filtersMap.values())
    return {
      filters: filtersMap,
      activeFilters,
      hasFilters: activeFilters.length > 0,
      filterCount: activeFilters.length,
    }
  }, [filtersMap])

  // Add a new filter
  const addFilter = useCallback(
    (filter: Omit<ActiveFilter, 'id'>) => {
      const id = generateFilterId()
      const newFilter: ActiveFilter = { ...filter, id }

      setFiltersMap((prev) => {
        const next = new Map(prev)
        next.set(id, newFilter)
        return next
      })

      onFiltersChange?.(Array.from(filtersMap.values()).concat(newFilter))
    },
    [onFiltersChange, filtersMap]
  )

  // Remove a filter by ID
  const removeFilter = useCallback(
    (filterId: string) => {
      setFiltersMap((prev) => {
        const next = new Map(prev)
        next.delete(filterId)
        onFiltersChange?.(Array.from(next.values()))
        return next
      })
    },
    [onFiltersChange]
  )

  // Update an existing filter
  const updateFilter = useCallback(
    (filterId: string, value: FilterValue, displayValue: string) => {
      setFiltersMap((prev) => {
        const existingFilter = prev.get(filterId)
        if (!existingFilter) return prev

        const next = new Map(prev)
        next.set(filterId, {
          ...existingFilter,
          value,
          displayValue,
        })
        onFiltersChange?.(Array.from(next.values()))
        return next
      })
    },
    [onFiltersChange]
  )

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFiltersMap(new Map())
    onFiltersChange?.([])
  }, [onFiltersChange])

  // Get filters for a specific category
  const getFiltersForCategory = useCallback(
    (categoryKey: string): ActiveFilter[] => {
      return filterState.activeFilters.filter((f) => f.categoryKey === categoryKey)
    },
    [filterState.activeFilters]
  )

  // Check if a category has active filters
  const hasFilterForCategory = useCallback(
    (categoryKey: string): boolean => {
      return filterState.activeFilters.some((f) => f.categoryKey === categoryKey)
    },
    [filterState.activeFilters]
  )

  // Generic filter application function
  const applyFilters = useCallback(
    <T extends Record<string, any>>(data: T[]): T[] => {
      if (!filterState.hasFilters) return data

      return data.filter((row) => {
        // All filters must pass (AND logic)
        return filterState.activeFilters.every((filter) => {
          const category = categories.find((c) => c.key === filter.categoryKey)
          if (!category) return true

          const rowValue = row[filter.categoryKey]
          const filterValue = filter.value

          switch (filter.operator) {
            case 'equals':
              return rowValue === filterValue

            case 'not_equals':
              return rowValue !== filterValue

            case 'contains':
              if (typeof rowValue === 'string' && typeof filterValue === 'string') {
                return rowValue.toLowerCase().includes(filterValue.toLowerCase())
              }
              return false

            case 'not_contains':
              if (typeof rowValue === 'string' && typeof filterValue === 'string') {
                return !rowValue.toLowerCase().includes(filterValue.toLowerCase())
              }
              return true

            case 'greater_than':
              if (typeof rowValue === 'number' && typeof filterValue === 'number') {
                return rowValue > filterValue
              }
              if (rowValue instanceof Date && filterValue instanceof Date) {
                return rowValue > filterValue
              }
              // Handle timestamp strings or numbers
              if (typeof filterValue === 'number') {
                const rowDate = new Date(rowValue)
                const filterDate = new Date(filterValue)
                return rowDate > filterDate
              }
              return false

            case 'less_than':
              if (typeof rowValue === 'number' && typeof filterValue === 'number') {
                return rowValue < filterValue
              }
              if (rowValue instanceof Date && filterValue instanceof Date) {
                return rowValue < filterValue
              }
              // Handle timestamp strings or numbers
              if (typeof filterValue === 'number') {
                const rowDate = new Date(rowValue)
                const filterDate = new Date(filterValue)
                return rowDate < filterDate
              }
              return false

            case 'between':
              if (Array.isArray(filterValue) && filterValue.length === 2) {
                const [min, max] = filterValue
                if (typeof rowValue === 'number' && typeof min === 'number' && typeof max === 'number') {
                  return rowValue >= min && rowValue <= max
                }
              }
              return false

            case 'in':
              if (Array.isArray(filterValue)) {
                return (filterValue as (string | number)[]).includes(rowValue as string | number)
              }
              return false

            case 'not_in':
              if (Array.isArray(filterValue)) {
                return !(filterValue as (string | number)[]).includes(rowValue as string | number)
              }
              return true

            case 'is_empty':
              return rowValue === null || rowValue === undefined || rowValue === ''

            case 'is_not_empty':
              return rowValue !== null && rowValue !== undefined && rowValue !== ''

            default:
              return true
          }
        })
      })
    },
    [filterState, categories]
  )

  return {
    filterState,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    getFiltersForCategory,
    hasFilterForCategory,
    applyFilters,
  }
}











