/**
 * StickyDataTable V2 - Configuration
 *
 * Re-exports from the config/ module for backward compatibility.
 * All defaults are based on JAN2 preset - the production source of truth.
 *
 * @module config
 */

// ============================================================================
// RE-EXPORTS FROM CONFIG MODULE
// All exports are now organized in config/
// ============================================================================

export {
  // Dimensions
  TABLE_CONFIG,
  CELL_CONFIG,
  ARROW_CONFIG,
  ANIMATION_CONFIG,
  // Appearance defaults
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
  // Toolbar types + defaults
  type ToolbarPosition,
  type CountPosition,
  type CountDisplayConfig,
  type ToolbarLayoutConfig,
  type ToolbarConfig,
  DEFAULT_TOOLBAR_LAYOUT,
  // Filter types + defaults (JAN2)
  type FilterMenuConfig,
  type FilterTriggerConfig,
  type FilterPillConfig,
  type FilterToolbarConfig,
  DEFAULT_FILTER_MENU,
  DEFAULT_FILTER_TRIGGER,
  DEFAULT_FILTER_PILL,
  DEFAULT_FILTER_CONFIG,
  // Skeleton defaults
  DEFAULT_SKELETON_CELL,
  DEFAULT_SKELETON_CONFIG,
  // Calculators
  calculateIntegratedHeaderGap,
  calculateToolbarHeight,
  type SkeletonDimensionConfig,
  calculateSkeletonHeight,
  deepMerge,
  // Factories
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  createInitialStickyState,
  createToolbarLayoutConfig,
  createToolbarConfig,
  inferToolbarConfigFromProps,
  createSkeletonDimensionConfig,
  createSkeletonConfig,
  toMenuAppearanceConfig,
  createFilterConfig,
  mergeFilterConfig,
  createTableConfiguration,
  tableConfigToProps,
  getDefaultTableProps,
  // Preset
  DEFAULT_TABLE_CONFIGURATION,
  // Types from types module
  type BorderConfig,
  type BackgroundConfig,
  type StickyState,
  type TableConfiguration,
  type TableConfigurationOverrides,
  type TableConfigurationProps,
  type DeepPartial,
  type SkeletonCellConfig,
  type TableSkeletonConfig,
  type SkeletonScope,
  type SkeletonStickyStateMode,
} from './config/index'

// ============================================================================
// ADDITIONAL TYPES (from types module)
// ============================================================================

import type {
  TableDimensionConfig,
  TableBorderConfig,
  TableBackgroundConfig,
  TableToolbarConfig,
  TableFeatureConfig,
} from './types'

export type {
  TableDimensionConfig,
  TableBorderConfig,
  TableBackgroundConfig,
  TableToolbarConfig,
  TableFeatureConfig,
}
