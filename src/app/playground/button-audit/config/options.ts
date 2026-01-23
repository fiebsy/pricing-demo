/**
 * Button Audit Playground - Control Panel Options
 *
 * These options map directly to the button component's type definitions.
 * See: src/components/ui/prod/base/button/types.ts
 */

// =============================================================================
// BUTTON VARIANT OPTIONS
// =============================================================================

export const VARIANT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Shine', value: 'shine' },
  { label: 'Link Gray', value: 'link-gray' },
  { label: 'Link Color', value: 'link-color' },
  { label: 'Primary Destructive', value: 'primary-destructive' },
  { label: 'Secondary Destructive', value: 'secondary-destructive' },
  { label: 'Tertiary Destructive', value: 'tertiary-destructive' },
  { label: 'Link Destructive', value: 'link-destructive' },
] as const

// =============================================================================
// BUTTON SIZE OPTIONS
// =============================================================================

export const SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
] as const

// =============================================================================
// BUTTON ROUNDNESS OPTIONS
// =============================================================================

export const ROUNDNESS_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Pill', value: 'pill' },
  { label: 'Squircle', value: 'squircle' },
] as const

// =============================================================================
// DISPLAY MODE OPTIONS
// =============================================================================

export const DISPLAY_MODE_OPTIONS = [
  { label: 'Single Button', value: 'single' },
  { label: 'Grid: All Variants', value: 'grid-variants' },
  { label: 'Grid: All Sizes', value: 'grid-sizes' },
  { label: 'Grid: Full Matrix', value: 'grid-all' },
] as const

// =============================================================================
// CONTENT MODE OPTIONS
// =============================================================================

export const CONTENT_MODE_OPTIONS = [
  { label: 'Text', value: 'text' },
  { label: 'Icon Only', value: 'icon-only' },
  { label: 'Both (Side by Side)', value: 'both' },
] as const

// =============================================================================
// BACKGROUND OPTIONS
// =============================================================================

export const BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Tertiary', value: 'tertiary' },
  { label: 'Brand Solid', value: 'brand-solid' },
] as const

// =============================================================================
// VARIANT GROUPS (for organized display)
// =============================================================================

export const STANDARD_VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
  'shine',
] as const

export const LINK_VARIANTS = [
  'link-gray',
  'link-color',
] as const

export const DESTRUCTIVE_VARIANTS = [
  'primary-destructive',
  'secondary-destructive',
  'tertiary-destructive',
  'link-destructive',
] as const

export const ALL_VARIANTS = [
  ...STANDARD_VARIANTS,
  ...LINK_VARIANTS,
  ...DESTRUCTIVE_VARIANTS,
] as const

export const ALL_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
