/**
 * StickyDataTable V2 - Component Props Types
 *
 * Props interfaces for all table components.
 *
 * @module types/props
 */

import type { ReactNode, RefObject } from 'react'
import type { ColumnConfig, ComputedColumn, ColumnChange } from './column.types'
import type { SortColumn, SortDirection } from './sort.types'
import type { StickyState, BorderConfig, BackgroundConfig } from './styling.types'
import type { SelectionState } from './selection.types'
import type { InfiniteScrollConfig } from './infinite-scroll.types'
import type { ToolbarLayoutConfig } from '../config'
import type { DragCloneMode } from '../types'

// ============================================================================
// MAIN COMPONENT PROPS
// ============================================================================

/**
 * Main StickyDataTable props
 *
 * @see docs/STYLING-GUIDE.md for complete styling documentation
 */
export interface StickyDataTableProps<T extends Record<string, unknown>> {
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
   * Loading state - suppresses empty states during data fetching.
   * When true, empty states won't render even if data is empty.
   * Use this to prevent flickering when clearing search/filters.
   */
  isLoading?: boolean
}

// ============================================================================
// SUBCOMPONENT PROPS
// ============================================================================

/** Props for TableHeader component */
export interface TableHeaderProps {
  /** Forwarded ref for scroll container */
  headerRef?: RefObject<HTMLDivElement | null>
}

/** Props for TableBody component */
export interface TableBodyProps<T = Record<string, unknown>> {
  /** Forwarded scroll container ref */
  bodyScrollRef: RefObject<HTMLDivElement | null>
  /** Data array to render */
  data: T[]
  /** Sticky columns */
  stickyColumns: ComputedColumn[]
  /** Scrollable columns */
  scrollableColumns: ComputedColumn[]
  /** All visible columns */
  allColumns: ComputedColumn[]
  /** Sticky state for styling */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Border radius */
  borderRadius: number
  /** Cell render function */
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void
  /** Column change for animation */
  columnChange: ColumnChange | null
  /** Leaving column keys */
  leavingColumnKeys: Set<string>
  /** Selection state */
  selectionState: SelectionState | null
  /** Row ID getter */
  getRowId?: (row: T, index: number) => string | number
  /** Loading indicator content */
  loadingIndicator?: ReactNode
  /** Callback when end reached */
  onEndReached?: () => void
  /** Threshold for end reached */
  onEndReachedThreshold?: number
}

/** Props for TableRow component */
export interface TableRowProps<T = Record<string, unknown>> {
  /** Row data */
  row: T
  /** Row index in data array */
  index: number
  /** Row ID for selection */
  rowId: string | number
  /** Sticky columns */
  stickyColumns: ComputedColumn[]
  /** Scrollable columns */
  scrollableColumns: ComputedColumn[]
  /** All columns (for rendering) */
  allColumns: ComputedColumn[]
  /** Sticky state */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Cell render function */
  renderCell: (columnKey: string, row: T, index: number) => ReactNode
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void
  /** Column change for animation */
  columnChange: ColumnChange | null
  /** Leaving column keys */
  leavingColumnKeys: Set<string>
  /** Selection state */
  selectionState: SelectionState | null
}

/** Props for TableCell component */
export interface TableCellProps {
  /** Column configuration */
  column: ComputedColumn
  /** Cell content */
  children: ReactNode
  /** Sticky state for styling */
  stickyState: StickyState
  /** Border configuration */
  borderConfig: BorderConfig
  /** Background configuration */
  backgroundConfig: BackgroundConfig
  /** Set of leaving column keys */
  leavingColumnKeys: Set<string>
  /** Current column change */
  columnChange: ColumnChange | null
  /** Force right alignment (for last column) */
  forceRightAlign?: boolean
  /** Text size class for the cell container */
  textSizeClass?: string
  /** Is this a header cell */
  isHeader?: boolean
  /** Header background getter */
  getHeaderBackground?: () => string
}

/** Props for NavigationArrows component */
export interface NavigationArrowsProps {
  /** Total width of sticky columns */
  totalStickyWidth: number
  /** Preferred top offset for arrows */
  preferredTopOffset?: number
}
