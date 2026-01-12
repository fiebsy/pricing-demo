/**
 * Filter System
 *
 * Complete filter component system including menu, chips, and triggers.
 * Built on Base UI primitives with PAYVA styling.
 *
 * @module prod/base/filter
 *
 * @example FilterMenu Usage
 * ```tsx
 * import { FilterMenu, FilterChip, FilterTrigger, FilterSelectChip } from '@/components/ui/prod/base/filter'
 *
 * <FilterMenu
 *   items={filterItems}
 *   onFilterSelect={(id) => handleSelect(id)}
 *   activeFilterIds={['status-active']}
 * />
 *
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter('status-active')}
 * />
 *
 * // Biaxial chip with value switching
 * <FilterSelectChip
 *   value={status}
 *   options={statusOptions}
 *   icon={CheckmarkCircle02Icon}
 *   onChange={setStatus}
 *   onRemove={() => setStatus(null)}
 * />
 * ```
 */

// ============================================================================
// Filter Menu
// ============================================================================

export {
  FilterMenu,
  FilterMenuHeader,
  DEFAULT_FILTER_ITEMS,
} from './filter-menu'

export type {
  FilterMenuProps,
  FilterMenuHeaderProps,
} from './filter-menu'

// ============================================================================
// Filter Chip
// ============================================================================

export {
  FilterChip,
  useChipAnimation,
  DEFAULT_CONFIG as DEFAULT_CHIP_CONFIG,
} from './filter-chip'

export type {
  FilterChipProps,
  ChipConfig,
  ChipSize,
  ChipRounded,
  RevealMode,
} from './filter-chip'

// ============================================================================
// Filter Trigger
// ============================================================================

export {
  FilterTrigger,
} from './filter-trigger'

export type {
  FilterTriggerProps,
  TriggerSize,
  TriggerRounded,
  TriggerVariant,
} from './filter-trigger'

// ============================================================================
// Filter Select Chip (Biaxial)
// ============================================================================

export {
  FilterSelectChip,
  DEFAULT_SELECT_CHIP_CONFIG,
} from './filter-select-chip'

export type {
  FilterSelectChipProps,
  FilterSelectChipConfig,
  FilterOption,
} from './filter-select-chip'

// ============================================================================
// Filter Select Chip Motion (Motion-based with AnimatePresence)
// ============================================================================

export {
  FilterSelectChipMotion,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  EASING_CURVES,
} from './filter-select-chip-motion'

export type {
  FilterSelectChipMotionProps,
  FilterChipData,
  AnimationConfig as MotionAnimationConfig,
  StyleConfig as MotionStyleConfig,
  TransitionType,
  EasingType,
} from './filter-select-chip-motion'

// ============================================================================
// Re-export Menu types for convenience
// ============================================================================

export type {
  MenuItemType,
  MenuItemAction,
  MenuItemSubmenu,
  MenuItemSeparator,
  MenuItemLabel,
  MenuSide,
  MenuAlign,
  MenuAppearance,
  AnimationConfig,
  IconType,
} from '../menu'
