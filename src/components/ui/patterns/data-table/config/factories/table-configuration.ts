/**
 * StickyDataTable - Table Configuration Factories
 *
 * Factory functions for creating unified table configurations.
 *
 * @module config/factories/table-configuration
 */

import type {
  TableConfiguration,
  TableConfigurationOverrides,
  TableConfigurationProps,
  DeepPartial,
} from '../../types'
import { DEFAULT_TABLE_CONFIGURATION } from '../presets'
import { deepMerge } from '../calculators'

// ============================================================================
// TABLE CONFIGURATION FACTORY
// ============================================================================

/**
 * Create a table configuration with overrides
 */
export function createTableConfiguration(
  overrides?: TableConfigurationOverrides
): TableConfiguration {
  if (!overrides) return { ...DEFAULT_TABLE_CONFIGURATION }
  return deepMerge({ ...DEFAULT_TABLE_CONFIGURATION }, overrides)
}

// ============================================================================
// CONFIG TO PROPS CONVERTER
// ============================================================================

/**
 * Convert TableConfiguration to StickyDataTable props
 *
 * @deprecated Use the `config` prop on StickyDataTable directly instead:
 * ```tsx
 * // Before (deprecated)
 * <StickyDataTable {...tableConfigToProps(myConfig)} data={data} columns={columns} />
 *
 * // After (recommended)
 * <StickyDataTable config={myConfig} data={data} columns={columns} />
 * ```
 */
export function tableConfigToProps(config: TableConfiguration): TableConfigurationProps {
  return {
    borderRadius: config.dimensions.borderRadius,
    headerHeight: config.dimensions.headerHeight,
    rowHeight: config.dimensions.rowHeight,

    borderConfig: {
      showOuter: config.border.showOuter,
      showRows: config.border.showRows,
      showCells: config.border.showCells,
      outerColor: config.border.outerColor,
      rowColor: config.border.rowColor,
      cellColor: config.border.cellColor,
      stickyColumnRightBorderColor: config.border.stickyColumnRightBorderColor,
      hideCellBordersForColumns: config.border.hideCellBordersForColumns,
      headerBottomColor: config.border.headerBottomColor,
    },

    backgroundConfig: {
      headerWrapper: config.background.headerWrapper,
      headerContainer: config.background.headerContainer,
      headerStickyCell: config.background.headerStickyCell,
      headerStickyCellWithArrows: config.background.headerStickyCellWithArrows,
      bodyContainer: config.background.bodyContainer,
      rowStickyCell: config.background.rowStickyCell,
      rowStickyCellWithArrows: config.background.rowStickyCellWithArrows,
      rowHover: config.background.rowHover,
    },

    toolbarLayout: {
      position: config.toolbar.position,
      countPosition: config.toolbar.countPosition,
      countStackPosition: config.toolbar.countStackPosition,
      toolbarBottomMargin: config.toolbar.bottomMargin,
      toolbarToCountGap: config.toolbar.countGap,
      headerGap: config.dimensions.headerGap,
      integratedToolbarHeight: config.toolbar.integratedHeight,
      integratedPadding: config.toolbar.integratedPadding,
      countPaddingLeft: config.toolbar.countPaddingLeft,
      countPaddingRight: config.toolbar.countPaddingRight,
      debug: config.toolbar.debug,
    },

    enableSelection: config.features.enableSelection,
    showColumnControl: config.features.showColumnControl,
    showCount: config.features.showCount,

    skeletonConfig: {
      enabled: config.skeleton.enabled,
      scope: config.skeleton.scope,
      initialRowCount: config.skeleton.initialRowCount,
      infiniteScrollRowCount: config.skeleton.infiniteScrollRowCount,
      headerCell: config.skeleton.headerCell,
      bodyCell: config.skeleton.bodyCell,
      checkboxSize: config.skeleton.checkboxSize,
      showToolbarSkeleton: config.skeleton.showToolbarSkeleton,
      showFilterSkeleton: config.skeleton.showFilterSkeleton,
      showSearchSkeleton: config.skeleton.showSearchSkeleton,
      showExportSkeleton: config.skeleton.showExportSkeleton,
      showColumnControlSkeleton: config.skeleton.showColumnControlSkeleton,
      simulateStickyState: config.skeleton.simulateStickyState,
      enableShimmer: config.skeleton.enableShimmer,
      shimmerDuration: config.skeleton.shimmerDuration,
    },
  }
}

// ============================================================================
// CONVENIENCE FUNCTION
// ============================================================================

/**
 * Get default table props (convenience function)
 *
 * @deprecated Use the `config` prop on StickyDataTable directly instead:
 * ```tsx
 * // Before (deprecated)
 * <StickyDataTable {...getDefaultTableProps()} data={data} columns={columns} />
 *
 * // After (recommended)
 * <StickyDataTable config={DEFAULT_TABLE_CONFIGURATION} data={data} columns={columns} />
 * ```
 */
export function getDefaultTableProps(): TableConfigurationProps {
  return tableConfigToProps(DEFAULT_TABLE_CONFIGURATION)
}
