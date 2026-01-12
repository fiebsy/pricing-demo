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

'use client'

import React, { useState, useMemo, useCallback } from 'react'

import {
  StickyDataTable,
  TableEmptyState,
  useColumnConfiguration,
  type SelectionState,
} from '@/components/ui/prod/data/sticky-data-table'

// Collections module imports
import {
  HARDENED_DIMENSIONS,
  HARDENED_BORDER_CONFIG,
  HARDENED_BACKGROUND_CONFIG,
  HARDENED_TOOLBAR_CONFIG,
  HARDENED_FEATURES,
} from '@/modules/collections/config/hardened-preset'
import {
  PAGE_SIZE,
  HARDENED_COLUMNS,
  COLUMN_LABELS,
  COLUMN_TO_SORT_FIELD,
} from '@/modules/collections/config/column-config'
import { FILTER_DISPLAY_LABELS, applyFilters } from '@/modules/collections/config/filter-config'
import { useMockPagination } from '@/modules/collections/hooks/use-mock-pagination'
import { MetricTileBar } from '@/modules/collections/components/metric-tile-bar'
import { LeftToolbarContent, RightToolbarContent } from '@/modules/collections/components/toolbar'
import { renderCell } from '@/modules/collections/components/cell-renderer'

import type {
  MetricFilterId,
  ActiveFilter,
  FilterId,
  PartnerRiskSortField,
  PartnerRiskSortOrder,
} from '@/modules/collections/types'

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DashboardPage() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchExpanded, setSearchExpanded] = useState(false)

  // Filter state - default to "At Risk" (Collections + Last Chance)
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    {
      id: 'status-collections',
      label: FILTER_DISPLAY_LABELS['status-collections'].label,
      value: FILTER_DISPLAY_LABELS['status-collections'].value,
      category: FILTER_DISPLAY_LABELS['status-collections'].category,
    },
    {
      id: 'status-clawback',
      label: FILTER_DISPLAY_LABELS['status-clawback'].label,
      value: FILTER_DISPLAY_LABELS['status-clawback'].value,
      category: FILTER_DISPLAY_LABELS['status-clawback'].category,
    },
  ])

  // Derive activeMetric from activeFilters for metric tile highlighting
  const activeMetric = useMemo((): MetricFilterId | null => {
    const hasCollections = activeFilters.some((f) => f.id === 'status-collections')
    const hasClawback = activeFilters.some((f) => f.id === 'status-clawback')
    const hasSettled = activeFilters.some((f) => f.id === 'status-settled')
    const hasDefaulted = activeFilters.some((f) => f.id === 'outcome-defaulted')

    // Only one filter type active = specific metric
    if (hasDefaulted && !hasCollections && !hasClawback && !hasSettled) return 'defaulted'
    if (hasSettled && !hasCollections && !hasClawback && !hasDefaulted) return 'settled'
    if (hasClawback && !hasCollections && !hasSettled && !hasDefaulted) return 'clawback'
    // Both collections and clawback = "At Risk"
    if (hasCollections && hasClawback && !hasSettled && !hasDefaulted) return 'atRisk'

    return null
  }, [activeFilters])

  // Server-side sort state
  const [sortBy, setSortBy] = useState<PartnerRiskSortField>('STATUS_CHANGED_AT')
  const [sortOrder, setSortOrder] = useState<PartnerRiskSortOrder>('DESC')
  const [sortColumnKey, setSortColumnKey] = useState<string | null>('statusContext')

  // Column configuration for drag-to-reorder
  const {
    columns: orderedColumns,
    reorderColumns,
    isHydrated: isColumnConfigHydrated,
  } = useColumnConfiguration({
    columns: HARDENED_COLUMNS,
    storageKey: 'collections-dashboard-columns',
  })

  // Fetch data using mock pagination hook (simulates API)
  const {
    items,
    isLoading,
    isLoadingMore,
    totalCount,
    hasNextPage,
    loadMore,
    metrics,
  } = useMockPagination({
    pageSize: PAGE_SIZE,
    sortBy,
    sortOrder,
    searchQuery: searchQuery || undefined,
    delay: 300,
  })

  // Apply client-side filters
  const filteredItems = useMemo(() => {
    return applyFilters(items, activeFilters)
  }, [items, activeFilters])

  // Metric click handler - toggle status filters on/off
  const handleMetricClick = useCallback((metricId: MetricFilterId) => {
    // Determine which filters correspond to this metric
    const metricToFilters: Record<MetricFilterId, FilterId[]> = {
      atRisk: ['status-collections', 'status-clawback'],
      clawback: ['status-clawback'],
      settled: ['status-settled'],
      defaulted: ['outcome-defaulted'],
    }

    const filterIds = metricToFilters[metricId]

    setActiveFilters((prev) => {
      // Check if this metric is currently active (toggle off if so)
      const isCurrentlyActive =
        metricId === 'atRisk'
          ? prev.some((f) => f.id === 'status-collections') && prev.some((f) => f.id === 'status-clawback')
          : metricId === 'clawback'
            ? prev.some((f) => f.id === 'status-clawback') && !prev.some((f) => f.id === 'status-collections')
            : metricId === 'settled'
              ? prev.some((f) => f.id === 'status-settled')
              : prev.some((f) => f.id === 'outcome-defaulted')

      if (isCurrentlyActive) {
        // Remove all status filters for this metric
        return prev.filter((f) => !filterIds.includes(f.id))
      } else {
        // Remove any existing status/outcome filters first, then add new ones
        const withoutStatusFilters = prev.filter(
          (f) => !['status-collections', 'status-clawback', 'status-settled', 'outcome-defaulted'].includes(f.id)
        )
        // Add the filters for this metric
        const newFilters = filterIds.map((id) => ({
          id,
          label: FILTER_DISPLAY_LABELS[id].label,
          value: FILTER_DISPLAY_LABELS[id].value,
          category: FILTER_DISPLAY_LABELS[id].category,
        }))
        return [...withoutStatusFilters, ...newFilters]
      }
    })
  }, [])

  // Filter handlers
  const handleFilterSelect = useCallback((filterId: string) => {
    const id = filterId as FilterId
    const displayInfo = FILTER_DISPLAY_LABELS[id]
    if (!displayInfo) return

    setActiveFilters((prev) => {
      // Check if already active
      if (prev.some((f) => f.id === id)) {
        // Remove it
        return prev.filter((f) => f.id !== id)
      } else {
        // Add it
        return [
          ...prev,
          {
            id,
            label: displayInfo.label,
            value: displayInfo.value,
            category: displayInfo.category,
          },
        ]
      }
    })
  }, [])

  const handleFilterRemove = useCallback((filterId: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId))
  }, [])

  const handleFilterChange = useCallback((oldFilterId: string, newFilterId: string) => {
    const id = newFilterId as FilterId
    const displayInfo = FILTER_DISPLAY_LABELS[id]
    if (!displayInfo) return

    setActiveFilters((prev) =>
      prev.map((f) =>
        f.id === oldFilterId
          ? {
              id,
              label: displayInfo.label,
              value: displayInfo.value,
              category: displayInfo.category,
            }
          : f
      )
    )
  }, [])

  const handleFiltersClear = useCallback(() => {
    setActiveFilters([])
  }, [])

  // Clear ALL filters, search, and metric filter - used by empty state "Clear filters" button
  const handleClearAll = useCallback(() => {
    setActiveFilters([])
    setSearchQuery('')
  }, [])

  // Determine if any filters/search are active (for empty state button visibility)
  const hasAnyFilters = activeFilters.length > 0 || !!searchQuery || activeMetric !== null

  // Handle server-side sort
  const handleServerSort = useCallback((columnKey: string, direction: 'asc' | 'desc') => {
    const backendSortField = COLUMN_TO_SORT_FIELD[columnKey]

    if (!backendSortField) {
      // Column not sortable on server
      return
    }

    setSortColumnKey(columnKey)
    setSortBy(backendSortField)
    setSortOrder(direction === 'asc' ? 'ASC' : 'DESC')
  }, [])

  // Row click handler (no-op for demo, would open sheet in real app)
  const handleRowClick = useCallback((row: typeof items[0]) => {
    console.log('Row clicked:', row.contractId)
    // In real app: setSelectedContractId(row.contractId); setSheetOpen(true)
  }, [])

  // Export handlers (simplified for demo)
  const handleExportAll = useCallback(async () => {
    console.log('Export all:', filteredItems.length, 'rows')
    // In real app: generate CSV and download
  }, [filteredItems.length])

  const handleExportSelected = useCallback(async (selectionState: SelectionState) => {
    console.log('Export selected:', selectionState?.selectedIds.size ?? 0, 'rows')
    // In real app: generate CSV from selected rows and download
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-16">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-primary text-xl font-semibold lg:text-2xl">Risk</h1>
        <p className="text-tertiary mt-1 text-sm">Collections and clawback activity</p>
      </div>

      {/* Metric Tiles - Risk Activity Overview */}
      <MetricTileBar
        activeMetric={activeMetric}
        onMetricClick={handleMetricClick}
        metrics={metrics}
        className="mb-8"
      />

      {/* Risk Activity Table - Hardened Configuration */}
      <StickyDataTable
        data={isLoading ? [] : filteredItems}
        columns={orderedColumns}
        columnLabels={COLUMN_LABELS}
        renderCell={renderCell}
        onRowClick={handleRowClick}
        // Hardened dimensions
        borderRadius={HARDENED_DIMENSIONS.borderRadius}
        headerHeight={HARDENED_DIMENSIONS.headerHeight}
        rowHeight={HARDENED_DIMENSIONS.rowHeight}
        // Hardened styling
        borderConfig={HARDENED_BORDER_CONFIG}
        backgroundConfig={HARDENED_BACKGROUND_CONFIG}
        toolbarLayout={HARDENED_TOOLBAR_CONFIG}
        className="relative"
        // Features - hardened
        enableSelection={HARDENED_FEATURES.enableSelection}
        showColumnControl={HARDENED_FEATURES.showColumnControl}
        enableColumnReorder={HARDENED_FEATURES.enableColumnReorder}
        onReorderColumns={reorderColumns}
        isColumnConfigHydrated={isColumnConfigHydrated}
        getRowId={(row) => String(row.id)}
        // Left toolbar - Filter menu
        leftToolbar={
          <LeftToolbarContent
            activeFilters={activeFilters}
            onFilterSelect={handleFilterSelect}
            onFilterChange={handleFilterChange}
            onFilterRemove={handleFilterRemove}
            onFiltersClear={handleFiltersClear}
          />
        }
        // Right toolbar - Expanding search
        rightToolbar={
          <RightToolbarContent
            value={searchQuery}
            onChange={setSearchQuery}
            expanded={searchExpanded}
            onExpandedChange={setSearchExpanded}
          />
        }
        // Count display
        showCount={HARDENED_FEATURES.showCount}
        totalCount={filteredItems.length}
        countLabel="contracts"
        // Server-side sorting
        serverSideSort={true}
        onServerSort={handleServerSort}
        serverSortColumn={sortColumnKey}
        serverSortDirection={sortOrder === 'ASC' ? 'asc' : 'desc'}
        // Export
        exportAll={handleExportAll}
        exportSelected={handleExportSelected}
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
        searchTerm={searchQuery || undefined}
        hasActiveFilters={hasAnyFilters}
        emptyState={
          <TableEmptyState
            variant="empty"
            title="No risk activity"
            description="This partner doesn't have any contracts in collections or clawback status."
          />
        }
        noResultsState={
          <TableEmptyState
            variant="no-results"
            searchTerm={searchQuery || undefined}
            description={
              searchQuery
                ? undefined // Uses default "No results found for X" when searchTerm is set
                : activeFilters.length > 0 || activeMetric
                  ? `No contracts match your current filters. Try adjusting or clearing them.`
                  : undefined
            }
            secondaryAction={
              hasAnyFilters
                ? { label: 'Clear filters', onClick: handleClearAll }
                : undefined
            }
          />
        }
      />
    </div>
  )
}
