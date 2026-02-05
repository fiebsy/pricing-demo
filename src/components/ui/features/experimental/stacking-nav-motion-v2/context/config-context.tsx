/**
 * StackingNav V2 - Config Context
 *
 * Context for configuration that rarely changes.
 * Consumers don't re-render on phase changes.
 *
 * @module features/stacking-nav-v2/context
 */

'use client'

import { createContext, useContext } from 'react'
import type { ConfigContextValue } from '../types'

export type { ConfigContextValue }

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined)

/**
 * Hook to access config context.
 * @throws Error if used outside ConfigContext.Provider
 */
export function useConfigContext() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfigContext must be used within StackingNav')
  }
  return context
}

export { ConfigContext }
