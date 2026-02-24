/**
 * Checklist Control Panel Options
 *
 * Defines all selectable options for the control panel.
 */

// ============================================================================
// Text Size Options
// ============================================================================

export const TEXT_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
] as const

// ============================================================================
// Text Weight Options
// ============================================================================

export const TEXT_WEIGHT_OPTIONS = [
  { label: 'Normal', value: 'normal' },
  { label: 'Medium', value: 'medium' },
  { label: 'Semibold', value: 'semibold' },
  { label: 'Bold', value: 'bold' },
] as const

// ============================================================================
// Semantic Color Options
// ============================================================================

export const SEMANTIC_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Accent', value: 'accent' },
] as const

// ============================================================================
// Icon Color Options (includes inherit)
// ============================================================================

export const ICON_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Accent', value: 'accent' },
  { label: 'Inherit', value: 'inherit' },
] as const

// ============================================================================
// Icon Type Options
// ============================================================================

export const ICON_OPTIONS = [
  { label: 'Checkmark', value: 'checkmark' },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Circle', value: 'circle' },
  { label: 'Star', value: 'star' },
  { label: 'None', value: 'none' },
] as const

// ============================================================================
// Icon Weight Options
// ============================================================================

export const ICON_WEIGHT_OPTIONS = [
  { label: 'Stroke', value: 'stroke' },
  { label: 'Solid', value: 'solid' },
  { label: 'Duotone', value: 'duotone' },
] as const

// ============================================================================
// Icon Size Options
// ============================================================================

export const ICON_SIZE_OPTIONS = [
  { label: 'SM', value: 'sm' },
  { label: 'Base', value: 'base' },
  { label: 'LG', value: 'lg' },
] as const

// ============================================================================
// Item Gap Options
// ============================================================================

export const GAP_OPTIONS = [
  { label: 'Tight', value: 'tight' },
  { label: 'Normal', value: 'normal' },
  { label: 'Relaxed', value: 'relaxed' },
  { label: 'Loose', value: 'loose' },
] as const

// ============================================================================
// Opacity Range
// ============================================================================

export const OPACITY_RANGE = {
  min: 0,
  max: 100,
  step: 5,
  default: 100,
} as const
