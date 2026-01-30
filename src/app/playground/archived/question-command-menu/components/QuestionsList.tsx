/**
 * QuestionsList - Scrollable list of questions for bottom slot
 *
 * Shows questions as clickable rows with status indicators.
 * Includes overflow gradients for scroll indication.
 * Designed to work within BiaxialExpandV4.BottomSlot.
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Time02Icon from '@hugeicons-pro/core-stroke-rounded/Time02Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

import type { Question, QuestionStatus } from '../types'
import {
  OVERFLOW_GRADIENT_HEIGHT,
  getTopGradientStyles,
  getBottomGradientStyles,
} from '../_utils/layout'

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionsListProps {
  /** List of questions to display */
  questions: Question[]
  /** Currently selected question ID */
  selectedId?: string | null
  /** Called when a question is selected */
  onSelect?: (id: string) => void
  /** Additional className */
  className?: string
}

// =============================================================================
// STATUS ICON COMPONENT
// =============================================================================

const STATUS_CONFIG: Record<
  QuestionStatus,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  answered: { icon: CheckmarkCircle02Icon, color: 'text-success-primary' },
  orphaned: { icon: AlertCircleIcon, color: 'text-warning-primary' },
  pending: { icon: Time02Icon, color: 'text-tertiary' },
}

interface StatusIconProps {
  status: QuestionStatus
}

function StatusIcon({ status }: StatusIconProps) {
  const config = STATUS_CONFIG[status]
  return <HugeIcon icon={config.icon} size="sm" className={config.color} />
}

// =============================================================================
// QUESTION ROW COMPONENT
// =============================================================================

interface QuestionRowProps {
  question: Question
  isSelected?: boolean
  onClick?: () => void
}

function QuestionRow({ question, isSelected, onClick }: QuestionRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl',
        'text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-all motion-safe:duration-150',
        isSelected
          ? 'bg-brand-primary/10 text-primary'
          : 'hover:bg-secondary text-secondary hover:text-primary'
      )}
    >
      {/* Status icon */}
      <div className="shrink-0">
        <StatusIcon status={question.status} />
      </div>

      {/* Question text */}
      <span className="flex-1 text-sm truncate">{question.text}</span>

      {/* Arrow indicator */}
      <HugeIcon
        icon={ArrowRight01Icon}
        size="sm"
        className="shrink-0 text-tertiary"
      />
    </button>
  )
}

// =============================================================================
// STATS FOOTER
// =============================================================================

interface StatsFooterProps {
  questions: Question[]
}

function StatsFooter({ questions }: StatsFooterProps) {
  const answered = questions.filter((q) => q.status === 'answered').length
  const orphaned = questions.filter((q) => q.status === 'orphaned').length

  if (questions.length === 0) return null

  return (
    <div className="flex items-center justify-end gap-3 px-3 py-2 text-xs border-t border-primary">
      {orphaned > 0 && (
        <span className="flex items-center gap-1 text-warning-primary">
          <HugeIcon icon={AlertCircleIcon} size="xs" color="current" />
          {orphaned}
        </span>
      )}
      <span className="flex items-center gap-1 text-success-primary">
        <HugeIcon icon={CheckmarkCircle02Icon} size="xs" color="current" />
        {answered}
      </span>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function QuestionsList({
  questions,
  selectedId,
  onSelect,
  className,
}: QuestionsListProps) {
  // Sort questions: orphaned first, then pending, then answered
  const sortedQuestions = React.useMemo(() => {
    const statusOrder = ['orphaned', 'pending', 'answered'] as const
    return [...questions].sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    )
  }, [questions])

  if (questions.length === 0) {
    return (
      <div className={cn('flex items-center justify-center p-6', className)}>
        <p className="text-sm text-tertiary">No questions yet. Add one above.</p>
      </div>
    )
  }

  return (
    <div className={cn('h-full flex flex-col', className)}>
      <ScrollArea.Root className="flex-1 relative">
        <ScrollArea.Viewport className="h-full">
          <ScrollArea.Content>
            <div className="p-2 space-y-1">
              {sortedQuestions.map((question) => (
                <QuestionRow
                  key={question.id}
                  question={question}
                  isSelected={selectedId === question.id}
                  onClick={() => onSelect?.(question.id)}
                />
              ))}
            </div>
          </ScrollArea.Content>
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

        {/* Overflow Gradients */}
        <div
          className="pointer-events-none absolute transition-opacity duration-150"
          style={getTopGradientStyles(OVERFLOW_GRADIENT_HEIGHT)}
        />
        <div
          className="pointer-events-none absolute transition-opacity duration-150"
          style={getBottomGradientStyles(OVERFLOW_GRADIENT_HEIGHT)}
        />
      </ScrollArea.Root>

      {/* Stats footer */}
      <StatsFooter questions={questions} />
    </div>
  )
}
