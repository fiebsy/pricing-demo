/**
 * ClawbackTimer Utility Functions
 *
 * Helper functions for calculations and formatting.
 */

import type { ClawbackTimerColorState } from './types'
import { COLOR_THRESHOLDS } from './config'

/**
 * Calculate charge level from days remaining.
 * @param daysRemaining - Days until clawback
 * @param thresholdDays - Days representing 100% charge
 * @returns Charge level 0-100
 */
export function calculateChargeLevel(daysRemaining: number, thresholdDays: number): number {
  return Math.max(0, Math.min(100, Math.round((daysRemaining / thresholdDays) * 100)))
}

/**
 * Format the battery label based on days remaining.
 * @param days - Days until clawback
 * @returns Formatted label string (e.g., "9d left")
 */
export function formatBatteryLabel(days: number): string {
  if (days === 0) return '0d'
  return `${days}d left`
}

/**
 * Determine color state based on charge level.
 * @param chargeLevel - Current charge level 0-100
 * @returns Color state for styling
 */
export function getColorState(chargeLevel: number): ClawbackTimerColorState {
  if (chargeLevel < COLOR_THRESHOLDS.critical) return 'error'
  if (chargeLevel > COLOR_THRESHOLDS.healthy) return 'success'
  return 'warning'
}
