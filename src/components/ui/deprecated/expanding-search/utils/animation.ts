/**
 * Expanding Search - Animation Utilities
 *
 * Pure functions for calculating animation timing and opacity transitions.
 *
 * @module expanding-search/utils/animation
 */

import { EASING, OPACITY_FADE_RATIO } from '../config'
import type { RevealMode, HideMode } from '../types'

// ============================================================================
// Types
// ============================================================================

export interface AnimationState {
  isExpanded: boolean
  animationComplete: boolean
}

export interface AnimationConfig {
  duration: number
  collapseDuration: number
  revealMode: RevealMode
  hideMode: HideMode
}

export interface AnimationStyles {
  containerTransition: string
  contentOpacity: number
  contentTransition: string
}

// ============================================================================
// Animation Calculations
// ============================================================================

/**
 * Calculate content opacity based on reveal mode and animation state
 */
export function getContentOpacity(
  state: AnimationState,
  revealMode: RevealMode
): number {
  if (!state.isExpanded) return 0
  if (revealMode === 'sync') return state.animationComplete ? 1 : 0
  return 1
}

/**
 * Calculate content transition CSS based on reveal/hide modes
 */
export function getContentTransition(
  state: AnimationState,
  config: AnimationConfig
): string {
  const { duration, collapseDuration, revealMode, hideMode } = config

  // Close transition based on hideMode
  if (!state.isExpanded) {
    switch (hideMode) {
      case 'instant':
        return 'opacity 0ms linear'
      case 'immediate':
        return `opacity ${collapseDuration}ms ${EASING}`
      case 'fade':
      default:
        return `opacity ${collapseDuration}ms ease-out`
    }
  }

  // Open transition based on revealMode
  switch (revealMode) {
    case 'immediate':
      return `opacity ${duration}ms ${EASING}`
    case 'fade':
      return `opacity ${duration * OPACITY_FADE_RATIO}ms ${EASING} ${duration * (1 - OPACITY_FADE_RATIO)}ms`
    case 'delay':
      return `opacity 1ms linear ${duration}ms`
    case 'sync':
      return 'opacity 1ms linear'
    default:
      return `opacity ${duration * OPACITY_FADE_RATIO}ms ${EASING}`
  }
}

/**
 * Build container width transition string
 */
export function getContainerTransition(duration: number): string {
  return `width ${duration}ms ${EASING}`
}

/**
 * Calculate all animation styles at once
 */
export function getAnimationStyles(
  state: AnimationState,
  config: AnimationConfig
): AnimationStyles {
  return {
    containerTransition: getContainerTransition(config.duration),
    contentOpacity: getContentOpacity(state, config.revealMode),
    contentTransition: getContentTransition(state, config),
  }
}
