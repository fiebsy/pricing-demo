/**
 * StackingNav V2 - Level Context
 *
 * Context for level-specific state, passed down through the tree.
 *
 * @module features/stacking-nav-v2/context
 */

'use client'

import { createContext, useContext } from 'react'
import type { LevelContextValue } from '../types'

export type { LevelContextValue }

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
