/**
 * Collections Dashboard - Hardened Column Configuration
 *
 * Locked column configuration - not user-customizable.
 * Optimized for risk activity workflow with key information visible.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'
import type { PartnerRiskSortField } from '../types'

// =============================================================================
// PAGINATION
// =============================================================================

export const PAGE_SIZE = 50

// =============================================================================
// HARDENED COLUMN CONFIGURATIONS
// These columns are locked and cannot be changed by users
// =============================================================================

export const HARDENED_COLUMNS: ColumnConfig[] = [
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
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  orderIdWithProgressNoClawback: 'Contract',
  route: 'Route',
  clawbackEstimate: 'Clawback',
  customer: 'Customer',
  riskTier: 'Status',
  clawbackBattery: 'Time left',
  statusContext: 'Last Update',
}

// =============================================================================
// SORT FIELD MAPPING
// Maps table column keys to sort fields for client-side sorting
// =============================================================================

export const COLUMN_TO_SORT_FIELD: Record<string, PartnerRiskSortField> = {
  clawbackEstimate: 'AT_RISK_FUNDED_AMOUNT',
  statusContext: 'STATUS_CHANGED_AT',
  clawbackBattery: 'DAYS_UNTIL_CLAWBACK',
  daysInCollections: 'DAYS_IN_COLLECTIONS',
  contractDate: 'CONTRACT_DATE',
  lastPaymentClearedDate: 'LAST_PAYMENT_CLEARED_DATE',
}

// =============================================================================
// VISIBLE COLUMNS (readonly)
// =============================================================================

export const VISIBLE_COLUMNS: readonly string[] = HARDENED_COLUMNS.map((col) => col.key)
