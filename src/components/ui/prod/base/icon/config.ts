import type {
  IconSizePreset,
  IconColor,
  StrokeWidthPreset,
  IconVariant,
} from './types'

// ============================================================================
// Size Configuration
// ============================================================================

/**
 * Size preset to pixel value mapping
 */
export const sizePresets: Record<IconSizePreset, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
}

/**
 * Resolves a size value to pixels
 */
export function resolveSize(size: IconSizePreset | number): number {
  if (typeof size === 'number') {
    return size
  }
  return sizePresets[size] ?? sizePresets.md
}

// ============================================================================
// Color Configuration
// ============================================================================

/**
 * Color variant to Tailwind class mapping
 * Uses PAYVA V2 semantic color tokens
 *
 * @see src/styles/utilities/colors.css for token definitions
 */
export const colorStyles: Record<IconColor, string> = {
  // Foreground colors (text-* tokens)
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  quaternary: 'text-fg-quaternary',
  disabled: 'text-disabled',
  placeholder: 'text-placeholder',

  // Brand colors
  brand: 'text-brand-primary',
  'brand-secondary': 'text-fg-brand-secondary',

  // Status colors
  success: 'text-success-primary',
  warning: 'text-warning-primary',
  error: 'text-error-primary',
  info: 'text-brand-primary', // Info uses brand color

  // Special colors
  white: 'text-white',
  'on-brand': 'text-primary_on-brand',
  current: '', // Inherits from parent (currentColor)
}

/**
 * Resolves a color to its Tailwind class
 */
export function resolveColorClass(color: IconColor): string {
  return colorStyles[color] ?? ''
}

// ============================================================================
// Stroke Width Configuration
// ============================================================================

/**
 * Stroke width preset to numeric value mapping
 */
export const strokeWidthPresets: Record<StrokeWidthPreset, number> = {
  thin: 1,
  light: 1.25,
  regular: 1.5,
  medium: 2,
  bold: 2.5,
}

/**
 * Resolves a stroke width to its numeric value
 */
export function resolveStrokeWidth(strokeWidth: StrokeWidthPreset | number): number {
  if (typeof strokeWidth === 'number') {
    return strokeWidth
  }
  return strokeWidthPresets[strokeWidth] ?? strokeWidthPresets.regular
}

// ============================================================================
// Variant Configuration
// ============================================================================

/**
 * Variants that use filled rendering (no stroke - strokeWidth should be 0)
 *
 * ONLY solid and bulk variants should have strokeWidth auto-set to 0.
 * duotone and twotone variants DO use strokes and should retain strokeWidth.
 */
export const filledVariants: IconVariant[] = ['solid', 'bulk']

/**
 * Variants that use strokes (strokeWidth applies)
 *
 * - stroke: Standard line-based icons
 * - duotone: Two-color with strokes on both layers
 * - twotone: Dual-color with distinct foreground/background strokes
 */
export const strokedVariants: IconVariant[] = ['stroke', 'duotone', 'twotone']

/**
 * Check if a variant is a filled style (should use strokeWidth 0)
 * Only solid and bulk variants are filled.
 */
export function isFilledVariant(variant: IconVariant): boolean {
  return filledVariants.includes(variant)
}

/**
 * Check if a variant uses strokes (strokeWidth applies)
 * stroke, duotone, and twotone all use strokes.
 */
export function isStrokedVariant(variant: IconVariant): boolean {
  return strokedVariants.includes(variant)
}

/**
 * Get the appropriate stroke width for a variant
 *
 * - solid/bulk: Returns 0 (filled icons, no stroke)
 * - stroke/duotone/twotone: Uses the provided strokeWidth value
 */
export function getVariantStrokeWidth(
  variant: IconVariant,
  strokeWidth: StrokeWidthPreset | number
): number {
  if (isFilledVariant(variant)) {
    return 0
  }
  return resolveStrokeWidth(strokeWidth)
}

// ============================================================================
// Container Configuration (for solid/bulk icons)
// ============================================================================

/**
 * Base container styles for solid/bulk icons that need containment
 */
export const containerStyles = 'relative flex shrink-0 items-center justify-center overflow-hidden'

/**
 * Get container size class based on icon size
 */
export function getContainerSizeClass(size: number): string {
  return `w-[${size}px] h-[${size}px]`
}

// ============================================================================
// Package Reference (for documentation)
// ============================================================================

/**
 * Hugeicons PRO package names by variant
 * Use these when importing icons for specific styles
 */
export const packagesByVariant: Record<IconVariant, string> = {
  stroke: '@hugeicons-pro/core-stroke-rounded',
  solid: '@hugeicons-pro/core-solid-rounded',
  bulk: '@hugeicons-pro/core-bulk-rounded',
  duotone: '@hugeicons-pro/core-duotone-rounded',
  twotone: '@hugeicons-pro/core-twotone-rounded',
}

/**
 * All available Hugeicons style packages
 */
export const allPackages = [
  // Stroke styles (line-based)
  '@hugeicons-pro/core-stroke-rounded',
  '@hugeicons-pro/core-stroke-sharp',
  '@hugeicons-pro/core-stroke-standard',
  // Solid styles (filled)
  '@hugeicons-pro/core-solid-rounded',
  '@hugeicons-pro/core-solid-sharp',
  '@hugeicons-pro/core-solid-standard',
  // Special styles (two-tone)
  '@hugeicons-pro/core-bulk-rounded',
  '@hugeicons-pro/core-duotone-rounded',
  '@hugeicons-pro/core-twotone-rounded',
] as const
