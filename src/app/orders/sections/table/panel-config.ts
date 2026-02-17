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
          {
            id: 'columnVisibility.total',
            type: 'toggle',
            label: 'Total',
            value: config.columnVisibility.total,
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
      {
        title: 'AutoRoute On',
        controls: [
          {
            id: 'autoRouteBadge.on.displayMode',
            type: 'select',
            label: 'Display',
            value: config.autoRouteBadge.on.displayMode,
            options: [
              { value: 'badge', label: 'Badge' },
              { value: 'icon-only', label: 'Icon Only' },
            ],
          },
          {
            id: 'autoRouteBadge.on.iconStyle',
            type: 'select',
            label: 'Icon Style',
            value: config.autoRouteBadge.on.iconStyle,
            options: [
              { value: 'stroke', label: 'Stroke' },
              { value: 'solid', label: 'Solid' },
              { value: 'bulk', label: 'Bulk' },
            ],
          },
          {
            id: 'autoRouteBadge.on.gradient',
            type: 'select',
            label: 'Fill',
            value: config.autoRouteBadge.on.gradient,
            options: [
              { value: 'none', label: 'None' },
              { value: 'neutral', label: 'Neutral' },
              { value: 'brand', label: 'Brand' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'purple', label: 'Purple' },
              { value: 'ocean', label: 'Ocean' },
            ],
          },
          {
            id: 'autoRouteBadge.on.showText',
            type: 'toggle',
            label: 'Show Text',
            value: config.autoRouteBadge.on.showText,
            disabled: config.autoRouteBadge.on.displayMode === 'icon-only',
          },
        ],
      },
      {
        title: 'AutoRoute Off',
        controls: [
          {
            id: 'autoRouteBadge.off.displayMode',
            type: 'select',
            label: 'Display',
            value: config.autoRouteBadge.off.displayMode,
            options: [
              { value: 'badge', label: 'Badge' },
              { value: 'icon-only', label: 'Icon Only' },
            ],
          },
          {
            id: 'autoRouteBadge.off.iconStyle',
            type: 'select',
            label: 'Icon Style',
            value: config.autoRouteBadge.off.iconStyle,
            options: [
              { value: 'stroke', label: 'Stroke' },
              { value: 'solid', label: 'Solid' },
              { value: 'bulk', label: 'Bulk' },
            ],
          },
          {
            id: 'autoRouteBadge.off.gradient',
            type: 'select',
            label: 'Fill',
            value: config.autoRouteBadge.off.gradient,
            options: [
              { value: 'none', label: 'None' },
              { value: 'neutral', label: 'Neutral' },
              { value: 'brand', label: 'Brand' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'purple', label: 'Purple' },
              { value: 'ocean', label: 'Ocean' },
            ],
          },
          {
            id: 'autoRouteBadge.off.showText',
            type: 'toggle',
            label: 'Show Text',
            value: config.autoRouteBadge.off.showText,
            disabled: config.autoRouteBadge.off.displayMode === 'icon-only',
          },
        ],
      },
      {
        title: 'Status Badge',
        controls: [
          {
            id: 'statusBadge.iconType',
            type: 'select',
            label: 'Icon',
            value: config.statusBadge.iconType,
            options: [
              { value: 'none', label: 'None' },
              { value: 'checkmark', label: 'Checkmark' },
              { value: 'alert', label: 'Alert' },
              { value: 'cancel', label: 'Cancel' },
              { value: 'task-done', label: 'Task Done' },
            ],
          },
          {
            id: 'statusBadge.iconPosition',
            type: 'select',
            label: 'Icon Position',
            value: config.statusBadge.iconPosition,
            options: [
              { value: 'none', label: 'None' },
              { value: 'leading', label: 'Leading' },
              { value: 'trailing', label: 'Trailing' },
            ],
            disabled: config.statusBadge.iconType === 'none',
          },
          {
            id: 'statusBadge.iconStyle',
            type: 'select',
            label: 'Icon Style',
            value: config.statusBadge.iconStyle,
            options: [
              { value: 'stroke', label: 'Stroke' },
              { value: 'solid', label: 'Solid' },
              { value: 'bulk', label: 'Bulk' },
            ],
            disabled: config.statusBadge.iconType === 'none',
          },
        ],
      },
    ],
  }
}
