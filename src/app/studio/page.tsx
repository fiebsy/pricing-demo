/**
 * Delphi AI Studio - Audience Tab Dashboard
 *
 * Live dashboard showing everyone who has interacted with your Delphi.
 * Monitor engagement, apply filters, manage tags and access.
 *
 * Route: /studio
 */

'use client'

import React, { useState, useMemo, useCallback, useDeferredValue } from 'react'

import {
  StickyDataTable,
  TableEmptyState,
  useColumnConfiguration,
  type SelectionState,
} from '@/components/ui/prod/data/sticky-data-table'

// Studio module imports
import {
  HARDENED_DIMENSIONS,
  HARDENED_BORDER_CONFIG,
  HARDENED_BACKGROUND_CONFIG,
  HARDENED_TOOLBAR_CONFIG,
  HARDENED_FEATURES,
} from '@/modules/studio/config/hardened-preset'
import {
  PAGE_SIZE,
  AUDIENCE_COLUMNS,
  COLUMN_LABELS,
  COLUMN_TO_SORT_FIELD,
} from '@/modules/studio/config/column-config'
import { FILTER_DISPLAY_LABELS, applyFilters } from '@/modules/studio/config/filter-config'
import { useMockAudience } from '@/modules/studio/hooks/use-mock-audience'
import { MetricTileBar } from '@/modules/studio/components/metric-tile-bar'
import { LeftToolbarContent, RightToolbarContent } from '@/modules/studio/components/toolbar'
import { renderCell } from '@/modules/studio/components/cell-renderer'
import { ThemeToggle } from '@/components/ui/deprecated/theme-toggle'

import type {
  AudienceMetricId,
  ActiveFilter,
  AudienceFilterId,
  AudienceSortField,
  AudienceSortOrder,
} from '@/modules/studio/types'

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function StudioPage() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchExpanded, setSearchExpanded] = useState(false)

  // Filter state - default to active users filter
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    {
      id: 'status-active',
      label: FILTER_DISPLAY_LABELS['status-active'].label,
      value: FILTER_DISPLAY_LABELS['status-active'].value,
      category: FILTER_DISPLAY_LABELS['status-active'].category,
    },
  ])

  // Active metric for highlighting tiles - default to totalActive
  const [activeMetric, setActiveMetric] = useState<AudienceMetricId | null>('totalActive')

  // Server-side sort state
  const [sortBy, setSortBy] = useState<AudienceSortField>('LAST_INTERACTED')
  const [sortOrder, setSortOrder] = useState<AudienceSortOrder>('DESC')
  const [sortColumnKey, setSortColumnKey] = useState<string | null>('lastInteracted')

  // Column configuration (no drag-to-reorder for this dashboard)
  const {
    columns: orderedColumns,
    reorderColumns,
    isHydrated: isColumnConfigHydrated,
  } = useColumnConfiguration({
    columns: AUDIENCE_COLUMNS,
    // storageKey disabled to test fresh config
  })

  // Fetch data using mock pagination hook
  const {
    items,
    isLoading,
    isLoadingMore,
    totalCount,
    hasNextPage,
    loadMore,
    metrics,
  } = useMockAudience({
    pageSize: PAGE_SIZE,
    sortBy,
    sortOrder,
    searchQuery: searchQuery || undefined,
    delay: 300,
  })

  // Deferred filters for table - allows chips to animate immediately while table catches up
  const deferredActiveFilters = useDeferredValue(activeFilters)

  // Apply client-side filters using DEFERRED value
  const filteredItems = useMemo(() => {
    return applyFilters(items, deferredActiveFilters)
  }, [items, deferredActiveFilters])

  // Metric click handler - apply filters based on metric
  const handleMetricClick = useCallback((metricId: AudienceMetricId) => {
    // Toggle metric selection
    if (activeMetric === metricId) {
      setActiveMetric(null)
      // Don't clear filters - just deselect the metric tile
      return
    }

    setActiveMetric(metricId)

    // Apply specific filters based on metric
    switch (metricId) {
      case 'totalActive':
        // Filter to show only active users
        setActiveFilters([
          {
            id: 'status-active',
            label: FILTER_DISPLAY_LABELS['status-active'].label,
            value: FILTER_DISPLAY_LABELS['status-active'].value,
            category: FILTER_DISPLAY_LABELS['status-active'].category,
          },
        ])
        break
      case 'totalMessages':
        // No specific filter - show all (clear any message filters)
        setActiveFilters((prev) =>
          prev.filter((f) => !f.id.startsWith('messages-'))
        )
        break
      case 'avgMessages':
        // No specific filter
        break
      case 'mostEngaged':
        // Filter to show users with 51+ messages
        setActiveFilters([
          {
            id: 'messages-51+',
            label: FILTER_DISPLAY_LABELS['messages-51+'].label,
            value: FILTER_DISPLAY_LABELS['messages-51+'].value,
            category: FILTER_DISPLAY_LABELS['messages-51+'].category,
          },
        ])
        break
    }
  }, [activeMetric])

  // Filter handlers
  const handleFilterSelect = useCallback((filterId: string) => {
    const id = filterId as AudienceFilterId
    const displayInfo = FILTER_DISPLAY_LABELS[id]
    if (!displayInfo) return

    setActiveFilters((prev) => {
      // Check if already active - toggle off
      if (prev.some((f) => f.id === id)) {
        return prev.filter((f) => f.id !== id)
      }

      // Replace any existing filter from the same category (only one filter per category allowed)
      const withoutSameCategory = prev.filter((f) => f.category !== displayInfo.category)

      return [
        ...withoutSameCategory,
        {
          id,
          label: displayInfo.label,
          value: displayInfo.value,
          category: displayInfo.category,
        },
      ]
    })
    // Clear metric selection when manually filtering
    setActiveMetric(null)
  }, [])

  const handleFilterRemove = useCallback((filterId: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId))
    setActiveMetric(null)
  }, [])

  const handleFilterChange = useCallback((oldFilterId: string, newFilterId: string) => {
    const id = newFilterId as AudienceFilterId
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
    setActiveMetric(null)
  }, [])

  const handleFiltersClear = useCallback(() => {
    setActiveFilters([])
    setActiveMetric(null)
  }, [])

  // Clear ALL filters, search, and metric filter
  const handleClearAll = useCallback(() => {
    setActiveFilters([])
    setSearchQuery('')
    setActiveMetric(null)
  }, [])

  // Determine if any filters/search are active
  const hasAnyFilters = activeFilters.length > 0 || !!searchQuery

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

  // Row click handler (would open profile drawer in real app)
  const handleRowClick = useCallback((row: typeof items[0]) => {
    console.log('Row clicked:', row.name, row.email)
    // In real app: open profile sheet/drawer
  }, [])

  // Export handlers
  const handleExportAll = useCallback(async () => {
    console.log('Export all:', filteredItems.length, 'users')
  }, [filteredItems.length])

  const handleExportSelected = useCallback(async (selectionState: SelectionState) => {
    console.log('Export selected:', selectionState?.selectedIds.size ?? 0, 'users')
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1000px] px-6 pt-16">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-primary text-xl font-semibold lg:text-2xl">Audience</h1>
        <p className="text-tertiary mt-1 text-sm">
          Everyone who has interacted with your Delphi
        </p>
      </div>

      {/* Metric Tiles - Engagement Overview */}
      <MetricTileBar
        activeMetric={activeMetric}
        onMetricClick={handleMetricClick}
        metrics={metrics}
        className="mb-8"
      />

      {/* Audience Table - Hardened Configuration */}
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
        countLabel="users"
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
            title="No users yet"
            description="Users will appear here once they interact with your Delphi."
          />
        }
        noResultsState={
          <TableEmptyState
            variant="no-results"
            searchTerm={searchQuery || undefined}
            description={
              searchQuery
                ? undefined // Uses default "No results found for X" when searchTerm is set
                : activeFilters.length > 0
                  ? `No users match your current filters. Try adjusting or clearing them.`
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

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}
