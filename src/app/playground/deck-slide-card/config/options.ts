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
  { label: 'Gradient', value: 'gradient' },
] as const

export const GRADIENT_COLORS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand Primary', value: 'brand-primary' },
  { label: 'Brand Secondary', value: 'brand-secondary' },
  { label: 'Brand Solid', value: 'brand-solid' },
  { label: 'White', value: 'white' },
] as const

export const GRADIENT_DIRECTIONS = [
  { label: 'Bottom Right (↘)', value: 'to-br' },
  { label: 'Bottom Left (↙)', value: 'to-bl' },
  { label: 'Top Right (↗)', value: 'to-tr' },
  { label: 'Top Left (↖)', value: 'to-tl' },
  { label: 'Bottom (↓)', value: 'to-b' },
  { label: 'Top (↑)', value: 'to-t' },
  { label: 'Right (→)', value: 'to-r' },
  { label: 'Left (←)', value: 'to-l' },
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

export const TEXT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand', value: 'brand' },
  { label: 'Success', value: 'success' },
  { label: 'Error', value: 'error' },
] as const

export const TEXT_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: 'Display XS', value: 'display-xs' },
  { label: 'Display SM', value: 'display-sm' },
  { label: 'Display MD', value: 'display-md' },
  { label: 'Display LG', value: 'display-lg' },
  { label: 'Display XL', value: 'display-xl' },
  { label: 'Display 2XL', value: 'display-2xl' },
] as const

export const CONTENT_TYPE_OPTIONS = [
  { label: 'Stat Card', value: 'stat' },
  { label: 'Bullet Points', value: 'bullet' },
  { label: 'Team Member', value: 'team' },
  { label: 'Chart Container', value: 'chart' },
  { label: 'Custom Content', value: 'custom' },
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

export const ASPECT_RATIO_OPTIONS = [
  { label: 'Auto', value: 'auto' },
  { label: 'Square (1:1)', value: '1/1' },
  { label: 'Classic (4:3)', value: '4/3' },
  { label: 'Wide (16:9)', value: '16/9' },
  { label: 'Ultra Wide (21:9)', value: '21/9' },
] as const