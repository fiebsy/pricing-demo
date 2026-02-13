/**
 * Status Organization Table
 *
 * Table wrapper component for displaying status organization data.
 * Uses StickyDataTable with integrated toolbar layout.
 */

import type { ReactNode } from 'react'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import type { ToolbarLayoutConfig, ColumnConfig } from '@/components/ui/patterns/data-table'
import type { TableBorderConfig } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface StatusOrganizationTableProps {
  /** Table data rows */
  data: Record<string, unknown>[]
  /** Column configurations */
  columns: ColumnConfig[]
  /** Column label mapping */
  columnLabels: Record<string, string>
  /** Cell renderer function */
  renderCell: (columnKey: string, row: Record<string, unknown>, index: number) => ReactNode
  /** Left toolbar element */
  leftToolbar: ReactNode
  /** Right toolbar element */
  rightToolbar: ReactNode
  /** Table border configuration */
  borderConfig: TableBorderConfig
}

// =============================================================================
// TABLE DIMENSIONS (from hardened preset, slightly denser for reference data)
// =============================================================================

const HARDENED_DIMENSIONS = {
  rowHeight: 48,
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
          <span className="text-secondary">{countValue}</span>
          {' '}{countLabel}
        </span>
      ),
    },
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StatusOrganizationTable({
  data,
  columns,
  columnLabels,
  renderCell,
  leftToolbar,
  rightToolbar,
  borderConfig,
}: StatusOrganizationTableProps) {
  const toolbarConfig = createToolbarConfig(data.length, 'statuses')

  // Convert border config to CSS classes
  const outerColorClass = BORDER_COLOR_MAP[borderConfig.outerBorderColor] || 'border-secondary'
  const headerRowColorClass = BORDER_COLOR_MAP[borderConfig.headerRowBorderColor] || 'border-secondary'
  const rowColorClass = `${BORDER_COLOR_MAP[borderConfig.rowBorderColor] || 'border-secondary'}/40`
  const cellColorClass = `${BORDER_COLOR_MAP[borderConfig.cellBorderColor] || 'border-secondary'}/30`

  return (
    <StickyDataTable<Record<string, unknown>>
      data={data}
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
      enableColumnReorder={false}
      showCount={true}
      totalCount={data.length}
      countLabel="statuses"
      getRowId={(_, index) => String(index)}
      className="snt-table relative"
    />
  )
}
