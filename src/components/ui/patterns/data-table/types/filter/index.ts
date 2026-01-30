/**
 * StickyDataTable V2 - Filter Types Index
 *
 * @module types/filter
 */

// Configuration types
export type {
  FilterIcon,
  FilterOperator,
  FilterValue,
  FilterOption,
  DateRangePreset,
  SelectFilterConfig,
  DateFilterConfig,
  RangePreset,
  RangeFilterConfig,
  SearchFilterConfig,
  BooleanFilterConfig,
  FilterConfig,
  FilterCategory,
} from './config.types'

// State types
export type { ActiveFilter, FilterState, FilterToolbarProps } from './state.types'

// Presets
export { DEFAULT_DATE_PRESETS } from './presets'

// Helpers
export { createSelectFilter, createDateFilter, createRangeFilter } from './helpers'
