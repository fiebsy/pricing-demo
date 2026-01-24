/**
 * QuestionsListWithImprove
 *
 * Enhanced QuestionsList that supports the improve answer flow.
 * When user clicks "Improve answer" button, calls the onImproveAnswer callback.
 */

'use client'

import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'

import { QuestionFlowCardWithImprove } from './QuestionFlowCardWithImprove'
import type { Question, QuestionFlowLayout } from '../../playground/question-command-menu-v4-flow/types'

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
        status: 'response' as const,
        response: initial.response ?? `This is a pre-filled response for: "${initial.text}"`,
        confidence: initial.confidence ?? 0.85,
      } as Question
    }
    return createEmptyQuestion()
  })
}

// ============================================================================
// TYPES
// ============================================================================

export interface QuestionsListWithImproveProps {
  /** Number of question slots (default: 5) */
  questionCount?: number
  /** Initial questions to populate */
  initialQuestions?: Partial<Question>[]
  /** Layout configuration passed to each card */
  layout?: QuestionFlowLayout
  /** Callback when questions change */
  onChange?: (questions: Question[]) => void
  /** Callback when "Improve answer" is clicked */
  onImproveAnswer?: (questionId: string) => void
  /** Register the regenerate function for external triggering */
  onRegisterRegenerate?: (fn: (questionId: string) => void) => void
  /** Set of question IDs that are currently regenerating */
  regeneratingIds?: Set<string>
  /** Optional className */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const DEFAULT_QUESTION_COUNT = 5

export function QuestionsListWithImprove({
  questionCount = DEFAULT_QUESTION_COUNT,
  initialQuestions,
  layout,
  onChange,
  onImproveAnswer,
  onRegisterRegenerate,
  regeneratingIds = new Set(),
  className,
}: QuestionsListWithImproveProps) {
  const [questions, setQuestions] = useState<Question[]>(() =>
    createInitialQuestions(questionCount, initialQuestions)
  )
  const isFirstRender = useRef(true)

  // Store regenerate callbacks for each question
  const regenerateCallbacks = useRef<Map<string, () => void>>(new Map())

  // Notify parent of changes (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onChange?.(questions)
  }, [questions, onChange])

  // Register the regenerate function with parent
  useEffect(() => {
    if (onRegisterRegenerate) {
      onRegisterRegenerate((questionId: string) => {
        const callback = regenerateCallbacks.current.get(questionId)
        if (callback) {
          callback()
        }
      })
    }
  }, [onRegisterRegenerate])

  const handleQuestionUpdate = useCallback(
    (id: string, updated: Question) => {
      setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)))
    },
    []
  )

  const handleQuestionDelete = useCallback(
    (id: string) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? createEmptyQuestion() : q))
      )
    },
    []
  )

  const handleRegisterRegenerate = useCallback(
    (questionId: string, regenerateFn: () => void) => {
      regenerateCallbacks.current.set(questionId, regenerateFn)
    },
    []
  )

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {questions.map((question) => (
        <QuestionFlowCardWithImprove
          key={question.id}
          question={question}
          layout={layout}
          onUpdate={(updated) => handleQuestionUpdate(question.id, updated)}
          onDelete={() => handleQuestionDelete(question.id)}
          onImproveAnswer={() => onImproveAnswer?.(question.id)}
          onRegisterRegenerate={(fn) => handleRegisterRegenerate(question.id, fn)}
          isRegenerating={regeneratingIds.has(question.id)}
        />
      ))}
    </div>
  )
}
