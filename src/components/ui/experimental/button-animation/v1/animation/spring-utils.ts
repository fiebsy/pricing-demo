/**
 * ButtonAnimation - Spring Utilities
 *
 * Transition factory functions for consistent spring physics.
 * Abstracted for reusability and easy tuning across components.
 *
 * @module prod/base/button-animation/animation
 */

import type { EaseType } from '../types'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Spring transition configuration.
 */
export interface SpringTransition {
  type: 'spring'
  stiffness: number
  damping: number
  delay?: number
}

/**
 * Duration-based transition configuration.
 */
export interface DurationTransition {
  duration: number
  ease: Exclude<EaseType, 'spring'>
  delay?: number
}

/**
 * Union of all transition types.
 */
export type TransitionConfig = SpringTransition | DurationTransition

/**
 * Input parameters for transition creation.
 */
export interface TransitionParams {
  duration: number
  ease: EaseType
  stiffness: number
  damping: number
}

// ============================================================================
// TRANSITION FACTORY
// ============================================================================

/**
 * Creates a Motion transition configuration based on ease type.
 *
 * When ease is 'spring', returns spring physics config.
 * Otherwise, returns duration-based easing config.
 *
 * @param params - Animation parameters
 * @param delay - Optional delay before animation starts (seconds)
 * @returns Motion-compatible transition object
 *
 * @example
 * ```ts
 * // Spring transition
 * getTransition({ ease: 'spring', stiffness: 500, damping: 35 })
 * // → { type: 'spring', stiffness: 500, damping: 35 }
 *
 * // Duration transition
 * getTransition({ ease: 'easeOut', duration: 0.2 })
 * // → { duration: 0.2, ease: 'easeOut' }
 * ```
 */
export function getTransition(
  params: TransitionParams,
  delay = 0
): TransitionConfig {
  if (params.ease === 'spring') {
    return {
      type: 'spring',
      stiffness: params.stiffness,
      damping: params.damping,
      ...(delay > 0 && { delay }),
    }
  }

  return {
    duration: params.duration,
    ease: params.ease,
    ...(delay > 0 && { delay }),
  }
}

// ============================================================================
// PRESET SPRINGS
// ============================================================================

/**
 * Preset spring configurations for common use cases.
 *
 * These are tuned for:
 * - snappy: Fast, responsive interactions (buttons, chips)
 * - smooth: Balanced, natural motion (modals, panels)
 * - bouncy: Playful, elastic motion (notifications, badges)
 * - stiff: Immediate, no overshoot (tooltips, menus)
 */
export const SPRING_PRESETS = {
  /**
   * Fast, responsive spring for interactive elements.
   * Minimal overshoot, quick settling.
   */
  snappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
  },

  /**
   * Balanced spring for general animations.
   * Natural feel with controlled settling.
   */
  smooth: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },

  /**
   * Elastic spring for attention-grabbing motion.
   * Noticeable overshoot, playful feel.
   */
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },

  /**
   * Very stiff spring for near-instant motion.
   * Almost no overshoot, immediate response.
   */
  stiff: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 40,
  },
} as const

// ============================================================================
// EXIT TRANSITIONS
// ============================================================================

/**
 * Creates an exit-optimized transition.
 *
 * Exit animations should be faster than entries to feel snappy.
 * This helper creates appropriate duration-based exits.
 *
 * @param duration - Exit duration in seconds
 * @returns Motion-compatible transition object
 */
export function getExitTransition(duration: number): DurationTransition {
  return {
    duration,
    ease: 'easeOut',
  }
}
