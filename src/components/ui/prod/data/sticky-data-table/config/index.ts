/**
 * StickyDataTable - Configuration Module
 *
 * Centralized exports for all table configuration.
 * All defaults are based on JAN2 preset - the production source of truth.
 *
 * @module config
 *
 * @example
 * ```tsx
 * import {
 *   TABLE_CONFIG,
 *   DEFAULT_TABLE_CONFIGURATION,
 *   getDefaultTableProps,
 *   DEFAULT_FILTER_CONFIG,
 * } from './config'
 * ```
 */

// ============================================================================
// CONSTANTS
// ============================================================================

export {
  // Dimensions
  TABLE_CONFIG,
  CELL_CONFIG,
  ARROW_CONFIG,
  ANIMATION_CONFIG,
  // Appearance
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
  // Toolbar (types + defaults)
  type ToolbarPosition,
  type CountPosition,
  type CountDisplayConfig,
  type ToolbarLayoutConfig,
  type ToolbarConfig,
  DEFAULT_TOOLBAR_LAYOUT,
  // Skeleton
  DEFAULT_SKELETON_CELL,
  DEFAULT_SKELETON_CONFIG,
  // Filter (types + defaults)
  type FilterMenuConfig,
  type FilterTriggerConfig,
  type FilterPillConfig,
  type FilterToolbarConfig,
  DEFAULT_FILTER_MENU,
  DEFAULT_FILTER_TRIGGER,
  DEFAULT_FILTER_PILL,
  DEFAULT_FILTER_CONFIG,
} from './constants'

// ============================================================================
// CALCULATORS
// ============================================================================

export {
  calculateIntegratedHeaderGap,
  calculateToolbarHeight,
  type SkeletonDimensionConfig,
  calculateSkeletonHeight,
  deepMerge,
} from './calculators'

// ============================================================================
// FACTORIES
// ============================================================================

export {
  // Appearance
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  createInitialStickyState,
  // Toolbar
  createToolbarLayoutConfig,
  createToolbarConfig,
  inferToolbarConfigFromProps,
  // Skeleton
  createSkeletonDimensionConfig,
  createSkeletonConfig,
  // Filter
  toMenuAppearanceConfig,
  createFilterConfig,
  mergeFilterConfig,
  // Table configuration
  createTableConfiguration,
  tableConfigToProps,
  getDefaultTableProps,
} from './factories'

// ============================================================================
// PRESETS
// ============================================================================

export { DEFAULT_TABLE_CONFIGURATION } from './presets'

// ============================================================================
// TYPES (re-exported from types module for convenience)
// ============================================================================

export type {
  // Styling types
  BorderConfig,
  BackgroundConfig,
  StickyState,
  // Configuration types
  TableConfiguration,
  TableConfigurationOverrides,
  TableConfigurationProps,
  DeepPartial,
  // Skeleton types from types module
  SkeletonCellConfig,
  TableSkeletonConfig,
  SkeletonScope,
  SkeletonStickyStateMode,
  // Filter types from types module
  FilterConfig,
} from '../types'
