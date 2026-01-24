/**
 * QuestionsList
 *
 * Renders a vertical stack of QuestionFlowCard components.
 * Each question has its own independent flow state.
 */

'use client'

import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

import { QuestionFlowCard } from './QuestionFlowCard'
import type { Question, QuestionsListProps } from '../types'

// ============================================================================
// HELPER
// ============================================================================

function createEmptyQuestion(): Question {
  return {
    id: crypto.randomUUID(),
    text: '',
    response: null,
    confidence: null,
    status: 'idle',
  }
}

// ============================================================================
// QUESTIONS LIST
// ============================================================================

export function QuestionsList({
  maxQuestions = 10,
  onChange,
  className,
}: QuestionsListProps) {
  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()])

  const handleQuestionUpdate = useCallback(
    (id: string, updated: Question) => {
      setQuestions((prev) => {
        const next = prev.map((q) => (q.id === id ? updated : q))
        onChange?.(next)
        return next
      })
    },
    [onChange]
  )

  const handleQuestionDelete = useCallback(
    (id: string) => {
      setQuestions((prev) => {
        // If this is the last question, reset it instead of removing
        if (prev.length === 1) {
          const reset = [createEmptyQuestion()]
          onChange?.(reset)
          return reset
        }
        const next = prev.filter((q) => q.id !== id)
        onChange?.(next)
        return next
      })
    },
    [onChange]
  )

  const handleAddQuestion = useCallback(() => {
    if (questions.length >= maxQuestions) return

    setQuestions((prev) => {
      const next = [...prev, createEmptyQuestion()]
      onChange?.(next)
      return next
    })
  }, [questions.length, maxQuestions, onChange])

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Question Cards */}
      {questions.map((question, index) => (
        <div key={question.id} className="relative">
          {/* Question number badge */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-quaternary flex items-center justify-center">
            <span className="text-xs font-medium text-tertiary">{index + 1}</span>
          </div>

          <QuestionFlowCard
            question={question}
            onUpdate={(updated) => handleQuestionUpdate(question.id, updated)}
            onDelete={() => handleQuestionDelete(question.id)}
          />
        </div>
      ))}

      {/* Add Question Button */}
      {questions.length < maxQuestions && (
        <button
          onClick={handleAddQuestion}
          className={cn(
            'w-full py-3 px-4 rounded-xl',
            'border-2 border-dashed border-tertiary',
            'text-sm font-medium text-tertiary',
            'hover:border-secondary hover:text-secondary hover:bg-quaternary/30',
            'transition-all duration-200'
          )}
        >
          + Add another question
        </button>
      )}

      {/* Question count indicator */}
      <div className="text-center text-xs text-quaternary">
        {questions.length} of {maxQuestions} questions
      </div>
    </div>
  )
}
