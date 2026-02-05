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
  { value: 'cubic-bezier(0.16, 1, 0.3, 1)', label: 'Expo Out' },
]

/** Side-stack mode options */
export const SIDE_STACK_MODE_OPTIONS = [
  { value: 'both', label: 'Both (L + R)' },
  { value: 'left-only', label: 'Left Only' },
  { value: 'right-only', label: 'Right Only' },
] as const

/** Trigger color options */
export const TRIGGER_COLOR_OPTIONS = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
] as const

/** Slot color options */
export const SLOT_COLOR_OPTIONS = [
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
