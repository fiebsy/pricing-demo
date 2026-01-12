import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ANIMATION_CONFIG } from '../config'
import type { ColumnConfig } from '../types'

export interface ColumnChange {
  columnKey: string
  action: 'added' | 'removed'
  timestamp: number
}

/**
 * Hook for managing dynamic columns in the table
 *
 * Implements FLIP-compatible animation timing:
 * 1. Column marked as leaving → leave animation starts
 * 2. After leave animation → column removed from DOM
 * 3. FLIP calculates neighbor shifts → neighbors animate
 *
 * @see /docs/frontend/ANIMATION-PREFERENCES.md (B-Tier FLIP pattern)
 */
export function useDynamicColumns(columnConfigs: ColumnConfig[]) {
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<Set<string>>(
    () => new Set(columnConfigs.map((col) => col.key))
  )
  const [leavingColumnKeys, setLeavingColumnKeys] = useState<Set<string>>(new Set())
  const [enteringColumnKeys, setEnteringColumnKeys] = useState<Set<string>>(new Set())
  const [columnChange, setColumnChange] = useState<ColumnChange | null>(null)
  const previousVisibleKeysRef = useRef<Set<string>>(new Set(columnConfigs.map((col) => col.key)))

  // Refs for FLIP integration
  const flipCallbackRef = useRef<(() => void) | null>(null)

  // Include leaving columns in visible columns so they can animate out
  const effectiveVisibleColumnKeys = useMemo(() => {
    const combined = new Set(visibleColumnKeys)
    leavingColumnKeys.forEach((key) => combined.add(key))
    return combined
  }, [visibleColumnKeys, leavingColumnKeys])

  const visibleColumns = useMemo(() => {
    return columnConfigs.filter((col) => effectiveVisibleColumnKeys.has(col.key))
  }, [columnConfigs, effectiveVisibleColumnKeys])

  const stickyColumns = useMemo(() => {
    return visibleColumns.filter((col) => col.isSticky)
  }, [visibleColumns])

  const scrollableColumns = useMemo(() => {
    return visibleColumns.filter((col) => !col.isSticky)
  }, [visibleColumns])

  /**
   * Register a callback to be called after column removal animation completes
   * Used by FLIP to trigger neighbor shift animations
   */
  const onColumnRemoved = useCallback((callback: () => void) => {
    flipCallbackRef.current = callback
  }, [])

  /**
   * Toggle column visibility with FLIP-compatible timing
   */
  const toggleColumn = useCallback((columnKey: string) => {
    setVisibleColumnKeys((prev) => {
      const next = new Set(prev)
      const wasVisible = prev.has(columnKey)

      if (wasVisible) {
        // REMOVAL PATH - FLIP sequence:
        // 1. Mark as leaving (starts leave animation)
        setLeavingColumnKeys((prevLeaving) => new Set(prevLeaving).add(columnKey))

        // 2. Remove from visible immediately (but stays in DOM via leavingColumnKeys)
        next.delete(columnKey)

        setColumnChange({
          columnKey,
          action: 'removed',
          timestamp: Date.now(),
        })
      } else {
        // ADDITION PATH:
        // 1. Remove from leaving set if it was there (edge case: rapid toggle)
        setLeavingColumnKeys((prevLeaving) => {
          const updated = new Set(prevLeaving)
          updated.delete(columnKey)
          return updated
        })

        // 2. Mark as entering (starts enter animation)
        setEnteringColumnKeys((prevEntering) => new Set(prevEntering).add(columnKey))

        // 3. Add to visible
        next.add(columnKey)

        setColumnChange({
          columnKey,
          action: 'added',
          timestamp: Date.now(),
        })
      }

      previousVisibleKeysRef.current = new Set(prev)
      return next
    })
  }, [])

  /**
   * Reset all columns to visible
   */
  const resetColumns = useCallback(() => {
    const allKeys = new Set(columnConfigs.map((col) => col.key))
    const currentlyHiddenKeys = Array.from(allKeys).filter((key) => !visibleColumnKeys.has(key))

    // Mark all newly visible columns as entering
    if (currentlyHiddenKeys.length > 0) {
      setEnteringColumnKeys(new Set(currentlyHiddenKeys))
    }

    setColumnChange({
      columnKey: 'reset',
      action: 'added',
      timestamp: Date.now(),
    })

    previousVisibleKeysRef.current = new Set(visibleColumnKeys)
    setVisibleColumnKeys(allKeys)
  }, [columnConfigs, visibleColumnKeys])

  // Clear column change state after animation completes
  useEffect(() => {
    if (columnChange) {
      const timer = setTimeout(() => {
        setColumnChange(null)
      }, ANIMATION_CONFIG.COLUMN_CHANGE_CLEAR_DELAY)
      return () => clearTimeout(timer)
    }
  }, [columnChange])

  // Clean up leaving columns after leave animation completes
  // This triggers FLIP callback for neighbor shifting
  useEffect(() => {
    if (leavingColumnKeys.size > 0) {
      const timer = setTimeout(() => {
        // Call FLIP callback before clearing leaving state
        // This allows FLIP to animate neighbors after column is removed
        if (flipCallbackRef.current) {
          flipCallbackRef.current()
          flipCallbackRef.current = null
        }
        setLeavingColumnKeys(new Set())
      }, ANIMATION_CONFIG.LEAVING_COLUMN_CLEAR_DELAY)
      return () => clearTimeout(timer)
    }
  }, [leavingColumnKeys])

  // Clean up entering columns after enter animation completes
  useEffect(() => {
    if (enteringColumnKeys.size > 0) {
      const timer = setTimeout(() => {
        setEnteringColumnKeys(new Set())
      }, ANIMATION_CONFIG.COLUMN_ENTER_DURATION)
      return () => clearTimeout(timer)
    }
  }, [enteringColumnKeys])

  return {
    visibleColumns,
    stickyColumns,
    scrollableColumns,
    visibleColumnKeys,
    toggleColumn,
    resetColumns,
    allAvailableColumns: columnConfigs,
    columnChange, // Track which column was just added/removed
    leavingColumnKeys, // Track columns that are animating out
    enteringColumnKeys, // Track columns that are animating in
    onColumnRemoved, // Register callback for FLIP integration
  }
}
