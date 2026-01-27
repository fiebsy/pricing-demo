/**
 * Question Command Menu V4 - Initial State
 *
 * Default initial state for the trigger reducer.
 */

import type { TriggerFullState } from '../types'

// =============================================================================
// INITIAL STATE
// =============================================================================

export const INITIAL_STATE: TriggerFullState = {
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
export function createInputModeState(): TriggerFullState {
  return {
    ...INITIAL_STATE,
    mode: 'input',
  }
}

/**
 * Create initial state for question mode
 */
export function createQuestionModeState(savedValue?: string): TriggerFullState {
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
export function createDisplayModeState(displayValue: string): TriggerFullState {
  return {
    ...INITIAL_STATE,
    mode: 'display',
    savedValue: displayValue,
    inputValue: displayValue,
  }
}
