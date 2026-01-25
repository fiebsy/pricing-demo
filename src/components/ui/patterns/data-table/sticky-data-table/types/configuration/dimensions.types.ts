/**
 * StickyDataTable V2 - Dimension Configuration Types
 *
 * Table dimension settings.
 *
 * @module types/configuration/dimensions
 */

/**
 * Table dimension settings
 */
export interface TableDimensionConfig {
  /** Row height in pixels (default: 46) */
  rowHeight: number
  /** Header height in pixels (default: 48) */
  headerHeight: number
  /** Border radius in pixels (default: 20) */
  borderRadius: number
  /** Header gap - space above sticky header (default: 12) */
  headerGap: number
}
