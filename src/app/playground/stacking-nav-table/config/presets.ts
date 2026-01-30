/**
 * Stacking Nav + Table Playground - Presets
 *
 * Playground configuration presets.
 */

import type { PlaygroundConfig } from './types'

export const PRESET_DEFAULT: PlaygroundConfig = {
  pageBackground: 'primary',
  enableSelection: true,
  showColumnControl: true,
  showCount: true,
  headerGap: 12,
  navVariant: 'default',
  showNavDebug: false,
}

export const PRESET_COMPACT: PlaygroundConfig = {
  pageBackground: 'primary',
  enableSelection: false,
  showColumnControl: false,
  showCount: false,
  headerGap: 8,
  navVariant: 'default',
  showNavDebug: false,
}

export type PresetId = 'default' | 'compact'

export const PRESETS: Record<PresetId, PlaygroundConfig> = {
  default: PRESET_DEFAULT,
  compact: PRESET_COMPACT,
}
