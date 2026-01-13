"use strict";
/**
 * Collections Dashboard - Filter Configuration
 *
 * Risk-specific filter menu items for the RevealMenu component.
 * Filters are applied client-side after data is fetched.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilters = exports.FILTER_PREDICATES = exports.FILTER_DISPLAY_LABELS = exports.RISK_FILTER_ITEMS = exports.FILTER_ICONS = void 0;
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const types_1 = require("../types");
exports.FILTER_ICONS = {
    Status: core_stroke_rounded_1.CheckmarkCircle02Icon,
    Urgency: core_stroke_rounded_1.Alert02Icon,
    Balance: core_stroke_rounded_1.Money01Icon,
    Route: core_stroke_rounded_1.Route01Icon,
    Outcome: core_stroke_rounded_1.Cancel01Icon,
};
// =============================================================================
// FILTER MENU ITEMS
// =============================================================================
exports.RISK_FILTER_ITEMS = [
    {
        id: 'status',
        label: 'Status',
        type: 'submenu',
        icon: core_stroke_rounded_1.CheckmarkCircle02Icon,
        items: [
            {
                id: 'status-collections',
                label: 'Collections',
            },
            {
                id: 'status-clawback',
                label: 'Last Chance',
            },
            {
                id: 'status-settled',
                label: 'Clawed back',
            },
        ],
    },
    {
        id: 'outcome',
        label: 'Outcome',
        type: 'submenu',
        icon: core_stroke_rounded_1.Cancel01Icon,
        items: [
            {
                id: 'outcome-defaulted',
                label: 'Defaulted',
            },
            {
                id: 'outcome-canceled',
                label: 'Canceled',
            },
            {
                id: 'outcome-chargeback',
                label: 'Chargeback',
            },
        ],
    },
    {
        id: 'urgency',
        label: 'Urgency',
        type: 'submenu',
        icon: core_stroke_rounded_1.Alert02Icon,
        items: [
            {
                id: 'urgency-critical',
                label: 'Critical (0-3 days)',
            },
            {
                id: 'urgency-warning',
                label: 'Warning (4-7 days)',
            },
            {
                id: 'urgency-safe',
                label: 'Safe (8+ days)',
            },
        ],
    },
    {
        id: 'balance',
        label: 'Balance',
        type: 'submenu',
        icon: core_stroke_rounded_1.Money01Icon,
        items: [
            {
                id: 'balance-high',
                label: 'High (>$500)',
            },
            {
                id: 'balance-medium',
                label: 'Medium ($100-500)',
            },
            {
                id: 'balance-low',
                label: 'Low (<$100)',
            },
        ],
    },
    {
        id: 'route',
        label: 'Route',
        type: 'submenu',
        icon: core_stroke_rounded_1.Route01Icon,
        items: [
            {
                id: 'route-servicing',
                label: 'PAC',
            },
            {
                id: 'route-funding',
                label: 'Upfront',
            },
        ],
    },
];
// =============================================================================
// FILTER DISPLAY LABELS
// For showing in FilterChip components
// =============================================================================
exports.FILTER_DISPLAY_LABELS = {
    'status-collections': { label: 'Status', value: 'Collections', category: 'Status' },
    'status-clawback': { label: 'Status', value: 'Last Chance', category: 'Status' },
    'status-settled': { label: 'Status', value: 'Clawed back', category: 'Status' },
    'outcome-defaulted': { label: 'Outcome', value: 'Defaulted', category: 'Outcome' },
    'outcome-canceled': { label: 'Outcome', value: 'Canceled', category: 'Outcome' },
    'outcome-chargeback': { label: 'Outcome', value: 'Chargeback', category: 'Outcome' },
    'urgency-critical': { label: 'Urgency', value: 'Critical', category: 'Urgency' },
    'urgency-warning': { label: 'Urgency', value: 'Warning', category: 'Urgency' },
    'urgency-safe': { label: 'Urgency', value: 'Safe', category: 'Urgency' },
    'balance-high': { label: 'Balance', value: '>$500', category: 'Balance' },
    'balance-medium': { label: 'Balance', value: '$100-500', category: 'Balance' },
    'balance-low': { label: 'Balance', value: '<$100', category: 'Balance' },
    'route-servicing': { label: 'Route', value: 'PAC', category: 'Route' },
    'route-funding': { label: 'Route', value: 'Upfront', category: 'Route' },
};
// =============================================================================
// FILTER PREDICATES
// Used for client-side filtering of data
// =============================================================================
exports.FILTER_PREDICATES = {
    // Status filters - use riskCategory for precise filtering
    'status-collections': (item) => item.riskCategory === 'COLLECTIONS' || item.riskCategory === 'CLAWBACK_RISK',
    'status-clawback': (item) => item.riskCategory === 'ACTIVE_CLAWBACK',
    'status-settled': (item) => item.riskCategory === 'SETTLED_CLAWBACK',
    // Outcome filters - type of failed order
    'outcome-defaulted': (item) => {
        const status = String(item.status);
        return status === types_1.ContractStatus.DefaultedPendingClawback ||
            status === types_1.ContractStatus.DefaultedSettled;
    },
    'outcome-canceled': (item) => {
        const status = String(item.status);
        return status === types_1.ContractStatus.CanceledPendingClawback ||
            status === types_1.ContractStatus.CanceledSettled;
    },
    'outcome-chargeback': (item) => {
        const status = String(item.status);
        return status === types_1.ContractStatus.ChargebackPendingClawback ||
            status === types_1.ContractStatus.ChargebackSettled;
    },
    // Urgency filters (based on daysUntilClawback)
    'urgency-critical': (item) => {
        const days = item.daysUntilClawback;
        return days !== null && days !== undefined && days <= 3;
    },
    'urgency-warning': (item) => {
        const days = item.daysUntilClawback;
        return days !== null && days !== undefined && days >= 4 && days <= 7;
    },
    'urgency-safe': (item) => {
        const days = item.daysUntilClawback;
        return days !== null && days !== undefined && days >= 8;
    },
    // Balance filters
    'balance-high': (item) => (item.remainingBalance ?? 0) > 500,
    'balance-medium': (item) => {
        const balance = item.remainingBalance ?? 0;
        return balance >= 100 && balance <= 500;
    },
    'balance-low': (item) => (item.remainingBalance ?? 0) < 100,
    // Route filters
    'route-servicing': (item) => {
        return item.planType === types_1.PaymentPlanType.Servicing;
    },
    'route-funding': (item) => {
        return item.planType === types_1.PaymentPlanType.Funding;
    },
};
// =============================================================================
// HELPER: Apply filters to data
// =============================================================================
function applyFilters(items, activeFilters) {
    if (activeFilters.length === 0)
        return items;
    return items.filter((item) => {
        // Group filters by category
        const filtersByCategory = {};
        for (const filter of activeFilters) {
            const category = filter.category;
            if (!filtersByCategory[category]) {
                filtersByCategory[category] = [];
            }
            filtersByCategory[category].push(filter.id);
        }
        // Within each category, use OR logic (match any)
        // Across categories, use AND logic (must match all)
        return Object.entries(filtersByCategory).every(([_category, filterIds]) => {
            if (!filterIds || filterIds.length === 0)
                return true;
            return filterIds.some((filterId) => {
                const predicate = exports.FILTER_PREDICATES[filterId];
                return predicate ? predicate(item) : true;
            });
        });
    });
}
exports.applyFilters = applyFilters;
//# sourceMappingURL=filter-config.js.map