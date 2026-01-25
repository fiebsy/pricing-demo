/**
 * useClawbackDays Hook
 *
 * Extracts and normalizes clawback countdown data from order objects.
 * Handles edge cases like active clawbacks and expired timers.
 */

import { useMemo } from 'react'
import type { OrderClawbackData } from '../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ClawbackDaysResult {
  /** Days until clawback (null if not applicable) */
  daysUntilClawback: number | null
  /** Whether the order is in active clawback (past the threshold) */
  isInClawback: boolean
  /** Whether to show the timer (false for active clawbacks or missing data) */
  shouldShowTimer: boolean
  /** Display state: 'countdown' | 'clawback' | 'none' */
  displayState: 'countdown' | 'clawback' | 'none'
}

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

/**
 * Extracts clawback days from an order object.
 *
 * @param order - Order data containing clawback information
 * @returns Normalized clawback data with display state
 *
 * @example
 * const { daysUntilClawback, shouldShowTimer } = useClawbackDays(order)
 * if (shouldShowTimer) {
 *   return <ClawbackTimer daysUntilClawback={daysUntilClawback} />
 * }
 */
export function useClawbackDays(order: OrderClawbackData | null | undefined): ClawbackDaysResult {
  return useMemo(() => {
    // No order data
    if (!order) {
      return {
        daysUntilClawback: null,
        isInClawback: false,
        shouldShowTimer: false,
        displayState: 'none',
      }
    }

    const { daysUntilClawback, isInClawback, riskCategory } = order

    // Determine if in active clawback from multiple sources
    const inClawback =
      isInClawback === true ||
      riskCategory === 'ACTIVE_CLAWBACK' ||
      riskCategory === 'CLAWBACK_RISK'

    // Active clawback state - show timer at 0 to indicate expired
    if (inClawback && (daysUntilClawback === null || daysUntilClawback === undefined)) {
      return {
        daysUntilClawback: 0,
        isInClawback: true,
        shouldShowTimer: true,
        displayState: 'clawback',
      }
    }

    // No countdown data available
    if (daysUntilClawback === null || daysUntilClawback === undefined) {
      return {
        daysUntilClawback: null,
        isInClawback: false,
        shouldShowTimer: false,
        displayState: 'none',
      }
    }

    // Normal countdown state
    return {
      daysUntilClawback,
      isInClawback: inClawback || daysUntilClawback <= 0,
      shouldShowTimer: true,
      displayState: daysUntilClawback <= 0 ? 'clawback' : 'countdown',
    }
  }, [order])
}
