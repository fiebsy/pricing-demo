"use strict";
/**
 * Delphi AI Studio - Audience Tab Dashboard
 *
 * Live dashboard showing everyone who has interacted with your Delphi.
 * Monitor engagement, apply filters, manage tags and access.
 *
 * Route: /studio
 */
'use client';
/**
 * Delphi AI Studio - Audience Tab Dashboard
 *
 * Live dashboard showing everyone who has interacted with your Delphi.
 * Monitor engagement, apply filters, manage tags and access.
 *
 * Route: /studio
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sticky_data_table_1 = require("@/components/ui/prod/data/sticky-data-table");
// Studio module imports
const hardened_preset_1 = require("@/modules/studio/config/hardened-preset");
const column_config_1 = require("@/modules/studio/config/column-config");
const filter_config_1 = require("@/modules/studio/config/filter-config");
const use_mock_audience_1 = require("@/modules/studio/hooks/use-mock-audience");
const metric_tile_bar_1 = require("@/modules/studio/components/metric-tile-bar");
const toolbar_1 = require("@/modules/studio/components/toolbar");
const cell_renderer_1 = require("@/modules/studio/components/cell-renderer");
// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
function StudioPage() {
    // Search state
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [searchExpanded, setSearchExpanded] = (0, react_1.useState)(false);
    // Filter state - default to no filters
    const [activeFilters, setActiveFilters] = (0, react_1.useState)([]);
    // Active metric for highlighting tiles (no filter by default)
    const [activeMetric, setActiveMetric] = (0, react_1.useState)(null);
    // Server-side sort state
    const [sortBy, setSortBy] = (0, react_1.useState)('LAST_INTERACTED');
    const [sortOrder, setSortOrder] = (0, react_1.useState)('DESC');
    const [sortColumnKey, setSortColumnKey] = (0, react_1.useState)('lastInteracted');
    // Column configuration (no drag-to-reorder for this dashboard)
    const { columns: orderedColumns, reorderColumns, isHydrated: isColumnConfigHydrated, } = (0, sticky_data_table_1.useColumnConfiguration)({
        columns: column_config_1.AUDIENCE_COLUMNS,
        storageKey: 'studio-audience-columns',
    });
    // Fetch data using mock pagination hook
    const { items, isLoading, isLoadingMore, totalCount, hasNextPage, loadMore, metrics, } = (0, use_mock_audience_1.useMockAudience)({
        pageSize: column_config_1.PAGE_SIZE,
        sortBy,
        sortOrder,
        searchQuery: searchQuery || undefined,
        delay: 300,
    });
    // Deferred filters for table - allows chips to animate immediately while table catches up
    const deferredActiveFilters = (0, react_1.useDeferredValue)(activeFilters);
    // Apply client-side filters using DEFERRED value
    const filteredItems = (0, react_1.useMemo)(() => {
        return (0, filter_config_1.applyFilters)(items, deferredActiveFilters);
    }, [items, deferredActiveFilters]);
    // Metric click handler - apply filters based on metric
    const handleMetricClick = (0, react_1.useCallback)((metricId) => {
        // Toggle metric selection
        if (activeMetric === metricId) {
            setActiveMetric(null);
            // Don't clear filters - just deselect the metric tile
            return;
        }
        setActiveMetric(metricId);
        // Apply specific filters based on metric
        switch (metricId) {
            case 'totalActive':
                // Filter to show only active users
                setActiveFilters([
                    {
                        id: 'status-active',
                        label: filter_config_1.FILTER_DISPLAY_LABELS['status-active'].label,
                        value: filter_config_1.FILTER_DISPLAY_LABELS['status-active'].value,
                        category: filter_config_1.FILTER_DISPLAY_LABELS['status-active'].category,
                    },
                ]);
                break;
            case 'totalMessages':
                // No specific filter - show all (clear any message filters)
                setActiveFilters((prev) => prev.filter((f) => !f.id.startsWith('messages-')));
                break;
            case 'avgMessages':
                // No specific filter
                break;
            case 'mostEngaged':
                // Filter to show users with 51+ messages
                setActiveFilters([
                    {
                        id: 'messages-51+',
                        label: filter_config_1.FILTER_DISPLAY_LABELS['messages-51+'].label,
                        value: filter_config_1.FILTER_DISPLAY_LABELS['messages-51+'].value,
                        category: filter_config_1.FILTER_DISPLAY_LABELS['messages-51+'].category,
                    },
                ]);
                break;
        }
    }, [activeMetric]);
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
        // Clear metric selection when manually filtering
        setActiveMetric(null);
    }, []);
    const handleFilterRemove = (0, react_1.useCallback)((filterId) => {
        setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
        setActiveMetric(null);
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
        setActiveMetric(null);
    }, []);
    const handleFiltersClear = (0, react_1.useCallback)(() => {
        setActiveFilters([]);
        setActiveMetric(null);
    }, []);
    // Clear ALL filters, search, and metric filter
    const handleClearAll = (0, react_1.useCallback)(() => {
        setActiveFilters([]);
        setSearchQuery('');
        setActiveMetric(null);
    }, []);
    // Determine if any filters/search are active
    const hasAnyFilters = activeFilters.length > 0 || !!searchQuery;
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
    // Row click handler (would open profile drawer in real app)
    const handleRowClick = (0, react_1.useCallback)((row) => {
        console.log('Row clicked:', row.name, row.email);
        // In real app: open profile sheet/drawer
    }, []);
    // Export handlers
    const handleExportAll = (0, react_1.useCallback)(async () => {
        console.log('Export all:', filteredItems.length, 'users');
    }, [filteredItems.length]);
    const handleExportSelected = (0, react_1.useCallback)(async (selectionState) => {
        console.log('Export selected:', selectionState?.selectedIds.size ?? 0, 'users');
    }, []);
    return (<div className="mx-auto w-full max-w-[1200px] px-6 pt-16">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-primary text-xl font-semibold lg:text-2xl">Audience</h1>
        <p className="text-tertiary mt-1 text-sm">
          Everyone who has interacted with your Delphi
        </p>
      </div>

      {/* Metric Tiles - Engagement Overview */}
      <metric_tile_bar_1.MetricTileBar activeMetric={activeMetric} onMetricClick={handleMetricClick} metrics={metrics} className="mb-8"/>

      {/* Audience Table - Hardened Configuration */}
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
    showCount={hardened_preset_1.HARDENED_FEATURES.showCount} totalCount={filteredItems.length} countLabel="users" 
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
    searchTerm={searchQuery || undefined} hasActiveFilters={hasAnyFilters} emptyState={<sticky_data_table_1.TableEmptyState variant="empty" title="No users yet" description="Users will appear here once they interact with your Delphi."/>} noResultsState={<sticky_data_table_1.TableEmptyState variant="no-results" searchTerm={searchQuery || undefined} description={searchQuery
                ? undefined // Uses default "No results found for X" when searchTerm is set
                : activeFilters.length > 0
                    ? `No users match your current filters. Try adjusting or clearing them.`
                    : undefined} secondaryAction={hasAnyFilters
                ? { label: 'Clear filters', onClick: handleClearAll }
                : undefined}/>}/>
    </div>);
}
exports.default = StudioPage;
//# sourceMappingURL=page.js.map