/**
 * StackingNav V2 - Transition Rules
 *
 * Guards and rules for phase transitions.
 *
 * @module features/stacking-nav-v2/state
 */

import { NavigationPhase, isValidTransition } from './navigation-phase'

// =============================================================================
// TRANSITION GUARDS
// =============================================================================

/**
 * Navigation change detection result.
 */
export interface NavigationChange {
  type: 'none' | 'expand' | 'collapse' | 'promote' | 'same-level'
  /** ID of the item involved in the change */
  itemId: string | null
  /** Level at which the change occurred */
  level: number
  /** Number of children (for expand/promote) */
  childCount: number
}

/**
 * Detect the type of navigation change.
 */
export function detectNavigationChange(
  prevPath: string[],
  currentPath: string[],
  getChildCount: (itemId: string) => number
): NavigationChange {
  const prevLength = prevPath.length
  const currentLength = currentPath.length

  // No change
  if (prevLength === currentLength) {
    // Check if item changed at deepest level
    if (currentLength === 0) {
      return { type: 'none', itemId: null, level: 0, childCount: 0 }
    }

    const prevItem = prevPath[currentLength - 1]
    const currentItem = currentPath[currentLength - 1]

    if (prevItem === currentItem) {
      return { type: 'none', itemId: currentItem, level: currentLength - 1, childCount: 0 }
    }

    // Same level, different item
    const childCount = getChildCount(currentItem)
    if (childCount > 0 && currentLength > 1) {
      return {
        type: 'promote',
        itemId: currentItem,
        level: currentLength - 1,
        childCount,
      }
    }

    return {
      type: 'same-level',
      itemId: currentItem,
      level: currentLength - 1,
      childCount,
    }
  }

  // Path shortened - collapse
  if (currentLength < prevLength) {
    return {
      type: 'collapse',
      itemId: currentLength > 0 ? currentPath[currentLength - 1] : null,
      level: currentLength,
      childCount: 0,
    }
  }

  // Path lengthened - expand or promote
  const newItemId = currentPath[currentLength - 1]
  const childCount = getChildCount(newItemId)
  const isPromotion = currentLength > 1 && childCount > 0

  return {
    type: isPromotion ? 'promote' : 'expand',
    itemId: newItemId,
    level: currentLength - 1,
    childCount,
  }
}

/**
 * Determine target phase from navigation change.
 */
export function getTargetPhase(
  change: NavigationChange,
  currentPhase: NavigationPhase
): NavigationPhase | null {
  switch (change.type) {
    case 'none':
      return null

    case 'expand':
      if (isValidTransition(currentPhase, NavigationPhase.EXPANDING)) {
        return NavigationPhase.EXPANDING
      }
      return null

    case 'collapse':
      if (isValidTransition(currentPhase, NavigationPhase.COLLAPSING)) {
        return NavigationPhase.COLLAPSING
      }
      return null

    case 'promote':
      if (
        isValidTransition(currentPhase, NavigationPhase.PROMOTING) ||
        isValidTransition(currentPhase, NavigationPhase.EXPANDING)
      ) {
        return NavigationPhase.PROMOTING
      }
      return null

    case 'same-level':
      // For same-level changes without children, no phase transition needed
      if (change.childCount > 0) {
        return NavigationPhase.EXPANDING
      }
      return null

    default:
      return null
  }
}

// =============================================================================
// PHASE STATE HELPERS
// =============================================================================

/**
 * Check if we're in an "active" animation state.
 */
export function isActiveAnimation(phase: NavigationPhase): boolean {
  return (
    phase === NavigationPhase.EXPANDING ||
    phase === NavigationPhase.COLLAPSING ||
    phase === NavigationPhase.PROMOTING
  )
}

/**
 * Check if we're in a "resting" state.
 */
export function isRestingState(phase: NavigationPhase): boolean {
  return phase === NavigationPhase.IDLE || phase === NavigationPhase.EXPANDED
}

/**
 * Get next phase after current phase completes.
 */
export function getCompletionPhase(phase: NavigationPhase): NavigationPhase {
  switch (phase) {
    case NavigationPhase.EXPANDING:
      return NavigationPhase.EXPANDED
    case NavigationPhase.COLLAPSING:
      return NavigationPhase.IDLE
    case NavigationPhase.PROMOTING:
      return NavigationPhase.EXPANDED
    default:
      return phase
  }
}
