"use strict";
/**
 * FilterMenuMotion - Default Filter Items
 *
 * Example filter items for demonstration.
 *
 * @module prod/base/filter/filter-menu-motion/default-items
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTER_ITEMS = void 0;
const CheckmarkCircle02Icon_1 = require("@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon");
/**
 * Default filter items for demonstration.
 */
exports.DEFAULT_FILTER_ITEMS = [
    {
        id: 'status',
        type: 'submenu',
        label: 'Status',
        icon: CheckmarkCircle02Icon_1.default,
        items: [
            { id: 'status-active', label: 'Active' },
            { id: 'status-pending', label: 'Pending' },
            { id: 'status-completed', label: 'Completed' },
        ],
    },
    { type: 'separator', id: 'sep-1' },
    {
        id: 'category',
        type: 'submenu',
        label: 'Category',
        items: [
            { id: 'category-sales', label: 'Sales' },
            { id: 'category-support', label: 'Support' },
            { id: 'category-marketing', label: 'Marketing' },
        ],
    },
];
//# sourceMappingURL=default-items.js.map