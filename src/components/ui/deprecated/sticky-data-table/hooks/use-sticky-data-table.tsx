'use client'

/**
 * StickyDataTable V2 - Main Table Hook
 *
 * Orchestrates all table state and logic in a single hook.
 * Extracted from index.tsx for better testability and separation of concerns.
 *
 * This hook manages:
 * - Column visibility and configuration
 * - Sorting (client-side or server-side)
 * - Scroll synchronization
 * - Row selection
 * - Infinite scroll handling
 * - Configuration merging
 *
 * @module hooks/use-sticky-data-table
 */

import { useMemo, useRef, type ReactNode } from 'react'
import * as React from 'react'

import {
  createBackgroundConfig,
  createBorderConfig,
  createStickyState,
  createToolbarLayoutConfig,
  DEFAULT_BACKGROUND_CONFIG,
  TABLE_CONFIG,
  type ToolbarLayoutConfig,
} from '../config'
import { useTablePageBackground, getBackgroundCssVar } from '../context/page-background-context'
import type {
  BackgroundConfig,
  BorderConfig,
  ColumnConfig,
  ColumnChange,
  ComputedColumn,
  InfiniteScrollConfig,
  SelectionState,
  SortColumn,
  SortDirection,
  StickyState,
} from '../types'
import { computeColumnOffsets, separateColumns } from '../utils'
import { useColumns } from './use-columns'
import { useScrollSync } from './use-scroll-sync'
import { useSelection } from './use-selection'
import { useSort } from './use-sort'
import { useWheelRedirect } from './use-wheel-redirect'
import { LoadMoreSkeleton } from '../components'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props for the useStickyDataTable hook
 * Mirrors the main component props for logic extraction
 */
export interface UseStickyDataTableProps<T extends Record<string, unknown>> {
  data: T[]
  columns: ColumnConfig[]
  columnLabels: Record<string, string>
  borderRadius?: number
  borderConfig?: Partial<BorderConfig>
  backgroundConfig?: Partial<BackgroundConfig>
  showColumnControl?: boolean
  enableSelection?: boolean
  getRowId?: (row: T, index: number) => string | number
  exportAll?: () => void | Promise<void>
  exportSelected?: (selectionState: SelectionState) => void | Promise<void>
  exportToolbar?: ReactNode
  defaultHiddenColumns?: string[]
  defaultVisibleColumns?: string[]
  leftToolbar?: ReactNode
  rightToolbar?: ReactNode
  showCount?: boolean
  // Toolbar layout
  toolbarLayout?: ToolbarLayoutConfig
  // Server-side sorting
  serverSideSort?: boolean
  onServerSort?: (columnKey: string, direction: SortDirection) => void
  serverSortColumn?: string | null
  serverSortDirection?: SortDirection
  // Infinite scroll
  infiniteScroll?: InfiniteScrollConfig
  // Legacy props
  loadingIndicator?: ReactNode
  onEndReached?: () => void
  onEndReachedThreshold?: number
}

/**
 * Return value from useStickyDataTable hook
 * Provides all state and handlers needed by the component
 */
export interface UseStickyDataTableReturn<T extends Record<string, unknown>> {
  // Refs
  headerScrollRef: React.RefObject<HTMLDivElement | null>
  bodyScrollRef: React.RefObject<HTMLDivElement | null>

  // Merged configs
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
  /** CSS variable for gradient overlays - matches headerWrapper background */
  gradientBackgroundCssVar: string

  // Column state
  columnsWithSelection: ColumnConfig[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  allVisibleColumns: ComputedColumn[]
  visibleColumnKeys: Set<string>
  leavingColumnKeys: Set<string>
  leavingColumns: ComputedColumn[]
  enteringColumnKeys: Set<string>
  columnChange: ColumnChange | null
  toggleColumn: (key: string) => void
  resetColumns: () => void
  totalStickyWidth: number
  columnLabelsWithCheckbox: Record<string, string>

  // Sort state
  sortColumn: SortColumn
  sortDirection: SortDirection
  sortedData: T[]
  handleSort: (columnKey: string) => void

  // Scroll state
  stickyState: StickyState
  showScrollIndicator: boolean
  handleScrollLeft: () => void
  handleScrollRight: () => void

  // Selection state (null when selection is disabled)
  selectionState: SelectionState | null

  // Toolbar state
  showExportButton: boolean
  showToolbar: boolean

  // Toolbar layout (resolved with defaults, leftCount/rightCount are runtime values)
  toolbarLayout: ToolbarLayoutConfig

  // Infinite scroll
  effectiveOnEndReached: (() => void) | undefined
  effectiveThreshold: number
  effectiveLoadingIndicator: ReactNode
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Main orchestration hook for StickyDataTable
 *
 * Extracts all business logic from the main component, making it:
 * - Testable in isolation
 * - Reusable for custom table implementations
 * - Easier to understand and maintain
 *
 * @example
 * ```tsx
 * const tableState = useStickyDataTable({
 *   data,
 *   columns,
 *   columnLabels,
 *   enableSelection: true,
 *   getRowId: (row) => row.id,
 * })
 *
 * // Use tableState in your custom rendering
 * ```
 */
export function useStickyDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  columnLabels,
  borderRadius = TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  borderConfig: borderConfigOverrides,
  backgroundConfig: backgroundConfigOverrides,
  showColumnControl = true,
  enableSelection = false,
  getRowId,
  exportAll,
  exportSelected,
  exportToolbar,
  defaultHiddenColumns = [],
  defaultVisibleColumns,
  leftToolbar,
  rightToolbar,
  showCount = false,
  // Toolbar layout
  toolbarLayout: toolbarLayoutOverrides,
  // Server-side sorting
  serverSideSort = false,
  onServerSort,
  serverSortColumn,
  serverSortDirection,
  // Infinite scroll
  infiniteScroll,
  // Legacy props
  loadingIndicator,
  onEndReached,
  onEndReachedThreshold,
}: UseStickyDataTableProps<T>): UseStickyDataTableReturn<T> {
  // ==========================================================================
  // REFS
  // ==========================================================================

  const headerScrollRef = useRef<HTMLDivElement>(null)
  const bodyScrollRef = useRef<HTMLDivElement>(null)

  // ==========================================================================
  // PAGE BACKGROUND CONTEXT
  // ==========================================================================

  // Read page background from React context (if provider is present)
  const pageBackground = useTablePageBackground()

  // ==========================================================================
  // MERGED CONFIGS
  // ==========================================================================

  const borderConfig = useMemo(
    () => createBorderConfig(borderConfigOverrides),
    [borderConfigOverrides]
  )

  // Background config merges in this priority order:
  // 1. Explicit backgroundConfig.headerWrapper that differs from default (highest priority)
  // 2. Page background from React context
  // 3. Default configuration
  //
  // Note: We check if headerWrapper differs from the default because toTableProps()
  // always includes the full config. Only treat it as an explicit override if
  // the user intentionally changed it from the default.
  const isExplicitHeaderWrapperOverride = useMemo(() => {
    if (!backgroundConfigOverrides?.headerWrapper) return false
    return backgroundConfigOverrides.headerWrapper !== DEFAULT_BACKGROUND_CONFIG.headerWrapper
  }, [backgroundConfigOverrides?.headerWrapper])

  const backgroundConfig = useMemo(() => {
    // If explicit headerWrapper override (different from default), use it
    if (isExplicitHeaderWrapperOverride) {
      return createBackgroundConfig(backgroundConfigOverrides)
    }

    // If page background context is available, use it as the headerWrapper
    if (pageBackground) {
      return createBackgroundConfig({
        ...backgroundConfigOverrides,
        headerWrapper: pageBackground.backgroundClass,
      })
    }

    // Fall back to defaults
    return createBackgroundConfig(backgroundConfigOverrides)
  }, [backgroundConfigOverrides, pageBackground, isExplicitHeaderWrapperOverride])

  // Compute CSS variable for gradient overlays
  // Priority: explicit override > context > default
  const gradientBackgroundCssVar = useMemo(() => {
    if (isExplicitHeaderWrapperOverride && backgroundConfigOverrides?.headerWrapper) {
      return getBackgroundCssVar(backgroundConfigOverrides.headerWrapper)
    }
    if (pageBackground) {
      return pageBackground.backgroundCssVar
    }
    return 'var(--background-color-secondary_alt)'
  }, [isExplicitHeaderWrapperOverride, backgroundConfigOverrides?.headerWrapper, pageBackground])

  // Toolbar layout config (resolved with defaults)
  const toolbarLayout = useMemo(
    () => createToolbarLayoutConfig(toolbarLayoutOverrides),
    [toolbarLayoutOverrides]
  )

  // ==========================================================================
  // SELECTION SETUP
  // ==========================================================================

  // Generate row IDs for selection
  const rowIds = useMemo(() => {
    if (!enableSelection || !getRowId) return []
    return data.map((row, index) => getRowId(row, index))
  }, [data, enableSelection, getRowId])

  // Selection state
  const selectionState = useSelection({
    rowIds,
    enabled: enableSelection,
  })

  // ==========================================================================
  // COLUMNS WITH SELECTION
  // ==========================================================================

  // Add checkbox column if selection enabled
  const columnsWithSelection = useMemo(() => {
    if (!enableSelection) return columns

    // Check if checkbox column already exists
    if (columns.some((col) => col.key === '__checkbox')) return columns

    // Add checkbox column as first sticky column
    const checkboxColumn: ColumnConfig = {
      key: '__checkbox',
      width: 48,
      align: 'center',
      isSticky: true,
      stickyLeft: 0,
      sortable: false,
    }

    // Adjust stickyLeft for existing sticky columns
    const adjustedColumns = columns.map((col) => {
      if (col.isSticky && col.stickyLeft !== undefined) {
        return { ...col, stickyLeft: col.stickyLeft + checkboxColumn.width }
      }
      return col
    })

    return [checkboxColumn, ...adjustedColumns]
  }, [columns, enableSelection])

  // ==========================================================================
  // COLUMN MANAGEMENT
  // ==========================================================================

  const {
    stickyColumns: rawStickyColumns,
    scrollableColumns: rawScrollableColumns,
    visibleColumnKeys,
    leavingColumnKeys,
    leavingColumns,
    enteringColumnKeys,
    columnChange,
    toggleColumn,
    resetColumns,
    totalStickyWidth,
  } = useColumns({
    columns: columnsWithSelection,
    defaultHiddenColumns,
    defaultVisibleColumns,
  })

  // Compute column positions (leaving columns excluded - rendered as absolute overlay)
  const allVisibleColumns = useMemo(() => {
    const visible = columnsWithSelection.filter((col) => visibleColumnKeys.has(col.key))
    return computeColumnOffsets(visible)
  }, [columnsWithSelection, visibleColumnKeys])

  const { stickyColumns, scrollableColumns } = useMemo(
    () => separateColumns(allVisibleColumns),
    [allVisibleColumns]
  )

  // ==========================================================================
  // SORTING
  // ==========================================================================

  // Client-side sorting
  const clientSort = useSort({ data })

  // Determine which sort state to use
  const sortColumn = serverSideSort ? (serverSortColumn ?? null) : clientSort.sortColumn
  const sortDirection = serverSideSort ? (serverSortDirection ?? 'desc') : clientSort.sortDirection
  const sortedData = serverSideSort ? data : clientSort.sortedData

  // Handle sort click - delegates to server or client
  const handleSort = (columnKey: string) => {
    if (serverSideSort && onServerSort) {
      // Server-side: calculate new direction and call callback
      const newDirection = sortColumn === columnKey ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'desc'
      onServerSort(columnKey, newDirection)
    } else {
      // Client-side: use internal hook
      clientSort.handleSort(columnKey)
    }
  }

  // ==========================================================================
  // SCROLL SYNCHRONIZATION
  // ==========================================================================

  const { canScrollLeft, canScrollRight, showScrollIndicator, handleScrollLeft, handleScrollRight } = useScrollSync({
    headerRef: headerScrollRef,
    bodyRef: bodyScrollRef,
  })

  // Wheel redirect for vertical scrolling
  useWheelRedirect({ bodyRef: bodyScrollRef })

  // Create sticky state
  const stickyState = useMemo(
    () => createStickyState(canScrollLeft, canScrollRight),
    [canScrollLeft, canScrollRight]
  )

  // ==========================================================================
  // COLUMN LABELS
  // ==========================================================================

  const columnLabelsWithCheckbox = useMemo(() => {
    if (!enableSelection) return columnLabels
    return { __checkbox: '', ...columnLabels }
  }, [columnLabels, enableSelection])

  // ==========================================================================
  // TOOLBAR STATE
  // ==========================================================================

  const showExportButton = !!(exportAll || exportSelected || exportToolbar)
  const showToolbar = !!(leftToolbar || rightToolbar || showExportButton || showColumnControl || showCount)

  // ==========================================================================
  // INFINITE SCROLL
  // ==========================================================================

  // Compute effective infinite scroll values (new API takes precedence over legacy)
  const effectiveOnEndReached = useMemo(() => {
    if (infiniteScroll) {
      // New API: only trigger if hasNextPage and not already loading
      return infiniteScroll.hasNextPage && !infiniteScroll.isLoadingMore
        ? infiniteScroll.onLoadMore
        : undefined
    }
    // Legacy API fallback
    return onEndReached
  }, [infiniteScroll, onEndReached])

  const effectiveThreshold = infiniteScroll?.threshold ?? onEndReachedThreshold ?? 200

  // Generate loading indicator for both initial load and infinite scroll load more
  // Priority:
  // 1. loadingIndicator prop (always shown when passed - handles initial load + custom indicators)
  // 2. infiniteScroll.customIndicator (shown only during load more)
  // 3. Auto-generated LoadMoreSkeleton (shown only during load more)
  const effectiveLoadingIndicator = useMemo(() => {
    // If explicit loadingIndicator prop is passed, always use it
    // This handles initial load scenarios where the page wants to show skeleton rows
    if (loadingIndicator) {
      return loadingIndicator
    }

    // If using new infiniteScroll config (for load more scenarios)
    if (infiniteScroll) {
      // Custom indicator takes precedence
      if (infiniteScroll.customIndicator) {
        return infiniteScroll.isLoadingMore ? infiniteScroll.customIndicator : null
      }

      // Auto-generate LoadMoreSkeleton when loading more pages
      if (infiniteScroll.isLoadingMore) {
        return (
          <LoadMoreSkeleton
            columns={columnsWithSelection}
            rowCount={infiniteScroll.skeletonRowCount ?? 5}
            asRowsOnly={true}
            rowHeight={TABLE_CONFIG.ROW_HEIGHT}
            enableSelection={enableSelection}
            defaultVisibleColumns={defaultVisibleColumns}
            borderConfig={borderConfigOverrides}
            backgroundConfig={backgroundConfigOverrides}
            // stickyState will be injected by TableBody via React.cloneElement
          />
        )
      }

      return null
    }

    return null
  }, [
    infiniteScroll,
    loadingIndicator,
    columnsWithSelection,
    enableSelection,
    defaultVisibleColumns,
    borderConfigOverrides,
    backgroundConfigOverrides,
  ])

  // ==========================================================================
  // RETURN
  // ==========================================================================

  return {
    // Refs
    headerScrollRef,
    bodyScrollRef,

    // Merged configs
    borderConfig,
    backgroundConfig,
    gradientBackgroundCssVar,

    // Column state
    columnsWithSelection,
    stickyColumns,
    scrollableColumns,
    allVisibleColumns,
    visibleColumnKeys,
    leavingColumnKeys,
    leavingColumns,
    enteringColumnKeys,
    columnChange,
    toggleColumn,
    resetColumns,
    totalStickyWidth,
    columnLabelsWithCheckbox,

    // Sort state
    sortColumn,
    sortDirection,
    sortedData,
    handleSort,

    // Scroll state
    stickyState,
    showScrollIndicator,
    handleScrollLeft,
    handleScrollRight,

    // Selection state
    selectionState,

    // Toolbar state
    showExportButton,
    showToolbar,

    // Toolbar layout (resolved with defaults)
    toolbarLayout,

    // Infinite scroll
    effectiveOnEndReached,
    effectiveThreshold,
    effectiveLoadingIndicator,
  }
}
