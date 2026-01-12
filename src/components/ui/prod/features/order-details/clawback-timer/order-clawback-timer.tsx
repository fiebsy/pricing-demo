/**
 * OrderClawbackTimer Component
 *
 * Feature-level wrapper for the base ClawbackTimer component.
 * Handles order-specific business logic and provides sensible defaults
 * for order detail contexts (tables, cards, etc.).
 *
 * @example
 * // Basic usage in a table row
 * <OrderClawbackTimer order={order} size="24" />
 *
 * @example
 * // With custom empty state
 * <OrderClawbackTimer order={order} emptyState="hidden" />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

import { ClawbackTimer } from '../../../base/clawback-timer'
import { useClawbackDays } from './hooks/use-clawback-days'
import type { OrderClawbackTimerProps } from './types'

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OrderClawbackTimer: React.FC<OrderClawbackTimerProps> = ({
  order,
  size = '24',
  showLabel = true,
  labelPosition = 'left',
  customLabel,
  thresholdDays = 15,
  useAdaptiveColor = true,
  styleConfig,
  className,
  labelClassName,
  emptyState = 'dash',
}) => {
  const { daysUntilClawback, shouldShowTimer, displayState } = useClawbackDays(order)

  // Handle empty state when no clawback data
  if (!shouldShowTimer) {
    if (emptyState === 'hidden' || emptyState === 'none') {
      return null
    }
    // Default: show dash
    return <span className={cn('text-sm text-tertiary', className)}>—</span>
  }

  // Override label for clawback state
  const label = displayState === 'clawback' && !customLabel ? 'Clawback' : customLabel

  return (
    <ClawbackTimer
      daysUntilClawback={daysUntilClawback}
      size={size}
      showLabel={showLabel}
      labelPosition={labelPosition}
      customLabel={label}
      thresholdDays={thresholdDays}
      useAdaptiveColor={useAdaptiveColor}
      styleConfig={styleConfig}
      className={className}
      labelClassName={labelClassName}
    />
  )
}
