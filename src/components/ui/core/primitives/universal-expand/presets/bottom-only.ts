/**
 * Universal Expand - Bottom Only Preset
 *
 * Configuration for a floating search bar or command menu that
 * only expands downward (bottom slot only).
 *
 * Use cases:
 * - Floating search bar
 * - Simple command palette
 * - Dropdown menus
 */

import type { UniversalExpandConfig } from '../types'
import { DEFAULT_UNIVERSAL_EXPAND_CONFIG } from '../constants'
import { deepMerge } from '../utils'

export const BOTTOM_ONLY_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: false,
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: true,
      dimensionMode: 'dynamic',
      maxDimension: 380,
    },
    left: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.left,
      enabled: false,
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
      left: 0,
      right: 0,
    },
  },
}

/**
 * Get a complete config with bottom-only preset applied.
 */
export function getBottomOnlyConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, BOTTOM_ONLY_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}
