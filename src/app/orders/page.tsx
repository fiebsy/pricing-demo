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
import type { OrdersPageConfig, PresetId, PageBackground, ColumnVisibility, SummaryCardData, TableBorderConfig, ChartConfig, FilterConfig, AutoRouteStateConfig, StatusBadgeConfig } from './types'
import { DEFAULT_COLUMN_ORDER } from './types'

// Config
import { PRESET_DEFAULT, PRESETS } from './config/presets'
import { createPanelConfig } from './panels/create-panel-config'

// Sections
import { OrdersSummaryCard } from './sections/header-metrics'
import { StackingNavWrapper, SearchWrapper, filterData } from './sections/filter-toolbar'
import { OrdersTable, ORDER_COLUMNS, COLUMN_LABELS, createRenderCell } from './sections/table'
import { OrdersChart } from './sections/chart'
import { UnifiedOrdersChart } from './sections/chart/UnifiedOrdersChart'
import { generateChartData, generateFutureData, generateUnifiedChartData } from './sections/chart/data/chart-data'

// Hooks
import { useCalculatedFutureDays } from './hooks/use-calculated-future-days'

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
      value: String(metrics.activeOrders),
      subtext1: 'Active',
      subtext2: 'In progress',
    },
    {
      value: String(metrics.atRiskOrders),
      subtext1: 'At risk',
      subtext2: 'Needs attention',
    },
    {
      value: String(metrics.closedOrders),
      subtext1: 'Closed',
      subtext2: 'Completed',
    },
  ], [metrics])

  // Calculate future days dynamically based on viewport
  const calculatedFutureDays = useCalculatedFutureDays(30)

  // Chart data for future projection mode
  const chartData = useMemo(() => generateChartData(ORDER_DATA), [])

  // Use calculated future days for auto mode, or config value if manually overridden
  const effectiveFutureDays = config.chart.showFutureProjection
    ? calculatedFutureDays
    : config.chart.futureDays

  const futureData = useMemo(
    () => generateFutureData(chartData, effectiveFutureDays),
    [chartData, effectiveFutureDays]
  )

  // Generate unified data for single-chart approach
  const unifiedChartData = useMemo(
    () => generateUnifiedChartData(chartData, futureData),
    [chartData, futureData]
  )

  // Calculate shared Y-axis domain for unified chart
  const sharedYDomain = useMemo((): [number, number] | undefined => {
    if (!config.chart.showFutureProjection || futureData.length === 0) {
      return undefined
    }
    const historicalMax = Math.max(...chartData.map(d => d.active))
    const futureMax = Math.max(...futureData.map(d => d.projected))
    const max = Math.max(historicalMax, futureMax)
    return [0, Math.ceil(max * 1.1)] // 10% padding
  }, [config.chart.showFutureProjection, chartData, futureData])

  // Cell renderer
  type CellRenderer = (columnKey: string, row: Record<string, unknown>, index: number) => ReactNode
  const cellRenderer = useMemo<CellRenderer>(
    () => createRenderCell({
      autoRouteBadge: config.autoRouteBadge,
      statusBadge: config.statusBadge,
    }) as CellRenderer,
    [config.autoRouteBadge, config.statusBadge]
  )

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

    // Handle nested chart controls
    if (controlId.startsWith('chart.')) {
      const chartKey = controlId.replace('chart.', '') as keyof ChartConfig
      setConfig((prev) => ({
        ...prev,
        chart: {
          ...prev.chart,
          [chartKey]: value,
        },
      }))
      return
    }

    // Handle nested filter controls
    if (controlId.startsWith('filter.')) {
      const filterKey = controlId.replace('filter.', '') as keyof FilterConfig
      setConfig((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          [filterKey]: value,
        },
      }))
      return
    }

    // Handle nested autoRouteBadge controls (autoRouteBadge.on.* or autoRouteBadge.off.*)
    if (controlId.startsWith('autoRouteBadge.')) {
      const parts = controlId.replace('autoRouteBadge.', '').split('.')
      if (parts.length === 2) {
        const [state, key] = parts as ['on' | 'off', keyof AutoRouteStateConfig]
        setConfig((prev) => ({
          ...prev,
          autoRouteBadge: {
            ...prev.autoRouteBadge,
            [state]: {
              ...prev.autoRouteBadge[state],
              [key]: value,
            },
          },
        }))
        return
      }
    }

    // Handle nested statusBadge controls
    if (controlId.startsWith('statusBadge.')) {
      const badgeKey = controlId.replace('statusBadge.', '') as keyof StatusBadgeConfig
      setConfig((prev) => ({
        ...prev,
        statusBadge: {
          ...prev.statusBadge,
          [badgeKey]: value,
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

  // Chart width styles for breakout modes
  const getChartBreakoutStyle = (): React.CSSProperties => {
    const containerMaxWidth = 960
    const containerPadding = 24 // px-6 = 24px
    const effectiveContainerWidth = containerMaxWidth - (containerPadding * 2) // 912px
    const halfContainer = effectiveContainerWidth / 2 // 456px

    switch (config.chart.chartWidthMode) {
      case 'viewport':
        return {
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }

      // Left edge at viewport, right edge at viewport center
      case 'left-to-center':
        return {
          width: 'min(50vw, 100vw)',
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }

      // Left edge at viewport, right edge at container right (aligns with table)
      case 'left-to-container':
        return {
          width: `min(calc(50vw + ${halfContainer}px), 100vw)`,
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }

      case 'custom': {
        const customWidth = config.chart.chartCustomWidth
        const alignment = config.chart.chartAlignment
        const responsiveWidth = `min(${customWidth}px, 100vw)`

        if (alignment === 'right') {
          if (customWidth <= effectiveContainerWidth) {
            return {
              width: customWidth,
              maxWidth: '100%',
              marginLeft: 'auto',
            }
          }
          return {
            width: responsiveWidth,
            maxWidth: '100vw',
            marginLeft: 'auto',
            marginRight: `calc(-50vw + 50% + ${containerPadding}px)`,
          }
        }

        // Center-aligned (default)
        if (customWidth <= effectiveContainerWidth) {
          return {
            width: customWidth,
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }
        }
        return {
          width: responsiveWidth,
          maxWidth: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }
      }

      case 'container':
      default:
        return {}
    }
  }

  return (
    <div className={`min-h-screen ${bgClasses[config.pageBackground]}`}>
      {/* Main Content */}
      <div className="min-h-screen">
        <div className="mx-auto px-6" style={{ maxWidth: 960, paddingTop: config.layoutTopGap, paddingBottom: 48 }}>
          {/* Top Filter Bar - Above Metrics */}
          {config.filter.showTopFilter && (
            <div className="mb-6">
              <StackingNavWrapper
                resetKey={resetKey}
                onSelectionChange={handleSelectionChange}
                onReset={handleTableReset}
              />
            </div>
          )}

          {/* Header Metrics Row */}
          <div className="flex items-stretch gap-4" style={{ marginBottom: config.chart.showChart ? config.metricsToTableGap : config.metricsToTableGap }}>
            {summaryCards.map((card, index) => (
              <OrdersSummaryCard
                key={index}
                data={card}
                config={config}
              />
            ))}
          </div>

          {/* Orders Chart - Standard Mode (no future projection) */}
          {config.chart.showChart && !config.chart.showFutureProjection && (
            <>
              {/* Container Width */}
              {config.chart.chartWidthMode === 'container' && (
                <div style={{ marginBottom: config.chart.chartToTableGap }}>
                  <OrdersChart data={ORDER_DATA} config={config.chart} />
                </div>
              )}

              {/* Breakout (Viewport or Custom Width) */}
              {config.chart.chartWidthMode !== 'container' && (
                <div style={{ marginBottom: config.chart.chartToTableGap, ...getChartBreakoutStyle() }}>
                  <OrdersChart data={ORDER_DATA} config={config.chart} />
                </div>
              )}
            </>
          )}

          {/* Orders Chart - Future Projection Mode (Unified) */}
          {config.chart.showChart && config.chart.showFutureProjection && (
            <div
              style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                marginBottom: config.chart.chartToTableGap,
              }}
            >
              <UnifiedOrdersChart
                data={unifiedChartData}
                config={config.chart}
                yDomain={sharedYDomain}
              />
            </div>
          )}

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
                config.filter.showToolbarFilter ? (
                  <StackingNavWrapper
                    resetKey={resetKey}
                    onSelectionChange={handleSelectionChange}
                    onReset={handleTableReset}
                  />
                ) : undefined
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
