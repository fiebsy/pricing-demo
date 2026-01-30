/**
 * Question Command Menu V4 - Content Section Panel
 *
 * Configures content assignment and type-specific settings.
 */

import type { Section, ControlGroup } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState } from '../../types'
import {
  CONTENT_TYPE_OPTIONS,
  BACKGROUND_OPTIONS,
  SHINE_OPTIONS,
  ACTION_BUTTON_ICON_OPTIONS,
  ACTION_BUTTON_VARIANT_OPTIONS,
  ACTION_BUTTON_SIZE_OPTIONS,
  BUTTONS_DIRECTION_OPTIONS,
} from '../../config/options'

// ============================================================================
// CONTENT ASSIGNMENT GROUP
// ============================================================================

function buildContentAssignmentGroups(state: PlaygroundState): ControlGroup[] {
  const content = state.config.content

  // Find top and bottom content
  const topContent = content.find((c) => c.slot === 'top')
  const bottomContent = content.find((c) => c.slot === 'bottom')

  return [
    {
      title: 'Top Slot Content',
      controls: [
        {
          id: 'topContentType',
          label: 'Content Type',
          type: 'select',
          value: topContent?.type ?? 'filters',
          options: [...CONTENT_TYPE_OPTIONS],
        },
      ],
    },
    {
      title: 'Bottom Slot Content',
      controls: [
        {
          id: 'bottomContentType',
          label: 'Content Type',
          type: 'select',
          value: bottomContent?.type ?? 'questions',
          options: [...CONTENT_TYPE_OPTIONS],
        },
      ],
    },
  ]
}

// ============================================================================
// QUESTIONS CONFIG GROUP
// ============================================================================

function buildQuestionsConfigGroup(state: PlaygroundState): ControlGroup {
  const questionsConfig = state.config.contentConfigs.questions

  return {
    title: 'Questions Styling',
    controls: [
      {
        id: 'config.contentConfigs.questions.item.height',
        label: 'Item Height',
        type: 'slider',
        value: questionsConfig.item.height,
        min: 40,
        max: 96,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.questions.item.gap',
        label: 'Item Gap',
        type: 'slider',
        value: questionsConfig.item.gap,
        min: 0,
        max: 16,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.questions.item.paddingX',
        label: 'Padding X',
        type: 'slider',
        value: questionsConfig.item.paddingX,
        min: 4,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.questions.item.borderRadius',
        label: 'Border Radius',
        type: 'slider',
        value: questionsConfig.item.borderRadius,
        min: 4,
        max: 20,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.questions.item.highlightBackground',
        label: 'Highlight Background',
        type: 'select',
        value: questionsConfig.item.highlightBackground,
        options: [...BACKGROUND_OPTIONS],
      },
      {
        id: 'config.contentConfigs.questions.item.hoverBackground',
        label: 'Hover Background',
        type: 'select',
        value: questionsConfig.item.hoverBackground,
        options: [...BACKGROUND_OPTIONS],
      },
      {
        id: 'config.contentConfigs.questions.item.iconSize',
        label: 'Icon Size',
        type: 'slider',
        value: questionsConfig.item.iconSize,
        min: 12,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.questions.item.iconOpacity',
        label: 'Icon Opacity',
        type: 'slider',
        value: questionsConfig.item.iconOpacity,
        min: 20,
        max: 100,
        step: 10,
        formatLabel: (v: number) => `${v}%`,
      },
    ],
  }
}

// ============================================================================
// BUTTONS CONFIG GROUPS
// ============================================================================

function buildButtonsConfigGroups(state: PlaygroundState): ControlGroup[] {
  const buttonsConfig = state.config.contentConfigs.buttons

  const layoutGroup: ControlGroup = {
    title: 'Buttons Layout',
    controls: [
      {
        id: 'config.contentConfigs.buttons.direction',
        label: 'Direction',
        type: 'select',
        value: buttonsConfig.direction,
        options: [...BUTTONS_DIRECTION_OPTIONS],
      },
      {
        id: 'config.contentConfigs.buttons.size',
        label: 'Button Size',
        type: 'select',
        value: buttonsConfig.size ?? 'sm',
        options: [...ACTION_BUTTON_SIZE_OPTIONS],
      },
      {
        id: 'config.contentConfigs.buttons.gap',
        label: 'Gap',
        type: 'slider',
        value: buttonsConfig.gap ?? 8,
        min: 0,
        max: 24,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
    ],
  }

  const paddingGroup: ControlGroup = {
    title: 'Buttons Container Padding',
    controls: [
      {
        id: 'config.contentConfigs.buttons.paddingLeft',
        label: 'Padding Left',
        type: 'slider',
        value: buttonsConfig.paddingLeft ?? 12,
        min: 0,
        max: 32,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.buttons.paddingRight',
        label: 'Padding Right',
        type: 'slider',
        value: buttonsConfig.paddingRight ?? 12,
        min: 0,
        max: 32,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.buttons.paddingTop',
        label: 'Padding Top',
        type: 'slider',
        value: buttonsConfig.paddingTop ?? 8,
        min: 0,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.buttons.paddingBottom',
        label: 'Padding Bottom',
        type: 'slider',
        value: buttonsConfig.paddingBottom ?? 8,
        min: 0,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
    ],
  }

  const buttonGroups = buttonsConfig.buttons.map((button, index) => ({
    title: `Button ${index + 1}: ${button.label}`,
    controls: [
      {
        id: `config.contentConfigs.buttons.buttons.${index}.enabled`,
        label: 'Enabled',
        type: 'toggle' as const,
        value: button.enabled,
      },
      {
        id: `config.contentConfigs.buttons.buttons.${index}.label`,
        label: 'Label',
        type: 'text' as const,
        value: button.label,
      },
      {
        id: `config.contentConfigs.buttons.buttons.${index}.icon`,
        label: 'Icon',
        type: 'select' as const,
        value: button.icon,
        options: [...ACTION_BUTTON_ICON_OPTIONS],
      },
      {
        id: `config.contentConfigs.buttons.buttons.${index}.variant`,
        label: 'Variant',
        type: 'select' as const,
        value: button.variant,
        options: [...ACTION_BUTTON_VARIANT_OPTIONS],
      },
    ],
  }))

  return [layoutGroup, paddingGroup, ...buttonGroups]
}

// ============================================================================
// CHAT CONFIG GROUPS
// ============================================================================

function buildChatConfigGroups(state: PlaygroundState): ControlGroup[] {
  const chatConfig = state.config.contentConfigs.chat

  const containerGroup: ControlGroup = {
    title: 'Chat Container',
    controls: [
      {
        id: 'config.contentConfigs.chat.container.paddingTop',
        label: 'Padding Top',
        type: 'slider',
        value: chatConfig.container.paddingTop,
        min: 0,
        max: 32,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.chat.container.paddingBottom',
        label: 'Padding Bottom',
        type: 'slider',
        value: chatConfig.container.paddingBottom,
        min: 0,
        max: 32,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
    ],
  }

  const messageStyleGroup: ControlGroup = {
    title: 'Chat Message Styling',
    controls: [
      {
        id: 'config.contentConfigs.chat.message.squircle',
        label: 'Squircle Corners',
        type: 'toggle',
        value: chatConfig.message.squircle,
      },
      {
        id: 'config.contentConfigs.chat.message.paddingX',
        label: 'Message Padding X',
        type: 'slider',
        value: chatConfig.message.paddingX,
        min: 4,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.chat.message.paddingY',
        label: 'Message Padding Y',
        type: 'slider',
        value: chatConfig.message.paddingY,
        min: 4,
        max: 20,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.chat.message.gap',
        label: 'Message Gap',
        type: 'slider',
        value: chatConfig.message.gap,
        min: 4,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.chat.message.borderRadius',
        label: 'Border Radius',
        type: 'slider',
        value: chatConfig.message.borderRadius,
        min: 4,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.chat.message.maxWidth',
        label: 'Max Width',
        type: 'slider',
        value: chatConfig.message.maxWidth,
        min: 60,
        max: 100,
        step: 5,
        formatLabel: (v: number) => `${v}%`,
      },
    ],
  }

  const userMessageGroup: ControlGroup = {
    title: 'User Message Appearance',
    controls: [
      {
        id: 'config.contentConfigs.chat.userMessage.background',
        label: 'Background',
        type: 'select',
        value: chatConfig.userMessage.background,
        options: [...BACKGROUND_OPTIONS],
      },
      {
        id: 'config.contentConfigs.chat.userMessage.shine',
        label: 'Shine Effect',
        type: 'select',
        value: chatConfig.userMessage.shine,
        options: [...SHINE_OPTIONS],
      },
    ],
  }

  const assistantMessageGroup: ControlGroup = {
    title: 'Assistant Message Appearance',
    controls: [
      {
        id: 'config.contentConfigs.chat.assistantMessage.background',
        label: 'Background',
        type: 'select',
        value: chatConfig.assistantMessage.background,
        options: [...BACKGROUND_OPTIONS],
      },
      {
        id: 'config.contentConfigs.chat.assistantMessage.shine',
        label: 'Shine Effect',
        type: 'select',
        value: chatConfig.assistantMessage.shine,
        options: [...SHINE_OPTIONS],
      },
      {
        id: 'config.contentConfigs.chat.showTypingIndicator',
        label: 'Show Typing Indicator',
        type: 'toggle',
        value: chatConfig.showTypingIndicator,
      },
    ],
  }

  return [containerGroup, messageStyleGroup, userMessageGroup, assistantMessageGroup]
}

// ============================================================================
// SUGGESTIONS CONFIG GROUP
// ============================================================================

function buildSuggestionsConfigGroup(state: PlaygroundState): ControlGroup {
  const suggestionsConfig = state.config.contentConfigs.suggestions

  return {
    title: 'Suggestions Styling',
    controls: [
      {
        id: 'config.contentConfigs.suggestions.maxWords',
        label: 'Max Words',
        type: 'slider',
        value: suggestionsConfig.maxWords,
        min: 5,
        max: 30,
        step: 1,
        formatLabel: (v: number) => `${v}`,
      },
      {
        id: 'config.contentConfigs.suggestions.showSearch',
        label: 'Show Search',
        type: 'toggle',
        value: suggestionsConfig.showSearch,
      },
      {
        id: 'config.contentConfigs.suggestions.item.height',
        label: 'Item Height',
        type: 'slider',
        value: suggestionsConfig.item.height,
        min: 36,
        max: 80,
        step: 4,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.suggestions.item.gap',
        label: 'Item Gap',
        type: 'slider',
        value: suggestionsConfig.item.gap,
        min: 0,
        max: 16,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.suggestions.item.paddingX',
        label: 'Padding X',
        type: 'slider',
        value: suggestionsConfig.item.paddingX,
        min: 4,
        max: 24,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
      {
        id: 'config.contentConfigs.suggestions.item.borderRadius',
        label: 'Border Radius',
        type: 'slider',
        value: suggestionsConfig.item.borderRadius,
        min: 4,
        max: 20,
        step: 2,
        formatLabel: (v: number) => `${v}px`,
      },
    ],
  }
}

// ============================================================================
// MAIN SECTION BUILDER
// ============================================================================

export function buildContentSection(state: PlaygroundState): Section {
  // Check what content types are being used
  const hasQuestions = state.config.content.some((c) => c.type === 'questions')
  const hasButtons = state.config.content.some((c) => c.type === 'buttons')
  const hasChat = state.config.content.some((c) => c.type === 'chat')
  const hasSuggestions = state.config.content.some((c) => c.type === 'suggestions')

  return {
    id: 'content',
    label: 'Content',
    title: 'Content Configuration',
    groups: [
      ...buildContentAssignmentGroups(state),
      // Only show config for content types that are in use
      ...(hasQuestions ? [buildQuestionsConfigGroup(state)] : []),
      ...(hasButtons ? buildButtonsConfigGroups(state) : []),
      ...(hasChat ? buildChatConfigGroups(state) : []),
      ...(hasSuggestions ? [buildSuggestionsConfigGroup(state)] : []),
    ],
  }
}
