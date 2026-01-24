/**
 * Question Flow Configuration
 *
 * Single button flow - defines how the UI changes at each state.
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
 * Single button flow configuration
 *
 * Features:
 * - One primary action button ("Improve answer")
 * - Plus icon when collapsed (idle/adding)
 * - Arrow icon when collapsed with response
 * - Edit/Delete buttons in response state
 */
export const QUESTION_FLOW_CONFIG: FlowConfigs = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDLE: Menu is collapsed, nothing shown
  // ─────────────────────────────────────────────────────────────────────────
  idle: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: true },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: false },
      { id: 'plus-collapsed', enabled: true },
      { id: 'arrow-collapsed', enabled: false },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADDING: User is typing a new question
  // ─────────────────────────────────────────────────────────────────────────
  adding: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: true },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: false },
      { id: 'plus-collapsed', enabled: true },
      { id: 'arrow-collapsed', enabled: false },
    ],
    placeholder: 'Type your question...',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROCESSING: AI is generating response
  // ─────────────────────────────────────────────────────────────────────────
  processing: {
    slots: {
      top: { enabled: true },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Generating...', isLoading: false, enabled: true, disabled: true },
      { id: 'btn2', enabled: false },
      { id: 'btn3', enabled: false },
      { id: 'btn4', enabled: false },
    ],
    triggerButtons: [
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
    placeholder: 'Your question',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSE: AI response is shown, user can take action
  // ─────────────────────────────────────────────────────────────────────────
  response: {
    slots: {
      top: { enabled: true },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Improve answer', enabled: true, isLoading: false },
      { id: 'btn2', enabled: false },
      { id: 'btn3', enabled: false },
      { id: 'btn4', enabled: false },
    ],
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: false },
      { id: 'edit-small', enabled: true },
      { id: 'delete-expanded', enabled: true },
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EDITING: User is editing their question
  // ─────────────────────────────────────────────────────────────────────────
  editing: {
    slots: {
      top: { enabled: true },
      bottom: { enabled: false },
    },
    buttons: [
      { id: 'btn1', label: 'Improve answer', enabled: true, isLoading: false },
      { id: 'btn2', enabled: false },
      { id: 'btn3', enabled: false },
      { id: 'btn4', enabled: false },
    ],
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: true, label: 'Save' },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: true },
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
    placeholder: 'Edit your question...',
  },
}
