/**
 * Universal Expand - Context
 *
 * Provides shared state, dimensions, and animation timing to all slot components.
 */

'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'
import type { UniversalExpandContextValue } from '../types'

// ============================================================================
// CONTEXT
// ============================================================================

const UniversalExpandContext = createContext<UniversalExpandContextValue | null>(null)

// ============================================================================
// PROVIDER
// ============================================================================

export const UniversalExpandProvider = UniversalExpandContext.Provider

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Required context hook - throws if not inside Root.
 */
export function useUniversalExpand(): UniversalExpandContextValue {
  const context = useContext(UniversalExpandContext)

  if (!context) {
    throw new Error(
      'useUniversalExpand must be used within a UniversalExpand.Root component'
    )
  }

  return context
}

/**
 * Optional context hook - returns null if not in context.
 */
export function useUniversalExpandOptional(): UniversalExpandContextValue | null {
  return useContext(UniversalExpandContext)
}
