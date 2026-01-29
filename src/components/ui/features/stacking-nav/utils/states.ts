/**
 * StackingNav - State Utilities
 *
 * State management helpers for clear animation targeting.
 *
 * @module features/stacking-nav/utils
 */

import { AnimationState, type StateContext } from '../types'
import { ROOT_ANCHOR_ID } from '../config'

/**
 * Determine the animation state for an item based on context.
 * This is the core logic that drives all visual states.
 */
export function determineItemState(context: StateContext): AnimationState {
  const {
    itemId,
    level,
    hasChildren,
    activePath,
    isRootAnchor,
    wasChild = false,
  } = context

  // Special case: Root anchor (All button)
  if (isRootAnchor) {
    const hasActiveAtRoot = activePath.length > 0 && activePath[0] !== ROOT_ANCHOR_ID
    return hasActiveAtRoot ? AnimationState.ANCHORED : AnimationState.IDLE
  }

  // Check position in active path
  const itemDepth = activePath.indexOf(itemId)
  const isInPath = itemDepth !== -1
  const isActive = itemDepth === level
  const hasActiveChild = isInPath && itemDepth < activePath.length - 1

  // State determination
  if (isActive) {
    // This item is selected at current level
    if (hasActiveChild) {
      // Has children expanded - it's anchored
      return AnimationState.ANCHORED
    } else if (hasChildren) {
      // Just selected, has children - it's a parent
      // Check if it was previously a child (for promotion animation)
      if (wasChild && level > 0) {
        return AnimationState.PROMOTING
      }
      return AnimationState.PARENT
    } else {
      // Leaf node - just active
      return AnimationState.CHILD
    }
  }

  // Not active at this level
  if (level > 0 && activePath[level - 1] !== undefined) {
    // We're at a child level with an active parent
    return AnimationState.CHILD
  }

  // Default idle state
  return AnimationState.IDLE
}

/**
 * Check if a state transition should trigger promotion animation.
 */
export function isPromotionTransition(
  fromState: AnimationState,
  toState: AnimationState
): boolean {
  return (
    fromState === AnimationState.CHILD && 
    (toState === AnimationState.PARENT || toState === AnimationState.PROMOTING)
  )
}

/**
 * Get the visual properties for a given state.
 */
export function getStateVisualProps(state: AnimationState) {
  switch (state) {
    case AnimationState.IDLE:
      return {
        opacity: 1,
        scale: 1,
        zIndex: 1,
        interactive: true,
      }
    
    case AnimationState.PARENT:
      return {
        opacity: 1,
        scale: 1,
        zIndex: 100,
        interactive: true,
      }
    
    case AnimationState.ANCHORED:
      return {
        opacity: 0.6,
        scale: 1,
        zIndex: 10, // Adjusted by depth
        interactive: false,
      }
    
    case AnimationState.CHILD:
      return {
        opacity: 1,
        scale: 1,
        zIndex: 100,
        interactive: true,
      }
    
    case AnimationState.PROMOTING:
      return {
        opacity: 1,
        scale: 1.08, // Slight scale during promotion
        zIndex: 150, // Above everything during transition
        interactive: false,
      }
    
    default:
      return {
        opacity: 1,
        scale: 1,
        zIndex: 1,
        interactive: true,
      }
  }
}

/**
 * Get transition duration for state changes.
 */
export function getTransitionDuration(
  fromState: AnimationState,
  toState: AnimationState,
  promotionDuration: number
): number {
  // Special handling for promotion
  if (isPromotionTransition(fromState, toState)) {
    return promotionDuration
  }

  // Default durations for other transitions
  const transitions: Record<string, number> = {
    [`${AnimationState.IDLE}->${AnimationState.PARENT}`]: 0.3,
    [`${AnimationState.PARENT}->${AnimationState.ANCHORED}`]: 0.25,
    [`${AnimationState.ANCHORED}->${AnimationState.PARENT}`]: 0.25,
    [`${AnimationState.PARENT}->${AnimationState.IDLE}`]: 0.2,
    [`${AnimationState.CHILD}->${AnimationState.IDLE}`]: 0.15,
    [`${AnimationState.PROMOTING}->${AnimationState.PARENT}`]: 0.2,
  }

  const key = `${fromState}->${toState}`
  return transitions[key] || 0.3
}
