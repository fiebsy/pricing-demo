/**
 * Quick Fix Interactions - Control Options
 *
 * Options for the UnifiedControlPanel controls.
 *
 * @module playground/quick-fix-interactions/config
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

export const ISLAND_BACKGROUND_OPTIONS = [
  { label: 'Dark Glass', value: 'rgba(26, 26, 26, 0.9)' },
  { label: 'Dark Solid', value: '#1a1a1a' },
  { label: 'Primary', value: 'primary' },
  { label: 'Brand Glass', value: 'rgba(var(--brand-primary), 0.1)' },
] as const

// =============================================================================
// BORDER OPTIONS
// =============================================================================

export const BORDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
  { label: 'White 10%', value: 'white/10' },
  { label: 'White 20%', value: 'white/20' },
] as const

// =============================================================================
// SHADOW OPTIONS
// =============================================================================

export const SHADOW_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
  { label: '2XL', value: '2xl' },
] as const

// =============================================================================
// SHINE OPTIONS
// =============================================================================

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

// =============================================================================
// CORNER SHAPE OPTIONS
// =============================================================================

export const CORNER_SHAPE_OPTIONS = [
  { label: 'Round', value: 'round' },
  { label: 'Squircle', value: 'squircle' },
] as const

// =============================================================================
// TEXT OPTIONS
// =============================================================================

export const FONT_SIZE_OPTIONS = [
  { label: 'XS', value: 'text-xs' },
  { label: 'SM', value: 'text-sm' },
  { label: 'Base', value: 'text-base' },
  { label: 'LG', value: 'text-lg' },
  { label: 'XL', value: 'text-xl' },
] as const

export const FONT_WEIGHT_OPTIONS = [
  { label: 'Normal', value: 'font-normal' },
  { label: 'Medium', value: 'font-medium' },
  { label: 'Semibold', value: 'font-semibold' },
  { label: 'Bold', value: 'font-bold' },
] as const

export const TEXT_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'White', value: 'white' },
] as const

// =============================================================================
// ICON OPTIONS
// =============================================================================

export const ICON_SIZE_OPTIONS = [
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
] as const

// =============================================================================
// FEEDBACK COLOR OPTIONS
// =============================================================================

export const SUCCESS_COLOR_OPTIONS = [
  { label: 'Success Primary', value: 'success-primary' },
  { label: 'Success 10%', value: 'success-primary/10' },
  { label: 'Success 20%', value: 'success-primary/20' },
  { label: 'Green 500', value: 'green-500' },
] as const

export const ERROR_COLOR_OPTIONS = [
  { label: 'Error Primary', value: 'error-primary' },
  { label: 'Error 10%', value: 'error-primary/10' },
  { label: 'Error 20%', value: 'error-primary/20' },
  { label: 'Red 500', value: 'red-500' },
] as const

// =============================================================================
// BULLET STYLE OPTIONS
// =============================================================================

export const BULLET_STYLE_OPTIONS = [
  { label: 'Dot', value: 'dot' },
  { label: 'Check', value: 'check' },
  { label: 'Arrow', value: 'arrow' },
] as const

// =============================================================================
// BUTTON STYLE OPTIONS
// =============================================================================

export const BUTTON_STYLE_OPTIONS = [
  { label: 'Solid', value: 'solid' },
  { label: 'Outline', value: 'outline' },
  { label: 'Ghost', value: 'ghost' },
] as const

export const BUTTON_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'XL', value: 'xl' },
] as const

export const BUTTON_ROUNDNESS_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Pill', value: 'pill' },
  { label: 'Squircle', value: 'squircle' },
] as const

export const BUTTON_DISPLAY_MODE_OPTIONS = [
  { label: 'Icon Only', value: 'icon-only' },
  { label: 'Text Only', value: 'text-only' },
  { label: 'Icon + Text', value: 'icon-text' },
] as const

export const BUTTON_VARIANT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Shine', value: 'shine' },
  { label: 'Success (Primary)', value: 'primary-success' },
  { label: 'Success (Secondary)', value: 'secondary-success' },
  { label: 'Success (Tertiary)', value: 'tertiary-success' },
  { label: 'Destructive (Primary)', value: 'primary-destructive' },
  { label: 'Destructive (Secondary)', value: 'secondary-destructive' },
  { label: 'Destructive (Tertiary)', value: 'tertiary-destructive' },
] as const

// =============================================================================
// PREVIEW MODE OPTIONS
// =============================================================================

export const PREVIEW_MODE_OPTIONS = [
  { label: 'Card Stack', value: 'card-stack' },
  { label: 'Flow Selector', value: 'flow-selector' },
  { label: 'Completion', value: 'completion' },
  { label: 'Island', value: 'island' },
  { label: 'Toast', value: 'toast' },
] as const

// =============================================================================
// LABEL POSITION OPTIONS
// =============================================================================

export const LABEL_POSITION_OPTIONS = [
  { label: 'Above', value: 'above' },
  { label: 'Inline', value: 'inline' },
] as const

// =============================================================================
// ANIMATION DIRECTION OPTIONS
// =============================================================================

export const ANIMATION_DIRECTION_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
] as const
