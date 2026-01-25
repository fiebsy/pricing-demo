/**
 * StickyDataTable V2 - Filter Helpers
 *
 * Helper functions for creating filter configurations.
 *
 * @module types/filter/helpers
 */

import type {
  FilterOption,
  DateRangePreset,
  RangePreset,
  SelectFilterConfig,
  DateFilterConfig,
  RangeFilterConfig,
} from './config.types'
import { DEFAULT_DATE_PRESETS } from './presets'

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
