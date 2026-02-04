import type { EasingType, SpringPreset } from './types'

// =============================================================================
// OPTION ARRAYS FOR PANEL CONTROLS
// =============================================================================

/** Spring presets for spring animation tuning */
export const SPRING_PRESETS: Record<Exclude<SpringPreset, 'custom'>, { stiffness: number; damping: number; mass: number }> = {
  smooth: { stiffness: 300, damping: 30, mass: 1 },
  snappy: { stiffness: 500, damping: 35, mass: 1 },
  soft: { stiffness: 200, damping: 25, mass: 1 },
  bouncy: { stiffness: 400, damping: 15, mass: 1 },
}

/** Easing presets for tween animations */
export const EASING_OPTIONS: { value: EasingType; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeInOut', label: 'Ease In-Out' },
  { value: 'circIn', label: 'Circ In' },
  { value: 'circOut', label: 'Circ Out' },
  { value: 'circInOut', label: 'Circ In-Out' },
  { value: 'backIn', label: 'Back In' },
  { value: 'backOut', label: 'Back Out' },
  { value: 'backInOut', label: 'Back In-Out' },
  { value: 'anticipate', label: 'Anticipate' },
]

/** Square A color options */
export const SQUARE_A_COLOR_OPTIONS = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
] as const

/** Square B color options */
export const SQUARE_B_COLOR_OPTIONS = [
  { value: 'error', label: 'Error (Red)' },
  { value: 'success', label: 'Success (Green)' },
  { value: 'warning', label: 'Warning (Orange)' },
  { value: 'brand', label: 'Brand (Purple)' },
] as const

/** Page background options */
export const PAGE_BACKGROUND_OPTIONS = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
] as const
