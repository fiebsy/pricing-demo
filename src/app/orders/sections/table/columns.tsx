/**
 * Orders Page - Column Definitions
 *
 * Business-focused columns for order management display.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

export const ORDER_COLUMNS: ColumnConfig[] = [
  {
    key: 'order',
    width: 120,
    align: 'left',
    sortable: true,
    isSticky: true,
    stickyLeft: 0,
  },
  {
    key: 'customer',
    width: 200,
    align: 'left',
    sortable: true,
  },
  {
    key: 'route',
    width: 120,
    align: 'left',
    sortable: true,
  },
  {
    key: 'plan',
    width: 100,
    align: 'left',
    sortable: true,
  },
  {
    key: 'type',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'status',
    width: 110,
    align: 'center',
    sortable: true,
  },
  {
    key: 'total',
    width: 110,
    align: 'right',
    sortable: true,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  customer: 'Customer',
  order: 'Order #',
  route: 'Route',
  plan: 'Plan',
  type: 'Type',
  status: 'Status',
  total: 'Total',
}

// =============================================================================
// COLUMN KEYS
// =============================================================================

export const COLUMN_KEYS = ['order', 'customer', 'route', 'plan', 'type', 'status', 'total'] as const
export type ColumnKey = typeof COLUMN_KEYS[number]
