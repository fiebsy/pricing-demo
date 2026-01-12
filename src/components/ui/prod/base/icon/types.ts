import type { ComponentProps } from 'react'
import type { HugeiconsIcon } from '@hugeicons/react'

/**
 * HugeIcon array format
 * Individual file imports from @hugeicons-pro export arrays like:
 * [["circle", {...}], ["path", {...}]]
 */
export type HugeIconData = Array<[string, Record<string, unknown>]>

// ============================================================================
// Size Types
// ============================================================================

/**
 * Named size presets for consistent icon sizing
 */
export type IconSizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Numeric pixel values for icon sizes
 */
export type IconSizeNumeric = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 40 | 48

/**
 * Combined size type - accepts preset names or numeric values
 */
export type IconSize = IconSizePreset | IconSizeNumeric | number

// ============================================================================
// Color Types
// ============================================================================

/**
 * Semantic color variants for icons
 * Uses PAYVA V2 semantic token naming
 *
 * @see src/styles/utilities/colors.css for token definitions
 */
export type IconColor =
  // Foreground colors
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'disabled'
  | 'placeholder'
  // Brand colors
  | 'brand'
  | 'brand-secondary'
  // Status colors
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  // Special colors
  | 'white'
  | 'on-brand'
  | 'current'

// ============================================================================
// Stroke Width Types
// ============================================================================

/**
 * Named stroke width presets
 */
export type StrokeWidthPreset = 'thin' | 'light' | 'regular' | 'medium' | 'bold'

/**
 * Stroke width - accepts preset names or numeric values
 */
export type StrokeWidth = StrokeWidthPreset | number

// ============================================================================
// Variant Types
// ============================================================================

/**
 * Icon style variants matching Hugeicons PRO packages
 *
 * @description
 * Stroked variants (strokeWidth applies):
 * - `stroke` - Line-based icons with adjustable thickness (default)
 * - `duotone` - Two-color with strokes on both layers
 * - `twotone` - Dual-color with distinct foreground/background strokes
 *
 * Filled variants (strokeWidth auto-set to 0):
 * - `solid` - Filled icons, no stroke
 * - `bulk` - Two-tone with lighter fill on background elements, no stroke
 */
export type IconVariant = 'stroke' | 'solid' | 'bulk' | 'duotone' | 'twotone'

// ============================================================================
// Props Interface
// ============================================================================

/**
 * Props for the HugeIcon component
 */
export interface HugeIconProps extends Omit<ComponentProps<typeof HugeiconsIcon>, 'icon' | 'size' | 'color' | 'strokeWidth'> {
  /**
   * The icon data from @hugeicons-pro imports
   * Can be the default export or the array directly
   */
  icon: HugeIconData | { default: HugeIconData } | unknown

  /**
   * Icon size - accepts preset names ('xs', 'sm', 'md', 'lg', 'xl', '2xl')
   * or numeric pixel values
   * @default 'md' (20px)
   */
  size?: IconSize

  /**
   * Semantic color variant for the icon
   * Uses PAYVA V2 semantic tokens
   * @default 'current' (inherits from parent)
   */
  color?: IconColor

  /**
   * Stroke width for stroked icons
   * Accepts preset names ('thin', 'light', 'regular', 'medium', 'bold')
   * or numeric values
   *
   * Applies to: stroke, duotone, twotone variants
   * Ignored for: solid, bulk variants (auto-set to 0)
   *
   * @default 'regular' (1.5)
   */
  strokeWidth?: StrokeWidth

  /**
   * Icon style variant hint
   * This doesn't change the icon - you must import from the correct package.
   * Used to automatically set appropriate strokeWidth:
   * - solid/bulk: strokeWidth auto-set to 0
   * - stroke/duotone/twotone: strokeWidth applies normally
   *
   * @default 'stroke'
   */
  variant?: IconVariant

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Accessible label for the icon
   * Required when icon conveys meaning (not decorative)
   */
  'aria-label'?: string

  /**
   * Hide icon from screen readers (for decorative icons)
   * @default true
   */
  'aria-hidden'?: boolean
}

/**
 * Props for the Icon component (wrapper with container styling)
 * Useful for solid/bulk icons that need proper containment
 */
export interface IconContainerProps extends HugeIconProps {
  /**
   * Apply container styling for solid/bulk icons
   * Adds relative positioning and overflow-hidden
   * @default false
   */
  withContainer?: boolean

  /**
   * Container wrapper class name
   */
  containerClassName?: string
}
