/**
 * StickyDataTable V2 - Export Toolbar Component
 *
 * Provides export functionality with a single button that adapts based on selection state.
 * Shows "Export All" when no rows selected, "Export Selected" when rows are selected.
 *
 * @module components/export-toolbar
 */

import * as React from 'react'
import Download01Icon from '@hugeicons-pro/core-stroke-rounded/Download01Icon'

import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Button } from '@/components/ui/base/primitives/button'

import type { SelectionState } from '../types'

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
 * Export toolbar component for StickyDataTable V2
 *
 * Renders a download button that:
 * - Exports all rows when none are selected
 * - Exports selected rows when some are selected
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

  // Determine which export function to use and tooltip text
  const handleExport = () => {
    if (hasSelectedRows && exportSelected && selectionState) {
      exportSelected(selectionState)
    } else if (exportAll) {
      exportAll()
    }
  }

  const tooltipText = hasSelectedRows ? 'Export Selected' : 'Export All'

  return (
    <Button
      onClick={handleExport}
      size="sm"
      color="tertiary"
      title={tooltipText}
    >
      <HugeIcon icon={Download01Icon} size={16} strokeWidth={1.5} />
    </Button>
  )
}


