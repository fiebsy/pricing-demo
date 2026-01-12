/**
 * Accordion Animated Line - Feature Extension
 *
 * Accordion with animated L-shaped navigation lines.
 * This is a feature extension of the base Accordion component.
 *
 * @module prod/base/accordion/features/animated-line
 */

export { AccordionAnimatedLine } from './accordion-animated-line'

export type {
  AccordionAnimatedLineProps,
  AccordionAnimatedLineItemProps,
  AnimatedLineConfig,
  AnimatedLineAnimationConfig,
  AccordionAnimatedLineContextValue,
} from './types'

export {
  defaultAnimationConfig,
  defaultLineConfig,
  calculateLineGeometry,
  getProportionalAnimationDistance,
  animationDistanceBySize,
  itemHeightBySize,
  itemGapBySize,
  styles as animatedLineStyles,
} from './config'
