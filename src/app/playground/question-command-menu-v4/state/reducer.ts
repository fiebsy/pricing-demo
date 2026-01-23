/**
 * Question Command Menu V4 - State Reducer
 *
 * Pure reducer function for all state transitions.
 * Follows the edit-questions pattern for predictable state changes.
 */

import type { TriggerFullState, TriggerAction, TriggerMode } from '../types'
import { INITIAL_STATE } from './initial'

// =============================================================================
// REDUCER
// =============================================================================

export function triggerReducer(
  state: TriggerFullState,
  action: TriggerAction
): TriggerFullState {
  switch (action.type) {
    // -------------------------------------------------------------------------
    // Trigger Interactions
    // -------------------------------------------------------------------------
    case 'CLICK_TRIGGER': {
      // In input mode: expand/focus
      if (state.mode === 'input') {
        return {
          ...state,
          expanded: true,
          view: 'expanded',
          topSlotOpen: true,
          bottomSlotOpen: true,
        }
      }

      // In question mode (not editing): start editing
      if (state.mode === 'question' && !state.editing) {
        return {
          ...state,
          editing: true,
          expanded: true,
          view: 'editing',
          topSlotOpen: true,
          bottomSlotOpen: true,
          // Copy saved value to input for editing
          inputValue: state.savedValue ?? '',
        }
      }

      // In display mode: no interaction
      return state
    }

    case 'FOCUS_INPUT':
      return {
        ...state,
        expanded: true,
        view: state.mode === 'question' ? 'editing' : 'expanded',
        topSlotOpen: true,
        bottomSlotOpen: true,
      }

    case 'BLUR_INPUT':
      // Don't collapse on blur in question mode while editing
      if (state.mode === 'question' && state.editing) {
        return state
      }
      return state

    case 'ESCAPE':
      // Cancel editing and collapse
      if (state.mode === 'question') {
        return {
          ...state,
          editing: false,
          expanded: false,
          view: 'collapsed',
          topSlotOpen: false,
          bottomSlotOpen: false,
          // Revert input to saved value
          inputValue: state.savedValue ?? '',
        }
      }
      // Input mode: just collapse
      return {
        ...state,
        expanded: false,
        view: 'collapsed',
        topSlotOpen: false,
        bottomSlotOpen: false,
      }

    // -------------------------------------------------------------------------
    // Value Changes
    // -------------------------------------------------------------------------
    case 'SET_INPUT':
      return {
        ...state,
        inputValue: action.value,
        // Also update search query for filtering
        searchQuery: action.value,
      }

    case 'SAVE': {
      // Save the value but keep menu open
      // Caller can explicitly collapse() if needed
      return {
        ...state,
        savedValue: action.value,
        inputValue: action.value,
        editing: false,
        // Keep expanded - don't auto-collapse on save
        // This allows the UI to show state changes (e.g., bottom slot switching)
      }
    }

    case 'CLEAR_VALUE':
      return {
        ...state,
        inputValue: '',
        savedValue: null,
        searchQuery: '',
      }

    // -------------------------------------------------------------------------
    // Save Status
    // -------------------------------------------------------------------------
    case 'START_SAVING':
      return {
        ...state,
        saveStatus: 'saving',
      }

    case 'SAVE_COMPLETE':
      return {
        ...state,
        saveStatus: 'saved',
      }

    case 'RESET_SAVE_STATUS':
      return {
        ...state,
        saveStatus: 'idle',
      }

    // -------------------------------------------------------------------------
    // Filter/Content Changes
    // -------------------------------------------------------------------------
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.value,
      }

    case 'SET_TAB':
      return {
        ...state,
        activeTab: action.value,
      }

    // -------------------------------------------------------------------------
    // Expansion Control
    // -------------------------------------------------------------------------
    case 'EXPAND':
      return {
        ...state,
        expanded: true,
        view: state.mode === 'question' && state.editing ? 'editing' : 'expanded',
        topSlotOpen: true,
        bottomSlotOpen: true,
      }

    case 'COLLAPSE':
      return {
        ...state,
        expanded: false,
        view: 'collapsed',
        editing: false,
        topSlotOpen: false,
        bottomSlotOpen: false,
      }

    case 'TOGGLE_EXPANDED':
      if (state.expanded) {
        return triggerReducer(state, { type: 'COLLAPSE' })
      }
      return triggerReducer(state, { type: 'EXPAND' })

    // -------------------------------------------------------------------------
    // Slot Control
    // -------------------------------------------------------------------------
    case 'OPEN_TOP_SLOT':
      return { ...state, topSlotOpen: true }

    case 'CLOSE_TOP_SLOT':
      return { ...state, topSlotOpen: false }

    case 'TOGGLE_TOP_SLOT':
      return { ...state, topSlotOpen: !state.topSlotOpen }

    case 'OPEN_BOTTOM_SLOT':
      return { ...state, bottomSlotOpen: true }

    case 'CLOSE_BOTTOM_SLOT':
      return { ...state, bottomSlotOpen: false }

    case 'TOGGLE_BOTTOM_SLOT':
      return { ...state, bottomSlotOpen: !state.bottomSlotOpen }

    // -------------------------------------------------------------------------
    // Mode Switching
    // -------------------------------------------------------------------------
    case 'SET_MODE':
      return {
        ...state,
        mode: action.mode,
        editing: false,
        view: 'collapsed',
        expanded: false,
      }

    // -------------------------------------------------------------------------
    // Flow State Actions
    // -------------------------------------------------------------------------
    case 'START_ADDING': {
      // Enter adding state: expand, open top slot (for typing), close bottom slot
      return {
        ...state,
        flowState: { type: 'adding', isTyping: false },
        expanded: true,
        view: 'expanded',
        topSlotOpen: false, // Default: hide top slot during typing (can be overridden via flowConfigs)
        bottomSlotOpen: false, // Hide bottom slot while typing
        inputValue: '', // Clear input for new question
      }
    }

    case 'SUBMIT_QUESTION': {
      // Submit: store question, enter processing state
      return {
        ...state,
        flowState: { type: 'processing' },
        storedQuestion: state.inputValue,
        topSlotOpen: true, // Show top slot for chat/response area
        bottomSlotOpen: true, // Show bottom slot for loading buttons
      }
    }

    case 'RECEIVE_RESPONSE': {
      // Response received: store response, enter response state
      return {
        ...state,
        flowState: { type: 'response' },
        storedResponse: action.response,
        topSlotOpen: true, // Show response in top slot
        bottomSlotOpen: true, // Show action buttons
      }
    }

    case 'START_EDITING': {
      // Edit mode: load stored question into input
      return {
        ...state,
        flowState: { type: 'editing', originalValue: state.storedQuestion ?? '' },
        inputValue: state.storedQuestion ?? '',
        editing: true,
        topSlotOpen: true, // Keep response visible
        bottomSlotOpen: true, // Show cancel/update buttons
      }
    }

    case 'CANCEL_EDITING': {
      // Revert to response state
      return {
        ...state,
        flowState: { type: 'response' },
        inputValue: state.storedQuestion ?? '',
        editing: false,
        topSlotOpen: true,
        bottomSlotOpen: true,
      }
    }

    case 'DELETE_QUESTION': {
      // Reset to idle, clear all stored values
      return {
        ...state,
        flowState: { type: 'idle' },
        storedQuestion: null,
        storedResponse: null,
        inputValue: '',
        savedValue: null,
        expanded: false,
        view: 'collapsed',
        topSlotOpen: false,
        bottomSlotOpen: false,
        editing: false,
      }
    }

    // -------------------------------------------------------------------------
    // Reset
    // -------------------------------------------------------------------------
    case 'RESET':
      return INITIAL_STATE

    default:
      return state
  }
}

// =============================================================================
// ACTION CREATORS (convenience functions)
// =============================================================================

export const actions = {
  clickTrigger: (): TriggerAction => ({ type: 'CLICK_TRIGGER' }),
  focusInput: (): TriggerAction => ({ type: 'FOCUS_INPUT' }),
  blurInput: (): TriggerAction => ({ type: 'BLUR_INPUT' }),
  escape: (): TriggerAction => ({ type: 'ESCAPE' }),

  setInput: (value: string): TriggerAction => ({ type: 'SET_INPUT', value }),
  save: (value: string): TriggerAction => ({ type: 'SAVE', value }),
  clearValue: (): TriggerAction => ({ type: 'CLEAR_VALUE' }),

  startSaving: (): TriggerAction => ({ type: 'START_SAVING' }),
  saveComplete: (): TriggerAction => ({ type: 'SAVE_COMPLETE' }),
  resetSaveStatus: (): TriggerAction => ({ type: 'RESET_SAVE_STATUS' }),

  setSearch: (value: string): TriggerAction => ({ type: 'SET_SEARCH', value }),
  setTab: (value: string): TriggerAction => ({ type: 'SET_TAB', value }),

  expand: (): TriggerAction => ({ type: 'EXPAND' }),
  collapse: (): TriggerAction => ({ type: 'COLLAPSE' }),
  toggleExpanded: (): TriggerAction => ({ type: 'TOGGLE_EXPANDED' }),

  openTopSlot: (): TriggerAction => ({ type: 'OPEN_TOP_SLOT' }),
  closeTopSlot: (): TriggerAction => ({ type: 'CLOSE_TOP_SLOT' }),
  toggleTopSlot: (): TriggerAction => ({ type: 'TOGGLE_TOP_SLOT' }),
  openBottomSlot: (): TriggerAction => ({ type: 'OPEN_BOTTOM_SLOT' }),
  closeBottomSlot: (): TriggerAction => ({ type: 'CLOSE_BOTTOM_SLOT' }),
  toggleBottomSlot: (): TriggerAction => ({ type: 'TOGGLE_BOTTOM_SLOT' }),

  setMode: (mode: TriggerMode): TriggerAction => ({ type: 'SET_MODE', mode }),
  reset: (): TriggerAction => ({ type: 'RESET' }),

  // Flow actions
  startAdding: (): TriggerAction => ({ type: 'START_ADDING' }),
  submitQuestion: (): TriggerAction => ({ type: 'SUBMIT_QUESTION' }),
  receiveResponse: (response: string): TriggerAction => ({ type: 'RECEIVE_RESPONSE', response }),
  startEditing: (): TriggerAction => ({ type: 'START_EDITING' }),
  cancelEditing: (): TriggerAction => ({ type: 'CANCEL_EDITING' }),
  deleteQuestion: (): TriggerAction => ({ type: 'DELETE_QUESTION' }),
}
