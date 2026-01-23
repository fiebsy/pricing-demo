/**
 * Question Command Menu V4 - Preview Component
 *
 * Main preview wrapper that orchestrates BiaxialExpandV4 with V4 config.
 */

'use client'

import * as React from 'react'
import { useMemo, useCallback } from 'react'
import {
  BiaxialExpandV4,
  type BiaxialExpandConfig,
} from '@/components/ui/prod/base/biaxial-command-menu-v4'
import { V4Provider, useV4Context } from '../state'
import { useSlotHeight, filterQuestionGroups, filterSuggestions } from '../hooks'
import { UniversalSlot } from './UniversalSlot'
import { UnifiedTrigger } from './UnifiedTrigger'
import type {
  QuestionCommandMenuV4Config,
  QuestionGroup,
  ChatMessage,
  TriggerButtonConfig,
  SuggestionItem,
} from '../types'

// =============================================================================
// CONFIG TRANSFORMER
// =============================================================================

function transformToV4Config(
  config: QuestionCommandMenuV4Config,
  topHeight: number,
  bottomHeight: number
): Partial<BiaxialExpandConfig> {
  // For slots, 'none' is valid
  const toSlotBackground = (bg: string | undefined) =>
    bg as 'none' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  // For main appearance, 'none' is not valid - use tertiary as fallback
  const toMainBackground = (bg: string | undefined) =>
    (bg === 'none' ? 'tertiary' : bg) as 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  // Height handling
  const isTopFixed = config.slots.top.heightMode === 'fixed'
  const maxTopHeight = isTopFixed ? undefined : topHeight

  // When fillWidth is true, panel width matches trigger width
  const fillWidth = config.layout.fillWidth ?? true
  const effectivePanelWidth = fillWidth
    ? config.layout.triggerWidth
    : config.layout.panelWidth

  return {
    layout: {
      triggerWidth: config.layout.triggerWidth,
      triggerHeight: config.layout.triggerHeight,
      panelWidth: effectivePanelWidth,
      maxTopHeight,
      maxBottomHeight: bottomHeight,
      borderRadius: config.layout.borderRadius,
      topGap: config.layout.topGap,
      bottomGap: config.layout.bottomGap,
      backdropTopOffset: config.layout.backdropTopOffset,
    },
    animation: {
      duration: config.animation.duration,
      collapseDuration: config.animation.collapseDuration,
      contentFadeDuration: config.animation.contentFadeDuration,
      contentFadeDelay: config.animation.contentFadeDelay,
      backdropMode: config.animation.backdropMode,
      backdropDelay: config.animation.backdropDelay,
      backdropDurationOffset: config.animation.backdropDurationOffset,
      animateSlotContainers: config.animation.animateSlotContainers,
      slotContainerDelay: config.animation.slotContainerDelay,
      slotContainerDurationOffset: config.animation.slotContainerDurationOffset,
      expandOrigin: config.slots.bottom.animation.expandOrigin,
      topExpandOrigin: config.slots.top.animation.expandOrigin,
    },
    appearance: {
      borderRadius: config.appearance.borderRadius,
      shadow: config.appearance.shadow,
      shine: config.appearance.shine,
      background: toMainBackground(config.appearance.background),
      gradient: config.appearance.gradient,
      gradientColor: config.appearance.gradientColor,
      squircle: config.appearance.squircle,
    },
    topSlot: {
      enabled: config.slots.top.enabled,
      height: isTopFixed ? config.slots.top.fixedHeight : undefined,
      delayOffset: config.slots.top.animation.delayOffset,
      durationOffset: config.slots.top.animation.durationOffset,
      background: toSlotBackground(config.slots.top.appearance.background),
      borderRadius: config.slots.top.appearance.borderRadius,
      inset: config.slots.top.appearance.inset,
      borderWidth: config.slots.top.appearance.borderWidth,
      borderColor: config.slots.top.appearance.borderColor,
    },
    bottomSlot: {
      enabled: config.slots.bottom.enabled,
      delayOffset: config.slots.bottom.animation.delayOffset,
      durationOffset: config.slots.bottom.animation.durationOffset,
      background: toSlotBackground(config.slots.bottom.appearance.background),
      borderRadius: config.slots.bottom.appearance.borderRadius,
      inset: config.slots.bottom.appearance.inset,
      borderWidth: config.slots.bottom.appearance.borderWidth,
      borderColor: config.slots.bottom.appearance.borderColor,
    },
    debug: config.debug,
  }
}

// =============================================================================
// SAMPLE DATA (placeholder)
// =============================================================================

const SAMPLE_QUESTIONS: QuestionGroup[] = [
  {
    id: 'group-1',
    label: 'Sample Questions',
    items: [
      { id: 'q1', text: 'What is your refund policy?' },
      { id: 'q2', text: 'How do I track my order?' },
      { id: 'q3', text: 'What payment methods do you accept?' },
    ],
  },
]

const SAMPLE_SUGGESTIONS: SuggestionItem[] = [
  { id: 's1', text: 'What are your business hours?', confidence: 0.95 },
  { id: 's2', text: 'Do you offer free shipping?', confidence: 0.88 },
  { id: 's3', text: 'How can I contact support?', confidence: 0.82 },
]

// =============================================================================
// INNER PREVIEW (uses context)
// =============================================================================

interface InnerPreviewProps {
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onChatSend?: (message: string) => void
  onChatRegenerate?: (messageId: string) => void
  onQuestionSave?: (question: string) => void
}

function InnerPreview({
  questionGroups = SAMPLE_QUESTIONS,
  chatMessages = [],
  isChatTyping = false,
  suggestions = SAMPLE_SUGGESTIONS,
  onChatSend,
  onChatRegenerate,
  onQuestionSave,
}: InnerPreviewProps) {
  const { config, state, setInput } = useV4Context()

  // Filter groups based on current search query
  const filteredGroups = useMemo(
    () => filterQuestionGroups(questionGroups, state.searchQuery),
    [questionGroups, state.searchQuery]
  )

  // Filter suggestions based on current search query
  const filteredSuggestions = useMemo(
    () => filterSuggestions(suggestions, state.searchQuery),
    [suggestions, state.searchQuery]
  )

  // Calculate dynamic heights
  const topHeight = useSlotHeight('top', filteredGroups, chatMessages, isChatTyping, filteredSuggestions)
  const rawBottomHeight = useSlotHeight('bottom', filteredGroups, chatMessages, isChatTyping, filteredSuggestions)
  const bottomHeight = Math.max(rawBottomHeight, 100)

  // Transform to V4 config
  const v4Config = useMemo(
    () => transformToV4Config(config, topHeight, bottomHeight),
    [config, topHeight, bottomHeight]
  )

  // Handlers
  const handleSelect = useCallback((item: { id: string; text: string }) => {
    console.log('[QuestionCommandMenuV4] Selected:', item.text)
  }, [])

  const handleButtonClick = useCallback(
    (index: number, buttonConfig: TriggerButtonConfig) => {
      console.log('[QuestionCommandMenuV4] Trigger button clicked:', index, buttonConfig.icon)
      // If this is the send button and we have text, send it
      if (buttonConfig.icon === 'send' && state.inputValue.trim() && onChatSend) {
        onChatSend(state.inputValue.trim())
        setInput('')
      }
    },
    [state.inputValue, onChatSend, setInput]
  )

  const handleEnter = useCallback(() => {
    // Send on Enter if we have text and a chat handler
    if (state.inputValue.trim() && onChatSend) {
      onChatSend(state.inputValue.trim())
      setInput('')
    }
  }, [state.inputValue, onChatSend, setInput])

  const handleButtonsSelect = useCallback((buttonId: string) => {
    console.log('[QuestionCommandMenuV4] Action button:', buttonId)
  }, [])

  const handleFilterChange = useCallback((filterId: string) => {
    console.log('[QuestionCommandMenuV4] Filter changed:', filterId)
  }, [])

  const handleSuggestionSelect = useCallback((item: SuggestionItem) => {
    console.log('[QuestionCommandMenuV4] Suggestion selected:', item.text)
  }, [])

  const handleQuestionSave = useCallback(
    (question: string) => {
      console.log('[QuestionCommandMenuV4] Question saved:', question)
      onQuestionSave?.(question)
      if (onChatSend) {
        onChatSend(question)
      }
    },
    [onQuestionSave, onChatSend]
  )

  return (
    <BiaxialExpandV4.Root config={v4Config}>
      {/* Top Slot */}
      {config.slots.top.enabled && (
        <BiaxialExpandV4.TopSlot>
          <UniversalSlot
            position="top"
            questionGroups={filteredGroups}
            chatMessages={chatMessages}
            isChatTyping={isChatTyping}
            suggestions={suggestions}
            onQuestionSelect={handleSelect}
            onButtonSelect={handleButtonsSelect}
            onFilterChange={handleFilterChange}
            onSuggestionSelect={handleSuggestionSelect}
            onChatRegenerate={onChatRegenerate}
          />
        </BiaxialExpandV4.TopSlot>
      )}

      {/* Backdrop */}
      <BiaxialExpandV4.Backdrop />

      {/* Content */}
      <BiaxialExpandV4.Content>
        {/* Trigger */}
        <BiaxialExpandV4.Trigger>
          <UnifiedTrigger
            placeholder={config.placeholder}
            triggerConfig={config.trigger}
            displayConfig={config.triggerDisplay}
            onButtonClick={handleButtonClick}
            onEnter={handleEnter}
            onSave={handleQuestionSave}
            maxWords={config.contentConfigs.suggestions?.maxWords ?? 15}
          />
        </BiaxialExpandV4.Trigger>

        {/* Bottom Content */}
        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <UniversalSlot
              position="bottom"
              questionGroups={filteredGroups}
              chatMessages={chatMessages}
              isChatTyping={isChatTyping}
              suggestions={suggestions}
              onQuestionSelect={handleSelect}
              onButtonSelect={handleButtonsSelect}
              onFilterChange={handleFilterChange}
              onSuggestionSelect={handleSuggestionSelect}
              onChatRegenerate={onChatRegenerate}
            />
          </BiaxialExpandV4.BottomSlot>
        </BiaxialExpandV4.ContentWrapper>
      </BiaxialExpandV4.Content>
    </BiaxialExpandV4.Root>
  )
}

// =============================================================================
// MAIN PREVIEW (provides context)
// =============================================================================

export interface PreviewProps {
  config: QuestionCommandMenuV4Config
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onChatSend?: (message: string) => void
  onChatRegenerate?: (messageId: string) => void
  onQuestionSave?: (question: string) => void
}

export function Preview({
  config,
  questionGroups,
  chatMessages,
  isChatTyping,
  suggestions,
  onChatSend,
  onChatRegenerate,
  onQuestionSave,
}: PreviewProps) {
  return (
    <V4Provider config={config}>
      <InnerPreview
        questionGroups={questionGroups}
        chatMessages={chatMessages}
        isChatTyping={isChatTyping}
        suggestions={suggestions}
        onChatSend={onChatSend}
        onChatRegenerate={onChatRegenerate}
        onQuestionSave={onQuestionSave}
      />
    </V4Provider>
  )
}

Preview.displayName = 'QuestionCommandMenuV4Preview'
