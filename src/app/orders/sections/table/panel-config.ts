/**
 * Orders Page - Table Panel Configuration
 *
 * Control panel section for column visibility, reordering, and table borders.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { OrdersPageConfig } from '../../types'

// =============================================================================
// BORDER COLOR OPTIONS
// =============================================================================

const BORDER_COLOR_OPTIONS = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'brand', label: 'Brand' },
]

// =============================================================================
// COLUMNS SECTION
// =============================================================================

export function createColumnsSection(config: OrdersPageConfig): Section {
  return {
    id: 'columns',
    title: 'Columns',
    tabLabel: 'Cols',
    groups: [
      {
        title: 'Column Visibility',
        controls: [
          {
            id: 'columnVisibility.customer',
            type: 'toggle',
            label: 'Customer',
            value: config.columnVisibility.customer,
          },
          {
            id: 'columnVisibility.order',
            type: 'toggle',
            label: 'Order',
            value: config.columnVisibility.order,
          },
          {
            id: 'columnVisibility.route',
            type: 'toggle',
            label: 'Route',
            value: config.columnVisibility.route,
          },
          {
            id: 'columnVisibility.plan',
            type: 'toggle',
            label: 'Plan',
            value: config.columnVisibility.plan,
          },
          {
            id: 'columnVisibility.type',
            type: 'toggle',
            label: 'Type',
            value: config.columnVisibility.type,
          },
          {
            id: 'columnVisibility.status',
            type: 'toggle',
            label: 'Status',
            value: config.columnVisibility.status,
          },
        ],
      },
      {
        title: 'Column Reorder',
        controls: [
          {
            id: 'enableColumnReorder',
            type: 'toggle',
            label: 'Enable Drag Reorder',
            value: config.enableColumnReorder,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// TABLE SECTION
// =============================================================================

export function createTableSection(config: OrdersPageConfig): Section {
  return {
    id: 'table',
    title: 'Table',
    tabLabel: 'Table',
    groups: [
      {
        title: 'Outer Border',
        controls: [
          {
            id: 'tableBorder.showOuterBorder',
            type: 'toggle',
            label: 'Show Border',
            value: config.tableBorder.showOuterBorder,
          },
          {
            id: 'tableBorder.outerBorderColor',
            type: 'select',
            label: 'Color',
            value: config.tableBorder.outerBorderColor,
            options: BORDER_COLOR_OPTIONS,
          },
          {
            id: 'tableBorder.tableBorderRadius',
            type: 'slider',
            label: 'Corner Radius',
            value: config.tableBorder.tableBorderRadius,
            min: 0,
            max: 24,
            step: 2,
          },
        ],
      },
      {
        title: 'Header Row Border',
        controls: [
          {
            id: 'tableBorder.showHeaderRowBorder',
            type: 'toggle',
            label: 'Show Border',
            value: config.tableBorder.showHeaderRowBorder,
          },
          {
            id: 'tableBorder.headerRowBorderColor',
            type: 'select',
            label: 'Color',
            value: config.tableBorder.headerRowBorderColor,
            options: BORDER_COLOR_OPTIONS,
          },
        ],
      },
      {
        title: 'Row Borders',
        controls: [
          {
            id: 'tableBorder.showRowBorders',
            type: 'toggle',
            label: 'Show Borders',
            value: config.tableBorder.showRowBorders,
          },
          {
            id: 'tableBorder.rowBorderColor',
            type: 'select',
            label: 'Color',
            value: config.tableBorder.rowBorderColor,
            options: BORDER_COLOR_OPTIONS,
          },
        ],
      },
      {
        title: 'Cell Borders',
        controls: [
          {
            id: 'tableBorder.showCellBorders',
            type: 'toggle',
            label: 'Show Borders',
            value: config.tableBorder.showCellBorders,
          },
          {
            id: 'tableBorder.cellBorderColor',
            type: 'select',
            label: 'Color',
            value: config.tableBorder.cellBorderColor,
            options: BORDER_COLOR_OPTIONS,
          },
        ],
      },
    ],
  }
}
