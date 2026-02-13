/**
 * Status Organization Page
 *
 * Visual breakdown of all 48 order statuses for:
 * - Backend API design
 * - Historical data indexing
 * - Status log transitions
 *
 * Route: /status-organization
 */

'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { ViewMode, OrderSubcategory, MainState } from './config/types'
import { STATUS_COLUMNS, COLUMN_LABELS } from './config/columns'
import { STATUS_DATA, getSubcategoryCounts, getTotalCount, getUsageTierCounts } from './data/status-data'
import { SUBCATEGORY_CONFIG, MAIN_STATE_CONFIG } from './config/badge-mapping'
import { flattenWithGroupHeaders, SUBCATEGORY_ORDER, MAIN_STATE_ORDER } from './config/grouping'
import { ViewToggle, createStatusCellRenderer } from './components'
import { StatusOrganizationTable } from './sections/table'
import type { TableBorderConfig } from './types'

// =============================================================================
// SUMMARY CARD COMPONENT
// =============================================================================

interface SummaryCardProps {
  label: string
  value: number
  statusCount: number
  color: 'success' | 'warning' | 'error' | 'gray' | 'info'
}

function SummaryCard({ label, value, statusCount, color }: SummaryCardProps) {
  return (
    <div className="bg-secondary flex flex-1 flex-col gap-2 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <Badge color={color} size="xs" shape="squircle">
          {label}
        </Badge>
        <span className="text-tertiary text-xs">
          {statusCount} {statusCount === 1 ? 'status' : 'statuses'}
        </span>
      </div>
      <div className="text-primary text-2xl font-semibold tabular-nums">
        {value.toLocaleString()}
      </div>
      <div className="text-tertiary text-xs">orders</div>
    </div>
  )
}

// =============================================================================
// USAGE TIER CARD COMPONENT
// =============================================================================

interface UsageTierCardProps {
  tier: 'high' | 'medium' | 'low' | 'stale'
  count: number
  label: string
  description: string
}

function UsageTierCard({ tier, count, label, description }: UsageTierCardProps) {
  const dotColors: Record<string, string> = {
    high: 'bg-success',
    medium: 'bg-info',
    low: 'bg-tertiary',
    stale: 'border border-error bg-transparent',
  }

  return (
    <div className="bg-secondary flex items-center gap-3 rounded-lg px-4 py-3">
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColors[tier]}`} />
      <div className="flex flex-1 flex-col">
        <span className="text-primary text-sm font-medium">{label}</span>
        <span className="text-tertiary text-xs">{description}</span>
      </div>
      <span className="text-secondary text-lg font-semibold tabular-nums">{count}</span>
    </div>
  )
}

// =============================================================================
// DEFAULT TABLE BORDER CONFIG
// =============================================================================

const DEFAULT_BORDER_CONFIG: TableBorderConfig = {
  showOuterBorder: true,
  showHeaderRowBorder: true,
  showRowBorders: true,
  showCellBorders: false,
  outerBorderColor: 'primary',
  headerRowBorderColor: 'secondary',
  rowBorderColor: 'secondary',
  cellBorderColor: 'secondary',
  tableBorderRadius: 16,
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function StatusOrganizationPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('detailed')

  // Get counts for summary cards
  const subcategoryCounts = useMemo(() => getSubcategoryCounts(), [])
  const usageTierCounts = useMemo(() => getUsageTierCounts(), [])
  const totalCount = useMemo(() => getTotalCount(), [])

  // Prepare table data based on view mode
  const tableData = useMemo(() => {
    if (viewMode === 'detailed') {
      return flattenWithGroupHeaders(STATUS_DATA, 'subcategory')
    } else {
      return flattenWithGroupHeaders(STATUS_DATA, 'mainState')
    }
  }, [viewMode])

  // Create cell renderer based on view mode
  const renderCell = useMemo(() => createStatusCellRenderer(viewMode), [viewMode])

  // Summary cards for detailed view (7 subcategories)
  const detailedSummaryCards = useMemo(() => {
    return SUBCATEGORY_ORDER.map((subcategory) => {
      const config = SUBCATEGORY_CONFIG[subcategory]
      const counts = subcategoryCounts[subcategory]
      return {
        label: config.label,
        value: counts.count,
        statusCount: counts.statusCount,
        color: config.badgeColor,
      }
    })
  }, [subcategoryCounts])

  // Summary cards for simplified view (3 main states)
  const simplifiedSummaryCards = useMemo(() => {
    return MAIN_STATE_ORDER.map((mainState) => {
      const config = MAIN_STATE_CONFIG[mainState]
      const statusCount = config.subcategories.reduce(
        (sum, sub) => sum + subcategoryCounts[sub].statusCount,
        0
      )
      const orderCount = config.subcategories.reduce(
        (sum, sub) => sum + subcategoryCounts[sub].count,
        0
      )
      return {
        label: config.label,
        value: orderCount,
        statusCount,
        color: config.badgeColor,
      }
    })
  }, [subcategoryCounts])

  const activeSummaryCards = viewMode === 'detailed' ? detailedSummaryCards : simplifiedSummaryCards

  return (
    <div className="bg-secondary_alt min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-primary mb-2 text-2xl font-semibold">
            Order Status Organization
          </h1>
          <p className="text-secondary text-sm">
            Visual breakdown of all 48 order statuses for API design and status log transitions.
            Total: <span className="text-primary font-medium">{totalCount.toLocaleString()}</span> orders.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 flex gap-3">
          {activeSummaryCards.map((card) => (
            <SummaryCard
              key={card.label}
              label={card.label}
              value={card.value}
              statusCount={card.statusCount}
              color={card.color}
            />
          ))}
        </div>

        {/* Usage Tier Overview */}
        <div className="mb-6">
          <h2 className="text-secondary mb-3 text-sm font-medium">Usage Analysis</h2>
          <div className="grid grid-cols-4 gap-3">
            <UsageTierCard
              tier="high"
              count={usageTierCounts.high.count}
              label="High Usage"
              description="1,000+ orders"
            />
            <UsageTierCard
              tier="medium"
              count={usageTierCounts.medium.count}
              label="Medium"
              description="100-999 orders"
            />
            <UsageTierCard
              tier="low"
              count={usageTierCounts.low.count}
              label="Low"
              description="10-99 orders"
            />
            <UsageTierCard
              tier="stale"
              count={usageTierCounts.stale.count}
              label="Stale"
              description="<10 orders"
            />
          </div>
        </div>

        {/* Status Table */}
        <StatusOrganizationTable
          data={tableData as unknown as Record<string, unknown>[]}
          columns={STATUS_COLUMNS}
          columnLabels={COLUMN_LABELS}
          renderCell={renderCell}
          borderConfig={DEFAULT_BORDER_CONFIG}
          leftToolbar={<ViewToggle value={viewMode} onChange={setViewMode} />}
          rightToolbar={
            <span className="text-tertiary text-xs">
              {viewMode === 'detailed' ? '7 subcategories' : '3 main states'}
            </span>
          }
        />

        {/* Footer Notes */}
        <div className="text-tertiary mt-6 space-y-2 text-xs">
          <p>
            <strong className="text-secondary">Data source:</strong> Production database snapshot (2026-02-12)
          </p>
          <p>
            <strong className="text-secondary">Stale statuses (&lt;10 orders):</strong> Candidates for deprecation review
          </p>
        </div>
      </div>
    </div>
  )
}
