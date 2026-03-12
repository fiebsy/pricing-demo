/**
 * Fluid Button Group Constants
 *
 * Timing presets and default values for fluid button animations.
 */

import type { FluidTiming, FluidTimingPreset, FluidBlurConfig } from './types'

// ============================================================================
// Timing Presets
// ============================================================================

/**
 * Timing presets for different animation feels.
 *
 * Key insight: Independent timing for collapse vs expand creates a polished
 * feel where the exiting button clears quickly while the remaining button
 * takes its time filling the space.
 */
export const TIMING_PRESETS: Record<FluidTimingPreset, FluidTiming> = {
  /**
   * Default: Balanced timing that feels natural.
   * - Fast collapse (250ms) clears space quickly
   * - Slow expand (525ms) fills space gracefully
   */
  default: {
    collapseDuration: 250,
    expandDuration: 525,
    showBothDuration: 300,
    collapseEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    expandEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    expandDelay: 0,
  },

  /**
   * Snappy: Quick, responsive feel for UI that needs to feel immediate.
   * Good for confirmation dialogs or time-sensitive interactions.
   */
  snappy: {
    collapseDuration: 150,
    expandDuration: 300,
    showBothDuration: 200,
    collapseEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expandEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expandDelay: 0,
  },

  /**
   * Smooth: Slower, more deliberate transitions.
   * Good for important state changes that benefit from visual emphasis.
   */
  smooth: {
    collapseDuration: 400,
    expandDuration: 700,
    showBothDuration: 450,
    collapseEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    expandEasing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    expandDelay: 50,
  },
} as const

// ============================================================================
// Default Values
// ============================================================================

export const DEFAULT_GAP = 8

export const DEFAULT_BLUR_CONFIG: FluidBlurConfig = {
  enabled: true,
  amount: 2,
  duration: 120,
}

// ============================================================================
// Opacity Timing
// ============================================================================

/**
 * Opacity timing ratios relative to main animation.
 * These create a pleasing fade that completes before width animation.
 */
export const OPACITY_TIMING = {
  /** Ratio of collapse duration for exit opacity */
  exitRatio: 0.6,
  /** Ratio of show duration for enter opacity */
  enterRatio: 0.67,
  /** Fixed duration for text fade (faster than container) */
  textExitDuration: 150,
} as const
