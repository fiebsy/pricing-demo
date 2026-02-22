/**
 * useFluidTiming Hook
 *
 * Encapsulates timing calculations for fluid button animations.
 * Handles preset resolution, slow-mo multiplier, and sync-to-expand logic.
 */

import { useMemo } from 'react'
import type { FluidTimingPreset, FluidTiming, FluidBlurConfig } from '../types'
import { TIMING_PRESETS, DEFAULT_BLUR_CONFIG, OPACITY_TIMING } from '../constants'

// ============================================================================
// Types
// ============================================================================

interface FluidTimingResult {
  /** Duration for collapsing button width */
  collapseDuration: number
  /** Duration for expanding button width */
  expandDuration: number
  /** Duration for showing both buttons */
  showBothDuration: number
  /** Easing for collapse animation */
  collapseEasing: string
  /** Easing for expand animation */
  expandEasing: string
  /** Delay before expansion starts */
  expandDelay: number
  /** Duration for container opacity exit */
  exitOpacityDuration: number
  /** Duration for text opacity exit */
  textExitDuration: number
  /** Duration for container opacity enter */
  enterOpacityDuration: number
  /** Resolved blur configuration */
  blur: FluidBlurConfig
}

interface UseFluidTimingOptions {
  /** Timing preset or custom config */
  timing: FluidTimingPreset | FluidTiming
  /** Whether to sync collapse to expand timing */
  syncToExpand: boolean
  /** Blur configuration */
  exitBlur: boolean | FluidBlurConfig
  /** Slow motion multiplier */
  slowMo: boolean
}

// ============================================================================
// Helper Functions
// ============================================================================

function isTimingPreset(timing: FluidTimingPreset | FluidTiming): timing is FluidTimingPreset {
  return typeof timing === 'string'
}

function resolveBlurConfig(exitBlur: boolean | FluidBlurConfig): FluidBlurConfig {
  if (typeof exitBlur === 'boolean') {
    return exitBlur ? DEFAULT_BLUR_CONFIG : { enabled: false }
  }
  return exitBlur
}

// ============================================================================
// Hook
// ============================================================================

export function useFluidTiming({
  timing,
  syncToExpand,
  exitBlur,
  slowMo,
}: UseFluidTimingOptions): FluidTimingResult {
  return useMemo(() => {
    const multiplier = slowMo ? 5 : 1
    const resolved = isTimingPreset(timing) ? TIMING_PRESETS[timing] : timing
    const blur = resolveBlurConfig(exitBlur)

    // Apply multiplier to all durations
    const collapseDuration = resolved.collapseDuration * multiplier
    const expandDuration = resolved.expandDuration * multiplier
    const showBothDuration = resolved.showBothDuration * multiplier
    const expandDelay = (resolved.expandDelay ?? 0) * multiplier

    // Calculate opacity durations
    const exitOpacityDuration = collapseDuration * OPACITY_TIMING.exitRatio
    const textExitDuration = OPACITY_TIMING.textExitDuration * multiplier
    const enterOpacityDuration = showBothDuration * OPACITY_TIMING.enterRatio

    // Apply blur multiplier if enabled
    const blurWithMultiplier: FluidBlurConfig = blur.enabled
      ? {
          ...blur,
          duration: (blur.duration ?? DEFAULT_BLUR_CONFIG.duration!) * multiplier,
        }
      : blur

    return {
      // When syncToExpand is true, the collapsing button uses expand timing
      // for a more unified animation feel
      collapseDuration: syncToExpand ? expandDuration : collapseDuration,
      expandDuration,
      showBothDuration,
      collapseEasing: syncToExpand ? resolved.expandEasing : resolved.collapseEasing,
      expandEasing: resolved.expandEasing,
      expandDelay,
      exitOpacityDuration,
      textExitDuration,
      enterOpacityDuration,
      blur: blurWithMultiplier,
    }
  }, [timing, syncToExpand, exitBlur, slowMo])
}
