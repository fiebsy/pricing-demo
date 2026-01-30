/**
 * Question Command Menu V4 - Presets Index
 *
 * Aggregates all presets and exports utilities.
 */

import type { Preset } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState, QuestionCommandMenuV4Preset } from '../types'

// Re-export individual presets
export { DEFAULT_CONFIG, DEFAULT_PRESET } from './default'
export { CHAT_MODE_PRESET, CHAT_INLINE_EDIT_PRESET, CHAT_INLINE_EDIT_V2_PRESET } from './chat-mode'
export { ADD_QUESTION_PRESET, QUESTION_MODE_PRESET } from './question-mode'
export { createPreset, deepMerge, COMMON_BUTTONS } from './helpers'

// Re-export flow configs
export {
  DEFAULT_FLOW_CONFIGS,
  FLOW_CONFIGS_WITH_EMPTY_CHAT,
  MINIMAL_FLOW_CONFIGS,
  SINGLE_BUTTON_FLOW_CONFIGS,
} from './flow-configs'

// Import for aggregation
import { DEFAULT_PRESET, DEFAULT_CONFIG } from './default'
import { CHAT_MODE_PRESET, CHAT_INLINE_EDIT_PRESET, CHAT_INLINE_EDIT_V2_PRESET } from './chat-mode'
import { ADD_QUESTION_PRESET, QUESTION_MODE_PRESET } from './question-mode'

// =============================================================================
// AGGREGATED PRESETS
// =============================================================================

/**
 * All available presets as Preset<PlaygroundState> for UnifiedControlPanel
 */
export const PRESETS: Preset<PlaygroundState>[] = [
  { ...DEFAULT_PRESET, data: { config: DEFAULT_PRESET.data } },
  { ...CHAT_MODE_PRESET, data: { config: CHAT_MODE_PRESET.data } },
  { ...CHAT_INLINE_EDIT_PRESET, data: { config: CHAT_INLINE_EDIT_PRESET.data } },
  { ...CHAT_INLINE_EDIT_V2_PRESET, data: { config: CHAT_INLINE_EDIT_V2_PRESET.data } },
  { ...ADD_QUESTION_PRESET, data: { config: ADD_QUESTION_PRESET.data } },
  { ...QUESTION_MODE_PRESET, data: { config: QUESTION_MODE_PRESET.data } },
]

/**
 * Raw presets without playground state wrapper
 */
export const RAW_PRESETS: QuestionCommandMenuV4Preset[] = [
  DEFAULT_PRESET,
  CHAT_MODE_PRESET,
  CHAT_INLINE_EDIT_PRESET,
  CHAT_INLINE_EDIT_V2_PRESET,
  ADD_QUESTION_PRESET,
  QUESTION_MODE_PRESET,
]

// =============================================================================
// DEFAULT STATE
// =============================================================================

export const DEFAULT_STATE: PlaygroundState = {
  config: DEFAULT_CONFIG,
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Get a preset by its ID
 */
export function getPresetById(id: string): Preset<PlaygroundState> | undefined {
  return PRESETS.find((p) => p.id === id)
}

/**
 * Get presets by category
 */
export function getPresetsByCategory(category: string): Preset<PlaygroundState>[] {
  return PRESETS.filter((p) => {
    const preset = p as { category?: string }
    return preset.category === category
  })
}
