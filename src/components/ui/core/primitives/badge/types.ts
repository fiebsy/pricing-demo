import type { ReactNode, FC } from 'react'

/**
 * Badge color variants mapped to semantic meaning
 */
export type BadgeColor =
  | 'gray'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

/**
 * Badge size variants
 * - xs: Extra small (for tables/dense UI)
 * - sm: Small
 * - md: Medium (default)
 * - lg: Large
 */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

/**
 * BadgeGroup size variants (md/lg only)
 */
export type BadgeGroupSize = 'md' | 'lg'

/**
 * Badge shape variants
 * - pill: Standard rounded-full
 * - rounded: Rounded-lg with squircle corners
 * - squircle: Rounded-full with squircle corners (softer pill)
 */
export type BadgeShape = 'pill' | 'rounded' | 'squircle'

/**
 * Badge style variants (visual effect)
 * - default: Standard flat appearance
 * - modern: Adds shadow for elevated look
 */
export type BadgeStyle = 'default' | 'modern'

/**
 * BadgeGroup theme variants
 */
export type BadgeGroupTheme = 'light' | 'modern'

/**
 * BadgeGroup alignment - where the addon appears
 */
export type BadgeGroupAlign = 'leading' | 'trailing'

/**
 * Icon prop type
 */
export type BadgeIconProp = FC<{ className?: string }> | ReactNode

/**
 * Base badge props
 */
export interface BadgeProps {
  /**
   * Color/status variant
   * @default 'gray'
   */
  color?: BadgeColor

  /**
   * Size variant
   * @default 'md'
   */
  size?: BadgeSize

  /**
   * Shape variant
   * @default 'pill'
   */
  shape?: BadgeShape

  /**
   * Style variant (visual effect)
   * - default: Standard flat appearance
   * - modern: Adds shadow for elevated look (matches legacy type="modern")
   * @default 'default'
   */
  style?: BadgeStyle

  /**
   * Show a dot indicator before the label
   * @default false
   */
  dot?: boolean

  /**
   * Icon to show before the label
   */
  iconLeading?: BadgeIconProp

  /**
   * Icon to show after the label
   */
  iconTrailing?: BadgeIconProp

  /**
   * Callback when remove button is clicked (shows remove button when provided)
   */
  onRemove?: () => void

  /**
   * Badge content/label
   */
  children: ReactNode

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * BadgeGroup props - compound badge with addon section
 */
export interface BadgeGroupProps {
  /**
   * Main badge content (optional, can be text or ReactNode)
   */
  children?: ReactNode

  /**
   * Text shown in the addon section (required)
   */
  addonText: string

  /**
   * Size variant
   * @default 'md'
   */
  size?: BadgeGroupSize

  /**
   * Color/status variant
   * @default 'brand'
   */
  color?: BadgeColor

  /**
   * Theme variant - light (colored bg) or modern (neutral with dot)
   * @default 'light'
   */
  theme?: BadgeGroupTheme

  /**
   * Alignment of the addon element
   * @default 'leading'
   */
  align?: BadgeGroupAlign

  /**
   * Trailing icon (component or element)
   */
  iconTrailing?: BadgeIconProp

  /**
   * Additional CSS classes
   */
  className?: string
}
