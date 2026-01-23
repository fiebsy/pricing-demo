/**
 * Flow Testing - Default Config
 *
 * Your base configuration for flow state testing.
 */

import type { QuestionCommandMenuV4Config } from '../question-command-menu-v4/types'

export const FLOW_DEFAULT_CONFIG: QuestionCommandMenuV4Config = {
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
    panelWidth: 400,
    fillWidth: false,
    borderRadius: 20,
    topGap: 18,
    bottomGap: 10,
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
    defaultMode: 'input',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingExpandedLeft: 0,
    paddingExpandedRight: -4,
    showSearchIcon: false,
    showKeyboardHint: false,
    keyboardHintText: '/',
    cursor: 'text',
    buttons: [
      // Send button - triggers the AI flow
      {
        id: 'send',
        position: 'right',
        enabled: true,
        type: 'icon',
        variant: 'primary',
        size: 'sm',
        roundness: 'squircle',
        icon: 'send',
        showWhen: 'has-value',
        action: 'submit',
      },
      // Arrow indicator when collapsed
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
    ],
  },
  triggerDisplay: {
    placeholderText: 'Add a question...',
    addPlaceholderText: 'Add a question...',
    savedValueColor: 'primary',
    showEditIndicator: true,
  },
  slots: {
    top: {
      enabled: true,
      heightMode: 'dynamic',
      fixedHeight: 48,
      maxHeight: 360,
      minHeight: 120,
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
    { id: 'top-chat', type: 'chat', slot: 'top' },
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
      // Single button for the flow
      buttons: [
        {
          id: 'btn1',
          label: 'Improve answer',
          icon: 'sparkle',
          variant: 'shine',
          enabled: true,
        },
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
      options: [],
      defaultValue: 'all',
    },
    tabs: {
      options: [],
      defaultValue: 'all',
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
        enabled: false,
        actions: [],
      },
      showTypingIndicator: true,
      emptyMessage: 'Ask a question to see the AI response here',
    },
    suggestions: {
      maxWords: 15,
      showSearch: false,
      item: {
        height: 48,
        gap: 4,
        paddingX: 12,
        paddingY: 8,
        borderRadius: 12,
        highlightBackground: 'quaternary',
        hoverBackground: 'tertiary',
        showConfidence: false,
      },
      emptyMessage: 'No suggestions available',
    },
  },
  placeholder: 'Add a question',
  defaultMode: 'input',
  debug: false,
}
