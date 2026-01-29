/**
 * StackingNav - Stack Animation Hook
 *
 * Manages navigation state and tracks promotion animations.
 *
 * @module features/stacking-nav/hooks
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import type { ActivePath } from '../types'

interface UseStackAnimationOptions {
  /** Callback when state is reset */
  onReset?: () => void
  /** Callback when selection changes */
  onSelectionChange?: (path: ActivePath) => void
}

interface UseStackAnimationReturn {
  /** Current active path */
  activePath: ActivePath
  /** Set of items currently in promotion animation */
  promotingItems: Set<string>
  /** Select an item at a level */
  selectItem: (level: number, id: string, hasChildren: boolean) => void
  /** Collapse to a specific level */
  collapseToLevel: (level: number) => void
  /** Reset to initial state */
  reset: () => void
  /** Check if an item is promoting */
  isItemPromoting: (id: string) => boolean
  /** Manually track an item as promoting */
  trackPromotion: (id: string) => void
  /** Clear promotion state for an item */
  clearPromotion: (id: string) => void
}

/**
 * Hook to manage stack navigation and promotion tracking.
 * 
 * Key feature: Tracks which items are being promoted from child to parent,
 * enabling the correct animation to be applied.
 * 
 * @example
 * ```tsx
 * const { activePath, selectItem, reset } = useStackAnimation({
 *   onSelectionChange: (path) => console.log('Selection:', path)
 * })
 * ```
 */
export function useStackAnimation({
  onReset,
  onSelectionChange,
}: UseStackAnimationOptions = {}): UseStackAnimationReturn {
  const [activePath, setActivePath] = useState<ActivePath>([])
  const [promotingItems, setPromotingItems] = useState<Set<string>>(new Set())
  
  // Track previous path to detect promotions
  const previousPathRef = useRef<ActivePath>([])

  /**
   * Select an item at a specific level.
   */
  const selectItem = useCallback(
    (level: number, id: string, hasChildren: boolean) => {
      setActivePath((prev) => {
        // Store previous path
        previousPathRef.current = prev

        // If clicking the same item that's currently at this level, collapse it
        if (prev[level] === id) {
          const newPath = prev.slice(0, level)
          onSelectionChange?.(newPath)
          return newPath
        }

        // Set the new path
        const newPath = [...prev.slice(0, level), id]
        
        // Check if this is a promotion (child becoming parent)
        if (level > 0 && hasChildren && !prev.includes(id)) {
          // This is a child item with children being selected
          setPromotingItems((items) => new Set(items).add(id))
          
          // Clear promotion state after animation
          setTimeout(() => {
            setPromotingItems((items) => {
              const updated = new Set(items)
              updated.delete(id)
              return updated
            })
          }, 400) // Match promotion duration
        }

        onSelectionChange?.(newPath)
        return newPath
      })
    },
    [onSelectionChange]
  )

  /**
   * Collapse to a specific level.
   */
  const collapseToLevel = useCallback((level: number) => {
    setActivePath((prev) => {
      const newPath = level < 0 ? [] : prev.slice(0, level)
      onSelectionChange?.(newPath)
      return newPath
    })
  }, [onSelectionChange])

  /**
   * Reset to initial state.
   */
  const reset = useCallback(() => {
    setActivePath([])
    setPromotingItems(new Set())
    previousPathRef.current = []
    onReset?.()
    onSelectionChange?.([])
  }, [onReset, onSelectionChange])

  /**
   * Check if an item is currently promoting.
   */
  const isItemPromoting = useCallback(
    (id: string) => {
      return promotingItems.has(id)
    },
    [promotingItems]
  )

  /**
   * Manually track an item as promoting.
   */
  const trackPromotion = useCallback((id: string) => {
    setPromotingItems((items) => new Set(items).add(id))
  }, [])

  /**
   * Clear promotion state for an item.
   */
  const clearPromotion = useCallback((id: string) => {
    setPromotingItems((items) => {
      const updated = new Set(items)
      updated.delete(id)
      return updated
    })
  }, [])

  return {
    activePath,
    promotingItems,
    selectItem,
    collapseToLevel,
    reset,
    isItemPromoting,
    trackPromotion,
    clearPromotion,
  }
}
