/**
 * StickyDataTable V2 - Types Index
 *
 * Central export point for all type definitions.
 * Provides organized access to types by domain.
 *
 * @module types
 */

// ============================================================================
// SORTING
// ============================================================================

export type { SortColumn, SortDirection, SortState } from './sort.types'

// ============================================================================
// COLUMNS
// ============================================================================

export type {
  ColumnAlignment,
  ColumnConfig,
  ComputedColumn,
  ColumnChange,
  ColumnVisibilityState,
} from './column.types'

// ============================================================================
// STYLING
// ============================================================================

export type {
  BorderConfig,
  BackgroundConfig,
  StickyState,
  ScrollState,
} from './styling.types'

// ============================================================================
// SELECTION
// ============================================================================

export type { SelectionState } from './selection.types'

// ============================================================================
// INFINITE SCROLL
// ============================================================================

export type { InfiniteScrollConfig } from './infinite-scroll.types'

// ============================================================================
// CONTEXT
// ============================================================================

export type { TableContextValue } from './context.types'

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export type {
  StickyDataTableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  NavigationArrowsProps,
} from './props.types'

// ============================================================================
// TABLE CONFIGURATION
// ============================================================================

export {
  type TableDimensionConfig,
  type TableBorderConfig,
  type TableBackgroundConfig,
  type TableToolbarConfig,
  type TableFeatureConfig,
  type TableConfiguration,
  type TableConfigurationOverrides,
  type TableConfigurationProps,
  type ToolbarPositionMode,
  type CountPositionMode,
  type IntegratedToolbarPadding,
  type DeepPartial,
  type UseTableConfigurationOptions,
  type UseTableConfigurationReturn,
  // Skeleton configuration types
  type TableSkeletonConfig,
  type SkeletonCellConfig,
  type SkeletonWidthMode,
  type SkeletonStickyStateMode,
  type SkeletonScope,
  type SkeletonConfigurationProps,
  type CountStackPositionMode,
} from './table-configuration.types'

// ============================================================================
// FILTER TYPES
// ============================================================================

export type {
  FilterIcon,
  FilterOperator,
  FilterValue,
  FilterOption,
  DateRangePreset,
  SelectFilterConfig,
  DateFilterConfig,
  RangePreset,
  RangeFilterConfig,
  SearchFilterConfig,
  BooleanFilterConfig,
  FilterConfig,
  FilterCategory,
  ActiveFilter,
  FilterState,
  FilterToolbarProps,
} from './filter.types'

export {
  DEFAULT_DATE_PRESETS,
  createSelectFilter,
  createDateFilter,
  createRangeFilter,
} from './filter.types'
