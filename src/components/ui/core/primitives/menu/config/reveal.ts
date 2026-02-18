/**
 * Menu - Reveal Animation Configuration
 *
 * Animation variants and utilities for menu open/close reveal effect.
 * Direction-aware scale + slide animation based on menu side.
 *
 * @module prod/base/menu/config/reveal
 */

import type { Variants, Transition } from 'motion/react'
import type { MenuSide } from '../types'

// ============================================================================
// Constants
// ============================================================================

/** Expo ease-out for smooth deceleration (used in reveal animation) */
export const EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'

/** Reveal animation settings for menu open (default values) */
export const REVEAL_ANIMATION = {
  /** Animation duration in ms */
  duration: 200,
  /** Starting scale (0.4 = 40% of final size) */
  scaleStart: 0.4,
  /** Ending scale */
  scaleEnd: 1,
  /** Slide offset multiplier (0.5 = half of sideOffset) */
  slideOffsetRatio: 0.5,
} as const

/** Expo-out easing as array format for Motion */
export const REVEAL_EASING = [0.16, 1, 0.3, 1] as const

/** Motion-compatible transition (expo-out as array format) */
export const REVEAL_TRANSITION = {
  duration: REVEAL_ANIMATION.duration / 1000, // 0.2s
  ease: REVEAL_EASING,
}

// ============================================================================
// Types
// ============================================================================

/** Configuration for reveal variants */
export interface RevealVariantConfig {
  /** Menu side position */
  side: MenuSide
  /** Offset from trigger in pixels */
  sideOffset: number
  /** Starting scale (0-1), default 0.4 */
  scale?: number
  /** Slide offset ratio (0-1), default 0.5 */
  slideRatio?: number
  /** Enable exit animation, default true */
  animateOnClose?: boolean
}

// ============================================================================
// Factory Functions
// ============================================================================

/**
 * Factory for direction-aware reveal variants.
 * Creates scale + slide animation based on menu side.
 */
export function createRevealVariants(config: RevealVariantConfig): Variants {
  const {
    side,
    sideOffset,
    scale = REVEAL_ANIMATION.scaleStart,
    slideRatio = REVEAL_ANIMATION.slideOffsetRatio,
    animateOnClose = true,
  } = config

  const slideOffset = Math.round(sideOffset * slideRatio)
  // bottom = menu appears below trigger, animates upward (-1)
  // top = menu appears above trigger, animates downward (+1)
  const slideDirection = side === 'bottom' ? -1 : 1

  const hidden = {
    opacity: 0,
    scale,
    y: slideDirection * slideOffset,
  }

  const visible = {
    opacity: 1,
    scale: REVEAL_ANIMATION.scaleEnd,
    y: 0,
  }

  // Exit can be disabled (instant disappear) or mirror hidden state
  const exit = animateOnClose
    ? { opacity: 0, scale, y: slideDirection * slideOffset }
    : { opacity: 0 } // Instant fade for disabled exit

  return { hidden, visible, exit }
}

/**
 * Reduced motion variants - instant fade only, no scale/translate.
 */
export function createReducedMotionVariants(animateOnClose = true): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: animateOnClose ? { opacity: 0 } : { opacity: 0 },
  }
}

/**
 * Create reveal transition with custom duration.
 */
export function createRevealTransition(durationMs: number, slowMoScale = 1): Transition {
  return {
    duration: (durationMs / 1000) * slowMoScale,
    ease: [...REVEAL_EASING] as [number, number, number, number],
  }
}
