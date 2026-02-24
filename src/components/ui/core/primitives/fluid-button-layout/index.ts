/**
 * Fluid Button Layout
 *
 * State machine-driven button layout system with automatic
 * secondary button visibility derivation.
 *
 * Key features:
 * - Eliminates manual sync between state and showBothButtons
 * - Provides adapters for different contexts (playground, modal)
 * - Exports reusable animated button components
 *
 * @status stable
 */

// ============================================================================
// Types
// ============================================================================

export type {
  // State identifiers
  ButtonStateId,
  ButtonPhase,
  // Configuration
  ButtonStateConfig,
  ButtonState,
  ButtonStatesMap,
  StateTransitionConfig,
  CheckmarkEntranceStyle,
  // Validation
  TransitionValidation,
  // Hook types
  UseButtonStateMachineOptions,
  UseButtonStateMachineReturn,
  // Auto transition types
  AutoTransitionConfig,
  UseAutoTransitionsOptions,
  UseAutoTransitionsReturn,
  // Composite hook types
  UseFluidButtonLayoutOptions,
  UseFluidButtonLayoutReturn,
  // Re-exported from fluid-button-group
  FluidTiming,
  FluidTimingPreset,
  FluidBlurConfig,
} from './types'

// ============================================================================
// Constants
// ============================================================================

export {
  SHOW_SECONDARY_MAP,
  STATE_TO_PHASE,
  ALL_STATE_IDS,
  DEFAULT_BUTTON_STATES,
  DEFAULT_STATE_TRANSITION,
  DEFAULT_VALID_TRANSITIONS,
  DEFAULT_AUTO_TRANSITION,
} from './constants'

// ============================================================================
// State Machine
// ============================================================================

export {
  getShowSecondary,
  buildButtonState,
  getButtonState,
  validateTransition,
  validateTransitionPermissive,
  createStateMachine,
  type StateMachineConfig,
  type StateMachine,
} from './state-machine'

// ============================================================================
// Hooks
// ============================================================================

export {
  useButtonStateMachine,
  useShowSecondary,
  useAllStateIds,
} from './hooks/use-button-state-machine'

export { useAutoTransitions } from './hooks/use-auto-transitions'

export { useFluidButtonLayout } from './hooks/use-fluid-button-layout'

// ============================================================================
// Components
// ============================================================================

export { LoadingSpinner } from './components/loading-spinner'
export type { LoadingSpinnerProps } from './components/loading-spinner'

export { AnimatedCheckmark, StaticCheckmark } from './components/animated-checkmark'
export type { AnimatedCheckmarkProps, StaticCheckmarkProps } from './components/animated-checkmark'

export { AnimatedRightButton } from './components/animated-right-button'
export type { AnimatedRightButtonProps } from './components/animated-right-button'

// ============================================================================
// Adapters
// ============================================================================

export {
  // Stage mapping
  DEFAULT_STAGE_TO_STATE_MAP,
  stageToStateId,
  // Config conversion
  stageButtonConfigToState,
  // Timing derivation
  deriveFluidTimingFromMaster,
  // State transition builder
  buildStateTransitionConfig,
  // Visibility helper
  getFluidVisibility,
  // Types
  type ModalStageButtonConfig,
  type ModalFluidButtonConfig,
} from './adapters/modal-adapter'

// ============================================================================
// Presets
// ============================================================================

export {
  PRICING_FLOW_PRESET,
  QUICK_FLOW_PRESET,
  MODAL_SYNC_PRESET,
} from './presets'

export type { FluidButtonLayoutPreset } from './presets'
