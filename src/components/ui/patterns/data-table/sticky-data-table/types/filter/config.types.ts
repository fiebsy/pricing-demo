/**
 * StickyDataTable V2 - Filter Configuration Types
 *
 * Filter configuration interfaces for different filter modes.
 *
 * @module types/filter/config
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
