/**
 * Filter System Types for StickyDataTable
 *
 * Provides a flexible, type-safe filter configuration system that supports:
 * - Multiple filter categories (date, select, range, search)
 * - Progressive disclosure (category → values)
 * - Custom filter options per table
 *
 * @module types/filter
 */

import type { FC } from 'react'

/**
 * Icon type - supports both Hugeicons arrays and React components
 */
export type FilterIcon = FC<{ className?: string }> | unknown[]

/**
 * Filter operator types for different filter modes
 */
export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'greater_than'
  | 'less_than'
  | 'between'
  | 'in'
  | 'not_in'
  | 'is_empty'
  | 'is_not_empty'

/**
 * Filter value types based on the filter category
 */
export type FilterValue = string | number | boolean | Date | string[] | number[] | [number, number] | [Date, Date] | null

/**
 * Base filter option interface
 */
export interface FilterOption {
  /** Unique identifier for this option */
  id: string
  /** Display label for the option */
  label: string
  /** Optional icon (Hugeicon array or React component) */
  icon?: FilterIcon
  /** Optional count/badge to show beside the option */
  count?: number
}

/**
 * Date range preset option
 */
export interface DateRangePreset extends FilterOption {
  /** Value in days (negative for past, positive for future) */
  days?: number
  /** Start date for custom range */
  startDate?: Date
  /** End date for custom range */
  endDate?: Date
}

/**
 * Select filter configuration
 */
export interface SelectFilterConfig {
  type: 'select'
  /** Available options to select from */
  options: FilterOption[]
  /** Allow multiple selections */
  multiple?: boolean
  /** Enable search within options */
  searchable?: boolean
  /** Placeholder text for search */
  searchPlaceholder?: string
}

/**
 * Date filter configuration
 */
export interface DateFilterConfig {
  type: 'date'
  /** Predefined date range options */
  presets: DateRangePreset[]
  /** Allow custom date range selection */
  allowCustomRange?: boolean
}

/**
 * Range preset option
 */
export interface RangePreset {
  id: string
  label: string
  min: number
  max: number
  /** Optional icon (Hugeicon array or React component) */
  icon?: FilterIcon
}

/**
 * Range filter configuration (for numeric values)
 */
export interface RangeFilterConfig {
  type: 'range'
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step value for slider/input */
  step?: number
  /** Predefined range options */
  presets?: RangePreset[]
  /** Format function for displaying values */
  formatValue?: (value: number) => string
}

/**
 * Search/text filter configuration
 */
export interface SearchFilterConfig {
  type: 'search'
  /** Placeholder text */
  placeholder?: string
  /** Debounce delay in ms */
  debounceMs?: number
}

/**
 * Boolean filter configuration
 */
export interface BooleanFilterConfig {
  type: 'boolean'
  /** Label for true state */
  trueLabel?: string
  /** Label for false state */
  falseLabel?: string
}

/**
 * Union type of all filter configurations
 */
export type FilterConfig =
  | SelectFilterConfig
  | DateFilterConfig
  | RangeFilterConfig
  | SearchFilterConfig
  | BooleanFilterConfig

/**
 * Filter category definition
 * Defines a filterable field with its configuration
 */
export interface FilterCategory {
  /** Unique key matching the data field to filter */
  key: string
  /** Display label for the filter category */
  label: string
  /** Optional icon (Hugeicon array or React component) */
  icon?: FilterIcon
  /** Filter configuration defining how values can be selected */
  config: FilterConfig
  /** Optional group for organizing filters */
  group?: string
  /** Optional description for the filter */
  description?: string
}

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

// ============================================================================
// CONSTANTS & HELPERS
// ============================================================================

/**
 * Default date presets for collections
 */
export const DEFAULT_DATE_PRESETS: DateRangePreset[] = [
  { id: 'today', label: 'Today', days: 0 },
  { id: '24h', label: 'In last 24 hours', days: -1 },
  { id: '48h', label: 'In last 48 hours', days: -2 },
  { id: 'week', label: 'In last week', days: -7 },
  { id: '2weeks', label: 'In last 2 weeks', days: -14 },
  { id: 'month', label: 'In last month', days: -30 },
  { id: '3months', label: 'In last 3 months', days: -90 },
]

/**
 * Helper to create a select filter config
 */
export function createSelectFilter(
  options: FilterOption[],
  opts?: { multiple?: boolean; searchable?: boolean; searchPlaceholder?: string }
): SelectFilterConfig {
  return {
    type: 'select',
    options,
    multiple: opts?.multiple ?? false,
    searchable: opts?.searchable ?? true,
    searchPlaceholder: opts?.searchPlaceholder ?? 'Search...',
  }
}

/**
 * Helper to create a date filter config
 */
export function createDateFilter(
  presets: DateRangePreset[] = DEFAULT_DATE_PRESETS,
  opts?: { allowCustomRange?: boolean }
): DateFilterConfig {
  return {
    type: 'date',
    presets,
    allowCustomRange: opts?.allowCustomRange ?? false,
  }
}

/**
 * Helper to create a range filter config
 */
export function createRangeFilter(opts: {
  min?: number
  max?: number
  step?: number
  presets?: RangePreset[]
  formatValue?: (value: number) => string
}): RangeFilterConfig {
  return {
    type: 'range',
    ...opts,
  }
}
