/**
 * Pricing Select Menu - Context
 *
 * Provides shared state and configuration to all slot components.
 */

'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'
import type { PricingSelectMenuContextValue } from './types'

// ============================================================================
// CONTEXT
// ============================================================================

const PricingSelectMenuContext = createContext<PricingSelectMenuContextValue | null>(null)

// ============================================================================
// PROVIDER
// ============================================================================

export const PricingSelectMenuProvider = PricingSelectMenuContext.Provider

// ============================================================================
// HOOK
// ============================================================================

export function usePricingSelectMenu(): PricingSelectMenuContextValue {
  const context = useContext(PricingSelectMenuContext)

  if (!context) {
    throw new Error(
      'usePricingSelectMenu must be used within a PricingSelectMenu.Root component'
    )
  }

  return context
}

// ============================================================================
// OPTIONAL HOOK (for components that may be used outside context)
// ============================================================================

export function usePricingSelectMenuOptional(): PricingSelectMenuContextValue | null {
  return useContext(PricingSelectMenuContext)
}
