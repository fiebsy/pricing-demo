/**
 * Transition Table Section
 *
 * StickyDataTable wrapper for status transitions.
 */

import type { ReactNode } from 'react'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import type { ToolbarLayoutConfig, ColumnConfig } from '@/components/ui/patterns/data-table'

// =============================================================================
// TYPES
// =============================================================================

export interface TransitionTableProps {
  data: Record<string, unknown>[]
  columns: ColumnConfig[]
  columnLabels: Record<string, string>
  renderCell: (columnKey: string, row: Record<string, unknown>, index: number) => ReactNode
  leftToolbar: ReactNode
  rightToolbar: ReactNode
  totalCount: number
  onRowClick?: (row: Record<string, unknown>, index: number) => void
}

// =============================================================================
// TABLE DIMENSIONS
// =============================================================================

const TABLE_DIMENSIONS = {
  rowHeight: 64,
  headerHeight: 42,
  borderRadius: 16,
} as const

const BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_t1',
  headerStickyCell: 'bg-secondary_t1',
  headerStickyCellWithArrows: 'bg-secondary_t1/90',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-secondary_t1/90',
  rowHover: 'bg-tertiary',
}

const BORDER_CONFIG = {
  showOuter: true,
  showBottom: true,
  showRows: true,
  showCells: false,
  outerColor: 'border-primary',
  headerBottomColor: 'border-secondary',
  rowColor: 'border-secondary/40',
  cellColor: 'border-secondary/30',
}

// =============================================================================
// TOOLBAR CONFIG HELPER
// =============================================================================

function createToolbarConfig(totalCount: number): ToolbarLayoutConfig {
  return {
    position: 'integrated',
    toolbarBottomMargin: 16,
    toolbarToCountGap: 12,
    headerGap: 12,
    integratedToolbarHeight: 48,
    integratedPadding: { top: 8, bottom: 16, left: 2, right: 0 },
    leftCount: {
      value: totalCount,
      label: 'transitions',
      renderer: (
        <span className="text-tertiary text-xs font-medium">
          <span className="text-secondary">{totalCount}</span>
          {' '}transitions
        </span>
      ),
    },
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TransitionTable({
  data,
  columns,
  columnLabels,
  renderCell,
  leftToolbar,
  rightToolbar,
  totalCount,
  onRowClick,
}: TransitionTableProps) {
  const toolbarConfig = createToolbarConfig(totalCount)

  return (
    <StickyDataTable<Record<string, unknown>>
      data={data}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
      borderRadius={TABLE_DIMENSIONS.borderRadius}
      headerHeight={TABLE_DIMENSIONS.headerHeight}
      rowHeight={TABLE_DIMENSIONS.rowHeight}
      borderConfig={BORDER_CONFIG}
      backgroundConfig={BACKGROUND_CONFIG}
      toolbarLayout={toolbarConfig}
      leftToolbar={leftToolbar}
      rightToolbar={rightToolbar}
      enableColumnReorder={false}
      showCount={true}
      totalCount={totalCount}
      countLabel="transitions"
      getRowId={(_, index) => String(index)}
      onRowClick={onRowClick}
      className="transition-table relative cursor-pointer"
    />
  )
}
