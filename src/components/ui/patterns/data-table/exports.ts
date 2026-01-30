/**
 * StickyDataTable - Public Exports
 *
 * All public types, hooks, components, and utilities are exported from here.
 * This keeps the main index.tsx focused on the component implementation.
 *
 * @module sticky-data-table/exports
 */

// ============================================================================
// TYPES
// ============================================================================

// Core types
export type {
  ColumnConfig,
  ColumnAlignment,
  BorderConfig,
  BackgroundConfig,
  StickyState,
  SortColumn,
  SortDirection,
  SelectionState,
  StickyDataTableProps,
  ComputedColumn,
  ColumnChange,
  InfiniteScrollConfig,
  DragCloneMode,
} from './types'

// Table configuration types
export type {
  TableConfiguration,
  TableConfigurationOverrides,
  TableConfigurationProps,
  TableDimensionConfig,
  TableBorderConfig,
  TableBackgroundConfig,
  TableToolbarConfig,
  TableFeatureConfig,
  ToolbarPositionMode,
  CountPositionMode,
  CountStackPositionMode,
  IntegratedToolbarPadding,
  // Skeleton configuration types
  TableSkeletonConfig,
  SkeletonCellConfig,
  SkeletonWidthMode,
  SkeletonStickyStateMode,
  SkeletonScope,
  SkeletonConfigurationProps,
} from './types'

// Filter types
export type {
  FilterCategory,
  FilterConfig,
  FilterOption,
  FilterOperator,
  FilterState,
  FilterValue,
  ActiveFilter,
  DateRangePreset,
  RangePreset,
  SelectFilterConfig,
  DateFilterConfig,
  RangeFilterConfig,
  SearchFilterConfig,
  BooleanFilterConfig,
  FilterToolbarProps,
} from './types'

export { DEFAULT_DATE_PRESETS, createSelectFilter, createDateFilter, createRangeFilter } from './types'

// ============================================================================
// CONFIG
// ============================================================================

export {
  TABLE_CONFIG,
  ARROW_CONFIG,
  ANIMATION_CONFIG,
  CELL_CONFIG,
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
  DEFAULT_TOOLBAR_LAYOUT,
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  // Dimension configuration utilities
  calculateToolbarHeight,
  calculateSkeletonHeight,
  calculateIntegratedHeaderGap,
  createToolbarConfig,
  createToolbarLayoutConfig,
  createSkeletonDimensionConfig,
  inferToolbarConfigFromProps,
  type ToolbarConfig,
  type ToolbarLayoutConfig,
  type ToolbarPosition,
  type CountPosition,
  type CountDisplayConfig,
  type SkeletonDimensionConfig,
  // Unified table configuration
  DEFAULT_TABLE_CONFIGURATION,
  createTableConfiguration,
  tableConfigToProps,
  getDefaultTableProps,
  deepMerge,
} from './config'

// ============================================================================
// HOOKS
// ============================================================================

export {
  useScrollSync,
  useColumns,
  useSort,
  useSelection,
  useWheelRedirect,
  useArrowPosition,
  useInfiniteScroll,
  useStickyDataTable,
  useColumnConfiguration,
  useTableConfiguration,
  type UseInfiniteScrollOptions,
  type UseInfiniteScrollReturn,
  type UseStickyDataTableProps,
  type UseStickyDataTableReturn,
  type UseColumnConfigurationOptions,
  type ColumnConfigurationState,
  type ColumnConfigurationActions,
  type UseColumnConfigurationReturn,
  type UseTableConfigurationOptions,
  type UseTableConfigurationReturn,
} from './hooks'

// Filter hook
export { useTableFilters, type UseTableFiltersProps, type UseTableFiltersReturn } from './hooks'

// CSV export hook
export {
  useExportCsvSticky,
  type CsvExportableData,
} from './hooks'

// Data adapters
export {
  useTableLoadingState,
  type TableLoadingStateOptions,
  type TableLoadingState,
  type TableLoadingActions,
  type UseTableLoadingStateReturn,
  useTableWithGraphQL,
  type UseTableWithGraphQLOptions,
  type UseTableWithGraphQLReturn,
  useTableWithAsync,
  type UseTableWithAsyncOptions,
  type UseTableWithAsyncReturn,
} from './hooks'

// ============================================================================
// UTILS
// ============================================================================

export {
  generateGridTemplate,
  calculateTotalStickyWidth,
  computeColumnOffsets,
  separateColumns,
  getAlignmentClasses,
  getCellPadding,
  getHeaderStickyBackground,
  getRowStickyBackground,
  getHeaderOuterBorders,
  getBodyOuterBorders,
  getRowBorder,
  getCellBorder,
  getStickyColumnBorder,
  getStickyLeft,
  getColumnAnimationClass,
  getCellStyle,
  // Column processor utilities
  processColumns,
  createVisibleColumnKeys,
  hasStickyColumns,
  countStickyColumns,
  getRightmostStickyColumn,
  type ColumnProcessorOptions,
  type ProcessedColumnsResult,
} from './utils'

// ============================================================================
// COMPONENTS
// ============================================================================

export {
  TableCell,
  TableRow,
  TableHeader,
  TableBody,
  NavigationArrow,
  NavigationArrows,
  GradientOverlay,
  StickyHeaderWrapper,
  ColumnControlPanel,
  ExportToolbar,
  type ExportToolbarProps,
  TableEmptyState,
  type TableEmptyStateProps,
} from './components'

// Filter components
export { FilterToolbar, FilterDropdown } from './components/filter'

// Skeleton components
export {
  TableSkeleton,
  LoadMoreSkeleton,
  createSkeletonConfigFromTableProps,
  type TableSkeletonProps,
  type LoadMoreSkeletonProps,
} from './components'

// ============================================================================
// CONTEXT
// ============================================================================

export {
  TableProvider,
  useTableContext,
  useScrollContext,
  useColumnsContext,
  useSelectionContext,
  useSortContext,
  useStylingContext,
} from './context/table-context'

// Page background context
export {
  TablePageBackgroundProvider,
  useTablePageBackground,
  createPageBackgroundStyle,
  getBackgroundCssVar,
  PAGE_BACKGROUND_CONFIGS,
  type PageBackgroundToken,
  type TablePageBackgroundContextValue,
  type TablePageBackgroundProviderProps,
} from './context/page-background-context'
