"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.processColumns = exports.getCellStyle = exports.getColumnAnimationClass = exports.getStickyLeft = exports.getStickyColumnBorder = exports.getCellBorder = exports.getRowBorder = exports.getBodyOuterBorders = exports.getHeaderOuterBorders = exports.getRowStickyBackground = exports.getHeaderStickyBackground = exports.getCellPadding = exports.getAlignmentClasses = exports.separateColumns = exports.computeColumnOffsets = exports.calculateTotalStickyWidth = exports.generateGridTemplate = exports.useTableConfiguration = exports.useColumnConfiguration = exports.useStickyDataTable = exports.useInfiniteScroll = exports.useArrowPosition = exports.useWheelRedirect = exports.useSelection = exports.useSort = exports.useColumns = exports.useScrollSync = exports.deepMerge = exports.getDefaultTableProps = exports.tableConfigToProps = exports.createTableConfiguration = exports.DEFAULT_TABLE_CONFIGURATION = exports.inferToolbarConfigFromProps = exports.createSkeletonDimensionConfig = exports.createToolbarLayoutConfig = exports.createToolbarConfig = exports.calculateIntegratedHeaderGap = exports.calculateSkeletonHeight = exports.calculateToolbarHeight = exports.createStickyState = exports.createBackgroundConfig = exports.createBorderConfig = exports.DEFAULT_TOOLBAR_LAYOUT = exports.DEFAULT_BACKGROUND_CONFIG = exports.DEFAULT_BORDER_CONFIG = exports.CELL_CONFIG = exports.ANIMATION_CONFIG = exports.ARROW_CONFIG = exports.TABLE_CONFIG = exports.StickyDataTable = void 0;
exports.useTableWithAsync = exports.useTableWithGraphQL = exports.useTableLoadingState = exports.createSkeletonConfigFromTableProps = exports.LoadMoreSkeleton = exports.TableSkeleton = exports.useExportCsvSticky = exports.FilterDropdown = exports.FilterToolbar = exports.useTableFilters = exports.createRangeFilter = exports.createDateFilter = exports.createSelectFilter = exports.DEFAULT_DATE_PRESETS = exports.PAGE_BACKGROUND_CONFIGS = exports.getBackgroundCssVar = exports.createPageBackgroundStyle = exports.useTablePageBackground = exports.TablePageBackgroundProvider = exports.useStylingContext = exports.useSortContext = exports.useSelectionContext = exports.useColumnsContext = exports.useScrollContext = exports.useTableContext = exports.TableProvider = exports.TableEmptyState = exports.SearchToolbar = exports.ExportToolbar = exports.ColumnControlPanel = exports.StickyHeaderWrapper = exports.GradientOverlay = exports.NavigationArrows = exports.NavigationArrow = exports.TableBody = exports.TableHeader = exports.TableRow = exports.TableCell = exports.getRightmostStickyColumn = exports.countStickyColumns = exports.hasStickyColumns = exports.createVisibleColumnKeys = void 0;
/**
 * StickyDataTable
 *
 * A high-performance, feature-rich data table with:
 * - Sticky columns that remain fixed during horizontal scroll
 * - Sticky header that stays visible during vertical scroll
 * - Column sorting with multi-type support
 * - Dynamic column visibility with animations
 * - Row selection with checkbox support
 * - Synchronized scroll between header and body
 *
 * @module sticky-data-table
 *
 * @example
 * ```tsx
 * import { StickyDataTable, type ColumnConfig } from './sticky-data-table'
 *
 * const columns: ColumnConfig[] = [
 *   { key: 'id', width: 60, align: 'left', isSticky: true },
 *   { key: 'name', width: 200, align: 'left', isSticky: true },
 *   { key: 'amount', width: 120, align: 'right', sortable: true },
 * ]
 *
 * <StickyDataTable
 *   data={myData}
 *   columns={columns}
 *   columnLabels={{ id: 'ID', name: 'Name', amount: 'Amount' }}
 *   renderCell={(key, row) => row[key]}
 * />
 * ```
 */
const react_1 = require("react");
const components_1 = require("./components");
const use_header_drag_1 = require("./components/table-header/use-header-drag");
const config_1 = require("./config");
const hooks_1 = require("./hooks");
// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * StickyDataTable
 *
 * Optimized data table with sticky columns and header.
 *
 * Features:
 * - Better memoization and rendering performance
 * - Consolidated state management via useStickyDataTable hook
 * - Cleaner component architecture
 * - Improved TypeScript types
 * - Comprehensive documentation
 * - Unified infinite scroll with automatic skeleton generation
 */
function StickyDataTable({ data, columns, columnLabels, renderCell, onRowClick, borderRadius = config_1.TABLE_CONFIG.DEFAULT_BORDER_RADIUS, headerHeight = config_1.TABLE_CONFIG.HEADER_HEIGHT, rowHeight = config_1.TABLE_CONFIG.ROW_HEIGHT, borderConfig: borderConfigOverrides, backgroundConfig: backgroundConfigOverrides, showColumnControl = true, className, arrowPreferredTopOffset, enableSelection = false, getRowId, exportAll, exportSelected, exportToolbar, defaultHiddenColumns = [], defaultVisibleColumns, columnGroups, leftToolbar, rightToolbar, showCount = false, totalCount, countLabel = 'items', testId, 
// Toolbar layout
toolbarLayout: toolbarLayoutOverrides, 
// Server-side sorting props
serverSideSort = false, onServerSort, serverSortColumn, serverSortDirection, 
// Infinite scroll
infiniteScroll, 
// Legacy props (deprecated)
loadingIndicator, onEndReached, onEndReachedThreshold, 
// Empty state
emptyState, noResultsState, searchTerm, isLoading, 
// Column reordering
enableColumnReorder, onReorderColumns, isColumnConfigHydrated = true, // Default to true to avoid breaking existing usage
dragCloneMode = 'floating', }) {
    // ==========================================================================
    // REFS
    // ==========================================================================
    // Ref to track the last dropped column key for FLIP animation exclusion
    // Shared between header and body so both can exclude the dragged column
    const lastDroppedKeyRef = (0, react_1.useRef)(null);
    // ==========================================================================
    // USE MAIN HOOK - All logic extracted for cleaner component
    // ==========================================================================
    const { 
    // Refs
    headerScrollRef, bodyScrollRef, 
    // Merged configs
    borderConfig, backgroundConfig, gradientBackgroundCssVar, 
    // Column state
    columnsWithSelection, stickyColumns, scrollableColumns, allVisibleColumns, visibleColumnKeys, leavingColumnKeys, leavingColumns, enteringColumnKeys, columnChange, toggleColumn, resetColumns, totalStickyWidth, columnLabelsWithCheckbox, 
    // Sort state
    sortColumn, sortDirection, sortedData, handleSort, 
    // Scroll state
    stickyState, showScrollIndicator, handleScrollLeft, handleScrollRight, 
    // Selection state
    selectionState, 
    // Toolbar state
    showExportButton, showToolbar, 
    // Toolbar layout
    toolbarLayout, 
    // Infinite scroll
    effectiveOnEndReached, effectiveThreshold, effectiveLoadingIndicator, } = (0, hooks_1.useStickyDataTable)({
        data,
        columns,
        columnLabels,
        borderRadius,
        borderConfig: borderConfigOverrides,
        backgroundConfig: backgroundConfigOverrides,
        showColumnControl,
        enableSelection,
        getRowId,
        exportAll,
        exportSelected,
        exportToolbar,
        defaultHiddenColumns,
        defaultVisibleColumns,
        leftToolbar,
        rightToolbar,
        showCount,
        toolbarLayout: toolbarLayoutOverrides,
        serverSideSort,
        onServerSort,
        serverSortColumn,
        serverSortDirection,
        infiniteScroll,
        loadingIndicator,
        onEndReached,
        onEndReachedThreshold,
    });
    // ==========================================================================
    // DRAG-AND-DROP STATE (shared between header and body)
    // ==========================================================================
    const { dragState, columnRectsRef, lastDroppedKeyRef: dragDroppedKeyRef, isColumnDraggable, handlePointerDown, handlePointerMove, handlePointerUp, handlePointerCancel, getShiftDirection, getInlineOffset, getShiftAmount, cloneMode, } = (0, use_header_drag_1.useHeaderDrag)({
        headerScrollRef,
        allColumns: allVisibleColumns,
        enableColumnReorder,
        onReorderColumns,
        externalDroppedKeyRef: lastDroppedKeyRef,
        cloneMode: dragCloneMode,
    });
    // Determine if currently in inline drag mode
    const isInlineDragMode = cloneMode === 'inline' && dragState.isDragging;
    // ==========================================================================
    // INTEGRATED TOOLBAR SETUP
    // ==========================================================================
    // Determine if toolbar should be integrated into sticky header
    const isToolbarIntegrated = toolbarLayout.position === 'integrated';
    // Header gap is always the base gap - toolbar space is handled inside the sticky wrapper
    const effectiveHeaderGap = config_1.TABLE_CONFIG.HEADER_GAP;
    // Calculate gradient top offset when toolbar is integrated
    // The gradient should start where the table header begins (after the toolbar area)
    // Note: Count is not shown in sticky mode, so no need to account for it
    // Also add border offset (1px) to position gradient INSIDE the header's border
    const toolbarOffset = isToolbarIntegrated && showToolbar
        ? (toolbarLayout.integratedPadding?.top ?? 0) +
            (toolbarLayout.integratedToolbarHeight ?? config_1.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT) +
            (toolbarLayout.integratedPadding?.bottom ?? 0)
        : 0;
    const borderOffset = borderConfig.showOuter ? 1 : 0;
    const gradientTopOffset = toolbarOffset + borderOffset;
    // Build integrated toolbar content (only when position is 'integrated')
    const integratedToolbarContent = isToolbarIntegrated && showToolbar ? (<components_1.ToolbarContent isIntegrated={true} toolbarLayout={toolbarLayout} leftToolbar={leftToolbar} rightToolbar={rightToolbar} showCount={showCount} totalCount={totalCount} countLabel={countLabel} showExportButton={showExportButton} exportAll={exportAll} exportSelected={exportSelected} exportToolbar={exportToolbar} selectionState={selectionState} showColumnControl={showColumnControl} columnGroups={columnGroups} columnsWithSelection={columnsWithSelection} visibleColumnKeys={visibleColumnKeys} toggleColumn={toggleColumn} resetColumns={resetColumns} columnLabelsWithCheckbox={columnLabelsWithCheckbox}/>) : null;
    // ==========================================================================
    // RENDER
    // ==========================================================================
    return (<div className={className} data-testid={testId}>
      {/* Toolbar Section - Only render when position is 'above' (default) */}
      {showToolbar && !isToolbarIntegrated && (<div style={{ marginBottom: toolbarLayout.toolbarBottomMargin }}>
          <components_1.ToolbarContent isIntegrated={false} toolbarLayout={toolbarLayout} leftToolbar={leftToolbar} rightToolbar={rightToolbar} showCount={showCount} totalCount={totalCount} countLabel={countLabel} showExportButton={showExportButton} exportAll={exportAll} exportSelected={exportSelected} exportToolbar={exportToolbar} selectionState={selectionState} showColumnControl={showColumnControl} columnGroups={columnGroups} columnsWithSelection={columnsWithSelection} visibleColumnKeys={visibleColumnKeys} toggleColumn={toggleColumn} resetColumns={resetColumns} columnLabelsWithCheckbox={columnLabelsWithCheckbox}/>
        </div>)}

      {/* Table Container - Always render header, conditionally render body or empty state */}
      <div className="relative">
        <div className="relative">
          <div className="relative">
            {/* Full-height gradient overlay - only show when there's data */}
            {/* Border radius is reduced by border offset to match the inner curve of the table border */}
            {sortedData.length > 0 && (<components_1.GradientOverlay visible={showScrollIndicator} position="full" borderRadius={borderRadius > borderOffset ? borderRadius - borderOffset : borderRadius} topOffset={gradientTopOffset}/>)}

            {/* Sticky Header Section - Always visible */}
            {/* Hide arrows when in empty state (no data and not loading) */}
            <components_1.StickyHeaderWrapper headerGap={effectiveHeaderGap} headerHeight={headerHeight} headerScrollRef={headerScrollRef} bodyScrollRef={bodyScrollRef} stickyColumns={stickyColumns} scrollableColumns={scrollableColumns} allColumns={allVisibleColumns} columnLabels={columnLabelsWithCheckbox} sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} stickyState={stickyState} showScrollIndicator={showScrollIndicator} hideArrows={sortedData.length === 0 && !isLoading} onScrollLeft={handleScrollLeft} onScrollRight={handleScrollRight} borderRadius={borderRadius} borderConfig={borderConfig} backgroundConfig={backgroundConfig} gradientBackgroundColor={gradientBackgroundCssVar} columnChange={columnChange} leavingColumnKeys={leavingColumnKeys} leavingColumns={leavingColumns} enteringColumnKeys={enteringColumnKeys} totalStickyWidth={totalStickyWidth} arrowPreferredTopOffset={arrowPreferredTopOffset} selectionState={selectionState} 
    // Integrated toolbar (experimental)
    integratedToolbar={integratedToolbarContent} integratedToolbarPadding={isToolbarIntegrated ? toolbarLayout.integratedPadding : undefined} integratedToolbarHeight={isToolbarIntegrated ? toolbarLayout.integratedToolbarHeight : undefined} 
    // Column reordering
    enableColumnReorder={enableColumnReorder} onReorderColumns={onReorderColumns} isColumnConfigHydrated={isColumnConfigHydrated} lastDroppedKeyRef={lastDroppedKeyRef} dragCloneMode={dragCloneMode} 
    // Drag state (lifted from useHeaderDrag for sharing with body)
    dragState={dragState} columnRectsRef={columnRectsRef} isColumnDraggable={isColumnDraggable} handlePointerDown={handlePointerDown} handlePointerMove={handlePointerMove} handlePointerUp={handlePointerUp} handlePointerCancel={handlePointerCancel} getShiftDirection={getShiftDirection} getInlineOffset={getInlineOffset} getShiftAmount={getShiftAmount} cloneMode={cloneMode} isInlineDragMode={isInlineDragMode}/>

            {/* Empty State - Show when no data and not loading, replaces table body only */}
            {sortedData.length === 0 && !isLoading && (emptyState || noResultsState) ? (<div className="border-primary overflow-hidden border border-t-0 bg-primary" style={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }}>
                {searchTerm ? noResultsState : emptyState}
              </div>) : (
        /* Table Body - Show when there's data */
        <components_1.TableBody bodyScrollRef={bodyScrollRef} data={sortedData} stickyColumns={stickyColumns} scrollableColumns={scrollableColumns} allColumns={allVisibleColumns} stickyState={stickyState} borderConfig={borderConfig} backgroundConfig={backgroundConfig} borderRadius={borderRadius} rowHeight={rowHeight} renderCell={renderCell} onRowClick={onRowClick} columnChange={columnChange} leavingColumnKeys={leavingColumnKeys} leavingColumns={leavingColumns} enteringColumnKeys={enteringColumnKeys} selectionState={selectionState} getRowId={getRowId} loadingIndicator={effectiveLoadingIndicator} onEndReached={effectiveOnEndReached} onEndReachedThreshold={effectiveThreshold} lastDroppedKeyRef={lastDroppedKeyRef} 
        // Drag state for inline column shifting
        getShiftDirection={getShiftDirection} getInlineOffset={getInlineOffset} getShiftAmount={getShiftAmount} isInlineDragMode={isInlineDragMode} draggedColumnKey={dragState.draggedKey}/>)}
          </div>
        </div>
      </div>
    </div>);
}
exports.StickyDataTable = StickyDataTable;
// Config
var config_2 = require("./config");
Object.defineProperty(exports, "TABLE_CONFIG", { enumerable: true, get: function () { return config_2.TABLE_CONFIG; } });
Object.defineProperty(exports, "ARROW_CONFIG", { enumerable: true, get: function () { return config_2.ARROW_CONFIG; } });
Object.defineProperty(exports, "ANIMATION_CONFIG", { enumerable: true, get: function () { return config_2.ANIMATION_CONFIG; } });
Object.defineProperty(exports, "CELL_CONFIG", { enumerable: true, get: function () { return config_2.CELL_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_BORDER_CONFIG", { enumerable: true, get: function () { return config_2.DEFAULT_BORDER_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_BACKGROUND_CONFIG", { enumerable: true, get: function () { return config_2.DEFAULT_BACKGROUND_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_TOOLBAR_LAYOUT", { enumerable: true, get: function () { return config_2.DEFAULT_TOOLBAR_LAYOUT; } });
Object.defineProperty(exports, "createBorderConfig", { enumerable: true, get: function () { return config_2.createBorderConfig; } });
Object.defineProperty(exports, "createBackgroundConfig", { enumerable: true, get: function () { return config_2.createBackgroundConfig; } });
Object.defineProperty(exports, "createStickyState", { enumerable: true, get: function () { return config_2.createStickyState; } });
// Dimension configuration utilities
Object.defineProperty(exports, "calculateToolbarHeight", { enumerable: true, get: function () { return config_2.calculateToolbarHeight; } });
Object.defineProperty(exports, "calculateSkeletonHeight", { enumerable: true, get: function () { return config_2.calculateSkeletonHeight; } });
Object.defineProperty(exports, "calculateIntegratedHeaderGap", { enumerable: true, get: function () { return config_2.calculateIntegratedHeaderGap; } });
Object.defineProperty(exports, "createToolbarConfig", { enumerable: true, get: function () { return config_2.createToolbarConfig; } });
Object.defineProperty(exports, "createToolbarLayoutConfig", { enumerable: true, get: function () { return config_2.createToolbarLayoutConfig; } });
Object.defineProperty(exports, "createSkeletonDimensionConfig", { enumerable: true, get: function () { return config_2.createSkeletonDimensionConfig; } });
Object.defineProperty(exports, "inferToolbarConfigFromProps", { enumerable: true, get: function () { return config_2.inferToolbarConfigFromProps; } });
// Unified table configuration
Object.defineProperty(exports, "DEFAULT_TABLE_CONFIGURATION", { enumerable: true, get: function () { return config_2.DEFAULT_TABLE_CONFIGURATION; } });
Object.defineProperty(exports, "createTableConfiguration", { enumerable: true, get: function () { return config_2.createTableConfiguration; } });
Object.defineProperty(exports, "tableConfigToProps", { enumerable: true, get: function () { return config_2.tableConfigToProps; } });
Object.defineProperty(exports, "getDefaultTableProps", { enumerable: true, get: function () { return config_2.getDefaultTableProps; } });
Object.defineProperty(exports, "deepMerge", { enumerable: true, get: function () { return config_2.deepMerge; } });
// Hooks
var hooks_2 = require("./hooks");
Object.defineProperty(exports, "useScrollSync", { enumerable: true, get: function () { return hooks_2.useScrollSync; } });
Object.defineProperty(exports, "useColumns", { enumerable: true, get: function () { return hooks_2.useColumns; } });
Object.defineProperty(exports, "useSort", { enumerable: true, get: function () { return hooks_2.useSort; } });
Object.defineProperty(exports, "useSelection", { enumerable: true, get: function () { return hooks_2.useSelection; } });
Object.defineProperty(exports, "useWheelRedirect", { enumerable: true, get: function () { return hooks_2.useWheelRedirect; } });
Object.defineProperty(exports, "useArrowPosition", { enumerable: true, get: function () { return hooks_2.useArrowPosition; } });
Object.defineProperty(exports, "useInfiniteScroll", { enumerable: true, get: function () { return hooks_2.useInfiniteScroll; } });
Object.defineProperty(exports, "useStickyDataTable", { enumerable: true, get: function () { return hooks_2.useStickyDataTable; } });
Object.defineProperty(exports, "useColumnConfiguration", { enumerable: true, get: function () { return hooks_2.useColumnConfiguration; } });
Object.defineProperty(exports, "useTableConfiguration", { enumerable: true, get: function () { return hooks_2.useTableConfiguration; } });
// Utils
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
// Column processor utilities (unified table/skeleton processing)
Object.defineProperty(exports, "processColumns", { enumerable: true, get: function () { return utils_1.processColumns; } });
Object.defineProperty(exports, "createVisibleColumnKeys", { enumerable: true, get: function () { return utils_1.createVisibleColumnKeys; } });
Object.defineProperty(exports, "hasStickyColumns", { enumerable: true, get: function () { return utils_1.hasStickyColumns; } });
Object.defineProperty(exports, "countStickyColumns", { enumerable: true, get: function () { return utils_1.countStickyColumns; } });
Object.defineProperty(exports, "getRightmostStickyColumn", { enumerable: true, get: function () { return utils_1.getRightmostStickyColumn; } });
// Components (for advanced customization)
var components_2 = require("./components");
Object.defineProperty(exports, "TableCell", { enumerable: true, get: function () { return components_2.TableCell; } });
Object.defineProperty(exports, "TableRow", { enumerable: true, get: function () { return components_2.TableRow; } });
Object.defineProperty(exports, "TableHeader", { enumerable: true, get: function () { return components_2.TableHeader; } });
Object.defineProperty(exports, "TableBody", { enumerable: true, get: function () { return components_2.TableBody; } });
Object.defineProperty(exports, "NavigationArrow", { enumerable: true, get: function () { return components_2.NavigationArrow; } });
Object.defineProperty(exports, "NavigationArrows", { enumerable: true, get: function () { return components_2.NavigationArrows; } });
Object.defineProperty(exports, "GradientOverlay", { enumerable: true, get: function () { return components_2.GradientOverlay; } });
Object.defineProperty(exports, "StickyHeaderWrapper", { enumerable: true, get: function () { return components_2.StickyHeaderWrapper; } });
Object.defineProperty(exports, "ColumnControlPanel", { enumerable: true, get: function () { return components_2.ColumnControlPanel; } });
Object.defineProperty(exports, "ExportToolbar", { enumerable: true, get: function () { return components_2.ExportToolbar; } });
Object.defineProperty(exports, "SearchToolbar", { enumerable: true, get: function () { return components_2.SearchToolbar; } });
Object.defineProperty(exports, "TableEmptyState", { enumerable: true, get: function () { return components_2.TableEmptyState; } });
// Context
var table_context_1 = require("./context/table-context");
Object.defineProperty(exports, "TableProvider", { enumerable: true, get: function () { return table_context_1.TableProvider; } });
Object.defineProperty(exports, "useTableContext", { enumerable: true, get: function () { return table_context_1.useTableContext; } });
Object.defineProperty(exports, "useScrollContext", { enumerable: true, get: function () { return table_context_1.useScrollContext; } });
Object.defineProperty(exports, "useColumnsContext", { enumerable: true, get: function () { return table_context_1.useColumnsContext; } });
Object.defineProperty(exports, "useSelectionContext", { enumerable: true, get: function () { return table_context_1.useSelectionContext; } });
Object.defineProperty(exports, "useSortContext", { enumerable: true, get: function () { return table_context_1.useSortContext; } });
Object.defineProperty(exports, "useStylingContext", { enumerable: true, get: function () { return table_context_1.useStylingContext; } });
// Page Background Context (for automatic background synchronization)
var page_background_context_1 = require("./context/page-background-context");
Object.defineProperty(exports, "TablePageBackgroundProvider", { enumerable: true, get: function () { return page_background_context_1.TablePageBackgroundProvider; } });
Object.defineProperty(exports, "useTablePageBackground", { enumerable: true, get: function () { return page_background_context_1.useTablePageBackground; } });
Object.defineProperty(exports, "createPageBackgroundStyle", { enumerable: true, get: function () { return page_background_context_1.createPageBackgroundStyle; } });
Object.defineProperty(exports, "getBackgroundCssVar", { enumerable: true, get: function () { return page_background_context_1.getBackgroundCssVar; } });
Object.defineProperty(exports, "PAGE_BACKGROUND_CONFIGS", { enumerable: true, get: function () { return page_background_context_1.PAGE_BACKGROUND_CONFIGS; } });
var filter_types_1 = require("./filter-types");
Object.defineProperty(exports, "DEFAULT_DATE_PRESETS", { enumerable: true, get: function () { return filter_types_1.DEFAULT_DATE_PRESETS; } });
Object.defineProperty(exports, "createSelectFilter", { enumerable: true, get: function () { return filter_types_1.createSelectFilter; } });
Object.defineProperty(exports, "createDateFilter", { enumerable: true, get: function () { return filter_types_1.createDateFilter; } });
Object.defineProperty(exports, "createRangeFilter", { enumerable: true, get: function () { return filter_types_1.createRangeFilter; } });
var use_table_filters_1 = require("./hooks/use-table-filters");
Object.defineProperty(exports, "useTableFilters", { enumerable: true, get: function () { return use_table_filters_1.useTableFilters; } });
var filter_toolbar_1 = require("./components/filter-toolbar");
Object.defineProperty(exports, "FilterToolbar", { enumerable: true, get: function () { return filter_toolbar_1.FilterToolbar; } });
var filter_dropdown_1 = require("./components/filter-dropdown");
Object.defineProperty(exports, "FilterDropdown", { enumerable: true, get: function () { return filter_dropdown_1.FilterDropdown; } });
// Re-export CSV export hook (compatible with V2)
var use_export_csv_sticky_1 = require("./hooks/use-export-csv-sticky");
Object.defineProperty(exports, "useExportCsvSticky", { enumerable: true, get: function () { return use_export_csv_sticky_1.useExportCsvSticky; } });
// Export skeleton loader components and helpers
var components_3 = require("./components");
Object.defineProperty(exports, "TableSkeleton", { enumerable: true, get: function () { return components_3.TableSkeleton; } });
Object.defineProperty(exports, "LoadMoreSkeleton", { enumerable: true, get: function () { return components_3.LoadMoreSkeleton; } });
Object.defineProperty(exports, "createSkeletonConfigFromTableProps", { enumerable: true, get: function () { return components_3.createSkeletonConfigFromTableProps; } });
// Data adapters for automatic skeleton/loading state management
var hooks_3 = require("./hooks");
// Core loading state hook (for building custom adapters)
Object.defineProperty(exports, "useTableLoadingState", { enumerable: true, get: function () { return hooks_3.useTableLoadingState; } });
// Apollo GraphQL adapter
Object.defineProperty(exports, "useTableWithGraphQL", { enumerable: true, get: function () { return hooks_3.useTableWithGraphQL; } });
// Generic async adapter (fetch, axios, etc.)
Object.defineProperty(exports, "useTableWithAsync", { enumerable: true, get: function () { return hooks_3.useTableWithAsync; } });
//# sourceMappingURL=index.js.map