"use strict";
/**
 * ClawbackTimer Component
 *
 * A lightweight battery indicator for displaying clawback countdown status.
 * Uses pure CSS for optimal rendering performance in table rows.
 *
 * @example
 * // Basic usage
 * <ClawbackTimer daysUntilClawback={9} />
 *
 * @example
 * // Custom size and label position
 * <ClawbackTimer daysUntilClawback={5} size="24" labelPosition="right" />
 *
 * @example
 * // No label
 * <ClawbackTimer daysUntilClawback={12} showLabel={false} />
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClawbackTimer = void 0;
const React = require("react");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
const utils_2 = require("./utils");
const battery_1 = require("./battery");
// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
const ClawbackTimer = ({ daysUntilClawback, size = config_1.DEFAULT_SIZE, showLabel = true, labelPosition = 'left', customLabel, thresholdDays = config_1.DEFAULT_THRESHOLD_DAYS, useAdaptiveColor = true, styleConfig, className, labelClassName, }) => {
    // Handle null/undefined - show empty state
    if (daysUntilClawback === null || daysUntilClawback === undefined) {
        return <div className={(0, utils_1.cn)('inline-block text-sm text-tertiary', className)}>—</div>;
    }
    const chargeLevel = (0, utils_2.calculateChargeLevel)(daysUntilClawback, thresholdDays);
    const label = showLabel ? (customLabel ?? (0, utils_2.formatBatteryLabel)(daysUntilClawback)) : undefined;
    return (<battery_1.Battery chargeLevel={chargeLevel} size={size} label={label} labelPosition={labelPosition === 'none' || !showLabel ? 'none' : labelPosition} useAdaptiveColor={useAdaptiveColor} styleConfig={styleConfig} className={className} labelClassName={labelClassName}/>);
};
exports.ClawbackTimer = ClawbackTimer;
//# sourceMappingURL=clawback-timer.js.map