/**
 * Expandable Input - Context Provider
 *
 * Provides unified state and config to all child components.
 */

'use client'

import * as React from 'react'
import { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import type {
  ExpandableInputState,
  TriggerMode,
  ExpandableInputConfig,
  ContentInstance,
  SlotPosition,
  ContentTypeId,
  UnifiedSlotConfig,
  FlowState,
  FlowStateId,
} from '../types'
import { expandableInputReducer } from './reducer'
import { INITIAL_STATE } from './initial'

// =============================================================================
// CONTEXT TYPE
// =============================================================================

export interface ExpandableInputContextValue {
  // Config
  config: ExpandableInputConfig

  // State (raw)
  state: ExpandableInputState

  // Flow state
  flowState: FlowState
  flowStateId: FlowStateId
  storedQuestion: string | null
  storedResponse: string | null
  storedConfidence: number | null

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
  submitQuestion: (confidence?: number) => void
  receiveResponse: (response: string) => void
  startEditing: () => void
  cancelEditing: () => void
  deleteQuestion: () => void
}

// Alias for backwards compatibility
export type V4ContextValue = ExpandableInputContextValue

// =============================================================================
// CONTEXT
// =============================================================================

const ExpandableInputContext = createContext<ExpandableInputContextValue | null>(null)

// =============================================================================
// HOOKS
// =============================================================================

export function useExpandableInput(): ExpandableInputContextValue {
  const context = useContext(ExpandableInputContext)
  if (!context) {
    throw new Error('useExpandableInput must be used within ExpandableInputProvider')
  }
  return context
}

// Alias for backwards compatibility
export const useV4Context = useExpandableInput

// =============================================================================
// PROVIDER
// =============================================================================

interface ExpandableInputProviderProps {
  config: ExpandableInputConfig
  initialMode?: TriggerMode
  children: React.ReactNode
}

export function ExpandableInputProvider({ config, initialMode, children }: ExpandableInputProviderProps) {
  // Initialize state with optional mode override
  const initialState = useMemo(() => {
    if (initialMode) {
      return { ...INITIAL_STATE, mode: initialMode }
    }
    return { ...INITIAL_STATE, mode: config.defaultMode }
  }, [initialMode, config.defaultMode])

  const [state, dispatch] = useReducer(expandableInputReducer, initialState)

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
  const storedConfidence = state.storedConfidence

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

  const submitQuestion = useCallback((confidence?: number) => {
    dispatch({ type: 'SUBMIT_QUESTION', confidence })
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
  const value = useMemo<ExpandableInputContextValue>(
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
      storedConfidence,

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
      storedConfidence,
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

  return <ExpandableInputContext.Provider value={value}>{children}</ExpandableInputContext.Provider>
}

// Alias for backwards compatibility
export const V4Provider = ExpandableInputProvider
