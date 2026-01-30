/**
 * StickyDataTable V2 - Types Index
 *
 * Central export point for all type definitions.
 * Provides organized access to types by domain.
 *
 * ## Directory Structure
 *
 * ```
 * types/
 * ├── core/           # Column, sort, selection types
 * ├── styling/        # Border, background, sticky state
 * ├── configuration/  # Table configuration system
 * ├── props/          # Component props
 * └── filter/         # Filter system types
 * ```
 *
 * @module types
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export type {
  ColumnAlignment,
  ColumnConfig,
  ComputedColumn,
  ColumnChange,
  ColumnVisibilityState,
} from './core/column.types'

export type { SortColumn, SortDirection, SortState } from './core/sort.types'

export type { SelectionState } from './core/selection.types'

// ============================================================================
// STYLING TYPES
// ============================================================================

export type { BorderConfig } from './styling/border.types'
export type { BackgroundConfig } from './styling/background.types'
export type { StickyState, ScrollState } from './styling/sticky-state.types'

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export type { TableDimensionConfig } from './configuration/dimensions.types'

export type {
  ToolbarPositionMode,
  CountPositionMode,
  CountStackPositionMode,
  IntegratedToolbarPadding,
  TableToolbarConfig,
} from './configuration/toolbar.types'

export type { TableFeatureConfig } from './configuration/features.types'

export type {
  SkeletonWidthMode,
  SkeletonStickyStateMode,
  SkeletonScope,
  SkeletonCellConfig,
  TableSkeletonConfig,
  SkeletonConfigurationProps,
} from './configuration/skeleton.types'

export type {
  TableBorderConfig,
  TableBackgroundConfig,
} from './configuration/border-background.types'

export type {
  TableConfiguration,
  DeepPartial,
  TableConfigurationOverrides,
  UseTableConfigurationOptions,
  UseTableConfigurationReturn,
  TableConfigurationProps,
} from './configuration/unified.types'

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export type { StickyDataTableProps } from './props/table.props'
export type { TableHeaderProps } from './props/header.props'
export type { TableBodyProps } from './props/body.props'
export type { TableRowProps } from './props/row.props'
export type { TableCellProps } from './props/cell.props'
export type { NavigationArrowsProps } from './props/navigation.props'

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export type { TableContextValue } from './context.types'

// ============================================================================
// INFINITE SCROLL
// ============================================================================

export type { InfiniteScrollConfig } from './infinite-scroll.types'

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
} from './filter/config.types'

export type {
  ActiveFilter,
  FilterState,
  FilterToolbarProps,
} from './filter/state.types'

export { DEFAULT_DATE_PRESETS } from './filter/presets'

export {
  createSelectFilter,
  createDateFilter,
  createRangeFilter,
} from './filter/helpers'
