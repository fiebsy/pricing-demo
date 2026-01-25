/**
 * useQuestions Hook
 *
 * Manages question list state with add/edit/delete operations.
 * Enforces max 5 questions constraint.
 *
 * @module b/profile-v3/hooks
 */

import { useState, useCallback } from 'react'
import type { ProfileQuestion } from '../types'
import { PROFILE_QUESTIONS } from '../constants'

// =============================================================================
// CONSTANTS
// =============================================================================

export const MAX_QUESTIONS = 5

// =============================================================================
// HOOK
// =============================================================================

export function useQuestions() {
  const [questions, setQuestions] = useState<ProfileQuestion[]>(PROFILE_QUESTIONS)

  const addQuestion = useCallback((question: ProfileQuestion) => {
    setQuestions((prev) => {
      if (prev.length >= MAX_QUESTIONS) {
        console.warn('Cannot add question: maximum of 5 questions reached')
        return prev
      }
      return [...prev, question]
    })
  }, [])

  const updateQuestion = useCallback((updatedQuestion: ProfileQuestion) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    )
  }, [])

  const deleteQuestion = useCallback((questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }, [])

  const updateQuestionResponse = useCallback(
    (questionId: string, response: string, confidence?: number) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, aiResponse: response, aiConfidence: confidence ?? null }
            : q
        )
      )
    },
    []
  )

  const canAddQuestion = questions.length < MAX_QUESTIONS

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    updateQuestionResponse,
    canAddQuestion,
    questionCount: questions.length,
  }
}
