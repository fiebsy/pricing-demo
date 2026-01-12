/**
 * Skwircle Gradient Configuration
 *
 * Border and background gradient presets.
 */

import type { GradientConfig, SkwircleBorderGradient, SkwircleBackgroundGradient } from '../types'
import {
  GRADIENT_BORDER_PRESETS,
  BACKGROUND_GRADIENT_PRESETS,
} from './constants'

// Re-export for convenience
export { GRADIENT_BORDER_PRESETS, BACKGROUND_GRADIENT_PRESETS }

/**
 * Get border gradient configuration.
 */
export const getBorderGradientConfig = (
  preset: SkwircleBorderGradient,
  customConfig?: GradientConfig
): GradientConfig | null => {
  if (preset === 'none') return null
  if (preset === 'custom' && customConfig) return customConfig
  return GRADIENT_BORDER_PRESETS[preset] ?? null
}

/**
 * Get background gradient configuration.
 */
export const getBackgroundGradientConfig = (
  preset: SkwircleBackgroundGradient,
  customConfig?: GradientConfig
): GradientConfig | null => {
  if (preset === 'none') return null
  if (preset === 'custom' && customConfig) return customConfig
  return BACKGROUND_GRADIENT_PRESETS[preset] ?? null
}
