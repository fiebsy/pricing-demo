/**
 * Skwircle Roundness Configuration
 *
 * Maps roundness presets to actual values.
 */

import type { SkwircleRoundness, RoundnessConfig } from '../types'

/**
 * Roundness preset configurations.
 *
 * Each preset maps to:
 * - smoothing: Superellipse exponent (higher = more square-like corners)
 * - borderRadius: Corner radius in pixels
 * - pointsPerCorner: SVG path precision (more = smoother, slower)
 */
export const ROUNDNESS_CONFIGS: Record<SkwircleRoundness, RoundnessConfig> = {
  none: {
    smoothing: 10.0,
    borderRadius: 0,
    pointsPerCorner: 20,
  },
  subtle: {
    smoothing: 7.0,
    borderRadius: 16,
    pointsPerCorner: 40,
  },
  moderate: {
    smoothing: 5.5,
    borderRadius: 22,
    pointsPerCorner: 50,
  },
  rounded: {
    smoothing: 4.0,
    borderRadius: 32,
    pointsPerCorner: 55,
  },
  pill: {
    smoothing: 3.0,
    borderRadius: 9999,
    pointsPerCorner: 60,
  },
}

/**
 * Get roundness configuration for a preset.
 */
export const getRoundnessConfig = (roundness: SkwircleRoundness): RoundnessConfig => {
  return ROUNDNESS_CONFIGS[roundness]
}
