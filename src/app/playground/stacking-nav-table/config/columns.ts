/**
 * Stacking Nav + Table Playground - Column Configuration
 *
 * 5 columns for the corporate directory table.
 * Nav already communicates company/department/team context, so those are omitted.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

export const DIRECTORY_COLUMNS: ColumnConfig[] = [
  {
    key: 'employee',
    width: 150,
    align: 'left',
    sortable: false,
    isSticky: true,
    stickyLeft: 0,
  },
  {
    key: 'role',
    width: 110,
    align: 'left',
    sortable: false,
  },
  {
    key: 'status',
    width: 90,
    align: 'center',
    sortable: false,
  },
  {
    key: 'level',
    width: 80,
    align: 'center',
    sortable: false,
  },
  {
    key: 'salary',
    width: 90,
    align: 'right',
    sortable: true,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  employee: 'Employee',
  role: 'Role',
  status: 'Status',
  level: 'Level',
  salary: 'Salary',
}

// =============================================================================
// SORT FIELD MAPPING
// =============================================================================

export const COLUMN_TO_SORT_FIELD: Record<string, string> = {
  salary: 'SALARY',
}
