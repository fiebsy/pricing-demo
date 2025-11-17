import type { ReactNode } from 'react'

/**
 * Size variants for SearchInput
 */
export type SearchInputSize = 'sm' | 'md'

/**
 * Roundness levels from Squircle system
 */
export type Roundness = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Shadow presets from Squircle system
 */
export type Shadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Configuration for each size variant
 */
export interface SearchInputSizeConfig {
  padding: {
    left: number // Left padding (after icon)
    right: number // Right padding
    vertical: number // Top and bottom padding
  }
  iconSize: number // Icon size in pixels
  iconLeft: number // Icon left position in pixels
  textSize: string // Tailwind text size class
  gap: number // Gap between icon and input field
}

/**
 * Color configuration for search input states
 * Matches Untitled UI Input ring system exactly
 */
export interface SearchInputColorConfig {
  default: {
    backgroundColor: string
    borderColor: string
    textColor: string
    placeholderColor: string
    iconColor: string
  }
  focus: {
    borderColor: string
  }
  disabled: {
    backgroundColor: string
    borderColor: string
    textColor: string
    iconColor: string
  }
  invalid: {
    borderColor: string // ring-error_subtle
  }
  invalidFocus: {
    borderColor: string // ring-error (2px on focus)
  }
}

/**
 * Props for the SearchInput component
 */
export interface SearchInputProps {
  /** Input size variant */
  size?: SearchInputSize
  /** Placeholder text */
  placeholder?: string
  /** Input value */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Disabled state */
  disabled?: boolean
  /** Invalid/error state */
  invalid?: boolean
  /** Label text (displayed above input) */
  label?: string
  /** Hint text (displayed below input) */
  hint?: ReactNode
  /** Squircle roundness level */
  roundness?: Roundness
  /** Squircle shadow preset */
  shadow?: Shadow
  /** Background color semantic token */
  backgroundColor?: string
  /** Border color semantic token */
  borderColor?: string
  /** Additional CSS class */
  className?: string
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** Auto focus on mount */
  autoFocus?: boolean
  /** Clearable - show clear button when value exists */
  clearable?: boolean
  /** Callback when clear button clicked */
  onClear?: () => void
  /** Keyboard shortcut display */
  shortcut?: string
  /** Full width */
  fullWidth?: boolean
  /** Focus event handler */
  onFocus?: () => void
  /** Blur event handler */
  onBlur?: () => void
  /** Callback when content dimensions change - reports true content dimensions (excludes shadow) */
  onDimensionsChange?: (width: number, height: number) => void
}
