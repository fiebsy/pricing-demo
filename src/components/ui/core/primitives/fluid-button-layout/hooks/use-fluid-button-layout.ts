/**
 * useFluidButtonLayout Hook
 *
 * Composite hook combining state machine and auto-transitions for
 * complete button flow management. This is the primary hook for
 * integrating fluid button layouts into pricing flows.
 *
 * @status stable
 */

'use client'

import { useMemo } from 'react'
import type {
  UseFluidButtonLayoutOptions,
  UseFluidButtonLayoutReturn,
  AutoTransitionConfig,
} from '../types'
import { DEFAULT_AUTO_TRANSITION } from '../constants'
import { useButtonStateMachine } from './use-button-state-machine'
import { useAutoTransitions } from './use-auto-transitions'

/**
 * Composite hook for fluid button layout with automatic state transitions.
 *
 * Combines:
 * - `useButtonStateMachine` for state management (A → B1 → B2 → C1 → C2)
 * - `useAutoTransitions` for automatic progression (B2 → C1 → C2)
 *
 * @example
 * ```tsx
 * // Basic usage with defaults
 * const {
 *   stateId,
 *   state,
 *   showSecondary,
 *   transitionTo,
 *   cancelPendingTransitions,
 * } = useFluidButtonLayout({
 *   initialState: 'A',
 *   onStateChange: (id) => console.log('State:', id),
 * })
 *
 * // Handle primary button click
 * const handlePrimaryClick = () => {
 *   if (stateId === 'A') transitionTo('B1')
 *   else if (stateId === 'B1') transitionTo('B2')
 *   // B2 → C1 → C2 happens automatically
 * }
 *
 * // Handle back button click
 * const handleBack = () => {
 *   cancelPendingTransitions()
 *   transitionTo('A')
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom auto-transition timing
 * const layout = useFluidButtonLayout({
 *   initialState: 'A',
 *   autoTransition: {
 *     enabled: true,
 *     b2ToC1Delay: 2000, // Faster processing
 *     c1ToC2Delay: 800,  // Quicker success display
 *   },
 * })
 * ```
 *
 * @example
 * ```tsx
 * // Disable auto-transitions for manual control
 * const layout = useFluidButtonLayout({
 *   initialState: 'A',
 *   autoTransition: { enabled: false },
 * })
 * ```
 */
export function useFluidButtonLayout(
  options: UseFluidButtonLayoutOptions = {}
): UseFluidButtonLayoutReturn {
  const {
    initialState,
    stateId: controlledStateId,
    onStateChange,
    autoTransition,
    states,
    slowMo = false,
  } = options

  // Merge auto-transition config with defaults
  const autoTransitionConfig = useMemo<AutoTransitionConfig>(() => ({
    ...DEFAULT_AUTO_TRANSITION,
    ...autoTransition,
  }), [autoTransition])

  // State machine for managing button states
  const stateMachine = useButtonStateMachine({
    initialState,
    stateId: controlledStateId,
    onStateChange,
    states,
  })

  // Auto-transitions for B2 → C1 → C2 progression
  const autoTransitions = useAutoTransitions({
    stateId: stateMachine.stateId,
    config: autoTransitionConfig,
    transitionTo: stateMachine.transitionTo,
    slowMo,
  })

  // Combine returns from both hooks
  return {
    ...stateMachine,
    ...autoTransitions,
  }
}
