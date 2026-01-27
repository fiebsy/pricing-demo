/**
 * Question Command Menu V4 - Question Mode Presets
 *
 * Presets focused on adding/editing questions with suggestions.
 */

import type { QuestionCommandMenuV4Preset } from '../types'
import { DEFAULT_CONFIG } from './default'
import { createPreset, COMMON_BUTTONS } from './helpers'

// =============================================================================
// ADD QUESTION PRESET
// =============================================================================

export const ADD_QUESTION_PRESET: QuestionCommandMenuV4Preset = {
  id: 'add-question',
  name: 'Add Question',
  category: 'custom',
  description: 'Two-state trigger with AI suggestions. Click to expand, save to evaluate.',
  data: createPreset(DEFAULT_CONFIG, {
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 440,
      bottomGap: 8,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      defaultMode: 'question',
      showKeyboardHint: false,
      cursor: 'pointer',
      buttons: [
        COMMON_BUTTONS.saveExpanded,
        COMMON_BUTTONS.arrowCollapsed,
        { ...COMMON_BUTTONS.deleteExpanded, enabled: false },
      ],
    },
    defaultMode: 'question',
    content: [
      { id: 'top-chat', type: 'chat', slot: 'top' },
      { id: 'bottom-suggestions', type: 'suggestions', slot: 'bottom' },
    ],
    slots: {
      top: {
        ...DEFAULT_CONFIG.slots.top,
        enabled: true,
        heightMode: 'dynamic',
        minHeight: 120,
        maxHeight: 360,
        appearance: {
          ...DEFAULT_CONFIG.slots.top.appearance,
          borderWidth: 1,
          borderColor: 'primary',
        },
      },
      bottom: {
        ...DEFAULT_CONFIG.slots.bottom,
        enabled: true,
        heightMode: 'auto',
        maxHeight: 300,
        minHeight: 80,
        appearance: {
          ...DEFAULT_CONFIG.slots.bottom.appearance,
          background: 'none',
        },
        scroll: {
          overflowGradient: true,
          gradientHeight: 24,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    contentConfigs: {
      ...DEFAULT_CONFIG.contentConfigs,
      suggestions: {
        maxWords: 15,
        showSearch: true,
        item: {
          height: 52,
          gap: 6,
          paddingX: 14,
          paddingY: 10,
          borderRadius: 14,
          highlightBackground: 'quaternary',
          hoverBackground: 'tertiary',
          showConfidence: true,
        },
        emptyMessage: 'No suggestions match your search',
      },
      chat: {
        message: {
          paddingX: 12,
          paddingY: 10,
          gap: 12,
          borderRadius: 18,
          maxWidth: 85,
          squircle: true,
        },
        container: {
          paddingTop: 16,
          paddingBottom: 16,
        },
        userMessage: {
          background: 'quaternary',
          textColor: 'primary',
          shine: 'none',
        },
        assistantMessage: {
          background: 'secondary',
          textColor: 'primary',
          shine: 'shine-2-subtle',
        },
        responseActions: {
          enabled: true,
          actions: [
            { id: 'copy', enabled: true },
            { id: 'regenerate', enabled: true },
            { id: 'speak', enabled: false },
          ],
        },
        showTypingIndicator: true,
        emptyMessage: 'Select a suggestion or type your question',
      },
    },
    placeholder: 'Add a question...',
  }),
}

// =============================================================================
// QUESTION MODE PRESET (explicit question mode)
// =============================================================================

export const QUESTION_MODE_PRESET: QuestionCommandMenuV4Preset = {
  id: 'question-mode',
  name: 'Question Mode',
  category: 'custom',
  description: 'Explicit question mode with display/edit toggle',
  data: createPreset(DEFAULT_CONFIG, {
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 400,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      defaultMode: 'question',
      showKeyboardHint: false,
      cursor: 'pointer',
      buttons: [
        COMMON_BUTTONS.saveExpanded,
        COMMON_BUTTONS.arrowCollapsed,
      ],
    },
    triggerDisplay: {
      placeholderText: 'Click to add a question...',
      addPlaceholderText: 'Add a question...',
      savedValueColor: 'primary',
      showEditIndicator: true,
    },
    defaultMode: 'question',
    content: [
      { id: 'top-questions', type: 'questions', slot: 'top' },
      { id: 'bottom-suggestions', type: 'suggestions', slot: 'bottom' },
    ],
    slots: {
      top: {
        ...DEFAULT_CONFIG.slots.top,
        enabled: true,
        heightMode: 'dynamic',
        minHeight: 100,
        maxHeight: 300,
      },
      bottom: {
        ...DEFAULT_CONFIG.slots.bottom,
        enabled: true,
        heightMode: 'auto',
        maxHeight: 200,
        minHeight: 80,
        appearance: {
          ...DEFAULT_CONFIG.slots.bottom.appearance,
          background: 'none',
        },
        scroll: {
          overflowGradient: true,
          gradientHeight: 24,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    placeholder: 'Type your question...',
  }),
}
