/**
 * Question Command Menu V4 - Flow Configs Presets
 *
 * Default flow state configurations for the question lifecycle.
 * These configs define how slots and buttons change per state.
 */

import type { FlowConfigs } from '../types'

// =============================================================================
// DEFAULT FLOW CONFIGS
// =============================================================================

/**
 * Default flow configurations
 *
 * State flow:
 * idle → (click/focus) → adding → (submit) → processing → (response) → response ↔ editing
 */
export const DEFAULT_FLOW_CONFIGS: FlowConfigs = {
  idle: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
  },

  adding: {
    slots: {
      top: { enabled: false }, // Default: hidden. Option to show empty chat area
      bottom: { enabled: false },
    },
    placeholder: 'Type your question...',
  },

  processing: {
    slots: {
      top: { enabled: true, minHeight: 120, maxHeight: 360 },
      bottom: { enabled: true }, // Show buttons in disabled/loading state
    },
    buttons: [
      { id: 'btn1', label: 'Processing...', isLoading: true, enabled: false },
      { id: 'btn2', label: 'Please wait', isLoading: true, enabled: false },
    ],
  },

  response: {
    slots: {
      top: { enabled: true, minHeight: 120, maxHeight: 360 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Delete', enabled: true, isLoading: false },
      { id: 'btn2', label: 'Improve answer', enabled: true, isLoading: false },
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

/**
 * Single button flow config
 * Use when you only have one action button (btn1)
 */
export const SINGLE_BUTTON_FLOW_CONFIGS: FlowConfigs = {
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
      top: { enabled: true, minHeight: 120, maxHeight: 360 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Generating...', isLoading: true, enabled: false },
    ],
  },

  response: {
    slots: {
      top: { enabled: true, minHeight: 120, maxHeight: 360 },
      bottom: { enabled: true },
    },
    buttons: [
      { id: 'btn1', label: 'Regenerate', enabled: true, isLoading: false },
    ],
  },

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

// =============================================================================
// ALTERNATIVE FLOW CONFIGS
// =============================================================================

/**
 * Flow config variant that shows an empty chat area during typing
 *
 * Use case: When you want users to see where responses will appear
 * while they're typing their question.
 */
export const FLOW_CONFIGS_WITH_EMPTY_CHAT: FlowConfigs = {
  ...DEFAULT_FLOW_CONFIGS,
  adding: {
    slots: {
      top: { enabled: true, minHeight: 80, maxHeight: 200 }, // Show empty chat
      bottom: { enabled: false },
    },
    placeholder: 'Type your question...',
  },
}

/**
 * Minimal flow config - no slot overrides, just button changes
 *
 * Use case: When base config already handles slot visibility correctly
 * and you only need button labels to change.
 */
export const MINIMAL_FLOW_CONFIGS: FlowConfigs = {
  processing: {
    buttons: [
      { id: 'btn1', label: 'Processing...', isLoading: true, enabled: false },
      { id: 'btn2', label: 'Please wait', isLoading: true, enabled: false },
    ],
  },

  response: {
    buttons: [
      { id: 'btn1', label: 'Delete', enabled: true },
      { id: 'btn2', label: 'Improve answer', enabled: true },
    ],
  },

  editing: {
    buttons: [
      { id: 'btn1', label: 'Cancel', enabled: true },
      { id: 'btn2', label: 'Update', enabled: true },
    ],
    placeholder: 'Edit your question...',
  },
}

