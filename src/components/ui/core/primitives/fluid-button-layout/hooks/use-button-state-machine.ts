/**
 * useButtonStateMachine Hook
 *
 * React hook for managing button state machine with automatic
 * secondary button visibility derivation.
 *
 * Key benefit: Eliminates manual sync of showBothButtons state.
 * The visibility is DERIVED from state ID, not stored separately.
 *
 * @status stable
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import type {
  ButtonStateId,
  ButtonState,
  ButtonStatesMap,
  UseButtonStateMachineOptions,
  UseButtonStateMachineReturn,
  TransitionValidation,
} from '../types'
import {
  DEFAULT_BUTTON_STATES,
  ALL_STATE_IDS,
} from '../constants'
import {
  getButtonState,
  validateTransitionPermissive,
} from '../state-machine'

/**
 * Hook for managing button state machine.
 *
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: Pass `initialState`, hook manages state internally
 * - Controlled: Pass `stateId`, parent manages state
 *
 * @example
 * ```tsx
 * // Uncontrolled (playground)
 * const { state, transitionTo, showSecondary } = useButtonStateMachine({
 *   initialState: 'A',
 * })
 *
 * // Controlled (modal integration)
 * const { state, showSecondary } = useButtonStateMachine({
 *   stateId: modalState,
 * })
 * ```
 */
export function useButtonStateMachine(
  options: UseButtonStateMachineOptions = {}
): UseButtonStateMachineReturn {
  const {
    states: customStates,
    initialState = 'A',
    stateId: controlledStateId,
    onStateChange,
    validateTransition = validateTransitionPermissive,
  } = options

  // Merge custom states with defaults
  const states = useMemo<ButtonStatesMap>(() => {
    if (!customStates) return DEFAULT_BUTTON_STATES
    return { ...DEFAULT_BUTTON_STATES, ...customStates }
  }, [customStates])

  // Internal state (used when uncontrolled)
  const [internalStateId, setInternalStateId] = useState<ButtonStateId>(initialState)

  // Determine actual state ID (controlled vs uncontrolled)
  const isControlled = controlledStateId !== undefined
  const currentStateId = isControlled ? controlledStateId : internalStateId

  // Derive complete state from state ID
  const currentState = useMemo<ButtonState>(
    () => getButtonState(currentStateId, states),
    [currentStateId, states]
  )

  // Check if a transition is valid
  const canTransitionTo = useCallback(
    (targetStateId: ButtonStateId): boolean => {
      const validation = validateTransition(currentStateId, targetStateId)
      return validation.valid
    },
    [currentStateId, validateTransition]
  )

  // Transition to a new state
  const transitionTo = useCallback(
    (targetStateId: ButtonStateId): boolean => {
      const validation: TransitionValidation = validateTransition(currentStateId, targetStateId)

      if (!validation.valid) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[useButtonStateMachine] Invalid transition: ${validation.reason}`)
        }
        return false
      }

      // Get the new state before updating
      const newState = getButtonState(targetStateId, states)

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalStateId(targetStateId)
      }

      // Notify parent
      onStateChange?.(targetStateId, newState)

      return true
    },
    [currentStateId, validateTransition, states, isControlled, onStateChange]
  )

  return {
    stateId: currentStateId,
    state: currentState,
    transitionTo,
    showSecondary: currentState.showSecondary,
    states,
    canTransitionTo,
  }
}

/**
 * Convenience hook for getting just the derived showSecondary value.
 * Useful when you only need visibility without full state management.
 */
export function useShowSecondary(stateId: ButtonStateId): boolean {
  return useMemo(() => getButtonState(stateId).showSecondary, [stateId])
}

/**
 * Helper to get all valid state IDs.
 * Useful for building state selectors.
 */
export function useAllStateIds(): readonly ButtonStateId[] {
  return ALL_STATE_IDS
}
