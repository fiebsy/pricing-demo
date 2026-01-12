/**
 * Accordion - Type Definitions
 *
 * Base accordion types using Base UI primitives.
 * For animated line features, see features/animated-line/types.ts
 *
 * @module prod/base/accordion
 */

import type { ReactNode } from 'react'

// ============================================================================
// SIZE PRESETS
// ============================================================================

export type AccordionSize = 'compact' | 'default' | 'comfortable'

export interface AccordionSizeConfig {
  /** Trigger height in pixels */
  triggerHeight: number
  /** Trigger font size in pixels */
  triggerFontSize: number
  /** Item height in pixels */
  itemHeight: number
  /** Gap between items in pixels */
  itemGap: number
  /** Icon size in pixels */
  iconSize: number
}

// ============================================================================
// ACCORDION ITEM
// ============================================================================

export interface AccordionItemProps {
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
// ACCORDION TRIGGER
// ============================================================================

export interface AccordionTriggerConfig {
  /** Trigger height in pixels */
  height?: number
  /** Horizontal padding in pixels */
  paddingX?: number
  /** Vertical padding in pixels */
  paddingY?: number
  /** Font size in pixels */
  fontSize?: number
  /** Border radius in pixels */
  borderRadius?: number
  /** Whether to show the chevron */
  showChevron?: boolean
}

// ============================================================================
// ACCORDION ROOT
// ============================================================================

export interface AccordionProps {
  /** Trigger label text */
  label: string
  /** Optional icon (HugeIcon data from @hugeicons-pro imports) */
  icon?: unknown
  /** Child items (Accordion.Item components) */
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
  /** Additional class names for the root */
  className?: string
}

// ============================================================================
// CONTEXT
// ============================================================================

export interface AccordionContextValue {
  /** Whether the accordion is expanded */
  isExpanded: boolean
  /** Size preset being used */
  size: AccordionSize
  /** Item height from size config */
  itemHeight: number
  /** Item gap from size config */
  itemGap: number
}
