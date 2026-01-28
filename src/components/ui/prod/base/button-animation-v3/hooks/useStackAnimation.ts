/**
 * ButtonAnimation V3 - Stack Animation Hook
 *
 * Manages navigation state and tracks promotion animations.
 *
 * @module prod/base/button-animation-v3/hooks
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import type { ActivePath } from '../types'

interface UseStackAnimationOptions {
  onReset?: () => void
}

interface UseStackAnimationReturn {
  activePath: ActivePath
  promotingItems: Set<string>
  selectItem: (level: number, id: string, hasChildren: boolean) => void
  collapseToLevel: (level: number) => void
  reset: () => void
  isItemPromoting: (id: string) => boolean
  trackPromotion: (id: string) => void
  clearPromotion: (id: string) => void
}

/**
 * Hook to manage stack navigation and promotion tracking.
 * 
 * Key feature: Tracks which items are being promoted from child to parent,
 * enabling the correct animation to be applied.
 */
export function useStackAnimation({
  onReset,
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
          return prev.slice(0, level)
        }

        // Set the new path
        const newPath = [...prev.slice(0, level), id]
        
        // Check if this is a promotion (child becoming parent)
        if (level > 0 && hasChildren && !prev.includes(id)) {
          // This is a child item with children being selected
          // Track it as promoting
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

        return newPath
      })
    },
    []
  )

  /**
   * Collapse to a specific level.
   */
  const collapseToLevel = useCallback((level: number) => {
    setActivePath((prev) => {
      if (level < 0) return []
      return prev.slice(0, level)
    })
  }, [])

  /**
   * Reset to initial state.
   */
  const reset = useCallback(() => {
    setActivePath([])
    setPromotingItems(new Set())
    previousPathRef.current = []
    onReset?.()
  }, [onReset])

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