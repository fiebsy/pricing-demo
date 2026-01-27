/**
 * UniversalSlotWithImprove
 *
 * Enhanced UniversalSlot that forwards button select callbacks.
 */

'use client'

import * as React from 'react'
import { useV4Context } from '@/components/ui/features/expandable-input'
import { useSlotHeight, useFlowConfig } from '../../playground/archived/question-command-menu-v4/hooks'
import { ContentRenderer } from '../../playground/archived/question-command-menu-v4/components/ContentRenderer'
import type { SlotPosition, QuestionGroup, ChatMessage, SuggestionItem } from '../../playground/archived/question-command-menu-v4/types'

// =============================================================================
// TYPES
// =============================================================================

export interface UniversalSlotWithImproveProps {
  position: SlotPosition
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onQuestionSelect?: (item: { id: string; text: string }) => void
  onButtonSelect?: (buttonId: string) => void
  onFilterChange?: (filterId: string) => void
  onSuggestionSelect?: (item: SuggestionItem) => void
  onChatRegenerate?: (messageId: string) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export const UniversalSlotWithImprove: React.FC<UniversalSlotWithImproveProps> = ({
  position,
  questionGroups = [],
  chatMessages = [],
  isChatTyping = false,
  suggestions = [],
  onQuestionSelect,
  onButtonSelect,
  onFilterChange,
  onSuggestionSelect,
  onChatRegenerate,
}) => {
  const { getContentForSlot, getSlotConfig } = useV4Context()
  const { getEffectiveSlotEnabled, getEffectiveSlotConfig } = useFlowConfig()

  const slotConfig = getSlotConfig(position)
  const effectiveSlotConfig = getEffectiveSlotConfig(position)
  const content = getContentForSlot(position)

  const calculatedHeight = useSlotHeight(position, questionGroups, chatMessages, isChatTyping, suggestions)

  const isEnabled = getEffectiveSlotEnabled(position)

  if (!isEnabled || !content) {
    return null
  }

  const effectiveMinHeight = effectiveSlotConfig.minHeight ?? slotConfig.minHeight
  const effectiveMaxHeight = effectiveSlotConfig.maxHeight ?? slotConfig.maxHeight

  let height: number
  if (slotConfig.heightMode === 'fixed') {
    height = slotConfig.fixedHeight ?? 48
  } else if (slotConfig.heightMode === 'auto') {
    height = calculatedHeight
    if (effectiveMinHeight !== undefined) {
      height = Math.max(height, effectiveMinHeight)
    }
  } else {
    height = calculatedHeight
    if (effectiveMinHeight !== undefined) {
      height = Math.max(height, effectiveMinHeight)
    }
    if (effectiveMaxHeight !== undefined) {
      height = Math.min(height, effectiveMaxHeight)
    }
  }

  return (
    <ContentRenderer
      content={content}
      slotPosition={position}
      scrollConfig={slotConfig.scroll}
      height={height}
      questionGroups={questionGroups}
      chatMessages={chatMessages}
      isChatTyping={isChatTyping}
      suggestions={suggestions}
      onQuestionSelect={onQuestionSelect}
      onButtonSelect={onButtonSelect}
      onFilterChange={onFilterChange}
      onSuggestionSelect={onSuggestionSelect}
      onChatRegenerate={onChatRegenerate}
    />
  )
}
