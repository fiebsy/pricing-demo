/**
 * Profile V3 - Question Command Menu Config
 *
 * Profile-specific configuration for command-menu-v4.
 * Smaller dimensions optimized for profile layout with simplified flow states.
 *
 * Flow states:
 * | State      | Top Slot        | Bottom Slot | Buttons                   |
 * |------------|-----------------|-------------|---------------------------|
 * | idle       | hidden          | hidden      | arrow indicator           |
 * | processing | chat (loading)  | hidden      | "Generating..."           |
 * | response   | chat (answer)   | buttons     | "Improve", edit, delete   |
 * | editing    | chat            | hidden      | "Save", "Cancel"          |
 *
 * @module b/profile-v3/config
 */

import type { QuestionCommandMenuV4Config, FlowConfigs } from '@/app/playground/question-command-menu-v4/types'

// =============================================================================
// PROFILE FLOW CONFIG
// =============================================================================

/**
 * Profile-specific flow state overrides
 * Simplified from the full playground config
 */
export const PROFILE_FLOW_CONFIG: FlowConfigs = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDLE: Question exists but collapsed
  // ─────────────────────────────────────────────────────────────────────────
  idle: {
    slots: {
      top: { enabled: false },
      bottom: { enabled: false },
    },
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: false },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: false },
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADDING: New question being typed (used for AddQuestionInput replacement)
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
  // PROCESSING: AI generating response
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
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: false },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: false },
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
    placeholder: 'Your question',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSE: AI response shown with action buttons
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
  // EDITING: User editing their question
  // ─────────────────────────────────────────────────────────────────────────
  editing: {
    slots: {
      top: { enabled: true },
      bottom: { enabled: false },
    },
    buttons: [
      { id: 'btn1', enabled: false },
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

// =============================================================================
// PROFILE COMMAND MENU CONFIG
// =============================================================================

/**
 * Profile-specific command menu configuration
 * Optimized for smaller profile layout with inline expansion
 */
export const PROFILE_COMMAND_CONFIG: QuestionCommandMenuV4Config = {
  animation: {
    duration: 300,
    collapseDuration: 150,
    contentFadeDuration: 0,
    contentFadeDelay: 0,
    backdropMode: 'size',
    backdropDelay: 0,
    backdropDurationOffset: 0,
    animateSlotContainers: true,
    slotContainerDelay: 0,
    slotContainerDurationOffset: 80,
  },
  layout: {
    triggerWidth: 320,
    triggerHeight: 44,
    panelWidth: 400,
    fillWidth: true, // Panel matches trigger width
    borderRadius: 16,
    topGap: 12,
    bottomGap: 12,
    backdropTopOffset: 0,
  },
  appearance: {
    borderRadius: 'xl',
    shadow: 'lg',
    shine: 'shine-1-subtle',
    background: 'primary',
    gradient: 'subtle-depth-sm',
    gradientColor: 'tertiary',
    squircle: true,
  },
  trigger: {
    defaultMode: 'input',
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingExpandedLeft: 0,
    paddingExpandedRight: -4,
    showSearchIcon: false,
    showKeyboardHint: false,
    keyboardHintText: '',
    cursor: 'text',
    buttons: [
      // Send button - hidden in profile context
      {
        id: 'send',
        position: 'right',
        enabled: false,
        type: 'icon',
        variant: 'primary',
        size: 'sm',
        roundness: 'squircle',
        icon: 'send',
        showWhen: 'has-value',
        action: 'submit',
      },
      // Add button - for new questions
      {
        id: 'add-button',
        position: 'right',
        enabled: false,
        type: 'text',
        variant: 'primary',
        size: 'xs',
        roundness: 'squircle',
        label: 'Add',
        showWhen: 'expanded',
        action: 'submit',
      },
      // Edit button
      {
        id: 'edit-small',
        position: 'right',
        enabled: false,
        type: 'text',
        variant: 'primary',
        size: 'xs',
        roundness: 'squircle',
        label: 'Edit',
        showWhen: 'expanded',
      },
      // Plus indicator when collapsed (for adding state)
      {
        id: 'plus-collapsed',
        position: 'right',
        enabled: false,
        type: 'indicator',
        variant: 'tertiary',
        size: 'sm',
        icon: 'add',
        showWhen: 'collapsed',
      },
      // Arrow indicator when collapsed (for existing questions)
      {
        id: 'arrow-collapsed',
        position: 'right',
        enabled: true,
        type: 'indicator',
        variant: 'tertiary',
        size: 'sm',
        icon: 'arrow-right',
        showWhen: 'collapsed',
      },
      // Delete button
      {
        id: 'delete-expanded',
        position: 'right',
        enabled: false,
        type: 'icon',
        variant: 'tertiary',
        size: 'sm',
        roundness: 'squircle',
        icon: 'delete',
        showWhen: 'expanded',
      },
    ],
  },
  triggerDisplay: {
    placeholderText: 'Ask a question...',
    addPlaceholderText: 'Add a question...',
    savedValueColor: 'primary',
    showEditIndicator: false,
  },
  slots: {
    top: {
      enabled: true,
      heightMode: 'auto',
      fixedHeight: 48,
      maxHeight: 320,
      minHeight: 0,
      appearance: {
        background: 'secondary',
        shine: 'none',
        borderRadius: 12,
        inset: 4,
        borderWidth: 1,
        borderColor: 'primary',
      },
      animation: {
        delayOffset: 0,
        durationOffset: -80,
        expandOrigin: 'bottom',
      },
      scroll: {
        overflowGradient: true,
        gradientHeight: 20,
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    bottom: {
      enabled: true,
      heightMode: 'auto',
      fixedHeight: 48,
      maxHeight: 80,
      minHeight: 0,
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
        durationOffset: 80,
        expandOrigin: 'top',
      },
      scroll: {
        overflowGradient: false,
        gradientHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  content: [
    { id: 'top-chat', type: 'chat', slot: 'top' },
    { id: 'bottom-buttons', type: 'buttons', slot: 'bottom' },
  ],
  contentConfigs: {
    questions: {
      item: {
        height: 48,
        gap: 4,
        paddingX: 12,
        paddingY: 8,
        borderRadius: 10,
        highlightBackground: 'quaternary',
        hoverBackground: 'tertiary',
        iconSize: 16,
        iconGap: 8,
        iconOpacity: 60,
      },
      emptyMessage: 'No questions yet.',
    },
    buttons: {
      buttons: [
        {
          id: 'btn1',
          label: 'Improve answer',
          icon: 'none',
          variant: 'shine',
          enabled: true,
        },
        {
          id: 'btn2',
          label: 'Regenerate',
          icon: 'sparkle',
          variant: 'secondary',
          enabled: false,
        },
        {
          id: 'btn3',
          label: '',
          icon: 'none',
          variant: 'tertiary',
          enabled: false,
        },
        {
          id: 'btn4',
          label: '',
          icon: 'none',
          variant: 'tertiary',
          enabled: false,
        },
      ],
      direction: 'horizontal',
      gap: 8,
      size: 'md',
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 0,
      paddingBottom: 4,
    },
    filters: {
      options: [],
      defaultValue: '',
    },
    tabs: {
      options: [],
      defaultValue: '',
    },
    chat: {
      message: {
        paddingX: 12,
        paddingY: 10,
        gap: 10,
        borderRadius: 20,
        maxWidth: 90,
        squircle: true,
      },
      container: {
        paddingTop: 12,
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
          { id: 'speak', enabled: false },
        ],
      },
      showTypingIndicator: false,
      emptyMessage: 'AI response will appear here',
    },
    suggestions: {
      maxWords: 15,
      showSearch: false,
      item: {
        height: 44,
        gap: 4,
        paddingX: 10,
        paddingY: 6,
        borderRadius: 10,
        highlightBackground: 'quaternary',
        hoverBackground: 'tertiary',
        showConfidence: true,
      },
      emptyMessage: '',
    },
  },
  placeholder: 'Ask a question...',
  defaultMode: 'input',
  flowConfigs: PROFILE_FLOW_CONFIG,
  debug: false,
}

// =============================================================================
// ADD QUESTION CONFIG
// =============================================================================

/**
 * Config for the "Add question" input (starts in adding state)
 */
export const ADD_QUESTION_CONFIG: QuestionCommandMenuV4Config = {
  ...PROFILE_COMMAND_CONFIG,
  triggerDisplay: {
    ...PROFILE_COMMAND_CONFIG.triggerDisplay,
    placeholderText: 'Add a question...',
  },
}
