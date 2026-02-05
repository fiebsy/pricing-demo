/**
 * StackingNav V2 - Navigation Context
 *
 * Context for navigation state and actions.
 * Actions are stable via useCallback.
 *
 * @module features/stacking-nav-v2/context
 */

'use client'

import { createContext, useContext } from 'react'
import type { NavigationContextValue } from '../types'

export type { NavigationContextValue }

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined)

/**
 * Hook to access navigation context.
 * @throws Error if used outside NavigationContext.Provider
 */
export function useNavigationContext() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigationContext must be used within StackingNav')
  }
  return context
}

export { NavigationContext }
