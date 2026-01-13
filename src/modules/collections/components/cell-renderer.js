"use strict";
/**
 * Collections Dashboard - Cell Renderer
 *
 * Handles the hardened column set for partner collections.
 */
'use client';
/**
 * Collections Dashboard - Cell Renderer
 *
 * Handles the hardened column set for partner collections.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCell = void 0;
const react_1 = require("react");
const date_fns_1 = require("date-fns");
const clawback_timer_1 = require("@/components/ui/prod/base/clawback-timer");
const badge_1 = require("@/components/ui/prod/base/badge");
const tooltip_1 = require("@/components/ui/prod/base/tooltip");
const pay_progress_circle_1 = require("./parts/pay-progress-circle");
const types_1 = require("../types");
const RepeatIcon_1 = require("@hugeicons-pro/core-stroke-rounded/RepeatIcon");
const MoneyReceive01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/MoneyReceive01Icon");
const formatters_1 = require("../utils/formatters");
// =============================================================================
// FORMATTED AMOUNT COMPONENT (inline since we don't have the full design system)
// =============================================================================
const FormattedAmount = ({ amount }) => {
    return <span className="tabular-nums">{(0, formatters_1.formatCurrency)(amount)}</span>;
};
// =============================================================================
// CELL RENDERER
// =============================================================================
/**
 * Render cell content based on column key
 */
const renderCell = (columnKey, item, _index) => {
    switch (columnKey) {
        case 'orderIdWithProgressNoClawback': {
            // Contract ID with mini progress circle
            const planTotal = item.planTotal ?? 0;
            const remainingBalance = item.remainingBalance ?? 0;
            const amountPaid = planTotal - remainingBalance;
            return (<div className="flex items-center gap-2">
          <span className="text-tertiary text-sm tabular-nums">#{item.contractId}</span>
          <pay_progress_circle_1.PayProgressCircle amountPaid={amountPaid} totalAmount={planTotal} size={16} strokeWidth={2} strokeColor="var(--color-fg-brand-secondary)" backgroundColor="var(--color-bg-quaternary)" showPercentageText={false} showAmountText={false}/>
        </div>);
        }
        case 'route': {
            // Route type: FUNDING = Upfront, SERVICING = PAC (pay-as-collected)
            const planType = item.planType;
            if (planType === types_1.PaymentPlanType.Funding) {
                return (<badge_1.Badge size="xs" shape="rounded" color="success" iconLeading={MoneyReceive01Icon_1.default}>
            Upfront
          </badge_1.Badge>);
            }
            if (planType === types_1.PaymentPlanType.Servicing) {
                return (<badge_1.Badge size="xs" shape="rounded" color="info" iconLeading={RepeatIcon_1.default}>
            PAC
          </badge_1.Badge>);
            }
            // Fallback for PENDING or unknown
            return (<badge_1.Badge size="xs" shape="rounded" color="gray">
          —
        </badge_1.Badge>);
        }
        case 'clawbackEstimate': {
            // For settled clawbacks: show actual clawback amount
            if (item.riskCategory === types_1.RiskCategory.SettledClawback) {
                const amount = item.clawbackAmount ?? 0;
                if (amount === 0) {
                    return <span className="text-quaternary">—</span>;
                }
                return (<span className="text-tertiary">
            <FormattedAmount amount={amount}/>
          </span>);
            }
            // For pre-clawback: show at-risk estimate
            const atRisk = item.atRiskFundedAmount ?? 0;
            // Active clawback gets red/error text for non-zero
            if (item.riskCategory === types_1.RiskCategory.ActiveClawback) {
                return (<span className={atRisk === 0 ? 'text-tertiary' : 'text-error-primary'}>
            <FormattedAmount amount={atRisk}/>
          </span>);
            }
            // Collections - warning color for non-zero
            return (<span className={atRisk === 0 ? 'text-tertiary' : 'text-warning-primary'}>
          <FormattedAmount amount={atRisk}/>
        </span>);
        }
        case 'customer':
            return (<span className="text-primary block max-w-full truncate text-sm" title={item.customerEmail || 'No email'}>
          {item.customerEmail || 'No email'}
        </span>);
        case 'riskTier': {
            // Settled clawbacks - show clawed badge
            if (item.riskCategory === types_1.RiskCategory.SettledClawback) {
                return (<badge_1.Badge size="xs" shape="rounded" color="gray">
            Clawed
          </badge_1.Badge>);
            }
            // Active clawback - show last chance badge
            if (item.riskCategory === types_1.RiskCategory.ActiveClawback) {
                return (<badge_1.Badge size="xs" shape="rounded" color="error">
            Last chance
          </badge_1.Badge>);
            }
            // Collections - show collections badge
            return (<badge_1.Badge size="xs" shape="rounded" color="warning">
          Collections
        </badge_1.Badge>);
        }
        case 'clawbackBattery': {
            // Settled clawbacks - show dash (no timer needed)
            if (item.riskCategory === types_1.RiskCategory.SettledClawback) {
                return (<div className="flex items-center justify-end">
            <span className="text-quaternary text-xs">—</span>
          </div>);
            }
            // If in active clawback (expired), show empty battery with "Expired" label
            if (item.isInClawback) {
                return (<div className="flex items-center justify-end">
            <clawback_timer_1.ClawbackTimer daysUntilClawback={0} size="32" showLabel={true} labelPosition="left" customLabel="Expired" labelClassName="!text-xs !font-medium !text-quaternary" styleConfig={{ cornerStyle: 'squircle', fillInset: 1 }}/>
          </div>);
            }
            // Otherwise show ClawbackTimer battery countdown
            return (<div className="flex items-center justify-end">
          <clawback_timer_1.ClawbackTimer daysUntilClawback={item.daysUntilClawback} size="32" showLabel={true} labelPosition="left" labelClassName="!text-xs !font-medium !text-quaternary" styleConfig={{ cornerStyle: 'squircle', fillInset: 1 }}/>
        </div>);
        }
        case 'statusContext': {
            // Status context: descriptions with relative time
            const statusDescription = item.statusTransitionDescription;
            const statusTooltip = item.statusTransitionTooltip;
            const statusRelative = item.statusChangedRelative;
            const previousStatus = item.previousStatus;
            const currentStatus = String(item.status);
            // Format timestamp for tooltip
            const formattedTimestamp = item.statusChangedAt
                ? (0, date_fns_1.format)(new Date(item.statusChangedAt), 'MMM d, h:mm a')
                : null;
            // Use provided description or fallback to frontend computation
            const transition = statusDescription
                ? { condensed: statusDescription, tooltip: statusTooltip || '', raw: { from: previousStatus, to: currentStatus } }
                : (0, formatters_1.formatStatusContext)(previousStatus ?? null, currentStatus, null);
            // No audit data available
            if (!transition || !previousStatus) {
                return (<div className="space-y-0.5">
            <div className="text-tertiary text-xs">No audit data</div>
            <div className="text-quaternary text-xs">Pre-audit</div>
          </div>);
            }
            // Build tooltip description
            const tooltipDescription = (<>
          {formattedTimestamp && <span className="mb-1 block opacity-80">{formattedTimestamp}</span>}
          {transition.tooltip && <span className="mb-1.5 block">{transition.tooltip}</span>}
          <span className="block text-[10px] opacity-70">
            {transition.raw.from} → {transition.raw.to}
          </span>
        </>);
            return (<tooltip_1.Tooltip title={transition.condensed} description={tooltipDescription} side="top" delay={200}>
          <div className="flex items-baseline gap-1.5">
            <span className="text-primary max-w-[180px] truncate text-xs">{transition.condensed}</span>
            {statusRelative && <span className="text-quaternary text-xs">{statusRelative}</span>}
          </div>
        </tooltip_1.Tooltip>);
        }
        default:
            return null;
    }
};
exports.renderCell = renderCell;
//# sourceMappingURL=cell-renderer.js.map