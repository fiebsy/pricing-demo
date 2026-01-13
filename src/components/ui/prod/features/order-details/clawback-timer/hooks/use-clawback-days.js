"use strict";
/**
 * useClawbackDays Hook
 *
 * Extracts and normalizes clawback countdown data from order objects.
 * Handles edge cases like active clawbacks and expired timers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClawbackDays = void 0;
const react_1 = require("react");
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
function useClawbackDays(order) {
    return (0, react_1.useMemo)(() => {
        // No order data
        if (!order) {
            return {
                daysUntilClawback: null,
                isInClawback: false,
                shouldShowTimer: false,
                displayState: 'none',
            };
        }
        const { daysUntilClawback, isInClawback, riskCategory } = order;
        // Determine if in active clawback from multiple sources
        const inClawback = isInClawback === true ||
            riskCategory === 'ACTIVE_CLAWBACK' ||
            riskCategory === 'CLAWBACK_RISK';
        // Active clawback state - show timer at 0 to indicate expired
        if (inClawback && (daysUntilClawback === null || daysUntilClawback === undefined)) {
            return {
                daysUntilClawback: 0,
                isInClawback: true,
                shouldShowTimer: true,
                displayState: 'clawback',
            };
        }
        // No countdown data available
        if (daysUntilClawback === null || daysUntilClawback === undefined) {
            return {
                daysUntilClawback: null,
                isInClawback: false,
                shouldShowTimer: false,
                displayState: 'none',
            };
        }
        // Normal countdown state
        return {
            daysUntilClawback,
            isInClawback: inClawback || daysUntilClawback <= 0,
            shouldShowTimer: true,
            displayState: daysUntilClawback <= 0 ? 'clawback' : 'countdown',
        };
    }, [order]);
}
exports.useClawbackDays = useClawbackDays;
//# sourceMappingURL=use-clawback-days.js.map