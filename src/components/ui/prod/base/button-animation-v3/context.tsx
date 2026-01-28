/**
 * ButtonAnimation V3 - Context
 *
 * React context for sharing state across the component tree.
 *
 * @module prod/base/button-animation-v3
 */

'use client'

import { createContext, useContext } from 'react'
import type { StackContextValue, LevelContextValue } from './types'

// =============================================================================
// STACK CONTEXT
// =============================================================================

const StackContext = createContext<StackContextValue | undefined>(undefined)

/**
 * Hook to access stack context.
 */
export function useStackContext() {
  const context = useContext(StackContext)
  if (!context) {
    throw new Error('useStackContext must be used within StackContext.Provider')
  }
  return context
}

export { StackContext }

// =============================================================================
// LEVEL CONTEXT
// =============================================================================

const LevelContext = createContext<LevelContextValue | undefined>(undefined)

/**
 * Hook to access level context.
 */
export function useLevelContext() {
  const context = useContext(LevelContext)
  if (!context) {
    throw new Error('useLevelContext must be used within LevelContext.Provider')
  }
  return context
}

export { LevelContext }