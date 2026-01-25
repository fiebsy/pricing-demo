/**
 * ClawbackTimer Component
 *
 * A lightweight battery indicator for displaying clawback countdown status.
 * Uses pure CSS for optimal rendering performance in table rows.
 *
 * @example
 * // Basic usage
 * <ClawbackTimer daysUntilClawback={9} />
 *
 * @example
 * // Custom size and label position
 * <ClawbackTimer daysUntilClawback={5} size="24" labelPosition="right" />
 *
 * @example
 * // No label
 * <ClawbackTimer daysUntilClawback={12} showLabel={false} />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

import type { ClawbackTimerProps } from './types'
import { DEFAULT_THRESHOLD_DAYS, DEFAULT_SIZE } from './config'
import { calculateChargeLevel, formatBatteryLabel } from './utils'
import { Battery } from './battery'

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ClawbackTimer: React.FC<ClawbackTimerProps> = ({
  daysUntilClawback,
  size = DEFAULT_SIZE,
  showLabel = true,
  labelPosition = 'left',
  customLabel,
  thresholdDays = DEFAULT_THRESHOLD_DAYS,
  useAdaptiveColor = true,
  styleConfig,
  className,
  labelClassName,
}) => {
  // Handle null/undefined - show empty state
  if (daysUntilClawback === null || daysUntilClawback === undefined) {
    return <div className={cn('inline-block text-sm text-tertiary', className)}>—</div>
  }

  const chargeLevel = calculateChargeLevel(daysUntilClawback, thresholdDays)
  const label = showLabel ? (customLabel ?? formatBatteryLabel(daysUntilClawback)) : undefined

  return (
    <Battery
      chargeLevel={chargeLevel}
      size={size}
      label={label}
      labelPosition={labelPosition === 'none' || !showLabel ? 'none' : labelPosition}
      useAdaptiveColor={useAdaptiveColor}
      styleConfig={styleConfig}
      className={className}
      labelClassName={labelClassName}
    />
  )
}
