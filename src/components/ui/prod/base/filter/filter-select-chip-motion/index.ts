/**
 * FilterSelectChipMotion
 *
 * Motion-based filter chip with AnimatePresence + popLayout for fluid
 * add/remove animations. Uses Base UI Select for dropdown functionality.
 *
 * @module prod/base/filter/filter-select-chip-motion
 *
 * @example
 * ```tsx
 * import { FilterSelectChipMotion } from '@/components/ui/prod/base/filter'
 *
 * const FILTERS = [
 *   {
 *     id: 'status',
 *     label: 'Status',
 *     value: 'active',
 *     options: [
 *       { id: 'all', label: 'All' },
 *       { id: 'active', label: 'Active' },
 *       { id: 'pending', label: 'Pending' },
 *     ],
 *   },
 * ]
 *
 * <FilterSelectChipMotion
 *   filters={filters}
 *   onFilterChange={(id, value) => updateFilter(id, value)}
 *   onFilterRemove={(id) => removeFilter(id)}
 *   animationConfig={{ transitionType: 'tween', duration: 0.15 }}
 *   styleConfig={{ size: 'sm', roundness: 'full' }}
 * />
 * ```
 */

// ============================================================================
// COMPONENT
// ============================================================================

export { FilterSelectChipMotion } from './filter-select-chip-motion'

// ============================================================================
// CONFIGURATION
// ============================================================================

export {
  // Defaults
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  // Mappings
  SIZE_MAP,
  GAP_MAP,
  ROUNDNESS_MAP,
  EASING_CURVES,
  ANIMATION_PRESETS,
  // Helpers
  mergeAnimationConfig,
  mergeStyleConfig,
  getSizeConfig,
  getGapClass,
  getRoundnessClass,
  buildLayoutTransition,
  getPresetConfig,
  // Playground options (for control panels)
  TRANSITION_TYPE_OPTIONS,
  EASING_OPTIONS,
  SIZE_OPTIONS,
  GAP_OPTIONS,
  ROUNDNESS_OPTIONS,
  PRESET_OPTIONS,
} from './config'

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Main props
  FilterSelectChipMotionProps,
  // Data types
  FilterChipData,
  FilterOption,
  // Config types
  AnimationConfig,
  StyleConfig,
  SizeConfig,
  // Enum types
  TransitionType,
  EasingType,
  EntryDirection,
  ChipGap,
  ChipRoundness,
  ChipSize,
  IconComponent,
  // Internal component props (for extension)
  AnimatedChipProps,
  ChipTriggerProps,
  ChipPopupProps,
  OptionItemProps,
  RemoveButtonProps,
} from './types'

export type { AnimationPreset } from './config'

// ============================================================================
// SUBCOMPONENTS (for advanced composition)
// ============================================================================

export {
  AnimatedChip,
  ChipTrigger,
  ChipPopup,
  OptionItem,
  RemoveButton,
} from './components'
