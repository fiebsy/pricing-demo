"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumns = void 0;
/**
 * StickyDataTable V2 - Columns Hook
 *
 * Manages column visibility, ordering, and animations.
 * Handles dynamic column toggles with smooth transitions.
 *
 * @module hooks/use-columns
 */
const react_1 = require("react");
const config_1 = require("../config");
const utils_1 = require("../utils");
/**
 * Hook for managing dynamic columns
 *
 * Features:
 * - Column visibility toggle with animation
 * - Automatic sticky offset calculation
 * - Animation state management
 * - Reset to default state
 */
function useColumns({ columns, defaultHiddenColumns = [], defaultVisibleColumns, }) {
    // Create initial visible set
    // Priority: defaultVisibleColumns > defaultHiddenColumns > all columns
    // Note: '__checkbox' is always included if it exists in columns
    const initialVisibleKeys = (0, react_1.useMemo)(() => {
        let visibleKeys;
        if (defaultVisibleColumns && defaultVisibleColumns.length > 0) {
            // Use explicit visible columns list
            const visibleSet = new Set(defaultVisibleColumns);
            visibleKeys = new Set(columns.map((c) => c.key).filter((key) => visibleSet.has(key)));
        }
        else {
            // Fall back to hidden columns approach (backward compatibility)
            const hiddenSet = new Set(defaultHiddenColumns);
            visibleKeys = new Set(columns.map((c) => c.key).filter((key) => !hiddenSet.has(key)));
        }
        // Always include checkbox column if it exists
        if (columns.some((c) => c.key === '__checkbox')) {
            visibleKeys.add('__checkbox');
        }
        return visibleKeys;
    }, [columns, defaultHiddenColumns, defaultVisibleColumns]);
    // State
    const [visibleColumnKeys, setVisibleColumnKeys] = (0, react_1.useState)(initialVisibleKeys);
    const [leavingColumnKeys, setLeavingColumnKeys] = (0, react_1.useState)(new Set());
    const [leavingColumnsData, setLeavingColumnsData] = (0, react_1.useState)([]);
    const [enteringColumnKeys, setEnteringColumnKeys] = (0, react_1.useState)(new Set());
    const [columnChange, setColumnChange] = (0, react_1.useState)(null);
    // Track previous state for reset detection
    const previousVisibleKeysRef = (0, react_1.useRef)(initialVisibleKeys);
    // Track current visible keys for sync comparison (avoids stale closure)
    const visibleColumnKeysRef = (0, react_1.useRef)(visibleColumnKeys);
    (0, react_1.useEffect)(() => {
        visibleColumnKeysRef.current = visibleColumnKeys;
    }, [visibleColumnKeys]);
    // Track computed columns for capturing leaving column data
    const computedColumnsRef = (0, react_1.useRef)([]);
    // ==========================================================================
    // SYNC WITH EXTERNAL defaultVisibleColumns CHANGES
    // ==========================================================================
    // This effect allows external state (like useColumnConfiguration) to drive
    // column visibility while preserving animations.
    (0, react_1.useEffect)(() => {
        if (!defaultVisibleColumns || defaultVisibleColumns.length === 0)
            return;
        const externalVisibleSet = new Set(defaultVisibleColumns);
        // Always include checkbox column if it exists
        if (columns.some((c) => c.key === '__checkbox')) {
            externalVisibleSet.add('__checkbox');
        }
        // Use ref to get current state without adding to dependency array
        const currentVisibleKeys = visibleColumnKeysRef.current;
        // Check if there's actually a difference
        const currentKeys = [...currentVisibleKeys].sort().join(',');
        const externalKeys = [...externalVisibleSet].sort().join(',');
        if (currentKeys === externalKeys)
            return;
        // Calculate added/removed for animations
        const removed = [...currentVisibleKeys].filter((k) => !externalVisibleSet.has(k));
        const added = [...externalVisibleSet].filter((k) => !currentVisibleKeys.has(k));
        // Mark removed columns as leaving for exit animation
        if (removed.length > 0) {
            // Capture leaving columns' computed data for absolute positioning
            const leavingCols = computedColumnsRef.current.filter((c) => removed.includes(c.key));
            if (leavingCols.length > 0) {
                setLeavingColumnsData((existing) => [...existing, ...leavingCols]);
            }
            setLeavingColumnKeys((leaving) => {
                const updated = new Set(leaving);
                removed.forEach((k) => updated.add(k));
                return updated;
            });
            const firstRemoved = removed[0];
            if (firstRemoved) {
                setColumnChange({
                    columnKey: firstRemoved,
                    action: 'removed',
                    timestamp: Date.now(),
                });
            }
        }
        // Mark added columns as entering for entry animation
        if (added.length > 0) {
            setEnteringColumnKeys(new Set(added));
            const firstAdded = added[0];
            if (firstAdded) {
                setColumnChange({
                    columnKey: firstAdded,
                    action: 'added',
                    timestamp: Date.now(),
                });
            }
        }
        previousVisibleKeysRef.current = currentVisibleKeys;
        setVisibleColumnKeys(externalVisibleSet);
    }, [defaultVisibleColumns, columns]);
    // Don't include leaving columns - they render as absolute overlays
    // This allows the grid to shrink immediately, triggering FLIP for neighbors
    const effectiveVisibleKeys = (0, react_1.useMemo)(() => {
        return new Set(visibleColumnKeys);
    }, [visibleColumnKeys]);
    // Filter and compute VISIBLE columns with proper offsets
    const visibleColumns = (0, react_1.useMemo)(() => {
        const visible = columns.filter((col) => effectiveVisibleKeys.has(col.key));
        return (0, utils_1.computeColumnOffsets)(visible);
    }, [columns, effectiveVisibleKeys]);
    // Keep ref updated with VISIBLE columns (for capturing leaving column positions)
    (0, react_1.useEffect)(() => {
        computedColumnsRef.current = visibleColumns;
    }, [visibleColumns]);
    // Separate into sticky and scrollable
    const { stickyColumns, scrollableColumns } = (0, react_1.useMemo)(() => (0, utils_1.separateColumns)(visibleColumns), [visibleColumns]);
    // Calculate total sticky width
    const totalStickyWidth = (0, react_1.useMemo)(() => (0, utils_1.calculateTotalStickyWidth)(stickyColumns), [stickyColumns]);
    // Toggle column visibility
    const toggleColumn = (0, react_1.useCallback)((columnKey) => {
        setVisibleColumnKeys((prev) => {
            const next = new Set(prev);
            const wasVisible = prev.has(columnKey);
            if (wasVisible) {
                // Capture the leaving column's computed data for absolute positioning
                const leavingCol = computedColumnsRef.current.find((c) => c.key === columnKey);
                if (leavingCol) {
                    setLeavingColumnsData((existing) => [...existing, leavingCol]);
                }
                // Mark as leaving for exit animation
                setLeavingColumnKeys((leaving) => new Set(leaving).add(columnKey));
                next.delete(columnKey);
                setColumnChange({
                    columnKey,
                    action: 'removed',
                    timestamp: Date.now(),
                });
            }
            else {
                // Remove from leaving if it was there
                setLeavingColumnKeys((leaving) => {
                    const updated = new Set(leaving);
                    updated.delete(columnKey);
                    return updated;
                });
                setLeavingColumnsData((existing) => existing.filter((c) => c.key !== columnKey));
                // Mark as entering for entry animation
                setEnteringColumnKeys((entering) => new Set(entering).add(columnKey));
                next.add(columnKey);
                setColumnChange({
                    columnKey,
                    action: 'added',
                    timestamp: Date.now(),
                });
            }
            previousVisibleKeysRef.current = new Set(prev);
            return next;
        });
    }, []);
    // Reset to default visibility
    const resetColumns = (0, react_1.useCallback)(() => {
        let defaultVisibleKeys;
        if (defaultVisibleColumns && defaultVisibleColumns.length > 0) {
            // Use explicit visible columns list
            const visibleSet = new Set(defaultVisibleColumns);
            defaultVisibleKeys = new Set(columns.map((c) => c.key).filter((key) => visibleSet.has(key)));
        }
        else {
            // Fall back to hidden columns approach (backward compatibility)
            const hiddenSet = new Set(defaultHiddenColumns);
            defaultVisibleKeys = new Set(columns.map((c) => c.key).filter((key) => !hiddenSet.has(key)));
        }
        // Always include checkbox column if it exists
        if (columns.some((c) => c.key === '__checkbox')) {
            defaultVisibleKeys.add('__checkbox');
        }
        // Check if anything changed
        const hasChanges = previousVisibleKeysRef.current.size !== defaultVisibleKeys.size ||
            Array.from(previousVisibleKeysRef.current).some((key) => !defaultVisibleKeys.has(key));
        if (hasChanges) {
            // Mark removed columns as leaving
            const removedKeys = Array.from(previousVisibleKeysRef.current).filter((key) => !defaultVisibleKeys.has(key));
            if (removedKeys.length > 0) {
                setLeavingColumnKeys((leaving) => {
                    const updated = new Set(leaving);
                    removedKeys.forEach((key) => updated.add(key));
                    return updated;
                });
            }
            // Mark added columns as entering
            const addedKeys = Array.from(defaultVisibleKeys).filter((key) => !previousVisibleKeysRef.current.has(key));
            if (addedKeys.length > 0) {
                setEnteringColumnKeys(new Set(addedKeys));
            }
            setColumnChange({
                columnKey: 'reset',
                action: 'added',
                timestamp: Date.now(),
            });
        }
        previousVisibleKeysRef.current = new Set(visibleColumnKeys);
        setVisibleColumnKeys(defaultVisibleKeys);
    }, [columns, defaultHiddenColumns, defaultVisibleColumns, visibleColumnKeys]);
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
        if (leavingColumnKeys.size > 0) {
            const timer = setTimeout(() => {
                setLeavingColumnKeys(new Set());
                setLeavingColumnsData([]);
            }, config_1.ANIMATION_CONFIG.LEAVING_COLUMN_CLEAR_DELAY);
            return () => clearTimeout(timer);
        }
    }, [leavingColumnKeys]);
    // Clear entering columns after animation
    (0, react_1.useEffect)(() => {
        if (enteringColumnKeys.size > 0) {
            const timer = setTimeout(() => {
                setEnteringColumnKeys(new Set());
            }, config_1.ANIMATION_CONFIG.COLUMN_ENTER_DURATION);
            return () => clearTimeout(timer);
        }
    }, [enteringColumnKeys]);
    return {
        allColumns: visibleColumns,
        stickyColumns,
        scrollableColumns,
        visibleColumnKeys,
        leavingColumnKeys,
        leavingColumns: leavingColumnsData,
        enteringColumnKeys,
        columnChange,
        toggleColumn,
        resetColumns,
        totalStickyWidth,
    };
}
exports.useColumns = useColumns;
//# sourceMappingURL=use-columns.js.map