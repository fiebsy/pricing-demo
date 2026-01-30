/**
 * Question Command Menu V3 - Suggestions Content
 *
 * Displays AI-suggested questions with confidence badges.
 * Works in either slot position.
 */

'use client'

import * as React from 'react'
import { useMemo, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { Badge } from '@/components/ui/core/primitives/badge'
import type { BadgeColor } from '@/components/ui/core/primitives/badge/types'
import { useBiaxialExpand } from '@/components/ui/features/command-menu'
import { ScrollableWrapper } from './ScrollableWrapper'
import { useV3Context } from '../core'
import {
  SAMPLE_SUGGESTIONS,
  filterSuggestions,
  getConfidenceLevel,
} from '../data/suggestions'
import type { SuggestionItem, SuggestionsConfig, SlotPosition } from '../config/types'
import type { SlotScrollConfig } from '../config/slots'

// Icons
import SignalFull01Icon from '@hugeicons-pro/core-stroke-rounded/SignalFull01Icon'
import SignalMedium01Icon from '@hugeicons-pro/core-stroke-rounded/SignalMedium01Icon'
import SignalLow01Icon from '@hugeicons-pro/core-stroke-rounded/SignalLow01Icon'

// ============================================================================
// TYPES
// ============================================================================

export interface SuggestionsContentProps {
  /** Suggestions to display (uses SAMPLE_SUGGESTIONS if not provided) */
  suggestions?: SuggestionItem[]
  /** Called when a suggestion is selected */
  onSelect?: (item: SuggestionItem) => void
  /** Slot position this content is rendered in */
  slotPosition: SlotPosition
  /** Scroll configuration from slot */
  scrollConfig: SlotScrollConfig
  /** Calculated height for the container */
  height: number
  /** Additional className */
  className?: string
}

// ============================================================================
// CONFIDENCE BADGE
// ============================================================================

interface ConfidenceBadgeProps {
  confidence: number
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
  const level = getConfidenceLevel(confidence)
  const percentage = Math.round(confidence * 100)

  // Pick icon based on level
  const Icon = level === 'high'
    ? SignalFull01Icon
    : level === 'medium'
      ? SignalMedium01Icon
      : SignalLow01Icon

  // Map confidence level to Badge color
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

// ============================================================================
// SUGGESTION ITEM ROW
// ============================================================================

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

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      onMouseEnter={onMouseEnter}
      className={cn(
        'w-full flex items-center justify-between text-left',
        'rounded-xl transition-colors duration-150',
        isHighlighted ? 'bg-tertiary' : 'hover:bg-quaternary'
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
      {/* Question text */}
      <span className="flex-1 min-w-0 text-sm text-primary mr-3">
        {item.text}
      </span>

      {/* Confidence badge */}
      <ConfidenceBadge confidence={item.confidence} />
    </button>
  )
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

const DEFAULT_SUGGESTIONS_CONFIG: SuggestionsConfig = {
  maxWords: 15,
  showSearch: true,
  item: {
    height: 48,
    gap: 4,
    paddingX: 12,
    paddingY: 8,
    borderRadius: 12,
  },
  emptyMessage: 'No suggestions available',
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SuggestionsContent: React.FC<SuggestionsContentProps> = ({
  suggestions = SAMPLE_SUGGESTIONS,
  onSelect,
  slotPosition,
  scrollConfig,
  height,
  className,
}) => {
  const { setExpanded } = useBiaxialExpand()
  const { config, filter, setFilter, setSavedQuestion, setTriggerPhase } = useV3Context()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  // Get suggestions config (use default if not in contentConfigs)
  const suggestionsConfig = config.contentConfigs.suggestions || DEFAULT_SUGGESTIONS_CONFIG

  // Filter suggestions based on current search filter
  const filteredSuggestions = useMemo(
    () => filterSuggestions(suggestions, filter),
    [suggestions, filter]
  )

  const hasItems = filteredSuggestions.length > 0

  const handleSelect = useCallback(
    (item: SuggestionItem) => {
      // Set the selected suggestion as the saved question
      setSavedQuestion(item.text)
      setTriggerPhase('question-saved')
      setFilter('')
      setExpanded(false)
      onSelect?.(item)
    },
    [onSelect, setExpanded, setSavedQuestion, setTriggerPhase, setFilter]
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
