"use strict";
/**
 * Filter Menu - Default Menu Items
 *
 * Example filter menu structure for demonstration.
 *
 * @module prod/base/filter/filter-menu/default-items
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTER_ITEMS = void 0;
// Import icons
const Calendar03Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Calendar03Icon");
const CheckmarkCircle02Icon_1 = require("@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon");
const UserIcon_1 = require("@hugeicons-pro/core-stroke-rounded/UserIcon");
const Folder01Icon_1 = require("@hugeicons-pro/core-duotone-rounded/Folder01Icon");
const Tag01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/Tag01Icon");
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
            { id: 'status-archived', label: 'Archived' },
        ],
    },
    {
        id: 'date',
        type: 'submenu',
        label: 'Date',
        icon: Calendar03Icon_1.default,
        items: [
            { id: 'date-today', label: 'Today' },
            { id: 'date-week', label: 'This Week' },
            { id: 'date-month', label: 'This Month' },
            { id: 'date-year', label: 'This Year' },
            { type: 'separator', id: 'date-sep' },
            { id: 'date-custom', label: 'Custom Range...' },
        ],
    },
    {
        id: 'assignee',
        type: 'submenu',
        label: 'Assignee',
        icon: UserIcon_1.default,
        items: [
            { id: 'assignee-me', label: 'Assigned to Me' },
            { id: 'assignee-unassigned', label: 'Unassigned' },
            { type: 'separator', id: 'assignee-sep' },
            { id: 'assignee-team', label: 'Team Members...' },
        ],
    },
    { type: 'separator', id: 'sep-1' },
    {
        id: 'category',
        type: 'submenu',
        label: 'Category',
        icon: Folder01Icon_1.default,
        items: [
            { id: 'category-sales', label: 'Sales' },
            { id: 'category-support', label: 'Support' },
            { id: 'category-marketing', label: 'Marketing' },
            { id: 'category-engineering', label: 'Engineering' },
        ],
    },
    {
        id: 'tags',
        type: 'submenu',
        label: 'Tags',
        icon: Tag01Icon_1.default,
        items: [
            { id: 'tag-urgent', label: 'Urgent' },
            { id: 'tag-important', label: 'Important' },
            { id: 'tag-review', label: 'Needs Review' },
            { id: 'tag-bug', label: 'Bug' },
        ],
    },
];
//# sourceMappingURL=default-items.js.map