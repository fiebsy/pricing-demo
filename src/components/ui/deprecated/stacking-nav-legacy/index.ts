/**
 * StackingNav - Public API
 *
 * A multi-level navigation component with smooth stacking animations.
 * Items "peek behind" as you navigate deeper, creating a breadcrumb-like trail.
 *
 * @module features/stacking-nav
 *
 * @example
 * ```tsx
 * import { StackingNav } from '@/components/ui/features/stacking-nav'
 *
 * <StackingNav
 *   items={navigationItems}
 *   onSelectionChange={(path) => setActiveFilters(path)}
 * />
 * ```
 */

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export { StackingNav } from './stacking-nav'

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Props
  StackingNavProps,

  // Data structures
  StackItem,
  ActivePath,

  // Configuration
  AnimationConfig,
  StyleConfig,
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,
  AnimationType,
  EasingType,

  // Component props (internal)
  StackLevelProps,
  AnimatedItemProps,

  // Context
  StackContextValue,
  LevelContextValue,
} from './types'

// =============================================================================
// CONFIGURATION
// =============================================================================

export {
  // Defaults
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_STACK_ITEMS,

  // Constants
  ROOT_ANCHOR_ID,
  Z_INDEX,
  GAP_CLASSES,
  HEIGHT_CLASSES,
  SPRING_PRESETS,

  // Helpers
  getAnchoredZIndex,
  getNumberLabel,
} from './config'

// =============================================================================
// UTILITIES
// =============================================================================

export {
  // Animation utilities
  getChildEntryOffset,
  getChildDelay,
  getPromotionAnimation,
  getExitAnimation,
} from './utils/animations'

// =============================================================================
// CONTEXT
// =============================================================================

export {
  StackContext,
  useStackContext,
  LevelContext,
  useLevelContext,
} from './context'

// =============================================================================
// COMPONENTS (Internal - for advanced customization)
// =============================================================================

export { AnimatedItem } from './components/animated-item'
export { StackLevel } from './components/stack-level'
