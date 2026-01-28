/**
 * ButtonAnimation V3 - Animation Utilities
 *
 * Clean animation helpers for motion transitions.
 *
 * @module prod/base/button-animation-v3/utils
 */

import type { AnimationConfig } from '../types'

/**
 * Get spring transition config.
 */
export function getSpringTransition(config: AnimationConfig) {
  return {
    type: 'spring' as const,
    stiffness: config.stiffness,
    damping: config.damping,
  }
}

/**
 * Get child entry offset based on index.
 */
export function getChildEntryOffset(config: AnimationConfig) {
  return {
    x: 0,
    y: config.entryDistance,
  }
}

/**
 * Calculate stagger delay for child at given index.
 */
export function getChildDelay(index: number, config: AnimationConfig): number {
  return config.childEntryDelay + index * config.stagger
}

/**
 * Get promotion animation config.
 * This is the key animation that fixes the child-to-parent transition.
 */
export function getPromotionAnimation(config: AnimationConfig) {
  return {
    scale: [1, config.promotionScale, 1],
    transition: {
      duration: config.promotionDuration,
      times: [0, 0.5, 1],
      ease: 'easeInOut' as const,
    },
  }
}

/**
 * Get exit animation config.
 */
export function getExitAnimation(config: AnimationConfig) {
  return {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: config.exitDuration,
      ease: 'easeOut' as const,
    },
  }
}