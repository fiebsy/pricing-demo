/**
 * Question Command Menu V4 - Questions Content
 *
 * Displays a scrollable list of questions with status badges.
 */

'use client'

import * as React from 'react'
import { useMemo, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { useBiaxialExpand } from '@/components/ui/features/command-menu'
import { ScrollableWrapper } from './ScrollableWrapper'
import { useV4Context } from '../state'
import { filterQuestionGroups } from '../hooks'
import { STATUS_CONFIG } from '../data'
import type { QuestionItem, QuestionGroup, QuestionsConfig, SlotPosition, SlotScrollConfig } from '../types'

// Icons
import HelpCircleIcon from '@hugeicons-pro/core-stroke-rounded/HelpCircleIcon'

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionsContentProps {
  groups: QuestionGroup[]
  onSelect?: (item: QuestionItem) => void
  slotPosition: SlotPosition
  scrollConfig: SlotScrollConfig
  height: number
  className?: string
}

// =============================================================================
// STATUS BADGE
// =============================================================================

interface StatusBadgeProps {
  status: QuestionItem['status']
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (!status) return null

  const config = STATUS_CONFIG[status.type]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md',
        'text-xs font-medium border',
        config.className
      )}
    >
      <HugeIcon icon={Icon} size={12} />
      <span>{status.label}</span>
    </span>
  )
}

// =============================================================================
// QUESTION ITEM ROW
// =============================================================================

interface QuestionItemRowProps {
  item: QuestionItem
  config: QuestionsConfig
  isHighlighted: boolean
  onSelect?: (item: QuestionItem) => void
  onMouseEnter?: () => void
}

const QuestionItemRow: React.FC<QuestionItemRowProps> = ({
  item,
  config,
  isHighlighted,
  onSelect,
  onMouseEnter,
}) => {
  const Icon = item.icon || HelpCircleIcon
  const itemConfig = config.item

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      onMouseEnter={onMouseEnter}
      className={cn(
        'w-full flex flex-col items-start justify-center text-left',
        'rounded-xl transition-colors duration-150',
        isHighlighted
          ? `bg-${itemConfig.highlightBackground}`
          : `hover:bg-${itemConfig.hoverBackground}`
      )}
      style={{
        height: itemConfig.height,
        paddingLeft: itemConfig.paddingX,
        paddingRight: itemConfig.paddingX,
        paddingTop: itemConfig.paddingY,
        paddingBottom: itemConfig.paddingY,
        borderRadius: itemConfig.borderRadius,
      }}
    >
      <div className="flex items-start gap-3 w-full">
        <HugeIcon
          icon={Icon}
          size={itemConfig.iconSize}
          className="shrink-0 mt-0.5"
          style={{ opacity: itemConfig.iconOpacity / 100 }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-primary truncate">
            {item.text}
          </div>
          {item.answer && (
            <div className="text-xs text-tertiary mt-1 line-clamp-1">
              {item.answer}
            </div>
          )}
        </div>
        {item.status && <StatusBadge status={item.status} />}
      </div>
    </button>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const QuestionsContent: React.FC<QuestionsContentProps> = ({
  groups,
  onSelect,
  slotPosition,
  scrollConfig,
  height,
  className,
}) => {
  const { setExpanded } = useBiaxialExpand()
  const { config, state } = useV4Context()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  // Get questions config
  const questionsConfig = config.contentConfigs.questions

  // Filter groups based on current search query
  const filteredGroups = useMemo(
    () => filterQuestionGroups(groups, state.searchQuery),
    [groups, state.searchQuery]
  )

  const flatItems = useMemo(
    () => filteredGroups.flatMap((g) => g.items),
    [filteredGroups]
  )

  const hasItems = flatItems.length > 0

  const handleSelect = useCallback(
    (item: QuestionItem) => {
      onSelect?.(item)
      setExpanded(false)
    },
    [onSelect, setExpanded]
  )

  return (
    <ScrollableWrapper
      scrollConfig={scrollConfig}
      height={height}
      className={className}
    >
      {hasItems ? (
        <div className="flex flex-col" style={{ gap: questionsConfig.item.gap }}>
          {filteredGroups.map((group) => (
            <div key={group.id}>
              {/* Group Label */}
              <div className="px-3 py-2 text-xs font-semibold text-tertiary uppercase tracking-wider">
                {group.label}
              </div>

              {/* Items */}
              <div className="flex flex-col" style={{ gap: questionsConfig.item.gap }}>
                {group.items.map((item) => {
                  const globalIndex = flatItems.indexOf(item)
                  return (
                    <QuestionItemRow
                      key={item.id}
                      item={item}
                      config={questionsConfig}
                      isHighlighted={highlightedIndex === globalIndex}
                      onSelect={handleSelect}
                      onMouseEnter={() => setHighlightedIndex(globalIndex)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[80px]">
          <p className="text-sm text-tertiary">
            {questionsConfig.emptyMessage || 'No questions found'}
          </p>
        </div>
      )}
    </ScrollableWrapper>
  )
}

QuestionsContent.displayName = 'QuestionsContent'
