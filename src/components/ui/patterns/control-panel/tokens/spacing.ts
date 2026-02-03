// =============================================================================
// Spacing Token Constants
// =============================================================================
// Gap, padding, and margin options for control panel dropdowns.
// Matches Tailwind CSS spacing scale.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SpacingOption {
  label: string
  value: string
  /** Spacing in pixels */
  pixels: number
  /** Tailwind class suffix (e.g., '4' for gap-4) */
  twValue: string
}

// -----------------------------------------------------------------------------
// Spacing Scale (Tailwind default)
// -----------------------------------------------------------------------------

export const SPACING_SCALE: SpacingOption[] = [
  { label: '0', value: '0', pixels: 0, twValue: '0' },
  { label: '0.5', value: '0.5', pixels: 2, twValue: '0.5' },
  { label: '1', value: '1', pixels: 4, twValue: '1' },
  { label: '1.5', value: '1.5', pixels: 6, twValue: '1.5' },
  { label: '2', value: '2', pixels: 8, twValue: '2' },
  { label: '2.5', value: '2.5', pixels: 10, twValue: '2.5' },
  { label: '3', value: '3', pixels: 12, twValue: '3' },
  { label: '3.5', value: '3.5', pixels: 14, twValue: '3.5' },
  { label: '4', value: '4', pixels: 16, twValue: '4' },
  { label: '5', value: '5', pixels: 20, twValue: '5' },
  { label: '6', value: '6', pixels: 24, twValue: '6' },
  { label: '7', value: '7', pixels: 28, twValue: '7' },
  { label: '8', value: '8', pixels: 32, twValue: '8' },
  { label: '9', value: '9', pixels: 36, twValue: '9' },
  { label: '10', value: '10', pixels: 40, twValue: '10' },
  { label: '11', value: '11', pixels: 44, twValue: '11' },
  { label: '12', value: '12', pixels: 48, twValue: '12' },
  { label: '14', value: '14', pixels: 56, twValue: '14' },
  { label: '16', value: '16', pixels: 64, twValue: '16' },
  { label: '20', value: '20', pixels: 80, twValue: '20' },
  { label: '24', value: '24', pixels: 96, twValue: '24' },
]

// -----------------------------------------------------------------------------
// Gap Options (commonly used subset)
// -----------------------------------------------------------------------------

export const GAP_OPTIONS: SpacingOption[] = [
  { label: 'None', value: '0', pixels: 0, twValue: '0' },
  { label: 'XS (2px)', value: '0.5', pixels: 2, twValue: '0.5' },
  { label: 'SM (4px)', value: '1', pixels: 4, twValue: '1' },
  { label: 'MD (8px)', value: '2', pixels: 8, twValue: '2' },
  { label: 'LG (12px)', value: '3', pixels: 12, twValue: '3' },
  { label: 'XL (16px)', value: '4', pixels: 16, twValue: '4' },
  { label: '2XL (24px)', value: '6', pixels: 24, twValue: '6' },
  { label: '3XL (32px)', value: '8', pixels: 32, twValue: '8' },
]

// -----------------------------------------------------------------------------
// Padding Options (commonly used subset)
// -----------------------------------------------------------------------------

export const PADDING_OPTIONS: SpacingOption[] = [
  { label: 'None', value: '0', pixels: 0, twValue: '0' },
  { label: 'XS (4px)', value: '1', pixels: 4, twValue: '1' },
  { label: 'SM (8px)', value: '2', pixels: 8, twValue: '2' },
  { label: 'MD (12px)', value: '3', pixels: 12, twValue: '3' },
  { label: 'LG (16px)', value: '4', pixels: 16, twValue: '4' },
  { label: 'XL (20px)', value: '5', pixels: 20, twValue: '5' },
  { label: '2XL (24px)', value: '6', pixels: 24, twValue: '6' },
  { label: '3XL (32px)', value: '8', pixels: 32, twValue: '8' },
]

// -----------------------------------------------------------------------------
// Margin Options (same as padding)
// -----------------------------------------------------------------------------

export const MARGIN_OPTIONS = PADDING_OPTIONS

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/** Get spacing pixels by value */
export function getSpacingPixels(value: string): number {
  return SPACING_SCALE.find((s) => s.value === value)?.pixels ?? 0
}

/** Get Tailwind gap class */
export function getGapClassName(value: string): string {
  const option = GAP_OPTIONS.find((g) => g.value === value)
  return option ? `gap-${option.twValue}` : ''
}

/** Get Tailwind padding class */
export function getPaddingClassName(value: string, direction?: 'x' | 'y' | 't' | 'r' | 'b' | 'l'): string {
  const option = PADDING_OPTIONS.find((p) => p.value === value)
  if (!option) return ''
  const prefix = direction ? `p${direction}` : 'p'
  return `${prefix}-${option.twValue}`
}

/** Convert spacing options to select control format */
export function toSelectOptions(options: SpacingOption[]) {
  return options.map((s) => ({
    label: s.label,
    value: s.value,
  }))
}
