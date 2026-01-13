"use strict";
/**
 * StickyDataTable - Table Configuration Factories
 *
 * Factory functions for creating unified table configurations.
 *
 * @module config/factories/table-configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTableProps = exports.tableConfigToProps = exports.createTableConfiguration = void 0;
const presets_1 = require("../presets");
const calculators_1 = require("../calculators");
// ============================================================================
// TABLE CONFIGURATION FACTORY
// ============================================================================
/**
 * Create a table configuration with overrides
 */
function createTableConfiguration(overrides) {
    if (!overrides)
        return { ...presets_1.DEFAULT_TABLE_CONFIGURATION };
    return (0, calculators_1.deepMerge)({ ...presets_1.DEFAULT_TABLE_CONFIGURATION }, overrides);
}
exports.createTableConfiguration = createTableConfiguration;
// ============================================================================
// CONFIG TO PROPS CONVERTER
// ============================================================================
/**
 * Convert TableConfiguration to StickyDataTable props
 */
function tableConfigToProps(config) {
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
    };
}
exports.tableConfigToProps = tableConfigToProps;
// ============================================================================
// CONVENIENCE FUNCTION
// ============================================================================
/**
 * Get default table props (convenience function)
 *
 * @example
 * ```tsx
 * <StickyDataTable
 *   {...getDefaultTableProps()}
 *   data={myData}
 *   columns={columns}
 * />
 * ```
 */
function getDefaultTableProps() {
    return tableConfigToProps(presets_1.DEFAULT_TABLE_CONFIGURATION);
}
exports.getDefaultTableProps = getDefaultTableProps;
//# sourceMappingURL=table-configuration.js.map