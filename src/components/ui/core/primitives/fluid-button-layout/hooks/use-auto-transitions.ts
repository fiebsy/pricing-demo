/**
 * Auto Transitions Hook
 *
 * Manages automatic timed transitions for the button state flow.
 * Triggers setTimeout when entering B2 or C1 states and handles cleanup.
 *
 * Flow: B2 → C1 (processing complete) → C2 (next action)
 *
 * @status stable
 */

'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { UseAutoTransitionsOptions, UseAutoTransitionsReturn } from '../types'

const SLOW_MO_MULTIPLIER = 5

/**
 * Hook for managing automatic state transitions.
 *
 * Automatically progresses through B2 → C1 → C2 states with configurable delays.
 * Essential for pricing flows where processing completes and shows success states.
 *
 * @example
 * ```tsx
 * const { cancelPendingTransitions, restartFlow } = useAutoTransitions({
 *   stateId,
 *   config: { enabled: true, b2ToC1Delay: 3100, c1ToC2Delay: 1300 },
 *   transitionTo,
 *   slowMo: false,
 * })
 *
 * // Cancel auto transitions when user goes back
 * const handleBack = () => {
 *   cancelPendingTransitions()
 *   transitionTo('A')
 * }
 * ```
 */
export function useAutoTransitions({
  stateId,
  config,
  transitionTo,
  slowMo,
}: UseAutoTransitionsOptions): UseAutoTransitionsReturn {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear any existing timer
  const cancelPendingTransitions = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Restart the flow from A
  const restartFlow = useCallback(() => {
    cancelPendingTransitions()
    transitionTo('A')
  }, [cancelPendingTransitions, transitionTo])

  // Handle auto transitions when state changes
  useEffect(() => {
    // Clear any existing timer when state changes
    cancelPendingTransitions()

    // Don't set up auto transitions if disabled
    if (!config.enabled) {
      return
    }

    // Calculate delay with slow motion multiplier
    const getDelay = (baseDelay: number) =>
      slowMo ? baseDelay * SLOW_MO_MULTIPLIER : baseDelay

    // Set up auto transitions based on current state
    if (stateId === 'B2') {
      // B2 → C1: Processing complete
      timerRef.current = setTimeout(() => {
        transitionTo('C1')
      }, getDelay(config.b2ToC1Delay))
    } else if (stateId === 'C1') {
      // C1 → C2: Success display complete
      timerRef.current = setTimeout(() => {
        transitionTo('C2')
      }, getDelay(config.c1ToC2Delay))
    }

    // Cleanup on unmount or state change
    return () => {
      cancelPendingTransitions()
    }
  }, [stateId, config.enabled, config.b2ToC1Delay, config.c1ToC2Delay, slowMo, transitionTo, cancelPendingTransitions])

  return {
    cancelPendingTransitions,
    restartFlow,
  }
}
