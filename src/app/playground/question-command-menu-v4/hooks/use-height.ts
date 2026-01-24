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
      // Calculate height per message
      const lineHeight = 20
      const avgCharsPerLine = 45

      let messagesHeight = 0
      for (const msg of chatMessages) {
        let msgHeight = chatConf.message.paddingY * 2

        // Estimate text lines based on content length
        const textLines = Math.max(1, Math.ceil(msg.content.length / avgCharsPerLine))
        msgHeight += textLines * lineHeight

        // Assistant messages have actions row
        if (msg.role === 'assistant') {
          if (chatConf.responseActions?.enabled) {
            msgHeight += 28 // Actions row
          }
        }

        messagesHeight += msgHeight + chatConf.message.gap
      }

      contentHeight = messagesHeight
      if (isChatTyping) {
        contentHeight += 44
      }
      // Chat has its own container padding - don't add scroll padding later
      contentHeight += chatConf.container.paddingTop + chatConf.container.paddingBottom
      // Return early to skip scroll padding addition
      const min = slotConfig.minHeight ?? 0
      if (slotConfig.heightMode === 'auto') {
        return Math.max(min, contentHeight)
      }
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
