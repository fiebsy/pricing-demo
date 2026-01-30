/**
 * StickyDataTable V2 - Export Toolbar Component
 *
 * Provides export functionality with a single button that adapts based on selection state.
 * Shows "Export All" when no rows selected, "Export Selected" when rows are selected.
 * Displays a counter badge overlay when rows are selected.
 *
 * @module components/export-toolbar
 */

import * as React from 'react'
import Download01Icon from '@hugeicons-pro/core-stroke-rounded/Download01Icon'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { ButtonUtility } from '@/components/ui/core/primitives/button-utility'

import type { SelectionState } from '../../types'

export interface ExportToolbarProps {
  /** Function to export all rows */
  exportAll?: () => void | Promise<void>
  /** Function to export selected rows - receives selection state as parameter */
  exportSelected?: (selectionState: SelectionState) => void | Promise<void>
  /** Selection state (null if selection is disabled) */
  selectionState: SelectionState | null
  /** Custom toolbar component to render instead of default */
  customToolbar?: React.ReactNode
}

/**
 * Selection counter badge component
 * Displays on top-right of the export button when items are selected
 */
const SelectionCountBadge: React.FC<{ count: number }> = ({ count }) => {
  if (count === 0) return null

  // Format count: show actual number up to 99, then "99+"
  const displayCount = count > 99 ? '99+' : count.toString()

  return (
    <span
      className={cn(
        // Position: top-right corner, offset outside button bounds
        'absolute -top-1.5 -right-1.5',
        // Size and shape
        'min-w-[18px] h-[18px] px-1',
        'rounded-full',
        // Typography
        'text-[10px] font-semibold leading-[18px] text-center',
        // Colors: brand accent for visibility
        'bg-brand-solid text-primary_on-brand',
        // Ensure it's above the button
        'z-10',
        // Subtle entrance animation
        'animate-in fade-in zoom-in-50 duration-150'
      )}
    >
      {displayCount}
    </span>
  )
}

/**
 * Export toolbar component for StickyDataTable V2
 *
 * Renders a download button that:
 * - Exports all rows when none are selected
 * - Exports selected rows when some are selected
 * - Shows a counter badge when rows are selected
 * - Auto-highlights when rows are selected
 */
export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  exportAll,
  exportSelected,
  selectionState,
  customToolbar,
}) => {
  // If custom toolbar is provided, render it instead
  if (customToolbar) {
    return <>{customToolbar}</>
  }

  // If no export functions provided, don't render anything
  if (!exportAll && !exportSelected) {
    return null
  }

  const hasSelectedRows = selectionState ? selectionState.selectedIds.size > 0 : false
  const selectedCount = selectionState?.selectedCount ?? 0

  // Determine which export function to use and tooltip text
  const handleExport = () => {
    if (hasSelectedRows && exportSelected && selectionState) {
      exportSelected(selectionState)
    } else if (exportAll) {
      exportAll()
    }
  }

  const tooltipText = hasSelectedRows
    ? `Export ${selectedCount} Selected`
    : 'Export All'

  // Wrap Hugeicons PRO icon with HugeIcon component for ButtonUtility
  const DownloadIcon = () => <HugeIcon icon={Download01Icon} size={20} strokeWidth={1.5} data-icon />

  return (
    <div className="relative">
      <ButtonUtility
        icon={DownloadIcon}
        tooltip={tooltipText}
        onClick={handleExport}
        size="sm"
        color="tertiary"
        isActive={hasSelectedRows}
      />
      <SelectionCountBadge count={selectedCount} />
    </div>
  )
}


