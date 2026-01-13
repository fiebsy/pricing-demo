"use strict";
/**
 * Collections Dashboard Page
 *
 * Demo dashboard with mock data, showing:
 * - Metric tiles for quick filtering
 * - FilterMenu with submenu navigation
 * - ExpandingSearch with shine border
 * - Hardened table configuration
 * - ClawbackTimer for countdowns
 *
 * Route: /dashboard
 */
'use client';
/**
 * Collections Dashboard Page
 *
 * Demo dashboard with mock data, showing:
 * - Metric tiles for quick filtering
 * - FilterMenu with submenu navigation
 * - ExpandingSearch with shine border
 * - Hardened table configuration
 * - ClawbackTimer for countdowns
 *
 * Route: /dashboard
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sticky_data_table_1 = require("@/components/ui/prod/data/sticky-data-table");
// Collections module imports
const hardened_preset_1 = require("@/modules/collections/config/hardened-preset");
const column_config_1 = require("@/modules/collections/config/column-config");
const filter_config_1 = require("@/modules/collections/config/filter-config");
const use_mock_pagination_1 = require("@/modules/collections/hooks/use-mock-pagination");
const metric_tile_bar_1 = require("@/modules/collections/components/metric-tile-bar");
const toolbar_1 = require("@/modules/collections/components/toolbar");
const cell_renderer_1 = require("@/modules/collections/components/cell-renderer");
// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
function DashboardPage() {
    // Search state
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [searchExpanded, setSearchExpanded] = (0, react_1.useState)(false);
    // Filter state - default to "At Risk" (Collections + Last Chance)
    const [activeFilters, setActiveFilters] = (0, react_1.useState)([
        {
            id: 'status-collections',
            label: filter_config_1.FILTER_DISPLAY_LABELS['status-collections'].label,
            value: filter_config_1.FILTER_DISPLAY_LABELS['status-collections'].value,
            category: filter_config_1.FILTER_DISPLAY_LABELS['status-collections'].category,
        },
        {
            id: 'status-clawback',
            label: filter_config_1.FILTER_DISPLAY_LABELS['status-clawback'].label,
            value: filter_config_1.FILTER_DISPLAY_LABELS['status-clawback'].value,
            category: filter_config_1.FILTER_DISPLAY_LABELS['status-clawback'].category,
        },
    ]);
    // Derive activeMetric from activeFilters for metric tile highlighting
    const activeMetric = (0, react_1.useMemo)(() => {
        const hasCollections = activeFilters.some((f) => f.id === 'status-collections');
        const hasClawback = activeFilters.some((f) => f.id === 'status-clawback');
        const hasSettled = activeFilters.some((f) => f.id === 'status-settled');
        const hasDefaulted = activeFilters.some((f) => f.id === 'outcome-defaulted');
        // Only one filter type active = specific metric
        if (hasDefaulted && !hasCollections && !hasClawback && !hasSettled)
            return 'defaulted';
        if (hasSettled && !hasCollections && !hasClawback && !hasDefaulted)
            return 'settled';
        if (hasClawback && !hasCollections && !hasSettled && !hasDefaulted)
            return 'clawback';
        // Both collections and clawback = "At Risk"
        if (hasCollections && hasClawback && !hasSettled && !hasDefaulted)
            return 'atRisk';
        return null;
    }, [activeFilters]);
    // Server-side sort state
    const [sortBy, setSortBy] = (0, react_1.useState)('STATUS_CHANGED_AT');
    const [sortOrder, setSortOrder] = (0, react_1.useState)('DESC');
    const [sortColumnKey, setSortColumnKey] = (0, react_1.useState)('statusContext');
    // Column configuration for drag-to-reorder
    const { columns: orderedColumns, reorderColumns, isHydrated: isColumnConfigHydrated, } = (0, sticky_data_table_1.useColumnConfiguration)({
        columns: column_config_1.HARDENED_COLUMNS,
        storageKey: 'collections-dashboard-columns',
    });
    // Fetch data using mock pagination hook (simulates API)
    const { items, isLoading, isLoadingMore, totalCount, hasNextPage, loadMore, metrics, } = (0, use_mock_pagination_1.useMockPagination)({
        pageSize: column_config_1.PAGE_SIZE,
        sortBy,
        sortOrder,
        searchQuery: searchQuery || undefined,
        delay: 300,
    });
    // Deferred filters for table - allows chips to animate immediately while table catches up
    // This separates the high-priority chip animation from the lower-priority table re-render
    const deferredActiveFilters = (0, react_1.useDeferredValue)(activeFilters);
    // Apply client-side filters using DEFERRED value - table updates are deprioritized
    // Chips use immediate activeFilters, table uses deferredActiveFilters
    const filteredItems = (0, react_1.useMemo)(() => {
        return (0, filter_config_1.applyFilters)(items, deferredActiveFilters);
    }, [items, deferredActiveFilters]);
    // Metric click handler - toggle status filters on/off
    const handleMetricClick = (0, react_1.useCallback)((metricId) => {
        // Determine which filters correspond to this metric
        const metricToFilters = {
            atRisk: ['status-collections', 'status-clawback'],
            clawback: ['status-clawback'],
            settled: ['status-settled'],
            defaulted: ['outcome-defaulted'],
        };
        const filterIds = metricToFilters[metricId];
        setActiveFilters((prev) => {
            // Check if this metric is currently active (toggle off if so)
            const isCurrentlyActive = metricId === 'atRisk'
                ? prev.some((f) => f.id === 'status-collections') && prev.some((f) => f.id === 'status-clawback')
                : metricId === 'clawback'
                    ? prev.some((f) => f.id === 'status-clawback') && !prev.some((f) => f.id === 'status-collections')
                    : metricId === 'settled'
                        ? prev.some((f) => f.id === 'status-settled')
                        : prev.some((f) => f.id === 'outcome-defaulted');
            if (isCurrentlyActive) {
                // Remove all status filters for this metric
                return prev.filter((f) => !filterIds.includes(f.id));
            }
            else {
                // Remove any existing status/outcome filters first, then add new ones
                const withoutStatusFilters = prev.filter((f) => !['status-collections', 'status-clawback', 'status-settled', 'outcome-defaulted'].includes(f.id));
                // Add the filters for this metric
                const newFilters = filterIds.map((id) => ({
                    id,
                    label: filter_config_1.FILTER_DISPLAY_LABELS[id].label,
                    value: filter_config_1.FILTER_DISPLAY_LABELS[id].value,
                    category: filter_config_1.FILTER_DISPLAY_LABELS[id].category,
                }));
                return [...withoutStatusFilters, ...newFilters];
            }
        });
    }, []);
    // Filter handlers
    const handleFilterSelect = (0, react_1.useCallback)((filterId) => {
        const id = filterId;
        const displayInfo = filter_config_1.FILTER_DISPLAY_LABELS[id];
        if (!displayInfo)
            return;
        setActiveFilters((prev) => {
            // Check if already active
            if (prev.some((f) => f.id === id)) {
                // Remove it
                return prev.filter((f) => f.id !== id);
            }
            else {
                // Add it
                return [
                    ...prev,
                    {
                        id,
                        label: displayInfo.label,
                        value: displayInfo.value,
                        category: displayInfo.category,
                    },
                ];
            }
        });
    }, []);
    const handleFilterRemove = (0, react_1.useCallback)((filterId) => {
        setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
    }, []);
    const handleFilterChange = (0, react_1.useCallback)((oldFilterId, newFilterId) => {
        const id = newFilterId;
        const displayInfo = filter_config_1.FILTER_DISPLAY_LABELS[id];
        if (!displayInfo)
            return;
        setActiveFilters((prev) => prev.map((f) => f.id === oldFilterId
            ? {
                id,
                label: displayInfo.label,
                value: displayInfo.value,
                category: displayInfo.category,
            }
            : f));
    }, []);
    const handleFiltersClear = (0, react_1.useCallback)(() => {
        setActiveFilters([]);
    }, []);
    // Clear ALL filters, search, and metric filter - used by empty state "Clear filters" button
    const handleClearAll = (0, react_1.useCallback)(() => {
        setActiveFilters([]);
        setSearchQuery('');
    }, []);
    // Determine if any filters/search are active (for empty state button visibility)
    const hasAnyFilters = activeFilters.length > 0 || !!searchQuery || activeMetric !== null;
    // Handle server-side sort
    const handleServerSort = (0, react_1.useCallback)((columnKey, direction) => {
        const backendSortField = column_config_1.COLUMN_TO_SORT_FIELD[columnKey];
        if (!backendSortField) {
            // Column not sortable on server
            return;
        }
        setSortColumnKey(columnKey);
        setSortBy(backendSortField);
        setSortOrder(direction === 'asc' ? 'ASC' : 'DESC');
    }, []);
    // Row click handler (no-op for demo, would open sheet in real app)
    const handleRowClick = (0, react_1.useCallback)((row) => {
        console.log('Row clicked:', row.contractId);
        // In real app: setSelectedContractId(row.contractId); setSheetOpen(true)
    }, []);
    // Export handlers (simplified for demo)
    const handleExportAll = (0, react_1.useCallback)(async () => {
        console.log('Export all:', filteredItems.length, 'rows');
        // In real app: generate CSV and download
    }, [filteredItems.length]);
    const handleExportSelected = (0, react_1.useCallback)(async (selectionState) => {
        console.log('Export selected:', selectionState?.selectedIds.size ?? 0, 'rows');
        // In real app: generate CSV from selected rows and download
    }, []);
    return (<div className="mx-auto w-full max-w-[1200px] px-6 pt-16">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-primary text-xl font-semibold lg:text-2xl">Risk</h1>
        <p className="text-tertiary mt-1 text-sm">Collections and clawback activity</p>
      </div>

      {/* Metric Tiles - Risk Activity Overview */}
      <metric_tile_bar_1.MetricTileBar activeMetric={activeMetric} onMetricClick={handleMetricClick} metrics={metrics} className="mb-8"/>

      {/* Risk Activity Table - Hardened Configuration */}
      <sticky_data_table_1.StickyDataTable data={isLoading ? [] : filteredItems} columns={orderedColumns} columnLabels={column_config_1.COLUMN_LABELS} renderCell={cell_renderer_1.renderCell} onRowClick={handleRowClick} 
    // Hardened dimensions
    borderRadius={hardened_preset_1.HARDENED_DIMENSIONS.borderRadius} headerHeight={hardened_preset_1.HARDENED_DIMENSIONS.headerHeight} rowHeight={hardened_preset_1.HARDENED_DIMENSIONS.rowHeight} 
    // Hardened styling
    borderConfig={hardened_preset_1.HARDENED_BORDER_CONFIG} backgroundConfig={hardened_preset_1.HARDENED_BACKGROUND_CONFIG} toolbarLayout={hardened_preset_1.HARDENED_TOOLBAR_CONFIG} className="relative" 
    // Features - hardened
    enableSelection={hardened_preset_1.HARDENED_FEATURES.enableSelection} showColumnControl={hardened_preset_1.HARDENED_FEATURES.showColumnControl} enableColumnReorder={hardened_preset_1.HARDENED_FEATURES.enableColumnReorder} onReorderColumns={reorderColumns} isColumnConfigHydrated={isColumnConfigHydrated} getRowId={(row) => String(row.id)} 
    // Left toolbar - Filter menu
    leftToolbar={<toolbar_1.LeftToolbarContent activeFilters={activeFilters} onFilterSelect={handleFilterSelect} onFilterChange={handleFilterChange} onFilterRemove={handleFilterRemove} onFiltersClear={handleFiltersClear}/>} 
    // Right toolbar - Expanding search
    rightToolbar={<toolbar_1.RightToolbarContent value={searchQuery} onChange={setSearchQuery} expanded={searchExpanded} onExpandedChange={setSearchExpanded}/>} 
    // Count display
    showCount={hardened_preset_1.HARDENED_FEATURES.showCount} totalCount={filteredItems.length} countLabel="contracts" 
    // Server-side sorting
    serverSideSort={true} onServerSort={handleServerSort} serverSortColumn={sortColumnKey} serverSortDirection={sortOrder === 'ASC' ? 'asc' : 'desc'} 
    // Export
    exportAll={handleExportAll} exportSelected={handleExportSelected} 
    // Infinite scroll
    infiniteScroll={{
            hasNextPage,
            isLoadingMore,
            onLoadMore: loadMore,
            threshold: 200,
        }} 
    // Loading state
    isLoading={isLoading} 
    // Empty states
    searchTerm={searchQuery || undefined} hasActiveFilters={hasAnyFilters} emptyState={<sticky_data_table_1.TableEmptyState variant="empty" title="No risk activity" description="This partner doesn't have any contracts in collections or clawback status."/>} noResultsState={<sticky_data_table_1.TableEmptyState variant="no-results" searchTerm={searchQuery || undefined} description={searchQuery
                ? undefined // Uses default "No results found for X" when searchTerm is set
                : activeFilters.length > 0 || activeMetric
                    ? `No contracts match your current filters. Try adjusting or clearing them.`
                    : undefined} secondaryAction={hasAnyFilters
                ? { label: 'Clear filters', onClick: handleClearAll }
                : undefined}/>}/>
    </div>);
}
exports.default = DashboardPage;
//# sourceMappingURL=page.js.map