/**
 * Filter System Types - Re-export for backward compatibility
 *
 * @deprecated Import from './types/filter.types' or './types' instead
 * @module filter-types
 */

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
  ActiveFilter,
  FilterState,
  FilterToolbarProps,
} from './types/filter.types'

export {
  DEFAULT_DATE_PRESETS,
  createSelectFilter,
  createDateFilter,
  createRangeFilter,
} from './types/filter.types'
