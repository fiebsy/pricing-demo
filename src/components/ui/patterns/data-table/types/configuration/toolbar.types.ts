/**
 * StickyDataTable V2 - Toolbar Configuration Types
 *
 * Toolbar layout and positioning settings.
 *
 * @module types/configuration/toolbar
 */

/**
 * Toolbar position mode
 * - 'above': Toolbar renders above the table (scrolls away)
 * - 'integrated': Toolbar is part of sticky header (stays fixed)
 */
export type ToolbarPositionMode = 'above' | 'integrated'

/**
 * Count display position
 * - 'left': Count displays on left side
 * - 'right': Count displays on right side
 * - 'both': Count displays on both sides
 */
export type CountPositionMode = 'left' | 'right' | 'both'

/**
 * Count stack position relative to toolbar
 * - 'above': Count displays above the toolbar row
 * - 'below': Count displays below the toolbar row
 * - 'inline': Count displays inline with the toolbar (same row)
 */
export type CountStackPositionMode = 'above' | 'below' | 'inline'

/**
 * Integrated toolbar padding settings
 */
export interface IntegratedToolbarPadding {
  /** Top padding above toolbar (default: 0) */
  top: number
  /** Bottom padding / gap to header (default: 8) */
  bottom: number
  /** Left padding (default: 0) */
  left: number
  /** Right padding (default: 0) */
  right: number
}

/**
 * Toolbar layout and spacing configuration
 */
export interface TableToolbarConfig {
  /** Toolbar position mode (default: 'above') */
  position: ToolbarPositionMode
  /** Count display position (default: 'left') */
  countPosition: CountPositionMode
  /** Count stack position relative to toolbar (default: 'below') */
  countStackPosition: CountStackPositionMode

  // === Non-sticky mode settings ===
  /** Bottom margin below toolbar (default: 16) */
  bottomMargin: number
  /** Gap between toolbar and count row (default: 6) */
  countGap: number

  // === Sticky/Integrated mode settings ===
  /** Height of integrated toolbar (default: 40) */
  integratedHeight: number
  /** Padding for integrated toolbar */
  integratedPadding: IntegratedToolbarPadding

  // === Count container padding (for alignment with table) ===
  /** Left padding for left count container (default: 0) */
  countPaddingLeft: number
  /** Right padding for right count container (default: 0) */
  countPaddingRight: number

  // === Debug ===
  /** Show debug outlines for toolbar containers */
  debug: boolean
}
