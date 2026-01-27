/**
 * Edit Questions Playground - Questions Service
 *
 * Handles all question-related operations:
 * - CRUD operations for questions
 * - Answer generation simulation
 * - Status management
 *
 * This service abstracts the data layer, making it easy to swap
 * mock data for real API calls in the future.
 *
 * @module playground/edit-questions/services
 */

import type { Question, Answer, PlaygroundConfig, SimulatedResponseType } from '../types'
import { RESPONSE_PRESETS } from '../constants'

// =============================================================================
// TYPES
// =============================================================================

export interface GenerateAnswerOptions {
  questionId: string
  responseType: SimulatedResponseType
  simulateDelay: boolean
  delayMs: number
}

export interface GenerateAnswerResult {
  answer: Answer
  isOrphaned: boolean
}

export interface QuestionsServiceConfig {
  onQuestionsChange: (questions: Question[]) => void
  getQuestions: () => Question[]
}

// =============================================================================
// HELPERS
// =============================================================================

function generateId(): string {
  return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// =============================================================================
// SERVICE FACTORY
// =============================================================================

/**
 * Creates a questions service instance.
 *
 * The service operates on questions through callbacks, allowing the
 * parent component to maintain ownership of the state.
 *
 * Usage:
 * ```tsx
 * const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS)
 *
 * const questionsService = useMemo(
 *   () => createQuestionsService({
 *     onQuestionsChange: setQuestions,
 *     getQuestions: () => questions,
 *   }),
 *   [questions]
 * )
 *
 * // Add a question
 * const newQuestion = questionsService.addQuestion('What is your approach?')
 *
 * // Generate an answer
 * const result = await questionsService.generateAnswer({
 *   questionId: newQuestion.id,
 *   responseType: 'good',
 *   simulateDelay: true,
 *   delayMs: 1500,
 * })
 * ```
 */
export function createQuestionsService(config: QuestionsServiceConfig) {
  const { onQuestionsChange, getQuestions } = config

  // ---------------------------------------------------------------------------
  // READ OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * Get a question by ID.
   */
  function getQuestion(questionId: string): Question | undefined {
    return getQuestions().find((q) => q.id === questionId)
  }

  /**
   * Get questions by status.
   */
  function getQuestionsByStatus(status: Question['status']): Question[] {
    return getQuestions().filter((q) => q.status === status)
  }

  /**
   * Get question stats.
   */
  function getStats() {
    const questions = getQuestions()
    return {
      total: questions.length,
      answered: questions.filter((q) => q.status === 'answered').length,
      orphaned: questions.filter((q) => q.status === 'orphaned').length,
      pending: questions.filter((q) => q.status === 'pending').length,
    }
  }

  // ---------------------------------------------------------------------------
  // WRITE OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * Add a new question.
   */
  function addQuestion(text: string): Question {
    const newQuestion: Question = {
      id: generateId(),
      text,
      status: 'pending',
    }
    onQuestionsChange([...getQuestions(), newQuestion])
    return newQuestion
  }

  /**
   * Update a question's text.
   */
  function updateQuestionText(questionId: string, text: string): void {
    onQuestionsChange(
      getQuestions().map((q) => (q.id === questionId ? { ...q, text } : q))
    )
  }

  /**
   * Delete a question.
   */
  function deleteQuestion(questionId: string): void {
    onQuestionsChange(getQuestions().filter((q) => q.id !== questionId))
  }

  /**
   * Update a question's answer and status.
   */
  function updateQuestionAnswer(questionId: string, answer: Answer): void {
    const isOrphaned = answer.confidence === 0
    onQuestionsChange(
      getQuestions().map((q) =>
        q.id === questionId
          ? {
              ...q,
              answer,
              status: isOrphaned ? 'orphaned' : 'answered',
            }
          : q
      )
    )
  }

  /**
   * Clear a question's answer and reset to pending.
   */
  function clearQuestionAnswer(questionId: string): void {
    onQuestionsChange(
      getQuestions().map((q) =>
        q.id === questionId
          ? {
              ...q,
              answer: undefined,
              status: 'pending',
            }
          : q
      )
    )
  }

  /**
   * Reset all questions to initial state.
   */
  function resetQuestions(initialQuestions: Question[]): void {
    onQuestionsChange(initialQuestions)
  }

  // ---------------------------------------------------------------------------
  // ANSWER GENERATION
  // ---------------------------------------------------------------------------

  /**
   * Generate an answer for a question.
   *
   * Returns a promise that resolves with the generated answer.
   * If simulateDelay is true, the promise resolves after delayMs.
   */
  function generateAnswer(options: GenerateAnswerOptions): Promise<GenerateAnswerResult> {
    const { questionId, responseType, simulateDelay, delayMs } = options
    const response = RESPONSE_PRESETS[responseType]

    const answer: Answer = {
      id: generateId(),
      text: response.text,
      confidence: response.confidence,
      generatedAt: new Date(),
    }

    const result: GenerateAnswerResult = {
      answer,
      isOrphaned: response.isOrphaned,
    }

    if (simulateDelay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          updateQuestionAnswer(questionId, answer)
          resolve(result)
        }, delayMs)
      })
    }

    updateQuestionAnswer(questionId, answer)
    return Promise.resolve(result)
  }

  /**
   * Regenerate an answer for a question.
   *
   * This is essentially the same as generateAnswer, but semantically
   * indicates we're replacing an existing answer.
   */
  function regenerateAnswer(options: GenerateAnswerOptions): Promise<GenerateAnswerResult> {
    return generateAnswer(options)
  }

  // ---------------------------------------------------------------------------
  // RETURN SERVICE
  // ---------------------------------------------------------------------------

  return {
    // Read
    getQuestion,
    getQuestionsByStatus,
    getStats,

    // Write
    addQuestion,
    updateQuestionText,
    deleteQuestion,
    updateQuestionAnswer,
    clearQuestionAnswer,
    resetQuestions,

    // Answer generation
    generateAnswer,
    regenerateAnswer,
  }
}

// =============================================================================
// HOOK FOR CONVENIENCE
// =============================================================================

import { useMemo, useCallback, useRef } from 'react'

export interface UseQuestionsServiceOptions {
  questions: Question[]
  onQuestionsChange: (questions: Question[]) => void
}

/**
 * Hook that creates a memoized questions service.
 *
 * Usage:
 * ```tsx
 * const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS)
 * const questionsService = useQuestionsService({ questions, onQuestionsChange: setQuestions })
 * ```
 */
export function useQuestionsService(options: UseQuestionsServiceOptions) {
  const { questions, onQuestionsChange } = options

  // Use a stable ref that always points to current questions
  // This prevents stale closures when async operations (like setTimeout) complete
  const questionsRef = useRef(questions)
  questionsRef.current = questions

  // getQuestions has no dependencies - it always returns current questions via ref
  const getQuestions = useCallback(() => questionsRef.current, [])

  // Service only recreated when onQuestionsChange changes (which should be stable)
  return useMemo(
    () =>
      createQuestionsService({
        onQuestionsChange,
        getQuestions,
      }),
    [onQuestionsChange, getQuestions]
  )
}
