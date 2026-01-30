/**
 * Studio Dashboard - Column Configuration
 *
 * Locked column configuration for the Audience Tab.
 * 5 columns: Name, Messages, Tags, Last Interacted, Access Group
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'
import type { AudienceSortField } from '../types'

// =============================================================================
// PAGINATION
// =============================================================================

export const PAGE_SIZE = 50

// =============================================================================
// COLUMN CONFIGURATIONS
// =============================================================================

export const AUDIENCE_COLUMNS: ColumnConfig[] = [
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
    key: 'accessGroup',
    width: 120,
    align: 'left',
    sortable: false,
  },
  {
    key: 'lastInteracted',
    width: 240,
    align: 'left',
    sortable: true,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  name: 'Name',
  messages: 'Messages',
  tags: 'Tags',
  lastInteracted: 'Last Interacted',
  accessGroup: 'Access Group',
}

// =============================================================================
// SORT FIELD MAPPING
// =============================================================================

export const COLUMN_TO_SORT_FIELD: Record<string, AudienceSortField> = {
  name: 'NAME',
  messages: 'MESSAGES',
  lastInteracted: 'LAST_INTERACTED',
}

// =============================================================================
// VISIBLE COLUMNS
// =============================================================================

export const VISIBLE_COLUMNS: readonly string[] = AUDIENCE_COLUMNS.map((col) => col.key)
