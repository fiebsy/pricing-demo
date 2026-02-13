/**
 * Status Organization - Status Data
 *
 * All 48 order statuses with metadata and database counts.
 * Last updated: 2026-02-12
 */

import type { StatusEntry, OrderSubcategory, BadgeColor, UsageTier } from '../config/types'

// =============================================================================
// USAGE TIER HELPER
// =============================================================================

function getUsageTier(count: number): UsageTier {
  if (count >= 1000) return 'high'
  if (count >= 100) return 'medium'
  if (count >= 10) return 'low'
  return 'stale'
}

// =============================================================================
// DISPLAY LABEL HELPER
// =============================================================================

function toDisplayLabel(code: string): string {
  return code
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

// =============================================================================
// STATUS DEFINITIONS
// =============================================================================

// ACTIVE > HEALTHY (9 statuses)
const HEALTHY_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'FUNDING_IN_REPAYMENT', displayLabel: 'Funding In Repayment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 5813 },
  { code: 'SERVICING_IN_REPAYMENT', displayLabel: 'Servicing In Repayment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 1560 },
  { code: 'IN_REPAYMENT', displayLabel: 'In Repayment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 14 },
  { code: 'FUNDING_MODIFIED_PAYMENT', displayLabel: 'Funding Modified Payment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 64 },
  { code: 'SERVICING_MODIFIED_PAYMENT', displayLabel: 'Servicing Modified Payment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 33 },
  { code: 'FUNDING_PAUSED_PAYMENT', displayLabel: 'Funding Paused Payment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 31 },
  { code: 'SERVICING_PAUSED_PAYMENT', displayLabel: 'Servicing Paused Payment', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 29 },
  { code: 'FUNDING_ON_HOLD', displayLabel: 'Funding On Hold', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 11 },
  { code: 'FUNDED', displayLabel: 'Funded', category: 'ACTIVE', subcategory: 'HEALTHY', badgeColor: 'success', count: 9 },
]

// ACTIVE > AT_RISK (8 statuses)
const AT_RISK_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'DEFAULTED', displayLabel: 'Defaulted', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'error', count: 446 },
  { code: 'FUNDING_IN_COLLECTIONS', displayLabel: 'Funding In Collections', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'warning', count: 272 },
  { code: 'SERVICING_IN_COLLECTIONS', displayLabel: 'Servicing In Collections', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'warning', count: 210 },
  { code: 'CHARGEBACK_PENDING_CLAWBACK', displayLabel: 'Chargeback Pending Clawback', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'error', count: 195 },
  { code: 'IN_COLLECTIONS_FUTURE_PAYMENT', displayLabel: 'In Collections Future Payment', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'warning', count: 70 },
  { code: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', displayLabel: 'Funding In Collections Risk Of Clawback', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'error', count: 48 },
  { code: 'REQUESTING_CANCELLATION', displayLabel: 'Requesting Cancellation', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'warning', count: 41 },
  { code: 'IN_COLLECTIONS_PENDING_PAYMENT', displayLabel: 'In Collections Pending Payment', category: 'ACTIVE', subcategory: 'AT_RISK', badgeColor: 'warning', count: 13 },
]

// ACTIVE > OTHER_ACTIVE (15 statuses)
const OTHER_ACTIVE_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'MANUAL_REVIEW', displayLabel: 'Manual Review', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 1075 },
  { code: 'FUNDING_ENTER_FIRST_PAYMENT', displayLabel: 'Funding Enter First Payment', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 115 },
  { code: 'SERVICING_PARTICIPATION_PENDING', displayLabel: 'Servicing Participation Pending', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 59 },
  { code: 'FUNDING_PARTICIPATION_PENDING', displayLabel: 'Funding Participation Pending', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 59 },
  { code: 'UNKNOWN', displayLabel: 'Unknown', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'gray', count: 58 },
  { code: 'IN_UNDERWRITING', displayLabel: 'In Underwriting', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 22 },
  { code: 'FUNDING_TO_BE_SENT', displayLabel: 'Funding To Be Sent', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 18 },
  { code: 'SERVICING_ENTER_FIRST_PAYMENT', displayLabel: 'Servicing Enter First Payment', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 9 },
  { code: 'UNDERWRITING_COMPLETE', displayLabel: 'Underwriting Complete', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 4 },
  { code: 'CREDIT_LOCKED', displayLabel: 'Credit Locked', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'warning', count: 3 },
  { code: 'APPLICATION_IN_PROGRESS', displayLabel: 'Application In Progress', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 1 },
  { code: 'ACTIVATING', displayLabel: 'Activating', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 1 },
  { code: 'FAILED_PAYMENT', displayLabel: 'Failed Payment', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'warning', count: 1 },
  { code: 'CHARGEBACK', displayLabel: 'Chargeback', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'warning', count: 1 },
  { code: 'APPROVED', displayLabel: 'Approved', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'success', count: 1 },
  { code: 'IN_DOCUMENT_COLLECTION', displayLabel: 'In Document Collection', category: 'ACTIVE', subcategory: 'OTHER_ACTIVE', badgeColor: 'info', count: 1 },
]

// CLOSED > FULLY_PAID (1 status)
const FULLY_PAID_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'PAID_IN_FULL', displayLabel: 'Paid In Full', category: 'CLOSED', subcategory: 'FULLY_PAID', badgeColor: 'success', count: 3374 },
]

// CLOSED > CLAWED_BACK (10 statuses)
const CLAWED_BACK_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'DEFAULTED_SETTLED', displayLabel: 'Defaulted Settled', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 4786 },
  { code: 'CANCELED_SETTLED', displayLabel: 'Canceled Settled', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 1992 },
  { code: 'CHARGEBACK_SETTLED', displayLabel: 'Chargeback Settled', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 1226 },
  { code: 'DEFAULTED_PENDING_CLAWBACK', displayLabel: 'Defaulted Pending Clawback', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 387 },
  { code: 'CLAWBACK_COMPLETE', displayLabel: 'Clawback Complete', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 155 },
  { code: 'CANCELED_PENDING_CLAWBACK', displayLabel: 'Canceled Pending Clawback', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 76 },
  { code: 'CLAWBACK_IN_PROGRESS', displayLabel: 'Clawback In Progress', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'error', count: 31 },
  { code: 'CANCELED_PENDING_CANCELLATION', displayLabel: 'Canceled Pending Cancellation', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'warning', count: 7 },
  { code: 'CANCELED_PENDING_REFUND', displayLabel: 'Canceled Pending Refund', category: 'CLOSED', subcategory: 'CLAWED_BACK', badgeColor: 'warning', count: 2 },
]

// CLOSED > DECLINED (1 status)
const DECLINED_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'DECLINED', displayLabel: 'Declined', category: 'CLOSED', subcategory: 'DECLINED', badgeColor: 'gray', count: 8639 },
]

// CLOSED > OTHER_CLOSED (4 statuses)
const OTHER_CLOSED_STATUSES: Omit<StatusEntry, 'usageTier'>[] = [
  { code: 'DUPLICATE', displayLabel: 'Duplicate', category: 'CLOSED', subcategory: 'OTHER_CLOSED', badgeColor: 'gray', count: 812 },
  { code: 'WENT_DARK', displayLabel: 'Went Dark', category: 'CLOSED', subcategory: 'OTHER_CLOSED', badgeColor: 'gray', count: 199 },
  { code: 'SUBSCRIPTION_CANCELED', displayLabel: 'Subscription Canceled', category: 'CLOSED', subcategory: 'OTHER_CLOSED', badgeColor: 'gray', count: 168 },
  { code: 'ABANDONED_FORM', displayLabel: 'Abandoned Form', category: 'CLOSED', subcategory: 'OTHER_CLOSED', badgeColor: 'gray', count: 28 },
]

// =============================================================================
// COMBINED STATUS DATA
// =============================================================================

function addUsageTier(statuses: Omit<StatusEntry, 'usageTier'>[]): StatusEntry[] {
  return statuses.map(status => ({
    ...status,
    usageTier: getUsageTier(status.count),
  }))
}

export const STATUS_DATA: StatusEntry[] = [
  ...addUsageTier(HEALTHY_STATUSES),
  ...addUsageTier(AT_RISK_STATUSES),
  ...addUsageTier(OTHER_ACTIVE_STATUSES),
  ...addUsageTier(FULLY_PAID_STATUSES),
  ...addUsageTier(CLAWED_BACK_STATUSES),
  ...addUsageTier(DECLINED_STATUSES),
  ...addUsageTier(OTHER_CLOSED_STATUSES),
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getStatusesBySubcategory(subcategory: OrderSubcategory): StatusEntry[] {
  return STATUS_DATA.filter(s => s.subcategory === subcategory)
}

export function getStatusesByCategory(category: 'ACTIVE' | 'CLOSED'): StatusEntry[] {
  return STATUS_DATA.filter(s => s.category === category)
}

export function getTotalCount(): number {
  return STATUS_DATA.reduce((sum, s) => sum + s.count, 0)
}

export function getSubcategoryCounts(): Record<OrderSubcategory, { count: number; statusCount: number }> {
  const result = {} as Record<OrderSubcategory, { count: number; statusCount: number }>

  const subcategories: OrderSubcategory[] = [
    'HEALTHY', 'AT_RISK', 'OTHER_ACTIVE',
    'FULLY_PAID', 'CLAWED_BACK', 'DECLINED', 'OTHER_CLOSED'
  ]

  for (const sub of subcategories) {
    const statuses = getStatusesBySubcategory(sub)
    result[sub] = {
      count: statuses.reduce((sum, s) => sum + s.count, 0),
      statusCount: statuses.length,
    }
  }

  return result
}

export function getUsageTierCounts(): Record<UsageTier, { count: number; statuses: string[] }> {
  const tiers: UsageTier[] = ['high', 'medium', 'low', 'stale']
  const result = {} as Record<UsageTier, { count: number; statuses: string[] }>

  for (const tier of tiers) {
    const statuses = STATUS_DATA.filter(s => s.usageTier === tier)
    result[tier] = {
      count: statuses.length,
      statuses: statuses.map(s => s.code),
    }
  }

  return result
}
