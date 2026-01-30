/**
 * Stacking Nav + Table Playground - Formatters
 *
 * Currency and date formatting utilities.
 */

import { format, isValid } from 'date-fns'

/**
 * Format currency for display (no decimals)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date for table display
 */
export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return '—'
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    if (!isValid(dateObj)) return '—'
    return format(dateObj, 'MMM d, yyyy')
  } catch {
    return '—'
  }
}
