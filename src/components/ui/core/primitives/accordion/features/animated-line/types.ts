/**
 * Accordion Animated Line - Type Definitions
 *
 * Extended types for the animated L-shaped line feature.
 *
 * @module prod/base/accordion/features/animated-line
 */

import type { ReactNode } from 'react'
import type { AccordionSize, AccordionTriggerConfig } from '../../types'

// ============================================================================
// LINE CONFIGURATION
// ============================================================================

export interface AnimatedLineConfig {
  /** Whether to show animated navigation lines */
  enabled: boolean
  /** CSS variable name for line color (e.g., '--border-color-primary') */
  color: string
  /** Line stroke width in pixels */
  strokeWidth: number
  /** Corner radius for the L-shaped line */
  cornerRadius: number
  /** Left padding for line positioning */
  leftPadding: number
  /** Top padding from trigger to first item */
  topPadding: number
  /** Visual offset adjustment for line height */
  visualOffset: number
  /** First line offset adjustment */
  firstLineOffset: number
}

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export interface AnimatedLineAnimationConfig {
  /** Duration for accordion open/close in ms */
  accordionDuration: number
  /** Duration for chevron rotation in ms */
  chevronDuration: number
  /** Duration for line drawing animation in seconds */
  lineDuration: number
  /** Duration for button/item animation in seconds */
  itemDuration: number
  /** Delay between each item animation in seconds */
  staggerDelay: number
  /** Starting scale for items */
  scaleStart: number
  /** Ending scale for items */
  scaleEnd: number
}

// ============================================================================
// ACCORDION WITH ANIMATED LINE
// ============================================================================

export interface AccordionAnimatedLineProps {
  /** Trigger label text */
  label: string
  /** Optional icon (HugeIcon data from @hugeicons-pro imports) */
  icon?: unknown
  /** Child items (AccordionAnimatedLine.Item components) */
  children: ReactNode
  /** Start expanded */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Controlled onChange handler */
  onExpandedChange?: (expanded: boolean) => void
  /** Click handler for the label text (separate from toggle) */
  onLabelClick?: () => void
  /** Only toggle on chevron click, not entire trigger */
  toggleOnChevronOnly?: boolean
  /** Show item count next to label */
  showCount?: boolean
  /** Size preset */
  size?: AccordionSize
  /** Override trigger styling */
  triggerConfig?: AccordionTriggerConfig
  /** Line configuration (set enabled: false to disable lines) */
  lineConfig?: Partial<AnimatedLineConfig>
  /** Animation configuration overrides */
  animationConfig?: Partial<AnimatedLineAnimationConfig>
  /** Additional class names for the root */
  className?: string
}

export interface AccordionAnimatedLineItemProps {
  /** Unique value for this item */
  value: string
  /** Item content (typically text) */
  children: ReactNode
  /** Link destination (optional) */
  href?: string
  /** Optional click handler */
  onClick?: () => void
  /** Whether this item is disabled */
  disabled?: boolean
  /** Additional class names */
  className?: string
}

// ============================================================================
// CONTEXT
// ============================================================================

export interface AccordionAnimatedLineContextValue {
  /** Whether the accordion is expanded */
  isExpanded: boolean
  /** Size preset being used */
  size: AccordionSize
  /** Computed line geometry */
  lineGeometry: {
    lineHeight: number
    firstLineHeight: number
  }
  /** Merged configuration values */
  config: {
    itemHeight: number
    strokeWidth: number
    cornerRadius: number
    lineColor: string
    paddingX: number
    borderRadius: number
    animationDistance: number
    showLine: boolean
  }
  /** Animation timings */
  animation: AnimatedLineAnimationConfig
}
