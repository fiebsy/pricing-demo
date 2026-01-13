"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayCardStat = exports.DisplayCardMetric = void 0;
const React = require("react");
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const ArrowUp01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon");
const ArrowDown01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
// =============================================================================
// FORMAT UTILITIES
// =============================================================================
const formatValue = (value, format) => {
    if (typeof value === 'string')
        return value;
    switch (format) {
        case 'currency':
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        case 'number':
            return new Intl.NumberFormat('en-US').format(value);
        case 'percent':
            return `${value}%`;
        case 'none':
        default:
            return String(value);
    }
};
// =============================================================================
// METRIC COMPONENT
// =============================================================================
exports.DisplayCardMetric = (0, react_1.forwardRef)(({ value, label, labelPosition = 'above', trend, format = 'none', size = 'md', className, }, ref) => {
    const sizeConfig = config_1.metricSizeStyles[size];
    const formattedValue = formatValue(value, format);
    const trendColor = trend?.direction
        ? config_1.trendStyles[trend.direction]
        : config_1.trendStyles.neutral;
    return (<div ref={ref} className={(0, utils_1.cn)('flex flex-col', className)}>
        {/* Label above */}
        {label && labelPosition === 'above' && (<span className={(0, utils_1.cn)('text-tertiary mb-1', sizeConfig.label)}>{label}</span>)}

        {/* Value row with optional trend */}
        <div className="flex items-baseline gap-2">
          <span className={(0, utils_1.cn)('text-primary', sizeConfig.value)}>{formattedValue}</span>

          {trend && (<span className={(0, utils_1.cn)('flex items-center gap-0.5', trendColor, sizeConfig.trend)}>
              {trend.direction === 'up' && (<icon_1.HugeIcon icon={ArrowUp01Icon_1.default} size={sizeConfig.icon}/>)}
              {trend.direction === 'down' && (<icon_1.HugeIcon icon={ArrowDown01Icon_1.default} size={sizeConfig.icon}/>)}
              <span>{trend.value}%</span>
            </span>)}
        </div>

        {/* Label below */}
        {label && labelPosition === 'below' && (<span className={(0, utils_1.cn)('text-tertiary mt-1', sizeConfig.label)}>{label}</span>)}
      </div>);
});
exports.DisplayCardMetric.displayName = 'DisplayCard.Metric';
// =============================================================================
// STAT COMPONENT (simpler label + value pair)
// =============================================================================
exports.DisplayCardStat = (0, react_1.forwardRef)(({ label, value, format = 'none', className }, ref) => {
    const formattedValue = formatValue(value, format);
    return (<div ref={ref} className={(0, utils_1.cn)('flex flex-col gap-1', className)}>
        <span className="text-tertiary text-xs">{label}</span>
        <span className="text-primary text-lg font-medium">{formattedValue}</span>
      </div>);
});
exports.DisplayCardStat.displayName = 'DisplayCard.Stat';
//# sourceMappingURL=display-card-metric.js.map