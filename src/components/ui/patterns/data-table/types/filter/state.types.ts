/**
 * StickyDataTable V2 - Filter State Types
 *
 * Active filter state and toolbar props.
 *
 * @module types/filter/state
 */

import type { FilterCategory, FilterOperator, FilterValue } from './config.types'

/**
 * Active filter instance
 * Represents a filter that has been applied
 */
export interface ActiveFilter {
  /** Unique identifier for this filter instance */
  id: string
  /** The category/field being filtered */
  categoryKey: string
  /** The filter operator */
  operator: FilterOperator
  /** The filter value(s) */
  value: FilterValue
  /** Display label for the filter pill */
  displayLabel: string
  /** Display value for the filter pill */
  displayValue: string
}

/**
 * Filter state containing all active filters
 */
export interface FilterState {
  /** Map of active filters by their unique ID */
  filters: Map<string, ActiveFilter>
  /** Array representation for easier iteration */
  activeFilters: ActiveFilter[]
  /** Whether any filters are active */
  hasFilters: boolean
  /** Count of active filters */
  filterCount: number
}

/**
 * Filter toolbar props
 */
export interface FilterToolbarProps {
  /** Available filter categories */
  categories: FilterCategory[]
  /** Current filter state */
  filterState: FilterState
  /** Callback when a filter is added */
  onFilterAdd: (filter: Omit<ActiveFilter, 'id'>) => void
  /** Callback when a filter is removed */
  onFilterRemove: (filterId: string) => void
  /** Callback when all filters are cleared */
  onFiltersClear: () => void
  /** Callback when a filter is updated */
  onFilterUpdate?: (filterId: string, value: FilterValue) => void
  /** Custom class name */
  className?: string
  /** Placeholder text for search input in filter popover */
  searchPlaceholder?: string
  /** Show "Clear all" button */
  showClearAll?: boolean
}
