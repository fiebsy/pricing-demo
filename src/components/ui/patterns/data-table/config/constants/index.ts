/**
 * StickyDataTable - Constants Index
 *
 * Re-exports all constant values and local types.
 *
 * @module config/constants
 */

// Dimensions
export {
  TABLE_CONFIG,
  CELL_CONFIG,
  ARROW_CONFIG,
  ANIMATION_CONFIG,
} from './dimensions'

// Appearance
export {
  DEFAULT_BORDER_CONFIG,
  DEFAULT_BACKGROUND_CONFIG,
} from './appearance'

// Toolbar (types + defaults)
export {
  type ToolbarPosition,
  type CountPosition,
  type CountDisplayConfig,
  type ToolbarLayoutConfig,
  type ToolbarConfig,
  DEFAULT_TOOLBAR_LAYOUT,
} from './toolbar'

// Skeleton
export {
  DEFAULT_SKELETON_CELL,
  DEFAULT_SKELETON_CONFIG,
} from './skeleton'

// Filter (types + defaults)
export {
  type FilterMenuConfig,
  type FilterTriggerConfig,
  type FilterPillConfig,
  type FilterToolbarConfig,
  DEFAULT_FILTER_MENU,
  DEFAULT_FILTER_TRIGGER,
  DEFAULT_FILTER_PILL,
  DEFAULT_FILTER_CONFIG,
} from './filter'
