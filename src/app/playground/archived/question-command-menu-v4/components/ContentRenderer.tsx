/**
 * Question Command Menu V4 - Content Renderer
 *
 * Dispatches to the appropriate content component based on content type.
 * This component decouples content types from slot positions.
 */

'use client'

import * as React from 'react'
import {
  QuestionsContent,
  ButtonsContent,
  FiltersContent,
  ChatContent,
  SuggestionsContent,
  SAMPLE_QUESTIONS,
  SAMPLE_SUGGESTIONS,
} from '../content'
import type {
  ContentInstance,
  SlotPosition,
  QuestionGroup,
  ChatMessage,
  SuggestionItem,
  SlotScrollConfig,
} from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface ContentRendererProps {
  /** Content instance defining what to render */
  content: ContentInstance
  /** Slot position being rendered in */
  slotPosition: SlotPosition
  /** Scroll config from the slot */
  scrollConfig: SlotScrollConfig
  /** Calculated height for the content */
  height: number
  /** Question groups data (for questions content type) */
  questionGroups?: QuestionGroup[]
  /** Chat messages data (for chat content type) */
  chatMessages?: ChatMessage[]
  /** Whether AI is currently typing (for chat content type) */
  isChatTyping?: boolean
  /** Suggestion items data (for suggestions content type) */
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

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  slotPosition,
  scrollConfig,
  height,
  questionGroups = SAMPLE_QUESTIONS,
  chatMessages = [],
  isChatTyping = false,
  suggestions = SAMPLE_SUGGESTIONS,
  onQuestionSelect,
  onButtonSelect,
  onFilterChange,
  onSuggestionSelect,
  onChatRegenerate,
}) => {
  switch (content.type) {
    case 'questions':
      return (
        <QuestionsContent
          groups={questionGroups}
          onSelect={onQuestionSelect}
          slotPosition={slotPosition}
          scrollConfig={scrollConfig}
          height={height}
        />
      )

    case 'buttons':
      return (
        <ButtonsContent
          onSelect={onButtonSelect}
          slotPosition={slotPosition}
        />
      )

    case 'filters':
      return (
        <FiltersContent
          contentType="filters"
          onChange={onFilterChange}
          slotPosition={slotPosition}
        />
      )

    case 'tabs':
      return (
        <FiltersContent
          contentType="tabs"
          onChange={onFilterChange}
          slotPosition={slotPosition}
        />
      )

    case 'chat':
      return (
        <ChatContent
          messages={chatMessages}
          isTyping={isChatTyping}
          slotPosition={slotPosition}
          scrollConfig={scrollConfig}
          height={height}
          onRegenerate={onChatRegenerate}
        />
      )

    case 'suggestions':
      return (
        <SuggestionsContent
          suggestions={suggestions}
          onSelect={onSuggestionSelect}
          slotPosition={slotPosition}
          scrollConfig={scrollConfig}
          height={height}
        />
      )

    default:
      return (
        <div className="flex items-center justify-center w-full h-full text-tertiary text-sm">
          Unknown content type: {content.type}
        </div>
      )
  }
}

ContentRenderer.displayName = 'ContentRenderer'
