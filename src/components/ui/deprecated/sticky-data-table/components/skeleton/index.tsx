'use client'

/**
 * TableSkeleton Component V2
 *
 * Enhanced skeleton loader for StickyDataTable that matches exact dimensions
 * AND sticky column styling to prevent layout shift.
 *
 * ## RECOMMENDED PATTERN (Single Component)
 *
 * Instead of using TableSkeleton separately, prefer using StickyDataTable with
 * `isLoading` and `loadingIndicator` props. This renders the real toolbar
 * immediately and only shows skeleton for rows:
 *
 * ```tsx
 * <StickyDataTable
 *   data={hasData ? data : []}
 *   isLoading={!hasData}
 *   leftToolbar={<FilterDropdown />}  // Renders immediately
 *   rightToolbar={<Search />}         // Renders immediately
 *   loadingIndicator={
 *     <LoadMoreSkeleton
 *       columns={columns}
 *       rowCount={10}
 *       asRowsOnly={true}
 *     />
 *   }
 * />
 * ```
 *
 * ## WHEN TO USE TableSkeleton
 *
 * TableSkeleton is still useful for:
 * - Playground/demo environments showing all skeleton modes
 * - Cases where you need a completely static skeleton preview
 * - Legacy code migration (gradually move to single component pattern)
 *
 * ## KEY FEATURES
 * - Unified column processing (same as real table)
 * - Sticky column awareness with proper positioning
 * - Border/background config support
 * - Selection checkbox support
 * - Scrollable state simulation
 *
 * @module skeleton
 *
 * @example
 * ```tsx
 * // PREFERRED: Single component pattern (no toolbar skeleton)
 * <StickyDataTable
 *   data={isLoading ? [] : data}
 *   isLoading={isLoading}
 *   loadingIndicator={<LoadMoreSkeleton columns={cols} rowCount={10} asRowsOnly />}
 * />
 *
 * // LEGACY: Full skeleton (for playground/demos only)
 * <TableSkeleton columns={columns} skeletonRowCount={10} />
 * ```
 */
import * as React from 'react'
import { useMemo, useState } from 'react'

import {
  TABLE_CONFIG,
  calculateSkeletonHeight,
  createSkeletonDimensionConfig,
  type ToolbarConfig,
  type SkeletonDimensionConfig,
  type ToolbarLayoutConfig,
} from '../../config'
import type {
  ColumnConfig,
  StickyState,
  BorderConfig,
  BackgroundConfig,
  StickyDataTableProps,
  SkeletonCellConfig,
} from '../../types'
import { processColumns, createVisibleColumnKeys } from '../../utils'

// Internal components
import { SkeletonHeaderSticky } from './skeleton-header'
import { SkeletonBodySticky, SkeletonRowSticky } from './skeleton-body'
import { ToolbarSkeleton } from './toolbar-skeleton'
import { getBodyOuterBorders, getBodyOuterBorderStyles } from '../../utils'

// ============================================================================
// TYPES
// ============================================================================

export interface TableSkeletonProps {
  /** Column configuration - must match StickyDataTable columns */
  columns: ColumnConfig[]
  /** Number of skeleton rows to display */
  skeletonRowCount?: number
  /**
   * Show toolbar skeleton above table
   * @deprecated Use single-component pattern with StickyDataTable instead.
   * Pass real toolbar components to leftToolbar/rightToolbar props.
   */
  showToolbar?: boolean
  /**
   * Show left toolbar in skeleton
   * @deprecated Use single-component pattern with StickyDataTable instead.
   * Pass real toolbar components to leftToolbar/rightToolbar props.
   */
  showLeftToolbar?: boolean
  /** Border radius (default: 20px) */
  borderRadius?: number
  /** Custom className */
  className?: string

  // ============================================================================
  // TOOLBAR CONFIGURATION (DEPRECATED - use single-component pattern)
  // ============================================================================

  /**
   * Toolbar configuration for precise height calculation
   * @deprecated Use single-component pattern with StickyDataTable + loadingIndicator instead.
   * This prevents layout shift from toolbar skeleton mismatches.
   */
  toolbarConfig?: ToolbarConfig

  /**
   * Custom row height (px)
   */
  rowHeight?: number

  /**
   * Custom header height (px)
   */
  headerHeight?: number

  /**
   * Full skeleton dimension configuration
   */
  dimensionConfig?: SkeletonDimensionConfig

  // ============================================================================
  // STICKY COLUMN SYNCHRONIZATION
  // ============================================================================

  /**
   * Enable selection checkbox column
   * When true, adds checkbox column exactly like StickyDataTable
   */
  enableSelection?: boolean

  /**
   * Array of visible column keys
   * Use this to match defaultVisibleColumns from StickyDataTable
   */
  defaultVisibleColumns?: string[]

  /**
   * Simulate sticky state for skeleton
   * - 'scrollable': Show enhanced sticky styling (backgrounds, borders)
   * - 'no-scroll': Show default styling (no enhanced backgrounds)
   * - 'auto': Automatically detect based on column widths (default)
   */
  simulateStickyState?: 'scrollable' | 'no-scroll' | 'auto'

  /**
   * Border configuration overrides
   * Pass the same borderConfig as StickyDataTable for perfect match
   */
  borderConfig?: Partial<BorderConfig>

  /**
   * Background configuration overrides
   * Pass the same backgroundConfig as StickyDataTable for perfect match
   */
  backgroundConfig?: Partial<BackgroundConfig>

  /**
   * Toolbar layout configuration
   * When position is 'integrated', toolbar skeleton renders in sticky header area
   */
  toolbarLayout?: ToolbarLayoutConfig

  // ============================================================================
  // CELL CONFIGURATION
  // ============================================================================

  /**
   * Configuration for header cell skeletons
   * Controls width mode, dimensions, and styling
   */
  headerCellConfig?: SkeletonCellConfig

  /**
   * Configuration for body cell skeletons
   * Controls width mode, dimensions, and styling
   */
  bodyCellConfig?: SkeletonCellConfig
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * TableSkeleton Component V2
 *
 * Full skeleton loader with sticky column awareness.
 * Uses unified column processing for perfect alignment with StickyDataTable.
 *
 * ## Basic Usage
 * ```tsx
 * <TableSkeleton
 *   columns={columns}
 *   skeletonRowCount={10}
 *   showToolbar={true}
 * />
 * ```
 *
 * ## With Sticky Column Support (Recommended)
 * ```tsx
 * <TableSkeleton
 *   columns={columns}
 *   skeletonRowCount={10}
 *   enableSelection={true}
 *   simulateStickyState="scrollable"
 *   borderConfig={borderConfig}
 *   backgroundConfig={backgroundConfig}
 *   toolbarConfig={{
 *     showToolbar: true,
 *     showLeftToolbar: true,
 *     showCount: true,
 *   }}
 * />
 * ```
 */
export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  skeletonRowCount = 10,
  showToolbar = false,
  showLeftToolbar = false,
  borderRadius = TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  className,
  toolbarConfig,
  rowHeight,
  headerHeight,
  dimensionConfig,
  // New sticky synchronization props
  enableSelection = false,
  defaultVisibleColumns,
  simulateStickyState = 'auto',
  borderConfig: borderConfigOverrides,
  backgroundConfig: backgroundConfigOverrides,
  toolbarLayout,
  // Cell configuration
  headerCellConfig,
  bodyCellConfig,
}) => {
  // Track actual overflow state (measured from DOM)
  const [hasOverflow, setHasOverflow] = useState<boolean | null>(null)

  // Process columns with unified logic
  const processed = useMemo(() => {
    // Create visible column keys set
    const visibleColumnKeys = createVisibleColumnKeys(columns, defaultVisibleColumns)

    // Determine if we should simulate scrollable state
    let simulateScrollable: boolean

    if (simulateStickyState === 'scrollable') {
      // Explicitly set to scrollable
      simulateScrollable = true
    } else if (simulateStickyState === 'no-scroll') {
      // Explicitly set to no-scroll
      simulateScrollable = false
    } else {
      // 'auto' mode: use measured overflow if available, otherwise fall back to column check
      if (hasOverflow !== null) {
        // Use measured overflow state
        simulateScrollable = hasOverflow
      } else {
        // Initial render: check if columns are sticky (will be updated when overflow is measured)
        simulateScrollable = columns.some((col) => col.isSticky)
      }
    }

    return processColumns({
      columns,
      enableSelection,
      visibleColumnKeys,
      simulateScrollable,
      borderConfig: borderConfigOverrides,
      backgroundConfig: backgroundConfigOverrides,
    })
  }, [columns, enableSelection, defaultVisibleColumns, simulateStickyState, hasOverflow, borderConfigOverrides, backgroundConfigOverrides])

  // Build effective configuration from props
  const effectiveConfig: SkeletonDimensionConfig = useMemo(() => {
    if (dimensionConfig) {
      return dimensionConfig
    }

    if (toolbarConfig) {
      return createSkeletonDimensionConfig({
        toolbar: toolbarConfig,
        rowHeight,
        borderRadius,
      })
    }

    // Legacy props fallback
    return createSkeletonDimensionConfig({
      toolbar: {
        showToolbar,
        showLeftToolbar,
        showColumnControl: showToolbar,
        showExportButton: showToolbar,
      },
      rowHeight,
      borderRadius,
    })
  }, [dimensionConfig, toolbarConfig, showToolbar, showLeftToolbar, rowHeight, borderRadius])

  // Calculate heights - pass toolbarLayout for accurate margin/padding calculation
  const effectiveRowHeight = effectiveConfig.rowHeight ?? TABLE_CONFIG.ROW_HEIGHT
  const totalHeight = calculateSkeletonHeight(effectiveConfig, skeletonRowCount, toolbarLayout)

  // Extract toolbar settings
  const toolbarSettings = effectiveConfig.toolbar

  // Check if toolbar is integrated (renders in sticky header, not above table)
  const isToolbarIntegrated = toolbarLayout?.position === 'integrated'

  return (
    <div className={className} style={{ height: totalHeight }}>
      {/* Toolbar Skeleton - Only render when NOT integrated */}
      {toolbarSettings.showToolbar && !isToolbarIntegrated && (
        <ToolbarSkeleton
          showFilter={toolbarSettings.showLeftToolbar}
          showSearch={toolbarSettings.showRightToolbar}
          showExport={toolbarSettings.showExportButton}
          showColumnControl={toolbarSettings.showColumnControl}
          showCount={toolbarSettings.showCount}
          toolbarLayout={toolbarLayout}
        />
      )}

      {/* Sticky Header Skeleton (includes integrated toolbar when applicable) */}
      <SkeletonHeaderSticky
        processed={processed}
        borderRadius={effectiveConfig.borderRadius ?? borderRadius}
        toolbarLayout={toolbarLayout}
        toolbarConfig={toolbarSettings}
        headerHeight={headerHeight}
        headerCellConfig={headerCellConfig}
      />

      {/* Body Skeleton */}
      <SkeletonBodySticky
        processed={processed}
        rowCount={skeletonRowCount}
        rowHeight={effectiveRowHeight}
        borderRadius={effectiveConfig.borderRadius ?? borderRadius}
        onOverflowDetected={simulateStickyState === 'auto' ? setHasOverflow : undefined}
        bodyCellConfig={bodyCellConfig}
      />
    </div>
  )
}

// ============================================================================
// LOAD MORE SKELETON
// ============================================================================

export interface LoadMoreSkeletonProps {
  /** Column configuration */
  columns: ColumnConfig[]
  /** Number of skeleton rows */
  rowCount: number
  /** Border radius (default: 20px) */
  borderRadius?: number
  /** Render as rows only without wrapper (for injection into table body) */
  asRowsOnly?: boolean
  /** Custom row height (px) */
  rowHeight?: number
  /** Enable selection (to match table's checkbox column) */
  enableSelection?: boolean
  /** Default visible columns */
  defaultVisibleColumns?: string[]
  /** Border config overrides */
  borderConfig?: Partial<BorderConfig>
  /** Background config overrides */
  backgroundConfig?: Partial<BackgroundConfig>
  /** Sticky state from table - determines if enhanced styling should be used */
  stickyState?: StickyState
  /** Configuration for body cell skeletons */
  bodyCellConfig?: SkeletonCellConfig
}

export const LoadMoreSkeleton: React.FC<LoadMoreSkeletonProps> = ({
  columns,
  rowCount,
  borderRadius = TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  asRowsOnly = false,
  rowHeight = TABLE_CONFIG.ROW_HEIGHT,
  enableSelection = false,
  defaultVisibleColumns,
  borderConfig: borderConfigOverrides,
  backgroundConfig: backgroundConfigOverrides,
  stickyState,
  bodyCellConfig,
}) => {
  // Process columns with unified logic
  const processed = useMemo(() => {
    const visibleColumnKeys = createVisibleColumnKeys(columns, defaultVisibleColumns)

    // Use stickyState to determine if we should simulate scrollable state
    // If stickyState is provided, use its useEnhancedStyling flag
    // If not provided, default to false (no enhanced styling) instead of assuming scrollable
    const simulateScrollable = stickyState?.useEnhancedStyling ?? false

    return processColumns({
      columns,
      enableSelection,
      visibleColumnKeys,
      simulateScrollable,
      borderConfig: borderConfigOverrides,
      backgroundConfig: backgroundConfigOverrides,
    })
  }, [columns, enableSelection, defaultVisibleColumns, borderConfigOverrides, backgroundConfigOverrides, stickyState])

  const rows = Array.from({ length: rowCount }).map((_, i) => (
    <SkeletonRowSticky
      key={`load-more-${i}`}
      processed={processed}
      index={i}
      isLast={i === rowCount - 1 && !asRowsOnly}
      rowHeight={rowHeight}
      bodyCellConfig={bodyCellConfig}
    />
  ))

  if (asRowsOnly) {
    return <>{rows}</>
  }

  const outerBorderClasses = getBodyOuterBorders(processed.borderConfig)
  const outerBorderStyles = getBodyOuterBorderStyles(processed.borderConfig)

  return (
    <div
      className={`overflow-x-auto ${outerBorderClasses} ${processed.backgroundConfig.bodyContainer}`}
      style={{
        borderBottomLeftRadius: `${borderRadius}px`,
        borderBottomRightRadius: `${borderRadius}px`,
        marginTop: -borderRadius,
        position: 'relative',
        zIndex: 0,
        scrollbarWidth: 'none',
        ...outerBorderStyles, // Side-specific border colors
      }}
    >
      {rows}
    </div>
  )
}

// ============================================================================
// HELPER: CREATE SKELETON CONFIG FROM TABLE PROPS
// ============================================================================

/**
 * Create skeleton props from StickyDataTable props
 *
 * This helper ensures the skeleton uses exactly the same configuration
 * as the table for perfect visual alignment.
 *
 * @param tableProps - Props passed to StickyDataTable
 * @returns Props for TableSkeleton
 *
 * @example
 * ```tsx
 * const tableProps = {
 *   columns: COLUMNS,
 *   enableSelection: true,
 *   borderConfig: customBorderConfig,
 *   leftToolbar: <FilterDropdown />,
 *   showCount: true,
 * }
 *
 * const skeletonProps = createSkeletonConfigFromTableProps(tableProps)
 *
 * {isLoading ? (
 *   <TableSkeleton {...skeletonProps} skeletonRowCount={10} />
 * ) : (
 *   <StickyDataTable {...tableProps} />
 * )}
 * ```
 */
export function createSkeletonConfigFromTableProps<T extends Record<string, unknown>>(
  tableProps: Partial<StickyDataTableProps<T>>
): Omit<TableSkeletonProps, 'skeletonRowCount'> {
  // Infer toolbar config
  const showExportButton = !!(tableProps.exportAll || tableProps.exportSelected || tableProps.exportToolbar)
  const showToolbar = !!(
    tableProps.leftToolbar ||
    tableProps.rightToolbar ||
    showExportButton ||
    tableProps.showColumnControl ||
    tableProps.showCount
  )

  return {
    columns: tableProps.columns ?? [],
    borderRadius: tableProps.borderRadius ?? TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
    enableSelection: tableProps.enableSelection ?? false,
    defaultVisibleColumns: tableProps.defaultVisibleColumns,
    borderConfig: tableProps.borderConfig,
    backgroundConfig: tableProps.backgroundConfig,
    simulateStickyState: 'auto',
    toolbarConfig: {
      showToolbar,
      showLeftToolbar: !!tableProps.leftToolbar,
      showRightToolbar: !!tableProps.rightToolbar,
      showExportButton,
      showColumnControl: tableProps.showColumnControl ?? true,
      showCount: tableProps.showCount ?? false,
    },
  }
}
