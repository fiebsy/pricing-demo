/**
 * Question Command Menu V3 - Preview Component
 *
 * Main preview wrapper that orchestrates BiaxialExpandV4 with V3 config.
 */

'use client'

import * as React from 'react'
import { useMemo, useCallback } from 'react'
import {
  BiaxialExpandV4,
  type BiaxialExpandConfig,
} from '@/components/ui/prod/base/biaxial-command-menu-v4'
import { QuestionCommandMenuV3Provider, useV3Context, useSlotHeight, filterQuestionGroups } from '../core'
import { UniversalSlot } from './UniversalSlot'
import { InputWithButtons } from './InputWithButtons'
import { QuestionTrigger } from './QuestionTrigger'
import { SAMPLE_QUESTIONS, SAMPLE_SUGGESTIONS, filterSuggestions } from '../content'
import type { QuestionCommandMenuV3Config, QuestionGroup, ChatMessage, TriggerButtonConfig, SuggestionItem } from '../config/types'

// ============================================================================
// CONFIG TRANSFORMER
// ============================================================================

function transformToV4Config(
  config: QuestionCommandMenuV3Config,
  topHeight: number,
  bottomHeight: number
): Partial<BiaxialExpandConfig> {
  // For slots, 'none' is valid
  const toSlotBackground = (bg: string | undefined) =>
    bg as 'none' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  // For main appearance, 'none' is not valid - use tertiary as fallback
  const toMainBackground = (bg: string | undefined) =>
    (bg === 'none' ? 'tertiary' : bg) as 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  // Height handling:
  // - 'fixed' mode: use topSlot.height, no maxTopHeight
  // - 'auto'/'dynamic' mode: use maxTopHeight for dynamic sizing (like bottom slot)
  const isTopFixed = config.slots.top.heightMode === 'fixed'
  const maxTopHeight = isTopFixed ? undefined : topHeight

  // When fillWidth is true, panel width matches trigger width (no horizontal expansion)
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
      // Only set fixed height when in 'fixed' mode
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

// ============================================================================
// INNER PREVIEW (uses context)
// ============================================================================

interface InnerPreviewProps {
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onChatSend?: (message: string) => void
  onChatRegenerate?: (messageId: string) => void
  onQuestionSave?: (question: string) => void
  /** When true, uses QuestionTrigger with phase-based UI instead of InputWithButtons */
  useQuestionTrigger?: boolean
}

function InnerPreview({
  questionGroups = SAMPLE_QUESTIONS,
  chatMessages = [],
  isChatTyping = false,
  suggestions = SAMPLE_SUGGESTIONS,
  onChatSend,
  onChatRegenerate,
  onQuestionSave,
  useQuestionTrigger = false,
}: InnerPreviewProps) {
  const { config, filter, setFilter, triggerPhase, savedQuestion } = useV3Context()

  // Filter groups based on current filter
  const filteredGroups = useMemo(
    () => filterQuestionGroups(questionGroups, filter),
    [questionGroups, filter]
  )

  // Filter suggestions based on current filter
  const filteredSuggestions = useMemo(
    () => filterSuggestions(suggestions, filter),
    [suggestions, filter]
  )

  // Calculate dynamic heights (pass chat data and filtered suggestions for proper height calculation)
  const topHeight = useSlotHeight('top', filteredGroups, chatMessages, isChatTyping, filteredSuggestions)
  const rawBottomHeight = useSlotHeight('bottom', filteredGroups, chatMessages, isChatTyping, filteredSuggestions)
  // Ensure minimum height for expansion
  const bottomHeight = Math.max(rawBottomHeight, 100)

  // Transform to V4 config
  const v4Config = useMemo(
    () => transformToV4Config(config, topHeight, bottomHeight),
    [config, topHeight, bottomHeight]
  )

  // Handlers
  const handleSelect = useCallback((item: { id: string; text: string }) => {
    console.log('[QuestionCommandMenuV3] Selected:', item.text)
  }, [])

  const handleButtonClick = useCallback((index: number, buttonConfig: TriggerButtonConfig) => {
    console.log('[QuestionCommandMenuV3] Trigger button clicked:', index, buttonConfig.icon)
    // If this is the send button and we have text in the filter, send it
    if (buttonConfig.icon === 'send' && filter.trim() && onChatSend) {
      onChatSend(filter.trim())
      setFilter('')
    }
  }, [filter, onChatSend, setFilter])

  const handleEnter = useCallback(() => {
    // Send on Enter if we have text and a chat handler
    if (filter.trim() && onChatSend) {
      onChatSend(filter.trim())
      setFilter('')
    }
  }, [filter, onChatSend, setFilter])

  const handleButtonsSelect = useCallback((buttonId: string) => {
    console.log('[QuestionCommandMenuV3] Action button:', buttonId)
  }, [])

  const handleFilterChange = useCallback((filterId: string) => {
    console.log('[QuestionCommandMenuV3] Filter changed:', filterId)
  }, [])

  const handleSuggestionSelect = useCallback((item: SuggestionItem) => {
    console.log('[QuestionCommandMenuV3] Suggestion selected:', item.text, `(${Math.round(item.confidence * 100)}% confidence)`)
    // The SuggestionsContent component handles saving the question
  }, [])

  const handleQuestionSave = useCallback((question: string) => {
    console.log('[QuestionCommandMenuV3] Question saved:', question)
    onQuestionSave?.(question)
    // Trigger AI evaluation if we have a chat send handler
    if (onChatSend) {
      onChatSend(question)
    }
  }, [onQuestionSave, onChatSend])

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
          {useQuestionTrigger ? (
            <QuestionTrigger
              placeholder={config.placeholder}
              value={filter}
              onValueChange={setFilter}
              onEnter={handleEnter}
              onSave={handleQuestionSave}
              triggerConfig={config.trigger}
              onButtonClick={handleButtonClick}
              maxWords={config.contentConfigs.suggestions?.maxWords ?? 15}
            />
          ) : (
            <InputWithButtons
              placeholder={config.placeholder}
              value={filter}
              onValueChange={setFilter}
              onEnter={handleEnter}
              triggerConfig={config.trigger}
              onButtonClick={handleButtonClick}
            />
          )}
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

// ============================================================================
// MAIN PREVIEW (provides context)
// ============================================================================

export interface PreviewProps {
  config: QuestionCommandMenuV3Config
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onChatSend?: (message: string) => void
  onChatRegenerate?: (messageId: string) => void
  onQuestionSave?: (question: string) => void
  /** When true, uses QuestionTrigger with phase-based UI instead of InputWithButtons */
  useQuestionTrigger?: boolean
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
  useQuestionTrigger,
}: PreviewProps) {
  return (
    <QuestionCommandMenuV3Provider config={config}>
      <InnerPreview
        questionGroups={questionGroups}
        chatMessages={chatMessages}
        isChatTyping={isChatTyping}
        suggestions={suggestions}
        onChatSend={onChatSend}
        onChatRegenerate={onChatRegenerate}
        onQuestionSave={onQuestionSave}
        useQuestionTrigger={useQuestionTrigger}
      />
    </QuestionCommandMenuV3Provider>
  )
}

Preview.displayName = 'QuestionCommandMenuV3Preview'
