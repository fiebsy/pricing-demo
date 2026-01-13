/**
 * StickyDataTable V2 - Main Table Props
 *
 * Props interface for the main StickyDataTable component.
 *
 * @module types/props/table
 */

import type { ReactNode } from 'react'
import type { ColumnConfig } from '../core/column.types'
import type { SortDirection } from '../core/sort.types'
import type { SelectionState } from '../core/selection.types'
import type { InfiniteScrollConfig } from '../infinite-scroll.types'
import type { SkeletonCellConfig, SkeletonScope, SkeletonStickyStateMode } from '../configuration/skeleton.types'
import type { TableConfiguration } from '../configuration/unified.types'
import type { ToolbarLayoutConfig } from '../../config'
import type { DragCloneMode } from '../../types'
import type { BorderConfig } from '../styling/border.types'
import type { BackgroundConfig } from '../styling/background.types'

/**
 * Main StickyDataTable props
 *
 * @see docs/STYLING-GUIDE.md for complete styling documentation
 */
export interface StickyDataTableProps<T extends Record<string, unknown>> {
  /**
   * Unified table configuration object.
   *
   * When provided, styling props (borderRadius, borderConfig, backgroundConfig,
   * toolbarLayout, etc.) are extracted from this config. Individual props can
   * still be passed to override specific values.
   *
   * @example
   * ```tsx
   * // Use default configuration
   * <StickyDataTable config={DEFAULT_TABLE_CONFIGURATION} data={data} columns={columns} />
   *
   * // Override specific values
   * <StickyDataTable config={myConfig} borderRadius={20} data={data} columns={columns} />
   * ```
   */
  config?: TableConfiguration

  /** Data array to display */
  data: T[]

  /** Column configurations */
  columns: ColumnConfig[]

  /** Column header labels */
  columnLabels: Record<string, string>

  /**
   * Cell render function - MUST follow styling guidelines
   *
   * ## MANDATORY Typography Rules:
   *
   * | Content Type | Classes |
   * |-------------|---------|
   * | Body text | `text-sm font-normal text-primary` |
   * | Descriptions | `text-xs font-normal text-secondary` |
   * | Status codes/IDs | `text-xs font-mono text-tertiary` |
   *
   * ## Correct Patterns:
   * ```tsx
   * case 'name':
   *   return <span className="text-sm font-normal text-primary">{row.name}</span>
   *
   * case 'status':
   *   return <Badge variant="success" size="sm">{row.status}</Badge>
   * ```
   *
   * ## Forbidden Patterns:
   * - `font-bold`, `font-semibold` - Use `font-normal` only
   * - `text-blue-500`, etc. - Use semantic tokens only
   * - `text-[13px]`, `text-lg` - Use `text-sm` or `text-xs` only
   * - Custom colored badges - Use Untitled UI Badge component
   *
   * @see docs/STYLING-GUIDE.md for complete documentation
   */
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void
  /** Border radius (default: 20) */
  borderRadius?: number
  /** Header height override (default: 48) */
  headerHeight?: number
  /** Row height override (default: 46) */
  rowHeight?: number
  /** Border config overrides */
  borderConfig?: Partial<BorderConfig>
  /** Background config overrides */
  backgroundConfig?: Partial<BackgroundConfig>
  /** Show column control panel (default: true) */
  showColumnControl?: boolean
  /** Additional wrapper className */
  className?: string
  /** Arrow position offset override */
  arrowPreferredTopOffset?: number
  /** Enable row selection */
  enableSelection?: boolean
  /** Row ID getter (required for selection) */
  getRowId?: (row: T, index: number) => string | number
  /** Export all rows handler */
  exportAll?: () => void | Promise<void>
  /** Export selected rows handler */
  exportSelected?: (selectionState: SelectionState) => void | Promise<void>
  /** Custom export toolbar */
  exportToolbar?: ReactNode
  /** Default hidden columns (backward compatibility) */
  defaultHiddenColumns?: string[]
  /** Default visible columns (takes precedence over defaultHiddenColumns) */
  defaultVisibleColumns?: string[]
  /** Column groups for organized dropdown */
  columnGroups?: Array<{
    label: string
    keys: string[]
  }>
  /** Left side toolbar slot (filters, search, or any custom content) */
  leftToolbar?: ReactNode
  /** Right side toolbar slot (search, buttons, or any custom content - appears left of export button) */
  rightToolbar?: ReactNode
  /** Show count display in toolbar (left side) */
  showCount?: boolean
  /** Total count of items (for count display) */
  totalCount?: number
  /** Label for count display (e.g., "orders", "contracts") - defaults to "items" */
  countLabel?: string
  /** Optional ID for testing */
  testId?: string

  // ============================================================================
  // TOOLBAR LAYOUT
  // ============================================================================

  /**
   * Toolbar layout configuration
   *
   * Controls toolbar positioning and spacing:
   * - `position`: 'above' (default) or 'integrated' (in header gap)
   * - `toolbarToCountGap`: Gap between toolbar row and count row (default: 6px)
   * - `toolbarBottomMargin`: Bottom margin of toolbar section (default: 16px)
   * - `headerGap`: Header gap height for integrated mode (default: 12px)
   * - `integratedPadding`: Padding when toolbar is integrated
   *
   * @example
   * ```tsx
   * <StickyDataTable
   *   toolbarLayout={{
   *     position: 'integrated',
   *     headerGap: 48, // Taller header gap to fit toolbar
   *   }}
   * />
   * ```
   */
  toolbarLayout?: ToolbarLayoutConfig

  // ============================================================================
  // INFINITE SCROLL (NEW UNIFIED API)
  // ============================================================================

  /**
   * Unified infinite scroll configuration
   *
   * When provided, the table automatically:
   * - Detects when user scrolls to bottom
   * - Calls onLoadMore when hasNextPage is true
   * - Renders LoadMoreSkeleton using the table's own column/style configuration
   *
   * This eliminates manual LoadMoreSkeleton setup and ensures visual consistency.
   *
   * @example
   * ```tsx
   * <StickyDataTable
   *   infiniteScroll={{
   *     hasNextPage,
   *     isLoadingMore,
   *     onLoadMore: fetchNextPage,
   *     skeletonRowCount: 10,
   *   }}
   * />
   * ```
   */
  infiniteScroll?: InfiniteScrollConfig

  // ============================================================================
  // LEGACY INFINITE SCROLL / LOADING (deprecated - use infiniteScroll)
  // ============================================================================

  /**
   * @deprecated Use infiniteScroll.customIndicator instead
   * Content to display at the bottom of the table body (e.g. loading skeleton)
   */
  loadingIndicator?: ReactNode
  /**
   * @deprecated Use infiniteScroll.onLoadMore instead
   * Callback when bottom of table is reached
   */
  onEndReached?: () => void
  /**
   * @deprecated Use infiniteScroll.threshold instead
   * Distance in pixels from bottom to trigger onEndReached (default: 200)
   */
  onEndReachedThreshold?: number

  // ============================================================================
  // SERVER-SIDE SORTING (for paginated data)
  // ============================================================================

  /**
   * Enable server-side sorting. When true, disables client-side sorting
   * and calls onServerSort when column headers are clicked.
   */
  serverSideSort?: boolean
  /**
   * Callback when sort changes. Only called when serverSideSort is true.
   * Receives column key and new direction.
   */
  onServerSort?: (columnKey: string, direction: SortDirection) => void
  /** Current server sort column (for UI indicator) */
  serverSortColumn?: string | null
  /** Current server sort direction */
  serverSortDirection?: SortDirection

  // ============================================================================
  // COLUMN REORDERING
  // ============================================================================

  /**
   * Enable column reordering via drag-and-drop in the header.
   * When enabled, non-sticky columns can be reordered by dragging.
   * A drag handle icon appears on hover, positioned opposite to column alignment.
   * @default true
   */
  enableColumnReorder?: boolean

  /**
   * Callback when columns are reordered via drag-and-drop.
   * Receives the key of the dragged column and the key of the target position.
   * Use with useColumnConfiguration().reorderColumns for state management.
   *
   * Using keys instead of indices ensures correct reordering even when
   * some columns are hidden (indices would mismatch between visible and full arrays).
   *
   * @example
   * ```tsx
   * const columnConfig = useColumnConfiguration({ columns, ... })
   *
   * <StickyDataTable
   *   enableColumnReorder
   *   onReorderColumns={columnConfig.reorderColumns}
   * />
   * ```
   */
  onReorderColumns?: (fromKey: string, toKey: string, insertAtEnd?: boolean) => void

  /**
   * Whether column configuration has completed hydration from localStorage.
   * When false, column reorder animations are suppressed to prevent the
   * visual "shift" that occurs when saved column order differs from defaults.
   *
   * Get this from useColumnConfiguration().isHydrated
   *
   * @example
   * ```tsx
   * const columnConfig = useColumnConfiguration({ columns, storageKey: 'my-table' })
   *
   * <StickyDataTable
   *   enableColumnReorder
   *   onReorderColumns={columnConfig.reorderColumns}
   *   isColumnConfigHydrated={columnConfig.isHydrated}
   * />
   * ```
   */
  isColumnConfigHydrated?: boolean

  /**
   * Drag clone visual mode for column reordering.
   * - 'floating': Shows a floating clone near the cursor (default)
   * - 'inline': Dragged column slides with cursor, others stay in place
   *
   * @default 'floating'
   */
  dragCloneMode?: DragCloneMode

  /**
   * Threshold for triggering column swap during drag (inline mode).
   * Value between 0 and 1 representing percentage of column width.
   * Lower values = more sensitive (swap triggers with less dragging).
   *
   * @default 0.5 (swap triggers when dragged column center passes target's midpoint)
   * @example 0.35 = more sensitive, good for wide columns
   * @example 0.25 = very sensitive
   */
  dragSwapThreshold?: number

  // ============================================================================
  // EMPTY STATE
  // ============================================================================

  /**
   * Custom empty state when table has no data.
   * If provided, renders instead of the table body when data is empty.
   */
  emptyState?: ReactNode

  /**
   * Custom empty state when search/filter yields no results.
   * If provided, renders instead of the table body when search returns no matches.
   * Takes a search term parameter to display in the message.
   */
  noResultsState?: ReactNode

  /**
   * Current search term (used for empty state message).
   * When provided with noResultsState, displays "No results for {searchTerm}"
   */
  searchTerm?: string

  /**
   * Whether filters are currently active (besides search).
   * When true, shows noResultsState instead of emptyState when data is empty.
   * This allows showing "Clear filters" button even when there's no search term.
   */
  hasActiveFilters?: boolean

  /**
   * Loading state - suppresses empty states during data fetching.
   * When true, empty states won't render even if data is empty.
   * Use this to prevent flickering when clearing search/filters.
   */
  isLoading?: boolean

  // ============================================================================
  // SKELETON CONFIGURATION
  // ============================================================================

  /**
   * Skeleton configuration for loading states.
   *
   * When `isLoading` is true and data is empty, the table renders skeleton rows
   * while preserving the real toolbar (with Export, Column Control, etc.).
   *
   * This eliminates the need to manually reconstruct the toolbar in skeleton mode.
   *
   * @example
   * ```tsx
   * <StickyDataTable
   *   data={data}
   *   isLoading={!isHydrated}
   *   skeletonConfig={{
   *     scope: 'rows-only',
   *     initialRowCount: 16,
   *     bodyCellConfig: { height: 16, widthMode: 'auto' }
   *   }}
   *   leftToolbar={<FilterToolbar />}
   *   exportAll={handleExport}
   * />
   * ```
   */
  skeletonConfig?: {
    /**
     * Skeleton scope - what parts show skeletons
     * - 'rows-only': Real toolbar + header, skeleton only for body rows (recommended)
     * - 'table-only': Real toolbar, skeleton for header + body
     * - 'full': Skeleton for toolbar, header, and body (testing only)
     * @default 'rows-only'
     */
    scope?: SkeletonScope
    /** Number of skeleton rows for initial load (default: 10) */
    initialRowCount?: number
    /** Number of skeleton rows for infinite scroll (default: 5) */
    infiniteScrollRowCount?: number
    /** Header cell skeleton appearance */
    headerCellConfig?: Partial<SkeletonCellConfig>
    /** Body cell skeleton appearance */
    bodyCellConfig?: Partial<SkeletonCellConfig>
    /** Checkbox skeleton size in pixels (default: 16) */
    checkboxSize?: number
    /** Sticky state simulation mode (default: 'auto') */
    simulateStickyState?: SkeletonStickyStateMode
  }

  // ============================================================================
  // FILTER STATUS BAR
  // ============================================================================

  /**
   * Filter status bar - floating overlay at bottom of table.
   * Pass a FilterStatusBar component to display filter state information.
   *
   * @example
   * ```tsx
   * <StickyDataTable
   *   filterStatusBar={
   *     <FilterStatusBar
   *       visibleCount={filteredItems.length}
   *       totalCount={totalCount}
   *       filterByLabel="Clawed back"
   *       activeFilterCount={2}
   *       visible={hasFilters}
   *     />
   *   }
   * />
   * ```
   */
  filterStatusBar?: ReactNode
}
