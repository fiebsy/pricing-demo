/**
 * usePricingFlow Hook
 *
 * Orchestrates the pricing modal flow with the fluid button layout.
 * Syncs FlowId (modal's flow system) with ButtonStateId (button state machine).
 *
 * Flow Progression:
 * - A: Select pricing tier → Click Upgrade → B1
 * - B1: Confirmation → Click Upgrade → B2 (processing)
 * - B2: Processing → Auto → C1 (success checkmark)
 * - C1: Success → Auto → C2 (completion)
 * - C2: Completion → Click "Let's create" → A (restart)
 *
 * Back button (in B states) cancels and returns to A.
 *
 * @status incubating
 */

'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  useFluidButtonLayout,
  type ButtonStateId,
  type ButtonState,
} from '@/components/ui/core/primitives/fluid-button-layout'
import type { FlowId } from '../config/types'
import { flowToStateId, stateIdToFlow } from '../utils/button-adapter'

// ============================================================================
// Types
// ============================================================================

export interface UsePricingFlowOptions {
  /** Current active flow (controlled) */
  activeFlow: FlowId
  /** Callback when flow changes */
  onFlowChange: (flowId: FlowId) => void
  /** Slow motion mode for debugging */
  slowMo?: boolean
  /** Callback when state changes (for debugging) */
  onStateChange?: (stateId: ButtonStateId, state: ButtonState) => void
}

export interface UsePricingFlowReturn {
  /** Current button state ID */
  stateId: ButtonStateId
  /** Complete button state with derived values */
  state: ButtonState
  /** Whether secondary button should be visible */
  showSecondary: boolean
  /** Handle primary button click */
  handlePrimaryClick: () => void
  /** Handle back button click */
  handleBack: () => void
  /** Cancel any pending auto-transitions */
  cancelPendingTransitions: () => void
  /** Check if currently processing (B2 state) */
  isProcessing: boolean
  /** Check if showing success (C1 state) */
  isSuccess: boolean
  /** Check if showing completion (C2 state) */
  isCompletion: boolean
}

// ============================================================================
// Hook
// ============================================================================

export function usePricingFlow({
  activeFlow,
  onFlowChange,
  slowMo = false,
  onStateChange,
}: UsePricingFlowOptions): UsePricingFlowReturn {
  // Track if we're responding to an external flow change
  const isExternalChange = useRef(false)

  // Initialize button state from active flow
  const initialState = flowToStateId(activeFlow)

  // Use the fluid button layout hook with auto-transitions
  const {
    stateId,
    state,
    showSecondary,
    transitionTo,
    cancelPendingTransitions,
  } = useFluidButtonLayout({
    initialState,
    slowMo,
    onStateChange: (newStateId, newState) => {
      // Sync flow when button state changes (e.g., auto-transitions)
      const newFlow = stateIdToFlow(newStateId)
      if (newFlow !== activeFlow && !isExternalChange.current) {
        onFlowChange(newFlow)
      }
      onStateChange?.(newStateId, newState)
    },
  })

  // Sync button state when activeFlow changes externally (e.g., FlowControls)
  useEffect(() => {
    const expectedState = flowToStateId(activeFlow)
    const currentFlow = stateIdToFlow(stateId)

    // Only transition if the flow actually changed
    if (currentFlow !== activeFlow) {
      isExternalChange.current = true
      cancelPendingTransitions()
      transitionTo(expectedState)
      // Reset flag after a tick
      requestAnimationFrame(() => {
        isExternalChange.current = false
      })
    }
  }, [activeFlow, stateId, transitionTo, cancelPendingTransitions])

  // Handle primary button click
  const handlePrimaryClick = useCallback(() => {
    if (stateId === 'A') {
      // A → B1: Show confirmation with back button
      transitionTo('B1')
      onFlowChange('flow-b')
    } else if (stateId === 'B1') {
      // B1 → B2: Start processing
      transitionTo('B2')
      // B2 → C1 → C2 happens automatically via auto-transitions
    } else if (stateId === 'C2') {
      // C2 → A: Restart the flow
      transitionTo('A')
      onFlowChange('flow-a')
    }
    // B2, C1: Button clicks are ignored (processing/success states)
  }, [stateId, transitionTo, onFlowChange])

  // Handle back button click
  const handleBack = useCallback(() => {
    // Cancel any pending auto-transitions
    cancelPendingTransitions()
    // Return to initial state
    transitionTo('A')
    onFlowChange('flow-a')
  }, [transitionTo, cancelPendingTransitions, onFlowChange])

  return {
    stateId,
    state,
    showSecondary,
    handlePrimaryClick,
    handleBack,
    cancelPendingTransitions,
    isProcessing: stateId === 'B2',
    isSuccess: stateId === 'C1',
    isCompletion: stateId === 'C2',
  }
}
