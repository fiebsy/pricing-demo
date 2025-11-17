import type { ReactNode } from 'react'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export type ButtonHierarchy =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link-gray'
  | 'link-color'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive'
  | 'link-destructive'

/**
 * Main Button component props
 */
export interface ButtonProps {
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Button visual hierarchy
   * @default 'primary'
   */
  hierarchy?: ButtonHierarchy

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean

  /**
   * Loading state (shows spinner)
   * @default false
   */
  loading?: boolean

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean

  /**
   * Children content (icons, text, etc.)
   */
  children: ReactNode

  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void

  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Aria label for accessibility
   */
  ariaLabel?: string

  /**
   * Squircle roundness override
   */
  roundness?: 0 | 1 | 2 | 3 | 4 | 5

  /**
   * Shadow intensity override
   */
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  /**
   * FOUC prevention (fade in from opacity 0)
   * @default true
   */
  fadeInOnMount?: boolean

  /**
   * Callback when content dimensions change
   * Reports true content dimensions (excludes shadow)
   */
  onDimensionsChange?: (width: number, height: number) => void
}

/**
 * Button with icon helper component props
 */
export interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
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
   * Auto-calculated from button size if not specified
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

/**
 * Icon-only button component props
 */
export interface ButtonIconOnlyProps extends Omit<ButtonProps, 'children' | 'ariaLabel'> {
  /**
   * Icon data from @hugeicons-pro
   */
  icon: any

  /**
   * Icon size in pixels
   * Auto-calculated from button size if not specified
   */
  iconSize?: number

  /**
   * Icon stroke width
   * @default 2
   */
  iconStrokeWidth?: number

  /**
   * Aria label for accessibility (REQUIRED for icon-only buttons)
   */
  ariaLabel: string
}

/**
 * Button color configuration
 */
export interface ButtonColorConfig {
  backgroundColor: string
  backgroundHover: string
  backgroundActive: string
  backgroundDisabled: string
  borderColor: string
  borderHover: string
  textColor: string
  textHover: string
  textDisabled: string
  iconColor: string // Muted icon color (utility-{color}-500)
  iconHover: string // Muted hover
  focusRing: string
}
