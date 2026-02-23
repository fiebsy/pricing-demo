/**
 * Modal V2 Presets
 *
 * Preset variations for the modal playground.
 */

import type { ModalV2PresetMeta } from './types'
import { DEFAULT_CONFIG } from './defaults'

/** Modal V2 presets */
export const MODAL_V2_PRESETS: ModalV2PresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard modal with synced animations',
    data: DEFAULT_CONFIG,
  },
  {
    id: 'snappy',
    name: 'Snappy',
    description: 'Quick, responsive animations',
    data: {
      ...DEFAULT_CONFIG,
      animation: {
        duration: 0.15,
        bounce: 0.05,
        stagger: 0.015,
      },
    },
  },
  {
    id: 'smooth',
    name: 'Smooth',
    description: 'Slower, more deliberate animations',
    data: {
      ...DEFAULT_CONFIG,
      animation: {
        duration: 0.4,
        bounce: 0.15,
        stagger: 0.035,
      },
    },
  },
]

/** Get preset by ID */
export function getPresetById(id: string): ModalV2PresetMeta | undefined {
  return MODAL_V2_PRESETS.find((p) => p.id === id)
}
