/**
 * StackingNav - Combined Context
 *
 * Convenience hook that combines all split contexts.
 * Components can migrate to individual context hooks for better performance.
 *
 * @module features/stacking-nav/context
 */

'use client'

import { createContext } from 'react'
import { usePhaseContext } from './phase-context'
import { useConfigContext } from './config-context'
import { useNavigationContext } from './navigation-context'
import type { StackContextValue } from '../types'

export type { StackContextValue }

/**
 * Stack context - kept for convenience.
 * Prefer using the split contexts directly for better performance.
 */
const StackContext = createContext<StackContextValue | undefined>(undefined)

/**
 * Hook to access all stack context values combined.
 *
 * PERFORMANCE NOTE: This hook will re-render on ANY context change.
 * For better performance, use individual hooks:
 * - usePhaseContext() - for phase/animation state
 * - useConfigContext() - for configuration
 * - useNavigationContext() - for path and actions
 */
export function useStackContext(): StackContextValue {
  const phase = usePhaseContext()
  const config = useConfigContext()
  const navigation = useNavigationContext()

  return {
    ...phase,
    ...config,
    ...navigation,
  }
}

export { StackContext }
