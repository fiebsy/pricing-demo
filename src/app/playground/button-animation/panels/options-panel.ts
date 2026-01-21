/**
 * ButtonAnimation Playground - Options Panel
 *
 * Control panel section for component options and presets.
 *
 * @module playground/button-animation/panels
 */

import type { Section as ControlSection } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundConfig } from '../types'
import { PRESET_OPTIONS } from '../constants'

/**
 * Creates the options control section.
 */
export function createOptionsPanel(
  config: PlaygroundConfig,
  activePresetId: string | null
): ControlSection {
  return {
    id: 'options',
    title: 'Options',
    tabLabel: 'Options',
    groups: [
      {
        title: 'Presets',
        controls: [
          {
            id: 'preset',
            label: 'Preset',
            type: 'select',
            value: activePresetId || 'default',
            options: PRESET_OPTIONS,
          },
        ],
      },
      {
        title: 'Display',
        controls: [
          {
            id: 'showNumbers',
            label: 'Show Numbers',
            description: 'Display index numbers on chips',
            type: 'toggle',
            value: config.showNumbers,
          },
          {
            id: 'showInlineReset',
            label: 'Inline Reset',
            description: 'Show reset button when modified',
            type: 'toggle',
            value: config.showInlineReset,
          },
        ],
      },
    ],
  }
}
