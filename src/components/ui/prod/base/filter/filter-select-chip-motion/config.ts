/**
 * FilterSelectChipMotion - Configuration
 *
 * Default configuration, size mappings, and animation utilities.
 * Optimized for performance with memoized lookups and stable references.
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
  TransitionType,
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
} as const

/**
 * Default style configuration
 */
export const DEFAULT_STYLE_CONFIG: StyleConfig = {
  gap: 'md',
  roundness: 'full',
  size: 'sm',
} as const

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
} as const

// ============================================================================
// ANIMATION PRESETS (for playground)
// ============================================================================

export type AnimationPreset = 'snappy' | 'smooth' | 'bouncy' | 'instant'

export const ANIMATION_PRESETS: Record<AnimationPreset, Partial<AnimationConfig>> = {
  snappy: {
    transitionType: 'tween',
    easing: 'expo',
    duration: 0.12,
    exitDuration: 0.05,
  },
  smooth: {
    transitionType: 'tween',
    easing: 'easeOut',
    duration: 0.2,
    exitDuration: 0.1,
  },
  bouncy: {
    transitionType: 'spring',
    stiffness: 400,
    damping: 20,
    exitDuration: 0.08,
  },
  instant: {
    transitionType: 'tween',
    easing: 'easeOut',
    duration: 0.05,
    exitDuration: 0.02,
  },
} as const

// ============================================================================
// HELPERS
// ============================================================================

// Cache for merged configs to avoid object recreation
const animationConfigCache = new WeakMap<Partial<AnimationConfig>, AnimationConfig>()
const styleConfigCache = new WeakMap<Partial<StyleConfig>, StyleConfig>()

/**
 * Merge partial animation config with defaults.
 * Caches results for object identity stability.
 */
export function mergeAnimationConfig(
  config?: Partial<AnimationConfig>
): AnimationConfig {
  if (!config) return DEFAULT_ANIMATION_CONFIG

  const cached = animationConfigCache.get(config)
  if (cached) return cached

  const merged = { ...DEFAULT_ANIMATION_CONFIG, ...config }
  animationConfigCache.set(config, merged)
  return merged
}

/**
 * Merge partial style config with defaults.
 * Caches results for object identity stability.
 */
export function mergeStyleConfig(
  config?: Partial<StyleConfig>
): StyleConfig {
  if (!config) return DEFAULT_STYLE_CONFIG

  const cached = styleConfigCache.get(config)
  if (cached) return cached

  const merged = { ...DEFAULT_STYLE_CONFIG, ...config }
  styleConfigCache.set(config, merged)
  return merged
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

// Layout transition type definitions
type SpringTransition = {
  type: 'spring'
  stiffness: number
  damping: number
}

type TweenTransition = {
  type: 'tween'
  duration: number
  ease: Easing
}

type LayoutTransition = SpringTransition | TweenTransition

// Cache for layout transitions (keyed by serialized config values)
const layoutTransitionCache = new Map<string, LayoutTransition>()

/**
 * Build a Motion transition object based on animation config.
 * Returns either a spring or tween transition.
 * Caches results for identical configurations.
 */
export function buildLayoutTransition(config: AnimationConfig): LayoutTransition {
  // Create cache key from relevant config values
  const cacheKey = config.transitionType === 'spring'
    ? `spring-${config.stiffness}-${config.damping}`
    : `tween-${config.duration}-${config.easing}`

  const cached = layoutTransitionCache.get(cacheKey)
  if (cached) return cached

  const transition: LayoutTransition = config.transitionType === 'spring'
    ? {
        type: 'spring' as const,
        stiffness: config.stiffness,
        damping: config.damping,
      }
    : {
        type: 'tween' as const,
        duration: config.duration,
        ease: EASING_CURVES[config.easing],
      }

  layoutTransitionCache.set(cacheKey, transition)
  return transition
}

/**
 * Get animation config from a preset name
 */
export function getPresetConfig(preset: AnimationPreset): AnimationConfig {
  return mergeAnimationConfig(ANIMATION_PRESETS[preset])
}

// ============================================================================
// PLAYGROUND OPTIONS (for control panel dropdowns)
// ============================================================================

export const TRANSITION_TYPE_OPTIONS: Array<{ label: string; value: TransitionType }> = [
  { label: 'Tween (Duration)', value: 'tween' },
  { label: 'Spring (Physics)', value: 'spring' },
]

export const EASING_OPTIONS: Array<{ label: string; value: EasingType }> = [
  { label: 'Ease Out', value: 'easeOut' },
  { label: 'Ease In-Out', value: 'easeInOut' },
  { label: 'Circ Out', value: 'circOut' },
  { label: 'Back Out (Overshoot)', value: 'backOut' },
  { label: 'Anticipate', value: 'anticipate' },
  { label: 'Expo (Punchy)', value: 'expo' },
]

export const SIZE_OPTIONS: Array<{ label: string; value: ChipSize }> = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
]

export const GAP_OPTIONS: Array<{ label: string; value: ChipGap }> = [
  { label: 'Small (8px)', value: 'sm' },
  { label: 'Medium (12px)', value: 'md' },
  { label: 'Large (16px)', value: 'lg' },
]

export const ROUNDNESS_OPTIONS: Array<{ label: string; value: ChipRoundness }> = [
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: 'Full (Pill)', value: 'full' },
]

export const PRESET_OPTIONS: Array<{ label: string; value: AnimationPreset }> = [
  { label: 'Snappy', value: 'snappy' },
  { label: 'Smooth', value: 'smooth' },
  { label: 'Bouncy', value: 'bouncy' },
  { label: 'Instant', value: 'instant' },
]
