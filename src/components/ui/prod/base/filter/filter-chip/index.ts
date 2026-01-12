/**
 * Filter Chip
 *
 * Expanding filter chip that animates from icon to full value display.
 *
 * @module prod/base/filter/filter-chip
 *
 * @example Basic Usage
 * ```tsx
 * import { FilterChip } from '@/components/ui/prod/base/filter/filter-chip'
 * import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
 *
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter('status-active')}
 * />
 * ```
 */

export { FilterChip } from './filter-chip'
export { useChipAnimation } from './use-chip-animation'

export {
  DEFAULT_CONFIG,
  SIZE_CONFIGS,
  ROUNDED_CLASSES,
  EASING_EXPO_OUT,
  DURATION_EXPAND,
  DURATION_COLLAPSE,
  mergeConfig,
  getSizeConfig,
} from './config'

export type {
  FilterChipProps,
  ChipConfig,
  ChipSize,
  ChipRounded,
  RevealMode,
  IconComponent,
  ChipAnimationOptions,
  ChipAnimationResult,
} from './types'
