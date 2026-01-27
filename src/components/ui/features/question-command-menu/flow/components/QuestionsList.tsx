/**
 * QuestionsList
 *
 * Renders a fixed vertical stack of QuestionFlowCard components.
 * Each question has its own independent flow state.
 */

'use client'

import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
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

function createInitialQuestions(
  count: number,
  initialData?: Partial<Question>[]
): Question[] {
  return Array.from({ length: count }, (_, i) => {
    const initial = initialData?.[i]
    if (initial?.text) {
      return {
        ...createEmptyQuestion(),
        ...initial,
        // If there's text but no response, set status to response with a mock
        status: initial.response ? 'response' : 'response',
        response: initial.response ?? `This is a pre-filled response for: "${initial.text}"`,
        confidence: initial.confidence ?? 0.85,
      } as Question
    }
    return createEmptyQuestion()
  })
}

// ============================================================================
// QUESTIONS LIST
// ============================================================================

const DEFAULT_QUESTION_COUNT = 5

export function QuestionsList({
  questionCount = DEFAULT_QUESTION_COUNT,
  initialQuestions,
  layout,
  onChange,
  className,
}: QuestionsListProps) {
  const [questions, setQuestions] = useState<Question[]>(() =>
    createInitialQuestions(questionCount, initialQuestions)
  )
  const isFirstRender = useRef(true)

  // Notify parent of changes (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onChange?.(questions)
  }, [questions, onChange])

  const handleQuestionUpdate = useCallback(
    (id: string, updated: Question) => {
      setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)))
    },
    []
  )

  const handleQuestionDelete = useCallback(
    (id: string) => {
      // Reset the question to empty state instead of removing
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? createEmptyQuestion() : q))
      )
    },
    []
  )

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {questions.map((question, index) => (
        <QuestionFlowCard
          key={question.id}
          question={question}
          layout={layout}
          onUpdate={(updated) => handleQuestionUpdate(question.id, updated)}
          onDelete={() => handleQuestionDelete(question.id)}
        />
      ))}
    </div>
  )
}
