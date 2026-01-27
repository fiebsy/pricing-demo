/**
 * Question Command Menu V4 - Height Calculation Hooks
 *
 * Calculates dynamic heights for slots based on content.
 */

'use client'

import { useMemo } from 'react'
import { useV4Context } from '../state'
import type {
  SlotPosition,
  QuestionGroup,
  ChatMessage,
  SuggestionItem,
  ContentInstance,
  UnifiedSlotConfig,
  ContentConfigs,
} from '../types'

// =============================================================================
// HEIGHT CALCULATOR
// =============================================================================

interface CalculateHeightParams {
  content: ContentInstance
  slotConfig: UnifiedSlotConfig
  contentConfigs: ContentConfigs
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
}

export function calculateSlotHeight({
  content,
  slotConfig,
  contentConfigs,
  questionGroups = [],
  chatMessages = [],
  isChatTyping = false,
  suggestions = [],
}: CalculateHeightParams): number {
  // Fixed height mode returns fixedHeight directly
  if (slotConfig.heightMode === 'fixed') {
    return slotConfig.fixedHeight ?? 48
  }

  // Calculate content-based height
  let contentHeight = 0

  switch (content.type) {
    case 'questions': {
      const config = contentConfigs.questions
      const itemHeight = config.item.height + config.item.gap
      const totalItems = questionGroups.reduce((acc, group) => acc + group.items.length, 0)
      // Group headers add ~32px each
      const headerHeight = questionGroups.length * 32
      contentHeight = totalItems * itemHeight + headerHeight
      break
    }

    case 'buttons': {
      const config = contentConfigs.buttons
      const buttonHeight = config.size === 'xs' ? 28 : config.size === 'sm' ? 32 : 40
      if (config.direction === 'horizontal') {
        contentHeight = buttonHeight + config.paddingTop + config.paddingBottom
      } else {
        const buttonCount = config.buttons.filter((b) => b.enabled).length
        contentHeight = buttonCount * (buttonHeight + (config.gap ?? 8)) + config.paddingTop + config.paddingBottom
      }
      break
    }

    case 'chat': {
      const chatConf = contentConfigs.chat

      // Calculate actual heights based on config values
      // text-sm with default line-height ≈ 20px (14px × 1.43)
      const textLineHeight = 22
      // Actions row: mt-2 (8px) + button (p-1.5×2 + 14px icon = 20px) = 28px
      const actionRowHeight = 30

      // User message: paddingY × 2 + text
      const userMsgHeight = chatConf.message.paddingY * 2 + textLineHeight
      // Assistant with actions: paddingY + paddingY/2 + text + actions
      const assistantWithActionsHeight = chatConf.message.paddingY + Math.floor(chatConf.message.paddingY / 2) + textLineHeight + actionRowHeight
      // Assistant without actions: paddingY × 2 + text
      const assistantWithoutActionsHeight = chatConf.message.paddingY * 2 + textLineHeight

      let messagesHeight = 0
      for (let i = 0; i < chatMessages.length; i++) {
        const msg = chatMessages[i]
        if (msg.role === 'user') {
          messagesHeight += userMsgHeight
        } else {
          messagesHeight += chatConf.responseActions?.enabled
            ? assistantWithActionsHeight
            : assistantWithoutActionsHeight
        }
        if (i < chatMessages.length - 1) {
          messagesHeight += chatConf.message.gap
        }
      }

      if (isChatTyping) {
        messagesHeight += 40
      }

      // Add container padding (applied in ChatContent.tsx) + buffer for sub-pixel rounding
      contentHeight = messagesHeight + chatConf.container.paddingTop + chatConf.container.paddingBottom + 4

      // Auto mode: hug content (no max constraint)
      const min = slotConfig.minHeight ?? 0
      if (slotConfig.heightMode === 'auto') {
        return Math.max(min, contentHeight)
      }
      // Dynamic mode: apply max constraint
      const max = slotConfig.maxHeight ?? 400
      return Math.max(min, Math.min(max, contentHeight))
    }

    case 'suggestions': {
      const config = contentConfigs.suggestions
      const itemHeight = config.item.height + config.item.gap
      contentHeight = suggestions.length * itemHeight
      break
    }

    case 'filters':
    case 'tabs': {
      // Filters/tabs are typically single row
      contentHeight = 48
      break
    }
  }

  // Add scroll padding
  contentHeight += slotConfig.scroll.paddingTop + slotConfig.scroll.paddingBottom

  // Apply constraints based on height mode
  const min = slotConfig.minHeight ?? 48

  // 'auto' mode: hug content, only apply minHeight (no maxHeight constraint)
  if (slotConfig.heightMode === 'auto') {
    return Math.max(min, contentHeight)
  }

  // 'dynamic' mode: apply both min and max constraints
  const max = slotConfig.maxHeight ?? 400
  return Math.max(min, Math.min(max, contentHeight))
}

// =============================================================================
// FILTER HELPERS
// =============================================================================

export function filterQuestionGroups(groups: QuestionGroup[], filter: string): QuestionGroup[] {
  if (!filter.trim()) return groups

  const lowerFilter = filter.toLowerCase()

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.text.toLowerCase().includes(lowerFilter)
      ),
    }))
    .filter((group) => group.items.length > 0)
}

export function filterSuggestions(suggestions: SuggestionItem[], filter: string): SuggestionItem[] {
  if (!filter.trim()) return suggestions

  const lowerFilter = filter.toLowerCase()

  return suggestions.filter((item) =>
    item.text.toLowerCase().includes(lowerFilter)
  )
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Calculate dynamic height for a slot based on its content
 */
export function useSlotHeight(
  position: SlotPosition,
  questionGroups: QuestionGroup[] = [],
  chatMessages: ChatMessage[] = [],
  isChatTyping: boolean = false,
  suggestions: SuggestionItem[] = []
) {
  const { config, getContentForSlot, getSlotConfig } = useV4Context()

  return useMemo(() => {
    const content = getContentForSlot(position)
    if (!content) return 0

    const slotConfig = getSlotConfig(position)

    return calculateSlotHeight({
      content,
      slotConfig,
      contentConfigs: config.contentConfigs,
      questionGroups,
      chatMessages,
      isChatTyping,
      suggestions,
    })
  }, [
    config.contentConfigs,
    getContentForSlot,
    getSlotConfig,
    position,
    questionGroups,
    chatMessages,
    isChatTyping,
    suggestions,
  ])
}
