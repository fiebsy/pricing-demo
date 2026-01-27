/**
 * Question Command Menu V3 - Appearance Options
 *
 * Options for background, shine, shadow, gradient, and border styling.
 */

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

export const BACKGROUND_WITH_NONE_OPTIONS = [
  { label: 'None', value: 'none' },
  ...BACKGROUND_OPTIONS,
] as const

export const SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Brand', value: 'shine-brand' },
] as const

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
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

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand', value: 'brand' },
] as const
