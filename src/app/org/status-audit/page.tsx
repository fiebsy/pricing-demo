/**
 * Status Audit Dashboard
 *
 * Minimalist page to visualize and audit order-status data.
 * Toggle between Statuses (48 rows) and Transitions (288 rows) views.
 *
 * Route: /status-audit
 */

'use client'

import { useState, useCallback } from 'react'
import type { ViewMode } from './config/types'
import { STATUSES } from './data/statuses'
import { TRANSITIONS } from './data/transitions'
import { generateCombinedCSV, downloadCSV } from './data/export-csv'
import {
  StatusHeader,
  ViewToggle,
  StatusesTable,
  TransitionsTable,
} from './components'

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function StatusAuditPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('statuses')

  // Export handler
  const handleExport = useCallback(() => {
    const csv = generateCombinedCSV(STATUSES, TRANSITIONS)
    const timestamp = new Date().toISOString().split('T')[0]
    downloadCSV(csv, `order-status-${timestamp}.csv`)
  }, [])

  return (
    <div className="bg-secondary_alt min-h-screen">
      <div className="mx-auto max-w-[1800px] px-6 py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-primary mb-2 text-2xl font-semibold">
              Status Audit
            </h1>
            <p className="text-secondary text-sm">
              Unified view of {STATUSES.length} statuses and{' '}
              {TRANSITIONS.length} transitions for order lifecycle management.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="bg-secondary hover:bg-tertiary text-primary rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Status Header - Lifecycle Overview */}
        <StatusHeader statuses={STATUSES} />

        {/* View Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <ViewToggle
            value={viewMode}
            onChange={setViewMode}
            statusCount={STATUSES.length}
            transitionCount={TRANSITIONS.length}
          />

          {/* Ignorable count */}
          <span className="text-tertiary text-xs">
            {viewMode === 'statuses' ? (
              <>
                <span className="text-secondary">
                  {STATUSES.filter((s) => s.is_ignorable).length}
                </span>{' '}
                ignorable statuses (dimmed)
              </>
            ) : (
              <>
                <span className="text-secondary">
                  {TRANSITIONS.filter((t) => t.is_ignorable).length}
                </span>{' '}
                ignorable transitions (dimmed)
              </>
            )}
          </span>
        </div>

        {/* Table Section */}
        {viewMode === 'statuses' ? (
          <StatusesTable data={STATUSES} />
        ) : (
          <TransitionsTable data={TRANSITIONS} statuses={STATUSES} />
        )}

        {/* Footer Notes */}
        <div className="text-tertiary mt-6 space-y-1 text-xs">
          <p>
            <strong className="text-secondary">Source:</strong> TypeScript data
            in <code className="text-tertiary">src/app/status-audit/data/</code>
          </p>
          <p>
            <strong className="text-secondary">Ignorable:</strong> Statuses
            marked as ignorable are transitory, deprecated, or pre-submission
            states not tracked in audit logs.
          </p>
        </div>
      </div>
    </div>
  )
}
