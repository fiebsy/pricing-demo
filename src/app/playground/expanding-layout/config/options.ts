import type { CSSEasing } from './types'

// =============================================================================
// OPTION ARRAYS FOR PANEL CONTROLS
// =============================================================================

/** CSS Easing options for animation */
export const CSS_EASING_OPTIONS: { value: CSSEasing; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In-Out' },
  { value: 'cubic-bezier(0.25, 0.1, 0.25, 1)', label: 'Snappy' },
  { value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: 'Bouncy (Overshoot)' },
  { value: 'cubic-bezier(0.22, 1, 0.36, 1)', label: 'Smooth Out' },
  { value: 'cubic-bezier(0.4, 0, 0.2, 1)', label: 'Material Design' },
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
