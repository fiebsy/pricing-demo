/**
 * Control Panel Options for SuccessToast
 *
 * These options map directly to our semantic token system.
 */

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

export const SHINE_TYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0 (195°)', value: 'shine-0' },
  { label: 'Shine 1 (180°)', value: 'shine-1' },
  { label: 'Shine 2 (Theme)', value: 'shine-2' },
  { label: 'Shine 3 (Enhanced)', value: 'shine-3' },
  { label: 'Brand', value: 'shine-brand' },
] as const

export const SHINE_INTENSITY_OPTIONS = [
  { label: 'Normal', value: '' },
  { label: 'Subtle', value: '-subtle' },
  { label: 'Intense', value: '-intense' },
] as const

export const CORNER_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
  { label: 'Bevel', value: 'bevel' },
  { label: 'Scoop', value: 'scoop' },
] as const

export const ICON_BACKGROUND_OPTIONS = [
  { label: 'Success Primary/10', value: 'success-primary/10' },
  { label: 'Success Primary/20', value: 'success-primary/20' },
  { label: 'Brand Primary/10', value: 'brand-primary/10' },
  { label: 'Brand Primary/20', value: 'brand-primary/20' },
  { label: 'Tertiary', value: 'tertiary' },
] as const

export const ICON_COLOR_OPTIONS = [
  { label: 'Success Primary', value: 'success-primary' },
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
] as const

export const TEXT_SIZE_OPTIONS = [
  { label: 'XS', value: 'text-xs' },
  { label: 'SM', value: 'text-sm' },
  { label: 'Base', value: 'text-base' },
  { label: 'LG', value: 'text-lg' },
] as const

export const TEXT_WEIGHT_OPTIONS = [
  { label: 'Normal', value: 'font-normal' },
  { label: 'Medium', value: 'font-medium' },
  { label: 'Semibold', value: 'font-semibold' },
  { label: 'Bold', value: 'font-bold' },
] as const

export const TEXT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand Primary', value: 'brand-primary' },
] as const

export const PROGRESS_BG_OPTIONS = [
  { label: 'Tertiary/20', value: 'tertiary/20' },
  { label: 'Tertiary/10', value: 'tertiary/10' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Transparent', value: 'transparent' },
] as const

export const PROGRESS_FILL_OPTIONS = [
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Success Primary', value: 'success-primary' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
] as const

export const ANIMATION_DIRECTION_OPTIONS = [
  { label: 'Right', value: 'right' },
  { label: 'Left', value: 'left' },
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
] as const
