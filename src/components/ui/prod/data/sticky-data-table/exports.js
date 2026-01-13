"use strict";
/**
 * StickyDataTable - Public Exports
 *
 * All public types, hooks, components, and utilities are exported from here.
 * This keeps the main index.tsx focused on the component implementation.
 *
 * @module sticky-data-table/exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaderOuterBorders = exports.getRowStickyBackground = exports.getHeaderStickyBackground = exports.getCellPadding = exports.getAlignmentClasses = exports.separateColumns = exports.computeColumnOffsets = exports.calculateTotalStickyWidth = exports.generateGridTemplate = exports.useTableWithAsync = exports.useTableWithGraphQL = exports.useTableLoadingState = exports.useExportCsvSticky = exports.useTableFilters = exports.useTableConfiguration = exports.useColumnConfiguration = exports.useStickyDataTable = exports.useInfiniteScroll = exports.useArrowPosition = exports.useWheelRedirect = exports.useSelection = exports.useSort = exports.useColumns = exports.useScrollSync = exports.deepMerge = exports.getDefaultTableProps = exports.tableConfigToProps = exports.createTableConfiguration = exports.DEFAULT_TABLE_CONFIGURATION = exports.inferToolbarConfigFromProps = exports.createSkeletonDimensionConfig = exports.createToolbarLayoutConfig = exports.createToolbarConfig = exports.calculateIntegratedHeaderGap = exports.calculateSkeletonHeight = exports.calculateToolbarHeight = exports.createStickyState = exports.createBackgroundConfig = exports.createBorderConfig = exports.DEFAULT_TOOLBAR_LAYOUT = exports.DEFAULT_BACKGROUND_CONFIG = exports.DEFAULT_BORDER_CONFIG = exports.CELL_CONFIG = exports.ANIMATION_CONFIG = exports.ARROW_CONFIG = exports.TABLE_CONFIG = exports.createRangeFilter = exports.createDateFilter = exports.createSelectFilter = exports.DEFAULT_DATE_PRESETS = void 0;
exports.PAGE_BACKGROUND_CONFIGS = exports.getBackgroundCssVar = exports.createPageBackgroundStyle = exports.useTablePageBackground = exports.TablePageBackgroundProvider = exports.useStylingContext = exports.useSortContext = exports.useSelectionContext = exports.useColumnsContext = exports.useScrollContext = exports.useTableContext = exports.TableProvider = exports.createSkeletonConfigFromTableProps = exports.LoadMoreSkeleton = exports.TableSkeleton = exports.FilterDropdown = exports.FilterToolbar = exports.TableEmptyState = exports.ExportToolbar = exports.ColumnControlPanel = exports.StickyHeaderWrapper = exports.GradientOverlay = exports.NavigationArrows = exports.NavigationArrow = exports.TableBody = exports.TableHeader = exports.TableRow = exports.TableCell = exports.getRightmostStickyColumn = exports.countStickyColumns = exports.hasStickyColumns = exports.createVisibleColumnKeys = exports.processColumns = exports.getCellStyle = exports.getColumnAnimationClass = exports.getStickyLeft = exports.getStickyColumnBorder = exports.getCellBorder = exports.getRowBorder = exports.getBodyOuterBorders = void 0;
var types_1 = require("./types");
Object.defineProperty(exports, "DEFAULT_DATE_PRESETS", { enumerable: true, get: function () { return types_1.DEFAULT_DATE_PRESETS; } });
Object.defineProperty(exports, "createSelectFilter", { enumerable: true, get: function () { return types_1.createSelectFilter; } });
Object.defineProperty(exports, "createDateFilter", { enumerable: true, get: function () { return types_1.createDateFilter; } });
Object.defineProperty(exports, "createRangeFilter", { enumerable: true, get: function () { return types_1.createRangeFilter; } });
// ============================================================================
// CONFIG
// ============================================================================
var config_1 = require("./config");
Object.defineProperty(exports, "TABLE_CONFIG", { enumerable: true, get: function () { return config_1.TABLE_CONFIG; } });
Object.defineProperty(exports, "ARROW_CONFIG", { enumerable: true, get: function () { return config_1.ARROW_CONFIG; } });
Object.defineProperty(exports, "ANIMATION_CONFIG", { enumerable: true, get: function () { return config_1.ANIMATION_CONFIG; } });
Object.defineProperty(exports, "CELL_CONFIG", { enumerable: true, get: function () { return config_1.CELL_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_BORDER_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_BORDER_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_BACKGROUND_CONFIG", { enumerable: true, get: function () { return config_1.DEFAULT_BACKGROUND_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_TOOLBAR_LAYOUT", { enumerable: true, get: function () { return config_1.DEFAULT_TOOLBAR_LAYOUT; } });
Object.defineProperty(exports, "createBorderConfig", { enumerable: true, get: function () { return config_1.createBorderConfig; } });
Object.defineProperty(exports, "createBackgroundConfig", { enumerable: true, get: function () { return config_1.createBackgroundConfig; } });
Object.defineProperty(exports, "createStickyState", { enumerable: true, get: function () { return config_1.createStickyState; } });
// Dimension configuration utilities
Object.defineProperty(exports, "calculateToolbarHeight", { enumerable: true, get: function () { return config_1.calculateToolbarHeight; } });
Object.defineProperty(exports, "calculateSkeletonHeight", { enumerable: true, get: function () { return config_1.calculateSkeletonHeight; } });
Object.defineProperty(exports, "calculateIntegratedHeaderGap", { enumerable: true, get: function () { return config_1.calculateIntegratedHeaderGap; } });
Object.defineProperty(exports, "createToolbarConfig", { enumerable: true, get: function () { return config_1.createToolbarConfig; } });
Object.defineProperty(exports, "createToolbarLayoutConfig", { enumerable: true, get: function () { return config_1.createToolbarLayoutConfig; } });
Object.defineProperty(exports, "createSkeletonDimensionConfig", { enumerable: true, get: function () { return config_1.createSkeletonDimensionConfig; } });
Object.defineProperty(exports, "inferToolbarConfigFromProps", { enumerable: true, get: function () { return config_1.inferToolbarConfigFromProps; } });
// Unified table configuration
Object.defineProperty(exports, "DEFAULT_TABLE_CONFIGURATION", { enumerable: true, get: function () { return config_1.DEFAULT_TABLE_CONFIGURATION; } });
Object.defineProperty(exports, "createTableConfiguration", { enumerable: true, get: function () { return config_1.createTableConfiguration; } });
Object.defineProperty(exports, "tableConfigToProps", { enumerable: true, get: function () { return config_1.tableConfigToProps; } });
Object.defineProperty(exports, "getDefaultTableProps", { enumerable: true, get: function () { return config_1.getDefaultTableProps; } });
Object.defineProperty(exports, "deepMerge", { enumerable: true, get: function () { return config_1.deepMerge; } });
// ============================================================================
// HOOKS
// ============================================================================
var hooks_1 = require("./hooks");
Object.defineProperty(exports, "useScrollSync", { enumerable: true, get: function () { return hooks_1.useScrollSync; } });
Object.defineProperty(exports, "useColumns", { enumerable: true, get: function () { return hooks_1.useColumns; } });
Object.defineProperty(exports, "useSort", { enumerable: true, get: function () { return hooks_1.useSort; } });
Object.defineProperty(exports, "useSelection", { enumerable: true, get: function () { return hooks_1.useSelection; } });
Object.defineProperty(exports, "useWheelRedirect", { enumerable: true, get: function () { return hooks_1.useWheelRedirect; } });
Object.defineProperty(exports, "useArrowPosition", { enumerable: true, get: function () { return hooks_1.useArrowPosition; } });
Object.defineProperty(exports, "useInfiniteScroll", { enumerable: true, get: function () { return hooks_1.useInfiniteScroll; } });
Object.defineProperty(exports, "useStickyDataTable", { enumerable: true, get: function () { return hooks_1.useStickyDataTable; } });
Object.defineProperty(exports, "useColumnConfiguration", { enumerable: true, get: function () { return hooks_1.useColumnConfiguration; } });
Object.defineProperty(exports, "useTableConfiguration", { enumerable: true, get: function () { return hooks_1.useTableConfiguration; } });
// Filter hook
var hooks_2 = require("./hooks");
Object.defineProperty(exports, "useTableFilters", { enumerable: true, get: function () { return hooks_2.useTableFilters; } });
// CSV export hook
var hooks_3 = require("./hooks");
Object.defineProperty(exports, "useExportCsvSticky", { enumerable: true, get: function () { return hooks_3.useExportCsvSticky; } });
// Data adapters
var hooks_4 = require("./hooks");
Object.defineProperty(exports, "useTableLoadingState", { enumerable: true, get: function () { return hooks_4.useTableLoadingState; } });
Object.defineProperty(exports, "useTableWithGraphQL", { enumerable: true, get: function () { return hooks_4.useTableWithGraphQL; } });
Object.defineProperty(exports, "useTableWithAsync", { enumerable: true, get: function () { return hooks_4.useTableWithAsync; } });
// ============================================================================
// UTILS
// ============================================================================
var utils_1 = require("./utils");
Object.defineProperty(exports, "generateGridTemplate", { enumerable: true, get: function () { return utils_1.generateGridTemplate; } });
Object.defineProperty(exports, "calculateTotalStickyWidth", { enumerable: true, get: function () { return utils_1.calculateTotalStickyWidth; } });
Object.defineProperty(exports, "computeColumnOffsets", { enumerable: true, get: function () { return utils_1.computeColumnOffsets; } });
Object.defineProperty(exports, "separateColumns", { enumerable: true, get: function () { return utils_1.separateColumns; } });
Object.defineProperty(exports, "getAlignmentClasses", { enumerable: true, get: function () { return utils_1.getAlignmentClasses; } });
Object.defineProperty(exports, "getCellPadding", { enumerable: true, get: function () { return utils_1.getCellPadding; } });
Object.defineProperty(exports, "getHeaderStickyBackground", { enumerable: true, get: function () { return utils_1.getHeaderStickyBackground; } });
Object.defineProperty(exports, "getRowStickyBackground", { enumerable: true, get: function () { return utils_1.getRowStickyBackground; } });
Object.defineProperty(exports, "getHeaderOuterBorders", { enumerable: true, get: function () { return utils_1.getHeaderOuterBorders; } });
Object.defineProperty(exports, "getBodyOuterBorders", { enumerable: true, get: function () { return utils_1.getBodyOuterBorders; } });
Object.defineProperty(exports, "getRowBorder", { enumerable: true, get: function () { return utils_1.getRowBorder; } });
Object.defineProperty(exports, "getCellBorder", { enumerable: true, get: function () { return utils_1.getCellBorder; } });
Object.defineProperty(exports, "getStickyColumnBorder", { enumerable: true, get: function () { return utils_1.getStickyColumnBorder; } });
Object.defineProperty(exports, "getStickyLeft", { enumerable: true, get: function () { return utils_1.getStickyLeft; } });
Object.defineProperty(exports, "getColumnAnimationClass", { enumerable: true, get: function () { return utils_1.getColumnAnimationClass; } });
Object.defineProperty(exports, "getCellStyle", { enumerable: true, get: function () { return utils_1.getCellStyle; } });
// Column processor utilities
Object.defineProperty(exports, "processColumns", { enumerable: true, get: function () { return utils_1.processColumns; } });
Object.defineProperty(exports, "createVisibleColumnKeys", { enumerable: true, get: function () { return utils_1.createVisibleColumnKeys; } });
Object.defineProperty(exports, "hasStickyColumns", { enumerable: true, get: function () { return utils_1.hasStickyColumns; } });
Object.defineProperty(exports, "countStickyColumns", { enumerable: true, get: function () { return utils_1.countStickyColumns; } });
Object.defineProperty(exports, "getRightmostStickyColumn", { enumerable: true, get: function () { return utils_1.getRightmostStickyColumn; } });
// ============================================================================
// COMPONENTS
// ============================================================================
var components_1 = require("./components");
Object.defineProperty(exports, "TableCell", { enumerable: true, get: function () { return components_1.TableCell; } });
Object.defineProperty(exports, "TableRow", { enumerable: true, get: function () { return components_1.TableRow; } });
Object.defineProperty(exports, "TableHeader", { enumerable: true, get: function () { return components_1.TableHeader; } });
Object.defineProperty(exports, "TableBody", { enumerable: true, get: function () { return components_1.TableBody; } });
Object.defineProperty(exports, "NavigationArrow", { enumerable: true, get: function () { return components_1.NavigationArrow; } });
Object.defineProperty(exports, "NavigationArrows", { enumerable: true, get: function () { return components_1.NavigationArrows; } });
Object.defineProperty(exports, "GradientOverlay", { enumerable: true, get: function () { return components_1.GradientOverlay; } });
Object.defineProperty(exports, "StickyHeaderWrapper", { enumerable: true, get: function () { return components_1.StickyHeaderWrapper; } });
Object.defineProperty(exports, "ColumnControlPanel", { enumerable: true, get: function () { return components_1.ColumnControlPanel; } });
Object.defineProperty(exports, "ExportToolbar", { enumerable: true, get: function () { return components_1.ExportToolbar; } });
Object.defineProperty(exports, "TableEmptyState", { enumerable: true, get: function () { return components_1.TableEmptyState; } });
// Filter components
var filter_1 = require("./components/filter");
Object.defineProperty(exports, "FilterToolbar", { enumerable: true, get: function () { return filter_1.FilterToolbar; } });
Object.defineProperty(exports, "FilterDropdown", { enumerable: true, get: function () { return filter_1.FilterDropdown; } });
// Skeleton components
var components_2 = require("./components");
Object.defineProperty(exports, "TableSkeleton", { enumerable: true, get: function () { return components_2.TableSkeleton; } });
Object.defineProperty(exports, "LoadMoreSkeleton", { enumerable: true, get: function () { return components_2.LoadMoreSkeleton; } });
Object.defineProperty(exports, "createSkeletonConfigFromTableProps", { enumerable: true, get: function () { return components_2.createSkeletonConfigFromTableProps; } });
// ============================================================================
// CONTEXT
// ============================================================================
var table_context_1 = require("./context/table-context");
Object.defineProperty(exports, "TableProvider", { enumerable: true, get: function () { return table_context_1.TableProvider; } });
Object.defineProperty(exports, "useTableContext", { enumerable: true, get: function () { return table_context_1.useTableContext; } });
Object.defineProperty(exports, "useScrollContext", { enumerable: true, get: function () { return table_context_1.useScrollContext; } });
Object.defineProperty(exports, "useColumnsContext", { enumerable: true, get: function () { return table_context_1.useColumnsContext; } });
Object.defineProperty(exports, "useSelectionContext", { enumerable: true, get: function () { return table_context_1.useSelectionContext; } });
Object.defineProperty(exports, "useSortContext", { enumerable: true, get: function () { return table_context_1.useSortContext; } });
Object.defineProperty(exports, "useStylingContext", { enumerable: true, get: function () { return table_context_1.useStylingContext; } });
// Page background context
var page_background_context_1 = require("./context/page-background-context");
Object.defineProperty(exports, "TablePageBackgroundProvider", { enumerable: true, get: function () { return page_background_context_1.TablePageBackgroundProvider; } });
Object.defineProperty(exports, "useTablePageBackground", { enumerable: true, get: function () { return page_background_context_1.useTablePageBackground; } });
Object.defineProperty(exports, "createPageBackgroundStyle", { enumerable: true, get: function () { return page_background_context_1.createPageBackgroundStyle; } });
Object.defineProperty(exports, "getBackgroundCssVar", { enumerable: true, get: function () { return page_background_context_1.getBackgroundCssVar; } });
Object.defineProperty(exports, "PAGE_BACKGROUND_CONFIGS", { enumerable: true, get: function () { return page_background_context_1.PAGE_BACKGROUND_CONFIGS; } });
//# sourceMappingURL=exports.js.map