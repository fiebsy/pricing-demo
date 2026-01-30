/**
 * QuestionRow - Clickable question row component
 *
 * Displays a question as a clickable row with status icon and right arrow.
 * Clicking navigates to the detail view.
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import type { Question, QuestionStatus } from '../../types'

// =============================================================================
// STATUS ICON CONFIG
// =============================================================================

const STATUS_CONFIG: Record<
  QuestionStatus,
  { icon: typeof CheckmarkCircle02Icon; className: string }
> = {
  answered: {
    icon: CheckmarkCircle02Icon,
    className: 'text-success-primary',
  },
  orphaned: {
    icon: AlertCircleIcon,
    className: 'text-warning-primary',
  },
  pending: {
    icon: Clock01Icon,
    className: 'text-tertiary',
  },
}

// =============================================================================
// QUESTION ROW
// =============================================================================

export interface QuestionRowProps {
  question: Question
  onClick: () => void
  className?: string
}

export function QuestionRow({
  question,
  onClick,
  className,
}: QuestionRowProps) {
  const statusConfig = STATUS_CONFIG[question.status]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left',
        'flex items-center gap-3',
        'px-4 py-3',
        'rounded-xl border border-primary bg-primary',
        'hover:bg-secondary/50 hover:border-secondary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-colors motion-safe:duration-150',
        'group',
        className
      )}
    >
      {/* Status icon */}
      <div className={cn('shrink-0', statusConfig.className)}>
        <HugeIcon icon={statusConfig.icon} size="sm" color="current" />
      </div>

      {/* Question text */}
      <p className="flex-1 text-sm text-primary leading-snug line-clamp-2">
        {question.text}
      </p>

      {/* Right arrow */}
      <div className="shrink-0 text-tertiary group-hover:text-primary motion-safe:transition-colors">
        <HugeIcon icon={ArrowRight01Icon} size="sm" color="current" />
      </div>
    </button>
  )
}

// =============================================================================
// QUESTION INPUT ROW (for backward compatibility - re-export as alias)
// =============================================================================

export interface QuestionInputRowProps {
  question?: Question
  isAddSlot?: boolean
  isSelected?: boolean
  onSelect?: (questionId: string) => void
  onAdd?: (text: string) => void
  onUpdate?: (questionId: string, text: string) => void
  onDelete?: (questionId: string) => void
  placeholder?: string
  className?: string
}

// Keep QuestionInputRow for backward compatibility but it now just renders QuestionRow
export function QuestionInputRow({
  question,
  onSelect,
  className,
}: QuestionInputRowProps) {
  if (!question || !onSelect) return null

  return (
    <QuestionRow
      question={question}
      onClick={() => onSelect(question.id)}
      className={className}
    />
  )
}

// =============================================================================
// QUESTION INPUT LIST (for backward compatibility)
// =============================================================================

export interface QuestionInputListProps {
  questions: Question[]
  selectedQuestionId?: string | null
  onSelectQuestion: (questionId: string) => void
  onAddQuestion: (text: string) => void
  onUpdateQuestion: (questionId: string, text: string) => void
  onDeleteQuestion: (questionId: string) => void
  maxQuestions?: number
  className?: string
}

export function QuestionInputList({
  questions,
  onSelectQuestion,
  className,
}: QuestionInputListProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {questions.map((question) => (
        <QuestionRow
          key={question.id}
          question={question}
          onClick={() => onSelectQuestion(question.id)}
        />
      ))}
    </div>
  )
}
