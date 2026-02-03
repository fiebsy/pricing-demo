// =============================================================================
// Animation Token Constants
// =============================================================================
// Easing, duration, and delay options for control panel dropdowns.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface EasingOption {
  label: string
  value: string
  /** CSS cubic-bezier or keyword */
  cssValue: string
  /** Motion.dev compatible easing */
  motionEasing?: number[] | string
}

export interface DurationOption {
  label: string
  value: string
  /** Duration in milliseconds */
  ms: number
  /** Duration in seconds */
  seconds: number
}

export interface DelayOption {
  label: string
  value: string
  /** Delay in milliseconds */
  ms: number
}

// -----------------------------------------------------------------------------
// Easing Options
// -----------------------------------------------------------------------------

export const EASING_OPTIONS: EasingOption[] = [
  // Standard easings
  { label: 'Linear', value: 'linear', cssValue: 'linear', motionEasing: 'linear' },
  { label: 'Ease', value: 'ease', cssValue: 'ease', motionEasing: [0.25, 0.1, 0.25, 1] },
  { label: 'Ease In', value: 'ease-in', cssValue: 'ease-in', motionEasing: [0.42, 0, 1, 1] },
  { label: 'Ease Out', value: 'ease-out', cssValue: 'ease-out', motionEasing: [0, 0, 0.58, 1] },
  { label: 'Ease In Out', value: 'ease-in-out', cssValue: 'ease-in-out', motionEasing: [0.42, 0, 0.58, 1] },
  // Expo easings
  { label: 'Expo Out', value: 'expo-out', cssValue: 'cubic-bezier(0.16, 1, 0.3, 1)', motionEasing: [0.16, 1, 0.3, 1] },
  { label: 'Expo In', value: 'expo-in', cssValue: 'cubic-bezier(0.7, 0, 0.84, 0)', motionEasing: [0.7, 0, 0.84, 0] },
  { label: 'Expo In Out', value: 'expo-in-out', cssValue: 'cubic-bezier(0.87, 0, 0.13, 1)', motionEasing: [0.87, 0, 0.13, 1] },
  // Circ easings
  { label: 'Circ Out', value: 'circ-out', cssValue: 'cubic-bezier(0, 0.55, 0.45, 1)', motionEasing: [0, 0.55, 0.45, 1] },
  { label: 'Circ In', value: 'circ-in', cssValue: 'cubic-bezier(0.55, 0, 1, 0.45)', motionEasing: [0.55, 0, 1, 0.45] },
  // Back easings (overshoot)
  { label: 'Back Out', value: 'back-out', cssValue: 'cubic-bezier(0.34, 1.56, 0.64, 1)', motionEasing: [0.34, 1.56, 0.64, 1] },
  { label: 'Back In', value: 'back-in', cssValue: 'cubic-bezier(0.36, 0, 0.66, -0.56)', motionEasing: [0.36, 0, 0.66, -0.56] },
  // Quint easings
  { label: 'Quint Out', value: 'quint-out', cssValue: 'cubic-bezier(0.22, 1, 0.36, 1)', motionEasing: [0.22, 1, 0.36, 1] },
  { label: 'Quint In', value: 'quint-in', cssValue: 'cubic-bezier(0.64, 0, 0.78, 0)', motionEasing: [0.64, 0, 0.78, 0] },
]

/** Common easing options (most frequently used) */
export const COMMON_EASING_OPTIONS: EasingOption[] = [
  { label: 'Linear', value: 'linear', cssValue: 'linear', motionEasing: 'linear' },
  { label: 'Ease Out', value: 'ease-out', cssValue: 'ease-out', motionEasing: [0, 0, 0.58, 1] },
  { label: 'Ease In Out', value: 'ease-in-out', cssValue: 'ease-in-out', motionEasing: [0.42, 0, 0.58, 1] },
  { label: 'Expo Out', value: 'expo-out', cssValue: 'cubic-bezier(0.16, 1, 0.3, 1)', motionEasing: [0.16, 1, 0.3, 1] },
  { label: 'Back Out', value: 'back-out', cssValue: 'cubic-bezier(0.34, 1.56, 0.64, 1)', motionEasing: [0.34, 1.56, 0.64, 1] },
]

// -----------------------------------------------------------------------------
// Duration Options
// -----------------------------------------------------------------------------

export const DURATION_OPTIONS: DurationOption[] = [
  { label: 'Instant', value: '0', ms: 0, seconds: 0 },
  { label: '75ms', value: '75', ms: 75, seconds: 0.075 },
  { label: '100ms', value: '100', ms: 100, seconds: 0.1 },
  { label: '150ms', value: '150', ms: 150, seconds: 0.15 },
  { label: '200ms', value: '200', ms: 200, seconds: 0.2 },
  { label: '250ms', value: '250', ms: 250, seconds: 0.25 },
  { label: '300ms', value: '300', ms: 300, seconds: 0.3 },
  { label: '400ms', value: '400', ms: 400, seconds: 0.4 },
  { label: '500ms', value: '500', ms: 500, seconds: 0.5 },
  { label: '700ms', value: '700', ms: 700, seconds: 0.7 },
  { label: '1000ms', value: '1000', ms: 1000, seconds: 1 },
]

/** Named duration presets */
export const DURATION_PRESETS = {
  instant: 0,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 500,
  slowest: 1000,
} as const

// -----------------------------------------------------------------------------
// Delay Options
// -----------------------------------------------------------------------------

export const DELAY_OPTIONS: DelayOption[] = [
  { label: 'None', value: '0', ms: 0 },
  { label: '50ms', value: '50', ms: 50 },
  { label: '100ms', value: '100', ms: 100 },
  { label: '150ms', value: '150', ms: 150 },
  { label: '200ms', value: '200', ms: 200 },
  { label: '300ms', value: '300', ms: 300 },
  { label: '500ms', value: '500', ms: 500 },
]

// -----------------------------------------------------------------------------
// Spring Options (for motion/react)
// -----------------------------------------------------------------------------

export interface SpringOption {
  label: string
  value: string
  config: {
    type: 'spring'
    stiffness: number
    damping: number
    mass?: number
  }
}

export const SPRING_OPTIONS: SpringOption[] = [
  { label: 'Gentle', value: 'gentle', config: { type: 'spring', stiffness: 120, damping: 14 } },
  { label: 'Wobbly', value: 'wobbly', config: { type: 'spring', stiffness: 180, damping: 12 } },
  { label: 'Stiff', value: 'stiff', config: { type: 'spring', stiffness: 210, damping: 20 } },
  { label: 'Slow', value: 'slow', config: { type: 'spring', stiffness: 100, damping: 30 } },
  { label: 'Snappy', value: 'snappy', config: { type: 'spring', stiffness: 400, damping: 30 } },
]

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/** Get easing CSS value by name */
export function getEasingCssValue(value: string): string {
  return EASING_OPTIONS.find((e) => e.value === value)?.cssValue ?? 'ease-out'
}

/** Get easing for motion/react */
export function getMotionEasing(value: string): number[] | string {
  return EASING_OPTIONS.find((e) => e.value === value)?.motionEasing ?? [0, 0, 0.58, 1]
}

/** Get duration in seconds */
export function getDurationSeconds(value: string): number {
  return DURATION_OPTIONS.find((d) => d.value === value)?.seconds ?? 0.2
}

/** Convert animation options to select control format */
export function toSelectOptions<T extends { label: string; value: string }>(options: T[]) {
  return options.map((o) => ({
    label: o.label,
    value: o.value,
  }))
}
