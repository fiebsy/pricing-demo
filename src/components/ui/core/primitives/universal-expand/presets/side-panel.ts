/**
 * Universal Expand - Side Panel Presets
 *
 * Configuration for panels that expand horizontally from the trigger.
 *
 * Use cases:
 * - Side panels with details/actions
 * - Context menus with additional options
 * - Split-view interfaces
 */

import type { UniversalExpandConfig } from '../types'
import { DEFAULT_UNIVERSAL_EXPAND_CONFIG } from '../constants'
import { deepMerge } from '../utils'

/**
 * Right panel preset - expands to the right of the trigger.
 */
export const RIGHT_PANEL_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: false,
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
      fixedDimension: 280,
      maxDimension: 400,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.right.animation,
        expandOrigin: 'start',
      },
    },
  },
  layout: {
    ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.layout,
    gaps: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 8,
    },
  },
}

/**
 * Get a complete config with right panel preset applied.
 */
export function getRightPanelConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, RIGHT_PANEL_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}

/**
 * Left panel preset - expands to the left of the trigger.
 */
export const LEFT_PANEL_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: false,
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: false,
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 280,
      maxDimension: 400,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left.animation,
        expandOrigin: 'end',
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
      bottom: 0,
      left: 8,
      right: 0,
    },
  },
}

/**
 * Get a complete config with left panel preset applied.
 */
export function getLeftPanelConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, LEFT_PANEL_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}

/**
 * Horizontal bidirectional preset - expands both left and right.
 */
export const HORIZONTAL_BIDIRECTIONAL_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: false,
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: false,
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: true,
      dimensionMode: 'fixed',
      fixedDimension: 200,
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
      fixedDimension: 200,
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
      top: 0,
      bottom: 0,
      left: 8,
      right: 8,
    },
  },
}

/**
 * Get a complete config with horizontal bidirectional preset applied.
 */
export function getHorizontalBidirectionalConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, HORIZONTAL_BIDIRECTIONAL_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}
