import type { TooltipSide, TooltipAlign } from './types'

/**
 * Base styles for the tooltip popup container.
 * Animation is handled by tooltip-transitions.css using keyframes.
 */
export const popupStyles = [
  // CSS class for keyframe animations (see tooltip-transitions.css)
  'tooltip-popup',
  // Layout
  'flex max-w-xs flex-col items-start gap-1',
  // Colors
  'bg-primary-solid',
  // Shape
  'rounded-xl corner-squircle',
  // Effects
  'shine-1-shadow-lg',
].join(' ')

/**
 * Padding styles based on whether description is present.
 */
export const paddingStyles = {
  titleOnly: 'px-3 py-2',
  withDescription: 'px-3 py-3',
} as const

/**
 * Title text styles.
 */
export const titleStyles = 'text-xs font-semibold text-white'

/**
 * Description text styles.
 */
export const descriptionStyles = 'text-xs font-medium text-tooltip-supporting-text'

/**
 * Arrow styles - rotated based on side.
 */
export const arrowStyles = 'size-2.5 fill-bg-primary-solid'

/**
 * Default configuration values.
 */
export const defaults: {
  delay: number
  closeDelay: number
  sideOffset: number
  side: TooltipSide
  align: TooltipAlign
  arrow: boolean
} = {
  delay: 150,
  closeDelay: 0,
  sideOffset: 6,
  side: 'top',
  align: 'center',
  arrow: false,
}
