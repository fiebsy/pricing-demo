"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStylingContext = exports.useSortContext = exports.useSelectionContext = exports.useColumnsContext = exports.useScrollContext = exports.useTableContext = exports.TableProvider = void 0;
/**
 * StickyDataTable V2 - Table Context
 *
 * Provides centralized state management for the table component.
 * Eliminates prop drilling and enables selective re-renders.
 *
 * @module context/table-context
 */
const react_1 = require("react");
// Create context with undefined default (will error if used outside provider)
const TableContext = (0, react_1.createContext)(undefined);
function TableProvider({ value, children, }) {
    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}
exports.TableProvider = TableProvider;
/**
 * Hook to access table context
 * Must be used within a TableProvider
 *
 * @throws Error if used outside TableProvider
 */
function useTableContext() {
    const context = (0, react_1.useContext)(TableContext);
    if (context === undefined) {
        throw new Error('useTableContext must be used within a TableProvider');
    }
    return context;
}
exports.useTableContext = useTableContext;
/**
 * Hook to access only scroll-related state
 * Useful for components that only need scroll state
 */
function useScrollContext() {
    const { stickyState, scrollState, handleScrollLeft, handleScrollRight, headerScrollRef, bodyScrollRef } = useTableContext();
    return { stickyState, scrollState, handleScrollLeft, handleScrollRight, headerScrollRef, bodyScrollRef };
}
exports.useScrollContext = useScrollContext;
/**
 * Hook to access only column-related state
 * Useful for column control components
 */
function useColumnsContext() {
    const { columns, stickyColumns, scrollableColumns, allColumns, columnLabels, visibleColumnKeys, leavingColumnKeys, columnChange, toggleColumn, resetColumns, totalStickyWidth, } = useTableContext();
    return {
        columns,
        stickyColumns,
        scrollableColumns,
        allColumns,
        columnLabels,
        visibleColumnKeys,
        leavingColumnKeys,
        columnChange,
        toggleColumn,
        resetColumns,
        totalStickyWidth,
    };
}
exports.useColumnsContext = useColumnsContext;
/**
 * Hook to access only selection-related state
 * Useful for selection controls
 */
function useSelectionContext() {
    const { selectionState, getRowId } = useTableContext();
    return { selectionState, getRowId };
}
exports.useSelectionContext = useSelectionContext;
/**
 * Hook to access only sorting-related state
 * Useful for sort indicators
 */
function useSortContext() {
    const { sortColumn, sortDirection, handleSort } = useTableContext();
    return { sortColumn, sortDirection, handleSort };
}
exports.useSortContext = useSortContext;
/**
 * Hook to access styling configuration
 * Useful for styled components
 */
function useStylingContext() {
    const { borderRadius, borderConfig, backgroundConfig, stickyState } = useTableContext();
    return { borderRadius, borderConfig, backgroundConfig, stickyState };
}
exports.useStylingContext = useStylingContext;
//# sourceMappingURL=table-context.js.map