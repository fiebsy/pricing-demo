/**
 * StickyDataTable - JAN2 Preset
 *
 * The production source of truth for table styling.
 * This is the "blessed" configuration that most pages should use.
 *
 * @module config/presets/jan2
 */

import type { TableConfiguration } from '../../types'
import { TABLE_CONFIG } from '../constants'

// ============================================================================
// DEFAULT TABLE CONFIGURATION (JAN2)
// ============================================================================

/**
 * Production-ready default table configuration
 *
 * This is the JAN2 preset - the source of truth for all table styling.
 * Most pages should use this directly without modification.
 *
 * Key JAN2 characteristics:
 * - Integrated toolbar (sticky with header)
 * - 52px row height, 42px header height
 * - 16px border radius
 * - Subtle backgrounds with tertiary hover
 * - Cell borders enabled
 *
 * @example
 * ```tsx
 * // Direct usage (most common)
 * <StickyDataTable {...getDefaultTableProps()} />
 *
 * // With overrides
 * <StickyDataTable
 *   {...getDefaultTableProps()}
 *   borderRadius={20}
 * />
 * ```
 */
export const DEFAULT_TABLE_CONFIGURATION: TableConfiguration = {
  // -------------------------------------------------------------------------
  // DIMENSIONS (JAN2)
  // -------------------------------------------------------------------------
  dimensions: {
    rowHeight: 52,
    headerHeight: 42,
    borderRadius: 16,
    headerGap: TABLE_CONFIG.HEADER_GAP,
  },

  // -------------------------------------------------------------------------
  // BORDER (JAN2)
  // -------------------------------------------------------------------------
  border: {
    showOuter: true,
    showRows: true,
    showCells: true,
    outerColor: 'border-primary',
    rowColor: 'border-secondary',
    cellColor: 'border-tertiary',
    stickyColumnRightBorderColor: 'border-secondary',
    hideCellBordersForColumns: ['__checkbox'],
    headerBottomColor: 'border-primary',
  },

  // -------------------------------------------------------------------------
  // BACKGROUND (JAN2)
  // -------------------------------------------------------------------------
  background: {
    headerWrapper: 'bg-secondary_alt',
    headerContainer: 'bg-secondary_t1',
    headerStickyCell: 'bg-secondary_t1',
    headerStickyCellWithArrows: 'bg-secondary_t1/90',
    bodyContainer: 'bg-primary',
    rowStickyCell: 'bg-primary/0',
    rowStickyCellWithArrows: 'bg-secondary_t1/90',
    rowHover: 'bg-tertiary',
  },

  // -------------------------------------------------------------------------
  // TOOLBAR (JAN2 - Integrated)
  // -------------------------------------------------------------------------
  toolbar: {
    position: 'integrated',
    countPosition: 'right',
    countStackPosition: 'inline',
    bottomMargin: TABLE_CONFIG.TOOLBAR_MARGIN,
    countGap: 0,
    integratedHeight: 32,
    integratedPadding: {
      top: 0,
      bottom: 12,
      left: 0,
      right: 0,
    },
    countPaddingLeft: 0,
    countPaddingRight: 24,
    debug: false,
  },

  // -------------------------------------------------------------------------
  // FEATURES (JAN2)
  // -------------------------------------------------------------------------
  features: {
    enableSelection: false,
    showColumnControl: true,
    showCount: false,
    showExport: false,
    dragCloneMode: 'inline',
  },

  // -------------------------------------------------------------------------
  // SKELETON (JAN2)
  // -------------------------------------------------------------------------
  skeleton: {
    enabled: false,
    scope: 'rows-only',
    initialRowCount: 16,
    infiniteScrollRowCount: 5,
    headerCell: {
      widthMode: 'auto',
      widthPercentage: 80,
      fixedWidth: 60,
      height: 16,
      borderRadius: 12,
    },
    bodyCell: {
      widthMode: 'auto',
      widthPercentage: 80,
      fixedWidth: 60,
      height: 16,
      borderRadius: 12,
    },
    checkboxSize: 16,
    showToolbarSkeleton: true,
    showFilterSkeleton: true,
    showSearchSkeleton: false,
    showExportSkeleton: true,
    showColumnControlSkeleton: true,
    simulateStickyState: 'auto',
    enableShimmer: true,
    shimmerDuration: 1500,
  },
} as const
