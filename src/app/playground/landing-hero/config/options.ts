/**
 * Landing Hero Control Panel Options
 *
 * These options map directly to the LandingHero component props.
 */

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
// Blur Circle Options
// ============================================================================

export const BLUR_CIRCLE_COLOR_OPTIONS = [
  { label: 'Brand Solid', value: 'brand-solid' },
  { label: 'Brand', value: 'brand' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' },
] as const

export const BLUR_CIRCLE_POSITION_OPTIONS = [
  { label: 'Center of Page', value: 'center' },
  { label: 'Behind Asset', value: 'asset' },
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
