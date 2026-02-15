/**
 * Status Categories Mapping
 *
 * Maps status codes to their subcategories.
 * Ported from backend/src/modules/v2/partner-orders/config/status-categories.ts
 */

import type { OrderSubcategory } from './types'

// =============================================================================
// CATEGORY ARRAYS
// =============================================================================

const HEALTHY_STATUSES = [
  'FUNDING_IN_REPAYMENT',
  'SERVICING_IN_REPAYMENT',
  'IN_REPAYMENT',
  'FUNDING_MODIFIED_PAYMENT',
  'SERVICING_MODIFIED_PAYMENT',
  'FUNDING_PAUSED_PAYMENT',
  'SERVICING_PAUSED_PAYMENT',
  'FUNDING_ON_HOLD',
  'FUNDED',
]

const AT_RISK_STATUSES = [
  'FUNDING_IN_COLLECTIONS',
  'SERVICING_IN_COLLECTIONS',
  'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK',
  'IN_COLLECTIONS_FUTURE_PAYMENT',
  'IN_COLLECTIONS_PENDING_PAYMENT',
  'DEFAULTED',
  'REQUESTING_CANCELLATION',
  'CHARGEBACK_PENDING_CLAWBACK',
]

const OTHER_ACTIVE_STATUSES = [
  'MANUAL_REVIEW',
  'IN_UNDERWRITING',
  'UNDERWRITING_COMPLETE',
  'FUNDING_PARTICIPATION_PENDING',
  'SERVICING_PARTICIPATION_PENDING',
  'FUNDING_ENTER_FIRST_PAYMENT',
  'SERVICING_ENTER_FIRST_PAYMENT',
  'FUNDING_TO_BE_SENT',
  'APPLICATION_IN_PROGRESS',
  'ACTIVATING',
  'APPROVED',
  'IN_DOCUMENT_COLLECTION',
  'CREDIT_LOCKED',
  'FAILED_PAYMENT',
  'UNKNOWN',
]

const FULLY_PAID_STATUSES = ['PAID_IN_FULL']

const CLAWED_BACK_STATUSES = [
  'DEFAULTED_SETTLED',
  'CANCELED_SETTLED',
  'CHARGEBACK_SETTLED',
  'CLAWBACK_COMPLETE',
  'CLAWBACK_IN_PROGRESS',
  'DEFAULTED_PENDING_CLAWBACK',
  'CANCELED_PENDING_CLAWBACK',
  'CANCELED_PENDING_CANCELLATION',
  'CANCELED_PENDING_REFUND',
]

const DECLINED_STATUSES = ['DECLINED']

const OTHER_CLOSED_STATUSES = [
  'DUPLICATE',
  'WENT_DARK',
  'SUBSCRIPTION_CANCELED',
  'ABANDONED_FORM',
]

// =============================================================================
// STATUS TO CATEGORY LOOKUP
// =============================================================================

const STATUS_TO_CATEGORY: Record<string, OrderSubcategory> = {}

HEALTHY_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'HEALTHY'
})
AT_RISK_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'AT_RISK'
})
OTHER_ACTIVE_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'OTHER_ACTIVE'
})
FULLY_PAID_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'FULLY_PAID'
})
CLAWED_BACK_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'CLAWED_BACK'
})
DECLINED_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'DECLINED'
})
OTHER_CLOSED_STATUSES.forEach((s) => {
  STATUS_TO_CATEGORY[s] = 'OTHER_CLOSED'
})

// =============================================================================
// EXPORTS
// =============================================================================

export function getStatusCategory(status: string): OrderSubcategory | null {
  return STATUS_TO_CATEGORY[status] || null
}

export const SUBCATEGORY_LABELS: Record<OrderSubcategory, string> = {
  HEALTHY: 'Healthy',
  AT_RISK: 'At Risk',
  OTHER_ACTIVE: 'Other Active',
  FULLY_PAID: 'Fully Paid',
  CLAWED_BACK: 'Clawed Back',
  DECLINED: 'Declined',
  OTHER_CLOSED: 'Other Closed',
}

export const SUBCATEGORY_COLORS: Record<OrderSubcategory, string> = {
  HEALTHY: 'success',
  AT_RISK: 'warning',
  OTHER_ACTIVE: 'info',
  FULLY_PAID: 'success',
  CLAWED_BACK: 'error',
  DECLINED: 'gray',
  OTHER_CLOSED: 'gray',
}
