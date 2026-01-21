/**
 * ButtonAnimation - Public API
 *
 * Expandable navigation component with cascading animations.
 * Built on Motion for React with full accessibility support.
 *
 * @module prod/base/button-animation
 *
 * @example
 * ```tsx
 * import { ButtonAnimation } from '@/components/ui/prod/base/button-animation'
 *
 * // Basic usage
 * <ButtonAnimation />
 *
 * // With custom config
 * <ButtonAnimation
 *   items={customItems}
 *   parentConfig={{ stiffness: 600 }}
 *   childConfig={{ stagger: 0.05 }}
 *   showNumbers
 * />
 * ```
 */

// ============================================================================
// COMPONENT
// ============================================================================

export { ButtonAnimation } from './button-animation'

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Core types
  ButtonAnimationProps,
  NavItem,
  AnimationPhase,

  // Configuration types
  ParentAnimationConfig,
  ChildAnimationConfig,
  StyleConfig,

  // Animation primitives
  EaseType,
  EntryDirection,
  EntryOrder,
  OrchestrationWhen,
  StaggerDirection,
  GapSize,

  // Button types (re-exported for convenience)
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,

  // Subcomponent types
  ChipProps,
  AnimatedContainerProps,

  // Context
  ButtonAnimationContextValue,
} from './types'

// ============================================================================
// CONFIGURATION
// ============================================================================

export {
  // Default configs
  DEFAULT_PARENT_CONFIG,
  DEFAULT_CHILD_CONFIG,
  DEFAULT_STYLE_CONFIG,

  // Layout tokens
  GAP_CLASSES,
  SIZE_HEIGHT_CLASSES,

  // Constants
  ALL_BUTTON_ID,
  DEFAULT_NAV_ITEMS,
  CHILD_LETTERS,
} from './config'

// ============================================================================
// CONTEXT
// ============================================================================

export {
  ButtonAnimationContext,
  useButtonAnimationContext,
  useButtonAnimationContextOptional,
} from './context'

// ============================================================================
// HOOKS
// ============================================================================

export {
  useAnimationState,
  type AnimationStateReturn,
  type UseAnimationStateOptions,
} from './hooks'

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

export {
  // Transition utilities
  getTransition,
  getExitTransition,
  SPRING_PRESETS,

  // Stagger utilities
  getEntryOffset,
  getStaggerIndex,
  getChildDelay,

  // Types
  type SpringTransition,
  type DurationTransition,
  type TransitionConfig,
  type TransitionParams,
  type EntryOffset,
} from './animation'

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

export { Chip } from './components'
