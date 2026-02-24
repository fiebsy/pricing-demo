/**
 * Button State Machine
 *
 * Core state machine logic for button states.
 * Provides transition validation and state derivation.
 *
 * @status stable
 */

import type {
  ButtonStateId,
  ButtonStateConfig,
  ButtonState,
  ButtonStatesMap,
  TransitionValidation,
} from './types'
import {
  SHOW_SECONDARY_MAP,
  DEFAULT_BUTTON_STATES,
  DEFAULT_VALID_TRANSITIONS,
} from './constants'

// ============================================================================
// State Derivation
// ============================================================================

/**
 * Derives secondary button visibility from state ID.
 * This is THE core function that eliminates manual sync.
 */
export function getShowSecondary(stateId: ButtonStateId): boolean {
  return SHOW_SECONDARY_MAP[stateId]
}

/**
 * Builds a complete ButtonState from a state ID and config.
 * Adds derived values (showSecondary, stateId) to the base config.
 */
export function buildButtonState(
  stateId: ButtonStateId,
  config: ButtonStateConfig
): ButtonState {
  return {
    ...config,
    stateId,
    showSecondary: getShowSecondary(stateId),
  }
}

/**
 * Gets a complete ButtonState from the states map.
 */
export function getButtonState(
  stateId: ButtonStateId,
  states: ButtonStatesMap = DEFAULT_BUTTON_STATES
): ButtonState {
  return buildButtonState(stateId, states[stateId])
}

// ============================================================================
// Transition Validation
// ============================================================================

/**
 * Default transition validator using DEFAULT_VALID_TRANSITIONS.
 * Returns validation result with reason for failure.
 */
export function validateTransition(
  from: ButtonStateId,
  to: ButtonStateId,
  validTransitions: Record<ButtonStateId, ButtonStateId[]> = DEFAULT_VALID_TRANSITIONS
): TransitionValidation {
  const allowedTargets = validTransitions[from]

  if (!allowedTargets) {
    return {
      valid: false,
      reason: `No transitions defined for state "${from}"`,
    }
  }

  if (!allowedTargets.includes(to)) {
    return {
      valid: false,
      reason: `Transition from "${from}" to "${to}" is not allowed. Valid targets: ${allowedTargets.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Permissive validator that allows any transition.
 * Use this for playground/demo contexts where strict validation isn't needed.
 */
export function validateTransitionPermissive(): TransitionValidation {
  return { valid: true }
}

// ============================================================================
// State Machine Factory
// ============================================================================

/**
 * Creates a state machine instance with optional custom states and validation.
 * This is a functional approach - no class instantiation needed.
 */
export interface StateMachineConfig {
  states?: Partial<ButtonStatesMap>
  validTransitions?: Record<ButtonStateId, ButtonStateId[]>
  strictValidation?: boolean
}

export interface StateMachine {
  getState: (stateId: ButtonStateId) => ButtonState
  canTransition: (from: ButtonStateId, to: ButtonStateId) => TransitionValidation
  getAllStateIds: () => readonly ButtonStateId[]
  getStates: () => ButtonStatesMap
}

export function createStateMachine(config: StateMachineConfig = {}): StateMachine {
  const { states: customStates, validTransitions, strictValidation = false } = config

  // Merge custom states with defaults
  const states: ButtonStatesMap = customStates
    ? { ...DEFAULT_BUTTON_STATES, ...customStates }
    : DEFAULT_BUTTON_STATES

  return {
    getState: (stateId: ButtonStateId) => getButtonState(stateId, states),

    canTransition: (from: ButtonStateId, to: ButtonStateId) => {
      if (!strictValidation) {
        return validateTransitionPermissive()
      }
      return validateTransition(from, to, validTransitions)
    },

    getAllStateIds: () => Object.keys(states) as ButtonStateId[],

    getStates: () => states,
  }
}
