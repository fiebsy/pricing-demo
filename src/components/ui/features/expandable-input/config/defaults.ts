/**
 * Expandable Input - Default Configuration
 *
 * Base configuration for the expandable input component.
 */

import type { ExpandableInputConfig, ExpandableInputPreset, TriggerButtonConfig } from '../types'

// =============================================================================
// COMMON BUTTONS
// =============================================================================

export const COMMON_BUTTONS = {
  sendExpanded: {
    id: 'send-expanded',
    position: 'right' as const,
    enabled: true,
    type: 'icon' as const,
    variant: 'primary' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'send',
    showWhen: 'expanded' as const,
  },
  arrowCollapsed: {
    id: 'arrow-collapsed',
    position: 'right' as const,
    enabled: true,
    type: 'indicator' as const,
    variant: 'tertiary' as const,
    size: 'sm' as const,
    icon: 'arrow-right',
    showWhen: 'collapsed' as const,
  },
  deleteExpanded: {
    id: 'delete-expanded',
    position: 'right' as const,
    enabled: false,
    type: 'icon' as const,
    variant: 'tertiary-destructive' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'delete',
    showWhen: 'expanded' as const,
    group: 'actions' as const,
  },
  editExpanded: {
    id: 'edit-expanded',
    position: 'right' as const,
    enabled: true,
    type: 'text' as const,
    variant: 'shine' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'delete',
    showWhen: 'expanded' as const,
    label: 'Edit',
    group: 'input-area' as const,
  },
  saveExpanded: {
    id: 'save-expanded',
    position: 'right' as const,
    enabled: true,
    type: 'text' as const,
    variant: 'primary' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'check',
    showWhen: 'expanded' as const,
    label: 'Save',
  },
} satisfies Record<string, TriggerButtonConfig>

// =============================================================================
// DEFAULT CONFIG
// =============================================================================

export const DEFAULT_CONFIG: ExpandableInputConfig = {
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
    defaultMode: 'input',
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
      COMMON_BUTTONS.sendExpanded,
      COMMON_BUTTONS.arrowCollapsed,
      { ...COMMON_BUTTONS.deleteExpanded, enabled: false },
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
        paddingTop: 16,
        paddingBottom: 16,
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
        highlightBackground: 'quaternary',
        hoverBackground: 'tertiary',
        showConfidence: true,
      },
      emptyMessage: 'No suggestions available',
    },
  },
  placeholder: 'Type your question...',
  defaultMode: 'input',
  debug: false,
}

// =============================================================================
// DEFAULT PRESET
// =============================================================================

export const DEFAULT_PRESET: ExpandableInputPreset = {
  id: 'default',
  name: 'Default',
  category: 'default',
  description: 'Questions on top with action buttons below input',
  data: DEFAULT_CONFIG,
}
