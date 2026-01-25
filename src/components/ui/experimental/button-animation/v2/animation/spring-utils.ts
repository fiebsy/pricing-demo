/**
 * ButtonAnimation V2 - Spring Utilities
 *
 * Transition factories for consistent spring physics.
 *
 * @module prod/base/button-animation-v2/animation
 */

import type { EaseType, AnimationConfig } from '../types'

// ============================================================================
// TYPES
// ============================================================================

export interface SpringTransition {
  type: 'spring'
  stiffness: number
  damping: number
  delay?: number
}

export interface DurationTransition {
  duration: number
  ease: Exclude<EaseType, 'spring'>
  delay?: number
}

export type TransitionConfig = SpringTransition | DurationTransition

// ============================================================================
// TRANSITION FACTORY
// ============================================================================

/**
 * Creates a Motion transition configuration from animation config.
 * Used for the main/active button.
 */
export function getTransition(
  config: AnimationConfig,
  delay = 0
): TransitionConfig {
  if (config.ease === 'spring') {
    return {
      type: 'spring',
      stiffness: config.stiffness,
      damping: config.damping,
      ...(delay > 0 && { delay }),
    }
  }

  return {
    duration: config.duration,
    ease: config.ease,
    ...(delay > 0 && { delay }),
  }
}

/**
 * Creates a Motion transition configuration for child items.
 * Uses childEase, childStiffness/childDamping for potentially different feel.
 */
export function getChildTransition(
  config: AnimationConfig,
  delay = 0
): TransitionConfig {
  const totalDelay = config.childEntryDelay + delay
  const ease = config.childEase ?? config.ease

  if (ease === 'spring') {
    return {
      type: 'spring',
      stiffness: config.childStiffness,
      damping: config.childDamping,
      ...(totalDelay > 0 && { delay: totalDelay }),
    }
  }

  return {
    duration: config.childDuration ?? config.duration,
    ease,
    ...(totalDelay > 0 && { delay: totalDelay }),
  }
}

/**
 * Creates an exit-optimized transition.
 */
export function getExitTransition(duration: number): DurationTransition {
  return {
    duration,
    ease: 'easeOut',
  }
}

// ============================================================================
// PRESET SPRINGS
// ============================================================================

export const SPRING_PRESETS = {
  snappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
  },
  smooth: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
  stiff: {
    type: 'spring' as const,
    stiffness: 600,
    damping: 40,
  },
} as const
