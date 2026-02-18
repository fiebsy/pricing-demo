/**
 * Menu - Configuration Exports
 *
 * Centralized exports for all menu configuration modules.
 *
 * @module prod/base/menu/config
 */

// ============================================================================
// Defaults
// ============================================================================

export {
  Z_INDEX,
  ANIMATION_TIMING,
  DEFAULT_ANIMATION,
  DEFAULT_FEATURES,
  DEFAULT_UNIFIED_HOVER,
  DEFAULT_APPEARANCE,
  DEFAULT_MENU_WIDTH,
  DEFAULT_SIDE_OFFSET,
} from './defaults'

// ============================================================================
// Spring Animation
// ============================================================================

export {
  SPRING_PRESETS,
  getSpringConfig,
  getSpringSettlingTime,
} from './spring'

// ============================================================================
// Reveal Animation
// ============================================================================

export {
  EASING_EXPO_OUT,
  REVEAL_ANIMATION,
  REVEAL_EASING,
  REVEAL_TRANSITION,
  createRevealVariants,
  createReducedMotionVariants,
  createRevealTransition,
} from './reveal'

export type { RevealVariantConfig } from './reveal'

// ============================================================================
// Styling
// ============================================================================

export {
  BORDER_RADIUS_CLASSES,
  SHADOW_CLASSES,
  BACKGROUND_CLASSES,
  getPopupClasses,
  getGradientStyles,
  getItemRadius,
  MENU_ITEM_STYLES,
  MENU_ITEM_STYLES_SMALL,
  SEPARATOR_STYLES,
  getSeparatorClasses,
  INTERACTIVE_STATES,
} from './styles'
