/**
 * Accordion - Base Component
 *
 * Collapsible accordion built on Base UI Collapsible.
 * For animated line features, import from features/animated-line/
 *
 * @module prod/base/accordion
 */

export { Accordion } from './accordion'

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionSize,
  AccordionSizeConfig,
  AccordionTriggerConfig,
  AccordionContextValue,
} from './types'

export { sizePresets as accordionSizePresets, defaultAnimationDuration, styles as accordionStyles } from './config'
