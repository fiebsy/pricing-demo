/**
 * Status Icon Control Panel Options
 *
 * These options populate the control panel dropdowns and sliders.
 */

// ============================================================================
// Line Cap Options
// ============================================================================

export const LINE_CAP_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Square', value: 'square' },
  { label: 'Butt', value: 'butt' },
] as const

// ============================================================================
// Dash Pattern Options
// ============================================================================

export const DASH_PATTERN_OPTIONS = [
  { label: 'Solid', value: '' },
  { label: 'Small (2 2)', value: '2 2' },
  { label: 'Medium (4 2)', value: '4 2' },
  { label: 'Large (6 3)', value: '6 3' },
  { label: 'Dotted (1 3)', value: '1 3' },
  { label: 'Long (8 4)', value: '8 4' },
] as const

// ============================================================================
// Fill Type Options
// ============================================================================

export const FILL_TYPE_OPTIONS = [
  { label: 'None', value: 'none', description: 'Empty circle' },
  { label: 'Solid', value: 'solid', description: 'Fill inside stroke' },
  { label: 'Full', value: 'full', description: 'Solid circle, no stroke' },
  { label: 'Pie', value: 'pie', description: 'Progress fill' },
] as const

// ============================================================================
// Icon Stroke Width Options
// ============================================================================

export const ICON_STROKE_WIDTH_OPTIONS = [
  { label: 'Light (1.5)', value: 1.5 },
  { label: 'Regular (2)', value: 2 },
  { label: 'Medium (2.5)', value: 2.5 },
  { label: 'Bold (3)', value: 3 },
] as const

// ============================================================================
// Icon Name Options
// ============================================================================

export const ICON_NAME_OPTIONS = [
  { label: 'Checkmark', value: 'Tick01' },
  { label: 'Cancel', value: 'Cancel01' },
  { label: 'Alert', value: 'Alert02' },
  { label: 'Remove', value: 'Remove01' },
  { label: 'Warning', value: 'AlertDiamond' },
  { label: 'Info', value: 'InformationCircle' },
  { label: 'Clock', value: 'Clock01' },
  { label: 'Dollar', value: 'DollarCircle' },
  { label: 'Clawback Paw', value: 'ClawbackSolid' },
  { label: 'Clawback Alert', value: 'Clawback' },
] as const

// ============================================================================
// Color Options (Semantic Design Tokens)
// ============================================================================
// Using semantic tokens that communicate intent:
// - fg-* for foreground elements (strokes, icons)
// - bg-* for background elements (fills)
// - text-* for text elements

export const STROKE_COLOR_OPTIONS = [
  // Neutral hierarchy
  { label: 'Primary', value: 'fg-primary', color: 'var(--color-fg-primary)' },
  { label: 'Secondary', value: 'fg-secondary', color: 'var(--color-fg-secondary)' },
  { label: 'Tertiary', value: 'fg-tertiary', color: 'var(--color-fg-tertiary)' },
  { label: 'Quaternary', value: 'fg-quaternary', color: 'var(--color-fg-quaternary)' },
  { label: 'Disabled', value: 'fg-disabled', color: 'var(--color-fg-disabled)' },
  // Status
  { label: 'Success', value: 'fg-success-primary', color: 'var(--color-fg-success-primary)' },
  { label: 'Success Light', value: 'fg-success-secondary', color: 'var(--color-fg-success-secondary)' },
  { label: 'Warning', value: 'fg-warning-primary', color: 'var(--color-fg-warning-primary)' },
  { label: 'Warning Light', value: 'fg-warning-secondary', color: 'var(--color-fg-warning-secondary)' },
  { label: 'Error', value: 'fg-error-primary', color: 'var(--color-fg-error-primary)' },
  { label: 'Error Light', value: 'fg-error-secondary', color: 'var(--color-fg-error-secondary)' },
  // Brand
  { label: 'Brand', value: 'fg-brand-primary', color: 'var(--color-fg-brand-primary)' },
  { label: 'Brand Light', value: 'fg-brand-secondary', color: 'var(--color-fg-brand-secondary)' },
] as const

export const FILL_COLOR_OPTIONS = [
  // Neutral hierarchy
  { label: 'Primary', value: 'bg-primary', color: 'var(--color-bg-primary)' },
  { label: 'Secondary', value: 'bg-secondary', color: 'var(--color-bg-secondary)' },
  { label: 'Tertiary', value: 'bg-tertiary', color: 'var(--color-bg-tertiary)' },
  { label: 'Quaternary', value: 'bg-quaternary', color: 'var(--color-bg-quaternary)' },
  // Status light backgrounds
  { label: 'Success Light', value: 'bg-success-primary', color: 'var(--color-bg-success-primary)' },
  { label: 'Success Medium', value: 'bg-success-secondary', color: 'var(--color-bg-success-secondary)' },
  { label: 'Success Solid', value: 'bg-success-solid', color: 'var(--color-bg-success-solid)' },
  { label: 'Warning Light', value: 'bg-warning-primary', color: 'var(--color-bg-warning-primary)' },
  { label: 'Warning Medium', value: 'bg-warning-secondary', color: 'var(--color-bg-warning-secondary)' },
  { label: 'Warning Solid', value: 'bg-warning-solid', color: 'var(--color-bg-warning-solid)' },
  { label: 'Error Light', value: 'bg-error-primary', color: 'var(--color-bg-error-primary)' },
  { label: 'Error Medium', value: 'bg-error-secondary', color: 'var(--color-bg-error-secondary)' },
  { label: 'Error Solid', value: 'bg-error-solid', color: 'var(--color-bg-error-solid)' },
  // Brand
  { label: 'Brand Light', value: 'bg-brand-primary', color: 'var(--color-bg-brand-primary)' },
  { label: 'Brand Medium', value: 'bg-brand-secondary', color: 'var(--color-bg-brand-secondary)' },
  { label: 'Brand Solid', value: 'bg-brand-solid', color: 'var(--color-bg-brand-solid)' },
] as const

export const ICON_COLOR_OPTIONS = [
  // Neutral hierarchy
  { label: 'Primary', value: 'fg-primary', color: 'var(--color-fg-primary)' },
  { label: 'Secondary', value: 'fg-secondary', color: 'var(--color-fg-secondary)' },
  { label: 'Tertiary', value: 'fg-tertiary', color: 'var(--color-fg-tertiary)' },
  { label: 'Quaternary', value: 'fg-quaternary', color: 'var(--color-fg-quaternary)' },
  { label: 'Disabled', value: 'fg-disabled', color: 'var(--color-fg-disabled)' },
  // Status
  { label: 'Success', value: 'fg-success-primary', color: 'var(--color-fg-success-primary)' },
  { label: 'Success Light', value: 'fg-success-secondary', color: 'var(--color-fg-success-secondary)' },
  { label: 'Warning', value: 'fg-warning-primary', color: 'var(--color-fg-warning-primary)' },
  { label: 'Warning Light', value: 'fg-warning-secondary', color: 'var(--color-fg-warning-secondary)' },
  { label: 'Error', value: 'fg-error-primary', color: 'var(--color-fg-error-primary)' },
  { label: 'Error Light', value: 'fg-error-secondary', color: 'var(--color-fg-error-secondary)' },
  // Brand
  { label: 'Brand', value: 'fg-brand-primary', color: 'var(--color-fg-brand-primary)' },
  { label: 'Brand Light', value: 'fg-brand-secondary', color: 'var(--color-fg-brand-secondary)' },
  // Special
  { label: 'White', value: 'fg-white', color: 'var(--color-fg-white)' },
] as const

export const TEXT_COLOR_OPTIONS = [
  // Text hierarchy
  { label: 'Primary', value: 'text-primary', color: 'var(--color-text-primary)' },
  { label: 'Secondary', value: 'text-secondary', color: 'var(--color-text-secondary)' },
  { label: 'Tertiary', value: 'text-tertiary', color: 'var(--color-text-tertiary)' },
  { label: 'Quaternary', value: 'text-quaternary', color: 'var(--color-text-quaternary)' },
  // Status text
  { label: 'Success', value: 'text-success-primary', color: 'var(--color-text-success-primary)' },
  { label: 'Warning', value: 'text-warning-primary', color: 'var(--color-text-warning-primary)' },
  { label: 'Error', value: 'text-error-primary', color: 'var(--color-text-error-primary)' },
] as const

// ============================================================================
// Text Options
// ============================================================================

export const TEXT_SIZE_OPTIONS = [
  { label: 'Extra Small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
] as const

export const TEXT_WEIGHT_OPTIONS = [
  { label: 'Regular', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
] as const

export const TEXT_POSITION_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
] as const
