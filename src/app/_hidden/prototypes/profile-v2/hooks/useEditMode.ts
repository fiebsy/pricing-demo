/**
 * useEditMode Hook
 *
 * Manages edit mode state for owner view.
 *
 * @module b/profile-v2/hooks
 */

import { useState, useCallback } from 'react'

// =============================================================================
// TYPES
// =============================================================================

export interface UseEditModeReturn {
  /** Whether edit mode is active */
  isEditMode: boolean
  /** Currently hovered item ID */
  hoveredItem: string | null
  /** Toggle edit mode on/off */
  toggleEditMode: () => void
  /** Set edit mode explicitly */
  setEditMode: (value: boolean) => void
  /** Set hovered item */
  setHoveredItem: (id: string | null) => void
}

// =============================================================================
// HOOK
// =============================================================================

export function useEditMode(): UseEditModeReturn {
  const [isEditMode, setIsEditMode] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev)
    // Clear hovered item when toggling edit mode
    setHoveredItem(null)
  }, [])

  const setEditMode = useCallback((value: boolean) => {
    setIsEditMode(value)
    if (!value) {
      setHoveredItem(null)
    }
  }, [])

  return {
    isEditMode,
    hoveredItem,
    toggleEditMode,
    setEditMode,
    setHoveredItem,
  }
}
