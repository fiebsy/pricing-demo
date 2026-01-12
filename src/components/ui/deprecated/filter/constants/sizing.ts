/**
 * Filter Sizing Constants
 *
 * Shared sizing configurations for filter chips and related components.
 * Provides consistent size presets across all filter UI elements.
 *
 * @module base-ui/filter/constants/sizing
 */

// ============================================================================
// Types
// ============================================================================

export type ChipSize = 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl'
export type ChipRounding = 'none' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'full'
export type ChipGap = 'none' | 'xs' | 'sm' | 'default' | 'md' | 'lg'

export interface ChipSizeConfig {
  height: number
  paddingX: number
  textClass: string
  iconSize: number
  closeIconSize: number
}

// ============================================================================
// Size Configurations
// ============================================================================

export const SIZE_CONFIG: Record<ChipSize, ChipSizeConfig> = {
  xs: { height: 24, paddingX: 8, textClass: 'text-xs', iconSize: 12, closeIconSize: 10 },
  sm: { height: 28, paddingX: 10, textClass: 'text-xs', iconSize: 14, closeIconSize: 12 },
  default: { height: 32, paddingX: 12, textClass: 'text-sm', iconSize: 16, closeIconSize: 14 },
  md: { height: 36, paddingX: 14, textClass: 'text-sm', iconSize: 18, closeIconSize: 14 },
  lg: { height: 40, paddingX: 16, textClass: 'text-sm', iconSize: 20, closeIconSize: 16 },
  xl: { height: 44, paddingX: 18, textClass: 'text-base', iconSize: 22, closeIconSize: 16 },
}

// ============================================================================
// Rounding Configurations
// ============================================================================

export const ROUNDING_CONFIG: Record<ChipRounding, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  default: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  full: 'rounded-full',
}

// ============================================================================
// Gap Configurations
// ============================================================================

export const GAP_CONFIG: Record<ChipGap, number> = {
  none: 0,
  xs: 4,
  sm: 6,
  default: 8,
  md: 10,
  lg: 12,
}

// ============================================================================
// Touch Target Constants
// ============================================================================

/** Standard touch target size for interactive elements (px) */
export const TOUCH_TARGET_SIZE = 40
