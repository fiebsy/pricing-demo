/**
 * PreviewWithImprove
 *
 * Enhanced Preview component that forwards button select callbacks.
 * Used to intercept "Improve answer" button clicks.
 */

'use client'

import * as React from 'react'
import { useMemo, useCallback } from 'react'
import {
  BiaxialExpandV4,
  type BiaxialExpandConfig,
} from '@/components/ui/core/primitives/biaxial-expand'
import { V4Provider, useV4Context } from '@/components/ui/features/expandable-input'
import { useSlotHeight, filterQuestionGroups, filterSuggestions, useFlowConfig } from '../../playground/archived/question-command-menu-v4/hooks'
import { UniversalSlotWithImprove } from './UniversalSlotWithImprove'
import { UnifiedTrigger } from '../../playground/archived/question-command-menu-v4/components/UnifiedTrigger'
import type {
  QuestionCommandMenuV4Config,
  QuestionGroup,
  ChatMessage,
  TriggerButtonConfig,
  SuggestionItem,
} from '../../playground/archived/question-command-menu-v4/types'

// =============================================================================
// CONFIG TRANSFORMER
// =============================================================================

function transformToV4Config(
  config: QuestionCommandMenuV4Config,
  topHeight: number,
  bottomHeight: number,
  effectiveTopEnabled: boolean,
  effectiveBottomEnabled: boolean,
  confidenceLevel?: number | null
): Partial<BiaxialExpandConfig> {
  const toSlotBackground = (bg: string | undefined) =>
    bg as 'none' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  const toMainBackground = (bg: string | undefined) =>
    (bg === 'none' ? 'tertiary' : bg) as 'primary' | 'secondary' | 'tertiary' | 'quaternary' | undefined

  const isTopFixed = config.slots.top.heightMode === 'fixed'
  const maxTopHeight = isTopFixed ? undefined : topHeight

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
    collapsedBackground: config.appearance.collapsedBackground,
    topSlot: {
      enabled: effectiveTopEnabled,
      heightMode: config.slots.top.heightMode,
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
      enabled: effectiveBottomEnabled,
      delayOffset: config.slots.bottom.animation.delayOffset,
      durationOffset: config.slots.bottom.animation.durationOffset,
      background: toSlotBackground(config.slots.bottom.appearance.background),
      borderRadius: config.slots.bottom.appearance.borderRadius,
      inset: config.slots.bottom.appearance.inset,
      borderWidth: config.slots.bottom.appearance.borderWidth,
      borderColor: config.slots.bottom.appearance.borderColor,
    },
    confidenceLevel,
    debug: config.debug,
  }
}

// =============================================================================
// SAMPLE DATA
// =============================================================================

const SAMPLE_SUGGESTIONS: SuggestionItem[] = []

// =============================================================================
// INNER PREVIEW
// =============================================================================

interface InnerPreviewProps {
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onChatSend?: (message: string) => void
  onChatRegenerate?: (messageId: string) => void
  onQuestionSave?: (question: string) => void
  onDelete?: () => void
  onButtonSelect?: (buttonId: string) => void
  isRegenerating?: boolean
  isLocked?: boolean
  onLockedChange?: (locked: boolean) => void
}

function InnerPreview({
  questionGroups = [],
  chatMessages = [],
  isChatTyping = false,
  suggestions = SAMPLE_SUGGESTIONS,
  onChatSend,
  onChatRegenerate,
  onQuestionSave,
  onDelete,
  onButtonSelect,
  isRegenerating = false,
  isLocked,
  onLockedChange,
}: InnerPreviewProps) {
  const { config, state, setInput, collapse, expand, storedConfidence, flowStateId } = useV4Context()
  const { effectiveTopEnabled, effectiveBottomEnabled } = useFlowConfig()

  const effectiveConfidence = (flowStateId === 'response' || flowStateId === 'editing')
    ? storedConfidence
    : null

  const handleExpandedChange = useCallback(
    (newExpanded: boolean) => {
      if (newExpanded) {
        expand()
      } else {
        collapse()
      }
    },
    [expand, collapse]
  )

  const filteredGroups = useMemo(
    () => filterQuestionGroups(questionGroups, state.searchQuery),
    [questionGroups, state.searchQuery]
  )

  const filteredSuggestions = useMemo(
    () => filterSuggestions(suggestions, state.searchQuery),
    [suggestions, state.searchQuery]
  )

  const topHeight = useSlotHeight('top', filteredGroups, chatMessages, isChatTyping, filteredSuggestions)
  const bottomHeight = useSlotHeight('bottom', filteredGroups, chatMessages, isChatTyping, filteredSuggestions)

  const v4Config = useMemo(
    () => transformToV4Config(config, topHeight, bottomHeight, effectiveTopEnabled, effectiveBottomEnabled, effectiveConfidence),
    [config, topHeight, bottomHeight, effectiveTopEnabled, effectiveBottomEnabled, effectiveConfidence]
  )

  const handleSelect = useCallback((item: { id: string; text: string }) => {
    console.log('[PreviewWithImprove] Selected:', item.text)
  }, [])

  const handleButtonClick = useCallback(
    (index: number, buttonConfig: TriggerButtonConfig) => {
      const isDeleteButton = buttonConfig.icon === 'delete' || buttonConfig.id?.includes('delete')
      if (isDeleteButton && onDelete) {
        onDelete()
        return
      }
      const isSubmitButton = buttonConfig.icon === 'send' || buttonConfig.action === 'submit'
      if (isSubmitButton && state.inputValue.trim() && onChatSend) {
        onChatSend(state.inputValue.trim())
      }
    },
    [state.inputValue, onChatSend, onDelete]
  )

  const handleEnter = useCallback(() => {
    if (state.inputValue.trim() && onChatSend) {
      onChatSend(state.inputValue.trim())
    }
  }, [state.inputValue, onChatSend])

  // Forward button select to parent - this is where we intercept "Improve answer"
  const handleButtonsSelect = useCallback(
    (buttonId: string) => {
      onButtonSelect?.(buttonId)
    },
    [onButtonSelect]
  )

  const handleFilterChange = useCallback((filterId: string) => {
    console.log('[PreviewWithImprove] Filter changed:', filterId)
  }, [])

  const handleSuggestionSelect = useCallback((item: SuggestionItem) => {
    console.log('[PreviewWithImprove] Suggestion selected:', item.text)
  }, [])

  const handleQuestionSave = useCallback(
    (question: string) => {
      onQuestionSave?.(question)
      if (onChatSend) {
        onChatSend(question)
      }
    },
    [onQuestionSave, onChatSend]
  )

  return (
    <BiaxialExpandV4.Root
      config={v4Config}
      expanded={state.expanded}
      onExpandedChange={handleExpandedChange}
      isLocked={isLocked}
      onLockedChange={onLockedChange}
    >
      {effectiveTopEnabled && (
        <BiaxialExpandV4.TopSlot>
          <UniversalSlotWithImprove
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

      <BiaxialExpandV4.Backdrop />

      <BiaxialExpandV4.Content>
        <BiaxialExpandV4.Trigger>
          <UnifiedTrigger
            placeholder={config.placeholder}
            triggerConfig={config.trigger}
            displayConfig={config.triggerDisplay}
            onButtonClick={handleButtonClick}
            onEnter={handleEnter}
            onSave={handleQuestionSave}
            maxWords={config.contentConfigs.suggestions?.maxWords ?? 15}
            isRegenerating={isRegenerating}
          />
        </BiaxialExpandV4.Trigger>

        <BiaxialExpandV4.ContentWrapper>
          <BiaxialExpandV4.BottomSlot>
            <UniversalSlotWithImprove
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
// MAIN COMPONENT
// =============================================================================

export interface PreviewWithImproveProps {
  config: QuestionCommandMenuV4Config
  questionGroups?: QuestionGroup[]
  chatMessages?: ChatMessage[]
  isChatTyping?: boolean
  suggestions?: SuggestionItem[]
  onChatSend?: (message: string) => void
  onChatRegenerate?: (messageId: string) => void
  onQuestionSave?: (question: string) => void
  onDelete?: () => void
  onButtonSelect?: (buttonId: string) => void
  isRegenerating?: boolean
  skipProvider?: boolean
  isLocked?: boolean
  onLockedChange?: (locked: boolean) => void
}

export function PreviewWithImprove({
  config,
  questionGroups,
  chatMessages,
  isChatTyping,
  suggestions,
  onChatSend,
  onChatRegenerate,
  onQuestionSave,
  onDelete,
  onButtonSelect,
  isRegenerating = false,
  skipProvider = false,
  isLocked,
  onLockedChange,
}: PreviewWithImproveProps) {
  const inner = (
    <InnerPreview
      questionGroups={questionGroups}
      chatMessages={chatMessages}
      isChatTyping={isChatTyping}
      suggestions={suggestions}
      onChatSend={onChatSend}
      onChatRegenerate={onChatRegenerate}
      onQuestionSave={onQuestionSave}
      onDelete={onDelete}
      onButtonSelect={onButtonSelect}
      isRegenerating={isRegenerating}
      isLocked={isLocked}
      onLockedChange={onLockedChange}
    />
  )

  if (skipProvider) {
    return inner
  }

  return (
    <V4Provider config={config}>
      {inner}
    </V4Provider>
  )
}
