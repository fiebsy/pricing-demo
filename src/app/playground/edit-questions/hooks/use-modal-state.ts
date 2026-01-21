/**
 * Edit Questions Playground - Modal State Hook
 *
 * Comprehensive state machine for managing all modal states and transitions.
 * Consolidates modal visibility, question selection, answer generation,
 * revision flows, processing, and notifications into a single source of truth.
 *
 * @module playground/edit-questions/hooks
 */

'use client'

import { useReducer, useCallback, useMemo } from 'react'
import type {
  RevisionFlowType,
  AnswerState,
  ToolbarStatus,
  Notification,
  ProcessingState,
} from '../types'

// =============================================================================
// STATE TYPES
// =============================================================================

/** High-level modal view state */
export type ModalView = 'closed' | 'main' | 'revision-flow' | 'processing'

/** Full modal state */
export interface ModalFullState {
  // View state
  view: ModalView

  // Question state
  selectedQuestionId: string | null
  answerState: AnswerState
  isAddingNewQuestion: boolean

  // Revision flow state
  activeRevisionFlow: RevisionFlowType | null

  // Processing state
  isProcessing: boolean
  processingProgress: number
  processingState: ProcessingState

  // Toolbar state
  toolbarStatus: ToolbarStatus
  toolbarMessage: string | null

  // Notifications
  notifications: Notification[]
}

// =============================================================================
// ACTIONS
// =============================================================================

export type ModalAction =
  // View actions
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }

  // Question actions
  | { type: 'SELECT_QUESTION'; questionId: string }
  | { type: 'DESELECT_QUESTION' }
  | { type: 'SET_ANSWER_STATE'; answerState: AnswerState }
  | { type: 'SET_ADDING_NEW_QUESTION'; isAdding: boolean }

  // Revision flow actions
  | { type: 'OPEN_REVISION_FLOW'; flowType: RevisionFlowType | null }
  | { type: 'CLOSE_REVISION_FLOW' }

  // Processing actions
  | { type: 'START_PROCESSING' }
  | { type: 'UPDATE_PROCESSING_PROGRESS'; progress: number; state?: ProcessingState }
  | { type: 'COMPLETE_PROCESSING' }

  // Toolbar actions
  | { type: 'SET_TOOLBAR_STATUS'; status: ToolbarStatus; message?: string }

  // Notification actions
  | { type: 'ADD_NOTIFICATION'; message: string }
  | { type: 'CLEAR_NOTIFICATIONS' }

  // Reset action
  | { type: 'RESET' }

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: ModalFullState = {
  view: 'closed',
  selectedQuestionId: null,
  answerState: 'idle',
  isAddingNewQuestion: false,
  activeRevisionFlow: null,
  isProcessing: false,
  processingProgress: 0,
  processingState: 'idle',
  toolbarStatus: 'idle',
  toolbarMessage: null,
  notifications: [],
}

// =============================================================================
// HELPERS
// =============================================================================

function generateId(): string {
  return `n_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// =============================================================================
// REDUCER
// =============================================================================

function modalReducer(state: ModalFullState, action: ModalAction): ModalFullState {
  switch (action.type) {
    // -------------------------------------------------------------------------
    // View actions
    // -------------------------------------------------------------------------
    case 'OPEN_MODAL':
      return {
        ...state,
        view: 'main',
      }

    case 'CLOSE_MODAL':
      return initialState

    // -------------------------------------------------------------------------
    // Question actions
    // -------------------------------------------------------------------------
    case 'SELECT_QUESTION':
      return {
        ...state,
        selectedQuestionId: action.questionId,
        isAddingNewQuestion: false,
      }

    case 'DESELECT_QUESTION':
      return {
        ...state,
        selectedQuestionId: null,
        answerState: 'idle',
      }

    case 'SET_ANSWER_STATE':
      return {
        ...state,
        answerState: action.answerState,
      }

    case 'SET_ADDING_NEW_QUESTION':
      return {
        ...state,
        isAddingNewQuestion: action.isAdding,
        selectedQuestionId: action.isAdding ? null : state.selectedQuestionId,
      }

    // -------------------------------------------------------------------------
    // Revision flow actions
    // -------------------------------------------------------------------------
    case 'OPEN_REVISION_FLOW':
      return {
        ...state,
        view: 'revision-flow',
        activeRevisionFlow: action.flowType,
      }

    case 'CLOSE_REVISION_FLOW':
      return {
        ...state,
        view: 'main',
        activeRevisionFlow: null,
      }

    // -------------------------------------------------------------------------
    // Processing actions
    // -------------------------------------------------------------------------
    case 'START_PROCESSING':
      return {
        ...state,
        view: 'processing',
        isProcessing: true,
        processingProgress: 0,
        processingState: 'loading',
        activeRevisionFlow: null,
      }

    case 'UPDATE_PROCESSING_PROGRESS':
      return {
        ...state,
        processingProgress: action.progress,
        processingState: action.state ?? state.processingState,
      }

    case 'COMPLETE_PROCESSING':
      return {
        ...state,
        view: 'main',
        isProcessing: false,
        processingProgress: 100,
        processingState: 'complete',
        toolbarStatus: 'success',
      }

    // -------------------------------------------------------------------------
    // Toolbar actions
    // -------------------------------------------------------------------------
    case 'SET_TOOLBAR_STATUS':
      return {
        ...state,
        toolbarStatus: action.status,
        toolbarMessage: action.message ?? null,
      }

    // -------------------------------------------------------------------------
    // Notification actions
    // -------------------------------------------------------------------------
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: generateId(),
            message: action.message,
            timestamp: new Date(),
          },
        ],
      }

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      }

    // -------------------------------------------------------------------------
    // Reset
    // -------------------------------------------------------------------------
    case 'RESET':
      return initialState

    default:
      return state
  }
}

// =============================================================================
// HOOK RETURN TYPE
// =============================================================================

export interface UseModalStateReturn {
  // Raw state
  state: ModalFullState

  // Derived booleans
  isOpen: boolean
  isRevisionFlowOpen: boolean
  isProcessing: boolean
  hasNotifications: boolean

  // View actions
  openModal: () => void
  closeModal: () => void

  // Question actions
  selectQuestion: (questionId: string) => void
  deselectQuestion: () => void
  setAnswerState: (answerState: AnswerState) => void
  setAddingNewQuestion: (isAdding: boolean) => void

  // Revision flow actions
  openRevisionFlow: (flowType: RevisionFlowType | null) => void
  closeRevisionFlow: () => void

  // Processing actions
  startProcessing: () => void
  updateProcessingProgress: (progress: number, state?: ProcessingState) => void
  completeProcessing: () => void

  // Toolbar actions
  setToolbarStatus: (status: ToolbarStatus, message?: string) => void
  clearToolbarStatus: () => void

  // Notification actions
  addNotification: (message: string) => void
  clearNotifications: () => void

  // Reset
  reset: () => void
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Comprehensive hook for managing all modal state.
 *
 * Usage:
 * ```tsx
 * const modal = useModalState()
 *
 * // Open/close
 * modal.openModal()
 * modal.closeModal()
 *
 * // Question selection
 * modal.selectQuestion('q1')
 * modal.setAnswerState('loading')
 * modal.setAnswerState('success')
 *
 * // Revision flows
 * modal.openRevisionFlow('quick-fix')
 * modal.closeRevisionFlow()
 *
 * // Processing
 * modal.startProcessing()
 * modal.updateProcessingProgress(50, 'analyzing')
 * modal.completeProcessing()
 *
 * // Notifications
 * modal.addNotification('Answer updated')
 * modal.clearNotifications()
 * ```
 */
export function useModalState(): UseModalStateReturn {
  const [state, dispatch] = useReducer(modalReducer, initialState)

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------
  const isOpen = state.view !== 'closed'
  const isRevisionFlowOpen = state.view === 'revision-flow'
  const isProcessing = state.isProcessing
  const hasNotifications = state.notifications.length > 0

  // ---------------------------------------------------------------------------
  // View actions
  // ---------------------------------------------------------------------------
  const openModal = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL' })
  }, [])

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' })
  }, [])

  // ---------------------------------------------------------------------------
  // Question actions
  // ---------------------------------------------------------------------------
  const selectQuestion = useCallback((questionId: string) => {
    dispatch({ type: 'SELECT_QUESTION', questionId })
  }, [])

  const deselectQuestion = useCallback(() => {
    dispatch({ type: 'DESELECT_QUESTION' })
  }, [])

  const setAnswerState = useCallback((answerState: AnswerState) => {
    dispatch({ type: 'SET_ANSWER_STATE', answerState })
  }, [])

  const setAddingNewQuestion = useCallback((isAdding: boolean) => {
    dispatch({ type: 'SET_ADDING_NEW_QUESTION', isAdding })
  }, [])

  // ---------------------------------------------------------------------------
  // Revision flow actions
  // ---------------------------------------------------------------------------
  const openRevisionFlow = useCallback((flowType: RevisionFlowType | null) => {
    dispatch({ type: 'OPEN_REVISION_FLOW', flowType })
  }, [])

  const closeRevisionFlow = useCallback(() => {
    dispatch({ type: 'CLOSE_REVISION_FLOW' })
  }, [])

  // ---------------------------------------------------------------------------
  // Processing actions
  // ---------------------------------------------------------------------------
  const startProcessing = useCallback(() => {
    dispatch({ type: 'START_PROCESSING' })
  }, [])

  const updateProcessingProgress = useCallback(
    (progress: number, processingState?: ProcessingState) => {
      dispatch({ type: 'UPDATE_PROCESSING_PROGRESS', progress, state: processingState })
    },
    []
  )

  const completeProcessing = useCallback(() => {
    dispatch({ type: 'COMPLETE_PROCESSING' })
  }, [])

  // ---------------------------------------------------------------------------
  // Toolbar actions
  // ---------------------------------------------------------------------------
  const setToolbarStatus = useCallback((status: ToolbarStatus, message?: string) => {
    dispatch({ type: 'SET_TOOLBAR_STATUS', status, message })
  }, [])

  const clearToolbarStatus = useCallback(() => {
    dispatch({ type: 'SET_TOOLBAR_STATUS', status: 'idle' })
  }, [])

  // ---------------------------------------------------------------------------
  // Notification actions
  // ---------------------------------------------------------------------------
  const addNotification = useCallback((message: string) => {
    dispatch({ type: 'ADD_NOTIFICATION', message })
  }, [])

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  }, [])

  // ---------------------------------------------------------------------------
  // Reset
  // ---------------------------------------------------------------------------
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------
  return useMemo(
    () => ({
      state,
      isOpen,
      isRevisionFlowOpen,
      isProcessing,
      hasNotifications,
      openModal,
      closeModal,
      selectQuestion,
      deselectQuestion,
      setAnswerState,
      setAddingNewQuestion,
      openRevisionFlow,
      closeRevisionFlow,
      startProcessing,
      updateProcessingProgress,
      completeProcessing,
      setToolbarStatus,
      clearToolbarStatus,
      addNotification,
      clearNotifications,
      reset,
    }),
    [
      state,
      isOpen,
      isRevisionFlowOpen,
      isProcessing,
      hasNotifications,
      openModal,
      closeModal,
      selectQuestion,
      deselectQuestion,
      setAnswerState,
      setAddingNewQuestion,
      openRevisionFlow,
      closeRevisionFlow,
      startProcessing,
      updateProcessingProgress,
      completeProcessing,
      setToolbarStatus,
      clearToolbarStatus,
      addNotification,
      clearNotifications,
      reset,
    ]
  )
}
