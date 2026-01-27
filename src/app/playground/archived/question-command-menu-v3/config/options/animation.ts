/**
 * Question Command Menu V3 - Animation Options
 *
 * Options for backdrop animation mode and expand origin.
 */

export const BACKDROP_MODE_OPTIONS = [
  { label: 'Size (Original)', value: 'size' },
  { label: 'Clip-Path (Sync)', value: 'clip-path' },
] as const

export const EXPAND_ORIGIN_OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
] as const
