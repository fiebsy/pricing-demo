/**
 * ButtonAnimation - Context
 *
 * React context for sharing animation state and handlers across components.
 * Provides a clean API for child components to access parent state.
 *
 * @module prod/base/button-animation
 */

'use client'

import { createContext, useContext } from 'react'
import type { ButtonAnimationContextValue } from './types'

// ============================================================================
// CONTEXT CREATION
// ============================================================================

/**
 * Context for ButtonAnimation component tree.
 *
 * Provides:
 * - Current animation state (expandedId, selectedChildId, phase)
 * - Merged configuration values
 * - Event handlers for selection and navigation
 * - Reduced motion preference
 */
export const ButtonAnimationContext =
  createContext<ButtonAnimationContextValue | null>(null)

// ============================================================================
// CONTEXT HOOK
// ============================================================================

/**
 * Hook to access ButtonAnimation context.
 *
 * Must be used within a ButtonAnimation component tree.
 * Throws if context is not available.
 *
 * @returns ButtonAnimation context value
 * @throws Error if used outside ButtonAnimation tree
 *
 * @example
 * ```tsx
 * function ChildComponent() {
 *   const { expandedId, onSelectChild } = useButtonAnimationContext()
 *   return <button onClick={() => onSelectChild('item-1')}>Select</button>
 * }
 * ```
 */
export function useButtonAnimationContext(): ButtonAnimationContextValue {
  const context = useContext(ButtonAnimationContext)

  if (!context) {
    throw new Error(
      'useButtonAnimationContext must be used within a ButtonAnimation component'
    )
  }

  return context
}

// ============================================================================
// OPTIONAL CONTEXT HOOK
// ============================================================================

/**
 * Hook to optionally access ButtonAnimation context.
 *
 * Returns null if context is not available instead of throwing.
 * Useful for components that can work both inside and outside the tree.
 *
 * @returns ButtonAnimation context value or null
 */
export function useButtonAnimationContextOptional(): ButtonAnimationContextValue | null {
  return useContext(ButtonAnimationContext)
}
