import type { ReactNode } from 'react'

/**
 * Base props shared across slider variants
 */
export interface SliderBaseProps {
  /** Current value */
  value: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Change handler */
  onChange: (value: number) => void
  /** Format the displayed value */
  formatLabel?: (value: number) => string
  /** Disabled state */
  disabled?: boolean
  /** Additional class name */
  className?: string
}

/**
 * Props for the InlineSlider component
 * A slider with label inside the fill area and value on the right
 */
export interface InlineSliderProps extends SliderBaseProps {
  /** Label displayed inside the slider */
  label: string
  /** Optional icon displayed before the label */
  icon?: ReactNode
}
