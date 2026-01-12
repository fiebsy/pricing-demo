/**
 * FilterSelectChipMotion - Configuration
 *
 * Default configuration, size mappings, and animation utilities.
 *
 * @module prod/base/filter/filter-select-chip-motion/config
 */

import type { Easing } from 'motion/react'

import type {
  AnimationConfig,
  StyleConfig,
  SizeConfig,
  ChipSize,
  ChipGap,
  ChipRoundness,
  EasingType,
} from './types'

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

/**
 * Default animation configuration
 *
 * Optimized for smooth, fast transitions that feel responsive.
 * Tween with easeOut provides predictable timing.
 */
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  transitionType: 'tween',
  easing: 'easeOut',
  duration: 0.15,
  stagger: 0,
  entryDirection: 'right',
  entryDistance: 16,
  stiffness: 500,
  damping: 30,
  exitDuration: 0.05,
}

/**
 * Default style configuration
 */
export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  gap: 'md',
  roundness: 'full',
  size: 'sm',
}

// ============================================================================
// SIZE MAPPINGS
// ============================================================================

export const SIZE_MAP: Record<ChipSize, SizeConfig> = {
  sm: { height: 28, text: 'text-xs', padding: 'px-2.5', iconSize: 14 },
  md: { height: 32, text: 'text-sm', padding: 'px-3', iconSize: 16 },
  lg: { height: 36, text: 'text-sm', padding: 'px-3.5', iconSize: 18 },
} as const

export const GAP_MAP: Record<ChipGap, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
} as const

export const ROUNDNESS_MAP: Record<ChipRoundness, string> = {
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
} as const

// ============================================================================
// EASING CURVES
// ============================================================================

/**
 * Cubic bezier curves for tween transitions.
 * Each curve is optimized for specific motion characteristics.
 */
export const EASING_CURVES: Record<EasingType, Easing> = {
  /** Standard ease out - smooth deceleration */
  easeOut: [0.33, 1, 0.68, 1],
  /** Symmetric ease in/out */
  easeInOut: [0.65, 0, 0.35, 1],
  /** Circular ease out - quick start, smooth end */
  circOut: [0, 0.55, 0.45, 1],
  /** Back ease out - slight overshoot */
  backOut: [0.34, 1.56, 0.64, 1],
  /** Anticipate - pullback before moving (Motion built-in) */
  anticipate: 'anticipate',
  /** Expo ease out - very punchy, snappy feel */
  expo: [0.16, 1, 0.3, 1],
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Merge partial animation config with defaults
 */
export function mergeAnimationConfig(
  config?: Partial<AnimationConfig>
): AnimationConfig {
  if (!config) return DEFAULT_ANIMATION_CONFIG
  return { ...DEFAULT_ANIMATION_CONFIG, ...config }
}

/**
 * Merge partial style config with defaults
 */
export function mergeStyleConfig(
  config?: Partial<StyleConfig>
): StyleConfig {
  if (!config) return DEFAULT_STYLE_CONFIG
  return { ...DEFAULT_STYLE_CONFIG, ...config }
}

/**
 * Get size configuration for a given size preset
 */
export function getSizeConfig(size: ChipSize): SizeConfig {
  return SIZE_MAP[size]
}

/**
 * Get gap class for a given gap preset
 */
export function getGapClass(gap: ChipGap): string {
  return GAP_MAP[gap]
}

/**
 * Get roundness class for a given roundness preset
 */
export function getRoundnessClass(roundness: ChipRoundness): string {
  return ROUNDNESS_MAP[roundness]
}

/**
 * Build a Motion transition object based on animation config.
 * Returns either a spring or tween transition.
 */
export function buildLayoutTransition(config: AnimationConfig) {
  if (config.transitionType === 'spring') {
    return {
      type: 'spring' as const,
      stiffness: config.stiffness,
      damping: config.damping,
    }
  }

  return {
    type: 'tween' as const,
    duration: config.duration,
    ease: EASING_CURVES[config.easing],
  }
}
