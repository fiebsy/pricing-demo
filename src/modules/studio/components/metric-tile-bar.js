"use strict";
/**
 * MetricTileBar Component for Studio Audience
 *
 * Audience engagement metric cards that filter the table by category on click.
 * Uses prod MetricCard with METRIC_CARD_PRESETS.flat for hardened styling.
 *
 * Metrics:
 * - Total Active Users: Users with Active status
 * - Total Messages: Aggregate across all users
 * - Avg Messages / User: Total / Active users
 * - Most Engaged Users: Users with 50+ messages
 */
'use client';
/**
 * MetricTileBar Component for Studio Audience
 *
 * Audience engagement metric cards that filter the table by category on click.
 * Uses prod MetricCard with METRIC_CARD_PRESETS.flat for hardened styling.
 *
 * Metrics:
 * - Total Active Users: Users with Active status
 * - Total Messages: Aggregate across all users
 * - Avg Messages / User: Total / Active users
 * - Most Engaged Users: Users with 50+ messages
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricTileBar = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const metric_card_1 = require("@/components/ui/prod/features/metric-card");
// =============================================================================
// COMPONENT
// =============================================================================
const MetricTileBar = ({ activeMetric, onMetricClick, metrics, className, }) => {
    const [hoveredId, setHoveredId] = (0, react_1.useState)(null);
    // Format metrics for display
    const metricValues = (0, react_1.useMemo)(() => {
        return [
            {
                id: 'totalActive',
                label: 'Total Active Users',
                value: metrics.totalActiveUsers.toLocaleString(),
                subtext: 'from last 30 days',
                trend: {
                    value: Math.abs(metrics.activeUsersChange),
                    direction: metrics.activeUsersChange >= 0 ? 'up' : 'down',
                },
            },
            {
                id: 'totalMessages',
                label: 'Total Messages',
                value: metrics.totalMessages.toLocaleString(),
                subtext: 'from last 30 days',
                trend: {
                    value: Math.abs(metrics.messagesChange),
                    direction: metrics.messagesChange >= 0 ? 'up' : 'down',
                },
            },
            {
                id: 'avgMessages',
                label: 'Avg Messages / User',
                value: metrics.avgMessagesPerUser.toFixed(1),
                subtext: 'from last 30 days',
                trend: {
                    value: Math.abs(metrics.avgMessagesChange),
                    direction: metrics.avgMessagesChange >= 0 ? 'up' : 'down',
                },
            },
            {
                id: 'mostEngaged',
                label: 'Most Engaged Users',
                value: metrics.mostEngagedUsers.toLocaleString(),
                subtext: 'from last 30 days',
                trend: {
                    value: Math.abs(metrics.engagedUsersChange),
                    direction: metrics.engagedUsersChange >= 0 ? 'up' : 'down',
                },
            },
        ];
    }, [metrics]);
    return (<div className={(0, utils_1.cn)('grid grid-cols-2 gap-3 lg:grid-cols-4', className)}>
      {metricValues.map((metric) => (<metric_card_1.MetricCard key={metric.id} label={metric.label} value={metric.value} count={metric.subtext} trend={metric.trend} config={metric_card_1.METRIC_CARD_PRESETS.flat} isActive={activeMetric === metric.id} isHovered={hoveredId === metric.id} onClick={() => onMetricClick(metric.id)} onMouseEnter={() => setHoveredId(metric.id)} onMouseLeave={() => setHoveredId(null)}/>))}
    </div>);
};
exports.MetricTileBar = MetricTileBar;
exports.MetricTileBar.displayName = 'MetricTileBar';
//# sourceMappingURL=metric-tile-bar.js.map