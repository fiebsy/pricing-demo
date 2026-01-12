import type { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import type { Placement } from 'react-aria'

/**
 * Size variants for ButtonUtility
 * - xs: Smaller padding, 16px icon
 * - sm: Default size, 20px icon
 */
export type ButtonUtilitySize = 'xs' | 'sm'

/**
 * Color variants for ButtonUtility
 * - secondary: Solid background with ring border
 * - tertiary: Transparent background, text only
 */
export type ButtonUtilityColor = 'secondary' | 'tertiary'

/**
 * Shape variants for ButtonUtility
 * - square: rounded-md corners
 * - circular: rounded-full (pill shape)
 */
export type ButtonUtilityShape = 'square' | 'circular'

/**
 * Common props shared between button and anchor variants
 */
export interface ButtonUtilityCommonProps {
  /** Disables the button and shows a disabled state */
  isDisabled?: boolean
  /** Whether the button is in an active/pressed state (e.g., menu is open) */
  isActive?: boolean
  /** When true, disables hover effects while isActive is true. Defaults to true. */
  disableHoverWhenActive?: boolean
  /** The size variant of the button */
  size?: ButtonUtilitySize
  /** The color variant of the button */
  color?: ButtonUtilityColor
  /** The shape of the button */
  shape?: ButtonUtilityShape
  /** The icon to display in the button */
  icon?: FC<{ className?: string }> | ReactNode
  /** The tooltip to display when hovering over the button */
  tooltip?: string
  /** The placement of the tooltip */
  tooltipPlacement?: Placement
}

/**
 * Props for the button variant (non-link)
 */
export interface ButtonUtilityButtonProps
  extends ButtonUtilityCommonProps,
    DetailedHTMLProps<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, HTMLButtonElement> {
  /** Slot name for component composition */
  slot?: string
}

/**
 * Props for the link variant (anchor tag)
 */
export interface ButtonUtilityLinkProps
  extends ButtonUtilityCommonProps,
    DetailedHTMLProps<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>, HTMLAnchorElement> {}

/**
 * Union type of button and link props
 */
export type ButtonUtilityProps = ButtonUtilityButtonProps | ButtonUtilityLinkProps
