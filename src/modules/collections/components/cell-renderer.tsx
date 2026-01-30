/**
 * Collections Dashboard - Cell Renderer
 *
 * Handles the hardened column set for partner collections.
 */

'use client'

import React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { ClawbackTimer } from '@/components/ui/core/feedback/clawback-timer'
import { Badge } from '@/components/ui/prod/base/badge'
import { Tooltip } from '@/components/ui/prod/base/tooltip'
import { PayProgressCircle } from './parts/pay-progress-circle'
import type { PartnerRiskItem } from '../types'
import { PaymentPlanType, RiskCategory } from '../types'
import RepeatIcon from '@hugeicons-pro/core-stroke-rounded/RepeatIcon'
import MoneyReceive01Icon from '@hugeicons-pro/core-stroke-rounded/MoneyReceive01Icon'

import { formatStatusContext, formatCurrency } from '../utils/formatters'

// =============================================================================
// FORMATTED AMOUNT COMPONENT (inline since we don't have the full design system)
// =============================================================================

const FormattedAmount = ({ amount }: { amount: number }) => {
  return <span className="tabular-nums">{formatCurrency(amount)}</span>
}

// =============================================================================
// CELL RENDERER
// =============================================================================

/**
 * Render cell content based on column key
 */
export const renderCell = (
  columnKey: string,
  item: PartnerRiskItem,
  _index: number
): React.ReactNode => {
  switch (columnKey) {
    case 'orderIdWithProgressNoClawback': {
      // Contract ID with mini progress circle
      const planTotal = item.planTotal ?? 0
      const remainingBalance = item.remainingBalance ?? 0
      const amountPaid = planTotal - remainingBalance

      return (
        <div className="flex items-center gap-2">
          <span className="text-tertiary text-sm tabular-nums">#{item.contractId}</span>
          <PayProgressCircle
            amountPaid={amountPaid}
            totalAmount={planTotal}
            size={16}
            strokeWidth={2}
            strokeColor="var(--color-fg-brand-secondary)"
            backgroundColor="var(--color-bg-quaternary)"
            showPercentageText={false}
            showAmountText={false}
          />
        </div>
      )
    }

    case 'route': {
      // Route type: FUNDING = Upfront, SERVICING = PAC (pay-as-collected)
      const planType = item.planType
      if (planType === PaymentPlanType.Funding) {
        return (
          <Badge size="xs" shape="rounded" color="success" iconLeading={MoneyReceive01Icon}>
            Upfront
          </Badge>
        )
      }
      if (planType === PaymentPlanType.Servicing) {
        return (
          <Badge size="xs" shape="rounded" color="info" iconLeading={RepeatIcon}>
            PAC
          </Badge>
        )
      }
      // Fallback for PENDING or unknown
      return (
        <Badge size="xs" shape="rounded" color="gray">
          —
        </Badge>
      )
    }

    case 'clawbackEstimate': {
      // For settled clawbacks: show actual clawback amount
      if (item.riskCategory === RiskCategory.SettledClawback) {
        const amount = item.clawbackAmount ?? 0
        if (amount === 0) {
          return <span className="text-quaternary">—</span>
        }
        return (
          <span className="text-tertiary">
            <FormattedAmount amount={amount} />
          </span>
        )
      }
      // For pre-clawback: show at-risk estimate
      const atRisk = item.atRiskFundedAmount ?? 0

      // Active clawback gets red/error text for non-zero
      if (item.riskCategory === RiskCategory.ActiveClawback) {
        return (
          <span className={atRisk === 0 ? 'text-tertiary' : 'text-error-primary'}>
            <FormattedAmount amount={atRisk} />
          </span>
        )
      }

      // Collections - warning color for non-zero
      return (
        <span className={atRisk === 0 ? 'text-tertiary' : 'text-warning-primary'}>
          <FormattedAmount amount={atRisk} />
        </span>
      )
    }

    case 'customer':
      return (
        <span className="text-primary block max-w-full truncate text-sm" title={item.customerEmail || 'No email'}>
          {item.customerEmail || 'No email'}
        </span>
      )

    case 'riskTier': {
      // Settled clawbacks - show clawed badge
      if (item.riskCategory === RiskCategory.SettledClawback) {
        return (
          <Badge size="xs" shape="rounded" color="gray">
            Clawed
          </Badge>
        )
      }
      // Active clawback - show last chance badge
      if (item.riskCategory === RiskCategory.ActiveClawback) {
        return (
          <Badge size="xs" shape="rounded" color="error">
            Last chance
          </Badge>
        )
      }
      // Collections - show collections badge
      return (
        <Badge size="xs" shape="rounded" color="warning">
          Collections
        </Badge>
      )
    }

    case 'clawbackBattery': {
      // Settled clawbacks - show dash (no timer needed)
      if (item.riskCategory === RiskCategory.SettledClawback) {
        return (
          <div className="flex items-center justify-end">
            <span className="text-quaternary text-xs">—</span>
          </div>
        )
      }

      // If in active clawback (expired), show empty battery with "Expired" label
      if (item.isInClawback) {
        return (
          <div className="flex items-center justify-end">
            <ClawbackTimer
              daysUntilClawback={0}
              size="32"
              showLabel={true}
              labelPosition="left"
              customLabel="Expired"
              labelClassName="!text-xs !font-medium !text-quaternary"
              styleConfig={{ cornerStyle: 'squircle', fillInset: 1 }}
            />
          </div>
        )
      }

      // Otherwise show ClawbackTimer battery countdown
      return (
        <div className="flex items-center justify-end">
          <ClawbackTimer
            daysUntilClawback={item.daysUntilClawback}
            size="32"
            showLabel={true}
            labelPosition="left"
            labelClassName="!text-xs !font-medium !text-quaternary"
            styleConfig={{ cornerStyle: 'squircle', fillInset: 1 }}
          />
        </div>
      )
    }

    case 'statusContext': {
      // Status context: descriptions with relative time
      const statusDescription = item.statusTransitionDescription
      const statusTooltip = item.statusTransitionTooltip
      const statusRelative = item.statusChangedRelative
      const previousStatus = item.previousStatus
      const currentStatus = String(item.status)

      // Format timestamp for tooltip
      const formattedTimestamp = item.statusChangedAt
        ? format(new Date(item.statusChangedAt), 'MMM d, h:mm a')
        : null

      // Use provided description or fallback to frontend computation
      const transition = statusDescription
        ? { condensed: statusDescription, tooltip: statusTooltip || '', raw: { from: previousStatus, to: currentStatus } }
        : formatStatusContext(previousStatus ?? null, currentStatus, null)

      // No audit data available
      if (!transition || !previousStatus) {
        return (
          <div className="space-y-0.5">
            <div className="text-tertiary text-xs">No audit data</div>
            <div className="text-quaternary text-xs">Pre-audit</div>
          </div>
        )
      }

      // Build tooltip description
      const tooltipDescription = (
        <>
          {formattedTimestamp && <span className="mb-1 block opacity-80">{formattedTimestamp}</span>}
          {transition.tooltip && <span className="mb-1.5 block">{transition.tooltip}</span>}
          <span className="block text-[10px] opacity-70">
            {transition.raw.from} → {transition.raw.to}
          </span>
        </>
      )

      return (
        <Tooltip title={transition.condensed} description={tooltipDescription} side="top" delay={200}>
          <div className="flex items-baseline gap-1.5">
            <span className="text-primary max-w-[180px] truncate text-xs">{transition.condensed}</span>
            {statusRelative && <span className="text-quaternary text-xs">{statusRelative}</span>}
          </div>
        </Tooltip>
      )
    }

    default:
      return null
  }
}
