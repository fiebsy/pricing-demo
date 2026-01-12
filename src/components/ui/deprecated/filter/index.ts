/**
 * Base UI Filter - Filter Components
 *
 * Production-ready filter components for adding and displaying active filters.
 *
 * ## Quick Start (Recommended)
 *
 * Use `FilterChip` for the simplest experience - it includes all defaults:
 *
 * ```tsx
 * import { FilterChip, AddFilterMenu } from '@/components/ui/filter'
 * import { CheckmarkCircle02Icon } from '@hugeicons-pro/core-stroke-rounded'
 *
 * // Simple filter chip with icon
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter(id)}
 * />
 *
 * // Filter chip with label instead of icon
 * <FilterChip
 *   label="Status"
 *   value="Active"
 *   onRemove={() => removeFilter(id)}
 * />
 *
 * // Small preset
 * <FilterChip
 *   preset="small"
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   onRemove={() => removeFilter(id)}
 * />
 *
 * // Add filter menu (trigger + dropdown)
 * <AddFilterMenu
 *   onFilterSelect={(filterId) => handleSelect(filterId)}
 *   activeFilterIds={activeFilters.map(f => f.id)}
 * />
 * ```
 *
 * ## Components
 *
 * | Component | Description |
 * |-----------|-------------|
 * | `FilterChip` | **Recommended** - Simple wrapper with all defaults |
 * | `AddFilterMenu` | Trigger button + dropdown menu |
 * | `ExpandingFilterChip` | Low-level chip (use FilterChip instead) |
 * | `AnimatedChipWrapper` | Fade-in animation (built into FilterChip) |
 *
 * ## Presets
 *
 * | Preset | Height | Description |
 * |--------|--------|-------------|
 * | `'default'` | 32px | Standard size, fully rounded |
 * | `'small'` | 28px | Compact size, tighter spacing |
 *
 * ## Advanced Usage
 *
 * For custom configurations, pass `chipConfig`:
 *
 * ```tsx
 * <FilterChip
 *   icon={CheckmarkCircle02Icon}
 *   value="Active"
 *   chipConfig={{
 *     size: 'lg',
 *     rounded: 'md',
 *     background: 'tertiary',
 *   }}
 *   onRemove={() => removeFilter(id)}
 * />
 * ```
 *
 * @module base-ui/filter
 */

// =============================================================================
// COMPONENTS (Recommended)
// =============================================================================

/**
 * FilterChip - The recommended way to use filter chips
 * Includes all defaults, animation wrapper, and className generation
 */
export { FilterChip } from './components/filter-chip'

/**
 * AddFilterMenu - Trigger button + dropdown for adding filters
 */
export { AddFilterMenu } from './components/add-filter-menu'

// =============================================================================
// COMPONENTS (Advanced/Low-level)
// =============================================================================

/**
 * ExpandingFilterChip - Low-level chip component
 * Use FilterChip instead for simpler usage
 */
export { ExpandingFilterChip } from './components/expanding-filter-chip'
export { FilterHeader } from './components/filter-header'
export { AnimatedChipWrapper } from './components/animated-chip-wrapper'

// Hooks (for advanced/custom implementations)
export { useChipAnimation, useChipMeasurement } from './components/expanding-filter-chip'

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Build className from ChipStyleConfig
 * Used internally by FilterChip, exported for advanced use
 */
export { buildChipClassFromConfig } from './utils'

// =============================================================================
// PRIMITIVES
// =============================================================================

export { ChipBase, CloseButton, FilterTriggerButton } from './primitives'

// =============================================================================
// CONSTANTS
// =============================================================================

export {
  // Animation
  EASING_EXPO_OUT,
  EASING_EASE_OUT,
  DURATION_EXPAND,
  DURATION_COLLAPSE,
  DURATION_FADE_IN,
  DURATION_PANEL_TRANSITION,
  OPACITY_FADE_RATIO,
  OPACITY_CROSSFADE_RATIO,
  // Sizing
  SIZE_CONFIG,
  ROUNDING_CONFIG,
  GAP_CONFIG,
  TOUCH_TARGET_SIZE,
} from './constants'

// =============================================================================
// CONFIGURATION
// =============================================================================

export {
  DEFAULT_FILTER_STYLING_CONFIG,
  DEFAULT_FILTER_APPEARANCE,
  FILTER_MENU_PRESETS,
  getFilterPreset,
  stylingToAppearance,
  // Chip style presets
  DEFAULT_CHIP_STYLE,
  CHIP_STYLE_PRESETS,
  getChipStylePreset,
} from './config'

// =============================================================================
// DATA
// =============================================================================

export { DEFAULT_FILTER_MENU_ITEMS } from './data/filter-menu-items'

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Config types
  FilterMenuStylingConfig,
  FilterMenuPreset,
  HugeIconComponent,
  // Sizing types
  ChipSize,
  ChipRounding,
  ChipGap,
  ChipSizeConfig,
  // Component types
  ExpandingFilterChipProps,
  RevealMode,
  // Chip style preset types
  ChipStyleConfig,
  ChipStylePreset,
  ChipShineType,
  ChipShineIntensity,
  ChipShadowSize,
  ChipBackground,
  ChipCloseIconType,
  ChipDepthIntensity,
  ChipDepthColor,
  ChipDepthDirection,
  ChipRevealMode,
} from './types'

export type { FilterChipProps } from './components/filter-chip'
export type { AddFilterMenuProps } from './components/add-filter-menu'
export type { FilterHeaderProps } from './components/filter-header'
export type { AnimatedChipWrapperProps } from './components/animated-chip-wrapper'

// Primitive types
export type { ChipBaseProps, CloseButtonProps, FilterTriggerButtonProps } from './primitives'

// Hook types
export type {
  ChipAnimationOptions,
  ChipAnimationResult,
  ChipMeasurementRefs,
  ChipMeasurementResult,
} from './components/expanding-filter-chip'
