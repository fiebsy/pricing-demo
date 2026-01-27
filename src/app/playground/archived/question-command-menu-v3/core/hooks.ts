/**
 * Question Command Menu V3 - Custom Hooks
 *
 * Convenience hooks for accessing config and computing derived values.
 */

'use client'

import { useMemo } from 'react'
import { useV3Context } from './context'
import { calculateSlotHeight, filterQuestionGroups } from './height-calculator'
import type { SlotPosition, QuestionGroup, ChatMessage, SuggestionItem } from '../config/types'

// ============================================================================
// SLOT HOOKS
// ============================================================================

/**
 * Get content instance for a slot position
 */
export function useSlotContent(position: SlotPosition) {
  const { getContentForSlot, hasContentForSlot } = useV3Context()

  return useMemo(
    () => ({
      content: getContentForSlot(position),
      hasContent: hasContentForSlot(position),
    }),
    [getContentForSlot, hasContentForSlot, position]
  )
}

/**
 * Get unified slot config for a position
 */
export function useSlotConfig(position: SlotPosition) {
  const { getSlotConfig } = useV3Context()
  return useMemo(() => getSlotConfig(position), [getSlotConfig, position])
}

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
  const { config, getContentForSlot, getSlotConfig } = useV3Context()

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
  }, [config.contentConfigs, getContentForSlot, getSlotConfig, position, questionGroups, chatMessages, isChatTyping, suggestions])
}

// ============================================================================
// CONTENT HOOKS
// ============================================================================

/**
 * Get content config for the content in a specific slot
 */
export function useContentConfig(position: SlotPosition) {
  const { config, getContentForSlot } = useV3Context()

  return useMemo(() => {
    const content = getContentForSlot(position)
    if (!content) return null

    switch (content.type) {
      case 'questions':
        return config.contentConfigs.questions
      case 'buttons':
        return config.contentConfigs.buttons
      case 'filters':
        return config.contentConfigs.filters
      case 'tabs':
        return config.contentConfigs.tabs
      default:
        return null
    }
  }, [config.contentConfigs, getContentForSlot, position])
}

/**
 * Get questions config specifically
 */
export function useQuestionsConfig() {
  const { config } = useV3Context()
  return config.contentConfigs.questions
}

/**
 * Get buttons config specifically
 */
export function useButtonsConfig() {
  const { config } = useV3Context()
  return config.contentConfigs.buttons
}

/**
 * Get filters config specifically
 */
export function useFiltersConfig() {
  const { config } = useV3Context()
  return config.contentConfigs.filters
}

// ============================================================================
// FILTER HOOKS
// ============================================================================

/**
 * Get filtered question groups based on current filter value
 */
export function useFilteredQuestions(groups: QuestionGroup[]) {
  const { filter } = useV3Context()

  return useMemo(
    () => filterQuestionGroups(groups, filter),
    [groups, filter]
  )
}

// ============================================================================
// APPEARANCE HOOKS
// ============================================================================

/**
 * Check if a slot is effectively visible (enabled + has content)
 */
export function useSlotVisible(position: SlotPosition) {
  const { config, hasContentForSlot } = useV3Context()

  return useMemo(() => {
    const slotConfig = config.slots[position]
    return slotConfig.enabled && hasContentForSlot(position)
  }, [config.slots, hasContentForSlot, position])
}
