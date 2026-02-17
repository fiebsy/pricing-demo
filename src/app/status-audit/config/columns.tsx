/**
 * Status Audit - Column Definitions
 *
 * Column configuration for both statuses and transitions tables.
 */

import type { ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// COLUMN DEFINITIONS
// =============================================================================

interface ColumnDef {
  key: string
  width: number
  label: string
  align: 'left' | 'center' | 'right'
  sortable: boolean
  isSticky?: boolean
  stickyLeft?: number
  maxLines?: number
  defaultVisible?: boolean
}

// =============================================================================
// STATUS COLUMNS
// =============================================================================

const ALL_STATUS_COLUMNS: ColumnDef[] = [
  { key: 'code', width: 220, label: 'Code', align: 'left', sortable: true, isSticky: true, stickyLeft: 0, defaultVisible: true },
  { key: 'badge_label', width: 100, label: 'Label', align: 'left', sortable: true, defaultVisible: true },
  { key: 'stage', width: 120, label: 'Stage', align: 'left', sortable: true, defaultVisible: true },
  { key: 'category', width: 140, label: 'Category', align: 'center', sortable: true, defaultVisible: true },
  { key: 'order_type', width: 100, label: 'Type', align: 'center', sortable: true, defaultVisible: true },
  { key: 'is_ignorable', width: 80, label: 'Skip', align: 'center', sortable: true, defaultVisible: true },
  { key: 'sentence_desc', width: 280, label: 'Summary', align: 'left', sortable: false, maxLines: 2, defaultVisible: true },
  { key: 'user_facing_desc', width: 320, label: 'User-Facing', align: 'left', sortable: false, maxLines: 2, defaultVisible: false },
  { key: 'technical_desc', width: 360, label: 'Technical', align: 'left', sortable: false, maxLines: 2, defaultVisible: false },
  { key: 'short_label', width: 140, label: 'Short Label', align: 'left', sortable: false, defaultVisible: false },
  { key: 'ignorable_reason', width: 200, label: 'Ignorable Reason', align: 'left', sortable: false, maxLines: 2, defaultVisible: false },
  { key: 'duration_expectation', width: 160, label: 'Duration', align: 'left', sortable: false, defaultVisible: false },
  { key: 'next_steps', width: 280, label: 'Next Steps', align: 'left', sortable: false, maxLines: 2, defaultVisible: false },
]

export const DEFAULT_STATUS_COLUMNS = ALL_STATUS_COLUMNS
  .filter((col) => col.defaultVisible)
  .map((col) => col.key)

export const STATUS_COLUMNS: ColumnConfig[] = ALL_STATUS_COLUMNS.map((col) => ({
  key: col.key,
  width: col.width,
  align: col.align,
  sortable: col.sortable,
  isSticky: col.isSticky,
  stickyLeft: col.stickyLeft,
  maxLines: col.maxLines,
}))

export const STATUS_COLUMN_LABELS: Record<string, string> = Object.fromEntries(
  ALL_STATUS_COLUMNS.map((col) => [col.key, col.label])
)

// =============================================================================
// TRANSITION COLUMNS
// =============================================================================

const ALL_TRANSITION_COLUMNS: ColumnDef[] = [
  { key: 'from_code', width: 200, label: 'From', align: 'left', sortable: true, isSticky: true, stickyLeft: 0, defaultVisible: true },
  { key: 'to_code', width: 200, label: 'To', align: 'left', sortable: true, defaultVisible: true },
  { key: 'frequency', width: 100, label: 'Frequency', align: 'right', sortable: true, defaultVisible: true },
  { key: 'change_category', width: 120, label: 'Change Type', align: 'center', sortable: true, defaultVisible: true },
  { key: 'coverage', width: 100, label: 'Coverage', align: 'center', sortable: true, defaultVisible: true },
  { key: 'is_ignorable', width: 80, label: 'Skip', align: 'center', sortable: true, defaultVisible: true },
  { key: 'sentence_desc', width: 280, label: 'Summary', align: 'left', sortable: false, maxLines: 2, defaultVisible: true },
  { key: 'user_facing_desc', width: 320, label: 'User-Facing', align: 'left', sortable: false, maxLines: 2, defaultVisible: false },
  { key: 'technical_desc', width: 360, label: 'Technical', align: 'left', sortable: false, maxLines: 2, defaultVisible: false },
]

export const DEFAULT_TRANSITION_COLUMNS = ALL_TRANSITION_COLUMNS
  .filter((col) => col.defaultVisible)
  .map((col) => col.key)

export const TRANSITION_COLUMNS: ColumnConfig[] = ALL_TRANSITION_COLUMNS.map((col) => ({
  key: col.key,
  width: col.width,
  align: col.align,
  sortable: col.sortable,
  isSticky: col.isSticky,
  stickyLeft: col.stickyLeft,
  maxLines: col.maxLines,
}))

export const TRANSITION_COLUMN_LABELS: Record<string, string> = Object.fromEntries(
  ALL_TRANSITION_COLUMNS.map((col) => [col.key, col.label])
)
