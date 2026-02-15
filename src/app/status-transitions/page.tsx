/**
 * Status Transition Dashboard
 *
 * Comprehensive mapping of all status transitions from production data.
 * Displays frequency, user-facing translations, and coverage analysis.
 *
 * Route: /status-transitions
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { CoverageFilter } from './config/types'
import {
  TRANSITION_COLUMNS,
  COLUMN_LABELS,
} from './config/columns'
import {
  TRANSITION_DATA,
  getTotalFrequency,
  getCoverageCounts,
  getUsageTierCounts,
} from './data/transition-data'
import {
  renderTransitionCell,
  FilterSelect,
  TransitionDetailSheet,
} from './components'
import type { TransitionEntry } from './config/types'
import { TransitionTable } from './sections'

// =============================================================================
// SUMMARY CARD COMPONENT
// =============================================================================

interface SummaryCardProps {
  label: string
  value: number
  color: 'success' | 'info' | 'warning' | 'gray'
  description: string
}

function SummaryCard({ label, value, color, description }: SummaryCardProps) {
  return (
    <div className="bg-secondary flex flex-1 flex-col gap-2 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <Badge color={color} size="xs" shape="squircle">
          {label}
        </Badge>
      </div>
      <div className="text-primary text-2xl font-semibold tabular-nums">
        {value}
      </div>
      <div className="text-tertiary text-xs">{description}</div>
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
// FILTER OPTIONS
// =============================================================================

const COVERAGE_OPTIONS: { value: CoverageFilter; label: string }[] = [
  { value: 'all', label: 'All Coverage' },
  { value: 'specific', label: 'Specific Only' },
  { value: 'semantic', label: 'Semantic Only' },
  { value: 'fallback', label: 'Fallback Only' },
]

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function StatusTransitionsPage() {
  // State
  const [coverageFilter, setCoverageFilter] = useState<CoverageFilter>('all')
  const [selectedTransition, setSelectedTransition] = useState<TransitionEntry | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  // Summary data
  const totalFrequency = useMemo(() => getTotalFrequency(), [])
  const coverageCounts = useMemo(() => getCoverageCounts(), [])
  const usageTierCounts = useMemo(() => getUsageTierCounts(), [])

  // Filter data
  const filteredData = useMemo(() => {
    if (coverageFilter === 'all') {
      return TRANSITION_DATA
    }
    return TRANSITION_DATA.filter((t) => t.coverage === coverageFilter)
  }, [coverageFilter])



  // Row click handler
  const handleRowClick = useCallback((row: Record<string, unknown>) => {
    setSelectedTransition(row as unknown as TransitionEntry)
    setSheetOpen(true)
  }, [])

  // Left toolbar: filters
  const leftToolbar = (
    <FilterSelect
      label="Coverage"
      value={coverageFilter}
      options={COVERAGE_OPTIONS}
      onChange={setCoverageFilter}
    />
  )

  // Right toolbar: empty (column toggle removed)
  const rightToolbar = null

  return (
    <div className="bg-secondary_alt min-h-screen">
      <div className="mx-auto max-w-[1800px] px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-primary mb-2 text-2xl font-semibold">
            Status Transition Dashboard
          </h1>
          <p className="text-secondary text-sm">
            Complete mapping of {TRANSITION_DATA.length} status transitions from production data.
            Total occurrences: <span className="text-primary font-medium">{totalFrequency.toLocaleString()}</span>.
          </p>
        </div>

        {/* Coverage Summary Cards */}
        <div className="mb-6">
          <h2 className="text-secondary mb-3 text-sm font-medium">Translation Coverage</h2>
          <div className="flex gap-3">
            <SummaryCard
              label="Specific"
              value={coverageCounts.specific}
              color="success"
              description="Exact from→to mappings"
            />
            <SummaryCard
              label="Semantic"
              value={coverageCounts.semantic}
              color="info"
              description="Pattern-based rules"
            />
            <SummaryCard
              label="Fallback"
              value={coverageCounts.fallback}
              color="warning"
              description="Auto-generated"
            />
            <SummaryCard
              label="Total"
              value={TRANSITION_DATA.length}
              color="gray"
              description="Unique transitions"
            />
          </div>
        </div>

        {/* Usage Tier Overview */}
        <div className="mb-6">
          <h2 className="text-secondary mb-3 text-sm font-medium">Frequency Analysis</h2>
          <div className="grid grid-cols-4 gap-3">
            <UsageTierCard
              tier="high"
              count={usageTierCounts.high}
              label="High Usage"
              description="1,000+ occurrences"
            />
            <UsageTierCard
              tier="medium"
              count={usageTierCounts.medium}
              label="Medium"
              description="100-999 occurrences"
            />
            <UsageTierCard
              tier="low"
              count={usageTierCounts.low}
              label="Low"
              description="10-99 occurrences"
            />
            <UsageTierCard
              tier="stale"
              count={usageTierCounts.stale}
              label="Stale"
              description="<10 occurrences"
            />
          </div>
        </div>

        {/* Transition Table */}
        <TransitionTable
          data={filteredData as unknown as Record<string, unknown>[]}
          columns={TRANSITION_COLUMNS}
          columnLabels={COLUMN_LABELS}
          renderCell={renderTransitionCell}
          leftToolbar={leftToolbar}
          rightToolbar={rightToolbar}
          totalCount={filteredData.length}
          onRowClick={handleRowClick}
        />

        {/* Detail Sheet */}
        <TransitionDetailSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          transition={selectedTransition}
        />

        {/* Footer Notes */}
        <div className="text-tertiary mt-6 space-y-2 text-xs">
          <p>
            <strong className="text-secondary">Data source:</strong> Production database snapshot (2026-02-15)
          </p>
          <p>
            <strong className="text-secondary">Coverage types:</strong> Specific (exact mapping), Semantic (rule-based), Fallback (auto-generated)
          </p>
          <p>
            <strong className="text-secondary">Fallback transitions ({coverageCounts.fallback}):</strong> Candidates for translation review
          </p>
        </div>
      </div>
    </div>
  )
}
