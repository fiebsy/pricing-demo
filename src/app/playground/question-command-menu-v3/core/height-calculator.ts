/**
 * Question Command Menu V3 - Height Calculator
 *
 * Universal height calculation that works for any content in any slot.
 */

import type {
  ContentInstance,
  ContentConfigs,
  QuestionGroup,
  ChatMessage,
  ChatConfig,
  SuggestionItem,
  SuggestionsConfig,
} from '../config/types'
import type { UnifiedSlotConfig } from '../config/slots'

// ============================================================================
// CONTENT HEIGHT CALCULATORS
// ============================================================================

/**
 * Calculate height for questions content based on data
 */
function calculateQuestionsHeight(
  groups: QuestionGroup[],
  itemHeight: number,
  itemGap: number,
  paddingTop: number,
  paddingBottom: number
): number {
  const itemCount = groups.reduce((sum, g) => sum + g.items.length, 0)
  const groupCount = groups.length

  if (itemCount === 0) {
    return 100 // Empty state minimum
  }

  // Calculate content height
  const itemsHeight = itemCount * itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * itemGap
  const groupHeaderHeight = groupCount * 32 // Group labels
  const groupGapsHeight = Math.max(0, groupCount - 1) * 8

  return itemsHeight + gapsHeight + groupHeaderHeight + groupGapsHeight + paddingTop + paddingBottom
}

/**
 * Calculate height for buttons content
 */
function calculateButtonsHeight(
  buttonCount: number,
  direction: 'horizontal' | 'vertical',
  gap: number,
  size: string,
  paddingTop: number,
  paddingBottom: number
): number {
  // Button heights based on size
  const buttonHeights: Record<string, number> = {
    xs: 28,
    sm: 32,
    md: 40,
  }
  const buttonHeight = buttonHeights[size] ?? 32

  if (direction === 'horizontal') {
    return buttonHeight + paddingTop + paddingBottom
  }
  // Vertical: button height + gaps + padding
  return buttonCount * buttonHeight + Math.max(0, buttonCount - 1) * gap + paddingTop + paddingBottom
}

/**
 * Calculate height for filters/tabs content
 */
function calculateFiltersHeight(): number {
  return 48 // Fixed height for filter tabs
}

/**
 * Calculate height for suggestions content based on data
 */
function calculateSuggestionsHeight(
  suggestions: SuggestionItem[],
  suggestionsConfig: SuggestionsConfig,
  paddingTop: number,
  paddingBottom: number
): number {
  const itemCount = suggestions.length

  if (itemCount === 0) {
    return 80 // Empty state minimum
  }

  // Fallback values if item config is missing
  const itemHeight = suggestionsConfig.item?.height ?? 48
  const itemGap = suggestionsConfig.item?.gap ?? 4

  // Calculate content height
  const itemsHeight = itemCount * itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * itemGap

  return itemsHeight + gapsHeight + paddingTop + paddingBottom
}

/**
 * Calculate height for chat content based on messages
 */
function calculateChatHeight(
  messages: ChatMessage[],
  chatConfig: ChatConfig,
  isTyping: boolean
): number {
  const { message: messageConfig, container, responseActions } = chatConfig
  const { paddingTop, paddingBottom } = container

  if (messages.length === 0 && !isTyping) {
    return 120 // Empty state minimum with icon and text
  }

  // Response actions height when enabled (mt-2 + button height)
  // Button: p-1.5 (6px) * 2 + icon 14px = 26px, plus mt-2 (8px) = 34px
  const responseActionsHeight = 34
  const hasResponseActions = responseActions?.enabled ?? false

  // Estimate message height based on content length and role
  const estimateMessageHeight = (message: ChatMessage): number => {
    const isAssistant = message.role === 'assistant'
    // Tailwind v4 text-sm: 14px font-size, 20px line-height (--text-sm--line-height: calc(var(--spacing) * 5))
    const avgCharsPerLine = 45 // Conservative estimate accounting for padding and maxWidth
    const lineHeight = 20 // Matches Tailwind v4's text-sm line-height
    const lines = Math.max(1, Math.ceil(message.content.length / avgCharsPerLine))

    // Only assistant messages have the header (AI Response label + confidence + mb-1)
    // text-xs has ~16px line-height + 4px margin = 20px
    const headerHeight = isAssistant ? 20 : 0

    // Padding calculation:
    // - When showing actions: paddingY top + paddingY/2 bottom
    // - Otherwise: paddingY * 2
    const showActions = isAssistant && hasResponseActions && !message.isStreaming
    const verticalPadding = showActions
      ? messageConfig.paddingY + messageConfig.paddingY / 2
      : messageConfig.paddingY * 2

    // Add response actions height for assistant messages
    const actionsHeight = showActions ? responseActionsHeight : 0

    return lines * lineHeight + verticalPadding + headerHeight + actionsHeight
  }

  let totalHeight = paddingTop + paddingBottom

  // Add a small buffer for browser rendering variations
  const renderingBuffer = 4

  for (const message of messages) {
    totalHeight += estimateMessageHeight(message)
    totalHeight += messageConfig.gap
  }

  // Add typing indicator height if typing
  if (isTyping) {
    totalHeight += 40 + messageConfig.gap
  }

  // Remove last gap
  if (messages.length > 0 || isTyping) {
    totalHeight -= messageConfig.gap
  }

  return totalHeight + renderingBuffer
}

// ============================================================================
// MAIN CALCULATOR
// ============================================================================

export interface HeightCalculatorParams {
  content: ContentInstance
  slotConfig: UnifiedSlotConfig
  contentConfigs: ContentConfigs
  /** Question groups data (required for questions content type) */
  questionGroups?: QuestionGroup[]
  /** Chat messages data (required for chat content type) */
  chatMessages?: ChatMessage[]
  /** Whether AI is currently typing (for chat content type) */
  isChatTyping?: boolean
  /** Suggestions data (required for suggestions content type) */
  suggestions?: SuggestionItem[]
}

/**
 * Calculate the appropriate height for a slot based on its content and config
 */
export function calculateSlotHeight({
  content,
  slotConfig,
  contentConfigs,
  questionGroups = [],
  chatMessages = [],
  isChatTyping = false,
  suggestions = [],
}: HeightCalculatorParams): number {
  const { heightMode, fixedHeight, maxHeight, minHeight } = slotConfig

  // Fixed mode: return configured height
  if (heightMode === 'fixed') {
    return fixedHeight ?? 48
  }

  // Calculate content's natural height
  let contentHeight: number

  switch (content.type) {
    case 'questions': {
      const questionsConfig = contentConfigs.questions
      contentHeight = calculateQuestionsHeight(
        questionGroups,
        questionsConfig.item.height,
        questionsConfig.item.gap,
        slotConfig.scroll.paddingTop,
        slotConfig.scroll.paddingBottom
      )
      break
    }

    case 'buttons': {
      const buttonsConfig = contentConfigs.buttons
      const enabledCount = buttonsConfig.buttons.filter((b) => b.enabled).length
      contentHeight = calculateButtonsHeight(
        enabledCount,
        buttonsConfig.direction,
        buttonsConfig.gap ?? 8,
        buttonsConfig.size ?? 'sm',
        buttonsConfig.paddingTop ?? 0,
        buttonsConfig.paddingBottom ?? 0
      )
      break
    }

    case 'filters':
    case 'tabs': {
      contentHeight = calculateFiltersHeight()
      break
    }

    case 'chat': {
      contentHeight = calculateChatHeight(
        chatMessages,
        contentConfigs.chat,
        isChatTyping
      )
      break
    }

    case 'suggestions': {
      const suggestionsConfig = contentConfigs.suggestions
      if (!suggestionsConfig) {
        contentHeight = 80 // Fallback if no config
        break
      }
      contentHeight = calculateSuggestionsHeight(
        suggestions,
        suggestionsConfig,
        slotConfig.scroll.paddingTop,
        slotConfig.scroll.paddingBottom
      )
      break
    }

    default:
      contentHeight = fixedHeight ?? 100
  }

  // Auto mode: return actual content height (no capping)
  if (heightMode === 'auto') {
    return Math.max(minHeight ?? 0, contentHeight)
  }

  // Dynamic mode: cap at maxHeight, floor at minHeight
  return Math.max(
    minHeight ?? 0,
    Math.min(contentHeight, maxHeight ?? 400)
  )
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Filter question groups by search string
 */
export function filterQuestionGroups(
  groups: QuestionGroup[],
  filter: string
): QuestionGroup[] {
  if (!filter) return groups

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.text.toLowerCase().includes(filter.toLowerCase()) ||
          item.answer?.toLowerCase().includes(filter.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0)
}

/**
 * Get flat list of items from groups
 */
export function flattenQuestionGroups(groups: QuestionGroup[]) {
  return groups.flatMap((g) => g.items)
}
