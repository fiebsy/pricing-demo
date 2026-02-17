/**
 * Status Flow Page
 *
 * Interactive node map visualization of order status transitions.
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import type { FilterState, StatusFlowNode, OrderSubcategory } from './_config/types'
import { StatusFlowCanvas } from './components/StatusFlowCanvas'
import { FilterToolbar } from './components/FilterToolbar'
import { PathSelector } from './components/PathSelector'
import { NodeDetailSheet } from './components/NodeDetailSheet'
import { FlowLegend } from './components/FlowLegend'
import { useStatusNodes } from './hooks/useStatusNodes'
import { useTransitionEdges } from './hooks/useTransitionEdges'
import { usePathTracing } from './hooks/usePathTracing'
import { STATUS_DATA } from '../status-organization/data/status-data'
import { TRANSITION_DATA } from '../status-transitions/data/transition-data'

// =============================================================================
// DEFAULT FILTER STATE
// =============================================================================

const ALL_SUBCATEGORIES: OrderSubcategory[] = [
  'OTHER_ACTIVE',
  'HEALTHY',
  'AT_RISK',
  'FULLY_PAID',
  'CLAWED_BACK',
  'DECLINED',
  'OTHER_CLOSED',
]

const DEFAULT_FILTER_STATE: FilterState = {
  frequencyThreshold: 10,
  visibleSubcategories: new Set(ALL_SUBCATEGORIES),
  showAll: false,
  activePathPreset: null,
}

// =============================================================================
// STATS HELPERS
// =============================================================================

function getFilteredStats(filterState: FilterState) {
  const visibleStatuses = STATUS_DATA.filter(s =>
    filterState.visibleSubcategories.has(s.subcategory)
  )

  const visibleStatusCodes = new Set(visibleStatuses.map(s => s.code))

  const visibleTransitions = TRANSITION_DATA.filter(t => {
    if (!visibleStatusCodes.has(t.fromStatus) || !visibleStatusCodes.has(t.toStatus)) {
      return false
    }
    if (!filterState.showAll && t.frequency < filterState.frequencyThreshold) {
      return false
    }
    return true
  })

  return {
    statusCount: visibleStatuses.length,
    transitionCount: visibleTransitions.length,
    totalStatuses: STATUS_DATA.length,
    totalTransitions: TRANSITION_DATA.length,
  }
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function StatusFlowPage() {
  // Filter state
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE)

  // Selected node for detail sheet
  const [selectedNode, setSelectedNode] = useState<StatusFlowNode | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Handle filter changes
  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilterState(prev => ({
      ...prev,
      ...updates,
    }))
  }, [])

  // Handle node click
  const handleNodeClick = useCallback((node: StatusFlowNode) => {
    setSelectedNode(node)
    setIsSheetOpen(true)
  }, [])

  // Compute stats
  const stats = useMemo(() => getFilteredStats(filterState), [filterState])

  // Get path tracing for stats display
  const visibleNodeIds = useMemo(() => {
    const visible = STATUS_DATA.filter(s =>
      filterState.visibleSubcategories.has(s.subcategory)
    )
    return new Set(visible.map(s => s.code))
  }, [filterState.visibleSubcategories])

  const edges = useTransitionEdges(filterState, visibleNodeIds, undefined)
  const pathStats = usePathTracing(edges, filterState.activePathPreset)

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Status Flow Map</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Interactive visualization of order status transitions
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-gray-100">{stats.statusCount}</span>
                <span className="text-gray-400 dark:text-gray-500">/{stats.totalStatuses}</span>
                <span className="ml-1">statuses</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-gray-100">{stats.transitionCount}</span>
                <span className="text-gray-400 dark:text-gray-500">/{stats.totalTransitions}</span>
                <span className="ml-1">transitions</span>
              </div>
            </div>

            {/* Path Selector */}
            <PathSelector
              filterState={filterState}
              onFilterChange={handleFilterChange}
              pathStats={pathStats}
            />
          </div>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar
          filterState={filterState}
          onFilterChange={handleFilterChange}
        />
      </header>

      {/* Canvas */}
      <main className="flex-1 relative">
        <ReactFlowProvider>
          <StatusFlowCanvas
            filterState={filterState}
            onNodeClick={handleNodeClick}
          />
        </ReactFlowProvider>

        {/* Legend (overlay) */}
        <div className="absolute top-4 left-4 z-10">
          <FlowLegend />
        </div>
      </main>

      {/* Node Detail Sheet */}
      <NodeDetailSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        node={selectedNode}
      />
    </div>
  )
}
