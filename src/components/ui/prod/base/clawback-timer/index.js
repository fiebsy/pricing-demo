"use strict";
/**
 * ClawbackTimer - Public API
 *
 * A lightweight battery indicator for displaying clawback countdown status.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorState = exports.formatBatteryLabel = exports.calculateChargeLevel = exports.DEFAULT_SIZE = exports.DEFAULT_THRESHOLD_DAYS = exports.LABEL_CLASSES = exports.BORDER_COLORS = exports.FILL_COLORS = exports.COLOR_THRESHOLDS = exports.SIZE_CONFIGS = exports.Battery = exports.ClawbackTimer = void 0;
// Main component
var clawback_timer_1 = require("./clawback-timer");
Object.defineProperty(exports, "ClawbackTimer", { enumerable: true, get: function () { return clawback_timer_1.ClawbackTimer; } });
// Internal component (for advanced use)
var battery_1 = require("./battery");
Object.defineProperty(exports, "Battery", { enumerable: true, get: function () { return battery_1.Battery; } });
// Configuration
var config_1 = require("./config");
Object.defineProperty(exports, "SIZE_CONFIGS", { enumerable: true, get: function () { return config_1.SIZE_CONFIGS; } });
Object.defineProperty(exports, "COLOR_THRESHOLDS", { enumerable: true, get: function () { return config_1.COLOR_THRESHOLDS; } });
Object.defineProperty(exports, "FILL_COLORS", { enumerable: true, get: function () { return config_1.FILL_COLORS; } });
Object.defineProperty(exports, "BORDER_COLORS", { enumerable: true, get: function () { return config_1.BORDER_COLORS; } });
Object.defineProperty(exports, "LABEL_CLASSES", { enumerable: true, get: function () { return config_1.LABEL_CLASSES; } });
Object.defineProperty(exports, "DEFAULT_THRESHOLD_DAYS", { enumerable: true, get: function () { return config_1.DEFAULT_THRESHOLD_DAYS; } });
Object.defineProperty(exports, "DEFAULT_SIZE", { enumerable: true, get: function () { return config_1.DEFAULT_SIZE; } });
// Utilities
var utils_1 = require("./utils");
Object.defineProperty(exports, "calculateChargeLevel", { enumerable: true, get: function () { return utils_1.calculateChargeLevel; } });
Object.defineProperty(exports, "formatBatteryLabel", { enumerable: true, get: function () { return utils_1.formatBatteryLabel; } });
Object.defineProperty(exports, "getColorState", { enumerable: true, get: function () { return utils_1.getColorState; } });
//# sourceMappingURL=index.js.map