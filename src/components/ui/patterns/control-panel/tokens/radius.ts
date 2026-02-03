// =============================================================================
// Border Radius Token Constants
// =============================================================================
// Border radius options for control panel dropdowns.
// Matches Tailwind CSS border-radius scale.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface RadiusOption {
  label: string
  value: string
  /** Radius in pixels */
  pixels: number
  /** Tailwind class suffix */
  className: string
}

// -----------------------------------------------------------------------------
// Border Radius Options
// -----------------------------------------------------------------------------

export const BORDER_RADIUS_OPTIONS: RadiusOption[] = [
  { label: 'None', value: 'none', pixels: 0, className: 'rounded-none' },
  { label: 'SM', value: 'sm', pixels: 2, className: 'rounded-sm' },
  { label: 'Default', value: 'default', pixels: 4, className: 'rounded' },
  { label: 'MD', value: 'md', pixels: 6, className: 'rounded-md' },
  { label: 'LG', value: 'lg', pixels: 8, className: 'rounded-lg' },
  { label: 'XL', value: 'xl', pixels: 12, className: 'rounded-xl' },
  { label: '2XL', value: '2xl', pixels: 16, className: 'rounded-2xl' },
  { label: '3XL', value: '3xl', pixels: 24, className: 'rounded-3xl' },
  { label: 'Full', value: 'full', pixels: 9999, className: 'rounded-full' },
]

/** Common radius options (without extremes) */
export const COMMON_RADIUS_OPTIONS: RadiusOption[] = [
  { label: 'None', value: 'none', pixels: 0, className: 'rounded-none' },
  { label: 'SM', value: 'sm', pixels: 2, className: 'rounded-sm' },
  { label: 'MD', value: 'md', pixels: 6, className: 'rounded-md' },
  { label: 'LG', value: 'lg', pixels: 8, className: 'rounded-lg' },
  { label: 'XL', value: 'xl', pixels: 12, className: 'rounded-xl' },
  { label: 'Full', value: 'full', pixels: 9999, className: 'rounded-full' },
]

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/** Get radius pixels by value */
export function getRadiusPixels(value: string): number {
  return BORDER_RADIUS_OPTIONS.find((r) => r.value === value)?.pixels ?? 4
}

/** Get Tailwind class by value */
export function getRadiusClassName(value: string): string {
  return BORDER_RADIUS_OPTIONS.find((r) => r.value === value)?.className ?? 'rounded'
}

/** Convert radius options to select control format */
export function toSelectOptions(options: RadiusOption[]) {
  return options.map((r) => ({
    label: r.label,
    value: r.value,
  }))
}
