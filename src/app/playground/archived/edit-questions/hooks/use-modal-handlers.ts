/**
 * Edit Questions Playground - Modal Handlers Hook
 *
 * Consolidates all modal event handlers for cleaner component code.
 * Handles question selection, adding, updating, regeneration, revision, and deletion.
 *
 * @module playground/edit-questions/hooks
 */

'use client'

import { useCallback, useRef, useEffect } from 'react'
import type { Question, PlaygroundConfig } from '../types'
import type { UseModalStateReturn } from './use-modal-state'
import type { UseProcessingSimulationReturn } from './use-processing-simulation'
import type { useQuestionsService } from '../services'

// =============================================================================
// TYPES
// =============================================================================

export interface UseModalHandlersOptions {
  /** Modal state instance */
  modal: UseModalStateReturn
  /** Questions service instance */
  questionsService: ReturnType<typeof useQuestionsService>
  /** Current questions array */
  questions: Question[]
  /** Playground config for simulation settings */
  config: PlaygroundConfig
  /** Processing simulation instance */
  processing: UseProcessingSimulationReturn
}

export interface UseModalHandlersReturn {
  /** Handle selecting a question from the list */
  handleSelectQuestion: (questionId: string) => Promise<void>
  /** Handle adding a new question */
  handleAddQuestion: (questionText: string) => Promise<void>
  /** Handle updating question text */
  handleUpdateQuestionText: (questionId: string, text: string) => Promise<void>
  /** Handle regenerating an answer */
  handleRegenerate: () => Promise<void>
  /** Handle opening the revision flow */
  handleRevise: () => void
  /** Handle deleting the selected question */
  handleDeleteQuestion: () => void
  /** Handle revision flow completion */
  handleRevisionComplete: () => void
  /** Handle modal open/close changes */
  handleOpenChange: (newOpen: boolean) => void
  /** Ref for tracking pending question text (for timing issues) */
  pendingQuestionTextRef: React.MutableRefObject<string | null>
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook that provides all modal event handlers.
 *
 * Usage:
 * ```tsx
 * const handlers = useModalHandlers({
 *   modal,
 *   questionsService,
 *   questions,
 *   config,
 *   processing,
 * })
 *
 * // Use handlers in components
 * <QuestionRow onClick={() => handlers.handleSelectQuestion(q.id)} />
 * <QuestionInput onAddQuestion={handlers.handleAddQuestion} />
 * ```
 */
export function useModalHandlers({
  modal,
  questionsService,
  questions,
  config,
  processing,
}: UseModalHandlersOptions): UseModalHandlersReturn {
  // Track pending question text for timing issues between add and state update
  const pendingQuestionTextRef = useRef<string | null>(null)

  // Get selected question from state
  const selectedQuestion = questions.find((q) => q.id === modal.state.selectedQuestionId)

  // Clear pending text once the question is available in the array
  useEffect(() => {
    if (selectedQuestion && pendingQuestionTextRef.current) {
      pendingQuestionTextRef.current = null
    }
  }, [selectedQuestion])

  /**
   * Handle question selection - generates answer if needed
   */
  const handleSelectQuestion = useCallback(
    async (questionId: string) => {
      modal.selectQuestion(questionId)
      const question = questions.find((q) => q.id === questionId)

      if (!question) {
        modal.setAnswerState('idle')
        return
      }

      // If already has an answer, show it
      if (question.answer) {
        modal.setAnswerState(question.status === 'orphaned' ? 'orphaned' : 'success')
        return
      }

      // Generate an answer
      modal.setAnswerState('loading')
      const result = await questionsService.generateAnswer({
        questionId,
        responseType: config.responseType,
        simulateDelay: config.simulateDelay,
        delayMs: config.delayMs,
      })
      modal.setAnswerState(result.isOrphaned ? 'orphaned' : 'success')
    },
    [questions, config, modal, questionsService]
  )

  /**
   * Handle adding a new question - immediately generates answer
   */
  const handleAddQuestion = useCallback(
    async (questionText: string) => {
      // Store the text in ref for timing issues
      pendingQuestionTextRef.current = questionText

      const newQuestion = questionsService.addQuestion(questionText)

      // Select the new question and start generating answer
      modal.selectQuestion(newQuestion.id)
      modal.setAnswerState('loading')

      // Generate answer for the new question
      const result = await questionsService.generateAnswer({
        questionId: newQuestion.id,
        responseType: config.responseType,
        simulateDelay: config.simulateDelay,
        delayMs: config.delayMs,
      })

      modal.setAnswerState(result.isOrphaned ? 'orphaned' : 'success')
    },
    [questionsService, modal, config]
  )

  /**
   * Handle updating question text - regenerates answer
   */
  const handleUpdateQuestionText = useCallback(
    async (questionId: string, text: string) => {
      questionsService.updateQuestionText(questionId, text)

      // Regenerate answer after updating question
      modal.setAnswerState('loading')
      const result = await questionsService.regenerateAnswer({
        questionId,
        responseType: config.responseType,
        simulateDelay: config.simulateDelay,
        delayMs: config.delayMs,
      })
      modal.setAnswerState(result.isOrphaned ? 'orphaned' : 'success')
    },
    [questionsService, modal, config]
  )

  /**
   * Handle regenerating an answer
   */
  const handleRegenerate = useCallback(async () => {
    if (!modal.state.selectedQuestionId) return

    modal.setToolbarStatus('processing')
    modal.setAnswerState('loading')

    const result = await questionsService.regenerateAnswer({
      questionId: modal.state.selectedQuestionId,
      responseType: config.responseType,
      simulateDelay: config.simulateDelay,
      delayMs: config.delayMs,
    })

    modal.setAnswerState(result.isOrphaned ? 'orphaned' : 'success')
    modal.setToolbarStatus('success')
    modal.addNotification('Answer regenerated')
    setTimeout(() => modal.clearToolbarStatus(), 2000)
  }, [modal, config, questionsService])

  /**
   * Handle opening revision flow - always shows options first
   */
  const handleRevise = useCallback(() => {
    // Open revision flow without a specific type to show the selector
    modal.openRevisionFlow(null)
  }, [modal])

  /**
   * Handle deleting the selected question
   */
  const handleDeleteQuestion = useCallback(() => {
    if (!modal.state.selectedQuestionId) return

    questionsService.deleteQuestion(modal.state.selectedQuestionId)
    modal.deselectQuestion()
    modal.addNotification('Question deleted')
  }, [modal, questionsService])

  /**
   * Handle revision flow completion
   */
  const handleRevisionComplete = useCallback(() => {
    modal.closeRevisionFlow()
    processing.start()
  }, [modal, processing])

  /**
   * Handle modal close
   */
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        modal.reset()
        processing.stop()
      }
    },
    [modal, processing]
  )

  return {
    handleSelectQuestion,
    handleAddQuestion,
    handleUpdateQuestionText,
    handleRegenerate,
    handleRevise,
    handleDeleteQuestion,
    handleRevisionComplete,
    handleOpenChange,
    pendingQuestionTextRef,
  }
}
