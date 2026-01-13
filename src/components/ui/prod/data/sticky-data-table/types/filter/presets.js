"use strict";
/**
 * StickyDataTable V2 - Filter Presets
 *
 * Default preset configurations for filters.
 *
 * @module types/filter/presets
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DATE_PRESETS = void 0;
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
//# sourceMappingURL=presets.js.map