/**
 * MetricTileBar Component for Collections
 *
 * Risk activity metric cards that filter the table by status on click.
 * Uses prod MetricCard with METRIC_CARD_PRESETS.flat for hardened styling.
 *
 * Metrics:
 * - At risk: Collections + Last Chance combined (dollar value primary)
 * - Last chance: Contracts in active clawback (dollar value primary)
 * - Settled: Clawed back contracts (dollar value primary)
 * - Default rate: 30-day rate with all-time comparison
 */

'use client'

import * as React from 'react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  MetricCard,
  METRIC_CARD_PRESETS,
} from '@/components/ui/prod/features/metric-card'

import type { MetricFilterId } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface MetricTileBarProps {
  /** Currently active metric filter */
  activeMetric: MetricFilterId | null
  /** Callback when a metric tile is clicked */
  onMetricClick: (metricId: MetricFilterId) => void
  /** Metrics data from the pagination hook */
  metrics: {
    collectionsCount: number
    collectionsAmount: number
    activeClawbackCount: number
    activeClawbackAmount: number
    settledClawbackCount: number
    settledClawbackAmount: number
    defaultedOrdersCount: number
    defaultRateAllTime: number
  }
  /** Optional className for the container */
  className?: string
}

// =============================================================================
// CURRENCY FORMATTER
// =============================================================================

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`
  }
  return `$${amount.toFixed(0)}`
}

// =============================================================================
// COMPONENT
// =============================================================================

export const MetricTileBar: React.FC<MetricTileBarProps> = ({
  activeMetric,
  onMetricClick,
  metrics,
  className,
}) => {
  const [hoveredId, setHoveredId] = useState<MetricFilterId | null>(null)

  // Compute metric values from pre-calculated metrics
  const metricValues = useMemo(() => {
    const atRiskCount = metrics.collectionsCount + metrics.activeClawbackCount
    const atRiskAmount = metrics.collectionsAmount + metrics.activeClawbackAmount

    return [
      {
        id: 'atRisk' as MetricFilterId,
        label: 'At risk',
        value: formatCurrency(atRiskAmount),
        subtext: `${atRiskCount} orders`,
      },
      {
        id: 'clawback' as MetricFilterId,
        label: 'Last chance',
        value: formatCurrency(metrics.activeClawbackAmount),
        subtext: `${metrics.activeClawbackCount} orders`,
      },
      {
        id: 'settled' as MetricFilterId,
        label: 'Clawed back',
        value: formatCurrency(metrics.settledClawbackAmount),
        subtext: `${metrics.settledClawbackCount} orders`,
      },
    ]
  }, [metrics])

  // Format default rate for display
  const formatRate = (rate: number | null | undefined): string => {
    if (rate == null || isNaN(rate)) return 'N/A'
    return `${rate.toFixed(1)}%`
  }

  const defaultRateDisplay = formatRate(metrics?.defaultRateAllTime)
  const defaultedCountDisplay = metrics?.defaultedOrdersCount ?? 0

  return (
    <div className={cn('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
      {metricValues.map((metric) => (
        <MetricCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
          count={metric.subtext}
          config={METRIC_CARD_PRESETS.flat}
          isActive={activeMetric === metric.id}
          isHovered={hoveredId === metric.id}
          onClick={() => onMetricClick(metric.id)}
          onMouseEnter={() => setHoveredId(metric.id)}
          onMouseLeave={() => setHoveredId(null)}
        />
      ))}
      {/* Default Rate - Clickable to filter by defaulted orders */}
      <MetricCard
        label="Default rate"
        value={defaultRateDisplay}
        count={`${defaultedCountDisplay} orders`}
        config={METRIC_CARD_PRESETS.flat}
        isActive={activeMetric === 'defaulted'}
        isHovered={hoveredId === 'defaulted'}
        onClick={() => onMetricClick('defaulted')}
        onMouseEnter={() => setHoveredId('defaulted')}
        onMouseLeave={() => setHoveredId(null)}
      />
    </div>
  )
}

MetricTileBar.displayName = 'MetricTileBar'
