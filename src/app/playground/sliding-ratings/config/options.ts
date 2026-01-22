/**
 * Sliding Ratings Panel - Control Panel Options
 *
 * Options for the control panel dropdowns and selects.
 * References semantic token system.
 *
 * @module playground/sliding-ratings/config
 */

// =============================================================================
// BACKGROUND OPTIONS
// =============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

// =============================================================================
// SHINE OPTIONS
// =============================================================================

export const SHINE_TYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0 (195deg)', value: 'shine-0' },
  { label: 'Shine 1 (180deg)', value: 'shine-1' },
  { label: 'Shine 2 (Theme)', value: 'shine-2' },
  { label: 'Shine 3 (Enhanced)', value: 'shine-3' },
  { label: 'Brand', value: 'shine-brand' },
] as const

export const SHINE_INTENSITY_OPTIONS = [
  { label: 'Normal', value: '' },
  { label: 'Subtle', value: '-subtle' },
  { label: 'Intense', value: '-intense' },
] as const

// =============================================================================
// SHADOW OPTIONS
// =============================================================================

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
] as const

// =============================================================================
// BORDER OPTIONS
// =============================================================================

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
] as const

export const DIVIDER_STYLE_OPTIONS = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
] as const

// =============================================================================
// SIZE OPTIONS
// =============================================================================

export const PROGRESS_BAR_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

export const TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
] as const

// =============================================================================
// ANIMATION OPTIONS
// =============================================================================

export const PANEL_TRANSITION_MODE_OPTIONS = [
  { label: 'Slide', value: 'slide' },
  { label: 'Pop Layout', value: 'popLayout' },
] as const

export const SCALE_ORIGIN_OPTIONS = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top', value: 'top' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Bottom Right', value: 'bottom-right' },
] as const

// =============================================================================
// BACK BUTTON OPTIONS
// =============================================================================

export const BACK_BUTTON_STYLE_OPTIONS = [
  { label: 'Minimal', value: 'minimal' },
  { label: 'Pill', value: 'pill' },
  { label: 'Ghost', value: 'ghost' },
] as const

export const BACK_BUTTON_POSITION_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
] as const
