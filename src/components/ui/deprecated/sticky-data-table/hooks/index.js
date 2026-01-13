"use strict";
/**
 * StickyDataTable V2 - Hooks Exports
 *
 * Central export point for all hooks.
 *
 * @module hooks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWithAsync = exports.useTableWithGraphQL = exports.useTableLoadingState = exports.useTableConfiguration = exports.useAutoColumnFlip = exports.prefersReducedMotion = exports.supportsWAAPI = exports.useColumnFlip = exports.useStickyDataTable = exports.useColumnConfiguration = exports.useInfiniteScroll = exports.useArrowPosition = exports.useWheelRedirect = exports.useSelection = exports.useSort = exports.useColumns = exports.useScrollSync = void 0;
// Core functionality hooks
var use_scroll_sync_1 = require("./use-scroll-sync");
Object.defineProperty(exports, "useScrollSync", { enumerable: true, get: function () { return use_scroll_sync_1.useScrollSync; } });
var use_columns_1 = require("./use-columns");
Object.defineProperty(exports, "useColumns", { enumerable: true, get: function () { return use_columns_1.useColumns; } });
var use_sort_1 = require("./use-sort");
Object.defineProperty(exports, "useSort", { enumerable: true, get: function () { return use_sort_1.useSort; } });
var use_selection_1 = require("./use-selection");
Object.defineProperty(exports, "useSelection", { enumerable: true, get: function () { return use_selection_1.useSelection; } });
var use_wheel_redirect_1 = require("./use-wheel-redirect");
Object.defineProperty(exports, "useWheelRedirect", { enumerable: true, get: function () { return use_wheel_redirect_1.useWheelRedirect; } });
var use_arrow_position_1 = require("./use-arrow-position");
Object.defineProperty(exports, "useArrowPosition", { enumerable: true, get: function () { return use_arrow_position_1.useArrowPosition; } });
var use_infinite_scroll_1 = require("./use-infinite-scroll");
Object.defineProperty(exports, "useInfiniteScroll", { enumerable: true, get: function () { return use_infinite_scroll_1.useInfiniteScroll; } });
// Column configuration hook (centralized state management)
var use_column_configuration_1 = require("./use-column-configuration");
Object.defineProperty(exports, "useColumnConfiguration", { enumerable: true, get: function () { return use_column_configuration_1.useColumnConfiguration; } });
// Main orchestration hook (tsx for JSX support in loading indicator)
var use_sticky_data_table_1 = require("./use-sticky-data-table");
Object.defineProperty(exports, "useStickyDataTable", { enumerable: true, get: function () { return use_sticky_data_table_1.useStickyDataTable; } });
// FLIP animation hook for smooth column transitions
var use_column_flip_1 = require("./use-column-flip");
Object.defineProperty(exports, "useColumnFlip", { enumerable: true, get: function () { return use_column_flip_1.useColumnFlip; } });
Object.defineProperty(exports, "supportsWAAPI", { enumerable: true, get: function () { return use_column_flip_1.supportsWAAPI; } });
Object.defineProperty(exports, "prefersReducedMotion", { enumerable: true, get: function () { return use_column_flip_1.prefersReducedMotion; } });
// Auto-FLIP hook (automatic detection and animation)
var use_auto_column_flip_1 = require("./use-auto-column-flip");
Object.defineProperty(exports, "useAutoColumnFlip", { enumerable: true, get: function () { return use_auto_column_flip_1.useAutoColumnFlip; } });
// Table configuration hook (unified config management)
var use_table_configuration_1 = require("./use-table-configuration");
Object.defineProperty(exports, "useTableConfiguration", { enumerable: true, get: function () { return use_table_configuration_1.useTableConfiguration; } });
// Data adapters for automatic skeleton/loading management
var data_adapters_1 = require("./data-adapters");
// Core loading state hook (for building custom adapters)
Object.defineProperty(exports, "useTableLoadingState", { enumerable: true, get: function () { return data_adapters_1.useTableLoadingState; } });
// Apollo GraphQL adapter
Object.defineProperty(exports, "useTableWithGraphQL", { enumerable: true, get: function () { return data_adapters_1.useTableWithGraphQL; } });
// Generic async adapter (fetch, axios, etc.)
Object.defineProperty(exports, "useTableWithAsync", { enumerable: true, get: function () { return data_adapters_1.useTableWithAsync; } });
//# sourceMappingURL=index.js.map