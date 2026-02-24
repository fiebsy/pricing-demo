/**
 * Fluid Button Layout Types
 *
 * Core types for the button state machine and fluid layout system.
 * Designed for seamless integration with both playground and modal contexts.
 *
 * @status stable
 */

import type { FluidTiming, FluidTimingPreset, FluidBlurConfig } from '../fluid-button-group/types'

// Re-export for convenience
export type { FluidTiming, FluidTimingPreset, FluidBlurConfig }

// ============================================================================
// Button State Identifiers
// ============================================================================

/**
 * Hierarchical state identifiers.
 * - A: Single primary button (no secondary)
 * - B1/B2: Two buttons shown (B1 = ready, B2 = processing)
 * - C1/C2: Single primary button (C1 = success, C2 = next action)
 */
export type ButtonStateId = 'A' | 'B1' | 'B2' | 'C1' | 'C2'

/** Phase groupings for state transitions */
export type ButtonPhase = 'A' | 'B' | 'C'

// ============================================================================
// Button State Configuration
// ============================================================================

/** Checkmark entrance animation style */
export type CheckmarkEntranceStyle = 'draw' | 'flip'

/** Individual button state configuration */
export interface ButtonStateConfig {
  /** Unique identifier for this state */
  id: string
  /** Button text content */
  text: string
  /** Show loading spinner */
  showSpinner: boolean
  /** Show success checkmark */
  showCheckmark: boolean
  /** Show text content */
  showText: boolean
}

/**
 * Complete button state with derived visibility.
 * Used by consuming components after state machine processing.
 */
export interface ButtonState extends ButtonStateConfig {
  /** Whether secondary button should be visible (derived from state ID) */
  showSecondary: boolean
  /** Current state identifier */
  stateId: ButtonStateId
}

// ============================================================================
// State Machine Configuration
// ============================================================================

/** Map of all button states keyed by state ID */
export type ButtonStatesMap = Record<ButtonStateId, ButtonStateConfig>

/** State transition validation result */
export interface TransitionValidation {
  valid: boolean
  reason?: string
}

/** Animation timing for state transitions */
export interface StateTransitionConfig {
  /** Text slide animation duration (ms) */
  textSlideDuration: number
  /** Text slide easing function */
  textSlideEasing: string
  /** Spinner to checkmark transition duration (ms) */
  spinnerToCheckmarkDuration: number
  /** Checkmark draw animation duration (ms) */
  checkmarkDrawDuration: number
  /** Checkmark entrance animation style */
  checkmarkEntranceStyle: CheckmarkEntranceStyle
}

// ============================================================================
// State Machine Hook Types
// ============================================================================

/** Options for useButtonStateMachine hook */
export interface UseButtonStateMachineOptions {
  /** Custom state definitions (overrides defaults) */
  states?: Partial<ButtonStatesMap>
  /** Initial state ID */
  initialState?: ButtonStateId
  /** Controlled state ID (makes hook controlled) */
  stateId?: ButtonStateId
  /** Callback when state changes */
  onStateChange?: (stateId: ButtonStateId, state: ButtonState) => void
  /** Custom transition validator */
  validateTransition?: (from: ButtonStateId, to: ButtonStateId) => TransitionValidation
}

/** Return value from useButtonStateMachine hook */
export interface UseButtonStateMachineReturn {
  /** Current state ID */
  stateId: ButtonStateId
  /** Complete current state with derived values */
  state: ButtonState
  /** Transition to a new state */
  transitionTo: (stateId: ButtonStateId) => boolean
  /** Whether secondary button should be visible */
  showSecondary: boolean
  /** All available states */
  states: ButtonStatesMap
  /** Check if a transition is valid */
  canTransitionTo: (stateId: ButtonStateId) => boolean
}

// ============================================================================
// Auto Transition Configuration
// ============================================================================

/** Configuration for automatic state transitions */
export interface AutoTransitionConfig {
  /** Enable auto transitions (B2 → C1 → C2) */
  enabled: boolean
  /** Delay before B2 → C1 transition (ms) */
  b2ToC1Delay: number
  /** Delay before C1 → C2 transition (ms) */
  c1ToC2Delay: number
}

/** Options for useAutoTransitions hook */
export interface UseAutoTransitionsOptions {
  /** Current state ID */
  stateId: ButtonStateId
  /** Auto transition configuration */
  config: AutoTransitionConfig
  /** Function to transition to a new state */
  transitionTo: (state: ButtonStateId) => void
  /** Whether slow motion is enabled */
  slowMo: boolean
}

/** Return value from useAutoTransitions hook */
export interface UseAutoTransitionsReturn {
  /** Cancel any pending auto transitions */
  cancelPendingTransitions: () => void
  /** Restart the flow from state A */
  restartFlow: () => void
}

// ============================================================================
// Composite Hook Types
// ============================================================================

/** Options for useFluidButtonLayout hook */
export interface UseFluidButtonLayoutOptions {
  /** Initial state for uncontrolled mode */
  initialState?: ButtonStateId
  /** Controlled state ID */
  stateId?: ButtonStateId
  /** Callback when state changes */
  onStateChange?: (stateId: ButtonStateId, state: ButtonState) => void
  /** Auto transition config (defaults to DEFAULT_AUTO_TRANSITION) */
  autoTransition?: Partial<AutoTransitionConfig>
  /** Custom state definitions */
  states?: Partial<ButtonStatesMap>
  /** Slow motion mode for debugging */
  slowMo?: boolean
}

/** Return value from useFluidButtonLayout hook */
export interface UseFluidButtonLayoutReturn extends UseButtonStateMachineReturn, UseAutoTransitionsReturn {}
