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
 * import type { ColumnConfig } from './types/column.types'
 * import type { StickyState } from './types/styling.types'
 */

// ============================================================================
// RE-EXPORTS FROM MODULAR TYPES
// ============================================================================

// Sorting types
export type { SortColumn, SortDirection, SortState } from './types/sort.types'

// Column types
export type {
  ColumnAlignment,
  ColumnConfig,
  ComputedColumn,
  ColumnChange,
  ColumnVisibilityState,
} from './types/column.types'

// Styling types
export type {
  BorderConfig,
  BackgroundConfig,
  StickyState,
  ScrollState,
} from './types/styling.types'

// Selection types
export type { SelectionState } from './types/selection.types'

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
} from './types/props.types'

// Table configuration types
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
} from './types/table-configuration.types'
