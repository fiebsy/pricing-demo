/**
 * Edit Questions Playground - Presets
 *
 * Preset configurations for different testing scenarios.
 *
 * @module playground/edit-questions/constants
 */

import type { PlaygroundConfig, PlaygroundPreset } from '../types'
import { DEFAULT_PLAYGROUND_CONFIG } from './defaults'

/**
 * Available preset configurations.
 */
export const PRESETS: PlaygroundPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard configuration for general testing',
    data: DEFAULT_PLAYGROUND_CONFIG,
  },
  {
    id: 'orphan-flow',
    name: 'Orphan Flow',
    description: 'Test the orphaned question recovery flow',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      responseType: 'unsure',
      simulateDelay: true,
      delayMs: 800,
    },
  },
  {
    id: 'quick-responses',
    name: 'Quick Responses',
    description: 'Fast responses without delay',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      simulateDelay: false,
      responseType: 'good',
    },
  },
  {
    id: 'slow-processing',
    name: 'Slow Processing',
    description: 'Extended delay to test loading states',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      simulateDelay: true,
      delayMs: 3000,
    },
  },
  {
    id: 'compact-modal',
    name: 'Compact Modal',
    description: 'Smaller modal size',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      modalWidth: 'sm',
    },
  },
  {
    id: 'low-confidence',
    name: 'Low Confidence',
    description: 'Test lousy answer quality display',
    data: {
      ...DEFAULT_PLAYGROUND_CONFIG,
      responseType: 'lousy',
      simulateDelay: true,
      delayMs: 1200,
    },
  },
]

/**
 * Preset options for the control panel select.
 */
export const PRESET_OPTIONS = PRESETS.map((preset) => ({
  label: preset.name,
  value: preset.id,
  description: preset.description,
}))

/**
 * Get a preset config by ID.
 */
export function getPresetConfig(presetId: string): PlaygroundConfig {
  const preset = PRESETS.find((p) => p.id === presetId)
  return preset ? { ...DEFAULT_PLAYGROUND_CONFIG, ...preset.data } : DEFAULT_PLAYGROUND_CONFIG
}
