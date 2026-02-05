/**
 * StackingNav - Phase Context
 *
 * Context for phase-related state that changes frequently during animations.
 * Isolated to prevent config consumers from re-rendering on phase changes.
 *
 * @module features/stacking-nav/context
 */

'use client'

import { createContext, useContext } from 'react'
import type { PhaseContextValue } from '../types'

export type { PhaseContextValue }

const PhaseContext = createContext<PhaseContextValue | undefined>(undefined)

/**
 * Hook to access phase context.
 * @throws Error if used outside PhaseContext.Provider
 */
export function usePhaseContext() {
  const context = useContext(PhaseContext)
  if (!context) {
    throw new Error('usePhaseContext must be used within StackingNav')
  }
  return context
}

export { PhaseContext }
