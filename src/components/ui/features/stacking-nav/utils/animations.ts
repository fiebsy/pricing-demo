/**
 * StackingNav - Animation Utilities
 *
 * Helper functions for motion transitions.
 *
 * @module features/stacking-nav/utils
 */

import type { Easing } from 'motion/react'
import type { AnimationConfig, EasingType } from '../types'

/**
 * Map easing type to Framer Motion easing values.
 */
export function getEasingValue(ease: EasingType): Easing {
  const easingMap: Record<EasingType, Easing> = {
    linear: 'linear',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
    circIn: 'circIn',
    circOut: 'circOut',
    circInOut: 'circInOut',
    backIn: 'backIn',
    backOut: 'backOut',
    backInOut: 'backInOut',
    anticipate: 'anticipate',
    expoIn: [0.7, 0, 0.84, 0],
    expoOut: [0.16, 1, 0.3, 1],
    expoInOut: [0.87, 0, 0.13, 1],
  }
  return easingMap[ease] || 'easeOut'
}

/**
 * Get transition config based on animation type (spring or tween).
 */
export function getTransition(config: AnimationConfig, delay?: number) {
  if (config.type === 'tween') {
    return {
      type: 'tween' as const,
      duration: config.duration,
      ease: getEasingValue(config.ease),
      delay,
    }
  }
  
  return {
    type: 'spring' as const,
    stiffness: config.stiffness,
    damping: config.damping,
    delay,
  }
}

/**
 * Get spring transition config for motion.
 * @deprecated Use getTransition instead
 */
export function getSpringTransition(config: AnimationConfig) {
  return {
    type: 'spring' as const,
    stiffness: config.stiffness,
    damping: config.damping,
  }
}

/**
 * Get child entry offset for staggered appearance.
 */
export function getChildEntryOffset(config: AnimationConfig) {
  return {
    x: config.entryOffsetX,
    y: config.entryOffsetY,
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
 * This animation plays when a child becomes a parent (expands children).
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
 * Get exit animation config for items leaving the DOM.
 */
export function getExitAnimation(config: AnimationConfig) {
  return {
    opacity: 0,
    scale: config.exitScale,
    transition: {
      duration: config.exitDuration,
      ease: getEasingValue(config.ease),
    },
  }
}
