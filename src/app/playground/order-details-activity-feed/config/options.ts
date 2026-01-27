/**
 * Control Panel Options for Order Details Activity Feed
 *
 * These options map directly to our semantic token system.
 * See: src/styles/docs/reference/all-utilities.md
 */

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Brand Secondary', value: 'brand-secondary' },
  { label: 'Brand Solid', value: 'brand-solid' },
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

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
] as const

export const DEPTH_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle (1)', value: 'depth-gradient-1' },
  { label: 'Medium (2)', value: 'depth-gradient-2' },
  { label: 'Strong (3)', value: 'depth-gradient-3' },
] as const

export const CORNER_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
  { label: 'Bevel', value: 'bevel' },
  { label: 'Scoop', value: 'scoop' },
] as const

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
] as const

export const VARIANT_OPTIONS = [
  { label: 'Minimal', value: 'minimal' },
  { label: 'Default', value: 'default' },
] as const

export const TAB_OPTIONS = [
  { label: 'Activity', value: 'activity' },
  { label: 'Payouts', value: 'payouts' },
  { label: 'Info', value: 'info' },
] as const

export const HEADER_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2X Large', value: '2xl' },
] as const

export const TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'lg' },
] as const

export const MESSAGE_SIZE_OPTIONS = [
  { label: 'Base', value: 'base' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
] as const

export const SPACING_OPTIONS = [
  { label: 'Compact', value: 'compact' },
  { label: 'Default', value: 'default' },
  { label: 'Spacious', value: 'spacious' },
] as const

export const MAX_WIDTH_OPTIONS = [
  { label: '640px (sm)', value: '640px' },
  { label: '768px (md)', value: '768px' },
  { label: '1024px (lg)', value: '1024px' },
  { label: '1280px (xl)', value: '1280px' },
  { label: '1536px (2xl)', value: '1536px' },
] as const