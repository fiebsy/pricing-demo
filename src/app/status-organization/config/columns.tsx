/**
 * Status Organization - Column Definitions
 *
 * Column configuration for the status table.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

export const STATUS_COLUMNS: ColumnConfig[] = [
  {
    key: 'group',
    width: 140,
    align: 'left',
    isSticky: true,
    stickyLeft: 0,
    sortable: false,
  },
  {
    key: 'statusCode',
    width: 300,
    align: 'left',
    sortable: false,
  },
  {
    key: 'displayLabel',
    width: 240,
    align: 'left',
    sortable: false,
  },
  {
    key: 'badge',
    width: 100,
    align: 'center',
    sortable: false,
  },
  {
    key: 'usage',
    width: 100,
    align: 'center',
    sortable: false,
  },
  {
    key: 'count',
    width: 100,
    align: 'right',
    sortable: false,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  group: 'Group',
  statusCode: 'Status Code',
  displayLabel: 'Display Label',
  badge: 'Badge',
  usage: 'Usage',
  count: 'Count',
}

// =============================================================================
// COLUMN KEYS
// =============================================================================

export const COLUMN_KEYS = [
  'group',
  'statusCode',
  'displayLabel',
  'badge',
  'usage',
  'count',
] as const

export type ColumnKey = typeof COLUMN_KEYS[number]
