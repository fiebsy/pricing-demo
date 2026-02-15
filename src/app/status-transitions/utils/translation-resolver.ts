/**
 * Translation Resolver
 *
 * Ported from backend/src/common/utils/internal-collections/status-transition-descriptions.ts
 * Resolves status transition descriptions with coverage type tracking.
 */

import type { StatusTransitionDescription, CoverageType } from '../config/types'

// =============================================================================
// SHARED DESCRIPTION FACTORIES
// =============================================================================

const SHARED = {
  orderActivated: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Order now active',
    tooltip,
  }),
  sentForReview: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Sent for review',
    tooltip,
  }),
  enteredCollections: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Entered collections',
    tooltip,
  }),
  paymentCleared: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Payment cleared',
    tooltip,
  }),
  futurePaymentScheduled: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Future payment scheduled',
    tooltip,
  }),
  paymentsPaused: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Payments paused',
    tooltip,
  }),
  paymentScheduled: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Payment scheduled',
    tooltip,
  }),
  paymentPlanModified: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Payment plan modified',
    tooltip,
  }),
  customerWantsOut: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Customer wants out',
    tooltip,
  }),
  chargebackFiled: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Chargeback filed',
    tooltip,
  }),
  bankDebitInitiated: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Bank debit initiated',
    tooltip,
  }),
  debitFailedRetry: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Debit failed, retry',
    tooltip,
  }),
  canceledOwesMoney: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Canceled, owes money',
    tooltip,
  }),
  markedAsDuplicate: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Marked as duplicate',
    tooltip,
  }),
  resetForChanges: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Reset for changes',
    tooltip,
  }),
  statusCorrection: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Status correction',
    tooltip,
  }),
  paidOff: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Paid off',
    tooltip,
  }),
  refundNeeded: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Refund needed',
    tooltip,
  }),
  additionalClawback: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Additional clawback',
    tooltip,
  }),
  cancellationPending: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Cancellation pending',
    tooltip,
  }),
  modifiedPlanFailed: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Modified plan failed',
    tooltip,
  }),
  paymentFailed: (tooltip: string): StatusTransitionDescription => ({
    condensed: 'Payment failed',
    tooltip,
  }),
} as const

// =============================================================================
// SPECIFIC TRANSITIONS MAP
// =============================================================================

const SPECIFIC_TRANSITIONS: Record<
  string,
  Record<string, StatusTransitionDescription>
> = {
  FUNDING_PARTICIPATION_PENDING: {
    FUNDING_ENTER_FIRST_PAYMENT: {
      condensed: 'Syndicates added, awaiting payment',
      tooltip: 'Order approved, waiting for customer first payment',
    },
    SERVICING_PARTICIPATION_PENDING: {
      condensed: 'Switched to PAC',
      tooltip: 'Order switched from Upfront to Pay As Collected',
    },
  },
  SERVICING_PARTICIPATION_PENDING: {
    FUNDING_PARTICIPATION_PENDING: {
      condensed: 'Switched to Upfront',
      tooltip: 'Order switched from PAC to Upfront',
    },
  },
  FUNDING_ENTER_FIRST_PAYMENT: {
    FUNDED: {
      condensed: 'First payment received',
      tooltip: 'Customer made first payment, order now processing',
    },
    FUNDING_TO_BE_SENT: {
      condensed: 'Payment cleared, ready to fund',
      tooltip: 'First payment cleared, merchant funding queued',
    },
    FUNDING_ON_HOLD: {
      condensed: 'Funding on hold',
      tooltip: 'Funding delayed, order on hold',
    },
  },
  FUNDED: {
    FUNDING_TO_BE_SENT: {
      condensed: 'Ready to send funds',
      tooltip: 'Order cleared, merchant funding ready to send',
    },
    SERVICING_PARTICIPATION_PENDING: {
      condensed: 'Switched to PAC',
      tooltip: 'Order switched from Upfront to Pay As Collected',
    },
  },
  FAILED_PAYMENT: {
    FUNDING_IN_REPAYMENT: {
      condensed: 'False alarm, cleared',
      tooltip: 'Payment initially failed but then cleared',
    },
    SERVICING_IN_REPAYMENT: {
      condensed: 'False alarm, cleared',
      tooltip: 'Payment initially failed but then cleared',
    },
    IN_COLLECTIONS_PENDING_PAYMENT: {
      condensed: 'Payment rescheduled',
      tooltip: 'Failed payment rescheduled with customer',
    },
  },
  FUNDING_IN_COLLECTIONS: {
    FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK: {
      condensed: 'Risk escalated',
      tooltip: 'Order at high risk of clawback (10-15 days in collections)',
    },
    PAID_IN_FULL: {
      condensed: 'Paid off in collections',
      tooltip: 'Customer paid full balance while in collections',
    },
  },
  SERVICING_IN_COLLECTIONS: {
    PAID_IN_FULL: {
      condensed: 'Paid off in collections',
      tooltip: 'Customer paid full balance while in collections',
    },
    DEFAULTED_SETTLED: {
      condensed: 'Default settled (PAC)',
      tooltip: 'PAC order defaulted - no clawback needed',
    },
    CANCELED_SETTLED: {
      condensed: 'Cancel settled (PAC)',
      tooltip: 'PAC order canceled - no clawback needed',
    },
  },
  FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK: {
    FUNDING_IN_REPAYMENT: {
      condensed: 'Recovered from high risk',
      tooltip: 'Customer paid, order saved from clawback',
    },
    IN_COLLECTIONS_FUTURE_PAYMENT: SHARED.futurePaymentScheduled(
      'Customer agreed to payment, avoiding clawback'
    ),
    FUNDING_MODIFIED_PAYMENT: SHARED.paymentPlanModified(
      'New arrangement to avoid clawback'
    ),
  },
  IN_COLLECTIONS_FUTURE_PAYMENT: {
    IN_COLLECTIONS_PENDING_PAYMENT: {
      condensed: 'Payment date approaching',
      tooltip: 'Scheduled payment date is near',
    },
  },
  REQUESTING_CANCELLATION: {
    CANCELED_PENDING_CLAWBACK: {
      condensed: 'Approved, owes money',
      tooltip: 'Cancellation approved, partner owes clawback',
    },
    CANCELED_PENDING_CANCELLATION: {
      condensed: 'Cancellation review',
      tooltip: 'Cancellation under review',
    },
  },
  CANCELED_PENDING_CANCELLATION: {
    CANCELED_SETTLED: {
      condensed: 'Cancellation settled',
      tooltip: 'Cancellation completed, no clawback needed',
    },
    CANCELED_PENDING_CLAWBACK: {
      condensed: 'Clawback needed',
      tooltip: 'Cancellation requires partner clawback',
    },
  },
  CANCELED_PENDING_CLAWBACK: {
    CLAWBACK_COMPLETE: {
      condensed: 'Cancel clawback done',
      tooltip: 'Cancellation clawback processed successfully',
    },
    CANCELED_SETTLED: {
      condensed: 'Cancel settled (payout)',
      tooltip: 'Cancellation clawback offset from future payouts',
    },
  },
  CHARGEBACK_PENDING_CLAWBACK: {
    CLAWBACK_COMPLETE: {
      condensed: 'Chargeback clawback done',
      tooltip: 'Chargeback clawback processed successfully',
    },
    CHARGEBACK_SETTLED: {
      condensed: 'Chargeback settled (payout)',
      tooltip: 'Chargeback clawback offset from future payouts',
    },
  },
  DEFAULTED_PENDING_CLAWBACK: {
    CLAWBACK_COMPLETE: {
      condensed: 'Default clawback done',
      tooltip: 'Default clawback processed successfully',
    },
    DEFAULTED_SETTLED: {
      condensed: 'Default settled (payout)',
      tooltip: 'Default clawback offset from future payouts',
    },
  },
  CLAWBACK_IN_PROGRESS: {
    CLAWBACK_COMPLETE: {
      condensed: 'Debit cleared',
      tooltip: 'Partner bank debit cleared successfully',
    },
    DEFAULTED_SETTLED: {
      condensed: 'Default settled (bank)',
      tooltip: 'Default clawback debited from partner bank',
    },
    CHARGEBACK_SETTLED: {
      condensed: 'Chargeback settled (bank)',
      tooltip: 'Chargeback clawback debited from partner bank',
    },
    CANCELED_SETTLED: {
      condensed: 'Cancel settled (bank)',
      tooltip: 'Cancellation clawback debited from partner bank',
    },
  },
}

// =============================================================================
// SEMANTIC RULES
// =============================================================================

const getPrefix = (status: string) =>
  status.startsWith('FUNDING') ? 'Upfront' : 'PAC'

const RULES: Array<{
  test(fromStatus: string, toStatus: string): boolean
  get(fromStatus: string, toStatus: string): StatusTransitionDescription
}> = [
  {
    test: (_, toStatus) => toStatus === 'PAID_IN_FULL',
    get: () => SHARED.paidOff('Customer paid balance in full'),
  },
  {
    test: (_, toStatus) => toStatus === 'DUPLICATE',
    get: () => SHARED.markedAsDuplicate('Order identified as duplicate'),
  },
  {
    test: (_, toStatus) => toStatus === 'REQUESTING_CANCELLATION',
    get: () => SHARED.customerWantsOut('Customer requested to cancel order'),
  },
  {
    test: (_, toStatus) => toStatus === 'MANUAL_REVIEW',
    get: () => SHARED.sentForReview('Order requires additional manual review'),
  },
  {
    test: (_, toStatus) => toStatus === 'IN_UNDERWRITING',
    get: () => SHARED.sentForReview('Order requires underwriting review'),
  },
  {
    test: (_, toStatus) => toStatus === 'CLAWBACK_IN_PROGRESS',
    get: () =>
      SHARED.bankDebitInitiated(
        'Partner bank account debit in progress (3-4 days)'
      ),
  },
  {
    test: (_, toStatus) => toStatus.includes('PAUSED_PAYMENT'),
    get: (_, toStatus) =>
      SHARED.paymentsPaused(
        `${getPrefix(toStatus)} payments temporarily paused`
      ),
  },
  {
    test: (_, toStatus) => toStatus.includes('MODIFIED_PAYMENT'),
    get: () =>
      SHARED.paymentPlanModified('Customer payment arrangement changed'),
  },
  {
    test: (_, toStatus) => toStatus.includes('PENDING_REFUND'),
    get: () => SHARED.refundNeeded('Order canceled, customer refund required'),
  },
  {
    test: (_, toStatus) => toStatus.includes('PENDING_CANCELLATION'),
    get: () => SHARED.cancellationPending('Cancellation in review'),
  },
  {
    test: (fromStatus, toStatus) =>
      fromStatus.includes('IN_REPAYMENT') && toStatus === 'FAILED_PAYMENT',
    get: () => SHARED.paymentFailed('Customer payment failed, pending review'),
  },
  {
    test: (fromStatus, toStatus) =>
      !fromStatus.includes('COLLECTIONS') && toStatus.includes('IN_COLLECTIONS'),
    get: () => SHARED.enteredCollections('Order moved to collections'),
  },
  {
    test: (fromStatus, toStatus) =>
      fromStatus.includes('COLLECTIONS') && toStatus.includes('IN_REPAYMENT'),
    get: () => ({
      condensed: 'Payment cleared, recovered',
      tooltip: 'Customer payment cleared, order returned to active',
    }),
  },
  {
    test: (_, toStatus) => toStatus === 'IN_COLLECTIONS_FUTURE_PAYMENT',
    get: () =>
      SHARED.futurePaymentScheduled(
        'Customer agreed to make payment on future date'
      ),
  },
  {
    test: (_, toStatus) => toStatus === 'IN_COLLECTIONS_PENDING_PAYMENT',
    get: () => SHARED.paymentScheduled('Customer scheduled a payment'),
  },
  {
    test: (fromStatus, toStatus) =>
      fromStatus.includes('IN_REPAYMENT') && toStatus.includes('PENDING_CLAWBACK'),
    get: () =>
      SHARED.canceledOwesMoney('Order canceled, partner owes clawback'),
  },
]

// =============================================================================
// HUMANIZE HELPER
// =============================================================================

function humanize(status: string): string {
  return status
    .replace(/^(FUNDING_|SERVICING_)/, '')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// =============================================================================
// MAIN RESOLVER
// =============================================================================

export interface ResolvedTranslation extends StatusTransitionDescription {
  source: CoverageType
}

export function resolveTranslation(
  fromStatus: string,
  toStatus: string
): ResolvedTranslation {
  // 1. Check specific transitions
  const specific = SPECIFIC_TRANSITIONS[fromStatus]?.[toStatus]
  if (specific) {
    return { ...specific, source: 'specific' }
  }

  // 2. Check semantic rules
  const foundRule = RULES.find((rule) => rule.test(fromStatus, toStatus))
  if (foundRule) {
    return { ...foundRule.get(fromStatus, toStatus), source: 'semantic' }
  }

  // 3. Fallback to auto-generated
  return {
    condensed: `${humanize(fromStatus)} → ${humanize(toStatus)}`,
    tooltip: `Status changed from ${fromStatus} to ${toStatus}`,
    source: 'fallback',
  }
}

// =============================================================================
// COVERAGE STATISTICS
// =============================================================================

export function countSpecificTransitions(): number {
  let count = 0
  for (const fromStatus in SPECIFIC_TRANSITIONS) {
    count += Object.keys(SPECIFIC_TRANSITIONS[fromStatus]).length
  }
  return count
}

export function countSemanticRules(): number {
  return RULES.length
}
