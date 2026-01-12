/**
 * StickyDataTable V2 - Styling Types
 *
 * Types for border, background, and sticky state configuration.
 *
 * @module types/styling
 */

// ============================================================================
// BORDER CONFIGURATION
// ============================================================================

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

// ============================================================================
// BACKGROUND CONFIGURATION
// ============================================================================

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

// ============================================================================
// SCROLL / STICKY STATE
// ============================================================================

/**
 * Unified sticky state
 * Tracks scroll position and determines visual styling
 */
export interface StickyState {
  /** Can scroll left (content before viewport) */
  showLeftArrow: boolean
  /** Can scroll right (content after viewport) */
  showRightArrow: boolean
  /** Any arrows visible (derived) */
  hasArrows: boolean
  /** Use enhanced sticky styling (borders/backgrounds) */
  useEnhancedStyling: boolean
}

/** Scroll state for synchronized scroll containers */
export interface ScrollState {
  canScrollLeft: boolean
  canScrollRight: boolean
  showScrollIndicator: boolean
}
