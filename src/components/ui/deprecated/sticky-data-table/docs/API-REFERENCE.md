# API Reference

Complete reference for all props, types, hooks, and utilities.

---

## StickyDataTableProps

Main component props interface:

```tsx
interface StickyDataTableProps<T extends Record<string, unknown>> {
  // ═══════════════════════════════════════════════════════════════
  // REQUIRED PROPS
  // ═══════════════════════════════════════════════════════════════

  /** Array of data items to display */
  data: T[]

  /** Column configurations */
  columns: ColumnConfig[]

  /** Column key to display label mapping */
  columnLabels: Record<string, string>

  /** Function to render cell content */
  renderCell: (columnKey: string, row: T, index: number) => ReactNode

  // ═══════════════════════════════════════════════════════════════
  // SELECTION
  // ═══════════════════════════════════════════════════════════════

  /** Enable checkbox selection */
  enableSelection?: boolean

  /** Function to get unique row identifier (required if enableSelection) */
  getRowId?: (row: T, index: number) => string | number

  // ═══════════════════════════════════════════════════════════════
  // SORTING
  // ═══════════════════════════════════════════════════════════════

  /** Enable server-side sorting (disables client-side) */
  serverSideSort?: boolean

  /** Current server sort column (when serverSideSort=true) */
  serverSortColumn?: string | null

  /** Current server sort direction (when serverSideSort=true) */
  serverSortDirection?: 'asc' | 'desc'

  /** Callback when sort changes (when serverSideSort=true) */
  onServerSort?: (column: string, direction: 'asc' | 'desc') => void

  // ═══════════════════════════════════════════════════════════════
  // INFINITE SCROLL
  // ═══════════════════════════════════════════════════════════════

  /** Infinite scroll configuration */
  infiniteScroll?: InfiniteScrollConfig

  // ═══════════════════════════════════════════════════════════════
  // COLUMN VISIBILITY
  // ═══════════════════════════════════════════════════════════════

  /** Show column control dropdown */
  showColumnControl?: boolean  // Default: true

  /** Column groups for dropdown organization */
  columnGroups?: ColumnGroup[]

  /** Columns to hide by default */
  defaultHiddenColumns?: string[]

  /** Columns to show by default (takes precedence over defaultHiddenColumns) */
  defaultVisibleColumns?: string[]

  // ═══════════════════════════════════════════════════════════════
  // TOOLBAR
  // ═══════════════════════════════════════════════════════════════

  /** Left side toolbar slot (filters, search, or any custom content) */
  leftToolbar?: ReactNode

  /** Right side toolbar slot (search, buttons, or any custom content - appears left of export button) */
  rightToolbar?: ReactNode

  /** Custom export toolbar (right side) */
  exportToolbar?: ReactNode

  /** Show item count */
  showCount?: boolean

  /** Total count for display */
  totalCount?: number

  /** Count label (default: "items") */
  countLabel?: string

  // ═══════════════════════════════════════════════════════════════
  // EXPORT
  // ═══════════════════════════════════════════════════════════════

  /** Export all data function */
  exportAll?: () => void | Promise<void>

  /** Export selected data function */
  exportSelected?: (selectionState: SelectionState) => void | Promise<void>

  // ═══════════════════════════════════════════════════════════════
  // STYLING
  // ═══════════════════════════════════════════════════════════════

  /** Border radius in pixels */
  borderRadius?: number  // Default: 20

  /** Header height in pixels */
  headerHeight?: number  // Default: 48

  /** Row height in pixels */
  rowHeight?: number  // Default: 46

  /** Border configuration */
  borderConfig?: Partial<BorderConfig>

  /** Background configuration */
  backgroundConfig?: Partial<BackgroundConfig>

  /** Custom wrapper className */
  className?: string

  // ═══════════════════════════════════════════════════════════════
  // INTERACTION
  // ═══════════════════════════════════════════════════════════════

  /** Row click handler */
  onRowClick?: (row: T, index: number) => void

  /** Navigation arrow positioning */
  arrowPreferredTopOffset?: number  // Default: 300
}
```

---

## ColumnConfig

Column configuration interface:

```tsx
interface ColumnConfig {
  /** Unique column identifier */
  key: string

  /** Column width in pixels */
  width: number

  /** Text alignment */
  align: 'left' | 'center' | 'right'

  /** Make column sticky (fixed during horizontal scroll) */
  isSticky?: boolean

  /** Enable column sorting */
  sortable?: boolean

  // ─────────────────────────────────────────────────────────────
  // Flexible Width
  // ─────────────────────────────────────────────────────────────

  /** Minimum width in pixels */
  minWidth?: number

  /** Maximum width in pixels */
  maxWidth?: number

  /** Proportional growth factor (default: 1) */
  flexRatio?: number

  // ─────────────────────────────────────────────────────────────
  // Text Display
  // ─────────────────────────────────────────────────────────────

  /** Allow text to wrap */
  allowTextWrap?: boolean

  /** Maximum lines before truncation */
  maxLines?: number

  /** Use tabular (monospace) numbers (default: true) */
  useTabularNums?: boolean
}
```

---

## InfiniteScrollConfig

```tsx
interface InfiniteScrollConfig {
  /** Whether more pages exist */
  hasNextPage: boolean

  /** Whether currently loading */
  isLoadingMore: boolean

  /** Callback to load more data */
  onLoadMore: () => void | Promise<void>

  /** Number of skeleton rows while loading */
  skeletonRowCount?: number  // Default: 5

  /** Distance from bottom to trigger loading */
  threshold?: number  // Default: 200

  /** Minimum loading time (prevents flash) */
  minimumLoadingDelay?: number  // Default: 0

  /** Custom loading indicator (overrides skeleton) */
  customIndicator?: ReactNode
}
```

---

## BorderConfig

```tsx
interface BorderConfig {
  // Colors (Tailwind semantic tokens)
  outerColor: string              // All outer borders (left, right, top, body bottom)
  headerBottomColor?: string      // Header bottom border only (defaults to outerColor)
  rowColor: string                // Between rows
  cellColor: string               // Between columns
  stickyColumnRightBorderColor?: string  // Sticky column edge when scrolling

  // Visibility
  showOuter: boolean              // All outer borders
  showLeft?: boolean              // Override showOuter for left side
  showRight?: boolean             // Override showOuter for right side
  showTop?: boolean               // Override showOuter for top side
  showBottom?: boolean            // Override showOuter for bottom side
  showRows: boolean               // Horizontal row borders
  showCells: boolean              // Vertical cell borders

  // Special
  hideCellBordersForColumns?: string[]  // Transparent borders for specific columns
}
```

**Border Color Hierarchy:**
- `outerColor` → left, right, top, body bottom borders
- `headerBottomColor` → header bottom border only (falls back to `outerColor` if not set)
- `rowColor` → internal row dividers
- `cellColor` → internal column dividers

---

## BackgroundConfig

```tsx
interface BackgroundConfig {
  headerWrapper: string
  headerContainer: string
  headerStickyCell: string
  headerStickyCellWithArrows: string
  bodyContainer: string
  rowStickyCell: string
  rowStickyCellWithArrows: string
  rowHover: string
}
```

---

## SelectionState

```tsx
interface SelectionState {
  selectedIds: Set<string | number>
  toggleRowSelection: (id: string | number) => void
  selectAllRows: () => void
  deselectAllRows: () => void
  isRowSelected: (id: string | number) => boolean
  isAllSelected: boolean
  isSomeSelected: boolean
  selectedCount: number
}
```

---

## StickyState

```tsx
interface StickyState {
  showLeftArrow: boolean
  showRightArrow: boolean
  hasArrows: boolean
  useEnhancedStyling: boolean
}
```

---

## ComputedColumn

Extended column with computed properties:

```tsx
interface ComputedColumn extends ColumnConfig {
  computedStickyLeft: number
  index: number
  isFirst: boolean
  isLast: boolean
  isFirstSticky: boolean
  isLastSticky: boolean
}
```

---

## Hooks

### useStickyDataTable

Main orchestration hook:

```tsx
function useStickyDataTable<T>(props: StickyDataTableProps<T>): {
  // Refs
  headerScrollRef: RefObject<HTMLDivElement>
  bodyScrollRef: RefObject<HTMLDivElement>

  // Configs
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig

  // Columns
  columnsWithSelection: ColumnConfig[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  allVisibleColumns: ComputedColumn[]
  visibleColumnKeys: Set<string>
  leavingColumnKeys: Set<string>
  enteringColumnKeys: Set<string>
  columnChange: ColumnChange | null
  toggleColumn: (key: string) => void
  resetColumns: () => void
  totalStickyWidth: number

  // Sort
  sortColumn: string | null
  sortDirection: 'asc' | 'desc' | null
  sortedData: T[]
  handleSort: (column: string) => void

  // Scroll
  stickyState: StickyState
  showScrollIndicator: boolean
  handleScrollLeft: () => void
  handleScrollRight: () => void

  // Selection
  selectionState: SelectionState | null

  // Toolbar
  showExportButton: boolean
  showToolbar: boolean

  // Infinite scroll
  effectiveOnEndReached: (() => void) | undefined
  effectiveThreshold: number
  effectiveLoadingIndicator: ReactNode | undefined
}
```

### useInfiniteScroll

```tsx
function useInfiniteScroll(options: {
  hasNextPage: boolean
  loadMore: () => Promise<void> | void
  skeletonRowCount?: number
  threshold?: number
  minimumDelay?: number
  onError?: (error: unknown) => void
}): {
  infiniteScrollProps: InfiniteScrollConfig
  isLoadingMore: boolean
  triggerLoadMore: () => Promise<void>
}
```

### useSelection

```tsx
function useSelection(props: {
  rowIds: (string | number)[]
  enabled: boolean
  initialSelected?: Set<string | number>
}): SelectionState | null
```

### useColumns

```tsx
function useColumns(props: {
  columns: ColumnConfig[]
  defaultHiddenColumns?: string[]
  defaultVisibleColumns?: string[]
  enableSelection?: boolean
}): {
  allColumns: ComputedColumn[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  visibleColumnKeys: Set<string>
  leavingColumnKeys: Set<string>
  leavingColumns: ComputedColumn[]
  enteringColumnKeys: Set<string>
  columnChange: ColumnChange | null
  toggleColumn: (key: string) => void
  resetColumns: () => void
  totalStickyWidth: number
}
```

### useScrollSync

```tsx
function useScrollSync(props: {
  headerRef: RefObject<HTMLDivElement>
  bodyRef: RefObject<HTMLDivElement>
}): {
  canScrollLeft: boolean
  canScrollRight: boolean
  showScrollIndicator: boolean
  handleScrollLeft: () => void
  handleScrollRight: () => void
}
```

### useSort

```tsx
function useSort<T>(props: {
  data: T[]
  enabled: boolean
}): {
  sortColumn: string | null
  sortDirection: 'asc' | 'desc' | null
  sortedData: T[]
  handleSort: (column: string) => void
}
```

---

## Utilities

### Grid Utilities

```tsx
// Generate CSS grid template
function generateGridTemplate(
  stickyColumns: ColumnConfig[],
  scrollableColumns: ColumnConfig[]
): string

// Calculate total sticky width
function calculateTotalStickyWidth(stickyColumns: ColumnConfig[]): number

// Compute sticky offsets
function computeColumnOffsets(columns: ColumnConfig[]): ComputedColumn[]

// Separate columns
function separateColumns(columns: ComputedColumn[]): {
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
}
```

### Column Processor

```tsx
// Unified column processing
function processColumns(options: {
  columns: ColumnConfig[]
  enableSelection?: boolean
  visibleColumnKeys?: Set<string>
  simulateScrollable?: boolean
  borderConfig?: Partial<BorderConfig>
  backgroundConfig?: Partial<BackgroundConfig>
}): {
  allColumns: ComputedColumn[]
  stickyColumns: ComputedColumn[]
  scrollableColumns: ComputedColumn[]
  gridTemplate: string
  totalStickyWidth: number
  stickyState: StickyState
  borderConfig: BorderConfig
  backgroundConfig: BackgroundConfig
}

// Create visible column keys set
function createVisibleColumnKeys(
  columns: ColumnConfig[],
  defaultVisible?: string[]
): Set<string>

// Check for sticky columns
function hasStickyColumns(columns: ColumnConfig[]): boolean

// Count sticky columns
function countStickyColumns(columns: ColumnConfig[]): number

// Get rightmost sticky column
function getRightmostStickyColumn(columns: ComputedColumn[]): ComputedColumn | null
```

### Style Utilities

```tsx
// Alignment classes
function getAlignmentClasses(align: 'left' | 'center' | 'right'): {
  textAlign: string
  flexJustify: string
}

// Cell padding
function getCellPadding(isFirst: boolean, isLast: boolean): string

// Backgrounds
function getHeaderStickyBackground(
  config: BackgroundConfig,
  stickyState: StickyState,
  isSticky: boolean
): string

function getRowStickyBackground(
  config: BackgroundConfig,
  stickyState: StickyState,
  isSticky: boolean
): string

// Borders
function getHeaderOuterBorders(config: BorderConfig): string
function getBodyOuterBorders(config: BorderConfig): string
function getRowBorder(config: BorderConfig): string
function getCellBorder(config: BorderConfig, isLast: boolean, columnKey?: string): string
function getStickyColumnBorder(
  column: ComputedColumn,
  stickyState: StickyState,
  config: BorderConfig
): string

// Cell styles
function getCellStyle(
  column: ComputedColumn,
  stickyState: StickyState
): React.CSSProperties

// Animation
function getColumnAnimationState(
  columnKey: string,
  leavingKeys: Set<string>,
  enteringKeys: Set<string>
): 'entering' | 'leaving' | 'idle'
```

### Config Utilities

```tsx
// Create merged border config
function createBorderConfig(partial?: Partial<BorderConfig>): BorderConfig

// Create merged background config
function createBackgroundConfig(partial?: Partial<BackgroundConfig>): BackgroundConfig

// Create skeleton dimension config
function createSkeletonDimensionConfig(options: {
  toolbar?: ToolbarConfig
  rowHeight?: number
  headerHeight?: number
  borderRadius?: number
}): SkeletonDimensionConfig

// Calculate skeleton height
function calculateSkeletonHeight(
  config: SkeletonDimensionConfig,
  rowCount: number
): number

// Calculate toolbar height
function calculateToolbarHeight(config: ToolbarConfig): number
```

---

## Constants

### TABLE_CONFIG

```tsx
TABLE_CONFIG = {
  HEADER_GAP: 12,
  HEADER_HEIGHT: 48,
  ROW_HEIGHT: 46,
  SCROLL_AMOUNT: 300,
  SCROLL_THRESHOLD: 10,
  DEFAULT_BORDER_RADIUS: 20,
  TOOLBAR_HEIGHT: 32,
  TOOLBAR_MARGIN: 12,
  COUNT_DISPLAY_MARGIN: 8,
  CHECKBOX_COLUMN_WIDTH: 44,
}
```

### ANIMATION_CONFIG

```tsx
ANIMATION_CONFIG = {
  COLUMN_ENTER_DURATION: 300,
  COLUMN_LEAVE_DURATION: 250,
  COLUMN_SHIFT_DURATION: 200,
  COLUMN_REMOVE_DELAY: 250,
  COLUMN_CHANGE_CLEAR_DELAY: 350,
  SCROLL_SYNC_THRESHOLD: 1,
}
```

### DEFAULT_BORDER_CONFIG

```tsx
DEFAULT_BORDER_CONFIG = {
  outerColor: 'border-primary',
  rowColor: 'border-tertiary',
  cellColor: 'border-tertiary/20',
  showOuter: true,
  showRows: true,
  showCells: true,
  stickyColumnRightBorderColor: 'border-secondary',
}
```

### DEFAULT_BACKGROUND_CONFIG

```tsx
DEFAULT_BACKGROUND_CONFIG = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_p1',
  headerStickyCell: 'bg-secondary_p1',
  headerStickyCellWithArrows: 'bg-secondary_t1/95',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary/0',
  rowStickyCellWithArrows: 'bg-secondary_t1/95',
  rowHover: 'bg-secondary',
}
```

---

## Components

### TableSkeleton

```tsx
interface TableSkeletonProps {
  columns: ColumnConfig[]
  skeletonRowCount?: number
  borderRadius?: number
  className?: string
  toolbarConfig?: ToolbarConfig
  rowHeight?: number
  dimensionConfig?: SkeletonDimensionConfig
  enableSelection?: boolean
  defaultVisibleColumns?: string[]
  simulateStickyState?: 'scrollable' | 'no-scroll' | 'auto'
  borderConfig?: Partial<BorderConfig>
  backgroundConfig?: Partial<BackgroundConfig>
}
```

### LoadMoreSkeleton

```tsx
interface LoadMoreSkeletonProps {
  columns: ColumnConfig[]
  rowCount: number
  borderRadius?: number
  asRowsOnly?: boolean
  rowHeight?: number
  enableSelection?: boolean
  defaultVisibleColumns?: string[]
  borderConfig?: Partial<BorderConfig>
  backgroundConfig?: Partial<BackgroundConfig>
  stickyState?: StickyState
}
```

### ExportToolbar

```tsx
interface ExportToolbarProps {
  onExportAll?: () => void | Promise<void>
  onExportSelected?: () => void | Promise<void>
  isExporting?: boolean
  hasSelection?: boolean
}
```

### SearchToolbar

```tsx
interface SearchToolbarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
}
```

### ToolbarContent

Internal component for unified toolbar rendering. Used by `StickyDataTable` for both 'above' and 'integrated' toolbar modes.

```tsx
interface ToolbarContentProps {
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
  /** Total count value */
  totalCount?: number
  /** Count label (e.g., "items", "orders") */
  countLabel: string
  /** Whether to show export button */
  showExportButton: boolean
  /** Export handlers */
  exportAll?: () => void | Promise<void>
  exportSelected?: (selectionState: SelectionState) => void | Promise<void>
  exportToolbar?: ReactNode
  selectionState: SelectionState | null
  /** Column control props */
  showColumnControl: boolean
  columnGroups?: Array<{ label: string; keys: string[] }>
  columnsWithSelection: ColumnConfig[]
  visibleColumnKeys: Set<string>
  toggleColumn: (key: string) => void
  resetColumns: () => void
  columnLabelsWithCheckbox: Record<string, string>
}
```

**Note:** This component is primarily for internal use. The `StickyDataTable` component handles toolbar rendering automatically based on the `toolbarLayout.position` prop ('above' or 'integrated').

---

## Context Hooks

```tsx
// Full context
function useTableContext<T>(): TableContextValue<T>

// Selective access
function useScrollContext(): ScrollContextValue
function useColumnsContext(): ColumnsContextValue
function useSelectionContext(): SelectionContextValue
function useSortContext(): SortContextValue
function useStylingContext(): StylingContextValue
```

---

## Exports Summary

### Main Component
```tsx
export { StickyDataTable }
```

### Types
```tsx
export type {
  ColumnConfig,
  ColumnAlignment,
  BorderConfig,
  BackgroundConfig,
  StickyState,
  SelectionState,
  InfiniteScrollConfig,
  StickyDataTableProps,
  ComputedColumn,
  ColumnChange,
  ColumnGroup,
  ScrollState,
}
```

### Hooks
```tsx
export {
  useStickyDataTable,
  useColumnConfiguration,
  useInfiniteScroll,
  useScrollSync,
  useColumns,
  useSelection,
  useSort,
  useWheelRedirect,
  useArrowPosition,
  useColumnFlip,
  useAutoColumnFlip,
}
```

### Components
```tsx
export {
  TableSkeleton,
  LoadMoreSkeleton,
  createSkeletonConfigFromTableProps,
  ExportToolbar,
  SearchToolbar,
  FilterToolbar,
  FilterDropdown,
  ColumnControlPanel,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  NavigationArrows,
  GradientOverlay,
  StickyHeaderWrapper,
}
```

### Utilities
```tsx
export {
  processColumns,
  createVisibleColumnKeys,
  generateGridTemplate,
  computeColumnOffsets,
  separateColumns,
  calculateTotalStickyWidth,
  hasStickyColumns,
  countStickyColumns,
  getRightmostStickyColumn,
  getAlignmentClasses,
  getCellPadding,
  getCellStyle,
  getCellBorder,
  getRowBorder,
  getStickyColumnBorder,
  getHeaderOuterBorders,
  getBodyOuterBorders,
  getHeaderStickyBackground,
  getRowStickyBackground,
  getColumnAnimationState,
  getColumnAnimationDataAttrs,
  getColumnAnimationClass,
}
```

### Config & Constants
```tsx
export {
  TABLE_CONFIG,
  ANIMATION_CONFIG,
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  createSkeletonDimensionConfig,
  calculateSkeletonHeight,
  calculateToolbarHeight,
}
```

### Context
```tsx
export {
  TableProvider,
  useTableContext,
  useScrollContext,
  useColumnsContext,
  useSelectionContext,
  useSortContext,
  useStylingContext,
}
```

---

**Last Updated:** December 2024
