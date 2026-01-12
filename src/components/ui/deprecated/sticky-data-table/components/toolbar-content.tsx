'use client'

/**
 * StickyDataTable V2 - Toolbar Content Component
 *
 * Reusable toolbar content that can be rendered in either:
 * - 'above' position (default, scrolls with page)
 * - 'integrated' position (sticky with table header)
 *
 * Extracted from index.tsx to eliminate code duplication.
 *
 * @module components/toolbar-content
 */

import type { ReactNode } from 'react'
import type { ColumnConfig, SelectionState } from '../types'
import type { ToolbarLayoutConfig } from '../config'
import { ColumnControlPanel } from './column-control-panel'
import { ExportToolbar } from './export-toolbar'

// ============================================================================
// TYPES
// ============================================================================

export interface ToolbarContentProps {
  /** Whether this is rendered in integrated (sticky) mode */
  isIntegrated: boolean
  /** Toolbar layout configuration */
  toolbarLayout: ToolbarLayoutConfig
  /** Left toolbar slot content */
  leftToolbar?: ReactNode
  /** Right toolbar slot content */
  rightToolbar?: ReactNode
  /** Whether to show count display */
  showCount: boolean
  /** Total count value (used if not overridden in toolbarLayout) */
  totalCount?: number
  /** Count label (e.g., "items", "orders") */
  countLabel: string
  /** Whether to show export button */
  showExportButton: boolean
  /** Export all handler */
  exportAll?: () => void | Promise<void>
  /** Export selected handler */
  exportSelected?: (selectionState: SelectionState) => void | Promise<void>
  /** Custom export toolbar */
  exportToolbar?: ReactNode
  /** Selection state */
  selectionState: SelectionState | null
  /** Whether to show column control */
  showColumnControl: boolean
  /** Column groups for dropdown */
  columnGroups?: Array<{ label: string; keys: string[] }>
  /** All columns (including checkbox if enabled) */
  columnsWithSelection: ColumnConfig[]
  /** Visible column keys */
  visibleColumnKeys: Set<string>
  /** Toggle column visibility */
  toggleColumn: (key: string) => void
  /** Reset columns to default */
  resetColumns: () => void
  /** Column labels (including checkbox label) */
  columnLabelsWithCheckbox: Record<string, string>
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Reusable toolbar content component
 *
 * Renders the toolbar layout with:
 * - Left column: leftToolbar + optional count
 * - Right column: rightToolbar + export + column control + optional count
 *
 * The only differences between 'above' and 'integrated' modes:
 * - minHeight: 40px for above, 32px for integrated
 * - marginBottom: only for above mode (handled by parent)
 * - width: full for integrated
 */
export function ToolbarContent({
  isIntegrated,
  toolbarLayout,
  leftToolbar,
  rightToolbar,
  showCount,
  totalCount,
  countLabel,
  showExportButton,
  exportAll,
  exportSelected,
  exportToolbar,
  selectionState,
  showColumnControl,
  columnGroups,
  columnsWithSelection,
  visibleColumnKeys,
  toggleColumn,
  resetColumns,
  columnLabelsWithCheckbox,
}: ToolbarContentProps) {
  // Determine count display positions
  const showLeftCount = showCount && (toolbarLayout.countPosition === 'left' || toolbarLayout.countPosition === 'both')
  const showRightCount = showCount && (toolbarLayout.countPosition === 'right' || toolbarLayout.countPosition === 'both')
  const stackPosition = toolbarLayout.countStackPosition ?? 'below'

  // Get count values and renderers
  const leftCountValue = toolbarLayout.leftCount?.value ?? totalCount
  const leftCountLabel = toolbarLayout.leftCount?.label ?? countLabel
  const leftCountRenderer = toolbarLayout.leftCount?.renderer
  const rightCountValue = toolbarLayout.rightCount?.value ?? totalCount
  const rightCountLabel = toolbarLayout.rightCount?.label ?? countLabel
  const rightCountRenderer = toolbarLayout.rightCount?.renderer

  // Toolbar row min-height differs between modes
  const toolbarMinHeight = isIntegrated ? 'min-h-[32px]' : 'min-h-[40px]'

  // Default count renderer
  const renderDefaultCount = (value: number | undefined, label: string) => (
    <>
      <span className="text-secondary">{value?.toLocaleString()}</span> {label}
    </>
  )

  // Count element factory - left side
  const renderLeftCount = () => showLeftCount && (
    <div
      className={`${!leftCountRenderer ? 'text-tertiary text-xs font-medium' : ''} ${toolbarLayout.debug ? 'bg-blue-300/50 p-0.5' : ''}`}
      style={{
        marginTop: stackPosition === 'below' && leftToolbar ? toolbarLayout.toolbarToCountGap : 0,
        marginBottom: stackPosition === 'above' && leftToolbar ? toolbarLayout.toolbarToCountGap : 0,
        marginLeft: stackPosition === 'inline' && leftToolbar ? toolbarLayout.toolbarToCountGap : 0,
        paddingLeft: toolbarLayout.countPaddingLeft ?? 0,
      }}
    >
      {leftCountRenderer ?? renderDefaultCount(leftCountValue, leftCountLabel)}
    </div>
  )

  // Count element factory - right side
  const renderRightCount = () => showRightCount && (
    <div
      className={`${!rightCountRenderer ? 'text-tertiary text-xs font-medium' : ''} ${toolbarLayout.debug ? 'bg-green-300/50 p-0.5' : ''}`}
      style={{
        marginTop: stackPosition === 'below' ? toolbarLayout.toolbarToCountGap : 0,
        marginBottom: stackPosition === 'above' ? toolbarLayout.toolbarToCountGap : 0,
        marginRight: stackPosition === 'inline' ? toolbarLayout.toolbarToCountGap : 0,
        paddingRight: toolbarLayout.countPaddingRight ?? 0,
      }}
    >
      {rightCountRenderer ?? renderDefaultCount(rightCountValue, rightCountLabel)}
    </div>
  )

  // Determine flex direction based on stack position
  // Always align to bottom (items-end) so toolbar rows stay closest to table header
  const isInline = stackPosition === 'inline'
  const leftColumnClass = isInline
    ? 'flex flex-row items-center'
    : 'flex flex-col items-start'
  const rightColumnClass = isInline
    ? 'flex flex-row-reverse items-center'
    : 'flex flex-col items-end'

  return (
    <div
      className={`flex items-end gap-4 ${leftToolbar || showLeftCount ? 'justify-between' : 'justify-end'} ${isIntegrated ? 'w-full' : ''} ${toolbarLayout.debug ? 'bg-purple-500/10 p-1' : ''}`}
    >
      {/* Left Column: leftToolbar + optional count (above/below/inline) */}
      {(leftToolbar || showLeftCount) && (
        <div className={`${leftColumnClass} ${toolbarLayout.debug ? 'bg-blue-500/20 p-1 outline outline-1 outline-blue-500' : ''}`}>
          {/* Count above toolbar */}
          {stackPosition === 'above' && renderLeftCount()}
          {leftToolbar && (
            <div className={`flex ${toolbarMinHeight} items-center ${toolbarLayout.debug ? 'bg-blue-500/30 p-0.5' : ''}`}>
              {leftToolbar}
            </div>
          )}
          {/* Count below or inline with toolbar */}
          {(stackPosition === 'below' || stackPosition === 'inline') && renderLeftCount()}
        </div>
      )}

      {/* Right Column: rightToolbar + Export + Column Control + optional count (above/below/inline) */}
      <div className={`${rightColumnClass} ${toolbarLayout.debug ? 'bg-green-500/20 p-1 outline outline-1 outline-green-500' : ''}`}>
        {/* Count above toolbar (in flex-col items-end, this appears first) */}
        {stackPosition === 'above' && renderRightCount()}
        <div className={`flex ${toolbarMinHeight} items-center justify-end gap-2 ${toolbarLayout.debug ? 'bg-green-500/30 p-0.5' : ''}`}>
          {rightToolbar && (
            <div className="flex items-center">
              {rightToolbar}
            </div>
          )}
          {showExportButton && (
            <ExportToolbar
              exportAll={exportAll}
              exportSelected={exportSelected}
              selectionState={selectionState}
              customToolbar={exportToolbar}
            />
          )}
          {showColumnControl && (
            <ColumnControlPanel
              columnGroups={columnGroups}
              allColumns={columnsWithSelection}
              visibleColumnKeys={visibleColumnKeys}
              onToggleColumn={toggleColumn}
              onResetColumns={resetColumns}
              columnLabels={columnLabelsWithCheckbox}
            />
          )}
        </div>
        {/* Count below or inline with toolbar (in flex-row-reverse, inline count appears to the left) */}
        {(stackPosition === 'below' || stackPosition === 'inline') && renderRightCount()}
      </div>
    </div>
  )
}
