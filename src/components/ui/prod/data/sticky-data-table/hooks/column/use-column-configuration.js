"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumnConfiguration = void 0;
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
const react_1 = require("react");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
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
function useColumnConfiguration({ columns: initialColumns, defaultVisibleColumns, defaultHiddenColumns = [], storageKey, onColumnsChange, onVisibilityChange, }) {
    // ==========================================================================
    // COMPUTE INITIAL STATE
    // ==========================================================================
    const computeInitialVisibleKeys = (0, react_1.useCallback)(() => {
        if (defaultVisibleColumns && defaultVisibleColumns.length > 0) {
            return new Set(defaultVisibleColumns);
        }
        // Fallback: all columns except hidden ones
        const hiddenSet = new Set(defaultHiddenColumns);
        return new Set(initialColumns.map((c) => c.key).filter((key) => !hiddenSet.has(key)));
    }, [initialColumns, defaultVisibleColumns, defaultHiddenColumns]);
    // ==========================================================================
    // STATE
    // ==========================================================================
    const [columns, setColumns] = (0, react_1.useState)(initialColumns);
    const [visibleKeys, setVisibleKeys] = (0, react_1.useState)(computeInitialVisibleKeys);
    const [leavingKeys, setLeavingKeys] = (0, react_1.useState)(new Set());
    const [columnChange, setColumnChange] = (0, react_1.useState)(null);
    const [isHydrated, setIsHydrated] = (0, react_1.useState)(false);
    // Track previous state for callbacks
    const previousColumnsRef = (0, react_1.useRef)(initialColumns);
    const previousVisibleKeysRef = (0, react_1.useRef)(visibleKeys);
    // ==========================================================================
    // HYDRATE FROM LOCALSTORAGE
    // ==========================================================================
    (0, react_1.useEffect)(() => {
        if (!storageKey) {
            setIsHydrated(true);
            return;
        }
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge saved columns with initial columns (preserve authoritative props like sortable)
                if (parsed.columns && Array.isArray(parsed.columns)) {
                    const authoritativeMap = new Map(initialColumns.map((col) => [col.key, col]));
                    const savedKeysSet = new Set(parsed.columns.map((col) => col.key));
                    // Map saved columns with authoritative props
                    // IMPORTANT: Only include columns that still exist in initialColumns
                    // This prevents stale columns from persisting after config changes
                    const mergedColumns = parsed.columns
                        .filter((savedCol) => authoritativeMap.has(savedCol.key))
                        .map((savedCol) => {
                        const authCol = authoritativeMap.get(savedCol.key);
                        return {
                            ...savedCol,
                            sortable: authCol.sortable, // Always use authoritative sortable
                        };
                    });
                    // Add any new columns from initialColumns that weren't in saved state
                    const newColumns = initialColumns.filter((col) => !savedKeysSet.has(col.key));
                    if (newColumns.length > 0) {
                        mergedColumns.push(...newColumns);
                    }
                    setColumns(mergedColumns);
                }
                // Restore visible columns (filter out stale keys that don't exist anymore)
                if (parsed.visibleKeys && Array.isArray(parsed.visibleKeys)) {
                    const authoritativeKeys = new Set(initialColumns.map((col) => col.key));
                    const validVisibleKeys = parsed.visibleKeys.filter((key) => authoritativeKeys.has(key));
                    setVisibleKeys(new Set(validVisibleKeys));
                }
            }
        }
        catch (error) {
            console.error('[useColumnConfiguration] Failed to load from localStorage:', error);
        }
        setIsHydrated(true);
    }, [storageKey, initialColumns]);
    // ==========================================================================
    // PERSIST TO LOCALSTORAGE
    // ==========================================================================
    (0, react_1.useEffect)(() => {
        if (!storageKey || !isHydrated)
            return;
        try {
            localStorage.setItem(storageKey, JSON.stringify({
                columns,
                visibleKeys: [...visibleKeys],
            }));
        }
        catch (error) {
            console.error('[useColumnConfiguration] Failed to save to localStorage:', error);
        }
    }, [storageKey, columns, visibleKeys, isHydrated]);
    // ==========================================================================
    // CALLBACKS
    // ==========================================================================
    // Notify parent of column changes
    (0, react_1.useEffect)(() => {
        if (onColumnsChange && columns !== previousColumnsRef.current) {
            onColumnsChange(columns);
            previousColumnsRef.current = columns;
        }
    }, [columns, onColumnsChange]);
    // Notify parent of visibility changes
    (0, react_1.useEffect)(() => {
        if (onVisibilityChange && visibleKeys !== previousVisibleKeysRef.current) {
            onVisibilityChange([...visibleKeys]);
            previousVisibleKeysRef.current = visibleKeys;
        }
    }, [visibleKeys, onVisibilityChange]);
    // ==========================================================================
    // COMPUTED COLUMNS
    // ==========================================================================
    // Include leaving columns in visible set for exit animation
    const effectiveVisibleKeys = (0, react_1.useMemo)(() => {
        const combined = new Set(visibleKeys);
        leavingKeys.forEach((key) => combined.add(key));
        return combined;
    }, [visibleKeys, leavingKeys]);
    // Compute column offsets
    // IMPORTANT: Sticky columns MUST come first to match grid template order
    const visibleColumns = (0, react_1.useMemo)(() => {
        const visible = columns.filter((col) => effectiveVisibleKeys.has(col.key));
        // Reorder so sticky columns always come first (maintains relative order within each group)
        const sticky = visible.filter((col) => col.isSticky);
        const scrollable = visible.filter((col) => !col.isSticky);
        return (0, utils_1.computeColumnOffsets)([...sticky, ...scrollable]);
    }, [columns, effectiveVisibleKeys]);
    // Separate sticky and scrollable
    const { stickyColumns, scrollableColumns } = (0, react_1.useMemo)(() => (0, utils_1.separateColumns)(visibleColumns), [visibleColumns]);
    // Calculate total sticky width
    const totalStickyWidth = (0, react_1.useMemo)(() => (0, utils_1.calculateTotalStickyWidth)(stickyColumns), [stickyColumns]);
    // ==========================================================================
    // ANIMATION CLEANUP
    // ==========================================================================
    // Clear column change after animation
    (0, react_1.useEffect)(() => {
        if (columnChange) {
            const timer = setTimeout(() => {
                setColumnChange(null);
            }, config_1.ANIMATION_CONFIG.COLUMN_CHANGE_CLEAR_DELAY);
            return () => clearTimeout(timer);
        }
    }, [columnChange]);
    // Clear leaving columns after animation
    (0, react_1.useEffect)(() => {
        if (leavingKeys.size > 0) {
            const timer = setTimeout(() => {
                setLeavingKeys(new Set());
            }, config_1.ANIMATION_CONFIG.LEAVING_COLUMN_CLEAR_DELAY);
            return () => clearTimeout(timer);
        }
    }, [leavingKeys]);
    // ==========================================================================
    // ACTIONS
    // ==========================================================================
    /** Toggle column visibility with animation */
    const toggleColumn = (0, react_1.useCallback)((columnKey) => {
        setVisibleKeys((prev) => {
            const next = new Set(prev);
            const wasVisible = prev.has(columnKey);
            if (wasVisible) {
                // Mark as leaving for exit animation
                setLeavingKeys((leaving) => new Set(leaving).add(columnKey));
                next.delete(columnKey);
                setColumnChange({
                    columnKey,
                    action: 'removed',
                    timestamp: Date.now(),
                });
            }
            else {
                // Remove from leaving if it was there
                setLeavingKeys((leaving) => {
                    const updated = new Set(leaving);
                    updated.delete(columnKey);
                    return updated;
                });
                next.add(columnKey);
                setColumnChange({
                    columnKey,
                    action: 'added',
                    timestamp: Date.now(),
                });
            }
            return next;
        });
    }, []);
    /** Set multiple columns visible at once */
    const setVisibleColumns = (0, react_1.useCallback)((keys) => {
        const newVisibleSet = new Set(keys);
        setVisibleKeys((prev) => {
            // Find removed columns for animation
            const removed = [...prev].filter((k) => !newVisibleSet.has(k));
            const added = keys.filter((k) => !prev.has(k));
            // Mark removed columns as leaving
            const firstRemoved = removed[0];
            const firstAdded = added[0];
            if (firstRemoved) {
                setLeavingKeys((leaving) => {
                    const updated = new Set(leaving);
                    removed.forEach((k) => updated.add(k));
                    return updated;
                });
                setColumnChange({
                    columnKey: firstRemoved,
                    action: 'removed',
                    timestamp: Date.now(),
                });
            }
            else if (firstAdded) {
                setColumnChange({
                    columnKey: firstAdded,
                    action: 'added',
                    timestamp: Date.now(),
                });
            }
            return newVisibleSet;
        });
    }, []);
    /** Reorder columns by key - moves fromKey before or after toKey based on insertAfter flag */
    const reorderColumns = (0, react_1.useCallback)((fromKey, toKey, insertAfter) => {
        if (fromKey === toKey)
            return;
        setColumns((prev) => {
            // Find indices in the FULL columns array (including hidden)
            const fromIndex = prev.findIndex((col) => col.key === fromKey);
            const toIndex = prev.findIndex((col) => col.key === toKey);
            if (fromIndex === -1 || toIndex === -1) {
                console.warn('[useColumnConfiguration] reorderColumns: column key not found', { fromKey, toKey });
                return prev;
            }
            const updated = [...prev];
            const [removed] = updated.splice(fromIndex, 1);
            if (removed) {
                // Calculate insert position based on insertAfter flag
                // After splicing, indices shift: if fromIndex < toIndex, target moved left by 1
                let insertIndex;
                if (insertAfter) {
                    // Insert AFTER the target column
                    // After removal, if we were before target, target is now at toIndex - 1
                    insertIndex = fromIndex < toIndex ? toIndex : toIndex + 1;
                }
                else {
                    // Insert BEFORE the target column
                    // After removal, if we were before target, target is now at toIndex - 1
                    insertIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
                }
                updated.splice(insertIndex, 0, removed);
            }
            // Recalculate sticky offsets
            return recalculateStickyOffsets(updated);
        });
    }, []);
    /** Resize a column */
    const resizeColumn = (0, react_1.useCallback)((columnKey, width) => {
        setColumns((prev) => {
            const updated = prev.map((col) => col.key === columnKey ? { ...col, width } : col);
            // Recalculate sticky offsets since widths changed
            return recalculateStickyOffsets(updated);
        });
    }, []);
    /** Change column alignment */
    const setColumnAlignment = (0, react_1.useCallback)((columnKey, align) => {
        setColumns((prev) => prev.map((col) => (col.key === columnKey ? { ...col, align } : col)));
    }, []);
    /** Set column sticky state */
    const setColumnSticky = (0, react_1.useCallback)((columnKey, isSticky) => {
        setColumns((prev) => {
            const updated = prev.map((col) => col.key === columnKey ? { ...col, isSticky } : col);
            return recalculateStickyOffsets(updated);
        });
    }, []);
    /** Update multiple columns at once */
    const updateColumns = (0, react_1.useCallback)((newColumns) => {
        setColumns(recalculateStickyOffsets(newColumns));
    }, []);
    /** Reset to default configuration */
    const resetToDefaults = (0, react_1.useCallback)(() => {
        setColumns(initialColumns);
        const defaultKeys = computeInitialVisibleKeys();
        // Calculate removed for animation
        setVisibleKeys((prev) => {
            const removed = [...prev].filter((k) => !defaultKeys.has(k));
            if (removed.length > 0) {
                setLeavingKeys(new Set(removed));
                setColumnChange({
                    columnKey: 'reset',
                    action: 'added',
                    timestamp: Date.now(),
                });
            }
            return defaultKeys;
        });
    }, [initialColumns, computeInitialVisibleKeys]);
    /** Check if column is visible */
    const isColumnVisible = (0, react_1.useCallback)((columnKey) => visibleKeys.has(columnKey), [visibleKeys]);
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
    };
}
exports.useColumnConfiguration = useColumnConfiguration;
// ============================================================================
// UTILITIES
// ============================================================================
/**
 * Recalculate sticky left offsets for all sticky columns
 */
function recalculateStickyOffsets(columns) {
    let stickyLeft = 0;
    return columns.map((col) => {
        if (col.isSticky) {
            const updated = { ...col, stickyLeft };
            stickyLeft += col.width;
            return updated;
        }
        return col;
    });
}
//# sourceMappingURL=use-column-configuration.js.map