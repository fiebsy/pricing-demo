/**
 * Fluid Button Layout Constants
 *
 * Single source of truth for button state visibility and default configurations.
 * The SHOW_SECONDARY_MAP eliminates manual sync between state and visibility.
 *
 * @status stable
 */

import type { ButtonStateId, ButtonStatesMap, StateTransitionConfig, ButtonPhase, AutoTransitionConfig } from './types'

// ============================================================================
// Secondary Button Visibility Map
// ============================================================================

/**
 * Maps state IDs to secondary button visibility.
 * This is THE single source of truth - no manual sync needed.
 *
 * Pattern:
 * - A states: Single button (upgrade CTA)
 * - B states: Two buttons (back + action)
 * - C states: Single button (completion/next)
 */
export const SHOW_SECONDARY_MAP: Record<ButtonStateId, boolean> = {
  'A': false,    // Upgrade alone
  'B1': true,    // Upgrade + Back
  'B2': true,    // Upgrading + Back
  'C1': false,   // Checkmark only
  'C2': false,   // Let's create
}

// ============================================================================
// State to Phase Mapping
// ============================================================================

/**
 * Maps state IDs to their phase grouping.
 * Useful for validation and understanding state progression.
 */
export const STATE_TO_PHASE: Record<ButtonStateId, ButtonPhase> = {
  'A': 'A',
  'B1': 'B',
  'B2': 'B',
  'C1': 'C',
  'C2': 'C',
}

// ============================================================================
// All State IDs
// ============================================================================

export const ALL_STATE_IDS: readonly ButtonStateId[] = ['A', 'B1', 'B2', 'C1', 'C2'] as const

// ============================================================================
// Default Button States
// ============================================================================

/**
 * Default button state configurations.
 * These can be overridden via useButtonStateMachine options.
 */
export const DEFAULT_BUTTON_STATES: ButtonStatesMap = {
  'A': {
    id: 'upgrade-alone',
    text: 'Upgrade',
    showSpinner: false,
    showCheckmark: false,
    showText: true,
  },
  'B1': {
    id: 'upgrade',
    text: 'Upgrade',
    showSpinner: false,
    showCheckmark: false,
    showText: true,
  },
  'B2': {
    id: 'upgrading',
    text: 'Upgrading',
    showSpinner: true,
    showCheckmark: false,
    showText: true,
  },
  'C1': {
    id: 'completed',
    text: '',
    showSpinner: false,
    showCheckmark: true,
    showText: false,
  },
  'C2': {
    id: 'start-creating',
    text: "Let's create",
    showSpinner: false,
    showCheckmark: false,
    showText: true,
  },
}

// ============================================================================
// Default State Transition Config
// ============================================================================

export const DEFAULT_STATE_TRANSITION: StateTransitionConfig = {
  textSlideDuration: 200,
  textSlideEasing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  spinnerToCheckmarkDuration: 300,
  checkmarkDrawDuration: 250,
  checkmarkEntranceStyle: 'flip',
}

// ============================================================================
// Default Auto Transition Config
// ============================================================================

/**
 * Default auto transition configuration.
 * Controls automatic progression through B2 → C1 → C2 states.
 */
export const DEFAULT_AUTO_TRANSITION: AutoTransitionConfig = {
  enabled: true,
  b2ToC1Delay: 3100,
  c1ToC2Delay: 1300,
}

// ============================================================================
// Valid Transitions (Optional - for strict mode)
// ============================================================================

/**
 * Default valid state transitions.
 * This is optional - consumers can override with their own validation logic.
 *
 * Default flow: A → B1 → B2 → C1 → C2
 * With optional back: B1 → A (going back)
 */
export const DEFAULT_VALID_TRANSITIONS: Record<ButtonStateId, ButtonStateId[]> = {
  'A': ['B1'],           // A can go to B1 (show both buttons)
  'B1': ['A', 'B2'],     // B1 can go back to A or forward to B2
  'B2': ['C1'],          // B2 (processing) goes to C1 (success)
  'C1': ['C2'],          // C1 goes to C2 (next action)
  'C2': ['A'],           // C2 can reset to A (start over)
}
