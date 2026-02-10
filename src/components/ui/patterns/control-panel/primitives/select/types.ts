/**
 * Select component type definitions
 */

export interface SelectOption {
  label: string
  value: string
  color?: string
  description?: string
}

/**
 * Props for the InlineSelect component
 * A select styled to match InlineSlider — label left, selected value right
 */
export interface InlineSelectProps {
  /** Label displayed on the left */
  label: string
  /** Currently selected value */
  value: string
  /** Available options */
  options: SelectOption[]
  /** Change handler */
  onChange: (value: string) => void
  /** Disabled state */
  disabled?: boolean
  /** Additional class name */
  className?: string
}
