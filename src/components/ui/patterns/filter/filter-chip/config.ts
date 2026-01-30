/**
 * Filter Chip - Configuration
 *
 * @module prod/base/filter/filter-chip/config
 */

import type { ChipSize, ChipRounded, ChipConfig } from './types'

// ============================================================================
// Animation Constants
// ============================================================================

export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
export const DURATION_EXPAND = 300
export const DURATION_COLLAPSE = 75
export const OPACITY_FADE_RATIO = 0.2

// ============================================================================
// Size Configuration
// ============================================================================

export interface SizeConfig {
  height: number
  paddingX: number
  textClass: string
  iconSize: number
  closeSize: number
}

export const SIZE_CONFIGS: Record<ChipSize, SizeConfig> = {
  xs: { height: 24, paddingX: 8, textClass: 'text-xs', iconSize: 12, closeSize: 12 },
  sm: { height: 28, paddingX: 10, textClass: 'text-xs', iconSize: 14, closeSize: 14 },
  md: { height: 32, paddingX: 12, textClass: 'text-sm', iconSize: 16, closeSize: 16 },
  lg: { height: 36, paddingX: 14, textClass: 'text-sm', iconSize: 18, closeSize: 18 },
}

export const ROUNDED_CLASSES: Record<ChipRounded, string> = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
}

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_CONFIG: Required<ChipConfig> = {
  size: 'md',
  rounded: 'full',
  iconSize: 14,
  closeSize: 16,
  duration: 200,
  revealMode: 'fade',
  opacityFadeRatio: OPACITY_FADE_RATIO,
  iconOpacity: 0.5,
  iconValueGap: 4,
  valueCloseGap: 10,
  paddingLeft: 8,
  paddingRight: 6,
}

// ============================================================================
// Helpers
// ============================================================================

export function mergeConfig(config?: ChipConfig): Required<ChipConfig> {
  return { ...DEFAULT_CONFIG, ...config }
}

export function getSizeConfig(size: ChipSize): SizeConfig {
  return SIZE_CONFIGS[size]
}
