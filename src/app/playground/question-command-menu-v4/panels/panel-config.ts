/**
 * Question Command Menu V4 - Panel Config Builder
 *
 * Main panel configuration assembly.
 */

import type { PanelConfig } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState, SlotPosition, ContentTypeId } from '../types'
import { PRESETS } from '../presets'
import {
  buildContentSection,
  buildTopSlotSection,
  buildBottomSlotSection,
  buildTriggerSection,
  buildLayoutSection,
  buildAnimationSection,
  buildAppearanceSection,
} from './sections'

// ============================================================================
// MAIN PANEL CONFIG BUILDER
// ============================================================================

export function buildPanelConfig(
  state: PlaygroundState,
  activePresetId: string | null
): PanelConfig {
  return {
    defaultActiveTab: 'content',
    presetConfig: {
      presets: PRESETS,
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      buildContentSection(state),
      buildTopSlotSection(state),
      buildBottomSlotSection(state),
      buildTriggerSection(state),
      buildLayoutSection(state),
      buildAnimationSection(state),
      buildAppearanceSection(state),
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
  // Special handling for content type changes
  if (path === 'topContentType' || path === 'bottomContentType') {
    return handleContentTypeChange(obj, path, value as ContentTypeId)
  }

  const keys = path.split('.')
  const newObj = JSON.parse(JSON.stringify(obj)) as PlaygroundState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = newObj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    if (/^\d+$/.test(keys[i + 1] ?? '')) {
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

// ============================================================================
// CONTENT TYPE CHANGE HANDLER
// ============================================================================

function handleContentTypeChange(
  state: PlaygroundState,
  path: string,
  newType: ContentTypeId
): PlaygroundState {
  const newObj = JSON.parse(JSON.stringify(state)) as PlaygroundState
  const slot: SlotPosition = path === 'topContentType' ? 'top' : 'bottom'

  // Update the content array
  const existingIndex = newObj.config.content.findIndex((c) => c.slot === slot)

  if (existingIndex >= 0) {
    newObj.config.content[existingIndex] = {
      ...newObj.config.content[existingIndex],
      type: newType,
    }
  } else {
    newObj.config.content.push({
      id: `${slot}-${newType}`,
      type: newType,
      slot,
    })
  }

  return newObj
}
