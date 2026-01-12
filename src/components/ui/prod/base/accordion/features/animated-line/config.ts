/**
 * Accordion Animated Line - Configuration
 *
 * Line geometry, animation configuration, and CSS keyframes.
 *
 * @module prod/base/accordion/features/animated-line
 */

import type { AccordionSize } from '../../types'
import type { AnimatedLineConfig, AnimatedLineAnimationConfig } from './types'

// ============================================================================
// SIZE-SPECIFIC CONFIG
// ============================================================================

/**
 * Animation distance per size preset.
 * Golden rule: animationDistance ~ 46% of itemHeight
 */
export const animationDistanceBySize: Record<AccordionSize, number> = {
  compact: 12, // 46% of 26
  default: 15, // 46% of 32
  comfortable: 18, // 46% of 40
}

/**
 * Item height per size preset (duplicated from base for convenience)
 */
export const itemHeightBySize: Record<AccordionSize, number> = {
  compact: 26,
  default: 32,
  comfortable: 40,
}

/**
 * Item gap per size preset (duplicated from base for convenience)
 */
export const itemGapBySize: Record<AccordionSize, number> = {
  compact: 2,
  default: 4,
  comfortable: 6,
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

/**
 * Default animation timings for animated line accordion.
 * Tuned for a snappy, professional feel.
 */
export const defaultAnimationConfig: AnimatedLineAnimationConfig = {
  accordionDuration: 200,
  chevronDuration: 100,
  lineDuration: 1.2,
  itemDuration: 0.15,
  staggerDelay: 0.025,
  scaleStart: 0.83,
  scaleEnd: 1,
}

// ============================================================================
// LINE CONFIGURATION
// ============================================================================

/**
 * Default line styling for animated L-shaped lines.
 */
export const defaultLineConfig: AnimatedLineConfig = {
  enabled: true,
  color: '--border-color-primary',
  strokeWidth: 1.5,
  cornerRadius: 12,
  leftPadding: 22,
  topPadding: 2,
  visualOffset: 12,
  firstLineOffset: 2,
}

// ============================================================================
// GEOMETRY CALCULATIONS
// ============================================================================

/**
 * Calculate line geometry for accordion items.
 *
 * @param itemHeight - Height of each accordion item
 * @param itemGap - Gap between items
 * @param visualOffset - Visual adjustment for line height
 * @param topPadding - Padding from trigger to first item
 * @param firstLineOffset - Adjustment for first line height
 */
export function calculateLineGeometry(config: {
  itemHeight: number
  itemGap: number
  visualOffset: number
  topPadding: number
  firstLineOffset: number
}): { lineHeight: number; firstLineHeight: number } {
  // Line height: connects center of one item to center of next
  const lineHeight = config.itemHeight + config.itemGap + config.visualOffset

  // First line: connects trigger area to first item
  const firstLineHeight = Math.max(
    config.topPadding + config.itemHeight / 2 - config.firstLineOffset,
    8
  )

  return { lineHeight, firstLineHeight }
}

/**
 * Calculate proportional animation distance for a given item height.
 * Uses a 46% ratio for snappy but smooth animation.
 *
 * @param itemHeight - The height of accordion items in pixels
 * @returns Recommended animation distance in pixels
 */
export function getProportionalAnimationDistance(itemHeight: number): number {
  return Math.round(itemHeight * 0.46)
}

// ============================================================================
// STYLE TOKENS
// ============================================================================

/**
 * Common styles for animated line accordion elements
 */
export const styles = {
  trigger: {
    base: [
      'group flex items-center gap-2',
      'cursor-pointer',
      'transition-colors duration-100 ease-linear',
      'hover:bg-secondary_hover',
      'motion-reduce:transition-none',
    ].join(' '),
  },
  item: {
    base: [
      'relative block cursor-pointer',
      'text-sm text-secondary',
      'rounded-md',
      'transition-colors duration-100',
      'hover:bg-secondary_hover',
      'motion-reduce:transition-none',
    ].join(' '),
  },
  content: {
    base: 'overflow-hidden',
  },
  chevron: {
    base: ['transition-transform', 'motion-reduce:transition-none'].join(' '),
    expanded: 'rotate-0',
    collapsed: '-rotate-90',
  },
}
