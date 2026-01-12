'use client'

/**
 * useColumnConfiguration Hook
 *
 * Centralized column state management for StickyDataTable.
 * Provides a single source of truth for:
 * - Column order and configuration
 * - Column visibility with animation state
 * - localStorage persistence
 * - Sticky column management
 *
 * This hook is designed to be shared between StickyDataTable and
 * external configuration panels (like ColumnConfigPanel).
 *
 * @module hooks/use-column-configuration
 */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { ANIMATION_CONFIG } from '../config'
import type { ColumnConfig, ColumnChange, ComputedColumn } from '../types'
import { computeColumnOffsets, separateColumns, calculateTotalStickyWidth } from '../utils'

// ============================================================================
// TYPES
// ============================================================================

export interface UseColumnConfigurationOptions {
  /** Initial column configurations */
  columns: ColumnConfig[]

  /** Default visible columns (takes precedence over defaultHiddenColumns) */
  defaultVisibleColumns?: string[]

  /** Default hidden columns (backward compatibility) */
  defaultHiddenColumns?: string[]

  /** localStorage key for persistence (optional) */
  storageKey?: string

  /** Callback when columns change */
  onColumnsChange?: (columns: ColumnConfig[]) => void

  /** Callback when visibility changes */
  onVisibilityChange?: (visibleKeys: string[]) => void
}

export interface ColumnConfigurationState {
  /** Current column configurations (may be reordered/resized) */
  columns: ColumnConfig[]

  /** Set of visible column keys */
  visibleKeys: Set<string>

  /** Set of columns currently animating out */
  leavingKeys: Set<string>

  /** Current column change (for animation triggers) */
  columnChange: ColumnChange | null

  /** Computed visible columns with offsets */
  visibleColumns: ComputedColumn[]

  /** Computed sticky columns */
  stickyColumns: ComputedColumn[]

  /** Computed scrollable columns */
  scrollableColumns: ComputedColumn[]

  /** Total sticky width */
  totalStickyWidth: number

  /** Whether localStorage hydration is complete (use to suppress animations) */
  isHydrated: boolean
}

export interface ColumnConfigurationActions {
  /** Toggle a column's visibility with animation */
  toggleColumn: (columnKey: string) => void

  /** Set multiple columns visible/hidden at once */
  setVisibleColumns: (keys: string[]) => void

  /** Reorder columns by key - moves fromKey before or after toKey based on insertAfter flag */
  reorderColumns: (fromKey: string, toKey: string, insertAfter?: boolean) => void

  /** Resize a column */
  resizeColumn: (columnKey: string, width: number) => void

  /** Change column alignment */
  setColumnAlignment: (columnKey: string, align: 'left' | 'center' | 'right') => void

  /** Set a column as sticky/non-sticky */
  setColumnSticky: (columnKey: string, isSticky: boolean) => void

  /** Update multiple columns at once */
  updateColumns: (columns: ColumnConfig[]) => void

  /** Reset to default configuration */
  resetToDefaults: () => void

  /** Check if a column is visible */
  isColumnVisible: (columnKey: string) => boolean
}

export type UseColumnConfigurationReturn = ColumnConfigurationState & ColumnConfigurationActions

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Centralized column configuration hook
 *
 * @example
 * ```tsx
 * const columnConfig = useColumnConfiguration({
 *   columns: COLUMN_CONFIGS,
 *   defaultVisibleColumns: DEFAULT_VISIBLE_COLUMNS,
 *   storageKey: 'my-table-columns',
 * })
 *
 * // Use with StickyDataTable
 * <StickyDataTable
 *   columns={columnConfig.columns}
 *   defaultVisibleColumns={[...columnConfig.visibleKeys]}
 *   // ... or use controlled mode
 * />
 *
 * // Use with ColumnConfigPanel
 * <ColumnConfigPanel
 *   columns={columnConfig.columns}
 *   visibleKeys={columnConfig.visibleKeys}
 *   onToggleColumn={columnConfig.toggleColumn}
 *   // ...
 * />
 * ```
 */
export function useColumnConfiguration({
  columns: initialColumns,
  defaultVisibleColumns,
  defaultHiddenColumns = [],
  storageKey,
  onColumnsChange,
  onVisibilityChange,
}: UseColumnConfigurationOptions): UseColumnConfigurationReturn {
  // ==========================================================================
  // COMPUTE INITIAL STATE
  // ==========================================================================

  const computeInitialVisibleKeys = useCallback(() => {
    if (defaultVisibleColumns && defaultVisibleColumns.length > 0) {
      return new Set(defaultVisibleColumns)
    }
    // Fallback: all columns except hidden ones
    const hiddenSet = new Set(defaultHiddenColumns)
    return new Set(initialColumns.map((c) => c.key).filter((key) => !hiddenSet.has(key)))
  }, [initialColumns, defaultVisibleColumns, defaultHiddenColumns])

  // ==========================================================================
  // STATE
  // ==========================================================================

  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(computeInitialVisibleKeys)
  const [leavingKeys, setLeavingKeys] = useState<Set<string>>(new Set())
  const [columnChange, setColumnChange] = useState<ColumnChange | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Track previous state for callbacks
  const previousColumnsRef = useRef<ColumnConfig[]>(initialColumns)
  const previousVisibleKeysRef = useRef<Set<string>>(visibleKeys)

  // ==========================================================================
  // HYDRATE FROM LOCALSTORAGE
  // ==========================================================================

  useEffect(() => {
    if (!storageKey) {
      setIsHydrated(true)
      return
    }

    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)

        // Merge saved columns with initial columns (preserve authoritative props like sortable)
        if (parsed.columns && Array.isArray(parsed.columns)) {
          const authoritativeMap = new Map(initialColumns.map((col) => [col.key, col]))
          const savedKeysSet = new Set(parsed.columns.map((col: ColumnConfig) => col.key))

          // Map saved columns with authoritative props
          const mergedColumns = parsed.columns.map((savedCol: ColumnConfig) => {
            const authCol = authoritativeMap.get(savedCol.key)
            if (authCol) {
              return {
                ...savedCol,
                sortable: authCol.sortable, // Always use authoritative sortable
              }
            }
            return savedCol
          })

          // Add any new columns from initialColumns that weren't in saved state
          const newColumns = initialColumns.filter((col) => !savedKeysSet.has(col.key))
          if (newColumns.length > 0) {
            mergedColumns.push(...newColumns)
          }

          setColumns(mergedColumns)
        }

        // Restore visible columns
        if (parsed.visibleKeys && Array.isArray(parsed.visibleKeys)) {
          setVisibleKeys(new Set(parsed.visibleKeys))
        }
      }
    } catch (error) {
      console.error('[useColumnConfiguration] Failed to load from localStorage:', error)
    }

    setIsHydrated(true)
  }, [storageKey, initialColumns])

  // ==========================================================================
  // PERSIST TO LOCALSTORAGE
  // ==========================================================================

  useEffect(() => {
    if (!storageKey || !isHydrated) return

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          columns,
          visibleKeys: [...visibleKeys],
        })
      )
    } catch (error) {
      console.error('[useColumnConfiguration] Failed to save to localStorage:', error)
    }
  }, [storageKey, columns, visibleKeys, isHydrated])

  // ==========================================================================
  // CALLBACKS
  // ==========================================================================

  // Notify parent of column changes
  useEffect(() => {
    if (onColumnsChange && columns !== previousColumnsRef.current) {
      onColumnsChange(columns)
      previousColumnsRef.current = columns
    }
  }, [columns, onColumnsChange])

  // Notify parent of visibility changes
  useEffect(() => {
    if (onVisibilityChange && visibleKeys !== previousVisibleKeysRef.current) {
      onVisibilityChange([...visibleKeys])
      previousVisibleKeysRef.current = visibleKeys
    }
  }, [visibleKeys, onVisibilityChange])

  // ==========================================================================
  // COMPUTED COLUMNS
  // ==========================================================================

  // Include leaving columns in visible set for exit animation
  const effectiveVisibleKeys = useMemo(() => {
    const combined = new Set(visibleKeys)
    leavingKeys.forEach((key) => combined.add(key))
    return combined
  }, [visibleKeys, leavingKeys])

  // Compute column offsets
  const visibleColumns = useMemo(() => {
    const visible = columns.filter((col) => effectiveVisibleKeys.has(col.key))
    return computeColumnOffsets(visible)
  }, [columns, effectiveVisibleKeys])

  // Separate sticky and scrollable
  const { stickyColumns, scrollableColumns } = useMemo(
    () => separateColumns(visibleColumns),
    [visibleColumns]
  )

  // Calculate total sticky width
  const totalStickyWidth = useMemo(
    () => calculateTotalStickyWidth(stickyColumns),
    [stickyColumns]
  )

  // ==========================================================================
  // ANIMATION CLEANUP
  // ==========================================================================

  // Clear column change after animation
  useEffect(() => {
    if (columnChange) {
      const timer = setTimeout(() => {
        setColumnChange(null)
      }, ANIMATION_CONFIG.COLUMN_CHANGE_CLEAR_DELAY)
      return () => clearTimeout(timer)
    }
  }, [columnChange])

  // Clear leaving columns after animation
  useEffect(() => {
    if (leavingKeys.size > 0) {
      const timer = setTimeout(() => {
        setLeavingKeys(new Set())
      }, ANIMATION_CONFIG.LEAVING_COLUMN_CLEAR_DELAY)
      return () => clearTimeout(timer)
    }
  }, [leavingKeys])

  // ==========================================================================
  // ACTIONS
  // ==========================================================================

  /** Toggle column visibility with animation */
  const toggleColumn = useCallback((columnKey: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev)
      const wasVisible = prev.has(columnKey)

      if (wasVisible) {
        // Mark as leaving for exit animation
        setLeavingKeys((leaving) => new Set(leaving).add(columnKey))
        next.delete(columnKey)
        setColumnChange({
          columnKey,
          action: 'removed',
          timestamp: Date.now(),
        })
      } else {
        // Remove from leaving if it was there
        setLeavingKeys((leaving) => {
          const updated = new Set(leaving)
          updated.delete(columnKey)
          return updated
        })
        next.add(columnKey)
        setColumnChange({
          columnKey,
          action: 'added',
          timestamp: Date.now(),
        })
      }

      return next
    })
  }, [])

  /** Set multiple columns visible at once */
  const setVisibleColumns = useCallback((keys: string[]) => {
    const newVisibleSet = new Set(keys)

    setVisibleKeys((prev) => {
      // Find removed columns for animation
      const removed = [...prev].filter((k) => !newVisibleSet.has(k))
      const added = keys.filter((k) => !prev.has(k))

      // Mark removed columns as leaving
      const firstRemoved = removed[0]
      const firstAdded = added[0]

      if (firstRemoved) {
        setLeavingKeys((leaving) => {
          const updated = new Set(leaving)
          removed.forEach((k) => updated.add(k))
          return updated
        })
        setColumnChange({
          columnKey: firstRemoved,
          action: 'removed',
          timestamp: Date.now(),
        })
      } else if (firstAdded) {
        setColumnChange({
          columnKey: firstAdded,
          action: 'added',
          timestamp: Date.now(),
        })
      }

      return newVisibleSet
    })
  }, [])

  /** Reorder columns by key - moves fromKey before or after toKey based on insertAfter flag */
  const reorderColumns = useCallback((fromKey: string, toKey: string, insertAfter?: boolean) => {
    if (fromKey === toKey) return

    setColumns((prev) => {
      // Find indices in the FULL columns array (including hidden)
      const fromIndex = prev.findIndex((col) => col.key === fromKey)
      const toIndex = prev.findIndex((col) => col.key === toKey)

      if (fromIndex === -1 || toIndex === -1) {
        console.warn('[useColumnConfiguration] reorderColumns: column key not found', { fromKey, toKey })
        return prev
      }

      const updated = [...prev]
      const [removed] = updated.splice(fromIndex, 1)
      if (removed) {
        // Calculate insert position based on insertAfter flag
        // After splicing, indices shift: if fromIndex < toIndex, target moved left by 1
        let insertIndex: number
        if (insertAfter) {
          // Insert AFTER the target column
          // After removal, if we were before target, target is now at toIndex - 1
          insertIndex = fromIndex < toIndex ? toIndex : toIndex + 1
        } else {
          // Insert BEFORE the target column
          // After removal, if we were before target, target is now at toIndex - 1
          insertIndex = fromIndex < toIndex ? toIndex - 1 : toIndex
        }
        updated.splice(insertIndex, 0, removed)
      }

      // Recalculate sticky offsets
      return recalculateStickyOffsets(updated)
    })
  }, [])

  /** Resize a column */
  const resizeColumn = useCallback((columnKey: string, width: number) => {
    setColumns((prev) => {
      const updated = prev.map((col) =>
        col.key === columnKey ? { ...col, width } : col
      )
      // Recalculate sticky offsets since widths changed
      return recalculateStickyOffsets(updated)
    })
  }, [])

  /** Change column alignment */
  const setColumnAlignment = useCallback(
    (columnKey: string, align: 'left' | 'center' | 'right') => {
      setColumns((prev) =>
        prev.map((col) => (col.key === columnKey ? { ...col, align } : col))
      )
    },
    []
  )

  /** Set column sticky state */
  const setColumnSticky = useCallback((columnKey: string, isSticky: boolean) => {
    setColumns((prev) => {
      const updated = prev.map((col) =>
        col.key === columnKey ? { ...col, isSticky } : col
      )
      return recalculateStickyOffsets(updated)
    })
  }, [])

  /** Update multiple columns at once */
  const updateColumns = useCallback((newColumns: ColumnConfig[]) => {
    setColumns(recalculateStickyOffsets(newColumns))
  }, [])

  /** Reset to default configuration */
  const resetToDefaults = useCallback(() => {
    setColumns(initialColumns)
    const defaultKeys = computeInitialVisibleKeys()

    // Calculate removed for animation
    setVisibleKeys((prev) => {
      const removed = [...prev].filter((k) => !defaultKeys.has(k))
      if (removed.length > 0) {
        setLeavingKeys(new Set(removed))
        setColumnChange({
          columnKey: 'reset',
          action: 'added',
          timestamp: Date.now(),
        })
      }
      return defaultKeys
    })
  }, [initialColumns, computeInitialVisibleKeys])

  /** Check if column is visible */
  const isColumnVisible = useCallback(
    (columnKey: string) => visibleKeys.has(columnKey),
    [visibleKeys]
  )

  // ==========================================================================
  // RETURN
  // ==========================================================================

  return {
    // State
    columns,
    visibleKeys,
    leavingKeys,
    columnChange,
    visibleColumns,
    stickyColumns,
    scrollableColumns,
    totalStickyWidth,
    isHydrated,

    // Actions
    toggleColumn,
    setVisibleColumns,
    reorderColumns,
    resizeColumn,
    setColumnAlignment,
    setColumnSticky,
    updateColumns,
    resetToDefaults,
    isColumnVisible,
  }
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Recalculate sticky left offsets for all sticky columns
 */
function recalculateStickyOffsets(columns: ColumnConfig[]): ColumnConfig[] {
  let stickyLeft = 0

  return columns.map((col) => {
    if (col.isSticky) {
      const updated = { ...col, stickyLeft }
      stickyLeft += col.width
      return updated
    }
    return col
  })
}
