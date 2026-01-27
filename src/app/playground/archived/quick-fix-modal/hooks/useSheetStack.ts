/**
 * useSheetStack - Sheet stack navigation hook
 *
 * Provides push/pop/reset operations for the sheet stack.
 * Used independently from context for isolated testing.
 *
 * @module playground/quick-fix-modal/hooks
 */

'use client'

import { useReducer, useCallback, useMemo } from 'react'
import type { SheetStackState, SheetStackAction, SheetDefinition } from '../config/types'

// =============================================================================
// INITIAL STATE
// =============================================================================

const createInitialState = (initialSheet?: SheetDefinition): SheetStackState => ({
  sheets: initialSheet ? [initialSheet] : [],
  currentIndex: initialSheet ? 0 : -1,
  isAnimating: false,
  direction: null,
})

// =============================================================================
// REDUCER
// =============================================================================

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
// HOOK
// =============================================================================

export interface UseSheetStackOptions {
  /** Initial sheet to display */
  initialSheet?: SheetDefinition
  /** Animation duration for push transitions (ms) */
  pushDuration?: number
  /** Animation duration for pop transitions (ms) */
  popDuration?: number
  /** Callback after push animation completes */
  onPushComplete?: (sheet: SheetDefinition) => void
  /** Callback after pop animation completes */
  onPopComplete?: (sheet: SheetDefinition | null) => void
}

export interface UseSheetStackReturn {
  /** Current stack state */
  state: SheetStackState
  /** Push a new sheet onto the stack */
  pushSheet: (sheet: SheetDefinition) => void
  /** Pop the current sheet from the stack */
  popSheet: () => void
  /** Reset the stack with an initial sheet */
  resetStack: (initialSheet: SheetDefinition) => void
  /** Navigate to a specific sheet by ID */
  navigateTo: (sheetId: string, props?: Record<string, unknown>) => void
  /** Mark animation as complete */
  setAnimating: (isAnimating: boolean) => void
  /** Whether we can pop (have more than one sheet) */
  canPop: boolean
  /** Current active sheet */
  currentSheet: SheetDefinition | null
  /** Previous sheet (for visual stacking) */
  previousSheet: SheetDefinition | null
  /** All visible sheets (for rendering stack) */
  visibleSheets: SheetDefinition[]
}

/**
 * Hook for managing sheet stack navigation.
 *
 * @example
 * ```tsx
 * const { pushSheet, popSheet, currentSheet, canPop } = useSheetStack({
 *   initialSheet: { id: 'flow-selector', title: 'Choose Method', component: FlowSelectorSheet }
 * })
 *
 * // Push a new sheet
 * pushSheet({ id: 'quick-fix', title: 'Quick Fix', component: QuickFixSheet })
 *
 * // Pop to previous sheet
 * if (canPop) popSheet()
 * ```
 */
export function useSheetStack(options: UseSheetStackOptions = {}): UseSheetStackReturn {
  const { initialSheet, pushDuration = 350, popDuration = 300, onPushComplete, onPopComplete } = options

  const [state, dispatch] = useReducer(sheetStackReducer, createInitialState(initialSheet))

  // Push a new sheet
  const pushSheet = useCallback((sheet: SheetDefinition) => {
    dispatch({ type: 'PUSH', sheet })

    // Auto-clear animating state after duration
    setTimeout(() => {
      dispatch({ type: 'SET_ANIMATING', isAnimating: false })
      onPushComplete?.(sheet)
    }, pushDuration)
  }, [pushDuration, onPushComplete])

  // Pop current sheet
  const popSheet = useCallback(() => {
    const prevSheet = state.sheets[state.currentIndex - 1] || null
    dispatch({ type: 'POP' })

    // Auto-clear animating state after duration
    setTimeout(() => {
      dispatch({ type: 'SET_ANIMATING', isAnimating: false })
      onPopComplete?.(prevSheet)
    }, popDuration)
  }, [state.sheets, state.currentIndex, popDuration, onPopComplete])

  // Reset stack
  const resetStack = useCallback((sheet: SheetDefinition) => {
    dispatch({ type: 'RESET', initialSheet: sheet })
  }, [])

  // Navigate to specific sheet
  const navigateTo = useCallback((sheetId: string, props?: Record<string, unknown>) => {
    dispatch({ type: 'NAVIGATE_TO', sheetId, props })

    // Auto-clear animating state
    setTimeout(() => {
      dispatch({ type: 'SET_ANIMATING', isAnimating: false })
    }, pushDuration)
  }, [pushDuration])

  // Set animating state manually
  const setAnimating = useCallback((isAnimating: boolean) => {
    dispatch({ type: 'SET_ANIMATING', isAnimating })
  }, [])

  // Derived values
  const canPop = state.currentIndex > 0
  const currentSheet = state.sheets[state.currentIndex] || null
  const previousSheet = state.sheets[state.currentIndex - 1] || null

  // Get all visible sheets (for rendering stack with depth effect)
  const visibleSheets = useMemo(() => {
    // Include current sheet and up to 2 previous sheets for visual stacking
    const start = Math.max(0, state.currentIndex - 2)
    return state.sheets.slice(start, state.currentIndex + 1)
  }, [state.sheets, state.currentIndex])

  return {
    state,
    pushSheet,
    popSheet,
    resetStack,
    navigateTo,
    setAnimating,
    canPop,
    currentSheet,
    previousSheet,
    visibleSheets,
  }
}
