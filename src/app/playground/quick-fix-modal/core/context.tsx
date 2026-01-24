/**
 * QuickFixModal Context - Sheet stack state and modal configuration
 *
 * Provides centralized state management for the modal flow framework.
 *
 * @module playground/quick-fix-modal/core
 */

'use client'

import * as React from 'react'
import { createContext, useContext, useReducer, useCallback, useState } from 'react'
import type {
  QuickFixModalConfig,
  QuickFixModalContextValue,
  SheetStackState,
  SheetStackAction,
  SheetDefinition,
  FlowId,
} from '../config/types'
import { DEFAULT_QUICK_FIX_MODAL_CONFIG } from '../config/defaults'

// =============================================================================
// SHEET STACK REDUCER
// =============================================================================

const initialStackState: SheetStackState = {
  sheets: [],
  currentIndex: -1,
  isAnimating: false,
  direction: null,
}

function sheetStackReducer(
  state: SheetStackState,
  action: SheetStackAction
): SheetStackState {
  switch (action.type) {
    case 'PUSH':
      return {
        ...state,
        sheets: [...state.sheets, action.sheet],
        currentIndex: state.sheets.length,
        isAnimating: true,
        direction: 'push',
      }

    case 'POP':
      if (state.currentIndex <= 0) return state
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        isAnimating: true,
        direction: 'pop',
      }

    case 'RESET':
      return {
        sheets: [action.initialSheet],
        currentIndex: 0,
        isAnimating: false,
        direction: null,
      }

    case 'SET_ANIMATING':
      return {
        ...state,
        isAnimating: action.isAnimating,
        direction: action.isAnimating ? state.direction : null,
      }

    case 'NAVIGATE_TO': {
      const existingIndex = state.sheets.findIndex((s) => s.id === action.sheetId)
      if (existingIndex !== -1 && existingIndex !== state.currentIndex) {
        return {
          ...state,
          currentIndex: existingIndex,
          isAnimating: true,
          direction: existingIndex > state.currentIndex ? 'push' : 'pop',
        }
      }
      return state
    }

    default:
      return state
  }
}

// =============================================================================
// CONTEXT CREATION
// =============================================================================

const QuickFixModalContext = createContext<QuickFixModalContextValue | null>(null)

export interface QuickFixModalProviderProps {
  /** Initial configuration */
  config?: QuickFixModalConfig
  /** Initial sheet to display */
  initialSheet?: SheetDefinition
  /** Whether modal starts open */
  defaultOpen?: boolean
  /** Category name for Solution B (Profile V3) */
  categoryName?: string
  /** Callback when modal opens */
  onOpen?: () => void
  /** Callback when modal closes */
  onClose?: () => void
  /** Callback when flow completes */
  onComplete?: () => void
  /** Children */
  children: React.ReactNode
}

export function QuickFixModalProvider({
  config = DEFAULT_QUICK_FIX_MODAL_CONFIG,
  initialSheet,
  defaultOpen = false,
  categoryName: initialCategoryName = '',
  onOpen,
  onClose,
  onComplete,
  children,
}: QuickFixModalProviderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [categoryName, setCategoryName] = useState(initialCategoryName)
  const [stackState, dispatch] = useReducer(
    sheetStackReducer,
    initialSheet
      ? { sheets: [initialSheet], currentIndex: 0, isAnimating: false, direction: null }
      : initialStackState
  )

  // Open modal
  const openModal = useCallback(() => {
    setIsOpen(true)
    onOpen?.()
  }, [onOpen])

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  // Push sheet onto stack
  const pushSheet = useCallback((sheet: SheetDefinition) => {
    dispatch({ type: 'PUSH', sheet })
  }, [])

  // Pop sheet from stack
  const popSheet = useCallback(() => {
    dispatch({ type: 'POP' })
  }, [])

  // Reset stack with initial sheet
  const resetStack = useCallback((sheet: SheetDefinition) => {
    dispatch({ type: 'RESET', initialSheet: sheet })
  }, [])

  // Navigate to a specific flow by ID
  const navigateToFlow = useCallback((flowId: FlowId, props?: Record<string, unknown>) => {
    // This will be implemented to map flowId to the appropriate sheet
    // For now, dispatch a NAVIGATE_TO action
    dispatch({ type: 'NAVIGATE_TO', sheetId: flowId, props })
  }, [])

  // Handle completion
  const handleComplete = useCallback(() => {
    onComplete?.()
    // Default behavior based on integration config
  }, [onComplete])

  const value: QuickFixModalContextValue = {
    isOpen,
    config,
    stackState,
    pushSheet,
    popSheet,
    resetStack,
    navigateToFlow,
    openModal,
    closeModal,
    onComplete: handleComplete,
    categoryName,
    setCategoryName,
  }

  return (
    <QuickFixModalContext.Provider value={value}>
      {children}
    </QuickFixModalContext.Provider>
  )
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook to access the QuickFixModal context.
 * Must be used within a QuickFixModalProvider.
 */
export function useQuickFixModal(): QuickFixModalContextValue {
  const context = useContext(QuickFixModalContext)
  if (!context) {
    throw new Error('useQuickFixModal must be used within a QuickFixModalProvider')
  }
  return context
}

/**
 * Hook to access just the sheet stack state and actions.
 * Useful when only sheet navigation is needed.
 */
export function useSheetStack() {
  const { stackState, pushSheet, popSheet, resetStack } = useQuickFixModal()

  const setAnimating = useCallback((isAnimating: boolean) => {
    // This would need access to dispatch, so we'll use a workaround
    // In practice, the animation state is managed internally
  }, [])

  return {
    ...stackState,
    pushSheet,
    popSheet,
    resetStack,
    setAnimating,
    canPop: stackState.currentIndex > 0,
    currentSheet: stackState.sheets[stackState.currentIndex] || null,
    previousSheet: stackState.sheets[stackState.currentIndex - 1] || null,
  }
}
