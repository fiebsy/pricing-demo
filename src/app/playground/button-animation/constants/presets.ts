/**
 * ButtonAnimation Playground - Presets
 *
 * Pre-configured animation presets for quick testing.
 *
 * @module playground/button-animation/constants
 */

import type { PlaygroundPreset } from '../types'
import { DEFAULT_PLAYGROUND_CONFIG } from './defaults'

// =============================================================================
// PRESETS
// =============================================================================

export const PRESETS: PlaygroundPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard balanced animation',
    data: DEFAULT_PLAYGROUND_CONFIG,
  },
  {
    id: 'fast-snappy',
    name: 'Fast & Snappy',
    description: 'High stiffness, quick exits',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      parentStiffness: 700,
      parentDamping: 40,
      parentExitDuration: 60,
      childStiffness: 800,
      childDamping: 40,
      childStagger: 20,
      childExitDuration: 50,
    },
  },
  {
    id: 'bouncy',
    name: 'Bouncy',
    description: 'Lower damping, center-out entry',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      parentDamping: 20,
      childDamping: 20,
      childEntryOrder: 'center-out',
      childEntryDistance: 12,
      childStagger: 40,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Subtle timing-based animation',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      parentEase: 'easeOut',
      parentDuration: 200,
      childEase: 'easeOut',
      childDuration: 200,
      childEntryDirection: 'none',
      childEntryDistance: 0,
      parentVariant: 'link-gray',
      parentExpandedVariant: 'tertiary',
      childVariant: 'link-gray',
      childSelectedVariant: 'link-color',
    },
  },
  {
    id: 'brand',
    name: 'Brand',
    description: 'Shine/primary variants, horizontal entry',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      parentVariant: 'secondary',
      parentExpandedVariant: 'shine',
      childVariant: 'tertiary',
      childSelectedVariant: 'primary',
      allButtonVariant: 'shine',
      childEntryDirection: 'right',
      childEntryDistance: 12,
    },
  },
]

// =============================================================================
// PRESET OPTIONS (for select dropdown)
// =============================================================================

export const PRESET_OPTIONS = PRESETS.map((preset) => ({
  label: preset.name,
  value: preset.id,
  description: preset.description,
}))

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get preset by ID.
 */
export function getPreset(presetId: string): PlaygroundPreset | undefined {
  return PRESETS.find((p) => p.id === presetId)
}

/**
 * Get preset config, falling back to default.
 */
export function getPresetConfig(presetId: string): PlaygroundPreset['data'] {
  const preset = getPreset(presetId)
  return preset?.data ?? DEFAULT_PLAYGROUND_CONFIG
}
