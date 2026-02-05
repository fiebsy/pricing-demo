import type { EasingType, ButtonVariant } from '@/components/ui/features/experimental/legacy-stacking-nav-motion'
import type { EntryDirection } from './types'

// =============================================================================
// OPTION ARRAYS FOR PANEL CONTROLS
// =============================================================================

/** Spring presets for spring animation tuning */
export const SPRING_PRESETS = {
  smooth: { stiffness: 500, damping: 30 },
  snappy: { stiffness: 700, damping: 35 },
  soft: { stiffness: 300, damping: 25 },
  bouncy: { stiffness: 400, damping: 15 },
}

/** Easing presets for quick selection */
export const EASING_OPTIONS: { value: EasingType; label: string }[] = [
  { value: 'linear', label: 'Linear' },
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeInOut', label: 'Ease In-Out' },
  { value: 'circIn', label: 'Circ In' },
  { value: 'circOut', label: 'Circ Out' },
  { value: 'circInOut', label: 'Circ In-Out' },
  { value: 'expoIn', label: 'Expo In' },
  { value: 'expoOut', label: 'Expo Out' },
  { value: 'expoInOut', label: 'Expo In-Out' },
  { value: 'backIn', label: 'Back In' },
  { value: 'backOut', label: 'Back Out' },
  { value: 'backInOut', label: 'Back In-Out' },
  { value: 'anticipate', label: 'Anticipate' },
]

/** Entry direction presets */
export const ENTRY_DIRECTION_PRESETS: Record<Exclude<EntryDirection, 'custom'>, { x: number; y: number }> = {
  up: { x: 0, y: 12 },
  down: { x: 0, y: -12 },
  left: { x: 12, y: 0 },
  right: { x: -12, y: 0 },
  'up-left': { x: 10, y: 10 },
  'up-right': { x: -10, y: 10 },
  'down-left': { x: 10, y: -10 },
  'down-right': { x: -10, y: -10 },
  none: { x: 0, y: 0 },
}

/** Entry direction options for select control */
export const ENTRY_DIRECTION_OPTIONS: { value: EntryDirection; label: string }[] = [
  { value: 'none', label: 'None (Scale Only)' },
  { value: 'up', label: '\u2191 Slide Up' },
  { value: 'down', label: '\u2193 Slide Down' },
  { value: 'left', label: '\u2190 Slide Left' },
  { value: 'right', label: '\u2192 Slide Right' },
  { value: 'up-left', label: '\u2196 Up-Left' },
  { value: 'up-right', label: '\u2197 Up-Right' },
  { value: 'down-left', label: '\u2199 Down-Left' },
  { value: 'down-right', label: '\u2198 Down-Right' },
  { value: 'custom', label: 'Custom' },
]

/** Button variant options for styling */
export const BUTTON_VARIANT_OPTIONS: { value: ButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'shine', label: 'Shine' },
  { value: 'tab', label: 'Tab' },
  { value: 'link-gray', label: 'Link Gray' },
  { value: 'link-color', label: 'Link Color' },
]
