import type { ReactNode, Ref } from 'react'
import type { HugeIconData } from '@/components/ui/prod/base/icon'

/**
 * Input size variants
 */
export type InputSize = 'sm' | 'md'

/**
 * Props for the Label component
 */
export interface LabelProps {
  /**
   * Label content
   */
  children: ReactNode

  /**
   * Whether to show the required indicator (*)
   */
  isRequired?: boolean

  /**
   * Tooltip message on hover
   */
  tooltip?: string

  /**
   * Tooltip description (secondary text)
   */
  tooltipDescription?: string

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Ref for the label element
   */
  ref?: Ref<HTMLLabelElement>

  /**
   * HTML for attribute to associate with input
   */
  htmlFor?: string
}

/**
 * Props for the HintText component
 */
export interface HintTextProps {
  /**
   * Hint/description content
   */
  children: ReactNode

  /**
   * Whether the hint is an error message
   */
  isInvalid?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Ref for the text element
   */
  ref?: Ref<HTMLSpanElement>
}

/**
 * Props for the InputBase component (visual input wrapper)
 */
export interface InputBaseProps {
  /**
   * Input size preset
   * @default 'sm'
   */
  size?: InputSize

  /**
   * Whether the input is disabled
   */
  disabled?: boolean

  /**
   * Whether the input is in an invalid state
   */
  isInvalid?: boolean

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Icon to display on the left side
   * Accepts HugeIcon data from @hugeicons-pro imports
   */
  icon?: HugeIconData | { default: HugeIconData } | unknown

  /**
   * Tooltip message on hover
   */
  tooltip?: string

  /**
   * Keyboard shortcut to display
   */
  shortcut?: string | boolean

  /**
   * Input value (controlled)
   */
  value?: string

  /**
   * Default input value (uncontrolled)
   */
  defaultValue?: string

  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void

  /**
   * Callback when input receives focus
   */
  onFocus?: () => void

  /**
   * Callback when input loses focus
   */
  onBlur?: () => void

  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'

  /**
   * Input name for form submission
   */
  name?: string

  /**
   * Whether input is required
   */
  required?: boolean

  /**
   * Input ID
   */
  id?: string

  /**
   * Auto-complete attribute
   */
  autoComplete?: string

  /**
   * Auto-focus on mount
   */
  autoFocus?: boolean

  /**
   * Max length for input value
   */
  maxLength?: number

  /**
   * Min length for input value
   */
  minLength?: number

  /**
   * Pattern for input validation
   */
  pattern?: string

  /**
   * Whether input is read-only
   */
  readOnly?: boolean

  /**
   * Class name for the wrapper/group
   */
  wrapperClassName?: string

  /**
   * Class name for the input element
   */
  inputClassName?: string

  /**
   * Class name for the icon
   */
  iconClassName?: string

  /**
   * Class name for the tooltip
   */
  tooltipClassName?: string

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Ref for the input element
   */
  ref?: Ref<HTMLInputElement>

  /**
   * Ref for the wrapper element
   */
  groupRef?: Ref<HTMLDivElement>
}

/**
 * Props for the Input component (with label and hint)
 */
export interface InputProps extends InputBaseProps {
  /**
   * Label text for the input
   */
  label?: string

  /**
   * Helper text displayed below the input
   */
  hint?: ReactNode

  /**
   * Whether to hide the required indicator from label
   */
  hideRequiredIndicator?: boolean
}

/**
 * Props for InputPrefix component
 */
export interface InputPrefixProps {
  /**
   * Prefix content
   */
  children: ReactNode

  /**
   * Prefix size
   * @default 'sm'
   */
  size?: InputSize

  /**
   * Position of the prefix (affects corner rounding)
   * @default 'leading'
   */
  position?: 'leading' | 'trailing'

  /**
   * Whether the prefix is disabled
   */
  isDisabled?: boolean

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Props for InputGroup component
 */
export interface InputGroupProps {
  /**
   * Input size preset
   * @default 'sm'
   */
  size?: InputSize

  /**
   * A prefix text displayed in the same box as the input
   */
  prefix?: string

  /**
   * A leading addon displayed with visual separation
   */
  leadingAddon?: ReactNode

  /**
   * A trailing addon displayed with visual separation
   */
  trailingAddon?: ReactNode

  /**
   * Whether the input is disabled
   */
  disabled?: boolean

  /**
   * Whether the input is in an invalid state
   */
  isInvalid?: boolean

  /**
   * Whether the input is required
   */
  isRequired?: boolean

  /**
   * Label text for the input
   */
  label?: string

  /**
   * Helper text displayed below the input
   */
  hint?: ReactNode

  /**
   * The input element(s)
   */
  children: ReactNode

  /**
   * Additional CSS classes
   */
  className?: string
}
