/**
 * Question Command Menu V3 - Presets
 *
 * V3 presets use unified slot configuration.
 * Content assignment is explicit: { type, slot } pairs.
 */

import type { Preset } from '@/components/ui/prod/base/control-panel'
import type {
  QuestionCommandMenuV3Config,
  QuestionCommandMenuV3Preset,
  PlaygroundState,
} from './types'

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const DEFAULT_CONFIG: QuestionCommandMenuV3Config = {
  animation: {
    duration: 350,
    collapseDuration: 150,
    contentFadeDuration: 0,
    contentFadeDelay: 0,
    backdropMode: 'size',
    backdropDelay: 0,
    backdropDurationOffset: 0,
    animateSlotContainers: true,
    slotContainerDelay: 0,
    slotContainerDurationOffset: 100,
  },
  layout: {
    triggerWidth: 320,
    triggerHeight: 44,
    panelWidth: 480,
    fillWidth: false,
    borderRadius: 20,
    topGap: 18,
    bottomGap: 0,
    backdropTopOffset: 0,
  },
  appearance: {
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-2-subtle',
    background: 'tertiary',
    gradient: 'subtle-depth-md',
    gradientColor: 'tertiary',
    squircle: true,
  },
  trigger: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingExpandedLeft: 0,
    paddingExpandedRight: -4,
    showSearchIcon: false,
    showKeyboardHint: true,
    keyboardHintText: '/',
    cursor: 'text',
    buttons: [
      {
        position: 'right',
        enabled: true,
        type: 'icon',
        variant: 'primary',
        size: 'sm',
        roundness: 'squircle',
        icon: 'send',
        showWhen: 'expanded',
      },
      {
        position: 'right',
        enabled: true,
        type: 'indicator',
        variant: 'tertiary',
        size: 'sm',
        icon: 'arrow-right',
        showWhen: 'collapsed',
      },
      {
        position: 'left',
        enabled: false,
        type: 'icon',
        variant: 'tertiary-destructive',
        size: 'sm',
        roundness: 'squircle',
        icon: 'delete',
        showWhen: 'expanded',
      },
    ],
  },
  slots: {
    top: {
      enabled: true,
      heightMode: 'dynamic',
      fixedHeight: 48,
      maxHeight: 300,
      minHeight: 100,
      appearance: {
        background: 'secondary',
        shine: 'none',
        borderRadius: 14,
        inset: 4,
        borderWidth: 1,
        borderColor: 'primary',
      },
      animation: {
        delayOffset: 0,
        durationOffset: -100,
        expandOrigin: 'bottom',
      },
      scroll: {
        overflowGradient: true,
        gradientHeight: 24,
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    bottom: {
      enabled: true,
      heightMode: 'auto',
      fixedHeight: 48,
      maxHeight: 100,
      minHeight: 32,
      appearance: {
        background: 'none',
        shine: 'none',
        borderRadius: 0,
        inset: 0,
        borderWidth: 0,
        borderColor: 'tertiary',
      },
      animation: {
        delayOffset: 0,
        durationOffset: 100,
        expandOrigin: 'top',
      },
      scroll: {
        overflowGradient: false,
        gradientHeight: 24,
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  content: [
    { id: 'top-questions', type: 'questions', slot: 'top' },
    { id: 'bottom-buttons', type: 'buttons', slot: 'bottom' },
  ],
  contentConfigs: {
    questions: {
      item: {
        height: 56,
        gap: 4,
        paddingX: 12,
        paddingY: 8,
        borderRadius: 12,
        highlightBackground: 'quaternary',
        hoverBackground: 'tertiary',
        iconSize: 18,
        iconGap: 10,
        iconOpacity: 60,
      },
      emptyMessage: 'No questions yet. Start typing to add one.',
    },
    buttons: {
      buttons: [
        { id: 'btn1', label: 'Delete', icon: 'none', variant: 'secondary', enabled: true },
        { id: 'btn2', label: 'Improve answer', icon: 'none', variant: 'secondary', enabled: true },
        { id: 'btn3', label: 'Regenerate', icon: 'sparkle', variant: 'tertiary', enabled: false },
        { id: 'btn4', label: 'Cancel', icon: 'close', variant: 'tertiary', enabled: false },
      ],
      direction: 'horizontal',
      gap: 8,
      size: 'md',
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      paddingBottom: 4,
    },
    filters: {
      options: [
        { id: 'all', label: 'All', count: 12 },
        { id: 'pending', label: 'Pending', count: 3 },
        { id: 'approved', label: 'Approved', count: 7 },
        { id: 'flagged', label: 'Flagged', count: 2 },
      ],
      defaultValue: 'all',
    },
    tabs: {
      options: [
        { id: 'recent', label: 'Recent' },
        { id: 'starred', label: 'Starred' },
        { id: 'all', label: 'All' },
      ],
      defaultValue: 'all',
    },
    chat: {
      message: {
        paddingX: 12,
        paddingY: 10,
        gap: 12,
        borderRadius: 16,
        maxWidth: 85,
        squircle: true,
      },
      container: {
        paddingTop: 8,
        paddingBottom: 8,
      },
      userMessage: {
        background: 'tertiary',
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
          { id: 'speak', enabled: true },
        ],
      },
      showTypingIndicator: true,
      emptyMessage: 'Ask a question to see the AI response here',
    },
    suggestions: {
      maxWords: 15,
      showSearch: true,
      item: {
        height: 48,
        gap: 4,
        paddingX: 12,
        paddingY: 8,
        borderRadius: 12,
      },
      emptyMessage: 'No suggestions available',
    },
  },
  placeholder: 'Type your question...',
  debug: false,
}

// ============================================================================
// PRESET DEFINITIONS
// ============================================================================

const DEFAULT_PRESET: QuestionCommandMenuV3Preset = {
  id: 'default',
  name: 'Default',
  category: 'default',
  description: 'Questions on top with action buttons below input',
  data: DEFAULT_CONFIG,
}

const CHAT_MODE_PRESET: QuestionCommandMenuV3Preset = {
  id: 'chat-mode',
  name: 'Chat Mode',
  category: 'custom',
  description: 'AI chat responses in top slot - type and send to see AI response',
  data: {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 400,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        {
          position: 'right',
          enabled: true,
          type: 'text',
          variant: 'shine',
          size: 'sm',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
          label: 'Edit',
        },
        {
          position: 'right',
          enabled: true,
          type: 'indicator',
          variant: 'tertiary',
          size: 'sm',
          icon: 'arrow-right',
          showWhen: 'collapsed',
        },
        {
          position: 'right',
          enabled: true,
          type: 'icon',
          variant: 'tertiary-destructive',
          size: 'sm',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
        },
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
          paddingTop: 24,
          paddingBottom: 12,
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
  },
}

const CHAT_INLINE_EDIT_PRESET: QuestionCommandMenuV3Preset = {
  id: 'chat-inline-edit',
  name: 'Chat Inline - Edit',
  category: 'custom',
  description: 'AI chat with inline trigger buttons - no bottom slot',
  data: {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 500,
      bottomGap: 10,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        {
          position: 'right',
          enabled: true,
          type: 'text',
          variant: 'shine',
          size: 'sm',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
          label: 'Edit',
        },
        {
          position: 'right',
          enabled: true,
          type: 'indicator',
          variant: 'tertiary',
          size: 'sm',
          icon: 'arrow-right',
          showWhen: 'collapsed',
        },
        {
          position: 'right',
          enabled: true,
          type: 'icon',
          variant: 'tertiary-destructive',
          size: 'sm',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
        },
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
          paddingTop: 24,
          paddingBottom: 12,
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
  },
}

const CHAT_INLINE_EDIT_V2_PRESET: QuestionCommandMenuV3Preset = {
  id: 'chat-inline-edit-v2',
  name: 'Chat Inline - Edit v2',
  category: 'custom',
  description: 'AI chat with bottom slot buttons and smaller Edit button',
  data: {
    ...DEFAULT_CONFIG,
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
        {
          position: 'right',
          enabled: true,
          type: 'indicator',
          variant: 'tertiary',
          size: 'sm',
          icon: 'arrow-right',
          showWhen: 'collapsed',
        },
        {
          position: 'right',
          enabled: false,
          type: 'icon',
          variant: 'tertiary-destructive',
          size: 'sm',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
        },
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
          paddingBottom: 0,
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
  },
}

const ADD_QUESTION_PRESET: QuestionCommandMenuV3Preset = {
  id: 'add-question',
  name: 'Add Question',
  category: 'custom',
  description: 'Two-state trigger with AI suggestions. Click to expand, save to evaluate.',
  data: {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout,
      panelWidth: 440,
      bottomGap: 8,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      showKeyboardHint: false,
      cursor: 'pointer',
      buttons: [
        {
          position: 'right',
          enabled: true,
          type: 'text',
          variant: 'primary',
          size: 'sm',
          roundness: 'squircle',
          icon: 'check',
          showWhen: 'expanded',
          label: 'Save',
        },
        {
          position: 'right',
          enabled: true,
          type: 'indicator',
          variant: 'tertiary',
          size: 'sm',
          icon: 'arrow-right',
          showWhen: 'collapsed',
        },
        {
          position: 'right',
          enabled: false,
          type: 'icon',
          variant: 'tertiary-destructive',
          size: 'sm',
          roundness: 'squircle',
          icon: 'delete',
          showWhen: 'expanded',
        },
      ],
    },
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
          paddingBottom: 8,
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
  },
}

// ============================================================================
// EXPORTS
// ============================================================================

export const PRESETS: Preset<PlaygroundState>[] = [
  { ...DEFAULT_PRESET, data: { config: DEFAULT_PRESET.data } },
  { ...CHAT_MODE_PRESET, data: { config: CHAT_MODE_PRESET.data } },
  { ...CHAT_INLINE_EDIT_PRESET, data: { config: CHAT_INLINE_EDIT_PRESET.data } },
  { ...CHAT_INLINE_EDIT_V2_PRESET, data: { config: CHAT_INLINE_EDIT_V2_PRESET.data } },
  { ...ADD_QUESTION_PRESET, data: { config: ADD_QUESTION_PRESET.data } },
]

export const DEFAULT_STATE: PlaygroundState = {
  config: DEFAULT_CONFIG,
}

export function getPresetById(id: string): Preset<PlaygroundState> | undefined {
  return PRESETS.find((p) => p.id === id)
}

export function getPresetsByCategory(category: string): Preset<PlaygroundState>[] {
  return PRESETS.filter((p) => {
    const preset = p as { category?: string }
    return preset.category === category
  })
}
