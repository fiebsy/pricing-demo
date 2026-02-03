// =============================================================================
// Typography Token Constants
// =============================================================================
// Font weight and size options for control panel dropdowns.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface FontWeightOption {
  label: string
  value: string
  weight: number
}

export interface FontSizeOption {
  label: string
  value: string
  /** Size in rem */
  size: number
  /** Size in pixels (for display) */
  pixels: number
}

export interface LineHeightOption {
  label: string
  value: string
  /** Unitless line-height value */
  lineHeight: number
}

export interface LetterSpacingOption {
  label: string
  value: string
  /** Tracking in em */
  tracking: number
}

// -----------------------------------------------------------------------------
// Font Weight Options
// -----------------------------------------------------------------------------

export const FONT_WEIGHT_OPTIONS: FontWeightOption[] = [
  { label: 'Thin', value: '100', weight: 100 },
  { label: 'Extra Light', value: '200', weight: 200 },
  { label: 'Light', value: '300', weight: 300 },
  { label: 'Regular', value: '400', weight: 400 },
  { label: 'Medium', value: '500', weight: 500 },
  { label: 'Semibold', value: '600', weight: 600 },
  { label: 'Bold', value: '700', weight: 700 },
  { label: 'Extra Bold', value: '800', weight: 800 },
  { label: 'Black', value: '900', weight: 900 },
]

/** Common font weights (without extremes) */
export const COMMON_FONT_WEIGHTS: FontWeightOption[] = [
  { label: 'Light', value: '300', weight: 300 },
  { label: 'Regular', value: '400', weight: 400 },
  { label: 'Medium', value: '500', weight: 500 },
  { label: 'Semibold', value: '600', weight: 600 },
  { label: 'Bold', value: '700', weight: 700 },
]

// -----------------------------------------------------------------------------
// Font Size Options
// -----------------------------------------------------------------------------

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { label: '2XS', value: '2xs', size: 0.625, pixels: 10 },
  { label: 'XS', value: 'xs', size: 0.6875, pixels: 11 },
  { label: 'SM', value: 'sm', size: 0.75, pixels: 12 },
  { label: 'MD', value: 'md', size: 0.875, pixels: 14 },
  { label: 'Base', value: 'base', size: 1, pixels: 16 },
  { label: 'LG', value: 'lg', size: 1.125, pixels: 18 },
  { label: 'XL', value: 'xl', size: 1.25, pixels: 20 },
  { label: '2XL', value: '2xl', size: 1.5, pixels: 24 },
  { label: '3XL', value: '3xl', size: 1.875, pixels: 30 },
  { label: '4XL', value: '4xl', size: 2.25, pixels: 36 },
]

/** Display font sizes (headings) */
export const DISPLAY_FONT_SIZES: FontSizeOption[] = [
  { label: 'Display XS', value: 'display-xs', size: 1.5, pixels: 24 },
  { label: 'Display SM', value: 'display-sm', size: 1.875, pixels: 30 },
  { label: 'Display MD', value: 'display-md', size: 2.25, pixels: 36 },
  { label: 'Display LG', value: 'display-lg', size: 3, pixels: 48 },
  { label: 'Display XL', value: 'display-xl', size: 3.75, pixels: 60 },
  { label: 'Display 2XL', value: 'display-2xl', size: 4.5, pixels: 72 },
]

// -----------------------------------------------------------------------------
// Line Height Options
// -----------------------------------------------------------------------------

export const LINE_HEIGHT_OPTIONS: LineHeightOption[] = [
  { label: 'None', value: 'none', lineHeight: 1 },
  { label: 'Tight', value: 'tight', lineHeight: 1.25 },
  { label: 'Snug', value: 'snug', lineHeight: 1.375 },
  { label: 'Normal', value: 'normal', lineHeight: 1.5 },
  { label: 'Relaxed', value: 'relaxed', lineHeight: 1.625 },
  { label: 'Loose', value: 'loose', lineHeight: 2 },
]

// -----------------------------------------------------------------------------
// Letter Spacing Options
// -----------------------------------------------------------------------------

export const LETTER_SPACING_OPTIONS: LetterSpacingOption[] = [
  { label: 'Tighter', value: 'tighter', tracking: -0.05 },
  { label: 'Tight', value: 'tight', tracking: -0.025 },
  { label: 'Normal', value: 'normal', tracking: 0 },
  { label: 'Wide', value: 'wide', tracking: 0.025 },
  { label: 'Wider', value: 'wider', tracking: 0.05 },
  { label: 'Widest', value: 'widest', tracking: 0.1 },
]

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/** Get font weight by value */
export function getFontWeight(value: string): number {
  return FONT_WEIGHT_OPTIONS.find((w) => w.value === value)?.weight ?? 400
}

/** Get font size in pixels by value */
export function getFontSizePixels(value: string): number {
  const option = FONT_SIZE_OPTIONS.find((s) => s.value === value)
    ?? DISPLAY_FONT_SIZES.find((s) => s.value === value)
  return option?.pixels ?? 16
}

/** Convert typography options to select control format */
export function toSelectOptions<T extends { label: string; value: string }>(options: T[]) {
  return options.map((o) => ({
    label: o.label,
    value: o.value,
  }))
}
