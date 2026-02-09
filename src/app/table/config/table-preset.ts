/**
 * Stacking Nav + Table Playground - Table Styling Config
 *
 * Standalone table styling config for this playground.
 * Modify these values directly to tune dimensions, borders, and backgrounds.
 *
 * Originally derived from the hardened collections preset
 * (`@/modules/collections/config/hardened-preset`).
 */

import type {
  BorderConfig,
  BackgroundConfig,
} from '@/components/ui/patterns/data-table'

// =============================================================================
// DIMENSIONS
// =============================================================================

export const HARDENED_DIMENSIONS = {
  rowHeight: 52,
  headerHeight: 42,
  borderRadius: 16,
  headerGap: 12,
} as const

// =============================================================================
// BORDER CONFIG
// =============================================================================

export const HARDENED_BORDER_CONFIG: BorderConfig = {
  showOuter: true,
  showRows: true,
  showCells: true,
  outerColor: 'border-primary',
  rowColor: 'border-secondary',
  cellColor: 'border-tertiary',
  stickyColumnRightBorderColor: 'border-secondary',
  hideCellBordersForColumns: ['__checkbox'],
  headerBottomColor: 'border-primary',
}

// =============================================================================
// BACKGROUND CONFIG
// =============================================================================

export const HARDENED_BACKGROUND_CONFIG: BackgroundConfig = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_t1',
  headerStickyCell: 'bg-secondary_t1',
  headerStickyCellWithArrows: 'bg-secondary_t1/90',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-secondary_t1/90',
  rowHover: 'bg-tertiary',
}
