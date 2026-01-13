"use strict";
/**
 * StickyDataTable V2 - Hooks Exports
 *
 * Central export point for all hooks.
 * Organized by responsibility:
 *
 * - core/     Main orchestration hook
 * - column/   Column visibility, configuration, FLIP animations
 * - scroll/   Scroll sync, wheel events, infinite scroll
 * - state/    Sort, selection, filters
 * - config/   Configuration persistence
 * - utils/    Arrow position, CSV export
 * - data-adapters/  Loading state adapters (GraphQL, async)
 *
 * @module hooks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWithAsync = exports.useTableWithGraphQL = exports.useTableLoadingState = exports.useExportCsvSticky = exports.useFilterBarPosition = exports.useArrowPosition = exports.useTableConfiguration = exports.useTableFilters = exports.useSelection = exports.useSort = exports.useInfiniteScroll = exports.useWheelRedirect = exports.useScrollSync = exports.prefersReducedMotion = exports.supportsWAAPI = exports.useAutoColumnFlip = exports.useColumnFlip = exports.useColumnConfiguration = exports.useColumns = exports.useStickyDataTable = void 0;
// Core - Main orchestration hook
var core_1 = require("./core");
Object.defineProperty(exports, "useStickyDataTable", { enumerable: true, get: function () { return core_1.useStickyDataTable; } });
// Column - Column management hooks
var column_1 = require("./column");
Object.defineProperty(exports, "useColumns", { enumerable: true, get: function () { return column_1.useColumns; } });
Object.defineProperty(exports, "useColumnConfiguration", { enumerable: true, get: function () { return column_1.useColumnConfiguration; } });
Object.defineProperty(exports, "useColumnFlip", { enumerable: true, get: function () { return column_1.useColumnFlip; } });
Object.defineProperty(exports, "useAutoColumnFlip", { enumerable: true, get: function () { return column_1.useAutoColumnFlip; } });
Object.defineProperty(exports, "supportsWAAPI", { enumerable: true, get: function () { return column_1.supportsWAAPI; } });
Object.defineProperty(exports, "prefersReducedMotion", { enumerable: true, get: function () { return column_1.prefersReducedMotion; } });
// Scroll - Scroll and viewport hooks
var scroll_1 = require("./scroll");
Object.defineProperty(exports, "useScrollSync", { enumerable: true, get: function () { return scroll_1.useScrollSync; } });
Object.defineProperty(exports, "useWheelRedirect", { enumerable: true, get: function () { return scroll_1.useWheelRedirect; } });
Object.defineProperty(exports, "useInfiniteScroll", { enumerable: true, get: function () { return scroll_1.useInfiniteScroll; } });
// State - Row data state hooks
var state_1 = require("./state");
Object.defineProperty(exports, "useSort", { enumerable: true, get: function () { return state_1.useSort; } });
Object.defineProperty(exports, "useSelection", { enumerable: true, get: function () { return state_1.useSelection; } });
Object.defineProperty(exports, "useTableFilters", { enumerable: true, get: function () { return state_1.useTableFilters; } });
// Config - Configuration persistence
var config_1 = require("./config");
Object.defineProperty(exports, "useTableConfiguration", { enumerable: true, get: function () { return config_1.useTableConfiguration; } });
// Utils - Utility hooks
var utils_1 = require("./utils");
Object.defineProperty(exports, "useArrowPosition", { enumerable: true, get: function () { return utils_1.useArrowPosition; } });
Object.defineProperty(exports, "useFilterBarPosition", { enumerable: true, get: function () { return utils_1.useFilterBarPosition; } });
Object.defineProperty(exports, "useExportCsvSticky", { enumerable: true, get: function () { return utils_1.useExportCsvSticky; } });
// Data adapters - Loading state management
var data_adapters_1 = require("./data-adapters");
Object.defineProperty(exports, "useTableLoadingState", { enumerable: true, get: function () { return data_adapters_1.useTableLoadingState; } });
Object.defineProperty(exports, "useTableWithGraphQL", { enumerable: true, get: function () { return data_adapters_1.useTableWithGraphQL; } });
Object.defineProperty(exports, "useTableWithAsync", { enumerable: true, get: function () { return data_adapters_1.useTableWithAsync; } });
//# sourceMappingURL=index.js.map