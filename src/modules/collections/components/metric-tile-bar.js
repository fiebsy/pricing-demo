"use strict";
/**
 * MetricTileBar Component for Collections
 *
 * Risk activity metric cards that filter the table by status on click.
 * Uses prod MetricCard with METRIC_CARD_PRESETS.flat for hardened styling.
 *
 * Metrics:
 * - At risk: Collections + Last Chance combined (dollar value primary)
 * - Last chance: Contracts in active clawback (dollar value primary)
 * - Settled: Clawed back contracts (dollar value primary)
 * - Default rate: 30-day rate with all-time comparison
 */
'use client';
/**
 * MetricTileBar Component for Collections
 *
 * Risk activity metric cards that filter the table by status on click.
 * Uses prod MetricCard with METRIC_CARD_PRESETS.flat for hardened styling.
 *
 * Metrics:
 * - At risk: Collections + Last Chance combined (dollar value primary)
 * - Last chance: Contracts in active clawback (dollar value primary)
 * - Settled: Clawed back contracts (dollar value primary)
 * - Default rate: 30-day rate with all-time comparison
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricTileBar = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const metric_card_1 = require("@/components/ui/prod/features/metric-card");
// =============================================================================
// CURRENCY FORMATTER
// =============================================================================
const formatCurrency = (amount) => {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toFixed(0)}`;
};
// =============================================================================
// COMPONENT
// =============================================================================
const MetricTileBar = ({ activeMetric, onMetricClick, metrics, className, }) => {
    const [hoveredId, setHoveredId] = (0, react_1.useState)(null);
    // Compute metric values from pre-calculated metrics
    const metricValues = (0, react_1.useMemo)(() => {
        const atRiskCount = metrics.collectionsCount + metrics.activeClawbackCount;
        const atRiskAmount = metrics.collectionsAmount + metrics.activeClawbackAmount;
        return [
            {
                id: 'atRisk',
                label: 'At risk',
                value: formatCurrency(atRiskAmount),
                subtext: `${atRiskCount} orders`,
            },
            {
                id: 'clawback',
                label: 'Last chance',
                value: formatCurrency(metrics.activeClawbackAmount),
                subtext: `${metrics.activeClawbackCount} orders`,
            },
            {
                id: 'settled',
                label: 'Clawed back',
                value: formatCurrency(metrics.settledClawbackAmount),
                subtext: `${metrics.settledClawbackCount} orders`,
            },
        ];
    }, [metrics]);
    // Format default rate for display
    const formatRate = (rate) => {
        if (rate == null || isNaN(rate))
            return 'N/A';
        return `${rate.toFixed(1)}%`;
    };
    const defaultRateDisplay = formatRate(metrics?.defaultRateAllTime);
    const defaultedCountDisplay = metrics?.defaultedOrdersCount ?? 0;
    return (<div className={(0, utils_1.cn)('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
      {metricValues.map((metric) => (<metric_card_1.MetricCard key={metric.id} label={metric.label} value={metric.value} count={metric.subtext} config={metric_card_1.METRIC_CARD_PRESETS.flat} isActive={activeMetric === metric.id} isHovered={hoveredId === metric.id} onClick={() => onMetricClick(metric.id)} onMouseEnter={() => setHoveredId(metric.id)} onMouseLeave={() => setHoveredId(null)}/>))}
      {/* Default Rate - Clickable to filter by defaulted orders */}
      <metric_card_1.MetricCard label="Default rate" value={defaultRateDisplay} count={`${defaultedCountDisplay} orders`} config={metric_card_1.METRIC_CARD_PRESETS.flat} isActive={activeMetric === 'defaulted'} isHovered={hoveredId === 'defaulted'} onClick={() => onMetricClick('defaulted')} onMouseEnter={() => setHoveredId('defaulted')} onMouseLeave={() => setHoveredId(null)}/>
    </div>);
};
exports.MetricTileBar = MetricTileBar;
exports.MetricTileBar.displayName = 'MetricTileBar';
//# sourceMappingURL=metric-tile-bar.js.map