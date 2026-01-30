/**
 * Biaxial Expand V4 - Context
 *
 * Provides shared state, dimensions, and animation timing to all slot components.
 */

'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'
import type { BiaxialExpandContextValue } from '../types'

// ============================================================================
// CONTEXT
// ============================================================================

const BiaxialExpandContext = createContext<BiaxialExpandContextValue | null>(null)

// ============================================================================
// PROVIDER
// ============================================================================

export const BiaxialExpandProvider = BiaxialExpandContext.Provider

// ============================================================================
// HOOK
// ============================================================================

export function useBiaxialExpand(): BiaxialExpandContextValue {
  const context = useContext(BiaxialExpandContext)

  if (!context) {
    throw new Error(
      'useBiaxialExpand must be used within a BiaxialExpandV4.Root component'
    )
  }

  return context
}

// ============================================================================
// OPTIONAL HOOK (for components that may be used outside context)
// ============================================================================

export function useBiaxialExpandOptional(): BiaxialExpandContextValue | null {
  return useContext(BiaxialExpandContext)
}
