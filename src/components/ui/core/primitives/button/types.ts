import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

/**
 * Button size variants
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Button roundness variants
 * - default: rounded-xl with corner squircle (current behavior)
 * - pill: fully rounded (rounded-full), no corner squircle
 * - squircle: fully rounded (rounded-full) with corner squircle
 */
export type ButtonRoundness = 'default' | 'pill' | 'squircle'

/**
 * Button color/style variants
 * Matches source: untitled-ui/base/buttons/button.tsx
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'reentry'
  | 'shine'
  | 'tab'
  | 'link-gray'
  | 'link-color'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive'
  | 'link-destructive'
  | 'primary-success'
  | 'secondary-success'
  | 'tertiary-success'

/**
 * Icon prop type - can be a component or React element
 */
export type IconProp = FC<{ className?: string }> | ReactNode

/**
 * Base button props shared between button and anchor variants
 */
export interface ButtonBaseProps {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * Size preset
   * @default 'md'
   */
  size?: ButtonSize

  /**
   * Roundness preset
   * - default: rounded-xl with corner squircle
   * - pill: fully rounded, no corner squircle
   * - squircle: fully rounded with corner squircle
   * @default 'default'
   */
  roundness?: ButtonRoundness

  /**
   * Icon to display before the text
   */
  iconLeading?: IconProp

  /**
   * Icon to display after the text
   */
  iconTrailing?: IconProp

  /**
   * Shows a loading spinner and disables interaction
   * @default false
   */
  isLoading?: boolean

  /**
   * Keep text visible during loading state
   * @default false
   */
  showTextWhileLoading?: boolean

  /**
   * Button content
   */
  children?: ReactNode

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Props for button element
 */
export interface ButtonElementProps
  extends ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<'button'>, 'color'> {
  /**
   * Render as anchor element
   */
  asChild?: false
  href?: never
}

/**
 * Props for anchor element (link button)
 */
export interface ButtonLinkProps
  extends ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<'a'>, 'color'> {
  /**
   * Render as anchor element
   */
  asChild?: true
  /**
   * Link destination
   */
  href: string
}

/**
 * Combined button props
 */
export type ButtonProps = ButtonElementProps | ButtonLinkProps
