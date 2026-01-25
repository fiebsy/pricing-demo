/**
 * FilterMenuMotion - Module Export
 *
 * A filter menu component with Motion Dev animations.
 * Built on Base UI Menu primitives with integrated motion/react.
 *
 * @module prod/base/filter/filter-menu-motion
 */

// Main component
export { FilterMenuMotion } from './filter-menu-motion'

// Types
export type {
  IconType,
  MenuItem,
  MenuItemAction,
  MenuItemSubmenu,
  MenuItemSeparator,
  MenuSide,
  MenuAlign,
  PanelState,
  MotionAnimationConfig,
  FilterMenuMotionProps,
} from './types'

// Animation config
export {
  DEFAULT_MOTION_ANIMATION,
  DEFAULT_WIDTH,
  DEFAULT_SIDE_OFFSET,
  EASE_OUT_EXPO,
  getMotionTransition,
  getTimedTransition,
  getHeightTransition,
  getSlideTransition,
  createPopupVariants,
  createItemVariants,
} from './animation-config'

// Default items
export { DEFAULT_FILTER_ITEMS } from './default-items'

// Utilities
export { transformItemsWithFilterState } from './utils'

// Sub-components (for advanced customization)
export {
  AnimatedMenuItem,
  AnimatedPanel,
  SlidingPanelContainer,
  FilterMenuHeader,
  BackButton,
  FilterTrigger,
} from './components'
