/**
 * MenuView - Modal menu/list view
 *
 * Shows when no question is selected:
 * - Add question input at top (when < 5 questions)
 * - Questions list at bottom
 * - Stats summary
 *
 * @module playground/edit-questions/components/views
 */

'use client'

import * as React from 'react'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'

import { QuestionRow } from '../questions/QuestionInputRow'
import { QuestionInput } from '../questions/QuestionInput'
import type { Question } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface MenuViewProps {
  /** All questions (for passing to QuestionInput for duplicate detection) */
  questions: Question[]
  /** Questions sorted by status (orphaned first, then pending, then answered) */
  sortedQuestions: Question[]
  /** Stats for answered and orphaned counts */
  stats: {
    answered: number
    orphaned: number
  }
  /** Handle adding a new question */
  onAddQuestion: (text: string) => void
  /** Handle selecting a question to view details */
  onSelectQuestion: (id: string) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function MenuView({
  questions,
  sortedQuestions,
  stats,
  onAddQuestion,
  onSelectQuestion,
}: MenuViewProps) {
  return (
    <>
      {/* TOP: Add question input with suggestions */}
      {questions.length < 5 && (
        <div className="shrink-0 px-4 pt-4">
          <QuestionInput
            onAddQuestion={onAddQuestion}
            existingQuestions={questions}
            placeholder="Add question"
          />
        </div>
      )}

      {/* Spacer - pushes questions to bottom */}
      <div className="flex-1" />

      {/* BOTTOM: Questions list as clickable rows */}
      <div className="shrink-0 px-4 pb-4">
        <div className="space-y-2">
          {sortedQuestions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              onClick={() => onSelectQuestion(question.id)}
            />
          ))}
        </div>

        {/* Stats */}
        {sortedQuestions.length > 0 && (
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
        )}
      </div>
    </>
  )
}
