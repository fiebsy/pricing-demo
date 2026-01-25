/**
 * ButtonAnimation V2 - Stack Context
 *
 * React context for sharing stack state across the component tree.
 *
 * @module prod/base/button-animation-v2/context
 */

'use client'

import { createContext, useContext } from 'react'
import type { StackContextValue, LevelContextValue } from '../types'

// ============================================================================
// STACK CONTEXT (Global state)
// ============================================================================

export const StackContext = createContext<StackContextValue | null>(null)

/**
 * Hook to access stack context.
 * Throws if used outside provider.
 */
export function useStackContext(): StackContextValue {
  const context = useContext(StackContext)
  if (!context) {
    throw new Error(
      'useStackContext must be used within a ButtonAnimationV2 component'
    )
  }
  return context
}

/**
 * Optional access to stack context.
 */
export function useStackContextOptional(): StackContextValue | null {
  return useContext(StackContext)
}

// ============================================================================
// LEVEL CONTEXT (Per-level state)
// ============================================================================

export const LevelContext = createContext<LevelContextValue>({
  level: 0,
  parentId: null,
  isParentAnchored: false,
})

/**
 * Hook to access current level context.
 */
export function useLevelContext(): LevelContextValue {
  return useContext(LevelContext)
}
