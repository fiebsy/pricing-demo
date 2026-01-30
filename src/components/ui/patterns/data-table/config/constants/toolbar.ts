/**
 * StickyDataTable - Toolbar Constants
 *
 * Default toolbar layout configuration.
 *
 * @module config/constants/toolbar
 */

import type { ReactNode } from 'react'
import { TABLE_CONFIG } from './dimensions'

// ============================================================================
// TOOLBAR TYPES
// ============================================================================

/**
 * Toolbar position options
 * - 'above': Toolbar renders above the table with margin (default)
 * - 'integrated': Toolbar renders inside the header gap (sticky area above table header)
 */
export type ToolbarPosition = 'above' | 'integrated'

/**
 * Count display position options
 * - 'left': Count displays below left toolbar (default)
 * - 'right': Count displays below right toolbar/column controls
 * - 'both': Count displays on both sides (use leftCount/rightCount for custom values)
 */
export type CountPosition = 'left' | 'right' | 'both'

/**
 * Configuration for a single count display
 */
export interface CountDisplayConfig {
  /** The count value to display */
  value: number
  /** The label text (e.g., "products", "orders") */
  label: string
  /** Custom renderer - if provided, overrides default rendering */
  renderer?: ReactNode
}

/**
 * Configuration for toolbar layout and spacing
 * Controls where toolbar appears and spacing between sections
 */
export interface ToolbarLayoutConfig {
  /** Where the toolbar should be positioned (default: 'above') */
  position?: ToolbarPosition
  /** Where the count display should appear (default: 'left') */
  countPosition?: CountPosition
  /** Stack position of count relative to toolbar (default: 'below') */
  countStackPosition?: 'above' | 'below' | 'inline'
  /** Gap between toolbar row and count row (px) (default: 6) */
  toolbarToCountGap?: number
  /** Bottom margin of the entire toolbar section (px) (default: 16) */
  toolbarBottomMargin?: number
  /** Header gap height when toolbar is integrated (px) (default: 12) */
  headerGap?: number
  /** Padding inside integrated toolbar (px) */
  integratedPadding?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
  /** Height of the integrated toolbar row (px) (default: 40) */
  integratedToolbarHeight?: number
  /** Enable debug mode to visualize toolbar containers */
  debug?: boolean
  /** Left padding for left count container (px) (default: 0) */
  countPaddingLeft?: number
  /** Right padding for right count container (px) (default: 0) */
  countPaddingRight?: number
  /** Custom left count display config */
  leftCount?: CountDisplayConfig
  /** Custom right count display config */
  rightCount?: CountDisplayConfig
}

/**
 * Configuration for toolbar height calculation
 * Used by both StickyDataTable and TableSkeleton for perfect sync
 */
export interface ToolbarConfig {
  /** Show toolbar (default: false) */
  showToolbar?: boolean
  /** Show left toolbar content (default: false) */
  showLeftToolbar?: boolean
  /** Show right toolbar content (default: false) */
  showRightToolbar?: boolean
  /** Show export button (default: false) */
  showExportButton?: boolean
  /** Show column control (default: false) */
  showColumnControl?: boolean
  /** Show count display below toolbar (default: false) */
  showCount?: boolean
  /** Number of active filter pills (for height estimation) */
  activeFilterCount?: number
  /** Estimated container width for calculating filter pill rows (px) */
  containerWidth?: number
  /** Layout configuration for toolbar positioning and spacing */
  layout?: ToolbarLayoutConfig
}

// ============================================================================
// DEFAULT TOOLBAR LAYOUT
// ============================================================================

/**
 * Default toolbar layout configuration
 * Note: leftCount and rightCount are intentionally omitted - they're runtime values
 */
export const DEFAULT_TOOLBAR_LAYOUT: Omit<Required<ToolbarLayoutConfig>, 'leftCount' | 'rightCount'> = {
  position: 'above',
  countPosition: 'left',
  countStackPosition: 'below',
  toolbarToCountGap: 6,
  toolbarBottomMargin: TABLE_CONFIG.TOOLBAR_MARGIN,
  headerGap: TABLE_CONFIG.HEADER_GAP,
  integratedPadding: {
    top: TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
    bottom: TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP,
    left: 0,
    right: 0,
  },
  integratedToolbarHeight: TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT,
  countPaddingLeft: 0,
  countPaddingRight: 0,
  debug: false,
} as const
