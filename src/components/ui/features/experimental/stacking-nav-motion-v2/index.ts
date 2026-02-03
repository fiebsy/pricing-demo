/**
 * StackingNav V2 - Public API
 *
 * A multi-level navigation component with smooth stacking animations.
 * V2 uses centralized phase state machine for improved timing coordination.
 *
 * @module features/stacking-nav-v2
 *
 * @example
 * ```tsx
 * import { StackingNav } from '@/components/ui/features/experimental/stacking-nav-motion-v2'
 *
 * <StackingNav
 *   items={navigationItems}
 *   onSelectionChange={(path) => setActiveFilters(path)}
 *   showPhaseIndicator={true} // V2: Debug phase state
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

  // Context
  StackContextValue,
  LevelContextValue,

  // Item state
  AnimationMode,
  ItemRenderState,
  ItemStateContext,

  // Phase (V2)
  PhaseTransitionRecord,
} from './types'

// =============================================================================
// PHASE STATE MACHINE (V2)
// =============================================================================

export {
  NavigationPhase,
  PHASE_COLORS,
  PHASE_LABELS,
  createInitialPhaseState,
  calculatePhaseDuration,
  isValidTransition,
  VALID_TRANSITIONS,
} from './state/navigation-phase'

export type { PhaseState, PhaseDurationConfig } from './state/navigation-phase'

export { usePhaseCoordinator } from './state/use-phase-coordinator'
export type {
  PhaseCoordinatorConfig,
  PhaseCoordinatorReturn,
} from './state/use-phase-coordinator'

export {
  detectNavigationChange,
  getTargetPhase,
  isActiveAnimation,
  isRestingState,
  getCompletionPhase,
} from './state/transitions'

export type { NavigationChange } from './state/transitions'

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
  LEVEL_ALL_PREFIX,
  Z_INDEX,
  GAP_CLASSES,
  HEIGHT_CLASSES,
  SPRING_PRESETS,

  // Helpers
  getAnchoredZIndex,
  getNumberLabel,
  isLevelAllId,
  getLevelFromLevelAllId,
  createLevelAllId,
} from './config'

// =============================================================================
// UTILITIES
// =============================================================================

export {
  // Animation utilities
  getEasingValue,
  getTransition,
  getChildEntryOffset,
  getChildDelay,
  getPromotionAnimation,
  getExitAnimation,
  getCollapseLayoutTransition,

  // Debug utilities
  configureDebug,
  isDebugEnabled,
  debug,
  debugTable,
  debugPhaseTransition,

  // Item state computation
  computeItemState,
  computeLevelAllZIndex,
} from './utils'

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
export { RootAnchor } from './components/root-anchor'
export { LevelAllRenderer } from './components/level-all-renderer'
export { LevelAllItem } from './components/level-all-item'
export { ItemRenderer } from './components/item-renderer'
export { PhaseIndicator } from './components/phase-indicator'
