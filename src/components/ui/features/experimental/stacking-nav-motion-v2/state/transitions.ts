/**
 * StackingNav V2 - Phase State Helpers
 *
 * Helper functions for querying phase state.
 *
 * @module features/stacking-nav-v2/state
 */

import { NavigationPhase } from './navigation-phase'

// =============================================================================
// PHASE STATE HELPERS
// =============================================================================

/**
 * Check if we're in an "active" animation state (any transition in progress).
 */
export function isPhaseAnimating(phase: NavigationPhase): boolean {
  return (
    phase === NavigationPhase.EXPANDING ||
    phase === NavigationPhase.COLLAPSING ||
    phase === NavigationPhase.PROMOTING
  )
}

/**
 * Check if we're in a "resting" state (no animation in progress).
 */
export function isPhaseResting(phase: NavigationPhase): boolean {
  return phase === NavigationPhase.IDLE || phase === NavigationPhase.EXPANDED
}

/**
 * Check if we're in an expansion phase (children are entering).
 * Used to determine if child entry animations should play.
 */
export function isPhaseExpandingOrPromoting(phase: NavigationPhase): boolean {
  return phase === NavigationPhase.EXPANDING || phase === NavigationPhase.PROMOTING
}
