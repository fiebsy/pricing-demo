"use strict";
/**
 * OrderClawbackTimer Feature - Public API
 *
 * Feature-level component for displaying clawback timers in order detail contexts.
 * Wraps the base ClawbackTimer with order-specific business logic.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClawbackDays = exports.OrderClawbackTimer = void 0;
// Main component
var order_clawback_timer_1 = require("./order-clawback-timer");
Object.defineProperty(exports, "OrderClawbackTimer", { enumerable: true, get: function () { return order_clawback_timer_1.OrderClawbackTimer; } });
// Hooks
var use_clawback_days_1 = require("./hooks/use-clawback-days");
Object.defineProperty(exports, "useClawbackDays", { enumerable: true, get: function () { return use_clawback_days_1.useClawbackDays; } });
//# sourceMappingURL=index.js.map