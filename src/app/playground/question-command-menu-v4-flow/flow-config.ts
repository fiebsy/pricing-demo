/**
 * Flow Testing - Custom Flow Config
 *
 * Defines how the UI changes at each state in the question lifecycle.
 *
 * FLOW STATES:
 * ┌─────────┐
 * │  IDLE   │ ← No question yet, menu collapsed
 * └────┬────┘
 *      │ user clicks/focuses input
 *      ▼
 * ┌─────────┐
 * │ ADDING  │ ← User typing question (slots hidden)
 * └────┬────┘
 *      │ user clicks send / presses Enter
 *      ▼
 * ┌──────────┐
 * │PROCESSING│ ← AI generating (button shows loading)
 * └────┬─────┘
 *      │ AI response received
 *      ▼
 * ┌─────────┐
 * │RESPONSE │ ← AI response shown (button enabled)
 * └────┬────┘
 *      │ user clicks edit
 *      ▼
 * ┌─────────┐
 * │ EDITING │ ← User editing question
 * └─────────┘
 *      │ submit → PROCESSING
 *      │ cancel → RESPONSE
 */

import type { FlowConfigs } from '../question-command-menu-v4/types'

/**
 * Your custom flow config for single-button UI
 *
 * This config overrides the base config at each state.
 * Only specify what CHANGES - everything else uses base config values.
 */
export const CUSTOM_FLOW_CONFIG: FlowConfigs = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDLE: Menu is collapsed, nothing shown
  // ─────────────────────────────────────────────────────────────────────────
  idle: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADDING: User is typing a new question
  // ─────────────────────────────────────────────────────────────────────────
  adding: {
    slots: {
      top: { enabled: false },    // Hide chat area while typing
      bottom: { enabled: false }, // Hide button while typing
    },
    placeholder: 'Type your question...',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROCESSING: AI is generating response
  // ─────────────────────────────────────────────────────────────────────────
  processing: {
    slots: {
      top: { enabled: true, minHeight: 120 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Generating...', isLoading: true, enabled: false },
    ],
    placeholder: 'Your question',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSE: AI response is shown, user can take action
  // ─────────────────────────────────────────────────────────────────────────
  response: {
    slots: {
      top: { enabled: true, minHeight: 120 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Improve answer', enabled: true, isLoading: false },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EDITING: User is editing their question
  // ─────────────────────────────────────────────────────────────────────────
  editing: {
    slots: {
      top: { enabled: true },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Update', enabled: true, isLoading: false },
    ],
    placeholder: 'Edit your question...',
  },
}

/**
 * Alternative: Two-button flow config
 * Use this if you want Cancel + Update buttons in editing state
 */
export const TWO_BUTTON_FLOW_CONFIG: FlowConfigs = {
  idle: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
  },

  adding: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
    placeholder: 'Type your question...',
  },

  processing: {
    slots: {
      top: { enabled: true, minHeight: 120 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Generating...', isLoading: true, enabled: false },
      { id: 'btn2', enabled: false }, // Hide second button
    ],
  },

  response: {
    slots: {
      top: { enabled: true, minHeight: 120 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Delete', enabled: true, isLoading: false },
      { id: 'btn2', label: 'Improve', enabled: true, isLoading: false },
    ],
  },

  editing: {
    slots: {
      top: { enabled: true },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Cancel', enabled: true, isLoading: false },
      { id: 'btn2', label: 'Update', enabled: true, isLoading: false },
    ],
    placeholder: 'Edit your question...',
  },
}
