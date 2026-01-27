/**
 * Expandable Input - State Reducer
 *
 * Pure reducer function for all state transitions.
 */

import type { ExpandableInputState, ExpandableInputAction, TriggerMode } from '../types'
import { INITIAL_STATE } from './initial'

// =============================================================================
// REDUCER
// =============================================================================

export function expandableInputReducer(
  state: ExpandableInputState,
  action: ExpandableInputAction
): ExpandableInputState {
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
      if (state.mode === 'question' && state.editing) {
        return state
      }
      return state

    case 'ESCAPE':
      if (state.flowState.type === 'editing') {
        return {
          ...state,
          expanded: false,
          view: 'collapsed',
          editing: false,
          topSlotOpen: false,
          bottomSlotOpen: false,
          flowState: { type: 'response' },
          inputValue: state.storedQuestion ?? '',
        }
      }
      if (state.flowState.type === 'idle' || state.flowState.type === 'adding') {
        return {
          ...state,
          expanded: false,
          view: 'collapsed',
          editing: false,
          topSlotOpen: false,
          bottomSlotOpen: false,
          flowState: { type: 'idle' },
          inputValue: '',
        }
      }
      if (state.mode === 'question') {
        return {
          ...state,
          editing: false,
          expanded: false,
          view: 'collapsed',
          topSlotOpen: false,
          bottomSlotOpen: false,
          inputValue: state.savedValue ?? '',
        }
      }
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
        searchQuery: action.value,
      }

    case 'SAVE': {
      return {
        ...state,
        savedValue: action.value,
        inputValue: action.value,
        editing: false,
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
      if (state.flowState.type === 'editing') {
        return {
          ...state,
          expanded: false,
          view: 'collapsed',
          editing: false,
          topSlotOpen: false,
          bottomSlotOpen: false,
          flowState: { type: 'response' },
          inputValue: state.storedQuestion ?? '',
        }
      }
      if (state.flowState.type === 'idle' || state.flowState.type === 'adding') {
        return {
          ...state,
          expanded: false,
          view: 'collapsed',
          editing: false,
          topSlotOpen: false,
          bottomSlotOpen: false,
          flowState: { type: 'idle' },
          inputValue: '',
        }
      }
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
        return expandableInputReducer(state, { type: 'COLLAPSE' })
      }
      return expandableInputReducer(state, { type: 'EXPAND' })

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
      return {
        ...state,
        flowState: { type: 'adding', isTyping: false },
        expanded: true,
        view: 'expanded',
        topSlotOpen: false,
        bottomSlotOpen: false,
        savedValue: null,
        saveStatus: 'idle',
      }
    }

    case 'SUBMIT_QUESTION': {
      return {
        ...state,
        flowState: { type: 'processing' },
        storedQuestion: state.inputValue,
        storedConfidence: action.confidence ?? null,
        topSlotOpen: true,
        bottomSlotOpen: true,
      }
    }

    case 'RECEIVE_RESPONSE': {
      return {
        ...state,
        flowState: { type: 'response' },
        storedResponse: action.response,
        topSlotOpen: true,
        bottomSlotOpen: true,
      }
    }

    case 'START_EDITING': {
      return {
        ...state,
        flowState: { type: 'editing', originalValue: state.storedQuestion ?? '' },
        inputValue: state.storedQuestion ?? '',
        editing: true,
        topSlotOpen: true,
        bottomSlotOpen: true,
      }
    }

    case 'CANCEL_EDITING': {
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
      return {
        ...state,
        flowState: { type: 'idle' },
        storedQuestion: null,
        storedResponse: null,
        storedConfidence: null,
        inputValue: '',
        savedValue: null,
        expanded: false,
        view: 'collapsed',
        topSlotOpen: false,
        bottomSlotOpen: false,
        editing: false,
        saveStatus: 'idle',
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

// Alias for backwards compatibility
export const triggerReducer = expandableInputReducer

// =============================================================================
// ACTION CREATORS
// =============================================================================

export const actions = {
  clickTrigger: (): ExpandableInputAction => ({ type: 'CLICK_TRIGGER' }),
  focusInput: (): ExpandableInputAction => ({ type: 'FOCUS_INPUT' }),
  blurInput: (): ExpandableInputAction => ({ type: 'BLUR_INPUT' }),
  escape: (): ExpandableInputAction => ({ type: 'ESCAPE' }),

  setInput: (value: string): ExpandableInputAction => ({ type: 'SET_INPUT', value }),
  save: (value: string): ExpandableInputAction => ({ type: 'SAVE', value }),
  clearValue: (): ExpandableInputAction => ({ type: 'CLEAR_VALUE' }),

  startSaving: (): ExpandableInputAction => ({ type: 'START_SAVING' }),
  saveComplete: (): ExpandableInputAction => ({ type: 'SAVE_COMPLETE' }),
  resetSaveStatus: (): ExpandableInputAction => ({ type: 'RESET_SAVE_STATUS' }),

  setSearch: (value: string): ExpandableInputAction => ({ type: 'SET_SEARCH', value }),
  setTab: (value: string): ExpandableInputAction => ({ type: 'SET_TAB', value }),

  expand: (): ExpandableInputAction => ({ type: 'EXPAND' }),
  collapse: (): ExpandableInputAction => ({ type: 'COLLAPSE' }),
  toggleExpanded: (): ExpandableInputAction => ({ type: 'TOGGLE_EXPANDED' }),

  openTopSlot: (): ExpandableInputAction => ({ type: 'OPEN_TOP_SLOT' }),
  closeTopSlot: (): ExpandableInputAction => ({ type: 'CLOSE_TOP_SLOT' }),
  toggleTopSlot: (): ExpandableInputAction => ({ type: 'TOGGLE_TOP_SLOT' }),
  openBottomSlot: (): ExpandableInputAction => ({ type: 'OPEN_BOTTOM_SLOT' }),
  closeBottomSlot: (): ExpandableInputAction => ({ type: 'CLOSE_BOTTOM_SLOT' }),
  toggleBottomSlot: (): ExpandableInputAction => ({ type: 'TOGGLE_BOTTOM_SLOT' }),

  setMode: (mode: TriggerMode): ExpandableInputAction => ({ type: 'SET_MODE', mode }),
  reset: (): ExpandableInputAction => ({ type: 'RESET' }),

  // Flow actions
  startAdding: (): ExpandableInputAction => ({ type: 'START_ADDING' }),
  submitQuestion: (confidence?: number): ExpandableInputAction => ({ type: 'SUBMIT_QUESTION', confidence }),
  receiveResponse: (response: string): ExpandableInputAction => ({ type: 'RECEIVE_RESPONSE', response }),
  startEditing: (): ExpandableInputAction => ({ type: 'START_EDITING' }),
  cancelEditing: (): ExpandableInputAction => ({ type: 'CANCEL_EDITING' }),
  deleteQuestion: (): ExpandableInputAction => ({ type: 'DELETE_QUESTION' }),
}
