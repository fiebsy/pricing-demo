/**
 * Orders Table
 *
 * Table wrapper component for displaying order records.
 * Uses StickyDataTable with integrated toolbar layout.
 */

import type { ReactNode } from 'react'
import NumberFlow from '@number-flow/react'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import { TableEmptyState } from '@/components/ui/patterns/data-table/components/core/table-empty-state'
import type { ToolbarLayoutConfig, SortDirection, ColumnConfig } from '@/components/ui/patterns/data-table'
import type { TableBorderConfig } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface OrdersTableProps {
  /** Table data rows */
  data: Record<string, unknown>[]
  /** Column configurations */
  columns: ColumnConfig[]
  /** Column label mapping */
  columnLabels: Record<string, string>
  /** Cell renderer function */
  renderCell: (columnKey: string, row: Record<string, unknown>, index: number) => ReactNode
  /** Whether table is loading */
  isLoading: boolean
  /** Whether column reorder is enabled */
  enableColumnReorder: boolean
  /** Search query for highlighting */
  searchQuery: string
  /** Whether filters are active */
  hasActiveFilters: boolean
  /** Server-side sort column */
  sortColumn: string | null
  /** Server-side sort direction */
  sortDirection: SortDirection
  /** Left toolbar element */
  leftToolbar: ReactNode
  /** Right toolbar element */
  rightToolbar: ReactNode
  /** Table border configuration */
  borderConfig: TableBorderConfig
  /** Callback when columns are reordered */
  onReorderColumns: (fromKey: string, toKey: string) => void
  /** Callback when sort changes */
  onServerSort: (column: string, direction: SortDirection) => void
  /** Callback to reset filters */
  onReset: () => void
}

// =============================================================================
// TABLE DIMENSIONS (from hardened preset)
// =============================================================================

const HARDENED_DIMENSIONS = {
  rowHeight: 52,
  headerHeight: 42,
  borderRadius: 16,
  headerGap: 12,
} as const

const HARDENED_BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_t1',
  headerStickyCell: 'bg-secondary_t1',
  headerStickyCellWithArrows: 'bg-secondary_t1/90',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-secondary_t1/90',
  rowHover: 'bg-tertiary',
}

// =============================================================================
// BORDER COLOR MAPPING
// =============================================================================

const BORDER_COLOR_MAP: Record<string, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  tertiary: 'border-tertiary',
  brand: 'border-brand',
}

// =============================================================================
// TOOLBAR CONFIG HELPER
// =============================================================================

function createToolbarConfig(
  countValue: number,
  countLabel: string,
): ToolbarLayoutConfig {
  return {
    position: 'integrated',
    toolbarBottomMargin: 16,
    toolbarToCountGap: 12,
    headerGap: 12,
    integratedToolbarHeight: 48,
    integratedPadding: { top: 8, bottom: 16, left: 2, right: 0 },
    leftCount: {
      value: countValue,
      label: countLabel,
      renderer: (
        <span className="text-tertiary text-xs font-medium">
          <NumberFlow
            value={countValue}
            locales="en-US"
            className="text-secondary"
            transformTiming={{ duration: 200, easing: 'ease-out' }}
            spinTiming={{ duration: 200, easing: 'ease-out' }}
          />
          {' '}{countLabel}
        </span>
      ),
    },
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OrdersTable({
  data,
  columns,
  columnLabels,
  renderCell,
  isLoading,
  enableColumnReorder,
  searchQuery,
  hasActiveFilters,
  sortColumn,
  sortDirection,
  leftToolbar,
  rightToolbar,
  borderConfig,
  onReorderColumns,
  onServerSort,
  onReset,
}: OrdersTableProps) {
  const toolbarConfig = createToolbarConfig(data.length, 'orders')

  // Convert border config to CSS classes
  const outerColorClass = BORDER_COLOR_MAP[borderConfig.outerBorderColor] || 'border-secondary'
  const headerRowColorClass = BORDER_COLOR_MAP[borderConfig.headerRowBorderColor] || 'border-secondary'
  const rowColorClass = `${BORDER_COLOR_MAP[borderConfig.rowBorderColor] || 'border-secondary'}/40`
  const cellColorClass = `${BORDER_COLOR_MAP[borderConfig.cellBorderColor] || 'border-secondary'}/30`

  return (
    <StickyDataTable<Record<string, unknown>>
      data={isLoading ? [] : data}
      columns={columns}
      columnLabels={columnLabels}
      renderCell={renderCell}
      borderRadius={borderConfig.tableBorderRadius}
      headerHeight={HARDENED_DIMENSIONS.headerHeight}
      rowHeight={HARDENED_DIMENSIONS.rowHeight}
      borderConfig={{
        showOuter: borderConfig.showOuterBorder,
        showBottom: borderConfig.showHeaderRowBorder,
        showRows: borderConfig.showRowBorders,
        showCells: borderConfig.showCellBorders,
        outerColor: outerColorClass,
        headerBottomColor: headerRowColorClass,
        rowColor: rowColorClass,
        cellColor: cellColorClass,
      }}
      backgroundConfig={HARDENED_BACKGROUND_CONFIG}
      toolbarLayout={toolbarConfig}
      leftToolbar={leftToolbar}
      rightToolbar={rightToolbar}
      enableColumnReorder={enableColumnReorder}
      onReorderColumns={onReorderColumns}
      showCount={true}
      totalCount={data.length}
      countLabel="orders"
      getRowId={(row) => String(row.id)}
      hasActiveFilters={hasActiveFilters}
      searchTerm={searchQuery}
      isLoading={isLoading}
      serverSideSort={true}
      onServerSort={onServerSort}
      serverSortColumn={sortColumn}
      serverSortDirection={sortDirection}
      noResultsState={
        <TableEmptyState
          variant="no-results"
          title="No orders found"
          description="This filter combination has no matching orders."
          action={{
            label: 'Clear Filters',
            onClick: onReset,
          }}
        />
      }
      emptyState={
        <TableEmptyState
          variant="empty"
          title="No orders"
          description="There are no orders to display."
        />
      }
      className="snt-table relative"
    />
  )
}
