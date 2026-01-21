/**
 * ButtonAnimation V2 - Stack State Hook
 *
 * State machine hook for multi-level stack navigation.
 * Manages the active path through the tree.
 *
 * @module prod/base/button-animation-v2/hooks
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import type { ActivePath, StackPhase, AnimationConfig } from '../types'
import { PHASE_TRANSITION_DELAY_MS } from '../config'

// ============================================================================
// TYPES
// ============================================================================

export interface StackStateReturn {
  /** Current active path through the tree */
  activePath: ActivePath
  /** Current animation phase */
  phase: StackPhase
  /** Select an item at a given level */
  selectItem: (level: number, id: string, hasChildren: boolean) => void
  /** Collapse to a given level (removes items at level+1 and beyond) */
  collapseToLevel: (level: number) => void
  /** Reset to initial state */
  reset: () => void
  /** Whether any selection has been made */
  isModified: boolean
}

export interface UseStackStateOptions {
  animationConfig: AnimationConfig
  onReset?: () => void
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Manages multi-level stack navigation state.
 *
 * State representation:
 * - `activePath = []` → All items at root level visible, nothing expanded
 * - `activePath = ['design']` → "design" is expanded, its children visible
 * - `activePath = ['design', 'figma']` → "design" and "figma" expanded
 *
 * The peek-behind pattern:
 * - Items at level N-1 become "anchored" when level N is active
 * - This is calculated per-level, not stored in state
 */
export function useStackState({
  animationConfig,
  onReset,
}: UseStackStateOptions): StackStateReturn {
  const [activePath, setActivePath] = useState<ActivePath>([])
  const [phase, setPhase] = useState<StackPhase>('idle')

  const isModified = activePath.length > 0

  /**
   * Select an item at a specific level.
   *
   * @param level - The nesting level (0 = root)
   * @param id - Item ID to select
   * @param hasChildren - Whether the item has children
   */
  const selectItem = useCallback(
    (level: number, id: string, hasChildren: boolean) => {
      setActivePath((prev) => {
        // If clicking the same item that's currently at this level, collapse it
        if (prev[level] === id) {
          // Collapse: remove this level and all below
          return prev.slice(0, level)
        }

        // If item has no children, it's a leaf selection
        // We still add it to the path to show it's selected
        // but it won't expand further

        // Set the new path: keep levels above, set this level, clear below
        const newPath = [...prev.slice(0, level), id]
        return newPath
      })

      // Trigger transition phase
      if (hasChildren) {
        setPhase('transitioning')
      }
    },
    []
  )

  /**
   * Collapse to a specific level.
   * Clicking the X on an expanded item calls this.
   */
  const collapseToLevel = useCallback((level: number) => {
    setActivePath((prev) => {
      if (level < 0) return []
      return prev.slice(0, level)
    })
    setPhase('idle')
  }, [])

  /**
   * Reset to initial state.
   */
  const reset = useCallback(() => {
    setActivePath([])
    setPhase('idle')
    onReset?.()
  }, [onReset])

  /**
   * Auto-transition from 'transitioning' to 'settled'.
   */
  useEffect(() => {
    if (phase === 'transitioning') {
      const delay = animationConfig.exitDuration * 1000 + PHASE_TRANSITION_DELAY_MS
      const timer = setTimeout(() => {
        setPhase('settled')
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [phase, animationConfig.exitDuration])

  return {
    activePath,
    phase,
    selectItem,
    collapseToLevel,
    reset,
    isModified,
  }
}
