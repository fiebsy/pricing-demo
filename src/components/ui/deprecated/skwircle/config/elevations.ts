/**
 * Skwircle Elevation Configuration
 *
 * Shadow presets for elevation levels.
 */

import type { SkwircleElevation, CustomShadowConfig } from '../types'

/**
 * Shadow configurations for elevation presets.
 *
 * Note: Only xs and sm are available - larger shadows get clipped
 * by parent containers.
 */
export const ELEVATION_CONFIGS: Record<SkwircleElevation, CustomShadowConfig> = {
  none: {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    spread: 0,
    color: 'black',
    opacity: 0,
  },
  xs: {
    offsetX: 0,
    offsetY: 2,
    blur: 2,
    spread: 0,
    color: 'black',
    opacity: 0.09,
  },
  sm: {
    offsetX: 0,
    offsetY: 2,
    blur: 4,
    spread: 0,
    color: 'black',
    opacity: 0.08,
  },
}

/**
 * Get shadow configuration for an elevation level.
 */
export const getElevationConfig = (elevation: SkwircleElevation): CustomShadowConfig => {
  return ELEVATION_CONFIGS[elevation]
}

/**
 * Check if elevation has a visible shadow.
 */
export const hasVisibleShadow = (elevation: SkwircleElevation): boolean => {
  return ELEVATION_CONFIGS[elevation].opacity > 0
}
