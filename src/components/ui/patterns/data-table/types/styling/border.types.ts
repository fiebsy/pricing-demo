/**
 * StickyDataTable V2 - Border Types
 *
 * Border configuration for table rendering.
 *
 * @module types/styling/border
 */

/**
 * Border configuration
 * Controls all border rendering in the table
 */
export interface BorderConfig {
  /** Default border color class for all sides */
  outerColor: string
  /** Override for header bottom border only (body bottom uses outerColor) */
  headerBottomColor?: string
  /** Border color between rows */
  rowColor: string
  /** Border color between cells */
  cellColor: string
  /** Show outer borders */
  showOuter: boolean
  /** Show left border (defaults to showOuter) */
  showLeft?: boolean
  /** Show right border (defaults to showOuter) */
  showRight?: boolean
  /** Show top border (defaults to showOuter) */
  showTop?: boolean
  /** Show bottom border (defaults to showOuter) */
  showBottom?: boolean
  /** Show horizontal row borders */
  showRows: boolean
  /** Show vertical cell borders */
  showCells: boolean
  /** Column keys with hidden right borders */
  hideCellBordersForColumns?: string[]
  /** Sticky column right border when scrolling */
  stickyColumnRightBorderColor?: string
}
