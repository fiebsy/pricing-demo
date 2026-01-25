/**
 * StickyDataTable V2 - Type Definitions
 *
 * Core types for the optimized sticky data table component.
 * Designed for type safety, performance, and scalability.
 *
 * This file re-exports all types from the modular types/ directory
 * for backward compatibility. New code should import directly from
 * the specific type module when possible.
 *
 * @module types
 *
 * @example
 * // Backward compatible import (from this file)
 * import type { ColumnConfig, StickyState } from './types'
 *
 * // New modular import (preferred for tree-shaking)
 * import type { ColumnConfig } from './types/core/column.types'
 * import type { StickyState } from './types/styling/sticky-state.types'
 */

// ============================================================================
// RE-EXPORTS FROM MODULAR TYPES
// ============================================================================

// Core types (sorting, columns, selection)
export type {
  SortColumn,
  SortDirection,
  SortState,
  ColumnAlignment,
  ColumnConfig,
  ComputedColumn,
  ColumnChange,
  ColumnVisibilityState,
  SelectionState,
} from './types/core'

// Styling types
export type {
  BorderConfig,
  BackgroundConfig,
  StickyState,
  ScrollState,
} from './types/styling'

// ============================================================================
// DRAG CLONE MODE
// ============================================================================

/**
 * Drag clone visual mode for column reordering
 * - 'floating': Shows a floating clone near the cursor (default)
 * - 'inline': Dragged column slides with cursor, others stay in place
 */
export type DragCloneMode = 'floating' | 'inline'

// Infinite scroll types
export type { InfiniteScrollConfig } from './types/infinite-scroll.types'

// Context types
export type { TableContextValue } from './types/context.types'

// Component props types
export type {
  StickyDataTableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  NavigationArrowsProps,
} from './types/props'

// Table configuration types
export type {
  TableDimensionConfig,
  TableBorderConfig,
  TableBackgroundConfig,
  TableToolbarConfig,
  TableFeatureConfig,
  TableConfiguration,
  TableConfigurationOverrides,
  TableConfigurationProps,
  ToolbarPositionMode,
  CountPositionMode,
  CountStackPositionMode,
  IntegratedToolbarPadding,
  DeepPartial,
  UseTableConfigurationOptions,
  UseTableConfigurationReturn,
  // Skeleton configuration types
  TableSkeletonConfig,
  SkeletonCellConfig,
  SkeletonWidthMode,
  SkeletonStickyStateMode,
  SkeletonScope,
  SkeletonConfigurationProps,
} from './types/configuration'

// Filter types
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
} from './types/filter'

// Filter helpers and constants
export { DEFAULT_DATE_PRESETS, createSelectFilter, createDateFilter, createRangeFilter } from './types/filter'
