/**
 * Expandable Input - Initial State
 *
 * Default initial state for the state reducer.
 */

import type { ExpandableInputState } from '../types'

// =============================================================================
// INITIAL STATE
// =============================================================================

export const INITIAL_STATE: ExpandableInputState = {
  // Mode & View
  mode: 'input',
  view: 'collapsed',
  editing: false,
  expanded: false,

  // Value State
  inputValue: '',
  savedValue: null,

  // Save Status
  saveStatus: 'idle',

  // Content Filtering
  searchQuery: '',
  activeTab: '',

  // Slot State
  topSlotOpen: false,
  bottomSlotOpen: false,

  // Flow State
  flowState: { type: 'idle' },
  storedQuestion: null,
  storedResponse: null,
  storedConfidence: null,
}

// =============================================================================
// STATE FACTORIES
// =============================================================================

/**
 * Create initial state for input mode (default)
 */
export function createInputModeState(): ExpandableInputState {
  return {
    ...INITIAL_STATE,
    mode: 'input',
  }
}

/**
 * Create initial state for question mode
 */
export function createQuestionModeState(savedValue?: string): ExpandableInputState {
  return {
    ...INITIAL_STATE,
    mode: 'question',
    savedValue: savedValue ?? null,
    inputValue: savedValue ?? '',
  }
}

/**
 * Create initial state for display mode
 */
export function createDisplayModeState(displayValue: string): ExpandableInputState {
  return {
    ...INITIAL_STATE,
    mode: 'display',
    savedValue: displayValue,
    inputValue: displayValue,
  }
}
