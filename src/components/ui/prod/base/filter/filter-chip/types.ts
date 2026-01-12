/**
 * Filter Chip - Type Definitions
 *
 * @module prod/base/filter/filter-chip/types
 */

// ============================================================================
// Icon Type
// ============================================================================

/**
 * Icon component type - accepts HugeIcons array format or wrapped default export
 *
 * HugeIcons can export in different formats depending on how they're imported.
 * The HugeIcon component handles extraction internally.
 *
 * @example
 * import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
 * <FilterChip icon={CheckmarkCircle02Icon} value="Active" />
 */
export type IconComponent = unknown

// ============================================================================
// Size & Style Types
// ============================================================================

export type ChipSize = 'xs' | 'sm' | 'md' | 'lg'
export type ChipRounded = 'sm' | 'md' | 'lg' | 'full'

/** Reveal mode for value text animation */
export type RevealMode = 'fade' | 'delay' | 'sync' | 'instant' | 'none'

// ============================================================================
// Configuration
// ============================================================================

export interface ChipConfig {
  /** Size preset */
  size?: ChipSize
  /** Border radius */
  rounded?: ChipRounded
  /** Icon size in pixels */
  iconSize?: number
  /** Close button size in pixels */
  closeSize?: number
  /** Animation duration in ms */
  duration?: number
  /** Reveal animation mode */
  revealMode?: RevealMode
  /** Opacity fade ratio for 'fade' mode (0.1 = 10% of duration, 1.0 = full duration) */
  opacityFadeRatio?: number
  /** Left icon opacity (0-1) */
  iconOpacity?: number
  /** Gap between icon and value */
  iconValueGap?: number
  /** Gap between value and close button */
  valueCloseGap?: number
  /** Left padding */
  paddingLeft?: number
  /** Right padding */
  paddingRight?: number
}

// ============================================================================
// Component Props
// ============================================================================

export interface FilterChipProps {
  /** Value text displayed when expanded */
  value: string
  /** Icon to display (takes precedence over label) */
  icon?: IconComponent
  /** Text label to display if no icon */
  label?: string
  /** Called when close button is clicked */
  onRemove?: () => void
  /** Chip configuration */
  config?: ChipConfig
  /** Start in expanded state */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Additional className */
  className?: string
}

// ============================================================================
// Animation Hook Types
// ============================================================================

export interface ChipAnimationOptions {
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  duration?: number
  revealMode?: RevealMode
  opacityFadeRatio?: number
}

export interface ChipAnimationResult {
  isExpanded: boolean
  widthComplete: boolean
  toggle: () => void
  onTransitionEnd: (e: React.TransitionEvent) => void
  getContentOpacity: () => number
  getContentTransition: () => string
  getContainerTransition: () => string
}
