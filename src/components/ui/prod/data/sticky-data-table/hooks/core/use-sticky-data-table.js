"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStickyDataTable = void 0;
/**
 * StickyDataTable V2 - Main Table Hook
 *
 * Orchestrates all table state and logic in a single hook.
 * Extracted from index.tsx for better testability and separation of concerns.
 *
 * This hook manages:
 * - Column visibility and configuration
 * - Sorting (client-side or server-side)
 * - Scroll synchronization
 * - Row selection
 * - Infinite scroll handling
 * - Configuration merging
 *
 * @module hooks/use-sticky-data-table
 */
const react_1 = require("react");
const React = require("react");
const config_1 = require("../../config");
const page_background_context_1 = require("../../context/page-background-context");
const utils_1 = require("../../utils");
const use_columns_1 = require("../column/use-columns");
const use_scroll_sync_1 = require("../scroll/use-scroll-sync");
const use_selection_1 = require("../state/use-selection");
const use_sort_1 = require("../state/use-sort");
const use_wheel_redirect_1 = require("../scroll/use-wheel-redirect");
const components_1 = require("../../components");
// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================
/**
 * Main orchestration hook for StickyDataTable
 *
 * Extracts all business logic from the main component, making it:
 * - Testable in isolation
 * - Reusable for custom table implementations
 * - Easier to understand and maintain
 *
 * @example
 * ```tsx
 * const tableState = useStickyDataTable({
 *   data,
 *   columns,
 *   columnLabels,
 *   enableSelection: true,
 *   getRowId: (row) => row.id,
 * })
 *
 * // Use tableState in your custom rendering
 * ```
 */
function useStickyDataTable({ data, columns, columnLabels, borderRadius = config_1.TABLE_CONFIG.DEFAULT_BORDER_RADIUS, borderConfig: borderConfigOverrides, backgroundConfig: backgroundConfigOverrides, showColumnControl = true, enableSelection = false, getRowId, exportAll, exportSelected, exportToolbar, defaultHiddenColumns = [], defaultVisibleColumns, leftToolbar, rightToolbar, showCount = false, 
// Toolbar layout
toolbarLayout: toolbarLayoutOverrides, 
// Server-side sorting
serverSideSort = false, onServerSort, serverSortColumn, serverSortDirection, 
// Infinite scroll
infiniteScroll, 
// Legacy props
loadingIndicator, onEndReached, onEndReachedThreshold, }) {
    // ==========================================================================
    // DEPRECATION WARNINGS
    // ==========================================================================
    if (process.env.NODE_ENV === 'development') {
        if (loadingIndicator !== undefined) {
            console.warn('[StickyDataTable] loadingIndicator is deprecated. Use infiniteScroll.customIndicator instead.');
        }
        if (onEndReached !== undefined) {
            console.warn('[StickyDataTable] onEndReached is deprecated. Use infiniteScroll.onLoadMore instead.');
        }
        if (onEndReachedThreshold !== undefined) {
            console.warn('[StickyDataTable] onEndReachedThreshold is deprecated. Use infiniteScroll.threshold instead.');
        }
    }
    // ==========================================================================
    // REFS
    // ==========================================================================
    const headerScrollRef = (0, react_1.useRef)(null);
    const bodyScrollRef = (0, react_1.useRef)(null);
    // ==========================================================================
    // PAGE BACKGROUND CONTEXT
    // ==========================================================================
    // Read page background from React context (if provider is present)
    const pageBackground = (0, page_background_context_1.useTablePageBackground)();
    // ==========================================================================
    // MERGED CONFIGS
    // ==========================================================================
    const borderConfig = (0, react_1.useMemo)(() => (0, config_1.createBorderConfig)(borderConfigOverrides), [borderConfigOverrides]);
    // Background config merges in this priority order:
    // 1. Explicit backgroundConfig.headerWrapper that differs from default (highest priority)
    // 2. Page background from React context
    // 3. Default configuration
    //
    // Note: We check if headerWrapper differs from the default because toTableProps()
    // always includes the full config. Only treat it as an explicit override if
    // the user intentionally changed it from the default.
    const isExplicitHeaderWrapperOverride = (0, react_1.useMemo)(() => {
        if (!backgroundConfigOverrides?.headerWrapper)
            return false;
        return backgroundConfigOverrides.headerWrapper !== config_1.DEFAULT_BACKGROUND_CONFIG.headerWrapper;
    }, [backgroundConfigOverrides?.headerWrapper]);
    const backgroundConfig = (0, react_1.useMemo)(() => {
        // If explicit headerWrapper override (different from default), use it
        if (isExplicitHeaderWrapperOverride) {
            return (0, config_1.createBackgroundConfig)(backgroundConfigOverrides);
        }
        // If page background context is available, use it as the headerWrapper
        if (pageBackground) {
            return (0, config_1.createBackgroundConfig)({
                ...backgroundConfigOverrides,
                headerWrapper: pageBackground.backgroundClass,
            });
        }
        // Fall back to defaults
        return (0, config_1.createBackgroundConfig)(backgroundConfigOverrides);
    }, [backgroundConfigOverrides, pageBackground, isExplicitHeaderWrapperOverride]);
    // Compute CSS variable for gradient overlays
    // Priority: explicit override > context > default
    const gradientBackgroundCssVar = (0, react_1.useMemo)(() => {
        if (isExplicitHeaderWrapperOverride && backgroundConfigOverrides?.headerWrapper) {
            return (0, page_background_context_1.getBackgroundCssVar)(backgroundConfigOverrides.headerWrapper);
        }
        if (pageBackground) {
            return pageBackground.backgroundCssVar;
        }
        return 'var(--background-color-secondary_alt)';
    }, [isExplicitHeaderWrapperOverride, backgroundConfigOverrides?.headerWrapper, pageBackground]);
    // Toolbar layout config (resolved with defaults)
    const toolbarLayout = (0, react_1.useMemo)(() => (0, config_1.createToolbarLayoutConfig)(toolbarLayoutOverrides), [toolbarLayoutOverrides]);
    // ==========================================================================
    // SELECTION SETUP
    // ==========================================================================
    // Generate row IDs for selection
    const rowIds = (0, react_1.useMemo)(() => {
        if (!enableSelection || !getRowId)
            return [];
        return data.map((row, index) => getRowId(row, index));
    }, [data, enableSelection, getRowId]);
    // Selection state
    const selectionState = (0, use_selection_1.useSelection)({
        rowIds,
        enabled: enableSelection,
    });
    // ==========================================================================
    // COLUMNS WITH SELECTION
    // ==========================================================================
    // Add checkbox column if selection enabled
    const columnsWithSelection = (0, react_1.useMemo)(() => {
        if (!enableSelection)
            return columns;
        // Check if checkbox column already exists
        if (columns.some((col) => col.key === '__checkbox'))
            return columns;
        // Add checkbox column as first sticky column
        const checkboxColumn = {
            key: '__checkbox',
            width: 48,
            align: 'center',
            isSticky: true,
            stickyLeft: 0,
            sortable: false,
        };
        // Adjust stickyLeft for existing sticky columns
        const adjustedColumns = columns.map((col) => {
            if (col.isSticky && col.stickyLeft !== undefined) {
                return { ...col, stickyLeft: col.stickyLeft + checkboxColumn.width };
            }
            return col;
        });
        return [checkboxColumn, ...adjustedColumns];
    }, [columns, enableSelection]);
    // ==========================================================================
    // COLUMN MANAGEMENT
    // ==========================================================================
    const { stickyColumns: rawStickyColumns, scrollableColumns: rawScrollableColumns, visibleColumnKeys, leavingColumnKeys, leavingColumns, enteringColumnKeys, columnChange, toggleColumn, resetColumns, totalStickyWidth, } = (0, use_columns_1.useColumns)({
        columns: columnsWithSelection,
        defaultHiddenColumns,
        defaultVisibleColumns,
    });
    // Compute column positions (leaving columns excluded - rendered as absolute overlay)
    // IMPORTANT: Sticky columns MUST come first to match grid template order (sticky first, then scrollable)
    const allVisibleColumns = (0, react_1.useMemo)(() => {
        const visible = columnsWithSelection.filter((col) => visibleColumnKeys.has(col.key));
        // Reorder so sticky columns always come first (maintains relative order within each group)
        const sticky = visible.filter((col) => col.isSticky);
        const scrollable = visible.filter((col) => !col.isSticky);
        return (0, utils_1.computeColumnOffsets)([...sticky, ...scrollable]);
    }, [columnsWithSelection, visibleColumnKeys]);
    const { stickyColumns, scrollableColumns } = (0, react_1.useMemo)(() => (0, utils_1.separateColumns)(allVisibleColumns), [allVisibleColumns]);
    // ==========================================================================
    // SORTING
    // ==========================================================================
    // Client-side sorting
    const clientSort = (0, use_sort_1.useSort)({ data });
    // Determine which sort state to use
    const sortColumn = serverSideSort ? (serverSortColumn ?? null) : clientSort.sortColumn;
    const sortDirection = serverSideSort ? (serverSortDirection ?? 'desc') : clientSort.sortDirection;
    const sortedData = serverSideSort ? data : clientSort.sortedData;
    // Handle sort click - delegates to server or client
    const handleSort = (columnKey) => {
        if (serverSideSort && onServerSort) {
            // Server-side: calculate new direction and call callback
            const newDirection = sortColumn === columnKey ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'desc';
            onServerSort(columnKey, newDirection);
        }
        else {
            // Client-side: use internal hook
            clientSort.handleSort(columnKey);
        }
    };
    // ==========================================================================
    // SCROLL SYNCHRONIZATION
    // ==========================================================================
    const { canScrollLeft, canScrollRight, showScrollIndicator, handleScrollLeft, handleScrollRight } = (0, use_scroll_sync_1.useScrollSync)({
        headerRef: headerScrollRef,
        bodyRef: bodyScrollRef,
    });
    // Wheel redirect for vertical scrolling
    (0, use_wheel_redirect_1.useWheelRedirect)({ bodyRef: bodyScrollRef });
    // Create sticky state
    const stickyState = (0, react_1.useMemo)(() => (0, config_1.createStickyState)(canScrollLeft, canScrollRight), [canScrollLeft, canScrollRight]);
    // ==========================================================================
    // COLUMN LABELS
    // ==========================================================================
    const columnLabelsWithCheckbox = (0, react_1.useMemo)(() => {
        if (!enableSelection)
            return columnLabels;
        return { __checkbox: '', ...columnLabels };
    }, [columnLabels, enableSelection]);
    // ==========================================================================
    // TOOLBAR STATE
    // ==========================================================================
    const showExportButton = !!(exportAll || exportSelected || exportToolbar);
    const showToolbar = !!(leftToolbar || rightToolbar || showExportButton || showColumnControl || showCount);
    // ==========================================================================
    // INFINITE SCROLL
    // ==========================================================================
    // Compute effective infinite scroll values (new API takes precedence over legacy)
    const effectiveOnEndReached = (0, react_1.useMemo)(() => {
        if (infiniteScroll) {
            // New API: only trigger if hasNextPage and not already loading
            return infiniteScroll.hasNextPage && !infiniteScroll.isLoadingMore
                ? infiniteScroll.onLoadMore
                : undefined;
        }
        // Legacy API fallback
        return onEndReached;
    }, [infiniteScroll, onEndReached]);
    const effectiveThreshold = infiniteScroll?.threshold ?? onEndReachedThreshold ?? 200;
    // Generate loading indicator for infinite scroll load more
    // Priority:
    // 1. loadingIndicator prop (shown only during load more when infiniteScroll is active)
    // 2. infiniteScroll.customIndicator (shown only during load more)
    // 3. Auto-generated LoadMoreSkeleton (shown only during load more)
    //
    // NOTE: Loading indicator is only shown when actively loading more pages.
    // Initial load skeletons are handled separately via isLoading + skeletonConfig.
    const effectiveLoadingIndicator = (0, react_1.useMemo)(() => {
        // Only show loading indicator during infinite scroll load more
        const isLoadingMore = infiniteScroll?.isLoadingMore ?? false;
        if (!isLoadingMore) {
            return null;
        }
        // If explicit loadingIndicator prop is passed, use it during load more
        if (loadingIndicator) {
            return loadingIndicator;
        }
        // If using new infiniteScroll config
        if (infiniteScroll) {
            // Custom indicator takes precedence
            if (infiniteScroll.customIndicator) {
                return infiniteScroll.customIndicator;
            }
            // Auto-generate LoadMoreSkeleton when loading more pages
            return (<components_1.LoadMoreSkeleton columns={columnsWithSelection} rowCount={infiniteScroll.skeletonRowCount ?? 5} asRowsOnly={true} rowHeight={config_1.TABLE_CONFIG.ROW_HEIGHT} enableSelection={enableSelection} defaultVisibleColumns={defaultVisibleColumns} borderConfig={borderConfigOverrides} backgroundConfig={backgroundConfigOverrides}/>);
        }
        return null;
    }, [
        infiniteScroll,
        loadingIndicator,
        columnsWithSelection,
        enableSelection,
        defaultVisibleColumns,
        borderConfigOverrides,
        backgroundConfigOverrides,
    ]);
    // ==========================================================================
    // RETURN
    // ==========================================================================
    return {
        // Refs
        headerScrollRef,
        bodyScrollRef,
        // Merged configs
        borderConfig,
        backgroundConfig,
        gradientBackgroundCssVar,
        // Column state
        columnsWithSelection,
        stickyColumns,
        scrollableColumns,
        allVisibleColumns,
        visibleColumnKeys,
        leavingColumnKeys,
        leavingColumns,
        enteringColumnKeys,
        columnChange,
        toggleColumn,
        resetColumns,
        totalStickyWidth,
        columnLabelsWithCheckbox,
        // Sort state
        sortColumn,
        sortDirection,
        sortedData,
        handleSort,
        // Scroll state
        stickyState,
        showScrollIndicator,
        handleScrollLeft,
        handleScrollRight,
        // Selection state
        selectionState,
        // Toolbar state
        showExportButton,
        showToolbar,
        // Toolbar layout (resolved with defaults)
        toolbarLayout,
        // Infinite scroll
        effectiveOnEndReached,
        effectiveThreshold,
        effectiveLoadingIndicator,
    };
}
exports.useStickyDataTable = useStickyDataTable;
//# sourceMappingURL=use-sticky-data-table.js.map