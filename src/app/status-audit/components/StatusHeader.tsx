/**
 * Status Header Component
 *
 * 4-column layout showing status counts by lifecycle stage.
 * Middle two columns (Healthy + At Risk) are grouped visually.
 */

'use client'

import { useMemo } from 'react'
import type { StatusRow } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

interface StatusHeaderProps {
  statuses: StatusRow[]
}

interface ColumnData {
  title: string
  subtitle?: string
  statuses: StatusRow[]
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatusHeader({ statuses }: StatusHeaderProps) {
  // Group statuses by lifecycle column
  const columns = useMemo(() => {
    const preActive: StatusRow[] = []
    const healthy: StatusRow[] = []
    const atRisk: StatusRow[] = []
    const closed: StatusRow[] = []

    for (const status of statuses) {
      if (status.category === 'ACTIVE') {
        if (status.subcategory === 'HEALTHY') {
          healthy.push(status)
        } else if (status.subcategory === 'AT_RISK' || status.subcategory === 'LOST_PENDING') {
          // AT_RISK and LOST_PENDING go to At Risk column
          atRisk.push(status)
        } else {
          // OTHER_ACTIVE goes to pre-active
          preActive.push(status)
        }
      } else {
        // CLOSED
        closed.push(status)
      }
    }

    return { preActive, healthy, atRisk, closed }
  }, [statuses])

  return (
    <div className="mb-8">
      <h2 className="text-secondary mb-4 text-sm font-medium">Lifecycle Overview</h2>
      <div className="flex gap-3">
        {/* Pre-Active Column */}
        <LifecycleColumn
          title="Pre-Active"
          subtitle="OTHER_ACTIVE"
          statuses={columns.preActive}
          variant="default"
        />

        {/* Active Group (Healthy + At Risk) */}
        <div className="bg-secondary/30 ring-border flex flex-1 gap-3 rounded-xl p-3 ring-1">
          <LifecycleColumn
            title="Healthy"
            subtitle="HEALTHY"
            statuses={columns.healthy}
            variant="success"
          />
          <LifecycleColumn
            title="At Risk"
            subtitle="AT_RISK, LOST_PENDING"
            statuses={columns.atRisk}
            variant="warning"
          />
        </div>

        {/* Closed Column */}
        <LifecycleColumn
          title="Closed"
          subtitle="COMPLETED, SETTLED, OTHER_CLOSED, NEVER_STARTED"
          statuses={columns.closed}
          variant="default"
        />
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface LifecycleColumnProps {
  title: string
  subtitle?: string
  statuses: StatusRow[]
  variant: 'default' | 'success' | 'warning'
}

function LifecycleColumn({ title, subtitle, statuses, variant }: LifecycleColumnProps) {
  const variantStyles = {
    default: 'bg-secondary',
    success: 'bg-success/5',
    warning: 'bg-warning/5',
  }

  const countStyles = {
    default: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
  }

  return (
    <div className={`flex flex-1 flex-col rounded-lg p-4 ${variantStyles[variant]}`}>
      {/* Header */}
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-primary text-sm font-medium">{title}</span>
        <span className={`text-lg font-semibold tabular-nums ${countStyles[variant]}`}>
          {statuses.length}
        </span>
      </div>

      {subtitle && (
        <span className="text-tertiary mb-3 font-mono text-[10px]">{subtitle}</span>
      )}

      {/* Status List */}
      <div className="flex flex-col gap-1">
        {statuses.slice(0, 8).map((status) => (
          <StatusItem
            key={status.id}
            label={status.badge_label}
            code={status.code}
            isIgnorable={status.is_ignorable}
          />
        ))}
        {statuses.length > 8 && (
          <span className="text-tertiary mt-1 text-xs">
            +{statuses.length - 8} more
          </span>
        )}
      </div>
    </div>
  )
}

interface StatusItemProps {
  label: string
  code: string
  isIgnorable: boolean
}

function StatusItem({ label, code, isIgnorable }: StatusItemProps) {
  return (
    <div
      className={`flex items-center gap-2 ${isIgnorable ? 'opacity-50' : ''}`}
    >
      <span className="bg-tertiary h-1 w-1 shrink-0 rounded-full" />
      <span className="text-tertiary truncate font-mono text-[10px]">{code}</span>
      <span className="text-secondary truncate text-xs">{label}</span>
    </div>
  )
}
