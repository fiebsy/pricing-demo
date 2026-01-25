/**
 * FilterSelectChip
 *
 * Biaxial filter chip that expands into a dropdown menu for selecting filter values.
 * Combines the FilterChip trigger styling with a two-layer animation system.
 *
 * @module prod/base/filter/filter-select-chip
 *
 * @example
 * ```tsx
 * import { FilterSelectChip } from '@/components/ui/prod/base/filter'
 *
 * const STATUS_OPTIONS = [
 *   { id: 'active', label: 'Active' },
 *   { id: 'pending', label: 'Pending' },
 *   { id: 'completed', label: 'Completed' },
 * ]
 *
 * <FilterSelectChip
 *   value={status}
 *   options={STATUS_OPTIONS}
 *   icon={CheckmarkCircle02Icon}
 *   onChange={setStatus}
 *   onRemove={() => setStatus(null)}
 * />
 * ```
 */

// ============================================================================
// COMPONENT
// ============================================================================

export { FilterSelectChip } from './filter-select-chip'

// ============================================================================
// CONFIGURATION
// ============================================================================

export { DEFAULT_CONFIG as DEFAULT_SELECT_CHIP_CONFIG, mergeConfig, getChipSizeConfig } from './config'

// ============================================================================
// TYPES
// ============================================================================

export type {
  FilterSelectChipProps,
  FilterSelectChipConfig,
  FilterOption,
  OptionIconType,
  ChipTriggerProps,
  OptionListProps,
  OptionListRef,
  // Re-exported types
  ChipSize,
  ChipRounded,
  RevealMode,
  IconComponent,
} from './types'
