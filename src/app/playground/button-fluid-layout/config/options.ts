/**
 * Button Fluid Layout Control Panel Options
 *
 * Simplified options for FluidButtonGroup API.
 */

// ============================================================================
// Timing Preset Options
// ============================================================================

export const TIMING_PRESET_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Snappy', value: 'snappy' },
  { label: 'Smooth', value: 'smooth' },
  { label: 'Custom', value: 'custom' },
] as const

// ============================================================================
// Custom Timing Slider Ranges
// ============================================================================

export const COLLAPSE_DURATION_RANGE = {
  min: 50,
  max: 600,
  step: 25,
  default: 250,
} as const

export const EXPAND_DURATION_RANGE = {
  min: 100,
  max: 800,
  step: 25,
  default: 525,
} as const

export const SHOW_BOTH_DURATION_RANGE = {
  min: 100,
  max: 600,
  step: 25,
  default: 300,
} as const

export const EXPAND_DELAY_RANGE = {
  min: 0,
  max: 200,
  step: 10,
  default: 0,
} as const

// ============================================================================
// Easing Options
// ============================================================================

export const EASING_OPTIONS = [
  { label: 'Ease Out', value: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  { label: 'Expo Out', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { label: 'Quint Out', value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  { label: 'Circ Out', value: 'cubic-bezier(0, 0.55, 0.45, 1)' },
  { label: 'Back Out', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { label: 'Linear', value: 'linear' },
] as const

// ============================================================================
// Blur Slider Ranges
// ============================================================================

export const BLUR_AMOUNT_RANGE = {
  min: 0,
  max: 10,
  step: 1,
  default: 2,
} as const

export const BLUR_DURATION_RANGE = {
  min: 50,
  max: 300,
  step: 10,
  default: 120,
} as const

// ============================================================================
// Layout Options
// ============================================================================

export const BUTTON_VARIANT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
] as const

export const CONTAINER_WIDTH_RANGE = {
  min: 200,
  max: 600,
  step: 20,
  default: 400,
} as const

export const GAP_RANGE = {
  min: 0,
  max: 24,
  step: 4,
  default: 8,
} as const

// ============================================================================
// State Transition Slider Ranges
// ============================================================================

export const TEXT_SLIDE_DURATION_RANGE = {
  min: 100,
  max: 500,
  step: 25,
  default: 200,
} as const

export const CHECKMARK_DRAW_DURATION_RANGE = {
  min: 100,
  max: 500,
  step: 25,
  default: 250,
} as const

export const SPINNER_TO_CHECKMARK_DURATION_RANGE = {
  min: 100,
  max: 500,
  step: 25,
  default: 300,
} as const

// ============================================================================
// Checkmark Entrance Style Options
// ============================================================================

export const CHECKMARK_ENTRANCE_OPTIONS = [
  { label: 'Draw', value: 'draw' },
  { label: 'Flip', value: 'flip' },
] as const
