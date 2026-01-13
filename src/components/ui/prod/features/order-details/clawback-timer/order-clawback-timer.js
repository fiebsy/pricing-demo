"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderClawbackTimer = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const clawback_timer_1 = require("../../../base/clawback-timer");
const use_clawback_days_1 = require("./hooks/use-clawback-days");
// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const OrderClawbackTimer = ({ order, size = '24', showLabel = true, labelPosition = 'left', customLabel, thresholdDays = 15, useAdaptiveColor = true, styleConfig, className, labelClassName, emptyState = 'dash', }) => {
    const { daysUntilClawback, shouldShowTimer, displayState } = (0, use_clawback_days_1.useClawbackDays)(order);
    // Handle empty state when no clawback data
    if (!shouldShowTimer) {
        if (emptyState === 'hidden' || emptyState === 'none') {
            return null;
        }
        // Default: show dash
        return <span className={(0, utils_1.cn)('text-sm text-tertiary', className)}>—</span>;
    }
    // Override label for clawback state
    const label = displayState === 'clawback' && !customLabel ? 'Clawback' : customLabel;
    return (<clawback_timer_1.ClawbackTimer daysUntilClawback={daysUntilClawback} size={size} showLabel={showLabel} labelPosition={labelPosition} customLabel={label} thresholdDays={thresholdDays} useAdaptiveColor={useAdaptiveColor} styleConfig={styleConfig} className={className} labelClassName={labelClassName}/>);
};
exports.OrderClawbackTimer = OrderClawbackTimer;
//# sourceMappingURL=order-clawback-timer.js.map