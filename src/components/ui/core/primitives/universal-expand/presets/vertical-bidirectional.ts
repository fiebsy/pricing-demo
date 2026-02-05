/**
 * Universal Expand - Vertical Bidirectional Preset
 *
 * Configuration for components that expand both upward and downward.
 *
 * Use cases:
 * - Chat interface (messages above, input below)
 * - Command menu with filters above and results below
 * - Question flow with context above and options below
 */

import type { UniversalExpandConfig } from '../types'
import { DEFAULT_UNIVERSAL_EXPAND_CONFIG } from '../constants'
import { deepMerge } from '../utils'

export const VERTICAL_BIDIRECTIONAL_PRESET: Partial<UniversalExpandConfig> = {
  slots: {
    top: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top,
      enabled: true,
      dimensionMode: 'dynamic',
      fixedDimension: 100,
      maxDimension: 300,
      minDimension: 48,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.top.animation,
        durationOffset: -100,
        expandOrigin: 'end',
      },
    },
    bottom: {
      ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom,
      enabled: true,
      dimensionMode: 'dynamic',
      maxDimension: 340,
      animation: {
        ...DEFAULT_UNIVERSAL_EXPAND_CONFIG.slots.bottom.animation,
        durationOffset: 100,
        expandOrigin: 'start',
      },
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
 * Get a complete config with vertical bidirectional preset applied.
 */
export function getVerticalBidirectionalConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, VERTICAL_BIDIRECTIONAL_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}

/**
 * Chat-optimized vertical bidirectional configuration.
 * Top slot for chat messages, bottom slot for action buttons.
 */
export const CHAT_INTERFACE_PRESET: Partial<UniversalExpandConfig> = {
  ...VERTICAL_BIDIRECTIONAL_PRESET,
  slots: {
    ...VERTICAL_BIDIRECTIONAL_PRESET.slots!,
    top: {
      ...VERTICAL_BIDIRECTIONAL_PRESET.slots!.top,
      dimensionMode: 'auto',
      maxDimension: 400,
      scroll: {
        overflowGradient: true,
        gradientHeight: 32,
        paddingTop: 12,
        paddingBottom: 12,
      },
    },
    bottom: {
      ...VERTICAL_BIDIRECTIONAL_PRESET.slots!.bottom,
      dimensionMode: 'fixed',
      fixedDimension: 56,
    },
  },
}

/**
 * Get a complete config with chat interface preset applied.
 */
export function getChatInterfaceConfig(
  overrides?: Partial<UniversalExpandConfig>
): UniversalExpandConfig {
  const base = deepMerge(DEFAULT_UNIVERSAL_EXPAND_CONFIG, CHAT_INTERFACE_PRESET)
  return overrides ? deepMerge(base, overrides) : base
}
