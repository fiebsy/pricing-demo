import type { CheckboxSize } from './types'

/**
 * Checkbox box size styles
 */
export const boxSizeStyles: Record<CheckboxSize, string> = {
  sm: 'size-4 rounded-md',
  md: 'size-5 rounded-lg',
}

/**
 * Indicator icon size styles
 */
export const iconSizeStyles: Record<CheckboxSize, string> = {
  sm: 'h-3 w-2.5',
  md: 'size-3.5',
}

/**
 * Check icon size styles (slightly different from indeterminate)
 */
export const checkIconSizeStyles: Record<CheckboxSize, string> = {
  sm: 'size-3',
  md: 'size-3.5',
}

/**
 * Label/hint container size styles
 */
export const labelContainerSizeStyles: Record<CheckboxSize, string> = {
  sm: 'gap-2',
  md: 'gap-3',
}

/**
 * Text wrapper size styles
 */
export const textWrapperSizeStyles: Record<CheckboxSize, string> = {
  sm: '',
  md: 'gap-0.5',
}

/**
 * Label text size styles
 */
export const labelTextSizeStyles: Record<CheckboxSize, string> = {
  sm: 'text-sm font-medium',
  md: 'text-md font-medium',
}

/**
 * Hint text size styles
 */
export const hintTextSizeStyles: Record<CheckboxSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
}

/**
 * Common box styles (unchecked state)
 */
export const boxCommonStyles = [
  'relative flex shrink-0 cursor-pointer appearance-none items-center justify-center',
  'bg-primary ring-1 ring-primary ring-inset corner-squircle',
].join(' ')

/**
 * Box checked/indeterminate styles
 */
export const boxCheckedStyles = 'bg-brand-solid ring-brand-solid'

/**
 * Box disabled styles
 */
export const boxDisabledStyles = 'cursor-not-allowed bg-disabled_subtle ring-disabled'

/**
 * Box focus visible styles
 */
export const boxFocusStyles = 'outline-2 outline-offset-2 outline-focus-ring'

/**
 * Common indicator icon styles
 */
export const indicatorCommonStyles = [
  'pointer-events-none absolute text-fg-white',
  'opacity-0',
].join(' ')

/**
 * Indicator visible styles
 */
export const indicatorVisibleStyles = 'opacity-100'

/**
 * Indicator disabled styles
 */
export const indicatorDisabledStyles = 'text-fg-disabled_subtle'
