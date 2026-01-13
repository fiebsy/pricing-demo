"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelection = void 0;
/**
 * StickyDataTable V2 - Selection Hook
 *
 * Manages row selection state for checkbox functionality.
 * Supports single, multiple, and select-all operations.
 *
 * @module hooks/use-selection
 */
const react_1 = require("react");
/**
 * Hook for row selection management
 *
 * Features:
 * - Toggle individual rows
 * - Select/deselect all
 * - Computed selection states
 * - Returns null when disabled
 *
 * @returns SelectionState or null if disabled
 */
function useSelection({ rowIds, enabled, initialSelected, }) {
    const [selectedIds, setSelectedIds] = (0, react_1.useState)(() => initialSelected ?? new Set());
    // Toggle single row selection
    const toggleRowSelection = (0, react_1.useCallback)((rowId) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(rowId)) {
                next.delete(rowId);
            }
            else {
                next.add(rowId);
            }
            return next;
        });
    }, []);
    // Select all visible rows
    const selectAllRows = (0, react_1.useCallback)(() => {
        setSelectedIds(new Set(rowIds));
    }, [rowIds]);
    // Deselect all rows
    const deselectAllRows = (0, react_1.useCallback)(() => {
        setSelectedIds(new Set());
    }, []);
    // Check if specific row is selected
    const isRowSelected = (0, react_1.useCallback)((rowId) => selectedIds.has(rowId), [selectedIds]);
    // Computed: all rows selected
    // Use safe access in case rowIds is undefined during transitions
    const isAllSelected = (0, react_1.useMemo)(() => {
        if (!rowIds || rowIds.length === 0)
            return false;
        return rowIds.every((id) => selectedIds.has(id));
    }, [rowIds, selectedIds]);
    // Computed: some but not all selected
    const isSomeSelected = (0, react_1.useMemo)(() => {
        if (!rowIds || rowIds.length === 0)
            return false;
        return rowIds.some((id) => selectedIds.has(id)) && !isAllSelected;
    }, [rowIds, selectedIds, isAllSelected]);
    // Computed: count of selected
    const selectedCount = (0, react_1.useMemo)(() => {
        return selectedIds.size;
    }, [selectedIds]);
    // Return null if selection is disabled (after all hooks are called)
    if (!enabled) {
        return null;
    }
    return {
        selectedIds,
        toggleRowSelection,
        selectAllRows,
        deselectAllRows,
        isRowSelected,
        isAllSelected,
        isSomeSelected,
        selectedCount,
    };
}
exports.useSelection = useSelection;
//# sourceMappingURL=use-selection.js.map