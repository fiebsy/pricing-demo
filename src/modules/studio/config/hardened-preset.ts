/**
 * Studio Dashboard - Hardened Preset Configuration
 *
 * Table dimensions and styling for the Audience Tab.
 * Reuses the same hardened configuration as collections.
 */

import type {
  BorderConfig,
  BackgroundConfig,
  ToolbarLayoutConfig,
} from '@/components/ui/patterns/data-table'

// =============================================================================
// HARDENED DIMENSIONS
// =============================================================================

export const HARDENED_DIMENSIONS = {
  rowHeight: 52,
  headerHeight: 42,
  borderRadius: 16,
  headerGap: 12,
} as const

// =============================================================================
// HARDENED BORDER CONFIG
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
// HARDENED BACKGROUND CONFIG
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

// =============================================================================
// HARDENED TOOLBAR CONFIG
// =============================================================================

export const HARDENED_TOOLBAR_CONFIG: ToolbarLayoutConfig = {
  position: 'integrated',
  toolbarBottomMargin: 16,
  toolbarToCountGap: 0,
  headerGap: 12,
  integratedToolbarHeight: 40,
  integratedPadding: {
    top: 0,
    bottom: 12,
    left: 0,
    right: 0,
  },
}

// =============================================================================
// HARDENED FEATURES
// =============================================================================

export const HARDENED_FEATURES = {
  enableSelection: true,
  showColumnControl: false,
  enableColumnReorder: true,
  showCount: false,
  showExport: true,
} as const

// =============================================================================
// SEARCH CONFIGURATION
// =============================================================================

export const HARDENED_SEARCH_CONFIG = {
  expandedWidth: 200,
  collapsedWidth: 40,
  height: 40,
  duration: 200,
  revealMode: 'delay' as const,
  hideMode: 'fade' as const,
  collapseOnBlur: true,
  placeholder: 'Search',
} as const
