'use client'

/**
 * StickyDataTable V2 - Table Context
 *
 * Provides centralized state management for the table component.
 * Eliminates prop drilling and enables selective re-renders.
 *
 * @module context/table-context
 */

import { createContext, useContext, type ReactNode } from 'react'
import type { TableContextValue } from '../types'

// Create context with undefined default (will error if used outside provider)
const TableContext = createContext<TableContextValue<any> | undefined>(undefined)

/**
 * TableProvider component
 * Wraps the table and provides shared state to all children
 */
export interface TableProviderProps<T> {
  value: TableContextValue<T>
  children: ReactNode
}

export function TableProvider<T extends Record<string, unknown>>({
  value,
  children,
}: TableProviderProps<T>) {
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

/**
 * Hook to access table context
 * Must be used within a TableProvider
 *
 * @throws Error if used outside TableProvider
 */
export function useTableContext<T = Record<string, unknown>>(): TableContextValue<T> {
  const context = useContext(TableContext)
  if (context === undefined) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return context as TableContextValue<T>
}

/**
 * Hook to access only scroll-related state
 * Useful for components that only need scroll state
 */
export function useScrollContext() {
  const { stickyState, scrollState, handleScrollLeft, handleScrollRight, headerScrollRef, bodyScrollRef } =
    useTableContext()
  return { stickyState, scrollState, handleScrollLeft, handleScrollRight, headerScrollRef, bodyScrollRef }
}

/**
 * Hook to access only column-related state
 * Useful for column control components
 */
export function useColumnsContext() {
  const {
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
  } = useTableContext()
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
  }
}

/**
 * Hook to access only selection-related state
 * Useful for selection controls
 */
export function useSelectionContext() {
  const { selectionState, getRowId } = useTableContext()
  return { selectionState, getRowId }
}

/**
 * Hook to access only sorting-related state
 * Useful for sort indicators
 */
export function useSortContext() {
  const { sortColumn, sortDirection, handleSort } = useTableContext()
  return { sortColumn, sortDirection, handleSort }
}

/**
 * Hook to access styling configuration
 * Useful for styled components
 */
export function useStylingContext() {
  const { borderRadius, borderConfig, backgroundConfig, stickyState } = useTableContext()
  return { borderRadius, borderConfig, backgroundConfig, stickyState }
}


