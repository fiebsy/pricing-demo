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
// COMPONENT
// ============================================================================

export { ButtonAnimationV2 } from './button-animation-v2'

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
