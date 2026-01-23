/**
 * Question Command Menu V4 - Chat Mode Presets
 *
 * Presets focused on AI chat interactions.
 */

import type { QuestionCommandMenuV4Preset } from '../types'
import { DEFAULT_CONFIG } from './default'
import { createPreset, COMMON_BUTTONS } from './helpers'

// =============================================================================
// CHAT MODE PRESET
// =============================================================================

export const CHAT_MODE_PRESET: QuestionCommandMenuV4Preset = {
  id: 'chat-mode',
  name: 'Chat Mode',
  category: 'custom',
  description: 'AI chat responses in top slot - type and send to see AI response',
  data: createPreset(DEFAULT_CONFIG, {
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 400,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        COMMON_BUTTONS.editExpanded,
        COMMON_BUTTONS.arrowCollapsed,
        { ...COMMON_BUTTONS.deleteExpanded, enabled: true },
      ],
    },
    content: [
      { id: 'top-chat', type: 'chat', slot: 'top' },
      { id: 'bottom-buttons', type: 'buttons', slot: 'bottom' },
    ],
    slots: {
      ...DEFAULT_CONFIG.slots,
      top: {
        ...DEFAULT_CONFIG.slots.top,
        heightMode: 'dynamic',
        minHeight: 120,
        maxHeight: 520,
        appearance: {
          ...DEFAULT_CONFIG.slots.top.appearance,
          borderWidth: 0,
        },
      },
    },
    contentConfigs: {
      ...DEFAULT_CONFIG.contentConfigs,
      chat: {
        message: {
          paddingX: 12,
          paddingY: 10,
          gap: 12,
          borderRadius: 24,
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
          shine: 'none',
        },
        responseActions: {
          enabled: true,
          actions: [
            { id: 'copy', enabled: true },
            { id: 'regenerate', enabled: true },
            { id: 'speak', enabled: true },
          ],
        },
        showTypingIndicator: false,
        emptyMessage: 'Ask a question to see the AI response here',
      },
    },
    placeholder: 'Ask a question...',
  }),
}

// =============================================================================
// CHAT INLINE EDIT PRESET
// =============================================================================

export const CHAT_INLINE_EDIT_PRESET: QuestionCommandMenuV4Preset = {
  id: 'chat-inline-edit',
  name: 'Chat Inline - Edit',
  category: 'custom',
  description: 'AI chat with inline trigger buttons - no bottom slot',
  data: createPreset(DEFAULT_CONFIG, {
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 500,
      bottomGap: 10,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        COMMON_BUTTONS.editExpanded,
        COMMON_BUTTONS.arrowCollapsed,
        { ...COMMON_BUTTONS.deleteExpanded, enabled: true },
      ],
    },
    content: [
      { id: 'top-chat', type: 'chat', slot: 'top' },
      { id: 'bottom-buttons', type: 'buttons', slot: 'bottom' },
    ],
    slots: {
      top: {
        ...DEFAULT_CONFIG.slots.top,
        heightMode: 'dynamic',
        minHeight: 120,
        maxHeight: 520,
        appearance: {
          ...DEFAULT_CONFIG.slots.top.appearance,
          borderWidth: 1,
          borderColor: 'primary',
        },
      },
      bottom: {
        ...DEFAULT_CONFIG.slots.bottom,
        enabled: false,
      },
    },
    contentConfigs: {
      ...DEFAULT_CONFIG.contentConfigs,
      chat: {
        message: {
          paddingX: 12,
          paddingY: 10,
          gap: 12,
          borderRadius: 24,
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
          shine: 'none',
        },
        responseActions: {
          enabled: true,
          actions: [
            { id: 'copy', enabled: true },
            { id: 'regenerate', enabled: true },
            { id: 'speak', enabled: true },
          ],
        },
        showTypingIndicator: false,
        emptyMessage: 'Ask a question to see the AI response here',
      },
    },
    placeholder: 'Ask a question...',
  }),
}

// =============================================================================
// CHAT INLINE EDIT V2 PRESET
// =============================================================================

export const CHAT_INLINE_EDIT_V2_PRESET: QuestionCommandMenuV4Preset = {
  id: 'chat-inline-edit-v2',
  name: 'Chat Inline - Edit v2',
  category: 'custom',
  description: 'AI chat with bottom slot buttons and smaller Edit button',
  data: createPreset(DEFAULT_CONFIG, {
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 400,
      bottomGap: 10,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      showKeyboardHint: false,
      buttons: [
        {
          id: 'edit-small',
          position: 'right',
          enabled: true,
          type: 'text',
          variant: 'secondary',
          size: 'xs',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
          label: 'Edit',
        },
        COMMON_BUTTONS.arrowCollapsed,
        { ...COMMON_BUTTONS.deleteExpanded, enabled: false },
      ],
    },
    content: [
      { id: 'top-chat', type: 'chat', slot: 'top' },
      { id: 'bottom-buttons', type: 'buttons', slot: 'bottom' },
    ],
    slots: {
      top: {
        ...DEFAULT_CONFIG.slots.top,
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
      },
    },
    contentConfigs: {
      ...DEFAULT_CONFIG.contentConfigs,
      buttons: {
        ...DEFAULT_CONFIG.contentConfigs.buttons,
        buttons: [
          { id: 'btn1', label: 'Delete', icon: 'none', variant: 'tertiary', enabled: true },
          { id: 'btn2', label: 'Improve answer', icon: 'none', variant: 'shine', enabled: true },
          { id: 'btn3', label: 'Regenerate', icon: 'sparkle', variant: 'tertiary', enabled: false },
          { id: 'btn4', label: 'Cancel', icon: 'close', variant: 'tertiary', enabled: false },
        ],
      },
      chat: {
        message: {
          paddingX: 12,
          paddingY: 10,
          gap: 12,
          borderRadius: 24,
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
          shine: 'none',
        },
        responseActions: {
          enabled: true,
          actions: [
            { id: 'copy', enabled: true },
            { id: 'regenerate', enabled: true },
            { id: 'speak', enabled: true },
          ],
        },
        showTypingIndicator: false,
        emptyMessage: 'Ask a question to see the AI response here',
      },
    },
    placeholder: 'Add a question',
  }),
}
