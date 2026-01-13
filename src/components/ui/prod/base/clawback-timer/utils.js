"use strict";
/**
 * ClawbackTimer Utility Functions
 *
 * Helper functions for calculations and formatting.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorState = exports.formatBatteryLabel = exports.calculateChargeLevel = void 0;
const config_1 = require("./config");
/**
 * Calculate charge level from days remaining.
 * @param daysRemaining - Days until clawback
 * @param thresholdDays - Days representing 100% charge
 * @returns Charge level 0-100
 */
function calculateChargeLevel(daysRemaining, thresholdDays) {
    return Math.max(0, Math.min(100, Math.round((daysRemaining / thresholdDays) * 100)));
}
exports.calculateChargeLevel = calculateChargeLevel;
/**
 * Format the battery label based on days remaining.
 * @param days - Days until clawback
 * @returns Formatted label string (e.g., "9d left")
 */
function formatBatteryLabel(days) {
    if (days === 0)
        return '0d';
    return `${days}d left`;
}
exports.formatBatteryLabel = formatBatteryLabel;
/**
 * Determine color state based on charge level.
 * @param chargeLevel - Current charge level 0-100
 * @returns Color state for styling
 */
function getColorState(chargeLevel) {
    if (chargeLevel < config_1.COLOR_THRESHOLDS.critical)
        return 'error';
    if (chargeLevel > config_1.COLOR_THRESHOLDS.healthy)
        return 'success';
    return 'warning';
}
exports.getColorState = getColorState;
//# sourceMappingURL=utils.js.map