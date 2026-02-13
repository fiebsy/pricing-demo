/**
 * Orders Page
 *
 * Business orders management page with:
 * - Header metrics (summary cards)
 * - Filter toolbar (StackingNav + search)
 * - Data table with sortable, reorderable columns
 *
 * Route: /orders
 */

'use client'

import { useState, useMemo, useCallback, useEffect, useRef, type ReactNode } from 'react'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import type { ActivePath } from '@/components/ui/features/stacking-nav'
import type { SortDirection, ColumnConfig } from '@/components/ui/patterns/data-table'

// Types
import type { OrdersPageConfig, PresetId, PageBackground, ColumnVisibility, SummaryCardData, TableBorderConfig } from './types'
import { DEFAULT_COLUMN_ORDER } from './types'

// Config
import { PRESET_DEFAULT, PRESETS } from './config/presets'
import { createPanelConfig } from './panels/create-panel-config'

// Sections
import { OrdersSummaryCard } from './sections/header-metrics'
import { StackingNavWrapper, SearchWrapper, filterData } from './sections/filter-toolbar'
import { OrdersTable, ORDER_COLUMNS, COLUMN_LABELS, createRenderCell } from './sections/table'

// Data
import { ORDER_DATA, calculateMetrics } from './data'

// =============================================================================
// COLUMN REORDER HELPER
// =============================================================================

function reorderColumns(
  columns: ColumnConfig[],
  order: string[]
): ColumnConfig[] {
  const map = new Map(columns.map((c) => [c.key, c]))
  return order.map((key) => map.get(key)).filter(Boolean) as ColumnConfig[]
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function OrdersPage() {
  const [config, setConfig] = useState<OrdersPageConfig>(PRESET_DEFAULT)

  // Table state
  const [currentPath, setCurrentPath] = useState<ActivePath>([])
  const [columnOrder, setColumnOrder] = useState<string[]>([...DEFAULT_COLUMN_ORDER])
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [resetKey, setResetKey] = useState(0)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const heightLockRef = useRef(false)

  // Filtered data based on nav path and search
  const filteredData = useMemo((): Record<string, unknown>[] => {
    let data = filterData(ORDER_DATA, currentPath, searchQuery)

    // Sort the data
    if (sortColumn) {
      data = [...data].sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1
        const aVal = a[sortColumn as keyof typeof a]
        const bVal = b[sortColumn as keyof typeof b]

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * modifier
        }

        return String(aVal ?? '').localeCompare(String(bVal ?? '')) * modifier
      })
    } else {
      // Default sort by customer name
      data = [...data].sort((a, b) => String(a.customer).localeCompare(String(b.customer)))
    }

    return data as unknown as Record<string, unknown>[]
  }, [currentPath, searchQuery, sortColumn, sortDirection])

  // Calculate metrics from all data
  const metrics = useMemo(() => calculateMetrics(ORDER_DATA), [])

  // Summary cards data
  const summaryCards: SummaryCardData[] = useMemo(() => [
    {
      value: String(metrics.totalOrders),
      subtext1: 'Total Orders',
      subtext2: 'All time',
    },
    {
      value: String(metrics.activeOrders),
      subtext1: 'Active Orders',
      subtext2: 'In progress',
    },
    {
      value: String(metrics.closedOrders),
      subtext1: 'Closed Orders',
      subtext2: 'Completed',
    },
    {
      value: String(metrics.atRiskOrders),
      subtext1: 'At Risk',
      subtext2: 'Needs attention',
    },
  ], [metrics])

  // Cell renderer
  type CellRenderer = (columnKey: string, row: Record<string, unknown>, index: number) => ReactNode
  const cellRenderer = useMemo<CellRenderer>(() => createRenderCell() as CellRenderer, [])

  // Filter columns by visibility, then reorder by columnOrder state
  const visibleColumns = useMemo(() => {
    const visibleCols = ORDER_COLUMNS.filter(col => {
      const key = col.key as keyof ColumnVisibility
      return config.columnVisibility[key]
    })
    return reorderColumns(visibleCols, columnOrder)
  }, [config.columnVisibility, columnOrder])

  // Simulate initial loading state
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [])

  // Height lock release after filtering
  useEffect(() => {
    const wrapper = contentWrapperRef.current
    if (!heightLockRef.current || !wrapper) return
    heightLockRef.current = false

    requestAnimationFrame(() => {
      const locked = parseFloat(wrapper.style.minHeight) || 0
      wrapper.style.minHeight = ''
      const natural = wrapper.offsetHeight

      if (natural >= locked) return

      wrapper.style.minHeight = `${locked}px`
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      wrapper.offsetHeight
      wrapper.style.transition = 'min-height 250ms ease-out'
      wrapper.style.minHeight = `${natural}px`

      const cleanup = () => {
        wrapper.style.transition = ''
        wrapper.style.minHeight = ''
      }
      wrapper.addEventListener('transitionend', cleanup, { once: true })
      setTimeout(cleanup, 300)
    })
  }, [filteredData])

  // Panel config
  const panelConfig = useMemo(() => createPanelConfig(config), [config])

  // Handlers
  const handleSelectionChange = useCallback((path: ActivePath) => {
    const wrapper = contentWrapperRef.current
    if (wrapper) {
      wrapper.style.transition = ''
      wrapper.style.minHeight = `${wrapper.offsetHeight}px`
      heightLockRef.current = true
    }
    setCurrentPath(path)
  }, [])

  const handleServerSort = useCallback((column: string, direction: SortDirection) => {
    setSortColumn(column)
    setSortDirection(direction)
  }, [])

  const handleTableReset = useCallback(() => {
    setResetKey((k) => k + 1)
    setCurrentPath([])
    setColumnOrder([...DEFAULT_COLUMN_ORDER])
    setSearchQuery('')
    setSearchExpanded(false)
    setSortColumn(null)
    setSortDirection('desc')
  }, [])

  const handleReorderColumns = useCallback((fromKey: string, toKey: string) => {
    setColumnOrder((prev) => {
      const next = [...prev]
      const fromIdx = next.indexOf(fromKey)
      const toIdx = next.indexOf(toKey)
      if (fromIdx === -1 || toIdx === -1) return prev
      next.splice(fromIdx, 1)
      next.splice(toIdx, 0, fromKey)
      return next
    })
  }, [])

  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event

    // Handle preset selection
    if (controlId === 'preset' && value !== 'custom') {
      const preset = PRESETS[value as PresetId]
      if (preset) {
        setConfig(preset)
        return
      }
    }

    // Handle nested column visibility controls
    if (controlId.startsWith('columnVisibility.')) {
      const columnKey = controlId.replace('columnVisibility.', '') as keyof ColumnVisibility
      setConfig((prev) => ({
        ...prev,
        columnVisibility: {
          ...prev.columnVisibility,
          [columnKey]: value,
        },
      }))
      return
    }

    // Handle nested table border controls
    if (controlId.startsWith('tableBorder.')) {
      const borderKey = controlId.replace('tableBorder.', '') as keyof TableBorderConfig
      setConfig((prev) => ({
        ...prev,
        tableBorder: {
          ...prev.tableBorder,
          [borderKey]: value,
        },
      }))
      return
    }

    setConfig((prev) => ({ ...prev, [controlId]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setConfig(PRESET_DEFAULT)
    setColumnOrder([...DEFAULT_COLUMN_ORDER])
  }, [])

  const getConfigForCopy = useCallback(() => {
    return { config, columnOrder }
  }, [config, columnOrder])

  // Background class mapping
  const bgClasses: Record<PageBackground, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    secondary_alt: 'bg-secondary-alt',
    tertiary: 'bg-tertiary',
  }

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Main Content */}
      <div className="min-h-screen">
        <div className="mx-auto px-6" style={{ maxWidth: 960, paddingTop: config.layoutTopGap, paddingBottom: 48 }}>
          {/* Header Metrics Row */}
          <div className="flex items-stretch gap-4" style={{ marginBottom: config.metricsToTableGap }}>
            {summaryCards.map((card, index) => (
              <OrdersSummaryCard
                key={index}
                data={card}
                config={config}
              />
            ))}
          </div>

          {/* Table with Filter Toolbar */}
          <div ref={contentWrapperRef}>
            <OrdersTable
              data={filteredData}
              columns={visibleColumns}
              columnLabels={COLUMN_LABELS}
              renderCell={cellRenderer}
              isLoading={isLoading}
              enableColumnReorder={config.enableColumnReorder}
              searchQuery={searchQuery}
              hasActiveFilters={currentPath.length > 0 || searchQuery.length > 0}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              borderConfig={config.tableBorder}
              leftToolbar={
                <StackingNavWrapper
                  resetKey={resetKey}
                  onSelectionChange={handleSelectionChange}
                  onReset={handleTableReset}
                />
              }
              rightToolbar={
                <SearchWrapper
                  searchQuery={searchQuery}
                  searchExpanded={searchExpanded}
                  onSearchChange={setSearchQuery}
                  onSearchExpandedChange={setSearchExpanded}
                />
              }
              onReorderColumns={handleReorderColumns}
              onServerSort={handleServerSort}
              onReset={handleTableReset}
            />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
