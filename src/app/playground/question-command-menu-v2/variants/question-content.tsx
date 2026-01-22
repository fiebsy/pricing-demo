/**
 * Question Command Menu - Question Content Variant
 *
 * Bottom slot content for displaying a list of questions with status badges.
 * Uses Base UI ScrollArea for native scroll with custom scrollbar and
 * CSS variable-driven gradient overlays.
 */

'use client'

import * as React from 'react'
import { useMemo, useState, useCallback } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { useBiaxialExpand } from '@/components/ui/prod/base/biaxial-command-menu-v4'
import type {
  QuestionItem,
  QuestionGroup,
  QuestionItemConfig,
  BottomSlotConfig,
} from '../config/types'

// Icons
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Loading01Icon from '@hugeicons-pro/core-stroke-rounded/Loading01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import HelpCircleIcon from '@hugeicons-pro/core-stroke-rounded/HelpCircleIcon'

// ============================================================================
// STATUS ICONS
// ============================================================================

const STATUS_CONFIG = {
  approved: {
    icon: Tick01Icon,
    className: 'bg-success-primary/10 text-success-primary border-success-primary/20',
  },
  'needs-revision': {
    icon: AlertCircleIcon,
    className: 'bg-warning-primary/10 text-warning-primary border-warning-primary/20',
  },
  pending: {
    icon: Loading01Icon,
    className: 'bg-tertiary text-tertiary border-primary',
  },
  rejected: {
    icon: Cancel01Icon,
    className: 'bg-error-primary/10 text-error-primary border-error-primary/20',
  },
}

// ============================================================================
// TYPES
// ============================================================================

export interface QuestionContentProps {
  /** Question groups to display */
  groups: QuestionGroup[]
  /** Filter value for searching */
  filter?: string
  /** Called when a question is selected */
  onSelect?: (item: QuestionItem) => void
  /** Items configuration */
  itemsConfig: QuestionItemConfig
  /** Bottom slot configuration */
  bottomSlotConfig: BottomSlotConfig
  /** Empty state message */
  emptyMessage?: string
  /** Additional className */
  className?: string
}

// ============================================================================
// STATUS BADGE
// ============================================================================

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

// ============================================================================
// QUESTION ITEM
// ============================================================================

interface QuestionItemRowProps {
  item: QuestionItem
  config: QuestionItemConfig
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

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      onMouseEnter={onMouseEnter}
      className={cn(
        'w-full flex flex-col items-start justify-center text-left',
        'rounded-xl transition-colors duration-150',
        isHighlighted
          ? `bg-${config.highlightBackground}`
          : `hover:bg-${config.hoverBackground}`
      )}
      style={{
        height: config.height,
        paddingLeft: config.paddingX,
        paddingRight: config.paddingX,
        paddingTop: config.paddingY,
        paddingBottom: config.paddingY,
        borderRadius: config.borderRadius,
      }}
    >
      <div className="flex items-start gap-3 w-full">
        <HugeIcon
          icon={Icon}
          size={config.iconSize}
          className="shrink-0 mt-0.5"
          style={{ opacity: config.iconOpacity / 100 }}
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const QuestionContent: React.FC<QuestionContentProps> = ({
  groups,
  filter = '',
  onSelect,
  itemsConfig,
  bottomSlotConfig,
  emptyMessage = 'No questions found',
  className,
}) => {
  const { setExpanded } = useBiaxialExpand()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  // Filter questions
  const filteredGroups = useMemo(() => {
    if (!filter) return groups

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.text.toLowerCase().includes(filter.toLowerCase()) ||
          item.answer?.toLowerCase().includes(filter.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [groups, filter])

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

  const gradientHeight = bottomSlotConfig.overflowGradientHeight

  return (
    <div className={cn('w-full h-full overflow-hidden', className)}>
      <ScrollArea.Root className="h-full w-full">
        <ScrollArea.Viewport className="h-full w-full">
          <div
            style={{
              paddingTop: bottomSlotConfig.scrollPaddingTop,
              paddingBottom: bottomSlotConfig.scrollPaddingBottom,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {hasItems ? (
              <div className="flex flex-col" style={{ gap: itemsConfig.gap }}>
                {filteredGroups.map((group) => (
                  <div key={group.id}>
                    {/* Group Label */}
                    <div className="px-3 py-2 text-xs font-semibold text-tertiary uppercase tracking-wider">
                      {group.label}
                    </div>

                    {/* Items */}
                    <div className="flex flex-col" style={{ gap: itemsConfig.gap }}>
                      {group.items.map((item) => {
                        const globalIndex = flatItems.indexOf(item)
                        return (
                          <QuestionItemRow
                            key={item.id}
                            item={item}
                            config={itemsConfig}
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
                <p className="text-sm text-tertiary">{emptyMessage}</p>
              </div>
            )}
          </div>
        </ScrollArea.Viewport>

        {/* Custom Scrollbar */}
        <ScrollArea.Scrollbar
          orientation="vertical"
          className={cn(
            'absolute top-1 right-1 bottom-1 flex w-1.5 touch-none select-none p-0.5',
            'opacity-0 transition-opacity duration-150',
            'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
          )}
        >
          <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
        </ScrollArea.Scrollbar>

        {/* Overflow Gradient Top - opacity driven by CSS variable */}
        {bottomSlotConfig.overflowGradient && (
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 transition-opacity duration-150"
            style={{
              height: gradientHeight,
              background: `linear-gradient(to bottom, var(--color-bg-secondary) 0%, transparent 100%)`,
              opacity: `calc(min(1, var(--scroll-area-overflow-y-start, ${gradientHeight}) / ${gradientHeight}))`,
            }}
          />
        )}

        {/* Overflow Gradient Bottom - opacity driven by CSS variable */}
        {bottomSlotConfig.overflowGradient && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 transition-opacity duration-150"
            style={{
              height: gradientHeight,
              background: `linear-gradient(to top, var(--color-bg-secondary) 0%, transparent 100%)`,
              opacity: `calc(min(1, var(--scroll-area-overflow-y-end, ${gradientHeight}) / ${gradientHeight}))`,
            }}
          />
        )}
      </ScrollArea.Root>
    </div>
  )
}

QuestionContent.displayName = 'QuestionContent'

// ============================================================================
// SAMPLE DATA
// ============================================================================

export const SAMPLE_QUESTIONS: QuestionGroup[] = [
  {
    id: 'recent',
    label: 'Recent Questions',
    items: [
      {
        id: '1',
        text: 'What are your thoughts on remote work?',
        answer: "I don't have enough context to answer this question accurately.",
        status: { type: 'needs-revision', label: 'Needs revision' },
      },
      {
        id: '2',
        text: 'How do you handle conflict in the workplace?',
        answer: 'I believe in open communication and finding common ground.',
        status: { type: 'approved', label: 'Approved' },
      },
      {
        id: '3',
        text: 'Describe your leadership style.',
        status: { type: 'pending', label: 'Pending' },
      },
    ],
  },
  {
    id: 'flagged',
    label: 'Flagged for Review',
    items: [
      {
        id: '4',
        text: 'What salary are you expecting?',
        answer: 'I prefer to discuss compensation after understanding the role better.',
        status: { type: 'needs-revision', label: 'Needs revision' },
      },
      {
        id: '5',
        text: 'Why did you leave your last job?',
        status: { type: 'rejected', label: 'Rejected' },
      },
    ],
  },
]
