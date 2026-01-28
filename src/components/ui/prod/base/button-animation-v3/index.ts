/**
 * ButtonAnimation V3 - Public API
 *
 * Clean, production-ready multi-level navigation.
 * Fixes child-to-parent animation issues with minimal complexity.
 *
 * @module prod/base/button-animation-v3
 *
 * @example
 * ```tsx
 * import { ButtonAnimationV3 } from '@/components/ui/prod/base/button-animation-v3'
 *
 * <ButtonAnimationV3
 *   items={navigationItems}
 *   showNumbers
 * />
 * ```
 */

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export { ButtonAnimationV3 } from './ButtonAnimationV3'

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Props
  ButtonAnimationV3Props,
  
  // Data structures
  StackItem,
  ActivePath,
  
  // Configuration
  AnimationConfig,
  StyleConfig,
  
  // States
  StateContext,
  
  // Component props
  StackLevelProps,
  AnimatedItemProps,
  
  // Context
  StackContextValue,
  LevelContextValue,
} from './types'

export { AnimationState } from './types'

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
  SPRING_PRESETS,
  
  // Helpers
  getAnchoredZIndex,
  getNumberLabel,
} from './config'

// =============================================================================
// UTILITIES
// =============================================================================

export {
  // State utilities
  determineButtonState,
  isPromotionTransition,
  getStateVisualProps,
  getTransitionDuration,
} from './utils/states'

export {
  // Animation utilities
  getSpringTransition,
  getChildEntryOffset,
  getChildDelay,
  getPromotionAnimation,
  getExitAnimation,
} from './utils/animations'

// =============================================================================
// HOOKS
// =============================================================================

export { useStackAnimation } from './hooks/useStackAnimation'

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
// COMPONENTS
// =============================================================================

export { AnimatedItem } from './components/AnimatedItem'
export { StackLevel } from './components/StackLevel'
export { DebugOverlay } from './components/DebugOverlay'