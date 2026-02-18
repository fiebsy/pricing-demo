/**
 * Menu - Spring Animation Configuration
 *
 * Spring presets and utilities for physics-based animations.
 * Used for panel slide and height transitions.
 *
 * @module prod/base/menu/config/spring
 */

import type { AnimationConfig, SpringPreset } from '../types'

// ============================================================================
// Spring Presets
// ============================================================================

/**
 * Spring presets for physics-based animations.
 * Each preset defines stiffness, damping, and mass values.
 *
 * Curated based on Motion.dev spring visualization:
 * - default: Balanced, minimal overshoot - reliable for most UI
 * - snappy: Quick response with subtle bounce - responsive feel
 * - smooth: Gentle, relaxed - elegant transitions
 * - bouncy: Playful with visible overshoot - fun interactions
 */
export const SPRING_PRESETS: Record<Exclude<SpringPreset, 'custom'>, { stiffness: number; damping: number; mass: number }> = {
  default: { stiffness: 650, damping: 38, mass: 0.9 },
  snappy: { stiffness: 700, damping: 28, mass: 0.8 },
  smooth: { stiffness: 400, damping: 30, mass: 1 },
  bouncy: { stiffness: 600, damping: 20, mass: 1 },
} as const

// ============================================================================
// Spring Utilities
// ============================================================================

/**
 * Get spring configuration from preset or custom values.
 */
export function getSpringConfig(animation: AnimationConfig): { stiffness: number; damping: number; mass: number } {
  if (animation.springPreset && animation.springPreset !== 'custom') {
    return SPRING_PRESETS[animation.springPreset]
  }
  return {
    stiffness: animation.springStiffness ?? 650,
    damping: animation.springDamping ?? 38,
    mass: animation.springMass ?? 0.9,
  }
}

/**
 * Empirical divisor for spring settling time approximation.
 * ~8000 / damping gives reasonable approximation:
 * damping=30 -> ~267ms, damping=15 -> ~533ms, damping=45 -> ~178ms
 */
const SPRING_SETTLING_DIVISOR = 8000

/**
 * Approximate spring settling time based on damping.
 * Higher damping = faster settling.
 * Used for syncing opacity to spring duration.
 */
export function getSpringSettlingTime(damping: number): number {
  return Math.round(SPRING_SETTLING_DIVISOR / damping)
}
