/**
 * Control Panel Options for BiaxialExpand Playground
 *
 * These options map to BiaxialExpand configuration values.
 */

// ============================================================================
// DEMO OPTIONS
// ============================================================================

export const DEMO_VARIANT_OPTIONS = [
  { label: 'Command Menu', value: 'command-menu' },
  { label: 'Dashboard Metric', value: 'dashboard-metric' },
  { label: 'Custom', value: 'custom' },
] as const

export const PAGE_BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
] as const

// ============================================================================
// BACKGROUND & BORDER OPTIONS
// ============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
] as const

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Brand', value: 'brand' },
] as const

// ============================================================================
// APPEARANCE OPTIONS
// ============================================================================

export const BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2X Large', value: '2xl' },
] as const

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra Large', value: 'xl' },
  { label: '2X Large', value: '2xl' },
] as const

export const SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 0', value: 'shine-0' },
  { label: 'Shine 0 Subtle', value: 'shine-0-subtle' },
  { label: 'Shine 0 Intense', value: 'shine-0-intense' },
  { label: 'Shine 1', value: 'shine-1' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 1 Intense', value: 'shine-1-intense' },
  { label: 'Shine 2', value: 'shine-2' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
  { label: 'Shine 2 Intense', value: 'shine-2-intense' },
  { label: 'Shine 3', value: 'shine-3' },
  { label: 'Shine 3 Subtle', value: 'shine-3-subtle' },
  { label: 'Shine 3 Intense', value: 'shine-3-intense' },
  { label: 'Shine Brand', value: 'shine-brand' },
  { label: 'Shine Brand Subtle', value: 'shine-brand-subtle' },
  { label: 'Shine Brand Intense', value: 'shine-brand-intense' },
] as const

export const GRADIENT_PATTERN_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle Depth SM', value: 'subtle-depth-sm' },
  { label: 'Subtle Depth MD', value: 'subtle-depth-md' },
  { label: 'Subtle Depth LG', value: 'subtle-depth-lg' },
  { label: 'Subtle Depth XL', value: 'subtle-depth-xl' },
] as const

export const GRADIENT_COLOR_OPTIONS = [
  { label: 'Brand', value: 'brand' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Gray', value: 'gray' },
  { label: 'Gray Light', value: 'gray-light' },
] as const

// ============================================================================
// ANIMATION OPTIONS
// ============================================================================

export const BACKDROP_MODE_OPTIONS = [
  { label: 'Size', value: 'size' },
  { label: 'Clip Path', value: 'clip-path' },
] as const

export const EXPAND_ORIGIN_OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
] as const

export const EXPAND_ORIGIN_X_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
] as const

export const POSITION_MODE_OPTIONS = [
  { label: 'Overlay', value: 'overlay' },
  { label: 'Push', value: 'push' },
] as const

// ============================================================================
// SLOT OPTIONS
// ============================================================================

export const HEIGHT_MODE_OPTIONS = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Auto', value: 'auto' },
  { label: 'Dynamic', value: 'dynamic' },
] as const

export const DIMENSION_MODE_OPTIONS = [
  { label: 'Full', value: 'full' },
  { label: 'Fixed', value: 'fixed' },
  { label: 'Dynamic', value: 'dynamic' },
] as const

export const SLOT_SHINE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Shine 1 Subtle', value: 'shine-1-subtle' },
  { label: 'Shine 2 Subtle', value: 'shine-2-subtle' },
] as const

export const VERTICAL_ALIGN_OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Full', value: 'full' },
] as const
