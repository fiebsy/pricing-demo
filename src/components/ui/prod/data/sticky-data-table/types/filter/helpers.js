"use strict";
/**
 * StickyDataTable V2 - Filter Helpers
 *
 * Helper functions for creating filter configurations.
 *
 * @module types/filter/helpers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRangeFilter = exports.createDateFilter = exports.createSelectFilter = void 0;
const presets_1 = require("./presets");
/**
 * Helper to create a select filter config
 */
function createSelectFilter(options, opts) {
    return {
        type: 'select',
        options,
        multiple: opts?.multiple ?? false,
        searchable: opts?.searchable ?? true,
        searchPlaceholder: opts?.searchPlaceholder ?? 'Search...',
    };
}
exports.createSelectFilter = createSelectFilter;
/**
 * Helper to create a date filter config
 */
function createDateFilter(presets = presets_1.DEFAULT_DATE_PRESETS, opts) {
    return {
        type: 'date',
        presets,
        allowCustomRange: opts?.allowCustomRange ?? false,
    };
}
exports.createDateFilter = createDateFilter;
/**
 * Helper to create a range filter config
 */
function createRangeFilter(opts) {
    return {
        type: 'range',
        ...opts,
    };
}
exports.createRangeFilter = createRangeFilter;
//# sourceMappingURL=helpers.js.map