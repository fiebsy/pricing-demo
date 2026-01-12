'use client'

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

import { useMemo, useRef } from 'react'
import { GradientOverlay, StickyHeaderWrapper, TableBody, ToolbarContent, LoadMoreSkeleton } from './components'
import { useHeaderDrag } from './components/header/use-header-drag'
import { TABLE_CONFIG, DEFAULT_SKELETON_CONFIG } from './config'
import { useStickyDataTable, useFilterBarPosition } from './hooks'
import type { StickyDataTableProps } from './types'
import { processColumns, createVisibleColumnKeys } from './utils'

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
export function StickyDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  columnLabels,
  renderCell,
  onRowClick,
  borderRadius = TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  headerHeight = TABLE_CONFIG.HEADER_HEIGHT,
  rowHeight = TABLE_CONFIG.ROW_HEIGHT,
  borderConfig: borderConfigOverrides,
  backgroundConfig: backgroundConfigOverrides,
  showColumnControl = true,
  className,
  arrowPreferredTopOffset,
  enableSelection = false,
  getRowId,
  exportAll,
  exportSelected,
  exportToolbar,
  defaultHiddenColumns = [],
  defaultVisibleColumns,
  columnGroups,
  leftToolbar,
  rightToolbar,
  showCount = false,
  totalCount,
  countLabel = 'items',
  testId,
  // Toolbar layout
  toolbarLayout: toolbarLayoutOverrides,
  // Server-side sorting props
  serverSideSort = false,
  onServerSort,
  serverSortColumn,
  serverSortDirection,
  // Infinite scroll
  infiniteScroll,
  // Legacy props (deprecated)
  loadingIndicator,
  onEndReached,
  onEndReachedThreshold,
  // Empty state
  emptyState,
  noResultsState,
  searchTerm,
  hasActiveFilters,
  isLoading,
  // Column reordering
  enableColumnReorder = true,
  onReorderColumns,
  isColumnConfigHydrated = true, // Default to true to avoid breaking existing usage
  dragCloneMode = 'inline',
  dragSwapThreshold,
  // Skeleton configuration
  skeletonConfig,
  // Filter status bar
  filterStatusBar,
}: StickyDataTableProps<T>) {
  // ==========================================================================
  // REFS
  // ==========================================================================

  // Ref to track the last dropped column key for FLIP animation exclusion
  // Shared between header and body so both can exclude the dragged column
  const lastDroppedKeyRef = useRef<string | null>(null)

  // Ref for the table container (used for filter bar positioning)
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // ==========================================================================
  // USE MAIN HOOK - All logic extracted for cleaner component
  // ==========================================================================

  const {
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
    // Toolbar layout
    toolbarLayout,
    // Infinite scroll
    effectiveOnEndReached,
    effectiveThreshold,
    effectiveLoadingIndicator,
  } = useStickyDataTable({
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
  })

  // ==========================================================================
  // DRAG-AND-DROP STATE (shared between header and body)
  // ==========================================================================

  const {
    dragState,
    columnRectsRef,
    lastDroppedKeyRef: dragDroppedKeyRef,
    dragStartXRef,
    isColumnDraggable,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    getShiftDirection,
    getInlineOffset,
    getShiftAmount,
    cloneMode,
  } = useHeaderDrag({
    headerScrollRef,
    allColumns: allVisibleColumns,
    enableColumnReorder,
    onReorderColumns,
    externalDroppedKeyRef: lastDroppedKeyRef,
    cloneMode: dragCloneMode,
    dragSwapThreshold,
  })

  // Determine if currently in inline drag mode
  const isInlineDragMode = cloneMode === 'inline' && dragState.isDragging

  // ==========================================================================
  // FILTER BAR POSITIONING
  // ==========================================================================

  // Calculate filter bar position - toggles between fixed (viewport bottom)
  // and absolute (below table) based on table height relative to viewport
  const filterBarPosition = useFilterBarPosition({
    tableContainerRef,
    bodyRef: bodyScrollRef,
    bottomOffset: 80,
  })

  // ==========================================================================
  // INTEGRATED TOOLBAR SETUP
  // ==========================================================================

  // Determine if toolbar should be integrated into sticky header
  const isToolbarIntegrated = toolbarLayout.position === 'integrated'

  // Header gap is always the base gap - toolbar space is handled inside the sticky wrapper
  const effectiveHeaderGap = TABLE_CONFIG.HEADER_GAP

  // Calculate gradient top offset when toolbar is integrated
  // The gradient should start where the table header begins (after the toolbar area)
  // Note: Count is not shown in sticky mode, so no need to account for it
  // Also add border offset (1px) to position gradient INSIDE the header's border
  const toolbarOffset = isToolbarIntegrated && showToolbar
    ? (toolbarLayout.integratedPadding?.top ?? 0) +
      (toolbarLayout.integratedToolbarHeight ?? TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT) +
      (toolbarLayout.integratedPadding?.bottom ?? 0)
    : 0
  const borderOffset = borderConfig.showOuter ? 1 : 0
  const gradientTopOffset = toolbarOffset + borderOffset

  // Build integrated toolbar content (only when position is 'integrated')
  const integratedToolbarContent = isToolbarIntegrated && showToolbar ? (
    <ToolbarContent
      isIntegrated={true}
      toolbarLayout={toolbarLayout}
      leftToolbar={leftToolbar}
      rightToolbar={rightToolbar}
      showCount={showCount}
      totalCount={totalCount}
      countLabel={countLabel}
      showExportButton={showExportButton}
      exportAll={exportAll}
      exportSelected={exportSelected}
      exportToolbar={exportToolbar}
      selectionState={selectionState}
      showColumnControl={showColumnControl}
      columnGroups={columnGroups}
      columnsWithSelection={columnsWithSelection}
      visibleColumnKeys={visibleColumnKeys}
      toggleColumn={toggleColumn}
      resetColumns={resetColumns}
      columnLabelsWithCheckbox={columnLabelsWithCheckbox}
    />
  ) : null

  // ==========================================================================
  // SKELETON MODE SETUP
  // ==========================================================================

  // Determine if skeleton mode is active:
  // - isLoading is true AND data is empty
  // - OR isColumnConfigHydrated is false (hydration skeleton)
  const isSkeletonMode = (isLoading && sortedData.length === 0) || !isColumnConfigHydrated

  // Get skeleton scope - 'rows-only' is recommended (keeps real toolbar/header)
  const skeletonScope = skeletonConfig?.scope ?? 'rows-only'

  // Compute effective skeleton settings with defaults
  const effectiveSkeletonConfig = useMemo(() => ({
    initialRowCount: skeletonConfig?.initialRowCount ?? DEFAULT_SKELETON_CONFIG.initialRowCount,
    infiniteScrollRowCount: skeletonConfig?.infiniteScrollRowCount ?? DEFAULT_SKELETON_CONFIG.infiniteScrollRowCount,
    headerCellConfig: {
      ...DEFAULT_SKELETON_CONFIG.headerCell,
      ...skeletonConfig?.headerCellConfig,
    },
    bodyCellConfig: {
      ...DEFAULT_SKELETON_CONFIG.bodyCell,
      ...skeletonConfig?.bodyCellConfig,
    },
    checkboxSize: skeletonConfig?.checkboxSize ?? DEFAULT_SKELETON_CONFIG.checkboxSize,
    simulateStickyState: skeletonConfig?.simulateStickyState ?? DEFAULT_SKELETON_CONFIG.simulateStickyState,
  }), [skeletonConfig])

  // Process columns for skeleton (needed for LoadMoreSkeleton)
  const skeletonProcessedColumns = useMemo(() => {
    if (!isSkeletonMode) return null

    const visibleKeys = createVisibleColumnKeys(columns, defaultVisibleColumns)

    return processColumns({
      columns,
      enableSelection,
      visibleColumnKeys: visibleKeys,
      simulateScrollable: effectiveSkeletonConfig.simulateStickyState === 'scrollable' ||
        (effectiveSkeletonConfig.simulateStickyState === 'auto' && columns.some(c => c.isSticky)),
      borderConfig: borderConfigOverrides,
      backgroundConfig: backgroundConfigOverrides,
    })
  }, [isSkeletonMode, columns, defaultVisibleColumns, enableSelection, effectiveSkeletonConfig.simulateStickyState, borderConfigOverrides, backgroundConfigOverrides])

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className={className} data-testid={testId}>
      {/* Toolbar Section - Only render when position is 'above' (default) */}
      {showToolbar && !isToolbarIntegrated && (
        <div style={{ marginBottom: toolbarLayout.toolbarBottomMargin }}>
          <ToolbarContent
            isIntegrated={false}
            toolbarLayout={toolbarLayout}
            leftToolbar={leftToolbar}
            rightToolbar={rightToolbar}
            showCount={showCount}
            totalCount={totalCount}
            countLabel={countLabel}
            showExportButton={showExportButton}
            exportAll={exportAll}
            exportSelected={exportSelected}
            exportToolbar={exportToolbar}
            selectionState={selectionState}
            showColumnControl={showColumnControl}
            columnGroups={columnGroups}
            columnsWithSelection={columnsWithSelection}
            visibleColumnKeys={visibleColumnKeys}
            toggleColumn={toggleColumn}
            resetColumns={resetColumns}
            columnLabelsWithCheckbox={columnLabelsWithCheckbox}
          />
        </div>
      )}

      {/* Table Container - Always render header, conditionally render body or empty state */}
      <div className="relative" ref={tableContainerRef}>
        <div className="relative">
          <div className="relative">
            {/* Full-height gradient overlay - show when there's data OR in skeleton mode */}
            {/* Border radius is reduced by border offset to match the inner curve of the table border */}
            {(sortedData.length > 0 || isSkeletonMode) && (
              <GradientOverlay
                visible={showScrollIndicator}
                position="full"
                borderRadius={borderRadius > borderOffset ? borderRadius - borderOffset : borderRadius}
                topOffset={gradientTopOffset}
              />
            )}

            {/* Sticky Header Section - Always visible */}
            {/* Hide arrows when in empty state (no data, not loading, not in skeleton mode) */}
            <StickyHeaderWrapper
              headerGap={effectiveHeaderGap}
              headerHeight={headerHeight}
              headerScrollRef={headerScrollRef}
              bodyScrollRef={bodyScrollRef}
              stickyColumns={stickyColumns}
              scrollableColumns={scrollableColumns}
              allColumns={allVisibleColumns}
              columnLabels={columnLabelsWithCheckbox}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              stickyState={stickyState}
              showScrollIndicator={showScrollIndicator}
              hideArrows={sortedData.length === 0 && !isLoading && !isSkeletonMode}
              onScrollLeft={handleScrollLeft}
              onScrollRight={handleScrollRight}
              borderRadius={borderRadius}
              borderConfig={borderConfig}
              backgroundConfig={backgroundConfig}
              gradientBackgroundColor={gradientBackgroundCssVar}
              columnChange={columnChange}
              leavingColumnKeys={leavingColumnKeys}
              leavingColumns={leavingColumns}
              enteringColumnKeys={enteringColumnKeys}
              totalStickyWidth={totalStickyWidth}
              arrowPreferredTopOffset={arrowPreferredTopOffset}
              selectionState={selectionState}
              // Integrated toolbar (experimental)
              integratedToolbar={integratedToolbarContent}
              integratedToolbarPadding={isToolbarIntegrated ? toolbarLayout.integratedPadding : undefined}
              integratedToolbarHeight={isToolbarIntegrated ? toolbarLayout.integratedToolbarHeight : undefined}
              // Column reordering
              enableColumnReorder={enableColumnReorder}
              onReorderColumns={onReorderColumns}
              isColumnConfigHydrated={isColumnConfigHydrated}
              lastDroppedKeyRef={lastDroppedKeyRef}
              dragCloneMode={dragCloneMode}
              // Drag state (lifted from useHeaderDrag for sharing with body)
              dragState={dragState}
              columnRectsRef={columnRectsRef}
              dragStartXRef={dragStartXRef}
              isColumnDraggable={isColumnDraggable}
              handlePointerDown={handlePointerDown}
              handlePointerMove={handlePointerMove}
              handlePointerUp={handlePointerUp}
              handlePointerCancel={handlePointerCancel}
              getShiftDirection={getShiftDirection}
              getInlineOffset={getInlineOffset}
              getShiftAmount={getShiftAmount}
              cloneMode={cloneMode}
              isInlineDragMode={isInlineDragMode}
            />

            {/* Body Content - Skeleton, Empty State, or Real Data */}
            {isSkeletonMode && skeletonScope === 'rows-only' && skeletonProcessedColumns ? (
              /* Skeleton Body - Shows skeleton rows while preserving real toolbar/header */
              <LoadMoreSkeleton
                columns={columns}
                rowCount={effectiveSkeletonConfig.initialRowCount}
                borderRadius={borderRadius}
                rowHeight={rowHeight}
                enableSelection={enableSelection}
                defaultVisibleColumns={defaultVisibleColumns}
                borderConfig={borderConfigOverrides}
                backgroundConfig={backgroundConfigOverrides}
                stickyState={stickyState}
                bodyCellConfig={effectiveSkeletonConfig.bodyCellConfig}
                asRowsOnly={false}
                skipHeaderOverlap={true}
              />
            ) : sortedData.length === 0 && !isLoading && (emptyState || noResultsState) ? (
              /* Empty State - Show when no data and not loading, replaces table body only */
              /* Show noResultsState when search is active OR filters are active, otherwise show emptyState */
              <div
                className="border-primary overflow-hidden border border-t-0 bg-primary"
                style={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }}
              >
                {(searchTerm || hasActiveFilters) && noResultsState ? noResultsState : emptyState}
              </div>
            ) : (
              /* Table Body - Show when there's data */
              <TableBody
                bodyScrollRef={bodyScrollRef}
                data={sortedData}
                stickyColumns={stickyColumns}
                scrollableColumns={scrollableColumns}
                allColumns={allVisibleColumns}
                stickyState={stickyState}
                borderConfig={borderConfig}
                backgroundConfig={backgroundConfig}
                borderRadius={borderRadius}
                rowHeight={rowHeight}
                renderCell={renderCell}
                onRowClick={onRowClick}
                columnChange={columnChange}
                leavingColumnKeys={leavingColumnKeys}
                leavingColumns={leavingColumns}
                enteringColumnKeys={enteringColumnKeys}
                selectionState={selectionState}
                getRowId={getRowId}
                loadingIndicator={effectiveLoadingIndicator}
                onEndReached={effectiveOnEndReached}
                onEndReachedThreshold={effectiveThreshold}
                lastDroppedKeyRef={lastDroppedKeyRef}
                // Drag state for inline column shifting (only pass in inline mode)
                getShiftDirection={isInlineDragMode ? getShiftDirection : undefined}
                getInlineOffset={isInlineDragMode ? getInlineOffset : undefined}
                getShiftAmount={isInlineDragMode ? getShiftAmount : undefined}
                isInlineDragMode={isInlineDragMode}
                draggedColumnKey={isInlineDragMode ? dragState.draggedKey : undefined}
              />
            )}
          </div>
        </div>

        {/* Filter Status Bar - positioned outside sticky wrapper for correct coordinate system */}
        {/* Uses fixed positioning when table is tall, absolute when table is short */}
        {filterStatusBar && filterBarPosition.isReady && (
          <div
            style={{
              ...filterBarPosition.style,
              pointerEvents: 'auto',
            }}
          >
            {filterStatusBar}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

// Types
export type {
  ColumnConfig,
  ColumnAlignment,
  BorderConfig,
  BackgroundConfig,
  StickyState,
  SortColumn,
  SortDirection,
  SelectionState,
  StickyDataTableProps,
  ComputedColumn,
  ColumnChange,
  InfiniteScrollConfig,
  DragCloneMode,
} from './types'

// Table configuration types (exported directly from source file)
export type {
  TableConfiguration,
  TableConfigurationOverrides,
  TableConfigurationProps,
  TableDimensionConfig,
  TableBorderConfig,
  TableBackgroundConfig,
  TableToolbarConfig,
  TableFeatureConfig,
  ToolbarPositionMode,
  CountPositionMode,
  CountStackPositionMode,
  IntegratedToolbarPadding,
  // Skeleton configuration types
  TableSkeletonConfig,
  SkeletonCellConfig,
  SkeletonWidthMode,
  SkeletonStickyStateMode,
  SkeletonScope,
  SkeletonConfigurationProps,
} from './types'

// Config
export {
  TABLE_CONFIG,
  ARROW_CONFIG,
  ANIMATION_CONFIG,
  CELL_CONFIG,
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
  DEFAULT_TOOLBAR_LAYOUT,
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  // Dimension configuration utilities
  calculateToolbarHeight,
  calculateSkeletonHeight,
  calculateIntegratedHeaderGap,
  createToolbarConfig,
  createToolbarLayoutConfig,
  createSkeletonDimensionConfig,
  inferToolbarConfigFromProps,
  type ToolbarConfig,
  type ToolbarLayoutConfig,
  type ToolbarPosition,
  type CountPosition,
  type CountDisplayConfig,
  type SkeletonDimensionConfig,
  // Unified table configuration
  DEFAULT_TABLE_CONFIGURATION,
  createTableConfiguration,
  tableConfigToProps,
  getDefaultTableProps,
  deepMerge,
} from './config'

// Hooks
export {
  useScrollSync,
  useColumns,
  useSort,
  useSelection,
  useWheelRedirect,
  useArrowPosition,
  useInfiniteScroll,
  useStickyDataTable,
  useColumnConfiguration,
  useTableConfiguration,
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollReturn,
  type UseStickyDataTableProps,
  type UseStickyDataTableReturn,
  type UseColumnConfigurationOptions,
  type ColumnConfigurationState,
  type ColumnConfigurationActions,
  type UseColumnConfigurationReturn,
  type UseTableConfigurationOptions,
  type UseTableConfigurationReturn,
} from './hooks'

// Utils
export {
  generateGridTemplate,
  calculateTotalStickyWidth,
  computeColumnOffsets,
  separateColumns,
  getAlignmentClasses,
  getCellPadding,
  getHeaderStickyBackground,
  getRowStickyBackground,
  getHeaderOuterBorders,
  getBodyOuterBorders,
  getRowBorder,
  getCellBorder,
  getStickyColumnBorder,
  getStickyLeft,
  getColumnAnimationClass,
  getCellStyle,
  // Column processor utilities (unified table/skeleton processing)
  processColumns,
  createVisibleColumnKeys,
  hasStickyColumns,
  countStickyColumns,
  getRightmostStickyColumn,
  type ColumnProcessorOptions,
  type ProcessedColumnsResult,
} from './utils'

// Components (for advanced customization)
export {
  TableCell,
  TableRow,
  TableHeader,
  TableBody,
  NavigationArrow,
  NavigationArrows,
  GradientOverlay,
  StickyHeaderWrapper,
  ColumnControlPanel,
  ExportToolbar,
  type ExportToolbarProps,
  TableEmptyState,
  type TableEmptyStateProps,
} from './components'

// Context
export {
  TableProvider,
  useTableContext,
  useScrollContext,
  useColumnsContext,
  useSelectionContext,
  useSortContext,
  useStylingContext,
} from './context/table-context'

// Page Background Context (for automatic background synchronization)
export {
  TablePageBackgroundProvider,
  useTablePageBackground,
  createPageBackgroundStyle,
  getBackgroundCssVar,
  PAGE_BACKGROUND_CONFIGS,
  type PageBackgroundToken,
  type TablePageBackgroundContextValue,
  type TablePageBackgroundProviderProps,
} from './context/page-background-context'

// Re-export filter system types
export type {
  FilterCategory,
  FilterConfig,
  FilterOption,
  FilterOperator,
  FilterState,
  FilterValue,
  ActiveFilter,
  DateRangePreset,
  RangePreset,
  SelectFilterConfig,
  DateFilterConfig,
  RangeFilterConfig,
  SearchFilterConfig,
  BooleanFilterConfig,
  FilterToolbarProps,
} from './types'

export { DEFAULT_DATE_PRESETS, createSelectFilter, createDateFilter, createRangeFilter } from './types'

// Filter system hook (re-exported from hooks)
export { useTableFilters, type UseTableFiltersProps, type UseTableFiltersReturn } from './hooks'

export { FilterToolbar, FilterDropdown } from './components/filter'

// CSV export hook (re-exported from hooks)
export { useExportCsvSticky, type CsvExportableData } from './hooks'

// Export skeleton loader components and helpers
export {
  TableSkeleton,
  LoadMoreSkeleton,
  createSkeletonConfigFromTableProps,
  type TableSkeletonProps,
  type LoadMoreSkeletonProps,
} from './components'

// Export filter status bar for floating filter information display
// Note: ActiveFilter already exported from types above
export { FilterStatusBar, type FilterStatusBarProps } from './components'

// Data adapters for automatic skeleton/loading state management
export {
  // Core loading state hook (for building custom adapters)
  useTableLoadingState,
  type TableLoadingStateOptions,
  type TableLoadingState,
  type TableLoadingActions,
  type UseTableLoadingStateReturn,
  // Apollo GraphQL adapter
  useTableWithGraphQL,
  type UseTableWithGraphQLOptions,
  type UseTableWithGraphQLReturn,
  // Generic async adapter (fetch, axios, etc.)
  useTableWithAsync,
  type UseTableWithAsyncOptions,
  type UseTableWithAsyncReturn,
} from './hooks'
