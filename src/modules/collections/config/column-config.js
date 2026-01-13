"use strict";
/**
 * Collections Dashboard - Hardened Column Configuration
 *
 * Locked column configuration - not user-customizable.
 * Optimized for risk activity workflow with key information visible.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISIBLE_COLUMNS = exports.COLUMN_TO_SORT_FIELD = exports.COLUMN_LABELS = exports.HARDENED_COLUMNS = exports.PAGE_SIZE = void 0;
// =============================================================================
// PAGINATION
// =============================================================================
exports.PAGE_SIZE = 50;
// =============================================================================
// HARDENED COLUMN CONFIGURATIONS
// These columns are locked and cannot be changed by users
// =============================================================================
exports.HARDENED_COLUMNS = [
    {
        key: 'orderIdWithProgressNoClawback',
        width: 150,
        align: 'left',
        sortable: false,
        isSticky: true,
        stickyLeft: 0,
    },
    {
        key: 'route',
        width: 100,
        align: 'center',
        sortable: false,
    },
    {
        key: 'clawbackEstimate',
        width: 130,
        align: 'right',
        sortable: true,
    },
    {
        key: 'customer',
        width: 280,
        align: 'left',
        sortable: false,
    },
    {
        key: 'riskTier',
        width: 140,
        align: 'center',
        sortable: false,
    },
    {
        key: 'clawbackBattery',
        width: 140,
        align: 'right',
        sortable: true,
    },
    {
        key: 'statusContext',
        width: 260,
        align: 'left',
        sortable: true,
    },
];
// =============================================================================
// COLUMN LABELS
// =============================================================================
exports.COLUMN_LABELS = {
    orderIdWithProgressNoClawback: 'Contract',
    route: 'Route',
    clawbackEstimate: 'Clawback',
    customer: 'Customer',
    riskTier: 'Status',
    clawbackBattery: 'Time left',
    statusContext: 'Last Update',
};
// =============================================================================
// SORT FIELD MAPPING
// Maps table column keys to sort fields for client-side sorting
// =============================================================================
exports.COLUMN_TO_SORT_FIELD = {
    clawbackEstimate: 'AT_RISK_FUNDED_AMOUNT',
    statusContext: 'STATUS_CHANGED_AT',
    clawbackBattery: 'DAYS_UNTIL_CLAWBACK',
    daysInCollections: 'DAYS_IN_COLLECTIONS',
    contractDate: 'CONTRACT_DATE',
    lastPaymentClearedDate: 'LAST_PAYMENT_CLEARED_DATE',
};
// =============================================================================
// VISIBLE COLUMNS (readonly)
// =============================================================================
exports.VISIBLE_COLUMNS = exports.HARDENED_COLUMNS.map((col) => col.key);
//# sourceMappingURL=column-config.js.map