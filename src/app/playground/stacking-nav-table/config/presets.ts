/**
 * Stacking Nav + Table Playground - Presets
 *
 * Playground configuration presets.
 */

import type { PlaygroundConfig } from './types'

export const PRESET_DEFAULT: PlaygroundConfig = {
  pageBackground: 'primary',
  pageTopGap: 352,
  pageMaxWidth: 720,
  enableSelection: false,
  showColumnControl: false,
  showCount: true,
  toolbarPaddingTop: 8,
  toolbarPaddingBottom: 16,
  toolbarPaddingLeft: 10,
  toolbarPaddingRight: 0,
  navToCountGap: 12,
  tableOpacity: 85,
  tableMuted: false,
  enableColumnReorder: true,
  borderRadius: 16,
  showOuterBorder: true,
  showRowBorders: false,
  showCellBorders: false,
  outerBorderColor: 'secondary',
  rowBorderColor: 'secondary',
  rowBorderOpacity: 30,
  cellBorderColor: 'secondary',
  cellBorderOpacity: 35,
  navVariant: 'default',
  showNavDebug: false,
}

export const PRESET_COMPACT: PlaygroundConfig = {
  pageBackground: 'primary',
  pageTopGap: 48,
  pageMaxWidth: 640,
  enableSelection: false,
  showColumnControl: false,
  showCount: false,
  toolbarPaddingTop: 6,
  toolbarPaddingBottom: 8,
  toolbarPaddingLeft: 8,
  toolbarPaddingRight: 0,
  navToCountGap: 0,
  tableOpacity: 100,
  tableMuted: false,
  enableColumnReorder: false,
  borderRadius: 12,
  showOuterBorder: true,
  showRowBorders: true,
  showCellBorders: false,
  outerBorderColor: 'primary',
  rowBorderColor: 'secondary',
  rowBorderOpacity: 100,
  cellBorderColor: 'tertiary',
  cellBorderOpacity: 100,
  navVariant: 'default',
  showNavDebug: false,
}

export type PresetId = 'default' | 'compact'

export const PRESETS: Record<PresetId, PlaygroundConfig> = {
  default: PRESET_DEFAULT,
  compact: PRESET_COMPACT,
}
