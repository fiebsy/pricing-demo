/**
 * StackingNav - Context
 *
 * React context for sharing state across the component tree.
 *
 * @module features/stacking-nav
 */

'use client'

import { createContext, useContext } from 'react'
import type { StackContextValue, LevelContextValue } from './types'

// =============================================================================
// STACK CONTEXT
// =============================================================================

/**
 * Main stack context - shared across all levels.
 */
const StackContext = createContext<StackContextValue | undefined>(undefined)

/**
 * Hook to access stack context.
 * @throws Error if used outside StackContext.Provider
 */
export function useStackContext() {
  const context = useContext(StackContext)
  if (!context) {
    throw new Error('useStackContext must be used within StackingNav')
  }
  return context
}

export { StackContext }

// =============================================================================
// LEVEL CONTEXT
// =============================================================================

/**
 * Level context - specific to each nesting level.
 */
const LevelContext = createContext<LevelContextValue | undefined>(undefined)

/**
 * Hook to access level context.
 * @throws Error if used outside LevelContext.Provider
 */
export function useLevelContext() {
  const context = useContext(LevelContext)
  if (!context) {
    throw new Error('useLevelContext must be used within StackingNav')
  }
  return context
}

export { LevelContext }
