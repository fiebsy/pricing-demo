/**
 * ButtonAnimation - Animation State Hook
 *
 * State machine hook managing expand/collapse/select lifecycle.
 * Encapsulates all state transitions for the animation component.
 *
 * @module prod/base/button-animation/hooks
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import type { AnimationPhase, NavItem, ParentAnimationConfig } from '../types'
import { ALL_BUTTON_ID } from '../config'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Return value from useAnimationState hook.
 */
export interface AnimationStateReturn {
  /** IDs of visible parent items */
  visibleParentIds: string[]
  /** Currently expanded parent ID (null if collapsed) */
  expandedId: string | null
  /** Currently selected child ID (null if none) */
  selectedChildId: string | null
  /** Current animation phase */
  phase: AnimationPhase
  /** Handler to select/expand a parent */
  handleSelectParent: (id: string) => void
  /** Handler to collapse back to idle */
  handleCollapse: () => void
  /** Handler to toggle child selection */
  handleSelectChild: (id: string) => void
  /** Handler to reset all state */
  handleReset: () => void
  /** Whether state has been modified from initial */
  isModified: boolean
}

/**
 * Hook configuration options.
 */
export interface UseAnimationStateOptions {
  /** Navigation items */
  items: NavItem[]
  /** Parent animation config (for exit duration) */
  parentConfig: ParentAnimationConfig
  /** Optional callback when reset is triggered */
  onReset?: () => void
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Manages animation state machine for ButtonAnimation.
 *
 * State transitions:
 * ```
 * idle → settling → entering-children
 *   ↑_________|_______________|
 *        (collapse/reset)
 * ```
 *
 * @param options - Configuration options
 * @returns State values and handlers
 *
 * @example
 * ```tsx
 * const {
 *   expandedId,
 *   phase,
 *   handleSelectParent,
 *   handleReset,
 * } = useAnimationState({
 *   items: navItems,
 *   parentConfig: { exitDuration: 0.1, ... },
 * })
 * ```
 */
export function useAnimationState({
  items,
  parentConfig,
  onReset,
}: UseAnimationStateOptions): AnimationStateReturn {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  const [visibleParentIds, setVisibleParentIds] = useState<string[]>(() =>
    items.map((item) => item.id)
  )
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null)
  const [phase, setPhase] = useState<AnimationPhase>('idle')

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------

  const isModified = expandedId !== null || selectedChildId !== null

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Collapse back to idle state.
   * Resets expanded and selected state.
   */
  const handleCollapse = useCallback(() => {
    setExpandedId(null)
    setSelectedChildId(null)
    setPhase('idle')
  }, [])

  /**
   * Select or expand a parent item.
   * - If item has no children, does nothing
   * - If clicking expanded item, collapses
   * - Otherwise, expands the item
   */
  const handleSelectParent = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id === id)

      // Skip items without children (like "All" button)
      if (!item?.children?.length) {
        return
      }

      if (id === expandedId) {
        // Clicking expanded parent collapses it
        handleCollapse()
      } else {
        // Expand new parent
        setExpandedId(id)
        setSelectedChildId(null)
        setPhase('settling')
      }
    },
    [items, expandedId, handleCollapse]
  )

  /**
   * Toggle child selection.
   * Does not collapse parent - children stay visible.
   */
  const handleSelectChild = useCallback((childId: string) => {
    setSelectedChildId((prev) => (prev === childId ? null : childId))
  }, [])

  /**
   * Reset to initial state.
   * Restores all parents and clears selection.
   */
  const handleReset = useCallback(() => {
    setVisibleParentIds(items.map((item) => item.id))
    setExpandedId(null)
    setSelectedChildId(null)
    setPhase('idle')
    onReset?.()
  }, [items, onReset])

  // ---------------------------------------------------------------------------
  // PHASE TRANSITION EFFECT
  // ---------------------------------------------------------------------------

  /**
   * Automatically transition from 'settling' to 'entering-children'.
   *
   * Uses timeout based on exit duration because onLayoutAnimationComplete
   * doesn't fire reliably when there's no actual layout change.
   */
  useEffect(() => {
    if (phase === 'settling') {
      const exitDurationMs = parentConfig.exitDuration * 1000
      const timer = setTimeout(() => {
        setPhase('entering-children')
      }, exitDurationMs)

      return () => clearTimeout(timer)
    }
  }, [phase, parentConfig.exitDuration])

  // ---------------------------------------------------------------------------
  // RETURN
  // ---------------------------------------------------------------------------

  return {
    visibleParentIds,
    expandedId,
    selectedChildId,
    phase,
    handleSelectParent,
    handleCollapse,
    handleSelectChild,
    handleReset,
    isModified,
  }
}
