'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import { HugeIcon } from '@/components/ui/prod/base/icon'

import type { DisplayCardMetricProps, DisplayCardStatProps, MetricFormat } from './types'
import { metricSizeStyles, trendStyles } from './config'

// =============================================================================
// FORMAT UTILITIES
// =============================================================================

const formatValue = (value: string | number, format: MetricFormat): string => {
  if (typeof value === 'string') return value

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    case 'number':
      return new Intl.NumberFormat('en-US').format(value)
    case 'percent':
      return `${value}%`
    case 'none':
    default:
      return String(value)
  }
}

// =============================================================================
// METRIC COMPONENT
// =============================================================================

export const DisplayCardMetric = forwardRef<HTMLDivElement, DisplayCardMetricProps>(
  (
    {
      value,
      label,
      labelPosition = 'above',
      trend,
      format = 'none',
      size = 'md',
      className,
    },
    ref
  ) => {
    const sizeConfig = metricSizeStyles[size]
    const formattedValue = formatValue(value, format)

    const trendColor = trend?.direction
      ? trendStyles[trend.direction]
      : trendStyles.neutral

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {/* Label above */}
        {label && labelPosition === 'above' && (
          <span className={cn('text-tertiary mb-1', sizeConfig.label)}>{label}</span>
        )}

        {/* Value row with optional trend */}
        <div className="flex items-baseline gap-2">
          <span className={cn('text-primary', sizeConfig.value)}>{formattedValue}</span>

          {trend && (
            <span className={cn('flex items-center gap-0.5', trendColor, sizeConfig.trend)}>
              {trend.direction === 'up' && (
                <HugeIcon icon={ArrowUp01Icon} size={sizeConfig.icon} />
              )}
              {trend.direction === 'down' && (
                <HugeIcon icon={ArrowDown01Icon} size={sizeConfig.icon} />
              )}
              <span>{trend.value}%</span>
            </span>
          )}
        </div>

        {/* Label below */}
        {label && labelPosition === 'below' && (
          <span className={cn('text-tertiary mt-1', sizeConfig.label)}>{label}</span>
        )}
      </div>
    )
  }
)

DisplayCardMetric.displayName = 'DisplayCard.Metric'

// =============================================================================
// STAT COMPONENT (simpler label + value pair)
// =============================================================================

export const DisplayCardStat = forwardRef<HTMLDivElement, DisplayCardStatProps>(
  ({ label, value, format = 'none', className }, ref) => {
    const formattedValue = formatValue(value, format)

    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)}>
        <span className="text-tertiary text-xs">{label}</span>
        <span className="text-primary text-lg font-medium">{formattedValue}</span>
      </div>
    )
  }
)

DisplayCardStat.displayName = 'DisplayCard.Stat'
