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
  { label: 'Pricing Select', value: 'pricing-select' },
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

// ============================================================================
// HEADER OPTIONS
// ============================================================================

export const TEXT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
] as const

export const FONT_WEIGHT_OPTIONS = [
  { label: 'Light', value: 'light' },
  { label: 'Normal', value: 'normal' },
  { label: 'Medium', value: 'medium' },
  { label: 'Semibold', value: 'semibold' },
  { label: 'Bold', value: 'bold' },
  { label: 'Extrabold', value: 'extrabold' },
] as const

export const PRICE_ROW_ALIGN_OPTIONS = [
  { label: 'Baseline', value: 'baseline' },
  { label: 'Center', value: 'center' },
  { label: 'Bottom', value: 'bottom' },
] as const

export const FONT_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
  { label: '3XL', value: '3xl' },
] as const

export const OPACITY_OPTIONS = [
  { label: '100%', value: '100' },
  { label: '80%', value: '80' },
  { label: '60%', value: '60' },
  { label: '40%', value: '40' },
] as const

// ============================================================================
// DISPLAY MODE OPTIONS
// ============================================================================

export const DISPLAY_MODE_OPTIONS = [
  { label: 'Text', value: 'text' },
  { label: 'Badge', value: 'badge' },
] as const

export const BADGE_COLOR_OPTIONS = [
  { label: 'Gray', value: 'gray' },
  { label: 'Brand', value: 'brand' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
] as const

export const LABEL_LAYOUT_OPTIONS = [
  { label: 'Inline', value: 'inline' },
  { label: 'Stacked', value: 'stacked' },
] as const

export const SEPARATOR_OPTIONS = [
  { label: 'Dash', value: ' - ' },
  { label: 'Pipe', value: ' | ' },
  { label: 'Bullet', value: ' • ' },
  { label: 'None', value: '' },
] as const

// ============================================================================
// TIER OPTIONS
// ============================================================================

export const TIER_OPTIONS = [
  { label: 'Pro (100)', value: 'tier-100' },
  { label: 'Pro 2X (200)', value: 'tier-200' },
  { label: 'Pro 3X (300)', value: 'tier-300' },
  { label: 'Pro 4X (400)', value: 'tier-400' },
  { label: 'Pro 5X (500)', value: 'tier-500' },
  { label: 'Pro 6X (600)', value: 'tier-600' },
] as const

// ============================================================================
// VARIANT B OPTIONS
// ============================================================================

export const RIGHT_SOURCE_OPTIONS = [
  { label: 'Plan Name', value: 'planName' },
  { label: 'Events', value: 'events' },
  { label: 'Price', value: 'price' },
  { label: 'Recurring Price', value: 'recurringPrice' },
  { label: 'Additional Credits', value: 'additionalCredits' },
  { label: 'Upgrade Fee', value: 'upgradeFee' },
] as const

export const HEADER_MODE_OPTIONS = [
  { label: 'Shared (Container)', value: 'shared' },
  { label: 'Separate', value: 'separate' },
] as const

export const VARIANT_TRANSITION_TYPE_OPTIONS = [
  { label: 'Spring', value: 'spring' },
  { label: 'Tween', value: 'tween' },
] as const
