/**
 * Transitions Table Component
 *
 * StickyDataTable wrapper for transition records with category filtering and column visibility.
 */

'use client'

import { useState, useMemo } from 'react'
import { StickyDataTable } from '@/components/ui/patterns/data-table'
import type { ToolbarLayoutConfig } from '@/components/ui/patterns/data-table'
import type { TransitionRow, OrderSubcategory, StatusRow } from '../config/types'
import {
  TRANSITION_COLUMNS,
  TRANSITION_COLUMN_LABELS,
  DEFAULT_TRANSITION_COLUMNS,
} from '../config/columns'
import { createTransitionCellRenderer } from './CellRenderer'
import { CategoryFilter } from './CategoryFilter'

// =============================================================================
// TYPES
// =============================================================================

interface TransitionsTableProps {
  data: TransitionRow[]
  statuses: StatusRow[]
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STATUS_CATEGORIES: OrderSubcategory[] = [
  'HEALTHY',
  'AT_RISK',
  'OTHER_ACTIVE',
  'LOST_PENDING',
  'COMPLETED',
  'SETTLED',
  'OTHER_CLOSED',
  'NEVER_STARTED',
]

// =============================================================================
// TABLE CONFIGURATION
// =============================================================================

const TABLE_DIMENSIONS = {
  rowHeight: 56,
  headerHeight: 42,
  borderRadius: 12,
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
// COMPONENT
// =============================================================================

// Column groups for the visibility dropdown
const TRANSITION_COLUMN_GROUPS = [
  { label: 'Core', keys: ['from_code', 'to_code', 'frequency', 'change_category', 'coverage', 'is_ignorable'] },
  { label: 'Descriptions', keys: ['sentence_desc', 'user_facing_desc', 'technical_desc'] },
]

export function TransitionsTable({ data, statuses }: TransitionsTableProps) {
  const [categoryFilter, setCategoryFilter] = useState<OrderSubcategory | null>(null)
  const [hideIgnorable, setHideIgnorable] = useState(false)

  // Build status code -> badge_label lookup
  const statusLabelMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const status of statuses) {
      map.set(status.code, status.badge_label)
    }
    return map
  }, [statuses])

  // Build status code -> subcategory lookup
  const statusCategoryMap = useMemo(() => {
    const map = new Map<string, OrderSubcategory>()
    for (const status of statuses) {
      map.set(status.code, status.subcategory)
    }
    return map
  }, [statuses])

  // Create cell renderer with status lookup
  const renderCell = useMemo(
    () => createTransitionCellRenderer(statusLabelMap),
    [statusLabelMap]
  )

  // Filter data based on selected category and ignorable toggle
  const filteredData = useMemo(() => {
    let result = data
    if (categoryFilter) {
      result = result.filter((transition) => {
        const fromCategory = statusCategoryMap.get(transition.from_code)
        const toCategory = statusCategoryMap.get(transition.to_code)
        return fromCategory === categoryFilter || toCategory === categoryFilter
      })
    }
    if (hideIgnorable) {
      result = result.filter((transition) => !transition.is_ignorable)
    }
    return result
  }, [data, categoryFilter, statusCategoryMap, hideIgnorable])

  const totalFrequency = filteredData.reduce((sum, t) => sum + t.frequency, 0)

  const toolbarConfig: ToolbarLayoutConfig = {
    position: 'integrated',
    toolbarBottomMargin: 12,
    toolbarToCountGap: 12,
    headerGap: 12,
    integratedToolbarHeight: 40,
    integratedPadding: { top: 8, bottom: 12, left: 2, right: 0 },
    leftCount: {
      value: filteredData.length,
      label: 'transitions',
      renderer: (
        <span className="text-tertiary text-xs font-medium">
          <span className="text-secondary">{filteredData.length}</span>
          {(categoryFilter || hideIgnorable) ? ` of ${data.length}` : ''} transitions
          <span className="text-tertiary mx-2">·</span>
          <span className="text-secondary">{totalFrequency.toLocaleString()}</span>
          {' '}total occurrences
        </span>
      ),
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <CategoryFilter
          categories={STATUS_CATEGORIES}
          selected={categoryFilter}
          onChange={setCategoryFilter}
        />
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={hideIgnorable}
            onChange={(e) => setHideIgnorable(e.target.checked)}
            className="accent-primary h-3.5 w-3.5 rounded"
          />
          <span className="text-tertiary text-xs">Hide ignorable</span>
        </label>
      </div>
      <StickyDataTable<Record<string, unknown>>
        data={filteredData as unknown as Record<string, unknown>[]}
        columns={TRANSITION_COLUMNS}
        columnLabels={TRANSITION_COLUMN_LABELS}
        renderCell={renderCell}
        borderRadius={TABLE_DIMENSIONS.borderRadius}
        headerHeight={TABLE_DIMENSIONS.headerHeight}
        rowHeight={TABLE_DIMENSIONS.rowHeight}
        borderConfig={BORDER_CONFIG}
        backgroundConfig={BACKGROUND_CONFIG}
        toolbarLayout={toolbarConfig}
        enableColumnReorder={false}
        showCount={true}
        totalCount={filteredData.length}
        countLabel="transitions"
        getRowId={(_, index) => String(index)}
        className="status-audit-table"
        defaultVisibleColumns={DEFAULT_TRANSITION_COLUMNS}
        columnGroups={TRANSITION_COLUMN_GROUPS}
      />
    </div>
  )
}
