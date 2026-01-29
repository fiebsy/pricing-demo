/**
 * Control Panel Options
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
  { label: 'Transparent', value: 'transparent' },
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
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
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

export const ANIMATION_TYPE_OPTIONS = [
  { label: 'Fade', value: 'fade' },
  { label: 'Scale', value: 'scale' },
  { label: 'Slide Up', value: 'slideUp' },
  { label: 'Slide Down', value: 'slideDown' },
] as const

export const ANIMATION_EASING_OPTIONS = [
  { label: 'Ease Out', value: 'easeOut' },
  { label: 'Ease In Out', value: 'easeInOut' },
  { label: 'Linear', value: 'linear' },
  { label: 'Spring', value: 'spring' },
] as const

export const CONTENT_TYPE_OPTIONS = [
  { label: 'Chart', value: 'chart' },
  { label: 'Stat', value: 'stat' },
  { label: 'Team', value: 'team' },
  { label: 'Logo', value: 'logo' },
  { label: 'Custom', value: 'custom' },
] as const

export const WIDTH_OPTIONS = [
  { label: 'Auto', value: 'auto' },
  { label: 'Full', value: 'full' },
  { label: 'Fixed', value: 'fixed' },
] as const

export const HEIGHT_OPTIONS = [
  { label: 'Auto', value: 'auto' },
  { label: 'Full', value: 'full' },
  { label: 'Fixed', value: 'fixed' },
] as const

export const BAR_COLOR_OPTIONS = [
  // Semantic colors
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Brand Secondary', value: 'brand-secondary' },
  { label: 'Brand Solid', value: 'brand-solid' },
  // Gray shades
  { label: 'Gray 50', value: 'gray-50' },
  { label: 'Gray 100', value: 'gray-100' },
  { label: 'Gray 200', value: 'gray-200' },
  { label: 'Gray 300', value: 'gray-300' },
  { label: 'Gray 400', value: 'gray-400' },
  { label: 'Gray 500', value: 'gray-500' },
  { label: 'Gray 600', value: 'gray-600' },
  { label: 'Gray 700', value: 'gray-700' },
  { label: 'Gray 800', value: 'gray-800' },
  { label: 'Gray 900', value: 'gray-900' },
  { label: 'Gray 950', value: 'gray-950' },
  // Slate shades
  { label: 'Slate 400', value: 'slate-400' },
  { label: 'Slate 500', value: 'slate-500' },
  { label: 'Slate 600', value: 'slate-600' },
  { label: 'Slate 700', value: 'slate-700' },
  // Zinc shades
  { label: 'Zinc 400', value: 'zinc-400' },
  { label: 'Zinc 500', value: 'zinc-500' },
  { label: 'Zinc 600', value: 'zinc-600' },
  { label: 'Zinc 700', value: 'zinc-700' },
] as const

export const BAR_SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0', value: 'shine-0' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Shine Brand', value: 'shine-brand' },
] as const

export const BAR_CORNER_OPTIONS = [
  { label: 'Round (default)', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
  { label: 'Bevel', value: 'bevel' },
  { label: 'Scoop', value: 'scoop' },
  { label: 'Sharp', value: 'sharp' },
] as const