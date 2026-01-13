"use strict";
/**
 * Default Filter Menu Items Configuration
 *
 * Default menu items for the "Add a Filter" dropdown menu
 * Provides 4 core filter categories that can be customized or replaced
 *
 * @module base-ui/filter/data/filter-menu-items
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTER_MENU_ITEMS = void 0;
// Hugeicons stroke imports (duotone not needed for demo)
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
exports.DEFAULT_FILTER_MENU_ITEMS = [
    {
        id: 'status',
        type: 'submenu',
        label: 'Status',
        icon: core_stroke_rounded_1.CheckmarkCircle02Icon,
        items: [
            {
                id: 'status-active',
                label: 'Active',
                onClick: () => console.log('Filter: Active'),
            },
            {
                id: 'status-pending',
                label: 'Pending',
                onClick: () => console.log('Filter: Pending'),
            },
            {
                id: 'status-completed',
                label: 'Completed',
                onClick: () => console.log('Filter: Completed'),
            },
            {
                id: 'status-cancelled',
                label: 'Cancelled',
                onClick: () => console.log('Filter: Cancelled'),
            },
        ],
    },
    {
        id: 'category',
        type: 'submenu',
        label: 'Category',
        icon: core_stroke_rounded_1.Folder01Icon,
        items: [
            {
                id: 'category-sales',
                label: 'Sales',
                onClick: () => console.log('Filter: Sales'),
            },
            {
                id: 'category-services',
                label: 'Services',
                onClick: () => console.log('Filter: Services'),
            },
            {
                id: 'category-consulting',
                label: 'Consulting',
                onClick: () => console.log('Filter: Consulting'),
            },
            {
                id: 'category-subscription',
                label: 'Subscription',
                onClick: () => console.log('Filter: Subscription'),
            },
        ],
    },
    {
        id: 'amount',
        type: 'submenu',
        label: 'Amount',
        icon: core_stroke_rounded_1.Money03Icon,
        items: [
            {
                id: 'amount-under500',
                label: 'Under $500',
                onClick: () => console.log('Filter: Under $500'),
            },
            {
                id: 'amount-500to1500',
                label: '$500 – $1,500',
                onClick: () => console.log('Filter: $500 – $1,500'),
            },
            {
                id: 'amount-1500to3000',
                label: '$1,500 – $3,000',
                onClick: () => console.log('Filter: $1,500 – $3,000'),
            },
            {
                id: 'amount-over3000',
                label: 'Over $3,000',
                onClick: () => console.log('Filter: Over $3,000'),
            },
        ],
    },
    {
        id: 'date',
        type: 'submenu',
        label: 'Date',
        icon: core_stroke_rounded_1.Calendar03Icon,
        items: [
            {
                id: 'date-today',
                label: 'Today',
                onClick: () => console.log('Filter: Today'),
            },
            {
                id: 'date-week',
                label: 'This week',
                onClick: () => console.log('Filter: This week'),
            },
            {
                id: 'date-month',
                label: 'This month',
                onClick: () => console.log('Filter: This month'),
            },
        ],
    },
];
//# sourceMappingURL=filter-menu-items.js.map