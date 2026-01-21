/**
 * Biaxial Command Menu V3 - Panel Config Builder
 *
 * Modular assembly of control panel sections.
 */

import type { PanelConfig } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import { PRESETS } from '../presets'

import { buildSyncSection } from './sync-section'
import { buildInputSection } from './input-section'
import { buildMenuSection } from './menu-section'
import { buildItemsSection } from './items-section'
import { buildBackdropSection } from './backdrop-section'
import { buildExperimentalSection } from './experimental-section'

// ============================================================================
// PANEL CONFIG BUILDER
// ============================================================================

export function buildPanelConfig(
  state: PlaygroundState,
  activePresetId: string | null
): PanelConfig {
  return {
    defaultActiveTab: 'sync',
    presetConfig: {
      presets: PRESETS,
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      buildSyncSection(state),
      buildInputSection(state),
      buildMenuSection(state),
      buildItemsSection(state),
      buildBackdropSection(state),
      buildExperimentalSection(state),
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
    current = current[key]
  }

  const finalKey = keys[keys.length - 1]!
  current[finalKey] = value

  return newObj
}

// Re-export section builders for advanced usage
export { buildSyncSection } from './sync-section'
export { buildInputSection } from './input-section'
export { buildMenuSection } from './menu-section'
export { buildItemsSection } from './items-section'
export { buildBackdropSection } from './backdrop-section'
export { buildExperimentalSection } from './experimental-section'
