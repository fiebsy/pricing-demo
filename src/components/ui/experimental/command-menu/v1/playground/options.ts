/**
 * Biaxial Command Menu Playground - Control Options
 *
 * Centralized options for control panel dropdowns and configuration.
 */

// ============================================================================
// APPEARANCE OPTIONS (aligned with core Menu)
// ============================================================================

export const SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Shine Brand', value: 'shine-brand' },
] as const

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

export const GRADIENT_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle SM', value: 'subtle-depth-sm' },
  { label: 'Subtle MD', value: 'subtle-depth-md' },
  { label: 'Subtle LG', value: 'subtle-depth-lg' },
  { label: 'Subtle XL', value: 'subtle-depth-xl' },
] as const

export const GRADIENT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
  { label: 'Gray', value: 'gray' },
] as const

// Background options with 'none' for input/menu backgrounds
export const AREA_BACKGROUND_OPTIONS = [
  { label: 'None', value: 'none' },
  ...BACKGROUND_OPTIONS,
] as const
