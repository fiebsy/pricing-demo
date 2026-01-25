import type { ReactNode } from 'react'

/**
 * Checkbox size variants
 */
export type CheckboxSize = 'sm' | 'md'

/**
 * Base checkbox props (visual only)
 */
export interface CheckboxBaseProps {
  /**
   * Size preset
   * @default 'sm'
   */
  size?: CheckboxSize

  /**
   * Visual checked state
   */
  checked?: boolean

  /**
   * Visual indeterminate state (takes priority over checked)
   */
  indeterminate?: boolean

  /**
   * Visual disabled state
   */
  disabled?: boolean

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Props for the interactive checkbox component
 */
export interface CheckboxProps {
  /**
   * Size preset
   * @default 'sm'
   */
  size?: CheckboxSize

  /**
   * Controlled checked state
   */
  checked?: boolean

  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean

  /**
   * Indeterminate state - shows minus icon
   */
  indeterminate?: boolean

  /**
   * Disabled state
   */
  disabled?: boolean

  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void

  /**
   * Label text or element
   */
  label?: ReactNode

  /**
   * Hint/description text displayed below label
   */
  hint?: ReactNode

  /**
   * Checkbox name for form submission
   */
  name?: string

  /**
   * Checkbox value for form submission
   */
  value?: string

  /**
   * Whether checkbox is required
   */
  required?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Accessible label for screen readers (when no visible label)
   */
  'aria-label'?: string
}
