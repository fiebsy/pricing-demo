'use client'

/**
 * StickyDataTable V2 - ColumnControlPanel Component
 *
 * Dropdown panel for toggling column visibility.
 * Now uses prod/base/menu with checkbox items for full PROD integration.
 *
 * @module components/column-control-panel
 */

import { memo, useMemo, type ReactNode } from 'react'
import Layout2ColumnIcon from '@hugeicons-pro/core-stroke-rounded/Layout2ColumnIcon'
import { Menu, type MenuItemType, MENU_ITEM_STYLES_SMALL } from '@/components/ui/core/primitives/menu'
import { ButtonUtility } from '@/components/ui/core/primitives/button-utility'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { ColumnConfig } from '../../types'

interface ColumnControlPanelProps {
  /** All available columns */
  allColumns: ColumnConfig[]
  /** Currently visible column keys */
  visibleColumnKeys: Set<string>
  /** Toggle column visibility */
  onToggleColumn: (columnKey: string) => void
  /** Reset to default visibility */
  onResetColumns: () => void
  /** Column labels */
  columnLabels: Record<string, ReactNode>
  /** Optional: Column grouping configuration */
  columnGroups?: Array<{
    label: string
    keys: string[]
  }>
}

/**
 * Column control panel
 *
 * Features:
 * - Checkbox list of all columns (organized by groups if provided)
 * - Sticky column indicator
 * - Reset all option
 */
const ColumnControlPanelBase = ({
  allColumns,
  visibleColumnKeys,
  onToggleColumn,
  onResetColumns,
  columnLabels,
  columnGroups,
}: ColumnControlPanelProps) => {
  // Build menu items from columns
  const menuItems = useMemo((): MenuItemType[] => {
    const items: MenuItemType[] = []

    // Helper to create checkbox item for a column
    const createCheckboxItem = (col: ColumnConfig): MenuItemType => {
      const isVisible = visibleColumnKeys.has(col.key)
      const isSticky = col.isSticky ?? false
      const rawLabel = columnLabels[col.key]
      const baseLabel = typeof rawLabel === 'string' ? rawLabel : col.key
      const label = isSticky ? `${baseLabel} (Sticky)` : baseLabel

      return {
        type: 'checkbox',
        id: col.key,
        label,
        checked: isVisible,
        onCheckedChange: () => onToggleColumn(col.key),
      }
    }

    if (columnGroups && columnGroups.length > 0) {
      // Group columns
      const groupedColumns: Record<string, ColumnConfig[]> = {}
      const ungroupedColumns: ColumnConfig[] = []

      // Initialize groups
      columnGroups.forEach((group) => {
        groupedColumns[group.label] = []
      })

      // Sort columns into groups
      allColumns.forEach((col) => {
        if (col.key === '__checkbox') return

        let found = false
        for (const group of columnGroups) {
          if (group.keys.includes(col.key)) {
            groupedColumns[group.label]?.push(col)
            found = true
            break
          }
        }
        if (!found) {
          ungroupedColumns.push(col)
        }
      })

      // Add grouped columns
      columnGroups.forEach((group) => {
        const groupCols = groupedColumns[group.label]
        if (!groupCols || groupCols.length === 0) return

        items.push({ type: 'label', id: `group-${group.label}`, label: group.label })
        groupCols.forEach((col) => {
          items.push(createCheckboxItem(col))
        })
      })

      // Add ungrouped columns
      if (ungroupedColumns.length > 0) {
        items.push({ type: 'label', id: 'group-other', label: 'Other' })
        ungroupedColumns.forEach((col) => {
          items.push(createCheckboxItem(col))
        })
      }
    } else {
      // No groups - render all columns in one list
      allColumns.forEach((col) => {
        if (col.key === '__checkbox') return
        items.push(createCheckboxItem(col))
      })
    }

    return items
  }, [allColumns, visibleColumnKeys, onToggleColumn, columnLabels, columnGroups])

  // Wrap icon for ButtonUtility
  const ColumnsIcon = () => <HugeIcon icon={Layout2ColumnIcon} size={20} strokeWidth={1.5} data-icon />

  return (
    <Menu
      trigger={
        <ButtonUtility
          icon={ColumnsIcon}
          tooltip="Column Visibility"
          size="sm"
          color="tertiary"
        />
      }
      header={
        <div className={`flex items-center text-quaternary opacity-60 ${MENU_ITEM_STYLES_SMALL.paddingX} ${MENU_ITEM_STYLES_SMALL.minHeight} ${MENU_ITEM_STYLES_SMALL.textSize} font-normal mb-1`}>
          Column visibility
        </div>
      }
      items={menuItems}
      width={180}
      side="bottom"
      align="end"
      className="font-medium [&_[role=menuitemcheckbox]]:min-h-7 [&_[role=menuitemcheckbox]]:py-1 [&_.size-4]:size-3.5"
    />
  )
}

export const ColumnControlPanel = memo(ColumnControlPanelBase)
ColumnControlPanel.displayName = 'ColumnControlPanel'
