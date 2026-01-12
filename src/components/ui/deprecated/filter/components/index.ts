/**
 * Filter Components Index
 *
 * @module base-ui/filter/components
 */

// FilterChip - Recommended wrapper
export { FilterChip } from './filter-chip'
export type { FilterChipProps } from './filter-chip'

// Expanding Filter Chip (folder-based)
export { ExpandingFilterChip } from './expanding-filter-chip'
export type { ExpandingFilterChipProps } from './expanding-filter-chip'
export { useChipAnimation, useChipMeasurement } from './expanding-filter-chip'
export type {
  RevealMode,
  ChipAnimationOptions,
  ChipAnimationResult,
  ChipMeasurementRefs,
  ChipMeasurementResult,
} from './expanding-filter-chip'

// Filter Header
export { FilterHeader } from './filter-header'
export type { FilterHeaderProps } from './filter-header'

// Add Filter Menu
export { AddFilterMenu } from './add-filter-menu'
export type { AddFilterMenuProps } from './add-filter-menu'

// Animated Chip Wrapper
export { AnimatedChipWrapper } from './animated-chip-wrapper'
export type { AnimatedChipWrapperProps } from './animated-chip-wrapper'
