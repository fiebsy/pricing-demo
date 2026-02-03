/**
 * Stacking Nav + Table Playground - Column Configuration
 *
 * 6 columns for the Multiverse Power Rankings table.
 * All columns constrained to ≤ 140px width.
 */

import type { ReactNode } from 'react'
import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

export const DIRECTORY_COLUMNS: ColumnConfig[] = [
  {
    key: 'character',
    width: 140,
    align: 'left',
    sortable: false,
    isSticky: true,
    stickyLeft: 0,
  },
  {
    key: 'realmBadge',
    width: 90,
    align: 'center',
    sortable: false,
  },
  {
    key: 'origin',
    width: 180,
    align: 'left',
    sortable: false,
  },
  {
    key: 'description',
    width: 180,
    align: 'left',
    sortable: false,
  },
  {
    key: 'threatLevel',
    width: 90,
    align: 'center',
    sortable: false,
  },
  {
    key: 'livesRescued',
    width: 160,
    align: 'center',
    sortable: false,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, ReactNode> = {
  character: 'Character',
  realmBadge: 'Realm',
  origin: 'Origin',
  description: 'Description',
  threatLevel: 'Power level',
  livesRescued: (<>Lives rescued <span className="opacity-60">30d</span></>),
}

// =============================================================================
// SORT FIELD MAPPING
// =============================================================================

export const COLUMN_TO_SORT_FIELD: Record<string, string> = {}
