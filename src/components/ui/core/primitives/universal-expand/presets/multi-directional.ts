/**
 * Universal Expand - Multi-Directional Presets
 *
 * Configuration for complex expansion patterns that use 3 or 4 slots.
 *
 * Use cases:
 * - L-shaped menus (top + right, bottom + left, etc.)
 * - Full quad expansion
 * - Complex dashboard widgets
 */

import type { UniversalExpandConfig } from '../types'
import { DEFAULT_UNIVERSAL_EXPAND_CONFIG } from '../constants'
import { deepMerge } from '../utils'

/**
 * L-shaped preset (top + right) - expands upward and rightward.
 */
export const L_SHAPED_TOP_RIGHT_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 120,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top.animation,
        expandOrigin: 'end',
        durationOffset: -100,
      },
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: false,
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: false,
    },
    right: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 200,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right.animation,
        expandOrigin: 'start',
        durationOffset: 0,
      },
    },
  },
  layout: {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.layout,
    gaps: {
      top: 8,
      bottom: 0,
      left: 0,
      right: 8,
    },
  },
}

/**
 * Get a complete config with L-shaped (top + right) preset applied.
 */
export function getLShapedTopRightConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, L_SHAPED_TOP_RIGHT_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}

/**
 * L-shaped preset (bottom + left) - expands downward and leftward.
 */
export const L_SHAPED_BOTTOM_LEFT_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: false,
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: true,
      dimensionMode: 'dynamic',
      maxDimension: 280,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom.animation,
        expandOrigin: 'start',
        durationOffset: 0,
      },
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 180,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left.animation,
        expandOrigin: 'end',
        durationOffset: -50,
      },
    },
    right: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right,
      enabled: false,
    },
  },
  layout: {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.layout,
    gaps: {
      top: 0,
      bottom: 12,
      left: 8,
      right: 0,
    },
  },
}

/**
 * Get a complete config with L-shaped (bottom + left) preset applied.
 */
export function getLShapedBottomLeftConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, L_SHAPED_BOTTOM_LEFT_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}

/**
 * T-shaped preset (top + bottom + right) - expands in three directions.
 */
export const T_SHAPED_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 80,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top.animation,
        expandOrigin: 'end',
        durationOffset: -100,
      },
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: true,
      dimensionMode: 'dynamic',
      maxDimension: 240,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom.animation,
        expandOrigin: 'start',
        durationOffset: 50,
      },
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: false,
    },
    right: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 160,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right.animation,
        expandOrigin: 'start',
        durationOffset: 0,
      },
    },
  },
  layout: {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.layout,
    gaps: {
      top: 8,
      bottom: 12,
      left: 0,
      right: 8,
    },
  },
}

/**
 * Get a complete config with T-shaped preset applied.
 */
export function getTShapedConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, T_SHAPED_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}

/**
 * Quad expansion preset - expands in all 4 directions.
 */
export const QUAD_EXPANSION_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 100,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top.animation,
        expandOrigin: 'end',
        durationOffset: -100,
      },
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: true,
      dimensionMode: 'dynamic',
      maxDimension: 200,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom.animation,
        expandOrigin: 'start',
        durationOffset: 100,
      },
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 150,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left.animation,
        expandOrigin: 'end',
        durationOffset: -50,
      },
    },
    right: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 150,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right.animation,
        expandOrigin: 'start',
        durationOffset: -50,
      },
    },
  },
  layout: {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.layout,
    gaps: {
      top: 8,
      bottom: 12,
      left: 8,
      right: 8,
    },
  },
}

/**
 * Get a complete config with quad expansion preset applied.
 */
export function getQuadExpansionConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, QUAD_EXPANSION_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}
