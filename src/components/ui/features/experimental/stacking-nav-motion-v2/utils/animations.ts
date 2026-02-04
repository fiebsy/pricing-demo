/**
 * StackingNav V2 - Animation Utilities
 *
 * Helper functions for motion transitions.
 *
 * @module features/stacking-nav-v2/utils
 */

import type { Easing, TargetAndTransition } from 'motion/react'
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
    mass: config.mass,
    delay,
  }
}

/**
 * Get child entry offset for staggered appearance.
 *
 * Modes:
 * - entryInstant: No position animation, children appear at final position (only fade)
 * - entryFromParent: Children start at parent's anchored position and spread out
 * - default: Children start at configured X/Y offset and animate to final position
 *
 * @param config - Animation configuration
 * @param parentAnchoredOffset - Where the parent ends up after anchoring (peek offset)
 * @param targetOffset - Where children end up (their final x position)
 */
export function getChildEntryOffset(
  config: AnimationConfig,
  parentAnchoredOffset: number = 0,
  targetOffset: number = 0
) {
  if (config.entryInstant) {
    // No position animation - start at final position (only opacity/scale animate)
    return {
      x: targetOffset,
      y: 0,
    }
  }
  if (config.entryFromParent) {
    // Start at parent's anchored position (its end state)
    // Children animate FROM parentAnchoredOffset TO their targetOffset
    return {
      x: parentAnchoredOffset,
      y: 0,
    }
  }
  return {
    x: config.entryOffsetX,
    y: config.entryOffsetY,
  }
}

/**
 * Calculate stagger delay for child at given index during PROMOTION.
 * When isPromotingPhase is true, applies promotion sequencing logic:
 * - syncChildEntryToPromotion: ensures children wait for promotion to complete
 * - promotionChildOffset: adds extra delay during promotion
 */
export function getChildDelay(
  index: number,
  config: AnimationConfig,
  isPromotingPhase: boolean = false
): number {
  let baseDelay = config.childEntryDelay + index * config.stagger

  if (isPromotingPhase) {
    baseDelay += config.promotionChildOffset
    if (config.syncChildEntryToPromotion) {
      baseDelay = Math.max(baseDelay, config.promotionDuration)
    }
  }

  return baseDelay
}

/**
 * Calculate stagger delay for sibling at given index during DEMOTION.
 * Used for siblings reappearing when collapsing back to a level.
 */
export function getDemotionDelay(index: number, config: AnimationConfig): number {
  return config.demotionEntryDelay + index * config.demotionStagger
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
 * Get exit animation target values for items leaving the DOM.
 * When exitUseCustomTiming is false, inherits from the component-level transition prop.
 * When true, embeds its own transition for independent exit timing.
 *
 * @param config - Animation configuration
 * @param instant - If true, exit instantly (duration: 0)
 */
export function getExitAnimation(
  config: AnimationConfig,
  instant: boolean = false
): TargetAndTransition {
  const exit: TargetAndTransition = {
    opacity: 0,
    scale: config.exitScale,
  }

  if (instant) {
    exit.transition = {
      duration: 0,
    }
  } else if (config.exitUseCustomTiming) {
    exit.transition = {
      duration: config.exitDuration,
      ease: getEasingValue(config.exitEase),
      delay: config.exitDelay,
    }
  }

  return exit
}

/**
 * Get instant exit animation (no duration).
 * Use this when items should disappear immediately.
 */
export function getInstantExitAnimation(): TargetAndTransition {
  return {
    opacity: 0,
    scale: 1,
    transition: {
      duration: 0,
    },
  }
}

/**
 * Get collapse layout transition override.
 */
export function getCollapseLayoutTransition(config: AnimationConfig) {
  return {
    layout: {
      duration: config.collapseLayoutDuration / config.timeScale,
      ease: 'easeOut' as const,
    },
  }
}
