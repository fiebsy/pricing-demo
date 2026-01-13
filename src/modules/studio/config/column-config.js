"use strict";
/**
 * Studio Dashboard - Column Configuration
 *
 * Locked column configuration for the Audience Tab.
 * 5 columns: Name, Messages, Tags, Last Interacted, Access Group
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISIBLE_COLUMNS = exports.COLUMN_TO_SORT_FIELD = exports.COLUMN_LABELS = exports.AUDIENCE_COLUMNS = exports.PAGE_SIZE = void 0;
// =============================================================================
// PAGINATION
// =============================================================================
exports.PAGE_SIZE = 50;
// =============================================================================
// COLUMN CONFIGURATIONS
// =============================================================================
exports.AUDIENCE_COLUMNS = [
    {
        key: 'name',
        width: 200,
        align: 'left',
        sortable: true,
        isSticky: true,
        stickyLeft: 0,
    },
    {
        key: 'messages',
        width: 100,
        align: 'right',
        sortable: true,
    },
    {
        key: 'tags',
        width: 200,
        align: 'left',
        sortable: false,
    },
    {
        key: 'lastInteracted',
        width: 160,
        align: 'left',
        sortable: true,
    },
    {
        key: 'accessGroup',
        width: 120,
        align: 'left',
        sortable: false,
    },
];
// =============================================================================
// COLUMN LABELS
// =============================================================================
exports.COLUMN_LABELS = {
    name: 'Name',
    messages: 'Messages',
    tags: 'Tags',
    lastInteracted: 'Last Interacted',
    accessGroup: 'Access Group',
};
// =============================================================================
// SORT FIELD MAPPING
// =============================================================================
exports.COLUMN_TO_SORT_FIELD = {
    name: 'NAME',
    messages: 'MESSAGES',
    lastInteracted: 'LAST_INTERACTED',
};
// =============================================================================
// VISIBLE COLUMNS
// =============================================================================
exports.VISIBLE_COLUMNS = exports.AUDIENCE_COLUMNS.map((col) => col.key);
//# sourceMappingURL=column-config.js.map