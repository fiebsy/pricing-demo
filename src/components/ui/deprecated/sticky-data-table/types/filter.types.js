"use strict";
/**
 * Filter System Types for StickyDataTable
 *
 * Provides a flexible, type-safe filter configuration system that supports:
 * - Multiple filter categories (date, select, range, search)
 * - Progressive disclosure (category → values)
 * - Custom filter options per table
 *
 * @module types/filter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRangeFilter = exports.createDateFilter = exports.createSelectFilter = exports.DEFAULT_DATE_PRESETS = void 0;
// ============================================================================
// CONSTANTS & HELPERS
// ============================================================================
/**
 * Default date presets for collections
 */
exports.DEFAULT_DATE_PRESETS = [
    { id: 'today', label: 'Today', days: 0 },
    { id: '24h', label: 'In last 24 hours', days: -1 },
    { id: '48h', label: 'In last 48 hours', days: -2 },
    { id: 'week', label: 'In last week', days: -7 },
    { id: '2weeks', label: 'In last 2 weeks', days: -14 },
    { id: 'month', label: 'In last month', days: -30 },
    { id: '3months', label: 'In last 3 months', days: -90 },
];
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
function createDateFilter(presets = exports.DEFAULT_DATE_PRESETS, opts) {
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
//# sourceMappingURL=filter.types.js.map