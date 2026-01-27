/**
 * DetailView - Question detail view
 *
 * Shows when a question is selected:
 * - Answer preview (above or below input based on config)
 * - Question input with delete button
 *
 * @module playground/edit-questions/components/views
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'

import { QuestionInput } from '../questions/QuestionInput'
import { AnswerPreview } from '../answers/AnswerPreview'
import type { Question, AnswerState, AnswerPosition } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface DetailViewProps {
  /** Text of the selected question */
  questionText?: string
  /** The selected question (may be undefined during timing transition) */
  question?: Question
  /** Current answer state for the preview */
  answerState: AnswerState
  /** Position of answer relative to input */
  answerPosition: AnswerPosition
  /** All existing questions (for duplicate detection) */
  existingQuestions: Question[]
  /** Handle adding a new question */
  onAddQuestion: (text: string) => void
  /** Handle updating the current question text */
  onUpdateQuestion: (text: string) => void
  /** Handle deleting the current question */
  onDeleteQuestion: () => void
  /** Handle regenerating the answer */
  onRegenerate: () => void
  /** Handle opening revision flow */
  onRevise: () => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function DetailView({
  questionText,
  question,
  answerState,
  answerPosition,
  existingQuestions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onRegenerate,
  onRevise,
}: DetailViewProps) {
  return (
    <>
      {/* Answer ABOVE input (when answerPosition is 'above') */}
      {answerPosition === 'above' && (
        <div className="flex-1 overflow-y-auto">
          <AnswerPreview
            state={answerState}
            questionText={questionText || ''}
            answer={question?.answer}
            onRegenerate={onRegenerate}
            onImprove={onRevise}
          />
        </div>
      )}

      {/* Question input + Delete button */}
      <div
        className={cn(
          'shrink-0 px-4 py-4',
          answerPosition === 'above' && 'border-t border-primary',
          answerPosition === 'below' && 'border-b border-primary'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <QuestionInput
              onAddQuestion={onAddQuestion}
              onUpdateQuestion={onUpdateQuestion}
              existingQuestions={existingQuestions}
              selectedQuestionText={questionText}
            />
          </div>
          <button
            type="button"
            onClick={onDeleteQuestion}
            disabled={!question}
            className={cn(
              'shrink-0 p-3 rounded-xl',
              'text-error-primary',
              'bg-error-primary/10 hover:bg-error-primary/20',
              'border border-error-primary/20',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-primary',
              'motion-safe:transition-all motion-safe:duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            title="Delete question"
          >
            <HugeIcon icon={Delete01Icon} size="sm" color="current" />
          </button>
        </div>
      </div>

      {/* Answer BELOW input (when answerPosition is 'below') */}
      {answerPosition === 'below' && (
        <div className="flex-1 overflow-y-auto">
          <AnswerPreview
            state={answerState}
            questionText={questionText || ''}
            answer={question?.answer}
            onRegenerate={onRegenerate}
            onImprove={onRevise}
          />
        </div>
      )}
    </>
  )
}
