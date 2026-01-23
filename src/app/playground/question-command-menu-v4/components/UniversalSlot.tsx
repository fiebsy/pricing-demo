/**
 * Question Command Menu V4 - Universal Slot
 *
 * Position-agnostic slot renderer that works for both top and bottom slots.
 * Uses unified slot config - no separate logic for top vs bottom.
 */

'use client'

import * as React from 'react'
import { useV4Context } from '../state'
import { useSlotHeight } from '../hooks'
import { ContentRenderer } from './ContentRenderer'
import type { SlotPosition, QuestionGroup, ChatMessage, SuggestionItem } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface UniversalSlotProps {
  /** Which slot position to render */
  position: SlotPosition
  /** Question groups data (for questions content) */
  questionGroups?: QuestionGroup[]
  /** Chat messages data (for chat content) */
  chatMessages?: ChatMessage[]
  /** Whether AI is currently typing (for chat content) */
  isChatTyping?: boolean
  /** Suggestions data (for suggestions content) */
  suggestions?: SuggestionItem[]
  /** Selection handlers */
  onQuestionSelect?: (item: { id: string; text: string }) => void
  onButtonSelect?: (buttonId: string) => void
  onFilterChange?: (filterId: string) => void
  onSuggestionSelect?: (item: SuggestionItem) => void
  /** Chat regenerate handler */
  onChatRegenerate?: (messageId: string) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export const UniversalSlot: React.FC<UniversalSlotProps> = ({
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

  const slotConfig = getSlotConfig(position)
  const content = getContentForSlot(position)

  // Calculate dynamic height based on content
  const calculatedHeight = useSlotHeight(position, questionGroups, chatMessages, isChatTyping, suggestions)

  // Early return if slot is disabled or has no content
  if (!slotConfig.enabled || !content) {
    return null
  }

  // Determine the final height
  const height = slotConfig.heightMode === 'fixed'
    ? slotConfig.fixedHeight ?? 48
    : calculatedHeight

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

UniversalSlot.displayName = 'UniversalSlot'
