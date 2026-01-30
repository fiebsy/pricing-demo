/**
 * Question Command Menu - Panel Config Builder
 *
 * Modular assembly of control panel sections.
 */

import type { PanelConfig } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState } from '../config/types'
import { PRESETS } from '../config/presets'

import { buildAnimationSection } from './animation-section'
import { buildTriggerSection } from './trigger-section'
import { buildTopSection } from './top-section'
import { buildBottomSection } from './bottom-section'
import { buildItemsSection } from './items-section'
import { buildAppearanceSection } from './appearance-section'

// ============================================================================
// PANEL CONFIG BUILDER
// ============================================================================

export function buildPanelConfig(
  state: PlaygroundState,
  activePresetId: string | null
): PanelConfig {
  return {
    defaultActiveTab: 'trigger',
    presetConfig: {
      presets: PRESETS,
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      buildTriggerSection(state),
      buildTopSection(state),
      buildBottomSection(state),
      buildItemsSection(state),
      buildAppearanceSection(state),
      buildAnimationSection(state),
    ],
    showReset: true,
    resetLabel: 'Reset',
  }
}

// ============================================================================
// NESTED VALUE UPDATER
// ============================================================================

export function updateNestedValue(
  obj: PlaygroundState,
  path: string,
  value: unknown
): PlaygroundState {
  const keys = path.split('.')
  const newObj = JSON.parse(JSON.stringify(obj)) as PlaygroundState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = newObj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    // Handle array indices
    if (/^\d+$/.test(keys[i + 1] ?? '')) {
      // Next key is an array index - ensure current key is an array
      if (!Array.isArray(current[key])) {
        current[key] = []
      }
    } else if (current[key] === undefined || current[key] === null) {
      current[key] = {}
    }
    current = current[key]
  }

  const finalKey = keys[keys.length - 1]!
  current[finalKey] = value

  return newObj
}

// Re-export section builders
export { buildAnimationSection } from './animation-section'
export { buildTriggerSection } from './trigger-section'
export { buildTopSection } from './top-section'
export { buildBottomSection } from './bottom-section'
export { buildItemsSection } from './items-section'
export { buildAppearanceSection } from './appearance-section'
