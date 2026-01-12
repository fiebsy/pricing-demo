/**
 * StickyDataTable - Factories Index
 *
 * Re-exports all factory functions.
 *
 * @module config/factories
 */

// Appearance factories
export {
  createBorderConfig,
  createBackgroundConfig,
  createStickyState,
  createInitialStickyState,
} from './appearance'

// Toolbar factories
export {
  createToolbarLayoutConfig,
  createToolbarConfig,
  inferToolbarConfigFromProps,
} from './toolbar'

// Skeleton factories
export {
  createSkeletonDimensionConfig,
  createSkeletonConfig,
} from './skeleton'

// Filter factories
export {
  toMenuAppearanceConfig,
  createFilterConfig,
  mergeFilterConfig,
} from './filter'

// Table configuration factories
export {
  createTableConfiguration,
  tableConfigToProps,
  getDefaultTableProps,
} from './table-configuration'
