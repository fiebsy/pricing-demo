/**
 * MetricTileBar Component for Studio Audience
 *
 * Audience engagement metric cards that filter the table by category on click.
 * Uses prod MetricCard with METRIC_CARD_PRESETS.flat for hardened styling.
 *
 * Metrics:
 * - Total Active Users: Users with Active status
 * - Total Messages: Aggregate across all users
 * - Avg Messages / User: Total / Active users
 * - Most Engaged Users: Users with 50+ messages
 */

'use client'

import * as React from 'react'
import { useMemo, useState } from 'react'
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { cn } from '@/lib/utils'
import {
  MetricCard,
  METRIC_CARD_PRESETS,
} from '@/components/ui/prod/features/metric-card'

import type { AudienceMetricId, AudienceMetrics } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface MetricTileBarProps {
  /** Currently active metric filter */
  activeMetric: AudienceMetricId | null
  /** Callback when a metric tile is clicked */
  onMetricClick: (metricId: AudienceMetricId) => void
  /** Metrics data from the pagination hook */
  metrics: AudienceMetrics
  /** Optional className for the container */
  className?: string
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
  const [hoveredId, setHoveredId] = useState<AudienceMetricId | null>(null)
  const [showValues, setShowValues] = useState(false)

  // Trigger animation from 0 to real values after mount
  React.useEffect(() => {
    requestAnimationFrame(() => setShowValues(true))
  }, [])

  // Format metrics for display with NumberFlow animation
  const metricValues = useMemo(() => {
    return [
      {
        id: 'totalActive' as AudienceMetricId,
        label: 'Total Active Users',
        value: <NumberFlow value={showValues ? metrics.totalActiveUsers : 0} locales="en-US" />,
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.activeUsersChange),
          direction: metrics.activeUsersChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
      {
        id: 'totalMessages' as AudienceMetricId,
        label: 'Total Messages',
        value: <NumberFlow value={showValues ? metrics.totalMessages : 0} locales="en-US" />,
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.messagesChange),
          direction: metrics.messagesChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
      {
        id: 'avgMessages' as AudienceMetricId,
        label: 'Avg Messages / User',
        value: <NumberFlow value={showValues ? metrics.avgMessagesPerUser : 0} format={{ maximumFractionDigits: 1, minimumFractionDigits: 1 }} />,
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.avgMessagesChange),
          direction: metrics.avgMessagesChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
      {
        id: 'mostEngaged' as AudienceMetricId,
        label: 'Most Engaged Users',
        value: <NumberFlow value={showValues ? metrics.mostEngagedUsers : 0} locales="en-US" />,
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.engagedUsersChange),
          direction: metrics.engagedUsersChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
    ]
  }, [metrics, showValues])

  return (
    <NumberFlowGroup>
      <div className={cn('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
        {metricValues.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            count={metric.subtext}
            trend={metric.trend}
            config={METRIC_CARD_PRESETS.flat}
            isActive={activeMetric === metric.id}
            isHovered={hoveredId === metric.id}
            onClick={() => onMetricClick(metric.id)}
            onMouseEnter={() => setHoveredId(metric.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </NumberFlowGroup>
  )
}

MetricTileBar.displayName = 'MetricTileBar'
