import type { ButtonUtilityColor, ButtonUtilityShape, ButtonUtilitySize } from './types'

/**
 * Color styles for ButtonUtility variants
 * Applied when NOT in active state
 */
export const colorStyles: Record<ButtonUtilityColor, string> = {
  secondary:
    'bg-primary text-fg-tertiary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:text-fg-tertiary_hover disabled:shadow-xs disabled:ring-disabled_subtle',
  tertiary: 'text-fg-tertiary hover:text-fg-tertiary_hover',
}

/**
 * Active state styles for ButtonUtility variants
 * Applied when isActive is true
 */
export const activeStyles: Record<ButtonUtilityColor, string> = {
  secondary: 'shadow-none scale-95 text-fg-tertiary_hover ring-1 ring-primary ring-inset',
  tertiary: 'scale-95 text-fg-tertiary_hover',
}

/**
 * Hover override styles for when disableHoverWhenActive is true
 * Locks color on hover to prevent hover effects
 */
export const activeHoverOverrideStyles: Record<ButtonUtilityColor, string> = {
  secondary: 'hover:text-fg-tertiary_hover',
  tertiary: 'hover:text-fg-tertiary_hover',
}

/**
 * Shape styles for ButtonUtility variants
 */
export const shapeStyles: Record<ButtonUtilityShape, string> = {
  square: 'rounded-md',
  circular: 'rounded-full',
}

/**
 * Icon size styles based on button size
 */
export const iconSizeStyles: Record<ButtonUtilitySize, string> = {
  xs: '*:data-icon:size-4',
  sm: '*:data-icon:size-5',
}

/**
 * Base styles applied to all ButtonUtility instances
 * Includes layout, transitions, focus states, and disabled states
 */
export const baseStyles =
  'group outline-focus-ring disabled:text-fg-disabled_subtle relative inline-flex h-max cursor-pointer items-center justify-center p-1.5 transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed'

/**
 * Icon-specific styles for consistent rendering
 * Applied to all icons inside the button
 * Includes opacity hover effect for subtle brightness increase
 */
export const iconStyles =
  '*:data-icon:transition-inherit-all *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:opacity-60 group-hover:*:data-icon:opacity-100'
