import type { ReactNode } from 'react'

export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeType = 'pill' | 'badge' | 'modern'
export type BadgeColor = 'gray' | 'brand' | 'error' | 'warning' | 'success' | 'blue' | 'indigo' | 'purple' | 'orange'

export interface BadgeProps {
  /**
   * Badge size
   * @default 'md'
   */
  size?: BadgeSize

  /**
   * Badge visual style
   * @default 'badge'
   */
  type?: BadgeType

  /**
   * Badge color scheme
   * @default 'gray'
   */
  color?: BadgeColor

  /**
   * Squircle roundness level (0-5)
   * Overrides type default if specified
   */
  roundness?: 0 | 1 | 2 | 3 | 4 | 5

  /**
   * Shadow intensity
   * Overrides type default if specified
   */
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  /**
   * Children content (icons, text, etc.)
   */
  children: ReactNode

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Callback when content dimensions change
   * Reports true content dimensions (excludes shadow)
   */
  onDimensionsChange?: (width: number, height: number) => void
}

export interface BadgeWithIconProps extends Omit<BadgeProps, 'children'> {
  /**
   * Icon data from @hugeicons-pro
   */
  icon: any

  /**
   * Icon position relative to text
   * @default 'leading'
   */
  iconPosition?: 'leading' | 'trailing'

  /**
   * Icon size in pixels
   * Auto-calculated from badge size if not specified
   */
  iconSize?: number

  /**
   * Icon stroke width
   * @default 2
   */
  iconStrokeWidth?: number

  /**
   * Text content
   */
  children: ReactNode
}

export interface BadgeIconOnlyProps extends Omit<BadgeProps, 'children'> {
  /**
   * Icon data from @hugeicons-pro
   */
  icon: any

  /**
   * Icon size in pixels
   * Auto-calculated from badge size if not specified
   */
  iconSize?: number

  /**
   * Icon stroke width
   * @default 2
   */
  iconStrokeWidth?: number
}

export interface BadgeWithDotProps extends Omit<BadgeProps, 'children'> {
  /**
   * Dot color - uses solid circle icon
   */
  dotColor?: BadgeColor

  /**
   * Dot size in pixels
   * Auto-calculated from badge size if not specified
   */
  dotSize?: number

  /**
   * Text content
   */
  children: ReactNode
}

export interface BadgeColorConfig {
  backgroundColor: string
  borderColor: string
  textColor: string
  iconColor: string // Muted icon color (utility-{color}-500)
}
