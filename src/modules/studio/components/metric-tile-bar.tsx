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
  const [animated, setAnimated] = useState(false)

  // Brief delay before showing numbers
  React.useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Smooth animation timing
  const timing = { duration: 800, easing: 'ease-out' as const }

  // Format metrics for display with NumberFlow animation
  const metricValues = useMemo(() => {
    return [
      {
        id: 'totalActive' as AudienceMetricId,
        label: 'Total Active Users',
        value: animated ? (
          <NumberFlow value={metrics.totalActiveUsers} locales="en-US" transformTiming={timing} spinTiming={timing} />
        ) : (
          <span className="inline-block h-[1em] w-6 rounded bg-quaternary/50" />
        ),
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.activeUsersChange),
          direction: metrics.activeUsersChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
      {
        id: 'totalMessages' as AudienceMetricId,
        label: 'Total Messages',
        value: animated ? (
          <NumberFlow value={metrics.totalMessages} locales="en-US" transformTiming={timing} spinTiming={timing} />
        ) : (
          <span className="inline-block h-[1em] w-6 rounded bg-quaternary/50" />
        ),
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.messagesChange),
          direction: metrics.messagesChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
      {
        id: 'avgMessages' as AudienceMetricId,
        label: 'Avg Messages / User',
        value: animated ? (
          <NumberFlow value={metrics.avgMessagesPerUser} format={{ maximumFractionDigits: 1, minimumFractionDigits: 1 }} transformTiming={timing} spinTiming={timing} />
        ) : (
          <span className="inline-block h-[1em] w-6 rounded bg-quaternary/50" />
        ),
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.avgMessagesChange),
          direction: metrics.avgMessagesChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
      {
        id: 'mostEngaged' as AudienceMetricId,
        label: 'Most Engaged Users',
        value: animated ? (
          <NumberFlow value={metrics.mostEngagedUsers} locales="en-US" transformTiming={timing} spinTiming={timing} />
        ) : (
          <span className="inline-block h-[1em] w-6 rounded bg-quaternary/50" />
        ),
        subtext: 'from last 30 days',
        trend: {
          value: Math.abs(metrics.engagedUsersChange),
          direction: metrics.engagedUsersChange >= 0 ? 'up' as const : 'down' as const,
        },
      },
    ]
  }, [metrics, animated])

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
