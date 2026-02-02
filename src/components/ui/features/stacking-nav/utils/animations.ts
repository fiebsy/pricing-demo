/**
 * StackingNav - Animation Utilities
 *
 * Helper functions for motion transitions.
 *
 * @module features/stacking-nav/utils
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
    delay,
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
 * Convert an easing type to a CSS-compatible easing string.
 * Maps framer-motion easing names to CSS cubic-bezier equivalents.
 */
export function getEasingCSS(ease: EasingType): string {
  const map: Record<EasingType, string> = {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
    circOut: 'cubic-bezier(0, 0.55, 0.45, 1)',
    circInOut: 'cubic-bezier(0.85, 0, 0.15, 1)',
    backIn: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    backInOut: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    anticipate: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    expoIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expoInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
  }
  return map[ease] || 'ease-out'
}

/**
 * Get a CSS transition string for clip-path that matches the framer-motion transition.
 *
 * For tween: uses the exact same duration and easing (duration is already time-scaled).
 * For spring: approximates the settling time from damping (also already time-scaled).
 */
export function getClipTransitionCSS(config: AnimationConfig): string {
  if (config.type === 'tween') {
    return `clip-path ${config.duration}s ${getEasingCSS(config.ease)}`
  }
  // Spring settling time ≈ 8/damping for underdamped systems.
  // config.damping is already time-scaled (damping * timeScale) from the playground,
  // so slower timeScale → smaller damping → longer duration automatically.
  const approxDuration = 8 / config.damping
  return `clip-path ${approxDuration}s cubic-bezier(0.22, 1, 0.36, 1)`
}

/**
 * Get exit animation target values for items leaving the DOM.
 * When exitUseCustomTiming is false, inherits from the component-level transition prop.
 * When true, embeds its own transition for independent exit timing.
 */
export function getExitAnimation(config: AnimationConfig): TargetAndTransition {
  const exit: TargetAndTransition = {
    opacity: 0,
    scale: config.exitScale,
  }

  if (config.exitUseCustomTiming) {
    exit.transition = {
      duration: config.exitDuration,
      ease: getEasingValue(config.exitEase),
      delay: config.exitDelay,
    }
  }

  return exit
}
