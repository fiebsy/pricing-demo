/**
 * Landing Hero Control Panel Options
 *
 * These options map directly to the LandingHero component props.
 */

// ============================================================================
// Media Type Options
// ============================================================================

export const MEDIA_TYPE_OPTIONS = [
  { label: 'Image', value: 'image' },
  { label: 'Video', value: 'video' },
] as const

export const HERO_SIZE_OPTIONS = [
  { label: 'Current (S)', value: 'current' },
  { label: 'Medium', value: 'M' },
  { label: 'Large', value: 'L' },
] as const

// ============================================================================
// Pattern Options
// ============================================================================

export const PATTERN_TYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Dots', value: 'dots' },
  { label: 'Grid', value: 'grid' },
  { label: 'Diagonal', value: 'diagonal' },
] as const

// ============================================================================
// Glow Options
// ============================================================================

export const GLOW_COLOR_OPTIONS = [
  { label: 'Brand Solid', value: 'brand-solid' },
  { label: 'Brand', value: 'brand' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' },
  { label: 'Gray', value: 'gray' },
] as const

export const GLOW_POSITION_OPTIONS = [
  { label: 'Center of Page', value: 'center' },
  { label: 'Behind Asset', value: 'asset' },
] as const

export const GLOW_SHAPE_OPTIONS = [
  { label: 'Circle', value: 'circle' },
  { label: 'Blob', value: 'blob' },
  { label: 'Blob 2', value: 'blob-2' },
  { label: 'Blob 3', value: 'blob-3' },
] as const

// ============================================================================
// Shine Options
// ============================================================================

export const SHINE_TYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0', value: 'shine-0' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Brand', value: 'shine-brand' },
] as const

export const SHINE_INTENSITY_OPTIONS = [
  { label: 'Normal', value: '' },
  { label: 'Extra Subtle', value: '-extra-subtle' },
  { label: 'Subtle', value: '-subtle' },
  { label: 'Intense', value: '-intense' },
] as const

// ============================================================================
// Shadow Options
// ============================================================================

export const SHADOW_SIZE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

// ============================================================================
// Corner Options
// ============================================================================

export const CORNER_STYLE_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
] as const

// ============================================================================
// Backdrop Blur Options
// ============================================================================

export const BACKDROP_BLUR_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

// ============================================================================
// Squircle Level Options
// ============================================================================

export const SQUIRCLE_LEVEL_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle', value: 'subtle' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'iOS', value: 'ios' },
  { label: 'Pill', value: 'pill' },
  { label: 'Pill XL', value: 'pill-xl' },
] as const

// ============================================================================
// Text Size Options
// ============================================================================

export const TEXT_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: '3XL', value: '3xl' },
  { label: '4XL', value: '4xl' },
] as const
