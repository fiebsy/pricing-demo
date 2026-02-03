/**
 * StackingNav - Transition State Hook
 *
 * Tracks state transitions for visual debugging.
 * Compares previous vs current state to determine what transition is happening.
 *
 * @module features/stacking-nav/hooks
 */

import { useState, useRef, useEffect } from 'react'
import { TransitionState } from '../types'

/**
 * Item display state - simplified from the complex internal states.
 */
export type ItemDisplayState = 'idle' | 'expanded' | 'anchored' | 'child' | 'active'

interface UseTransitionStateReturn {
  /** Current transition state (if any) */
  transitionState: TransitionState
  /** Timestamp when transition started (for debugging) */
  transitionStartTime: number | null
}

/**
 * Track state transitions for an item.
 * Returns the current transition state based on state changes.
 *
 * @param itemId - Unique identifier for the item
 * @param currentState - Current display state of the item
 * @param isPromoting - Whether the item is currently in promoting animation
 * @param timeoutMs - How long to show the transition state (default 500ms)
 */
export function useTransitionState(
  itemId: string,
  currentState: ItemDisplayState,
  isPromoting: boolean,
  timeoutMs: number = 500,
): UseTransitionStateReturn {
  const [transitionState, setTransitionState] = useState<TransitionState>(TransitionState.NONE)
  const [transitionStartTime, setTransitionStartTime] = useState<number | null>(null)
  const previousStateRef = useRef<ItemDisplayState>(currentState)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const previousState = previousStateRef.current
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Detect transition type based on state change
    let newTransition: TransitionState = TransitionState.NONE

    // Check for promoting (handled separately via isPromoting prop)
    if (isPromoting) {
      newTransition = TransitionState.PROMOTING
    }
    // CHILD → EXPANDED: Child becoming parent (promotion)
    else if (previousState === 'child' && currentState === 'expanded') {
      newTransition = TransitionState.PROMOTING
    }
    // IDLE → EXPANDED: Expanding to show children
    else if (previousState === 'idle' && currentState === 'expanded') {
      newTransition = TransitionState.EXPANDING
    }
    // ANCHORED → EXPANDED: Demotion (losing grandchildren, still a parent)
    else if (previousState === 'anchored' && currentState === 'expanded') {
      newTransition = TransitionState.DEMOTING
    }
    // EXPANDED → CHILD: Demotion (was parent, now sibling)
    else if (previousState === 'expanded' && currentState === 'child') {
      newTransition = TransitionState.DEMOTING
    }
    // EXPANDED → IDLE: Demotion (was parent, now nothing)
    else if (previousState === 'expanded' && currentState === 'idle') {
      newTransition = TransitionState.DEMOTING
    }
    // ANCHORED → CHILD: Demotion (was grandparent, now sibling)
    else if (previousState === 'anchored' && currentState === 'child') {
      newTransition = TransitionState.DEMOTING
    }
    // ANCHORED → IDLE: Demotion (was grandparent, now nothing)
    else if (previousState === 'anchored' && currentState === 'idle') {
      newTransition = TransitionState.DEMOTING
    }

    // Update transition state if changed
    if (newTransition !== TransitionState.NONE) {
      setTransitionState(newTransition)
      setTransitionStartTime(performance.now())

      // Auto-clear transition after timeout
      timeoutRef.current = setTimeout(() => {
        setTransitionState(TransitionState.NONE)
        setTransitionStartTime(null)
      }, timeoutMs)
    }

    // Update previous state ref
    previousStateRef.current = currentState

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentState, isPromoting, timeoutMs])

  return { transitionState, transitionStartTime }
}
