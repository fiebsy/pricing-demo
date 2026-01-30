/**
 * Question Command Menu V4 - Suggestions Content
 *
 * Displays AI-suggested questions with confidence badges.
 */

'use client'

import * as React from 'react'
import { useMemo, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { BadgeColor } from '@/components/ui/core/primitives/badge/types'
import { ScrollableWrapper } from './ScrollableWrapper'
import { useV4Context } from '../state'
import { filterSuggestions } from '../hooks'
import { SAMPLE_SUGGESTIONS, getConfidenceLevel } from '../data'
import type { SuggestionItem, SuggestionsConfig, SlotPosition, SlotScrollConfig } from '../types'

// Icons
import SignalFull01Icon from '@hugeicons-pro/core-stroke-rounded/SignalFull01Icon'
import SignalMedium01Icon from '@hugeicons-pro/core-stroke-rounded/SignalMedium01Icon'
import SignalLow01Icon from '@hugeicons-pro/core-stroke-rounded/SignalLow01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface SuggestionsContentProps {
  suggestions?: SuggestionItem[]
  onSelect?: (item: SuggestionItem) => void
  slotPosition: SlotPosition
  scrollConfig: SlotScrollConfig
  height: number
  className?: string
}

// =============================================================================
// CONFIDENCE BADGE
// =============================================================================

interface ConfidenceBadgeProps {
  confidence: number
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
  const level = getConfidenceLevel(confidence)
  const percentage = Math.round(confidence * 100)

  const Icon = level === 'high'
    ? SignalFull01Icon
    : level === 'medium'
      ? SignalMedium01Icon
      : SignalLow01Icon

  const colorMap: Record<'high' | 'medium' | 'low', BadgeColor> = {
    high: 'success',
    medium: 'warning',
    low: 'error',
  }

  return (
    <Badge
      color={colorMap[level]}
      size="sm"
      shape="squircle"
      style="modern"
      iconLeading={<HugeIcon icon={Icon} size={14} strokeWidth={2} />}
    >
      {percentage}%
    </Badge>
  )
}

// =============================================================================
// SUGGESTION ITEM ROW
// =============================================================================

interface SuggestionItemRowProps {
  item: SuggestionItem
  config: SuggestionsConfig
  isHighlighted: boolean
  onSelect?: (item: SuggestionItem) => void
  onMouseEnter?: () => void
}

const SuggestionItemRow: React.FC<SuggestionItemRowProps> = ({
  item,
  config,
  isHighlighted,
  onSelect,
  onMouseEnter,
}) => {
  const itemConfig = config.item

  // Build background classes from config (matching QuestionsContent pattern)
  const highlightBg = itemConfig.highlightBackground !== 'none'
    ? `bg-${itemConfig.highlightBackground}`
    : ''
  const hoverBg = itemConfig.hoverBackground !== 'none'
    ? `hover:bg-${itemConfig.hoverBackground}`
    : ''

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      onMouseEnter={onMouseEnter}
      className={cn(
        'w-full flex items-center justify-between text-left',
        'rounded-xl transition-colors duration-150',
        isHighlighted ? highlightBg : hoverBg
      )}
      style={{
        minHeight: itemConfig.height,
        paddingLeft: itemConfig.paddingX,
        paddingRight: itemConfig.paddingX,
        paddingTop: itemConfig.paddingY,
        paddingBottom: itemConfig.paddingY,
        borderRadius: itemConfig.borderRadius,
      }}
    >
      <span className="flex-1 min-w-0 text-sm text-primary mr-3">
        {item.text}
      </span>
      {itemConfig.showConfidence && <ConfidenceBadge confidence={item.confidence} />}
    </button>
  )
}

// =============================================================================
// DEFAULT CONFIG
// =============================================================================

const DEFAULT_SUGGESTIONS_CONFIG: SuggestionsConfig = {
  maxWords: 15,
  showSearch: true,
  item: {
    height: 48,
    gap: 4,
    paddingX: 12,
    paddingY: 8,
    borderRadius: 12,
    highlightBackground: 'quaternary',
    hoverBackground: 'tertiary',
    showConfidence: true,
  },
  emptyMessage: 'No suggestions available',
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const SuggestionsContent: React.FC<SuggestionsContentProps> = ({
  suggestions = SAMPLE_SUGGESTIONS,
  onSelect,
  slotPosition,
  scrollConfig,
  height,
  className,
}) => {
  const { config, state, save, setInput } = useV4Context()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  // Get suggestions config
  const suggestionsConfig = config.contentConfigs.suggestions || DEFAULT_SUGGESTIONS_CONFIG

  // Filter suggestions based on current search query
  const filteredSuggestions = useMemo(
    () => filterSuggestions(suggestions, state.searchQuery),
    [suggestions, state.searchQuery]
  )

  const hasItems = filteredSuggestions.length > 0

  const handleSelect = useCallback(
    (item: SuggestionItem) => {
      // Save the selected suggestion as the question
      // Don't collapse - let the parent handle that if needed
      save(item.text)
      setInput('')
      onSelect?.(item)
    },
    [onSelect, save, setInput]
  )

  return (
    <ScrollableWrapper
      scrollConfig={scrollConfig}
      height={height}
      className={className}
    >
      {hasItems ? (
        <div className="flex flex-col" style={{ gap: suggestionsConfig.item.gap }}>
          {filteredSuggestions.map((item, index) => (
            <SuggestionItemRow
              key={item.id}
              item={item}
              config={suggestionsConfig}
              isHighlighted={highlightedIndex === index}
              onSelect={handleSelect}
              onMouseEnter={() => setHighlightedIndex(index)}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[80px]">
          <p className="text-sm text-tertiary">
            {suggestionsConfig.emptyMessage || 'No suggestions found'}
          </p>
        </div>
      )}
    </ScrollableWrapper>
  )
}

SuggestionsContent.displayName = 'SuggestionsContent'
