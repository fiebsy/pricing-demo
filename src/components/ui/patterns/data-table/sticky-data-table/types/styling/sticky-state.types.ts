/**
 * StickyDataTable V2 - Sticky State Types
 *
 * Scroll and sticky state tracking types.
 *
 * @module types/styling/sticky-state
 */

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
