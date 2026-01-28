/**
 * ButtonAnimation V2 - Public API
 *
 * Multi-level expandable navigation with infinite nesting support.
 * Uses the peek-behind stacking pattern for O(1) performance.
 *
 * @module prod/base/button-animation-v2
 *
 * @example
 * ```tsx
 * import { ButtonAnimationV2 } from '@/components/ui/prod/base/button-animation-v2'
 *
 * // Basic usage
 * <ButtonAnimationV2 />
 *
 * // With deep nesting
 * <ButtonAnimationV2
 *   items={[
 *     { id: 'all', label: 'All' },
 *     {
 *       id: 'design',
 *       label: 'Design',
 *       children: [
 *         {
 *           id: 'figma',
 *           label: 'Figma',
 *           children: [
 *             { id: 'components', label: 'Components' },
 *           ],
 *         },
 *       ],
 *     },
 *   ]}
 *   showNumbers
 * />
 * ```
 */

// ============================================================================
// COMPONENTS
// ============================================================================

export { ButtonAnimationV2 } from './button-animation-v2'
export { ButtonAnimationV2Enhanced } from './ButtonAnimationV2Enhanced'
// Legacy export name for compatibility
export { ButtonAnimationV2Enhanced as EnhancedButtonAnimationV2 } from './ButtonAnimationV2Enhanced'

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Props
  ButtonAnimationV2Props,

  // Data structures
  StackItem,
  ActivePath,
  StackPhase,

  // Configuration
  AnimationConfig,
  StyleConfig,
  OffsetTarget,

  // Animation primitives
  EaseType,
  EntryDirection,
  EntryOrder,
  StaggerDirection,
  GapSize,

  // Button types
  ButtonVariant,
  ButtonSize,
  ButtonRoundness,

  // Context types
  StackContextValue,
  LevelContextValue,
} from './types'

// ============================================================================
// CONFIGURATION
// ============================================================================

export {
  // Default configs
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_STYLE_CONFIG,
  DEFAULT_STACK_ITEMS,

  // Layout tokens
  GAP_CLASSES,
  SIZE_HEIGHT_CLASSES,

  // Z-index utilities
  Z_INDEX_INCREMENT,
  getZIndexForLevel,
  getZIndexClass,

  // Numbering
  CHILD_LETTERS,
  getNumberLabel,

  // Constants
  ROOT_ANCHOR_ID,
  PHASE_TRANSITION_DELAY_MS,
} from './config'

// ============================================================================
// CONTEXT
// ============================================================================

export {
  StackContext,
  useStackContext,
  useStackContextOptional,
  LevelContext,
  useLevelContext,
} from './context'

// ============================================================================
// HOOKS
// ============================================================================

export {
  useStackState,
  type StackStateReturn,
  type UseStackStateOptions,
} from './hooks'

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

export {
  getTransition,
  getChildTransition,
  getExitTransition,
  SPRING_PRESETS,
  getEntryOffset,
  getStaggerIndex,
  getChildDelay,
  type SpringTransition,
  type DurationTransition,
  type TransitionConfig,
  type EntryOffset,
} from './animation'

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

export {
  StackItemComponent,
  StackLevel,
  type StackItemComponentProps,
  type StackLevelProps,
} from './components'

export {
  AnimatedButton,
  type AnimatedButtonProps,
} from './components/AnimatedButton'

export {
  EnhancedStackLevel,
  type EnhancedStackLevelProps,
} from './components/EnhancedStackLevel'

// ============================================================================
// DEBUG COMPONENTS
// ============================================================================

export { 
  StateVisualizer, 
  MiniStateVisualizer,
  type StateVisualizerProps,
} from './debug/StateVisualizer'

// ============================================================================
// CORE UTILITIES
// ============================================================================

export { 
  ButtonState, 
  determineButtonState, 
  STATE_METADATA,
  STATE_TRANSITIONS,
  isTransitionAllowed,
  getTransitionConfig,
  isTransitionalState,
  getStateZIndex,
  getStateOpacity,
  type StateContext,
  type StateMetadata,
  type StateTransition,
} from './core/state-machine'

export { 
  AnimationPhaseManager, 
  useAnimationPhases,
  type AnimationPhase,
  type GlobalPhase,
  type AnimationSequence,
  type AnimationStep,
} from './core/animation-phases'

export { 
  PositionCalculator,
  getPositionCalculator, 
  usePositionCalculator,
  type Position,
  type BoundingBox,
  type PositionConfig,
  type LayoutContext,
} from './core/position-calculator'
