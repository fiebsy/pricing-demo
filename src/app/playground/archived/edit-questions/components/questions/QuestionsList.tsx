/**
 * QuestionsList - Questions list component (menu view)
 *
 * Displays all questions with status icons and navigation arrows.
 * Acts as the main menu - clicking a question navigates to detail view.
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'
import type { Question, QuestionStatus } from '../../types'

// =============================================================================
// STATUS ICON
// =============================================================================

interface StatusIconProps {
  status: QuestionStatus
  size?: 'sm' | 'md'
}

const STATUS_CONFIG: Record<
  QuestionStatus,
  { icon: typeof CheckmarkCircle02Icon; label: string; className: string }
> = {
  answered: {
    icon: CheckmarkCircle02Icon,
    label: 'Answered',
    className: 'text-success-primary',
  },
  orphaned: {
    icon: AlertCircleIcon,
    label: 'Needs attention',
    className: 'text-warning-primary',
  },
  pending: {
    icon: Clock01Icon,
    label: 'Pending',
    className: 'text-tertiary',
  },
}

function StatusIcon({ status, size = 'sm' }: StatusIconProps) {
  const config = STATUS_CONFIG[status]
  return (
    <div className={cn('shrink-0', config.className)} title={config.label}>
      <HugeIcon icon={config.icon} size={size} color="current" />
    </div>
  )
}

// =============================================================================
// QUESTION ITEM
// =============================================================================

interface QuestionItemProps {
  question: Question
  onClick: () => void
}

function QuestionItem({ question, onClick }: QuestionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3.5',
        'flex items-center gap-3',
        'border-b border-primary last:border-b-0',
        'motion-safe:transition-colors motion-safe:duration-150',
        'hover:bg-secondary/50',
        'focus-visible:outline-none focus-visible:bg-secondary/50',
        'group'
      )}
    >
      <StatusIcon status={question.status} />
      <p className="flex-1 text-sm leading-snug line-clamp-2 text-primary">
        {question.text}
      </p>
      <div className="shrink-0 text-tertiary group-hover:text-primary motion-safe:transition-colors">
        <HugeIcon icon={ArrowRight01Icon} size="sm" color="current" />
      </div>
    </button>
  )
}

// =============================================================================
// QUESTIONS LIST
// =============================================================================

export interface QuestionsListProps {
  questions: Question[]
  selectedQuestionId?: string | null
  onSelectQuestion: (questionId: string) => void
  onAddQuestion?: () => void
  maxQuestions?: number
  className?: string
}

export function QuestionsList({
  questions,
  onSelectQuestion,
  onAddQuestion,
  maxQuestions = 5,
  className,
}: QuestionsListProps) {
  // Group questions by status for better organization
  const sortedQuestions = React.useMemo(() => {
    const statusOrder: QuestionStatus[] = ['orphaned', 'pending', 'answered']
    return [...questions].sort(
      (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
    )
  }, [questions])

  const stats = React.useMemo(() => {
    return {
      answered: questions.filter((q) => q.status === 'answered').length,
      orphaned: questions.filter((q) => q.status === 'orphaned').length,
      pending: questions.filter((q) => q.status === 'pending').length,
    }
  }, [questions])

  const canAddMore = questions.length < maxQuestions
  const remainingSlots = maxQuestions - questions.length

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* List container with rounded border */}
      <div className="flex-1 overflow-y-auto">
        <div className="rounded-xl border border-primary overflow-hidden bg-primary">
          {/* Question items */}
          {sortedQuestions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onClick={() => onSelectQuestion(question.id)}
            />
          ))}

          {/* Add question slot(s) with dashed border */}
          {canAddMore && onAddQuestion && (
            <button
              type="button"
              onClick={onAddQuestion}
              className={cn(
                'w-full text-left px-4 py-3.5',
                'flex items-center gap-3',
                sortedQuestions.length > 0 && 'border-t-2 border-dashed border-tertiary/50',
                sortedQuestions.length === 0 && 'border-2 border-dashed border-tertiary/50 rounded-xl',
                'motion-safe:transition-colors motion-safe:duration-150',
                'hover:bg-secondary/50',
                'focus-visible:outline-none focus-visible:bg-secondary/50',
                'group'
              )}
            >
              <div className="shrink-0 text-tertiary group-hover:text-brand-primary">
                <HugeIcon icon={Add01Icon} size="sm" color="current" />
              </div>
              <p className="flex-1 text-sm text-tertiary group-hover:text-secondary">
                Add question {remainingSlots > 1 && `(${remainingSlots} slots remaining)`}
              </p>
              <div className="shrink-0 text-tertiary group-hover:text-primary motion-safe:transition-colors">
                <HugeIcon icon={ArrowRight01Icon} size="sm" color="current" />
              </div>
            </button>
          )}
        </div>

        {/* Empty state */}
        {sortedQuestions.length === 0 && !onAddQuestion && (
          <div className="px-4 py-12 text-center text-sm text-tertiary">
            No questions yet.
          </div>
        )}
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-end gap-3 pt-3 text-xs">
        {stats.orphaned > 0 && (
          <span className="flex items-center gap-1 text-warning-primary">
            <HugeIcon icon={AlertCircleIcon} size="xs" color="current" />
            {stats.orphaned}
          </span>
        )}
        <span className="flex items-center gap-1 text-success-primary">
          <HugeIcon icon={CheckmarkCircle02Icon} size="xs" color="current" />
          {stats.answered}
        </span>
      </div>
    </div>
  )
}
