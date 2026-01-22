/**
 * Ratings Panel Playground - Control Options
 *
 * Options for control panel dropdowns and selects.
 * Maps to semantic token system.
 *
 * @module playground/ratings-panel/config
 */

// =============================================================================
// BACKGROUND OPTIONS
// =============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Quaternary', value: 'quaternary' },
  { label: 'Transparent', value: 'transparent' },
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
  { label: 'Brand', value: 'brand' },
] as const

// =============================================================================
// BADGE OPTIONS
// =============================================================================

export const BADGE_DISPLAY_MODE_OPTIONS = [
  { label: 'None', value: 'none', description: 'Hide badge' },
  { label: 'Score', value: 'score', description: 'Show numeric score' },
  { label: 'Status', value: 'status', description: 'Show status text' },
  { label: 'Delta', value: 'delta', description: 'Show +/- vs average' },
] as const

export const BADGE_COLOR_OPTIONS = [
  { label: 'Auto (by score)', value: 'auto', description: 'Color based on score threshold' },
  { label: 'Gray', value: 'gray' },
  { label: 'Success (Green)', value: 'success' },
  { label: 'Warning (Orange)', value: 'warning' },
  { label: 'Error (Red)', value: 'error' },
  { label: 'Brand', value: 'brand' },
  { label: 'Info (Blue)', value: 'info' },
] as const

export const BADGE_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
] as const

export const BADGE_SHAPE_OPTIONS = [
  { label: 'Pill', value: 'pill' },
  { label: 'Rounded', value: 'rounded' },
  { label: 'Squircle', value: 'squircle' },
] as const

export const BADGE_STYLE_OPTIONS = [
  { label: 'Default', value: 'default', description: 'Flat appearance' },
  { label: 'Modern', value: 'modern', description: 'Elevated with shadow' },
] as const

// =============================================================================
// PROGRESS BAR OPTIONS
// =============================================================================

export const PROGRESS_BAR_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
] as const

// =============================================================================
// ANIMATED LINE OPTIONS
// =============================================================================

export const LINE_COLOR_OPTIONS = [
  { label: 'Primary', value: '--color-border-primary' },
  { label: 'Secondary', value: '--color-border-secondary' },
  { label: 'Tertiary', value: '--color-border-tertiary' },
  { label: 'Brand', value: '--color-brand-500' },
  { label: 'Success', value: '--color-success-500' },
  { label: 'Warning', value: '--color-warning-500' },
] as const

// =============================================================================
// SECTION TAB OPTIONS
// =============================================================================

export const SECTION_OPTIONS = [
  { label: 'Mind', value: 'mind' },
  { label: 'Voice', value: 'voice' },
  { label: 'Appearance', value: 'appearance' },
] as const

export const ACTIVE_TAB_BG_OPTIONS = [
  { label: 'Brand Primary (10%)', value: 'brand-primary/10' },
  { label: 'Brand Primary (20%)', value: 'brand-primary/20' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
] as const

export const TAB_STYLE_OPTIONS = [
  { label: 'Pill', value: 'pill', description: 'Rounded pill buttons' },
  { label: 'Underline', value: 'underline', description: 'Tab with underline indicator' },
] as const

export const UNDERLINE_COLOR_OPTIONS = [
  { label: 'Brand', value: 'brand-primary' },
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Success', value: 'success-primary' },
  { label: 'Warning', value: 'warning-primary' },
] as const

export const TAB_SIZE_OPTIONS = [
  { label: 'Small', value: 'sm', description: 'Compact tabs' },
  { label: 'Medium', value: 'md', description: 'Standard size' },
  { label: 'Large', value: 'lg', description: 'Larger tabs' },
  { label: 'Extra Large', value: 'xl', description: 'Maximum size' },
] as const

export const MAX_WIDTH_OPTIONS = [
  { label: 'None', value: '0' },
  { label: '320px', value: '320' },
  { label: '400px', value: '400' },
  { label: '480px', value: '480' },
  { label: '560px', value: '560' },
] as const

// =============================================================================
// SEPARATOR OPTIONS
// =============================================================================

export const DIVIDER_COLOR_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand', value: 'brand' },
] as const

export const DIVIDER_STYLE_OPTIONS = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
] as const

// =============================================================================
// CATEGORY OPTIONS
// =============================================================================

export const MIND_CATEGORY_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'Career', value: 'career' },
  { label: 'Growth', value: 'growth' },
  { label: 'Skills', value: 'skills' },
  { label: 'Business', value: 'business' },
] as const

export const VOICE_CATEGORY_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'Tone', value: 'tone' },
  { label: 'Style', value: 'style' },
  { label: 'Personality', value: 'personality' },
  { label: 'Responses', value: 'responses' },
] as const

export const ALL_CATEGORY_OPTIONS = [
  { label: 'None', value: '' },
  { label: '--- Mind ---', value: '', disabled: true },
  { label: 'Career', value: 'career' },
  { label: 'Growth', value: 'growth' },
  { label: 'Skills', value: 'skills' },
  { label: 'Business', value: 'business' },
  { label: '--- Voice ---', value: '', disabled: true },
  { label: 'Tone', value: 'tone' },
  { label: 'Style', value: 'style' },
  { label: 'Personality', value: 'personality' },
  { label: 'Responses', value: 'responses' },
] as const

