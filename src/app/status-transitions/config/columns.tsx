/**
 * Status Transitions - Column Definitions
 *
 * Column configuration for the transition table.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

export const TRANSITION_COLUMNS: ColumnConfig[] = [
  {
    key: 'fromStatus',
    width: 180,
    align: 'left',
    isSticky: true,
    stickyLeft: 0,
    sortable: true,
  },
  {
    key: 'toStatus',
    width: 180,
    align: 'left',
    sortable: true,
  },
  {
    key: 'frequency',
    width: 100,
    align: 'right',
    sortable: true,
  },
  {
    key: 'condensed',
    width: 240,
    align: 'left',
    sortable: false,
    maxLines: 2,
  },
  {
    key: 'tooltip',
    width: 320,
    align: 'left',
    sortable: false,
    maxLines: 2,
  },
  {
    key: 'coverage',
    width: 100,
    align: 'center',
    sortable: true,
  },
  // Toggleable columns
  {
    key: 'fromCategory',
    width: 120,
    align: 'center',
    sortable: true,
  },
  {
    key: 'toCategory',
    width: 120,
    align: 'center',
    sortable: true,
  },
  {
    key: 'usageTier',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'lastOccurred',
    width: 140,
    align: 'right',
    sortable: true,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  fromStatus: 'From Status',
  toStatus: 'To Status',
  frequency: 'Frequency',
  condensed: 'Short',
  tooltip: 'Full Description',
  coverage: 'Coverage',
  fromCategory: 'From Category',
  toCategory: 'To Category',
  usageTier: 'Usage Tier',
  lastOccurred: 'Last Occurred',
}

// =============================================================================
// COLUMN KEYS
// =============================================================================

export const COLUMN_KEYS = [
  'fromStatus',
  'toStatus',
  'frequency',
  'condensed',
  'tooltip',
  'coverage',
  'fromCategory',
  'toCategory',
  'usageTier',
  'lastOccurred',
] as const

export type ColumnKey = (typeof COLUMN_KEYS)[number]

// =============================================================================
// DEFAULT VISIBLE COLUMNS
// =============================================================================

export const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = [
  'fromStatus',
  'toStatus',
  'frequency',
  'condensed',
  'tooltip',
  'coverage',
  'fromCategory',
  'toCategory',
  'usageTier',
  'lastOccurred',
]

// =============================================================================
// TOGGLEABLE COLUMNS
// =============================================================================

export const TOGGLEABLE_COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: 'fromCategory', label: 'From Category' },
  { key: 'toCategory', label: 'To Category' },
  { key: 'usageTier', label: 'Usage Tier' },
  { key: 'lastOccurred', label: 'Last Occurred' },
]
