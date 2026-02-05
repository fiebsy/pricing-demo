/**
 * StackingNav - Public API
 *
 * A multi-level navigation component with smooth stacking animations.
 * Uses centralized phase state machine for improved timing coordination.
 *
 * @module features/stacking-nav
 *
 * @example
 * ```tsx
 * import { StackingNav } from '@/components/ui/features/experimental/stacking-nav'
 *
 * <StackingNav
 *   items={navigationItems}
 *   onSelectionChange={(path) => setActiveFilters(path)}
 *   showPhaseIndicator={true} // Debug phase state
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

  // Context (split for performance)
  PhaseContextValue,
  ConfigContextValue,
  NavigationContextValue,
  StackContextValue,
  LevelContextValue,

  // Item state
  AnimationMode,
  ItemRenderState,
  ItemStateContext,

  // Phase
  PhaseTransitionRecord,
} from './types'

// =============================================================================
// PHASE STATE MACHINE
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
  isPhaseAnimating,
  isPhaseResting,
  isPhaseExpandingOrPromoting,
} from './state/transitions'

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

  // Debug log (for playground)
  debugLog,

  // Item state computation
  computeItemState,
  computeLevelAllZIndex,
} from './utils'

// =============================================================================
// CONTEXT (Split for performance)
// =============================================================================

export {
  // Split contexts (prefer these for better performance)
  PhaseContext,
  usePhaseContext,
  ConfigContext,
  useConfigContext,
  NavigationContext,
  useNavigationContext,

  // Combined context (convenience hook combining all contexts)
  StackContext,
  useStackContext,

  // Level context
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
