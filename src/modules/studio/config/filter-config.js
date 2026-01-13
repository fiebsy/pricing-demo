"use strict";
/**
 * Studio Dashboard - Filter Configuration
 *
 * Audience-specific filter menu items for the FilterMenu component.
 * Filters are applied client-side after data is fetched.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilters = exports.FILTER_PREDICATES = exports.FILTER_DISPLAY_LABELS = exports.AUDIENCE_FILTER_ITEMS = exports.FILTER_ICONS = void 0;
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
exports.FILTER_ICONS = {
    Status: core_stroke_rounded_1.CheckmarkCircle02Icon,
    'Last Interacted': core_stroke_rounded_1.Clock01Icon,
    Messages: core_stroke_rounded_1.Message01Icon,
    Tags: core_stroke_rounded_1.Tag01Icon,
};
// =============================================================================
// FILTER MENU ITEMS
// =============================================================================
exports.AUDIENCE_FILTER_ITEMS = [
    {
        id: 'status',
        label: 'Status',
        type: 'submenu',
        icon: core_stroke_rounded_1.CheckmarkCircle02Icon,
        items: [
            {
                id: 'status-active',
                label: 'Active',
            },
            {
                id: 'status-invited',
                label: 'Invited',
            },
            {
                id: 'status-revoked',
                label: 'Revoked',
            },
        ],
    },
    {
        id: 'lastInteracted',
        label: 'Last Interacted',
        type: 'submenu',
        icon: core_stroke_rounded_1.Clock01Icon,
        items: [
            {
                id: 'last-7d',
                label: 'Last 7 days',
            },
            {
                id: 'last-30d',
                label: 'Last 30 days',
            },
            {
                id: 'last-90d',
                label: 'Last 90 days',
            },
        ],
    },
    {
        id: 'messages',
        label: 'Messages',
        type: 'submenu',
        icon: core_stroke_rounded_1.Message01Icon,
        items: [
            {
                id: 'messages-0-10',
                label: '0-10',
            },
            {
                id: 'messages-11-50',
                label: '11-50',
            },
            {
                id: 'messages-51-100',
                label: '51-100',
            },
            {
                id: 'messages-101-500',
                label: '101-500',
            },
            {
                id: 'messages-500+',
                label: '500+',
            },
        ],
    },
    {
        id: 'tags',
        label: 'Tags',
        type: 'submenu',
        icon: core_stroke_rounded_1.Tag01Icon,
        items: [
            {
                id: 'tag-vip',
                label: 'VIP',
            },
            {
                id: 'tag-lead',
                label: 'Lead-Coaching',
            },
            {
                id: 'tag-client',
                label: 'Client',
            },
            {
                id: 'tag-cohort',
                label: 'Cohort-Jan-2025',
            },
            {
                id: 'tag-inactive',
                label: 'Inactive',
            },
        ],
    },
];
// =============================================================================
// FILTER DISPLAY LABELS
// For showing in FilterChip components
// =============================================================================
exports.FILTER_DISPLAY_LABELS = {
    // Status filters
    'status-active': { label: 'Status', value: 'Active', category: 'Status' },
    'status-invited': { label: 'Status', value: 'Invited', category: 'Status' },
    'status-revoked': { label: 'Status', value: 'Revoked', category: 'Status' },
    // Last Interacted filters
    'last-7d': { label: 'Last Interacted', value: '7 days', category: 'Last Interacted' },
    'last-30d': { label: 'Last Interacted', value: '30 days', category: 'Last Interacted' },
    'last-90d': { label: 'Last Interacted', value: '90 days', category: 'Last Interacted' },
    // Messages filters
    'messages-0-10': { label: 'Messages', value: '0-10', category: 'Messages' },
    'messages-11-50': { label: 'Messages', value: '11-50', category: 'Messages' },
    'messages-51-100': { label: 'Messages', value: '51-100', category: 'Messages' },
    'messages-101-500': { label: 'Messages', value: '101-500', category: 'Messages' },
    'messages-500+': { label: 'Messages', value: '500+', category: 'Messages' },
    'messages-51+': { label: 'Messages', value: '51+', category: 'Messages' }, // Combined filter for Most Engaged
    // Tag filters
    'tag-vip': { label: 'Tags', value: 'VIP', category: 'Tags' },
    'tag-lead': { label: 'Tags', value: 'Lead-Coaching', category: 'Tags' },
    'tag-client': { label: 'Tags', value: 'Client', category: 'Tags' },
    'tag-cohort': { label: 'Tags', value: 'Cohort-Jan-2025', category: 'Tags' },
    'tag-inactive': { label: 'Tags', value: 'Inactive', category: 'Tags' },
};
// =============================================================================
// FILTER PREDICATES
// =============================================================================
// Helper to check days since interaction
const daysSince = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};
exports.FILTER_PREDICATES = {
    // Status filters
    'status-active': (item) => item.status === 'Active',
    'status-invited': (item) => item.status === 'Invited',
    'status-revoked': (item) => item.status === 'Revoked',
    // Last Interacted filters
    'last-7d': (item) => daysSince(item.lastInteracted) <= 7,
    'last-30d': (item) => daysSince(item.lastInteracted) <= 30,
    'last-90d': (item) => daysSince(item.lastInteracted) <= 90,
    // Messages filters
    'messages-0-10': (item) => item.messageCount >= 0 && item.messageCount <= 10,
    'messages-11-50': (item) => item.messageCount >= 11 && item.messageCount <= 50,
    'messages-51-100': (item) => item.messageCount >= 51 && item.messageCount <= 100,
    'messages-101-500': (item) => item.messageCount >= 101 && item.messageCount <= 500,
    'messages-500+': (item) => item.messageCount > 500,
    'messages-51+': (item) => item.messageCount > 50, // Combined: 51+ messages (for Most Engaged)
    // Tag filters
    'tag-vip': (item) => item.tags.includes('VIP'),
    'tag-lead': (item) => item.tags.includes('Lead-Coaching'),
    'tag-client': (item) => item.tags.includes('Client'),
    'tag-cohort': (item) => item.tags.includes('Cohort-Jan-2025'),
    'tag-inactive': (item) => item.tags.includes('Inactive'),
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