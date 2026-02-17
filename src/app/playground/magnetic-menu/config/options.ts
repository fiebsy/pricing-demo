/**
 * Magnetic Menu Control Options
 */

// ============================================================================
// Pull Mode Options
// ============================================================================

export const PULL_MODE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Text Only', value: 'text' },
  { label: 'Background Only', value: 'background' },
  { label: 'Both', value: 'both' },
] as const

// ============================================================================
// Pull Direction Options
// ============================================================================

export const PULL_DIRECTION_OPTIONS = [
  { label: 'Both Axes', value: 'both' },
  { label: 'Horizontal Only', value: 'horizontal' },
  { label: 'Vertical Only', value: 'vertical' },
] as const
