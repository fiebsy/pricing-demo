/**
 * Stacking Nav + Table Playground - Column Configuration
 *
 * 10 columns for the corporate directory table.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

export const DIRECTORY_COLUMNS: ColumnConfig[] = [
  {
    key: 'employee',
    width: 200,
    align: 'left',
    sortable: false,
    isSticky: true,
    stickyLeft: 0,
  },
  {
    key: 'role',
    width: 160,
    align: 'left',
    sortable: false,
  },
  {
    key: 'company',
    width: 120,
    align: 'center',
    sortable: false,
  },
  {
    key: 'department',
    width: 130,
    align: 'center',
    sortable: false,
  },
  {
    key: 'status',
    width: 130,
    align: 'center',
    sortable: false,
  },
  {
    key: 'level',
    width: 120,
    align: 'center',
    sortable: false,
  },
  {
    key: 'salary',
    width: 120,
    align: 'right',
    sortable: true,
  },
  {
    key: 'review',
    width: 140,
    align: 'center',
    sortable: false,
  },
  {
    key: 'projects',
    width: 100,
    align: 'right',
    sortable: true,
  },
  {
    key: 'startDate',
    width: 140,
    align: 'left',
    sortable: true,
  },
]

// =============================================================================
// COLUMN LABELS
// =============================================================================

export const COLUMN_LABELS: Record<string, string> = {
  employee: 'Employee',
  role: 'Role',
  company: 'Company',
  department: 'Department',
  status: 'Status',
  level: 'Level',
  salary: 'Salary',
  review: 'Review',
  projects: 'Projects',
  startDate: 'Start Date',
}

// =============================================================================
// SORT FIELD MAPPING
// =============================================================================

export const COLUMN_TO_SORT_FIELD: Record<string, string> = {
  salary: 'SALARY',
  projects: 'PROJECT_COUNT',
  startDate: 'START_DATE',
}
