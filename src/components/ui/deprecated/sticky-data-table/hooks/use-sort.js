"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSort = void 0;
/**
 * StickyDataTable V2 - Sort Hook
 *
 * Manages column sorting state and data transformation.
 * Supports ascending/descending toggle and multiple data types.
 *
 * @module hooks/use-sort
 */
const react_1 = require("react");
/**
 * Compare two values for sorting
 */
function compareValues(a, b, direction) {
    const modifier = direction === 'asc' ? 1 : -1;
    // Handle null/undefined
    if (a == null && b == null)
        return 0;
    if (a == null)
        return modifier;
    if (b == null)
        return -modifier;
    // Number comparison
    if (typeof a === 'number' && typeof b === 'number') {
        return (a - b) * modifier;
    }
    // Date comparison
    if (a instanceof Date && b instanceof Date) {
        return (a.getTime() - b.getTime()) * modifier;
    }
    // String comparison
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b) * modifier;
    }
    // Boolean comparison
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return (a === b ? 0 : a ? 1 : -1) * modifier;
    }
    // Fallback to string coercion
    return String(a).localeCompare(String(b)) * modifier;
}
/**
 * Hook for table sorting
 *
 * Features:
 * - Click column to sort descending
 * - Click again to toggle direction
 * - Click different column to reset
 * - Handles multiple data types
 * - Memoized sorted data
 */
function useSort({ data, }) {
    const [sortColumn, setSortColumn] = (0, react_1.useState)(null);
    const [sortDirection, setSortDirection] = (0, react_1.useState)('desc');
    // Memoized sorted data
    const sortedData = (0, react_1.useMemo)(() => {
        if (!sortColumn)
            return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            return compareValues(aVal, bVal, sortDirection);
        });
    }, [data, sortColumn, sortDirection]);
    // Handle sort click
    const handleSort = (0, react_1.useCallback)((columnKey) => {
        setSortColumn((prevColumn) => {
            if (prevColumn === columnKey) {
                // Same column - toggle direction
                setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
                return columnKey;
            }
            else {
                // New column - reset to descending
                setSortDirection('desc');
                return columnKey;
            }
        });
    }, []);
    // Reset sort state
    const resetSort = (0, react_1.useCallback)(() => {
        setSortColumn(null);
        setSortDirection('desc');
    }, []);
    return {
        sortColumn,
        sortDirection,
        sortedData,
        handleSort,
        resetSort,
    };
}
exports.useSort = useSort;
//# sourceMappingURL=use-sort.js.map