/**
 * StickyDataTable V2 - Background Types
 *
 * Background color configuration for table sections.
 *
 * @module types/styling/background
 */

/**
 * Background configuration
 * Controls all background colors in the table
 */
export interface BackgroundConfig {
  /** Sticky header wrapper background */
  headerWrapper: string
  /** Header container background */
  headerContainer: string
  /** Sticky header cell background (default) */
  headerStickyCell: string
  /** Sticky header cell background (with scroll arrows) */
  headerStickyCellWithArrows: string
  /** Table body container background */
  bodyContainer: string
  /** Sticky row cell background (default) */
  rowStickyCell: string
  /** Sticky row cell background (with scroll arrows) */
  rowStickyCellWithArrows: string
  /** Row hover background */
  rowHover: string
}
