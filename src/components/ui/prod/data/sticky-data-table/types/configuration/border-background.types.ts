/**
 * StickyDataTable V2 - Table Border & Background Configuration Types
 *
 * These are the configuration-level types used in TableConfiguration.
 * They mirror the styling types but are specifically for the config system.
 *
 * @module types/configuration/border-background
 */

/**
 * Border visibility and color settings (configuration level)
 */
export interface TableBorderConfig {
  /** Show outer border around table (default: true) */
  showOuter: boolean
  /** Show row divider borders (default: true) */
  showRows: boolean
  /** Show cell divider borders (default: false) */
  showCells: boolean
  /** Outer border color class (default: 'border-primary') */
  outerColor: string
  /** Row border color class (default: 'border-tertiary') */
  rowColor: string
  /** Cell border color class (default: 'border-tertiary/20') */
  cellColor: string
  /** Sticky column right border color (default: 'border-secondary') */
  stickyColumnRightBorderColor: string
  /** Columns to hide cell borders for (e.g., ['__checkbox']) */
  hideCellBordersForColumns: string[]
  /** Override for header bottom border only (body bottom uses outerColor) */
  headerBottomColor?: string
}

/**
 * Background color settings for table sections (configuration level)
 */
export interface TableBackgroundConfig {
  /** Header wrapper background (default: 'bg-secondary_alt') */
  headerWrapper: string
  /** Header container background (default: 'bg-secondary_p1') */
  headerContainer: string
  /** Header sticky cell background (default: 'bg-secondary_p1') */
  headerStickyCell: string
  /** Header sticky cell with arrows (default: 'bg-secondary_t1/95') */
  headerStickyCellWithArrows: string
  /** Body container background (default: 'bg-primary') */
  bodyContainer: string
  /** Row sticky cell background (default: 'bg-primary/0') */
  rowStickyCell: string
  /** Row sticky cell with arrows (default: 'bg-secondary_t1/95') */
  rowStickyCellWithArrows: string
  /** Row hover background (default: 'bg-secondary') */
  rowHover: string
}
