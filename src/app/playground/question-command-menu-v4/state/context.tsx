/**
 * Question Command Menu V4 - Context Provider
 *
 * Provides unified state and config to all child components.
 * Combines the reducer pattern from edit-questions with V3's config context.
 */

'use client'

import * as React from 'react'
import { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import type {
  TriggerFullState,
  TriggerMode,
  QuestionCommandMenuV4Config,
  ContentInstance,
  SlotPosition,
  ContentTypeId,
  UnifiedSlotConfig,
  FlowState,
  FlowStateId,
} from '../types'
import { triggerReducer } from './reducer'
import { INITIAL_STATE } from './initial'

// =============================================================================
// CONTEXT TYPE
// =============================================================================

export interface V4ContextValue {
  // Config
  config: QuestionCommandMenuV4Config

  // State (raw)
  state: TriggerFullState

  // Flow state
  flowState: FlowState
  flowStateId: FlowStateId
  storedQuestion: string | null
  storedResponse: string | null

  // Derived state
  isExpanded: boolean
  isEditing: boolean
  hasSavedValue: boolean
  isInputActive: boolean

  // Config helpers
  getContentForSlot: (position: SlotPosition) => ContentInstance | undefined
  getSlotConfig: (position: SlotPosition) => UnifiedSlotConfig
  hasContentForSlot: (position: SlotPosition) => boolean
  getContentByType: (type: ContentTypeId) => ContentInstance[]

  // State actions
  clickTrigger: () => void
  focusInput: () => void
  blurInput: () => void
  escape: () => void

  setInput: (value: string) => void
  save: (value: string) => void
  clearValue: () => void

  startSaving: () => void
  saveComplete: () => void
  resetSaveStatus: () => void

  setSearch: (value: string) => void
  setTab: (value: string) => void

  expand: () => void
  collapse: () => void
  toggleExpanded: () => void

  openTopSlot: () => void
  closeTopSlot: () => void
  toggleTopSlot: () => void
  openBottomSlot: () => void
  closeBottomSlot: () => void
  toggleBottomSlot: () => void

  setMode: (mode: TriggerMode) => void
  reset: () => void

  // Flow actions
  startAdding: () => void
  submitQuestion: () => void
  receiveResponse: (response: string) => void
  startEditing: () => void
  cancelEditing: () => void
  deleteQuestion: () => void
}

// =============================================================================
// CONTEXT
// =============================================================================

const V4Context = createContext<V4ContextValue | null>(null)

// =============================================================================
// HOOK
// =============================================================================

export function useV4Context(): V4ContextValue {
  const context = useContext(V4Context)
  if (!context) {
    throw new Error('useV4Context must be used within V4Provider')
  }
  return context
}

// =============================================================================
// PROVIDER
// =============================================================================

interface V4ProviderProps {
  config: QuestionCommandMenuV4Config
  initialMode?: TriggerMode
  children: React.ReactNode
}

export function V4Provider({ config, initialMode, children }: V4ProviderProps) {
  // Initialize state with optional mode override
  const initialState = useMemo(() => {
    if (initialMode) {
      return { ...INITIAL_STATE, mode: initialMode }
    }
    return { ...INITIAL_STATE, mode: config.defaultMode }
  }, [initialMode, config.defaultMode])

  const [state, dispatch] = useReducer(triggerReducer, initialState)

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------
  const isExpanded = state.expanded
  const isEditing = state.editing
  const hasSavedValue = state.savedValue !== null
  const isInputActive = state.expanded && (state.mode === 'input' || state.editing)

  // Flow state
  const flowState = state.flowState
  const flowStateId = state.flowState.type
  const storedQuestion = state.storedQuestion
  const storedResponse = state.storedResponse

  // ---------------------------------------------------------------------------
  // Config helpers
  // ---------------------------------------------------------------------------
  const getContentForSlot = useCallback(
    (position: SlotPosition): ContentInstance | undefined => {
      return config.content.find((c) => c.slot === position)
    },
    [config.content]
  )

  const getSlotConfig = useCallback(
    (position: SlotPosition): UnifiedSlotConfig => {
      return config.slots[position]
    },
    [config.slots]
  )

  const hasContentForSlot = useCallback(
    (position: SlotPosition): boolean => {
      return config.content.some((c) => c.slot === position)
    },
    [config.content]
  )

  const getContentByType = useCallback(
    (type: ContentTypeId): ContentInstance[] => {
      return config.content.filter((c) => c.type === type)
    },
    [config.content]
  )

  // ---------------------------------------------------------------------------
  // State actions
  // ---------------------------------------------------------------------------
  const clickTrigger = useCallback(() => {
    dispatch({ type: 'CLICK_TRIGGER' })
  }, [])

  const focusInput = useCallback(() => {
    dispatch({ type: 'FOCUS_INPUT' })
  }, [])

  const blurInput = useCallback(() => {
    dispatch({ type: 'BLUR_INPUT' })
  }, [])

  const escape = useCallback(() => {
    dispatch({ type: 'ESCAPE' })
  }, [])

  const setInput = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT', value })
  }, [])

  const save = useCallback((value: string) => {
    dispatch({ type: 'SAVE', value })
  }, [])

  const clearValue = useCallback(() => {
    dispatch({ type: 'CLEAR_VALUE' })
  }, [])

  const startSaving = useCallback(() => {
    dispatch({ type: 'START_SAVING' })
  }, [])

  const saveComplete = useCallback(() => {
    dispatch({ type: 'SAVE_COMPLETE' })
  }, [])

  const resetSaveStatus = useCallback(() => {
    dispatch({ type: 'RESET_SAVE_STATUS' })
  }, [])

  const setSearch = useCallback((value: string) => {
    dispatch({ type: 'SET_SEARCH', value })
  }, [])

  const setTab = useCallback((value: string) => {
    dispatch({ type: 'SET_TAB', value })
  }, [])

  const expand = useCallback(() => {
    dispatch({ type: 'EXPAND' })
  }, [])

  const collapse = useCallback(() => {
    dispatch({ type: 'COLLAPSE' })
  }, [])

  const toggleExpanded = useCallback(() => {
    dispatch({ type: 'TOGGLE_EXPANDED' })
  }, [])

  const openTopSlot = useCallback(() => {
    dispatch({ type: 'OPEN_TOP_SLOT' })
  }, [])

  const closeTopSlot = useCallback(() => {
    dispatch({ type: 'CLOSE_TOP_SLOT' })
  }, [])

  const toggleTopSlot = useCallback(() => {
    dispatch({ type: 'TOGGLE_TOP_SLOT' })
  }, [])

  const openBottomSlot = useCallback(() => {
    dispatch({ type: 'OPEN_BOTTOM_SLOT' })
  }, [])

  const closeBottomSlot = useCallback(() => {
    dispatch({ type: 'CLOSE_BOTTOM_SLOT' })
  }, [])

  const toggleBottomSlot = useCallback(() => {
    dispatch({ type: 'TOGGLE_BOTTOM_SLOT' })
  }, [])

  const setMode = useCallback((mode: TriggerMode) => {
    dispatch({ type: 'SET_MODE', mode })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  // Flow actions
  const startAdding = useCallback(() => {
    dispatch({ type: 'START_ADDING' })
  }, [])

  const submitQuestion = useCallback(() => {
    dispatch({ type: 'SUBMIT_QUESTION' })
  }, [])

  const receiveResponse = useCallback((response: string) => {
    dispatch({ type: 'RECEIVE_RESPONSE', response })
  }, [])

  const startEditing = useCallback(() => {
    dispatch({ type: 'START_EDITING' })
  }, [])

  const cancelEditing = useCallback(() => {
    dispatch({ type: 'CANCEL_EDITING' })
  }, [])

  const deleteQuestion = useCallback(() => {
    dispatch({ type: 'DELETE_QUESTION' })
  }, [])

  // ---------------------------------------------------------------------------
  // Value
  // ---------------------------------------------------------------------------
  const value = useMemo<V4ContextValue>(
    () => ({
      // Config
      config,

      // State
      state,

      // Flow state
      flowState,
      flowStateId,
      storedQuestion,
      storedResponse,

      // Derived
      isExpanded,
      isEditing,
      hasSavedValue,
      isInputActive,

      // Config helpers
      getContentForSlot,
      getSlotConfig,
      hasContentForSlot,
      getContentByType,

      // Actions
      clickTrigger,
      focusInput,
      blurInput,
      escape,
      setInput,
      save,
      clearValue,
      startSaving,
      saveComplete,
      resetSaveStatus,
      setSearch,
      setTab,
      expand,
      collapse,
      toggleExpanded,
      openTopSlot,
      closeTopSlot,
      toggleTopSlot,
      openBottomSlot,
      closeBottomSlot,
      toggleBottomSlot,
      setMode,
      reset,

      // Flow actions
      startAdding,
      submitQuestion,
      receiveResponse,
      startEditing,
      cancelEditing,
      deleteQuestion,
    }),
    [
      config,
      state,
      flowState,
      flowStateId,
      storedQuestion,
      storedResponse,
      isExpanded,
      isEditing,
      hasSavedValue,
      isInputActive,
      getContentForSlot,
      getSlotConfig,
      hasContentForSlot,
      getContentByType,
      clickTrigger,
      focusInput,
      blurInput,
      escape,
      setInput,
      save,
      clearValue,
      startSaving,
      saveComplete,
      resetSaveStatus,
      setSearch,
      setTab,
      expand,
      collapse,
      toggleExpanded,
      openTopSlot,
      closeTopSlot,
      toggleTopSlot,
      openBottomSlot,
      closeBottomSlot,
      toggleBottomSlot,
      setMode,
      reset,
      startAdding,
      submitQuestion,
      receiveResponse,
      startEditing,
      cancelEditing,
      deleteQuestion,
    ]
  )

  return <V4Context.Provider value={value}>{children}</V4Context.Provider>
}
